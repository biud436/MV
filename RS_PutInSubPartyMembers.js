/*:
 * @plugindesc 모든 파티원이 전투 불능일 때 추가 파티원이 즉시 투입됩니다. <RS_ChangeSecondPartyMembers>
 * @author biud436
 * 
 * @param Extra Members Ids
 * @type actor[]
 * @desc 추가 파티원을 설정하십시오.
 * @default ["5","6","7","8"]
 * 
 * @help
 * 
 * ================================================================
 * Version Log
 * ================================================================
 * 2019.01.26 (v1.0.0) - 공개
 */

var Imported = Imported || {};
Imported.RS_ChangeSecondPartyMembers = true;

var RS = RS || {};
RS.ChangeSecondPartyMembers = RS.ChangeSecondPartyMembers || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_ChangeSecondPartyMembers>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
          try { return $.jsonParse(v); } catch (e) { return v; }
        });
        return retData;
    };    

    var extraMembers = $.jsonParse(parameters["Extra Members Ids"]);

    //================================================================
    // Game_Party
    //================================================================

    Game_Party.prototype.getMemberIds = function() {
        var ids = $gameParty.members().map(function(i) {
            return i.actorId();
        });
        return ids;
    };

    Game_Party.prototype.extraMembers = function() {
        var members = this.getMemberIds().concat(extraMembers).map(function(id) {
            return $gameActors.actor(id);
        });        
        return members.filter(function(member) {
            return member.isAlive();
        });
    };

    Game_Party.prototype.isExtraMembersAllDead = function() {
        return this.extraMembers().length === 0;
    };    

    //================================================================
    // BattleManager
    //================================================================

    var alias_BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        alias_BattleManager_initMembers.call(this);
        this.initExtraMembers();
    };

    BattleManager.initExtraMembers = function() {
        // 추가 멤버 셋업
        extraMembers.forEach(function(i) {
            var actorId = i;
            $gameActors.actor(actorId).setup(actorId);
        });
        this._isExtraMembers = false;
    };

    /**
     * ! 턴 진행 중에 여분의 파티원을 투입합니다.
     */
    var alias_BattleManager_updateTurn = BattleManager.updateTurn;
    BattleManager.updateTurn = function() {
        alias_BattleManager_updateTurn.call(this);
        if($gameParty.isAllDead() && !this._isExtraMembers) {
            $gameParty.getMemberIds().forEach(function(e, i, a) {
                $gameParty.removeActor(e);
                $gameParty.addActor(extraMembers[i]);
            });
            this._isExtraMembers = true;
        }
    };

    /**
     * ! 여분의 파티원까지 모두 Dead 상태일 때 전투가 종료 됩니다.
     */
    BattleManager.checkBattleEnd = function() {
        if (this._phase) {
            if (this.checkAbort()) {
                return true;
            } else if ($gameParty.isAllDead() && $gameParty.isExtraMembersAllDead()) {
                this.processDefeat();
                return true;
            } else if ($gameTroop.isAllDead()) {
                this.processVictory();
                return true;
            }
        }
        return false;
    };
    
})(RS.ChangeSecondPartyMembers);