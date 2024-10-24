/*:
 * @target MV
 * @plugindesc This addon plugin allows you to remove the blur of background <RS_X_InputDialogNoBlur>.
 * @author biud436
 *
 * @help
 * ===================================================================
 * Change Log
 * ===================================================================
 * 2024.10.24 (v1.0.0) - First Release.
 */
var Imported = Imported || {};

(() => {
    SceneManager._backgroundBitmapWithoutBlur = null;

    SceneManager.snapForBackgroundWithout = function () {
        this._backgroundBitmapWithoutBlur = this.snap();
    };

    SceneManager.backgroundBitmapWithoutBlur = function () {
        return this._backgroundBitmapWithoutBlur;
    };

    const alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function () {
        if (SceneManager.isNextScene(Scene_InputDialog)) {
            SceneManager.snapForBackgroundWithout();
        }
        alias_Scene_Map_terminate.call(this);
    };

    Scene_InputDialog.prototype.createBackground = function () {
        if (Imported.Irina_PerformanceUpgrade) {
            Scene_MenuBase.prototype.createBackground.call(this);
        } else {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                SceneManager.backgroundBitmapWithoutBlur();
            this.addChild(this._backgroundSprite);
        }
    };
})();
