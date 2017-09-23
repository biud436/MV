/*:
 * RS_MessageParamManagers.js
 * @plugindesc Set the opacity of each element on a Message Box.
 * @author biud436
 *
 * @param back Opacity
 * @type number
 * @desc
 * @default 192
 *
 * @param default Opacity
 * @type number
 * @desc
 * @default 255
 * @min 0
 * @max 255
 *
 * @param contents Opacity
 * @type number
 * @desc
 * @default 255
 * @min 0
 * @max 255
 *
 * @param translucent Opacity
 * @type number
 * @desc
 * @default 160
 * @min 0
 * @max 255
 *
 * @param default outline width
 * @type number
 * @desc
 * @default 2
 *
 * @param default outline Color
 * @desc
 * @default rgba(0, 0, 0, 1.0)
 *
 * @help
 */

var Imported = Imported || {};
Imported.RS_MessageParamManagers = '1.0.1';

(function() {

  var parameters = PluginManager.parameters('RS_MessageParamManagers');
  var __backOpacity = Number(parameters['back Opacity'] || 192);
  var __translucentOpacity = Number(parameters['translucent Opacity'] || 160);
  var __defaultOpacity = Number(parameters['default Opacity'] || 255);
  var __contentsOpacity = Number(parameters['contents Opacity'] || 255);
  var __defaultOutlineWidth = Number(parameters['default outline width'] || 2);
  var __defaultOutlineColor = parameters['default outline Color'] || 'white';

  Window_Message.prototype.standardBackOpacity = function() {
      return __backOpacity;
  };

  Window_Message.prototype.translucentOpacity = function() {
      return __translucentOpacity;
  };

  Window_Message.prototype.updateDefaultOpacity = function() {
      this.opacity = __defaultOpacity;
  };

  Window_Message.prototype.updateContentsOpacity = function() {
      this.contentsOpacity = __contentsOpacity;
  };

  var alias_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function() {
    alias_Window_Message_update.call(this);
    this.updateDefaultOpacity();
    this.updateContentsOpacity();
  };

  var alias_Window_Message_resetFontSettings = Window_Message.prototype.resetFontSettings;
  Window_Message.prototype.resetFontSettings = function() {
    alias_Window_Message_resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = 2;
    this.contents.outlineColor = __defaultOutlineColor;
  };

})();
