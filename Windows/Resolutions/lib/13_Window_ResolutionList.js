
//============================================================================
// Window_ResolutionList
//============================================================================

function Window_ResolutionList() {
    this.initialize.apply(this, arguments);
};

Window_ResolutionList.prototype = Object.create(Window_Selectable.prototype);
Window_ResolutionList.prototype.constructor = Window_ResolutionList;

Window_ResolutionList.prototype.initialize = function (x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);

    this.initMembers();
    this.initWithItemPoint();
    this.refresh();
    this.activate();

    this.select($gameSystem._lastScreenManagerItem || 0);

};

Window_ResolutionList.prototype.initMembers = function () {
    this._windowFrameSprite.visible = false;

    this._index = 0;
    this._item = [];

};

Window_ResolutionList.prototype.lineHeight = function () {
    return Math.round(Graphics.boxHeight / 16);
};

Window_ResolutionList.prototype.initWithAspectRatio = function (data) {
    if(RS.ScreenManager.Params.options.aspectRatio) {

    var config = new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0], RS.ScreenManager.Params.settings.customAspectRatio[1]);
    var insData = parseInt(window.screen.availWidth / RS.ScreenManager.Params.settings.customAspectRatio[0]) * RS.ScreenManager.Params.settings.customAspectRatio[0];
    var fullscreenData = config.getSize(insData);

    data.push(new Point(fullscreenData[0], fullscreenData[1]));

    }

    return data;

};

Window_ResolutionList.prototype.initWithItemPoint = function () {
    var data = Graphics.getAvailGraphicsArray('Number');
    var ret = [];

    // 배열 내 중복된 데이터를 제거합니다.
    this.uniqWithPoint(data.slice(0), function (newData) {
    ret = newData;
    });

    ret = this.initWithAspectRatio(ret);

    this._itemToPoint = ret;
};

Window_ResolutionList.prototype.uniqWithPoint = function (data, callback) {
    var ret = [];
    ret = data.filter(function(e, i, a) {

    if(a[i-1] instanceof Point) {

        if(a[i-1].x === e.x && a[i-1].y === e.y) {

        return false;

        }

        return true;

    } else {

        return true;

    }
    });

    callback(ret);

};

Window_ResolutionList.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
};

Window_ResolutionList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ResolutionList.prototype.item = function() {
    return this._data && this._index >= 0 ? this._data[this._index] : null;
};

Window_ResolutionList.prototype.makeItemList = function() {
    this._data = Graphics.getAvailGraphicsArray('String');
    if(RS.ScreenManager.Params.options.aspectRatio) this._data = this.uniq(this._data.slice(0));
    if(!RS.ScreenManager.isFullscreen()) {
    this._data.push(RS.ScreenManager.localization.get("Full Screen"));
    } else {
    this._data.push(RS.ScreenManager.localization.get("Windowed Mode"));
    }
};

Window_ResolutionList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_ResolutionList.prototype.isEnabled = function(item) {
    return !!item;
};

Window_ResolutionList.prototype.resetFontSettings = function() {
    this.contents.fontFace = this.standardFontFace();
    this.contents.fontSize = this.standardFontSize();
    this.contents.outlineColor = Utils.rgbToCssColor(128, 0, 0);
    this.contents.outlineWidth = 2;
    this.resetTextColor();
};

Window_ResolutionList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];

    this.resetTextColor();

    this.drawText(text, rect.x, rect.y, rect.width, 'center');

};

Window_ResolutionList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ResolutionList.prototype.uniq = function (data) {
    data = data.filter(function (e, i, a) {
    return a.indexOf(e) === i;
    }, this);
    return data;
};
//#endregion

//============================================================================
//#region Window_ResolutionListForMobile
//============================================================================
/**
 * PC가 아닌 플랫폼에서는 창 사이즈가 변경되지 않으므로 그래픽 객체 크기를 변경한다.
 * @class Window_ResolutionListForMobile
 */
function Window_ResolutionListForMobile() {
    this.initialize.apply(this, arguments);
};

Window_ResolutionListForMobile.prototype = Object.create(Window_ResolutionList.prototype);
Window_ResolutionListForMobile.prototype.constructor = Window_ResolutionListForMobile;

Window_ResolutionListForMobile.prototype.initialize = function (x, y, width, height) {
    Window_ResolutionList.prototype.initialize.call(this, x, y, width, height);
};

Window_ResolutionListForMobile.prototype.initWithItemPoint = function () {
    var temp = RS.ScreenManager.Params.options.allResolutions;
    var ret, data = Graphics.getAvailGraphicsArray("Number");
    RS.ScreenManager.Params.options.allResolutions = temp;

    ret = this.initWithAspectRatio(data);

    this._itemToPoint = ret;
};

Window_ResolutionListForMobile.prototype.lineHeight = function () {
    return Math.round(Graphics.boxHeight / 10);
};

Window_ResolutionListForMobile.prototype.makeItemList = function() {
    this._data = RS.ScreenManager.localization.get("MobileResolutions");
};

Window_ResolutionListForMobile.prototype.getCurrentItemToPoint = function () {
    return this._itemToPoint && this._index >= 0 ? this._itemToPoint[this._index] : null;
};

Window_ResolutionListForMobile.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var text = this._data[index];
    this.resetTextColor();
    this.drawText(text, rect.x, rect.y, rect.width, 'center');
};

window.Window_ResolutionList = Window_ResolutionList;
window.Window_ResolutionListForMobile = Window_ResolutionListForMobile;

//#endregion