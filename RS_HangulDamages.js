/*:
 * @plugindesc <RS_HangulDamages>
 * @author biud436
 * 
 * @param damageBitmapName
 * @text Damage bitmap name 
 * @desc
 * @require 1
 * @dir img/system/
 * @type file
 * @default Damage_1
 * 
 * @param hangulDigitsTable
 * @text Hangul digits table
 * @type note
 * @desc 
 * @default ""
 * 
 * @param hangulBaseRow
 * @text Hangul base row
 * @type number
 * @desc
 * @default 5
 * 
 * @param missBaseRow
 * @text Miss base row
 * @type number
 * @desc
 * @default 4
 * 
 * @help
 * 2018.07.07 (v1.0.0) - First Release
 */
/*:ko
 * @plugindesc <RS_HangulDamages>
 * @author biud436
 * 
 * @param damageBitmapName
 * @text 데미지 표시 비트맵 이름
 * @desc
 * @require 1
 * @dir img/system/
 * @type file
 * @default Damage_1
 * 
 * @param hangulDigitsTable
 * @text 한글 숫자 테이블
 * @type note
 * @desc 
 * @default ""
 * 
 * @param hangulBaseRow
 * @text Hangul base row
 * @type number
 * @desc
 * @default 5
 * 
 * @param missBaseRow
 * @text Miss base row
 * @type number
 * @desc
 * @default 4
 * 
 * @help
 * 2018.07.07 (v1.0.0) - First Release
 */

var Imported = Imported || {};
Imported.RS_HangulDamages = true;

var RS = RS || {};
RS.HangulDamages = RS.HangulDamages || {};
RS.HangulDamages.Params = RS.HangulDamages.Params || {};

(function($) {

    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_HangulDamages>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params.damageBitmapName = parameters["damageBitmapName"] || "Damage_1";

    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
          try { return $.jsonParse(v); } catch (e) { return v; }
        });
        return retData;
    };
    
    $.Params.WHERE_DIGITS_INDEX = {
        "천": 3,
        "만": 4,
        "억": 8,
        "조": 12,
        "경": 16
    };

    $.Params.WHERE_DIGITS = {
        3: "천",
        4: "만",
        8: "억",
        12: "조",
        16: "경"
    };

    $.Params.HANGUL_DIGITS_INDEX = $.jsonParse(parameters["hangulDigitsTable"]) || {
        "천": 0,
        "만": 1,
        "억": 2,
        "조": 3,
        "경": 4,
        "X": 6
    };

    $.Params.HANGUL_BASE_ROW = Number(parameters["hangulBaseRow"]) || 5;
    $.Params.MISS_BASE_ROW = Number(parameters["missBaseRow"]) || 4;

    Sprite_Damage.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._duration = 90;
        this._flashColor = [0, 0, 0, 0];
        this._flashDuration = 0;
        this._damageBitmap = ImageManager.loadSystem(RS.HangulDamages.Params.damageBitmapName);
    };

    Sprite_Damage.prototype.digitWidth = function(n) {
        n = n || 10;
        return this._damageBitmap ? this._damageBitmap.width / n : 0;
    };
    
    Sprite_Damage.prototype.digitHeight = function() {
        return this._damageBitmap ? this._damageBitmap.height / 6 : 0;
    };
    
    Sprite_Damage.prototype.createMiss = function() {
        var w = this.digitWidth();
        var h = this.digitHeight();
        var sprite = this.createChildSprite();
        sprite.setFrame(0, $.Params.MISS_BASE_ROW * h, 4 * w, h);
        sprite.dy = 0;
    };

    /**
     * 자릿수를 찾아서 배열을 늘린다.
     * @param {String} strings
     */
    Sprite_Damage.prototype.whereDigits = function(strings) {
        
        var digits = strings.split(/\.*/); // 배열로 변경
        var there = "";
        var len = strings.length;
        
        for(var i=0; i<len; i++) { // 만억조경 붙일 자리 찾기
            if(there = $.Params.WHERE_DIGITS[i]) { // 자릿수를 찾았다면 배열을 늘린다.
                var index = $.Params.WHERE_DIGITS_INDEX[there];
                digits.splice(len - index, 0, there, "X");
            }
        }

        return digits; // 늘린 배열을 반환한다.

    };
    
    Sprite_Damage.prototype.createDigits = function(baseRow, value) {
        var string = Math.abs(value).toString();
        var row = baseRow + (value < 0 ? 1 : 0);

        var w = this.digitWidth();
        var h = this.digitHeight();

        string = this.whereDigits(string); // 배열을 변환한다.

        for (var i = 0; i < string.length; i++) {
            var sprite = this.createChildSprite();
            var n = Number(string[i]);
            row = baseRow + (value < 0 ? 1 : 0);
            if(isNaN(n)) { // 만, 억, 조, 경
                row = $.Params.HANGUL_BASE_ROW;
                n = $.Params.HANGUL_DIGITS_INDEX[string[i]]; 
            }
            sprite.setFrame(n * w, row * h, w, h);
            sprite.x = (i - (string.length - 1) / 2) * w;
            sprite.dy = -i;             
        }
    };

})(RS.HangulDamages);