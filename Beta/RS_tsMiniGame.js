//==============================================================================
// RS_tsMiniGame.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_tsMiniGame = true;

/*:
 * @author biud436
 */

function MiniGame() {
 this.initialize.apply(this, arguments);
}

(function () {

  // Private Variables.

  var startPosition = new Point(100, Graphics.boxHeight - 200);
  var vx = 8.0;
  var vy = 2.5;
  var gr = 0.4;

  var backgroundWidth = Graphics.boxWidth * 3;
  var backgroundHeight = Graphics.boxHeight;

  MiniGame.prototype = Object.create(Scene_Base.prototype);
  MiniGame.prototype.constructor = MiniGame;

  var screenWidth = 320;
  var screenHeight = 480;

  // Default Frameworks

  MiniGame.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._tempScreenResolution = new Point(window.innerWidth, window.innerHeight);
    this._newScreenResolution = new Point(screenWidth, screenHeight);
    this.setScreenResize(this._newScreenResolution);
    this._bullet = null;
    this._viewport = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this._player = new Sprite();
    this._camera = new Point(0, 0);
    this._scoreBoard = new Sprite();
    this._bulletLayer = new Sprite();
    this._background = new Sprite();
  };

  MiniGame.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createCamera();
    this.createBackground();
    this.createPlayer();
    this.createScoreGUI();
  };

  MiniGame.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
  };

  MiniGame.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    this.updatePosition();
    this.updateCamera();
    if(Input.isPressed('cancel')) {
      SceneManager._stack.length > 0 && this.popScene();
    }
  };

  MiniGame.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    this.setScreenResize(this._tempScreenResolution);
  };

  MiniGame.prototype.setScreenResize = function (newScr) {
    var cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    var cy = (window.screen.availHeight / 2) - (newScr.y / 2);
    var xPadding = 16;
    var yPadding = 39;
    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);
    Graphics._renderer.resize(newScr.x, newScr.y);
  };

  // Create Objects

  MiniGame.prototype.createPlayer = function () {
    this._player.bitmap = new Bitmap(48, 48);
    this._player.bitmap.fillAll('white');
    this._player.setFrame(0, 0, 48, 48);
    this._player.screenX = this._viewport.width / 2;
    this._player.x = this._viewport.width / 2;
  };

  MiniGame.prototype.createBackground = function () {
    this._background.bitmap = new Bitmap(backgroundWidth, backgroundHeight);
    this._background.bitmap.fillAll(Utils.rgbToCssColor(255, 255, 255));
    this._background.x = (this._viewport.width / 2) - this._camera.x;
    this.addChild(this._background);
  };

  MiniGame.prototype.creteBulletContainer = function () {
    var w = $gameMap.tileWidth();
    var h = $gameMap.tileHeight();
    this._bulletLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.addChild(this._bulletLayer);
  };

  MiniGame.prototype.creteBullet = function (x, y) {
    var bullet;
    var w = $gameMap.tileWidth();
    var h = $gameMap.tileHeight();
    bullet = new Sprite();
    bullet.opacity = 200;
    bullet.bitmap = new Bitmap(w, h);
    bullet.bitmap.fillAll(Utils.rgbToCssColor(255, 0, 0));
    bullet.t = 0;
    this.initPosition(bullet);
    bullet.x += x;
    bullet.y += y;
    this._bulletLayer.addChild(bullet);
  };

  MiniGame.prototype.createScoreGUI = function () {
    var fontSize = 48;
    var padding = 8 * 2;
    this._scoreBoard.setFrame(0, 0, Graphics.boxWidth, fontSize + padding);
    this.addChild(this._scoreBoard);
  };

  // Camera

  MiniGame.prototype.createCamera = function () {
    this._camera.x = this._viewport.width / 2;
  };

  MiniGame.prototype.updateCamera = function () {
    var screenSpeed = 12;
    var vpWidthMod2 = this._viewport.width / 2;
    var bkWidth = this._background.width;
    var playerWidth = this._player.bitmap.width;
    if(Input.isPressed('left')) {
      this._player.screenX -= screenSpeed;
      if(this._player.screenX <= 0) this._player.screenX = 0;
    }
    if(Input.isPressed('right')) {
      this._player.screenX += screenSpeed;
      if(this._player.screenX > bkWidth)
        this._player.screenX = bkWidth;
    }
    this._camera.x = this._player.screenX;
    if(this._camera.x < vpWidthMod2)
      this._camera.x = vpWidthMod2;

    if(this._camera.x > bkWidth - vpWidthMod2)
      this._camera.x = bkWidth - vpWidthMod2;

    this._player.x = this._player.screenX - this._camera.x + vpWidthMod2 - playerWidth / 2;
    this._background.x = vpWidthMod2 - this._camera.x;
  };

  // Player Position

  MiniGame.prototype.initPosition = function (bullet) {
    if(!this._bullet) return false;
    bullet.x = this._viewport.x + startPosition.x
    bullet.y = this._viewport.y + startPosition.y;
  };

  MiniGame.prototype.resetPosition = function () {
    this.initPosition(this._bullet);
    this._bullet.t = 0;
    this._bulletLayer.removeChild(this._bullet);
  };

  MiniGame.prototype.updatePosition = function () {
    // parabola trajectory
    if(this._bulletLayer && this._bulletLayer.children) {
      var child = this._bulletLayer.children;
      var power = 100.0;
      child.forEach(function (i) {
        this._bullet = i;
        this._bullet.x = this._bullet.x * t;
        this._bullet.y = this._bullet.y + (0.5 * gr * Math.pow(t, 2) + vy * t - power);
        if( (this._bullet.x < 0 || this._bullet.x > Graphics.boxWidth) ||
            (this._bullet.y < 0 || this._bullet.y > Graphics.boxHeight) ) {
          this.resetPosition();
        } else {
          this._bullet.t++;
        }
      }, this);
    }
  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "tsMiniGame") {
        switch(args[0]) {
          case 'Start':
            SceneManager.push(MiniGame);
            break;
        }
      }
  };

})();
