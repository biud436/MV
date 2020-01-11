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
 * 16세기 물리학자들은 방향이 다른 두 속도를 합성하기 위해 벡터라는 개념을 처음 고안하였다.
 * 
 * 수학에서 방향과 크기를 가진 양으로써 벡터를 다루게 된 것은 복소수에 대한 연구에서 비롯되었고,
 * 이것은 복소수를 2차원 공간의 한 점으로 생각할 수 있다는 아이디어에서 시작되었다.
 * 
 * 이후 복소수를 확장하여 3차원 공간의 한 점을 나타내는 새로운 수체계인 사원수가 나왔다.
 * 
 * 벡터는 좌표 공간의 좌표 축과는 상관 없이 본질적으로 크기와 방향을 가진다.
 * 따라서 일러스트레이터나 플래시 같은 프로그램에서는 그래픽을 벡터로 표현한다.
 * 
 * 여기에서 다루는 것은 유클리드 공간에서의 벡터를 말한다.
 * 
 * ----------------------------------------------------------------
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
 * 벡터의 크기 
 * 추상화된 벡터 공간에서는 벡터의 크기를 고려하지 않는다.
 * 유클리드 공간에서는 벡터의 크기를 구할 수 있다.
 * 벡터의 크기는 새로운 용어로 ||v||를 벡터 v의 놈(norm)이라고 칭한다.
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
 * 벡터의 크기는 유클리드 공간에서 성립하므로, 
 * 유클리드 공간에서 벡터의 크기(norm; 독일어)로 나누면 0-1 사이로 일반화된 값을 얻을 수 있다.
 * 
 * 또한 유클리드 기하학이 성립하는 공간이므로 두 점 사이의 거리나 두 벡터가 이루는 각을 구할 수 있다.
 * 
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
 * 벡터의 내적를 구한다.
 * 내적의 중요한 용도 중 하나는 두 벡터가 서로 수직인지 아닌지를 판단하는 것이다.
 * 내적이 0이 되는 두 벡터는 직교하는 것으로 정의된다.
 * 즉, 영벡터 0은 모든 벡터와 수직이다.
 * 
 * 두 점 사이의 각도를 구하는 방법은 여러가지가 있다. 
 * 
 * ! 1. Math.atan2 이용
 * = (Math.atan2(y2, x2) * Math.PI / 180.0) - (Math.atan2(y1, x1) * Math.PI / 180.0)
 * = Math.atan2(y2 - y1, x2 - x2) * (Math.PI / 180.0)
 * 
 * 사실 이 방법은 시스템에 부담을 주므로 일반적인 상황에서는 벡터를 써야 맞다.
 * 
 * ! 2. 벡터의 내적 이용
 * 공식적인 방법은 벡터의 내적을 이용하는 방법이다. 
 * 선형대수학 이론에 따르면 공식은 삼각형의 코사인 법칙에서 유도된 공식이다.
 * 
 * 두 벡터 사이의 cos 각을 구할 수 있다. 각 속성을 곱해서 더하면 스칼라 값을 구할 수 있다.
 * 
 * 예를 들어, 다음과 같은 벡터 A (x1 + y2)와 벡터 B (x2 + y2)가 있다고 해보면 다음과 같다.
 * 
 * = A * B = (x1 * x2) + (y1 * y2) = |A|B|cosθ
 * 
 * 이 스칼라 값을 아크코사인 함수 Math.acos(x)에 넣으면 각도를 구할 수 있다. 
 * 단, 벡터가 정규화된 상태여야 한다. 
 * 아크코사인 함수는 길이가 1인 원을 가정하기 때문에 -1부터 1까지만 인수로 받는다.
 * 
 * @method dot
 * @param {Vector} vec
 * @return {Number} angle
 */
Vector2.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y;
};

/**
 * 회전 행렬
 *
 * 이 공식은 각도가 동일한 직각 삼각형 2개를 그려 닮은꼴 관계를 이용하여 삼각비를 통해 최종 좌표를 구한다.
 * 
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
