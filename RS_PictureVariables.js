//================================================================
// RS_PictureVariables.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to get the size of specific picture <RS_PictureVariables>
 * @author biud436
 * 
 * @param Picture Width ID
 * @type variable
 * @desc Specify the id of the variable that would get the picture width.
 * @default 10
 * 
 * @param Picture Height ID
 * @type variable
 * @desc Specify the id of the variable that would get the picture height.
 * @default 11
 * 
 * @help
 * =============================================================
 * Version Log
 * =============================================================
 * 2018.12.18 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_PictureVariables = true;

var RS = RS || {};
RS.PictureVariables = RS.PictureVariables || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_PictureVariables>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = {};
    $.Params.pictureWidthId = parseInt(parameters["Picture Width ID"] || 10);
    $.Params.pictureHeightId = parseInt(parameters["Picture Height ID"] || 11);

    //================================================
    // Sprite_Picture
    //================================================    
    var alias_Spriteset_Base_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function() {
        alias_Spriteset_Base_initialize.call(this);
        this.on('get_picture_size', this.notifyPictureSize, this);
    };    

    Spriteset_Base.prototype.notifyPictureSize = function() {
        this._pictureContainer.children.forEach(function(picture) {
            picture.emit('get_size');
        });
    };

    //================================================
    // Sprite_Picture
    //================================================

    var alias_Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        alias_Sprite_Picture_loadBitmap.call(this);
        this.on('get_size', this.getSize, this);
    };    

    Sprite_Picture.prototype.getSize = function() {
        var picture = this.picture();
        if(!picture) return;
        if(picture.name() === '')  return;
        if(!this.bitmap) return;
        var w = this.bitmap.width;
        var h = this.bitmap.height;
        picture.getSize(w, h);
        this.off('get_size', this.getSize, this);
    };

    //================================================
    // Game_Picture
    //================================================    

    var alias_Game_Picture_initialize = Game_Picture.prototype.initialize;
    Game_Picture.prototype.initialize = function() {
        alias_Game_Picture_initialize.call(this);
        this.initVariables();
    };

    Game_Picture.prototype.initVariables = function() {
        this.variableIds = [0, 0];
        this._width = 0;
        this._height = 0;
    };

    Game_Picture.prototype.setIds = function() {
        if(arguments.length === 0) return;
        this.variableIds[0] = parseInt(arguments[0]);
        this.variableIds[1] = parseInt(arguments[1]);
    };

    Game_Picture.prototype.ids = function() {
        return this.variableIds;
    };

    Game_Picture.prototype.getSize = function(w, h) {
        this._width = w;
        this._height = h;
        if(this.isValidVariableSize()) {
            var ids = this.ids();
            $gameVariables.setValue(ids[0], this._width);
            $gameVariables.setValue(ids[1], this._height);
        }
    };

    Game_Picture.prototype.isValidVariableSize = function() {
        var ids = this.ids();
        var ret = false;
        if(!ids.contains(0)) {
            ret = true;
        }

        return ret;
    };

    //================================================
    // Game_Interpreter
    //================================================       

    // Show Picture
    var alias_Game_Interpreter_command231 = Game_Interpreter.prototype.command231;
    Game_Interpreter.prototype.command231 = function() {
        var ret = alias_Game_Interpreter_command231.call(this);   
        var params = this._params;
        $gameScreen.picture(params[0]).setIds(
            $.Params.pictureWidthId, 
            $.Params.pictureHeightId);
        if(SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.emit('get_picture_size');
        }
        return ret;            
    };
    
})(RS.PictureVariables);