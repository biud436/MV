/*:
 * @plugindesc (v1.0.2) This plugin allows you to show up the version anywhere.
 * @author biud436
 *
 * @param Version
 * @desc Indicate the text with a version
 * @default 1.0
 *
 * @param visible
 * @desc set whether the version shows up on the screen
 * @default true
 *
 * @param --- Font
 * @desc
 * @default
 *
 * @param textSize
 * @desc Specify a size of the version text
 * @default 14
 *
 * @param textColor
 * @desc Specify a color of the version text
 * @default rgb(56, 150, 119)
 *
 * @param outlineColor
 * @desc Specify a outline color of the version text
 * @default rgb(255, 255, 255)
 *
 * @param outlineWidth
 * @desc Specify a outline width of the version text
 * @default 2
 *
 * @param defaultText
 * @desc Specify the prefix in front a text
 * @default Version :
 *
 * @param textAlign
 * @desc Sets up a text align as you want
 * @default right
 *
 * @param opacity
 * @desc Sets up the text opacity
 * @default 255
 *
 * @param -- Position
 * @desc
 * @default
 *
 * @param Position
 * @desc Specify either 'Bottom' or 'Top' positions.
 * @default Bottom
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * The command is that shows a version text :
 *    VersionLayer true
 *
 * The command is that hides a version text :
 *    VersionLayer false
 *
 * -----------------------------------------------------------------------------
 * Version Log
 * -----------------------------------------------------------------------------
 * 2015.12.13 (v1.0.0) - First Release
 * 2016.08.23 (v1.0.1) - Fixed and Added Parameters.
 * 2016.08.23 (v1.0.2) - Added position parameter.
 */

var Imported = Imported || {};
Imported.RS_VersionLayer = true;

(function () {

  var parameters = PluginManager.parameters("RS_VersionLayer");
  var params = [
    String(parameters["Version"] || '1.0'),
    Number(parameters['fontSize'] || 14),
    String(parameters['textColor'] || "rgb(56, 150, 119)"),
    String(parameters['outlineColor'] || "rgb(255, 255, 255)"),
    Number(parameters['outlineWidth'] || 2),
    String(parameters['defaultText'] || 'Version : '),
    String(parameters['textAlign'] || 'right'),
    Boolean(parameters['visible'] === 'true'),
    Number(parameters['opacity'] || 255),
    String(parameters['Position'] || 'Top'),
    false
  ];

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
    var width = this.bitmap.width;
    var height = this.bitmap.height;
    this.visible = params[7];
    this.opacity = params[8];
    this.bitmap.clear();
    this.bitmap.fontSize = params[1];
    this.bitmap.textColor = params[2];
    this.bitmap.outlineColor = params[3];
    this.bitmap.outlineWidth = params[4];
    this.bitmap.drawText(params[5] + ' ' + params[0], 0, 0, width, height, params[6]);
  };

  VersionLayer.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if(params[10]) {
      this.refresh();
      params[10] = false;
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
  };

  var alias_Scene_Base_terminate = Scene_Base.prototype.terminate;
  Scene_Base.prototype.terminate = function () {
    if(alias_Scene_Base_terminate) alias_Scene_Base_terminate.call(this);
    this.removeChild(this._versionLayer);
  };

  Scene_Base.prototype.createVersionLayer = function () {
    var pos = params[9].toLowerCase();
    var padding = 1;
    var fontSize = params[1] + 2;
    this._versionLayer = new VersionLayer(new Bitmap(Graphics.boxWidth, fontSize));
    this._versionLayer.y = (pos === 'bottom') ? (Graphics._renderer.height - fontSize - padding) : padding;
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
            params.splice(7, 1, true);
            params.splice(10, 1, true);
            break;
          case 'false':
            params.splice(7, 1, false);
            params.splice(10, 1, true);
            break;
        }
      }
  };


})();
