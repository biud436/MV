//============================================================================
// ScreenConfig
//============================================================================

function ScreenConfig() {
    this.initialize.apply(this, arguments);
};

ScreenConfig.prototype.constructor = ScreenConfig;
ScreenConfig.prototype.initialize = function (originWidth, originHeight, orientation) {
    this._originWidth = originWidth;
    this._originHeight = originHeight;
    this._orientation = orientation;
    this._aspectRatio = this.getRatio(originWidth, originHeight);
};

ScreenConfig.prototype.gcd = function (p, q) {
    var self = this;
    if (q === 0) return p;

    return this.gcd(q, p % q);

};

ScreenConfig.prototype.getSize = function (virtualWidth) {
    var ret, w, h;

    w = parseInt(virtualWidth);
    h = parseInt(Math.round(this.getHeight(virtualWidth)));
    ret = [w, h];

    return ret;
};

ScreenConfig.prototype.getRatio = function (width, height) {
    var gcd, ret;
    if (width === height) return [1, 1];
    gcd = this.gcd(width, height);
    ret = [(width / gcd), (height / gcd)];
    return ret;
};

ScreenConfig.prototype.getRatioAsString = function (width, height) {
    var gcd, temp, ret;
    if (width === height) return [1, 1];
    if (width < height) {
        temp = width;
        width = height;
        height = temp;
    }
    gcd = this.gcd(width, height);
    ret = Number(width / gcd) + ':' + Number(height / gcd);

    return ret;

};

ScreenConfig.prototype.getWidth = function (newHeight) {
    var ar = this._aspectRatio;
    var ratio = parseFloat(ar[0] / ar[1]);

    return ratio * newHeight;

};

ScreenConfig.prototype.getHeight = function (newWidth) {
    var ar = this._aspectRatio;
    var ratio = parseFloat(ar[1] / ar[0]);

    return ratio * newWidth;

};

window.ScreenConfig = ScreenConfig;

//============================================================================
// CustomScreenConfig
//============================================================================
function CustomScreenConfig() {
    this.initialize.apply(this, arguments);
};

CustomScreenConfig.prototype = Object.create(ScreenConfig.prototype);
CustomScreenConfig.prototype.constructor = CustomScreenConfig;

CustomScreenConfig.prototype.initialize = function (a, b) {
    // We don't need parameters,
    // But it is just for calling the constructor of corresponding superclass.
    ScreenConfig.prototype.initialize.call(this, 1600, 900, 'landscape');
    a = a || 16;
    b = b || 9;
    this._aspectRatio = [a, b];
};

window.CustomScreenConfig = CustomScreenConfig;

//============================================================================
// Point
//============================================================================
Point.prototype.toString = function () {
    return this.x + ' x ' + this.y;
};
