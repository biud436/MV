const __execPath = `nw.exe`;
const cp = require('child_process');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

const args = process.argv.slice(2);
const projectPath = path.dirname(args[0]).replace(/\\/g, "/");
const version = args[1];

const readdirAsync = promisify(fs.readdir);
const lstatAsync = promisify(fs.lstat);

class NodeWebkit
{

    get internel() {
        return this._process;
    }

    constructor(callback) {
        this._callback = callback;
        this._process = null;
        this._args = null;
        this._execPath = null;

        this.makeCommand();
        this.run();

    }

    async *readNW() {
        try {
            const readFiles =  await readdirAsync(version);

            for(const file of readFiles) {
                yield file;
            }
        } catch(e) {
            throw new Error(e);
        }

    }

    async makeCommand() {        
        const indexFile = path.join(projectPath, "index.html");

        if(!fs.existsSync(indexFile)) {
            throw new Error("Can not find the file named index.html");
        }

        this._args = [
            `--nwapp`,
            `--url=${indexFile}?test`
        ];

        const files = await this.readNW();
        const applications = [];

        for await (const file of files) {
            const fileStat = await lstatAsync(file);
            if(fileStat.isDirectory()) {
                const targetFile = path.join(file, `nw.exe`);
                if(fs.existsSync(targetFile) && file.indexOf("sdk") >= 0) {
                    applications.push({
                        exec: targetFile,
                        run : true,
                    });
                }
            }
        }        

        if(applications[0] && applications[0].run) {
            this._execPath = applications[0].exec;
        } else {
            throw new Error("Can not find the node module");
        }

    };

    run() {

        if(!this._execPath) {
            throw new Error("Can not find the node module and path");
        }

        this._process = cp.execFile(
            this._execPath, 
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

module.exports = NodeWebkit;