/*:
 * @plugindesc triacontane님의 MessageSkip 플러그인에서 보이지 않으면 클릭이 안되게 수정합니다.
 * @author biud436
 */

(function() {

    Sprite_MessageButton.prototype.isTriggered = function(targetX, targetY, pressed) {
        var realX       = targetX + this._frame.width * this.anchor.x;
        var realY       = targetY + this._frame.height * this.anchor.y;
        var triggeredOk = (pressed ? TouchInput.isPressed() : TouchInput.isTriggered());
        var visible = this.visible;
        return triggeredOk && this.isInSprite(realX, realY) && visible;
    };

})();