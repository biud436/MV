/*:
 * RS_Vector2.js
 * @plugindesc Vector2 class
 * @author biud436
 */

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
 * @memberof Vector2
 * @function mix
 * @param vec1 {Vector2}
 * @param vec2 {Vector2}
 * @param t {Number}
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
 * @memberof Vector2
 * @function quadraticBezier
 * @param vec1 {Vector2} 시작 지점
 * @param vec2 {Vector2} 중간 지점
 * @param vec3 {Vector2} 끝 지점
 * @param t {Number} 시간
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
 * @function maxAngle
 * @param angle {Number}
 * @static
 */
Vector2.maxAngle = function(angle) {
    while(angle < -Math.PI) angle += Math.PI * 2;
    while(angle >= Math.PI) angle -= Math.PI * 2;
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
    rel.x = this.x / this.length;
    rel.y = this.y / this.length;
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
    return Math.atan2(vec.y - this.x, vec.x - this.y) - (Math.PI / 180) * angle;
};
