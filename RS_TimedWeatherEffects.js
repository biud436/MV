/*:
 * RS_TimedWeatherEffects.js
 * @plugindesc This plugin allows you to set timed weather effects.
 * @author biud436
 *
 * @param default S Power
 * @desc
 * @default 0
 *
 * @param default E Power
 * @desc
 * @default 0
 *
 * @param formula1
 * @desc
 * @default a + t * (b - a)
 *
 * @param formula2
 * @desc
 * @default b + t * (c - b)
 *
 * @param formula3
 * @desc
 * @default d + t * (e - d)
 *
 * @help
 * ============================================================================
 * Plugin Command
 * ============================================================================
 * TimedWeatherEffect start type power duration
 * TimedWeatherEffect setPower start end
 * TimedWeatherEffect setFormula1 fx
 * TimedWeatherEffect setFormula2 fx
 * TimedWeatherEffect setFormula3 fx
 * ============================================================================
 * Version Log
 * ============================================================================
 * 2016.07.24 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_TimedWeatherEffects = true;

(function () {

  var parameters = PluginManager.parameters('RS_TimedWeatherEffects');
  var defaultSPower = Number(parameters['default S Power'] || 0);
  var defaultEPower = Number(parameters['default E Power'] || 0);
  var formula1 = parameters['formula1'] || 'a + t * (b - a)';
  var formula2 = parameters['formula2'] || 'b + t * (c - b)';
  var formula3 = parameters['formula3'] || 'd + t * (e - d)';
  var type, power, duration;

  Game_Screen.prototype.updateWeather = function() {
      if (this._weatherDuration > 0) {
          var a,b,c,d,p;
          a = defaultSPower;
          b = this._weatherPowerTarget;
          c = defaultEPower;
          t = (this._weatherDuration--) / 1000.0;
          d = eval(formula1);
          e = eval(formula2);
          p = eval(formula3);
          this._weatherPower = p;
          if (this._weatherDuration === 0 && this._weatherPowerTarget === 0) {
              this._weatherType = 'none';
          }
      }
  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "TimedWeatherEffect") {
      switch (args[0]) {
      case 'start':
        type = Number(args[1]);
        power = Number(args[1]);
        duration = Number(args[2]);
        $gameScreen.changeWeather(type, power, duration);
        break;
      case 'setPower':
        defaultSPower = Number(args[1] || 0);
        defaultEPower = Number(args[2] || 0);
        break;
      case 'setFormula1':
        formula1 = args.slice(1).join(' ');
        break;
      case 'setFormula2':
        formula2 = args.slice(1).join(' ');
        break;
      case 'setFormula3':
        formula3 = args.slice(1).join(' ');
        break;
      }
    }
  };


})();
