/**
 * @author biud436
 * @example
 * This script allows you to perform to copy a source directory to the destination folder and exclude unused resources.
 * 
 * Try to do a below command in your command prompt.
 * node RS_UnusedOption.js "src" "dst"
 * 
 * For instance,
 * node RS_UnusedOption.js "E:/SteamLibrary/steamapps/common/RPG Maker MV/dlc/KadokawaPlugins_New/samples/Gacha Sample" "C:/Users/U/Desktop/Test"
 *
 * =============================================================
 * Change Log
 * =============================================================
 * 2019.12.05 (v0.1.0) :
 * - 폴더가 재귀적으로 생성되지 않았던 문제를 수정하였습니다.
 * - 파일 복사 기능을 추가하였습니다.
 */
const fs = require("fs-extra");
const path = require('path');
const readline = require('readline');
const EventEmiiter = require('events');

class LazyInitialization extends EventEmiiter {}

const processArgs = process.argv.slice(2);
// const testdir = processArgs[0] || path.join(process.env["USERPROFILE"], "Desktop");
// const testdir = `C:/Users/U/Desktop/Exam/201907/www`;
const testdir = `E:/SteamLibrary/steamapps/common/RPG Maker MV/dlc/KadokawaPlugins_New/samples/Gacha Sample`;

// node RS_UnusedOption.js "E:/SteamLibrary/steamapps/common/RPG Maker MV/dlc/KadokawaPlugins_New/samples/Gacha Sample" "C:/Users/U/Desktop/Test"
let sourceDir = processArgs[0] || testdir;
let targetDir = processArgs[1] || path.join(process.env["USERPROFILE"], "Desktop", "Test");;

console.log(`sourceDir => ${sourceDir}`);
console.log(`targetDir => ${targetDir}`);

process.chdir(testdir);

/**
 * @class ImageChunk
 */
class ImageChunk {
    
    constructor(rootPath, remainData) {
    
        if(!fs.existsSync(rootPath)) {
            fs.ensureDirSync(rootPath);
        }

        if(fs.lstatSync(rootPath).isDirectory()) {
            this._rootPath = rootPath;
        }

        /**
         * @type {Array}
         */
        this._data = [];

        if(remainData && Array.isArray(remainData)) {
            this._data = this._data.concat(remainData);
        }

    }

    extName() {
        return ".png";
    }


    unique() {
        this._data = [...new Set(this._data.sort())];
    }


    makePath() {
        this._data = this._data.map(i => {
            return path.join(this._rootPath, i);
        });
    }

    /**
     * 
     * @param {Array} args 
     */
    isInvalid(args) {
        return !args.every(i => {
            return fs.existsSync(path.join(this._rootPath, `${i}${this.extName()}`));
        })
    }

    /**
     * 
     * @param  {...any} args 
     */
    push(...args) {
        if(this.isInvalid(args)) return;
        this._data = this._data.concat(args.map(i => i + this.extName()));
    }

}

/**
 * @class AudioThunk
 */
class AudioChunk extends ImageChunk {
    extName() {
        return ".m4a";
    }
}

/**
 * @type {Proxy}
 */
