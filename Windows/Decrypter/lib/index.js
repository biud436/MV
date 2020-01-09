/**
 * @author biud436
 * 
 * node index.js C:\Users\U\Desktop\Exam2\201907
 */
const fs = require('fs-extra');
const path = require('path');
const args = process.argv.slice(2);
let mainPath;

if(!args[0]) {
    if(fs.existsSync( path.join( process.cwd().replace(/\\/g, "/"), "index.html"))) {
        console.log("... ... ...");
        mainPath = process.cwd().replace(/\\/g, "/");
    } else {
        if(fs.existsSync(path.join( process.cwd().replace(/\\/g, "/"), "www", "index.html"))) {
            mainPath = path.join( process.cwd().replace(/\\/g, "/"), "www");
        } else {
            throw new Error(`There is no folder called ${mainPath}`);
        }
    }
} else {
    mainPath = args[0].replace(/\\/g, "/");
}

console.log(mainPath);

if(!fs.statSync(mainPath).isDirectory()) {
    throw new Error(`You doesn't specify the project folder!`);
}

if(fs.existsSync(path.join(mainPath, "www", "index.html"))) {
    console.log("Found a file named index.html into www folder");
    mainPath = path.join(mainPath, "www");
}

const config = {
    EncryptExt: [".rpgmvo", ".rpgmvm", ".rpgmvw", ".rpgmvp"],
    DecryptExt: [".ogg", ".m4a", ".wav", ".png"],
    OriginHeaders: {
        ogg: ["4F", "67", "67", "53" , "00", "02", "00", "00", "00" ,"00" ,"00" ,"00" ,"00" ,"00" ,"E0" ,"4B"],
        m4a: ["00", "00", "00", "20", "66", "74", "79", "70", "4D", "34", "41", "20", "00", "00", "00", "00"],
        png: ["89", "50", "4E", "47", "0D", "0A", "1A", "0A", "00", "00", "00", "0D", "49", "48", "44", "52"],
        wav: ["52", "49", "46", "46", "24", "3C", "00", "00", "57", "41", "56", "45", "66", "6D", "74", "20"]
    }
};

class Utils {
    constructor() {
        this._audioDir = path.join(mainPath, "audio");
        this._imgDir = path.join(mainPath, "img");
        this._headerlength = 16;
    }

    convert() {
        this.readImgFolders();
        this.readAudioFolders();
        this.createProjectFile();
    }

    /**
     * 
     * @param {ArrayBuffer} bin 
     * @return {Buffer}
     */
    toBuffer(bin) {
        var buf = Buffer.alloc(bin.byteLength);
        var headerView = new Uint8Array(bin);
        for (var i = 0; i < bin.byteLength; i++) {
            buf[i] = headerView[i];
        }
        return buf;
    }

    writeDecryptStream(filePath, bin) {
        var writeStream = fs.createWriteStream( filePath,  {flags: 'w+'});
        writeStream.write( bin );
        writeStream.end();
        writeStream.on('finish', function() {
            console.log(`done : ${filePath}`);
        });
    };    

    /**
     * 
     * @param {Array<string>} ret 
     * @param {Buffer} data 
     * @return {ArrayBuffer}
     */
    writeBinary(ret, data) {

        var arrayBuffer = data;

        var refBytes = new Uint8Array(16);
        for (var i = 0; i < this._headerlength; i++) {
            refBytes[i] = parseInt("0x" + ret[i], 16);
        }

        // 원래 데이터로 변경하려면 조작된 헤더 32바이트를 제거해야 한다.
        var paddingBytes = new Uint8Array(32);

        var resultBuffer = new ArrayBuffer(refBytes.byteLength + (data.byteLength - paddingBytes.byteLength));
        var view = new DataView(resultBuffer);

        // ArrayBuffer를 조작하려면 DataView와 Uint8Array가 필요하다.
        var resultArray = new Uint8Array(resultBuffer);
        var byteArray = new Uint8Array(arrayBuffer);

        // 파일 헤더를 원래대로 되돌린다.
        for (var i = 0; i < this._headerlength; i++) {
            resultArray[i] = refBytes[i];
            view.setUint8(i, resultArray[i]);
        }

        // 나머지 부분을 작성한다.
        for (var i = 0x10; i < resultArray.length; i++) {
            resultArray[i] = byteArray[i +  0x10]; // 0x00 ~ 0x1F까지는 필요 없는 부분이므로 0x20부터 읽어야 한다.
            view.setUint8(i, resultArray[i]);
        }

        return resultBuffer;

    }

