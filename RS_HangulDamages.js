/* eslint-disable no-continue */
/* eslint-disable no-extend-native */
//================================================================
// RS_HangulDamages.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to indicate the damage digits using Korean language <RS_HangulDamages>
 * @author biud436
 *
 * @param damageBitmapName
 * @text Damage bitmap name
 * @desc When you are deploying the game, we need to that doesn't remove the image that this plugin uses.
 * @require 1
 * @dir img/system/
 * @type file
 * @default Damage_1
 *
 * @param hangulDigitsTable
 * @text Hangul digits table
 * @type note
 * @desc allows you to consist of Hangul Digits Table.
 * @default ""
 *
 * @param hangulBaseRow
 * @text Hangul base row
 * @type number
 * @desc Specify the line index of the numeral adjective for Korean Hangul in the default image.
 * @default 5
 *
 * @param missBaseRow
 * @text Miss base row
 * @type number
 * @desc Specify the line index of image for MISS in the default image.
 * @default 4
 *
 * @param bounceLevel
 * @text Bounce Level
 * @type number
 * @desc if the digits is too high, the damage sprite can bounce off far.
 * @default 5
 * @min 0
 *
 * @help
 * ===================================================================
 * Test Script
 * ===================================================================
 * Note that Korean damage text will not show up until the damage value
 * must exceed at least 10,000 or more.
 *
 *  var target = $gameTroop._enemies[0];
 *  target.gainHp(-100101150);
 *  BattleManager._logWindow.clear()
 *  BattleManager._logWindow.displayHpDamage(target);
 *  target.startDamagePopup();
 *
 * If you copy and enter the above a piece of the code into the console
 * during a battle, the damage sprite will be displayed.
 *
 * ===================================================================
 * How to specify Korean numeric table parameters
 * ===================================================================
 * The sprite sheet is filled with 10 numbers horizontally.
 *
 * You have to specify the index for each cell,
 * then the index value is specified a number value from 0 to 9.
 *
 * In the parameter called "Hangul digits table", you must specify a
 * JSON data as follows.
 *
 * Note the index value starts with 0.
 *
 * {
 *         "만": 1,
 *         "억": 2,
 *         "조": 3,
 *         "경": 4,
 *         "해": 5,
 *         "자": 6,
 *         "양": 7,
 *         "X": 8
 * }
 *
 * The text called "X" indicates an index of the empty cell in it.
 *
 * ===================================================================
 * Change Log
 * ===================================================================
 * 2018.07.07 (v1.0.0) - First Release
 * 2018.07.08 (v1.0.1) :
 * - 데미지 비트맵을 미리 불러옵니다.
 * - 표기법을 수 표기법 맞춤법에 맞춰 수정하였습니다.
 * 2018.08.30 (v1.0.2) - 속도가 더 향상되었습니다.
 * 2019.01.09 (v1.0.4) :
 * - 양(10^28) 까지 표시 가능
 * - 자릿수가 클수록 스프라이트가 더 높이 튀는 현상을 해결하였습니다.
 * 2019.06.13 (v1.0.8) :
 * - 기본으로 제공되는 이미지에 새로운 자릿수를 추가하였습니다.
 * - 지수 표현을 쓰지 않고 숫자 값을 그대로 표시합니다.
 * - 배틀 로그에도 한글 데미지 값이 적용됩니다.
 * - 스위치 문을 제거하였습니다.
 */
