/*:
 * RS_SaveFileList.js
 * @plugindesc This plugin displays a face graphic on the save & load screen.
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_SaveFileList = true;

(function() {

Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
    if (info.characters) {
        for (var i = 0; i < info.faces.length; i++) {
            var data = info.faces[i];
            this.drawFace(data[0], data[1], x + i * 78, this.standardPadding(), 144, 144);
        }
    }
};

Window_SavefileList.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    var itemWH = this.itemHeight() - this.standardPadding();
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, itemWH, itemWH );
};

})();
