//================================================================
// RS_GhostEffect.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to apply a ghost-like visual effect to characters. <RS_GhostEffect>
 * @author biud436
 *
 * @param Uniform
 *
 * @param lifeTime
 * @parent Uniform
 * @type number
 * @desc Specifies the duration (in milliseconds) for each cycle of the ghost effect. After this time, the effect pattern will change.
 * @default 100
 * @min 1
 *
 * @param threshold
 * @parent Uniform
 * @type number
 * @desc Controls the visibility intensity of the effect. Higher values reduce the effect's intensity.
 * @default 0.7
 * @decimals 2
 * @min 0.10
 * @max 1.00
 *
 * @param xoffset
 * @parent Uniform
 * @type number
 * @desc Adjusts the horizontal distortion of the ghost effect. Lower values make it look like burning paper.
 * @default 0.07
 * @decimals 2
 *
 * @help
 *
 * This plugin requires WebGL mode to work properly.
 *
 * =======================================================
 * How to Enable or Disable Ghost Mode
 * =======================================================
 * Use the following script calls within the "Set Move Route" event command:
 *
 * To enable ghost mode:
 *   this.ghostModeOn();
 *
 * To disable ghost mode:
 *   this.ghostModeOff();
 *
 * These commands can be applied to any character, including followers.
 *
 * =======================================================
 * Plugin Commands
 * =======================================================
 * You can use these commands in event scripts to adjust the ghost effect dynamically:
 *
 * 1. Set the lifeTime of the ghost effect:
 *   GhostEffect lifetime 100
 *   - Changes the duration of the ghost effect cycle to 0.1 seconds.
 *
 * 2. Set the threshold of the ghost effect:
 *   GhostEffect threshold 0.7
 *   - Adjusts the intensity of the ghost effect. A value closer to 1.0 makes it less noticeable.
 *
 * 3. Set the xoffset of the ghost effect:
 *   GhostEffect xoffset 0.07
 *   - Controls the horizontal distortion, making the effect resemble burning paper at lower values.
 *
 * =======================================================
 * Examples
 * =======================================================
 * Make a character look like a ghost with a quick effect change:
 *   GhostEffect lifetime 50
 *
 * Reduce the intensity of the ghost effect:
 *   GhostEffect threshold 0.9
 *
 * Create a more distorted ghost effect:
 *   GhostEffect xoffset 0.1
 *
 * =======================================================
 * Technical Details
 * =======================================================
 * - WebGL Requirement: This plugin uses WebGL shaders. Ensure the game is running in WebGL mode.
 * - Performance Consideration: Using too many ghost effects may impact performance on lower-end devices.
 *
 * =======================================================
 * Version History
 * =======================================================
 * v1.0.0 (2019.01.19) - First release.
 * v1.0.1 (2023.08.12) - ES6 refactoring and tested on RPG Maker MV v1.6.2 with NW.js v0.55.0.
 *
 * =======================================================
 * Tips
 * =======================================================
 * - Combine the ghost effect with lighting or particle effects for a supernatural atmosphere.
 * - Useful for boss fights or special characters to visually distinguish them.
 *
 */
