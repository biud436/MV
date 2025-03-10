//================================================================
// RS_Window_SpanishNameInput.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to type the Spanish name in the Name Input <RS_Window_SpanishNameInput>
 * @author biud436
 *
 * @param Font Size
 * @desc Specify the font size in name processing.
 * @default 28
 *
 * @param Line Height
 * @desc Specify the line height for window.
 * @default 36
 *
 * @param Window Width
 * @desc Calculate the window width.
 * @default 480
 *
 * @param Window Height
 * @desc Calculate the window height.
 * @default this.fittingHeight(6);
 *
 * @param Default Button Width
 * @desc Specify the default button width.
 * @default Math.floor(this.width/this.maxCols());
 *
 * @param Center Spacing
 * @desc Specify the spacing value in the middle space.
 * @default 0
 *
 * @param Button Type
 * @type boolean
 * @desc Sets the button width how to calculate the width.
 * @default false
 * @on Crop
 * @off Expand
 *
 * @help
 * =============================================================================
 * Q & A
 * =============================================================================
 * Q. How to prevent to being expanded button width automatically when the text length is too long?
 * A. In the plugin parameter named Button Type, if you set the Crop option, it can decrease the font size of the button if the text width is larger than the default button width.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2018.02.24 (v1.0.0) - First Release.
 * 2018.10.13 (v1.0.1) - Added several plugin parameters.
 */
/*:ko
 * @plugindesc 이 플러그인은 이름 입력에서 스페인어를 입력할 수 있게 해줍니다. <RS_Window_SpanishNameInput>
 * @author 러닝은빛(biud436)
 *
 * @param Font Size
 * @desc Specify the font size in name processing.
 * @default 28
 *
 * @param Line Height
 * @desc Specify the line height for window.
 * @default 36
 *
 * @param Window Width
 * @desc Calculate the window width.
 * @default 480
 *
 * @param Window Height
 * @desc Calculate the window height.
 * @default this.fittingHeight(6);
 *
 * @param Default Button Width
 * @desc Specify the default button width.
 * @default Math.floor(this.width/this.maxCols());
 *
 * @param Center Spacing
 * @desc Specify the spacing value in the middle space.
 * @default 0
 *
 * @param Button Type
 * @type boolean
 * @desc Sets the button width how to calculate the width.
 * @default false
 * @on Crop
 * @off Expand
 *
 * @help
 * =============================================================================
 * Q & A
 * =============================================================================
 * Q. How to prevent to being expanded button width automatically when the text length is too long?
 * A. In the plugin parameter named Button Type, if you set the Crop option, it can decrease the font size of the button if the text width is larger than the default button width.
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2018.02.24 (v1.0.0) - First Release.
 * 2018.10.13 (v1.0.1) - Added several plugin parameters.
 */

var Imported = Imported || {};
Imported.RS_Window_SpanishNameInput = true;

var RS = RS || {};
RS.Window_SpanishNameInput = RS.Window_SpanishNameInput || {};
RS.Window_SpanishNameInput.Params = RS.Window_SpanishNameInput.Params || {};

