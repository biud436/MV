//================================================================
// RS_ScreenManager.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

/*:
 * @plugindesc (v1.0.22) <RS_ScreenManager>
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
 * @option 18:9
 * @value 18:9
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
 * @text Target Resolution
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
 * @text Target Devices
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
 * 2020.02.19 (v1.0.22) :
 * - Fixed RS.ScreenManager.isFullscreen();
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