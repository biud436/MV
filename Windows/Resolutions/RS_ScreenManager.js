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
 * @plugindesc (v1.0.18) <RS_ScreenManager>
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
 * @param Use All Resolutions
 * @text Use All Resolutions
 * @parent Scene Options
 * @type boolean
 * @desc Sets whether resolution gets even if the resolution of your device is not supported.
 * @default false
 *
 * @param Enable Custom Aspect Ratio
 * @text Enable Custom Aspect Ratio
 * @parent Scene Options
 * @type boolean
 * @desc In case of true, the screen size will convert to fit a custom aspect ratio.
 * @default true
 *
 * @param Custom Aspect Ratio
 * @text Custom Aspect Ratio
 * @parent Scene Options
 * @type select
 * @desc Specify the aspect ratio as you want.
 * @default 16:9
 * @option 16:9 (Wide Screen)
 * @value 16:9
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
 * @param Localization
 * @type struct<Localization>
 * @desc Set texts that required a localization.
 * @default {"Language":"navigator.language.slice(0, 2)","Localization":"[\"{\\\"lang\\\":\\\"en\\\",\\\"Resolutions\\\":\\\"Resolutions\\\",\\\"Aspect Ratio\\\":\\\"Aspect Ratio\\\",\\\"Display Resolutions\\\":\\\"Display Resolutions\\\",\\\"Full Screen\\\":\\\"Full Screen\\\",\\\"NotFoundError\\\":\\\"Couldn't find the node library needed to set the resolution\\\",\\\"NotFoundNwExe\\\":\\\"Please you must change the name of the executable file to nw.exe\\\",\\\"MobileResolutions\\\":\\\"[\\\\\\\"Low\\\\\\\", \\\\\\\"Medium\\\\\\\", \\\\\\\"High\\\\\\\", \\\\\\\"Very High\\\\\\\"]\\\",\\\"Windowed Mode\\\":\\\"Windowed Mode\\\"}\",\"{\\\"lang\\\":\\\"ko\\\",\\\"Resolutions\\\":\\\"해상도\\\",\\\"Aspect Ratio\\\":\\\"종횡비\\\",\\\"Display Resolutions\\\":\\\"해상도 목록\\\",\\\"Full Screen\\\":\\\"전체 화면\\\",\\\"NotFoundError\\\":\\\"해상도 설정에 필요한 라이브러리를 찾지 못했습니다\\\",\\\"NotFoundNwExe\\\":\\\"실행 파일명을 nw.exe로 변경하시기 바랍니다.\\\",\\\"MobileResolutions\\\":\\\"[\\\\\\\"낮음\\\\\\\",\\\\\\\"보통\\\\\\\",\\\\\\\"높음\\\\\\\",\\\\\\\"매우 높음\\\\\\\"]\\\",\\\"Windowed Mode\\\":\\\"창 모드\\\"}\"]"}
 * 
 * @param Module
 * 
 * @param Bind Node Library
 * @parent Module
 * @type boolean
 * @desc it obtains resolutions from the node extension on Windows. if not, it gets pre-written resolutions in plugin parameters.
 * @default false
 * @on true
 * @off false
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
 * @help
 * =============================================================================
 * Introduction
 * =============================================================================
 * The ScreenManager plugin provides for more resolutions using a native addon written in C++.
 * However, In case of the native addon, it is only available yet in Windows OS x64 or ia32.
 * 
 * =============================================================================
 * Execution Environment
 * =============================================================================
 * In these execution environments, The native addons written in C++ have to need.
 * Native addon files must place it in your js/libs folder. (the file name ends with *.node)
 * 
 * RPG Maker MV v1.6.1 (nwjs : 0.29.4, Windows 10 x64)
 * RPG Maker MV v1.6.1 (nwjs : 0.33.4, Windows 10 x64)
 * RPG Maker MV v1.5.2 (nwjs : 0.12.3, Windows 10 x64)
 * 
 * However, Mac, iOS, Android, linux platforms don't need it.
 * Currently, They get the resolution from pre-written array, which includes width and height values.
 * it can be modified using plugin parameters if you want.
 * 
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * The ScreenManager scene already included in the game option.
 * But you can call its scene by using the plugin command if you want.
 * 
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
/*~struct~Localization:
 * @param Language
 * @desc Extract the language code.
 * @default navigator.language.slice(0, 2)
 * 
 * @param Localization
 * @type struct<PrivateLocalization>[]
 * @desc Set the struct about the localization.
 * @default ["{\"lang\":\"en\",\"Resolutions\":\"Resolutions\",\"Aspect Ratio\":\"Aspect Ratio\",\"Display Resolutions\":\"Display Resolutions\",\"Full Screen\":\"Full Screen\",\"NotFoundError\":\"Couldn't find the node library needed to set the resolution\",\"NotFoundNwExe\":\"Please you must change the name of the executable file to nw.exe\",\"MobileResolutions\":\"[\\\"Low\\\", \\\"Medium\\\", \\\"High\\\", \\\"Very High\\\"]\"}","{\"lang\":\"ko\",\"Resolutions\":\"해상도\",\"Aspect Ratio\":\"종횡비\",\"Display Resolutions\":\"해상도 목록\",\"Full Screen\":\"전체 화면\",\"NotFoundError\":\"해상도 설정에 필요한 라이브러리를 찾지 못했습니다\",\"NotFoundNwExe\":\"실행 파일명을 nw.exe로 변경하시기 바랍니다.\",\"MobileResolutions\":\"[\\\"낮음\\\",\\\"보통\\\",\\\"높음\\\",\\\"매우 높음\\\"]\"}"]
 * 
 */
