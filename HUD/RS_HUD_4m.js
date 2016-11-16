/*:
 * RS_HUD_4m.js
 * @plugindesc (v1.1.8) This plugin draws the HUD, which displays the hp and mp and exp and level of each party members.
 *
 * @author biud436
 * @since 2015.10.31
 * @date 2016.01.12
 *
 * @param --- Image Name
 * @desc
 * @default
 *
 * @param EXP Gauge
 * @desc
 * @default exr
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Empty Gauge
 * @desc
 * @default gauge
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param HP Gauge
 * @desc
 * @default hp
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param MP Gauge
 * @desc
 * @default mp
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param HUD Background
 * @desc
 * @default hud_window_empty
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Masking
 * @desc
 * @default masking
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param --- Image Custom Position
 * @desc
 * @default
 *
 * @param Face Position
 * @desc x, y, visible
 * (default : 0, 0, true)
 * @default 0, 0, true
 *
 * @param HP Position
 * @desc x, y, visible
 * (default : 160, 43, true)
 * @default 160, 43, true
 *
 * @param MP Position
 * @desc x, y, visible
 * (default : 160, 69, true)
 * @default 160, 69, true
 *
 * @param EXP Position
 * @desc x, y, visible
 * (default : 83, 91, true)
 * @default 83, 91, true
 *
 * @param HP Text Position
 * @desc x, y, visible
 * (default : 160, 53, true)
 * @default 160, 53, true
 *
 * @param MP Text Position
 * @desc x, y, visible
 * (default : 160, 79, true)
 * @default 160, 79, true
 *
 * @param Level Text Position
 * @desc x, y, visible
 * (default : 60, 80, true)
 * @default 60, 80, true
 *
 * @param EXP Text Position
 * @desc x, y, visible
 * (default : 120.5, 93, true)
 * @default 120.5, 93, true
 *
 * @param Name Text Position
 * @desc x, y, visible
 * (default : 54, 53, false)
 * @default 54, 53, false
 *
 * @param --- Noraml
 * @desc
 * @default
 *
 * @param Width
 * @desc Width (default : 317)
 * Do not change this when you are using the default sprite batch.
 * @default 317
 *
 * @param Height
 * @desc Height (default : 101)
 * Do not change this when you are using the default sprite batch.
 * @default 101
 *
 * @param Margin
 * @desc Sets the margin to the HUD borders.
 * @default 0
 *
 * @param Gaussian Blur
 * @desc Sets the Gaussian Blur.
 * @default true
 *
 * @param Show
 * @desc Sets the visible status. (default : true)
 * @default true
 *
 * @param Opacity
 * @desc Sets the opacity.
 * @default 255
 *
 * @param Arrangement
 * @desc Create an array to set the anchor of each HUD.
 * ['LeftTop', 'LeftBottom', 'RightTop', 'RightBottom']
 * @default ['LeftTop', 'LeftBottom', 'RightTop', 'RightBottom']
 *
 * @param Anchor
 * @desc If anchor is not found, HUD would set to this anchor.
 * @default LeftTop
 *
 * @param preloadImportantFaces
 * @desc Allow you to pre-load the base face chips.
 * (If you do not set this parameter, It can cause errors in the game.)
 * @default ['Actor1', 'Actor2', 'Actor3']
 *
 * @param Battle Only
 * @desc If you want to use the HUD only in battles.
 * (default : false)
 * @default false
 *
 * @param Show Comma
 * @desc Sets the value that indicates whether this parameter displays
 * the values with commas every three digits.
 * @default false
 *
 * @param Max Exp Text
 * @desc
 * @default ------/------
 *
 * @param --- Font
 * @desc
 * @default
 *
 * @param Chinese Font
 * @desc
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Font
 * @desc
 * @default NanumGothic, Dotum, AppleGothic, sans-serif
 *
 * @param Standard Font
 * @desc
 * @default GameFont
 *
 * @param Level Text Size
 * @desc
 * @default 24
 *
 * @param HP Text Size
 * @desc
 * @default 12
 *
 * @param MP Text Size
 * @desc
 * @default 12
 *
 * @param EXP Text Size
 * @desc
 * @default 12
 *
 * @param Name Text Size
 * @desc
 * @default 12
 *
 * @param --- Text Color
 * @desc
 * @default
 *
 * @param HP Color
 * @desc
 * @default #ffffff
 *
 * @param MP Color
 * @desc
 * @default #ffffff
 *
 * @param EXP Color
 * @desc
 * @default #ffffff
 *
 * @param Level Color
 * @desc
 * @default #ffffff
 *
 * @param Name Color
 * @desc
 * @default #ffffff
 *
 * @param --- Text Outline Color
 * @desc
 * @default
 *
 * @param HP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param MP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param EXP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Level Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Name Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param --- Text Outline Width
 * @desc
 * @default
 *
 * @param HP Outline Width
 * @desc
 * @default 4
 *
 * @param MP Outline Width
 * @desc
 * @default 4
 *
 * @param EXP Outline Width
 * @desc
 * @default 4
 *
 * @param Level Outline Width
 * @desc
 * @default 4
 *
 * @param Name Outline Width
 * @desc
 * @default 4
 *
 * @param --- Custom Font
 * @desc
 * @default
 *
 * @param Using Custom Font
 * @desc
 * @default false
 *
 * @param Custom Font Name
 * @desc
 * @default NanumBrush
 *
 * @param Custom Font Src
 * @desc
 * @default fonts/NanumBrush.ttf
 *
 * @param --- Custom HUD Anchor
 * @desc
 * @default
 *
 * @param Custom Pos 1
 * @desc
 * @default 0, 0
 *
 * @param Custom Pos 2
 * @desc
 * @default 0, 110
 *
 * @param Custom Pos 3
 * @desc
 * @default 0, 220
 *
 * @param Custom Pos 4
 * @desc
 * @default 0, 330
 *
 * @help
 * =============================================================================
 * Installations
 * =============================================================================
 * Download the resources and place them in your img/pictures folder.
 * All the resources can download in the following link.
 * Resources Link : https://www.dropbox.com/s/umjlbgfgdts2rf7/pictures.zip?dl=0
 *
 * In Plugin Manager,
 * You have to pre-load the resources using the parameter called 'preloadImportantFaces'.
 *
 * Demo Link : https://www.dropbox.com/s/v6prurtempabqqv/hud.zip?dl=0
 * Github Link : https://github.com/biud436/MV/blob/master/HUD/RS_HUD_4m.js
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 *
 * - Sets the opacity
 * Sets the opacity of the HUD to x. That is a number between 0 and 255.
 * $gameHud.opacity = 0;
 *
 * - Sets the visible
 * This variable will change the visible option of the HUD.
 * $gameHud.show = true;
 * $gameHud.show = false;
 *
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 *
 * RS_HUD Opacity x
 * the x is number value between 0 and 255.
 *
 * RS_HUD Visible true
 * Setting the HUD's visible status to true
 *
 * RS_HUD Visible false
 * Setting the HUD's visible status to false.
 *
 * RS_HUD import file_name
 * Import the parameter as the json file from your data folder.
 *
 * RS_HUD export file_name
 * Export the parameter as the json file to your data folder.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2015.10.31 (v1.0.0) - First Release Date
 * 2016.02.24 (v1.0.1) - Added the Plugin Command.
 * 2016.03.04 (v1.0.2) - Added the comments for include used files.
 * 2016.03.18 (v1.0.3) - Added the parameter called 'Arrangement'
 * 2016.03.26 (v1.0.4) - Fixed a bug that the HUD is always displayed regardless
 * of the setting whenever transferring the player to the other map.
 * 2016.05.05 (v1.0.5) - Fixed a bug that the text does not change.
 * 2016.05.17 (v1.0.6) - Fixed a structure of the class.
 * 2016.05.21 (v1.0.7) - Added the plugin parameter that can be able to display
 * the plugin in battle mode only.
 * 2016.05.21 (v1.0.8) - Fixed a bug of the opacity.
 * 2016.06.30 (v1.0.9) - Added the parameter that displays the values with commas every three digits.
 * 2016.07.30 (v1.1.0) - Added the parameter for setting fonts.
 * 2016.09.05 (v1.1.1) - Now you can change the image file name, and can also be used the option called 'exclude the unused files'.
 * 2016.09.13 (v1.1.2) - Added Max Exp Text and Fixed the exp rate.
 * 2016.09.26 (v1.1.3) :
 * - Added the function that could be repositioning with all the components,
 * - Added the glittering gauge-bar effects in lower HP or MP value.
 * - Added the function that can display the name.
 * - HUD's opacity will decrease if the player is colliding with HUD.
 * - the huds opacity will be decreased if the party member is dead.
 * 2016.09.27 (v1.1.4) :
 * - The visible setting sets as the false before calling the battle.
 * - Added the function that allows all plugin parameters to import or export.
 * 2016.10.08 (v1.1.5) - Fixed a bug that happens in battle.
 * 2016.10.11 (v1.1.6) :
 * - Fixed the bug that happens when certain party member is removed.
 * - Fixed the bug that is not controlled the opacity of HUD.
 * 2016.10.14 (v1.1.7) - Fixed the bug that causes the error called 'undefined
 * bitmap' when you are adding certain party member.
 * 2016.11.16 (v1.1.8) - Fixed a bug with the Battle Background.
 */

