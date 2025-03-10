//================================================================
// RS_PutInSubPartyMembers.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to add extra party members when all active party members are defeated in battle <RS_PutInSubPartyMembers>
 * @author biud436
 *
 * @param Extra Members Ids
 * @type actor[]
 * @desc Specify the actor IDs of extra party members who will automatically join when the main party is defeated.
 * @default ["5","6","7","8"]
 *
 * @help
 * =======================================================================
 * Introduction
 * =======================================================================
 * This plugin provides a "second chance" feature by automatically adding
 * reserve party members to your active party when all current members
 * are defeated in battle. Instead of facing an immediate Game Over,
 * the battle continues with your backup members.
 *
 * =======================================================================
 * How to Use
 * =======================================================================
 * 1. Set up your extra party members in the plugin parameters
 * 2. Make sure these actors are properly set up in the database
 * 3. When all active party members are defeated in battle, the extra
 *    members will automatically be added to the party
 * 4. The battle only ends in defeat when both the main party AND
 *    all extra members are defeated
 *
 * =======================================================================
 * Notes
 * =======================================================================
 * - The extra members are not initially in the active party
 * - They will only join during battle when needed
 * - The plugin maintains separate tracking for main and extra members
 * - Compatible with RPG Maker MV v1.5.1 or higher
 *
 * =======================================================================
 * Version Log
 * =======================================================================
 * 2019.01.26 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_PutInSubPartyMembers = true;

var RS = RS || {};
RS.PutInSubPartyMembers = RS.PutInSubPartyMembers || {};

(function ($) {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_PutInSubPartyMembers>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  $.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try {
        return $.jsonParse(v);
      } catch (e) {
        return v;
      }
    });
    return retData;
  };

  var extraMembers = $.jsonParse(parameters['Extra Members Ids']);

  //================================================================
  // Game_Party
  //================================================================

  Game_Party.prototype.getMemberIds = function () {
    var ids = $gameParty.members().map(function (i) {
      return i.actorId();
    });
    return ids;
  };

  Game_Party.prototype.extraMembers = function () {
    var members = this.getMemberIds()
      .concat(extraMembers)
      .map(function (id) {
        return $gameActors.actor(id);
      });
    return members.filter(function (member) {
      return member.isAlive();
    });
  };

  Game_Party.prototype.isExtraMembersAllDead = function () {
    return this.extraMembers().length === 0;
  };

  //================================================================
  // BattleManager
  //================================================================

  var alias_BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function () {
    alias_BattleManager_initMembers.call(this);
    this.initExtraMembers();
  };

  BattleManager.initExtraMembers = function () {
    // 추가 멤버 셋업
    extraMembers.forEach(function (i) {
      var actorId = i;
      $gameActors.actor(actorId).setup(actorId);
    });
    this._isExtraMembers = false;
  };

  /**
   * ! 턴 진행 중에 여분의 파티원을 투입합니다.
   */
  var alias_BattleManager_updateTurn = BattleManager.updateTurn;
  BattleManager.updateTurn = function () {
    alias_BattleManager_updateTurn.call(this);
    if ($gameParty.isAllDead() && !this._isExtraMembers) {
      $gameParty.getMemberIds().forEach(function (e, i, a) {
        $gameParty.removeActor(e);
        $gameParty.addActor(extraMembers[i]);
      });
      this._isExtraMembers = true;
    }
  };

  /**
   * ! 여분의 파티원까지 모두 Dead 상태일 때 전투가 종료 됩니다.
   */
  BattleManager.checkBattleEnd = function () {
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
})(RS.PutInSubPartyMembers);
