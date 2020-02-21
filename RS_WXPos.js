//================================================================
// RS_WXPos.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_WXPos>
 * @author biud436
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_WXPos = true;

var RS = RS || {};
RS.WXPos = RS.WXPos || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_WXPos>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    let Config = {
        "Scene_Menu": {
            "Window_Gold": {
                x: 300,
                y: 0,
            },
        },
        "Scene_Title": {
            "Window_TitleCommand": {
                x: 200,
                y: 200,
            }
        }
    };    

    const utils = {

        configFile : "myWindowConfig.json",

        async writeConfigFile() {
            if(!Utils.isNwjs()) return;
            const fs = require('fs');
            const path = require('path');
            const {promisify} = require('util');
            const writeFile = promisify(fs.writeFile);
    
            let rootFolder = path.dirname(process.mainModule.filename).replace(/\\/g, "/");
            let contents = JSON.stringify(Config, null, "    ");

            await writeFile(path.join(rootFolder, "data", this.configFile), contents, "utf8")
                .then(val => {
                    console.log(`myWindowConfig.json file is written completely!`);
                }).catch(err => {
                    throw new Error(err);
                })                
        },

        async readConfigFile() {
            if(!Utils.isNwjs()) return;
            const fs = require('fs');
            const path = require('path');
            const {promisify} = require('util');
            const readFile = promisify(fs.readFile);
    
            let rootFolder = path.dirname(process.mainModule.filename).replace(/\\/g, "/");
            let targetFile = path.join(rootFolder, "data", this.configFile);

            if(fs.existsSync(targetFile)) {
                await readFile(targetFile, "utf8")
                .then(contents => {
                    Config = JSON.parse(contents);
                    console.log(`myWindowConfig.json file is loaded successfully`);
                }).catch(err => {
                    throw new Error(err);
                })
            }            
        },

        async internalDownloadFile(url, filename, callback) {
    
            const options = {
                port: 443,
                headers: {},
            };
        
            let req = https.get(url, options, res => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
        
                const headers = res.headers;
                
                if('content-disposition' in headers) {
                    if(/(?:filename=)(.*)/i.exec( headers['content-disposition'])) {
                        filename = RegExp.$1;
                    }
                }
        
                let out = fs.createWriteStream(filename);
                let len = 1048576;
                let isValid = false;
        
                if("content-length" in res.headers) {
                    len = parseInt(res.headers["content-length"], 10);
                    isValid = true;
                }
            
                let cur = 0;
                let total = len / 1048576;
                
                if(res.statusCode === 200) {
                    res.pipe(out);
            
                    res.on('data', c => {
                        cur += c.length;
                        if(isValid) {
                            console.log(`${filename} => ${(100.0 * cur / len).toFixed(0)}% (${(cur / total).toFixed(2)} MB)`);
                        }
                    });
                    res.on('end', async () => {
                        await callback(null, res);
                    });
                }
            });
        
            req.on('error', async err => {
                await callback(err, null);
            });
        
        },

        download(url, filename) {
            if(!Utils.isNwjs()) return;
            const {promisify} = require('util');
            const downloadFile = promisify(this.internalDownloadFile);
            downloadFile(url, filename).then(res => {
                console.log(`Completed download the file called ${filename}`);
            }).catch(err => {
                throw new Error(err);
            });
        }
        
    };

    Scene_Base.prototype.prepareInteraction = function() {
        let maxIndex = 0;
        
        /**
         * interactive는
         * <canvas> : GameCanvas의 zIndex가 다른 모든 것보다 위에 있어야 동작한다.
         * 그렇게 하지 않으면, mousemove하고 pointermove만 동작하게 된다.
         */        
        for(const el of document.body.children) {
            let targetIndex = parseInt(el.style.zIndex);
            if(targetIndex > maxIndex) {
                maxIndex = targetIndex;
            }
        }

        Graphics._canvas.style.zIndex = maxIndex + 1;

        this._isReadyToInteraction = true;
    }

    Scene_Base.prototype.handleTouchInsideWindow = function(ecurrentSceneName, e) {

        e.interactive = true;        
        e.hitArea = new PIXI.Rectangle(0, 0, e.width || 100, e.height || 100);

        const Events = [
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "mouseupoutside",
            "pointercancel",
            "pointerdown",
            "pointermove",
            "pointerout",
            "pointerover",
            "pointertap",
            "pointerup",
            "pointerupoutside"
        ];

        Events.forEach(evName => {
            e.on(evName, 
            /**
             * @param {Event} event
             */        
            (event) => {
                console.log(evName);
                const data = event.data;

                const mouseX = data.global.x;
                const mouseY = data.global.y;
                // e.x = mouseX;
                // e.y = mouseY;

            });
        })


    };

    /**
     * 윈도우 내 특정 프로퍼티를 재정의합니다.
     * @param {String} currentSceneName
     * @param {Window} e
     */
    Scene_Base.prototype.resetWindow = function(currentSceneName, e) {
        if(e instanceof Window) {
            let name = e.constructor.name.toString();
            let config = Config[currentSceneName];
            const keys = Object.keys(config);
            if(keys.contains(name)) {
                e.x = config[name].x;
                e.y = config[name].y;

                this.handleTouchInsideWindow(currentSceneName, e);

                // 회전된 상태는 이 로직으로 감지 불가능
                if(e.visible && e.opacity > 0) {
                    if(e.x < 0 && e.x > Graphics.boxWidth) {
                        e.visible = false;
                    }
                    if(e.visible && e.y < 0 && e.y > Graphics.boxHeight) {
                        e.visible = false;
                    }       
                }

                e._isWindow = false;
            }
        }
    };

    /**
     * 씬이 생성될 때, 모든 윈도우의 위치를 재설정합니다.
     */
    Scene_Base.prototype.initWithWindowPosition = function() {
        let currentSceneName = this.constructor.name.toString();
        this.children.forEach(e => this.resetWindow(currentSceneName, e));
        if(this._windowLayer) this._windowLayer.children.forEach(e => this.resetWindow(currentSceneName, e));
    };

    var alias_Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        alias_Scene_Menu_create.call(this);
        this.prepareInteraction();
        this.initWithWindowPosition();
    };          

})(RS.WXPos);

