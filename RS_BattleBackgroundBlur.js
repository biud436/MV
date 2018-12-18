/*:
 * @plugindesc This plugin allows you to shows up the radial blur to bitmap. <RS_BattleBackgroundBlur>
 * @author biud436
 * 
 * @param Opacity
 * @text Opacity
 * @type number
 * @desc applying with the image alpha when composing the image
 * (default value : 0.7)
 * @default 0.7
 * @decimals 1
 * @min 0
 * 
 * @param Initial Rotation
 * @type number
 * @min -360.00
 * @desc Specify the initial rotation.
 * @default -120.00
 * @decimals 2
 * 
 * @help
 * =============================================================
 * Version Log
 * =============================================================
 * 2018.12.18 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_BattleBackgroundBlur = true;

var RS = RS || {};
RS.BattleBackgroundBlur = RS.BattleBackgroundBlur || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_BattleBackgroundBlur>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = $.Params || {};
    $.Params.opacity = parseFloat(parameters["Opacity"] || 0.7);
    $.Params.initialRotation = parseFloat(parameters["Initial Rotation"] || -120.0);

    /**
     * Applies a radial blur to the bitmap. 
     * @param {Number} angle angle is used to specify an angle from 0 to 360. 
     * The larger the number, the greater the roundness.
     * @param {Number} division division is the division number (from 2 to 100). 
     * The larger the number, the smoother it will be. This process is very time consuming.
     * 
     * This allows us to use implement as the filter instead of the funtion called 'radial_blur' of the bitmap.
     * refer to the link, as follows :
     * link : https://github.com/pixijs/pixi-filters/blob/master/filters/radial-blur/src/radial-blur.frag
     * 
     * If you use the plugin called 'Filter Controller', its filter could easy to use.
     * 
     */
    Bitmap.prototype.radialBlur = function(angle, division) {

        // There are two blur method called Spin, Zoom in the photoshop!
        // But, We are used the regacy trick.

        division = division.clamp(2, 100);

        var w = this.width;
        var h = this.height;
        var canvas = this._canvas;
        var context = this._context;        

        context.save();

        // The variable for performance.
        var toRadian = Math.PI / 180.0; 

        // Sets the temp blur function.
        var _blur = function() {
            for (var i = 0; i < 2; i++) {
                var tempCanvas = document.createElement('canvas');
                var tempContext = tempCanvas.getContext('2d');
                tempCanvas.width = w + 2;
                tempCanvas.height = h + 2;
                tempContext.drawImage(canvas, 0, 0, w, h, 1, 1, w, h);
                tempContext.drawImage(canvas, 0, 0, w, 1, 1, 0, w, 1);
                tempContext.drawImage(canvas, 0, 0, 1, h, 0, 1, 1, h);
                tempContext.drawImage(canvas, 0, h - 1, w, 1, 1, h + 1, w, 1);
                tempContext.drawImage(canvas, w - 1, 0, 1, h, w + 1, 1, 1, h);
                context.save();
                context.fillStyle = 'black';
                context.fillRect(0, 0, w, h);
                context.globalCompositeOperation = 'lighter';
                context.globalAlpha = 1 / 9;
                for (var y = 0; y < 3; y++) {
                    for (var x = 0; x < 3; x++) {
                        context.drawImage(tempCanvas, x, y, w, h, 0, 0, w, h);
                    }
                }
                context.restore();
            }
        };

        // Create a new bitmap data and then draw it by the division value.
        var n = (angle / (division - 1));
        var halfWidth = w * 0.5;
        var halfHeight = h * 0.5;

        for(var i = 0; i < division; ++i) {
            // remove this
            var _rotation = ($.Params.initialRotation + (i * n));
            context.save();
            context.translate(halfWidth, halfHeight);
            context.rotate(toRadian * _rotation);      
            context.globalCompositeOperation = 'source-over';
            context.globalAlpha = $.Params.opacity;
            context.translate(-halfWidth, -halfHeight);
            context.drawImage(canvas, 0, 0);
            context.restore(); 
        }

        this.blur();

        context.restore();

        this._setDirty();
    };

    Spriteset_Battle.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();

        // The proportional expression.
        // 544 : 120 = 816 : x
        // 544 : 16 = 816 : x
        var angle = Math.floor((120 * Graphics.boxWidth) / 544.0);
        var division = Math.floor((16 * Graphics.boxWidth) / 544.0);

        this._backgroundSprite.bitmap.radialBlur(angle, division);
        this._baseSprite.addChild(this._backgroundSprite);
    };    
    
})(RS.BattleBackgroundBlur);