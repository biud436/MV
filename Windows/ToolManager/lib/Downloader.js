/**
 * @author biud436
 * @help
 */

const Aria2c = require('./Aria2c');
const fs = require('fs-extra');
const path = require('path');
const DecompressZip = require('decompress-zip');
const fileGet = require("./fileGet");
const async = require('async');
const { promisify } = require('util');
const readdirAsync = promisify(fs.readdir);
const Color = require("./ConsoleColor");

let config = {
    referrer : `https://dl.nwjs.io/`,
    userAgent : `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36`,
    inputFile : "input.txt",
    logFile : "log.txt",
};

String.prototype.splitOnLast = function (e) {
    var t = this.lastIndexOf(e) + 1;
    return 0 > t ? this : this.substr(t);
};

class Downloader {

    constructor(data) {
        this.initMembers(data);
        this.checkAria2c();
    }

    initMembers(data) {
        this._mainPath = data.mainPath;
        this._outputPath = data.outputPath;
        this._version = data.version;
        this._projectPath = data.projectPath;
        this._isForceHttps = data.forceHttps === "true";

        this._output = [];
        this._isAria2c = false;
    }

    processLine(line) {
        const filename = line.splitOnLast("/");
        this._output.push(line);
        this._output.push(`  dir=${this._outputPath}`);
        this._output.push(`  out=${filename}`);
    }

    checkAria2c() {
        
        const env = process.env["PATH"].split(";");
        const needed = env.filter(dir => dir.indexOf("aria") >= 0);
        needed.forEach(i => {
            if(fs.existsSync(path.join(i.replace(/\\/g, "/"), "aria2c.exe"))) {
                console.log("aria2c.exe 파일을 찾았습니다.");
                this._isAria2c = true;
            }
        });
    }

    removeFiles() {
        const files = {
            input: path.join(this._mainPath, "input.txt").replace( /\\/g, '/' ),
            log: path.join(this._mainPath, "log.txt").replace( /\\/g, '/' ),
        };

        if(fs.existsSync(files.input)) fs.removeSync(files.input);
        if(fs.existsSync(files.log)) fs.removeSync(files.log); 
    }

