//============================================================================
//#region Sprite_Base
//============================================================================

Sprite_Base.prototype.requestStretch = function (sprite) {
    if (!sprite.bitmap) return;
    var bitmap = sprite.bitmap;
    if (bitmap.width <= 0) return;
    if (bitmap.height <= 0) return;
    var scaleX = Graphics.boxWidth / bitmap.width;
    var scaleY = Graphics.boxHeight / bitmap.height;
    sprite.scale.x = (scaleX > 1.0) ? scaleX : 1.0;
    sprite.scale.y = (scaleY > 1.0) ? scaleY : 1.0;

    if (RS.ScreenManager.Params.picturePosType === "Virtual Coordinates") {
        var x = sprite.x;
        var y = sprite.y;
        var sw = bitmap.width * sprite.scale.x; // scale width and height
        var sh = bitmap.height * sprite.scale.y;
        var dw = bitmap.width; // original width and original height
        var dh = bitmap.height;

        if (dw == 0 || dh == 0) {
            return;
        }

        var dx = x * (sw / dw); // destination position
        var dy = y * (sh / dh);

        // position
        sprite.x = Math.floor(dx);
        sprite.y = Math.floor(dy);

    }

};
//#endregion

//============================================================================
//#region TilingSprite
//============================================================================
TilingSprite.prototype.reqeustResizeImage = function () {

    if (!this.texture.frame) {
        this.texture.frame = new PIXI.Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    }

    this.texture.frame.width = Graphics.boxWidth;
    this.texture.frame.height = Graphics.boxHeight;

}

TilingSprite.prototype.isValidResizing = function () {
    if (!RS.ScreenManager.Params.isValidScaledBattleback) return;
    if (!this.bitmap) return false;
    if (this.bitmap.width <= 0) return false;
    if (this.bitmap.height <= 0) return false;
    if (!this.visible) return false;
    if (this.opacity <= 0) return false;
    if (!this.bitmap._url) return false;
    if (!this.texture) return false;

    var url = this.bitmap._url;
    var fileUri = url.split("/");
    var filename = fileUri.pop();
    var folderName = fileUri.pop();

    if (['battlebacks1', 'battlebacks2'].contains(folderName)) {
        this._folderName = folderName;
        return true;
    }

    return false;

};

TilingSprite.prototype.resizeImage = function () {
    if (this.isValidResizing()) {
        this.reqeustResizeImage();
    }
};

var alias_TilingSprite__onBitmapLoad = TilingSprite.prototype._onBitmapLoad;
TilingSprite.prototype._onBitmapLoad = function () {
    alias_TilingSprite__onBitmapLoad.call(this);
    this.resizeImage();
};

//#endregion

//============================================================================
// Sprite_Actor
//============================================================================  

// These functions are worked fine in the vanilla mode only!!
// I couldn't test the impact yet when using the plugin named YEP_BattleEngineCore.
if (!Imported.YEP_BattleEngineCore) {

    Sprite_Actor.prototype.moveToStartPosition = function () {
        eval($.Params.actorFunc.moveToStartPosition);
    };

    Sprite_Actor.prototype.setActorHome = function (index) {
        eval($.Params.actorFunc.setActorHome);
    };

    Sprite_Actor.prototype.stepForward = function () {
        eval($.Params.actorFunc.stepForward);
    };

    Sprite_Actor.prototype.stepBack = function () {
        eval($.Params.actorFunc.stepBack);
    };

    Sprite_Actor.prototype.retreat = function () {
        eval($.Params.actorFunc.retreat);
    };

}

//============================================================================
// Spriteset_Battle
//============================================================================    

if (RS.ScreenManager.Params.isValidScaledBattleback) {

    /**
     * Override
     * @method createBattleback
     */
    Spriteset_Battle.prototype.createBattleback = function () {
        var margin = 0;
        var x = -this._battleField.x - margin;
        var y = -this._battleField.y - margin;
        var width = Graphics.width + margin * 2;
        var height = Graphics.height + margin * 2;
        this._back1Sprite = new TilingSprite();
        this._back2Sprite = new TilingSprite();
        this._back1Sprite.bitmap = this.battleback1Bitmap();
        this._back2Sprite.bitmap = this.battleback2Bitmap();
        this._back1Sprite.move(x, y, width, height);
        this._back2Sprite.move(x, y, width, height);
        this._battleField.addChild(this._back1Sprite);
        this._battleField.addChild(this._back2Sprite);
    };

    /**
     * Override
     * @method locateBattleback
     */
    Spriteset_Battle.prototype.locateBattleback = function () {

        var sprite1 = this._back1Sprite;
        var sprite2 = this._back2Sprite;
        sprite1.origin.x = 0;
        sprite2.origin.x = 0;
        if ($gameSystem.isSideView()) {
            sprite1.origin.y = 0;
            sprite2.origin.y = 0;
        }

    };

}

