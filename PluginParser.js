/**
 * node PluginParser.js -f="C:\Users\U\Desktop\TrashcanDungeon\gamedata\js\plugins\RS_Window_KorNameEdit.js"
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

class PluginParams {
    constructor() {
        this.lastKey = "";
        this.lastValue = "";
        this.data = {};
        this.name = "";
        this.description = "";
    }
}

class ArgParams {
    constructor() {
        this.lastKey = "";
        this.lastValue = "";
        this.data = {};
        this.texts = [];
    }
}

class ParamFile {
    /**
     * 
     * @param {String} pluginName 
     * @param {{
        lastKey: "",
        lastValue: "",
        data : {},
        name: "",
        description: "",
    }} data 
     */
    constructor(pluginName, data) {
        this._name = pluginName;
        this._data = data;
    }

    create() {
        const data = JSON.stringify(this._data);
        console.log("output(param) : %s%s%s", Color.BgRed, data, Color.Reset);        
        fs.writeFileSync(`./data/output_param.json`, JSON.stringify(this._data), "utf8");
    }
}

class ArgFile {
    constructor(pluginName, data) {
        this._name = pluginName;
        this._data = data;
    }

    create() {
        const data = JSON.stringify(this._data);
        console.log("output(arg) : %s%s%s", Color.BgRed, data, Color.Reset);
        fs.writeFileSync(`./data/output_arg.json`, data, "utf8");
    }    
}

class App {

    constructor() {
        this._list = [];
        this._targetDir = "";
        this._isValid = false;

        this._commands = [];
        this._lastComment = "";
        this._lastCommand = "";
        this._commandIndex = -1;
        this._lastCommandIndex = -1;

        /**
         * @type{{arg: ArgParams[], param: PluginParams}}
         */
        this._flushData = {
            arg: [],
            param: new PluginParams()
        };        
    }

    /**
     * 플러그인 파일을 읽습니다.
     */
    readPluginFiles() {
        const targetFile = argv.f.replace( /\\/g, '/' );
        const stat = fs.lstatSync(targetFile);
        if(stat.isDirectory()) {
            this._targetDir = path.join(targetFile, "js", "plugins");
            this._list = fs.readdirSync(this._targetDir.replace( /\\/g, '/' ));
        } else {
            this._targetDir = path.dirname(targetFile);
            this._list.push(Parser.ready(targetFile).splitOnLast("/"));
        }
    }

    processLine(line) {
        if(line.indexOf("/*:") >= 0) this._isValid = true;
        if(line.indexOf("~struct~") >= 0) this._isValid = false;
        if(this._isValid) {
            const cmt = Parser.parse(line);

            if(!cmt) {
                return;
            }

            this.parseComments(cmt);

            if(line.indexOf("*/") >= 0) {
                this._isValid = false;
            }
        }
    }

    setParams(type, data) {
        this._lastCommand = "param";        
        this._flushData.param[type] = data;
    }

    getParams(type) {
        return this._flushData.param[type];
    }

    setOutputParamData(key, value) {
        this._flushData.param.data[key] = value;
    }

    isValidParam(type) {
        return !!this._flushData.param[type];
    }

    createCommand(data) {
        this._lastCommand = "command";        
        this._commands.push(data);        
        this._flushData.arg.push(new ArgParams());
        this._commandIndex++;
        this._lastCommandIndex = this._flushData.arg.length - 1;
    }

    setArgs(type, data) {
        const index = this._lastCommandIndex;
        this._flushData.arg[index][type] = data;
        this._flushData.arg[index].texts.push(data);
    }

    setOutputArgsData(key, value) {
        const index = this._lastCommandIndex;
        this._flushData.arg[index].data[key] = value;
    }    

    isValidArgs(type) {
        const index = this._lastCommandIndex;
        return !!this._flushData.arg[index][type];
    }

    getArgs(type) {
        const index = this._lastCommandIndex;
        return this._flushData.arg[index][type];
    }

    setCommandArgsText(data) {
        if(this._lastCommand === "command" || this._lastComment === "args") {
            const index = this._lastCommandIndex;
            this._flushData.arg[index].texts.push(data);
        }
    }

