/*:ko
 * @plugindesc PIXI의 비트맵 폰트(PIXI.extras.BitmapText)로 화면에 있는 모든 텍스트를 묘화하는 플러그인입니다.
 * @author biud436
 * @help
 * 비트맵 폰트는 나눔고딕 32px 기반이며 2048 사이즈의 아틀라스 Texture입니다.
 * 필요한 파일은 hangul_0.png 파일과 hangul.xml 파일이며 해당 파일을
 * img/hangul 폴더에 위치시켜주시기 바랍니다.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2018.02.18 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_HangulBitmapText = true;

var RS = RS || {};
RS.HangulBitmapText = RS.HangulBitmapText || {};
RS.HangulBitmapText.Params = RS.HangulBitmapText.Params || {};

(function () {

  RS.HangulBitmapText.Params.init = false;
  RS.HangulBitmapText.Params.fontName = "나눔고딕";
  RS.HangulBitmapText.Params.fntName = 'img/hangul/hangul.xml';

  PIXI.loader
      .add(RS.HangulBitmapText.Params.fontName, RS.HangulBitmapText.Params.fntName)
      .load(onAssetsLoaded);

  function onAssetsLoaded() {
    RS.HangulBitmapText.Params.init = true;
  };

  // https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
  function colourNameToHex(colour)
  {
      var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
      "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
      "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
      "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
      "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
      "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
      "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
      "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
      "honeydew":"#f0fff0","hotpink":"#ff69b4",
      "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
      "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
      "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
      "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
      "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
      "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
      "navajowhite":"#ffdead","navy":"#000080",
      "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
      "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
      "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
      "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
      "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
      "violet":"#ee82ee",
      "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
      "yellow":"#ffff00","yellowgreen":"#9acd32"};

      if (typeof colours[colour.toLowerCase()] != 'undefined')
          return colours[colour.toLowerCase()];

      return false;
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

  Bitmap.colorToHex = function (color) {
    var defaultColor = this.textColor;
    if(typeof(color) !== "string") return defaultColor;
    if(color.indexOf("#") >= 0) {
      color = parseInt(color.replace("#", "0x"));
      if(color !== NaN) return color;
    } else {
      color = colourNameToHex(color);
      color = parseInt(color.replace("#", "0x"));
      if(color !== NaN) return color;
    }
    return defaultColor;
  };

  var alias_Bitmap_measureTextWidth = Bitmap.prototype.measureTextWidth;
  Bitmap.prototype.measureTextWidth = function(text) {
    if(!RS.HangulBitmapText.Params.init) return alias_Bitmap_measureTextWidth.call(this, c);
    var data = PIXI.extras.BitmapText.fonts[RS.HangulBitmapText.Params.fontName];
    var pos = 0;
    for(var i=0; i<text.length; ++i) {
      var charCode = text.charCodeAt(i);
      if(!data) {
        return alias_Bitmap_measureTextWidth.call(this, c);
      }
      var charData = data.chars[charCode];
      if(!charData) {
        return alias_Bitmap_measureTextWidth.call(this, c);
      }
      pos += parseInt(charData.xAdvance, 10);
    }
    return pos;
  };

  /**
   * @link https://github.com/pixijs/pixi.js/blob/dev/src/extras/BitmapText.js
   */
  var alias_Bitmap_drawText = Bitmap.prototype.drawText;
  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    if(!RS.HangulBitmapText.Params.init) return;

    if(/[^0-9]+/i.test(text) === false) {
      return alias_Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
    } 

    var fontSize = this.fontSize;
    var textColor = Bitmap.colorToHex(this.textColor);

    var data = PIXI.extras.BitmapText.fonts[RS.HangulBitmapText.Params.fontName];
    if(data) {
      lineHeight = lineHeight || data.lineHeight;
    }

    var bitmapFontText = new PIXI.extras.BitmapText(text, {
        font: '%1px %2'.format(fontSize, RS.HangulBitmapText.Params.fontName),
        align: align || "left",
        tint: textColor
      });

    bitmapFontText.updateText();

    maxWidth = maxWidth || this.measureTextWidth(text);

    // 비트맵 폰트를 렌더링한 후 비트맵으로 변환
    var bitmap = Bitmap.snapFast(bitmapFontText, maxWidth, fontSize );

    var tx = x;
    var ty = y + (lineHeight - bitmapFontText.textHeight) / 2;

    if (align === 'center') {
        tx += (maxWidth - bitmapFontText.textWidth) / 2;
    }
    if (align === 'right') {
        tx += (maxWidth - bitmapFontText.textWidth);
    }

    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, tx, ty, bitmap.width);

  };

  //============================================================================
  // Window_Base
  //============================================================================

  /**
   * 글자 간의 간격 조절을 위한 함수
   */
  Window_Base.prototype.getXAdvance = function (c) {
    if(!RS.HangulBitmapText.Params.init) return this.textWidth(c);
    var data = PIXI.extras.BitmapText.fonts[RS.HangulBitmapText.Params.fontName];
    var charCode = c.charCodeAt(0);
    if(!data) {
      return this.textWidth(c);
    }
    var charData = data.chars[charCode];
    if(!charData) {
      return this.textWidth(c);
    }
    return charData.xAdvance;
  };

  Window_Base.prototype.processNormalCharacter = function(textState) {
    var c = textState.text[textState.index++];
    var w = this.getXAdvance(c);
    this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
  };

  //============================================================================
  // Scene_Boot
  //============================================================================

  var alias_Scene_Boot_isReady = Scene_Boot.prototype.isReady;
  Scene_Boot.prototype.isReady = function() {
    if(alias_Scene_Boot_isReady.call(this)) {
      return RS.HangulBitmapText.Params.init;
    } else {
      return false;
    }
  };

})();
