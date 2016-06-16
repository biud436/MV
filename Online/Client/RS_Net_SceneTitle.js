/*:
 * RS_Net_SceneTitle.js
 * @plugindesc Login Authentication
 * @author biud436
 * @date 2015.11.25
 */
 
(function() {

  Scene_Title.prototype.createLoginUI = function() {
    if($socket) {
      RS.UI.prepareLoginElement();
      var t = document.getElementById('loginField')
      t.style.top = '250px';
      $socket.on('login ok', function(msg) {
        if(msg === 'ok') {
          this.loginOk();
        }
      }.bind(this));
    }
  }

  Scene_Title.prototype.loginOk = function(msg) {
    var t = document.getElementById('loginField')
    document.body.removeChild(t);
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  };

  Scene_Title.prototype.start = function() {
      Scene_Base.prototype.start.call(this);
      SceneManager.clearStack();
      this.centerSprite(this._backSprite1);
      this.centerSprite(this._backSprite2);
      this.playTitleMusic();
      this.startFadeIn(this.fadeSpeed(), false);
      this.createLoginUI();
  };

  Scene_Title.prototype.update = function() {
      Scene_Base.prototype.update.call(this);
  };

  Scene_Title.prototype.isBusy = function() {
  };

  Scene_Title.prototype.terminate = function() {
      Scene_Base.prototype.terminate.call(this);
      SceneManager.snapForBackground();
  };

  Scene_Title.prototype.createBackground = function() {
      this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
      this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
      this.addChild(this._backSprite1);
      this.addChild(this._backSprite2);
  };

  Scene_Title.prototype.createForeground = function() {
      this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
      this.addChild(this._gameTitleSprite);
      if ($dataSystem.optDrawTitle) {
          this.drawGameTitle();
      }
  };

  Scene_Title.prototype.drawGameTitle = function() {
      var x = 20;
      var y = Graphics.height / 4;
      var maxWidth = Graphics.width - x * 2;
      var text = $dataSystem.gameTitle;
      this._gameTitleSprite.bitmap.outlineColor = 'black';
      this._gameTitleSprite.bitmap.outlineWidth = 8;
      this._gameTitleSprite.bitmap.fontSize = 72;
      this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
  };

  Scene_Title.prototype.centerSprite = function(sprite) {
      sprite.x = Graphics.width / 2;
      sprite.y = Graphics.height / 2;
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
  };

  Scene_Title.prototype.createCommandWindow = function() {
      //
  };

  Scene_Title.prototype.commandNewGame = function() {
      DataManager.setupNewGame();
      this.fadeOutAll();
      SceneManager.goto(Scene_Map);
  };

  Scene_Title.prototype.commandContinue = function() {
      //
  };

  Scene_Title.prototype.commandOptions = function() {
      //
  };

  Scene_Title.prototype.playTitleMusic = function() {
      AudioManager.playBgm($dataSystem.titleBgm);
      AudioManager.stopBgs();
      AudioManager.stopMe();
  };

})();
