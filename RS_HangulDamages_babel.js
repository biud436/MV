/*:
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
 * @help
 * ===================================================================
 * Test Sripts
 * ===================================================================
 * var target = $gameTroop._enemies[0];
 * target.gainHp(-100101150);
 * BattleManager._logWindow.clear()
 * BattleManager._logWindow.displayHpDamage(target);
 * target.startDamagePopup();
 * ===================================================================
 * Change Log
 * ===================================================================
 * 2018.07.07 (v1.0.0) - First Release
 * 2018.07.08 (v1.0.1) : 
 * - 데미지 비트맵을 미리 불러옵니다.
 * - 표기법을 수 표기법 맞춤법에 맞춰 수정하였습니다.
 * 2018.08.30 (v1.0.2) - 속도가 더 향상되었습니다.
 */
/*:ko
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
 * @help
 * ===================================================================
 * 테스트 스크립트
 * ===================================================================
 * var target = $gameTroop._enemies[0];
 * target.gainHp(-100101150);
 * BattleManager._logWindow.clear()
 * BattleManager._logWindow.displayHpDamage(target);
 * target.startDamagePopup();
 * 
 * ===================================================================
 * Change Log
 * ===================================================================
 * 2018.07.07 (v1.0.0) - First Release
 * 2018.07.08 (v1.0.1) : 
 * - 데미지 비트맵을 미리 불러옵니다.
 * - 표기법을 수 표기법 맞춤법에 맞춰 수정하였습니다.
 * 2018.08.30 (v1.0.2) - 속도가 더 향상되었습니다.
 */

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Imported = Imported || {};
Imported.RS_HangulDamages = true;

var RS = RS || {};
RS.HangulDamages = RS.HangulDamages || {};
RS.HangulDamages.Params = RS.HangulDamages.Params || {};

(function ($) {

    "use strict";

    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_HangulDamages>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    //===================================================================
    // String
    //=================================================================== 

    String.prototype.toArray = function () {
        return this.split("");
    };

    String.prototype.reverse = function () {
        return this.toArray().reverse().join("");
    };

    String.prototype.toCommaAlpha = function () {
        return this.reverse().match(/.{1,4}/g).join(",").reverse();
    };

    //===================================================================
    // RS.HangulDamages
    //===================================================================      

    $.Params.damageBitmapName = parameters["damageBitmapName"] || "Damage_1";

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

    $.Params.HANGUL_DIGITS_INDEX = $.jsonParse(parameters["hangulDigitsTable"]) || {
        // "천": 0,
        "만": 1,
        "억": 2,
        "조": 3,
        "경": 4,
        "X": 6
    };

    $.Params.HANGUL_BASE_ROW = Number(parameters["hangulBaseRow"]) || 5;
    $.Params.MISS_BASE_ROW = Number(parameters["missBaseRow"]) || 4;

    //===================================================================
    // Sprite_HangulDamage
    //===================================================================  

    var Sprite_HangulDamage = function (_Sprite_Damage) {
        _inherits(Sprite_HangulDamage, _Sprite_Damage);

        function Sprite_HangulDamage() {
            _classCallCheck(this, Sprite_HangulDamage);

            var _this = _possibleConstructorReturn(this, (Sprite_HangulDamage.__proto__ || Object.getPrototypeOf(Sprite_HangulDamage)).call(this));

            _this._duration = 90;
            _this._flashColor = [0, 0, 0, 0];
            _this._flashDuration = 0;
            _this._damageBitmap = ImageManager.loadSystem(RS.HangulDamages.Params.damageBitmapName);
            _this.on("updateDirty", _this.updateDirty, _this);
            return _this;
        }

        _createClass(Sprite_HangulDamage, [{
            key: "digitWidth",
            value: function digitWidth(n) {
                n = n || 10;
                return this._damageBitmap ? this._damageBitmap.width / n : 0;
            }
        }, {
            key: "digitHeight",
            value: function digitHeight() {
                return this._damageBitmap ? this._damageBitmap.height / 6 : 0;
            }
        }, {
            key: "createMiss",
            value: function createMiss() {
                var w = this.digitWidth();
                var h = this.digitHeight();
                var sprite = this.createChildSprite();
                sprite.setFrame(0, $.Params.MISS_BASE_ROW * h, 4 * w, h);
                sprite.dy = 0;
            }
        }, {
            key: "whereDigits",
            value: function whereDigits(strings) {
                var digits = [];
                var ret = [];
                var len = 0;

                ret = strings.toCommaAlpha().split(",");
                len = ret.length;

                for (var i = 0; i < len; i++) {
                    var n = Number(ret[i]);
                    // '한글 맞춤법' 제5장 띄어쓰기, 제2절, 제44항에 의하면, 수를 표기할 때,
                    // '12억 3456만 7898', '3243조 7867억 8927만 6354'와 같이 표기해야 한다.
                    // '12억 7898'에서 만 단위가 없을 수도 있다.
                    if (n === 0 || !n) continue;
                    digits.push(n);
                    if (len - 1 !== i) {
                        // 천 단위 생략
                        switch (i) {
                            case len - 2:
                                digits.push("만"); // 만(萬) means 10,000 (10^4)
                                break;
                            case len - 3:
                                digits.push("억"); // 억(億) means 100,000,000 (10^8)
                                break;
                            case len - 4:
                                digits.push("조"); // 조(兆) means 1,000,000,000,000 (10^12)
                                break;
                            case len - 5:
                                digits.push("경"); // 경(京) means 10,000,000,000,000,000 (10^16)
                                break;
                        }
                        digits.push("X"); // 띄어쓰기 추가
                    }
                }

                return digits.join(""); // 문자열로 변환
            }
        }, {
            key: "updateDirty",
            value: function updateDirty(string, baseRow, value, row, w, h) {
                return setTimeout(function () {
                    for (var i = 0; i < string.length; i++) {
                        var sprite = this.createChildSprite();
                        var n = Number(string[i]);
                        row = baseRow + (value < 0 ? 1 : 0);
                        if (isNaN(n)) {
                            // 만, 억, 조, 경
                            row = RS.HangulDamages.Params.HANGUL_BASE_ROW;
                            n = RS.HangulDamages.Params.HANGUL_DIGITS_INDEX[string[i]];
                        }
                        sprite.setFrame(n * w, row * h, w, h);
                        sprite.x = (i - (string.length - 1) / 2) * w;
                        sprite.dy = -i;
                    }
                }.bind(this), 0);
            }
        }, {
            key: "createDigits",
            value: function createDigits(baseRow, value) {
                var string = Math.abs(value).toString();
                var row = baseRow + (value < 0 ? 1 : 0);

                var w = this.digitWidth();
                var h = this.digitHeight();

                string = this.whereDigits(string); // 배열을 변환한다.
                this.emit("updateDirty", string, baseRow, value, row, w, h);
            }
        }]);

        return Sprite_HangulDamage;
    }(Sprite_Damage);

    window.Sprite_Damage = Sprite_HangulDamage;

    //===================================================================
    // Scene_Boot
    //===================================================================

    var alias_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function () {
        alias_Scene_Boot_loadSystemImages.call(this);
        ImageManager.reserveSystem($.Params.damageBitmapName);
    };
})(RS.HangulDamages);