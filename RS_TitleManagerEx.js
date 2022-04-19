//================================================================
// RS_TitleManagerEx.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2022 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

/*:
 * @target MZ
 * @plugindesc <RS_TitleManagerEx>
 * @author biud436
 * @url https://github.com/biud436
 *
 * @param Epilogue 1
 *
 * @param ep1 Title1
 * @text Title 1
 * @parent Epilogue 1
 * @desc Specify the title 1 image.
 * @default Beach
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep1 Title2
 * @text Title 2
 * @parent Epilogue 1
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep1 BGM
 * @text BGM
 * @parent Epilogue 1
 * @desc Specify the BGM file
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 2
 *
 * @param ep2 Title1
 * @text Title 1
 * @parent Epilogue 2
 * @desc Specify the title 1 image.
 * @default Sky
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep2 Title2
 * @text Title 2
 * @parent Epilogue 2
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep2 BGM
 * @text BGM
 * @parent Epilogue 2
 * @desc Specify the BGM file.
 * @default Field2
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 3
 *
 * @param ep3 Title1
 * @text Title 1
 * @parent Epilogue 3
 * @desc Specify the title 1 image.
 * @default Sky
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep3 Title2
 * @text Title 2
 * @parent Epilogue 3
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep3 BGM
 * @text BGM
 * @parent Epilogue 3
 * @desc Specify the BGM file.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 4
 *
 * @param ep4 Title1
 * @text Title 1
 * @parent Epilogue 4
 * @desc Specify the title 1 image.
 * @default Sky
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep4 Title2
 * @text Title 2
 * @parent Epilogue 4
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep4 BGM
 * @text BGM
 * @parent Epilogue 4
 * @desc Specify the BGM file.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Location
 *
 * @param Map ID
 * @parent Location
 * @desc Specify the id of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @default 1
 *
 * @param Map X
 * @parent Location
 * @desc Specify the starting point of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @min 0
 * @default 0
 *
 * @param Map Y
 * @parent Location
 * @desc Specify the starting point of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @min 0
 * @default 0
 *
 * @param Additional Command
 *
 * @param Specific Command
 * @parent Additional Command
 * @desc Specify the command name. This can move to a hidden map through this command
 * @type text
 * @default Specific Command
 *
 * @param Show Specific Command
 * @text Show
 * @parent Additional Command
 * @desc Decide whether the command window is visible.
 * @type boolean
 * @default false
 * @on visible
 * @off hide
 *
 * @help
 * This plugin allows you to change title screen during the game or after the game epilogue.
 * To change the title screen, you can use the following script command.
 *
 * EndingService.setEnding("Epilogue X");
 *
 * the value called 'X' is the number of the epilogue and it is the number between 1 and 4.
 *
 * I've rewrited my MV plugin completely to fit in the modern javascript.
 *
 * ============================================================================
 * Version Log
 * ============================================================================
 * 2022.04.19 (v1.0.0) :
 *  - First Release
 * 2022.04.19 (v1.0.1) :
 *  - Added a new plugin command that can set epilogue.
 *
 * @command setEnding
 * @text Set Ending
 * @desc Set the ending of the game.
 *
 * @arg epilogue
 * @text Epilogue 1
 * @type select
 * @desc Set the epilogue.
 * @default Epilogue 1
 * @option Epilogue 1
 * @option Epilogue 2
 * @option Epilogue 3
 * @option Epilogue 4
 *
 */

