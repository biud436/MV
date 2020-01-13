/**
 * @author biud436
 * @help
 * 
 * ! 사용법 : 
 * 별도로 빌드된 상태에서는 명령 프롬프트를 열고 다음 인수를 필수로 전달해야 합니다.
 * 
 *  encrypter <DESTINATION_FOLDER> <KEY>
 * 
 * 노드로 직접 파일을 실행하려는 경우에는 다음과 같이 해야 합니다.
 * 
 *  node encrypt.js <DESTINATION_FOLDER> <KEY>
 * 
 * 이때 노드로 실행하는 경우에는 명령 프롬프트의 현재 디렉토리 위치에 따라 encrypt.js 파일의 경로를 달리 해야 합니다.
 * 
 * 필수로 적어야 할 인수는 다음과 같습니다.
 * 
 * <DESTINATION_FOLDER> : Windows 기반의 프로젝트 경로 또는 Unix, Posix 기반의 경로 기입
 * index.html 파일이 있어야 정상적인 프로젝트로 인식되며 암호화되지 않은 바닐라 상태의 파일이 있어야 합니다.
 * 미사용 파일을 제거하지 않고 암호화 빌드를 시도하는 것은 적절하지 않습니다.
 * 본래 이 프로그램은 mv-exclude-unused-files로 미사용 파일 제거 후 생성되는 최적화 폴더를 대상으로 합니다.
 * 
 * <KEY> : MD5로 해시할 때 필요한 키 값을 지정해야 합니다. 
 * 헤더를 변형할 때 필요한 값입니다. 
 * RPG Maker MV의 암호화는 전통적으로 단순 헤더 변형이므로 복호화 할 때 암호화 키가 중요하진 않습니다.
 * 
 * 암호화가 가능한 파일은 ogg, m4a, wav, png 파일입니다.
 * wav 파일은 필자가 만든 RS_WaveSupport.js 플러그인을 사용하면 재생이 가능합니다.
 */
const fs = require('fs');
const path = require('path');
const MD5 = require('md5');

const args = process.argv.slice(2);

const Params = {
    raw: args.slice(0),
    dstFolder: null,
    options: null,
    key: null,
}

const config = {
    EncryptExt: [".rpgmvo", ".rpgmvm", ".rpgmvw", ".rpgmvp"],
    DecryptExt: [".ogg", ".m4a", ".wav", ".png"],
};

const Program = {
    checkWithArguments() {

        if(args.length >= 2) {
            Params.dstFolder = args[0].replace(/\\/g, "/");
            Params.key = args[1];
        } else {
            throw new Error(`매개변수가 잘못되었습니다. 매개변수는 <DESTINATION_FOLDER> <KEY>와 같아야 합니다.`);
        }

        this.checkArgs(args[0], "dstFolder");
         
    },
    checkArgs(targetArg, name) {


        const folderName = Params[name];

        if(!targetArg) {
            if(fs.existsSync( path.join( process.cwd().replace(/\\/g, "/"), "index.html"))) {
                Params[name] = process.cwd().replace(/\\/g, "/");
            } else {
                if(fs.existsSync(path.join( process.cwd().replace(/\\/g, "/"), "www", "index.html"))) {
                    Params[name] = path.join( process.cwd().replace(/\\/g, "/"), "www");
                } else {
                    throw new Error(`There is no file in the index.html`);
                }
            }
        } else {
            Params[name] = targetArg.replace(/\\/g, "/");
        }
        
        console.log(`Found index.html file in ${folderName}`);
        
        if(!fs.statSync(folderName).isDirectory()) {
            throw new Error(`You doesn't specify the project folder!`);
        }
        
        if(fs.existsSync(path.join(folderName, "www", "index.html"))) {
            console.log("Found a file named index.html into www folder");
            Params[name] = path.join(folderName, "www");
        }       
    },
    init() {
        this.checkWithArguments();
        
        this._utils = new Utils();
        this._utils.convert();
        
    }
};

class Utils {
    constructor() {
        this._audioDir = path.join(Params.dstFolder, "audio");
        this._imgDir = path.join(Params.dstFolder, "img");
        this._headerlength = 16;

        // 아무런 키가 설정되지 않았을 때
        this._encryptionKey = ["d4", "1d", "8c", "d9", "8f", "00", "b2", "04", "e9", "80", "09", "98", "ec", "f8", "42", "7e"];
    }

    convert() {
        this.readImgFolders();
        this.readAudioFolders();
    }

    generateKey(encryptKey) {
        if(!encryptKey) return;
        var compressedKey = MD5(encryptKey).toString();
        this._encryptionKey = compressedKey.split(/(.{2})/).filter(Boolean);
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

    writeEncryptStream(filePath, bin) {
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
    writeEncryptBinary(data) {
        var arrayBuffer = data;

        var ret = "5250474d560000000003010000000000";
        var retBytes = new Uint8Array(16);
        for (i = 0; i < this._headerlength; i++) {
            refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
        }

        var resultBuffer = new ArrayBuffer(refBytes.byteLength + arrayBuffer.byteLength);
        var view = new DataView(resultBuffer);

        this.generateKey(Params.key);

        // source data
        var resultArray = new Uint8Array(resultBuffer);
        var byteArray = new Uint8Array(arrayBuffer);    
        
        // RPGMV 헤더
        for (i = 0; i < this._headerlength; i++) {
            resultArray[i] = refBytes[i];
            view.setUint8(i, resultArray[i]);
        }
        
        // 기존 파일의 헤더 (MD5로 난독화됨)
        for (i = 0x10; i < 0x20; i++) {
            resultArray[i] = byteArray[i - 16] ^ parseInt(this._encryptionKey[i - 16], 16);
            view.setUint8(i, resultArray[i]);
        }

        for (i = 0x20; i < resultArray.length; i++) {
            resultArray[i] = byteArray[i -  16];
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
        var types = [".ogg", ".m4a", ".wav"];
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
                case '.ogg':
                    retPath = path.join(path.dirname(file), `${filename}.ogg`);
                    break;
                case '.m4a':
                    retPath = path.join(path.dirname(file), `${filename}.m4a`);
                    break;
                case '.wav':
                    retPath = path.join(path.dirname(file), `${filename}.wav`);
            }

            var buffer = this.toBuffer(this.writeEncryptBinary(data));
            this.writeEncryptStream(retPath, buffer);

            fs.removeSync(file);

        });
    }

    readImgFolders() {
        var files = [];
        var types = [".png"];
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

            if(ext === '.png') {
                retPath = path.join(path.dirname(file), `${filename}.rpgmvp`);
            }

            var buffer = this.toBuffer(this.writeEncryptBinary(data));
            this.writeEncryptStream(retPath, buffer);

            fs.removeSync(file);

        });

    }

}

