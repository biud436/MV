//==============================================================================
// RS_PerspectiveScroll v1.0.0
//==============================================================================

var Imported = Imported || {};
Imported.RS_PerspectiveScroll = true;

/*:
 * @plugindesc <RS_PerspectiveScroll>
 * @author biud436
 */

(function () {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_PerspectiveScroll>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var shapeType = 'plane';

  //============================================================================
  // Sprite_PerspectiveScroll
  //============================================================================

  function Sprite_PerspectiveScroll() {
    this.initialize.apply(this, arguments);
  }

  Sprite_PerspectiveScroll.prototype = Object.create(Sprite.prototype);
  Sprite_PerspectiveScroll.prototype.constructor = Sprite_PerspectiveScroll;

  Sprite_PerspectiveScroll.prototype.initialize = function (x, y, width, height, source) {
    Sprite.prototype.initialize.call(this);
    this.initSourceImage(source);
    this.initMembers(x, y, width, height);
    this.renderAllVertices();
    this.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
  };

  Sprite_PerspectiveScroll.prototype.initMembers = function (x, y, width, height) {
    this.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
    this.opacity = 255;

    this._boundBottomRight = [width, y, x, height, width, height];
    this._boundTopLeft = [width, y, x, height, -width, -height];
  };

  Sprite_PerspectiveScroll.prototype.initSourceImage = function (source) {
    this._sourceImage = ImageManager.loadTitle1(source);
    if(!this._sourceImage) {
      return;
    }
  };

  Sprite_PerspectiveScroll.prototype.drawPoints = function (x, y, r, g, b) {
    'use strict';

    var dx, dy, color, bitmap, sprite;

    dx = Math.floor(x);
    dy = Math.floor(y);

    color = `rgba(${r}, ${g}, ${b}, 1.0)`;

    this.bitmap.bltImage(this._sourceImage, dx, dy, 1, 1, dx, dy);

  };

  Sprite_PerspectiveScroll.prototype.flushDrawingPictures = function (x, y) {
  };

  Sprite_PerspectiveScroll.prototype.renderVertices = function (vertices) {

    var x, y;
    var temp;
    var x1, x2, x3, y1, y2, y3;
    var a12, a13, a23;
    var xl, xr;

    x1 = vertices[0];
    y1 = vertices[1];
    x2 = vertices[2];
    y2 = vertices[3];
    x3 = vertices[4];
    y3 = vertices[5];

    // 사전준비(y좌표로 정렬)
    if ( y1 > y2 ) {
      temp = y1;  y1 = y2;  y2 = temp;
      temp = x1;  x1 = x2;  x2 = temp;
    }
    if ( y1 > y3 ) {
      temp = y1;  y1 = y3;  y3 = temp;
      temp = x1;  x1 = x3;  x3 = temp;
    }
    if ( y2 > y3 ) {
      temp = y2;  y2 = y3;  y3 = temp;
      temp = x2;  x2 = x3;  x3 = temp;
    }

    // y방향에 대한 기울기
    a12 = ( x2 - x1 ) / ( y2 - y1 );
    a13 = ( x3 - x1 ) / ( y3 - y1 );
    a23 = ( x3 - x2 ) / ( y3 - y2 );
    xl = x1;  xr = x1;

    if ( a12 < a13 ) {
      for ( y = y1; y < y2; y++ ) {    // y방향 루프
          for ( x = xl; x < xr; x++ ) {  // x방향 루프
            this.drawPoints(x, y, 255, 255, 255 );
          }
        xl += a12;  xr += a13;
        this.flushDrawingPictures(xl, y1);
      }
      for ( y = y2; y < y3; y++ ) {    // y방향 루프
          for ( x = xl; x < xr; x++ ) {  // x방향 루프
            this.drawPoints(x, y, 255, 255, 255 );
          }
        xl += a23;  xr += a13;
        this.flushDrawingPictures(xl, y2);
      }
    }
    else {
      for ( y = y1; y < y2; y++ ) {    // y방향 루프
          for ( x = xl; x < xr; x++ ) {  // x방향 루프
            this.drawPoints(x, y, 255, 255, 255 );
          }
        xl += a13;  xr += a12;
        this.flushDrawingPictures(xl, y1);
      }
      for ( y = y2; y < y3; y++ ) {    // y방향 루프
          for ( x = xl; x < xr; x++ ) {  // x방향 루프
            this.drawPoints(x, y, 255, 255, 255 );
          }
        xl += a13;  xr += a23;
        this.flushDrawingPictures(xl, y2);
      }
    }
  };

  Sprite_PerspectiveScroll.prototype.renderAllVertices = function () {
    if(shapeType === 'plane') {
      this.renderVertices(this._boundBottomRight);
      this.renderVertices(this._boundTopLeft);
    } else {
      this.renderVertices(this._boundTopLeft);
    }
  };

  //============================================================================
  // Scene_Map
  //============================================================================

  var alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    alias_Scene_Map_start.call(this);
    this.createShape();
  };

  Scene_Map.prototype.createShape = function () {
    this._shapeSprite = new Sprite_PerspectiveScroll(0, 0, 150, 150, 'Castle');
    this._shapeSprite.x = 0;
    this._shapeSprite.y = 0;
    this.addChild(this._shapeSprite);
  };

})();
