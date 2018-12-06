/*:
 * @plugindesc 한글 비트맵 폰트 <RS_HangulBitmapText>
 * @author biud436
 * 
 * @param fontName
 * @text 폰트명
 * @desc 폰트의 이름을 적으십시오.
 * @default 나눔고딕
 * 
 * @help
 * 비트맵 폰트는 나눔고딕 32px 기반이며 2048 사이즈의 아틀라스 Texture입니다.
 * 필요한 파일은 hangul_0.png 파일과 hangul.xml 파일이며 해당 파일을
 * img/hangul 폴더에 위치시켜주시기 바랍니다.
 * 
 * 흰색이 가장 빠르게 그려지며, 
 * 다른 색상은 더블 버퍼링을 거치므로 속도가 약간 느립니다.
 * 
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2018.02.18 (v1.0.0) - First Release.
 * 2018.02.18 (v1.0.1) :
 * - 화살표 추가
 * 2018.02.22 (v1.0.2) - y값 조절
 * 2018.02.22 (v1.0.3) - 메시지 윈도우 최적화
 * 2018.03.02 (v1.0.4) :
 * - 'c is not defined" 오류 수정
 * - 한글 비트맵 폰트와의 호환성
 * 2018.12.06 (v1.0.5) :
 * - 비트맵 변환 과정을 없앴습니다.
 * - 퍼포먼스가 향상되었습니다.
 */

var Imported = Imported || {};
Imported.RS_HangulBitmapText = true;

