/*:
 * @plugindesc <RS_WindowBuilder>
 * @author biud436
 *
 * @param Life Time
 * @type number
 * @desc a millisecond
 * @default 10000
 * @min 1000
 *
 * @help
 * If you would like to add is the ability to create the window automatically,
 * You could use this plugin to make the new windows
 * and then assign it to the current scene.
 *
 * You type a new code to create the window as follows!
 *
 *    new Window_Base(0, 0, 200, 96).builder("안녕하세요?", 0, 0);
 *
 * You are going to pass a first parameter is desired text in the function
 * called 'builder'. It is the text string that would draw on the window.
 * The next two parameters are the internal coordinates such as x and y.
 *
 * You can also use the plugin commands as follows :
 *
 *    WindowBuilder event event_id offset_x offset_y text
 *
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2018.01.30 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc 창을 화면에 바로 생성할 수 있습니다 <RS_WindowBuilder>
 * @author biud436
 *
 * @param Life Time
 * @text 라이프 타임 
 * @type number
 * @desc 밀리초 단위로 입력하시기 바랍니다.
 * @default 10000
 * @min 1000
 *
 * @help
 * 
 * 사용 방법은 굉장히 간단합니다.
 * 
 * 스크립트 커맨드에 다음 코드를 기입하세요.
 *
 *    new Window_Base(0, 0, 200, 96).builder("안녕하세요?", 0, 0);
 *
 * builder 메서드를 이용하면 화면에 텍스트를 바로 띄울 수 있습니다.
 * 
 * 특정 이벤트에 창을 붙일 수 있는 플러그인 명령도 제공합니다.
 *
 *    WindowBuilder event event_id offset_x offset_y text
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2018.01.30 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_WindowBuilder = true;

var RS = RS || {};
RS.WindowBuilder = RS.WindowBuilder || {};

(function ($) {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_WindowBuilder>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var alias_Window_Base_initialize = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function (x, y, width, height) {
    alias_Window_Base_initialize.call(this, x, y, width, height);
    return this;
  };

  Window_Base.prototype.builder = function () {
    var scene = SceneManager._scene;
    var text = "";
    var x = 0;
    var y = 0;

    var dest = new Point(this.x, this.y);
    var starting = new Point(this.width, this.y);

    this.x -= starting.x;

    text = arguments[0] || "";
    x = arguments[1] || 0;
    y = arguments[2] || 0;

    this.drawTextEx(text || "", x, y);

    if(scene) {

      if(scene._windowLayer) {
        scene._windowLayer.addChild(this);
      } else {
        scene.addChild(this);
      }

    }

    this._builderState = {};
    this._builderState.initTimer = performance.now();
    this._builderState.isDirty = true;
    this._builderState.lifeTime = parseInt(arguments[3]) || (parseInt(parameters["Life Time"]) || 10000);
    this._builderState.velocity = (this._builderState.lifeTime / 1000);
    this._builderState.dest = dest;

    return this;

  };

  var alias_Window_Base_update = Window_Base.prototype.update;
  Window_Base.prototype.update = function () {
    alias_Window_Base_update.call(this);
    this.updateAutoTerminate();
  };

  Window_Base.prototype.updateAutoTerminate = function () {
    if(!this._builderState || !this._builderState.isDirty) return;
    if(performance.now() - this._builderState.initTimer >= this._builderState.lifeTime) {
      if(this.parent) {
        this.parent.removeChild(this);
        this._builderState.isDirty = false;
        this._builderState.initTimer = performance.now();
      }
    }
    var dx = this._builderState.dest.x;
    var vel = Math.max(this._builderState.velocity, 1);

    var t = (dx - this.x) * 4;

    var o = this.opacity;
    var co = this.contentsOpacity;
    var diff = (255 / vel ) * SceneManager._deltaTime;
    this.opacity = (o > 0) ? o - diff : 0;
    this.contentsOpacity = (co > 0) ? co - diff : 0;

    if(o < 128) {
      this.x = this.x + diff;
    } else {
      this.x = this.x + t * SceneManager._deltaTime;
    }

  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  $.pluginCommandToEvent = function (args) {
    var _event, sx, sy, text, ix, iy, fontSize, width;

    _event = $gameMap.event( parseInt(args[0]) );

    if(!_event) return;

    sx = _event.screenX();
    sy = _event.screenY();

    ix = parseFloat(args[1]) || 0;
    iy = parseFloat(args[2]) || 0;

    text = args.slice(3).join("") || "";

    bitmap = new Bitmap(1,1);
    fontSize = Window_Base.prototype.fittingHeight(1);
    width = bitmap.measureTextWidth(text) + (Window_Base.prototype.standardPadding() * 2);

    sx -= width / 2;
    sy -= fontSize + $gameMap.tileHeight();

    new Window_Base(sx, sy, width, fontSize).builder(text, ix, iy);

  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "WindowBuilder") {
      switch (args[0]) {
        case 'event':
          $.pluginCommandToEvent(args.slice(1));
          break;
        default:

      }
    }
  };

})(RS.WindowBuilder);
