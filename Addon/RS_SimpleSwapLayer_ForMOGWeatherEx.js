/*:
 * @plugindesc This plugin allows you to change that the weather layer shows above the Picture layer.
 * @author biud436
 * @help
 * =================================================================
 * How to use
 * =================================================================
 * Once downloaded the only setup we need to do is
 * to insert this plugin somewhere below MOG_Weather_EX plugin
 * =================================================================
 * Version Log
 * =================================================================
 * 2018.05.09 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc 그림 위에 날씨 효과가 나오게 됩니다.
 * @author biud436
 * @help
 * =================================================================
 * 사용법
 * =================================================================
 * 플러그인 관리자에서 MOG_Weather_EX 플러그인 밑 어딘가에 추가하세요.
 * =================================================================
 * Version Log
 * =================================================================
 * 2018.05.09 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_SimpleSwapLayer_ForMOGWeatherEx = true;

(function () {
  if (!Imported.MOG_Weather_EX) {
    return;
  }

  Spriteset_Map.prototype.swapWeatherLayer = function () {
    this._baseSprite.removeChild(this._WeatherPlane);
    this.removeChild(this._pictureContainer);
    this._baseSprite.addChild(this._pictureContainer);
    this._baseSprite.addChild(this._WeatherPlane);
  };

  var alias_Spriteset_Map_createUpperLayer =
    Spriteset_Map.prototype.createUpperLayer;
  Spriteset_Map.prototype.createUpperLayer = function () {
    alias_Spriteset_Map_createUpperLayer.call(this);
    this.swapWeatherLayer();
  };
})();