/*:ko
 * @target MV
 * @plugindesc 데미지를 수 표기법에 맞춰서 표시합니다 <RS_HangulDamages>
 * @author biud436
 *
 * @param damageBitmapName
 * @text 데미지 표시 비트맵 이름
 * @desc 데미지 표시 비트맵을 설정하여 게임 배포 시 제거되지 않게 합니다.
 * @require 1
 * @dir img/system/
 * @type file
 * @default Damage_1
 *
 * @param hangulDigitsTable
 * @text 한글 숫자 테이블
 * @type note
 * @desc 커스텀 한글 숫자 테이블을 설정할 수 있습니다. 지정하지 않으면 기본 값.
 * @default ""
 *
 * @param hangulBaseRow
 * @text Hangul base row
 * @type number
 * @desc 한국어 수사(數詞)가 있는 라인을 설정합니다. (만,억,조,경)
 * @default 5
 *
 * @param missBaseRow
 * @text Miss base row
 * @type number
 * @desc 미스 스프라이트가 있는 라인을 설정합니다.
 * @default 4
 *
 * @param bounceLevel
 * @text Bounce Level
 * @type number
 * @desc 자릿수 값이 클수록, 데미지 스프라이트가 더 높이 튀어오릅니다.
 * @default 5
 * @min 0
 *
 * @help
 * ===================================================================
 * 테스트 스크립트
 * ===================================================================
 * 데미지 값이 적어도 10,000은 초과해야 하므로,
 * 일반적으로 테스트가 불가하여
 * 테스트를 위해 다음과 같은 테스트 스크립트를 짰습니다.
 *
 * var target = $gameTroop._enemies[0];
 * target.gainHp(-100101150);
 * BattleManager._logWindow.clear()
 * BattleManager._logWindow.displayHpDamage(target);
 * target.startDamagePopup();
 *
 * 복사하여 전투 중 콘솔에 입력하면 데미지 스프라이트가 임의로 표시 됩니다.
 *
 * ===================================================================
 * 한글 숫자 테이블 매개변수 지정 방법
 * ===================================================================
 * 데미지 스프라이트 시트에서 숫자는 가로로 10개 배치되어있습니다.
 *
 * 한글 데미지 스프라이트도 이러한 규칙에 따르므로,
 * 각 셀(만, 억, 조, 경, 텅 빈)의 가로 인덱스를 지정을 해야 합니다.
 * 0부터 9까지 지정할 수 있습니다.
 *
 * 인덱스는 0부터 시작하지만, 천 단위는 생략하고 만 단위부터 시작하므로
 * 1부터 기입할 수 있습니다.
 *
 * {
 *         "만": 1,
 *         "억": 2,
 *         "조": 3,
 *         "경": 4,
 *         "해": 5,
 *         "자": 6,
 *         "양": 7,
 *         "X": 8
 * }
 *
 * 마지막 8은 띄어쓰기를 위한 텅 빈 셀을 나타냅니다.
 *
 * ===================================================================
 * Change Log
 * ===================================================================
 * 2018.07.07 (v1.0.0) - First Release
 * 2018.07.08 (v1.0.1) :
 * - 데미지 비트맵을 미리 불러옵니다.
 * - 표기법을 수 표기법 맞춤법에 맞춰 수정하였습니다.
 * 2018.08.30 (v1.0.2) - 속도가 더 향상되었습니다.
 * 2019.01.09 (v1.0.4) :
 * - 양(10^28) 까지 표시 가능
 * - 자릿수가 클수록 스프라이트가 더 높이 튀는 현상을 해결하였습니다.
 * 2019.06.13 (v1.0.8) :
 * - 기본으로 제공되는 이미지에 새로운 자릿수를 추가하였습니다.
 * - 지수 표현을 쓰지 않고 숫자 값을 그대로 표시합니다.
 * - 배틀 로그에도 한글 데미지 값이 적용됩니다.
 * - 스위치 문을 제거하였습니다.
 */

