/*:
 * @plugindesc <RS_Fog>
 * @author biud436
 * 
 * @param fog
 * @type struct<Fog>[]
 * @desc
 * @default
 * 
 * @help
 * ============================================================================
 * Note Tags
 * ============================================================================
 * 
 * To use fog like RPG Maker XP, 
 * Make sure that sets up the note tags in event editor, as follows.
 * 
 * <fogId:1>
 * <fogName:001-Fog01>
 * <fogOpacity:64>
 * <fogZoom:100>
 * <fogBlend:20>
 * <fogSX:1> - if the positive value is, it will move to left.
 * <fogSY:1> - if the positive value is, it will move to up.
 * <fogSwitchId:1>
 * <fogVariableId:1>
 * 
 * all images must be placed in img/fogs folder.
 * 
 * Blend type 20 means a subtract blend.
 * Once created, the fog image will not be removed until the map is changed.
 * 
 * if switch #1 is ON, the fog will show up on the screen.
 * 
 * ============================================================================
 * Note Tags (Short)
 * ============================================================================
 * 
 * <MAP FOG : id>
 * 
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2018.11.14 (v1.0.0) - First Release.
 * 2018.11.16 (v1.0.1) - Added the opacity mode.
 */
/*~struct~Fog:
 *
 * @param fogId
 * @text Id
 * @type number
 * @desc Specify the id.
 * @default 1
 * 
 * @param fogName
 * @text Name
 * @desc Specify the filename.
 * @default 001-Fog01
 * @require 1
 * @dir img/fogs/
 * @type file
 * 
 * @param fogOpacity
 * @text Opacity
 * @type number
 * @desc Specify the opacity is the value between 0 and 255
 * @default 64
 * @min 0
 * @max 255
 * 
 * @param fogZoom
 * @text Zoom
 * @type number
 * @desc Specify the zoom percent value is the value between 0 and 100
 * @default 100
 * @min 0
 * @max 400
 * 
 * @param fogBlend
 * @text Blend Type
 * @type select
 * @desc Set up the blend type.
 * @default 20
 * @option NORMAL
 * @value 0
 * @option ADD
 * @value 1
 * @option MULTIPLY
 * @value 2
 * @option SCREEN
 * @value 3
 * @option OVERLAY
 * @value 4
 * @option DARKEN
 * @value 5
 * @option LIGHTEN
 * @value 6
 * @option COLOR_DODGE
 * @value 7
 * @option COLOR_BURN
 * @value 8
 * @option HARD_LIGHT
 * @value 9
 * @option SOFT_LIGHT
 * @value 10
 * @option DIFFERENCE
 * @value 11
 * @option EXCLUSION
 * @value 12
 * @option HUE
 * @value 13
 * @option SATURATION
 * @value 14
 * @option COLOR
 * @value 15
 * @option LUMINOSITY
 * @value 16
 * @option NORMAL_NPM
 * @value 17
 * @option ADD_NPM
 * @value 18
 * @option SCREEN_NPM
 * @value 19
 * @option SUBTRACT
 * @value 20
 * 
 * @param fogSX
 * @text SX
 * @type number
 * @desc Set up the X axis velocity.
 * if the positive value is, it will move to left.
 * @default 1
 * 
 * @param fogSY
 * @text SY
 * @type number
 * @desc Set up the Y axis velocity.
 * if the positive value is, it will move to up.
 * @default 0
 * 
 * @param fogSwitchId
 * @text Switch
 * @type switch
 * @desc We must turn on the switch to active the fog. Specify the switch id.
 * @default 1
 * 
 * @param fogVariableId
 * @text Variable
 * @type variable
 * @desc Specify the variableId
 * @default 1
 * 
 */
