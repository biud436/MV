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
 * @target MZ
 * @plugindesc (v1.4.1) This plugin displays an event's name above a head. <RS_EventName>
 * @author biud436
 * @url https://biud436.tistory.com/
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
 * 2020.10.17 (v1.4.0) :
 * + Removed RPG Maker MV dependency.
 *      - Removed Utils.rgbToCssColor that can't work in MZ.
 *      - Fixed font and Graphics settings.
 * 2023.08.12 (v1.4.1) - ES6 Refactoring and tested in RMMV 1.6.2 (nw v0.55.0)
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
 * @target MZ
 * @plugindesc (v1.4.1) 이벤트 이름 표시 플러그인 <RS_EventName>
 * @author 러닝은빛
 * @url https://biud436.tistory.com/
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

(() => {
    'use strict';

    const RS = window.RS || {};
    RS.EventName = RS.EventName || {};
    RS.EventName.Params = RS.EventName.Params || {};

    let parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_EventName>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    const pluginName = parameters.length > 0 && parameters[0].name;

    //===========================================================================
    // RS.EventName.Params
    //===========================================================================

    Object.assign(RS.EventName.Params, {
        textSize: Number(parameters.textSize || 14),

        regExpr: /(?:@color|#color)\[*(\d*)[ ]*,*[ ]*(\d*)[ ]*,*[ ]*(\d*)\]*/,
        showPlayerText: String(parameters['Show Player Text'] || 'true'),

        airshipName: String(parameters.AirShip || 'AirShip'),
        shipName: String(parameters.Ship || 'Ship'),
        boatName: String(parameters.Boat || 'Boat'),

        isRefreshName: Boolean(parameters['Refresh Name'] === 'true'),

        defaultOutlineWidth: 2,
        nameBoxYPadding: 10,
        mousePointerNearDst: 48,

        nameLayerZ: 20,
        nameBoxRect: {
            x: 0,
            y: 0,
            width: 120,
            height: 40,
        },

        playerNameColor: [255, 255, 255],
        vehicleNameColor: [255, 255, 255],

        nameAnchor: {
            x: 0.5,
            y: 1.0,
        },
    });

    Object.assign(RS.EventName, {
        get boxWidth() {
            return Utils.RPGMAKER_NAME === 'MZ'
                ? Graphics.width
                : Graphics.boxWidth;
        },
        get boxHeight() {
            return Utils.RPGMAKER_NAME === 'MZ'
                ? Graphics.height
                : Graphics.boxHeight;
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
            this.x += vec.x;
            this.y += vec.y;
            return this;
        }

        /**
         * @param  {Vector2} vec
         */
        minus(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
            return this;
        }

        /**
         * @param  {Vector2} vec
         */
        mul(vec) {
            this.x *= vec.x;
            this.y *= vec.y;
            return this;
        }

        /**
         * @param  {Vector2} vec
         */
        div(vec) {
            if (!vec) return this;
            if (vec.x === 0.0) return this;
            if (vec.y === 0.0) return this;
            this.x /= vec.x;
            this.y /= vec.y;
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
            if (vec.x >= 0.0 && vec.x <= 1.0 && vec.y >= 0.0 && vec.y <= 1.0) {
                return true;
            }
            return false;
        }

        /**
         * @param  {Vector2} vec
         */
        getAngle(vec) {
            if (Vector2.isNormalize(this) && Vector2.isNormalize(vec)) {
                const val = this.dot(vec);
                return Math.acos(val);
            }

            console.error("it doesn't a normalized vector");
            return 0.0;
        }

        static empty() {
            return new Vector2(0.0, 0.0);
        }

        normalize() {
            const rel = Vector2.empty();
            if (this.length !== 0) {
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
            return (
                Math.atan2(vec.y - this.y, vec.x - this.x) -
                (Math.PI / 180) * angle
            );
        }

        /**
         * @param  {Vector2} vec1
         * @param  {Vector2} vec2
         * @param  {Number} t
         */
        static mix(vec1, vec2, t) {
            const vec = Vector2.empty();
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
            const d = Vector2.mix(vec1, vec2, t);
            const e = Vector2.mix(vec2, vec3, t);
            const p = Vector2.mix(d, e, t);
            return p;
        }

        /**
         * @param  {Number} angle
         */
        static limitAngle(angle) {
            while (angle < -Math.PI) angle += Math.PI * 2;
            while (angle >= Math.PI) angle -= Math.PI * 2;
            return angle;
        }

        /**
         * @param  {Vector2} vec1
         * @param  {Vector2} vec2
         */
        static distance(vec1, vec2) {
            const val = (vec2.x - vec1.x) ** 2 + (vec2.y - vec1.y) ** 2;
            return Math.sqrt(val);
        }
    }

    //===========================================================================
    // Sprite_Name
    //===========================================================================

    const SCALE_UP_X2_MATRIX = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 1 },
    ];

    const DEFAULT_SCALE_X1_MATRIX = { x: 1, y: 1 };

    class Sprite_Name extends Sprite {
        constructor(data) {
            super();

            this.bitmap = new Bitmap(
                RS.EventName.Params.nameBoxRect.width,
                RS.EventName.Params.nameBoxRect.height
            );
            this.initMembers(data);
            this.setFontName();
            this.setTextSize(data.textSize);
            this.setTextColor(data.textColor);
            this.setTextOutlineWidth(data.outlineWidth);
            this.setPosition();
            this.setAnchor(data.anchor);
            this.updateName();
            // eslint-disable-next-line no-multi-assign
            this._visible = this.visible = this.isReady();
        }

        initMembers(data) {
            this._member = data.member;
            this._prevName = '';
        }

        setFontName() {
            this.bitmap.fontFace =
                Utils.RPGMAKER_NAME === 'MZ'
                    ? $gameSystem.mainFontFace()
                    : Window_Base.prototype.standardFontFace.call(this);
        }

        setTextSize(n) {
            this.bitmap.fontSize = n;
        }

        setTextOutlineWidth(n) {
            this.bitmap.outlineWidth =
                n || RS.EventName.Params.defaultOutlineWidth;
        }

        characterWidth() {
            if (!this._member) return 0;
            const name = character.characterName();
            const isBigCharacter = ImageManager.isBigCharacter(name);
            const bitmap = ImageManager.loadCharacter(name);

            if (!bitmap) return 0;

            return isBigCharacter ? bitmap.width / 3 : bitmap.width / 12;
        }

        characterHeight() {
            const member = this._member;

            if (!member) return 0;
            const name = member.characterName();
            const isBigCharacter = ImageManager.isBigCharacter(name);
            const bitmap = ImageManager.loadCharacter(name);

            if (!bitmap) return 0;
            if (!(bitmap instanceof Bitmap)) {
                return 0;
            }

            return isBigCharacter ? bitmap.height / 4 : bitmap.height / 8;
        }

        setPosition() {
            this.x = this._member.screenX();
            this.y =
                this._member.screenY() -
                this.characterHeight() +
                RS.EventName.Params.nameBoxYPadding;
        }

        setAnchor(pt) {
            if (!pt) {
                console.warn('the variable named "pt" is not defined');
                return;
            }

            if (!('x' in pt) || !('y' in pt)) {
                console.warn('x and y variables are not defined');
                return;
            }

            const DEFAULT_NAME_ANCHOR_X = RS.EventName.Params.nameAnchor.x;
            const DEFAULT_NAME_ANCHOR_Y = RS.EventName.Params.nameAnchor.y;

            this.anchor.x = pt.x || DEFAULT_NAME_ANCHOR_X;
            this.anchor.y = pt.y || DEFAULT_NAME_ANCHOR_Y;
        }

        isTransparent() {
            return this._member.isTransparent();
        }

        isErased() {
            const isErasedEvent = this._member._erased;
            const isEmptyEventName = !this._member._characterName;

            return isErasedEvent || isEmptyEventName;
        }

        isReady() {
            return (
                this._member.findProperPageIndex() > -1 &&
                !this.isTransparent() &&
                !this.isErased()
            );
        }

        setTextColor(color) {
            const makeColor = `rgba(${color.join(',')}, 1.0)`;
            this.bitmap.textColor = makeColor;
        }

        obtainName() {
            const target = this._member;
            const eventId = target.eventId();
            const tempEvent = $dataMap.events[eventId];
            const name = tempEvent.name || '';
            return name;
        }

        updateName() {
            if (!this.bitmap) return;
            if (!this.isReady()) return;

            const name = this.obtainName();
            const { width, height } = RS.EventName.Params.nameBoxRect;
            const align = 'center';

            // if the text has be changed, it will be re-generated the texture so it can have a performance penalty.
            if (this._prevName !== name) {
                this.bitmap.clear();
                this.bitmap.drawText(name, 0, 0, width, height, align);
                this._prevName = name;
            }
        }

        updateVisibility() {
            const isReady = this.isReady();
            const { isVisible } = this;

            if (isVisible !== isReady) {
                this.visible = isReady;
            }
        }

        updatePosition() {
            const member = this._member;
            if (!member) {
                return;
            }

            const screenX = member.screenX();
            const screenY = member.screenY();
            const characterHeight = this.characterHeight();
            const paddingY = RS.EventName.Params.nameBoxYPadding || 0;

            this.x = screenX;
            this.y = screenY - characterHeight + paddingY;
        }

        updateScale() {
            // 이벤트 이름 스프라이트와 마우스 간의 거리를 측정합니다.
            const eventNameDistance = Vector2.distance(
                this,
                Sprite_Name.MOUSE_EVENT
            );

            // 마우스 포인터의 임계값을 설정합니다.
            // 이 임계값은 현재 마우스 포인터가 임계치 안으로 들어왔을 때, 3차 베지어 곡선을 통해 Scale Transform을 발생시킵니다.
            const mousePointerNearDist =
                RS.EventName.Params.mousePointerNearDst;

            if (eventNameDistance < mousePointerNearDist) {
                // TODO: "window.requestAnimationFrame"가 더 나은 대안일 수 있습니다.
                const t = (Date.now() % 10000) / 10000;

                this.scale = Vector2.quadraticBezier(...SCALE_UP_X2_MATRIX, t);
            } else {
                this.scale = DEFAULT_SCALE_X1_MATRIX;
            }
        }

        // eslint-disable-next-line class-methods-use-this
        updateFilter() {}

        // eslint-disable-next-line class-methods-use-this
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
        const { body } = document;
        if (body) {
            body.addEventListener('mousemove', event => {
                const x = Graphics.pageToCanvasX(event.pageX);
                const y = Graphics.pageToCanvasY(event.pageY);

                if (Sprite_Name.MOUSE_EVENT instanceof Vector2) {
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
            // eslint-disable-next-line no-multi-assign
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
            return (
                $gameParty.members().length > 0 &&
                !this.isTransparent() &&
                RS.EventName.Params.showPlayerText === 'true'
            );
        }

        // eslint-disable-next-line class-methods-use-this
        obtainName() {
            const name = $gameParty.members()[0].name() || '';
            return name;
        }
    }

    //===========================================================================
    // Sprite_VehicleName
    //===========================================================================

    class Sprite_VehicleName extends Sprite_Name {
        initMembers(data) {
            super.initMembers(data);
            this._type = data.name;
        }

        // eslint-disable-next-line class-methods-use-this
        isTransparent() {
            return false;
        }

        isReady() {
            const currentMapId = $gameMap.mapId();
            const isReady = this._member._mapId === currentMapId;
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
                case 'ship':
                    return RS.EventName.Params.shipName;
                case 'boat':
                    return RS.EventName.Params.boatName;
                default:
                    return type;
            }
        }
    }

    //===========================================================================
    // Sprite_Character
    //===========================================================================

    Sprite_Character.prototype.isValidNameSprite = function () {
        let c;
        const character = this._character;
        if (character) c = character.constructor.name;
        if (c === 'Game_Event') return true;
        if (c === 'Game_Vehicle') return true;
        if (c === 'Game_Player') return true;
        return false;
    };

    Sprite_Character.prototype.createNameSprite = function () {
        // eslint-disable-next-line no-useless-return
        if (!this.isValidNameSprite()) return;
    };

    const alias_Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        alias_Sprite_Character_update.call(this);
        if (!this._nameSprite) this.createNameSprite();
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
            if (!parent) return;
            if (this._sprite) parent.addChild(this._sprite);
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
                default:
                    throw new Error(`Unknown type: ${type}`);
            }

            return new NameComponent(sprite);
        }
    }

    //===========================================================================
    // Spriteset_Map
    //===========================================================================

    Spriteset_Map.prototype.addNewNameSprite = function (type, data) {
        if (!this._nameLayer) return;
        NameComponent.create(type, data).attach(this._nameLayer);
    };

    Spriteset_Map.prototype.createNameLayer = function () {
        const commonData = {
            outlineWidth: RS.EventName.Params.defaultOutlineWidth,
            anchor: new Point(
                RS.EventName.Params.nameAnchor.x,
                RS.EventName.Params.nameAnchor.y
            ),
            textSize: RS.EventName.Params.textSize,
        };

        // Create Name Layer
        this._nameLayer = new Sprite();
        this._nameLayer.setFrame(
            0,
            0,
            RS.EventName.boxWidth,
            RS.EventName.boxHeight
        );
        this._nameLayer.z = RS.EventName.Params.nameLayerZ;
        this.addChild(this._nameLayer);

        // Create Each Characters
        this._characterSprites.forEach(i => {
            const color = [];
            const character = i._character;
            const _constructor = character.constructor.name;

            switch (_constructor) {
                // Create a name sprite for game player.
                case 'Game_Player':
                    Object.assign(commonData, {
                        member: $gamePlayer,
                        textColor: RS.EventName.Params.playerNameColor,
                    });

                    // if it exists the member into game party, it creates a name sprite.
                    if ($gameParty.leader()) {
                        this.addNewNameSprite(_constructor, commonData);
                    }

                    break;

                // Create the name sprite for the game event.
                case 'Game_Event':
                    if (character._erased) return;
                    if (character.isTransparent()) return;
                    if (
                        !character
                            .event()
                            .note.match(RS.EventName.Params.regExpr)
                    )
                        return;

                    color.push(Number(RegExp.$1 || 255));
                    color.push(Number(RegExp.$2 || 255));
                    color.push(Number(RegExp.$3 || 255));

                    // combine object to common data.
                    Object.assign(commonData, {
                        member: character,
                        textColor: color,
                    });

                    this.addNewNameSprite(_constructor, commonData);

                    break;

                // Create the name sprite for the game vehicle.
                case 'Game_Vehicle':
                    // combine object to common data for Game_Vehicle.
                    Object.assign(commonData, {
                        member: character,
                        textSize: RS.EventName.Params.textSize,
                        textColor: RS.EventName.Params.vehicleNameColor,
                        name: character._type,
                    });

                    this.addNewNameSprite(_constructor, commonData);

                    break;
                default:
            }
        }, this);
    };

    Spriteset_Map.prototype.removeNameLayer = function () {
        let layer = this._nameLayer;
        const { children } = layer;
        const { length } = children;
        if (!layer) return;

        children.forEach(i => {
            i.visible = false;
            if (i._member) i._member = null;
            if (i._name) i._name = null;
            if (i._offsetY) i._offsetY = null;
        });

        layer.removeChildren(0, length);

        layer = null;
        this._nameLayer = null;
    };

    const alias_Spriteset_Map_createCharacters =
        Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function () {
        alias_Spriteset_Map_createCharacters.call(this);
        this.createNameLayer();
        this.on('removed', this.removeNameLayer, this);
    };

    //===========================================================================
    // Scene_Map
    //===========================================================================

    const alias_Scene_Map_snapForBattleBackground =
        Scene_Map.prototype.snapForBattleBackground;
    Scene_Map.prototype.snapForBattleBackground = function () {
        if (this._spriteset._nameLayer) {
            this._spriteset._nameLayer.visible = false;
        }

        alias_Scene_Map_snapForBattleBackground.call(this);
    };

    //===========================================================================
    // Game_Interpreter
    //===========================================================================

    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === 'ChangeEventName') {
            if (!RS.EventName.Params.isRefreshName) return;

            let eventId = parseInt(args[0], 10);

            if (eventId <= 0) eventId = this._eventId;
            if (eventId <= 0) return;

            const name = args.slice(1).join(' ');

            if ($dataMap.events[eventId]) {
                $dataMap.events[eventId].name = name;
            }
        }
    };

    if (Utils.RPGMAKER_NAME === 'MZ') {
        PluginManager.registerCommand(pluginName, 'ChangeEventName', args => {
            if (!RS.EventName.Params.isRefreshName) {
                return;
            }

            let eventId = Number(args.eventId);
            const name = args.name || '';

            if (eventId <= 0) eventId = this._eventId;
            if (eventId <= 0) return;

            if ($dataMap.events[eventId]) {
                $dataMap.events[eventId].name = name;
            }
        });
    }

    window.Vector2 = Vector2;
    window.Sprite_Name = Sprite_Name;
    window.Sprite_PlayerName = Sprite_PlayerName;
    window.Sprite_VehicleName = Sprite_VehicleName;
})();
