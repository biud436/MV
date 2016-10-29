//==============================================================================
// RS_MapTransition.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_MapTransition = true;

/*:
 * @plugindesc
 * @author biud436
 */

var RS = RS || {};

RS.MapTransition = function () {
  this.initialize.apply(this, arguments);
};

(function ($) {

  var isFilterPIXI4 = (PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  if(!isFilterPIXI4) return;

  //============================================================================
  // Vector2
  //============================================================================

  function Vector2() {
      this.initialize.apply(this, arguments);
  };

  Vector2.prototype.constructor = Vector2;

  Vector2.empty = function() { return new Vector2(0.0, 0.0); };

  Vector2.mix = function(vec1, vec2, t) {
      var vec = Vector2.empty();
      vec.x = vec1.x + t * (vec2.x - vec1.x);
      vec.y = vec1.x + t * (vec2.y - vec1.y);
      return vec;
  };

  Vector2.isNormalize = function(vec) {
      if( (vec.x >= 0.0 && vec.x <= 1.0) &&
          (vec.y >= 0.0 && vec.y <= 1.0) ) {
        return true;
      }
      return false;
  };

  Vector2.quadraticBezier = function(vec1, vec2, vec3, t) {
      var d, e, p;
      d = Vector2.mix(vec1, vec2, t);
      e = Vector2.mix(vec2, vec3, t);
      p = Vector2.mix(d, e, t);
      return p;
  };

  Vector2.limitAngle = function(angle) {
      while(angle < -Math.PI) angle += Math.PI * 2;
      while(angle >= Math.PI) angle -= Math.PI * 2;
      return angle;
  };

  Vector2.distance = function(vec1, vec2) {
      var val;
      val = Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2);
      return Math.sqrt(val);
  };

  Vector2.prototype.initialize = function(x, y) {
      this._x = x;
      this._y = y;
  };

  Vector2.prototype.add = function (vec) {
    if(vec instanceof Number) {
      this.x = this.x + vec;
      this.y = this.y + vec;
      return this;
    } else if(vec instanceof Vector2){
      this.x = this.x + vec.x;
      this.y = this.y + vec.y;
      return this;
    }
    return Vector2.empty();
  };

  Vector2.prototype.minus = function (vec) {
    if(vec instanceof Number) {
      this.x = this.x - vec;
      this.y = this.y - vec;
      return this;
    } else if(vec instanceof Vector2){
      this.x = this.x - vec.x;
      this.y = this.y - vec.y;
      return this;
    }
    return Vector2.empty();
  };

  Vector2.prototype.mul = function (vec) {
      if(vec instanceof Number) {
        this.x = this.x * vec;
        this.y = this.y * vec;
        return this;
      } else if(vec instanceof Vector2){
        this.x = this.x * vec.x;
        this.y = this.y * vec.y;
        return this;
      }
      return Vector2.empty();
  };

  Vector2.prototype.div = function (vec) {
    if(vec instanceof Number) {
      this.x = this.x / vec;
      this.y = this.y / vec;
      return this;
    } else if(vec instanceof Vector2){
      this.x = this.x / vec.x;
      this.y = this.y / vec.y;
      return this;
    }
    return Vector2.empty();
  };

  Object.defineProperty(Vector2.prototype, 'x', {
      get: function() {
          return this._x;
      },
      set: function(value) {
          this._x = value;
      }
  });

  Object.defineProperty(Vector2.prototype, 'y', {
      get: function() {
          return this._y;
      },
      set: function(value) {
          this._y = value;
      }
  });

  Object.defineProperty(Vector2.prototype, 'length', {
      get: function() {
          return this.getLength();
      }
  });

  Vector2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector2.prototype.getLength = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Vector2.prototype.getAngle = function(vec) {
      if(Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
          var val = this.dot(vec);
          return Math.acos(val);
      } else {
          console.error("This is not normalize vector");
      }
  };

  Vector2.prototype.normalize = function() {
      var rel = Vector2.empty();
      if(this.length != 0) {
        rel.x = this.x / this.length;
        rel.y = this.y / this.length;
      }
      return rel;
  };

  Vector2.prototype.dot = function(vec) {
      return this.x * vec.x + this.y * vec.y;
  };

  Vector2.prototype.rotate = function(angle) {
      this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
      this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
  };

  Vector2.prototype.pointDirection = function(vec, angle) {
      return Math.atan2(vec.y - this.y, vec.x - this.x) - (Math.PI / 180) * angle;
  };

  Vector2.prototype.isEqual = function (vec) {
    var eps = 0.001;
    if( (this.x - vec.x) < eps &&
        (this.y - vec.y) < eps ) {
      return true;
    }
    return false;
  };

  //------------------------------------------------------------------------------
  // RS.Matrix
  //
  //

  RS.Matrix = RS.Matrix || {};

  RS.Matrix.identity4 = function() {
    var a00 = 1, a10 = 0, a20 = 0, a30 = 0,
    a01 = 0, a11 = 1, a21 = 0, a31 = 0,
    a02 = 0, a12 = 0, a22 = 1, a32 = 0,
    a03 = 0, a13 = 0, a23 = 0, a33 = 1;
    return [a00, a10, a20, a30,
            a01, a11, a21, a31,
            a02, a12, a22, a32,
            a03, a13, a23, a33];
  };

  //------------------------------------------------------------------------------
  // RS.Math
  //
  //

  RS.Math = RS.Math || {};
  RS.Math.toRadian = function(angle) {
    return angle * (180.0 / Math.PI);
  };

  RS.Math.toDegree = function(angle) {
     return angle * (Math.PI / 180.0);
  };

  RS.Math.min = function(x, y) {
     return (y < x) ? y : x;
  };

  RS.Math.max = function(x, y) {
    return (x < y) ? y : x;
  };

  RS.Math.abs = function (x) {
     return (x >= 0) x : -x;
  };

  RS.Math.clamp = function(x, min, max) {
    var self = RS.Math; return self.min(self.max(x, min), max);
  };

  RS.Math.fract = function(x) {
    return x - (x >> 0);
  };

  RS.Math.round = function (x) {
    var self = RS.Math;
    return (self.fract(x) >= 0.5) ? ( (x >> 0) + 1 ) : x >> 0;
  };

  //============================================================================
  // RS.MapTransition
  //============================================================================

  $.prototype.constructor = $;
  $.prototype.initialize = function (stage) {
    this._stage = stage;
    this._state = 'normal';
    this._rect = PIXI.Rectangle.EMPTY.clone();
    this.createGraphics();
  };

  $.prototype.addChild =  function (child) {
    this._stage.addChild(child);
  };

  $.prototype.removeChild =  function (child) {
    this._stage.removeChild(child);
  };

  $.prototype.createGraphics = function () {
    this._backgroundColor = PIXI.utils.rgb2hex([0, 0, 0]);
    this._graphics = new PIXI.Graphics();
    this.addChild(this._graphics);
  };

  $.prototype.clear = function () {
    this._graphics.clear();
  };

  $.prototype.updateScale = function () {
    var self = this._graphics;
    var pivot = self.pivot;
    var scale = self.scale;
    var skew = self.skew;
    var x = this.x;
    var y = this.y;
    var rotation = self.rotation;
    this._graphics.setTransform(x, y, scale.x, scale.y, rotation, skew.x, skew.y, pivot.x, pivot.y);
  };

  $.prototype.update = function () {
    this.updateScale();
  };

  $.prototype.beginFill = function () {
    this._graphics.beginFill(this._backgroundColor);
  };

  $.prototype.endFill = function () {
    this._graphics.endFill();
  };

  $.prototype.drawShape = function () {
    // TODO:
  };

  $.prototype.setState = function (stateName) {
    this._state = stateName;
  };

  $.prototype.draw = function () {
    this.clear();
    this.beginFill();
    this.drawShape();
    this.endFill();
  };

  Object.defineProperties($.prototype,{
    'x': {
        get: function () {
          return this._rect.x;
        },
        set: function (value) {
          this._rect.x = value;
        }
    },
    'y': {
        get: function () {
          return this._rect.y;
        },
        set: function (value) {
          this._rect.y = value;
        }
    },
    'width': {
        get: function () {
          return this._rect.width;
        },
        set: function (value) {
          this._rect.width = value;
        }
    },
    'height': {
        get: function () {
          return this._rect.height;
        },
        set: function (value) {
          this._rect.height = value;
        }
    },
    'scale': {
        get: function () {
          return this._graphics.scale;
        },
        set: function (value) {
          this._graphics.scale = value;
        }
    }
  });

  //============================================================================
  // RS.MapTransition.Circle
  //============================================================================

  $.Circle = function () {
    this.initialize.apply(this, arguments);
  };

  $.Circle.prototype = Object.create($.prototype);
  $.Circle.prototype.constructor = $.Circle;

  $.Circle.prototype.initialize = function (stage, x, y, radius) {
    $.prototype.initialize.call(this, stage);
    this.x = x || 0;
    this.y = y || 0;
    this._radius = radius;
    this._state = 'zoom_in_setup';
  };

  $.Circle.prototype.drawShape = function () {
    var x, y, radius;
    x = this.x;
    y = this.y;
    radius = this.radius;
    this._graphics.drawCircle(x, y, radius);
  };

  $.Circle.prototype.updateScale = function () {
    if(this._state === 'zoom_in_setup') {
      this._fadeSpeed = 0.5;
      this._fadeAccel = -0.02;
      this._fade = this._fadeSpeed;
    }
    if(this._state === 'zoom_in') {
      if(this.scale.x >= 2) this.scale.x = 2;
      if(this.scale.y >= 2) this.scale.y = 2;
      this._fade += this._fadeAccel;
      this.scale.x = this.scale.y = 0.2 + this._fade;
    }
    if(this._state === 'zoom_out_setup') {
      this._fadeSpeed = -0.5;
      this._fadeAccel = 0.02;
      this._fade = this._fadeSpeed;
    }
    if(this._state === 'zoom_out') {
      if(this.scale.x <= 0.5) this.scale.x = 0.5;
      if(this.scale.y >= 2) this.scale.y = 2;
      this._fade += this._fadeAccel;
      this.scale.x = this.scale.y = 0.2 + this._fade;
    }
    $.prototype.updateScale.call(this);
  };

  $.Circle.prototype.drawShape = function () {
    var x, y, radius;
    x = this.x;
    y = this.y;
    radius = this.radius;
    this._graphics.drawCircle(x, y, radius);
  };

  Object.defineProperties($.Circle.prototype, {
    'radius': {
        get: function () {
          return this._radius;
        },
        set: function (value) {
          this._radius = value;
        }
    }
  });

})(RS.MapTransition);
