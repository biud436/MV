/*:
 * @plugindesc This plugin allows you to remove an escape message that runs when escaping the battle.
 * @author biud436
 */
/*:ko
 * @plugindesc 도망 커맨드를 실행 시 나오는 메시지를 제거합니다.
 * @author biud436
 */ 

var Imported = Imported || {};
Imported.RS_RemoveEscapeMessage = true;
 
(function() {
  
  BattleManager.displayEscapeSuccessMessage = function() {
  };

  BattleManager.displayEscapeFailureMessage = function() {
  };  
  
})();