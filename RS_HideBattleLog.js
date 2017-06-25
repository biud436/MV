/*:
 * RS_HideBattleLog.js
 * @plugindesc This plugin provides function that shows or hides a battle log.
 * @author biud436
 *
 * @param Enabled
 * @type boolean
 * @desc If this is enabled, the log window shows up. if not, it hides.
 * @default true
 *
 * @help
 * There are two plugin commands,
 * the 'show' command allows players to show up the log window,
 * the 'hide' command allows players to hide the log window.
 *
 * BattleLog show
 * BattleLog hide
 * ======================================================================
 * Change log
 * ======================================================================
 * 2017.02.03 (v1.0.1) - Fixed the document comment.
 */

 var Imported = Imported || {};
 Imported.RS_HideBattleLog = true;

(function() {

  var parameters = PluginManager.parameters('RS_HideBattleLog');
  var enabled = Boolean(parameters['Enabled'] === 'true');

  var alias_Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;

  Window_BattleLog.prototype.initialize = function() {
    alias_Window_BattleLog_initialize.call(this);
    this.visible = enabled;
  };

  //============================================================================
  // Game_Interpreter
  //
  //
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
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
