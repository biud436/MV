/*:
 *
 */

var Imported = Imported || {};
Imported.RS_HangulBitmapText = true;

(function () {

  var init = false;

  PIXI.loader
      .add('나눔고딕', 'img/hangul/hangul.xml')
      .load(onAssetsLoaded);

  function onAssetsLoaded() {
    init = true;
  }

  Bitmap.snapFast = function(stage, maxWidth, lineHeight) {
      var width = maxWidth;
      var height = lineHeight;
      var bitmap = new Bitmap(width, height);
      var context = bitmap._context;
      var renderTexture = PIXI.RenderTexture.create(width, height);
      if (stage) {
          Graphics._renderer.render(stage, renderTexture);
          stage.worldTransform.identity();
          var canvas = null;
          if (Graphics.isWebGL()) {
              canvas = Graphics._renderer.extract.canvas(renderTexture);
          } else {
              canvas = renderTexture.baseTexture._canvasRenderTarget.canvas;
          }
          context.drawImage(canvas, 0, 0);
      } else {

      }
      renderTexture.destroy({ destroyBase: true });
      bitmap._setDirty();
      return bitmap;
  };


  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    var fontSize = this.fontSize;
    align = align || "left";
    var bitmapFontText = new PIXI.extras.BitmapText(text, {
        font: '%1px 나눔고딕'.format(fontSize),
        align: align
      });
    var bitmap = Bitmap.snapFast(bitmapFontText, maxWidth, fontSize);
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, bitmap.width, bitmap.height);
  };

})();
