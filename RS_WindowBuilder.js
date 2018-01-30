/*:
 * @plugindesc <RS_WindowBuilder>
 * @author biud436
 * @help
 * If you would like to add is the ability to create the window automatically,
 * You could use this plugin to make the new windows
 * and then assign it to the current scene.
 *
 * You type a new code to create the window as follows!
 *
 * new Window_Base(0, 0, 200, 96).builder("안녕하세요?", 0, 0);
 *
 * You are going to pass a first parameter is desired text in the function
 * called 'builder'. It is the text string that would draw on the window.
 * The two next parameters are internal coordinates such as x and y.
 */

var Imported = Imported || {};
Imported.RS_WindowBuilder = true;

(function () {

  var alias_Window_Base_initialize = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function (x, y, width, height) {
    alias_Window_Base_initialize.call(this, x, y, width, height);
    // this.on('removed', function () {
    //   new Window_Base(0, 0, 320, 96).builder("test", 0, 0);
    // }, this);
    return this;
  };

  Window_Base.prototype.builder = function () {
    var scene = SceneManager._scene;
    var text = "";
    var x = 0;
    var y = 0;

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
    this._builderState.lifeTime = 10000;
    this._builderState.velocity = (this._builderState.lifeTime / 1000);

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
    var o = this.opacity;
    var diff = (255 / this._builderState.velocity ) * SceneManager._deltaTime;
    this.opacity = (o > 0) ? o - diff : 0;
    this.contentsOpacity = (o > 0) ? o - diff : 0;
  };

})();
