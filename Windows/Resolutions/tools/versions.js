/**
 * @author biud436
 * @help
 * 2020.03.29 :
 *  - Removed the node module called "win-version-info"
 */

const subprocess = require('./subprocess');
const path = require('path')
const fs = require('fs')
const cp = require('child_process');
const { deepParseJson } = require('deep-parse-json');

class App {

    constructor() {
    }

    async initMembers() {
        this._mvPath = await this.getApplicationPath();
        this._mvVersion = await this.getApplicationVersion(this._mvPath);

        const rmmvPath = path.dirname(this._mvPath);

        if(this._mvVersion >= "1.6.1") {
            console.log(this.readNodeVersion(rmmvPath));
        } else {
            console.log(this.readNodeVersionForOlder(rmmvPath));
        }
    }

    getCoreJSFile(basePath) {
        var filePath = path.join(basePath, "NewData", "js", "rpg_core.js");
        return filePath;
    }
    
    getRPGMV(basePath) {
        var filePath = path.join(basePath, "RPGMV.exe");
        return filePath;
    }
        
    readNodeVersion(rmmvPath) {
        var dllFile = path.join(rmmvPath, "nwjs-win", "node.dll");
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
    
    readNodeVersionForOlder(rmmvPath) {
        var dllFile = path.join(rmmvPath, "nwjs-win", "Game.exe");
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

    getApplicationPath() {
 
        return new Promise((resolve, reject) => {

            if(!process.platform.includes("win")) {
                reject("Your computer is not window platform");
            }
    
            let subKey = process.arch === "x64" ? `Registry::HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\KADOKAWA\\RPGMV` : `Registry::HKEY_LOCAL_MACHINE\\SOFTWARE\\KADOKAWA\\RPGMV`;
            let command = `powershell -Command "Get-ItemProperty -Path ${subKey} | ConvertTo-Json"`;
    
            const powershell = cp.exec(command, {
                encoding: 'utf8',
                shell: true
            }, (err, stdout, stderr) => {
                if(err) {
                    reject(err);
                }
                const item = deepParseJson(stdout);
                const rmmvPath = item["applicationpath"].replace(/\\/g, "/");
    
                resolve(path.join(rmmvPath, "RPGMV.exe"));
            });
    
            powershell.on("exit", (code, signal) => {
    
            });            
            
        });

    }

    getApplicationVersion(mvPath) {
 
        return new Promise((resolve, reject) => {

            if(!process.platform.includes("win")) {
                reject("Your computer is not window platform");
            }
    
            let command = `powershell -Command "(Get-Item '${mvPath}').VersionInfo | ConvertTo-Json"`;
    
            const powershell = cp.exec(command, {
                encoding: 'utf8',
                shell: true
            }, (err, stdout, stderr) => {
                if(err) {
                    reject(err);
                }
                const item = deepParseJson(stdout);
                
                resolve(`${item.FileMajorPart}.${item.FileMinorPart}.${item.FileBuildPart}`);
            });
    
            powershell.on("exit", (code, signal) => {
    
            });
            
        });

    }

}

new App().initMembers();