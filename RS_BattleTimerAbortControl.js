//================================================================
// RS_BattleTimerAbortControl.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
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

(() => {
    //==================================================================
    // Game_System (For Saving)
    //==================================================================

    const alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        alias_Game_System_initialize.call(this);
        this._battleAbortInTimer = true;
    };

    Game_System.prototype.disableBattleAbortInTimer = function () {
        this._battleAbortInTimer = false;
    };

    Game_System.prototype.enableBattleAbortInTimer = function () {
        this._battleAbortInTimer = true;
    };

    Game_System.prototype.battleAbortInTimer = function () {
        return this._battleAbortInTimer;
    };

    //==================================================================
    // Game_Timer
    //==================================================================

    Game_Timer.prototype.onExpire = function () {
        if ($gameSystem.battleAbortInTimer()) {
            BattleManager.abort();
        }
    };

    //==================================================================
    // Plugin Command
    //==================================================================

    const aliasPluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        aliasPluginCommand.call(this, command, args);

        if (command === 'DisableBattleAbortInTimer') {
            $gameSystem.disableBattleAbortInTimer();
        } else if (command === 'EnableBattleAbortInTimer') {
            $gameSystem.enableBattleAbortInTimer();
        }
    };
})();
