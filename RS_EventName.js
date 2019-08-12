//================================================================
// RS_EventName.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_EventName.js
 *
 * @plugindesc (v1.3.10) This plugin displays an event's name above a head. <RS_EventName>
 * @author biud436
 *
 * @param text Size
 * @type number
 * @desc Changes a text size
 * @default 22
 * @min 12
 * @decimals 0
 *
 * @param Show Player Text
 * @type boolean
 * @desc Shows player's name on its head
 * @default true
 * @on Can show
 * @off Can't show
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
 * @param Refresh Name
 * @type boolean
 * @desc Sets whether the name is updated.
 * @default false
 * @on true
 * @off update
 * 
 * @param Z
 * @type number
 * @min 0
 * @desc Specify the z-order value.
 * @default 20
 *
 * @help
 * More details for information, 
 * Please see this post - http://biud436.tistory.com/31
 * 
 * ==================================================================================
 * How to Use
 * ==================================================================================
 * To show up the name of certain event, you must set the event note as follows.
 * (Note that An Event Note is next to event name)
 * 
 * #color[255, 0, 0]
 * 
 * There is no way how to change the color after initializing. 
 * it is not needed. Because that is the performance reasons. 
 * 
 * To change the name without saving to data file, you can call this plugin command.
 * 
 *      ChangeEventName eventId name
 * 
 *  eventId : 
 *      if you set the number is to 0, the eventId will set as current event id.
 *  name    : Speicfy the desired name. (Do not be omitted the name)
 * 
 * Here are how to use it.
 * The event name of the target will be updated to include as follows name informations.
 * 
 *      ChangeEventName 0 RPG Maker MV
 * 
 * ==================================================================================
 * Change Log
 * ==================================================================================
 * 2016.03.25 (v1.3.0) - Added New Function called updateScale();
 * 2016.03.26 (v1.3.1) - Added Vehicle
 * 2016.05.05 (v1.3.2) - Updated Vector2 Class
 * 2016.05.20 (v1.3.3) - Fixed issues that can cause an increase of opacity and the memory leak.
 * 2016.05.21 (v1.3.4) - Fixed issue that causes the memory leak.
 * 2016.05.28 (v1.3.5) - Fixed Color Bug.
 * 2016.08.20 (v1.3.6) - Fixed the issue that was not working the name toggle function.
 * 2016.09.27 (v1.3.7) - The visible setting sets as the false before calling the battle.
 * 2016.09.28 (v1.3.8) - Fixed the issue that occurs when the player is not existed.
 * 2018.10.22 (v1.3.9) :
 * - Fixed the bug that vehicle name shows up even in the map that the vehicle didn't set.
 * 2019.03.03 (v1.3.10) :
 * - Added a feature that can change the name.
 * - Added a feature that can set the z-depth value.
 * - Refactoring the code.
 */