let images = new Proxy({
    animations: new ImageChunk("img/animations"),
    battlebacks1: new ImageChunk("img/battlebacks1", [
        "Clouds.png",
        "Desert.png",
        "DirtField.png",
        "Grassland.png",
        "Lava1.png",
        "Lava2.png",
        "PoisonSwamp.png",
        "Ship.png",
        "Snowfield.png",
        "Wasteland.png",        
    ]),
    battlebacks2: new ImageChunk("img/battlebacks2", [
        "Cliff.png",
        "Clouds.png",
        "Desert.png",
        "Forest.png",
        "Grassland.png",
        "Lava.png",
        "PoisonSwamp.png",
        "Ship.png",
        "Snowfield.png",
        "Wasteland.png",        
    ]),
    characters: new ImageChunk("img/characters", []),
    enemies: new ImageChunk("img/enemies", []),
    faces: new ImageChunk("img/faces", []),
    parallaxes: new ImageChunk("img/parallaxes", []),
    pictures: new ImageChunk("img/pictures", []),
    sv_actors: new ImageChunk("img/sv_actors", []),
    sv_enemies: new ImageChunk("img/sv_enemies", []),
    system: new ImageChunk("img/system", [
        "Balloon.png",
        "ButtonSet.png",
        "Damage.png",
        "GameOver.png",
        "IconSet.png",
        "Loading.png",
        "Shadow1.png",
        "Shadow2.png",
        "States.png",
        "Weapons1.png",
        "Weapons2.png",
        "Weapons3.png",
        "Window.png",
    ]),
    tilesets: new ImageChunk("img/tilesets", []),
    titles1: new ImageChunk("img/titles1", []),
    titles2: new ImageChunk("img/titles2", []),
}, {
    set(target, key, value) {
        if(!target[key]) {
            target[key] = new ImageChunk(`img/${key}`, value);
        }
        return !!target[key];
    },
    get(target, key) {
        return target[key];
    },
    
});

let audios = new Proxy({
    bgm: new AudioChunk("audio/bgm", []),
    bgs: new AudioChunk("audio/bgs", []),
    me: new AudioChunk("audio/me", []),
    se: new AudioChunk("audio/se", []),
}, {
    set(target, key, value) {
        if(!target[key]) {
            target[key] = new ImageChunk(`audio/${key}`, value);
        } 
        return !!target[key];
    },
    get(target, key) {
        if(key === "wav") {
            throw new Error(`Audio File Foramt called .wav is not supported!`);
        }
        return target[key];
    }
});

/**
 * Make a real file path.
 */
let databasePath = new Proxy({}, {
    get(target, key) {
        return `data/${key}.json`;
    },
});

/**
 * Parse a jsonStr.
 * @param {String} str 
 */
let jsonParse = function (str) {
    
    var retData = JSON.parse(str, function (k, v) {
        try { 
            return jsonParse(v); 
        } catch (e) { 
            return v;
        }
    });

    return retData;

};

/**
 * Get and Set global flags.
 */
let flags = {
    isSideViewBattle: true,
};

/**
 * 
 * @class Resources
 */
class Resources {

    static addAnimation(...args) {
        images.animations.push(...args);
    }

    static addBattlebacks1(...args) {
        images.battlebacks1.push(...args);
    }

    static addBattlebacks2(...args) {
        images.battlebacks2.push(...args);
    }        

    static addCharacter(...args) {
        images.characters.push(...args);
    }

    static addFace(...args) {
        images.faces.push(...args);
    }    

    static addParallax(...args) {
        images.parallaxes.push(...args);
    }

    static addPicture(...args) {
        images.pictures.push(...args);
    }
    
    static addBgm(...args) {
        audios.bgm.push(...args);
    }    

    static addEnemies(...args) {
        if(flags.isSideViewBattle) {
            images.sv_enemies.push(...args);
        } else {
            images.enemies.push(...args);
        }
    }    

    static addActor(...args) {
        if(flags.isSideViewBattle) {
            images.sv_actors.push(...args);
        } else {
            // Nothing to do!
        }        
    }

    static addSvActor(...args) {
        images.sv_actors.push(...args);
    }
 
    static addSystem(...args) {
        images.system.push(...args);
    }

    static addTileset(...args) {
        images.tilesets.push(...args);
    }

    static addTitles1(...args) {
        images.titles1.push(...args);
    }

    static addTitles2(...args) {
        images.titles2.push(...args);
    }

    static addBgm(...args) {
        audios.bgm.push(...args);
    }

    static addBgs(...args) {
        audios.bgs.push(...args);
    }

    static addMe(...args) {
        audios.me.push(...args);
    }

    static addSe(...args) {
        audios.se.push(...args);
    }

