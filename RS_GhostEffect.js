//================================================================
// RS_GhostEffect.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to implement the character effect like as ghost. <RS_GhostEffect>
 * @author biud436
 * 
 * @param Uniform
 * 
 * @param lifeTime
 * @parent Uniform
 * @type number
 * @desc All of the effects has a lifeTime, After that time, the effect pattern will be changed.
 * @default 100
 * @min 1
 * 
 * @param threshold
 * @parent Uniform
 * @type number
 * @desc if threshold is higher, the effect can decrease.
 * @default 0.7
 * @decimals 2
 * @min 0.10
 * @max 1.00
 * 
 * @param xoffset
 * @parent Uniform
 * @type number
 * @desc When the value approaches 0.0, it would look like the paper burning.
 * @default 0.07
 * @decimals 2
 * 
 * @help
 * 
 * Note that this plugin only works in WebGL mode.
 * 
 * =======================================================
 * Scripts Call
 * =======================================================
 * In the event command called 'Set Move Route',
 * 
 * To activate ghost mode, you call the following script code:
 * this.ghostModeOn();
 * 
 * To disable ghost mode, you call the following script code:
 * this.ghostModeOff();
 * 
 * =======================================================
 * Plugin Commands
 * =======================================================
 * All of the effects has a lifeTime. 
 * After that time, the effect pattern will be changed.
 * The time unit is milliseconds, 
 * so setting it to 100 will result in 0.1 second.
 * 
 *   GhostEffect lifetime 100
 * 
 * If the threshold is close to 1, the effect may be reduced.
 * 
 *      GhostEffect threshold 0.7
 * 
 * When the value approaches 0.0, it would look like the paper burning.
 * 
 * GhostEffect xoffset 0.07
 * 
 * =======================================================
 * Version Log
 * =======================================================
 * 2019.01.19 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_GhostEffect = true;

var RS = RS || {};
RS.GhostEffect = RS.GhostEffect || {};

(function($) {
    
    "use strict";
    
    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_GhostEffect>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;
    
    RS.GhostEffect.Params = RS.GhostEffect.Params || {};

    RS.GhostEffect.Params.lifeTime = parseInt(parameters["lifeTime"] || 100);
    RS.GhostEffect.Params.threshold = parseFloat(parameters["threshold"] || 0.7);
    RS.GhostEffect.Params.xoffset = parseFloat(parameters["xoffset"] || 0.07);
    
    //============================================================================
    // PIXI.GhostEffect
    //============================================================================  
    
    PIXI.GhostEffect = function() {
        
        var vertexSrc = [
            'attribute vec2 aVertexPosition;',
            'attribute vec2 aTextureCoord;',
            
            'uniform mat3 projectionMatrix;',
            
            'varying vec2 vTextureCoord;',
            
            'void main(void){',
            '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
            '    vTextureCoord = aTextureCoord;',
            '}'
        ].join('\n');
        
        var fragmentSrc = `
        
        precision mediump float;
        
        uniform vec2 u_scale;
        
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        
        uniform vec2 dimensions;
        uniform float u_xoffset;

        uniform vec4 filterArea;
        uniform vec4 filterClamp;    
                   
        void main(void){
            
            vec4 baseColor = texture2D(uSampler, vTextureCoord);
            
            vec2 vRec = (vTextureCoord * filterArea.xy) / dimensions;
            vRec -= 0.5;
            vRec *= u_scale;
            vRec += 0.5;
            vRec.x += u_xoffset;
            
            vec4 recColor = texture2D(uSampler, vRec);
            
            gl_FragColor = baseColor * recColor;
        }
        
        `;
        
        PIXI.Filter.call( this, vertexSrc, fragmentSrc);
        
        this.uniforms.dimensions = new Float32Array(2);
        this.uniforms.u_scale = [0.5, 0.5];
        this.uniforms.u_xoffset = 0.07;

        this._effectVal = 0;
        this._time = performance.now();
        
        this.enabled = true;
        this.resolution = 1;
        
    };
    
    PIXI.GhostEffect.prototype = Object.create( PIXI.Filter.prototype );
    PIXI.GhostEffect.prototype.constructor = PIXI.GhostEffect;
    
    PIXI.GhostEffect.prototype.apply = function(filterManager, input, output, clear) {
        this.uniforms.dimensions[0] = input.sourceFrame.width;
        this.uniforms.dimensions[1] = input.sourceFrame.height;
        
        filterManager.applyFilter(this, input, output, clear);
    };
    
    PIXI.GhostEffect.prototype.updateEffect = function() {
        if(performance.now() - this._time < RS.GhostEffect.Params.lifeTime) return;
        this._effectVal = Math.random();
        
        if(this._effectVal > RS.GhostEffect.Params.threshold) {
            this._effectVal = RS.GhostEffect.Params.threshold;
        }
        this.uniforms.u_scale[0] = this._effectVal;
        this.uniforms.u_scale[1] = this._effectVal;
        this.uniforms.u_xoffset = RS.GhostEffect.Params.xoffset;

        this._time = performance.now();
    };
    
    //============================================================================
    // Game_CharacterBase
    //============================================================================  
    
    var alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        alias_Game_CharacterBase_initMembers.call(this);
        this._isGhost = false;
    };

    Game_CharacterBase.prototype.isGhost = function() {
        return this._isGhost;
    };

    Game_CharacterBase.prototype.ghostModeOn = function() {
        this._isGhost = true;
    };

    Game_CharacterBase.prototype.ghostModeOff = function() {
        this._isGhost = false;
    };    

    Game_Player.prototype.ghostModeOn = function() {
        this._isGhost = true;
        this._followers.forEach(function(follower) {
            follower.ghostModeOn();
        }, this);
    };

    Game_Player.prototype.ghostModeOff = function() {
        this._isGhost = false;
        this._followers.forEach(function(follower) {
            follower.ghostModeOff();
        }, this);
    };        
    
    //============================================================================
    // Sprite_Character
    //============================================================================    
    
    var alias_Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        alias_Sprite_Character_initialize.call(this, character);
        this.createGhostEffect();
    };
    
    var alias_Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        alias_Sprite_Character_update.call(this);
        this.updateGhostEffect();
    };
    
    Sprite_Character.prototype.createGhostEffect = function() {
        
        var isValid = this._GhostEffect;
        
        if(!isValid) {
            this._GhostEffect = new PIXI.GhostEffect();
            if(!this.filters) {
                this.filters = [];
            }
            this.filters = [this._GhostEffect].concat(this.filters);
        } else {
            if(!this.filters) {
                this.filters = [];
            }
            this.filters = this.filters.filter(function(filter) {
                return filter !== isValid;
            }, this);        
        }
    };
    
    Sprite_Character.prototype.updateGhostEffect = function() {
        if(!$gameSystem) return;
        if(!this._GhostEffect) return;
        if(!this._character) return;
        var isValid = this._character.isGhost();
        this._GhostEffect.enabled = isValid;
        if(isValid) {
            this._GhostEffect.updateEffect();
        }
    
    };

    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "GhostEffect") {
            switch(args[0]) {
            case 'lifetime':
                RS.GhostEffect.Params.lifeTime = Number(args[1] || 100);
                break;
            case 'threshold':
                RS.GhostEffect.Params.threshold = parseFloat(args[1] || 0.7);
                break;
            case 'xoffset':
                RS.GhostEffect.Params.xoffset = parseFloat(args[1] || 0.07);
                break;
            }
        }
    };    
    
})(RS.GhostEffect);