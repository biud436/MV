/*:
 * RS_Game_Variables.js
 * @plugindesc This plugin limits the max value of game variables.
 * @author biud436
 * @date 2016.02.23
 *
 * @param Min
 * @desc Sets the minimum values of all game variables
 * @default 0
 *
 * @param Max
 * @desc Sets the maximum values of all game variables
 * @default 999
 *
 * @help
 *
 * This plugin provides the following plugin commands.
 *
 * Var Max value
 * Var Min value
 *
 * - Change Log
 * 2016.02.23 (v1.0.0) - First Release
 * 2016.07.11 (v1.0.1) - In pluginCommand, Wrong Character Fixes.
 * 2017.02.03 (v1.0.2) - Fixed the variable name.
 */

var Imported = Imported || {};
Imported.RS_Game_Variables = true;

(function() {

  var parameters = PluginManager.parameters('RS_GameVariables');
  var min = Number(parameters['Min']);
  var max = Number(parameters['Max']);

  /**
   * @method setValue
   * override
   */
  Game_Variables.prototype.setValue = function(variableId, value) {
     if (variableId > 0 && variableId < $dataSystem.variables.length) {
         if (typeof(value) === 'number') {
             value = Math.floor(value.clamp(min, max));
         }
         this._data[variableId] = value;
         this.onChange();
     }
  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Var") {
      switch (args[0].toLowerCase()) {
        case 'min':
          min = Number(args[1] || 0);
          break;
        case 'max':
          max = Number(args[1] || 999);
          break;
      }
    }
  };

})();
