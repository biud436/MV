/**
 * @author biud436
 */
const fs = require('fs-extra');
const path = require('path');

class Version {

    constructor(binaryPath, mainFile) {
        this._binaryPath = binaryPath;
        this._mainFileName = mainFile;
        this._version = "";
        this._isReady = false;

        this._version = this.readNodeVersion(this._binaryPath);
        if(this._version !== "") {
            this._isReady = true;  
        }

        if(!this._isReady) {
            this._version = this.readNodeVersionForOlder(this._binaryPath);
        }
        
    }

    get version() {
        return this._isReady ? this._version : "v0.0.0";
    }
    
    readNodeVersion(binaryPath) {
        var dllFile = path.normalize(path.win32.join(binaryPath, "node.dll"));
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
     * 압축 파일을 해제합니다.
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
        
        console.log("압축된 파일이 실행 파일에 있는지 확인 중입니다...");

        var data = fs.readFileSync(myFilePath);

        var startOffset = 0;
        startOffset = (startOffset & ~0x0F); // 16바이트 기준으로 정렬
        var maxOffset = data.byteLength;
        var zip = {
            byteIndex: 0,
            isReady: false,
        };
        var retZipBuffer;

        for(var curOffset = startOffset; curOffset <= maxOffset; curOffset = (curOffset + 0x10) & ~0x0F) {
            var buf = data.toString('ascii', curOffset, curOffset + 0x08);
            if(buf === "PK\u0003\u0004\u0014\u0000\u0002\u0000") {
                zip.byteIndex = curOffset;
                zip.isReady = true;
                console.log(`ZIP 파일을 ${zip.byteIndex} 오프셋에서 발견하였습니다.`);
                break;
            }
        }

        if(zip.isReady) {
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
            throw new Error(`Could not find a zip file in the ${this._mainFileName}`);
        }

        return retZipBuffer;

    }
}

module.exports = Version;