/*:ko
 * @plugindesc 포그 플러그인 <RS_Fog>
 * @author biud436
 * 
 * @param fog
 * @text 포그 설정
 * @type struct<Fog>[]
 * @desc 미리 설정한 포그 값을 불러올 수 있습니다.
 * @default
 * 
 * @help
 * ============================================================================
 * 노트 태그 / Note Tags
 * ============================================================================
 * 
 * RPG Maker XP의 포그 그래픽을 그대로 사용할 수 있습니다.
 * 이벤트 편집기에서 다음 노트 태그를 차례로 설정하세요.
 * 
 * 노트 태그는 병렬 이벤트가 아니더라도 읽어냅니다.
 * 
 * <fogId:1>
 * <fogName:001-Fog01>
 * <fogOpacity:64>
 * <fogZoom:100> - 100%를 뜻합니다.
 * <fogBlend:20>
 * <fogSX:1> - 주의 : 양수 값이면 위쪽으로 이동합니다. 
 * <fogSY:1> - 주의 : 양수 값이면 왼쪽으로 이동합니다.
 * <fogSwitchId:1>
 * <fogVariableId:1>
 * 
 * 모든 이미지는 img/fogs 폴더에 위치해야 합니다.
 * 
 * 블렌드 타입 20은 감산 타입이며, 
 * 포그는 한 번 생성되면 맵에서 사라지지 않습니다.
 * 
 * 포그 그래픽은 맵 로딩 초반에 무조건 로드됩니다.
 * 
 * 위 노트 태그 예제에서는 1번 스위치를 ON해야 포그가 표시됩니다.
 * 1번 스위치를 OFF하면 포그가 렌더링되지 않습니다.
 * 
 * 간단 노트 태그를 사용하지 않더라도, 
 * 배포 시 기본 포그 설정을 해주셔야 미사용 이미지/오디오 파일로 인식하지 않습니다.
 * 
 * 포그 ID 값은 화면에 보이는 순위를 정하는 Z 값처럼 취급됩니다.
 * 
 * ============================================================================
 * 간단 노트 태그 / Note Tags (Short)
 * ============================================================================
 * 미리 포그 값을 플러그인 매개변수로 설정을 해놨다면 다음 노트 태그를 활용하여 
 * 간단하게 포그를 활성화할 수 있습니다.
 * 
 * <MAP FOG : 1>
 * 
 * 단, 해당 포그와 연계된 활성화 스위치 값을 ON 상태로 바꿔야 화면에 나오게 됩니다.
 * 
 * ============================================================================
 * 버전 로그 / Change Log
 * ============================================================================
 * 2018.11.14 (v1.0.0) - First Release.
 * 2018.11.16 (v1.0.1) - Added the opacity mode.
 */
/*~struct~Fog:ko
 *
 * @param fogId
 * @text 포그 아이디
 * @type number
 * @desc 
 * @default 1
 * 
 * @param fogName
 * @text 포그 명
 * @desc 
 * @default 001-Fog01
 * @require 1
 * @dir img/fogs/
 * @type file
 * 
 * @param fogOpacity
 * @text 포그 투명도
 * @type number
 * @desc 
 * @default 64
 * @min 0
 * @max 255
 * 
 * @param fogZoom
 * @text 포그 확대 축소율
 * @type number
 * @desc 100%가 기본 값입니다.
 * @default 100
 * @min 0
 * @max 400
 * 
 * @param fogBlend
 * @text 블렌드 타입
 * @type select
 * @desc 포그 스프라이트의 블렌드 모드를 설정하는 기능입니다.
 * @default 20
 * @option 일반
 * @value 0
 * @option ADD
 * @value 1
 * @option MULTIPLY
 * @value 2
 * @option 스크린
 * @value 3
 * @option 오버레이
 * @value 4
 * @option DARKEN
 * @value 5
 * @option LIGHTEN
 * @value 6
 * @option COLOR_DODGE
 * @value 7
 * @option COLOR_BURN
 * @value 8
 * @option HARD_LIGHT
 * @value 9
 * @option SOFT_LIGHT
 * @value 10
 * @option DIFFERENCE
 * @value 11
 * @option EXCLUSION
 * @value 12
 * @option HUE
 * @value 13
 * @option SATURATION
 * @value 14
 * @option COLOR
 * @value 15
 * @option LUMINOSITY
 * @value 16
 * @option NORMAL_NPM
 * @value 17
 * @option ADD_NPM
 * @value 18
 * @option SCREEN_NPM
 * @value 19
 * @option 감산
 * @value 20
 * 
 * @param fogSX
 * @text 포그 X축 속도
 * @type number
 * @desc 양수일 경우 왼쪽 방향이고, 음수일 경우 오른쪽 방향입니다.
 * @default 1
 * 
 * @param fogSY
 * @text 포그 Y축 속도
 * @type number
 * @desc 양수일 경우 위쪽이고, 음수일 경우 아래쪽입니다.
 * @default 1
 * 
 * @param fogSwitchId
 * @text 포그 활성 스위치
 * @type switch
 * @desc 포그를 활성화 하려면 특정 스위치를 켜야 합니다. 스위치 ID 값을 지정하세요.
 * @default 1
 * 
 * @param fogVariableId
 * @text 포그 제어 변수
 * @type variable
 * @desc Specify the variable that contorls the opacity
 * @default 1
 * 
 */

