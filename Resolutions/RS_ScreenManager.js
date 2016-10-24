//==============================================================================
// RS_ScreenManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_ScreenManager = true;

/*:
 * @plugindesc (v1.0.1) <RS_ScreenManager>
 * @author biud436
 *
 * @param isMobileAutoFullScreen
 * @desc Set whether it automatically switches to the full screen in the mobile.
 * @default true
 *
 * @param isLimitedInMaxRect
 * @desc
 * @default true
 *
 * @param isGraphicsRendererResize
 * @desc
 * @default false
 *
 * @param isGraphicsAutoScaling
 * @desc
 * @default false
 *
 * @param isMaintainingMinimumWidth
 * @desc
 * @default true
 *
 * @param isMaintainingMinimumHeight
 * @desc
 * @default true
 *
 * @param imageName
 * @desc image Name
 * @default Mountains3
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param panelTextName
 * @desc
 * @default Display Resolutions
 *
 * @param fullScreenButtonName
 * @desc
 * @default Full Screen
 *
 * @help
 * =============================================================================
 * Installations
 * =============================================================================
 * - Download the plugin and library files.
 * - Put winDisplaySettings.node file in your project ./js/libs folder.
 * - Open the Plugin Managers and then set up this plugin.
 * - Deploy your project by Windows platform.
 * - Rename the Game.exe to nw.exe.
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * ScreenManager Start
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.04 (v1.0.0) - First Release.
 * 2016.10.24 (v1.0.1) - Added Resolution Button in Option.
 */

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenManager>');
  });

  var pcGraphicsArray;

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var isMobileAutoFullScreen = Boolean(parameters['isMobileAutoFullScreen'] === 'true');
  var isLimitedInMaxRect = Boolean(parameters['isLimitedInMaxRect'] === 'true');
  var isGraphicsRendererResize = Boolean(parameters['isGraphicsRendererResize'] === 'true');
  var isGraphicsAutoScaling = Boolean(parameters['isGraphicsAutoScaling'] === 'true');
  var isMaintainingMinimumWidth = Boolean(parameters['isMaintainingMinimumWidth'] === 'true');
  var isMaintainingMinimumHeight = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
  var imageName = String(parameters['imageName'] || 'Mountains3');
  var panelTextName = String(parameters["panelTextName"] || "Display Resolutions");
  var fullScreenButtonName = String(parameters["fullScreenButtonName"] || 'Full Screen');

  var resolutionCommand = "Display Resolutions";

  var bitmap = ImageManager.loadParallax(imageName);

  var getTargetRegex = /(\d+)[ ]x[ ](\d+)/i;

  if( Utils.isNwjs() ) {
    if(process && process.platform && process.platform === 'win32') {
      var winDisplaySettingsLib = require('./js/libs/winDisplaySettings');
      if(winDisplaySettingsLib) {
        var displaySetting = winDisplaySettingsLib.GetDisplaySettings();
        pcGraphicsArray = displaySetting.split('\n').filter(function(i, idx, item) {
          return item.indexOf(i) === idx;
        });
      }
    } else {
      console.error('This plugin is not supported in Mac OS');
      return false;
    }
  }

  var mobileGraphicsArray = [
  "120 x 160",
  "160 x 240",
  "240 x 320",
  "240 x 400",
  "320 x 480",
  "480 x 800",
  "640 x 960",
  "640 x 1136",
  "720 x 1280", // Galaxy S3
  "750 x 1334", // iPhone6, iPhone6S
  "768 x 1024",
  "768 x 1280",
  "800 x 1280",
  "1080 x 1920", // iPhone6+, iPhone6S+, Galaxy S4, Galaxy S5
  "1200 x 1920",
  "1242 x 2208",
  "1440 x 2560", // Galaxy S6, Galaxy S7
  "1536 x 2048",
  "1600 x 2560",
  "2048 x 2732", // iPadPro
  ];

  //============================================================================
  // Point
  //============================================================================
  Point.prototype.toString = function () {
    return this.x + ' x ' +  this.y;
  }

  //============================================================================
  // Graphics
  //============================================================================

  Graphics.getAvailGraphicsArray = function (returnType) {
    var data;
    var tw, th;
    var pt;
    var gArray = [];
    var result = [];
    var maxSW = window.screen.availWidth, maxSH = window.screen.availHeight;
    var type = ((maxSW / maxSH) >= 1.0) ? 'landscape' : 'portrait';
    data = (Utils.isMobileDevice() === true) ? mobileGraphicsArray : pcGraphicsArray;
    data.forEach(function (i) {
      if(i.match(getTargetRegex)) {
        tw = Number(RegExp.$1);
        th = Number(RegExp.$2);
        if(type === 'portrait') {
          if(maxSW > maxSH) {
            var temp = tw;
            tw = th;
            th = temp;
          }
        }
        if(tw >= 0 && tw <= maxSW && th >= 0 && th <= maxSH) {
          pt = new Point(tw, th);
          gArray.push(pt);
          result.push(pt.toString());
        }
      }
    }, this);
    return (returnType === 'String')? result : gArray;
  };

  Graphics.setScreenResize = function (newScr) {
    var cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    var cy = (window.screen.availHeight / 2) - (newScr.y / 2);
    var xPadding = 16;
    var yPadding = 39;
    var tw = ($gameMap && $gameMap.tileWidth) ? $gameMap.tileWidth() : 48;
    var th = ($gameMap && $gameMap.tileHeight) ? $gameMap.tileHeight() : 48;
    var minW = (tw * 17) || Graphics._renderer.width;
    var minH = (th * 13) || Graphics._renderer.height;
    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);
    if(isGraphicsAutoScaling && (tw/th >= 1.0) && tw >= 48) {
      if(isMaintainingMinimumWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
      if(isMaintainingMinimumHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);
      if(!isMaintainingMinimumWidth && !isMaintainingMinimumHeight) {
        // Half
        Graphics.width = Graphics.boxWidth = Math.max(minW / 2, newScr.x);
        Graphics.height = Graphics.boxHeight = Math.max(minH / 2, newScr.y);
      }
    } else {
      Graphics.width = Graphics.boxWidth = newScr.x;
      Graphics.height = Graphics.boxHeight = newScr.y;
    }
    if(isGraphicsRendererResize) {
        Graphics._renderer.resize(newScr.x, newScr.y);
    }
  };

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._lastScreenManagerItem = 0;
  };

  //============================================================================
  // Scene_Boot
  //============================================================================

  var alias_Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    alias_Scene_Boot_create.call(this);
  };

  //============================================================================
  // Window_AvailGraphicsList
  //============================================================================

  function Window_AvailGraphicsList() {
    this.initialize.apply(this, arguments);
  };

  Window_AvailGraphicsList.prototype = Object.create(Window_Selectable.prototype);
  Window_AvailGraphicsList.prototype.constructor = Window_AvailGraphicsList;

  Window_AvailGraphicsList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._itemToPoint = Graphics.getAvailGraphicsArray('Number');
    this._windowFrameSprite.visible = false;
    this._item = [];
    this.refresh();
    this.activate();
    this.select($gameSystem._lastScreenManagerItem || 0);
  };

  Window_AvailGraphicsList.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this.index() >= 0 ? this._itemToPoint[this.index()] : null;
  };

  Window_AvailGraphicsList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_AvailGraphicsList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
  };

  Window_AvailGraphicsList.prototype.makeItemList = function() {
    this._data = Graphics.getAvailGraphicsArray('String');
    this._data.push(fullScreenButtonName);
  };

  Window_AvailGraphicsList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
  };

  Window_AvailGraphicsList.prototype.isEnabled = function(item) {
    return !!item;
  };

  Window_AvailGraphicsList.prototype.resetFontSettings = function() {
      this.contents.fontFace = this.standardFontFace();
      this.contents.fontSize = this.standardFontSize();
      this.contents.outlineColor = Utils.rgbToCssColor(128, 0, 0);
      this.contents.outlineWidth = 2;
      this.resetTextColor();
  };

  Window_AvailGraphicsList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];
    this.resetTextColor();
    if(text === fullScreenButtonName && !Graphics._isFullScreen()) {
        this.changeTextColor(this.deathColor());
    }
    this.drawText(text, rect.x, rect.y, rect.width, 'center');
  };

  Window_AvailGraphicsList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

  //============================================================================
  // Window_Options
  //============================================================================

  var alias_Window_Options_initialize = Window_Options.prototype.initialize;
  Window_Options.prototype.initialize = function() {
    alias_Window_Options_initialize.call(this);
    this._lastIndex = $gameSystem._lastScreenManagerItem || 0;
  };

  Window_Options.prototype.isResolution = function (symbol) {
    return symbol.contains('Resolutions');
  }

  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        if(this.isResolution( symbol ) ) {
          SceneManager.push( ScreenManager );
        } else {
          this.changeValue(symbol, !value);
        }
    }
  };

  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else {
      if(this.isResolution( symbol ) ) {
        idx = this._lastIndex;
        var item = Graphics.getAvailGraphicsArray('String');
        item.push(fullScreenButtonName);
        if(!idx) {
          return String(Graphics.boxWidth + " x " + Graphics.boxHeight);
        } else {
          if(!Graphics._isFullScreen()) {
            return fullScreenButtonName;
          } else {
            this._lastIndex = idx;
            return item[idx || 0];
          }
        }
      } else {
        return this.booleanStatusText(value);
      }
    }
  };

  var alias_Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
  Window_Options.prototype.addVolumeOptions = function() {
    alias_Window_Options_addVolumeOptions.call(this);
    this.addCommand('Resolutions', 'Resolutions');
  };

  //============================================================================
  // ScreenManager
  //============================================================================

  function ScreenManager() {
    this.initialize.apply(this, arguments);
  }

  ScreenManager.prototype = Object.create(Scene_Base.prototype);
  ScreenManager.prototype.constructor = ScreenManager;

  ScreenManager.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
  };

  ScreenManager.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createWindowLayer();
    this.createAvailGraphicsList();
    this.createBackground();
    this.createPanel();
  };

  ScreenManager.prototype.createBackground = function () {
    var bitmap = ImageManager.loadParallax(imageName);
    this._backgroundWindow = new Sprite(bitmap);
    this._backgroundWindow.x = Graphics.boxWidth / 2 - this._backgroundWindow.bitmap.width / 2;
    this._backgroundWindow.y = Graphics.boxHeight / 2 - this._backgroundWindow.bitmap.height / 2;
    this._backgroundWindow.blendMode = 3;
    this.addWindow(this._backgroundWindow);
  };

  ScreenManager.prototype.createPanel = function () {
    var color1 = Window_Base.prototype.dimColor1();
    var color2 = Window_Base.prototype.dimColor2();
    var width = this._availGraphicsList.width;
    var height = Window_Base.prototype.lineHeight();
    var x = 0;
    var y = 0;
    this._panel = new Sprite(new Bitmap(width, height * 2));
    this._panel.x = this._availGraphicsList.x;
    this._panel.y = this._availGraphicsList.y - height - 10;
    this._panel.bitmap.gradientFillRect(x, y, width / 2, height, color2, color1);
    this._panel.bitmap.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    this._panel.bitmap.drawText(panelTextName, x, y, width, height, 'center');
    this.addChild(this._panel);
  }

  ScreenManager.prototype.createAvailGraphicsList = function () {
    var width = 320;
    var height = 440;
    this._availGraphicsList = new Window_AvailGraphicsList(0, 0, 320, 480);
    this._availGraphicsList.x = Graphics.boxWidth / 2 - (320 / 2);
    this._availGraphicsList.y = Graphics.boxHeight / 2 - (480 / 2);
    this._availGraphicsList.setHandler('ok', this.convertScreenSize.bind(this));
    this._availGraphicsList.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._availGraphicsList);
  };

  ScreenManager.prototype.convertScreenSize = function () {
    if(!Utils.isMobileDevice() &&
      this._availGraphicsList.item() === fullScreenButtonName) {
      Graphics._switchFullScreen();
    } else {
      var scr = this._availGraphicsList.getCurrentItemToPoint();
      if(scr) {
        Graphics.setScreenResize(scr);
      } else {
        var aw = window.screen.availWidth;
        var ah = window.screen.availHeight;
        Graphics.setScreenResize(new Point(aw, ah));
      }
    }
    $gameSystem._lastScreenManagerItem = this._availGraphicsList.index();
    this.popScene();
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "ScreenManager") {
        switch(args[0]) {
          case 'Start':
            SceneManager.push(ScreenManager);
            break;
        }
      }
  };

})();
