/**
 * node PluginParser.js -f="C:\Users\U\Desktop\TrashcanDungeon\gamedata"
 */

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));

const Color = {
    Reset : "\x1b[0m",
    Bright : "\x1b[1m",
    Dim : "\x1b[2m",
    Underscore : "\x1b[4m",
    Blink : "\x1b[5m",
    Reverse : "\x1b[7m",
    Hidden : "\x1b[8m",
    
    FgBlack : "\x1b[30m",
    FgRed : "\x1b[31m",
    FgGreen : "\x1b[32m",
    FgYellow : "\x1b[33m",
    FgBlue : "\x1b[34m",
    FgMagenta : "\x1b[35m",
    FgCyan : "\x1b[36m",
    FgWhite : "\x1b[37m",
    
    BgBlack : "\x1b[40m",
    BgRed : "\x1b[41m",
    BgGreen : "\x1b[42m",
    BgYellow : "\x1b[43m",
    BgBlue : "\x1b[44m",
    BgMagenta : "\x1b[45m",
    BgCyan : "\x1b[46m",
    BgWhite : "\x1b[47m",    
};

class Parser extends String {
    constructor(str) {
        super(str);
        this._data = this.splitOnLast("@");
        
        const item = this._data.split(" ");
        try {
            this._type = item[0];
            this._name = item[1];
            this._desc = item.slice(1).join(" ");
        } catch {
            this._type = "";
            this._name = "";
            this._desc = "";
        }

    }

    splitOnLast(e) {
        let t = this.lastIndexOf(e) + 1;
        return 0 > t ? this : this.substr(t);
    }

    get type() {
        return this._type;
    }

    get name() {
        return this._name;
    }

    get desc() {
        return this._desc;
    }

    /**
     * @param {String} line 
     */
    static parse(line) {
        if(line.trim().includes("@")) {
            return new Parser(line);
        }
    }

    static ready(line) {
        return new Parser(line);
    }
}

class App {

    start() {

        let targetDir;
        let list = [];
        let isValid = false;
        let lastCommand = "";

        let tempData = {
            arg: {
                lastKey: "",
                lastValue: "",
                data : {},
            },
            param: {
                lastKey: "",
                lastValue: "",
                data : {},
            }
        };

        const targetFile = argv.f.replace( /\\/g, '/' );
        const stat = fs.lstatSync(targetFile);
        if(stat.isDirectory()) {
            targetDir = path.join(targetFile, "js", "plugins");
            list = fs.readdirSync(targetDir.replace( /\\/g, '/' ));
        } else {
            targetDir = path.dirname(targetFile);
            list.push(Parser.ready(targetFile).splitOnLast("/"));
        }

        list.forEach(f => {
            const filename = path.join(targetDir, f);
            const fileStream = fs.createReadStream(filename, 'utf8');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
            console.log("%s%s%s", Color.BgBlue, filename, Color.Reset);
            rl.on('line', line => {
                if(line.indexOf("/*:") >= 0) isValid = true;
                if(isValid) {
                    const cmt = Parser.parse(line);

                    if(!cmt) {
                        return;
                    }

                    switch(cmt.type) {
                        case "param":
                            console.log("@param %s%s%s", Color.BgBlack, cmt.desc, Color.Reset);
                            lastCommand = "param";
                            tempData.param.lastKey = cmt.desc.slice(0);
                            break;
                        case "command":
                            console.log("@command %s%s%s", Color.BgRed, cmt.desc, Color.Reset);
                            lastCommand = "command";
                            break;
                        case "arg":
                            console.log("@arg %s%s%s", Color.BgGreen, cmt.name, Color.Reset);
                            tempData.arg.lastKey = cmt.desc.slice(0);
                            break;
                        case "type":
                            if(["command", "param"].includes(lastCommand)) {
                                console.log("@type %s%s%s", Color.FgRed, cmt.name, Color.Reset);
                            }
                            break;                            
                        case "desc":
                            // 한 줄만 지원.
                            console.log("@desc %s%s%s", Color.FgWhite, cmt.desc, Color.Reset);
                            break;
                        case "default":
                            console.log("@default %s%s%s", Color.FgYellow, cmt.desc, Color.Reset);
                            
                            let type = "";
                            if(lastCommand === "param") {
                                type = "param";
                            } else if(lastCommand === "command") {
                                type = "arg";
                            }
   
                            if(tempData[type].lastKey) {
                                tempData[type].lastValue = cmt.desc.slice(0);
                            }
                            if(tempData[type].lastKey != "") {
                                tempData[type].data[tempData[type].lastKey] = tempData[type].lastValue;
                                tempData[type].lastKey = "";
                                tempData[type].lastValue = "";
                            }         
                            break;
                        case "":
                            break;
                    }

                    if(line.indexOf("*/") >= 0) {
                        isValid = false;
                    }
                }
            });
            rl.on('close', () => {
                for(const i in tempData) {
                    // const data = JSON.stringify(tempData[i].data, null,i === "param" ? "\t":"");
                    const data = JSON.stringify(tempData[i].data);
                    console.log(`${i} parse : %s%s%s`, Color.FgYellow, data, Color.Reset);
                    fs.writeFileSync(`./output_${i}.json`, data, "utf8");
                    console.log("파일 작성 완료");
                }
            });            
        })
    }
}

const app = new App();
app.start();