//================================================================
// RS_ScreenManager.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

var Imported = Imported || {};
Imported.RS_ScreenManager = true;

/*:
 * @plugindesc (v1.1.2) <RS_ScreenManager>
 * @author biud436
 *
 * @param Test Options
 * @text Options
 *
 * @param options.resize
 * @text options.resize
 * @type boolean
 * @parent Test Options
 * @desc This is the parameter for resizing the graphics renderer
 * @default false
 * @on true
 * @off false
 *
 * @param options.autoScaling
 * @text options.autoScaling
 * @type boolean
 * @parent Test Options
 * @desc This is the parameter for scaling the graphics objects.
 * @default false
 * @on true
 * @off false
 *
 * @param options.minWidth
 * @text options.minWidth
 * @parent Test Options
 * @type boolean
 * @desc Set whether it can not set the width is less than minimum width
 * @default true
 * @on true
 * @off false
 *
 * @param options.minHeight
 * @text options.minHeight
 * @parent Test Options
 * @type boolean
 * @desc Set whether it can not set the width is less than minimum height
 * @default true
 * @on true
 * @off false
 *
 * @param Scene Options
 * @text Scene Options
 *
 * @param Recreate Scene
 * @text Recreate Scene
 * @parent Scene Options
 * @type boolean
 * @desc To set as true, the current scene will recreate after changing screen size
 * @default true
 * 
 * @param Enable Custom Aspect Ratio
 * @text Enable Custom Aspect Ratio
 * @parent Scene Options
 * @type boolean
 * @desc In case of true, the screen size will convert to fit a custom aspect ratio.
 * @default false
 *
 * @param Custom Aspect Ratio
 * @text Custom Aspect Ratio
 * @parent Scene Options
 * @type select
 * @desc Specify the aspect ratio as you want.
 * @default 16:9
 * @option 16:9 (Wide Screen)
 * @value 16:9
 * @option 18:9
 * @value 18:9
 * @option 20:9
 * @value 20:9
 * @option 4:3
 * @value 4:3
 * 
 * @param Auto Sync Manifest file
 * @text Auto Sync Manifest file
 * @parent Scene Options
 * @type boolean
 * @desc if true, it can be changed the manifest file when resizing the window in RPG Maker MV v1.6.1 with NwJs
 * @default false
 * @on true
 * @off false
 *
 * @param Screen Size
 * @text Screen Size
 *
 * @param Default Screen Size
 * @text Default Screen Size
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
 * @option 816 x 408 (18:9)
 * @value 816 x 408
 * @option 1024 x 768 (4:3)
 * @value 1024 x 768
 * @option 1152 x 864 (4:3)
 * @value 1152 x 864
 * @option 1280 x 720 (16:9)
 * @value 1280 x 720
 * @option 1280 x 640 (18:9)
 * @value 1280 x 640
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
 * @option 1600 x 720 (20:9)
 * @value 1600 x 720
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
 * @option 2400 x 1080 (20:9) 
 * @value 2400 x 1080
 * @option 2560 x 1440 (16:9)
 * @value 2560 x 1440
 * @option 2560 x 1600 (8:5)
 * @value 2560 x 1600
 *
 * @param Default Graphics Size
 * @text Default Graphics Size
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
 * @option 816 x 408 (18:9)
 * @value 816 x 408
 * @option 1024 x 768 (4:3)
 * @value 1024 x 768
 * @option 1152 x 864 (4:3)
 * @value 1152 x 864
 * @option 1280 x 720 (16:9)
 * @value 1280 x 720
 * @option 1280 x 640 (18:9)
 * @value 1280 x 640
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
 * @option 1600 x 720 (20:9)
 * @value 1600 x 720
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
 * @option 2400 x 1080 (20:9) 
 * @value 2400 x 1080
 * @option 2560 x 1440 (16:9)
 * @value 2560 x 1440
 * @option 2560 x 1600 (8:5)
 * @value 2560 x 1600
 * 
 * @param Temp
 * 
 * @param PC
 * @parent Temp
 * @type struct<ScreenSize>[]
 * @desc it is using pre-written resolutions when it failed to bind node extension.
 * @default ["{\"width\":\"640\",\"height\":\"480\"}","{\"width\":\"800\",\"height\":\"600\"}","{\"width\":\"1024\",\"height\":\"768\"}","{\"width\":\"1152\",\"height\":\"864\"}","{\"width\":\"1280\",\"height\":\"720\"}","{\"width\":\"1280\",\"height\":\"800\"}","{\"width\":\"1280\",\"height\":\"960\"}","{\"width\":\"1360\",\"height\":\"768\"}","{\"width\":\"1360\",\"height\":\"768\"}","{\"width\":\"1366\",\"height\":\"768\"}","{\"width\":\"1400\",\"height\":\"1050\"}","{\"width\":\"1440\",\"height\":\"900\"}","{\"width\":\"1600\",\"height\":\"900\"}","{\"width\":\"1600\",\"height\":\"1200\"}","{\"width\":\"1680\",\"height\":\"1050\"}","{\"width\":\"1920\",\"height\":\"1080\"}","{\"width\":\"1920\",\"height\":\"1200\"}","{\"width\":\"2048\",\"height\":\"1152\"}","{\"width\":\"2560\",\"height\":\"1440\"}","{\"width\":\"2560\",\"height\":\"1600\"}"]
 * 
 * @param Mobile
 * @parent Temp
 * @type struct<ScreenSize>[]
 * @desc Set as the resolution list automatically in the mobile device.
 * @default ["{\"width\":\"120\",\"height\":\"160\"}","{\"width\":\"160\",\"height\":\"240\"}","{\"width\":\"240\",\"height\":\"320\"}","{\"width\":\"240\",\"height\":\"400\"}","{\"width\":\"320\",\"height\":\"480\"}","{\"width\":\"480\",\"height\":\"800\"}","{\"width\":\"640\",\"height\":\"960\"}","{\"width\":\"640\",\"height\":\"1136\"}","{\"width\":\"720\",\"height\":\"1280\"}","{\"width\":\"750\",\"height\":\"1334\"}","{\"width\":\"768\",\"height\":\"1024\"}","{\"width\":\"768\",\"height\":\"1280\"}","{\"width\":\"800\",\"height\":\"1280\"}","{\"width\":\"1080\",\"height\":\"1920\"}","{\"width\":\"1200\",\"height\":\"1920\"}","{\"width\":\"1242\",\"height\":\"2208\"}","{\"width\":\"1440\",\"height\":\"2560\"}","{\"width\":\"1536\",\"height\":\"2048\"}","{\"width\":\"1600\",\"height\":\"2560\"}","{\"width\":\"2048\",\"height\":\"2732\"}"]
 * 
 * @param Mobile Simple
 * @parent Temp
 * @type struct<ScreenSize>[]
 * @desc Set the list for display resolution.
 * @default ["{\"width\":\"320\",\"height\":\"480\"}","{\"width\":\"480\",\"height\":\"800\"}","{\"width\":\"720\",\"height\":\"1280\"}","{\"width\":\"1080\",\"height\":\"1920\"}"]
 * 
 * @param Pictures
 * 
 * @param Scaled Picture
 * @parent Pictures
 * @type boolean
 * @desc Resize the picture to fit the actual resolution ratio.
 * @default false
 * @on true
 * @off false
 * 
 * @param Picture Position Type
 * @parent Pictures
 * @type combo
 * @desc Please select picture positioning method when resizing.
 * @default Virtual Coordinates
 * @option Actual Coordinates
 * @option Virtual Coordinates
 * 
 * @param Ignore Auto Scale
 * @parent Pictures
 * @type number[]
 * @desc Sometimes it must ignore auto-scale.
 * @min 1
 * @default []
 * 
 * @param Original View Size
 * @parent Pictures
 * @type struct<ScreenSize>
 * @desc Specify the original screen size.
 * @default {"width":"816","height":"624"}
 * 
 * @param BattleField
 * 
 * @param Scaled Battleback
 * @parent BattleField
 * @type boolean
 * @desc it can rescale battle background images to fit with Graphics' area.
 * @default false
 * 
 * @help
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
 * 2018.06.05 (v1.0.9) :
 * - Updated and Fixed the library correctly for getting the all resolutions.
 * - Added plugin parameters for setting the size of the screen (RPG Maker MV 1.5.0 Features)
 * 2018.08.01 (v1.0.10) - Added the try-catch statement.
 * 2018.09.02 (v1.0.11) - Fixed the method name called 'rescaleSprite' is to 'requestStretch' due to a crash.
 * 2018.10.11 (v1.0.12) :
 * - In RPG Maker MV 1.6.1, Fixed a nw-version of the node module is to 9.11.1
 * - Fixed the bug that the screen does not align properly to center.
 * 2018.10.23 (v1.0.13) :
 * - Added the feature that would save the option to a manifest file when closing the window in RPG Maker MV v1.6.1.
 * - Added the localization text for 'Windowed Mode'.
 * 2018.11.08 (v1.0.14) :
 * - Fixed the issue that is not set the size of the Graphics object with an aspect ratio when initializing.
 * 2019.03.22 (v1.0.16) :
 * - Fixed an issue that initial resolution was set incorrectly.
 * - The Resolution Option is no longer displayed on the mobile (because it's unstable)
 * - Added JSON Beautifier option in the package.json file.
 * - In the Test-Play mode, Now the alert window is not shown. (1.5.2 or less)
 * 2019.05.27 (v1.0.17) :
 * - Fixed the error that is always indicated the NaN when it couldn't load the addon.
 * 2019.12.16 (v1.0.18) :
 * - Picture rescaling added.
 * 2020.01.09 (v1.0.21) :
 * - Fixed the bug that couldn't change the scale of picture properly.
 * - Added the scaled battle background and then reposition actors (vanilla mode only)
 * 2020.02.11 (v1.1.0) :
 * - Removed ScreenManager that can change the resolution during the game.
 * - Removed Node library dependency.
 * - Removed a feature that does resizing or scaling an actor's sprite.
 * - Removed localization feature.
 * 2020.02.19 (v1.1.1) :
 * - Fixed RS.ScreenManager.isFullscreen();
 * 2020.05.20 (v1.1.2) :
 * - Fixed the issue that applies an aspect ratio option like as mobile device in the chrome browser on Windows.
 */