var Imported = Imported || {};
Imported.RS_Fog = true;

var RS = RS || {};
RS.Fog = RS.Fog || {};

function Scene_LoadFog() {
    this.initialize.apply(this, arguments);
}

(function($) {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_Fog>');
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;  

    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
          try { return $.jsonParse(v); } catch (e) { return v; }
        });
        return retData;
    };

    $.Params = $.Params || {};

    $.Params.fogs = [null].concat($.jsonParse(parameters["fog"]));

    //============================================================================
    // RS.Fog
    //============================================================================       

    $.parseInt = function(value) {
        return parseInt(value) || 0;
    };

    $.fogBlendModes = {
        "NORMAL":         0,
        "ADD":            1,
        "MULTIPLY":       2,
        "SCREEN":         3,
        "OVERLAY":        4,
        "DARKEN":         5,
        "LIGHTEN":        6,
        "COLOR_DODGE":    7,
        "COLOR_BURN":     8,
        "HARD_LIGHT":     9,
        "SOFT_LIGHT":     10,
        "DIFFERENCE":     11,
        "EXCLUSION":      12,
        "HUE":            13,
        "SATURATION":     14,
        "COLOR":          15,
        "LUMINOSITY":     16,
        "NORMAL_NPM":     17,
        "ADD_NPM":        18,
        "SCREEN_NPM":     19,
        "SUBTRACT":   20        
    };

    $.loadFog = function(filename, hue) {
        return ImageManager.loadBitmap('img/fogs/', filename, hue, true);
    };

    //============================================================================
    // Game_Temp
    //============================================================================          

    var _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._preloadFog = [];
    };

    Game_Temp.prototype.addFog = function(src) {
        this._preloadFog.push(src);
    };

    //============================================================================
    // Game_Event
    //============================================================================      

    Game_Event.prototype.readComments = function() {

        var data = {note: "", meta: {}}; 

        if(this.findProperPageIndex() === -1) {
            return;
        };

        var list = this.list();

        list.forEach(function(param) {
            if([108, 408].contains(param.code)) {
                data.note += param.parameters[0] + "\r\n";
            }
        }, this);

        // 노트 태그를 추출합니다 (DataManager.extractMetadata의 변형입니다)
        var re = /<([^<>:]+)(:?)([^>]*)>/g;

        data.meta = {};

        for (;;) {
            var match = re.exec(data.note);
            if (match) {
                if (match[2] === ':') {
                    data.meta[match[1].trim()] = match[3];
                } else {
                    data.meta[match[1].trim()] = true;
                }
            } else {
                break;
            }
        }

        re = /<(?:MAP FOG)[ ]*:[ ]*(\d+)>/mgi;

        for(;;) {
            var match = re.exec(data.note);
            if (match) {
                data.meta["mapFogId"] = parseInt(match[1]);
            } else {
                break;
            }
        }

        this.meta = data.meta;

        if(this.meta["mapFogId"]) {
            var _tempId = this.meta["mapFogId"];
            var mapFogData = $.Params.fogs[_tempId];
            this.meta = mapFogData;
        } 

        var fogName = this.meta["fogName"];
        var fogId = this.meta["fogId"];        

        if(!this._initFog && fogName && fogId) {            
            $gameTemp.addFog(fogName);

            this._initFog = parseInt(this.meta.fogId);
        }

    };      

    var _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_Event_initialize.call(this, mapId, eventId);
        this._initFog = false;
        this.readComments();
    };

    var _Game_Event_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        _Game_Event_refresh.call(this);
        this.readComments();
    };    

    //============================================================================
    // Game_Map
    //============================================================================      

    var _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.call(this);
        this._fogX = [];
        this._fogY = [];
        this._fogSX = [];
        this._fogSY = [];
    };

    var _Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
    Game_Map.prototype.setDisplayPos = function(x, y) {
        _Game_Map_setDisplayPos.call(this, x, y);
        for(var i = 0; i < this._fogX.length; i++) {
            this._fogX[i] = this._parallaxX;
        };
        for(var i = 0; i < this._fogY.length; i++) {
            this._fogY[i] = this._parallaxY;
        };
    };

    var _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
    Game_Map.prototype.scrollDown = function(distance) {
        var lastY = this._displayY;        
        _Game_Map_scrollDown.call(this, distance);
        if (this.isLoopVertical()) {
            for(var i = 0; i < this._fogY.length; i++) {
                this._fogY[i] += distance;
            };                 
        } else if(this.height() >= this.screenTileY()) {
            for(var i = 0; i < this._fogY.length; i++) {
                this._fogY[i] += this._displayY - lastY;
            };                        
        }
    };

    var _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
    Game_Map.prototype.scrollLeft = function(distance) {
        var lastX = this._displayX;        
        _Game_Map_scrollLeft.call(this, distance);
        if (this.isLoopHorizontal()) {
            for(var i = 0; i < this._fogX.length; i++) {
                this._fogX[i] -= distance;
            };                    
        } else if(this.width() >= this.screenTileX()) {
            for(var i = 0; i < this._fogX.length; i++) {
                this._fogX[i] += this._displayX - lastX;
            };
        }        
    };    

    var _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
    Game_Map.prototype.scrollRight = function(distance) {
        var lastX = this._displayX;                
        _Game_Map_scrollRight.call(this, distance);
        if (this.isLoopHorizontal()) {
            for(var i = 0; i < this._fogX.length; i++) {
                this._fogX[i] += distance;
            };                        
        } else if(this.width() >= this.screenTileX()) {
            for(var i = 0; i < this._fogX.length; i++) {
                this._fogX[i] += this._displayX - lastX;
            };                
        }               
    };        

    var _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
    Game_Map.prototype.scrollUp = function(distance) {
        var lastY = this._displayY;              
        _Game_Map_scrollUp.call(this, distance);
        if (this.isLoopVertical()) {
            for(var i = 0; i < this._fogY.length; i++) {
                this._fogY[i] -= distance;
            };                                  
        } else if(this.height() >= this.screenTileY()) {
            for(var i = 0; i < this._fogY.length; i++) {
                this._fogY[i] += this._displayY - lastY;
            };                            
        }        
    };       
    
    Game_Map.prototype.addFog = function(id, sx, sy) {
        this._fogX[id] = 0;
        this._fogY[id] = 0;
        this._fogSX[id] = sx;
        this._fogSY[id] = sy;
    };

    Game_Map.prototype.removeFog = function(id) {
        delete this._fogX[id];
        delete this._fogY[id];
        delete this._fogSX[id];
        delete this._fogSY[id];        
    };    

    var _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.call(this, sceneActive);
        this.updateFogPosition();
    };

    Game_Map.prototype.fogX = function(id) {
        return this._fogX[id] * this.tileWidth() / 2;
    };

    Game_Map.prototype.fogY = function(id) {
        return this._fogY[id] * this.tileHeight() / 2;
    };    
    
    Game_Map.prototype.updateFogPosition = function() {
        
        for(var i = 0; i < this._fogX.length; i++) {
            this._fogX[i] += this._fogSX[i] / this.tileWidth() / 2;
            this._fogY[i] += this._fogSY[i] / this.tileHeight() / 2;
        }  

    };    

    //============================================================================
    // Spriteset_Map
    //============================================================================      

    Spriteset_Map.prototype.addSubtractBlendMode = function() {
        if(Graphics.isWebGL()) {
            var gl = Graphics._renderer.gl;
            Graphics._renderer.state.blendModes[20] = [gl.ZERO, gl.ONE_MINUS_SRC_COLOR];
        }
    };

    Spriteset_Map.prototype.createFog = function() {

        this._fogContainer = new Sprite();
        this.addChild(this._fogContainer);    

        /**
         * <fogId : 1>
         * <fogName : myFog>
         * <fogOpacity : 255>
         * <fogZoom : 100>
         * <fogBlend : 0>
         * <fogSX : 2>
         * <fogSY : 0>
         */
        $gameMap.events().forEach(function(event) {
            if(event.meta && (event.meta.fogName || event.meta.mapFogId)) {
                var sprite = new TilingSprite();
                sprite.move(0, 0, Graphics.width, Graphics.height);
                sprite.bitmap = $.loadFog(event.meta.fogName);
                sprite.visible = false;

                var meta = event.meta;

                if(event.meta.mapFogId) {
                    var data = $.Params.fogs[event.meta.mapFogId];
                    meta = data;
                }

                sprite.fog = {
                    id: $.parseInt(meta.fogId),
                    name: meta.fogName,
                    opacity: $.parseInt(meta.fogOpacity),
                    zoom: $.parseInt(meta.fogZoom),
                    blend: $.parseInt(meta.fogBlend),
                    sx: $.parseInt(meta.fogSX),
                    sy: $.parseInt(meta.fogSY),
                    switcheId: $.parseInt(meta.fogSwitchId),
                    variableId: $.parseInt(meta.fogVariableId)
                };

                this._fogContainer.addChild(sprite);
                $gameMap.addFog(sprite.fog.id, sprite.fog.sx, sprite.fog.sy);                
            }
        }, this);

        this.on('removed', this.removeFog, this);

    };

    Spriteset_Map.prototype.removeFog = function() {
        if(!this._fogContainer) return;
        this._fogContainer.children.forEach(function(sprite) {
            var meta = sprite.fog;
            $gameMap.removeFog(meta.id);
        });
    };

    Spriteset_Map.prototype.updateFog = function() {
        if(!this._fogContainer) return;
        var removeChilds = [];

        this._fogContainer.children.forEach(function(sprite, i, a) {
            
            var meta = sprite.fog;
            var mode = $gameVariables.value(meta.variableId);
            var opacity = meta.opacity.clamp(0, 255);

            if(mode === 0) {
                sprite.opacity = opacity;

            } else if(mode === 1) {

                if(sprite.opacity > 0) {
                    sprite.opacity--;
                }
                if(sprite.opacity <= 0) {
                    sprite.opacity = 0;
                    $gameSwitches.setValue(meta.switcheId, false);  
                    $gameVariables.setValue(meta.variableId, 0);
                }                

            } else if(mode === 2) {

                if(sprite._opacityDirty) {

                    if(sprite.opacity < opacity) {
                        sprite.opacity++;
                    }                

                    if(sprite.opacity >= opacity) {
                        sprite.opacity = opacity;
                        $gameVariables.setValue(meta.variableId, 0);
                        sprite._opacityDirty = false;
                    }

                } else {

                    sprite.opacity = 0;
                    $gameSwitches.setValue(meta.switcheId, true);
                    sprite._opacityDirty = true;                    

                }
            }

            sprite.visible = $gameSwitches.value(meta.switcheId);             

            if(!sprite.bitmap || sprite.bitmap.width <= 0) {
                sprite.bitmap = $.loadFog(meta.fogName);
            }

            sprite.origin.x = $gameMap.fogX(meta.id) || 0;
            sprite.origin.y = $gameMap.fogY(meta.id) || 0;

            sprite.blendMode = meta.blend;

            sprite.scale.x = meta.zoom / 100.0;
            sprite.scale.y = meta.zoom / 100.0;

        }, this);

        this._fogContainer.children.sort(function(a, b) {
            return a.fog.id - b.fog.id;
        });        

        removeChilds.forEach(function(i) {
            this._fogContainer.removeChildAt(i);
        }, this);

    };    

    var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);
        this.addSubtractBlendMode();
        this.createFog();
    };

    var _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        this.updateFog();
    };

    //============================================================================
    // Scene_Map
    //============================================================================    

    var alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        alias_Scene_Map_start.call(this);
        if($gameTemp._preloadFog && $gameTemp._preloadFog.length >= 1) {
            SceneManager.push(Scene_LoadFog);
        }
    };

    //============================================================================
    // Scene_LoadFog
    //============================================================================

    Scene_LoadFog.prototype = Object.create(Scene_Base.prototype);
    Scene_LoadFog.prototype.constructor = Scene_LoadFog;

    Scene_LoadFog.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);     
        this._images = $gameTemp._preloadFog || [];   
    };

    Scene_LoadFog.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this._images.forEach(function(src) {
            $.loadFog(src);
        }, this);
    };

    Scene_LoadFog.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_LoadFog.prototype.isReady = function() {
        if (Scene_Base.prototype.isReady.call(this)) {
            return ImageManager.isReady();
        } else {
            return false;
        }
    };

    Scene_LoadFog.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        $gameTemp._preloadFog = [];
        SceneManager.pop();
    };
    
})(RS.Fog);