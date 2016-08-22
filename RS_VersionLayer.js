/*:
 * @plugindesc (v1.1.0) This plugin shows up the version anywhere.
 * @author biud436
 *
 * @param Version
 * @desc
 * @default 1.0
 *
 * @param visible
 * @desc
 * @default true
 *
 * @param --- Font
 * @desc
 * @default
 *
 * @param textSize
 * @desc
 * @default 14
 *
 * @param textColor
 * @desc
 * @default rgb(56, 150, 119)
 *
 * @param outlineColor
 * @desc
 * @default rgb(255, 255, 255)
 *
 * @param outlineWidth
 * @desc
 * @default 2
 *
 * @param defaultText
 * @desc
 * @default Version :
 *
 * @param textAlign
 * @desc
 * @default right
 *
 * @param opaicty
 * @desc
 * @default 255
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 * VersionLayer true
 * VersionLayer false
 * -----------------------------------------------------------------------------
 * Version Log
 * -----------------------------------------------------------------------------
 * 2015.12.13 (v1.0.0) - First Release
 * 2016.08.23 (v1.1.0) - Fixed and Added Parameters.
 */

(function () {

  var parameters = PluginManager.parameters("RS_VersionLayer");
  var version = String(parameters["Version"] || '1.0');
  var fontSize = Number(parameters['fontSize'] || 14);
  var textColor = String(parameters['textColor'] || "rgb(56, 150, 119)");
  var outlineColor =  String(parameters['outlineColor'] || "rgb(255, 255, 255)");
  var outlineWidth = Number(parameters['outlineWidth'] || 2);
  var defaultText = String(parameters['defaultText'] || 'Version : ');
  var textAlign = String(parameters['textAlign'] || 'right');
  var visible = Boolean(parameters['visible'] === 'true');
  var opacity = Number(parameters['opaicty'] || 255);
  var bitmapRefresh = false;

  //----------------------------------------------------------------------------
  // VersionLayer
  //
  //

  function VersionLayer() {
    this.initialize.apply(this, arguments);
  };

  VersionLayer.prototype = Object.create(Sprite.prototype);
  VersionLayer.prototype.constructor = VersionLayer;

  VersionLayer.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.refresh();
  };

  VersionLayer.prototype.refresh = function () {
    if(!this.bitmap) return;
    var width = this.bitmap.width, height = this.bitmap.height;
    this.visible = visible;
    this.opacity = opacity;
    this.bitmap.clear();
    this.bitmap.fontSize = fontSize;
    this.bitmap.textColor = textColor;
    this.bitmap.outlineColor = outlineColor;
    this.bitmap.outlineWidth = outlineWidth;
    this.bitmap.drawText(defaultText + ' ' + version, 0, 0, width, height, textAlign);
  };

  VersionLayer.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if(bitmapRefresh) {
      this.refresh();
      bitmapRefresh = false;
    }
  };

  //----------------------------------------------------------------------------
  // Scene_Base
  //
  //

  var alias_Scene_Base_create = Scene_Base.prototype.create;
  Scene_Base.prototype.create = function() {
    alias_Scene_Base_create.call(this);
    this.createVersionLayer();
  };

  var alias_Scene_Base_start = Scene_Base.prototype.start;
  Scene_Base.prototype.start = function () {
    alias_Scene_Base_start.call(this);
    this.addVersionLayer();
  }

  Scene_Base.prototype.createVersionLayer = function () {
    this._versionLayer = new VersionLayer(new Bitmap(Graphics.boxWidth, fontSize + 2));
  };

  Scene_Base.prototype.addVersionLayer = function () {
    var length = this.children.length;
    this.addChildAt(this._versionLayer, length);
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "VersionLayer") {
        switch(args[0]) {
          case 'true':
            visible = true;
            bitmapRefresh = true;
            break;
          case 'false':
            visible = false;
            bitmapRefresh = true;
            break;
        }
      }
  };


})();
