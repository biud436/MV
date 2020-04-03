const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const ConsoleColor = require('./ConsoleColor');
const argv = require('minimist')(process.argv.slice(2));
const cp = require('child_process');
const encoding = require("encoding");
const {UINT32, UINT64} = require("cuint");

if(argv.help) {
    console.log(`
        ${ConsoleColor.FgYellow}--help${ConsoleColor.Reset} 
        ${ConsoleColor.FgYellow}--file${ConsoleColor.Reset} Game.exe 파일을 지정하세요.
    `);

    return;
}

class Key {

    constructor(key) {
        this._key = key;
        this._buffer = [];
        
        this.makeBuffers();
    }

    makeBuffers() {
        let key = this._key;

        this._buffer = [
            key >> 0 & 0xFF,
            key >> 8 & 0xFF,
            key >> 16 & 0xFF,
            key >> 24 & 0xFF
        ];

    }

    key() {
        return this._key;
    }

    buffer() {
        return this._buffer;
    }
}

const RGSS3 = {};
RGSS3.FileHeader = class {
    constructor() {
        this._offset = 0;
        this._size = 0;
        this._key = 0;
        this._nameLen = 0;
        this._name = "";
    }

    /**
     * 
     * @param {Buffer} buffer 
     * @param {Number} key 
     * @param {Number[]} keyBuf 
     * @param {Number} offset 
     */
    read(buffer, key, keyBuf, offset) {

        const tempOffset = offset;

        this._offset = buffer.readUInt32LE(offset) ^ key;
        offset += 0x04;

        this._size = buffer.readUInt32LE(offset) ^ key;
        offset += 0x04;

        this._key = buffer.readUInt32LE(offset) ^ key;
        offset += 0x04;            

        this._nameLen = buffer.readUInt32LE(offset) ^ key;
        offset += 0x04;    

        if(this._nameLen > 255 || this._nameLen < 0) {
            return tempOffset;
        }
        
        // 파일명을 복호화한다.
        let encryptedNameBuffer = buffer.slice(offset, offset + this._nameLen);
        let decryptedNameBuffer = encryptedNameBuffer.map((e, i, a) => {
            return e ^ keyBuf[i % 4];
        });

        // UTF-8로 변환
        const retNameBuffer = encoding.convert(decryptedNameBuffer, 'UTF-8');

        this._name = retNameBuffer.toString("utf-8", 0, retNameBuffer.length);
        this._name = this._name.replace(/\\/g, "/");

        offset += this._nameLen;
        
        return offset;

    }
};

class App {

    constructor() {
        this._root = path.dirname(argv.file).replace(/\\/g, "/");
        this._gameFile = argv.file.replace(/\\/g, "/");;
        this._isValidRGSS3 = false;

        /**
         * @type {RGSS3.FileHeader[]}
         */
        this._files = [];

        try {
            this.checkVersion().then(value => {
                this.decrypt();            
            })
        } catch(err) {
            throw new Error(err);
        }

    }

    async checkVersion() {
        let version = await this.getApplicationVersion(this._gameFile);

        switch(version.trim()) {
            case 'RGSS Player':
                console.log("RPG Maker XP로 만든 게임입니다.");
                break;
            case 'RGSS2 Player':            
                console.log("RPG Maker VX로 만든 게임입니다.");
                break;
            case 'RGSS3 Player':
                console.log("RPG Maker VX Ace로 만든 게임입니다.");
                this._isValidRGSS3 = true;
                break;
        }

    }

    convert(key) {
        let n = key.toNumber();
        var keyBuffer = [
            n >> 0 & 0xFF,
            n >> 8 & 0xFF,
            n >> 16 & 0xFF,
            n >> 24 & 0xFF
        ];

        return keyBuffer;
    }

    /**
     * 문자열 생성 시 바이너리 데이터가 손상되므로 안전한 Uint8Array를 사용하여 버퍼를 생성해야 한다.
     * 
     * @param {Buffer} data 
     * @param {Number} dKey
     * @return {Buffer}
     */
    toSafeBuffer(data, dKey) {

        var resultBuffer = new ArrayBuffer(data.length);
        var view = new DataView(resultBuffer);

        var resultArray = new Uint8Array(resultBuffer);
        var byteArray = new Uint8Array(data);

        var key = UINT32(dKey);
        var keyBuffer = this.convert(key);

        for (var i = 0; i < resultArray.length; i++) {
            if(i > 0 && i % 4 === 0) {

                key.multiply(UINT32(7));
                key.add(UINT32(3));

                keyBuffer = this.convert(key);

            }
            resultArray[i] = byteArray[i];
            view.setUint8(i, (resultArray[i] ^ keyBuffer[i % 4]) & 0xFF);
        }

        var buf = Buffer.alloc(resultBuffer.byteLength);
        var headerView = new Uint8Array(resultBuffer);
        for (var i = 0; i < resultBuffer.byteLength; i++) {
            buf[i] = headerView[i];
        }            

        return buf;        
    }

    decrypt() {
        if(!fs.existsSync(this._root)) {
            throw new Error("게임 폴더가 존재하지 않습니다.");
        }

        let buffer = fs.readFileSync(path.join(this._root, `Game.rgss3a`));
        let offset = 0x00;

        // RGSS 시그니처를 찾습니다.
        const isRGSSAD = buffer.toString("ascii", offset, offset + 0x08).indexOf("RGSSAD") >= 0;
        if(!isRGSSAD) {
            throw new Error("RGSSAD Signature를 발견하지 못했습니다.");
        }

        offset += 0x08;

        // 복호화 키를 구합니다.
        let key = UINT32(buffer.readUInt32LE(offset));
        key.multiply(UINT32(9));
        key.add(UINT32(3));

        offset += 0x04;

        // 파일 헤더를 찾습니다.
        let header = new RGSS3.FileHeader();
        offset = header.read(buffer, key.toNumber(), this.convert(key), offset);

        this._dataOffset = header._offset;

        this._files.push(header);

        const expectNextHeader = 40;

        while(offset + expectNextHeader < this._dataOffset) {
            const file = new RGSS3.FileHeader();
            offset = file.read(buffer, key.toNumber(), this.convert(key), offset);
            this._files.push(file);
        }
        
        this._files.forEach(file => {
            
            let encryptedData = buffer.slice(file._offset, file._offset + file._size);

            const decryptedData = this.toSafeBuffer(encryptedData, file._key);
            const retPath = path.join(this._root, file._name);

            fs.ensureFileSync(retPath);
            fs.writeFileSync(retPath, decryptedData, "binary");

        });
    }

    getApplicationVersion(rootPath) {
 
        return new Promise((resolve, reject) => {

            if(!process.platform.includes("win")) {
                reject("Your computer is not window platform");
            }
    
            let command = `powershell -Command "(Get-Item '${rootPath}').VersionInfo.FileDescription"`;
    
            const powershell = cp.exec(command, {
                encoding: 'utf8',
                shell: true
            }, (err, stdout, stderr) => {
                if(err) {
                    reject(err);
                }  
                resolve(stdout);
            });
    
            powershell.on("exit", (code, signal) => {
    
            });
            
        });

    }


}

const host = new App();