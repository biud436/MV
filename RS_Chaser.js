//================================================================
// RS_Chaser.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin provides functions that chases an event or the player
 * @author biud436
 *
 * @param Default Search Limit
 * @desc The default value is to 12
 * @default 12
 *
 * @help
 * =============================================================================
 * Script Functions
 * =============================================================================
 * this.chasePlayer(range)
 * this.chaseEvent(id, range)
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * Chase range x : Set the depth of the search.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.04.26 (v1.0.0) - First Release
 * 2016.07.16 (v1.0.1) - Fixed the variable called "_limit" for setting
 * the default value and added the plugin command that could set the depth of
 * the search.
 */
/*:ko
 * @target MV
 * @plugindesc 캐릭터나 플레이어를 추격합니다. 장애물도 피할 수 있습니다 (이동 AI 강화)
 * @author 러닝은빛(biud436)
 *
 * @param Default Search Limit
 * @text 기본 탐색 깊이 (칸 단위)
 * @desc 싱글 쓰레드 특성상 너무 높은 값을 지정하면 문제가 생길 수 있습니다 (기본 값은 12입니다)
 * @default 12
 *
 * @help
 * =============================================================================
 * 스크립트 호출에 대하여
 * =============================================================================
 * 다음 메서드는 수준 높은 추격 AI를 제공하며 장애물 등을 자동으로 피해갑니다.
 * 목표 지점까지 최단 거리로 이동합니다.
 *
 * range 내의 모든 칸을 검색하여 장애물이 있는 지 없는 지 확인하므로, 이 값이 높으면
 * 심각한 퍼포먼스 저하로 이어질 수 있습니다 (WebWorker라는 것도 있으나 DOM 접근 불가,
 * 전역 변수 접근 제한 등의 문제가 있어서 사용하지 않았습니다)
 *
 * 이는 알만툴 기본 이동 시스템에 있는 것으로,
 * 모든 이동 과정에 대한 노드를 저장하는 방식이 아니라 처음에 이동 할 방향만 제공합니다.
 *
 * 다음 함수는 이동할 방향을 구한 후 일보 전진하는 것을 래핑해놓은 메서드입니다.
 *
 * this.chasePlayer(range);
 * this.chaseEvent(id, range);
 *
 * 이동 루트의 설정에서 사용할 수 있습니다.
 *
 * =============================================================================
 * 플러그인 명령에 대하여
 * =============================================================================
 * 다음 플러그인 명령은 기본 탐색 깊이 값을 변경합니다.
 *
 * Chase range x : x는 숫자 값입니다.
 *
 * =============================================================================
 * 변경 사항
 * =============================================================================
 * 2016.04.26 (v1.0.0) - First Release
 * 2016.07.16 (v1.0.1) - Fixed the variable called "_limit" for setting
 * the default value and added the plugin command that could set the depth of
 * the search.
 */

(() => {
    const Imported = window.Imported || {};
    Imported.RS_Chaser = true;

    const parameters = PluginManager.parameters('RS_Chaser');
    let _limit = Number(parameters['Default Search Limit'] || 12);

    const alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function () {
        alias_Game_Event_initMembers.call(this);
        this._limit = _limit || 12;
    };

    Game_Event.prototype.searchLimit = function () {
        return this._limit;
    };

    Game_Event.prototype.chasePlayer = function (range) {
        this._limit = range || _limit;
        const { x, y } = $gamePlayer;
        const dir = this.findDirectionTo(x, y);
        if (dir !== 0) this.moveStraight(dir);
    };

    Game_Event.prototype.chaseEvent = function (id, range) {
        this._limit = range || _limit;
        const { x, y } = $gameMap.event(id);
        const dir = this.findDirectionTo(x, y);
        if (dir !== 0) this.moveStraight(dir);
    };

    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Chase') {
            switch (args[0].toLowerCase()) {
                case 'range':
                    _limit = Number(args[1] || 12);
                    break;
                default:
            }
        }
    };
})();
