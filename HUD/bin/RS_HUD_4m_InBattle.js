/*:
 * RS_HUD_4m_InBattle.js
 * @plugindesc This plugin requires RS_HUD_4m.js
 *
 * @author biud436
 *
 * @param --- Image Name
 * @desc
 * @default
 *
 * @param HUD Battle Background
 * @desc
 * @default hud_window_empty_inbattle
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param TP Gauge
 * @desc
 * @default exr
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param --- Noraml
 * @desc
 * @default
 *
 * @param Auto Windows Alignment
 * @desc
 * @default true
 *
 * @param --- Text Settings
 * @desc
 * @default
 *
 * @param TP Position
 * @desc x, y, visible
 * (default : 83, 91, true)
 * @default 83, 91, true
 *
 * @param TP Text Size
 * @desc
 * @default 12
 *
 * @param TP Color
 * @desc
 * @default #ffffff
 *
 * @param TP Outline Color
 * @desc
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param TP Outline Width
 * @desc
 * @default 4
 *
 * @param --- Custom HUD Anchor
 * @desc
 * @default
 *
 * @param Arrangement
 * @desc Create an array to set the anchor of each HUD.
 * @default ['Pos 1', 'Pos 2', 'Pos 3', 'Pos 4']
 *
 * @param Pos 1
 * @desc (default : 102, 422)
 * @default 102, 422
 *
 * @param Pos 2
 * @desc (default : 0, 523)
 * @default 0, 523
 *
 * @param Pos 3
 * @desc (default : 499, 422)
 * @default 499, 422
 *
 * @param Pos 4
 * @desc (default : 397, 523)
 * @default 397, 523
 *
 * @help
 * =============================================================================
 * How to setup
 * =============================================================================
 * To use this add-on, You must have RS_HUD_4m 1.1.3, or later versions.
 * An add-on plugin also requires a new image. Click the following link,
 * and then Right-Click the image and Select the button called Save image as.
 *
 * Image Link : https://github.com/biud436/MV/blob/master/HUD/hud_window_empty_inbattle.png
 *
 * After that, Copy the image called 'hud_window_empty_inBattle.png' to img/pictures folder.
 * The following demo game shows the example.
 * (For information about the add-on, see RS_HUD_4m_InBattle plugin on the demo game.)
 *
 * Demo Game : https://www.dropbox.com/s/v6prurtempabqqv/hud.zip?dl=0
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.21 (v1.0.0) - First Release Date
 * 2016.05.28 (v1.1.0) - Added Active Turn Battle (require YEP_BattleEngineCoreand YEP_X_BattleSysATB)
 * 2016.06.30 (v1.1.1) - Added the parameter that displays the values with commas every three digits.
 * 2016.08.07 (v1.1.2) - Fixed the issue of the function for drawing status icon
 * 2016.09.05 (v1.1.3) - Now you can change the image file name, and can also be used the option called 'exclude the unused files'.
 * 2016.09.26 (v1.1.4) - Added Custom Anchor.
 * 2016.10.08 (v1.1.5) :
 * - Added the plugin parameter that could be configurable the property of TP text.
 * - Fixed the bug that the opacity is not returned as a previous opacity when certain party member is revived.
 * - Fixed the bug that the technical point gauge does not display.
 * 2016.10.11 (v1.1.6) :
 * - Fixed the bug that happens when certain party member is removed.
 * - Fixed the bug that is not controlled the opacity of HUD.
 * 2016.12.22 (v1.1.7) :
 * - Now this plugin does not provide the functionality to automatically adjust transparency and tone changes due to poor performance in canvas mode of mobile device.
 * - The text elements perform an update through the event handler.
 * - Fixed an issue that plugins did not work due to image position data parsing errors in crosswalk.
 * - Fixed an issue that can not be saved due to this update.
 */

(function() {
  if(!Utils.isNwjs()) return;
  var path = require('path');
  var base = path.dirname(process.mainModule.filename);   
  var srcName = path.join(base, 'js', 'plugins', 'RS_HUD_4m_InBattle.bin');
  require('nw.gui').Window.get().evalNWBin(null, srcName);
})();