var RS = RS || {};
RS.HangulBitmapText = RS.HangulBitmapText || {};
RS.HangulBitmapText.Params = RS.HangulBitmapText.Params || {};

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_HangulBitmapText>');
  });
  
  parameters = (parameters.length > 0) && parameters[0].parameters;

  // CanvasRenderingContext2D CanvasRenderingContext2D drawTextInternal를 나중에 참고할 것.
  // https://chromium.googlesource.com/chromium/blink/+/master/Source/modules/canvas2d/CanvasRenderingContext2D.cpp#1942

  RS.HangulBitmapText.Params.init = false;
  RS.HangulBitmapText.Params.tempInit = false;
  RS.HangulBitmapText.Params.fontName = parameters["fontName"] || "나눔고딕";
  RS.HangulBitmapText.Params.fntName = 'img/hangul/hangul.xml';
  RS.HangulBitmapText.Params.resources = null;

  PIXI.loader
      .add(RS.HangulBitmapText.Params.fontName, RS.HangulBitmapText.Params.fntName)
      .load(onAssetsLoaded);

  function onAssetsLoaded(loader, resources) {
    var xml = resources[RS.HangulBitmapText.Params.fontName];
    if(xml && xml.data) {
      RS.HangulBitmapText.Params.resources = xml.data;
    }
    RS.HangulBitmapText.Params.init = true;
  };

  //============================================================================
  // Bitmap
  //============================================================================    

  var alias_Bitmap_measureTextWidth = Bitmap.prototype.measureTextWidth;
  Bitmap.prototype.measureTextWidth = function(text) {
    if(!RS.HangulBitmapText.Params.init) return alias_Bitmap_measureTextWidth.call(this, text);
    var data = PIXI.extras.BitmapText.fonts[RS.HangulBitmapText.Params.fontName];
    var pos = 0;
    for(var i=0; i<text.length; ++i) {
      var charCode = text.charCodeAt(i);
      if(!data) {
        return alias_Bitmap_measureTextWidth.call(this, text);
      }
      var charData = data.chars[charCode];
      if(!charData) {
        return alias_Bitmap_measureTextWidth.call(this, text);
      }
      pos += parseInt(charData.xAdvance, 10);
    }
    return pos;
  };

  ImageManager.loadHangul = function(filename, hue) {
    return this.loadBitmap('img/hangul/', filename, hue, true);
  };

  /**
   * PIXI.extras.BitmapText.fonts for RPG Maker MV
   * https://github.com/pixijs/pixi.js/blob/dev/src/extras/BitmapText.js
   */
  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {

    this._letterSpacing = 0;

    var data = PIXI.extras.BitmapText.fonts[RS.HangulBitmapText.Params.fontName];
    var scale = this.fontSize / data.size;
    var pos = new PIXI.Point();
    var chars = [];
    var lineWidths = [];
    var text = text.replace(/(?:\r\n|\r)/g, '\n');
    var textLength = text.length;
    var maxWidth = maxWidth * data.size / this.fontSize;

    var prevCharCode = null;
    var lastLineWidth = 0;
    var maxLineWidth = maxWidth;
    var line = 0;
    var lastBreakPos = -1;
    var lastBreakWidth = 0;
    var spacesRemoved = 0;
    var maxLineHeight = 0;

    for (var i = 0; i < textLength; i++)
    {
        var charCode = text.charCodeAt(i);
        var char = text.charAt(i);

        if (/(?:\s)/.test(char))
        {
            lastBreakPos = i;
            lastBreakWidth = lastLineWidth;
        }

        if (char === '\r' || char === '\n')
        {
            lineWidths.push(lastLineWidth);
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
            ++line;
            ++spacesRemoved;

            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
            continue;
        }

        var charData = data.chars[charCode];

        if (!charData)
        {
            continue;
        }

        if (prevCharCode && charData.kerning[prevCharCode])
        {
            pos.x += charData.kerning[prevCharCode];
        }

        chars.push({
            texture: charData.texture,
            line,
            charCode,
            position: new PIXI.Point(pos.x + charData.xOffset + (this._letterSpacing / 2), pos.y + charData.yOffset),
        });
        pos.x += charData.xAdvance + this._letterSpacing;
        lastLineWidth = pos.x;
        maxLineHeight = Math.max(maxLineHeight, (charData.yOffset + charData.texture.height));
        prevCharCode = charCode;

        if (lastBreakPos !== -1 && maxWidth > 0 && pos.x > maxWidth)
        {
            ++spacesRemoved;
            PIXI.utils.removeItems(chars, 1 + lastBreakPos - spacesRemoved, 1 + i - lastBreakPos);
            i = lastBreakPos;
            lastBreakPos = -1;

            lineWidths.push(lastBreakWidth);
            maxLineWidth = Math.max(maxLineWidth, lastBreakWidth);
            line++;

            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
        }
    }

    var lastChar = text.charAt(text.length - 1);

    if (lastChar !== '\r' && lastChar !== '\n')
    {
        if (/(?:\s)/.test(lastChar))
        {
            lastLineWidth = lastBreakWidth;
        }

        lineWidths.push(lastLineWidth);
        maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
    }

    var lineAlignOffsets = [];

    for (var i = 0; i <= line; i++)
    {
        var alignOffset = 0;

        if (align === 'right')
        {
            alignOffset = maxLineWidth - lineWidths[i];
        }
        else if (align === 'center')
        {
            alignOffset = (maxLineWidth - lineWidths[i]) / 2;
        }

        lineAlignOffsets.push(alignOffset);
    }

    var lenChars = chars.length;

    var textWidth = maxLineWidth * scale;
    var textHeight = (pos.y + data.lineHeight) * scale;  

    var tx = x;
    var ty = y + (lineHeight - textHeight) * 0.7;
    
    var isProcessTextColor = false;
    if(this.textColor !== "#ffffff") {
      isProcessTextColor = true;
    }

    var bitmap;

    // 퍼포먼스가 저하됩니다.
    if(isProcessTextColor) {
      bitmap = new Bitmap(this.width, this.height);
      ctx = bitmap._context;
    } else {
      ctx = this._context;
    }

    var source = null;
    var previousFilename = null; 
 
    for (var i = 0; i < lenChars; i++)
    {
      // Extract the file-name.
      var item = chars[i].texture.baseTexture.source.src.split("/").pop();
      // Remove the file-format.
      var filename = item.replace(".png", "");
      // Load the bitmap.
      if(filename !== previousFilename) {
        previousFilename = filename;
        source = ImageManager.loadHangul(filename);
      }

      // Get the real texture rect.
      var frame = chars[i].texture.frame;

      var rect = new PIXI.Rectangle(
        tx + (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale, 
        ty + chars[i].position.y * scale, 
        frame.width * scale, 
        frame.height * scale        
      );
            
      // Blt
      if(isProcessTextColor) {
        bitmap.blt(source, frame.x, frame.y, frame.width, frame.height, 
          rect.x, rect.y, rect.width, rect.height);
      } else {
        this.blt(source, frame.x, frame.y, frame.width, frame.height, 
          rect.x, rect.y, rect.width, rect.height);
      }

    }

    if(isProcessTextColor) {

      // Change Color
      var color = PIXI.utils.hex2rgb(parseInt("0x" + this.textColor.slice(1)));

      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = 'rgba(%1, %2, %3, 1.0)'.format(color[0] * 255, color[1] * 255, color[2] * 255);
      ctx.fillRect(
        tx,
        ty, 
        textWidth, 
        textHeight);    

      // Double Bufferring
      this.blt(bitmap, 0, 0, this.width, this.height, 0, 0);
    }

  };

  //============================================================================
  // Scene_Boot
  //============================================================================

  var _alias_Scene_Boot_create = Scene_Boot.prototype.create;
  Scene_Boot.prototype.create = function() {
    _alias_Scene_Boot_create.call(this);
  };

  var alias_Scene_Boot_isReady = Scene_Boot.prototype.isReady;
  Scene_Boot.prototype.isReady = function() {
    var ret = false;
    if(alias_Scene_Boot_isReady.call(this)) {
      if(RS.HangulBitmapText.Params.init) {
        var pages = RS.HangulBitmapText.Params.resources.getElementsByTagName('page');

        for (var i = 0; i < pages.length; i++)
        {
            var id = pages[i].getAttribute('id');
            var file = pages[i].getAttribute('file');

            if(file) {
              ImageManager.loadHangul(file.replace(".png", ""));
              ret = ImageManager.isReady();
            }
        }        
      }
      return RS.HangulBitmapText.Params.init && ret;
    } else {
      return false;
    }
  };

})();
