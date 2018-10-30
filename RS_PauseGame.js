/*:ko
 * @plugindesc 특정 버튼으로 게임을 일지 정지합니다.
 * @author biud436
 *
 * @param keyCode
 * @text 키코드 설정
 * @desc 키코드를 16진수나 10진수 값으로 설정하세요.
 * @default 0x50
 *
 * @param Pause Image Src
 * @text 일지 정지 이미지 경로
 * @desc 이미지 경로를 설정하세요
 * @default pause
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @help
 * =============================================================================
 * 플러그인 동작 환경
 * -----------------------------------------------------------------------------
 * Windows
 * Mac OS X
 *
 * 모바일 기기에서는 동작하지 않습니다.
 *
 * =============================================================================
 * 변경 기록
 * -----------------------------------------------------------------------------
 * 2017.05.06 (v1.0.0) - First Release.
 * 2017.05.06 (v1.0.1) - Fixed an issue when using a option called 'Exclude unused files'
 * 2018.10.30 (v1.0.2) : 
 * - Fixed the issue that is not working in RPG Maker MV 1.6.1
 * - Added the chromium notification.
 */
/*:
 * @plugindesc This plugin allows user to pause the game.
 * @author biud436
 *
 * @param keyCode
 * @desc Specify the keyCode
 * @default 0x50
 *
 * @param Pause Image Src
 * @desc Specify an image path
 * @default pause
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @help
 * ==============================================================================
 * Change Log
 * ------------------------------------------------------------------------------
 * 2017.05.06 (v1.0.0) - First Release.
 * 2017.05.06 (v1.0.1) - Fixed an issue when using a option called 'Exclude unused files'
 * 2018.10.30 (v1.0.2) : 
 * - Fixed the issue that is not working in RPG Maker MV 1.6.1
 * - Added the chromium notification.
 */

var Imported = Imported || {};
Imported.RS_PauseGame = true;

(function() {

  var parameters = PluginManager.parameters('RS_PauseGame');
  var keyCode = parseInt(parameters['keyCode'] || 0x50);
  var imageSrc = parameters['Pause Image Src'] || 'pause';

  SceneManager.pause = false;

  //=========================================================================
  // Event Listener
  //=========================================================================

  window.addEventListener('keydown', function(event) {
    var ret = SceneManager.pause;
    var ctx, dx, dy;

    if(event.keyCode === keyCode) {
      event.preventDefault();
      SceneManager.pause = !ret;
      if(SceneManager.pause) {
        Graphics.showPause();
      } else {
        Graphics.hidePause();
      }
    }
  });

  //=========================================================================
  // Graphics
  //=========================================================================
  Graphics.initPause = function() {
    this._pauseImage = new Image();
    this._pauseImage.src = 'img/pictures/' + imageSrc + '.png';
    this._pauseZIndex = 5;
    this._pauseZIndexTemp = 0;
  };

  Graphics.showPause = function() {

    var self = this;

    var canvas = self._upperCanvas;
    var ctx = canvas.getContext('2d');

    var mx = self._width / 2 - self._pauseImage.width / 2;
    var my = self._height / 2 - self._pauseImage.height / 2;

    // Show upper canvas;
    self._canvas.style.opacity = 0.3;
    canvas.style.opacity = 1;
    canvas.style.zIndex = self._pauseZIndex;

    // Temp zIndex
    self._pauseZIndexTemp = parseInt(canvas.style.zIndex || 0);

    // Clear rect
    ctx.clearRect(0, 0, self._width, self._height);

    ctx.save();
    ctx.drawImage(self._pauseImage, mx, my);
    ctx.restore();

    if(Utils.isNwjs() && Utils.RPGMAKER_VERSION >= '1.6.1') {
      var t = new Notification("Pause", {body: 'The game has been paused.', icon:'icon/icon.png'});
      setTimeout(function() {
        t.close();
      }, 3000);
    }

  };

  Graphics.hidePause = function() {
    var self = this;
    var canvas = self._upperCanvas;

    // Hide upper canvas
    this._canvas.style.opacity = 1;
    canvas.style.opacity = 0;

    // Restore zIndex
    canvas.style.zIndex = this._pauseZIndexTemp;

  };

  //=========================================================================
  // SceneManager
  // Setting the main framework with pause scene
  //=========================================================================

  if(Utils.RPGMAKER_VERSION < '1.6.1') {
    SceneManager._getTimeInMsWithoutMobileSafari = function() {
      return performance.now();
    };    
  }

  SceneManager.updateMain = function() {
    var self = this;

    if(!self.pause) {
      if (Utils.isMobileSafari()) {
        this.changeScene();
        this.updateScene();
      } else {
        var newTime = this._getTimeInMsWithoutMobileSafari();
        var fTime = (newTime - this._currentTime) / 1000;
        if (fTime > 0.25) fTime = 0.25;
        this._currentTime = newTime;
        this._accumulator += fTime;
        while (this._accumulator >= this._deltaTime) {
          this.updateInputData();
          this.changeScene();
          this.updateScene();
          this._accumulator -= this._deltaTime;
        }
      }
    }
    this.renderScene();
    this.requestUpdate();
  };

  Graphics.initPause();

})();
