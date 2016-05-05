/*:
 * EventNameDraw.js
 *
 * @version 1.3.0
 *
 * @plugindesc This plugin displays an event's name above a head.
 * @author biud436
 *
 * @param text Size
 * @desc text Size
 * @default 16
 *
 * @param Show Player Text
 * @desc Show Player Text (true / false)
 * @default true
 *
 * @param Boat
 * @desc Boat Name
 * @default Boat
 *
 * @param Ship
 * @desc Ship Name
 * @default Ship
 *
 * @param AirShip
 * @desc AirShip Name
 * @default AirShip
 *
 * @help
 *
 * If it sets the note, you can show an event's name above a head.
 * you can set the various color by using the note.
 *
 * You can display the name of an event above a head by using the following format.
 * @color[red, green, blue]
 *
 * - Change Log
 * 2016.03.25 (v1.3.0) - Added New Function called updateScale();
 * 2016.03.26 (v1.3.1) - Added Vehicle
 * 2016.05.05 (v1.3.2) - Updated Vector2 Class
 */

var Imported = Imported || {};
Imported.RS_EventName = true;

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


/**
 * ============================================================================
 * @class Sprite_Name
 * @extends Sprite
 * @constructor
 * ============================================================================
 */

function Sprite_Name() {
    this.initialize.apply(this, arguments);
};

(function() {

  Sprite_Name.prototype = Object.create(Sprite.prototype);
  Sprite_Name.prototype.constructor = Sprite_Name;

  Sprite_Name.MOUSE_EVENT = Vector2.empty();

  Sprite_Name.prototype.initialize = function(data) {
      Sprite.prototype.initialize.call(this);
      this.bitmap = new Bitmap(120, 40);
      this._offsetY = data.height;
      this._member = data.member;
      this.setTextSize(data.textSize);
      this.setTextColor(data.textColor);
      this.setTextOutlineWidth(data.outlineWidth);
      this.setPosition();
      this.setAnchor(data.anchor);
      this.drawName();
      this._visible = this.visible = this.isReady();
  };

  Sprite_Name.prototype.setTextSize = function(n) {
      this.bitmap.fontSize = n;
  };

  Sprite_Name.prototype.setTextOutlineWidth = function(n) {
      this.bitmap.outlineWidth = n || 2;
  };

  Sprite_Name.prototype.setPosition = function() {
      this.x = this._member.screenX();
      this.y = this._member.screenY() - (this._offsetY() || 0) + 10;
  };

  Sprite_Name.prototype.setAnchor = function(pt) {
      this.anchor.x = pt.x || 0.5;
      this.anchor.y = pt.y || 1.0;
  };

  Sprite_Name.prototype.isTransparent = function() {
      return this._member.isTransparent();
  };

  Sprite_Name.prototype.isErased = function() {
      return this._member._erased;
  };

  Sprite_Name.prototype.isReady = function() {
      return (this._member.findProperPageIndex() > -1) &&
             (!this.isTransparent()) &&
             (!this.isErased());
  };

  Sprite_Name.prototype.setTextColor = function(color) {
      this.bitmap.textColor = Utils.rgbToCssColor.apply(this, color);
  };

  Sprite_Name.prototype.drawName = function() {
      var name = this._member.event().name || "";
      this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
  };

  Sprite_Name.prototype.updateVisibility = function () {
      if(this._visible !== this.isReady()) {
          this.visible = this._visible = this.isReady();
      }
  };

  Sprite_Name.prototype.updatePosition = function () {
      this.x = this._member.screenX();
      this.y = this._member.screenY() - (this._offsetY() || 0) + 10;
  };

  Sprite_Name.prototype.updateScale = function () {
      var x, y, t;
      if(Vector2.distance(this, Sprite_Name.MOUSE_EVENT) < 48) {
          t = (Date.now() % 10000 / 10000);
          this.scale = Vector2.quadraticBezier({x:1, y:1}, {x:2, y:2}, {x:1, y:1}, t);
      } else {
          this.scale = {x: 1, y: 1};
      }
  };

  Sprite_Name.prototype.updateFilter = function () {
  };

  Sprite_Name.prototype.updateRotation = function () {
  };

  Sprite_Name.prototype.update = function() {
      Sprite.prototype.update.call(this);
      this.updatePosition();
      this.updateVisibility();
      this.updateScale();
      this.updateFilter();
      this.updateRotation();
  };

  /**
   * @static
   * @method _onMouseMove
   * @param {MouseEvent} event
   * @private
   */

  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if(Sprite_Name.MOUSE_EVENT instanceof Vector2) {
      Sprite_Name.MOUSE_EVENT.set(x, y);
    }
  };

})();

