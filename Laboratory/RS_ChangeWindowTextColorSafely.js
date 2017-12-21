/*:
 * @plugindesc This plugin allows you to get the color without calling function getPixel <RS_ChangeWindowTextColorSafely>
 * @author biud436
 *
 * @param normalColor
 * @text Normal Color
 * @type color
 * @desc Specify the normal color
 * (#ffffff = white)
 * @default #ffffff
 *
 * @param windowList
 * @text Window List
 * @type note[]
 * @desc Specify the function name (that means the class name in Ruby)
 * @default []
 *
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.12.21 - First Release.
 */

var Imported = Imported || {};
Imported.RS_ChangeWindowTextColorSafely = true;

var RS = RS || {};
RS.Utils = RS.Utils || {};

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ChangeWindowTextColorSafely>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  var textNormalColor = parameters['normalColor'] || '#ffffff';
  var defaultWindowClasses = RS.Utils.jsonParse(parameters['windowList']);

  Utils.changeWindowTextColorSafely = function(ITEMS) {
    ITEMS.forEach(function(e,i,a) {
      var CLASS_NAME = window[e];
      if(typeof(CLASS_NAME) === 'function') {
        CLASS_NAME.prototype.normalColor = function() { return textNormalColor; };
      }
    }, this);
  };

  Utils.changeWindowTextColorSafely(defaultWindowClasses || []);

})();
