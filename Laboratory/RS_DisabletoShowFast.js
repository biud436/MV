/*:ko
 * @plugindesc 메시지를 빠르게 표시할 수 없게 합니다.
 * @author biud436
 *
 * @help
 * 적용 이후에는 상태를 수정할 수 없습니다.
 */
/*:
 * DisabletoShowFast.js
 * @plugindesc In Message Box, Disable the ability to show a text quick.
 * @author biud436
 *
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_DisabletoShowFast = true;

(function() {
  Window_Message.prototype.updateShowFast = function() {
    return false;
  };
})();