    async *readOutputFolder() {
        try {
            const dir = await readdirAsync(this._outputPath).catch(err => {
                throw new Error(err);
            });
            for (const file of dir) {
                yield file;
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    async unzip() {

        try {

            const files = await this.readOutputFolder();

            for await (const file of files) {
                const realPath = path.join(this._outputPath, file);
                const unzipper = new DecompressZip(realPath);
    
                if(fs.existsSync(realPath)) {
                    unzipper.on('error', (err) => console.log(err));
                    unzipper.on('extract', (log) => {
                        console.log('압축 해제를 완료하였습니다.');
                        fs.removeSync(realPath);
                        
                        let dt = file.split("."); 
                        dt.pop();
                        dt = dt.join(".");

                        if(process.platform === "win32") {
                            this.createRunFile(path.join(this._outputPath, dt, "play.bat"));
                        } else {
                            throw new Error(`${process.platform}은 아직 지원하지 않습니다. ${Color.BgRed}(맥이 없어서 테스트 불가능!)${Color.Reset}`);
                        }
    
                    });
                    unzipper.on('progress', function (fileIndex, fileCount) {
                        console.log('압축 해제 중 : ' + (fileIndex + 1) + ' of ' + fileCount);
                    });
                    unzipper.extract({
                        path: path.join(this._outputPath),
                        filter: function (file) {
                            return file.type !== "SymbolicLink";
                        }
                    });
                }
    
            }

        } catch(err) {
            console.error(err);
        }

    }

    createRunFile(filepath) {

        let contents = `
@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

set ARGS1=%~dp1
ECHO Current Path : %~dp0

ECHO RUN INDEX FILE : %ARGS1%index.html
${this._version > "v0.12.3" ? "%~dp0nw.exe %ARGS1% test": "start %~dp0nw.exe --url=%ARGS1%index.html?test"}

@ENDLOCAL
GOTO :EOF

:ERR
ECHO %ERRORMSG%
GOTO :EOF`;

        fs.writeFileSync(filepath, contents, "utf8");

        // 버전 텍스트에서 중간 버전 문자열을 획득한다.
        let v = 0;
        if(/^[Vv](\d+)\.(\d+)\.(\d+)$/i.exec(this._version)) {
            v = RegExp.$2;
        }
        
        // package.json 때문에 충돌 문제가 생기므로 npm run add에서 node로 변경해야 한다.
        contents = `node ..\\..\\index.js --add "play.bat" "${this._version}" "${v}" "${path.dirname(filepath)}"`

        let rootFolder = path.dirname(filepath);
        fs.writeFileSync(path.join(rootFolder, "add.bat"), contents, "utf8");

        const packageJson = {
            "name": "",
            "main": "www/index.html",
            "js-flags": "--expose-gc",
            "chromium-args": "--javascript-harmony",
            "window": {
                "title": "",
                "toolbar": false,
                "width": 816,
                "height": 624
            }
        };
        
        fs.writeFileSync(path.join(rootFolder, "package.json"), JSON.stringify(packageJson, null, "  "), "utf8");

    }

    async start() {

        try  {

            const version = this._version;

            if(!version) {
                throw new Error(`버전 텍스트가 없습니다.`);
            }

            const NW_SDK = version > "v0.12.3" ? "nwjs-sdk":"nwjs";

            let osType = {
                "win32": "win",
                "linux": "linux",
                "darwin": "osx",
            };

            if(!osType[process.platform]) {
                throw new Error(`지원하지 않는 OS 입니다.`);
            }
    
            const needed_files = [
                `https://dl.nwjs.io/${version}/${NW_SDK}-${version}-${osType[process.platform]}-${process.arch}.${process.platform === "linux" ? "tar.gz" : "zip"}`
            ];

            if(this._isForceHttps) {
                this._isAria2c = false;
            }
    
            if(this._isAria2c) {
    
                needed_files.forEach(line => {
                    this.processLine(line);
                });
        
                let outputRaw = this._output.join("\r\n");
        
                fs.writeFileSync(config.inputFile, outputRaw, "utf8");
        
                let header = {
                    referrer : config.referrer,
                    userAgent : config.userAgent,
                    inputFile : `${config.inputFile}`,
                    logFile : `${this._mainPath}/${config.logFile}`,
                };        
        
                // Create Aria2c
                let aria2cProcess = new Aria2c(header, function(err, stdout, stderr) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                });
                    
                aria2cProcess.onExit((code, signal) => {
                    console.log(`${Color.FgRed}다운로드가 완료되었습니다${Color.Reset}`);
                    
                    this.removeFiles();
                    this.unzip().catch(e => {
                        throw new Error(e);
                    });
                });
                
                aria2cProcess.pendingTerminate();   
    
            } else {
    
                if(!fs.existsSync(this._outputPath)) {
                    fs.mkdirSync(this._outputPath);
                }

                let functionTables = [];
                let counter = 0;

                needed_files.forEach(e => {
                    functionTables.push((callback) => {     
                        const fileUrl = needed_files[counter];
                        const filename = needed_files[counter++].splitOnLast("/");

                        console.log(`동시 다운로드 시작 : ${fileUrl}, ${filename}`);
                        fileGet.downFileZipAsync(fileUrl, path.join(this._outputPath, filename)).then(res => {
                            callback(null, fileUrl);
                        }).catch(err => {
                            callback(err, null);
                        });
                    });
                });

                async.parallel(functionTables, (err, results) => {
                    if(err) {
                        throw new Error(err);
                    }

                    console.log(`${Color.FgRed}다운로드가 완료되었습니다${Color.Reset}`);

                    this.unzip().catch(e => {
                        throw new Error(e);
                    });
                });

            }

        } catch(e) {
            throw new Error(e);
        }

    }

}

class NodeWebkitRunner extends Downloader {
    async start() {
        try  {

            const files = await this.readOutputFolder();
            let isValidNW = false;

            for await (const file of files) {
                const realPath = path.join(this._outputPath, file).replace(/\\/g, "/");
                const stat = fs.lstatSync(realPath);
                if(stat.isDirectory()) {
                    let filename = path.join(realPath, 'nw.exe');
                    if(fs.existsSync(filename)) {
                        isValidNW = true;
                        console.log(`nw.exe를 찾았습니다.`);
                    }
                }
            }       
            
            if(isValidNW) {
                const NodeWebkit = require('./NW');

                const nwProcess = new NodeWebkit({
                    projectPath : this._projectPath, 
                    version: this._version, 
                    outputPath: this._outputPath,
                }, function(err, stdout, stderr) {
                    if(err) {
                        console.log(err);
                        return;
                    }
                });

                nwProcess.onExit((code, signal) => {
                    console.log(`${Color.FgYellow}노드 웹킷 프로세스가 종료되었습니다.${Color.Reset}`);
                });
                
                nwProcess.pendingTerminate();

                return;
            }
        } catch(e) {
            throw new Error(e);
        }
    }    
}

module.exports = {
    Downloader,
    NodeWebkitRunner
};