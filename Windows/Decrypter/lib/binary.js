/**
 * @author biud436
 */
const fs = require('fs-extra');
const path = require('path');
const RawFileReader = require("./RawFileReader");
const DecompressZip = require('decompress-zip');
const ConsoleColor = require("./ConsoleColor");

class Utils {
    constructor(binaryPath, mainFile, callback) {
        
        // 실행 파일이 있는 지 확인합니다.
        if(fs.existsSync(path.join(binaryPath, mainFile))) {
            this._binPath = binaryPath;
        } else {
            throw new Error(`${mainFile} 파일이 없습니다.`);
        }

        console.log(`${ConsoleColor.BgBlue}RPG Maker MV${ConsoleColor.Reset}로 만들어진 게임인지 확인하고 있습니다.`);
        this._gameBin = new RawFileReader(this._binPath, mainFile);

        if(this._gameBin.isValid()) {

            if(this._gameBin._isEnigma) {
                console.log(`Node.js ${ConsoleColor.BgYellow}${this._gameBin.version}${ConsoleColor.Reset}을 사용 중입니다.`);    
                return;
            }
            
            console.log(`Node.js ${ConsoleColor.BgYellow}${this._gameBin.version}${ConsoleColor.Reset} 버전을 사용 중인 프로그램으로 보여집니다`);

            var zipFile;

            try {
                zipFile = this._gameBin.extractZip(binaryPath);
            } catch(e) {
                throw new Error(e.message);
            }

            var zipPath = path.join(binaryPath, "nw.zip");

            var writeStream = fs.createWriteStream( zipPath,  {flags: 'w+'});
            writeStream.write( zipFile );
            writeStream.end();
            writeStream.on('finish', function() {
                console.log(`압축 파일을 ${zipPath}에 성공적으로 추출하였습니다`);
            });

            var unzipper = new DecompressZip(zipPath);

            unzipper.on('error', function (err) {
                console.log(err);
            });
             
            unzipper.on('extract', function (log) {
                console.log('압축 해제를 완료하였습니다.');
                fs.removeSync(zipPath);
                callback();
            });
             
            unzipper.on('progress', function (fileIndex, fileCount) {
                console.log('압축 해제 중 : ' + (fileIndex + 1) + ' of ' + fileCount);
            });
             
            unzipper.extract({
                path: path.join(binaryPath),
                filter: function (file) {
                    return file.type !== "SymbolicLink";
                }
            });

        } else {
            throw new Error(`암호화 해제에 실패하였습니다. 
            \rRPG Maker MV로 만들어진 게임이 아니거나 암호화 방식이 뭔가 다른 것 같습니다.`);
        }
    }
}

module.exports = Utils;