const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const ConsoleColor = require('./ConsoleColor');
const argv = require('minimist')(process.argv.slice(2));
const cp = require('child_process');
const encoding = require("encoding");
const {UINT32, UINT64} = require("cuint");

/**
 * @help
 * This tool is only worked in RGSS3 (Windows 7 or more)
 * 
 * node RGSS3.js --help
 * node RGSS3.js --file="C:\Users\U\Desktop\Project11\Game.exe"
 */
if(argv.help) {
    console.log(`
    node RGSS3.js ${ConsoleColor.FgYellow}--help${ConsoleColor.Reset} 
    node RGSS3.js ${ConsoleColor.FgYellow}--file${ConsoleColor.Reset}="C:\Users\U\Desktop\Project11\Game.exe"
    `);

    return;
}

/**
 * @license The MIT License
 * @see
 * I've referred for decrypting a file named "Game.rgss3a" at the following link.
 * 
 * RPGMakerDecrypter : https://github.com/uuksu/RPGMakerDecrypter/blob/master/RPGMakerDecrypter.Decrypter/RGSSAD.cs
 * RM-Gosu : https://github.com/CaptainJet/RM-Gosu/blob/master/rgss3/ext/RGSSAD.rb
 */

const config = [
    "Game.rgssad",
    "Game.rgss2a",
    "Game.rgss3a"
];

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

        // Windows에서 파일 길이는 보통 256 미만이기 때문에
        // 256 이상이라면 뭔가 잘못되었다는 뜻이다.
        if(this._nameLen > 255 || this._nameLen < 0) {
            return tempOffset;
        }
        
        // 파일명을 복호화한다.
        let encryptedNameBuffer = buffer.slice(offset, offset + this._nameLen);
        let decryptedNameBuffer = encryptedNameBuffer.map((e, i, a) => {
            return e ^ keyBuf[i % 4];
        });

        // ! UTF-8로 변환하는 iconv의 기능.
        // ! UTF-8로 변환하지 않으면 한글 파일명이 깨지게 된다.
        const retNameBuffer = encoding.convert(decryptedNameBuffer, 'UTF-8');

        this._name = retNameBuffer.toString("utf-8", 0, retNameBuffer.length);
        this._name = this._name.replace(/\\/g, "/");

        offset += this._nameLen;
        
        return offset;

    }
};

const RGSS = {};
RGSS.FileHeader = class extends RGSS3.FileHeader {
    constructor() {
        super();
    }

    /**
     * 
     * @param {Buffer} buffer 
     * @param {UINT64} key 
     * @param {Function} keyBufFunc 
     * @param {Number} offset 
     */
    read(buffer, key, keyBufFunc, offset) {
        const tempOffset = offset;
        
        this._nameLen = buffer.readUInt32LE(offset) ^ key.toNumber();
        offset += 0x04;            
        key.multiply(UINT64(7)).add(UINT64(3));  

        // Windows에서 파일 길이는 보통 256 미만이기 때문에
        // 256 이상이라면 뭔가 잘못되었다는 뜻이다.
        if(this._nameLen > 255 || this._nameLen < 0) {
            return tempOffset;
        }

        const keyBuf = keyBufFunc(key);
        
        // 파일명을 복호화한다.
        let encryptedNameBuffer = buffer.slice(offset, offset + this._nameLen);
        let decryptedNameBuffer = encryptedNameBuffer.map((e, i, a) => {
            const ret = e ^ key.toNumber();
            key.multiply(UINT64(7)).add(UINT64(3)); 
            return ret;
        });

        // ! UTF-8로 변환하는 iconv의 기능.
        // ! UTF-8로 변환하지 않으면 한글 파일명이 깨지게 된다.
        const retNameBuffer = encoding.convert(decryptedNameBuffer, 'UTF-8');

        this._name = retNameBuffer.toString("utf-8", 0, retNameBuffer.length);
        this._name = this._name.replace(/\\/g, "/");

        offset += this._nameLen;
        
        this._size = buffer.readUInt32LE(offset) ^ key.toNumber();
        key.multiply(UINT64(7)).add(UINT64(3));  
        offset += 0x04;   
        
        this._offset = offset;

        this._key = key.toNumber();

        return offset;
        
    }

}

class App {

