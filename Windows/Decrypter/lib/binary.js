/**
 * @author biud436
 */
const fs = require('fs-extra');
const path = require('path');
const Version = require("./version");
const DecompressZip = require('decompress-zip');

class Utils {
    constructor(binaryPath, mainFile, callback) {
        
        // 실행 파일이 있는 지 확인합니다.
        if(fs.existsSync(path.join(binaryPath, mainFile))) {
            this._binPath = binaryPath;
        } else {
            throw new Error(`${mainFile} 파일이 없습니다.`);
        }

        console.log("RPG Maker MV로 만들어진 게임인지 확인하고 있습니다.");
        this._gameBin = new Version(this._binPath, mainFile);

        if(this._gameBin.version !== "v0.0.0") {
            
            console.log(`Node.js ${this._gameBin.version} 버전이 감지되었습니다.`);
            
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
            throw new Error("RPG Maker MV로 만들어진 게임이 아닙니다.");
        }
    }
}

module.exports = Utils;