    /**
     * 
     * @param {RPG.EventCommand[]} list 
     * @param {RPG.EventCommand[]} commonList 
     */
    static requestImages(list, commonList) {
        if(!list) return;

        list.forEach(command => {
            var params = command.parameters;
            switch(command.code) {
                // Show Text
                case 101:
                    Resources.addFace(params[0]);
                    break;
    
                // Common Event
                case 117:
                    var commonEvent = Database.commonEvents[params[0]];
                    if (commonEvent) {
                        if (!commonList) {
                            commonList = [];
                        }
                        if (!commonList.contains(params[0])) {
                            commonList.push(params[0]);
                            this.requestImages(commonEvent.list, commonList);
                        }
                    }
                    break;
    
                // Change Party Member
                case 129:
                    break;
    
                // Set Movement Route
                case 205:
                    if(params[1]){
                        params[1].list.forEach(command => {
                            var params = command.parameters;
                            if(command.code === 41){ // ROUTE_CHANGE_IMAGE
                                this.addCharacter(params[0]);
                            } else if(command.code === 44) { // ROUTE_PLAY_SE
                                this.addSe(param[0].name);
                            }
                        });
                    }
                    break;
    
                // Show Animation, Show Battle Animation
                case 212: case 337:
                    break;
    
                // Change Player Followers
                case 216:
                    break;
    
                // Show Picture
                case 231:
                    this.addPicture(params[1]);
                    break;
                
                // Play BGM
                case 241:                 
                    this.addBgm(params[0].name);
                    break;

                // Play ME    
                case 249:
                    this.addMe(params[0].name);
                    break;

                // Play SE    
                case 250:
                    this.addSe(params[0].name);
                    break;
    
                // Change Tileset
                case 282:
                    break;
    
                // Change Battle Back
                case 283:
                    this.addBattleback1(params[0]);
                    this.addBattleback2(params[1]);
                    break;
    
                // Change Parallax
                case 284:
                    this.addParallax(params[0]);
                    break;
    
                // Change Actor Images
                case 322:
                    this.addCharacter(params[1]);
                    this.addFace(params[3]);
                    this.addSvActor(params[5]);
                    break;
    
                // Change Vehicle Image
                case 323:
                    // var vehicle = $gameMap.vehicle(params[0]);
                    // if(vehicle){
                        this.addCharacter(params[1]);
                    // }
                    break;
    
                // Enemy Transform
                case 336:
                    break;
            }
        });
    }

    static readMapData() {

        // Read all files in the target folder.
        let files = fs.readdirSync("data/", 'utf8');

        // Extract the filename such as MapXXX.json.
        let mapFiles = files.filter(file => /^(?:Map)\d{3}(?:\.json)/.test(file));

        mapFiles.forEach(mapFileName => {

            let json = fs.readFileSync(`data/${mapFileName}`, 'utf8');

            /**
             * @type {RPG.Map}
             */
            let map = jsonParse(json);

            if(map.specifyBattleback) {
                this.addBattlebacks1(map.battleback1Name);
                this.addBattlebacks2(map.battleback2Name);
            }

            if(map.autoplayBgm) this.addBgm(map.bgm.name);
            if(map.autoplayBgs) this.addBgs(map.bgs.name);

            this.addParallax(map.parallaxName);
        
            // Use a lots of performance.
            map.events.forEach(event => {

                if(!event) return;
                
                // Pending the function to event queue.
                event.pages.forEach(page => {
                    if(!page) return;
                    this.addCharacter(page.image.characterName);                    
                    this.requestImages(page.list);
                });

            });

        });

        return this;
    }

    static unique() {

        for(let i in images) {
            images[i].unique();
        }

        for(let i in audios) {
            audios[i].unique();
        }        

        return this;
    }

    static make() {

        for(let i in images) {
            images[i].makePath();
        }

        for(let i in audios) {
            audios[i].makePath();
        }        

        return this;

    }
}

//#region Plugins

class Plugin {