/**
 * ============================================================================
 * @class Sprite_PlayerName
 * @extends Sprite_Name
 * @constructor
 * ============================================================================
 */

function Sprite_PlayerName() {
    this.initialize.apply(this, arguments);
};

(function() {

  Sprite_PlayerName.prototype = Object.create(Sprite_Name.prototype);
  Sprite_PlayerName.prototype.constructor = Sprite_PlayerName;

  /**
   * @method initialize
   * @param data {Object}
   */
  Sprite_PlayerName.prototype.initialize = function(data) {
      Sprite_Name.prototype.initialize.call(this, data);
      this._visible = this.visible = this.isReady();
      this._pangle = 0;
  };

  Sprite_PlayerName.prototype.setPosition = function() {
      this.x = this._member.screenX();
      this.y = this._member.screenY() - (this._offsetY() || 0) + 10;
  };

  Sprite_PlayerName.prototype.isTransparent = function() {
      return this._member.isTransparent();
  };

  Sprite_PlayerName.prototype.isReady = function() {
      return ($gameParty.members().length > 0) && (!this.isTransparent());
  };

  Sprite_PlayerName.prototype.drawName = function() {
      var name = $gameParty.members()[0].name() || "";
      this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
  };

  Sprite_PlayerName.prototype.update = function() {
      Sprite_Name.prototype.update.call(this);
  };

})();

/**
 * ============================================================================
 * @class Sprite_VehicleName
 * @extends Sprite_Name
 * @constructor
 * ============================================================================
 */

function Sprite_VehicleName() {
    this.initialize.apply(this, arguments);
};

(function() {

    Sprite_VehicleName.prototype = Object.create(Sprite_Name.prototype);
    Sprite_VehicleName.prototype.constructor = Sprite_VehicleName;

    Sprite_VehicleName.prototype.initialize = function(data) {
        this._name = data.name;
        Sprite_Name.prototype.initialize.call(this, data);
    };

    Sprite_VehicleName.prototype.isTransparent = function() {
        return false;
    };

    Sprite_VehicleName.prototype.isReady = function() {
        return true;
    };

    Sprite_VehicleName.prototype.isErased = function() {
        return false;
    };

    Sprite_VehicleName.prototype.drawName = function() {
        var name = this._name || "Vehicle";
        this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
    };

})();

/**
 * ============================================================================
 * @class Sprite_Character
 * ============================================================================
 */

