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
 * ==================================================
 * Change Log
 * --------------------------------------------------
 * 2017.05.06 (v1.0.0) - First Release.
 * 2017.05.06 (v1.0.1) - Fixed an issue when using a option called 'Exclude unused files'
 */

var Imported = Imported || {};
Imported.RS_PauseGame = true;

(function() {

  var parameters = PluginManager.parameters('RS_PauseGame');
  var keyCode = parseInt(parameters['keyCode'] || 0x50);
  var imageSrc = parameters['Pause Image Src'] || 'pause';

  var valid = !!Utils.RPGMAKER_ENGINE;
  valid = valid && (typeof Utils.RPGMAKER_ENGINE === 'string');
  valid = valid && Utils.RPGMAKER_ENGINE.contains('community-1.');
  valid = valid && Utils.isMobileDevice();

  if(!valid) {

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

      SceneManager.updateMain = function() {
          var self = this;

          if(!self.pause) {
            if (Utils.isMobileSafari()) {
                this.changeScene();
                this.updateScene();
            } else {
                var newTime = this._getTimeInMs();
                var fTime = (newTime - this._currentTime) / 1000;
                if (fTime > 0.25) fTime = 0.25;
                if (fTime < this._deltaTime) fTime = this._deltaTime;
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

  }

})();