    constructor(...args) {

        this._name = args[0];
        this._status = args[1];
        this._description = args[2];
        this._parameters = jsonParse(args[3]);

        this._files = [];

        /**
         * @type {{name: String, dir: String, require: number, type: String, default: String}[]}
         */
        this._params = [];

        /**
         * @type {{name: String, noteDir: String, noteRequire: number, noteType: String, noteData: String}[]}
         */        
        this._noteParams = [];

        this._lastParam = null;
        this._lastNoteParam = null;

        this._isReady = false;
    }

    done() {
        this._isReady = true;
    }

    push(...args) {
        this._files.push(...args);
    }

    isValid() {
        return this._isReady;
    }

    createParam(name) {
        
        let param = {
            name: name,
            dir: null,
            require: null,
            type: null,
            default: "",
        };

        this._lastParam = param;
    }

    createNoteParam(name) {

        let param = {
            name: name,
            noteRequire: null,
            noteDir: null,
            noteType: null,
            noteData: null,
        };

        this._lastNoteParam = param;
    }

    updateParam(key, value) {
        if(!this._lastParam) return;
        this._lastParam[key] = value;
    }

    updateNoteParam(key, value) {
        if(!this._lastNoteParam) return;
        this._lastNoteParam[key] = value;
    }

    flushParam() {
        if(this._lastParam) {
            this._params.push(this._lastParam);
            this._lastParam = null;
        }
    }

    flushNoteParam() {
        if(this._lastNoteParam) {
            this._noteParams.push(this._lastNoteParam);
            this._lastNoteParam = null;
        }
    }    

    filterParams() {
        this._params = this._params.filter(i => i.dir);
    }

    filterNoteParams() {
        this._noteParams = this._noteParams.filter(i => i.noteDir);
    }    

    findResource() {
        
        for(let i in this._params) {
            const name = this._params[i].name;
            const dir =  this._params[i].dir;
            const parameter = this._parameters[name];
            if(parameter) {
                let temp = dir.split("/");
                let rtype = temp.shift();
                /**
                 * @type {String}
                 */
                let stype = temp.join("/");
                stype = stype.slice(0, stype.length - 1);
                if(rtype === "img") {
                    images[stype].push(parameter);
                } else if(rtype === "audio") {
                    audios[stype].push(parameter);
                }
            }
        }

    }

    /**
     * 
     * @param {function(string, Array) : void} callback 
     */
    readComments(callback) {
        
        let filePath = `js/plugins/${this._name}.js`;
        let regRequiredAssets = /\*\s@requiredAssets\s(.*)/i;
        let regParam = /\*\s@param\s(.*)/i;
        let regNoteParam = /\*\s@noteParam\s(.*)/i;

        if(fs.existsSync(filePath)) {
            const fileStream = fs.createReadStream(filePath, 'utf8');
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });

            rl.on('line', (line) => {
                line = line.trim();
                if(!line.startsWith("*")) return;
                if(regRequiredAssets.exec(line)) {
                    this._files.push(RegExp.$1);
                } else if(regParam.exec(line)) {
                    this.flushParam();
                    this.createParam(RegExp.$1);
                } else if(regNoteParam.exec(line)) {
                    this.flushNoteParam();
                    this.createNoteParam(RegExp.$1);
                }
                
                if(this._lastParam) {
                    if(/\*\s@require\s1/i.exec(line)) {
                        this.updateParam("require", 1);
                    } else if(/\*\s@dir\s(.*)/i.exec(line))  {
                        this.updateParam("dir", RegExp.$1);
                    } else if(/\*\s@type\sfile/i.exec(line)) {
                        this.updateParam("type", "file");
                    } else if(/\*\s@default\s(.*)/i.exec(line)) {
                        this.updateParam("default", RegExp.$1);
                    }
                }

                if(this._lastNoteParam) {
                    if(/\*\s@noteRequire\s1/i.exec(line)) {
                        this.updateNoteParam("noteRequire", 1);
                    } else if(/\*\s@noteDir\s(.*)/i.exec(line))  {
                        this.updateNoteParam("noteDir", RegExp.$1);
                    } else if(/\*\s@noteType\sfile/i.exec(line)) {
                        this.updateNoteParam("noteType", "file");
                    } else if(/\*\s@noteData\s(.*)/i.exec(line)) {
                        this.updateNoteParam("noteData", RegExp.$1);                        
                    }
                }                

            });

