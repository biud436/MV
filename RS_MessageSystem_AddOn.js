/*:
 * RS_MessageSystem_AddOn.js
 * @plugindesc Message System Add-On By biud436
 * @author biud436
 * @help
 *
 * This plugin requires 'GALV_CamControl.js' plugins.
 *
 * link : http://galvs-scripts.com/category/rmmv-plugins/mv-event-utility/#post-1511
 *
 * 2016.02.24 - Bug Fixed
 * 2016.03.01 - Imported defined 오류 수정
 */

var Imported = Imported || {};
Imported.RS_MessageSystem_AddOn = true;

(function() {
  // =================================================================
  // Add-on
  // =================================================================

  /**
   * @memberOf Window_Message
   * @method newLineX
   * @return {Number}
   */
  Window_Message.prototype.newLineX = function() {
      if(/^Big_/i.exec( $gameMessage.faceName() ) ) {
        return ($gameMessage.faceIndex() > 0) ? 0 : RS.__textStartX;
      } else {
        return ($gameMessage.faceName() === '' ? 0 : 168);
      }
  };

  /**
   * @memberOf Window_Message
   * @method calcBalloonRect
   * @param text {String}
   */
  Window_Message.prototype.calcBalloonRect = function(text) {
      var temp = text;
      var tempText = this.textProcessing(temp);
      tempText = tempText.split(/[\r\n]+/);
      tempText = tempText.sort(function(a, b) {
          return b.length - a.length;
      }.bind(this));
      var height = tempText.length * this.lineHeight() + this.standardPadding() * 2;
      this._bWidth = this.textWidth(tempText[0]) + RS.__STD_PADDING * 2 || RS.__WIDTH;
      if($gameMessage.faceName() !== '') {
        var min = this.fittingHeight(4);
        this._bWidth += this.newLineX() + this.standardPadding() * 2;
        if(height < min) height = height.clamp(min, height + (min - height));
      }
      this._bHeight = height;
  };

  /**
   * @memberOf Window_Message
   * @method updateBalloonPosition
   */
  Window_Message.prototype.updateBalloonPosition = function() {

      var self = this;

      // -2 라면 이 함수를 처리하지 않습니다.
      if($gameMessage.getBalloon() === -2) {
          this.updatePlacement();
          return;
      };

      if(!!Imported.Galv_CamControl) {

        $gameMap.addCallback(function() {

            if($gameMessage.isBusy()) {
              $gameMap.camTargetSet($gameMap.getMsgOwner(), 800);
            } else {
              $gameMap.camTargetSet($gamePlayer, 800);
            }

            // 말풍선 소유자의 화면 좌표
            var mx = $gameMap.getMsgOwner().screenX();
            var my = $gameMap.getMsgOwner().screenY();

            // 말풍선 위치 및 크기 설정 (화면 내에 가두지 않습니다)
            this.x =  mx - (this._bWidth / 2);
            this.y =  my - this._bHeight - $gameMap.tileHeight();
            this.width = this._bWidth;
            this.height = this._bHeight;

        }.bind(this));

      } else {

        // 말풍선 소유자의 화면 좌표
        var mx = $gameMap.getMsgOwner().screenX();
        var my = $gameMap.getMsgOwner().screenY();

        // 말풍선의 폭과 높이 범위 제한
        this._bWidth = this._bWidth.clamp(RS.__WIDTH, Graphics.boxWidth - RS.__WIDTH);
        this._bHeight = this._bHeight.clamp(RS.__HEIGHT, Graphics.boxHeight - RS.__HEIGHT);

        // 말풍선 위치 및 크기 설정 (화면 내에 가두지 않습니다)
        this.x =  mx - (this._bWidth / 2);
        this.y =  my - this._bHeight - $gameMap.tileHeight();
        this.width = this._bWidth;
        this.height = this._bHeight;

      }

      // 1프레임 대기
      this.startWait(1);

  };

  Game_Map.prototype.addCallback = function(func) {
    this._callbackFunc = func;
  }

  Game_Map.prototype.callBalloonPosition = function() {
    if(!!this._callbackFunc) {
      this._callbackFunc();
      this._callbackFunc = null;
    }
  }

  if(!!Imported.Galv_CamControl) {
    var Galv_Game_Map_updateScroll = Game_Map.prototype.updateScroll;
    Game_Map.prototype.updateScroll = function() {
      Galv_Game_Map_updateScroll.call(this);
      if(!$gameMap.isScrolling() && this._scrollRest === 0) {
          this.callBalloonPosition();
      }
    }
  }

})();
