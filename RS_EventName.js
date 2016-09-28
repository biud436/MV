/*:
 * RS_EventName.js
 *
 * @plugindesc (v1.3.7) This plugin displays an event's name above a head.
 * @author biud436
 *
 * @param text Size
 * @desc Changes a text size
 * @default 16
 *
 * @param Show Player Text
 * @desc Shows player's name on its head
 * (true / false)
 * @default true
 *
 * @param Boat
 * @desc Changes Boat Name
 * @default Boat
 *
 * @param Ship
 * @desc Changes Ship Name
 * @default Ship
 *
 * @param AirShip
 * @desc Changes AirShip Name
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
 * 2016.05.20 (v1.3.3) - Fixed issues that can cause an increase of opacity and the memory leak.
 * 2016.05.21 (v1.3.4) - Fixed issue that causes the memory leak.
 * 2016.05.28 (v1.3.5) - Fixed Color Bug.
 * 2016.08.20 (v1.3.6) - Fixed the issue that was not working the name toggle function.
 * 2016.09.27 (v1.3.7) - The visible setting sets as the false before calling the battle.
 * 2016.09.28 (V1.3.8) - Fixed no player issue.
 */

var Imported = Imported || {};
Imported.RS_EventName = true;

function Vector2() {
    this.initialize.apply(this, arguments);
};

function Sprite_Name() {
    this.initialize.apply(this, arguments);
};

function Sprite_PlayerName() {
    this.initialize.apply(this, arguments);
};

function Sprite_VehicleName() {
    this.initialize.apply(this, arguments);
};

(function() {

  var parameters = PluginManager.parameters('RS_EventName');
  var textSize = Number(parameters['textSize'] || 14 );
  var colorMatch = /@color\[*(\d*)[ ]*,*[ ]*(\d*)[ ]*,*[ ]*(\d*)\]*/
  var showPlayerText = String(parameters['Show Player Text'] || 'true');
  var airshipName = String(parameters['AirShip'] || 'AirShip');
  var shipName = String(parameters['Ship'] || 'Ship');
  var boatName = String(parameters['Boat'] || 'Boat');

  //----------------------------------------------------------------------------
  // Vector2
  //
  //

  Vector2.prototype.constructor = Vector2;

  Vector2.empty = function() {
      return new Vector2(0.0, 0.0);
  };

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
      this.x = this.x + vec.x;
      this.y = this.y + vec.y;
      return this;
  };

  Vector2.prototype.minus = function (vec) {
      this.x = this.x - vec.x;
      this.y = this.y - vec.y;
      return this;
  };

  Vector2.prototype.mul = function (vec) {
      this.x = this.x * vec.x;
      this.y = this.y * vec.y;
      return this;
  };

  Vector2.prototype.div = function (vec) {
      this.x = this.x / vec.x;
      this.y = this.y / vec.y;
      return this;
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
          console.error("정규화된 벡터가 아닙니다");
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

  //----------------------------------------------------------------------------
  // Sprite_Name
  //
  //

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
      return this._member._erased || !this._member._characterName;
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

  //----------------------------------------------------------------------------
  // TouchInput
  //
  //

  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if(Sprite_Name.MOUSE_EVENT instanceof Vector2) {
      Sprite_Name.MOUSE_EVENT.set(x, y);
    }
  };

  //----------------------------------------------------------------------------
  // Sprite_PlayerName
  //
  //

  Sprite_PlayerName.prototype = Object.create(Sprite_Name.prototype);
  Sprite_PlayerName.prototype.constructor = Sprite_PlayerName;

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
      return ( $gameParty.members().length > 0 ) &&
              ( !this.isTransparent() ) && showPlayerText === 'true' ;
  };

  Sprite_PlayerName.prototype.drawName = function() {
      var name = $gameParty.members()[0].name() || "";
      this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
  };

  Sprite_PlayerName.prototype.update = function() {
      Sprite_Name.prototype.update.call(this);
  };

  //----------------------------------------------------------------------------
  // Sprite_VehicleName
  //
  //

  Sprite_VehicleName.prototype = Object.create(Sprite_Name.prototype);
  Sprite_VehicleName.prototype.constructor = Sprite_VehicleName;

  Sprite_VehicleName.prototype.initialize = function(data) {
      this._name = this.getName(data.name);
      Sprite_Name.prototype.initialize.call(this, data);
  };

  Sprite_VehicleName.prototype.isTransparent = function() {
      return false;
  };

  Sprite_VehicleName.prototype.isReady = function() {
      return showPlayerText === 'true';
  };

  Sprite_VehicleName.prototype.isErased = function() {
      return !this._member._characterName;
  };

  Sprite_VehicleName.prototype.drawName = function() {
      var name = this._name || "Vehicle";
      this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
  };

  Sprite_VehicleName.prototype.getName = function (type) {
    switch (type) {
      case 'airship':
        return airshipName;
        break;
      case 'ship':
        return shipName;
        break;
      case 'boat':
        return boatName;
        break;
      default:
        return type;
    }
  };

  //----------------------------------------------------------------------------
  // Spriteset_Map
  //
  //

  var alias_Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
  Spriteset_Map.prototype.createCharacters = function() {
      alias_Spriteset_Map_createCharacters.call(this);

      // Create Name Layer
      this._nameLayer = new Sprite();
      this._nameLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
      this._nameLayer.z = 20;
      this.addChild(this._nameLayer);

      // Create Each Characters
      this._characterSprites.forEach(function(i) {

        var color = [];
        var character = i._character;
        var _constructor = character.constructor.name;

        switch(_constructor) {

          case 'Game_Player':
            if($gameParty.members()[0]) {
              this._nameLayer.addChild(new Sprite_PlayerName({
                'member': $gamePlayer,
                'textSize': textSize,
                'textColor': [255,255,255],
                'outlineWidth': 2,
                'anchor': new Point(0.5, 1.0),
                'height': $gameMap.tileHeight.bind(this)
              }));
            }
          break;

          case 'Game_Event':

            if(character._erased) return;
            if(character.isTransparent()) return;
            if(!character.event().note.match(colorMatch)) return;

            color.push(Number(RegExp.$1 || 255));
            color.push(Number(RegExp.$2 || 255));
            color.push(Number(RegExp.$3 || 255));

            this._nameLayer.addChild(new Sprite_Name({
              'member': character,
              'textSize': textSize,
              'textColor': color,
              'outlineWidth': 2,
              'anchor': new Point(0.5, 1.0),
              'height': $gameMap.tileHeight.bind(this)
            }));
          break;

          case 'Game_Vehicle':

            this._nameLayer.addChild(new Sprite_VehicleName({
              'member': character,
              'textSize': textSize,
              'textColor': [255, 255, 255],
              'outlineWidth': 2,
              'anchor': new Point(0.5, 1.0),
              'height': $gameMap.tileHeight.bind(this),
              'name': character._type
            }));

          break;
        }

      }, this);
  };

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    var layer = this._spriteset._nameLayer;
    var children = layer.children;
    var length = children.length;
    if(layer) {
      children.forEach(function (i) {
        i.visible = false;
        if(i._member) i._member = null;
        if(i._name) i._name = null;
        if(i._offsetY) i._offsetY = null;
      });
      layer.removeChildren(0, length);
      layer = null;
      this._spriteset._nameLayer = null;
    }
    alias_Scene_Map_terminate.call(this);
  };

  var alias_Scene_Map_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
  Scene_Map.prototype.snapForBattleBackground = function() {
    if(this._spriteset._nameLayer) this._spriteset._nameLayer.visible = false;
    alias_Scene_Map_snapForBattleBackground.call(this);
  };

})();