            rl.on('close', () => {

                this.flushParam();
                this.filterParams();

                this.flushNoteParam();
                this.filterNoteParams();

                this.done();
                this.findResource();

                callback(this._name, this._noteParams);

            });

        }        
    }

}

class PluginConfiguration {

    /**
     * 
     * @param {function()} lazycallback 
     */
    constructor(callback) {
        /**
         * @type {Plugin[]}
         */
        this._plugins = new Proxy([], {});


        this._length = -1;

        this._pendingDone = [];

        /**
         * This array will be initialized lazy after parsing comments.
         */
        this._noteParams = [];

        /**
         * @type {EventEmiiter}
         */
        this._lazyInitialization = new LazyInitialization();
        this._lazyInitialization.once('done', callback);
        
    }

    isReady() {
        let isPending = this._pendingDone.filter(i => i === true).length < this._length;
        return this._pendingDone.some(i => true) && !isPending;
    }

    readPluginFiles() {
        let files = fs.readdirSync(`${process.cwd()}/js/plugins/`, 'utf8');        
        let configPath = `${process.cwd()}/js/plugins.js`;
        let jsonRaw = fs.readFileSync(configPath, 'utf8');
        
        jsonRaw = jsonRaw.split(/[\r\n]+/).slice(4);
        let match = /\{"name"\:"(.*)"\,"status"\:(TRUE|FALSE)\,"description"\:"(.*)"\,"parameters"\:(.*)\}/i;

        jsonRaw.forEach(line => {
            if(match.exec(line)) {

                const name = RegExp.$1;
                const status = Boolean(RegExp.$2 === "true");
                const description = RegExp.$3;
                const parameters = RegExp.$4;

                this._plugins.push(new Plugin(name, status, description, parameters));
                this._pendingDone.push(false);
            }
        });

        this._length = this._plugins.length;
        console.log(`The number of Plugins : ${this._length}`);

        this._plugins.forEach((plugin, i) => {
            plugin.readComments((pluginName, noteParams) => {
                
                console.log(`Completed to parse plugin comments of ${pluginName}`);
                
                this._noteParams = this._noteParams.concat(noteParams);
                
                console.log(`Concating the noteParams : ${noteParams}`);
                
                this._pendingDone[i] = true;

                if(this.isReady()) {
                    console.log(`Completed parsing all plugin comments!`);
                    this._lazyInitialization.emit('done', this._noteParams);
                }
            });
        });

    }
}
//#endregion


class Database {
   
    /**
     * @param {{name: String, noteDir: String, noteRequire: number, noteType: String, noteData: String}[]}
     */     
    static init(noteParams) {
        /**
         * @type {RPG.CommonEvent[]}
         */
        this.commonEvents = [];

        /**
         * @type {RPG.Actor[]}
         */
        this.actors = []

        /**
         * @type {RPG.Enemy[]}
         */
        this.enemies = [];

        /**
         * @type {{name: String, noteDir: String, noteRequire: number, noteType: String, noteData: String}[]}
         */
        this.noteParams = noteParams;

        return this;

    }

    static loadDataFile(name) {

        let filepath = databasePath[name];
        let json = fs.readFileSync(filepath, "utf8");

        let items = jsonParse(json);

        if(!items) {
            throw new Error(`Cannot parse ${filepath} file`);
        }

        if(!Array.isArray(items)) {
            throw new Error(`Cannot parse ${filepath} file`);
        }  
        
        return items;
    }

    static loadDataFileFaster(name) {

        let filepath = databasePath[name];

        // let json = fs.readFileSync(filepath, "utf8");
        // let items = JSON.parse(json);

        let items = require(path.join(process.cwd(), filepath));

        if(!items) {
            throw new Error(`Cannot parse ${filepath} file`);
        }

        if(!Array.isArray(items)) {
            throw new Error(`Cannot parse ${filepath} file`);
        }          

        return items;

    }

