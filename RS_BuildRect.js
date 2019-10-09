//================================================================
// RS_BuildRect.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_BuildRect>
 * @author biud436
 * 
 * @param alpha
 * @type number
 * @desc Specify the alpha value.
 * @default 0.7
 * @decimals 1
 * 
 * @param color
 * @desc Specify the color value
 * @default 0xff0000
 *          
 * @help
 * This plugin allows you to draw the rectangle on your screen and 
 * you can export a json file to your data folder.
 * 
 * Notice that this plugin can use only in PC platform.
 * 
 * To save the json file, please press keys Ctrl + F7!
 * 
 * ================================================================
 * Change Log
 * ================================================================
 * 2019.10.09 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_BuildRect = true;

var RS = RS || {};
RS.BuildRect = RS.BuildRect || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_BuildRect>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = {};
    $.Params.rectColor = Number(parameters['color'] || 0xff0000);
    $.Params.rectAlpha = Number(parameters['alpha'] || 0.7);

    class RFactory extends Sprite {

        constructor() {
            super();
            this.clearFlags();
            this.createGraphics();
            this.on('removed', this.terminate, this);
        }

        clearFlags() {
            this._isReady = false;
            this._data = [];
            this._isMouseMovement = false;
            this._endX = 0;
            this._endY = 0;
            this._startX = 0;
            this._startY = 0;
            
            this._multiLayer = new PIXI.Sprite();
            this.addChild(this._multiLayer);

            this.createPrimitive();
        }

        createPrimitive() {
            this._primitive = new Rectangle(0, 0, 0, 0);
        };

        createGraphics() {
            this._canvas = new PIXI.Graphics();   
            this._canvas.alpha = $.Params.rectAlpha;         
            this.addChild(this._canvas);
            
            if(this._canvas) {
                this._isReady = true;
            }
        }

        createTextLayer(...args) {
            const style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 20,
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2,
                wordWrap: true,
                wordWrapWidth: 200
            });
            if(this._textLayer) {
                this.removeChild(this._textLayer);
            }
            let text = '';
            const argc = args.length;
            
            if(argc === 1) {
                if(args[0] instanceof PIXI.Rectangle) {
                    const rect = args[0];
                    text = `x : ${rect.x}, y : ${rect.y}, width : ${rect.width}, height : ${rect.height}`;
                } else {
                    text = `${args[0]}`;
                }
            } else if(argc === 4) {
                text = `x : ${args[0]}, y : ${args[1]}, width : ${args[2]}, height : ${args[3]}`;
            }

            this._textLayer = new PIXI.Text(text.split(", ").join("\r\n"), style);
            this._textLayer.x = 0;
            this._textLayer.y = 0;
            this.addChild(this._textLayer);
        }

        drawTempRect(x, y, width, height, color = $.Params.rectColor) {

            if(!this._isReady) return false;

            if(width < 0) {
                width = 1;
            }

            if(height < 0) {
                height = 0;
            }       

            if(typeof color !== 'number') {
                color = $.Params.rectColor;
            }
            
            const canvas = this._canvas;

            canvas.beginFill(color);
            canvas.drawRect(x, y, width, height);
            canvas.endFill();

        }

        /**
         * 
         * @param {PIXI.Rectangle} rect 
         * @param {Number} color 
         */
        addRect(rect, color) {

            if(!this._isReady) return false;

            if(!(rect instanceof PIXI.Rectangle)) {
                rect = new PIXI.Rectangle(0, 0, 1, 1);
            }

            if(rect.width < 0) {
                rect.width = 1;
            }

            if(rect.height < 0) {
                rect.height = 0;
            }       

            const canvas = new PIXI.Graphics();
            canvas.alpha = $.Params.rectAlpha;

            if(typeof color !== 'number') {
                color = $.Params.rectColor;
            }            

            canvas.beginFill(color);
            canvas.drawRect(rect.x, rect.y, rect.width, rect.height);
            canvas.endFill();

            this._multiLayer.addChild(canvas);
            
            this._data.push(rect.clone());

        }

        clear() {
            const canvas = this._canvas;
            canvas.clear();
        }

        update() {
            super.update();
        }

        terminate() {
            if(this._isReady && this._canvas) {
                this.removeChild(this._canvas);
                this._canvas = null;
                this._isReady = false;
            }
        }

        /**
         * 
         * @param {MouseEvent} event 
         */
        onMouseDown(event) {

            this._isMouseMovement = true;

            const x = Graphics.pageToCanvasX(event.clientX);
            const y = Graphics.pageToCanvasY(event.clientY);

            if(!this._primitive) {
                this.createPrimitive();
            }

            this._startX = x;
            this._startY = y;

            this.clear();

        }

        /**
         * 
         * @param {MouseEvent} event 
         */
        onFlush(event) {
            if(!this._primitive) {
                this.createPrimitive();
            }

            let endX = Graphics.pageToCanvasX(event.clientX);
            let endY = Graphics.pageToCanvasY(event.clientY); 
            const startX = this._startX;
            const startY = this._startY;

            this._primitive.x = Math.min(startX, endX);
            this._primitive.y = Math.min(startY, endY);
            this._primitive.width = Math.max(startX, endX) - this._primitive.x;
            this._primitive.height = Math.max(startY, endY) - this._primitive.y;

            const d = Math.sqrt(Math.pow(this._primitive.width - this._primitive.x, 2) + Math.pow(this._primitive.height - this._primitive.y, 2));

            this.createTextLayer(this._primitive);
            
            return (d >= 5) ? true : false;

        }        

        /**
         * 
         * @param {MouseEvent} event 
         */
        onMouseMove(event) {
            if( this._isMouseMovement) {

                if(this.onFlush(event)) {
                    this.clear();
    
                    this.drawTempRect(
                        this._primitive.x, 
                        this._primitive.y, 
                        this._primitive.width, 
                        this._primitive.height, 
                        $.Params.rectColor);                    
                }

            }
        }

        /**
         * 
         * @param {MouseEvent} event 
         */
        onMouseUp(event) {

            if(this.onFlush(event)) {
                this.clear();
                this.addRect(this._primitive, $.Params.rectColor); 
                this._isMouseMovement = false;                
            }

        }        

        onSave() {
            const fs = require('fs');
            const path = require('path');
            const mainDir = path.join(process.mainModule.filename, "..");
            const retPath = path.join(mainDir, "data", "rect.json")
            const retData = JSON.stringify(this._data, null, "\t");

            let chooser = document.createElement('input');
            chooser.style.display = "none";
            chooser.id = "fileDialog";
            chooser.type = "file";
            chooser.nwsaveas = "rect.json";
            chooser.setAttribute('nwworkingdir', mainDir);

            chooser.addEventListener("change", () => {
                const filename = chooser.value;
                fs.writeFile(filename, retData, err => {
                    if(err) {
                        console.warn(`RS_BuildRect error! : ${err.message}`);
                    }
                    this.createTextLayer(`Successfully saved!! \n${filename}`);

                    this._multiLayer.removeChildren();
                    this._data = [];
                    this._primitive = new Rectangle(0, 0, 1, 1);
                    
                    setTimeout(() => {
                        this.removeChild(this._textLayer);
                    }, 1000);

                });
            });

            chooser.click();
        
        };

        /**
         * 
         * @param {KeyboardEvent} event 
         */
        onKeyDown(event) {
            const keycode = event.keyCode || event.which;
            if(keycode == 118 && event.ctrlKey) {
                this.onSave();
            }
        }

    }

    let alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        alias_Scene_Map_start.call(this);
        this._rectFactory = new RFactory();
        this.addChild(this._rectFactory);

        document.body.addEventListener('mousedown', this._rectFactory.onMouseDown.bind(this._rectFactory));
        document.body.addEventListener('mousemove', this._rectFactory.onMouseMove.bind(this._rectFactory));
        document.body.addEventListener('mouseup', this._rectFactory.onMouseUp.bind(this._rectFactory));
        document.body.addEventListener('keydown',  this._rectFactory.onKeyDown.bind(this._rectFactory))
    };

    let alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        if(!this._rectFactory) return;
        document.body.removeEventListener('mousedown', this._rectFactory.onMouseDown.bind(this._rectFactory));
        document.body.removeEventListener('mousemove', this._rectFactory.onMouseMove.bind(this._rectFactory));
        document.body.removeEventListener('mouseup', this._rectFactory.onMouseUp.bind(this._rectFactory));        
        document.body.removeEventListener('keydown',  this._rectFactory.onKeyDown.bind(this._rectFactory))
        alias_Scene_Map_terminate.call(this);
    };

    Scene_Map.prototype.processMapTouch = function() {
    };        
    
})(RS.BuildRect);