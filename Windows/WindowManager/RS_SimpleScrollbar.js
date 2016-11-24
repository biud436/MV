/*:
 * @plugindesc (v1.0.0) <RS_SimpleScrollbar>
 * @author biud436
 *
 * @param Background Image
 * @desc Specify the background image for a scroll bar from img/pictures folder.
 * @default scroll
 *
 * @param Button Image
 * @desc Specify the button image for a scroll bar from img/pictures folder.
 * @default scrollbarButton
 *
 * @help
 *
 */

var Imported = Imported || {};
var RS = RS || {};
Imported.RS_SimpleScrollbar = true;
RS.SimpleScrollbar = RS.SimpleScrollbar || {};
RS.SimpleScrollbar.Params = RS.SimpleScrollbar.Params || {};

function HorizontalScrollbar() {
    this.initialize.apply(this, arguments);
}

(function ($) {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_SimpleScrollbar>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  $.scrollbarBackgroundImage = 'scroll';
  $.scrollbarButtonImage = 'scrollbarButton';

  HorizontalScrollbar.prototype = Object.create(Sprite_Button.prototype);
  HorizontalScrollbar.prototype.constructor = HorizontalScrollbar;
  HorizontalScrollbar.prototype.initialize = function (maxValue) {
    Sprite_Button.prototype.initialize.call(this);
    this.createBackground();
    this.createButton();
    this.initMembers(maxValue);
    this.initWithButtonFrame();
  };

  HorizontalScrollbar.prototype.update = function () {
    Sprite_Button.prototype.update.call(this);
  };

  HorizontalScrollbar.prototype.createBackground = function () {
    var bitmap = ImageManager.loadPicture($.scrollbarBackgroundImage);
    this._scrollBackground = new Sprite(bitmap);
    this.addChildAt(this._scrollBackground, 0);
  };

  HorizontalScrollbar.prototype.createButton = function () {
    var bitmap = ImageManager.loadPicture($.scrollbarButtonImage);
    this._button = new Sprite(bitmap);
    this._button.anchor.x = 0.5;
    this._button.anchor.y = 0.0;
    this.addChildAt(this._button, 1);
  };

  HorizontalScrollbar.prototype.createText = function () {
    this._text = new Sprite();
    this._text.bitmap = new Bitmap(48 * 3, 72);
    this._text.anchor.x = -1.0;
    this._text.anchor.y = 0.0;
    this._text.y = 0;
    this.addChildAt(this._text, 2);
  };

  HorizontalScrollbar.prototype.initMembers = function (maxValue) {
    this.value = 0;
    this.maxValue = maxValue || 100;
  };

  HorizontalScrollbar.prototype.initWithButtonFrame = function () {
    this._coldFrame = new Rectangle(0, 0, 12, 12);
    this._hotFrame = new Rectangle(12, 0, 12, 12);
  };

  HorizontalScrollbar.prototype.setScrollPos = function (currentValue) {
    var realValue = 0;

    var width = this._scrollBackground.width || 128;

    var valueX = TouchInput.x || 0;

    realValue = (this.maxValue * this.canvasToLocalX(valueX)) / width;

    if(currentValue) {
      realValue = currentValue.clamp(0, this.maxValue);
      valueX = this.x + (realValue * width) / this.maxValue;
    }

    if(valueX <= this.x + this._button.width / 2) {
      valueX = this.x + this._button.width / 2;
    }

    if(valueX > this.x + width - this._button.width / 2) {
      valueX = this.x + width - this._button.width / 2;
    }

    realValue = realValue.clamp(0, this.maxValue);

    this.value = Math.floor(realValue);

    this._button.x = this.canvasToLocalX(valueX);

  };

  HorizontalScrollbar.prototype.updateScroll = function () {
    this.setScrollPos();
  };

  HorizontalScrollbar.prototype.updateFrame = function() {
    var frame;
    var self = this._button;
    if(self) {
      if (this._touching) {
          frame = this._hotFrame;
          this.updateScroll();
      } else {
          frame = this._coldFrame;
      }
      if (frame) {
          self.setFrame(frame.x, frame.y, frame.width, frame.height);
      }
    }
  };

  HorizontalScrollbar.prototype.processTouch = function() {
    if (this.isActive()) {
        if (TouchInput.isPressed() && this.isButtonTouched()) {
            this._touching = true;
            this.callClickHandler();
        }
        if (this._touching) {
            if (TouchInput.isReleased() || !this.isButtonTouched()) {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
  };

  HorizontalScrollbar.prototype.isButtonTouched = function() {
    var x = TouchInput.x;
    var y = TouchInput.y;
    var self = this._scrollBackground;
    return x >= this.x && y >= this.y && x < this.x + self.width && y < this.y + self.height;
  };

  HorizontalScrollbar.prototype.getValue = function() {
    return this.value;
  };

})(RS.SimpleScrollbar.Params);
