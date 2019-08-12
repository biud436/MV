//================================================================
// RS_Game_Variables.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

var Imported = Imported || {};
Imported.RS_Game_Variables = true;

/*:
 * @plugindesc This plugin allows you to setting the maximum value or minimum value in certain game variable. <RS_GameVariables>
 * @author biud436
 *
 * @param Settings
 * @type struct<GameVariable>[]
 * @desc Allows you to setting the maximum value or minimum value in certain game variable.
 * @default ["{\"variableId\":\"1\",\"min\":\"0\",\"max\":\"999\"}","{\"variableId\":\"2\",\"min\":\"0\",\"max\":\"999\"}"]
 *
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.02.23 (v1.0.0) - First Release
 * 2016.07.11 (v1.0.1) - In pluginCommand, Wrong Character Fixes.
 * 2017.02.03 (v1.0.2) - Fixed the variable name.
 * 2017.12.28 (v1.0.3) - Added a feature that can set them in the certain game variable only.
 */
/*~struct~GameVariable:
 *
 * @param variableId
 * @text Variable ID
 * @type variable
 * @desc Specify the id for the game variable
 * @default 1
 *
 * @param min
 * @type number
 * @desc Sets the minimum values of all game variables
 * @default 0
 *
 * @param max
 * @type number
 * @desc Sets the maximum values of all game variables
 * @default 999
 *
 */
/*:ko
 * @plugindesc 특정 변수 값에 최소, 최대 범위를 설정합니다. <RS_GameVariables>
 * @author 러닝은빛(biud436)
 *
 * @param Settings
 * @type struct<GameVariable>[]
 * @desc 범위를 적용 할 변수 목록을 새로 만들 수 있습니다.
 * @default ["{\"variableId\":\"1\",\"min\":\"0\",\"max\":\"999\"}","{\"variableId\":\"2\",\"min\":\"0\",\"max\":\"999\"}"]
 *
 * @help
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.02.23 (v1.0.0) - First Release
 * 2016.07.11 (v1.0.1) - In pluginCommand, Wrong Character Fixes.
 * 2017.02.03 (v1.0.2) - Fixed the variable name.
 * 2017.12.28 (v1.0.3) - Added a feature that can set them in the certain game variable only.
 */
/*~struct~GameVariable:ko
 *
 * @param variableId
 * @text Variable ID
 * @type variable
 * @desc 범위를 적용 할 변수의 ID 값입니다.
 * @default 1
 *
 * @param min
 * @text 최소 값
 * @type number
 * @desc 최소 값을 설정하십시오.
 * @default 0
 *
 * @param max
 * @text 최대 값
 * @type number
 * @desc 최대 값을 설정하십시오.
 * @default 999
 *
 */

var RS = RS || {};
RS.Utils = RS.Utils || {};

(function() {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_GameVariables>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  var _settings = RS.Utils.jsonParse(parameters["Settings"]);

  Game_Variables.prototype.setValue = function(variableId, value) {
    if (variableId > 0 && variableId < $dataSystem.variables.length) {
       if (typeof(value) === 'number') {

         var data, desc;

         // Find the variable id at the settings object.
         data = _settings.filter(function (e, i, a) {
           return parseInt(e.variableId) === variableId;
         }, this);

        // if it finds its id, it will be limited it.
         if(data instanceof Array && typeof(data[0]) === 'object') {
           desc = data[0];
           value = Math.floor(value.clamp(Number(desc.min), Number(desc.max) ));
         }

       }

       this._data[variableId] = value;
       this.onChange();

    }
  };

})();