(() => {
    const RS = window.RS || {};
    RS.HangulDamages = RS.HangulDamages || {};
    RS.HangulDamages.Params = RS.HangulDamages.Params || {};

    let parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_HangulDamages>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    //===================================================================
    // String
    //===================================================================

    String.prototype.toArray = function () {
        return this.split('');
    };

    String.prototype.reverse = function () {
        return this.toArray().reverse().join('');
    };

    String.prototype.toCommaAlpha = function () {
        return this.reverse()
            .match(/.{1,4}/g)
            .join(',')
            .reverse();
    };

    //===================================================================
    // RS.HangulDamages
    //===================================================================

    RS.HangulDamages.Params.damageBitmapName =
        parameters.damageBitmapName || 'Damage_1';

    RS.HangulDamages.jsonParse = function (str) {
        const retData = JSON.parse(str, (k, v) => {
            try {
                return RS.HangulDamages.jsonParse(v);
            } catch (e) {
                return v;
            }
        });
        return retData;
    };

    RS.HangulDamages.Params.HANGUL_DIGITS_INDEX = RS.HangulDamages.jsonParse(
        parameters.hangulDigitsTable
    ) || {
        // "천": 0,
        만: 1,
        억: 2,
        조: 3,
        경: 4,
        해: 5,
        자: 6,
        양: 7,
        구: 8,
        간: 9,
        X: 10,
    };

    RS.HangulDamages.Params.HANGUL_DIGITS = [
        '천',
        '만',
        '억',
        '조',
        '경',
        '해',
        '자',
        '양',
        '구',
        '간',
    ];

    RS.HangulDamages.Params.HANGUL_BASE_ROW =
        Number(parameters.hangulBaseRow) || 5;
    RS.HangulDamages.Params.MISS_BASE_ROW = Number(parameters.missBaseRow) || 4;
    RS.HangulDamages.Params.bounceLevel = Number(parameters.bounceLevel || 0);

    //===================================================================
    // Sprite_HangulDamage
    //===================================================================

    class Sprite_HangulDamage extends Sprite_Damage {
        constructor() {
            super();
            this._duration = 90;
            this._flashColor = [0, 0, 0, 0];
            this._flashDuration = 0;
            this._damageBitmap = ImageManager.loadSystem(
                RS.HangulDamages.Params.damageBitmapName
            );
            this.on('updateDirty', this.updateDirty, this);
        }

        digitWidth(n) {
            n = n || 10;
            return this._damageBitmap ? this._damageBitmap.width / n : 0;
        }

        digitHeight() {
            return this._damageBitmap ? this._damageBitmap.height / 6 : 0;
        }

        createMiss() {
            const w = this.digitWidth();
            const h = this.digitHeight();
            const sprite = this.createChildSprite();
            sprite.setFrame(
                0,
                RS.HangulDamages.Params.MISS_BASE_ROW * h,
                4 * w,
                h
            );
            sprite.dy = 0;
        }

        static whereDigits(strings) {
            const digits = [];
            let numberString = [];
            let len = 0;

            numberString = strings.toCommaAlpha().split(',');
            len = numberString.length;

            numberString = numberString.reverse();

            for (let i = 0; i < len; i++) {
                const n = Number(numberString[i]);
                if (n === 0 || !n) {
                    continue;
                }

                if (i === 0) {
                    continue;
                }

                const currentChar = RS.HangulDamages.Params.HANGUL_DIGITS[i];
                if (currentChar !== '') {
                    digits.push(n + currentChar);
                }
            }

            return digits.reverse().join('X');
        }

        updateDirty(string, baseRow, value, row, w, h) {
            return setTimeout(
                function () {
                    for (let i = 0; i < string.length; i++) {
                        const sprite = this.createChildSprite();
                        let n = Number(string[i]);
                        row = baseRow + (value < 0 ? 1 : 0);
                        if (Number.isNaN(n)) {
                            // 만, 억, 조, 경
                            row = RS.HangulDamages.Params.HANGUL_BASE_ROW;
                            n =
                                RS.HangulDamages.Params.HANGUL_DIGITS_INDEX[
                                    string[i]
                                ];
                        }
                        sprite.setFrame(n * w, row * h, w, h);
                        sprite.x = (i - (string.length - 1) / 2) * w;
                        sprite.dy = -i.clamp(
                            0,
                            RS.HangulDamages.Params.bounceLevel
                        );
                    }
                }.bind(this),
                0
            );
        }

        createDigits(baseRow, value) {
            // 큰 숫자 값 표기를 위해 사용.
            const Formatter = new Intl.NumberFormat('ko-KR', {
                useGrouping: false,
            });
            let string = Formatter.format(Math.abs(value));

            const row = baseRow + (value < 0 ? 1 : 0);

            const w = this.digitWidth();
            const h = this.digitHeight();

            string = Sprite_HangulDamage.whereDigits(string); // 배열을 변환한다.
            this.emit('updateDirty', string, baseRow, value, row, w, h);
        }
    }

    window.Sprite_Damage = Sprite_HangulDamage;

    //===================================================================
    // Window_BattleLog
    //===================================================================

    Window_BattleLog.prototype.whereDigits = function (strings) {
        const digits = [];
        let numberString = [];
        let len = 0;
        const Formatter = new Intl.NumberFormat('ko-KR', {
            useGrouping: false,
        });

        strings = Formatter.format(Math.abs(strings));

        numberString = strings.toCommaAlpha().split(',');
        len = numberString.length;

        numberString = numberString.reverse();

        for (let i = 0; i < len; i++) {
            const n = Number(numberString[i]);
            if (n === 0 || !n) continue;

            if (i === 0) continue;

            const currentChar = RS.HangulDamages.Params.HANGUL_DIGITS[i];
            if (currentChar !== '') {
                digits.push(n + currentChar);
            }
        }

        return digits.reverse().join(' ');
    };

    Window_BattleLog.prototype.makeHpDamageText = function (target) {
        const result = target.result();
        const damage = result.hpDamage;
        const isActor = target.isActor();

        let fmt;

        if (damage > 0 && result.drain) {
            fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
            return fmt.format(target.name(), TextManager.hp, damage);
            // eslint-disable-next-line no-else-return
        } else if (damage > 0) {
            fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
            return fmt.format(
                target.name(),
                Sprite_HangulDamage.whereDigits(damage)
            );
        } else if (damage < 0) {
            fmt = isActor
                ? TextManager.actorRecovery
                : TextManager.enemyRecovery;
            return fmt.format(target.name(), TextManager.hp, -damage);
        } else {
            fmt = isActor
                ? TextManager.actorNoDamage
                : TextManager.enemyNoDamage;
            return fmt.format(target.name());
        }
    };

    //===================================================================
    // Scene_Boot
    //===================================================================

    const aliasSceneBootLoadSystemImages = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function () {
        aliasSceneBootLoadSystemImages.call(this);
        ImageManager.reserveSystem(RS.HangulDamages.Params.damageBitmapName);
    };
})();
