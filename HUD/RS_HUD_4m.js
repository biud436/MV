/*:
 * RS_HUD_4m.js
 * @plugindesc (v1.2.3) This plugin draws the HUD, which displays the hp and mp and exp and level of each party members.
 *
 * @author biud436
 *
 * @param --- Image Name
 * @desc
 * @default
 *
 * @param EXP Gauge
 * @desc Specifies to import file in the path named 'exr' from img/pictures folder.
 * @default exr
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Empty Gauge
 * @desc Specifies to import file in the path named 'gauge' from img/pictures folder.
 * @default gauge
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param HP Gauge
 * @desc Specifies to import file in the path named 'hp' from img/pictures folder.
 * @default hp
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param MP Gauge
 * @desc Specifies to import file in the path named 'mp' from img/pictures folder.
 * @default mp
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param HUD Background
 * @desc Specifies to import file in the path named 'hud_window_empty' from img/pictures folder.
 * @default hud_window_empty
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Masking
 * @desc Specifies to import file in the path named 'masking' from img/pictures folder.
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
 * @desc Specifies the properties of the face sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 0, 0, true
 *
 * @param HP Position
 * @desc Specifies the properties of the hp sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 160, 43, true
 *
 * @param MP Position
 * @desc Specifies the properties of the mp sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 160, 69, true
 *
 * @param EXP Position
 * @desc Specifies the properties of the exp sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 83, 91, true
 *
 * @param HP Text Position
 * @desc Specifies the properties of the hp text sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 160, 53, true
 *
 * @param MP Text Position
 * @desc Specifies the properties of the mp text sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 160, 79, true
 *
 * @param Level Text Position
 * @desc Specifies the properties of the level text sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 60, 80, true
 *
 * @param EXP Text Position
 * @desc Specifies the properties of the exp text sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 120.5, 93, true
 *
 * @param Name Text Position
 * @desc Specifies the properties of the name text sprite by x, y, visible
 * (Draw it at changing position relative to a background sprite)
 * @default 54, 53, false
 *
 * @param --- Noraml
 * @desc
 * @default
 *
 * @param Width
 * @desc Do not change this when you are using the default sprite batch.
 * (default : 317)
 * @default 317
 *
 * @param Height
 * @desc Do not change this when you are using the default sprite batch.
 * (default : 101)
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
 * @param Max Members
 * @desc Specifies the maximum number of party members that displays within the game screen.
 * @default 4
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
 * @desc Specifies to import a css for the font file from ./fonts folder.
 * @default GameFont
 *
 * @param Level Text Size
 * @desc Specify the text size for levels.
 * @default 24
 *
 * @param HP Text Size
 * @desc Specify the text size for HP.
 * @default 12
 *
 * @param MP Text Size
 * @desc Specify the text size for MP.
 * @default 12
 *
 * @param EXP Text Size
 * @desc Specify the text size for EXP.
 * @default 12
 *
 * @param Name Text Size
 * @desc Specify the text size for names.
 * @default 12
 *
 * @param --- Text Color
 * @desc
 * @default
 *
 * @param HP Color
 * @desc Specify the text color for HP.
 * @default #ffffff
 *
 * @param MP Color
 * @desc Specify the text color for MP.
 * @default #ffffff
 *
 * @param EXP Color
 * @desc Specify the text color for EXP.
 * @default #ffffff
 *
 * @param Level Color
 * @desc Specify the text color for levels.
 * @default #ffffff
 *
 * @param Name Color
 * @desc Specify the text color for names.
 * @default #ffffff
 *
 * @param --- Text Outline Color
 * @desc
 * @default
 *
 * @param HP Outline Color
 * @desc Specify the text outline color for HP.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param MP Outline Color
 * @desc Specify the text outline color for MP.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param EXP Outline Color
 * @desc Specify the text outline color for EXP.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Level Outline Color
 * @desc Specify the text outline color for levels.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Name Outline Color
 * @desc Specify the text outline color for names.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param --- Text Outline Width
 * @desc
 * @default
 *
 * @param HP Outline Width
 * @desc Specify the maximum width of a text border line for HP.
 * @default 4
 *
 * @param MP Outline Width
 * @desc Specify the maximum width of a text border line for MP.
 * @default 4
 *
 * @param EXP Outline Width
 * @desc Specify the maximum width of a text border line for EXP.
 * @default 4
 *
 * @param Level Outline Width
 * @desc Specify the maximum width of a text border line for levels.
 * @default 4
 *
 * @param Name Outline Width
 * @desc Specify the maximum width of a text border line for names.
 * @default 4
 *
 * @param --- Custom Font
 * @desc
 * @default
 *
 * @param Using Custom Font
 * @desc Specify whether the custom font shows (default : false)
 * YES - true   /   NO - false
 * @default false
 *
 * @param Custom Font Name
 * @desc Specify the name of the custom font
 * @default NanumBrush
 *
 * @param Custom Font Src
 * @desc Specify the path of the font file from a game project folder
 * @default fonts/NanumBrush.ttf
 *
 * @param --- Custom HUD Anchor
 * @desc
 * @default
 *
 * @param Custom Pos 1
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to a custom position of the help section)
 * @default 0, (H * 0) + PD
 *
 * @param Custom Pos 2
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default 0, (H * 1) + PD
 *
 * @param Custom Pos 3
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default 0, (H * 2) + PD
 *
 * @param Custom Pos 4
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default 0, (H * 3) + PD
 *
 * @param Custom Pos 5
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default 0, (H * 4) + PD
 *
 * @param Custom Pos 6
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default W + PD, (H * 0) + PD
 *
 * @param Custom Pos 7
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default W + PD, (H * 1) + PD
 *
 * @param Custom Pos 8
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default W + PD, (H * 2) + PD
 *
 * @param Custom Pos 9
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default W + PD, (H * 3) + PD
 *
 * @param Custom Pos 10
 * @desc Predefined Variables : W, H, PD, BW, BH
 * (Please refer to the help section)
 * @default W + PD, (H * 4) + PD
 *
 * @help
 * =============================================================================
 * Installations
 * =============================================================================
 *
 * Download the resources and place them in your img/pictures folder.
 * All the resources can download in the following link.
 * Resources Link : https://www.dropbox.com/s/umjlbgfgdts2rf7/pictures.zip?dl=0
 *
 * In Plugin Manager, You have to pre-load the resources using the parameter
 * called 'preloadImportantFaces'.
 *
 * Demo Link : https://www.dropbox.com/s/v6prurtempabqqv/hud.zip?dl=0
 * Github Link : https://github.com/biud436/MV/blob/master/HUD/RS_HUD_4m.js
 *
 * =============================================================================
 * Custom Positions
 * =============================================================================
 *
 * To display in correct place, you need to know which predefined variables are currently available.
 * You can be available predefined variables as belows when specifying the parameter
 * named 'Custom Pos'. So you can quickly set up positions for a hud itself.
 *
 * Predefined Variables :
 *    W   - 'W' is the same as a parameter named 'Width' in Plugin Manager.
 *    H   - 'H' is the same as a parameter named 'Height' in Plugin Manager
 *    PD  - 'PD' is the same as a parameter named 'Margin' in Plugin Manager
 *    BW  - 'BW' is the same as a maximum width of the game canvas.
 *    BH  - 'BH' is the same as a maximum height of the game canvas.
 *
 * Each sprites draw at changing position relative to the background sprite.
 * Therefore, this custom position is pretty important values.
 *
 * =============================================================================
 * Notetags
 * =============================================================================
 *
 * Insert the following the notetag into the map property window as below.
 * <DISABLE_HUD> : A notetag can use in the map that does not wish create each huds.
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 *
 * -----------------------------------------------------------------------------
 * Set Opacity
 * -----------------------------------------------------------------------------
 * Sets the opacity of the HUD to x.
 *
 *    $gameHud.opacity = x;
 *
 * That is a number between 0 and 255.
 *
 * For example :
 *    $gameHud.opacity = 128;
 *
 * -----------------------------------------------------------------------------
 * Set visibility
 * -----------------------------------------------------------------------------
 * This variable will change the visible option of the HUD.
 *
 *    $gameHud.show = true/false;
 *
 * For example :
 *    $gameHud.show = false;
 *
 * -----------------------------------------------------------------------------
 * Refresh Texts
 * -----------------------------------------------------------------------------
 * In general, text and gauge sprites refresh when requesting a refresh so this one is not
 * updated on every frame. Therefore if you need to immediately refresh
 * all texts for themselves, you will use as belows.
 *
 *   $gameTemp.notifyHudTextRefresh();
 *
 * -----------------------------------------------------------------------------
 * Clear and create all huds
 * -----------------------------------------------------------------------------
 * if you need to immediately recreate for all Huds, you will use as belows.
 *
 *   $gameTemp.notifyHudRefresh();
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 *
 * RS_HUD Opacity x : This command sets up the opacity for all hud elements.
 *    'x' is a number value between 0 and 255.
 *
 * RS_HUD Visible true/false : This command sets up whether it displays all containers for HUD.
 *    'RS_HUD Visible true' sets its visibility to true.
 *    'RS_HUD Visible false' sets its visibility to false.
 *
 * RS_HUD import file_name : This command imports the parameter as the json file from your data folder.
 * RS_HUD export file_name : This command exports the parameter as the json file to your data folder.
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
 * 2016.12.19 (v1.1.8b) - Fixed a bug that is not set up the coordinates of the face image.
 * 2016.12.22 (v1.1.9) :
 * - Now this plugin does not provide the functionality to automatically adjust transparency and tone changes due to poor performance in canvas mode of mobile device.
 * - The text elements perform an update through the event handler.
 * - Fixed an issue that plugins did not work due to image position data parsing errors in crosswalk.
 * - Fixed an issue that can not be saved due to this update.
 * 2017.01.06 (v1.2.0) :
 * - Fixed to redraw the Hud when using the $gameParty.swapOrder method.
 * - Fixed the hud to process the refresh when the event lisnter listens a refresh request.
 *   $gameHud.refresh() -> $gameTemp.notifyHudRefresh();
 * 2017.01.25 (v1.2.1) - Fixed a bug that causes the null when 'battle only' parameter is true.
 * 2017.01.26 (v1.2.2) :
 * - Fixed a bug that is not working to preload
 * - Added a new parameter that could increase the number of the HUD.
 * - Added parameters for user custom HUD position.
 * - Fixed an issue that is not working in battle test mode
 * 2017.03.06 (v1.2.3) :
 * - Added many descriptions for plugin parameters and help section.
 * - Altered the hud to be updated all parameters once when initializing.
 */

