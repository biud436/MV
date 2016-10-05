/*:
 * @plugindesc This plugin can prevent changing cursor in the mode box.
 * @author biud436
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.06 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_ModeTextCurosrFixes = true;

(function () {
  var alias_SceneManager_initGraphics = SceneManager.initGraphics;
  SceneManager.initGraphics = function() {
    alias_SceneManager_initGraphics.call(this);
    var child = document.querySelectorAll('div');
    var len = child.length;
    for(var i = 0; i < len; i++) {
      child.item(i).style.cursor = 'default';
    }
  };
})();