(() => {
  'use strict';

  const RS = window.RS || {};
  RS.GhostEffect = RS.GhostEffect || {};

  let parameters = $plugins.filter(i => {
    return i.description.contains('<RS_GhostEffect>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.GhostEffect.Params = RS.GhostEffect.Params || {};

  RS.GhostEffect.Params.lifeTime = parseInt(parameters.lifeTime || 100, 10);
  RS.GhostEffect.Params.threshold = parseFloat(parameters.threshold || 0.7);
  RS.GhostEffect.Params.xoffset = parseFloat(parameters.xoffset || 0.07);

  //============================================================================
  // PIXI.GhostEffect
  //============================================================================

  PIXI.GhostEffect = function () {
    const vertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',

      'uniform mat3 projectionMatrix;',

      'varying vec2 vTextureCoord;',

      'void main(void){',
      '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
      '    vTextureCoord = aTextureCoord;',
      '}',
    ].join('\n');

    const fragmentSrc = `
        
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

    PIXI.Filter.call(this, vertexSrc, fragmentSrc);

    this.uniforms.dimensions = new Float32Array(2);
    this.uniforms.u_scale = [0.5, 0.5];
    this.uniforms.u_xoffset = 0.07;

    this._effectVal = 0;

    this._time = performance.now();

    this.enabled = true;
    this.resolution = 1;
  };

  PIXI.GhostEffect.prototype = Object.create(PIXI.Filter.prototype);
  PIXI.GhostEffect.prototype.constructor = PIXI.GhostEffect;

  PIXI.GhostEffect.prototype.apply = function (
    filterManager,
    input,
    output,
    clear
  ) {
    this.uniforms.dimensions[0] = input.sourceFrame.width;
    this.uniforms.dimensions[1] = input.sourceFrame.height;

    filterManager.applyFilter(this, input, output, clear);
  };

  PIXI.GhostEffect.prototype.updateEffect = function () {
    const isInvalidUpdateEffect =
      performance.now() - this._time < RS.GhostEffect.Params.lifeTime;
    if (isInvalidUpdateEffect) return;

    this._effectVal = Math.random();

    if (this._effectVal > RS.GhostEffect.Params.threshold) {
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

  const alias_Game_CharacterBase_initMembers =
    Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    alias_Game_CharacterBase_initMembers.call(this);
    this._isGhost = false;
  };

  Game_CharacterBase.prototype.isGhost = function () {
    return this._isGhost;
  };

  Game_CharacterBase.prototype.ghostModeOn = function () {
    this._isGhost = true;
  };

  Game_CharacterBase.prototype.ghostModeOff = function () {
    this._isGhost = false;
  };

  Game_Player.prototype.ghostModeOn = function () {
    this._isGhost = true;
    this._followers.forEach(follower => {
      follower.ghostModeOn();
    });
  };

  Game_Player.prototype.ghostModeOff = function () {
    this._isGhost = false;
    this._followers.forEach(follower => {
      follower.ghostModeOff();
    });
  };

  //============================================================================
  // Sprite_Character
  //============================================================================

  const alias_Sprite_Character_initialize =
    Sprite_Character.prototype.initialize;
  Sprite_Character.prototype.initialize = function (character) {
    alias_Sprite_Character_initialize.call(this, character);
    this.createGhostEffect();
  };

  const alias_Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function () {
    alias_Sprite_Character_update.call(this);
    this.updateGhostEffect();
  };

  Sprite_Character.prototype.createGhostEffect = function () {
    const isValid = this._GhostEffect;

    if (!isValid) {
      this._GhostEffect = new PIXI.GhostEffect();
      if (!this.filters) {
        this.filters = [];
      }
      this.filters = [this._GhostEffect].concat(this.filters);
    } else {
      if (!this.filters) {
        this.filters = [];
      }
      this.filters = this.filters.filter(function (filter) {
        return filter !== isValid;
      }, this);
    }
  };

  Sprite_Character.prototype.updateGhostEffect = function () {
    if (!$gameSystem) return;
    if (!this._GhostEffect) return;
    if (!this._character) return;
    const isValid = this._character.isGhost();
    this._GhostEffect.enabled = isValid;
    if (isValid) {
      this._GhostEffect.updateEffect();
    }
  };

  const alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GhostEffect') {
      switch (args[0]) {
        case 'lifetime':
          RS.GhostEffect.Params.lifeTime = Number(args[1] || 100);
          break;
        case 'threshold':
          RS.GhostEffect.Params.threshold = parseFloat(args[1] || 0.7);
          break;
        case 'xoffset':
          RS.GhostEffect.Params.xoffset = parseFloat(args[1] || 0.07);
          break;
        default:
          break;
      }
    }
  };
})();
