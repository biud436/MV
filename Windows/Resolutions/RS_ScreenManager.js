//==============================================================================
// RS_ScreenManager.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_ScreenManager = true;

/*:
 * @plugindesc (v1.0.8) <RS_ScreenManager>
 * @author biud436
 *
 * @param TEST OPTION (TEST ONLY)
 *
 * @param isGraphicsRendererResize
 * @text Resize Graphics Renderer
 * @type boolean
 * @parent TEST OPTION (TEST ONLY)
 * @desc This is the parameter for resizing the graphics renderer
 * @default false
 * @on true
 * @off false
 *
 * @param isGraphicsAutoScaling
 * @text Auto Scaling
 * @type boolean
 * @parent TEST OPTION (TEST ONLY)
 * @desc This is the parameter for scaling the graphics objects.
 * @default false
 * @on true
 * @off false
 *
 * @param isMaintainingMinimumWidth
 * @text ON Minimum Width
 * @parent TEST OPTION (TEST ONLY)
 * @type boolean
 * @desc Set whether it can not set the width is less than minimum width
 * @default true
 * @on true
 * @off true
 *
 * @param isMaintainingMinimumHeight
 * @text ON Minimum Height
 * @parent TEST OPTION (TEST ONLY)
 * @type boolean
 * @desc Set whether it can not set the width is less than minimum height
 * @default true
 * @on true
 * @off true
 *
 * @param Resource Options
 * @default
 *
 * @param imageName
 * @text Background Image Name
 * @parent Resource Options
 * @desc Specify the name of the image for background that is to be drawn in the Scene Manager.
 * @default Mountains3
 * @require 1
 * @dir img/parallaxes/
 * @type file
 *
 * @param panelTextName
 * @parent Resource Options
 * @desc Specify the name of the panel that places in the top of the screen
 * @default Display Resolutions
 *
 * @param fullScreenButtonName
 * @parent Resource Options
 * @desc Specify the name of the button for fullscreen
 * @default Full Screen
 *
 * @param Scene Options
 * @default
 *
 * @param Recreate Scene
 * @parent Scene Options
 * @type boolean
 * @desc To set as true, the current scene will recreate after changing screen size
 * @default true
 *
 * @param Use All Resolutions
 * @parent Scene Options
 * @type boolean
 * @desc Sets whether resolution gets even if the resolution of your device is not supported.
 * @default false
 *
 * @param Enable Custom Aspect Ratio
 * @parent Scene Options
 * @desc In case of true, the screen size will convert to fit a custom aspect ratio.
 * @default false
 *
 * @param Custom Aspect Ratio
 * @parent Scene Options
 * @type select
 * @desc Specify the aspect ratio as you want.
 * @default 16:9
 * @option 16:9 (Wide Screen)
 * @value 16:9
 * @option 4:3
 * @value 4:3
 *
 * @param Screen Size
 *
 * @param Default Screen Size
 * @parent Screen Size
 * @type select
 * @desc This parameter allows you to change your default game screen size
 * Note that the screen size limited on you available screen size
 * @default 1280 x 720
 * @option 320 x 240 (4:3)
 * @value 320 x 240
 * @option 544 x 416 (17:13)
 * @value 544 x 416
 * @option 640 x 480 (4:3)
 * @value 640 x 480
 * @option 800 x 600 (4:3)
 * @value 800 x 600
 * @option 816 x 624 (17:13)
 * @value 816 x 624
 * @option 1024 x 768 (4:3)
 * @value 1024 x 768
 * @option 1152 x 864 (4:3)
 * @value 1152 x 864
 * @option 1280 x 720 (16:9)
 * @value 1280 x 720
 * @option 1280 x 800 (8:5)
 * @value 1280 x 800
 * @option 1280 x 960 (4:3)
 * @value 1280 x 960
 * @option 1360 x 768 (85:48)
 * @value 1360 x 768
 * @option 1366 x 768 (683:384)
 * @value 1366 x 768
 * @option 1400 x 1050 (4:3)
 * @value 1400 x 1050
 * @option 1440 x 900 (8:5)
 * @value 1440 x 900
 * @option 1600 x 900 (16:9)
 * @value 1600 x 900
 * @option 1600 x 1200 (4:3)
 * @value 1600 x 1200
 * @option 1680 x 1050 (8:5)
 * @value 1680 x 1050
 * @option 1920 x 1080 (16:9)
 * @value 1920 x 1080
 * @option 1920 x 1200 (8:5)
 * @value 1920 x 1200
 * @option 2048 x 1152 (16:9)
 * @value 2048 x 1152
 * @option 2560 x 1440 (16:9)
 * @value 2560 x 1440
 * @option 2560 x 1600 (8:5)
 * @value 2560 x 1600
 *
 * @param Default Graphics Size
 * @parent Screen Size
 * @type select
 * @desc This parameter allows you to change your default graphics size
 * @default 1280 x 720
 * @option 320 x 240 (4:3)
 * @value 320 x 240
 * @option 544 x 416 (17:13)
 * @value 544 x 416
 * @option 640 x 480 (4:3)
 * @value 640 x 480
 * @option 800 x 600 (4:3)
 * @value 800 x 600
 * @option 816 x 624 (17:13)
 * @value 816 x 624
 * @option 1024 x 768 (4:3)
 * @value 1024 x 768
 * @option 1152 x 864 (4:3)
 * @value 1152 x 864
 * @option 1280 x 720 (16:9)
 * @value 1280 x 720
 * @option 1280 x 800 (8:5)
 * @value 1280 x 800
 * @option 1280 x 960 (4:3)
 * @value 1280 x 960
 * @option 1360 x 768 (85:48)
 * @value 1360 x 768
 * @option 1366 x 768 (683:384)
 * @value 1366 x 768
 * @option 1400 x 1050 (4:3)
 * @value 1400 x 1050
 * @option 1440 x 900 (8:5)
 * @value 1440 x 900
 * @option 1600 x 900 (16:9)
 * @value 1600 x 900
 * @option 1600 x 1200 (4:3)
 * @value 1600 x 1200
 * @option 1680 x 1050 (8:5)
 * @value 1680 x 1050
 * @option 1920 x 1080 (16:9)
 * @value 1920 x 1080
 * @option 1920 x 1200 (8:5)
 * @value 1920 x 1200
 * @option 2048 x 1152 (16:9)
 * @value 2048 x 1152
 * @option 2560 x 1440 (16:9)
 * @value 2560 x 1440
 * @option 2560 x 1600 (8:5)
 * @value 2560 x 1600
 *
 * @param Resize All Windows
 * @parent Screen Size
 * @type boolean
 * @desc Decide whether it will be set as relative size to the screen size.
 * @default false
 *
 * @help
 * =============================================================================
 * Installations
 * =============================================================================
 * Step1. Download the plugin and the extension program for Win32
 * Step2. Put displaySettings.exe file in your project ./js/libs folder.
 * Step3. Open the Plugin Managers and then set up this plugin.
 * Step4. Deploy your project by Windows platform.
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
 * 2017.05.29 (v1.0.4) - Added a new feature that can apply a custom aspect ratio.
 * 2017.05.30 (v1.0.5) :
 * - Added a new feature that is resized the game screen when starting the game.
 * - Fixed the problem that is not fitted a size of the background image
 * to a new screen size after resizing the screen.
 * 2017.05.30 (v1.0.6) :
 * - Fixed the function to get the width or the height of the screen on mobile.
 * - Added a new feature that relatively changes the area of the UI.
 * 2017.06.12 (v1.0.7) :
 * - Fixed the parameter about default screen width and height.
 * - Fixed an issue to incorrect scale the background (Scene_Title, Scene_MenuBase, Scene_Gameover)
 * - Fixed the default value of the 'Resize All Windows' parameter is to false.
 * 2017.11.24 (v1.0.8) :
 * - Fixed some issues that are not working in RMMV 1.6.0 (Beta)
 * - Now this plugin doesn't use the node webkit extension.
 */

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenManager>');
  });

  var pcGraphicsArray;

  parameters = (parameters.length > 0) && parameters[0].parameters;

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
  var bitmap = ImageManager.loadParallax(imageName);
  var getTargetRegex = /(\d+)[ ]x[ ](\d+)/i;

  var isEnabledAspectRatio = Boolean(parameters['Enable Custom Aspect Ratio'] === 'true');

  var customAspectRatio = parameters['Custom Aspect Ratio'] || "16:9";
  customAspectRatio = customAspectRatio.trim().split(":");

  var ptCustomScreenSize = String(parameters["Default Screen Size"] || '1280 x 720').split(' x ');

  var defaultScreenSize = new Point(
    parseInt(ptCustomScreenSize[0]) || 1280,
    parseInt(ptCustomScreenSize[1]) || 720
  );

  var isResizeAllWindows = Boolean(parameters["Resize All Windows"] === "true");

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

  (function(){
    "use strict";

    if( Utils.isNwjs() ) {
      if(process && process.platform && process.platform === 'win32') {

        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        var child_process = require('child_process');
        var fileName = path.join(base,"js/libs/DisplaySettings.exe");
        var projectName = document.querySelector('title').text;
        var cmdProcess = child_process.exec(`cmd.exe /K ${fileName} /c`);

        pcGraphicsArray = pcGraphicsTempArray;

        cmdProcess.stdout.on('data', function(data) {
          pcGraphicsArray = data.split('\n').filter(function(i, idx, item) {
            return item.indexOf(i) === idx;
          });
        });

        process.on('exit', function () {
          cmdProcess.kill();
        });

      } else {
        // in case of Mac OS
        pcGraphicsArray = pcGraphicsTempArray;

      }
    }

  })();

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
    var gcd, ret;
    if(width === height) return [1, 1];
    gcd = this.gcd(width, height);
    ret = [(width / gcd), (height / gcd)];
    return ret;
  };

  ScreenConfig.prototype.getRatioAsString = function (width, height) {
    var gcd, temp, ret;
    if(width === height) return [1, 1];
    if(width < height) {
      temp = width;
      width = height;
      height = temp;
    }
    gcd = this.gcd(width, height);
    ret = Number(width / gcd) + ':' + Number(height / gcd);
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
  // CustomScreenConfig
  //============================================================================
  function CustomScreenConfig() {
    this.initialize.apply(this, arguments);
  };

  CustomScreenConfig.prototype = Object.create(ScreenConfig.prototype);
  CustomScreenConfig.prototype.constructor = CustomScreenConfig;

  CustomScreenConfig.prototype.initialize = function (a, b) {
    // We don't need parameters,
    // But it is just for calling the constructor of corresponding superclass.
    ScreenConfig.prototype.initialize.call(this, 1600, 900, 'landscape');
    a = a || 16;
    b = b || 9;
    this._aspectRatio = [a, b];
  };

  /**
   * This method calculates a new screen size that is added an aspect ratio
   * @memberof CustomScreenConfig
   * @method getSize
   * @param {Number} virtualWidth
   * @return {Array}
   */

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
    var orientation, config, aspectRatio;
    var temp, ret;

    gArray = [];
    result = [];

    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    // Screen Orientation
    if(Utils.isNwjs()) {
      type = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) type = 'landscape';
    } else {
      type = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }

    data = (Utils.isMobileDevice() === true) ? mobileGraphicsArray : pcGraphicsArray;

    // Set a custom aspect ratio
    config = new CustomScreenConfig(customAspectRatio[0], customAspectRatio[1]);

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

          // The screen size will convert to fit an aspect ratio of the wide screen.
          if(isEnabledAspectRatio) {
            temp = config.getSize(tw);
            tw = temp[0];
            th = temp[1];
          }

          pt = new Point(tw, th);
          gArray.push(pt);
          result.push(pt.toString());

        } else {

          if(isUseAllResolutions) {

            // The screen size will convert to fit an aspect ratio of the wide screen.
            if(isEnabledAspectRatio) {
              temp = config.getSize(tw);
              tw = temp[0];
              th = temp[1];
            }

            pt = new Point(tw, th);
            gArray.push(pt);
            result.push(pt.toString());

          }

        }
      }
    }, this);

    return (returnType === 'String')? result : gArray;

  };

  Graphics.getOrientation = function (inner) {
    var maxSW = (inner === true) ? window.innerWidth : window.screen.availWidth;
    var maxSH = (inner === true) ? window.innerHeight : window.screen.availHeight;
    var orientation = 'landscape';
    if(Utils.isNwjs()) {
      orientation = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) orientation = 'landscape';
    } else {
      orientation = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }
    return orientation;
  };

  Graphics.setScreenResize = function (newScr) {
    var cx, cy, xPadding, yPadding;
    var tw, th, minW, minH;
    var orientation, config, aspectRatio;
    var maxSW, maxSH;
    var temp;

    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    // Get an orientation in your screen
    orientation = this.getOrientation(false);

    // Get an aspect ratio of a new screen size.
    config = new ScreenConfig(newScr.x, newScr.y, orientation);
    aspectRatio = config._aspectRatio || [17, 13];

    if(isEnabledAspectRatio) {
      config = new CustomScreenConfig(customAspectRatio[0], customAspectRatio[1]);
      aspectRatio = config._aspectRatio;
      temp = config.getSize(newScr.x);
      newScr.x = temp[0];
      newScr.y = temp[1];
    }

    // Variables that can set the position of an application as the middle of the screen.
    cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    cy = (window.screen.availHeight / 2) - (newScr.y / 2);

    // These padding variables indicate the width or height of an each window border.
    xPadding = window.outerWidth - window.innerWidth;
    yPadding = window.outerHeight - window.innerHeight;

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

  // Graphics._changeOrientation = function (event) {
  //   if(this._deviceOrientationAlpha !== event.alpha) {
  //     var maxSW = window.innerWidth;
  //     var maxSH = window.innerHeight;
  //     this.setScreenResize(new Point(maxSW, maxSH));
  //     this._deviceOrientationAlpha = event.alpha;
  //   };
  // };

  SceneManager.initGraphics = function() {
    var self = this;
    var type, size, orientation, config, mobile;
    var sw, sh, bw, bh;
    var maxSW, maxSH;
    var defScrWidth, defScrHeight;

    maxSW = window.innerWidth;
    maxSH = window.innerHeight;
    type = this.preferableRendererType();

    // Default Screen Size
    defScrWidth = defaultScreenSize.x;
    defScrHeight = defaultScreenSize.y;

    orientation = Graphics.getOrientation(true);
    config = new ScreenConfig(maxSW, maxSH, orientation);

    // This allows you to get a new size of the screen using an aspect ratio on mobile device.
    size = config.getSize(defScrWidth);

    mobile = Utils.isMobileDevice();
    sw = (mobile === true) ? size[0] : defScrWidth;
    sh = (mobile === true) ? size[1] : defScrHeight;
    bw = (mobile === true) ? size[0] : defScrWidth;
    bh = (mobile === true) ? size[1] : defScrHeight;

    Graphics.initialize(sw, sh, type);
    Graphics.boxWidth = bw;
    Graphics.boxHeight = bh;

    if(Utils.isNwjs()) {
      Graphics.setScreenResize(new Point(sw, sh));
    }

    Graphics.setLoadingImage('img/system/Loading.png');
    if (Utils.isOptionValid('showfps')) {
        Graphics.showFps();
    }
    if (type === 'webgl') {
        this.checkWebGL();
    }
  };

  // var alias_Graphics_setupEventHandlers = Graphics._setupEventHandlers;
  // Graphics._setupEventHandlers = function() {
  //   alias_Graphics_setupEventHandlers.call(this);
  //   window.addEventListener("deviceorientation", Graphics._changeOrientation.bind(this));
  // };

  var alias_Graphics_onWindowResize = Graphics._onWindowResize;
  Graphics._onWindowResize = function() {
    alias_Graphics_onWindowResize.call(this);
    if(Utils.isNwjs()) {
      var canvas = document.querySelector('canvas');
      var dx = parseInt(canvas.style.width);
      var dy = parseInt(canvas.style.height);
      var xPadding = window.outerWidth - window.innerWidth;
      var yPadding = window.outerHeight - window.innerHeight;
      var cx = (window.screen.availWidth / 2) - (Graphics.boxWidth / 2);
      var cy = (window.screen.availHeight / 2) - (Graphics.boxHeight / 2);
      if(dx !== Graphics.boxWidth) {
        var mx = (Graphics.boxWidth - dx);
        var my = (Graphics.boxHeight - dy);
        window.resizeTo(
          parseInt(Graphics.boxWidth - mx + xPadding),
          parseInt(Graphics.boxHeight - my + yPadding)
        );
        window.moveTo(cx + mx / 2, cy + my / 2);
      }
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
    };

    Window_Options.prototype.isAspectRatio = function (symbol) {
      return symbol.contains('Aspect Ratio');
    };

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
          if( this.isAspectRatio( symbol ) ) {
            return new ScreenConfig(0, 0, '').getRatioAsString(Graphics.boxWidth, Graphics.boxHeight);
          } else {
            return this.booleanStatusText(value);
          }
        }
      }
    };

    var alias_Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function() {
      alias_Window_Options_addVolumeOptions.call(this);
      this.addCommand('Resolutions', 'Resolutions');
      this.addCommand('Aspect Ratio', 'Aspect Ratio');
    };

  }

  //============================================================================
  // Window_Base
  //============================================================================

  if(isResizeAllWindows) {

    var alias_Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
        alias_Window_Base_resetFontSettings.call(this);
        if(Utils.isMobileDevice()) {
          this.contents.outlineWidth = 1;
        }
    };

    Window_Base.prototype.lineHeight = function() {
        var scale = (Utils.isMobileDevice()) ? 1.5 : 1;
        return Math.floor(Graphics.boxHeight / customAspectRatio[0]) * scale;
    };

    Window_Base.prototype.standardFontSize = function() {
        var orientation = Graphics.getOrientation(true);
        if(orientation === 'landscape') {
          return Math.floor(Graphics.boxWidth / 29);
        } else {
          return Math.floor(Graphics.boxHeight / 29);
        }
    };

    Window_Base.prototype.standardPadding = function() {
        var scale = (Utils.isMobileDevice()) ? 0.5 : 1;
        return Math.floor(Graphics.boxWidth / 45) * scale;
    };

    Window_Base.prototype.textPadding = function() {
        var scale = (Utils.isMobileDevice()) ? 0.5 : 1;
        return Math.floor(Graphics.boxWidth / 136) * scale;
    };

    Window_Base.prototype.drawIcon = function(iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var dw = Math.min(Math.floor(Graphics.boxWidth / 25.5), pw);
        var dh = Math.min(Math.floor(Graphics.boxHeight / 19.5), ph);
        var orientation = Graphics.getOrientation(true);
        if(orientation === 'portrait') {
          dw = Math.max(Math.floor(Graphics.boxWidth / 19.5), pw);
          dh = Math.max(Math.floor(Graphics.boxHeight / 25.5), ph);
        }
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
    };

    Window_Base.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        var dw = Math.min(Math.floor(Graphics.boxWidth / 5.66), sw);
        var dh = Math.min(Math.floor(Graphics.boxHeight / 4.3), sh);
        var orientation = Graphics.getOrientation(true);
        if(orientation === 'portrait') {
          dw = Math.max(Math.floor(Graphics.boxWidth / 4.3), sw);
          dh = Math.max(Math.floor(Graphics.boxHeight / 5.66), sh);
        }
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
        var bitmap = ImageManager.loadCharacter(characterName);
        var big = ImageManager.isBigCharacter(characterName);
        var pw = bitmap.width / (big ? 3 : 12);
        var ph = bitmap.height / (big ? 4 : 8);
        var n = characterIndex;
        var sx = (n % 4 * 3 + 1) * pw;
        var sy = (Math.floor(n / 4) * 4) * ph;
        var dw = Math.floor(Graphics.boxWidth / customAspectRatio[0]);
        var dh = Math.floor(Graphics.boxHeight / customAspectRatio[1]);
        var orientation = Graphics.getOrientation(true);
        if(orientation === 'portrait') {
          dw = Math.max(Math.floor(Graphics.boxWidth / 17), pw);
          dh = Math.max(Math.floor(Graphics.boxHeight / 13), ph);
        }
        this.contents.blt(bitmap, sx, sy, pw, ph, x - dw / 2, y - dh, dw, dh);
    };

    Window_Command.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_Gold.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_MenuCommand.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_SkillType.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_EquipStatus.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 2.62);
    };

    Window_Options.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 2.04);
    };

    Window_ShopBuy.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 1.78);
    };

    Window_ShopNumber.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 1.78);
    };

    Window_NameEdit.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 1.7);
    };

    Window_MapName.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 2.26);
    };

    Window_PartyCommand.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 4.25);
    };

    Window_ActorCommand.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 4.25);
    };

    Window_TitleCommand.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_GameEnd.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4);
    };

    Window_DebugRange.prototype.windowWidth = function() {
        return Math.floor(Graphics.boxWidth / 3.4) + 6;
    };

    Window_NumberInput.prototype.itemWidth = function() {
        return parseInt(customAspectRatio[0] * 2);
    };

    Object.defineProperty(Sprite.prototype, 'width', {
        get: function() {
            return this._frame.width;
        },
        set: function(value) {
            value = Math.floor(Graphics.boxWidth / (Graphics.boxWidth / value));
            this._frame.width = value;
            this._refresh();
        },
        configurable: true
    });

    /**
     * The height of the sprite without the scale.
     *
     * @property height
     * @type Number
     */
    Object.defineProperty(Sprite.prototype, 'height', {
        get: function() {
            return this._frame.height;
        },
        set: function(value) {
            value = Math.floor(Graphics.boxHeight / (Graphics.boxHeight / value));
            this._frame.height = value;
            this._refresh();
        },
        configurable: true
    });

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
    this._windowFrameSprite.visible = false;
    this._index = 0;
    this._item = [];
    this.initWithItemPoint();
    this.refresh();
    this.activate();
    this.select($gameSystem._lastScreenManagerItem || 0);
  };

  Window_AvailGraphicsList.prototype.lineHeight = function () {
    return Math.round(Graphics.boxHeight / 16);
  };

  Window_AvailGraphicsList.prototype.initWithItemPoint = function () {
    var data = Graphics.getAvailGraphicsArray('Number');
    var ret = [];
    this.uniqWithPoint(data.slice(0), function (newData) {
      ret = newData;
    });

    if(isEnabledAspectRatio) {
      var config = new CustomScreenConfig(customAspectRatio[0], customAspectRatio[1]);
      var insData = parseInt(window.screen.availWidth / customAspectRatio[0]) * customAspectRatio[0];
      var fullscreenData = config.getSize(insData);
      ret.push(new Point(fullscreenData[0], fullscreenData[1]));
    }

    this._itemToPoint = ret;
  };

  Window_AvailGraphicsList.prototype.uniqWithPoint = function (data, callback) {
    var ret = [];
    ret = data.filter(function(e, i, a) {
      if(a[i-1] instanceof Point) {
        if(a[i-1].x === e.x && a[i-1].y === e.y) {
          return false;
        }
        return true;
      } else {
        return true;
      }
    });
    callback(ret);
  };

  Window_AvailGraphicsList.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
  };

  Window_AvailGraphicsList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_AvailGraphicsList.prototype.item = function() {
    return this._data && this._index >= 0 ? this._data[this._index] : null;
  };

  Window_AvailGraphicsList.prototype.makeItemList = function() {
    this._data = Graphics.getAvailGraphicsArray('String');
    if(isEnabledAspectRatio) {
      this._data = this.uniq(this._data.slice(0));
    }
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

  Window_AvailGraphicsList.prototype.uniq = function (data) {
    data = data.filter(function (e, i, a) {
      return a.indexOf(e) === i;
    }, this);
    return data;
  };

  //============================================================================
  // Scene_Base
  //============================================================================

  Scene_Base.prototype.rescaleSprite = function (sprite) {
    if(!sprite.bitmap) return;
    var bitmap = sprite.bitmap;
    var scaleX = Graphics.boxWidth / bitmap.width;
    var scaleY = Graphics.boxHeight / bitmap.height;
    sprite.scale.x = (scaleX > 1.0) ? scaleX : 1.0;
    sprite.scale.y = (scaleY > 1.0) ? scaleY : 1.0;
    sprite.x = Graphics.boxWidth / 2;
    sprite.y = Graphics.boxHeight / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };

  var alias_Scene_MenuBase_start = Scene_MenuBase.prototype.start;
  Scene_MenuBase.prototype.start = function() {
    alias_Scene_MenuBase_start.call(this);
    this.rescaleSprite(this._backgroundSprite);
  };

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    alias_Scene_Title_start.call(this);
    this.rescaleSprite(this._backSprite1);
    this.rescaleSprite(this._backSprite2);
  };

  var alias_Scene_Gameover_start = Scene_Gameover.prototype.start;
  Scene_Gameover.prototype.start = function() {
    alias_Scene_Gameover_start.call(this);
    this.rescaleSprite(this._backSprite);
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
    var bw = Graphics.boxWidth;
    var bh = Graphics.boxHeight;
    var scaleX = (bw / bitmap.width);
    var scaleY = (bh / bitmap.height);
    var x = Graphics.boxWidth / 2 - (bitmap.width * scaleX) / 2;
    var y = Graphics.boxHeight / 2 - (bitmap.height * scaleY) / 2;
    this._backgroundWindow = new Sprite(bitmap);
    this._backgroundWindow.x = x;
    this._backgroundWindow.y = y;
    this._backgroundWindow.scale.x = scaleX;
    this._backgroundWindow.scale.y = scaleY;
    this._backgroundWindow.blendMode = 3;
    this.addWindow(this._backgroundWindow);
  };

  ScreenManager.prototype.createPanel = function () {
    var color1 = Window_Base.prototype.dimColor1();
    var color2 = Window_Base.prototype.dimColor2();
    var width = Math.floor(Graphics.boxWidth / 3);
    var height = Math.floor(Graphics.boxHeight / 17);
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
    var width = Math.floor(Graphics.boxWidth / 3);
    var height = Math.floor(Graphics.boxWidth / 2.5);
    this._availGraphicsList = new Window_AvailGraphicsList(0, 0, width, height);
    this._availGraphicsList.x = Graphics.boxWidth / 2 - (width / 2);
    this._availGraphicsList.y = Graphics.boxHeight / 2 - (height / 2);
    this._availGraphicsList.setHandler('ok', this.convertScreenSize.bind(this));
    this._availGraphicsList.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._availGraphicsList);
  };

  ScreenManager.prototype.convertScreenSize = function () {
    if(Utils.isNwjs()) {
      var scr = this._availGraphicsList.getCurrentItemToPoint();
      if(scr) {
        Graphics.setScreenResize(scr);
      } else {
        var config = new CustomScreenConfig(customAspectRatio[0], customAspectRatio[1]);
        var insData = parseInt(window.screen.availWidth / customAspectRatio[0]) * customAspectRatio[0];
        var data = config.getSize(insData);
        Graphics.setScreenResize(new Point(data[0], data[1]));
      }

      // Switches a fullscreen
      if(this._availGraphicsList.item() === fullScreenButtonName) {
        Graphics._switchFullScreen();
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