    /**
     * @param {Parser} cmt 
     */
    parseComments(cmt) {
        this._lastComment = cmt.type;

        switch(cmt.type) {
            case "plugindesc":
                console.log("@plugindesc %s%s%s", Color.BgRed, cmt.desc, Color.Reset);
                this.setParams("description", cmt.desc.slice(0));
                break;
            case "param":
                console.log("@param %s%s%s", Color.BgBlack, cmt.desc, Color.Reset);
                this.setParams("lastKey", cmt.desc.slice(0));
                break;
            case "command":
                console.log("@command %s%s%s", Color.BgRed, cmt.desc, Color.Reset);
                this.createCommand(cmt.desc);
                break;
            case "arg":
                console.log("@arg %s%s%s", Color.BgGreen, cmt.name, Color.Reset);
                this.setArgs("lastKey", cmt.desc.slice(0));
                break;
            case "text":
                console.log("@text %s%s%s", Color.FgRed, cmt.desc, Color.Reset);
                this.setCommandArgsText(cmt.desc.slice(0));
                break;
            case "type":
                if(["command", "param"].includes(this._lastCommand)) {
                    console.log("@type %s%s%s", Color.FgRed, cmt.name, Color.Reset);
                }
                break;                            
            case "desc":
                // 한 줄만 지원.
                console.log("@desc %s%s%s", Color.FgWhite, cmt.desc, Color.Reset);
                break;
            case "default":
                console.log("@default %s%s%s", Color.FgYellow, cmt.desc, Color.Reset);

                let outputData;
                let type = "";

                const index = this._commandIndex;
                const data = this._flushData;

                if(this._lastCommand === "param") { // 플러그인 매개변수
                    let key = "";

                    if(this.isValidParam("lastKey")) {
                        this.setParams("lastValue", cmt.desc.slice(0));
                    }

                    if((key = this.getParams("lastKey")) != "") {
                        const value = this.getParams("lastValue");
                        this.setOutputParamData(key, value);
                        this.setParams("lastKey", "");
                        this.setParams("lastValue", "");
                    }                       

                } else if(this._lastCommand === "command") { // 플러그인 명령
                    let key = "";

                    if(this.isValidArgs("lastKey")) {
                        this.setArgs("lastValue", cmt.desc.slice(0));
                    }

                    if((key = this.getArgs("lastKey")) != "") {
                        const value = this.getArgs("lastValue");
                        this.setOutputArgsData(key, value);
                        this.setArgs("lastKey", "");
                        this.setArgs("lastValue", "");
                    }                            
                }

                break;
            case "":
                break;
        }
    }    

    processEndOfFile() {
        const pluginName = this._flushData.param.name.split(".")[0];

        for(const type in this._flushData) {
            let data = JSON.stringify(this._flushData[type].data);

            if(type === "param") {
                const outputFile = new ParamFile(pluginName, {
                    name: pluginName,
                    status: true,
                    description: this._flushData.param.description,
                    parameters: this._flushData[type].data,
                });
                outputFile.create();

            } else if(type === "arg") {

                for(let i = 0; i < this._commandIndex; i++) {
                    const commandIndex = i;
                    if(!this._flushData.arg[i]) {
                        console.warn("ARGS 출력 데이터가 없습니다.");
                    }

                    const tempJsonData = this._flushData.arg[i].data;

                    // 맵 데이터의 이벤트 인터프리터 데이터를 생성합니다.
                    let temp = [{
                        "code": 357,
                        "indent": 0,
                        "parameters": [
                            pluginName, 
                            this._commands[i], 
                            "", 
                            tempJsonData,
                        ]
                    }];
                    
                    // 키를 열거합니다.
                    // Object.keys(tempJsonData).forEach((e, i, a) => {
                        
                    //     // 키와 값을 가져옵니다.
                    //     const key = this._flushData.arg[commandIndex].texts[i];
                    //     const value = tempJsonData[e];
    
                    //     // 세부 데이터를 설정합니다.
                    //     temp.push({
                    //         "code": 657,                                
                    //         "indent": 0,
                    //         "parameters": [
                    //             `${key} = ${value}`
                    //         ]
                    //     });
                    // })

                    const outputFile = new ArgFile(pluginName, temp);
                    outputFile.create();
                }
                       
            }
        }
    }

    readList() {
        this._list.forEach(f => {
            const filename = path.join(this._targetDir, f);
            const fileStream = fs.createReadStream(filename, 'utf8');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
            console.log("%s%s%s", Color.BgBlue, filename, Color.Reset);
            this._flushData.param.name = f;

            rl.on('line', this.processLine.bind(this));
            rl.on('close', this.processEndOfFile.bind(this));            
        })
    }

    start() {
        this.readPluginFiles();
        this.readList();
    }
}

const app = new App();
app.start();