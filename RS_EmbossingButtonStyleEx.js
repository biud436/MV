/*:ko
 * @plugindesc 버튼 스타일을 엠보싱 스타일로 변경합니다 <RS_EmbossingButtonStyleEx>
 * @author biud436
 *
 * @param backColor1
 * @text 배경 색상 1
 * @desc Specify the background color
 * @default rgb(156, 161, 160)
 *
 * @param backColor2
 * @text 배경 색상 2
 * @desc Specify the background color
 * @default rgb(108, 124, 124)
 *
 * @param borderColor1
 * @text 테두리 색상 1
 * @desc Specify the border color
 * @default rgb(232, 231, 226)
 *
 * @param borderColor2
 * @text 테두리 색상 2
 * @desc Specify the border color
 * @default rgb(30, 33, 32)
 *
 * @param lineWidth
 * @type number
 * @text 테두리 굵기
 * @desc Specify the line width
 * @default 2
 *
 * @help
 * =============================================================================
 * 플러그인 동작 환경
 * =============================================================================
 * Windows 10, RMMV 1.6.0
 */
/*:
 * @plugindesc Embossing Button & Cursor Style <RS_EmbossingButtonStyleEx>
 * @author biud436
 *
 * @param backColor1
 * @text Background Color1
 * @desc Specify the background color
 * @default rgb(156, 161, 160)
 *
 * @param backColor2
 * @text Background Color2
 * @desc Specify the background color
 * @default rgb(108, 124, 124)
 *
 * @param borderColor1
 * @text Border Color1
 * @desc Specify the border color
 * @default rgb(232, 231, 226)
 *
 * @param borderColor2
 * @text Border Color2
 * @desc Specify the border color
 * @default rgb(30, 33, 32)
 *
 * @param lineWidth
 * @type number
 * @text Line Width
 * @desc Specify the line width
 * @default 2
 *
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_EmbossingButtonStyleEx = true;

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_EmbossingButtonStyleEx>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var param = {
    backColor1 : parameters['backColor1'] || 'rgb(156, 161, 160)',
    backColor2 :  parameters['backColor2'] || 'rgb(108, 124, 124)',
    borderColor1: parameters['borderColor1'] || "rgb(232, 231, 226)",
    borderColor2: parameters['borderColor2'] || "rgb(30, 33, 32)",
    lineWidth: parseInt(parameters['lineWidth']) || 2
  };

  //============================================================================
  // Bitmap
  //============================================================================

  Bitmap.prototype.gradientButtonFillRect = function(x, y, width, height, color1,
                                               color2, vertical) {
      var context = this._context;
      var grad, border;
      var lineWidth = param.lineWidth;
      if (vertical) {
          grad = context.createLinearGradient(x, y, x, y + height);
          border = context.createLinearGradient(x, y, x, y + height);
      } else {
          grad = context.createLinearGradient(x, y, x + width, y);
          border = context.createLinearGradient(x, y, x + width, y);
      }
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      border.addColorStop(0, param.borderColor1);
      border.addColorStop(1, param.borderColor2);
      context.save();
      context.lineJoin = "round";
      context.lineWidth = lineWidth;
      context.fillStyle = grad;
      context.strokeStyle = border;
      context.strokeRect(x + lineWidth/2, y + lineWidth/2, width - lineWidth, height - lineWidth);
      context.fillRect(x + lineWidth/2, y + lineWidth/2, width - lineWidth, height - lineWidth);
      context.restore();
      this._setDirty();
  };

  //============================================================================
  // Window_Selectable
  //============================================================================

  Window_Selectable.prototype._refreshCursor = function() {
      var pad = this._padding;
      var x = this._cursorRect.x + pad - this.origin.x;
      var y = this._cursorRect.y + pad - this.origin.y;
      var w = this._cursorRect.width;
      var h = this._cursorRect.height;
      var m = 4;
      var x2 = Math.max(x, pad);
      var y2 = Math.max(y, pad);
      var ox = x - x2;
      var oy = y - y2;
      var w2 = Math.min(w, this._width - pad - x2);
      var h2 = Math.min(h, this._height - pad - y2);
      var bitmap = new Bitmap(w2, h2);
      var color1 = param.backColor1;
      var color2 = param.backColor2;
      var textPadding = Math.floor(this.textPadding() / 2);

      this._windowCursorSprite.bitmap = bitmap;
      this._windowCursorSprite.setFrame(0, 0, w2, h2);
      this._windowCursorSprite.move(x2, y2);

      if (w > 0 && h > 0 && this._windowskin) {
          var skin = this._windowskin;
          var p = 96;
          var q = 48;
          bitmap.gradientButtonFillRect(ox, oy, w2, h2 - textPadding, color1, color2, true);
      }
  };

  Window_Selectable.prototype.drawItemDefaultBackground = function(index) {
      var rect = this.itemRect(index);
      var color1 = param.backColor1;
      var color2 = param.backColor2;
      var textPadding = Math.floor(this.textPadding() / 2);
      this.changePaintOpacity(false);
      this.contents.gradientButtonFillRect(rect.x, rect.y, rect.width, rect.height - textPadding, color1, color2, true);
      this.changePaintOpacity(true);
  };

  Window_Selectable.prototype.drawAllItems = function() {
      var topIndex = this.topIndex();
      for (var i = 0; i < this.maxPageItems(); i++) {
          var index = topIndex + i;
          if (index < this.maxItems()) {
              this.drawItemDefaultBackground(index);
              this.drawItem(index);
          }
      }
  };

  Window_Selectable.prototype.redrawItem = function(index) {
      if (index >= 0) {
          this.clearItem(index);
          this.drawItemDefaultBackground(index);
          this.drawItem(index);
      }
  };

})();
