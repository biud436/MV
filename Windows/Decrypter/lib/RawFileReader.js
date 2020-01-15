/**
 * @author biud436
 */
const fs = require('fs-extra');
const path = require('path');

/**
 * PE 헤더
 */
const Header = {
    IMAGE_DOS_HEADER: {
        offset: 0x00,
        length : 0x40,
    },
    DOS_Stub16: {
        offset: 0x40,
        length: 0x0E,
    },
    DOS_Stub32: {
        offset: 0x4E,
        length: 0x2A,
    },    
    IMAGE_NT_HEADERS: {
        offset: 0x78,
        length: 0xF8
    }
};

const ConsoleColor = require("./ConsoleColor");

class RawFileReader {

    constructor(binaryPath, mainFile) {
        this._binaryPath = binaryPath;
        this._mainFileName = mainFile;
        this._version = "";
        this._isReady = false;
        this._isEnigma = false;

        // Enigma Virtual Box를 사용하였는가?
        if(!this._isReady) {
            if(this.checkEnigmaPacker(binaryPath)) {
                this._isEnigma = true;
            }
        }

        // RPG Maker MV v1.6.2 버전인지 확인
        this.version = this.readNodeVersion(this._binaryPath);

        // RPG Maker MV v1.5.2 이하인가?
        if(!this._isReady) {
            this.version = this.readNodeVersionForOlder(this._binaryPath);            
        }

        if(this._isEnigma) {
            throw new Error(`${ConsoleColor.BgRed}Enigma Virtual Box를 사용한 게임은 언팩할 수 없습니다.${ConsoleColor.Reset}`);
        }

    }

    set version(value) {
        this._version = value;
        if(this._version !== "") {
            this._isReady = true;  
        }        
    }

    get version() {
        return this._isReady ? this._version : "v0.0.0";
    }

    isValid() {
        return this.version !== "v0.0.0";
    }
    
    readNodeVersion(binaryPath) {
        var dllFile = path.normalize(path.win32.join(binaryPath, "node.dll"));

        if(!fs.existsSync(dllFile)) {
            return "";
        }

        var data = fs.readFileSync(dllFile);
        
        var startOffset = ((data.length - 0x10) / 2); // 중간부터 검색
        startOffset = (startOffset & ~0x0F); // 16바이트 기준으로 정렬
        var maxOffset = (startOffset + (startOffset >> 1));
        var version = "";
        
        // 중간부터 maxOffset까지 읽어가면서 특정 문자열을 찾는다
        for(var curOffset = startOffset; curOffset < maxOffset; curOffset += 0x10) {
            var buf = data.toString('ascii', curOffset, curOffset + 0x08 + 0x04);
            if(buf === "versions\u0000\u0000\u0000\u0000") {
                var targetOffset = curOffset - 0x10;
                version = data.toString('ascii', targetOffset, targetOffset + 0x08);
            }
        }
        
        return version;
    }
    
    readNodeVersionForOlder(binaryPath) {
        var dllFile = path.normalize(path.win32.join(binaryPath, this._mainFileName));
        var data = fs.readFileSync(dllFile);
        if(!fs.existsSync(dllFile)) {
            return "";
        }
        
        var startOffset = ((data.length - 0x10) / 2); // 중간부터 검색
        startOffset = (startOffset & ~0x0F); // 16바이트 기준으로 정렬
        var maxOffset = data.length - 0x10;
        var version = "";
        
        // 중간부터 끝까지 읽어가면서 특정 문자열을 찾는다
        for(var curOffset = startOffset; curOffset < maxOffset; curOffset += 0x10) {
            var buf = data.toString('ascii', curOffset, curOffset + 0x10);
            if(buf === "s['node-webkit']") {
                var targetOffset = curOffset + 0x10;
                var str = data.toString('ascii', targetOffset, targetOffset + 0x10);
                var re = /'(\d+\.\d+\.\d+)'/gm;
                if(re.exec(str)) {
                    version = `v${RegExp.$1}`;
                }
            }
        }
        
        return version;
    }
    