    constructor() {
        this._root = path.dirname(argv.file).replace(/\\/g, "/");
        this._gameFile = argv.file.replace(/\\/g, "/");;
        this._isValidRGSS3 = false;
        this._type = 0x03;

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
                this._type = 0x00;
                break;
            case 'RGSS2 Player':            
                console.log("RPG Maker VX로 만든 게임입니다.");
                this._type = 0x01;
                break;
            case 'RGSS3 Player':
                console.log("RPG Maker VX Ace로 만든 게임입니다.");
                this._type = 0x02;
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
     * 복호화 키는 이전 헤더의 키에서 계속 누적되는 방식이므로 값이 비정상적으로 커지게 된다.
     * 따라서 UINT64 또는 UINT32를 사용하지 않으면 정수 범위 문제로 잘못된 데이터가 생성된다.
     * 
     * @param {UINT64} key 
     * @return {Buffer} keyBuffer;
     */
    takeNextKey(key) {
        key.multiply(UINT64(7)).add(UINT64(3));

        const keyBuffer = this.convert(key);

        return keyBuffer;
    }

    /**
     * Node.js에서는 문자셋 문제로 바이너리 데이터가 손상된다. 
     * 따라서 안전한 Uint8Array를 사용하여 버퍼를 생성해야 한다.
     * 이미 여러번 실험으로 검증했다.
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

        var key = UINT64(dKey);
        var keyBuffer = this.convert(key);

        for (var i = 0; i < resultArray.length; i++) {
            
            // i가 0일 땐, 누적을 해선 안된다. 따라서 i > 0 이다.
            if(i > 0 && i % 4 === 0) {

                keyBuffer = this.takeNextKey(key);

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

        let buffer = fs.readFileSync(path.join(this._root, config[this._type]));
        let offset = 0x00;

        // RGSS 시그니처를 찾습니다.
        const isRGSSAD = buffer.toString("ascii", offset, offset + 0x08).indexOf("RGSSAD") >= 0;
        if(!isRGSSAD) {
            throw new Error("RGSSAD Signature를 발견하지 못했습니다.");
        }

        offset += 0x08;

        // 복호화 키를 구합니다.
        let key;

        if(this._isValidRGSS3) {
            key = UINT64(buffer.readUInt32LE(offset));
            key.multiply(UINT64(9)).add(UINT64(3));            
            offset += 0x04;            
        } else {
            key = UINT64(0xDEADCAFE);
        }

        if(this._isValidRGSS3) {
            // 파일 헤더를 찾습니다.
            let header = new RGSS3.FileHeader();
            offset = header.read(buffer, key.toNumber(), this.convert.bind(this), offset);

            this._dataOffset = header._offset;

            this._files.push(header);

            // 추정치이다. 
            // 4바이트 정렬이 기본으로 보이는데 정확히 확인할 시간이 없다.
            // 일단은 대략적으로 헤더의 크기는 35 ~ 40 사이이다.
            const expectNextHeader = 40;

            while(offset + expectNextHeader < this._dataOffset) {
                const file = new RGSS3.FileHeader();
                offset = file.read(buffer, key.toNumber(), this.convert(key), offset);
                this._files.push(file);
            }
        } else {
            while (offset < buffer.byteLength) {
                const tempOffset = offset;
                const file = new RGSS.FileHeader();
                offset = file.read(buffer, key, this.convert, offset);
                offset += file._size;
                console.log(`[${file._name}] - ${ConsoleColor.FgRed}${offset}${ConsoleColor.Reset} < ${ConsoleColor.FgGreen}${buffer.byteLength}${ConsoleColor.Reset} (현재 길이 / 전체 크기)`);
                if(file._size <= 0 || file._nameLen > 255 || file._nameLen < 0) {
                    break;
                }
                this._files.push(file);
            }
        }

        this._files.forEach(file => {
            
            let encryptedData = buffer.slice(file._offset, file._offset + file._size);

            const decryptedData = this.toSafeBuffer(encryptedData, file._key);
            const retPath = path.join(this._root, file._name);

            // 디렉토리를 알아서 생성해주는 fs-extra 모듈의 기능이다.
            fs.ensureFileSync(retPath);
            // UTF-8로 저장하면 바이너리 파일이 손상된다.
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