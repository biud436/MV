/*:
 * @plugindesc This plugin can prevent changing cursor in the mode box.
 * @author biud436
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.06 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc 모드 박스에 마우스가 오버되었을 때 커서 모양을 기본 모양으로 변경합니다.
 * @author 러닝은빛(biud436)
 * @help
 * =============================================================================
 * 변동 사항
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
