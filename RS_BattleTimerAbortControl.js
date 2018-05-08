/*:
 * @plugindesc This plugin allows you to be maintaining the battle even if the timer is less than 0 on battle.
 * @author biud436
 * @help
 * ==================================================================
 * Plugin Commands
 * ==================================================================
 * DisableBattleAbortInTimer : it doesn't abort the battle after the timer is zero.
 * EnableBattleAbortInTimer : if the timer is same as 0, it will abort the battle.
 * ==================================================================
 * Version Log
 * ================================================================== 
 * 2018.05.08 (v1.0.0) - First Release
 */
/*:ko
 * @plugindesc 타이머가 0이된다해도 전투가 중단되지 않습니다.
 * @author biud436
 * @help
 * ==================================================================
 * 플러그인 명령
 * ==================================================================
 * DisableBattleAbortInTimer : 타이머가 0이 된 이후에도 전투가 중단되지 않음
 * EnableBattleAbortInTimer : 타이머가 0이 되면 전투가 중단됨.
 * ==================================================================
 * 버전 로그
 * ==================================================================
 * 2018.05.08 (v1.0.0) - 출시
 */

var Imported = Imported || {};
Imported.RS_BattleTimerAbortControl = true;

(function () {

    //==================================================================
    // Game_System (For Saving)
    //==================================================================     

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        alias_Game_System_initialize.call(this);
        this._battleAbortInTimer = true;
    };

    Game_System.prototype.disableBattleAbortInTimer = function() {
        this._battleAbortInTimer = false;
    };

    Game_System.prototype.enableBattleAbortInTimer = function() {
        this._battleAbortInTimer = true;
    };    

    Game_System.prototype.battleAbortInTimer = function() {
        return this._battleAbortInTimer;
    };        

    //==================================================================
    // Game_Timer
    //==================================================================

    Game_Timer.prototype.onExpire = function() {
        if($gameSystem.battleAbortInTimer()) {
            BattleManager.abort();
        }
    };

    //==================================================================
    // Plugin Command
    //==================================================================    

    var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);
  
      if(command === "DisableBattleAbortInTimer") {
        $gameSystem.disableBattleAbortInTimer();
      }
      if(command === "EnableBattleAbortInTimer") {
        $gameSystem.enableBattleAbortInTimer();
      }      
    };    
        
})();
