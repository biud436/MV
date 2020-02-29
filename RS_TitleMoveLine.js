//================================================================
// RS_TitleMoveLine.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_TitleMoveLine>
 * @author biud436
 * 
 * @param Max Lines
 * @type number
 * @min 1
 * @desc Set the max lines that creates on the screen
 * @default 8
 * @max 30
 * 
 * @param Line Width
 * @type string
 * @desc Specify the evaluate expression that gets the line width.
 * @default Math.floor(Graphics.boxWidth / 40)
 * 
 * @param Bitmap Color
 * @type string
 * @desc Specify the color of the bitmap.
 * @default rgba(255, 255, 255, 1)
 * 
 * @param Opacity
 * @type string
 * @desc Specify the evaluate expression that gets an opacity
 * @default 64 + Math.randomInt(64)
 * 
 * @param Scale
 * @type string
 * @desc Specify the evaluate expression that gets the scale
 * @default 1.0 + Math.random()
 * 
 * @param Move Speed
 * @type string
 * @desc Specify the evaluate expression that gets the move speed of line.
 * @default 2 + Math.random() * 4
 * 
 * @param Replace Bitmap As Image
 * @require 1
 * @desc Choose the image file if you want to replace as image.
 * @default
 * @dir img/pictures/
 * @type file
 * 
 * @help
 * This plugin allows you to move vertical lines on the screen. 
 * if the line collides with the out of screen, it will be changed the direction of movement.
 * ================================================================
 * Version Log
 * ================================================================
 * 2020.02.29 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_TitleMoveLine = true;

var RS = RS || {};
RS.TitleMoveLine = RS.TitleMoveLine || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_TitleMoveLine>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    RS.TitleMoveLine.Params = {};
    RS.TitleMoveLine.Params.maxLines = Number(parameters["Max Lines"] || 8);
    RS.TitleMoveLine.Params.lineWidth = parameters["Line Width"];
    RS.TitleMoveLine.Params.bitmapColor = parameters["Bitmap Color"];

    RS.TitleMoveLine.Params.opacityEval = parameters["Opacity"];
    RS.TitleMoveLine.Params.scaleXEval = parameters["Scale"];
    RS.TitleMoveLine.Params.moveSpeedEval = parameters["Move Speed"];

    RS.TitleMoveLine.Params.imageName = parameters["Replace Bitmap As Image"] || "";

    //================================================================
    // Sprite_MoveLine
    //================================================================    

    class Sprite_MoveLine extends Sprite {
        constructor(bitmap) {
            super(bitmap);
            this.initMembers();
        }

        initMembers() {
            this.opacity = eval(RS.TitleMoveLine.Params.opacityEval);
            this.scale.x = eval(RS.TitleMoveLine.Params.scaleXEval);
            this._power = eval(RS.TitleMoveLine.Params.moveSpeedEval);
        }

        update() {
            super.update();

            const width = Graphics.boxWidth;

            this.x += this._power;

            if(this.x > width || this.x < 0) {
                this._power *= -1;
            }
        }

    }

    class Scene_TitleMoveLine extends Scene_Title {

        start() {
            super.start();

            this.createLineBitmap();    
            this.initWithLines();

        }

        createLineBitmap() {
            const lineWidth = eval(RS.TitleMoveLine.Params.lineWidth);
            const lineHeight = Graphics.boxHeight;
            const imageName = RS.TitleMoveLine.Params.imageName;
            let bitmap = null;

            if(imageName !== "") {
                bitmap = ImageManager.loadPicture(imageName);
            }

            this._lineBitmap = bitmap ? bitmap : new Bitmap(lineWidth, lineHeight);
            if(!bitmap) {
                this._lineBitmap.fillAll(RS.TitleMoveLine.Params.bitmapColor);
            }

        }

        initWithLines() {
            this._lines = this.getLines();
            this.nextLines();
        }        

        nextLines() {
            let line = this._lines.next();
            if(!line.done) {
                const child = line.value;
                const index = this.getChildIndex(this._windowLayer) - 1;
                this.addChildAt(child, index);
                this.nextLines();
            }
        }        

        *getLines() {
            const maxLines = RS.TitleMoveLine.Params.maxLines;
            const boxWidth = Graphics.boxWidth;
            
            for(let i = 0; i < maxLines; i++) {
                
                const sprite = new Sprite_MoveLine();
                
                sprite.bitmap = this._lineBitmap;
                sprite.x = Math.random() * boxWidth;
                sprite.y = 0;

                yield sprite;
            }
        }        
    }

    window.Scene_Title = Scene_TitleMoveLine;
    
})(RS.TitleMoveLine);