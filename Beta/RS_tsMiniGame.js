//==============================================================================
// RS_tsMiniGame.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_tsMiniGame = true;

/*:
 * @plugindesc
 * @author biud436
 */

(function () {

  // Private Variables.

  var startPosition = new Point(100, Graphics.boxHeight - 200);
  var vx = 8.0;
  var vy = 2.5;
  var gr = 0.4;

  var backgroundWidth = Graphics.boxWidth;
  var backgroundHeight = Graphics.boxHeight;

  // Private Class.

  function MiniGame() {
    this.initialize.apply(this, arguments);
  }

  MiniGame.prototype = Object.create(Scene_Base.prototype);
  MiniGame.prototype.constructor = MiniGame;

  // Default Frameworks

  MiniGame.prototype.initialize = function () {

  };

  MiniGame.prototype.create = function () {
    this.createBackground();
    this.createCamera();
    this.createPlayer();
  };

  MiniGame.prototype.start = function () {
    this.initPosition();
  };

  MiniGame.prototype.update = function () {
    this.updatePosition();
  };

  MiniGame.prototype.terminate = function () {

  };

  // Create Objects

  MiniGame.prototype.createBackground = function () {
    this._background = new Sprite();
    this._background.bitmap = new Bitmap(backgroundWidth, backgroundHeight);
    this._background.bitmap.fillAll(Utils.rgbToCssColor(255, 255, 255));
    this.addChild(this._background);
  };

  MiniGame.prototype.cretePlayer = function () {
    var w = $gameMap.tileWidth();
    var h = $gameMap.tileHeight();
    this._player = new Sprite();
    this._player.opacity = 200;
    this._player.bitmap = new Bitmap(w, h);
    this._player.bitmap.fillAll(Utils.rgbToCssColor(255, 0, 0));
    this._player.t = 0;
    this.addChild(this._player);
  };


  // Camera

  MiniGame.prototype.createCamera = function () { };
  MiniGame.prototype.updateCamera = function () { };

  // Player Position

  MiniGame.prototype.initPosition = function () {
    this._player.x = startPosition.x
    this._player.y = startPosition.y;
  };

  MiniGame.prototype.resetPosition = function () {
    this.initPosition();
    this._player.t = 0;
  };

  MiniGame.prototype.updatePosition = function () {
    this._player.x = this._player.x * t;
    this._player.y = this._player.y + (0.5 * gr * Math.pow(t, 2) + vy * t - 100.0);
    if( (this._player.x < 0 || this._player.x > Graphics.boxWidth) ||
        (this._player.y < 0 || this._player.y > Graphics.boxHeight) ) {
      this.resetPosition();
    } else {
      this._player.t++;
    }
  };

})();
