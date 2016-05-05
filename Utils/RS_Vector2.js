/*:
 * RS_Vector2.js
 * @plugindesc Vector2 class
 * @author biud436
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
 * @return val {Vector2}
 */
Vector2.empty = function() {
    return new Vector2(0.0, 0.0);
};

/**
 * 선형 보간
 * vec1 에서 vec2 로 직선 형태로 이동합니다.
 * @memberof Vector2
 * @function mix
 * @param vec1 {Vector2}
 * @param vec2 {Vector2}
 * @param t {Number} frameTime값. 0 ~ 1 사이의 실수
 * @return val {Number}
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
 * @param vec {Vector2}
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
 * @param vec1 {Vector2} 시작 지점
 * @param vec2 {Vector2} 중간 지점
 * @param vec3 {Vector2} 끝 지점
 * @param t {Number} frameTime값. 0 ~ 1 사이의 실수
 * @return p {Vector2}
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
 * @param angle {Number}
 * @return angle {Number}
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
 * @param vec1 {Vector2}
 * @param vec2 {Vector2}
 * @return dist {Number}
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
 * @param x {Number}
 * @param y {Number}
 */
Vector2.prototype.initialize = function(x, y) {
    this._x = x;
    this._y = y;
};

/**
 * 덧셈
 * @method add
 * @param vec {Vector2}
 * @return this {Vector2}
 */
Vector2.prototype.add = function (vec) {
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
    return this;
};

/**
 * 뺄셈
 * @method minus
 * @param vec {Vector2}
 * @return this {Vector2}
 */
Vector2.prototype.minus = function (vec) {
    this.x = this.x - vec.x;
    this.y = this.y - vec.y;
    return this;
};

/**
 * 곱셈
 * @method div
 * @param vec {Vector2}
 * @return this {Vector2}
 *
 */
Vector2.prototype.mul = function (vec) {
    this.x = this.x * vec.x;
    this.y = this.y * vec.y;
    return this;
};

/**
 * 나눗셈
 * @method div
 * @param vec {Vector2}
 * @return this {Vector2}
 */
Vector2.prototype.div = function (vec) {
    this.x = this.x / vec.x;
    this.y = this.y / vec.y;
    return this;
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
 * @return angle {Number}
 */
Vector2.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * 두 벡터 사이의 각도
 * @method getAngle
 * @param vec {Vector2}
 * @return val {Number}
 */
Vector2.prototype.getAngle = function(vec) {
    if(Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
        var val = this.dot(vec);
        return Math.acos(val);
    } else {
        console.error("정규화된 벡터가 아닙니다");
    }
};

/**
 * 정규화
 * @method normalize
 * @return rel {Vector2}
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
 * @param vec {Vector}
 * @return angle {Number}
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
 * 각도 변환(유도)
 * @method pointDirection
 * @param vec {Vector2} 목표 벡터
 * @param angle {Number} 각도
 * @return val {Number}
 */
Vector2.prototype.pointDirection = function(vec, angle) {
    return Math.atan2(vec.y - this.y, vec.x - this.x) - (Math.PI / 180) * angle;
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
