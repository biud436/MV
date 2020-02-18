/**
 * @author biud436
 * @description
 * 초고속으로 파일을 다운로드를 받습니다.
 */

var __aria2cPath = "aria2c";
const cp = require('child_process');

class Aria2c
{

    get internel() {
        return this._process;
    }

    /**
     * 
     * @param {{
        referrer : string,
        userAgent : string,
        inputFile : string,
        logFile : string,
    }} header 
     * @param {*} callback 
     */
    constructor(header, callback) {
        this._header = header;
        this._callback = callback;
        this._process = null;
        this._args = null;

        this.makeCommand();
        this.run();

    }

    makeCommand() {        
        const referrer = this._header.referrer;
        const userAgent = this._header.userAgent;
        const inputFile = this._header.inputFile;
        const logFile = this._header.logFile;

        this._args = [
            `--referer=${referrer}`, 
            `--user-agent=${userAgent}`, 
            `--show-files`, 
            `--continue=true`, 
            `--retry-wait=2`,
            `--split=6`,
            `-i ${inputFile}`, 
            `--log-level=info`
        ];
    };

    run() {
        this._process = cp.execFile(
            __aria2cPath, 
            this._args, 
            {
                encoding: 'utf8', 
                maxBuffer: 1024 * 1024
            }, 
            this._callback
        );
        this._process.stdout.on('data', function (data) {
            console.clear();
            console.log(data);
        });
        this._process.stdout.on('end', function (data) {
            console.log(data);
        });        
        this._process.stdin.end();         
        return this;
    }

    pendingTerminate() {
        if(!this._process) return;
        this._process.on("beforeExit", () => this._process.kill());
    }

    onExit(callback) {
        if(!this._process) return;
        this._process.on("exit", callback);
    }

}

module.exports = Aria2c;