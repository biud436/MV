//================================================================
// RS_HideBattleLog.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
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
 * 2016.05.31 (v1.0.0) - First Release.
 * 2017.02.03 (v1.0.1) - Fixed the document comment.
 */
/*:ko
 * @plugindesc 전투 로그 창을 숨기거나 표시하는 기능을 제공합니다.
 * @author biud436
 *
 * @param Enabled
 * @text 전투 로그 활성화 여부
 * @type boolean
 * @desc true이면 전투 로그 창이 표시되며, 아니면 표시되지 않습니다.
 * @default true
 *
 * @help
 * ======================================================================
 * 플러그인 명령에 대해...
 * ======================================================================
 * 각 명령은 전투 로그 창을 토글하기 위한 기능입니다. 
 *
 * BattleLog show
 * BattleLog hide
 * 
 * show는 전투 로그 창을 표시하고, hide는 숨기게 됩니다.
 * 
 * ======================================================================
 * 변동 사항
 * ======================================================================
 * 2016.05.31 (v1.0.0) - First Release.
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
