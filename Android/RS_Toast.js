//=============================================================================
// RS_Toast.js
//=============================================================================

/*:
 * @plugindesc This plugin displays the toast on Android.
 * Android Toast
 * @author biud436
 * @date 2015.12.30
 *
 * @help
 * ============================================================================
 * How to Setup
 * ============================================================================
 * You can refer to the following link.
 * Link - http://biud436.tistory.com/20
 *
 * ============================================================================
 * Script
 * ============================================================================
 * You can refer to the following code.
 *
 * Toast.makeText("message", false);    # this displays the toast message for 2 seconds.
 * Toast.makeText("message", true);     # this displays the toast message for 4 seconds.
 *
 * ============================================================================
 * Plugin Command
 * ============================================================================
 * Toast S string     # display the toast message for 2 seconds.
 * Toast L string     # display the toast message for 4 seconds.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2015.12.30 - First Release
 * 2016.03.21 - Fixed the method called pluginCommand.
 */

var Imported = Imported || {};
Imported.Toast = true;

(function() {

  if((!!window.Toast) === false) {
    function NwjsInterface_Toast() {
      throw new Error("This is a static class");
    }
    NwjsInterface_Toast.makeText = function (text, duration) {
      console.warn('Toast object is not defined.');
    }
    window.Toast = NwjsInterface_Toast;
  };

  var alias_gameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_gameInterpreter_pluginCommand.call(this, command, args);
      if(command === "Toast") {
        switch (args[0]) {
          // this displays the toast message for 2 seconds.
          case 'S':
            var message = args.slice(2).join("");
            if(!!Toast.makeText) Toast.makeText(message, false);
            break;
          // this displays the toast message for 4 seconds.
          case 'L':
            var message = args.slice(2).join("");
            if(!!Toast.makeText) Toast.makeText(message, true);
            break;
        }
      }
  };

})();
