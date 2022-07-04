//================================================================
// RS_GameSpeed.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to speed up or speed down the game speed. <RS_GameSpeed>
 * @author biud436
 *
 * @param FPS
 * @type number
 * @desc The default game speed (60 Frame per second)
 * @default 60
 *
 * @help
 * When you first start up a game,
 * it will apply the game speed as you did set up in the plugin parameter.
 *
 * =======================================================
 * Plugin Commands
 * =======================================================
 * The plugin commands allows you to change the game speed during the game.
 *
 * Change the game speed with 30 frame per second.
 * ChangeFPS 30
 *
 * Change the game speed with 60 frame per second.
 * ChangeFPS 60
 *
 * Change the game speed with 120 frame per second.
 * ChangeFPS 120
 *
 * =======================================================
 * Version Log
 * =======================================================
 * 2019.05.06 (v1.0.0) - First Release.
 */
/*:ko
 * @target MV
 * @plugindesc 게임 속도를 조절합니다 <RS_GameSpeed>
 * @author biud436
 *
 * @param FPS
 * @type number
 * @desc 초당 프레임 수
 * @default 60
 *
 * @help
 * =======================================================
 * Plugin Commands
 * =======================================================
 * 게임 속도를 초당 30 프레임으로 설정합니다.
 *  ChangeFPS 30
 *
 * 게임 속도를 초당 60 프레임으로 설정합니다.
 *  ChangeFPS 60
 *
 * 게임 속도를 초당 120 프레임으로 설정합니다.
 *  ChangeFPS 120
 * =======================================================
 * Version Log
 * =======================================================
 * 2019.05.06 (v1.0.0) - First Release.
 */

(() => {
    const RS = RS || {};
    RS.GameSpeed = RS.GameSpeed || {};

    let parameters = $plugins.filter(i => {
        return i.description.contains('<RS_GameSpeed>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    $.Params = {};
    $.Params.FPS = parseFloat(parameters.FPS || 60);

    SceneManager._deltaTime = 1.0 / $.Params.FPS;

    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ChangeFPS') {
            RS.GameSpeed.Params.FPS = parseFloat(args[0] || 60);
            SceneManager._deltaTime = 1.0 / $.Params.FPS;
        }
    };
})();
