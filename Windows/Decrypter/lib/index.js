/**
 * @author biud436
 * @help
 */
const fs = require('fs-extra');
const path = require('path');
const args = process.argv.slice(2);
const ZipUtils = require('./binary');
const ConsoleColor = require("./ConsoleColor");
const { deepParseJson } = require('deep-parse-json');
const stringifyObject = require('stringify-object');
const argv = require('minimist')(process.argv.slice(2));

let mainPath;

/**
 * 
 */
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

/**
 * 실행 파일 내에 압축된 파일이나 파일이 있는 지 확인하고 추출한다
 * @param {Function} callback 
 */
async function extractResourceFiles(callback) {
    return await new Promise((resolve, reject) => {
        if(argv.d) {
            var filename = argv.d;
            try  {
                var zipUtils = new ZipUtils(mainPath, filename, callback);
                resolve();
            } catch(e) {
                reject(e);
            }
        }
    });
}

if(!argv.i) {
    if(fs.existsSync( path.join( process.cwd().replace(/\\/g, "/"), "index.html"))) {
        mainPath = process.cwd().replace(/\\/g, "/");
    } else {
        if(fs.existsSync(path.join( process.cwd().replace(/\\/g, "/"), "www", "index.html"))) {
            mainPath = path.join( process.cwd().replace(/\\/g, "/"), "www");
        }
    }
} else {
    mainPath = argv.i.replace(/\\/g, "/");
}

class App {
    static run() {
        if(!fs.statSync(mainPath).isDirectory()) {
            throw new Error(`You doesn't specify the project folder!`);
        }
        
        if(fs.existsSync(path.join(mainPath, "www", "index.html"))) {
            console.log(`Found a file named ${ConsoleColor.Bright}index.html${ConsoleColor.Reset} into www folder`);
            mainPath = path.join(mainPath, "www");
            this.decrypt();
        } else {
            extractResourceFiles(() => {
                mainPath = path.join( mainPath.replace(/\\/g, "/"), "www");
                this.decrypt();
            }).catch(e => {
                throw new Error(e.message);
            });
        }
    }

    static decrypt() {
        this._utils = new Utils();
        this._utils.convert();        
    }
}

class Utils {
    constructor() {
        this._audioDir = path.join(mainPath, "audio");
        this._imgDir = path.join(mainPath, "img");
        this._headerlength = 16;        
    }

    convert() {
        this._encryptionKey = this.readEncryptionKey();
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
            console.log(`${ConsoleColor.BgGreen}done : ${ConsoleColor.Reset}${filePath}`);
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
            resultArray[i] = byteArray[i + 0x10] ^ parseInt(this._encryptionKey[i], 16);
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

        if(files.length === 0) {
            console.warn(`${ConsoleColor.BgRed}암호화된 오디오 파일이 없습니다.${ConsoleColor.Reset}`);
        }

        files.forEach(file => {
                    
            var rootFilename = file;

            if(!fs.lstatSync(rootFilename).isFile()) {
                return;
            }                
            
            // 전체 경로를 포함하지 않은 순수 파일명
            var tempFileName = file.split("/").slice(-1)[0];

            console.log(`${ConsoleColor.BgBlue}${tempFileName}${ConsoleColor.Reset}`);

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

        if(files.length === 0) {
            console.warn(`${ConsoleColor.BgRed}암호화된 이미지 파일이 없습니다.${ConsoleColor.Reset}`);
        }        

        files.forEach(file => {
                    
            // 전체 경로를 포함한 파일명
            var rootFilename = file;

            if(!fs.lstatSync(rootFilename).isFile()) {
                // 재귀 필요.
                return;
            }                
            
            // 전체 경로를 포함하지 않은 순수 파일명
            var tempFileName = file.split("/").slice(-1)[0];

            console.log(`${ConsoleColor.BgCyan}${tempFileName}${ConsoleColor.Reset}`);

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

    readEncryptionKey() {
        const targetFile = path.join(mainPath, "data", "System.json");
        let retKey = ["d4", "1d", "8c", "d9", "8f", "00", "b2", "04", "e9", "80", "09", "98", "ec", "f8", "42", "7e"];
        
        // data 폴더를 읽는다 (재귀적으로 처리하지 않음)
        const files = fs.readdirSync(path.join(mainPath, "data"));

        // nwjc로 컴파일된 자바스크립트 파일이 존재하는 지 찾는다.        
        const binFiles = files.filter(file => {
            file = path.join(mainPath, "data", file);
            fs.lstatSync(file).isFile() && path.extname(file) === ".bin"
        });

        // 명령행 옵션 /key가 커맨드 라인 인수로 주어졌는 지 확인한다.
        // const neededKeyOption = args.filter(command => {
        //     return command.indexOf("/key=") >= 0;
        // });
        const neededKeyOption = argv.key;

        // nwjc로 컴파일된 자바스크립트 파일이 존재하는 지 확인한다                
        // ASCII로 인코딩된 문자열 값들은 그대로 존재하며 std::string과 유사하여 NULL 바이트를 차지하지 않는다.
        // JSON으로 되어있을 경우, 문자열 버퍼에 encryptionKey가 Key가 있을 경우, 근거리에 문자열로 된 Value가 존재한다.
        if(binFiles.length > 0) {
            
            console.warn([
                "There are binary files in the System folder",
                "so you must pass the decryption key manually.",
                `Pass the option called ${ConsoleColor.FgRed}-key=${ConsoleColor.Reset} to the parameter.`,
            ].join("\r\n"));

            if(neededKeyOption) {
                let key = argv.key;
                retKey = key.split(/(.{2})/).filter(Boolean);
                return retKey;
            }
    
        }

        // System.json이 없는 경우, 
        // ogg 파일을 제대로 디코딩 할 수 없기 때문에 /key 인자로 encryptionKey 값을 직접 할당 받아야 한다.
        // 문자열은 난독화 되지 않기 때문에 Hex Editor로 직접 값을 찾아낼 수도 있다.
        if(!fs.existsSync(targetFile)) {

            if(neededKeyOption) {
                let key = argv.key;
                retKey = key.split(/(.{2})/).filter(Boolean);
                return retKey;
            } else {
                console.warn(`Can not found the file called System.json`);
                throw new Error("");
            }
        }

        // System.json 파일을 읽는다
        let raw = fs.readFileSync(targetFile, "utf8");

        // System.json 파일을 파싱한다.
        // JSON.parse를 재귀적으로 사용하는 경우, 
        // 배열 파싱이 제대로 되지 않기 때문에 deepParseJson 모듈을 사용하였다.
        let system = deepParseJson(raw);

        if(system.hasEncryptedAudio && system.hasEncryptedImages) {

            system.hasEncryptedAudio = false;
            system.hasEncryptedImages = false;

            let contents = JSON.stringify(system);

            fs.writeFileSync(targetFile, contents, {
                encoding: "utf8",
            });

            if(system.encryptionKey) {
                return system.encryptionKey.split(/(.{2})/).filter(Boolean);
            }

        }

        return retKey;

    }

    createProjectFile() {
        const targetFile = path.join(mainPath, "Game.rpgproject");
        const PRODUCT_VERSION = `1.6.2`;
        if(!fs.existsSync(targetFile)) {
            fs.writeFileSync(targetFile, `RPGMV ${PRODUCT_VERSION}`, "utf8");
        }
    }

}

App.run();