/*:ko
 * RS_EventName.js
 * 
 * @plugindesc (v1.3.10) 이벤트 이름 표시 플러그인 <RS_EventName>
 * @author 러닝은빛
 *
 * @param text Size
 * @text 텍스트 크기
 * @type number
 * @desc 텍스트 크기를 변경합니다.
 * @default 16
 * @min 4
 * @decimals 0
 *
 * @param Show Player Text
 * @text 플레이어 텍스트 표시
 * @type boolean
 * @desc 플레이어 텍스트를 머리 위에 표시합니다.
 * @default true
 * @on 표시함
 * @off 표시하지 않음
 *
 * @param Boat
 * @text 보트
 * @desc 탈것 - 보트의 이름을 설정합니다.
 * @default 보트
 *
 * @param Ship
 * @text 배
 * @desc 탈것 - 배의 이름을 설정합니다.
 * @default 배
 *
 * @param AirShip
 * @text 비행선
 * @desc 탈것 - 비행선의 이름을 설정합니다.
 * @default 비행선
 * 
 * @param Refresh Name
 * @text 이름 업데이트
 * @type boolean
 * @desc 이름이 달라졌을 경우 새로 그립니다.
 * @default false
 * @on true
 * @off update
 *
 * @param Z
 * @text Z 좌표
 * @type number
 * @min 0
 * @desc Z 좌표를 설정하세요.
 * @default 20
 *
 * @help
 * ==================================================================================
 * 사용법
 * ==================================================================================
 * 특정 이벤트 위에 이벤트 이름을 표시하려면 다음과 같은 이벤트 노트를 설정하세요.
 * (주의 : 이벤트 노트는 이벤트 이름 칸 옆에 위치합니다.)
 * 
 * #color[255, 0, 0]
 * 
 * 성능상의 이유로 게임이 시작된 후 색상을 변경할 수는 없습니다.
 * 
 * 이름은 임의로만 변경할 수 있습니다.
 * 
 * 다음 플러그인 명령을 활용하면, 이벤트 데이터 파일을 실제로 변경하진 않지만, 
 * 화면에 표시되는 이름을 임의로 변경할 수 있습니다.
 * 임의 변경이기 때문에 맵이 재시작되면 다시 원래 가지고 있던 이름이 표시됩니다.
 * 
 *      ChangeEventName eventId name
 * 
 *  eventId : 
 *      이 값을 0으로 설정하면, eventId 값은 현재 이벤트의 id 값이 됩니다.
 *  name    : 원하는 이름으로 설정하세요. (생략할 수 없습니다. 반드시 적으세요. )
 * 
 * 실제 사용 예는 다음과 같습니다.
 * 
 *      ChangeEventName 0 RPG Maker MV
 * 
 * ==================================================================================
 * Change Log
 * ==================================================================================
 * 2016.03.25 (v1.3.0) - Added New Function called updateScale();
 * 2016.03.26 (v1.3.1) - Added Vehicle
 * 2016.05.05 (v1.3.2) - Updated Vector2 Class
 * 2016.05.20 (v1.3.3) - Fixed issues that can cause an increase of opacity and the memory leak.
 * 2016.05.21 (v1.3.4) - Fixed issue that causes the memory leak.
 * 2016.05.28 (v1.3.5) - Fixed Color Bug.
 * 2016.08.20 (v1.3.6) - Fixed the issue that was not working the name toggle function.
 * 2016.09.27 (v1.3.7) - The visible setting sets as the false before calling the battle.
 * 2016.09.28 (v1.3.8) - Fixed the issue that occurs when the player is not existed.
 * 2018.10.22 (v1.3.9) :
 * - Fixed the bug that vehicle name shows up even in the map that the vehicle didn't set.
 * 2019.03.03 (v1.3.10) :
 * - Added a feature that can change the name.
 * - Added a feature that can set the z-depth value.
 * - Refactoring the code.
 */

var Imported = Imported || {};
Imported.RS_EventName = true;

var RS = RS || {};
RS.EventName = RS.EventName || {};
RS.EventName.Params = RS.EventName.Params || {};

