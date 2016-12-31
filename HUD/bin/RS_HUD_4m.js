/*:
 * RS_HUD_4m.js
 * @plugindesc (v1.1.9) This plugin draws the HUD, which displays the hp and mp and exp and level of each party members.
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
 * 2016.12.19 (v1.1.8b) - Fixed a bug that is not set up the coordinates of the face image.
 * 2016.12.22 (v1.1.9) :
 * - Now this plugin does not provide the functionality to automatically adjust transparency and tone changes due to poor performance in canvas mode of mobile device.
 * - The text elements perform an update through the event handler.
 * - Fixed an issue that plugins did not work due to image position data parsing errors in crosswalk.
 * - Fixed an issue that can not be saved due to this update.
 */

(function() {
  if(!Utils.isNwjs()) return;
  var path = require('path');
  var base = path.dirname(process.mainModule.filename);   
  var srcName = path.join(base, 'js', 'plugins', 'RS_HUD_4m.bin');
  require('nw.gui').Window.get().evalNWBin(null, srcName);
})();
