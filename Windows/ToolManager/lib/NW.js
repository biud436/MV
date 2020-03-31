const __execPath = `nw.exe`;
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

class NodeWebkit
{

    get internel() {
        return this._process;
    }

    constructor(data, callback) {

        this._projectPath = data.projectPath.replace(/\\/g, "/");
        this._version = data.version;
        this._outputPath = data.outputPath.replace(/\\/g, "/");
    
        this._callback = callback;
        this._process = null;
        this._args = null;
        this._execPath = null;

        this.makeCommand();
        this.run();

    }

    readNW() {
        try {
            const readFiles = fs.readdirSync(this._version, "utf8");

            return readFiles;

        } catch(e) {
            throw new Error(e);
        }
    }

    makeCommand() {        
        const indexFile = path.join(this._projectPath, "index.html");

        if(!fs.existsSync(indexFile)) {
            throw new Error("Can not find the file named index.html");
        }

        this._args = [
            this._projectPath,
            this._version <= "v0.12.3" ? `--url=${indexFile}?&test` : "index.html?&test"
        ];

        const files = this.readNW();
        const applications = [];

        for (const file of files) {
            const realPath = path.join(this._outputPath, file);
            const fileStat = fs.lstatSync(realPath);

            if(fileStat.isDirectory()) {
                const targetFile = path.join(realPath, `nw.exe`);
                if(fs.existsSync(targetFile) && file.indexOf("nwjs") >= 0) {
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