(function () {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_Window_SpanishNameInput>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.Window_SpanishNameInput.Params.fontSize = parseInt(
    parameters['Font Size'] || 28
  );
  RS.Window_SpanishNameInput.Params.windowWidthEval =
    parameters['Window Width'] || '480';
  RS.Window_SpanishNameInput.Params.windowHeightEval =
    parameters['Window Height'] || 'this.fittingHeight(6);';
  RS.Window_SpanishNameInput.Params.lineHeight = parseInt(
    parameters['Line Height'] || 36
  );
  RS.Window_SpanishNameInput.Params.buttonWidth =
    parameters['Default Button Width'] || '42';
  RS.Window_SpanishNameInput.Params.isCropped = Boolean(
    parameters['Button Type'] === 'true'
  );
  RS.Window_SpanishNameInput.Params.centerSpacing = parseInt(
    parameters['Center Spacing'] || 0
  );

  function Window_SpanishNameInput() {
    this.initialize.apply(this, arguments);
  }

  Window_SpanishNameInput.prototype = Object.create(Window_NameInput.prototype);
  Window_SpanishNameInput.prototype.constructor = Window_SpanishNameInput;

  Window_SpanishNameInput.SPANISH = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    '',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'Ñ',
    '',
    '',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Á',
    'É',
    'Í',
    'Ó',
    'Ú',
    '-',
    '.',
    ':',
    ';',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Espacio',
    'Borrar',
    'Listo',
  ];

  Window_SpanishNameInput.prototype.initialize = function (editWindow) {
    var self = this;
    this._dataFromTable = {};
    this._dataFromTable.maxItems = Window_SpanishNameInput.SPANISH.length;
    this._dataFromTable.okIndex =
      Window_SpanishNameInput.SPANISH.indexOf('Listo');
    this._dataFromTable.backIndex =
      Window_SpanishNameInput.SPANISH.indexOf('Borrar');
    this._dataFromTable.spaceIndex =
      Window_SpanishNameInput.SPANISH.indexOf('Espacio');
    Window_NameInput.prototype.initialize.call(this, editWindow);
  };

  Window_SpanishNameInput.prototype.windowHeight = function () {
    return eval(RS.Window_SpanishNameInput.Params.windowHeightEval);
  };

  Window_SpanishNameInput.prototype.standardFontSize = function () {
    return RS.Window_SpanishNameInput.Params.fontSize;
  };

  Window_SpanishNameInput.prototype.lineHeight = function () {
    return RS.Window_SpanishNameInput.Params.lineHeight;
  };

  Window_SpanishNameInput.prototype.table = function () {
    return [Window_SpanishNameInput.SPANISH];
  };

  Window_SpanishNameInput.prototype.maxCols = function () {
    return 10;
  };

  Window_SpanishNameInput.prototype.maxItems = function () {
    return this.table().length;
  };

  Window_SpanishNameInput.prototype.character = function (index) {
    index = index || this._index;
    var c = this.table()[this._page][index];
    var exclude = ['Espacio', 'Borrar', 'Listo'];
    var isCharacter = exclude.indexOf(c) === -1;
    if (isCharacter) {
      return c;
    } else {
      return '';
    }
  };

  Window_SpanishNameInput.prototype.isPageChange = function () {
    return false;
  };

  Window_SpanishNameInput.prototype.processCursorMove = function () {
    var lastPage = this._page;
    Window_Selectable.prototype.processCursorMove.call(this);
    this.updateCursor();
    if (this._page !== lastPage) {
      SoundManager.playCursor();
    }
  };

  Window_SpanishNameInput.prototype.updateCursor = function () {
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
  };

  Window_SpanishNameInput.prototype.cursorPagedown = function () {};

  Window_SpanishNameInput.prototype.cursorPageup = function () {};

  Window_SpanishNameInput.prototype.cursorDown = function (wrap) {
    var max = this._dataFromTable.maxItems;
    var done = false;
    var temp = this._index;
    var depth = 0;
    while (!done) {
      if (temp < max - 10 || wrap) {
        if (temp > max - 20) {
          if (temp % 10 < 7) {
            temp = this._dataFromTable.spaceIndex;
          } else {
            temp = (temp + 10) % max;
          }
        } else {
          temp = (temp + 10) % max;
        }
      }
      var c = this.table()[this._page][temp];
      if (c !== '') {
        this._index = temp;
        done = true;
        depth = 0;
      }
      depth++;
      if (depth > 10) break;
    }
  };

  Window_SpanishNameInput.prototype.cursorUp = function (wrap) {
    var max = this._dataFromTable.maxItems;
    var done = false;
    var temp = this._index;
    var depth = 0;
    while (!done) {
      if (temp >= 10 || wrap) {
        temp = (temp + max - 10) % max;
      }
      var c = this.table()[this._page][temp];
      if (c !== '') {
        this._index = temp;
        done = true;
        depth = 0;
      }
      depth++;
      if (depth > 10) break;
    }
  };

  Window_SpanishNameInput.prototype.cursorRight = function (wrap) {
    var temp = this._index;
    var done = false;
    var depth = 0;
    while (!done) {
      if (temp % 10 < 9) {
        temp++;
      } else if (wrap) {
        temp -= 9;
      }
      var c = this.table()[this._page][temp];
      if (c !== '') {
        this._index = temp;
        done = true;
        depth = 0;
      }
      depth++;
      if (depth > 10) break;
    }
  };

  Window_SpanishNameInput.prototype.cursorLeft = function (wrap) {
    var temp = this._index;
    var done = false;
    var depth = 0;
    while (!done) {
      if (temp % 10 > 0) {
        temp--;
      } else if (wrap) {
        temp += 9;
      }
      var c = this.table()[this._page][temp];
      if (c !== '') {
        this._index = temp;
        done = true;
      }
      depth++;
      if (depth > 10) break;
    }
  };

  Window_SpanishNameInput.prototype.processHandling = function () {
    if (this.isOpen() && this.active) {
      if (Input.isRepeated('cancel')) {
        this.processBack();
      }
      if (Input.isRepeated('ok')) {
        this.processOk();
      }
    }
  };

  Window_SpanishNameInput.prototype.hitTest = function (x, y) {
    var maxItems = this._dataFromTable.maxItems;
    if (this.isContentsArea(x, y)) {
      var cx = x - this.padding;
      var cy = y - this.padding;
      var topIndex = this.topIndex();
      for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < maxItems) {
          var rect = this.itemRect(index);
          var right = rect.x + rect.width;
          var bottom = rect.y + rect.height;
          if (cx >= rect.x && cy >= rect.y && cx < right && cy < bottom) {
            var c = this.table()[this._page][index];
            if (c !== '') {
              return index;
            }
          }
        }
      }
    }
    return -1;
  };

  Window_SpanishNameInput.prototype.itemRect = function (index) {
    var w = eval(RS.Window_SpanishNameInput.Params.buttonWidth);
    var c = RS.Window_SpanishNameInput.Params.centerSpacing;
    var lineHeight = this.lineHeight();

    if (!RS.Window_SpanishNameInput.Params.isCropped) {
      if (
        index === this._dataFromTable.spaceIndex ||
        index === this._dataFromTable.backIndex ||
        index === this._dataFromTable.okIndex
      ) {
        w = this.contentsWidth() / 6;
        return {
          x: this.contentsWidth() / 2 + (index % 3) * w,
          y: Math.floor(index / 10) * lineHeight,
          width: w,
          height: lineHeight,
        };
      }
    }

    return {
      x: (index % 10) * w + Math.floor((index % 10) / 5) * c,
      y: Math.floor(index / 10) * lineHeight,
      width: w,
      height: lineHeight,
    };
  };

  Window_SpanishNameInput.prototype.refresh = function () {
    var table = this.table();
    this.contents.clear();
    this.resetTextColor();
    for (var i = 0; i < this._dataFromTable.maxItems; i++) {
      var rect = this.itemRect(i);
      rect.x += 3;
      rect.width -= 6;
      this.drawText(table[this._page][i], rect.x, rect.y, rect.width, 'center');
    }
  };

  Window_SpanishNameInput.prototype.isOk = function () {
    return this._index === this._dataFromTable.okIndex;
  };

  Window_SpanishNameInput.prototype.isBack = function () {
    return this._index === this._dataFromTable.backIndex;
  };

  Window_SpanishNameInput.prototype.isSpace = function () {
    return this._index === this._dataFromTable.spaceIndex;
  };

  Window_SpanishNameInput.prototype.processOk = function () {
    if (this.character()) {
      this.onNameAdd();
    } else if (this.isOk()) {
      this.onNameOk();
    } else if (this.isSpace()) {
      this._editWindow.add(' ');
    } else if (this.isBack()) {
      this.processBack();
    }
  };

  //============================================================================
  // Window_NameEdit
  //============================================================================

  Window_NameEdit.prototype.windowWidth = function () {
    return eval(RS.Window_SpanishNameInput.Params.windowWidthEval);
  };

  Window_NameEdit.prototype.faceWidth = function () {
    return 0;
  };

  Window_NameEdit.prototype.refresh = function () {
    this.contents.clear();
    for (var i = 0; i < this._maxLength; i++) {
      this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
      this.drawChar(j);
    }
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
  };

  //============================================================================
  // Scene_Name
  //============================================================================

  Scene_Name.prototype.createInputWindow = function () {
    this._inputWindow = new Window_SpanishNameInput(this._editWindow);
    this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
    this.addWindow(this._inputWindow);
  };
})();