    /**
     * Extract the meta-data.
     * (This function gets from the file called rpg_managers.js)
     * 
     * @param {RPG.Actor|RPG.Class|RPG.State|RPG.Weapon|RPG.Armor|RPG.Item} data 
     * 
     */
    static extractMetadata(data) {
        let re = /<([^<>:]+)(:?)([^>]*)>/g;
        data.meta = {};
        for (;;) {
            let match = re.exec(data.note);
            if (match) {
                if (match[2] === ':') {
                    data.meta[match[1]] = match[3];
                } else {
                    data.meta[match[1]] = true;
                }
            } else {
                break;
            }
        }        
    }

    static loadActorsData() {

        // battlerName
        // characterName
        // faceName

        /**
         * @type {RPG.Actor[]}
         */
        let items = this.loadDataFile("Actors");

        items.forEach(i => {
            if(!i) return;
            if(i.battlerName != "") Resources.addSvActor(i.battlerName);
            if(i.characterName != "") Resources.addCharacter(i.characterName);
            if(i.faceName != "") Resources.addFace(i.faceName);

            i.note.split(/[\r\n]+/);
        });

    }

    static loadClassesData() {
        /**
         * @type {RPG.Class[]}
         */
        let items = this.loadDataFileFaster("Classes");

        this.extractResourceFromMetaData(items);
    }
    
    static loadSkillsData() {
        /**
         * @type {RPG.Skill[]}
         */
        let items = this.loadDataFileFaster("Skills");

        this.extractResourceFromMetaData(items);
    }

    /**
     * 
     * @param {RPG.Actor[]|RPG.Class[]|RPG.Skill[]|RPG.Item[]|RPG.State[]|RPG.Armor[]|RPG.Weapon[]} dataObject 
     */
    static extractResourceFromMetaData(dataObject) {
        
        // These lines are needed performance up and refactor.
        // and it cannot read map info, event, common event yet.
        // Because it takes a lot of times.        
        dataObject.forEach(i => {
            if(!i) return;

            const noteData = this.noteParams.filter(note => {
                return note.noteData === 'items'; // arg0
            });
    
            let data = {
                note: i.note
            };
    
            this.extractMetadata(data);
    
            noteData.forEach(i => {
                const type = i.noteDir.split("/");
                const rootFolderType = type.shift();
                let subFoldersType = type.join("/");
                subFoldersType = subFoldersType.slice(0, subFoldersType.length - 1);
                let resName = data.meta[i.name];
    
                if(typeof(resName) === "string") {

                    resName = resName.trim();
                    
                    switch(rootFolderType) {
                        case 'img':
                            if(images[subFoldersType] == null) {
                                images[subFoldersType] = resName;
                            } else {
                                images[subFoldersType].push(resName);
                            }
                            break;
                        case 'audio':
                            if(audio[subFoldersType] == null) {
                                audio[subFoldersType] = resName;
                            } else {
                                audio[subFoldersType].push(resName);
                            }
                            break;
                    }
                }
            }); 
        });
    }
    
    static loadItemsData() {
        
        /**
         * @type {RPG.Item[]}
         */
        let items = this.loadDataFileFaster("Items");

        this.extractResourceFromMetaData(items);

    }

    static loadWeaponsData() {

        /**
         * @type {RPG.Weapon[]}
         */
        let items = this.loadDataFileFaster("Weapons");

        this.extractResourceFromMetaData(items);        
    }

    static loadArmorsData() {
        
        /**
         * @type {RPG.Armor[]}
         */
        let items = this.loadDataFileFaster("Armors");

        this.extractResourceFromMetaData(items);   
    }

    static loadEnemiesData() {
        
        /**
         * @type {RPG.Enemy[]}
         */
        let items = this.loadDataFile("Enemies");

        items.forEach(i => {
            if(!i) return;
            Resources.addEnemies(i.battlerName);
        })

    }

    static loadStatesData() {
        
        /**
         * @type {RPG.State[]}
         */
        let items = this.loadDataFileFaster("States");

        this.extractResourceFromMetaData(items);
    }        