    /**
     * 압축 파일을 실행 파일에서 추출한다.
     * @ret {Buffer}
     */
    extractZip(mainFolder) {
        if(!fs.existsSync(mainFolder)) {
            throw new Error("There is no main folder");
        }
        var myFilePath = path.normalize(path.win32.join(mainFolder, this._mainFileName));

        if(!fs.existsSync(myFilePath)) {
            throw new Error(`There is no file called ${myFilePath}`);
        }
        
        console.log("www 폴더가 실행 파일 내에 압축되어있는 지 확인 중입니다.");

        var data = fs.readFileSync(myFilePath);

        var startOffset = 0;
        startOffset = (startOffset & ~0x0F); // 16바이트 기준으로 정렬
        var maxOffset = data.byteLength;
        var zip = {
            byteIndex: 0,
            isReady: false,
        };
        var retZipBuffer;

        // 내부적으로 ZIP로 압축된 것이 많아서 16바이트로 정렬한 후 검색한다.
        for(var curOffset = startOffset; curOffset <= maxOffset; curOffset = (curOffset + 0x10) & ~0x0F) {
            var buf = data.toString('ascii', curOffset, curOffset + 0x08);
            if(buf === "PK\u0003\u0004\u0014\u0000\u0002\u0000") {
                zip.byteIndex = curOffset;
                zip.isReady = true;
                console.log(`압축 파일을 ${zip.byteIndex} 오프셋에서 발견하였습니다.`);
                break;
            }
        }

        // data.toString("binary")는 일부 문자가 잘못 인코딩되므로 체크섬에 문제가 생긴다.
        // Uint8Array을 사용해야 정확하게 추출할 수 있다.
        if(zip.isReady) {

            console.log(`압축 파일을 추출하는 중입니다.`);

            var resultBuffer = new ArrayBuffer(data.length - zip.byteIndex);
            var view = new DataView(resultBuffer);

            var resultArray = new Uint8Array(resultBuffer);
            var byteArray = new Uint8Array(data);

            for (var i = 0; i < resultArray.length; i++) {
                resultArray[i] = byteArray[zip.byteIndex + i];
                view.setUint8(i, resultArray[i]);
            }

            var buf = Buffer.alloc(resultBuffer.byteLength);
            var headerView = new Uint8Array(resultBuffer);
            for (var i = 0; i < resultBuffer.byteLength; i++) {
                buf[i] = headerView[i];
            }            

            retZipBuffer = buf;

        } else {
            throw new Error(`${ConsoleColor.FgRed}${this._mainFileName} 파일 내부에서 압축 파일을 찾지 못했습니다.${ConsoleColor.Reset}`);
        }

        return retZipBuffer;

    }

    /**
     * Enigma Virtual Box를 사용하였는 지를 알아낸다.
     * @return {Boolean}
     */
    checkEnigmaPacker(binaryPath) {

        console.log(`${this._mainFileName}가 Enigma Virtual Box를 사용하였는 지 확인하고 있습니다.`);

        var dllFile = path.normalize(path.win32.join(binaryPath, this._mainFileName));
        if(!fs.existsSync(dllFile)) {
            return "";
        }
        var data = fs.readFileSync(dllFile);
        var isValidEnigma = false;
        
        var offset = Header.IMAGE_DOS_HEADER.offset;
        if(data.readInt16BE(offset) !== 0x4D5A) {
            throw new Error("DOS HEADER를 찾지 못했습니다.");
        }

        offset += Header.IMAGE_DOS_HEADER.length;
        offset += Header.DOS_Stub16.length;
        offset += Header.DOS_Stub32.length;

        var tempOffset = offset;
        
        offset += 0x04; // Signature
        offset += 0x02; // machine
        
        var numberOfSections = data.readInt16BE(offset);

        offset = tempOffset;
        offset += Header.IMAGE_NT_HEADERS.length;
        offset += 0x10; // padding

        for(var i = 0; i < numberOfSections; i++) {
            var buf = data.toString("ascii", offset, offset + 0x08).replace(/\0/g, '');
            if(buf !== "" && ".enigma".indexOf(buf) >= 0) {
                console.log(`${ConsoleColor.Blink}Enigma Virtual Box를 사용한 게임으로 보여집니다.${ConsoleColor.Reset}`);
                isValidEnigma = true;
                break;
            }
            offset += 0x40; // section length
            offset += 0x10; // padding
        }

        return isValidEnigma;

    }

}

module.exports = RawFileReader;