//============================================================================
//#region ScreenManager
//============================================================================

function ScreenManager() {
    this.initialize.apply(this, arguments);
}

ScreenManager.prototype = Object.create(Scene_Base.prototype);
ScreenManager.prototype.constructor = ScreenManager;

ScreenManager.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

ScreenManager.prototype.create = function () {
    Scene_Base.prototype.create.call(this);

    this.createWindowLayer();
    this.createAvailGraphicsList();
    this.createPanel();

};

ScreenManager.prototype.makeSpriteForPanel = function (height) {
    var color1 = Window_Base.prototype.dimColor1();
    var color2 = Window_Base.prototype.dimColor2();
    var x = 0;
    var y = 0;
    var width = Math.floor(Graphics.boxWidth / 3);
    var sprite = new Sprite(new Bitmap(width, height * 2));

    if(navigator.userAgent.match(/Chrome/)) {
    sprite.bitmap.fillAll(color1);
    } else {
    sprite.bitmap.gradientFillRect(x, y, Math.floor(width / 2), height, color2, color1);
    sprite.bitmap.gradientFillRect(Math.floor(x + width / 2), y, Math.floor(width / 2), height, color1, color2);
    }
    sprite.bitmap.drawText(RS.ScreenManager.localization.get("Display Resolutions"), x, y, width, height, 'center');

    return sprite;

};

ScreenManager.prototype.createPanel = function () {
    var height = Math.floor(Graphics.boxHeight / 17);
    var nx = this._availGraphicsList.x;
    var ny = this._availGraphicsList.y - height - 10;

    this._panel = this.makeSpriteForPanel(height);
    this.setPosition(this._panel, nx, ny).addChild(this._panel);

};

ScreenManager.prototype.setPosition = function (type, x, y) {
    if(!type) return;

    type.x = x;
    type.y = y;

    return this;

};

ScreenManager.prototype.setHandler = function () {
    if(!this._availGraphicsList) return;

    this._availGraphicsList.setHandler('ok', this.convertScreenSize.bind(this));
    this._availGraphicsList.setHandler('cancel', this.popScene.bind(this));

    return this;

};

ScreenManager.prototype.createDisplayList = function (x, y, width, height) {
    var ClassType = Utils.isNwjs() ? Window_ResolutionList : Window_ResolutionListForMobile;

    return new ClassType(x, y, width, height);

};

ScreenManager.prototype.createAvailGraphicsList = function () {
    var width = Math.floor(Graphics.boxWidth / 3);
    var height = Math.floor(Graphics.boxWidth / 2.5);
    var nx = Graphics.boxWidth / 2 - (width / 2);
    var ny = Graphics.boxHeight / 2 - (height / 2);

    this._availGraphicsList = this.createDisplayList(0, 0, width, height);
    this.setPosition(this._availGraphicsList, nx, ny )
    .setHandler()
    .addWindow(this._availGraphicsList);

};

ScreenManager.prototype.convertWithAspectRatio = function () {
    var config = new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0], RS.ScreenManager.Params.settings.customAspectRatio[1]);
    var insData = parseInt(window.screen.availWidth / RS.ScreenManager.Params.settings.customAspectRatio[0]) * RS.ScreenManager.Params.settings.customAspectRatio[0];
    var data = config.getSize(insData);

    Graphics.setScreenResize(new Point(data[0], data[1]));

};

ScreenManager.prototype.convertWithNwjs = function () {
    var scr = this._availGraphicsList.getCurrentItemToPoint();

    if(scr) {
    Graphics.setScreenResize(scr);
    } else {
    this.convertWithAspectRatio();
    }

    if(this._availGraphicsList.item() === RS.ScreenManager.localization.get("Full Screen") ||
    this._availGraphicsList.item() === RS.ScreenManager.localization.get("Windowed Mode")) {
    RS.ScreenManager.switchFullScreen();
    }

};

ScreenManager.prototype.convertWithOther = function () {
    var scr = this._availGraphicsList.getCurrentItemToPoint();

    if(scr) {
    var temp = [];
    temp.push(RS.ScreenManager.Params.options.aspectRatio);
    temp.push(RS.ScreenManager.Params.options.resize);
    RS.ScreenManager.Params.options.resize = true;
    RS.ScreenManager.Params.options.aspectRatio = true;
    Graphics.setScreenResize(scr);
    RS.ScreenManager.Params.options.resize = temp.pop();
    RS.ScreenManager.Params.options.aspectRatio = temp.pop();

    } else {

    this.convertWithAspectRatio();

    }
};

ScreenManager.prototype.flushScreen = function () {
    $gameSystem._lastScreenManagerItem = this._availGraphicsList.index();

    this.popScene();

};

ScreenManager.prototype.convertScreenSize = function () {
    // PC인가?
    if(Utils.isNwjs()) {

    this.convertWithNwjs();

    // 다른 플랫폼인가?
    } else {

    this.convertWithOther();

    }

    // 빠져나간다.
    this.flushScreen();

};

window.ScreenManager = ScreenManager;

//#endregion