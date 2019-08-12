//================================================================
// RS_Vector2.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_Vector2.js
 * @plugindesc Vector2 class
 * @author biud436
 * @help
 * 2016.03.14 (v1.0.0) - First Release.
 * 2016.05.29 (v1.0.1) - Added Scalar Multiplication
 * 2016.09.04 (v1.0.2) - Added isEqual function.
 * 2016.10.01 (v1.0.3) - Added Math Classes
 */

var RS = RS || {};
var Imported = Imported || {};
Imported.RS_Vector2 = true;

function Vector2() {
    this.initialize.apply(this, arguments);
};

Vector2.prototype.constructor = Vector2;

/**
 * 비어있는 벡터를 생성합니다
 * @memberof Vector2
 * @return {Vector2} val
 */
Vector2.empty = function() { return new Vector2(0.0, 0.0); };

/**
 * 선형 보간
 * vec1 에서 vec2 로 직선 형태로 이동합니다.
 * @memberof Vector2
 * @function mix
 * @param {Vector2} vec1
 * @param {Vector2} vec2
 * @param {Number} t  frameTime값. 0 ~ 1 사이의 실수
 * @return {Number} val
 * @static
 */
Vector2.mix = function(vec1, vec2, t) {
    var vec = Vector2.empty();
    vec.x = vec1.x + t * (vec2.x - vec1.x);
    vec.y = vec1.x + t * (vec2.y - vec1.y);
    return vec;
};

/**
 * 정규화된 상태인지 확인합니다
 * @memberof Vector2
 * @function isNormalize
 * @param {Vector2} vec
 * @static
 */
Vector2.isNormalize = function(vec) {
    if( (vec.x >= 0.0 && vec.x <= 1.0) &&
        (vec.y >= 0.0 && vec.y <= 1.0) ) {
      return true;
    }
    return false;
};

/**
 * 곡선형 보간
 * vec1 에서 vec3 으로 곡선 형태로 이동합니다.
 * @memberof Vector2
 * @function quadraticBezier
 * @param {Vector2} vec1  시작 지점
 * @param {Vector2} vec2  중간 지점
 * @param {Vector2} vec3  끝 지점
 * @param {Number} t  frameTime값. 0 ~ 1 사이의 실수
 * @return {Vector2} p
 * @static
 */
Vector2.quadraticBezier = function(vec1, vec2, vec3, t) {
    var d, e, p;
    d = Vector2.mix(vec1, vec2, t);
    e = Vector2.mix(vec2, vec3, t);
    p = Vector2.mix(d, e, t);
    return p;
};

/**
 * 최대 각도, 최소 각도를 제한합니다 (성능을 위해)
 * @memberof Vector2
 * @function limitAngle
 * @param {Number} angle
 * @return {Number} angle
 * @static
 */
Vector2.limitAngle = function(angle) {
    while(angle < -Math.PI) angle += Math.PI * 2;
    while(angle >= Math.PI) angle -= Math.PI * 2;
    return angle;
};

/**
 * 두 벡터 사이의 거리
 * @memberof Vector2
 * @function distance
 * @param {Vector2} vec1
 * @param {Vector2} vec2
 * @return {Number} dist
 * @static
 */
Vector2.distance = function(vec1, vec2) {
    var val;
    val = Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2);
    return Math.sqrt(val);
};

/**
 * @constructor
 * @memberof Vector2
 * @param {Number} x
 * @param {Number} y
 */
Vector2.prototype.initialize = function(x, y) {
    this._x = x;
    this._y = y;
};

/**
 * 덧셈
 * @method add
 * @param {Vector2} vec
 * @return {Vector2} this
 */
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

/**
 * 뺄셈
 * @method minus
 * @param {Vector2} vec
 * @return {Vector2} this
 */
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

/**
 * 곱셈
 * @method div
 * @param {Vector2} vec
 * @return {Vector2} this
 *
 */
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

/**
 * 나눗셈
 * @method div
 * @param {Vector2} vec
 * @return {Vector2} this
 */
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

/**
 * @memberof Vector2
 * @property x
 */
Object.defineProperty(Vector2.prototype, 'x', {
    get: function() {
        return this._x;
    },
    set: function(value) {
        this._x = value;
    }
});

/**
 * @memberof Vector2
 * @property y
 */
Object.defineProperty(Vector2.prototype, 'y', {
    get: function() {
        return this._y;
    },
    set: function(value) {
        this._y = value;
    }
});

/**
 * @memberof Vector2
 * @property length
 */
Object.defineProperty(Vector2.prototype, 'length', {
    get: function() {
        return this.getLength();
    }
});

Vector2.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * 벡터의 길이
 * @method getLength
 * @return {Number} angle
 */
Vector2.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * 두 벡터 사이의 각도
 * @method getAngle
 * @param {Vector2} vec
 * @return {Number} val
 */
Vector2.prototype.getAngle = function(vec) {
    if(Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
        var val = this.dot(vec);
        return Math.acos(val);
    } else {
        console.error("This is not normalize vector");
    }
};

/**
 * 정규화
 * @method normalize
 * @return {Vector2} rel
 */
Vector2.prototype.normalize = function() {
    var rel = Vector2.empty();
    if(this.length != 0) {
      rel.x = this.x / this.length;
      rel.y = this.y / this.length;
    }
    return rel;
};

/**
 * 내적
 * @method dot
 * @param {Vector} vec
 * @return {Number} angle
 */
Vector2.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y;
};

/**
 * 회전 행렬
 * @method rotate
 * @param angle {Number}
 */
Vector2.prototype.rotate = function(angle) {
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
};

/**
 * @method pointDirection
 * @param {Vector2} vec 목표 벡터
 * @param {Number} angle 각도
 * @return {Number} val
 */
Vector2.prototype.pointDirection = function(vec, angle) {
    return Math.atan2(vec.y - this.y, vec.x - this.x) - (Math.PI / 180) * angle;
};

// Vector2.prototype.setDirectionAsBasis = function (iVec, target) {
//     var pos = [],
//         length = 0,
//         jVec = Vector2.empty();
//
//     // Forward
//     iVec.x = iVec.x - target.x; iVec.y = iVec.y - target.y;
//     iVec = iVec.normalize();
//     length = iVec.length;
//
//     // Side
//     jVec.x = -iVec.y * length / 2.0; jVec.y = iVec.x * length / 2.0;
//
//     // Rect
//     pos.push( new Vector2( target.x - jVec.x, target.y - jVec.y ) );
//     pos.push( new Vector2( iVec.x - jVec.x, iVec.y - jVec.y ) );
//     pos.push( new Vector2( target.x + jVec.x, target.y + jVec.y ) );
//     pos.push( new Vector2( iVec.x + jVec.x, iVec.y + jVec.y ) );
//     return pos;
// };

/**
 * @method isEqual
 * @param {Vector2} vec
 * @return {Boolean} result
 */
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

/**
 * @method identity4
 */
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

/**
 * 램덤 함수이지만 최대값에서 벗어난 값도 나올 수 있다(박스-뮬러 변환의 basic form)
 * @method randomNormal
 * @param {Number} maxValue
 */
RS.Math.randomNormal = function (maxValue) {
  // basic form
  var r = Math.sqrt(-2 * Math.log(Math.random()));
  var t = Math.PI * 2 * Math.random();
  var x = r * Math.cos(t) * maxValue;
  var y = r * Math.sin(t) * maxValue;
  return [x, y];
};
