//================================================================
// RS_HangulBitmapText.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc 한글 비트맵 폰트 <RS_HangulBitmapText>
 * @author biud436
 *
 * @help
 * 이 플러그인을 사용하려면 YEP_CoreEngine에서 약간의 설정이 필요합니다.
 * 우선 해상도 설정에 따라 그래픽 스케일 값이 달라질 수 있습니다.
 * 코어 엔진에서 그래픽 스케일 업데이트 설정을 해야 비트맵 폰트가 축소나 확대되지 않습니다.
 * 
 * 그래픽 스케일 업데이트 방법은 
 * YEP_CoreEngine 플러그인에서 Update Real Scale 매개변수를 true로 체크하면 됩니다.
 * 
 * 또한 Font Size도 변경해야 합니다. 
 * 선택한 비트맵 폰트의 사이즈와 동일하게 설정하시기 바랍니다.
 * 
 * 메시지 코어나 한글 메시지 시스템에서도 같은 폰트 사이즈로 변경해야 합니다.
 * 폰트 사이즈가 다르면 비트맵 폰트가 축소 및 확대되면서 약간 변형돼 보일 수 있기 때문입니다.
 * 
 * 비트맵 폰트는 세 가지 종류가 준비되어있습니다.
 * 
 * 나눔고딕 32px, 
 * 굴림 16px, 
 * 굴림 32px 중 하나를 선택할 수 있습니다.
 * 
 * 필요한 파일은 hangul_0.png 파일과 hangul.xml 파일입니다. 
 * 해당 파일들을 img/hangul 폴더에 위치시켜주시기 바랍니다.
 * 
 * 기본 비트맵 텍스트의 색상인 흰색이 가장 빠르게 그려집니다.
 * 
 * 텍스트 코드에서 색상 변경 명령어로 다른 색상을 사용하는 경우, 
 * 비트맵이 준비되지 않았기 때문에 약간의 가공을 거쳐야 하므로 조금은 느려질 수 있습니다.
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
 * 2018.12.08 (v1.0.6) :
 * - 숫자 파싱 오류 수정
 * 2019.07.21 (v1.0.7) :
 * - 비트맵 텍스트 이미지에 검정색 테두리를 추가하였습니다.
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
  RS.HangulBitmapText.Params.fontName = "defaultFont";
  RS.HangulBitmapText.Params.fntName = 'img/hangul/hangul.xml';
  RS.HangulBitmapText.Params.resources = null;
  RS.HangulBitmapText.Params.optimize = false;

  PIXI.loader
      .add(RS.HangulBitmapText.Params.fontName, RS.HangulBitmapText.Params.fntName)
      .load(onAssetsLoaded);

  function onAssetsLoaded(loader, resources) {
    var keys = Object.keys(resources);
    var item = null;
    keys.forEach(function(i) {
      if(resources[i] && resources[i].extension === "xml") {
        RS.HangulBitmapText.Params.fontName = resources[i].bitmapFont.font;
        RS.HangulBitmapText.Params.resources = resources[i].data;
      }
    }, this);
    RS.HangulBitmapText.Params.init = true;
  };

  //============================================================================
  // Bitmap
  //============================================================================    

  var alias_Bitmap_measureTextWidth = Bitmap.prototype.measureTextWidth;
  Bitmap.prototype.measureTextWidth = function(text) {
    if(!RS.HangulBitmapText.Params.init) return alias_Bitmap_measureTextWidth.call(this, text);
    var data = PIXI.extras.BitmapText.fonts[RS.HangulBitmapText.Params.fontName];
    var scale = this.fontSize / data.size;
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
      pos += parseInt(charData.xAdvance, 10) * scale;
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
    
    text = String(text);

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

    if(RS.HangulBitmapText.Params.optimize) {
      isProcessTextColor = false;
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

      if(source && source._context) {
        var pixels = source._context.getImageData(0, 0, 1, 1).data;
        if(pixels[3] != 0x00) {
          console.error("알파값이 투명이 아닌 Texture는 제대로 그려지지 않습니다.");
        }
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
        this.blt(source, frame.x, frame.y, frame.width, frame.height, rect.x, rect.y, rect.width, rect.height);
      } else {
        this.blt(source, frame.x, frame.y, frame.width, frame.height, rect.x, rect.y, rect.width, rect.height);
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
