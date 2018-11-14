/*:
 * @plugindesc <RS_Fog>
 * @author biud436
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
 * <fogSX:1>
 * <fogSY:1>
 * 
 * Blend type 20 means a subtract blend.
 * Once created, the fog image will not be removed until the map is changed.
 * 
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2018.11.14 (v1.0.0) - First Release.
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

        this.meta = data.meta;

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
            if(event.meta && event.meta.fogName) {
                var sprite = new TilingSprite();
                sprite.move(0, 0, Graphics.width, Graphics.height);
                sprite.bitmap = $.loadFog(event.meta.fogName);
                sprite.fog = {
                    id: $.parseInt(event.meta.fogId),
                    name: event.meta.fogName,
                    opacity: $.parseInt(event.meta.fogOpacity),
                    zoom: $.parseInt(event.meta.fogZoom),
                    blend: $.parseInt(event.meta.fogBlend),
                    sx: $.parseInt(event.meta.fogSX),
                    sy: $.parseInt(event.meta.fogSY)
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

            sprite.opacity = meta.opacity.clamp(0, 255);

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