var Imported = Imported || {};
Imported.RS_HUD_4m = '1.1.8';

var $gameHud = null;
var RS = RS || {};
RS.HUD = RS.HUD || {};
RS.HUD.param = RS.HUD.param || {};

(function() {

  var parameters = PluginManager.parameters('RS_HUD_4m');

  // Image Settings
  RS.HUD.param.imgEXP = String(parameters['EXP Gauge'] || 'exr');
  RS.HUD.param.imgEmptyGauge = String(parameters['Empty Gauge'] || 'gauge');
  RS.HUD.param.imgHP = String(parameters['HP Gauge'] || 'hp');
  RS.HUD.param.imgMP = String(parameters['MP Gauge'] || 'mp');
  RS.HUD.param.imgEmptyHUD = String(parameters['HUD Background'] || 'hud_window_empty');
  RS.HUD.param.imgMasking = String(parameters['Masking'] || 'masking');

  // Image Position
  RS.HUD.loadImagePosition = function (szRE) {
    var target = szRE.match(/(.*),(.*),(.*)/i);
    var x = parseFloat(RegExp.$1);
    var y = parseFloat(RegExp.$2);
    var visible = Boolean(String(RegExp.$3).includes('true'));
    return {'x': x, 'y': y, 'visible': visible};
  };

  RS.HUD.loadCustomPosition = function (szRE) {
    var target = szRE.match(/(.*),(.*)/i);
    var x = parseFloat(RegExp.$1) || 0;
    var y = parseFloat(RegExp.$2) || 0;
    return new Point(x, y);
  };

  RS.HUD.loadRealNumber = function (paramName, val) {
    var value = Number(parameters[paramName]);
    switch (typeof(value)) {
      case 'object': case 'undefined':
        value = val;
        break;
    }
    return value;
  };

  RS.HUD.param.ptFace = RS.HUD.loadImagePosition(parameters['Face Position'] || '0, 0, true');
  RS.HUD.param.ptHP = RS.HUD.loadImagePosition(parameters['HP Position'] || '160, 43, true');
  RS.HUD.param.ptMP = RS.HUD.loadImagePosition(parameters['MP Position'] || '160, 69, true');
  RS.HUD.param.ptEXP = RS.HUD.loadImagePosition(parameters['EXP Position'] || '83, 91, true');
  RS.HUD.param.ptHPText = RS.HUD.loadImagePosition(parameters['HP Text Position'] || '160, 53, true');
  RS.HUD.param.ptMPText = RS.HUD.loadImagePosition(parameters['MP Text Position'] || '160, 79, true');
  RS.HUD.param.ptLevelText = RS.HUD.loadImagePosition(parameters['Level Text Position'] || '60, 80, true');
  RS.HUD.param.ptEXPText = RS.HUD.loadImagePosition(parameters['EXP Text Position'] || '120.5, 93, true');
  RS.HUD.param.ptNameText = RS.HUD.loadImagePosition(parameters['Name Text Position'] || '54, 53, true');

  // Normal Settings
  RS.HUD.param.nWidth = RS.HUD.loadRealNumber('Width', 317);
  RS.HUD.param.nHeight = RS.HUD.loadRealNumber('Height', 101);
  RS.HUD.param.nPD = RS.HUD.loadRealNumber('Margin', 0);
  RS.HUD.param.blurProcessing = Boolean(parameters['Gaussian Blur'] === "true");
  RS.HUD.param.bShow = Boolean(parameters['Show'] ==="true");
  RS.HUD.param.nOpacity = RS.HUD.loadRealNumber('Opacity', 255);

  RS.HUD.param.szAnchor = String(parameters['Anchor'] || "LeftTop");
  RS.HUD.param.arrangement = eval(parameters['Arrangement']);
  RS.HUD.param.preloadImportantFaces = eval(parameters['preloadImportantFaces'] || 'Actor1');
  RS.HUD.param.battleOnly = Boolean(parameters['Battle Only'] === "true");
  RS.HUD.param.showComma = Boolean(parameters['Show Comma'] === 'true');
  RS.HUD.param.maxExpText = String(parameters['Max Exp Text'] || "------/------");

  RS.HUD.getDefaultHUDAnchor = function () {
    var anchor = {
    "LeftTop": {x: RS.HUD.param.nPD, y: RS.HUD.param.nPD},
    "LeftBottom": {x: RS.HUD.param.nPD, y: Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD},
    "RightTop": {x: Graphics.boxWidth - RS.HUD.param.nWidth - RS.HUD.param.nPD, y: RS.HUD.param.nPD},
    "RightBottom": {x: Graphics.boxWidth - RS.HUD.param.nWidth - RS.HUD.param.nPD, y: Graphics.boxHeight - RS.HUD.param.nHeight - RS.HUD.param.nPD}
    };
    return anchor;
  };

  // Font Settings
  RS.HUD.param.chineseFont = String(parameters['Chinese Font'] || 'SimHei, Heiti TC, sans-serif');
  RS.HUD.param.koreanFont = String(parameters['Korean Font'] || 'NanumGothic, Dotum, AppleGothic, sans-serif');
  RS.HUD.param.standardFont = String(parameters['Standard Font'] || 'GameFont');

  // Text Size
  RS.HUD.param.levelTextSize = RS.HUD.loadRealNumber('Level Text Size', 12);
  RS.HUD.param.hpTextSize = RS.HUD.loadRealNumber('HP Text Size', 12);
  RS.HUD.param.mpTextSize = RS.HUD.loadRealNumber('MP Text Size', 12);
  RS.HUD.param.expTextSize = RS.HUD.loadRealNumber('EXP Text Size', 12);
  RS.HUD.param.nameTextSize = RS.HUD.loadRealNumber('Name Text Size', 12);

  // Text Color
  RS.HUD.param.szHpColor =  String(parameters['HP Color'] || '#ffffff');
  RS.HUD.param.szMpColor = String(parameters['MP Color'] || '#ffffff');
  RS.HUD.param.szExpColor = String(parameters['EXP Color'] || '#ffffff');
  RS.HUD.param.szLevelColor = String(parameters['Level Color'] || '#ffffff');
  RS.HUD.param.szNameColor = String(parameters['Name Color'] || '#ffffff');

  // Text Outline Color
  RS.HUD.param.szHpOutlineColor =  String(parameters['HP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szMpOutlineColor = String(parameters['MP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szExpOutlineColor = String(parameters['EXP Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szLevelOutlineColor = String(parameters['Level Outline Color'] || 'rgba(0, 0, 0, 0.5)');
  RS.HUD.param.szNameOutlineColor = String(parameters['Name Outline Color'] || 'rgba(0, 0, 0, 0.5)');

  // Text Outline Width
  RS.HUD.param.szHpOutlineWidth = RS.HUD.loadRealNumber('HP Outline Width', 4);
  RS.HUD.param.szMpOutlineWidth = RS.HUD.loadRealNumber('MP Outline Width', 4);
  RS.HUD.param.szExpOutlineWidth = RS.HUD.loadRealNumber('EXP Outline Width', 4);
  RS.HUD.param.szLevelOutlineWidth = RS.HUD.loadRealNumber('Level Outline Width', 4);
  RS.HUD.param.szNameOutlineWidth = RS.HUD.loadRealNumber('Name Outline Width', 4);

  // Custom Font
  RS.HUD.param.bUseCustomFont = Boolean(parameters['Using Custom Font'] === 'true');
  RS.HUD.param.szCustomFontName = String(parameters['Custom Font Name'] || 'GameFont' );
  RS.HUD.param.szCustomFontSrc = String(parameters['Custom Font Src'] || 'fonts/mplus-1m-regular.ttf');

  // Custom HUD Anchor
  RS.HUD.param.ptCustormAnchor = [];

  for(var i = 0; i < 4; i++) {
    RS.HUD.param.ptCustormAnchor.push( RS.HUD.loadCustomPosition(parameters['Custom Pos ' + (i + 1)] || '0, 0') );
  }

  RS.HUD.param.isCurrentBattleShowUp = false;
  RS.HUD.param.isPreviousShowUp = false;

  // Opacity and Tone  Glitter Settings
  var nOpacityEps = 5;
  var nOpacityMin = 64;
  var nFaceDiameter = 96;
  var nHPGlitter = 0.4;
  var nMPGlitter = 0.4;
  var nEXPGlitter = 0.7;
  var defaultTemplate = 'hud_default_template.json';

  //----------------------------------------------------------------------------
  // Data Imports & Exports
  //
  //

  RS.HUD.localFilePath = function (fileName) {
    if(!Utils.isNwjs()) return '';
    var path, base;
    path = require('path');
    base = path.dirname(process.mainModule.filename);
    return path.join(base, 'data/') + (fileName || defaultTemplate);
  };

  RS.HUD.exportData = function (fileName) {
    var fs, data, filePath;
    if(!Utils.isNwjs()) return false;
    if(!RS.HUD.param) return false;
    fs = require('fs');
    data = JSON.stringify(RS.HUD.param);
    filePath = RS.HUD.localFilePath(fileName);
    fs.writeFile(filePath, data, 'utf8', function (err) {
      if (err) throw err;
    });
  };

  RS.HUD.loadData = function (data) {
    var params = Object.keys(RS.HUD.param);
    data = JSON.parse(data);
    params.forEach(function (name) {
      RS.HUD.param[name] = data[name];
    }, this);
    setTimeout(function () {
      if($gameHud) $gameHud.refresh();
    }, 0);
  };

  RS.HUD.importData = function (fileName) {
    if(!Utils.isNwjs()) return false;
    var fs = require('fs');
    var filePath = RS.HUD.localFilePath(fileName);
    var data = fs.readFileSync(filePath, { encoding: 'utf8' });
    RS.HUD.loadData(data);
  };

  RS.HUD.importDataWithAjax = function (fileName) {
    var xhr = new XMLHttpRequest();
    var self = RS.HUD;
    var url = './data/' + (fileName || defaultTemplate);
    xhr.open('GET', url);
    xhr.onload = function() {
      if(xhr.status < 400) {
        RS.HUD.loadData(xhr.responseText.slice(0));
      }
    }
    xhr.send();
  };

  //----------------------------------------------------------------------------
  // Vector2
  //
  //

  function Vector2() {
      this.initialize.apply(this, arguments);
  };

  Vector2.prototype.constructor = Vector2;

  /**
   * @memberof Vector2
   * @return {Vector2} val
   */
  Vector2.empty = function() {
      return new Vector2(0.0, 0.0);
  };

  /**
   * @memberof Vector2
   * @function mix
   * @param {Vector2} vec1
   * @param {Vector2} vec2
   * @param {Number} t
   * @return {Number} val
   * @static
   */
  Vector2.mix = function(vec1, vec2, t) {
      var vec = Vector2.empty();
      vec.x = vec1.x + t * (vec2.x - vec1.x);
      vec.y = vec1.x + t * (vec2.y - vec1.y);
      return vec;
  };

  /**
   * @memberof Vector2
   * @function isNormalize
   * @param {Vector2} vec
   * @static
   */
  Vector2.isNormalize = function(vec) {
      if( (vec.x >= 0.0 && vec.x <= 1.0) &&
          (vec.y >= 0.0 && vec.y <= 1.0) ) {
        return true;
      }
      return false;
  };

  /**
   * @memberof Vector2
   * @function quadraticBezier
   * @param {Vector2} vec1  start vector
   * @param {Vector2} vec2  middle vector
   * @param {Vector2} vec3  end vector
   * @param {Number} t  frameTime(float between 0 and 1)
   * @return {Vector2} p
   * @static
   */
  Vector2.quadraticBezier = function(vec1, vec2, vec3, t) {
      var d, e, p;
      d = Vector2.mix(vec1, vec2, t);
      e = Vector2.mix(vec2, vec3, t);
      p = Vector2.mix(d, e, t);
      return p;
  };

  /**
   * @memberof Vector2
   * @function limitAngle
   * @param {Number} angle
   * @return {Number} angle
   * @static
   */
  Vector2.limitAngle = function(angle) {
      while(angle < -Math.PI) angle += Math.PI * 2;
      while(angle >= Math.PI) angle -= Math.PI * 2;
      return angle;
  };

  /**
   * @memberof Vector2
   * @function distance
   * @param {Vector2} vec1
   * @param {Vector2} vec2
   * @return {Number} dist
   * @static
   */
  Vector2.distance = function(vec1, vec2) {
      var val;
      val = Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2);
      return Math.sqrt(val);
  };

  /**
   * @constructor
   * @memberof Vector2
   * @param {Number} x
   * @param {Number} y
   */
  Vector2.prototype.initialize = function(x, y) {
      this._x = x;
      this._y = y;
  };

  /**
   * @method add
   * @param {Vector2} vec
   * @return {Vector2} this
   */
  Vector2.prototype.add = function (vec) {
    if(vec instanceof Number) {
      this.x = this.x + vec;
      this.y = this.y + vec;
      return this;
    } else if(vec instanceof Vector2){
      this.x = this.x + vec.x;
      this.y = this.y + vec.y;
      return this;
    }
    return Vector2.empty();
  };

  /**
   * @method minus
   * @param {Vector2} vec
   * @return {Vector2} this
   */
  Vector2.prototype.minus = function (vec) {
    if(vec instanceof Number) {
      this.x = this.x - vec;
      this.y = this.y - vec;
      return this;
    } else if(vec instanceof Vector2){
      this.x = this.x - vec.x;
      this.y = this.y - vec.y;
      return this;
    }
    return Vector2.empty();
  };

  /**
   * @method div
   * @param {Vector2} vec
   * @return {Vector2} this
   *
   */
  Vector2.prototype.mul = function (vec) {
      if(vec instanceof Number) {
        this.x = this.x * vec;
        this.y = this.y * vec;
        return this;
      } else if(vec instanceof Vector2){
        this.x = this.x * vec.x;
        this.y = this.y * vec.y;
        return this;
      }
      return Vector2.empty();
  };

  /**
   * @method div
   * @param {Vector2} vec
   * @return {Vector2} this
   */
  Vector2.prototype.div = function (vec) {
    if(vec instanceof Number) {
      this.x = this.x / vec;
      this.y = this.y / vec;
      return this;
    } else if(vec instanceof Vector2){
      this.x = this.x / vec.x;
      this.y = this.y / vec.y;
      return this;
    }
    return Vector2.empty();
  };

  /**
   * @memberof Vector2
   * @property x
   */
  Object.defineProperty(Vector2.prototype, 'x', {
      get: function() {
          return this._x;
      },
      set: function(value) {
          this._x = value;
      }
  });

  /**
   * @memberof Vector2
   * @property y
   */
  Object.defineProperty(Vector2.prototype, 'y', {
      get: function() {
          return this._y;
      },
      set: function(value) {
          this._y = value;
      }
  });

  /**
   * @memberof Vector2
   * @property length
   */
  Object.defineProperty(Vector2.prototype, 'length', {
      get: function() {
          return this.getLength();
      }
  });

  Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @method getLength
   * @return {Number} angle
   */
  Vector2.prototype.getLength = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  /**
   * @method getAngle
   * @param {Vector2} vec
   * @return {Number} val
   */
  Vector2.prototype.getAngle = function(vec) {
      if(Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
          var val = this.dot(vec);
          return Math.acos(val);
      } else {
          console.error("This is not normalize vector");
      }
  };

  /**
   * @method normalize
   * @return {Vector2} rel
   */
  Vector2.prototype.normalize = function() {
      var rel = Vector2.empty();
      if(this.length != 0) {
        rel.x = this.x / this.length;
        rel.y = this.y / this.length;
      }
      return rel;
  };

  /**
   * @method dot
   * @param {Vector} vec
   * @return {Number} angle
   */
  Vector2.prototype.dot = function(vec) {
      return this.x * vec.x + this.y * vec.y;
  };

  /**
   * @method rotate
   * @param angle {Number}
   */
  Vector2.prototype.rotate = function(angle) {
      this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
      this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
  };

  /**
   * @method pointDirection
   * @param {Vector2} vec targetVector
   * @param {Number} angle angle
   * @return {Number} val
   */
  Vector2.prototype.pointDirection = function(vec, angle) {
      return Math.atan2(vec.y - this.y, vec.x - this.x) - (Math.PI / 180) * angle;
  };

  /**
   * @method isEqual
   * @param {Vector2} vec
   * @return {Boolean} result
   */
  Vector2.prototype.isEqual = function (vec) {
    var eps = 0.001;
    if( (this.x - vec.x) < eps &&
        (this.y - vec.y) < eps ) {
      return true;
    }
    return false;
  };

  //----------------------------------------------------------------------------
  // Game_System ($gameSystem)
  //
  //
  var _alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _alias_Game_System_initialize.call(this);
    this._rs_hud = this._rs_hud || {};
    this._rs_hud.show = this._rs_hud.show || RS.HUD.param.bShow;
    this._rs_hud.opacity = this._rs_hud.opacity || RS.HUD.param.nOpacity;
  };

  //----------------------------------------------------------------------------
  // Game_Actor
  //
  //

  Game_Actor.prototype.relativeExp = function () {
    if(this.isMaxLevel()) {
       return this.expForLevel(this.maxLevel());
    } else {
      return this.currentExp() - this.currentLevelExp();
    }
  };

  Game_Actor.prototype.relativeMaxExp = function () {
    if(!this.isMaxLevel()) {
      return this.nextLevelExp() - this.currentLevelExp();
    } else {
      return this.expForLevel(this.maxLevel());
    }
  };

  //----------------------------------------------------------------------------
  // TextData
  //
  //

  function TextData() {
      this.initialize.apply(this, arguments);
  }

  TextData.prototype = Object.create(Sprite.prototype);
  TextData.prototype.constructor = TextData;

  TextData.prototype.initialize = function(bitmap, func, params) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.setCallbackFunction(func);
    this.updateTextLog();
    this._params = params;
  };

  TextData.prototype.setCallbackFunction = function (cbFunc) {
    this._callbackFunction = cbFunc;
  };

  TextData.prototype.updateTextLog = function () {
    this._log = this._callbackFunction.call();
  };

  TextData.prototype.startCallbackFunction = function () {
    this._callbackFunction.call(this);
  };

  TextData.prototype.getTextProperties = function (n) {
    return this._params[n];
  };

  TextData.prototype.drawDisplayText = function () {
    this.defaultFontSettings();
    this.bitmap.drawText(this._callbackFunction(this), 0, 0, 120, this._params[0] + 8, 'center');
  };

  TextData.prototype.isRefresh = function () {
    var currentText = this._callbackFunction();
    return currentText.localeCompare(this._log) !== 0;
  };

  TextData.prototype.clearTextData = function () {
    this.bitmap.clear();
  };

  TextData.prototype.update = function () {
    if(this.isRefresh()) {
      this.clearTextData();
      this.drawDisplayText();
      this.updateTextLog();
    }
  };

  TextData.prototype.standardFontFace = function() {
    if(RS.HUD.param.bUseCustomFont) {
      return RS.HUD.param.szCustomFontName;
    } else {
      if (navigator.language.match(/^zh/)) {
          return RS.HUD.param.chineseFont;
      } else if (navigator.language.match(/^ko/)) {
          return RS.HUD.param.koreanFont;
      } else {
          return RS.HUD.param.standardFont;
      }
    }
  };

  TextData.prototype.defaultFontSettings = function() {
    var param = this._params;
    this.bitmap.fontFace = this.standardFontFace();
    this.bitmap.fontSize = param[0];
    this.bitmap.textColor = param[1];
    this.bitmap.outlineColor = param[2];
    this.bitmap.outlineWidth = param[3];
  };

  //----------------------------------------------------------------------------
  // HUD
  //
  //
  function HUD() {
    this.initialize.apply(this, arguments);
  };

  //----------------------------------------------------------------------------
  // RS_HudLayer
  //
  //

  function RS_HudLayer() {
    this.initialize.apply(this, arguments);
  };

  RS_HudLayer.prototype = Object.create(Sprite.prototype);
  RS_HudLayer.prototype.constructor = RS_HudLayer;

  RS_HudLayer.prototype.initialize = function(bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    // This variable sets transparency to zero.
    this.alpha = 0;
    this.createItemLayer();
  };

  RS_HudLayer.prototype.createItemLayer = function () {
    this._items = new Sprite();
    this._items.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.addChild(this._items);
  };

  RS_HudLayer.prototype.drawAllHud = function() {
    var allHud = this._items;
    var items = RS.HUD.param.arrangement;

    // This removes any drawing objects that have already been created.
    if(allHud.children.length > 0) {
      allHud.removeChildren(0, allHud.children.length);
    }

    items.forEach(function(item, index){
      // This code runs only when there is a party member at a specific index.
      if(!!$gameParty.members()[index]) {
        if(item !== null) allHud.addChild(new HUD({szAnchor: item, nIndex: index}));
      }
    }, this);

    // It sorts objects by party number.
    this.sort();

    this.show = $gameSystem._rs_hud.show;
    this.opacity = $gameSystem._rs_hud.opacity;

  };

  RS_HudLayer.prototype.update = function () {
    var members = $gameParty.members();
    this.children.forEach(function(child, idx) {
        if (child.update && members[idx]) {
            child.update();
        }
    });
  };

  RS_HudLayer.prototype.sort = function() {
    var allHud = this._items;
    var array = allHud.children;
    allHud.children = array.sort(function(a, b) {
      return a._memberIndex - b._memberIndex;
    });
  }

  RS_HudLayer.prototype.refresh = function() {
    var allHud = this._items;
    allHud.children.forEach(function(i) {
        allHud.removeChild(i);
    }, this);
    this.drawAllHud();
    this.show = $gameSystem._rs_hud.show;
  }

  RS_HudLayer.prototype.remove = function(index) {
    setTimeout(function() {
      while($gameParty.size() !== this._items.children.length) {
        this.drawAllHud();
      }
    }.bind(this), 0);
  };

  Object.defineProperty(RS_HudLayer.prototype, 'show', {
      get: function() {
          // return this._items.children[0].show;
          return this.visible;
      },
      set: function(value) {
          // this._items.children.forEach( function(i) {
          //   i.visible = value;
          // }, this);
          this.visible = value;
          $gameSystem._rs_hud.show = value;
      },
  });

  Object.defineProperty(RS_HudLayer.prototype, 'opacity', {
      get: function() {
          // return this._items.children[0].opacity;
          return Math.floor(this.alpha * 255);
      },
      set: function(value) {
          // this._items.children.forEach( function(i) {
          //   i.opacity = value.clamp(0, 255);
          // }, this);
          this.alpha = value * 0.00392156862745098;
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      },
  });

  //----------------------------------------------------------------------------
  // TouchInput
  //
  //

  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if(HUD.MOUSE_EVENT instanceof Vector2) {
      HUD.MOUSE_EVENT.set(x, y);
    }
  };

  //----------------------------------------------------------------------------
  // HUD
  //
  //

  HUD.prototype = Object.create(Stage.prototype);
  HUD.prototype.constructor = HUD;

  HUD.MOUSE_EVENT = new Vector2( Graphics.boxWidth / 2, Graphics.boxHeight / 2 );

  HUD.prototype.initialize = function(config) {
      Stage.prototype.initialize.call(this);
      this.createHud();
      this.setAnchor(config.szAnchor || "LeftBottom");
      this.setMemberIndex(parseInt(config.nIndex) || 0);
      this.createFace();
      this.createHp();
      this.createMp();
      this.createExp();
      this.createText();
      this.createVector();
      this.setPosition();
  };

  HUD.prototype.getAnchor = function(magnet) {
    var anchor = RS.HUD.getDefaultHUDAnchor();

    // Add Custom Anchor
    for(var i = 0; i < 4; i++) {
      anchor['Custom Pos ' + (i + 1)] = RS.HUD.param.ptCustormAnchor[i];
    }

    return anchor[magnet];
  };

  HUD.prototype.setAnchor = function(anchor) {
    var pos = this.getAnchor(anchor);
    if(typeof(pos) === 'object') {
      this._hud.x = pos.x;
      this._hud.y = pos.y;
    } else {
      this.setAnchor(RS.HUD.param.szAnchor);
    }
  };

  HUD.prototype.setMemberIndex = function(index) {
    this._memberIndex = index;
  }

  HUD.prototype.createHud = function() {
    this._hud = new Sprite(ImageManager.loadPicture(RS.HUD.param.imgEmptyHUD));
    this.addChild(this._hud);
  };

  HUD.prototype.createFace = function() {
    var player = this.getPlayer();
    this._faceBitmap = ImageManager.loadFace(player.faceName());
    this._maskBitmap = ImageManager.loadPicture(RS.HUD.param.imgMasking);
    this._maskBitmap.addLoadListener(function() {
        this._faceBitmap.addLoadListener(this.circleClippingMask.bind(this, player.faceIndex()));
    }.bind(this));
  };

  Bitmap.prototype.drawClippingImage = function(bitmap, maskImage , _x, _y, _sx, _sy) {
    var context = this._context;
    context.save();
    context.drawImage(maskImage._canvas, _x, _y, nFaceDiameter, nFaceDiameter);
    context.globalCompositeOperation = 'source-atop';
    context.drawImage(bitmap._canvas, _sx, _sy, 144, 144, 0, 0, nFaceDiameter, nFaceDiameter);
    context.restore();
    this._setDirty();
  };

  Bitmap.prototype.drawClippingImageNonBlur = function(bitmap, _x, _y, _sx, _sy) {
    var context = this._context;
    context.save();
    context.beginPath();
    context.arc(_x + 45, _y + 45 , 45, 0, Math.PI * 2, false);
    context.clip();
    context.drawImage(bitmap._canvas, _sx, _sy, 144, 144, 0, 0, nFaceDiameter, nFaceDiameter);
    context.restore();
    this._setDirty();
  };

  HUD.prototype.circleClippingMask = function(faceIndex) {
    var sprite = new Sprite()
        , fw = Window_Base._faceWidth, fh = Window_Base._faceHeight
        , sx = (faceIndex % 4) * fw, sy = Math.floor(faceIndex / 4) * fh;

    sprite.x = this._hud.x;
    sprite.y = this._hud.y;
    sprite.bitmap = new Bitmap(nFaceDiameter, nFaceDiameter);

    if (RS.HUD.param.blurProcessing) {
      sprite.bitmap.drawClippingImage(this._faceBitmap, this._maskBitmap, 0, 0, sx, sy);
    } else {
      sprite.bitmap.drawClippingImageNonBlur(this._faceBitmap, 0, 0, sx, sy);
    }

    this._face = sprite;
    this.addChild(this._face);
  };

  HUD.prototype.createHp = function() {
    this._hp = new Sprite(ImageManager.loadPicture(RS.HUD.param.imgHP));
    this.addChild(this._hp);
  };

  HUD.prototype.createMp = function() {
    this._mp = new Sprite(ImageManager.loadPicture(RS.HUD.param.imgMP));
    this.addChild(this._mp);
  };

  HUD.prototype.createExp = function() {
    this._exp = new Sprite(ImageManager.loadPicture(RS.HUD.param.imgEXP));
    this.addChild(this._exp);
  };

  HUD.prototype.getTextParams = function(src) {
    var param = RS.HUD.param;
    var textProperties = {
      'HP': [param.hpTextSize, param.szHpColor, param.szHpOutlineColor, param.szHpOutlineWidth],
      'MP': [param.mpTextSize, param.szMpColor, param.szMpOutlineColor, param.szMpOutlineWidth],
      'EXP': [param.expTextSize, param.szExpColor, param.szExpOutlineColor, param.szExpOutlineWidth],
      'LEVEL': [param.levelTextSize, param.szLevelColor, param.szLevelOutlineColor, param.szLevelOutlineWidth],
      'NAME': [param.nameTextSize, param.szNameColor, param.szNameOutlineColor, param.szNameOutlineWidth]
    };
    return textProperties[src];
  };

  HUD.prototype.createText = function() {
    this._hpText = this.addText(this.getHp.bind(this), this.getTextParams('HP'));
    this._mpText = this.addText(this.getMp.bind(this), this.getTextParams('MP'));
    this._expText = this.addText(this.getExp.bind(this), this.getTextParams('EXP'));
    this._levelText = this.addText(this.getLevel.bind(this), this.getTextParams('LEVEL'));
    this._nameText = this.addText(this.getName.bind(this), this.getTextParams('NAME'));
  };

  HUD.prototype.createVector = function () {
    this._vtA = Vector2.empty();
    this._vtB = new Vector2(nFaceDiameter, nFaceDiameter);
  };

  HUD.prototype.setPosition = function() {
    var param = RS.HUD.param;
    if(this._face) { this.setCoord(this._face, param.ptFace); }
    this.setCoord(this._hp, param.ptHP);
    this.setCoord(this._mp, param.ptMP);
    this.setCoord(this._exp, param.ptEXP);
    this.setCoord(this._hpText, param.ptHPText);
    this.setCoord(this._mpText, param.ptMPText);
    this.setCoord(this._levelText, param.ptLevelText);
    this.setCoord(this._expText, param.ptEXPText);
    this.setCoord(this._nameText, param.ptNameText);
  };

  HUD.prototype.addText = function(strFunc, params) {
    var bitmap = new Bitmap(120, params[0] + 8);
    var text = new TextData(bitmap, strFunc, params);
    this.addChildAt(text, this.children.length);
    text.drawDisplayText();
    return text;
  };

  HUD.prototype.getPlayer = function() {
    return $gameParty.members()[this._memberIndex];
  };

  HUD.prototype.getHp = function() {
    var player = this.getPlayer();
    if(!player) return "0 / 0";
    if(RS.HUD.param.showComma) {
      return "%1 / %2".appendComma(player.hp, player.mhp);
    } else {
      return "%1 / %2".format(player.hp, player.mhp);
    }
  };

  HUD.prototype.getMp = function() {
    var player = this.getPlayer();
    if(!player) return "0 / 0";
    if(RS.HUD.param.showComma) {
      return "%1 / %2".appendComma(player.mp, player.mmp);
    } else {
      return "%1 / %2".format(player.mp, player.mmp);
    }
  };

  HUD.prototype.getExp = function() {
    var player = this.getPlayer();
    if(!player) return "0 / 0";
    if(player.isMaxLevel()) return RS.HUD.param.maxExpText;
    if(RS.HUD.param.showComma) {
      return "%1 / %2".appendComma(player.relativeExp(), player.relativeMaxExp());
    } else {
      return "%1 / %2".format(player.relativeExp(), player.relativeMaxExp());
    }
  };

  HUD.prototype.getLevel = function() {
    var player = this.getPlayer();
    if(!player) return "0";
    if(RS.HUD.param.showComma) {
      return "%1".appendComma(player.level);
    } else {
      return "%1".format(player.level);
    }
  };

  HUD.prototype.getName = function() {
    var player = this.getPlayer();
    if(!player) return "";
    var name = player && player.name();
    if(name) {
      return name;
    } else {
      return ' ';
    }
  };

  HUD.prototype.getHpRate = function() {
    var player = this.getPlayer();
    if(!player) return 0;
    return this._hp.bitmap.width * (player.hp / player.mhp);
  };

  HUD.prototype.getMpRate = function() {
    var player = this.getPlayer();
    if(!player) return 0;
    return this._mp.bitmap.width * (player.mp / player.mmp);
  };

  HUD.prototype.getExpRate = function() {
    var player = this.getPlayer();
    if(!player) return 0;
    return this._exp.bitmap.width * (player.relativeExp() / player.relativeMaxExp());
  };

  HUD.prototype.getRealExpRate = function () {
    var player = this.getPlayer();
    if(!player) return 0;
    if(this.inBattle() && $dataSystem.optDisplayTp) {
      return ( player.tp / player.maxTp() );
    } else {
      return ( player.relativeExp() / player.relativeMaxExp() );
    }
  };

  HUD.prototype.setOpacityisNotGlobal = function(value) {
    this.children.forEach( function(i) {
      i.opacity = value.clamp(0, 255);
    }, this);
    // $gameSystem._rs_hud.opacity = value.clamp(0, 255);
  }

  HUD.prototype.getOpacityValue = function(dir) {
    var value = this._hud.opacity;
    var maxOpaicty = $gameSystem._rs_hud.opacity;
    if(maxOpaicty <= 0) return 0;
    if(dir) {
      value -= nOpacityEps;
      if(value < nOpacityMin ) value = nOpacityMin;
    } else {
      value += nOpacityEps;
      if(value > maxOpaicty) value = maxOpaicty;
    }
    return value;
  };

  HUD.prototype.setCoord = function(s,obj) {
    var oy = (s._callbackFunction instanceof Function) ? (s.bitmap.height / 2) : 0;
    s.x = this._hud.x + obj.x;
    s.y = this._hud.y + obj.y - oy;
    s.visible = obj.visible;
  };

  HUD.prototype.update = function() {
    this._hud.update();
    if(this._face) { this._face.update(); }
    this.updateOpacity();
    this.updateToneForAll();
    this.paramUpdate();
  };

  HUD.prototype.updateOpacity = function() {
    var player = this.getPlayer();
    if(!this.checkHitToMouse(this._hud, nFaceDiameter) && this.checkHit() || player && player.isDead() ) {
      this.setOpacityisNotGlobal( this.getOpacityValue(true) );
    } else {
      this.setOpacityisNotGlobal( this.getOpacityValue(false) );
    }
  };

  HUD.prototype.checkHit = function() {
    var x = $gamePlayer.screenX();
    var y = $gamePlayer.screenY();
    return (x >= this._hud.x) &&
           (y >= this._hud.y) &&
           (x < this._hud.x + this._hud.width) &&
           y < this._hud.y + this._hud.height;
  };

  HUD.prototype.checkHitToMouse = function(object, n) {
    var middle = Vector2.empty();
    middle.x = object.width / 2 + object.x;
    middle.y = object.height / 2 + object.y;
    return Vector2.distance(middle, HUD.MOUSE_EVENT) < n;
  };

  HUD.prototype.checkForToneUpdate = function (obj, cond) {
    if(obj instanceof Sprite && cond) {
      var t = Date.now() % 1000 / 1000;
      var vt = Vector2.quadraticBezier(this._vtA, this._vtB, this._vtA, t);
      obj.setColorTone([vt.x, vt.x, vt.x, 0]);
    } else {
      obj.setColorTone([this._vtA.x, this._vtA.x, this._vtA.x, 0]);
    }
  }

  HUD.prototype.updateToneForAll = function () {
    if(!this.getPlayer()) return false;
    this.checkForToneUpdate( this._hp, this.getPlayer().hpRate() <= nHPGlitter );
    this.checkForToneUpdate( this._mp, this.getPlayer().mpRate() <= nMPGlitter );
    this.checkForToneUpdate( this._exp, this.getRealExpRate() >= nEXPGlitter );
  };

  HUD.prototype.paramUpdate = function() {
    this._hp.setFrame(0, 0, this.getHpRate(), this._hp.height );
    this._mp.setFrame(0, 0, this.getMpRate(), this._mp.height );
    this._exp.setFrame(0, 0, this.getExpRate(), this._exp.height );
    this._hpText.update();
    this._mpText.update();
    this._expText.update();
    this._levelText.update();

    if(this._face && this._face.bitmap._image === (null || undefined)) {
      this.removeChild(this._face);
      this.createFace();
    }
  };

  HUD.prototype.inBattle = function() {
    return (SceneManager._scene instanceof Scene_Battle ||
            $gameParty.inBattle() ||
            DataManager.isBattleTest());
  };

  Object.defineProperty(HUD.prototype, 'show', {
      get: function() {
          return $gameSystem._rs_hud.show;
      },
      set: function(value) {
          this.children.forEach( function(i) {
            i.visible = value;
          }, this);
          $gameSystem._rs_hud.show = value;
          if(value === true) {
            this.setPosition();
          }
      },
  });

  Object.defineProperty(HUD.prototype, 'opacity', {
      get: function() {
          return $gameSystem._rs_hud.opacity;
      },
      set: function(value) {
          this.children.forEach( function(i) {
            i.opacity = value.clamp(0, 255);
          }, this);
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      },
  });

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //
  var _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    _Scene_Map_createDisplayObjects.call(this);
    if(!RS.HUD.param.battleOnly) {
      this._hudLayer = new RS_HudLayer();
      this._hudLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

      $gameHud = this._hudLayer;
      this._hudLayer.drawAllHud();

      this.addChild(this._hudLayer);
      this.swapChildren(this._windowLayer, this._hudLayer);
    }
  };

  var _Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if(!RS.HUD.param.battleOnly) {
      this.removeChild(this._hudLayer);
      $gameHud = null;
    }
    _Scene_Map_terminate.call(this);
  };

  //----------------------------------------------------------------------------
  // Game_Party
  //
  //
  var _Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function(actorId) {
    _Game_Party_addActor.call(this, actorId);
    try {
      if(!!$gameHud.refresh) {
        $gameHud.refresh();
      }
    } catch(e) {

    }

  };

  var _Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function(actorId) {
    try {
        $gameHud.remove(actorId);
        _Game_Party_removeActor.call(this, actorId);
    } catch(e) {

    }
  };

  //----------------------------------------------------------------------------
  // Scene_Boot
  //
  //
  var _Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    _Scene_Boot_loadSystemImages.call(this);
    if(RS.HUD.param.bUseCustomFont) {
      Graphics.loadFont(RS.HUD.param.szCustomFontName, RS.HUD.param.szCustomFontSrc);
    }
    RS.HUD.param.preloadImportantFaces.forEach(function(i) {
      ImageManager.loadFace(i);
    }, this);
  };

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //

  var alias_Scene_Map_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
  Scene_Map.prototype.snapForBattleBackground = function() {
    var temp = $gameHud.show;
    if($gameHud && $gameHud.show) $gameHud.show = false;
    alias_Scene_Map_snapForBattleBackground.call(this);
    if($gameHud && !$gameHud.show) {
      RS.HUD.param.isPreviousShowUp = temp;
      $gameHud.show = temp;
    }

  };

  var alias_Scene_Map_updateFade = Scene_Map.prototype.updateFade;
  Scene_Map.prototype.updateFade = function() {
    alias_Scene_Map_updateFade.call(this);
    if(this._fadeDuration == 0 && RS.HUD.param.isCurrentBattleShowUp) {
      $gameHud.show = RS.HUD.param.isPreviousShowUp;
      RS.HUD.param.isCurrentBattleShowUp = false;
    }
  }

  var alias_Scene_Battle_updateFade = Scene_Battle.prototype.updateFade;
  Scene_Battle.prototype.updateFade = function() {
    alias_Scene_Battle_updateFade.call(this);
    if(this._fadeDuration == 0 && !RS.HUD.param.isCurrentBattleShowUp) {
      $gameHud.show = true;
      RS.HUD.param.isCurrentBattleShowUp = true;
    }
  }

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "RS_HUD") {
        switch (args[0].toLowerCase()) {
          case 'opacity':
            $gameHud.opacity = Number(args[1]);
            break;
          case 'visible':
            $gameHud.show = Boolean(args[1] === "true");
            break;
          case 'import':
            RS.HUD.importDataWithAjax(args[1] + '.json');
            break;
          case 'export':
            RS.HUD.exportData(args[1] + '.json');
            break;
        }
      }
  };

  //----------------------------------------------------------------------------
  // String Utils
  //
  //

  /**
   * String.prototype.toArray
   */
  String.prototype.toArray = function(){
      return this.split("");
  }

  /**
   * String.prototype.reverse
   */
  String.prototype.reverse = function(){
      return this.toArray().reverse().join("");
  }

  /**
   * String.prototype.toComma
   */
  String.prototype.toComma = function(){
      return this.reverse().match(/.{1,3}/g).join(",").reverse();
  }

  /**
   * Replaces %1, %2 and so on in the string to the arguments.
   *
   * @method String.prototype.format
   * @param {Any} ...args The objects to format
   * @return {String} A formatted string
   */
  String.prototype.appendComma = function() {
      var args = arguments;
      return this.replace(/%([0-9]+)/g, function(s, n) {
          return (args[Number(n) - 1] + '').toComma();
      });
  };

  //----------------------------------------------------------------------------
  // Output Objects
  //
  //

  window.HUD = HUD;
  window.RS_HudLayer = RS_HudLayer;

})();