(function() {

  var parameters = PluginManager.parameters('RS_EventName');
  var textSize = Number(parameters['textSize'] || 14 );
  var colorMatch = /@color\[*(\d*)[ ]*,*[ ]*(\d*)[ ]*,*[ ]*(\d*)\]*/
  var showPlayerText = String(parameters['Show Player Text'] || 'true');
  var airshipName = String(parameters['AirShip'] || 'AirShip');
  var shipName = String(parameters['Ship'] || 'Ship');
  var boatName = String(parameters['Boat'] || 'Boat');

  Sprite_Character.prototype.drawName = function(member) {

      if(this.isTile()) return;

      // Game_Event
      if( this.isEvent(member) ) {
          if(member._erased) return;
          if(member.isTransparent()) return;
          if(!member.event().note.match(colorMatch)) return;
          this.drawEventName(member);

      // Game_Player
      } else if( this.isPlayer(member) && showPlayerText === 'true') {
          this.drawPlayerName();
      } else if( this.isVehicle(member) && showPlayerText === 'true') {
          this.drawVehicleName(member);
      }

  };

  Sprite_Character.prototype.drawPlayerName = function() {
      this._nameSprite = new Sprite_PlayerName({
          'member': $gamePlayer,
          'textSize': textSize,
          'textColor': [255,255,255],
          'outlineWidth': 2,
          'anchor': new Point(0.5, 1.0),
          'height': $gameMap.tileHeight.bind(this)
      });
      this._name = this.getName();
      this._nameSprite .z = 260;
      this.parent.addChild(this._nameSprite);
  };

  Sprite_Character.prototype.drawEventName = function(member) {

      var color = [];

      color.push(Number(RegExp.$1 || 255));
      color.push(Number(RegExp.$2 || 255));
      color.push(Number(RegExp.$3 || 255));

      this._nameSprite = new Sprite_Name({
          'member': member,
          'textSize': textSize,
          'textColor': color,
          'outlineWidth': 2,
          'anchor': new Point(0.5, 1.0),
          'height': this.patternHeight.bind(this)
      });

      this._nameSprite.z = 250;
      this._name = this.getName();

      this.parent.addChild(this._nameSprite);

  };

Sprite_Character.prototype.drawVehicleName = function(member) {

    var color = [];
    var name = this.getName();

    console.log(name);

    color.push(Number(RegExp.$1 || 255));
    color.push(Number(RegExp.$2 || 255));
    color.push(Number(RegExp.$3 || 255));

    this._nameSprite = new Sprite_VehicleName({
        'member': member,
        'textSize': textSize,
        'textColor': color,
        'outlineWidth': 2,
        'anchor': new Point(0.5, 1.0),
        'height': this.patternHeight.bind(this),
        'name': name
    });

    this._nameSprite.z = 250;
    this._name = name;

    this.parent.addChild(this._nameSprite);

};

  Sprite_Character.prototype.getName = function() {
      if(this.isPlayer()) {
          return $gameParty.members()[0].name();
      } else if(this.isEvent()) {
          return this._character.event().name;
      } else if(this.isVehicle()) {
          if (this._character.isBoat()) {
              return boatName;
          } else if (this._character.isShip()) {
              return shipName;
          } else if (this._character.isAirship()) {
              return airshipName;
          } else {
              return this._character._type;
          }
      }
  };

  Sprite_Character.prototype.redrawName = function() {
      if(this.isTile()) return false;
      if(!this._nameSprite) return false;
      if( this.isRefresh() ) {
          this._nameSprite.bitmap.clear();
          this.drawName(this._character);
      }
  };

  var alias_Sprite_Character_updateBitmap = Sprite_Character.prototype.updateBitmap;
  Sprite_Character.prototype.updateBitmap = function() {
      alias_Sprite_Character_updateBitmap.call(this);
      this.redrawName();
  };

  var alias_Sprite_Character_setCharacterBitmap = Sprite_Character.prototype.setCharacterBitmap;
  Sprite_Character.prototype.setCharacterBitmap = function() {
      alias_Sprite_Character_setCharacterBitmap.call(this);
      this.drawName(this._character);
  };

  Sprite_Character.prototype.isPlayer = function (member) {
      var member = arguments[1] || this._character;
      return !!(member instanceof Game_Player);
  };

  Sprite_Character.prototype.isEvent = function (member) {
      var member = arguments[1] || this._character;
      return !!(member instanceof Game_Event);
  };

  Sprite_Character.prototype.isVehicle = function () {
      var member = arguments[1] || this._character;
      return !!(member instanceof Game_Vehicle);
  };

  Sprite_Character.prototype.isRefresh = function () {
      return !!(this._name !== this.getName());
  };

})();
