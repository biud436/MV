//================================================================
// RS_FollowerPassable.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

/*:
 * RS_FollowerPassable.js
 * @target MV
 * @plugindesc If you are using this plugin, the player will be impossible to pass other party members.
 * @author biud436
 *
 * @param Enabled
 * @type boolean
 * @default true
 *
 * @param Separate Mode
 * @type boolean
 * @default false
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 *
 * FollowerPassable passable true
 * FollowerPassable SeparateMode true
 *
 * The following commands could use in separate mode only.
 *
 * FollowerPassable setOpacity index x
 * FollowerPassable setBlendMode index x
 * FollowerPassable setMoveSpeed index x
 * FollowerPassable setDirectionFix index x
 * FollowerPassable setTransparent index x
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.06.01 (v1.0.0) - First Release.
 * 2016.09.01 (v1.0.4) - Added Plugin Commands
 * 2016.09.01 (v1.0.5) - Fixed the bug.
 */
/*:ko
 * @target MV
 * @plugindesc 플레이어가 파티원을 통과할 수 없게 됩니다.
 * @author 러닝은빛(biud436)
 *
 * @param Enabled
 * @text 활성화 여부
 * @type boolean
 * @desc 플러그인을 시작부터 활성화할 지 여부를 설정합니다. 나중에 바꿀 수 있습니다.
 * @default true
 *
 * @param Separate Mode
 * @text 세퍼레이츠 모드 적용
 * @type boolean
 * @desc 플레이어의 이동 타입, 이동 유형, 투명도를 물려받지 않고 개별적으로 설정합니다.
 * @default false
 *
 * @help
 * =============================================================================
 * 플러그인 명령에 대해
 * =============================================================================
 *
 * 플레이어가 파티원을 통과할 수 없게 설정할 수 있습니다.
 *
 * FollowerPassable passable false
 *
 * 파티원들은 플레이어의 이동 타입, 이동 유형, 투명도를 물려받아서 플레이어와 같은 속도로
 * 이동합니다.
 *
 * 이 플러그인 명령으로 세퍼레이츠 모드를 적용하면 따로 놀게 만들 수 있습니다.
 *
 * FollowerPassable SeparateMode true
 *
 * 다음 플러그인 명령은 세퍼레이츠 모드가 적용되었을 때에만 실행됩니다.
 * index는 Follower 배열 상의 파티원 인덱스이며, x는 숫자 값입니다.
 *
 * FollowerPassable setOpacity index x
 * FollowerPassable setBlendMode index x
 * FollowerPassable setMoveSpeed index x
 *
 * index는 Follower 배열 상의 파티원 인덱스이며, x는 부울(true 또는 false) 값입니다.
 *
 * FollowerPassable setDirectionFix index x
 * FollowerPassable setTransparent index x
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.06.01 (v1.0.0) - First Release.
 * 2016.09.01 (v1.0.4) - Added Plugin Commands
 * 2016.09.01 (v1.0.5) - Fixed the bug.
 */

(() => {
    const parameters = PluginManager.parameters('RS_FollowerPassable');
    let passable = Boolean(parameters.Enabled === 'true');
    let isSeparate = Boolean(parameters['Separate Mode'] === 'true');

    const KIT = Object.assign(
        Object.create({
            fpSendMessage: (index, func, args) => {
                const callFunc = $gamePlayer.followers().follower(index);
                callFunc[func].apply(callFunc, [args]);
            },
        })
    );

    //============================================================================
    // Game_Player

    const aliasGamePlayerCanPass = Game_Player.prototype.canPass;
    Game_Player.prototype.canPass = function (x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (this.isFollowerPassable(x2, y2) && passable) {
            return false;
        }
        return aliasGamePlayerCanPass.call(this, x, y, d);
    };

    Game_Player.prototype.isFollowerPassable = function (x, y) {
        return this._followers.isFollowerPassable(x, y);
    };

    const aliasGameFollowerInitialize = Game_Follower.prototype.initialize;
    Game_Follower.prototype.initialize = function (memberIndex) {
        aliasGameFollowerInitialize.call(this, memberIndex);
        this.setThrough(false);
    };

    Game_Follower.prototype.update = function () {
        Game_Character.prototype.update.call(this);
        if (!isSeparate) {
            this.setMoveSpeed($gamePlayer.realMoveSpeed());
            this.setOpacity($gamePlayer.opacity());
            this.setBlendMode($gamePlayer.blendMode());
            this.setWalkAnime($gamePlayer.hasWalkAnime());
            this.setStepAnime($gamePlayer.hasStepAnime());
            this.setDirectionFix($gamePlayer.isDirectionFixed());
            this.setTransparent($gamePlayer.isTransparent());
        }
    };

    Game_Followers.prototype.isFollowerPassable = function (x, y) {
        const result = this._data.some(follower => {
            return follower.posNt(x, y);
        });

        return result;
    };

    const aliasGameInterpreterPluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        aliasGameInterpreterPluginCommand.call(this, command, args);

        if (command === 'FollowerPassable') {
            switch (args[0]) {
                case 'enabled':
                case 'passable':
                    passable = Boolean(args[1] === 'true');
                    break;
                case 'SeparateMode':
                    isSeparate = Boolean(args[1] === 'true');
                    break;
                case 'setOpacity':
                    {
                        const n = Number(args[2] || 255);

                        KIT.fpSendMessage(
                            Number(args[1] || 0),
                            'setOpacity',
                            n.clamp(0, 255)
                        );
                    }
                    break;
                case 'setBlendMode':
                    {
                        const type = Number(args[2] || 0);
                        KIT.fpSendMessage(
                            Number(args[1] || 0),
                            'setBlendMode',
                            type.clamp(0, 3)
                        );
                    }
                    break;
                case 'setMoveSpeed':
                    KIT.fpSendMessage(
                        Number(args[1] || 0),
                        'setMoveSpeed',
                        type.clamp(1, 6)
                    );
                    break;
                case 'setDirectionFix':
                    KIT.fpSendMessage(
                        Number(args[1] || 0),
                        'setDirectionFix',
                        args[2] === 'true'
                    );
                    break;
                case 'setTransparent':
                    KIT.fpSendMessage(
                        Number(args[1] || 0),
                        'setTransparent',
                        args[2] === 'true'
                    );
                    break;
                default:
                    break;
            }
        }
    };
})();