//============================================================================
//#region Sprite_Picture
//============================================================================  

(function () {

    /**
     * Find a script called "DTextPicture.js"
     */
    PluginManager._scripts.forEach(function (pluginName) {
        if (pluginName === "DTextPicture") {
            Imported.DTextPicture = true;
        }
    }, this);

})();

var alias_Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
Sprite_Picture.prototype.updatePosition = function () {
    if (RS.ScreenManager.Params.isAutoScaledPicture) return;
    alias_Sprite_Picture_updatePosition.call(this);
};

var alias_Sprite_Picture_updateScale = Sprite_Picture.prototype.updateScale;
Sprite_Picture.prototype.updateScale = function () {
    if (RS.ScreenManager.Params.isAutoScaledPicture) return;
    alias_Sprite_Picture_updateScale.call(this);
};

Sprite_Picture.prototype.updateOriginScale = function () {
    var picture = this.picture();
    this.x = Math.floor(picture.x());
    this.y = Math.floor(picture.y());
    var originSX = picture.scaleX() / 100;
    var originSY = picture.scaleY() / 100;
    this.scale.x = originSX;
    this.scale.y = originSY;
};

Sprite_Picture.prototype.updateAutoScale = function () {

    /**
     * @type {Game_Picture}
     */
    var picture = this.picture();
    var bitmap = this.bitmap;

    if (!bitmap) {
        this.updateOriginScale();
        return;
    }

    // Sometimes the game picture has to use a default scale.
    var blacklist = RS.ScreenManager.Params.ignoreAutoScalePictures || [];
    if (blacklist.contains(this._pictureId)) {
        this.updateOriginScale();
        return;
    }

    var originSX = picture.scaleX() / 100;
    var originSY = picture.scaleY() / 100;

    // Get the original width and height values
    var dw = bitmap.width * originSX;
    var dh = bitmap.height * originSY;

    // Can not divide with 0
    if (dw === 0 || dh === 0) {
        this.updateOriginScale();
        return;
    }

    // Store the original coordinates before changing its size.
    var x = picture.x();
    var y = picture.y();

    var originalViewWidth = parseInt(RS.ScreenManager.Params.originalPictureViewSize.width);
    var originalViewHeight = parseInt(RS.ScreenManager.Params.originalPictureViewSize.height);
    var scaleX = originSX;
    var scaleY = originSY;

    if (Graphics.boxWidth > originalViewWidth) {
        scaleX = Graphics.boxWidth / originalViewWidth;
    } else if (Graphics.boxWidth < originalViewWidth) {
        scaleX = originalViewWidth / Graphics.boxWidth;
    }

    scaleY = Graphics.boxHeight / originalViewHeight;

    // Perform re-scale and re-position.
    this.scale.x = scaleX;
    this.scale.y = scaleY;

    if (RS.ScreenManager.Params.picturePosType === "Virtual Coordinates") {

        var sw = bitmap.width * scaleX;
        var sh = bitmap.height * scaleY;
        var dx = x * (sw / dw);
        var dy = y * (sh / dh);

        this.x = Math.floor(dx);
        this.y = Math.floor(dy);

    } else {

        this.x = Math.floor(x);
        this.y = Math.floor(y);

    }

};

var alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function () {
    alias_Sprite_Picture_update.call(this);
    if (this.visible && RS.ScreenManager.Params.isAutoScaledPicture) {
        this.updateAutoScale();
    }
};

//#endregion

//#region Rescaling Background
//============================================================================
// Scene_Base
//============================================================================

