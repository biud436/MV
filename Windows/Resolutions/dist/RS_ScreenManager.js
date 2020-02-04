//================================================================
// RS_ScreenManager.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

/*:
 * @plugindesc (v1.0.21) <RS_ScreenManager>
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
 * @param ActorFunc.moveToStartPosition
 * @parent BattleField
 * @type note
 * @desc it can change certain code blocks.
 * @default "        // This value is the same as 300 in the vanilla mode.\n        var dx = Math.floor(Graphics.boxWidth * 0.36764705882352944);\n        this.startMove(dx, 0, 0);"
 * 
 * @param ActorFunc.setActorHome
 * @parent BattleField
 * @type note
 * @desc it can change certain code blocks.
 * @default "        var dx = Math.floor(Graphics.boxWidth * 0.7352941176470589);\n        var dy = Math.floor(Graphics.boxHeight * 0.44871794871794873);\n        var tileWidth = Math.floor(Graphics.boxWidth * 0.0392156862745098);\n        var tileHeight = Math.floor(Graphics.boxHeight * 0.07692307692307693);\n        this.setHome(dx + index * tileWidth, dy + index * tileHeight);"
 * 
 * @param ActorFunc.stepForward
 * @parent BattleField
 * @type note
 * @desc it can change certain code blocks.
 * @default "        var dx = Math.floor(Graphics.boxWidth * 0.058823529411764705);\n        this.startMove(-dx, 0, 12);"
 * 
 * @param ActorFunc.stepBack
 * @parent BattleField
 * @type note
 * @desc it can change certain code blocks.
 * @default "       this.startMove(0, 0, 12);"
 * 
 * @param ActorFunc.retreat
 * @parent BattleField
 * @type note
 * @desc it can change certain code blocks.
 * @default "        var dx = Math.floor(Graphics.boxWidth * 0.36764705882352944);\n        this.startMove(dx, 0, 30);"
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
 * 2020.01.09 (v1.0.21) :
 * - Fixed the bug that couldn't change the scale of picture properly.
 * - Added the scaled battle background and then reposition actors (vanilla mode only)
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
 */!function(e){var t={};function i(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=20)}([function(e,t,i){"use strict";var a=$plugins.filter((function(e){return e.description.contains("<RS_ScreenManager>")}));a=a.length>0&&a[0].parameters,t.a=a},function(e,t){e.exports=require("nw.gui")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t,i){RS.ScreenManager.initWithMobile=function(){function e(e,t){var i=JSON.stringify(e);i=(i=(i=(i=i.replace("screen.availWidth",screen.availWidth)).replace("screen.availHeight",screen.availHeight)).replace("window.outerWidth",window.outerWidth)).replace("window.outerHeight",window.outerHeight),t(e=RS.ScreenManager.jsonParse(i))}e(RS.ScreenManager.Params.settings.resolutionQualityOnMobile,(function(e){RS.ScreenManager.Params.settings.resolutionQualityOnMobile=e})),e(RS.ScreenManager.Params.settings.mobileGraphicsArray,(function(e){RS.ScreenManager.Params.settings.mobileGraphicsArray=e}))},RS.ScreenManager.initWithMobile(),RS.ScreenManager.readManifestFile=function(){if(!(Utils.RPGMAKER_VERSION<"1.6.1")&&Utils.isNwjs()&&RS.ScreenManager.Params.options.isAutoSyncManifest){var e=i(3),t=i(2),a=t.dirname(process.mainModule.filename),n=t.join(a,"package.json");if(e.existsSync(n)){var r=JSON.parse(e.readFileSync(n,"utf8")).window;r&&r.fullscreen&&(RS.ScreenManager.Params.fullscreenFlag=r.fullscreen,RS.ScreenManager.Params.settings.defaultScreenSize.x=r.width,RS.ScreenManager.Params.settings.defaultScreenSize.y=r.height,RS.ScreenManager.Params.settings.ptCustomScreenSize=RS.ScreenManager.Params.settings.defaultScreenSize.toString())}i(1).Window.get().on("resize",(function(e,t){var i=RS.ScreenManager.isFullscreen();RS.ScreenManager.changeManifestFile(e,t,i)}))}},RS.ScreenManager.isWindowsTaskbarShown=function(){return screen.availHeight!==screen.height},RS.ScreenManager.switchFullScreen=function(){Utils.isNwjs()?i(1).Window.get().toggleFullscreen():Graphics._switchFullScreen()},RS.ScreenManager.isFullscreen=function(){return Utils.isNwjs()?i(1).Window.get().appWindow.isFullscreen():Graphics._isFullScreen()},RS.ScreenManager.changeManifestFile=function(e,t,a){if(!(Utils.RPGMAKER_VERSION<"1.6.1")){var n=i(3),r=i(2),o=r.dirname(process.mainModule.filename),s=r.join(o,"package.json"),c={name:"mytest",main:"index.html","js-flags":"--expose-gc","crhomium-args":"--disable-sync",window:{title:"",toolbar:!1,width:RS.ScreenManager.Params.settings.defaultScreenSize.x,height:RS.ScreenManager.Params.settings.defaultScreenSize.y,icon:"icon/icon.png"}};if(!n.existsSync(s))return n.writeFileSync(s,JSON.stringify(c,null,"\t")),RS.ScreenManager.changeManifestFile(e,t,a);var p=JSON.parse(n.readFileSync(s,"utf8"));p.window.width=e,p.window.height=t,p.window.fullscreen=a,n.writeFileSync(s,JSON.stringify(p,null,"\t"))}},RS.ScreenManager.restartGame=function(){var e=i(5),t=i(2).dirname(process.mainModule.filename);e.execFile(process.execPath,[t],(function(e){e&&console.warn(e)}))},RS.ScreenManager.uniqArray=function(e){var t=[],i={};return e.forEach((function(e){var a=JSON.stringify(e);i[a]||(t.push(e),i[a]=!0)}),this),t}},function(e,t){e.exports=require("child_process")},function(module,__webpack_exports__,__webpack_require__){"use strict";var _parameters__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),PrivateLocalization=function(){},newLocalization=RS.ScreenManager.jsonParse(_parameters__WEBPACK_IMPORTED_MODULE_0__.a.Localization),langCode=navigator.language.slice(0,2);PrivateLocalization.prototype={code:eval(newLocalization.Language),get:function(e){var t=this.code,i=PrivateLocalization[t];return i?i[e]:PrivateLocalization.en[e]}},newLocalization.Localization.forEach((function(e){var t=e.lang;PrivateLocalization[t]=e})),RS.ScreenManager.localization=new PrivateLocalization},function(e,t){Utils.getAbsolutePath=function(e){var t=e.split("\\"),i=t.shift();return t=i+"//"+t.join("/")}},function(e,t,i){!function(){"use strict";try{if(Utils.isNwjs()){if(!RS.ScreenManager.Params.isUsedNodeLibrary)return RS.ScreenManager.Params.settings.pcGraphicsArray=RS.ScreenManager.Params.settings.pcGraphicsTempArray,void(RS.ScreenManager.Params.options.allResolutions=!0);var e=i(2),t=i(3),a=process.platform;const p=process.mainModule.filename;switch(a){case"win32":var n="v1.2.0",r=process.arch;if(Utils.RPGMAKER_VERSION>="1.6.1"&&(n=`v${process.versions.node}`),"1.2.0"==process.versions.node&&process.execPath.contains("Game.exe")){if(Utils.isOptionValid("test")||Utils.isOptionValid("etest")||Utils.isOptionValid("btest"))return RS.ScreenManager.Params.settings.state="initialized",void(RS.ScreenManager.Params.settings.pcGraphicsArray=RS.ScreenManager.Params.settings.pcGraphicsTempArray);window.alert(RS.ScreenManager.localization.get("NotFoundNwExe"));var o=e.join(process.execPath,"..","nw.exe");t.copyFile(process.execPath,o,"utf8",(function(e,t){}))}var s=e.join(p,"..",`js/libs/${n}-winDisplaySettings-${r}.node`);if(s=Utils.getAbsolutePath(s),t.existsSync(s)){var c=i(9)(s).GetDisplaySettings();RS.ScreenManager.Params.settings.pcGraphicsArray=c,RS.ScreenManager.Params.settings.state="initialized"}else window.alert(RS.ScreenManager.localization.get("NotFoundError")),RS.ScreenManager.Params.settings.state="failed",RS.ScreenManager.Params.settings.pcGraphicsArray=RS.ScreenManager.Params.settings.pcGraphicsTempArray,RS.ScreenManager.Params.options.allResolutions=!0;break;default:RS.ScreenManager.Params.settings.pcGraphicsArray=RS.ScreenManager.Params.settings.pcGraphicsTempArray,RS.ScreenManager.Params.options.allResolutions=!0}}}catch(e){console.warn(e),RS.ScreenManager.Params.settings.pcGraphicsArray=RS.ScreenManager.Params.settings.pcGraphicsTempArray,RS.ScreenManager.Params.options.allResolutions=!0}}()},function(e,t){function i(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}i.keys=function(){return[]},i.resolve=i,e.exports=i,i.id=9},function(e,t){function i(){this.initialize.apply(this,arguments)}function a(){this.initialize.apply(this,arguments)}i.prototype.constructor=i,i.prototype.initialize=function(e,t,i){this._originWidth=e,this._originHeight=t,this._orientation=i,this._aspectRatio=this.getRatio(e,t)},i.prototype.gcd=function(e,t){return 0===t?e:this.gcd(t,e%t)},i.prototype.getSize=function(e){return[parseInt(e),parseInt(Math.round(this.getHeight(e)))]},i.prototype.getRatio=function(e,t){var i;return e===t?[1,1]:[e/(i=this.gcd(e,t)),t/i]},i.prototype.getRatioAsString=function(e,t){var i,a;return e===t?[1,1]:(e<t&&(a=e,e=t,t=a),i=this.gcd(e,t),Number(e/i)+":"+Number(t/i))},i.prototype.getWidth=function(e){var t=this._aspectRatio;return parseFloat(t[0]/t[1])*e},i.prototype.getHeight=function(e){var t=this._aspectRatio;return parseFloat(t[1]/t[0])*e},window.ScreenConfig=i,a.prototype=Object.create(i.prototype),a.prototype.constructor=a,a.prototype.initialize=function(e,t){i.prototype.initialize.call(this,1600,900,"landscape"),e=e||16,t=t||9,this._aspectRatio=[e,t]},window.CustomScreenConfig=a,Point.prototype.toString=function(){return this.x+" x "+this.y}},function(e,t,i){Graphics.getAvailGraphicsArray=function(e){var t,i,a,n,r,o,s,c,p,l;return r=[],o=[],s=Utils.isMobileDevice()?window.outerWidth:window.screen.availWidth,c=Utils.isMobileDevice()?window.outerHeight:window.screen.availHeight,Utils.isNwjs()?(p=s>c?"landscape":"portrait",s===c&&(p="landscape")):p=screen.orientation.type.match(/landscape/)?"landscape":"portrait",t=Utils.isNwjs()?RS.ScreenManager.Params.settings.pcGraphicsArray:RS.ScreenManager.Params.settings.resolutionQualityOnMobile,l=new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0],RS.ScreenManager.Params.settings.customAspectRatio[1]),(t=RS.ScreenManager.uniqArray(t)).forEach((function(e){var t=0,h=0;if(t="width"in e?e.width:e[0],h="height"in e?e.height:e[1],i=Number(t),a=Number(h),"portrait"===p&&s>c){var u=i;i=a,a=u}i>=0&&i<=s&&a>=0&&a<=c?(RS.ScreenManager.Params.options.aspectRatio&&(u=l.getSize(i),i=u[0],a=u[1]),n=new Point(i,a),r.push(n),o.push(n.toString())):RS.ScreenManager.Params.options.allResolutions&&(RS.ScreenManager.Params.options.aspectRatio&&(u=l.getSize(i),i=u[0],a=u[1]),n=new Point(i,a),r.push(n),o.push(n.toString()))}),this),"String"===e?o:r},Graphics.getOrientation=function(e){var t=!0===e?window.innerWidth:window.screen.availWidth,i=!0===e?window.innerHeight:window.screen.availHeight,a="landscape";return Utils.isNwjs()||!screen.orientation?(a=t>i?"landscape":"portrait",t===i&&(a="landscape")):a=screen.orientation.type.match(/landscape/)?"landscape":"portrait",a},Graphics.isAvailScreenHeight=function(e){var t=screen.height-screen.availHeight;return e<=screen.availHeight-t},Graphics.uniqWithPoint=function(e,t){t(e.filter((function(e,t,i){return!(i[t-1]instanceof Point)||(i[t-1].x!==e.x||i[t-1].y!==e.y)})))},Graphics.getVirtualWidth=function(e){var t=816/Graphics.boxWidth;return Math.floor(e/t)},Graphics.getVirtualHeight=function(e){var t=624/Graphics.boxHeight;return Math.floor(e/t)},Graphics.setScreenResize=function(e){var t,i,a,n,r,o,s,c,p,l,h,u;if(window.screen.availWidth,window.screen.availHeight,p=this.getOrientation(!1),h=(l=new ScreenConfig(e.x,e.y,p))._aspectRatio||[17,13],RS.ScreenManager.Params.options.aspectRatio&&(h=(l=new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0],RS.ScreenManager.Params.settings.customAspectRatio[1]))._aspectRatio,u=l.getSize(e.x),e.x=u[0],e.y=u[1]),SceneManager._screenWidth=e.x,SceneManager._screenHeight=e.y,SceneManager._boxWidth=e.x,SceneManager._boxHeight=e.y,t=window.screen.availWidth/2-e.x/2,i=window.screen.availHeight/2-e.y/2,a=window.outerWidth-window.innerWidth,n=window.outerHeight-window.innerHeight,r=$gameMap&&$gameMap.tileWidth?$gameMap.tileWidth():48,o=$gameMap&&$gameMap.tileHeight?$gameMap.tileHeight():48,s=r*h[0]||Graphics._renderer.width,c=o*h[1]||Graphics._renderer.height,RS.ScreenManager.isWindowsTaskbarShown()&&!this.isAvailScreenHeight(e.y)&&!Utils.isMobileDevice()&&RS.ScreenManager.Params.options.autoScaling){var S=Graphics.getAvailGraphicsArray("Number"),d=[];this.uniqWithPoint(S.slice(0),(function(e){d=e}));var g=(d=d.filter((function(t){return t.y<e.y}),this)).pop();g&&(e=g)}window.resizeTo(e.x+a,e.y+n),window.moveTo(t,i),RS.ScreenManager.Params.options.autoScaling&&r/o>=1&&r>=48?(RS.ScreenManager.Params.options.minWidth&&(Graphics.width=Graphics.boxWidth=Math.max(s,e.x)),RS.ScreenManager.Params.options.minHeight&&(Graphics.height=Graphics.boxHeight=Math.max(c,e.y)),RS.ScreenManager.Params.options.minWidth||RS.ScreenManager.Params.options.minHeight||(Graphics.width=Graphics.boxWidth=e.x.clamp(s,window.outerWidth),Graphics.height=Graphics.boxHeight=e.x.clamp(c,window.outerHeight))):(Graphics.width=Graphics.boxWidth=e.x,Graphics.height=Graphics.boxHeight=e.y),RS.ScreenManager.Params.options.resize&&Graphics._renderer.resize(e.x,e.y),!RS.ScreenManager.Params.options.recreate||SceneManager._scene instanceof Scene_Boot||SceneManager._scene&&SceneManager.push(SceneManager._scene.constructor)},PluginManager._scripts.contains("Community_Basic")&&(SceneManager.initNwjs=function(){if(Utils.isNwjs()){var e=i(1),t=e.Window.get();if("darwin"===process.platform&&!t.menu){var a=new e.Menu({type:"menubar"});a.createMacBuiltin("Game",{hideEdit:!0,hideWindow:!0}),t.menu=a}}}),SceneManager.run.toString().match(/Yanfly/i)&&(SceneManager.run=function(e){try{this.initialize(),this.goto(e),this.requestUpdate()}catch(e){this.catchException(e)}});var a=Graphics._onWindowResize;Graphics._onWindowResize=function(){if(a.call(this),Utils.isNwjs()){if(!e)var e=i(1);e.Window.get().setPosition("center")}}},function(e,t){var i=Scene_Boot.prototype.create;Scene_Boot.prototype.create=function(){i.call(this),SceneManager.initResolution()}},function(e,t){SceneManager.initResolution=function(){var e,t,i,a,n,r,o,s,c;if(RS.ScreenManager.readManifestFile(),r=window.innerWidth,o=window.innerHeight,s=RS.ScreenManager.Params.settings.defaultScreenSize.x,c=RS.ScreenManager.Params.settings.defaultScreenSize.y,t=Graphics.getOrientation(!0),e=new ScreenConfig(r,o,t).getSize(s),a=!0===(i=!Utils.isNwjs()||RS.ScreenManager.Params.options.aspectRatio)?e[0]:s,n=!0===i?e[1]:c,!0===i?e[0]:s,!0===i?e[1]:c,Utils.isNwjs()){var p=new Point(a,n);Graphics.setScreenResize(p)}else Graphics.width=a,Graphics.height=n,Graphics.boxWidth=a,Graphics.boxHeight=n}},function(e,t){function i(){this.initialize.apply(this,arguments)}i.prototype=Object.create(Scene_Base.prototype),i.prototype.constructor=i,i.prototype.initialize=function(){Scene_Base.prototype.initialize.call(this)},i.prototype.create=function(){Scene_Base.prototype.create.call(this),this.createWindowLayer(),this.createAvailGraphicsList(),this.createPanel()},i.prototype.makeSpriteForPanel=function(e){var t=Window_Base.prototype.dimColor1(),i=Window_Base.prototype.dimColor2(),a=Math.floor(Graphics.boxWidth/3),n=new Sprite(new Bitmap(a,2*e));return navigator.userAgent.match(/Chrome/)?n.bitmap.fillAll(t):(n.bitmap.gradientFillRect(0,0,Math.floor(a/2),e,i,t),n.bitmap.gradientFillRect(Math.floor(0+a/2),0,Math.floor(a/2),e,t,i)),n.bitmap.drawText(RS.ScreenManager.localization.get("Display Resolutions"),0,0,a,e,"center"),n},i.prototype.createPanel=function(){var e=Math.floor(Graphics.boxHeight/17),t=this._availGraphicsList.x,i=this._availGraphicsList.y-e-10;this._panel=this.makeSpriteForPanel(e),this.setPosition(this._panel,t,i).addChild(this._panel)},i.prototype.setPosition=function(e,t,i){if(e)return e.x=t,e.y=i,this},i.prototype.setHandler=function(){if(this._availGraphicsList)return this._availGraphicsList.setHandler("ok",this.convertScreenSize.bind(this)),this._availGraphicsList.setHandler("cancel",this.popScene.bind(this)),this},i.prototype.createDisplayList=function(e,t,i,a){return new(Utils.isNwjs()?Window_ResolutionList:Window_ResolutionListForMobile)(e,t,i,a)},i.prototype.createAvailGraphicsList=function(){var e=Math.floor(Graphics.boxWidth/3),t=Math.floor(Graphics.boxWidth/2.5),i=Graphics.boxWidth/2-e/2,a=Graphics.boxHeight/2-t/2;this._availGraphicsList=this.createDisplayList(0,0,e,t),this.setPosition(this._availGraphicsList,i,a).setHandler().addWindow(this._availGraphicsList)},i.prototype.convertWithAspectRatio=function(){var e=new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0],RS.ScreenManager.Params.settings.customAspectRatio[1]),t=parseInt(window.screen.availWidth/RS.ScreenManager.Params.settings.customAspectRatio[0])*RS.ScreenManager.Params.settings.customAspectRatio[0],i=e.getSize(t);Graphics.setScreenResize(new Point(i[0],i[1]))},i.prototype.convertWithNwjs=function(){var e=this._availGraphicsList.getCurrentItemToPoint();e?Graphics.setScreenResize(e):this.convertWithAspectRatio(),this._availGraphicsList.item()!==RS.ScreenManager.localization.get("Full Screen")&&this._availGraphicsList.item()!==RS.ScreenManager.localization.get("Windowed Mode")||RS.ScreenManager.switchFullScreen()},i.prototype.convertWithOther=function(){var e=this._availGraphicsList.getCurrentItemToPoint();if(e){var t=[];t.push(RS.ScreenManager.Params.options.aspectRatio),t.push(RS.ScreenManager.Params.options.resize),RS.ScreenManager.Params.options.resize=!0,RS.ScreenManager.Params.options.aspectRatio=!0,Graphics.setScreenResize(e),RS.ScreenManager.Params.options.resize=t.pop(),RS.ScreenManager.Params.options.aspectRatio=t.pop()}else this.convertWithAspectRatio()},i.prototype.flushScreen=function(){$gameSystem._lastScreenManagerItem=this._availGraphicsList.index(),this.popScene()},i.prototype.convertScreenSize=function(){Utils.isNwjs()?this.convertWithNwjs():this.convertWithOther(),this.flushScreen()},window.ScreenManager=i},function(e,t){var i=Game_System.prototype.initialize;Game_System.prototype.initialize=function(){i.call(this),this._lastScreenManagerItem=0}},function(e,t){if(RS.ScreenManager.Params.isValidOptionWindow){var i=Window_Options.prototype.initialize;Window_Options.prototype.initialize=function(){i.call(this),this._lastIndex=$gameSystem._lastScreenManagerItem||0},Window_Options.prototype.isResolution=function(e){return e.contains("Resolutions")},Window_Options.prototype.isAspectRatio=function(e){return e.contains("Aspect Ratio")},Window_Options.prototype.processOk=function(){var e=this.index(),t=this.commandSymbol(e),i=this.getConfigValue(t);this.isVolumeSymbol(t)?((i+=this.volumeOffset())>100&&(i=0),i=i.clamp(0,100),this.changeValue(t,i)):this.isResolution(t)?SceneManager.push(ScreenManager):this.changeValue(t,!i)};var a=Window_Options.prototype.cursorRight;Window_Options.prototype.cursorRight=function(e){var t=this.index(),i=this.commandSymbol(t);if(!this.isResolution(i)||!this.isAspectRatio(i))return a.call(this,e)};var n=Window_Options.prototype.cursorLeft;Window_Options.prototype.cursorLeft=function(e){var t=this.index(),i=this.commandSymbol(t);if(!this.isResolution(i)||!this.isAspectRatio(i))return n.call(this,e)},Window_Options.prototype.statusText=function(e){var t,i=this.commandSymbol(e),a=this.getConfigValue(i);return this.isVolumeSymbol(i)?this.volumeStatusText(a):this.isResolution(i)?(e=this._lastIndex,Utils.isNwjs()?(t=Graphics.getAvailGraphicsArray("String"),RS.ScreenManager.isFullscreen()?t.push(RS.ScreenManager.localization.get("Windowed Mode")):t.push(RS.ScreenManager.localization.get("Full Screen"))):t=RS.ScreenManager.localization.get("MobileResolutions"),String(Graphics.boxWidth+" x "+Graphics.boxHeight)):this.isAspectRatio(i)?new ScreenConfig(0,0,"").getRatioAsString(Graphics.boxWidth,Graphics.boxHeight):this.booleanStatusText(a)};var r=Window_Options.prototype.addVolumeOptions;Window_Options.prototype.addVolumeOptions=function(){r.call(this),this.addCommand(RS.ScreenManager.localization.get("Resolutions"),"Resolutions"),this.addCommand(RS.ScreenManager.localization.get("Aspect Ratio"),"Aspect Ratio")}}},function(e,t){function i(){this.initialize.apply(this,arguments)}function a(){this.initialize.apply(this,arguments)}i.prototype=Object.create(Window_Selectable.prototype),i.prototype.constructor=i,i.prototype.initialize=function(e,t,i,a){Window_Selectable.prototype.initialize.call(this,e,t,i,a),this.initMembers(),this.initWithItemPoint(),this.refresh(),this.activate(),this.select($gameSystem._lastScreenManagerItem||0)},i.prototype.initMembers=function(){this._windowFrameSprite.visible=!1,this._index=0,this._item=[]},i.prototype.lineHeight=function(){return Math.round(Graphics.boxHeight/16)},i.prototype.initWithAspectRatio=function(e){if(RS.ScreenManager.Params.options.aspectRatio){var t=new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0],RS.ScreenManager.Params.settings.customAspectRatio[1]),i=parseInt(window.screen.availWidth/RS.ScreenManager.Params.settings.customAspectRatio[0])*RS.ScreenManager.Params.settings.customAspectRatio[0],a=t.getSize(i);e.push(new Point(a[0],a[1]))}return e},i.prototype.initWithItemPoint=function(){var e=Graphics.getAvailGraphicsArray("Number"),t=[];this.uniqWithPoint(e.slice(0),(function(e){t=e})),t=this.initWithAspectRatio(t),this._itemToPoint=t},i.prototype.uniqWithPoint=function(e,t){t(e.filter((function(e,t,i){return!(i[t-1]instanceof Point)||(i[t-1].x!==e.x||i[t-1].y!==e.y)})))},i.prototype.getCurrentItemToPoint=function(){return this._itemToPoint&&this._index>=0?this._itemToPoint[this._index]:null},i.prototype.maxItems=function(){return this._data?this._data.length:1},i.prototype.item=function(){return this._data&&this._index>=0?this._data[this._index]:null},i.prototype.makeItemList=function(){this._data=Graphics.getAvailGraphicsArray("String"),RS.ScreenManager.Params.options.aspectRatio&&(this._data=this.uniq(this._data.slice(0))),RS.ScreenManager.isFullscreen()?this._data.push(RS.ScreenManager.localization.get("Windowed Mode")):this._data.push(RS.ScreenManager.localization.get("Full Screen"))},i.prototype.isCurrentItemEnabled=function(){return this.isEnabled(this._data[this.index()])},i.prototype.isEnabled=function(e){return!!e},i.prototype.resetFontSettings=function(){this.contents.fontFace=this.standardFontFace(),this.contents.fontSize=this.standardFontSize(),this.contents.outlineColor=Utils.rgbToCssColor(128,0,0),this.contents.outlineWidth=2,this.resetTextColor()},i.prototype.drawItem=function(e){var t=this.itemRectForText(e),i=this._data[e];this.resetTextColor(),this.drawText(i,t.x,t.y,t.width,"center")},i.prototype.refresh=function(){this.makeItemList(),this.createContents(),this.drawAllItems()},i.prototype.uniq=function(e){return e=e.filter((function(e,t,i){return i.indexOf(e)===t}),this)},a.prototype=Object.create(i.prototype),a.prototype.constructor=a,a.prototype.initialize=function(e,t,a,n){i.prototype.initialize.call(this,e,t,a,n)},a.prototype.initWithItemPoint=function(){var e,t=RS.ScreenManager.Params.options.allResolutions,i=Graphics.getAvailGraphicsArray("Number");RS.ScreenManager.Params.options.allResolutions=t,e=this.initWithAspectRatio(i),this._itemToPoint=e},a.prototype.lineHeight=function(){return Math.round(Graphics.boxHeight/10)},a.prototype.makeItemList=function(){this._data=RS.ScreenManager.localization.get("MobileResolutions")},a.prototype.getCurrentItemToPoint=function(){return this._itemToPoint&&this._index>=0?this._itemToPoint[this._index]:null},a.prototype.drawItem=function(e){var t=this.itemRectForText(e),i=this._data[e];this.resetTextColor(),this.drawText(i,t.x,t.y,t.width,"center")},window.Window_ResolutionList=i,window.Window_ResolutionListForMobile=a},function(module,exports){Sprite_Base.prototype.requestStretch=function(e){if(e.bitmap){var t=e.bitmap;if(!(t.width<=0||t.height<=0)){var i=Graphics.boxWidth/t.width,a=Graphics.boxHeight/t.height;if(e.scale.x=i>1?i:1,e.scale.y=a>1?a:1,"Virtual Coordinates"===RS.ScreenManager.Params.picturePosType){var n=e.x,r=e.y,o=t.width*e.scale.x,s=t.height*e.scale.y,c=t.width,p=t.height;if(0==c||0==p)return;var l=n*(o/c),h=r*(s/p);e.x=Math.floor(l),e.y=Math.floor(h)}}}},TilingSprite.prototype.reqeustResizeImage=function(){this.texture.frame||(this.texture.frame=new PIXI.Rectangle(0,0,Graphics.boxWidth,Graphics.boxHeight)),this.texture.frame.width=Graphics.boxWidth,this.texture.frame.height=Graphics.boxHeight},TilingSprite.prototype.isValidResizing=function(){if(RS.ScreenManager.Params.isValidScaledBattleback){if(!this.bitmap)return!1;if(this.bitmap.width<=0)return!1;if(this.bitmap.height<=0)return!1;if(!this.visible)return!1;if(this.opacity<=0)return!1;if(!this.bitmap._url)return!1;if(!this.texture)return!1;var e=this.bitmap._url.split("/"),t=(e.pop(),e.pop());return!!["battlebacks1","battlebacks2"].contains(t)&&(this._folderName=t,!0)}},TilingSprite.prototype.resizeImage=function(){this.isValidResizing()&&this.reqeustResizeImage()};var alias_TilingSprite_initialize=TilingSprite.prototype.initialize;TilingSprite.prototype.initialize=function(e){alias_TilingSprite_initialize.call(this,e),this.on("rs-resize",this.resizeImage,this),this.on("removed",(function(){this.off("rs-resize",this.resizeImage,this)}),this)};var alias_TilingSprite__onBitmapLoad=TilingSprite.prototype._onBitmapLoad;TilingSprite.prototype._onBitmapLoad=function(){alias_TilingSprite__onBitmapLoad.call(this),this.emit("rs-resize")},Imported.YEP_BattleEngineCore||(Sprite_Actor.prototype.moveToStartPosition=function(){eval($.Params.actorFunc.moveToStartPosition)},Sprite_Actor.prototype.setActorHome=function(index){eval($.Params.actorFunc.setActorHome)},Sprite_Actor.prototype.stepForward=function(){eval($.Params.actorFunc.stepForward)},Sprite_Actor.prototype.stepBack=function(){eval($.Params.actorFunc.stepBack)},Sprite_Actor.prototype.retreat=function(){eval($.Params.actorFunc.retreat)}),RS.ScreenManager.Params.isValidScaledBattleback&&(Spriteset_Battle.prototype.createBattleback=function(){var e=-this._battleField.x-0,t=-this._battleField.y-0,i=Graphics.width+0,a=Graphics.height+0;this._back1Sprite=new TilingSprite,this._back2Sprite=new TilingSprite,this._back1Sprite.bitmap=this.battleback1Bitmap(),this._back2Sprite.bitmap=this.battleback2Bitmap(),this._back1Sprite.move(e,t,i,a),this._back2Sprite.move(e,t,i,a),this._battleField.addChild(this._back1Sprite),this._battleField.addChild(this._back2Sprite)},Spriteset_Battle.prototype.locateBattleback=function(){var e=this._back1Sprite,t=this._back2Sprite;e.origin.x=0,t.origin.x=0,$gameSystem.isSideView()&&(e.origin.y=0,t.origin.y=0)}),function(){PluginManager._scripts.forEach((function(e){"DTextPicture"===e&&(Imported.DTextPicture=!0)}),this)}();var alias_Sprite_Picture_updatePosition=Sprite_Picture.prototype.updatePosition;Sprite_Picture.prototype.updatePosition=function(){RS.ScreenManager.Params.isAutoScaledPicture||alias_Sprite_Picture_updatePosition.call(this)};var alias_Sprite_Picture_updateScale=Sprite_Picture.prototype.updateScale;Sprite_Picture.prototype.updateScale=function(){RS.ScreenManager.Params.isAutoScaledPicture||alias_Sprite_Picture_updateScale.call(this)},Sprite_Picture.prototype.updateOriginScale=function(){var e=this.picture();this.x=Math.floor(e.x()),this.y=Math.floor(e.y());var t=e.scaleX()/100,i=e.scaleY()/100;this.scale.x=t,this.scale.y=i},Sprite_Picture.prototype.updateAutoScale=function(){var e=this.picture(),t=this.bitmap;if(t)if((RS.ScreenManager.Params.ignoreAutoScalePictures||[]).contains(this._pictureId))this.updateOriginScale();else{var i=e.scaleX()/100,a=e.scaleY()/100,n=t.width*i,r=t.height*a;if(0!==n&&0!==r){var o,s=e.x(),c=e.y(),p=parseInt(RS.ScreenManager.Params.originalPictureViewSize.width),l=parseInt(RS.ScreenManager.Params.originalPictureViewSize.height),h=i;if(Graphics.boxWidth>p?h=Graphics.boxWidth/p:Graphics.boxWidth<p&&(h=p/Graphics.boxWidth),o=Graphics.boxHeight/l,this.scale.x=h,this.scale.y=o,"Virtual Coordinates"===RS.ScreenManager.Params.picturePosType){var u=s*(t.width*h/n),S=c*(t.height*o/r);this.x=Math.floor(u),this.y=Math.floor(S)}else this.x=Math.floor(s),this.y=Math.floor(c)}else this.updateOriginScale()}else this.updateOriginScale()};var alias_Sprite_Picture_update=Sprite_Picture.prototype.update;Sprite_Picture.prototype.update=function(){alias_Sprite_Picture_update.call(this),this.visible&&RS.ScreenManager.Params.isAutoScaledPicture&&this.updateAutoScale()},Scene_Base.prototype.requestStretch=function(e){if(e.bitmap){var t=e.bitmap;if(!(t.width<=0||t.height<=0)){var i=Graphics.boxWidth/t.width,a=Graphics.boxHeight/t.height;e.scale.x=i>1?i:1,e.scale.y=a>1?a:1,e.x=Graphics.boxWidth/2,e.y=Graphics.boxHeight/2,e.anchor.x=.5,e.anchor.y=.5}}};var alias_Scene_MenuBase_start=Scene_MenuBase.prototype.start;if(Scene_MenuBase.prototype.start=function(){alias_Scene_MenuBase_start.call(this),this.requestStretch(this._backgroundSprite)},RS.ScreenManager.Params.settings.defaultScreenSize.x<=320&&RS.ScreenManager.Params.settings.defaultScreenSize.y<=240){var alias_Window_Command_windowWidth=Window_Command.prototype.windowWidth;Window_Command.prototype.windowWidth=function(){return Graphics.getVirtualWidth(alias_Window_Command_windowWidth.call(this))};var alias_Window_Command_lineHeight=Window_Command.prototype.lineHeight;Window_Command.prototype.lineHeight=function(){return Graphics.getVirtualHeight(alias_Window_Command_lineHeight.call(this))};var alias_Window_Base_standardFontSize=Window_Base.prototype.standardFontSize;Window_Base.prototype.standardFontSize=function(){return Graphics.getVirtualHeight(alias_Window_Base_standardFontSize.call(this))};var alias_Window_Base_standardPadding=Window_Base.prototype.standardPadding;Window_Base.prototype.standardPadding=function(){return Graphics.getVirtualWidth(alias_Window_Base_standardPadding.call(this))};var alias_Window_Selectable_spacing=Window_Selectable.prototype.spacing;Window_Selectable.prototype.spacing=function(){return Graphics.getVirtualWidth(alias_Window_Selectable_spacing.call(this))};var alias_Window_Options_windowWidth=Window_Options.prototype.windowWidth;Window_Options.prototype.windowWidth=function(){return Graphics.getVirtualWidth(alias_Window_Options_windowWidth.call(this))};var alias_Window_Options_statusWidth=Window_Options.prototype.statusWidth;Window_Options.prototype.statusWidth=function(){return Graphics.getVirtualWidth(alias_Window_Options_statusWidth.call(this))};class e extends Window_MenuCommand{windowWidth(){return Graphics.getVirtualWidth(super.windowWidth())}}window.Window_MenuCommand=e;class t extends Window_MenuStatus{windowWidth(){return Graphics.boxWidth-Graphics.getVirtualWidth(240)}}window.Window_MenuStatus=t;class i extends Window_Gold{windowWidth(){return Graphics.getVirtualWidth(super.windowWidth())}}window.Window_Gold=i;class a extends Window_GameEnd{windowWidth(){return Graphics.getVirtualWidth(super.windowWidth())}}window.Window_GameEnd=a}class Window_TitleCommandImpl extends Window_TitleCommand{updatePlacement(){this.x=(Graphics.boxWidth-this.width)/2,this.y=Graphics.boxHeight-this.height-Graphics.getVirtualHeight(96)}windowWidth(){return Graphics.getVirtualWidth(super.windowWidth())}}window.Window_TitleCommand=Window_TitleCommandImpl;var alias_Scene_Title_start=Scene_Title.prototype.start;Scene_Title.prototype.start=function(){alias_Scene_Title_start.call(this),this.requestStretch(this._backSprite1),this.requestStretch(this._backSprite2)},Scene_Title.prototype.drawGameTitle=function(){var e=Graphics.height/4,t=Graphics.width-40,i=$dataSystem.gameTitle;this._gameTitleSprite.bitmap.outlineColor="black",this._gameTitleSprite.bitmap.outlineWidth=Graphics.getVirtualWidth(8),this._gameTitleSprite.bitmap.fontSize=Graphics.getVirtualHeight(72),this._gameTitleSprite.bitmap.drawText(i,20,e,t,Graphics.getVirtualWidth(48),"center")};var alias_Scene_Gameover_start=Scene_Gameover.prototype.start;Scene_Gameover.prototype.start=function(){alias_Scene_Gameover_start.call(this),this.requestStretch(this._backSprite)}},function(e,t){var i=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(e,t){if(i.call(this,e,t),"ScreenManager"===e)switch(t[0]){case"Start":Utils.isNwjs()&&SceneManager.push(ScreenManager)}}},function(e,t,i){"use strict";i.r(t);var a=i(0);window.Imported=Imported||{},window.Imported.RS_ScreenManager=!0,window.RS=RS||{},window.RS.ScreenManager=RS.ScreenManager||{},window.RS.ScreenManager.Params=RS.ScreenManager.Params||{},RS.ScreenManager.jsonParse=function(e){return JSON.parse(e,(function(e,t){try{return RS.ScreenManager.jsonParse(t)}catch(e){return t}}))};var n={},r={};n.resize=Boolean("true"===a.a.isGraphicsRendererResize),n.autoScaling=Boolean("true"===a.a.isGraphicsRendererResize),n.minWidth=Boolean("true"===a.a.isMaintainingMinimumWidth),n.minHeight=Boolean("true"===a.a.isMaintainingMinimumHeight),n.recreate=Boolean("true"===a.a.isMaintainingMinimumHeight),n.allResolutions=Boolean("true"===a.a["Use All Resolutions"]),n.aspectRatio=Boolean("true"===a.a["Enable Custom Aspect Ratio"]),n.isAutoSyncManifest=Boolean("true"===a.a["Auto Sync Manifest file"]),r.customAspectRatio=a.a["Custom Aspect Ratio"]||"16:9",r.customAspectRatio=r.customAspectRatio.trim().split(":"),r.ptCustomScreenSize=String(a.a["Default Screen Size"]||"1280 x 720").split(" x "),r.defaultScreenSize=new Point(parseInt(r.ptCustomScreenSize[0])||1280,parseInt(r.ptCustomScreenSize[1])||720),r.pcGraphicsArray=[],r.pcGraphicsTempArray=RS.ScreenManager.jsonParse(a.a.PC),r.mobileGraphicsArray=RS.ScreenManager.jsonParse(a.a.Mobile),r.resolutionQualityOnMobile=RS.ScreenManager.jsonParse(a.a["Mobile Simple"]),r.state="ready",RS.ScreenManager.Params.settings=r,RS.ScreenManager.Params.options=n,RS.ScreenManager.Params.fullscreenFlag=!1,RS.ScreenManager.Params.isUsedNodeLibrary=Boolean("true"===a.a["Bind Node Library"]),RS.ScreenManager.Params.isAutoScaledPicture=Boolean("true"===a.a["Scaled Picture"]),RS.ScreenManager.Params.ignoreAutoScalePictures=RS.ScreenManager.jsonParse(a.a["Ignore Auto Scale"]),RS.ScreenManager.Params.originalPictureViewSize=RS.ScreenManager.jsonParse(a.a["Original View Size"]),RS.ScreenManager.Params.picturePosType=a.a["Picture Position Type"]||"Actual Coordinates",RS.ScreenManager.Params.isValidOptionWindow=!Utils.isMobileDevice(),RS.ScreenManager.Params.isValidScaledBattleback=Boolean("true"===a.a["Scaled Battleback"]),RS.ScreenManager.Params.actorFunc={moveToStartPosition:RS.ScreenManager.jsonParse(a.a["ActorFunc.moveToStartPosition"]),setActorHome:RS.ScreenManager.jsonParse(a.a["ActorFunc.setActorHome"]),stepForward:RS.ScreenManager.jsonParse(a.a["ActorFunc.stepForward"]),stepBack:RS.ScreenManager.jsonParse(a.a["ActorFunc.stepBack"]),retreat:RS.ScreenManager.jsonParse(a.a["ActorFunc.retreat"])};i(4),i(6),i(7),i(8),i(10),i(11),i(12),i(13),i(14),i(15),i(16),i(17),i(18),i(19)}]);