(() => {
    "use strict";

    /**
     * @type {Record<string, any>}
     */
    const pluginParams = $plugins.filter(function (i) {
        return i.description.contains("<RS_TitleManagerEx>");
    });

    /**
     * @type {string}
     */
    const pluginName = pluginParams.length > 0 && pluginParams[0].name;

    /**
     * @type {Record<string, any>}
     */
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    /**
     * @class JsonServiceImpl
     */
    class JsonServiceImpl {
        constructor(injectJsonEx) {
            this.jsonEx = injectJsonEx;
        }

        /**
         * @param {Object} object
         * @returns {string}
         */
        stringify(object) {
            return this.jsonEx.stringify(object);
        }

        /**
         * @param {string} json
         * @returns {Record<string, any> | []}
         */
        parse(json) {
            return this.jsonEx.parse(json);
        }
    }

    /**
     * @class DataServiceImpl
     */
    class DataServiceImpl {
        /**
         *
         * @param {string} saveName
         * @param {string} contents
         * @returns {Promise<void>}
         */
        save(saveName, contents) {
            return StorageManager.saveObject(saveName, contents);
        }

        /**
         * @param {string} saveName
         * @returns {Promise<Record<string, any>>}
         */
        load(saveName) {
            if (!StorageManager.exists(saveName)) {
                throw new Error(`${saveName} is not found.`);
            }
            return StorageManager.loadObject(saveName);
        }
    }

    class DataStructure {
        constructor() {
            /**
             * @type {number[]}
             */
            this.epilogue = [];
        }
    }

    class EndingServiceImpl {
        /**
         * @param {{jsonService: JsonServiceImpl, dataService: DataServiceImpl}} inject
         */
        constructor({ jsonService, dataService }) {
            this.jsonService = jsonService;
            this.dataService = dataService;

            /**
             * @type {DataStructure}
             */
            this.data = new DataStructure();

            /**
             * @type {"ending"}
             */
            this.key = "ending";

            this.isDirty = false;
        }

        /**
         * initialize the data for ending setup.
         * @returns {Promise<void>}
         */
        async initWithData() {
            this.data = await this.load();
            this.save();
        }

        /**
         * if any ending data is set, return true.
         * @returns {boolean}
         */
        isAnyEnding() {
            if (!this.isDirty) {
                this.initWithData().then((this.isDirty = true));
            }
            return this.data.epilogue.length > 0;
        }

        /**
         * @returns {number}
         */
        get lastEnding() {
            const length = this.data.epilogue.length;
            return this.data.epilogue[length - 1];
        }

        /**
         *
         * @param {"Epilogue 1"|"Epilogue 2"|"Epilogue 3"|"Epilogue 4"} endingName
         */
        setEnding(endingName) {
            if (!endingName) return;
            const id = endingName.split(" ")[1];
            this.data.epilogue.push(+id);
            this.save();
        }

        /**
         * @private
         * @returns {"ending"}
         */
        get saveName() {
            return this.key;
        }

        /**
         * @private
         * @returns {Promise<void>}
         */
        async save() {
            const contents = this.data;
            return await this.dataService.save(this.saveName, contents);
        }

        /**
         * @private
         * @returns {Promise<DataStructure>}
         */
        async load() {
            try {
                return this.dataService.load(this.saveName);
            } catch {
                return new DataStructure();
            }
        }

        /**
         *
         * @param {{title1Name: string; title2Name: string; [key: string]: any;}} dataSystem
         * @returns {{title1Name: string; title2Name: string;}
         */
        getBackground(dataSystem) {
            return this.isAnyEnding()
                ? {
                      title1Name: parameters[`ep${this.lastEnding} Title1`],
                      title2Name: parameters[`ep${this.lastEnding} Title2`],
                  }
                : dataSystem;
        }

        /**
         *
         * @param {{titleBgm: {name: string; pan: number; pitch: number; volume: number;}; [key: string]: any;}} dataSystem
         * @return {{titleBgm: {name: string; pan: number; pitch: number; volume: number;};}}
         */
        getTitleBgm(dataSystem) {
            return this.isAnyEnding()
                ? {
                      titleBgm: {
                          name: parameters[`ep${this.lastEnding} BGM`],
                          pan: 0,
                          pitch: 100,
                          volume: 90,
                      },
                  }
                : dataSystem;
        }
    }

    const EndingService = new EndingServiceImpl({
        jsonService: new JsonServiceImpl(JsonEx),
        dataService: new DataServiceImpl(),
    });
    EndingService.initWithData();

    window.EndingService = EndingService;

    //=============================================================================

    const __super_Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;
    Object.assign(Window_TitleCommand.prototype, {
        makeCommandList() {
            __super_Window_TitleCommand_makeCommandList.call(this);
            const isAnyEnding = EndingService.isAnyEnding();
            const isShowSpecificCommand = Boolean(
                parameters["Show Specific Command"] === "true"
            );
            if (isAnyEnding && isShowSpecificCommand) {
                this.addCommand(parameters["Specific Command"], "specific");
            }
        },
    });

    //=============================================================================
    Object.assign(DataManager, {
        setupEndingStage() {
            this.createGameObjects();
            this.selectSavefileForNewGame();
            $gameParty.setupStartingMembers();
            $gamePlayer.reserveTransfer(
                +parameters["Map ID"],
                +parameters["Map X"],
                +parameters["Map Y"],
                2,
                0
            );
            Graphics.frameCount = 0;
        },
    });
    //=============================================================================

    const __super_Scene_Title_createCommandWindow =
        Scene_Title.prototype.createCommandWindow;
    Object.assign(Scene_Title.prototype, {
        async createBackground() {
            const { title1Name, title2Name } =
                EndingService.getBackground($dataSystem);

            this._backSprite1 = new Sprite(ImageManager.loadTitle1(title1Name));
            this._backSprite2 = new Sprite(ImageManager.loadTitle2(title2Name));
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        },
        createCommandWindow() {
            __super_Scene_Title_createCommandWindow.call(this);
            this._commandWindow.setHandler("specific", () => {
                this.commandSpecific();
            });
        },
        commandSpecific() {
            DataManager.setupEndingStage();
            this._commandWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Map);
        },
        playTitleMusic() {
            const { titleBgm } = EndingService.getTitleBgm($dataSystem);
            AudioManager.playBgm(titleBgm);
            AudioManager.stopBgs();
            AudioManager.stopMe();
        },
    });

    //=============================================================================

    PluginManager.registerCommand(pluginName, "setEnding", (raw) => {
        /**
         * @type {{epilogue: string;}}
         */
        const args = raw;
        EndingService.setEnding(args.epilogue);
    });
})();