Scene_Base.prototype.requestStretch = function (sprite) {
    if (!sprite.bitmap) return;
    var bitmap = sprite.bitmap;
    if (bitmap.width <= 0) return;
    if (bitmap.height <= 0) return;
    var scaleX = Graphics.boxWidth / bitmap.width;
    var scaleY = Graphics.boxHeight / bitmap.height;
    sprite.scale.x = (scaleX > 1.0) ? scaleX : 1.0;
    sprite.scale.y = (scaleY > 1.0) ? scaleY : 1.0;
    sprite.x = Graphics.boxWidth / 2;
    sprite.y = Graphics.boxHeight / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//============================================================================
// Scene_MenuBase
//============================================================================

var alias_Scene_MenuBase_start = Scene_MenuBase.prototype.start;
Scene_MenuBase.prototype.start = function () {
    alias_Scene_MenuBase_start.call(this);
    this.requestStretch(this._backgroundSprite);
};

//============================================================================
// Window
//============================================================================

if (RS.ScreenManager.Params.settings.defaultScreenSize.x <= 320 &&
    RS.ScreenManager.Params.settings.defaultScreenSize.y <= 240) {
    var alias_Window_Command_windowWidth = Window_Command.prototype.windowWidth;
    Window_Command.prototype.windowWidth = function () {
        return Graphics.getVirtualWidth(alias_Window_Command_windowWidth.call(this));
    };

    var alias_Window_Command_lineHeight = Window_Command.prototype.lineHeight;
    Window_Command.prototype.lineHeight = function () {
        return Graphics.getVirtualHeight(alias_Window_Command_lineHeight.call(this));
    };

    var alias_Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
    Window_Base.prototype.standardFontSize = function () {
        return Graphics.getVirtualHeight(alias_Window_Base_standardFontSize.call(this));
    };

    var alias_Window_Base_standardPadding = Window_Base.prototype.standardPadding;
    Window_Base.prototype.standardPadding = function () {
        return Graphics.getVirtualWidth(alias_Window_Base_standardPadding.call(this));
    };

    var alias_Window_Selectable_spacing = Window_Selectable.prototype.spacing;
    Window_Selectable.prototype.spacing = function () {
        return Graphics.getVirtualWidth(alias_Window_Selectable_spacing.call(this));
    };

    var alias_Window_Options_windowWidth = Window_Options.prototype.windowWidth;
    Window_Options.prototype.windowWidth = function () {
        return Graphics.getVirtualWidth(alias_Window_Options_windowWidth.call(this));
    };

    var alias_Window_Options_statusWidth = Window_Options.prototype.statusWidth;
    Window_Options.prototype.statusWidth = function () {
        return Graphics.getVirtualWidth(alias_Window_Options_statusWidth.call(this));
    };

    class Window_MenuCommandImpl extends Window_MenuCommand {
        windowWidth() {
            return Graphics.getVirtualWidth(super.windowWidth());
        }
    }

    window.Window_MenuCommand = Window_MenuCommandImpl;

    class Window_MenuStatusImpl extends Window_MenuStatus {
        windowWidth() {
            return Graphics.boxWidth - Graphics.getVirtualWidth(240);
        }
    }

    window.Window_MenuStatus = Window_MenuStatusImpl;

    class Window_GoldImpl extends Window_Gold {
        windowWidth() {
            return Graphics.getVirtualWidth(super.windowWidth());
        }
    }

    window.Window_Gold = Window_GoldImpl;

    class Window_GameEndImpl extends Window_GameEnd {
        windowWidth() {
            return Graphics.getVirtualWidth(super.windowWidth());
        }
    }

    window.Window_GameEnd = Window_GameEndImpl;
}

//============================================================================
// Scene_Title
//============================================================================

class Window_TitleCommandImpl extends Window_TitleCommand {

    updatePlacement() {
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.y = Graphics.boxHeight - this.height - Graphics.getVirtualHeight(96);
    }

    windowWidth() {
        return Graphics.getVirtualWidth(super.windowWidth());
    }

}

window.Window_TitleCommand = Window_TitleCommandImpl;

var alias_Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function () {
    alias_Scene_Title_start.call(this);
    this.requestStretch(this._backSprite1);
    this.requestStretch(this._backSprite2);
};

Scene_Title.prototype.drawGameTitle = function () {
    var x = 20;
    var y = Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;

    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = Graphics.getVirtualWidth(8);
    this._gameTitleSprite.bitmap.fontSize = Graphics.getVirtualHeight(72);
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, Graphics.getVirtualWidth(48), 'center');
};

//============================================================================
// Scene_Gameover
//============================================================================

var alias_Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function () {
    alias_Scene_Gameover_start.call(this);
    this.requestStretch(this._backSprite);
};

//#endregion