var Imported = Imported || {};
Imported.RS_HUD_4m = '1.2.3';

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
    var visible = Boolean(String(RegExp.$3).contains('true'));
    return {'x': x, 'y': y, 'visible': visible};
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

  RS.HUD.param.nMaxMembers = parseInt(parameters["Max Members"] || 4);

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

  RS.HUD.param.isCurrentBattleShowUp = false;
  RS.HUD.param.isPreviousShowUp = false;

  RS.HUD.loadCustomPosition = function (szRE) {
    var W = RS.HUD.param.nWidth;
    var H = RS.HUD.param.nHeight;
    var PD = RS.HUD.param.nPD;
    var BW = Graphics.boxWidth || 816;
    var BH = Graphics.boxHeight || 624;
    var x = eval('[' + szRE + ']');
    if(x instanceof Array) return new Point(x[0], x[1]);
    return new Point(0, 0);
  };

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
      $gameTemp.notifyHudRefresh();
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
  // Game_Temp
  //
  //

  var alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    alias_Game_Temp_initialize.call(this);
    this.initHudEvent();
    this.initHudTextEvent();
  };

  Game_Temp.prototype.initHudEvent = function () {
    this._hudEvents = document.createEvent('Event');
    this._hudEvents.initEvent('broadcast.rs.hud', true, true);
  };

  Game_Temp.prototype.initHudTextEvent = function () {
    this._hudRefreshEvent = document.createEvent('Event');
    this._hudRefreshEvent.initEvent('refresh.rs.hud', true, true);
  };

  Game_Temp.prototype.notifyHudTextRefresh = function() {
    var elm = document.body;
    elm.dispatchEvent(this._hudEvents);
  };

  Game_Temp.prototype.notifyHudRefresh = function() {
    var elm = document.body;
    elm.dispatchEvent(this._hudRefreshEvent);
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
  // Game_Battler
  //
  //

  var alias_Game_Battler_refresh = Game_Battler.prototype.refresh;
  Game_Battler.prototype.refresh = function() {
    alias_Game_Battler_refresh.call(this);
    $gameTemp.notifyHudTextRefresh();
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
  // Game_Party
  //
  //

  var alias_Game_Party_swapOrder = Game_Party.prototype.swapOrder;
  Game_Party.prototype.swapOrder = function(index1, index2) {
    alias_Game_Party_swapOrder.call(this, index1, index2);
    $gameTemp.notifyHudRefresh();
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
    this.requestUpdate();
    this.addEventListener('broadcast.rs.hud');
  };

  TextData.prototype.addEventListener = function (type) {
    document.body.addEventListener(type, this.requestUpdate.bind(this), false);
  };

  var alias_TextData_destroy = TextData.prototype.destroy;
  TextData.prototype.destroy = function () {
    if(alias_TextData_destroy) alias_TextData_destroy.call(this);
    document.body.removeEventListener('broadcast.rs.hud', this.requestUpdate.bind(this), false);
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

  TextData.prototype.requestUpdate = function () {
    this.clearTextData();
    this.drawDisplayText();
    this.updateTextLog();
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
    this.alpha = 0;
    this.createItemLayer();
    this.addEventListener('refresh.rs.hud');
  };

  RS_HudLayer.prototype.addEventListener = function (type) {
    document.body.addEventListener(type, this.refresh.bind(this), false);
  };

  var alias_RS_HudLayer_destroy = RS_HudLayer.prototype.destroy;
  RS_HudLayer.prototype.destroy = function () {
    if(alias_RS_HudLayer_destroy) alias_RS_HudLayer_destroy.call(this);
    document.body.removeEventListener('refresh.rs.hud', this.refresh.bind(this), false);
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
    var self = this;
    setTimeout(function() {
      while($gameParty.size() !== self._items.children.length) {
        self.drawAllHud();
      }
    }, 0);
  };

  Object.defineProperty(RS_HudLayer.prototype, 'show', {
      get: function() {
          return this.visible;
      },
      set: function(value) {
          this.visible = value;
          $gameSystem._rs_hud.show = value;
      },
  });

  Object.defineProperty(RS_HudLayer.prototype, 'opacity', {
      get: function() {
          return Math.floor(this.alpha * 255);
      },
      set: function(value) {
          this.alpha = value * 0.00392156862745098;
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      },
  });

  //----------------------------------------------------------------------------
  // RS_EmptyHudLayer
  //
  //

  function RS_EmptyHudLayer() {
    this.initialize.apply(this, arguments);
  }

  RS_EmptyHudLayer.prototype = Object.create(Sprite.prototype);
  RS_EmptyHudLayer.prototype.constructor = RS_EmptyHudLayer;

  RS_EmptyHudLayer.prototype.initialize = function(bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.alpha = 0;
  };

  RS_EmptyHudLayer.prototype.constructor = RS_EmptyHudLayer;

  Object.defineProperty(RS_EmptyHudLayer.prototype, 'show', {
      get: function() {
          return $gameSystem._rs_hud.show;
      },
      set: function(value) {
          $gameSystem._rs_hud.show = value;
      }
  });

  Object.defineProperty(RS_EmptyHudLayer.prototype, 'opacity', {
      get: function() {
          return $gameSystem._rs_hud.opacity;
      },
      set: function(value) {
          $gameSystem._rs_hud.opacity = value.clamp(0, 255);
      }
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
      this.paramUpdate();
      this.addEventListener('broadcast.rs.hud');
  };

  HUD.prototype.addEventListener = function (type) {
    document.body.addEventListener(type, this.paramUpdate.bind(this), false);
  };

  HUD.prototype.removeEventListener = function (type) {
    document.body.removeEventListener(type, this.paramUpdate.bind(this), false);
  };

  var alias_HUD_destroy = HUD.prototype.destroy;
  HUD.prototype.destroy = function () {
    if(alias_HUD_destroy) alias_HUD_destroy.call(this);
    this.removeEventListener('broadcast.rs.hud');
  };

  HUD.prototype.getAnchor = function(magnet) {
    var anchor = RS.HUD.getDefaultHUDAnchor();

    // Add Custom Anchor
    for(var i = 0; i < RS.HUD.param.nMaxMembers; i++) {
      var idx = parseInt(i + 1);
      anchor['Custom Pos ' + idx] = RS.HUD.param.ptCustormAnchor[i];
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

    this._face = new Sprite();

    var fw = Window_Base._faceWidth;
    var fh = Window_Base._faceHeight;
    var sx = (faceIndex % 4) * fw;
    var sy = Math.floor(faceIndex / 4) * fh;

    this._face.bitmap = new Bitmap(nFaceDiameter, nFaceDiameter);

    if (RS.HUD.param.blurProcessing) {
      this._face.bitmap.drawClippingImage(this._faceBitmap, this._maskBitmap, 0, 0, sx, sy);
    } else {
      this._face.bitmap.drawClippingImageNonBlur(this._faceBitmap, 0, 0, sx, sy);
    }

    this.addChild(this._face);
    this.setCoord(this._face, RS.HUD.param.ptFace);

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
    if(this._face) this.setCoord(this._face, param.ptFace);
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
  };

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
    this.updateOpacity();
    this.updateToneForAll();
  };

  HUD.prototype.updateOpacity = function() {
    if(!Graphics.isWebGL()) return false;
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
      if(obj) obj.setColorTone([this._vtA.x, this._vtA.x, this._vtA.x, 0]);
    }
  }

  HUD.prototype.updateToneForAll = function () {
    if(!this.getPlayer()) return false;
    if(!Graphics.isWebGL()) return false;
    this.checkForToneUpdate( this._hp, this.getPlayer().hpRate() <= nHPGlitter );
    this.checkForToneUpdate( this._mp, this.getPlayer().mpRate() <= nMPGlitter );
    this.checkForToneUpdate( this._exp, this.getRealExpRate() >= nEXPGlitter );
  };

  HUD.prototype.paramUpdate = function() {
    this._hp.setFrame(0, 0, this.getHpRate(), this._hp.height );
    this._mp.setFrame(0, 0, this.getMpRate(), this._mp.height );
    this._exp.setFrame(0, 0, this.getExpRate(), this._exp.height );
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
  var alias_Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    alias_Scene_Map_createDisplayObjects.call(this);
    if(RS.HUD.param.battleOnly || ($dataMap && $dataMap.meta.DISABLE_HUD) ) {

      $gameHud = new RS_EmptyHudLayer();

    } else {

      this._hudLayer = new RS_HudLayer();
      this._hudLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

      $gameHud = this._hudLayer;
      this._hudLayer.drawAllHud();

      this.addChild(this._hudLayer);
      this.swapChildren(this._windowLayer, this._hudLayer);

    }
  };

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this.removeChild(this._hudLayer);
    $gameHud = null;
    alias_Scene_Map_terminate.call(this);
  };

  //----------------------------------------------------------------------------
  // Game_Party
  //
  //

  var alias_Game_Party_addActor = Game_Party.prototype.addActor;
  Game_Party.prototype.addActor = function(actorId) {
    alias_Game_Party_addActor.call(this, actorId);
    $gameTemp.notifyHudRefresh();
  };

  var alias_Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function(actorId) {
    alias_Game_Party_removeActor.call(this, actorId);
    $gameTemp.notifyHudRefresh();
  };

  //----------------------------------------------------------------------------
  // Scene_Boot
  //
  //
  var alias_Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
  Scene_Boot.prototype.loadSystemWindowImage = function() {
    alias_Scene_Boot_loadSystemWindowImage.call(this);

    // Load Custom Font
    if(RS.HUD.param.bUseCustomFont) {
      Graphics.loadFont(RS.HUD.param.szCustomFontName, RS.HUD.param.szCustomFontSrc);
    }

    // Load Face
    RS.HUD.param.preloadImportantFaces.forEach(function(i) {
      ImageManager.loadFace(i);
    }, this);

  };

  var alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    alias_Scene_Boot_start.call(this);
    // Load Custom Anchor
    for(var i = 0; i < RS.HUD.param.nMaxMembers; i++) {
      RS.HUD.param.ptCustormAnchor.push( RS.HUD.loadCustomPosition(parameters[String('Custom Pos ' + (i + 1))] || '0, 0') );
    }
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
      if($gameHud) $gameHud.show = RS.HUD.param.isPreviousShowUp;
      RS.HUD.param.isCurrentBattleShowUp = false;
    }
  };

  var alias_Scene_Battle_updateFade = Scene_Battle.prototype.updateFade;
  Scene_Battle.prototype.updateFade = function() {
    alias_Scene_Battle_updateFade.call(this);
    if(this._fadeDuration == 0 && !RS.HUD.param.isCurrentBattleShowUp) {
      if($gameHud) $gameHud.show = true;
      RS.HUD.param.isCurrentBattleShowUp = true;
    }
  };

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
