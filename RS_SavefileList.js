/*:
 * RS_SaveFileList.js
 * @plugindesc This plugin displays a face graphic on the save & load screen.
 * @author biud436
 *
 * @param Project Title
 * @desc Decide whether the project title is drawing.
 * @default false
 *
 * @param Play Time
 * @desc Decide whether the play time is drawing.
 * @default true
 *
 * @param Preload Faces
 * @desc Allow you to pre-load the base face chips.
 * @default ['Actor1', 'Actor2', 'Actor3']
 *
 * @help
 * 2015.12.21 (v1.0.0) - First Release
 * 2016.07.15 (v1.0.1) - Fixed the bug and then added plugin parameters
 */

var Imported = Imported || {};
Imported.RS_SaveFileList = true;

(function() {

  var parameters = PluginManager.parameters('RS_SaveFileList');
  var isProjectTitle = Boolean(parameters['Project Title'] === 'true');
  var isPlayTime = Boolean(parameters['Play Time'] === 'true');

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

  Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
      var bottom = rect.y + rect.height;
      if (rect.width >= 420) {
          if(isProjectTitle) this.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);
          if (valid) {
              this.drawPartyCharacters(info, rect.x + 220, rect.y + 4);
          }
      }
      var lineHeight = this.lineHeight();
      var y2 = bottom - lineHeight;
      if (y2 >= lineHeight) {
          if(isPlayTime) this.drawPlaytime(info, rect.x, y2, rect.width);
      }
  };

  Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
      if (info.characters) {
          for (var i = 0; i < info.faces.length; i++) {
              var data = info.faces[i];
              this.drawFace(data[0], data[1], x + i * 78, y + this.standardPadding(), 144, 144);
          }
      }
  };

})();
