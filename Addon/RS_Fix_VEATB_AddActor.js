/*:
 * @plugindesc This plugin allows you to refresh the atb memebers when adding a new party member
 * @author biud436
 * @help
 * =============================================================================
 * Introduction
 * =============================================================================
 * This plugin allows you to refresh the atb memebers when adding a new party member 
 * in Victor Engine - Active Time Battle.
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.05.08 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc VE - Active Time Battle에서 파티원이 추가되었을 때 추가 멤버를 반영합니다.
 * @author biud436
 * @help
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.05.08 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_Fix_VEATB_AddActor = true;

(function() {

    if(Imported['VE - Active Time Battle']) {

        var rs_alias_BattleManager_endTurn = BattleManager.endTurn;
        BattleManager.endTurn = function() {
          rs_alias_BattleManager_endTurn.call(this);
          var len = $gameParty.members().length;
          if(len !== this._allAtbMembers.length) {
            this._allAtbMembers = $gameParty.members().clone();
          }
          this._allAtbMembers.forEach(function(i) {
            i.refresh();
          }, this);
        };    
    
    }

})();