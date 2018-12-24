/*:
 * @plugindesc This plugin allows you to set timed weather effects.
 * @author biud436
 *
 * @param default S Power
 * @type number
 * @desc 'S Power' means 'The starting power' between the linear interpolant.
 * @default 0
 *
 * @param default E Power
 * @type number
 * @desc 'E Power' means 'The end power' between the linear interpolant.
 * @default 0
 *
 * @param formula1
 * @desc it means the linear interpolation formula for Quadratic Bézier curves.
 * @default a + t * (b - a)
 *
 * @param formula2
 * @desc it means the linear interpolation formula for Quadratic Bézier curves.
 * @default b + t * (c - b)
 *
 * @param formula3
 * @desc it means the linear interpolation formula for Quadratic Bézier curves.
 * @default d + t * (e - d)
 *
 * @help
 * ============================================================================
 * Plugin Command
 * ============================================================================
 * This plugin allows you to control the weather effect by using a math method 
 * called 'Quadratic Bézier curves', it means the linear interpolation. 
 * 
 * We need to set three formulas. 
 * Those formulas use importantly in the Quadratic Bézier curves.
 * 
 * TimedWeatherEffect start type power duration
 *    - type : specify the weather type is to string. 
 *             those types are the same as none, rain, storm, snow.
 *    - power : the power value is a number between 0 and 9.
 *    - duration : the weather duration. it speicfies the the duration value by the frame unit.
 *               So the value called 60 is the same as 1 second on powerful devices such as 
 *               PC and Mac, phones. (60 frame = 1sec)
 * 
 * those variables are private so it can't change directly but you can change it through plugin command. 
 * 
 * TimedWeatherEffect setPower start end
 *     - start : change the value called 'S Power' means the starting power in the Quadratic Bézier curves.
 *     - end : change the value called 'E Power' means the end power in the Quadratic Bézier curves.
 * those variables are private so it can't change directly but you can change it through plugin command. 
 * 
 * TimedWeatherEffect setFormula1 fx
 * TimedWeatherEffect setFormula2 fx
 * TimedWeatherEffect setFormula3 fx
 *    - fx : the fx means a formula.
 * 
 * So, we can use it, as follows.
 * 
 * TimedWeatherEffect setFormula1 a + t * (b - a)
 * TimedWeatherEffect setFormula2 b + t * (c - b)
 * TimedWeatherEffect setFormula3 d + t * (e - d)
 * 
 * the value called 'a' is the same as the 'S Power'.
 * the value called 'b' means the power value.
 * the value called 'c' is the same as the 'E Power'.
 * the value called 'd' is a result value of the formula 1 (linear interpolation).
 * the value called 'e' is a result value of the formula 2 (linear interpolation).
 * 
 * ============================================================================
 * Version Log
 * ============================================================================
 * 2016.07.24 (v1.0.0) - First Release.
 * 2018.12.24 (v1.0.1) : 
 * - Fixed the bug that is not working.
 * - Added descriptions.
 */
/*:ko
 * @plugindesc 날씨 효과의 강도를 곡선 형태로 부드럽게 가속하거나 감속을 합니다.
 * @author 러닝은빛(biud436)
 *
 * @param default S Power
 * @text 시작점의 강도
 * @type number
 * @desc 곡선을 만들 때 필요한 값입니다.
 * @default 0
 *
 * @param default E Power
 * @text 종단점의 강도
 * @type number
 * @desc  곡선을 만들 때 필요한 값입니다.
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
 * 플러그인 명령에 대해...
 * ============================================================================
 * 
 * ## 날씨 효과 시작하기
 * TimedWeatherEffect start type power duration
 *  - type : 날씨의 유형. none, rain, storm, snow 등이 있습니다.
 *  - power : 날씨 표현의 강도. 0에서 9까지의 범위로 설정이 가능합니다. 
 *            이 값이 높으면 스프라이트가 더 많아집니다.
 *  - duration : 프레임 단위로 지정하세요.
 * 
 * ## 시작점 강도 , 종단점의 강도 설정하기
 *  : 시작점에서부터 종단점까지 곡선으로 형성됩니다.
 * 
 * TimedWeatherEffect setPower start end
 *  - start : 숫자 값입니다. 
 *  - end :  숫자 값입니다. 
 * 
 * ## 2차 베지어 곡선 주요 수식 변경하기
 * TimedWeatherEffect setFormula1 fx
 * TimedWeatherEffect setFormula2 fx
 * TimedWeatherEffect setFormula3 fx
 *  - fx : fx에는 a + t * (b - a) 와 같은 방정식을 작성하세요. 
 *         a, b, c, d, e, t 등은 데미지 공식과 같이 내부에서 치환됩니다.
 *         a는 시작점의 강도입니다.
 *         b는 _weatherPowerTarget에는 power 값이 들어오게 됩니다.
 *         c는 종단점의 강도입니다.
 *         d는 2차 베지어 곡선을 위한 함수 #1 문자열입니다.
 *         e는 2차 베지어 곡선을 위한 함수 #2 문자열입니다.
 * 
 * ============================================================================
 * 변동 사항
 * ============================================================================
 * 2016.07.24 (v1.0.0) - First Release.
 * 2018.12.24 (v1.0.1) : 
 * - Fixed the bug that is not working.
 * - Added descriptions.
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
        type = args[1];
        power = Number(args[2]);
        duration = Number(args[3]);
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
