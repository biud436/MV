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
 * @param Notification
 * @text 알림 (v1.6.1 이상)
 *
 * @param Title Text
 * @text 타이틀
 * @parent Notification
 * @desc 크로미움 알림 창에 적을 타이틀 메시지를 지정하십시오.
 * @default 일시 정지 알림
 *  
 * @param Body Text
 * @parent Notification
 * @desc 크로미움 알림 창에 적을 메시지를 지정하십시오.
 * @default 게임이 일시적으로 중지되었습니다.
 *
 * @param Icon
 * @parent Notification
 * @desc 아이콘 폴더에 있는 아이콘의 이름을 지정하십시오 (확장자 생략)
 * @default icon
 * 
 * @param Time
 * @text 시간
 * @type number
 * @parent Notification
 * @desc 알림 창이 떠있는 시간을 지정하세요 (밀리세컨드 단위)
 * @default 2000
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
 * - Added the chromium notification (>= v1.6.1+)
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
 * @param Notification
 * @text Notification (>= v1.6.1+)
 *
 * @param Title Text
 * @parent Notification
 * @desc Specify the text for the chromium notification.
 * @default Pause
 *  
 * @param Body Text
 * @parent Notification
 * @desc Specify the text for the chromium notification.
 * @default The game has been paused.
 *
 * @param Icon
 * @parent Notification
 * @desc Specify the icon image for the chromium notification from icon folder.
 * @default icon
 * 
 * @param Time
 * @type number
 * @parent Notification
 * @desc Specify the time that shows up the chromium notification.
 * @default 2000
 *
 * @help
 * ==============================================================================
 * Change Log
 * ------------------------------------------------------------------------------
 * 2017.05.06 (v1.0.0) - First Release.
 * 2017.05.06 (v1.0.1) - Fixed an issue when using a option called 'Exclude unused files'
 * 2018.10.30 (v1.0.2) : 
 * - Fixed the issue that is not working in RPG Maker MV 1.6.1
 * - Added the chromium notification (>= v1.6.1+)
 */

var Imported = Imported || {};
Imported.RS_PauseGame = true;

(function() {

  "use strict";

  var parameters = PluginManager.parameters('RS_PauseGame');
  var keyCode = parseInt(parameters['keyCode'] || 0x50);
  var imageSrc = parameters['Pause Image Src'] || 'pause';
  var titleText = parameters["Title Text"] || 'Pause';
  var bodyText = parameters["Body Text"] || 'The game has been paused.';
  var iconPath = parameters["Icon"] || 'icon';
  var time = parseInt(parameters["Time"]) || 2000;

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
      var t = new Notification(titleText, {body: bodyText, icon:`icon/${iconPath}.png`});
      setTimeout(function() {
        t.close();
      }, time);
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