    static loadAnimationData() {

        // animation1Name
        // animation2Name
        // timings[i].se

        /**
         * @type {RPG.Animation[]}
         */
        let items = this.loadDataFileFaster("Animations");

        items.forEach(i => {
            if(!i) return;
            const animation1Name = i.animation1Name;
            const animation2Name = i.animation2Name;
            
            if(animation1Name != "") Resources.addAnimation(animation1Name);
            if(animation2Name != "") Resources.addAnimation(animation2Name);

            i.timings.forEach(j => {
                if(!j) return;
                if(j.se && j.se.name !== "") {
                    Resources.addSe(j.se.name);
                }
            });

        });
        
    }

    static loadTilesetsData() {

        /**
         * @type {RPG.Tileset[]}
         */
        let items = this.loadDataFileFaster("Tilesets");

        items.forEach(i => {
            if(!i) return;
            
            i.tilesetNames.forEach(tilesetName => Resources.addTileset(tilesetName));

        });

    }

    static loadCommonEvents() {
        let filepath = databasePath.CommonEvents;
        let json = fs.readFileSync(filepath, "utf8");   

        /**
         * @type {RPG.CommonEvent[]}
         */
        this.commonEvents = jsonParse(json);

        this.commonEvents.forEach(commonEvent => {

            if(!commonEvent) return;
            
            Resources.requestImages(commonEvent.list);  

        });
    }

    static loadSystem() {
        let filepath = databasePath.System;
        let json = fs.readFileSync(filepath, "utf8");   
    
        /**
         * @type{RPG.System}
         */
        let system = jsonParse(json);

        flags.isSideViewBattle = system.optSideView;

        Resources.addCharacter(system.airship.characterName);
        Resources.addBgm(system.airship.bgm.name);
        Resources.addCharacter(system.boat.characterName);
        Resources.addBgm(system.boat.bgm.name);
        Resources.addCharacter(system.ship.characterName);
        Resources.addBgm(system.ship.bgm.name);

        system.sounds.forEach(sound => Resources.addSe(sound.name));

        Resources.addBattlebacks1(system.battleback1Name);
        Resources.addBattlebacks2(system.battleback2Name);

        Resources.addTitles1(system.title1Name);
        Resources.addTitles2(system.title2Name);
        Resources.addBgm(system.titleBgm.name);
        Resources.addBgm(system.battleBgm.name);
        Resources.addMe(system.defeatMe.name);
        Resources.addMe(system.victoryMe.name);
        Resources.addMe(system.gameoverMe.name);

    }    

    static extract() {

        this.loadSystem();
        this.loadActorsData();
        this.loadClassesData();
        this.loadSkillsData();
        this.loadItemsData();
        this.loadWeaponsData();
        this.loadArmorsData();
        this.loadEnemiesData();
        this.loadStatesData();
        this.loadAnimationData();
        this.loadTilesetsData();
        this.loadCommonEvents();

        Resources.readMapData();
        
        return this;

    }

}

//#region Entry Point

const config = new PluginConfiguration((noteParams) => {
    
    // Load the Database
    Database.init(noteParams)
            .extract();

    // Collecting the resources!
    Resources.unique()
             .make();    

    // Log images and audios!
    // console.log(images);
    // console.log(audios); 

    function collecting(object) {
        for(let i in object) {
            /**
             * @type {ImageChunk}
             */
            const resource = object[i];
            
            if(resource) {
                const rootPath = process.cwd();
                const targetPath = path.join(targetDir);

                resource._data.forEach(file => {
                    const sourcePath = path.join(rootPath, file);
                    const copyPath = path.join(targetPath, file);

                    fs.copySync(sourcePath, copyPath, {overwrite: true, filter: (src, dst) => {
                        console.log(`Copy file ${src} to ${dst}`);
                        return true;
                    }});

                });
                
            }
        }        
    }

    collecting(images);
    collecting(audios);

}).readPluginFiles();    

//#endregion