(function() {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_EventName>');
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;  
    
    RS.EventName.Params.textSize = Number(parameters['textSize'] || 14 );
    
    RS.EventName.Params.regExpr = /(?:@color|#color)\[*(\d*)[ ]*,*[ ]*(\d*)[ ]*,*[ ]*(\d*)\]*/;
    RS.EventName.Params.showPlayerText = String(parameters['Show Player Text'] || 'true');

    RS.EventName.Params.airshipName = String(parameters['AirShip'] || 'AirShip');
    RS.EventName.Params.shipName = String(parameters['Ship'] || 'Ship');
    RS.EventName.Params.boatName = String(parameters['Boat'] || 'Boat');

    RS.EventName.Params.isRefreshName = Boolean(parameters["Refresh Name"] === "true");

    RS.EventName.Params.defaultOutlineWidth = 2;
    RS.EventName.Params.nameBoxYPadding = 10;
    RS.EventName.Params.mousePointerNearDst = 48;    

    RS.EventName.Params.nameLayerZ = 20;
    RS.EventName.Params.nameBoxRect = {
        x: 0,
        y: 0,
        width: 120,
        height: 40
    };

    RS.EventName.Params.playerNameColor = [255, 255, 255];
    RS.EventName.Params.vehicleNameColor = [255, 255, 255];

    RS.EventName.Params.nameAnchor = {
        x : 0.5,
        y : 1.0
    };

    RS.EventName.Params.fontName = "GameFont";
    
    //===========================================================================
    // Functions
    //===========================================================================

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
    
    //===========================================================================
    // Vector2
    //===========================================================================
    
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
            console.error("it doesn't a normalized vector");
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
    
    //===========================================================================
    // Sprite_Name
    //===========================================================================
    
    Sprite_Name.prototype = Object.create(Sprite.prototype);
    Sprite_Name.prototype.constructor = Sprite_Name;
    
    Sprite_Name.MOUSE_EVENT = Vector2.empty();
    
    Sprite_Name.prototype.initialize = function(data) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = new Bitmap(RS.EventName.Params.nameBoxRect.width, RS.EventName.Params.nameBoxRect.height);
        this._offsetY = data.height;
        this._member = data.member;
        this._prevName = "";
        this.setFontName();
        this.setTextSize(data.textSize);
        this.setTextColor(data.textColor);
        this.setTextOutlineWidth(data.outlineWidth);
        this.setPosition();
        this.setAnchor(data.anchor);
        this.updateName();
        this._visible = this.visible = this.isReady();
    };

    Sprite_Name.prototype.setFontName = function() {
        this.bitmap.fontFace = RS.EventName.Params.fontName;
    };
    
    Sprite_Name.prototype.setTextSize = function(n) {
        this.bitmap.fontSize = n;
    };
    
    Sprite_Name.prototype.setTextOutlineWidth = function(n) {
        this.bitmap.outlineWidth = n || RS.EventName.Params.defaultOutlineWidth;
    };

    Sprite_Name.prototype.setPosition = function() {
        this.x = this._member.screenX();
        this.y = this._member.screenY() - (this._offsetY() || 0) + RS.EventName.Params.nameBoxYPadding;
    };
    
    Sprite_Name.prototype.setAnchor = function(pt) {
        this.anchor.x = pt.x || RS.EventName.Params.nameAnchor.x;
        this.anchor.y = pt.y || RS.EventName.Params.nameAnchor.y;
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

    Sprite_Name.prototype.obtainName = function() {
        var target = this._member;
        var eventId = target.eventId();
        var tempEvent = $dataMap.events[eventId];
        var name = tempEvent.name || "";        
        return name;
    };
    
    Sprite_Name.prototype.updateName = function() {
        
        if(!this.bitmap) return;
        if(!this.isReady()) return;
        
        var name = this.obtainName();

        if(this._prevName !== name) {
            this.bitmap.clear();
            this.bitmap.drawText(name, 0, 0, RS.EventName.Params.nameBoxRect.width, RS.EventName.Params.nameBoxRect.height, 'center');
            this._prevName = name;
        }

    };
    
    Sprite_Name.prototype.updateVisibility = function () {
        if(this._visible !== this.isReady()) {
            this.visible = this._visible = this.isReady();
        }
    };
    
    Sprite_Name.prototype.updatePosition = function () {
        this.x = this._member.screenX();
        this.y = this._member.screenY() - (this._offsetY() || 0) + RS.EventName.Params.nameBoxYPadding;
    };
    
    Sprite_Name.prototype.updateScale = function () {
        var x, y, t;
        if(Vector2.distance(this, Sprite_Name.MOUSE_EVENT) < RS.EventName.Params.mousePointerNearDst) {
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
        this.updateName();
    };
    
    //===========================================================================
    // TouchInput
    //===========================================================================
    
    var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function(event) {
        alias_TouchInput_onMouseMove.call(this, event);
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        if(Sprite_Name.MOUSE_EVENT instanceof Vector2) {
            Sprite_Name.MOUSE_EVENT.set(x, y);
        }
    };
    
    //===========================================================================
    // Sprite_PlayerName
    //===========================================================================
    
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
        ( !this.isTransparent() ) && RS.EventName.Params.showPlayerText === 'true' ;
    };

    Sprite_PlayerName.prototype.obtainName = function() {
        var name = $gameParty.members()[0].name() || "";    
        return name;
    };
    
    //===========================================================================
    // Sprite_VehicleName
    //===========================================================================
    
    Sprite_VehicleName.prototype = Object.create(Sprite_Name.prototype);
    Sprite_VehicleName.prototype.constructor = Sprite_VehicleName;
    
    Sprite_VehicleName.prototype.initialize = function(data) {
        this._type = data.name;
        Sprite_Name.prototype.initialize.call(this, data);
    };
    
    Sprite_VehicleName.prototype.isTransparent = function() {
        return false;
    };
    
    Sprite_VehicleName.prototype.isReady = function() {
        var isReady = this._member._mapId === $gameMap.mapId();
        return RS.EventName.Params.showPlayerText === 'true' && isReady;
    };
    
    Sprite_VehicleName.prototype.isErased = function() {
        return !this._member._characterName;
    };

    Sprite_VehicleName.prototype.obtainName = function() {
        
        var type = this._type.slice(0);

        switch (type) {
            case 'airship':
                return RS.EventName.Params.airshipName;
                break;
            case 'ship':
                return RS.EventName.Params.shipName;
                break;
            case 'boat':
                return RS.EventName.Params.boatName;
                break;
            default:
                return type;
        }

    };
    
    //===========================================================================
    // Sprite_Character
    //===========================================================================
    
    Sprite_Character.prototype.isValidNameSprite = function () {
        var c;
        var character = this._character;
        if( character ) c = character.constructor.name;
        if(c === 'Game_Event') return true;
        if(c === 'Game_Vehicle') return true;
        if(c === 'Game_Player') return true;
        return false;
    };
    
    Sprite_Character.prototype.createNameSprite = function () {
        if(!this.isValidNameSprite()) return;
    };
    
    var alias_Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        alias_Sprite_Character_update.call(this);
        if(!this._nameSprite) this.createNameSprite();
    };
    
    //===========================================================================
    // Spriteset_Map
    //===========================================================================
    
    Spriteset_Map.prototype.addNewNameSprite = function (type, data) {
        
        var newNameSprite;
        
        switch (type) {
            case 'Game_Player':
                newNameSprite = new Sprite_PlayerName(data);
                break;
            case 'Game_Vehicle':
                newNameSprite = new Sprite_VehicleName(data);
                break;
            case 'Game_Event':
                newNameSprite = new Sprite_Name(data);
                break;
        }
        
        if(this._nameLayer && newNameSprite) {
            this._nameLayer.addChild(newNameSprite);
        }
        
    };
    
    Spriteset_Map.prototype.createNameLayer = function () {
        
        var commonData = {
            'outlineWidth': RS.EventName.Params.defaultOutlineWidth,
            'anchor': new Point(RS.EventName.Params.nameAnchor.x, RS.EventName.Params.nameAnchor.y),
            'textSize': RS.EventName.Params.textSize,
            'height': $gameMap.tileHeight.bind(this)
        };
        
        // Create Name Layer
        this._nameLayer = new Sprite();
        this._nameLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._nameLayer.z = RS.EventName.Params.nameLayerZ;
        this.addChild(this._nameLayer);
        
        // Create Each Characters
        this._characterSprites.forEach(function(i) {
            
            var color = [];
            var character = i._character;
            var _constructor = character.constructor.name;
            
            switch(_constructor) {
                
                // Create a name sprite for game player.
                case 'Game_Player':

                    // if it exists the member into game party, it creates a name sprite.
                    if($gameParty.members()[0]) {
                        this.addNewNameSprite(_constructor, Object.assign(commonData, {
                            'member': $gamePlayer,
                            'textColor': RS.EventName.Params.playerNameColor
                        }));
                    }

                    break;
                    
                // Create the name sprite for the game event.
                case 'Game_Event':
                    
                    if(character._erased) return;
                    if(character.isTransparent()) return;
                    if(!character.event().note.match(RS.EventName.Params.regExpr)) return;
                    
                    color.push(Number(RegExp.$1 || 255));
                    color.push(Number(RegExp.$2 || 255));
                    color.push(Number(RegExp.$3 || 255));
                    
                    this.addNewNameSprite(_constructor, Object.assign(commonData, {
                        'member': character,
                        'textColor': color,
                    }));

                    break;
                
                // Create the name sprite for the game vehicle.
                case 'Game_Vehicle':
                
                    this.addNewNameSprite(_constructor, Object.assign(commonData, {
                        'member': character,
                        'textSize': RS.EventName.Params.textSize,
                        'textColor': RS.EventName.Params.vehicleNameColor,
                        'name': character._type
                    }));
                    
                    break;
            }
            
        }, this);
        
    };
    
    Spriteset_Map.prototype.removeNameLayer = function () {

        var layer = this._nameLayer;
        var children = layer.children;
        var length = children.length;
        if(!layer) return;
        
        children.forEach(function (i) {
            i.visible = false;
            if(i._member) i._member = null;
            if(i._name) i._name = null;
            if(i._offsetY) i._offsetY = null;
        });
        
        layer.removeChildren(0, length);
        
        layer = null;
        this._nameLayer = null;
    };
    
    var alias_Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        alias_Spriteset_Map_createCharacters.call(this);
        this.createNameLayer();
        this.on('removed', this.removeNameLayer, this);
    };
    
    //===========================================================================
    // Scene_Map
    //===========================================================================
    
    var alias_Scene_Map_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
    Scene_Map.prototype.snapForBattleBackground = function() {
        
        if(this._spriteset._nameLayer) {
            this._spriteset._nameLayer.visible = false;
        }

        alias_Scene_Map_snapForBattleBackground.call(this);
    };

    //===========================================================================
    // Game_Interpreter
    //===========================================================================

    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "ChangeEventName") {
            if(!RS.EventName.Params.isRefreshName) return;
            var eventId = parseInt(args[0]);
            if(eventId <= 0) eventId = this._eventId;
            if(eventId <= 0) return;
            var name = args.slice(1).join(" ");
            if($dataMap.events[eventId]) {
                $dataMap.events[eventId].name = name;
            }
        }
    };
    
    window.Vector2 = Vector2;
    window.Sprite_Name = Sprite_Name;
    window.Sprite_PlayerName = Sprite_PlayerName;
    window.Sprite_VehicleName = Sprite_VehicleName;

})();
