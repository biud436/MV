//==============================================================================
// RS_ScreenManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_ScreenManager = true;

/*:
 * @plugindesc (v1.0.3) <RS_ScreenManager>
 * @author biud436
 *
 * @param isMobileAutoFullScreen
 * @desc Set whether it automatically switches to the full screen in the mobile.
 * @default true
 *
 * @param isGraphicsRendererResize
 * @desc (TEST OPTION)
 * @default false
 *
 * @param isGraphicsAutoScaling
 * @desc (TEST OPTION)
 * @default false
 *
 * @param isMaintainingMinimumWidth
 * @desc Set whether it can not set the width is minimum width or less.
 * @default true
 *
 * @param isMaintainingMinimumHeight
 * @desc Set whether it can not set the width is minimum height or less.
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
 * @param Recreate Scene
 * @desc To set as true, the current scene will recreate after changing screen size
 * @default true
 *
 * @param Use All Resolutions
 * @desc Sets whether resolution gets even if the resolution of your device is not supported.
 * @default false
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
 * 2016.11.26 (v1.0.2) - Added the function that recreates the scene.
 * 2017.05.28 (v1.0.3) - Added a new feature that the game screen size changes
 * automatically depending on an aspect ratio of the screen on mobile device.
 */

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenManager>');
  });

  var pcGraphicsArray;

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var isMobileAutoFullScreen = Boolean(parameters['isMobileAutoFullScreen'] === 'true');
  var isGraphicsRendererResize = Boolean(parameters['isGraphicsRendererResize'] === 'true');
  var isGraphicsAutoScaling = Boolean(parameters['isGraphicsAutoScaling'] === 'true');
  var isMaintainingMinimumWidth = Boolean(parameters['isMaintainingMinimumWidth'] === 'true');
  var isMaintainingMinimumHeight = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
  var imageName = String(parameters['imageName'] || 'Mountains3');
  var panelTextName = String(parameters["panelTextName"] || "Display Resolutions");
  var fullScreenButtonName = String(parameters["fullScreenButtonName"] || 'Full Screen');
  var isRecreateScene = Boolean(parameters['Recreate Scene'] === 'true');
  var resolutionCommand = "Display Resolutions";
  var isUseAllResolutions = Boolean(parameters['Use All Resolutions'] === 'true');
  var isEnabledAspectRatio = Boolean(parameters['Enable Aspect Ratio'] === 'true');
  var bitmap = ImageManager.loadParallax(imageName);
  var getTargetRegex = /(\d+)[ ]x[ ](\d+)/i;

  var pcGraphicsTempArray = [
  "640 x 480",
  "800 x 600",
  "1024 x 768",
  "1152 x 864",
  "1280 x 720",
  "1280 x 800",
  "1280 x 960",
  "1360 x 768",
  "1360 x 768",
  "1366 x 768",
  "1400 x 1050",
  "1440 x 900",
  "1600 x 900",
  "1600 x 1200",
  "1680 x 1050",
  "1920 x 1080",
  "1920 x 1200",
  "2048 x 1152",
  "2560 x 1440",
  "2560 x 1600"
  ];

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

  if( Utils.isNwjs() ) {

    if(process && process.platform && process.platform === 'win32') {
      var winDisplaySettingsLib = undefined;
      try {
        winDisplaySettingsLib = require('./js/libs/winDisplaySettings');
      } catch(e) {
        winDisplaySettingsLib = null;
      }
      if(winDisplaySettingsLib) {
        var displaySetting = winDisplaySettingsLib.GetDisplaySettings();
        pcGraphicsArray = displaySetting.split('\n').filter(function(i, idx, item) {
          return item.indexOf(i) === idx;
        });
      } else {
        // in case of that the lib file has not found...
        pcGraphicsArray = pcGraphicsTempArray;
      }
    } else {
      // in case of Mac OS
      pcGraphicsArray = pcGraphicsTempArray;
    }
  }

  //============================================================================
  // ScreenConfig
  //============================================================================

  function ScreenConfig() {
    this.initialize.apply(this, arguments);
  };

  ScreenConfig.prototype.constructor = ScreenConfig;
  ScreenConfig.prototype.initialize = function (originWidth, originHeight, orientation) {
    this._originWidth = originWidth;
    this._originHeight = originHeight;
    this._orientation = orientation;
    this._aspectRatio = this.getRatio(originWidth, originHeight);
  };

  ScreenConfig.prototype.gcd = function (p, q) {
    var self = this;
    if(q === 0) return p;
    return this.gcd(q, p % q);
  };

  ScreenConfig.prototype.getSize = function (virtualWidth) {
    var ret, w, h;

    w = parseInt(virtualWidth);
    h = parseInt(this.getHeight(virtualWidth));
    ret = [w, h];

    return ret;
  };

  ScreenConfig.prototype.getRatio = function (width, height) {
    var gcd, temp, ret;
    if(width === height) return [1, 1];
    gcd = this.gcd(width, height);
    ret = [(width / gcd), (height / gcd)];
    return ret;
  };

  ScreenConfig.prototype.getWidth = function (newHeight) {
    var ar = this._aspectRatio;
    var ratio = parseFloat(ar[0] / ar[1]);
    return ratio * newHeight;
  };

  ScreenConfig.prototype.getHeight = function (newWidth) {
    var ar = this._aspectRatio;
    var ratio = parseFloat(ar[1] / ar[0]);
    return ratio * newWidth;
  };

  //============================================================================
  // Point
  //============================================================================
  Point.prototype.toString = function () {
    return this.x + ' x ' +  this.y;
  };

  //============================================================================
  // Graphics
  //============================================================================

  Graphics.getAvailGraphicsArray = function (returnType) {
    var data, tw, th, pt, gArray, result, maxSW, maxSH, type;

    gArray = [];
    result = [];
    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;
    if(Utils.isNwjs()) {
      type = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) type = 'landscape';
    } else {
      type = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }

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
        } else {
          if(isUseAllResolutions) {
            pt = new Point(tw, th);
            gArray.push(pt);
            result.push(pt.toString());
          }
        }
      }
    }, this);
    return (returnType === 'String')? result : gArray;
  };

  Graphics.setScreenResize = function (newScr) {
    var cx, cy, xPadding, yPadding;
    var tw, th, minW, minH;
    var orientation, config, aspectRatio;
    var maxSW, maxSH;

    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    if(Utils.isNwjs()) {
      orientation = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) orientation = 'landscape';
    } else {
      orientation = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }
    config = new ScreenConfig(newScr.x, newScr.y, orientation);
    aspectRatio = config._aspectRatio || [17, 13];

    cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    cy = (window.screen.availHeight / 2) - (newScr.y / 2);

    xPadding = 16;
    yPadding = 39;

    tw = ($gameMap && $gameMap.tileWidth) ? $gameMap.tileWidth() : 48;
    th = ($gameMap && $gameMap.tileHeight) ? $gameMap.tileHeight() : 48;

    minW = (tw * aspectRatio[0]) || Graphics._renderer.width;
    minH = (th * aspectRatio[1]) || Graphics._renderer.height;

    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);

    if(isGraphicsAutoScaling && (tw/th >= 1.0) && tw >= 48) {
      if(isMaintainingMinimumWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
      if(isMaintainingMinimumHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);
      if(!isMaintainingMinimumWidth && !isMaintainingMinimumHeight) {
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
    if(isRecreateScene) {
      if(SceneManager._scene) SceneManager.push(SceneManager._scene.constructor);
    }
  };

  SceneManager.initGraphics = function() {
    var self = this;
    var type, size, orientation, config, mobile;
    var sw, sh, bw, bh;
    var maxSW, maxSH;

    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;
    type = this.preferableRendererType();

    if(Utils.isNwjs()) {
      orientation = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) orientation = 'landscape';
    } else {
      orientation = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }
    config = new ScreenConfig(maxSW, maxSH, orientation);

    // This allows you to get a new size of the screen using an aspect ratio on mobile device.
    size = config.getSize(this._screenWidth);

    mobile = Utils.isMobileDevice();
    sw = (mobile === true) ? size[0] : this._screenWidth;
    sh = (mobile === true) ? size[1] : this._screenHeight;
    bw = (mobile === true) ? size[0] : this._boxWidth;
    bh = (mobile === true) ? size[1] : this._boxHeight;

    Graphics.initialize(sw, sh, type);
    Graphics.boxWidth = bw;
    Graphics.boxHeight = bh;

    Graphics.setLoadingImage('img/system/Loading.png');
    if (Utils.isOptionValid('showfps')) {
        Graphics.showFps();
    }
    if (type === 'webgl') {
        this.checkWebGL();
    }
  };

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._lastScreenManagerItem = 0;
  };

  //============================================================================
  // Window_Options
  //============================================================================

  if(Utils.isNwjs()) {
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

  }

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
    this._data = Graphics.getAvailGraphicsArray('String').slice(0);
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
            if(Utils.isNwjs()) {
              SceneManager.push(ScreenManager);
            }
            break;
        }
      }
  };

})();
