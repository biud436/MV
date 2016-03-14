/*:
 * @plugindesc Window_ChoiceListPosition.js
 * @author biud436
 *
 * @param x
 * @desc x
 * @default 0
 *
 * @param y
 * @desc y
 * @default 0
 *
 * @help
 *
 * - Plugin Command
 *
 * Choice pos x y
 * Choice enable
 * Choice disable
 *
 */

(function() {

  var parameters = PluginManager.parameters('Window_ChoiceListPosition');
  var mx = Number(parameters['x']);
  var my = Number(parameters['y']);
  var enabled = true;

  var alias_Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
      alias_Window_ChoiceList_updatePlacement.call(this);
       if(enabled) this.setCustomPosition();
  };

  Window_ChoiceList.prototype.setCustomPosition = function() {
      this.x = mx;
      this.y = my;
  }

  //===========================================================================
  // Game_Interpreter
  //===========================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Choice") {
        switch(args[0]) {
          case 'pos':
            mx = Number(args[1]);
            my = Number(args[2]);
            break;
          case 'enable':
            enabled = true;
            break;
          case 'disable':
            enabled = false;
            break;
        }
      }
  };

})()
