/*:
//==============================================================================
// 개발 중단
//==============================================================================
 * RS_TextBox.js
 * @plugindesc Input Dialog
 * @author biud436
 *
 *
 *
 *
 */
 //==============================================================================
 // 입력 대화상자 클래스
 //==============================================================================
/**
  function InputDialog() {
    this.initialize.apply(this, arguments);
  }

  (function() {

    var parameters = PluginManager.parameters('RS_TextBox');

    // TextBox.prototype.initialize = function(_editWindow)  {
    //   this._editWindow = _editWindow;
    //   this.createTextBox();
    //   this.getFocus();
    // };
    //
    // TextBox.prototype.createTextBox = function() {
    //   this._textBox = document.createElement('input');
    //   this._textBox.type = "text"
    //   this._textBox.id = "textBox"
    //   this._textBox.style.opacity = 0;
    //   this._textBox.style.zIndex = 3;
    //   Graphics._centerElement(this._textBox);
    //   this._textBox.onkeydown = this.onKeyDown.bind(this);
    //   document.body.appendChild(this._textBox);
    // };
    //
    // TextBox.prototype.setEvent = function(func) {
    //   this._textBox.onchange = func;
    // };
    //
    // TextBox.prototype.terminateTextBox = function() {
    //   document.body.removeChild(this._textBox);
    // };
    //
    // TextBox.prototype.onKeyDown = function(e) {
    //
    //   this.getFocus();
    //
    //   switch(e.keyCode) {
    //   case 8:
    //     if (this.getTextLength() > 0) {
    //       this.backSpace();
    //     }
    //     break;
    //   case 13:
    //     if(this.getTextLength() <= 0) {
    //       e.preventDefault();
    //     }
    //     break;
    //   case 229:
    //     break;
    //   }
    // }
    //
    // TextBox.prototype.getTextLength = function() {
    //   return this._textBox.value.length;
    // };
    //
    // TextBox.prototype.getMaxLength = function() {
    //   return this._editWindow._maxLength;
    // };
    //
    // TextBox.prototype.backSpace = function() {
    //     if (this.getTextLength() > 0) {
    //       this._editWindow._name = this._editWindow._name.slice(0, this._textBox.value.length - 1);
    //       this._editWindow._index = this._textBox.value.length - 1;
    //       this._textBox.value = this._editWindow._name;
    //       this._editWindow.refresh();
    //     }
    // };
    //
    // TextBox.prototype.refreshNameEdit = function()  {
    //   this._editWindow._name = this._textBox.value.toString();
    //   this._editWindow._index = this._textBox.value.length || 0;
    //   this._editWindow.refresh();
    // };
    //
    // TextBox.prototype.update = function() {
    //   if(this.getTextLength() <= this._editWindow._maxLength) {
    //     this.refreshNameEdit();
    //   }
    // };
    //
    // TextBox.prototype.getFocus = function() {
    //   this._textBox.focus();
    // };
    //
    // TextBox.prototype.terminate =  function() {
    //   this.terminateTextBox();
    // };

    InputDialog.prototype = new PIXI.Stage;
    InputDialog.prototype.constructor = InputDialog;
    InputDialog.prototype.initialize = function(x, y, context, callback) {
      Stage.prototype.initialize.call(this);
      this.setConfig({'context': context, 'callback': callback});
      this.setPosition(x, y);
      this.checkMainScene();
      this.createBitmapContents();
      this.createMainLayer();
      this.createButtonLayer();
      this.createBackground();
    }

    Object.defineProperty(InputDialog.prototype, 'x', {
      get: function() {
        return this._x;
      },
      set: function(value) {
        this._x = value.clamp(0, Graphics.boxWidth);
      }
    });

    Object.defineProperty(InputDialog.prototype, 'y', {
      get: function() {
        return this._y;
      },
      set: function(value) {
        this._y = value.clamp(0, Graphics.boxHeight);
      }
    });


    Object.defineProperty(InputDialog.prototype, 'width', {
      get: function() {
        return this._width;
      },
      set: function(value) {
        this._width = value.clamp(0, Graphics.boxWidth);
      }
    });

    Object.defineProperty(InputDialog.prototype, 'height', {
      get: function() {
        return this._height;
      },
      set: function(value) {
        this._height = value.clamp(0, Graphics.boxHeight);
      }
    });

    Object.defineProperty(InputDialog.prototype, 'bitmap', {
      get: function() {
        return this._bitmap;
      },
      set: function(value) {
        if(value instanceof Bitmap) {
          this._bitmap = value;
        } else {
          throw new Error('This is not a Bitmap class');
        }
      }
    });

    InputDialog.prototype.checkMainScene = function() {
      var scene = SceneManager._scene;
      scene.addChild(this);
    }

    InputDialog.prototype.setPosition = function(x, y) {
      this.x = x;
      this.y = y;
    }

    InputDialog.prototype.setConfig = function(config) {
      this._context = config.context;
      this._callback = config.callback;
    }

    InputDialog.prototype.createBitmapContents = function() {
      this._bitmap = new Bitmap(384, 192);
    }

    InputDialog.prototype.createMainLayer = function() {
      this._mainLayer = new Sprite();
      this._mainLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
      this.addChild(this._mainLayer);
    }

    InputDialog.prototype.createButtonLayer = function() {
      this._buttonLayer = new Sprite();
      this._buttonLayer.setFrame(0, 0, this.width, this.height);
      this.addChild(this._buttonLayer);
    }

    //
    //
    //

    InputDialog.prototype.createBackground = function() {
      var w, h;
      w = 48 * 8;
      h = 48 * 4;
      this._background = new Sprite(new Bitmap(w, h));
      this._background.fillAll('rgba(0,0,0,0.5)');
      this._background.move(this.x, this.y);
      this._mainLayer.addChild(this._background);
    }

    InputDialog.prototype.update = function() {
      Stage.prototype.update.call(this);
    }

  })();

*/