/*~struct~ScreenSize:
 *
 * @param width
 * @type number
 * @min 0
 * @desc Specify the desired width
 * @default 320
 *
 * @param height
 * @type number
 * @min 0
 * @desc Specify the desired height
 * @default 240
 * 
 */

var RS = RS || {};
RS.ScreenManager = RS.ScreenManager || {};
RS.ScreenManager.Params = RS.ScreenManager.Params || {};

(function ($) {

  "use strict";

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ScreenManager>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.ScreenManager.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.ScreenManager.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  RS.ScreenManager.options = {};
  RS.ScreenManager.settings = {};

  // Options
  Object.assign(RS.ScreenManager.options, {
    resize: Boolean(parameters['isGraphicsRendererResize'] === 'true'),
    autoScaling: Boolean(parameters['isGraphicsRendererResize'] === 'true'),
    minWidth: Boolean(parameters['isMaintainingMinimumWidth'] === 'true'),
    minHeight: Boolean(parameters['isMaintainingMinimumHeight'] === 'true'),
    recreate: Boolean(parameters['isMaintainingMinimumHeight'] === 'true'),
    aspectRatio: Boolean(parameters['Enable Custom Aspect Ratio'] === 'true'),
    isAutoSyncManifest: Boolean(parameters['Auto Sync Manifest file'] === 'true'),
    allResolutions: true,
  });

  // Settings
  RS.ScreenManager.settings.customAspectRatio = parameters['Custom Aspect Ratio'] || "16:9";
  RS.ScreenManager.settings.customAspectRatio = RS.ScreenManager.settings.customAspectRatio.trim().split(":");
  RS.ScreenManager.settings.ptCustomScreenSize = String(parameters["Default Screen Size"] || '1280 x 720').split(' x ');
  RS.ScreenManager.settings.defaultScreenSize = new Point(
    (parseInt(RS.ScreenManager.settings.ptCustomScreenSize[0]) || 1280),
    (parseInt(RS.ScreenManager.settings.ptCustomScreenSize[1]) || 720));
  RS.ScreenManager.settings.pcGraphicsArray = RS.ScreenManager.jsonParse(parameters["PC"]);
  RS.ScreenManager.settings.pcGraphicsTempArray = RS.ScreenManager.jsonParse(parameters["PC"]);
  RS.ScreenManager.settings.mobileGraphicsArray = RS.ScreenManager.jsonParse(parameters["Mobile"]);
  RS.ScreenManager.settings.resolutionQualityOnMobile = RS.ScreenManager.jsonParse(parameters["Mobile Simple"]);
  RS.ScreenManager.settings.state = "ready";

  // Parameters
  RS.ScreenManager.Params.fullscreenFlag = false;
  RS.ScreenManager.Params.isUsedNodeLibrary = false;
  RS.ScreenManager.Params.isAutoScaledPicture = Boolean(parameters["Scaled Picture"] === "true");
  RS.ScreenManager.Params.ignoreAutoScalePictures = RS.ScreenManager.jsonParse(parameters["Ignore Auto Scale"]);
  RS.ScreenManager.Params.originalPictureViewSize = RS.ScreenManager.jsonParse(parameters["Original View Size"]);
  RS.ScreenManager.Params.picturePosType = parameters["Picture Position Type"] || "Actual Coordinates";
  RS.ScreenManager.Params.isValidOptionWindow = Utils.isMobileDevice() ? false : true;
  RS.ScreenManager.Params.isValidScaledBattleback = Boolean(parameters["Scaled Battleback"] === "true");

  RS.ScreenManager.settings.isCatchedTaskBar = false;
  RS.ScreenManager.settings.taskBarHeight = -1;

  /**
   * Replace by target screen width and height values.
   */
  RS.ScreenManager.initWithMobile = function() {

    function replaceBy(mod, cb) {
      var item = JSON.stringify(mod);
      item = item.replace("screen.availWidth", screen.availWidth);
      item = item.replace("screen.availHeight", screen.availHeight);
      item = item.replace("window.outerWidth", window.outerWidth);
      item = item.replace("window.outerHeight", window.outerHeight);
      mod = RS.ScreenManager.jsonParse(item);
      cb(mod);
    }

    replaceBy(RS.ScreenManager.settings.resolutionQualityOnMobile, function(mod) {
      RS.ScreenManager.settings.resolutionQualityOnMobile = mod;
    });

    replaceBy(RS.ScreenManager.settings.mobileGraphicsArray, function(mod) {
      RS.ScreenManager.settings.mobileGraphicsArray = mod;
    });    
 
  };

  RS.ScreenManager.initWithMobile();

  /**
   * Read a manifest file called 'package.json'.
   */
  RS.ScreenManager.readManifestFile = function() {
    if(Utils.RPGMAKER_VERSION < '1.6.1') return;
    if(!Utils.isNwjs()) return;    
    if(!RS.ScreenManager.options.isAutoSyncManifest) return;
    var fs = require('fs');
    var path = require('path');
    var dirname = path.dirname(process.mainModule.filename);
    var packageJsonPath = path.join(dirname, "package.json");
    if(fs.existsSync(packageJsonPath)) {
      var packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      var config = packageConfig.window;
      if(config && config.fullscreen) {
        RS.ScreenManager.Params.fullscreenFlag = config.fullscreen;
        RS.ScreenManager.settings.defaultScreenSize.x = config.width;
        RS.ScreenManager.settings.defaultScreenSize.y = config.height;
        RS.ScreenManager.settings.ptCustomScreenSize = RS.ScreenManager.settings.defaultScreenSize.toString();
      }
    }    

    var win = require('nw.gui').Window.get();

    win.on('resize', function(width, height) {
      var f = RS.ScreenManager.isFullscreen();
      RS.ScreenManager.changeManifestFile(width, height, f);
    });

  };

  /**
   * Get a height value of Windows Taskbar using powershell C# WPF.
   * 
   * @return {Number}
   */
  RS.ScreenManager.getTaskBarHeight = function() {
    const defaultTaskBar = screen.height - screen.availHeight;
    if(!Utils.isNwjs()) return defaultTaskBar;
    if(RS.ScreenManager.settings.isCatchedTaskBar) {
      return RS.ScreenManager.settings.taskBarHeight;
    }
    var os = require('os');
    var fs = require('fs');
    var cp = require('child_process');
    var isValidPowershell = false;
    
    if ((process.platform === "win32") && /(\d+\.\d+).\d+/i.exec(os.release())) {
      const version = parseFloat(RegExp.$1);

      // Windows 7 이상인가?
      if (version >= "6.1") {
        isValidPowershell = true;
      }
    }    

    if(!isValidPowershell) return defaultTaskBar;
    var raw = cp.execSync(`powershell -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.SystemParameters]::PrimaryScreenHeight - [System.Windows.SystemParameters]::WorkArea.Height"`, {
      shell: true,
      encoding: "utf8"
    });
    var data = parseInt(raw);
    if(typeof(data) === "number") return data;

    return defaultTaskBar;

  }  

  RS.ScreenManager.isWindowsTaskbarShown = function() {
    const ret = RS.ScreenManager.getTaskBarHeight();
    if(ret === 0) return screen.availHeight !== screen.height;
    return true;
  };

  RS.ScreenManager.switchFullScreen = function() {
    if(Utils.isNwjs()) {
      var gui = require('nw.gui');
      var win = gui.Window.get(); 
      win.toggleFullscreen();
    } else {
      Graphics._switchFullScreen();;
    }
  };

  RS.ScreenManager.isFullscreen = function() {
    if(Utils.isNwjs()) {
      var gui = require('nw.gui');
      var win = gui.Window.get();
      return win.isFullScreen;
    } else {
     return Graphics._isFullScreen();
    }
  };

  /**
   * Change the manifest file called 'package.json' and then beautifies line spaces.
   */
  RS.ScreenManager.changeManifestFile = function(width, height, fullscreen) {

    if(Utils.RPGMAKER_VERSION < '1.6.1') return;
    var fs = require('fs');
    var path = require('path');
    var dirname = path.dirname(process.mainModule.filename);
    var packageJsonPath = path.join(dirname, "package.json");

    var templatePackageConfig = {"name":"mytest","main":"index.html","js-flags":"--expose-gc","crhomium-args":"--disable-sync","window":{"title":"","toolbar":false,"width":RS.ScreenManager.settings.defaultScreenSize.x,"height":RS.ScreenManager.settings.defaultScreenSize.y, "icon":"icon/icon.png"}};    

    // if the config file exists?
    if(fs.existsSync(packageJsonPath)) {
      var packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageConfig.window.width = width;
      packageConfig.window.height = height;
      packageConfig.window.fullscreen = fullscreen;

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageConfig, null, '\t'));

    } else {

      fs.writeFileSync(packageJsonPath, JSON.stringify(templatePackageConfig, null, '\t'));
      return RS.ScreenManager.changeManifestFile(width, height, fullscreen);

    }    
    
  };
  
  RS.ScreenManager.restartGame = function() {
    var childProcess = require("child_process");
    var path = require('path');
    var projectPath = path.dirname(process.mainModule.filename);
    childProcess.execFile(process.execPath, [
      `--nwapp`,
      `--url=${path.join(projectPath, "index.html")}?test`
      ], function(err) {
    if(err) console.warn(err);
    });
  };

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
    h = parseInt(Math.round(this.getHeight(virtualWidth)));
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

  //============================================================================
  // Point
  //============================================================================
  Point.prototype.toString = function () {
    return this.x + ' x ' +  this.y;
  };

  //============================================================================
  // Graphics
  //============================================================================

  /**
   * https://stackoverflow.com/a/20339709
   * @param {Array} data 
   */
  RS.ScreenManager.uniqArray = function(data) {
    var uniqData = [];
    var foundData = {};

    data.forEach(function(i) {
      var packData = JSON.stringify(i);
      if(!foundData[packData]) {
        uniqData.push(i);
        foundData[packData] = true;
      }
    }, this);

    return uniqData;    

  }

  Graphics.getAvailGraphicsArray = function (returnType) {
    var data, tw, th, pt, gArray, result, maxSW, maxSH, type;
    var orientation, config, aspectRatio;
    var temp, ret;

    gArray = [];
    result = [];

    // outerWidth : 브라우저 윈도우의 사이드바와 가장자리 경계선을 포함한 폭.
    // screen.availWidth : OS의 상태바나 작업 표시줄을 제외한 폭.
    maxSW = Utils.isMobileDevice() ? window.outerWidth : window.screen.availWidth;
    maxSH = Utils.isMobileDevice() ? window.outerHeight : window.screen.availHeight;

    // Obtain the screen orientation.
    if(Utils.isNwjs()) {
      type = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) type = 'landscape';
    } else {
      type = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }

    data = (Utils.isNwjs()) ? RS.ScreenManager.settings.pcGraphicsArray : RS.ScreenManager.settings.resolutionQualityOnMobile;
    // if( Utils.isMobileDevice()) data = RS.ScreenManager.settings.mobileGraphicsArray;

    // Set a custom aspect ratio
    config = new CustomScreenConfig(RS.ScreenManager.settings.customAspectRatio[0], RS.ScreenManager.settings.customAspectRatio[1]);

    data = RS.ScreenManager.uniqArray(data);

    data.forEach(function (i) {

      var sw = 0;
      var sh = 0;

      if('width' in i) {
        sw = i.width;
      } else {
        sw = i[0];
      }

      if('height' in i) {
        sh = i.height;
      } else {
        sh = i[1];
      }

      tw = Number(sw);
      th = Number(sh);

      // Swap
      if(type === 'portrait' && (maxSW > maxSH) ) {
        var temp = tw;
        tw = th;
        th = temp;
      }

      if(tw >= 0 && tw <= maxSW && th >= 0 && th <= maxSH) {

        // Convert the screen using an Aspect Ratio
        if(RS.ScreenManager.options.aspectRatio) {
          temp = config.getSize(tw);
          tw = temp[0];
          th = temp[1];
        }

        pt = new Point(tw, th);
        gArray.push(pt);
        result.push(pt.toString());

      } else {

        if(RS.ScreenManager.options.allResolutions) {

          // Convert the screen using an Aspect Ratio
          if(RS.ScreenManager.options.aspectRatio) {
            temp = config.getSize(tw);
            tw = temp[0];
            th = temp[1];
          }

          pt = new Point(tw, th);
          gArray.push(pt);
          result.push(pt.toString());

        }
      }

    }, this);

    return (returnType === 'String')? result : gArray;

  };

  Graphics.getOrientation = function (inner) {
    var maxSW = (inner === true) ? window.innerWidth : window.screen.availWidth;
    var maxSH = (inner === true) ? window.innerHeight : window.screen.availHeight;
    var orientation = 'landscape';
    if(Utils.isNwjs() || !screen.orientation) {
      orientation = (maxSW > maxSH) ? 'landscape' : 'portrait';
      if(maxSW === maxSH) orientation = 'landscape';
    } else {
      orientation = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }
    return orientation;
  };

  Graphics.isAvailScreenHeight = function(height) {
    var task_height = RS.ScreenManager.getTaskBarHeight();
    var maxHeight = screen.availHeight - task_height;
    return height <= maxHeight;
  };  

  Graphics.uniqWithPoint = function (data, callback) {
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

  Graphics.getVirtualWidth = function(originValue) {
    var ratio = 816.0 / Graphics.boxWidth;
    return Math.floor(originValue / ratio);
  };

  Graphics.getVirtualHeight = function(originValue) {
    var ratio = 624.0 / Graphics.boxHeight;
    return Math.floor(originValue / ratio);
  };

  Graphics.setScreenResize = function (newScr) {
    var cx, cy, xPadding, yPadding;
    var tw, th, minW, minH;
    var orientation, config, aspectRatio;
    var maxSW, maxSH;
    var temp;
    
    var taskHeight = RS.ScreenManager.getTaskBarHeight();
    if(!RS.ScreenManager.settings.isCatchedTaskBar) {
      RS.ScreenManager.settings.taskBarHeight = taskHeight;    
      RS.ScreenManager.settings.isCatchedTaskBar = true;
    }

    // Get the screen width and height (Excepted in Windows Taskbar)
    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    // Get an orientation in your screen
    orientation = this.getOrientation(false);

    // Get an aspect ratio of a new screen size.
    config = new ScreenConfig(newScr.x, newScr.y, orientation);
    aspectRatio = config._aspectRatio || [17, 13];   

    if(RS.ScreenManager.options.aspectRatio) {
      config = new CustomScreenConfig(RS.ScreenManager.settings.customAspectRatio[0], RS.ScreenManager.settings.customAspectRatio[1]);
      aspectRatio = config._aspectRatio;
      temp = config.getSize(newScr.x);
      newScr.x = temp[0];
      newScr.y = temp[1];
    }

    SceneManager._screenWidth       = newScr.x;
    SceneManager._screenHeight      = newScr.y;
    SceneManager._boxWidth          = newScr.x;
    SceneManager._boxHeight         = newScr.y;

    // 화면 중앙 좌표
    cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    cy = (window.screen.availHeight / 2) - (newScr.y / 2);

    // 화면 패딩
    xPadding = window.outerWidth - window.innerWidth;
    yPadding = window.outerHeight - window.innerHeight;

    // 타일 크기
    tw = ($gameMap && $gameMap.tileWidth) ? $gameMap.tileWidth() : 48;
    th = ($gameMap && $gameMap.tileHeight) ? $gameMap.tileHeight() : 48;

    // 최소 크기
    minW = (tw * aspectRatio[0]) || Graphics._renderer.width;
    minH = (th * aspectRatio[1]) || Graphics._renderer.height;

    // 작업 표시줄의 크기 때문에 수용할 수 없는 해상도라면 한 단계 낮춘다.
    if(RS.ScreenManager.isWindowsTaskbarShown() && 
      !this.isAvailScreenHeight(newScr.y) && 
      !Utils.isMobileDevice() &&
      RS.ScreenManager.options.autoScaling ) {

      // newScr.y = Math.min(newScr.y, newScr.y - taskHeight);

      var data = Graphics.getAvailGraphicsArray('Number');
      var ret = [];
  
      this.uniqWithPoint(data.slice(0), function (newData) {
        ret = newData;
      });    
  
      ret = ret.filter(function(i) {
        return i.y < (newScr.y); 
      }, this);
  
      var item = ret.pop();
  
      if(item) {
        newScr = item;
      }
    }

    // 화면 크기를 절대 값으로 지정
    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);

    // 해상도 최소값 & 최대값 설정 부분, 자동으로 조절하는 것에 맞겼다면.
    if(RS.ScreenManager.options.autoScaling && (tw/th >= 1.0) && tw >= 48) {

      // 새로운 해상도 값이 최소값(tileWidth * aspectRatio) 값보다 작으면 해상도를 최소값으로 제한한다.
      if(RS.ScreenManager.options.minWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
      if(RS.ScreenManager.options.minHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);

      // 최소 최대 제한이 없을 경우,
      if(!RS.ScreenManager.options.minWidth && !RS.ScreenManager.options.minHeight) {
        Graphics.width = Graphics.boxWidth = newScr.x.clamp(minW, window.outerWidth);
        Graphics.height = Graphics.boxHeight = newScr.x.clamp(minH, window.outerHeight);
      }

    } else {
      // 그냥 설정한다.
      Graphics.width = Graphics.boxWidth = newScr.x;
      Graphics.height = Graphics.boxHeight = newScr.y;
    }

    // Reset graphics' size
    if(RS.ScreenManager.options.resize) {
        Graphics._renderer.resize(newScr.x, newScr.y);
    }

    // Reset the scene (Unsaved changes will be lost)
    if(RS.ScreenManager.options.recreate && !(SceneManager._scene instanceof Scene_Boot)) {
      if(SceneManager._scene) SceneManager.push(SceneManager._scene.constructor);
    }

  };

  /**
   * Disarms the behavior of Community_Basic plugin.
   */
  if(PluginManager._scripts.contains("Community_Basic")) {
    SceneManager.initNwjs = function() {
        if (Utils.isNwjs()) {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            if (process.platform === 'darwin' && !win.menu) {
                var menubar = new gui.Menu({ type: 'menubar' });
                var option = { hideEdit: true, hideWindow: true };
                menubar.createMacBuiltin('Game', option);
                win.menu = menubar;
            }
        }
    };
  };

  /**
   * Disarms the behavior of YEP_CoreEngine and ScreenResolution plugins.
   */
  if( SceneManager.run.toString().match(/Yanfly/i) ) {
    SceneManager.run = function(sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);
            this.requestUpdate();
        } catch (e) {
            this.catchException(e);
        }
    };
  }

  //============================================================================
  // Scene_Boot
  //============================================================================

  var alias_Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function () {
    alias_Scene_Boot_create.call(this);
    SceneManager.initResolution();
  };

  //============================================================================
  // SceneManager
  //============================================================================

  SceneManager.initResolution = function() {
    var self = this;
    var type, size, orientation, config, mobile;
    var sw, sh, bw, bh;
    var maxSW, maxSH;
    var defScrWidth, defScrHeight;

    if(Utils.isNwjs()) {
      RS.ScreenManager.readManifestFile();
    }

    maxSW = window.innerWidth;
    maxSH = window.innerHeight;

    // Sets the default screen width and height values.
    defScrWidth = RS.ScreenManager.settings.defaultScreenSize.x;
    defScrHeight = RS.ScreenManager.settings.defaultScreenSize.y;

    // Obtains the ratio depended on screen orientation.
    orientation = Graphics.getOrientation(true);
    config = new ScreenConfig(maxSW, maxSH, orientation);

    // Changes the resolution depended on the aspect ratio in the mobile device.
    size = config.getSize(defScrWidth);

    mobile = Utils.isMobileDevice() || RS.ScreenManager.options.aspectRatio;

    sw = (mobile === true) ? size[0] : defScrWidth;
    sh = (mobile === true) ? size[1] : defScrHeight;
    bw = (mobile === true) ? size[0] : defScrWidth;
    bh = (mobile === true) ? size[1] : defScrHeight;

    // Calls the function changes the resolution in case of the PC.
    if(Utils.isNwjs()) {
      var newSize = new Point(sw, sh);
      Graphics.setScreenResize(newSize);
    } else {
      Graphics.width = sw;
      Graphics.height = sh;
      Graphics.boxWidth = sw;
      Graphics.boxHeight = sh;
    }
  };

  var alias_Graphics_onWindowResize = Graphics._onWindowResize;
  Graphics._onWindowResize = function() {
    alias_Graphics_onWindowResize.call(this);
    if(Utils.isNwjs()) {
      if(!nw) var nw = require("nw.gui");
      var win = nw.Window.get();
      win.setPosition("center");
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
  //#region Sprite_Base
  //============================================================================

  Sprite_Base.prototype.requestStretch = function (sprite) {
    if(!sprite.bitmap) return;
    var bitmap = sprite.bitmap;
    if(bitmap.width <= 0) return;
    if(bitmap.height <= 0) return;
    var scaleX = Graphics.boxWidth / bitmap.width;
    var scaleY = Graphics.boxHeight / bitmap.height;
    sprite.scale.x = (scaleX > 1.0) ? scaleX : 1.0;
    sprite.scale.y = (scaleY > 1.0) ? scaleY : 1.0;

    if(RS.ScreenManager.Params.picturePosType === "Virtual Coordinates") {
      var x = sprite.x;
      var y = sprite.y;
      var sw = bitmap.width * sprite.scale.x; // scale width and height
      var sh = bitmap.height * sprite.scale.y;
      var dw = bitmap.width; // original width and original height
      var dh = bitmap.height;
      
      if(dw == 0 || dh == 0) {
        return;
      }
  
      var dx = x * (sw / dw); // destination position
      var dy = y * (sh / dh);
  
      // position
      sprite.x = Math.floor(dx);
      sprite.y = Math.floor(dy);
  
    }

  };
  //#endregion

  //============================================================================
  //#region TilingSprite
  //============================================================================
  TilingSprite.prototype.reqeustResizeImage = function() {

    if(!this.texture.frame) {
      this.texture.frame = new PIXI.Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    }

    this.texture.frame.width = Graphics.boxWidth;
    this.texture.frame.height = Graphics.boxHeight;

  }

  TilingSprite.prototype.isValidResizing = function() {
    if(!RS.ScreenManager.Params.isValidScaledBattleback) return;
    if(!this.bitmap) return false;
    if(this.bitmap.width <= 0) return false;
    if(this.bitmap.height <= 0) return false;
    if(!this.visible) return false;
    if(this.opacity <= 0) return false;
    if(!this.bitmap._url) return false;
    if(!this.texture) return false;

    var url = this.bitmap._url;
    var fileUri = url.split("/");
    var filename = fileUri.pop();
    var folderName = fileUri.pop();
    
    if(['battlebacks1', 'battlebacks2'].contains(folderName)) {
      this._folderName = folderName;
      return true;
    }

    return false;

  };

  TilingSprite.prototype.resizeImage = function() {
    if( this.isValidResizing() ) {
      this.reqeustResizeImage();
    }
  };

  var alias_TilingSprite__onBitmapLoad = TilingSprite.prototype._onBitmapLoad;
  TilingSprite.prototype._onBitmapLoad = function() {
    alias_TilingSprite__onBitmapLoad.call(this);
    this.resizeImage();
  };
  
  //#endregion

  //============================================================================
  // Spriteset_Battle
  //============================================================================    

  if(RS.ScreenManager.Params.isValidScaledBattleback) {

    /**
     * Override
     * @method createBattleback
     */
    Spriteset_Battle.prototype.createBattleback = function() {
      var margin = 0;
      var x = -this._battleField.x - margin;
      var y = -this._battleField.y - margin;
      var width = Graphics.width + margin * 2;
      var height = Graphics.height + margin * 2;
      this._back1Sprite = new TilingSprite();
      this._back2Sprite = new TilingSprite();
      this._back1Sprite.bitmap = this.battleback1Bitmap();
      this._back2Sprite.bitmap = this.battleback2Bitmap();
      this._back1Sprite.move(x, y, width, height);
      this._back2Sprite.move(x, y, width, height);
      this._battleField.addChild(this._back1Sprite);
      this._battleField.addChild(this._back2Sprite);
    };

    /**
     * Override
     * @method locateBattleback
     */  
    Spriteset_Battle.prototype.locateBattleback = function() {

      var sprite1 = this._back1Sprite;
      var sprite2 = this._back2Sprite;
      sprite1.origin.x = 0;
      sprite2.origin.x = 0;
      if ($gameSystem.isSideView()) {
          sprite1.origin.y = 0;
          sprite2.origin.y = 0;
      }

    };

  }

  //============================================================================
  //#region Sprite_Picture
  //============================================================================  

  (function() {

    /**
     * Find a script called "DTextPicture.js"
     */
    PluginManager._scripts.forEach(function(pluginName) {
      if(pluginName === "DTextPicture") {
        Imported.DTextPicture = true;
      }
    }, this);

  })();

  var alias_Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
  Sprite_Picture.prototype.updatePosition = function() {
    if(RS.ScreenManager.Params.isAutoScaledPicture) return;
    alias_Sprite_Picture_updatePosition.call(this);
  };

  var alias_Sprite_Picture_updateScale = Sprite_Picture.prototype.updateScale;
  Sprite_Picture.prototype.updateScale = function() {
    if(RS.ScreenManager.Params.isAutoScaledPicture) return;
    alias_Sprite_Picture_updateScale.call(this);
  };

  Sprite_Picture.prototype.updateOriginScale = function() {
    var picture = this.picture();
    this.x = Math.floor(picture.x());
    this.y = Math.floor(picture.y());
    var originSX = picture.scaleX() / 100;
    var originSY = picture.scaleY() / 100;        
    this.scale.x = originSX;
    this.scale.y = originSY;
  };

  Sprite_Picture.prototype.updateAutoScale = function() {

    /**
     * @type {Game_Picture}
     */
    var picture = this.picture();
    var bitmap = this.bitmap;

    if(!bitmap) {
      this.updateOriginScale();
      return;
    }
    
    // Sometimes the game picture has to use a default scale.
    var blacklist = RS.ScreenManager.Params.ignoreAutoScalePictures || [];
    if(blacklist.contains(this._pictureId)) {
      this.updateOriginScale();  
      return;      
    }

    var originSX = picture.scaleX() / 100;
    var originSY = picture.scaleY() / 100;

    // Get the original width and height values
    var dw = bitmap.width * originSX;
    var dh = bitmap.height * originSY;

    // Can not divide with 0
    if(dw === 0 || dh === 0) {
      this.updateOriginScale();    
      return;
    }

    // Store the original coordinates before changing its size.
    var x = picture.x();
    var y = picture.y();

    var originalViewWidth = parseInt(RS.ScreenManager.Params.originalPictureViewSize.width);
    var originalViewHeight = parseInt(RS.ScreenManager.Params.originalPictureViewSize.height);
    var scaleX = originSX;
    var scaleY = originSY;

    if(Graphics.boxWidth > originalViewWidth) {
      scaleX = Graphics.boxWidth / originalViewWidth;
    } else if(Graphics.boxWidth < originalViewWidth) {
      scaleX = originalViewWidth / Graphics.boxWidth;
    }

    scaleY = Graphics.boxHeight / originalViewHeight;
    
    // Perform re-scale and re-position.
    this.scale.x = scaleX;
    this.scale.y = scaleY;

    if(RS.ScreenManager.Params.picturePosType === "Virtual Coordinates") {

      var sw = bitmap.width * scaleX;
      var sh = bitmap.height * scaleY;
      var dx = x * (sw / dw);
      var dy = y * (sh / dh);

      this.x = Math.floor(dx);
      this.y = Math.floor(dy);

    } else {

      this.x = Math.floor(x);
      this.y = Math.floor(y);

    }

  };

  var alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    alias_Sprite_Picture_update.call(this);
    if(this.visible && RS.ScreenManager.Params.isAutoScaledPicture) {
      this.updateAutoScale();
    }
  };

  //#endregion

  //#region Rescaling Background
  //============================================================================
  // Scene_Base
  //============================================================================

  Scene_Base.prototype.requestStretch = function (sprite) {
    if(!sprite.bitmap) return;
    var bitmap = sprite.bitmap;
    if(bitmap.width <= 0) return;
    if(bitmap.height <= 0) return;
    var scaleX = Graphics.boxWidth / bitmap.width;
    var scaleY = Graphics.boxHeight / bitmap.height;
    sprite.scale.x = (scaleX > 1.0) ? scaleX : 1.0;
    sprite.scale.y = (scaleY > 1.0) ? scaleY : 1.0;
    sprite.x = Graphics.boxWidth / 2;
    sprite.y = Graphics.boxHeight / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };

  //============================================================================
  // Scene_MenuBase
  //============================================================================

  var alias_Scene_MenuBase_start = Scene_MenuBase.prototype.start;
  Scene_MenuBase.prototype.start = function() {
    alias_Scene_MenuBase_start.call(this);
    this.requestStretch(this._backgroundSprite);
  };

//============================================================================
// Window
//============================================================================

if(RS.ScreenManager.settings.defaultScreenSize.x <= 320 && 
  RS.ScreenManager.settings.defaultScreenSize.y <= 240) {
  var alias_Window_Command_windowWidth = Window_Command.prototype.windowWidth;
  Window_Command.prototype.windowWidth = function() {
      return Graphics.getVirtualWidth(alias_Window_Command_windowWidth.call(this));
  };
  
  var alias_Window_Command_lineHeight = Window_Command.prototype.lineHeight;
  Window_Command.prototype.lineHeight = function() {
      return Graphics.getVirtualHeight(alias_Window_Command_lineHeight.call(this));
  };  
  
  var alias_Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
  Window_Base.prototype.standardFontSize = function() {
      return Graphics.getVirtualHeight(alias_Window_Base_standardFontSize.call(this));
  };
  
  var alias_Window_Base_standardPadding = Window_Base.prototype.standardPadding;
  Window_Base.prototype.standardPadding = function() {
      return Graphics.getVirtualWidth(alias_Window_Base_standardPadding.call(this));
  };
  
  var alias_Window_Selectable_spacing = Window_Selectable.prototype.spacing;
  Window_Selectable.prototype.spacing = function() {
      return Graphics.getVirtualWidth(alias_Window_Selectable_spacing.call(this));
  };  
  
  var alias_Window_Options_windowWidth = Window_Options.prototype.windowWidth;
  Window_Options.prototype.windowWidth = function() {
      return Graphics.getVirtualWidth( alias_Window_Options_windowWidth.call(this) );
  };               
  
  var alias_Window_Options_statusWidth = Window_Options.prototype.statusWidth;
  Window_Options.prototype.statusWidth = function() {
      return Graphics.getVirtualWidth( alias_Window_Options_statusWidth.call(this) );
  };          
  
  class Window_MenuCommandImpl extends Window_MenuCommand {
      windowWidth() {
      return Graphics.getVirtualWidth(super.windowWidth());
      }
  }
  
  window.Window_MenuCommand = Window_MenuCommandImpl;   
  
  class Window_MenuStatusImpl extends Window_MenuStatus {
      windowWidth() {
      return Graphics.boxWidth - Graphics.getVirtualWidth(240);
      }   
  }
  
  window.Window_MenuStatus = Window_MenuStatusImpl;    
  
  class Window_GoldImpl extends Window_Gold {
      windowWidth() {
      return Graphics.getVirtualWidth( super.windowWidth() );
      }    
  }   
  
  window.Window_Gold = Window_GoldImpl;
  
  class Window_GameEndImpl extends Window_GameEnd {
      windowWidth() {
      return Graphics.getVirtualWidth( super.windowWidth() );
      }        
  }
  
  window.Window_GameEnd = Window_GameEndImpl;
}  

  //============================================================================
  // Scene_Title
  //============================================================================

  class Window_TitleCommandImpl extends Window_TitleCommand {

    updatePlacement() {
      this.x = (Graphics.boxWidth - this.width) / 2;
      this.y = Graphics.boxHeight - this.height - Graphics.getVirtualHeight(96);
    }

    windowWidth() {
      return Graphics.getVirtualWidth(super.windowWidth());
    }

  }

  window.Window_TitleCommand = Window_TitleCommandImpl;

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    alias_Scene_Title_start.call(this);
    this.requestStretch(this._backSprite1);
    this.requestStretch(this._backSprite2);
  };

  Scene_Title.prototype.drawGameTitle = function() {
    var x = 20;
    var y = Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;

    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = Graphics.getVirtualWidth(8);
    this._gameTitleSprite.bitmap.fontSize = Graphics.getVirtualHeight(72);
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, Graphics.getVirtualWidth(48), 'center');
  };

  //============================================================================
  // Scene_Gameover
  //============================================================================

  var alias_Scene_Gameover_start = Scene_Gameover.prototype.start;
  Scene_Gameover.prototype.start = function() {
    alias_Scene_Gameover_start.call(this);
    this.requestStretch(this._backSprite);
  };

  //#endregion
  window.ScreenConfig = ScreenConfig;

})(RS.ScreenManager);