/*~struct~PrivateLocalization:
 *
 * @param lang
 * @desc Specify the lang code
 * @default en
 * 
 * @param Resolutions
 * @desc Specify the text for resolution.
 * @default Resolutions
 * 
 * @param Aspect Ratio
 * @desc Specify the text for aspect ratio.
 * @default Aspect Ratio
 * 
 * @param Display Resolutions
 * @desc Specify the text that indicates a diplay resolution.
 * @default Display Resolutions
 * 
 * @param Full Screen
 * @desc Specify the text that indicates a fullscreen option.
 * @default Full Screen
 * 
 * @param NotFoundError
 * @desc Specify the error text that being found the node library in your game directory.
 * @default Couldn't find the node library needed to set the resolution
 * 
 * @param NotFoundNwExe
 * @desc Specify the error text that is not found the nw.exe
 * @default Please you must change the name of the executable file to nw.exe
 * 
 * @param MobileResolutions
 * @type string[]
 * @desc Specify four resolution types in mobile device.
 * @default ["Low", "Medium", "High", "Very High"]
 * 
 * @param Windowed Mode
 * @desc Specify the text that indicates a Windowed Mode option.
 * @default Windowed Mode
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

  $.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return $.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  var getTargetRegex = /(\d+)[ ]x[ ](\d+)/i;

  /**
   * @type {{resize: Boolean, autoScaling: Boolean, minWidth: Boolean, minHeight: Boolean, recreate: Boolean, allResolutions: Boolean, aspectRatio: Boolean, isAutoSyncManifest: Boolean}}
   */
  var options = {};

  var settings = {};

  options.resize = Boolean(parameters['isGraphicsRendererResize'] === 'true');
  options.autoScaling = Boolean(parameters['isGraphicsRendererResize'] === 'true');
  options.minWidth = Boolean(parameters['isMaintainingMinimumWidth'] === 'true');
  options.minHeight = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
  options.recreate = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
  options.allResolutions = Boolean(parameters['Use All Resolutions'] === 'true');
  options.aspectRatio = Boolean(parameters['Enable Custom Aspect Ratio'] === 'true');
  options.isAutoSyncManifest = Boolean(parameters['Auto Sync Manifest file'] === 'true');

  settings.customAspectRatio = parameters['Custom Aspect Ratio'] || "16:9";
  settings.customAspectRatio = settings.customAspectRatio.trim().split(":");
  settings.ptCustomScreenSize = String(parameters["Default Screen Size"] || '1280 x 720').split(' x ');
  settings.defaultScreenSize = new Point(
    (parseInt(settings.ptCustomScreenSize[0]) || 1280),
    (parseInt(settings.ptCustomScreenSize[1]) || 720));
  settings.pcGraphicsArray = [];
  settings.pcGraphicsTempArray = $.jsonParse(parameters["PC"]);
  settings.mobileGraphicsArray = $.jsonParse(parameters["Mobile"]);
  settings.resolutionQualityOnMobile = $.jsonParse(parameters["Mobile Simple"]);
  settings.state = "ready";

  // Parameters
  $.Params.settings = settings;
  $.Params.options = options;
  $.Params.fullscreenFlag = false;
  $.Params.isUsedNodeLibrary = Boolean(parameters["Bind Node Library"] === "true");
  
  $.Params.isAutoScaledPicture = Boolean(parameters["Scaled Picture"] === "true");

  $.Params.ignoreAutoScalePictures = $.jsonParse(parameters["Ignore Auto Scale"]);

  /**
   * Screen Size : 1280, 720
   * Picture's Size : 816, 614,
   * Picture's Position : 816, 614
   * Actual Coordinates : 816, 614
   * Virtual Coordinates (Maintain ratio) : 1280, 720
   */
  $.Params.picturePosType = parameters["Picture Position Type"] || "Actual Coordinates";

  /**
   * if it is to true, it adds resolution select button in the option window.
   */
  $.Params.isValidOptionWindow = Utils.isMobileDevice() ? false : true;

  /**
   * Replace by target screen width and height values.
   */
  $.initWithMobile = function() {

    function replaceBy(mod, cb) {
      var item = JSON.stringify(mod);
      item = item.replace("screen.availWidth", screen.availWidth);
      item = item.replace("screen.availHeight", screen.availHeight);
      item = item.replace("window.outerWidth", window.outerWidth);
      item = item.replace("window.outerHeight", window.outerHeight);
      mod = $.jsonParse(item);
      cb(mod);
    }

    replaceBy(settings.resolutionQualityOnMobile, function(mod) {
      settings.resolutionQualityOnMobile = mod;
    });

    replaceBy(settings.mobileGraphicsArray, function(mod) {
      settings.mobileGraphicsArray = mod;
    });    
 
  };

  $.initWithMobile();

  /**
   * Read a manifest file called 'package.json'.
   */
  $.readManifestFile = function() {
    if(Utils.RPGMAKER_VERSION < '1.6.1') return;
    if(!Utils.isNwjs()) return;    
    if(!$.Params.options.isAutoSyncManifest) return;
    var fs = require('fs');
    var path = require('path');
    var dirname = path.dirname(process.mainModule.filename);
    var packageJsonPath = path.join(dirname, "package.json");
    if(fs.existsSync(packageJsonPath)) {
      var packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      var config = packageConfig.window;
      if(config && config.fullscreen) {
        RS.ScreenManager.Params.fullscreenFlag = config.fullscreen;
        settings.defaultScreenSize.x = config.width;
        settings.defaultScreenSize.y = config.height;
        settings.ptCustomScreenSize = settings.defaultScreenSize.toString();
      }
    }    

    var win = require('nw.gui').Window.get();

    win.on('resize', function(width, height) {
      var f = $.isFullscreen();
      RS.ScreenManager.changeManifestFile(width, height, f);
    });

  };

  $.isWindowsTaskbarShown = function() {
    return screen.availHeight !== screen.height;
  };

  $.switchFullScreen = function() {
    if(Utils.isNwjs()) {
      var gui = require('nw.gui');
      var win = gui.Window.get(); 
      win.toggleFullscreen();
    } else {
      Graphics._switchFullScreen();;
    }
  };

  $.isFullscreen = function() {
    if(Utils.isNwjs()) {
      var gui = require('nw.gui');
      var win = gui.Window.get();
      return win.appWindow.isFullscreen();
    } else {
     return Graphics._isFullScreen();
    }
  };

  /**
   * Change the manifest file called 'package.json' and then beautifies line spaces.
   */
  $.changeManifestFile = function(width, height, fullscreen) {

    if(Utils.RPGMAKER_VERSION < '1.6.1') return;
    var fs = require('fs');
    var path = require('path');
    var dirname = path.dirname(process.mainModule.filename);
    var packageJsonPath = path.join(dirname, "package.json");

    var templatePackageConfig = {"name":"mytest","main":"index.html","js-flags":"--expose-gc","crhomium-args":"--disable-sync","window":{"title":"","toolbar":false,"width":settings.defaultScreenSize.x,"height":settings.defaultScreenSize.y, "icon":"icon/icon.png"}};    

    // if the config file exists?
    if(fs.existsSync(packageJsonPath)) {
      var packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageConfig.window.width = width;
      packageConfig.window.height = height;
      packageConfig.window.fullscreen = fullscreen;

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageConfig, null, '\t'));

    } else {

      fs.writeFileSync(packageJsonPath, JSON.stringify(templatePackageConfig, null, '\t'));
      return $.changeManifestFile(width, height, fullscreen);

    }    
    
  };

  var PrivateLocalization = function () {};

  var newLocalization = $.jsonParse(parameters["Localization"]);
  var langCode = navigator.language.slice(0, 2);

  PrivateLocalization.prototype = {
    "code": eval(newLocalization.Language),
    "get": function (type) {
      var code = this.code;
      var lang = PrivateLocalization[code];
      return (lang) ? lang[type] : PrivateLocalization.en[type];
    }    
  };

  newLocalization["Localization"].forEach(function(i) {
    var lang = i.lang;
    PrivateLocalization[lang] = i;
  });

  $.localization = new PrivateLocalization();
  
  /**
   * In the RPG Maker MV v1.5.2 or less, 
   * if the executable file name is the same as Game.exe, it couldn't be read the node library. 
   * So its name must change with 'nw.exe' and then we must restart the game.
   */
  $.restartGame = function() {
    var childProcess = require("child_process");
    var path = require('path');
    var projectPath = path.dirname(process.mainModule.filename);
    childProcess.execFile(process.execPath, [projectPath], function(err) {
    if(err) console.warn(err);
    });
  };

  //============================================================================
  // Utils
  //============================================================================   

  Utils.getAbsolutePath = function(defaultPath) {
    var fileName = defaultPath.split("\\");
    var driveName = fileName.shift();
    fileName = driveName + "//" + fileName.join("/");

    return fileName;

  };

  //============================================================================
  // Load the node library and then retrieves information about the display settings
  // using the Windows API called EnumDisplaySetting(User32.dll)
  //============================================================================  

  (function initWithSettings() {
    
    "use strict";

    try {
     
      if(Utils.isNwjs()) {

        // if you didn't have node library, it will set as a default resolution list.
        if(!$.Params.isUsedNodeLibrary) {
          settings.pcGraphicsArray = settings.pcGraphicsTempArray;  
          options.allResolutions = true;
          return;
        }

        var path = require('path'), 
            fs = require('fs'),
            platform = process.platform;
        const base = process.mainModule.filename;

        switch(platform) {
          case 'win32':
            
            var fileVersion = "v1.2.0";
            var processArch = process.arch;

            if(Utils.RPGMAKER_VERSION >= "1.6.1") {
              /**
               * Original Versions in RMMV 1.6.1 : 
                ares: "1.13.0"
                chromium: "65.0.3325.181"
                cldr: "32.0"
                http_parser: "2.8.0"
                icu: "60.1"
                modules: "59"
                napi: "3"
                nghttp2: "1.29.0"
                node: "9.11.1"
                node-webkit: "0.29.4"
                nw: "0.29.4"
                nw-commit-id: "6a254fe-1c00f31-b892847-deb9bc6"
                nw-flavor: "sdk"
                openssl: "1.0.2o"
                tz: "2017c"
                unicode: "10.0"
                uv: "1.19.2"
                v8: "6.5.254.41"
                zlib: "1.2.11"
  
              * Node Webkit Version in My Computer:
                ares: "1.14.0"
                chromium: "69.0.3497.100"
                cldr: "33.1"
                http_parser: "2.8.0"
                icu: "62.1"
                modules: "64"
                napi: "3"
                nghttp2: "1.33.0"
                node: "10.11.0"
                node-webkit: "0.33.4"
                nw: "0.33.4"
                nw-commit-id: "3d7302c-de9606e-577bc92-58acf98"
                nw-flavor: "sdk"
                openssl: "1.1.0i"
                tz: "2018e"
                unicode: "11.0"
                uv: "1.23.0"
                v8: "6.9.427.23"
                zlib: "1.2.11"              
                */
              fileVersion = `v${process.versions.node}`;
            }
    
            // It must change the filename as 'nw.exe' in RPG Maker MV 1.5.2 or less.
            if(process.versions.node == "1.2.0" && process.execPath.contains("Game.exe")) {
  
              // if the game plays in the test play mode, it does not show up the alert window.
              if(Utils.isOptionValid('test') || Utils.isOptionValid('etest') || Utils.isOptionValid('btest')) {
  
                settings.state = "initialized";
                settings.pcGraphicsArray = settings.pcGraphicsTempArray;
                return;                       
  
              } else {
  
                window.alert($.localization.get("NotFoundNwExe"));
                var targetName = path.join(process.execPath, "..", "nw.exe");
                fs.copyFile(process.execPath, targetName, "utf8", function(err, data) {});                  
  
              }
  
            }
    
            var fileName = path.join(base, ".." ,`js/libs/${fileVersion}-winDisplaySettings-${processArch}.node`);
            fileName = Utils.getAbsolutePath(fileName);
    
            // if the library file exists?
            if(fs.existsSync(fileName)) {
    
              var display = require(fileName);
    
              // Remove duplicate items from the list.
              var items = display.GetDisplaySettings();
    
              settings.pcGraphicsArray = items;
    
              settings.state = "initialized";
    
            } else {
              window.alert($.localization.get("NotFoundError"));
              settings.state = "failed";
              // Set Default Resolution
              settings.pcGraphicsArray = settings.pcGraphicsTempArray;
              options.allResolutions = true;
            }     

            break;

          default:
            // in case of Mac OS (base on darwin, linux)
            settings.pcGraphicsArray = settings.pcGraphicsTempArray;
            options.allResolutions = true;
            break;
        }
      }

    } catch (error) {
      console.warn(error);
      settings.pcGraphicsArray = settings.pcGraphicsTempArray;
      options.allResolutions = true;
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
  $.uniqArray = function(data) {
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

    data = (Utils.isNwjs()) ? settings.pcGraphicsArray : settings.resolutionQualityOnMobile;
    // if( Utils.isMobileDevice()) data = settings.mobileGraphicsArray;

    // Set a custom aspect ratio
    config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);

    data = $.uniqArray(data);

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
        if(options.aspectRatio) {
          temp = config.getSize(tw);
          tw = temp[0];
          th = temp[1];
        }

        pt = new Point(tw, th);
        gArray.push(pt);
        result.push(pt.toString());

      } else {

        if(options.allResolutions) {

          // Convert the screen using an Aspect Ratio
          if(options.aspectRatio) {
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
    var task_height = screen.height - screen.availHeight;
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

  Graphics.setScreenResize = function (newScr) {
    var cx, cy, xPadding, yPadding;
    var tw, th, minW, minH;
    var orientation, config, aspectRatio;
    var maxSW, maxSH;
    var temp;
    
    var taskHeight = 0;

    // Get the screen width and height (Excepted in Windows Taskbar)
    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    // Get an orientation in your screen
    orientation = this.getOrientation(false);

    // Get an aspect ratio of a new screen size.
    config = new ScreenConfig(newScr.x, newScr.y, orientation);
    aspectRatio = config._aspectRatio || [17, 13];   

    if(options.aspectRatio) {
      config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);
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
    if($.isWindowsTaskbarShown() && 
      !this.isAvailScreenHeight(newScr.y) && 
      !Utils.isMobileDevice() &&
      options.autoScaling ) {

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
    if(options.autoScaling && (tw/th >= 1.0) && tw >= 48) {

      // 새로운 해상도 값이 최소값(tileWidth * aspectRatio) 값보다 작으면 해상도를 최소값으로 제한한다.
      if(options.minWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
      if(options.minHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);

      // 최소 최대 제한이 없을 경우,
      if(!options.minWidth && !options.minHeight) {
        Graphics.width = Graphics.boxWidth = newScr.x.clamp(minW, window.outerWidth);
        Graphics.height = Graphics.boxHeight = newScr.x.clamp(minH, window.outerHeight);
      }

    } else {
      // 그냥 설정한다.
      Graphics.width = Graphics.boxWidth = newScr.x;
      Graphics.height = Graphics.boxHeight = newScr.y;
    }

    // Reset graphics' size
    if(options.resize) {
        Graphics._renderer.resize(newScr.x, newScr.y);
    }

    // Reset the scene (Unsaved changes will be lost)
    if(options.recreate && !(SceneManager._scene instanceof Scene_Boot)) {
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

    $.readManifestFile();

    maxSW = window.innerWidth;
    maxSH = window.innerHeight;

    // Sets the default screen width and height values.
    defScrWidth = settings.defaultScreenSize.x;
    defScrHeight = settings.defaultScreenSize.y;

    // Obtains the ratio depended on screen orientation.
    orientation = Graphics.getOrientation(true);
    config = new ScreenConfig(maxSW, maxSH, orientation);

    // Changes the resolution depended on the aspect ratio in the mobile device.
    size = config.getSize(defScrWidth);

    mobile = !Utils.isNwjs() || options.aspectRatio;
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
    //   var canvas = document.querySelector('canvas');
    //   var dx = parseInt(canvas.style.width);
    //   var dy = parseInt(canvas.style.height);
    //   var xPadding = window.outerWidth - window.innerWidth;
    //   var yPadding = window.outerHeight - window.innerHeight;
    //   var cx = (window.screen.availWidth / 2) - (Graphics.boxWidth / 2);
    //   var cy = (window.screen.availHeight / 2) - (Graphics.boxHeight / 2);
    //   if(dx !== Graphics.boxWidth) {
    //     var mx = (Graphics.boxWidth - dx);
    //     var my = (Graphics.boxHeight - dy);
    //     window.resizeTo(
    //       parseInt(Graphics.boxWidth - mx + xPadding),
    //       parseInt(Graphics.boxHeight - my + yPadding)
    //     );
    //   }
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

  //#region Option Window
  //============================================================================
  // Window_Options
  //============================================================================

  if($.Params.isValidOptionWindow) {

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
  
    var alias_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
      var index = this.index();
      var symbol = this.commandSymbol(index);
      if(!this.isResolution(symbol) || !this.isAspectRatio(symbol)) {
        return alias_Window_Options_cursorRight.call(this, wrap);
      }
    };
  
    var alias_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;  
    Window_Options.prototype.cursorLeft = function(wrap) {
      var index = this.index();
      var symbol = this.commandSymbol(index);
      if(!this.isResolution(symbol) || !this.isAspectRatio(symbol)) {
        return alias_Window_Options_cursorLeft.call(this, wrap);
      }      
    };  
  
    Window_Options.prototype.statusText = function(idx) {
      var symbol = this.commandSymbol(idx);
      var value = this.getConfigValue(symbol);
      if (this.isVolumeSymbol(symbol)) {
          return this.volumeStatusText(value);
      } else {
        // 해상도 조절
        if(this.isResolution( symbol ) ) {
          idx = this._lastIndex;
          var item;
  
          // PC라면 해상도 표시
          if(Utils.isNwjs()) {
            item = Graphics.getAvailGraphicsArray('String');
            if(!$.isFullscreen()) {
              item.push($.localization.get("Full Screen"));
            } else {
              item.push($.localization.get("Windowed Mode"));            
            }
          } else {
            // 그외 플랫폼은 낮음, 보통, 높음, 매우 높음으로 표시
            item = $.localization.get("MobileResolutions");
          }
  
          // index 값이 없으면 현재 해상도 값만 표시
          // if(!idx) {
          return String(Graphics.boxWidth + " x " + Graphics.boxHeight);
          // } else {
          //   // 전체 화면이 아니라면,
          //   if(!$.isFullscreen()) {
          //     return $.localization.get("Full Screen");
          //   } else {
          //     this._lastIndex = idx;
          //     return item[idx || 0];
          //   }
          // }
  
        // 종횡비 표시
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
      this.addCommand($.localization.get('Resolutions'), 'Resolutions');
      this.addCommand($.localization.get('Aspect Ratio'), 'Aspect Ratio');
    };
  }

  //============================================================================
  // Window_ResolutionList
  //============================================================================

  function Window_ResolutionList() {
    this.initialize.apply(this, arguments);
  };

  Window_ResolutionList.prototype = Object.create(Window_Selectable.prototype);
  Window_ResolutionList.prototype.constructor = Window_ResolutionList;

  Window_ResolutionList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);

    this.initMembers();
    this.initWithItemPoint();
    this.refresh();
    this.activate();

    this.select($gameSystem._lastScreenManagerItem || 0);

  };

  Window_ResolutionList.prototype.initMembers = function () {
    this._windowFrameSprite.visible = false;

    this._index = 0;
    this._item = [];

  };

  Window_ResolutionList.prototype.lineHeight = function () {
    return Math.round(Graphics.boxHeight / 16);
  };

  Window_ResolutionList.prototype.initWithAspectRatio = function (data) {
    if(options.aspectRatio) {

      var config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);
      var insData = parseInt(window.screen.availWidth / settings.customAspectRatio[0]) * settings.customAspectRatio[0];
      var fullscreenData = config.getSize(insData);

      data.push(new Point(fullscreenData[0], fullscreenData[1]));

    }

    return data;

  };

  Window_ResolutionList.prototype.initWithItemPoint = function () {
    var data = Graphics.getAvailGraphicsArray('Number');
    var ret = [];

    // 배열 내 중복된 데이터를 제거합니다.
    this.uniqWithPoint(data.slice(0), function (newData) {
      ret = newData;
    });

    ret = this.initWithAspectRatio(ret);

    this._itemToPoint = ret;
  };

  Window_ResolutionList.prototype.uniqWithPoint = function (data, callback) {
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

  Window_ResolutionList.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
  };

  Window_ResolutionList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_ResolutionList.prototype.item = function() {
    return this._data && this._index >= 0 ? this._data[this._index] : null;
  };

  Window_ResolutionList.prototype.makeItemList = function() {
    this._data = Graphics.getAvailGraphicsArray('String');
    if(options.aspectRatio) this._data = this.uniq(this._data.slice(0));
    if(!$.isFullscreen()) {
      this._data.push($.localization.get("Full Screen"));
    } else {
      this._data.push($.localization.get("Windowed Mode"));
    }
  };

  Window_ResolutionList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
  };

  Window_ResolutionList.prototype.isEnabled = function(item) {
    return !!item;
  };

  Window_ResolutionList.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = this.standardFontSize();
    this.contents.outlineColor = Utils.rgbToCssColor(128, 0, 0);
    this.contents.outlineWidth = 2;
    this.resetTextColor();
  };

  Window_ResolutionList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];

    this.resetTextColor();

    this.drawText(text, rect.x, rect.y, rect.width, 'center');

  };

  Window_ResolutionList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

  Window_ResolutionList.prototype.uniq = function (data) {
    data = data.filter(function (e, i, a) {
      return a.indexOf(e) === i;
    }, this);
    return data;
  };
  //#endregion

  //============================================================================
  //#region Window_ResolutionListForMobile
  //============================================================================
  /**
   * PC가 아닌 플랫폼에서는 창 사이즈가 변경되지 않으므로 그래픽 객체 크기를 변경한다.
   * @class Window_ResolutionListForMobile
   */
  function Window_ResolutionListForMobile() {
    this.initialize.apply(this, arguments);
  };

  Window_ResolutionListForMobile.prototype = Object.create(Window_ResolutionList.prototype);
  Window_ResolutionListForMobile.prototype.constructor = Window_ResolutionListForMobile;

  Window_ResolutionListForMobile.prototype.initialize = function (x, y, width, height) {
    Window_ResolutionList.prototype.initialize.call(this, x, y, width, height);
  };

  Window_ResolutionListForMobile.prototype.initWithItemPoint = function () {
    var temp = options.allResolutions;
    var ret, data = Graphics.getAvailGraphicsArray("Number");
    options.allResolutions = temp;

    ret = this.initWithAspectRatio(data);

    this._itemToPoint = ret;
  };

  Window_ResolutionListForMobile.prototype.lineHeight = function () {
    return Math.round(Graphics.boxHeight / 10);
  };

  Window_ResolutionListForMobile.prototype.makeItemList = function() {
    this._data = $.localization.get("MobileResolutions");
  };

  Window_ResolutionListForMobile.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
  };

  Window_ResolutionListForMobile.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];
    this.resetTextColor();
    this.drawText(text, rect.x, rect.y, rect.width, 'center');
  };

  //#endregion

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

    if($.Params.picturePosType === "Virtual Coordinates") {
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

    // Sometimes it allows game developer to create a new picture that has a text via DTextPicture plugin.
    // However it don't need to use an auto-scale.
    if(Imported.DTextPicture && picture.dTextInfo) {
      this.updateOriginScale();  
      return;
    }
    
    // Sometimes the game picture has to use a default scale.
    var blacklist = $.Params.ignoreAutoScalePictures || [];
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

    var scaleX = Graphics.boxWidth / dw;
    var scaleY = Graphics.boxHeight / dh;
    
    // Perform re-scale and re-position.
    this.scale.x = scaleX;
    this.scale.y = scaleY;

    if($.Params.picturePosType === "Virtual Coordinates") {

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
  // Scene_Title
  //============================================================================

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    alias_Scene_Title_start.call(this);
    this.requestStretch(this._backSprite1);
    this.requestStretch(this._backSprite2);
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



  //============================================================================
  //#region ScreenManager
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
    this.createPanel();

  };

  ScreenManager.prototype.makeSpriteForPanel = function (height) {
    var color1 = Window_Base.prototype.dimColor1();
    var color2 = Window_Base.prototype.dimColor2();
    var x = 0;
    var y = 0;
    var width = Math.floor(Graphics.boxWidth / 3);
    var sprite = new Sprite(new Bitmap(width, height * 2));

    if(navigator.userAgent.match(/Chrome/)) {
      sprite.bitmap.fillAll(color1);
    } else {
      sprite.bitmap.gradientFillRect(x, y, Math.floor(width / 2), height, color2, color1);
      sprite.bitmap.gradientFillRect(Math.floor(x + width / 2), y, Math.floor(width / 2), height, color1, color2);
    }
    sprite.bitmap.drawText($.localization.get("Display Resolutions"), x, y, width, height, 'center');

    return sprite;

  };

  ScreenManager.prototype.createPanel = function () {
    var height = Math.floor(Graphics.boxHeight / 17);
    var nx = this._availGraphicsList.x;
    var ny = this._availGraphicsList.y - height - 10;

    this._panel = this.makeSpriteForPanel(height);
    this.setPosition(this._panel, nx, ny).addChild(this._panel);

  };

  ScreenManager.prototype.setPosition = function (type, x, y) {
    if(!type) return;

    type.x = x;
    type.y = y;

    return this;

  };

  ScreenManager.prototype.setHandler = function () {
    if(!this._availGraphicsList) return;

    this._availGraphicsList.setHandler('ok', this.convertScreenSize.bind(this));
    this._availGraphicsList.setHandler('cancel', this.popScene.bind(this));

    return this;

  };

  ScreenManager.prototype.createDisplayList = function (x, y, width, height) {
    var ClassType = Utils.isNwjs() ? Window_ResolutionList : Window_ResolutionListForMobile;

    return new ClassType(x, y, width, height);

  };

  ScreenManager.prototype.createAvailGraphicsList = function () {
    var width = Math.floor(Graphics.boxWidth / 3);
    var height = Math.floor(Graphics.boxWidth / 2.5);
    var nx = Graphics.boxWidth / 2 - (width / 2);
    var ny = Graphics.boxHeight / 2 - (height / 2);

    this._availGraphicsList = this.createDisplayList(0, 0, width, height);
    this.setPosition(this._availGraphicsList, nx, ny )
      .setHandler()
      .addWindow(this._availGraphicsList);

  };

  ScreenManager.prototype.convertWithAspectRatio = function () {
    var config = new CustomScreenConfig(settings.customAspectRatio[0], settings.customAspectRatio[1]);
    var insData = parseInt(window.screen.availWidth / settings.customAspectRatio[0]) * settings.customAspectRatio[0];
    var data = config.getSize(insData);

    Graphics.setScreenResize(new Point(data[0], data[1]));

  };

  ScreenManager.prototype.convertWithNwjs = function () {
    var scr = this._availGraphicsList.getCurrentItemToPoint();

    if(scr) {
      Graphics.setScreenResize(scr);
    } else {
      this.convertWithAspectRatio();
    }

    if(this._availGraphicsList.item() === $.localization.get("Full Screen") ||
    this._availGraphicsList.item() === $.localization.get("Windowed Mode")) {
      $.switchFullScreen();
    }

  };

  ScreenManager.prototype.convertWithOther = function () {
    var scr = this._availGraphicsList.getCurrentItemToPoint();

    if(scr) {
      var temp = [];
      temp.push(options.aspectRatio);
      temp.push(options.resize);
      options.resize = true;
      options.aspectRatio = true;
      Graphics.setScreenResize(scr);
      options.resize = temp.pop();
      options.aspectRatio = temp.pop();

    } else {

      this.convertWithAspectRatio();

    }
  };

  ScreenManager.prototype.flushScreen = function () {
    $gameSystem._lastScreenManagerItem = this._availGraphicsList.index();

    this.popScene();

  };

  ScreenManager.prototype.convertScreenSize = function () {
    // PC인가?
    if(Utils.isNwjs()) {

      this.convertWithNwjs();

    // 다른 플랫폼인가?
    } else {

      this.convertWithOther();

    }

    // 빠져나간다.
    this.flushScreen();

  };
  //#endregion

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

  window.ScreenManager = ScreenManager;
  window.ScreenConfig = ScreenConfig;

})(RS.ScreenManager);