    readAllFiles(root, ext, files) { 
        if(!root) return;
        var self = this;
        if(!fs.existsSync(root)) return;
        var contents = fs.readdirSync(root, 'utf8');

        contents = contents.map(function(e) {
            return path.join(root, e);
        });
        contents.forEach(function(sub) {
            if(fs.statSync(sub).isDirectory()) {
                self.readAllFiles(sub, ext, files);
            } else if(fs.statSync(sub).isFile()) {
                if(ext.indexOf(path.extname(sub)) >= 0) {
                    files.push(sub.replace(/\\/g, "/"));
                }
            }
        });
    }
  
    readAudioFolders() {
        var files = [];
        var types = [".rpgmvo", ".rpgmvm", ".rpgmvw"];
        this.readAllFiles(this._audioDir.replace(/\\/g, "/"), types, files);

        files.forEach(file => {
                    
            var rootFilename = file;

            if(!fs.lstatSync(rootFilename).isFile()) {
                return;
            }                
            
            // 전체 경로를 포함하지 않은 순수 파일명
            var tempFileName = file.split("/").slice(-1)[0];

            console.log(tempFileName);

            var ext = path.extname(file);

            // 암호화된 파일인가?
            if(types.indexOf(ext) === -1) {
                return;
            }
            
            var ret;
            var retPath;

            // 파일을 읽고 버퍼로 반환
            var data = fs.readFileSync(file);

            var filename = tempFileName.split(".")[0];

            switch(ext) {
                default:
                case '.rpgmvo':
                    ret = config.OriginHeaders.ogg;        
                    retPath = path.join(path.dirname(file), `${filename}.ogg`);
                    break;
                case '.rpgmvm':
                    ret = config.OriginHeaders.m4a;
                    retPath = path.join(path.dirname(file), `${filename}.m4a`);
                    break;
                case '.rpgmvw':
                    ret = config.OriginHeaders.wav;
                    retPath = path.join(path.dirname(file), `${filename}.wav`);
            }

            var buffer = this.toBuffer(this.writeBinary(ret, data));
            this.writeDecryptStream(retPath, buffer);

            fs.removeSync(file);

        });
    }

    readImgFolders() {
        var files = [];
        var types = [".rpgmvp"];
        this.readAllFiles(this._imgDir.replace(/\\/g, "/"), types, files);

        files.forEach(file => {
                    
            // 전체 경로를 포함한 파일명
            var rootFilename = file;

            if(!fs.lstatSync(rootFilename).isFile()) {
                // 재귀 필요.
                return;
            }                
            
            // 전체 경로를 포함하지 않은 순수 파일명
            var tempFileName = file.split("/").slice(-1)[0];

            console.log(tempFileName);

            var ext = path.extname(file);

            // 암호화된 파일인가?
            if(types.indexOf(ext) === -1) {
                return;
            }
            
            var ret;
            var retPath;

            // 파일을 읽고 버퍼로 반환
            var data = fs.readFileSync(file);

            var filename = tempFileName.split(".")[0];

            if(ext === '.rpgmvp') {
                ret = config.OriginHeaders.png;        
                retPath = path.join(path.dirname(file), `${filename}.png`);               
            }

            var buffer = this.toBuffer(this.writeBinary(ret, data));
            this.writeDecryptStream(retPath, buffer);

            fs.removeSync(file);

        });

    }

    createProjectFile() {
        const targetFile = path.join(mainPath, "Game.rpgproject");
        const PRODUCT_VERSION = `1.6.2`;
        if(!fs.existsSync(targetFile)) {
            fs.writeFileSync(targetFile, `RPGMV ${PRODUCT_VERSION}`, "utf8");
        }
    }

}

var utils = new Utils();
utils.convert();