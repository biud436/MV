/*:
 * RS_Game_Variables.js
 * @plugindesc Game_Variables SetMax
 * @author biud436
 * @date 2016.02.23
 *
 * @param Min
 * @desc Min
 * @default 0
 *
 * @param Max
 * @desc Max
 * @default 999
 *
 */

var RS = RS || {};
RS.Game_Variables = RS.Game_Variables || {};

(function() {

  var parameters = PluginManager.parameters('RS_GameVariables');
  RS.Game_Variables._min = Number(parameters['Min'] || 0);
  RS.Game_Variables._max = Number(parameters['Max'] || 999);

  Game_Variables.prototype.setValue = function(variableId, value) {
     if (variableId > 0 && variableId < $dataSystem.variables.length) {
         if (typeof value === 'number') {
             value = Math.floor(value.clamp(RS.Game_Variables._min, RS.Game_Variables._max));
         }
         this._data[variableId] = value;
         this.onChange();
     }
  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "변수" || command === "Var") {
      switch (args[0].toLowerCase()) {
        case '최소값':
        case 'Min':
          RS.Game_Variables._min = Number(args[1] || 0);
          break;
        case '최대값':
        case 'Max':
          RS.Game_Variables._max = Number(args[1] || 999);
          break;
      }
    }
  };

})();
