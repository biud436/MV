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
 * @plugindesc (v1.3.11) This plugin displays an event's name above a head. <RS_EventName>
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
 * 2019.10.20 (v1.3.11) :
 * - Refactoring the code.
 * 
 * ==================================================================================
 * Commands
 * ==================================================================================
 * 
 * @command ChangeEventName
 * @text ChangeEventName
 * @desc
 * 
 * @arg eventId
 * @type number
 * @desc
 * @default 1
 * 
 * @arg name
 * @type string
 * @desc
 * @default ""
 * 
 */

/*:ko
 * RS_EventName.js
 * 
 * @plugindesc (v1.3.11) 이벤트 이름 표시 플러그인 <RS_EventName>
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
 * Commands
 * ==================================================================================
 * 
 * @command ChangeEventName
 * @text ChangeEventName
 * @desc
 * 
 * @arg eventId
 * @type number
 * @desc
 * @default 1
 * 
 * @arg name
 * @type string
 * @desc
 * @default ""
 * 
 */

var Imported = Imported || {};
Imported.RS_EventName = true;

var RS = RS || {};
RS.EventName = RS.EventName || {};
RS.EventName.Params = RS.EventName.Params || {};

(() => {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_EventName>');
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;  
    
    const pluginName = (parameters.length > 0) && parameters[0].name;

    //===========================================================================
    // RS.EventName.Params
    //===========================================================================

    Object.assign(RS.EventName.Params, {

        textSize : Number(parameters['textSize'] || 14 ),

        regExpr : /(?:@color|#color)\[*(\d*)[ ]*,*[ ]*(\d*)[ ]*,*[ ]*(\d*)\]*/,
        showPlayerText : String(parameters['Show Player Text'] || 'true'),

        airshipName : String(parameters['AirShip'] || 'AirShip'),
        shipName : String(parameters['Ship'] || 'Ship'),
        boatName : String(parameters['Boat'] || 'Boat'),
    
        isRefreshName : Boolean(parameters["Refresh Name"] === "true"),
    
        defaultOutlineWidth : 2,
        nameBoxYPadding : 10,
        mousePointerNearDst : 48,
    
        nameLayerZ : 20,
        nameBoxRect : {
            x: 0,
            y: 0,
            width: 120,
            height: 40
        },
    
        playerNameColor : [255, 255, 255],
        vehicleNameColor : [255, 255, 255],
    
        nameAnchor : {
            x : 0.5,
            y : 1.0
        },

    });

    Object.assign(RS.EventName, {
        get boxWidth() {
            return Utils.RPGMAKER_NAME === "MZ" ? Graphics.width : Graphics.boxWidth;
        },
        get boxHeight() {
            return Utils.RPGMAKER_NAME === "MZ" ? Graphics.height : Graphics.boxHeight;
        },
    });

    //===========================================================================
    // Vector2
    //===========================================================================

    class Vector2 {
        
        /**
         * @param  {Number} x
         * @param  {Number} y
         */
        constructor(x, y) {
            this._x = x;
            this._y = y;
        }        

        /**
         * @member {Number}
         */
        get x() {
            return this._x;
        }

        set x(value) {
            this._x = value;
        }

        /**
         * @member {Number}
         */        
        get y() {
            return this._y;
        }

        set y(value) {
            this._y = value;
        }

        /**
         * @param  {Vector2} vec
         */
        add(vec) {
            this.x = this.x + vec.x;
            this.y = this.y + vec.y;
            return this;
        }

        /**
         * @param  {Vector2} vec
         */        
        minus(vec) {
            this.x = this.x - vec.x;
            this.y = this.y - vec.y;
            return this;
        }

        /**
         * @param  {Vector2} vec
         */        
        mul(vec) {
            this.x = this.x * vec.x;
            this.y = this.y * vec.y;
            return this;
        }

        /**
         * @param  {Vector2} vec
         */        
        div(vec) {
            if(!vec) return this;
            if(vec.x === 0.0) return this;
            if(vec.y === 0.0) return this;
            this.x = this.x / vec.x;
            this.y = this.y / vec.y;
            return this;
        }

        /**
         * @param  {Number} x
         * @param  {Number} y
         */
        set(x, y) {
            this.x = x;
            this.y = y;            
        }

        getLength() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * @member {Number}
         * @readonly
         */        
        get length() {
            return this.getLength();
        }

        /**
         * @param  {Vector2} vec
         * @return {Boolean}
         */
        static isNormalize(vec) {
            if( (vec.x >= 0.0 && vec.x <= 1.0) &&
            (vec.y >= 0.0 && vec.y <= 1.0) ) {
                return true;
            }
            return false;            
        }

        /**
         * @param  {Vector2} vec
         */
        getAngle(vec) {
            if(Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
                var val = this.dot(vec);
                return Math.acos(val);
            } else {
                console.error("it doesn't a normalized vector");
                return 0.0;
            }
        }

        static empty() {
            return new Vector2(0.0, 0.0);
        }        

        normalize() {
            var rel = Vector2.empty();
            if(this.length != 0) {
                rel.x = this.x / this.length;
                rel.y = this.y / this.length;
            }
            return rel;
        }

        /**
         * @param  {Vector2} vec
         */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y;
        }

        /**
         * @param  {Number} angle
         */
        rotate(angle) {
            this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
            this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        }

        /**
         * @param  {Vector2} vec
         * @param  {Number} angle
         */
        pointDirection(vec, angle) {
            return Math.atan2(vec.y - this.y, vec.x - this.x) - (Math.PI / 180) * angle;
        }

        /**
         * @param  {Vector2} vec1
         * @param  {Vector2} vec2
         * @param  {Number} t
         */
        static mix(vec1, vec2, t) {
            var vec = Vector2.empty();
            vec.x = vec1.x + t * (vec2.x - vec1.x);
            vec.y = vec1.x + t * (vec2.y - vec1.y);
            return vec;
        }

        /**
         * @param  {Vector2} vec1
         * @param  {Vector2} vec2
         * @param  {Vector2} vec3
         * @param  {Number} t
         */
        static quadraticBezier(vec1, vec2, vec3, t) {
            var d, e, p;
            d = Vector2.mix(vec1, vec2, t);
            e = Vector2.mix(vec2, vec3, t);
            p = Vector2.mix(d, e, t);
            return p;            
        }

        /**
         * @param  {Number} angle
         */
        static limitAngle(angle) {
            while(angle < -Math.PI) angle += Math.PI * 2;
            while(angle >= Math.PI) angle -= Math.PI * 2;
            return angle;            
        }
       
        /**
         * @param  {Vector2} vec1
         * @param  {Vector2} vec2
         */
        static distance(vec1, vec2) {
            const val = Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2);
            return Math.sqrt(val);
        }        

    }

    //===========================================================================
    // Sprite_Name
    //===========================================================================

    class Sprite_Name extends Sprite {
        constructor(data) {
            super();
            
            this.bitmap = new Bitmap(RS.EventName.Params.nameBoxRect.width, RS.EventName.Params.nameBoxRect.height);
            this.initMembers(data);
            this.setFontName();
            this.setTextSize(data.textSize);
            this.setTextColor(data.textColor);
            this.setTextOutlineWidth(data.outlineWidth);
            this.setPosition();
            this.setAnchor(data.anchor);
            this.updateName();
            this._visible = this.visible = this.isReady();

        }

        initMembers(data) {

            this._member = data.member;
            this._prevName = "";
        }

        setFontName() {
            this.bitmap.fontFace = Window_Base.prototype.standardFontFace.call(this);
        }

        setTextSize(n) {
            this.bitmap.fontSize = n;            
        }

        setTextOutlineWidth(n) {
            this.bitmap.outlineWidth = n || RS.EventName.Params.defaultOutlineWidth;            
        }

        characterWidth() {
            if(!this._member) return 0;
            const name = character.characterName();
            const isBigCharacter = ImageManager.isBigCharacter(name);
            const bitmap = ImageManager.loadCharacter(name);
            
            if(!bitmap) return 0;

            return isBigCharacter ? bitmap.width / 3 : bitmap.width / 12;

        }

        characterHeight() {
            if(!this._member) return 0;
            const name = this._member.characterName();
            const isBigCharacter = ImageManager.isBigCharacter(name);
            const bitmap = ImageManager.loadCharacter(name);
            
            if(!bitmap) return 0;

            return isBigCharacter ? bitmap.height / 4 : bitmap.height / 8;

        }                

        setPosition() {
            this.x = this._member.screenX();
            this.y = this._member.screenY() - this.characterHeight() + RS.EventName.Params.nameBoxYPadding;
        }

        setAnchor(pt) {
            this.anchor.x = pt.x || RS.EventName.Params.nameAnchor.x;
            this.anchor.y = pt.y || RS.EventName.Params.nameAnchor.y;
        }

        isTransparent() {
            return this._member.isTransparent();            
        }

        isErased() {
            return this._member._erased || !this._member._characterName;            
        }

        isReady() {
            return (this._member.findProperPageIndex() > -1) &&
            (!this.isTransparent()) &&
            (!this.isErased());
        }

        setTextColor(color) {
            this.bitmap.textColor = Utils.rgbToCssColor.apply(this, color);
        }

        obtainName() {
            var target = this._member;
            var eventId = target.eventId();
            var tempEvent = $dataMap.events[eventId];
            var name = tempEvent.name || "";        
            return name;
        }

        updateName() {
            if(!this.bitmap) return;
            if(!this.isReady()) return;
            
            var name = this.obtainName();
    
            // if the text has be changed, it will be re-generated the texture so it can have a performance penalty.
            if(this._prevName !== name) {
                this.bitmap.clear();
                this.bitmap.drawText(name, 0, 0, RS.EventName.Params.nameBoxRect.width, RS.EventName.Params.nameBoxRect.height, 'center');
                this._prevName = name;
            }
        }

        updateVisibility() {
            if(this._visible !== this.isReady()) {
                this.visible = this._visible = this.isReady();
            }
        }

        updatePosition() {
            this.x = this._member.screenX();
            this.y = this._member.screenY() - this.characterHeight() + RS.EventName.Params.nameBoxYPadding;
        }

        updateScale() {
            var x, y, t;
            if(Vector2.distance(this, Sprite_Name.MOUSE_EVENT) < RS.EventName.Params.mousePointerNearDst) {
                t = (Date.now() % 10000 / 10000);
                this.scale = Vector2.quadraticBezier({x:1, y:1}, {x:2, y:2}, {x:1, y:1}, t);
            } else {
                this.scale = {x: 1, y: 1};
            }            
        }

        updateFilter() {}
        updateRotation() {}

        update() {
            super.update();
            this.updatePosition();
            this.updateVisibility();
            this.updateScale();
            this.updateFilter();
            this.updateRotation();
            this.updateName();            
        }

    }
    
    Sprite_Name.MOUSE_EVENT = Vector2.empty();
    
    //===========================================================================
    // Mouse
    //===========================================================================

    (() => {
        const body = document.body;
        if(body) {
            body.addEventListener("mousemove", event => {
                const x = Graphics.pageToCanvasX(event.pageX);
                const y = Graphics.pageToCanvasY(event.pageY);
    
                if(Sprite_Name.MOUSE_EVENT instanceof Vector2) {
                    Sprite_Name.MOUSE_EVENT.set(x, y);
                }            
                
            });
        }
    })();
    
    //===========================================================================
    // Sprite_PlayerName
    //===========================================================================
    
    class Sprite_PlayerName extends Sprite_Name {
        constructor(data) {
            super(data);
            this._visible = this.visible = this.isReady();
            this._pangle = 0;
        }

        setPosition() {
            this.x = this._member.screenX();
            this.y = this._member.screenY() - this.characterHeight() + 10;
        }

        isTransparent() {
            return this._member.isTransparent();
        }

        isReady() {
            return ( $gameParty.members().length > 0 ) &&
            ( !this.isTransparent() ) && RS.EventName.Params.showPlayerText === 'true' ;
        }

        obtainName() {
            const name = $gameParty.members()[0].name() || "";    
            return name;
        }

    }

    //===========================================================================
    // Sprite_VehicleName
    //===========================================================================

    class Sprite_VehicleName extends Sprite_Name {

        constructor(data) {
            super(data);
        }

        initMembers(data) {
            super.initMembers(data);
            this._type = data.name;            
        }

        isTransparent() {
            return false;
        }

        isReady() {
            var isReady = this._member._mapId === $gameMap.mapId();
            return RS.EventName.Params.showPlayerText === 'true' && isReady;            
        }

        isErased() {
            return !this._member._characterName;            
        }

        obtainName() {

            const type = this._type.slice(0);

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

        }
    }
    
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
    // NameComponent
    //===========================================================================

    class NameComponent {

        constructor(sprite) {
            this._sprite = sprite;
        }
        
        /**
         * 
         * @param {PIXI.Sprite} parent 
         */
        attach(parent) {
            if(!parent) return;
            if(this._sprite) parent.addChild(this._sprite);
        }

        /**
         * @param  {String} type
         * @param  {{outlineWidth: Number, anchor: Point, textSize: Number, height: Function}} data
         */        
        static create(type, data) {

            let sprite = null;
            
            switch (type) {
                case 'Game_Player':
                    sprite = new Sprite_PlayerName(data);
                    break;
                case 'Game_Vehicle':
                    sprite = new Sprite_VehicleName(data);
                    break;
                case 'Game_Event':
                    sprite = new Sprite_Name(data);
                    break;
            }          

            return new NameComponent(sprite);

        }        

    }

    //===========================================================================
    // Spriteset_Map
    //===========================================================================    
    
    Spriteset_Map.prototype.addNewNameSprite = function (type, data) {
        if(!this._nameLayer) return;
        NameComponent.create(type, data).attach(this._nameLayer);
    };
    
    Spriteset_Map.prototype.createNameLayer = function () {
        
        let commonData = {
            'outlineWidth': RS.EventName.Params.defaultOutlineWidth,
            'anchor': new Point(RS.EventName.Params.nameAnchor.x, RS.EventName.Params.nameAnchor.y),
            'textSize': RS.EventName.Params.textSize,
        };
        
        // Create Name Layer
        this._nameLayer = new Sprite();
        this._nameLayer.setFrame(0, 0, RS.EventName.boxWidth, RS.EventName.boxHeight);
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
                    if($gameParty.leader()) {
                        this.addNewNameSprite(_constructor, Object.assign(commonData, {
                            'member': $gamePlayer,
                            'textColor': RS.EventName.Params.playerNameColor,
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
                        'name': character._type,
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

    if(Utils.RPGMAKER_NAME === "MZ") {
        PluginManager.registerCommand(pluginName, "ChangeEventName", args => {
        
            if(!RS.EventName.Params.isRefreshName) {
                return;
            }
            
            const eventId = Number(args.eventId);
            const name = args.name;
    
            if(eventId <= 0) eventId = this._eventId;
            if(eventId <= 0) return;
    
            if($dataMap.events[eventId]) {
                $dataMap.events[eventId].name = name;
            }        
                    
        });
    }

    window.Vector2 = Vector2;
    window.Sprite_Name = Sprite_Name;
    window.Sprite_PlayerName = Sprite_PlayerName;
    window.Sprite_VehicleName = Sprite_VehicleName;

})();
