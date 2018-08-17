/*:
 * @plugindesc This plugin allows you to prevent the movement of the character from splashing in the slow mobile device.
 * @author biud436
 * @help
 * ===========================================================================
 * Version Log
 * ===========================================================================
 * 2018.06.14 (v1.0.0) - First Release
 */
/*:ko
 * @plugindesc 이동 속도를 보간하여 느린 하드웨어에서 움직임이 튀는 것을 방지합니다.
 * @author 러닝은빛(biud436)
 * @help
 * ===========================================================================
 * Version Log
 * ===========================================================================
 * 2018.06.14 (v1.0.0) - First Release
 */

 var Imported = Imported || {};
 Imported.RS_InterpolationCharacterMove = true;

 (function() {

    //======================================================================
    // SceneManager
    //======================================================================

    /**
     * 게임 루프
     * @method updateMain
     */
    SceneManager.updateMain = function() {
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
        this.renderScene(  this._accumulator / this._deltaTime );
        this.requestUpdate();
    };

    SceneManager.renderScene = function(delta) {
        if (this.isCurrentSceneStarted()) {
            Graphics.render(this._scene, delta);
        } else if (this._scene) {
            this.onSceneLoading();
        }
    };

    //======================================================================
    // Graphics
    //======================================================================

    var alias_Graphics_initialize = Graphics.initialize;
    Graphics.initialize = function(width, height, type) {
        alias_Graphics_initialize.call(this, width, height, type);
        this._deltaTime = 1.0;
    };

    Graphics.render = function(stage, deltaTime) {
        if (this._skipCount === 0) {
            var startTime = Date.now();

            // 소스 코드를 줄이기 위해
            Graphics._deltaTime = deltaTime;

            if (stage) {
                this._renderer.render(stage);
                if (this._renderer.gl && this._renderer.gl.flush) {
                    this._renderer.gl.flush();
                }
            }
            var endTime = Date.now();
            var elapsed = endTime - startTime;
            this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
            this._rendered = true;
        } else {
            this._skipCount--;
            this._rendered = false;
        }
        this.frameCount++;
    };

    //======================================================================
    // Game_CharacterBase
    //======================================================================

    /**
     * @param {Number} deltaTime 느린 하드웨어 이동 속도를 보간하기 위한 값입니다.
     */
    Game_CharacterBase.prototype.distancePerFrame = function(deltaTime) {
        deltaTime = deltaTime || 1.0;
        return (Math.pow(2, this.realMoveSpeed()) / 256) * deltaTime;
    };    

    //======================================================================
    // Sprite_Character
    //======================================================================    

    /**
     * 스프라이트의 최종 위치를 보간합니다 (이 함수는 렌더링 함수에서 한 번 호출됩니다)
     */
    var alias_Sprite_Character_updateTransform = Sprite_Character.prototype.updateTransform;
    Sprite_Character.prototype.updateTransform = function() {
        alias_Sprite_Character_updateTransform.call(this);
        
        var c;

        // 캐릭터가 있는가?
        if(c = this._character) {

            var _realX, _realY, _delta;
                
            _realX = c._realX;
            _realY = c._realX;
            _delta = Graphics._deltaTime;

            // updateMove()와 같습니다.
            if (c._x < _realX) {
                _realX = Math.max(c._realX - c.distancePerFrame(_delta), c._x);
            }
            if (c._x > _realX) {
                _realX = Math.min(c._realX + c.distancePerFrame(_delta), c._x);
            }
            if (c._y < _realY) {
                _realY = Math.max(c._realY - c.distancePerFrame(_delta), c._y);
            }
            if (c._y > _realY) {
                _realY = Math.min(c._realY + c.distancePerFrame(_delta), c._y);
            }

            var tw = $gameMap.tileWidth();
            var th = $gameMap.tileHeight();

            this.x = Math.round($gameMap.adjustX(_realX) * tw + tw / 2);
            this.y = Math.round($gameMap.adjustY(_realY) * th + th - c.shiftY() - c.jumpHeight());

        }

    };

 })();