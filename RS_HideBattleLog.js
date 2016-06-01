/*:
 * RS_HideBattleLog.js
 * @plugindesc This plugin provides function that shows or hides a battle log.
 * @author biud436
 *
 * @param Enabled
 * @desc
 * @default true
 *
 * @help
 * BattleLog show
 * BattleLog hide
 */

(function() {

  var parameters = PluginManager.parameters('RS_FollowerPassable');
  var enabled = Boolean(parameters['Enabled'] === 'true');

  var alias_Window_BattleLog_initialize =
    Window_BattleLog.prototype.initialize;

  Window_BattleLog.prototype.initialize = function() {
      alias_Window_BattleLog_initialize.call(this);
      this.visible = enabled;
  };

  //============================================================================
  // Game_Interpreter
  //
  //
  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "BattleLog") {
      switch (args[0].toLowerCase()) {
        case 'show':
          enabled = true;
        case 'hide':
          enabled = false;
          break;
      }
    }
  };

})();
