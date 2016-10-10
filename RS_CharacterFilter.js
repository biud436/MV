/*:
 * @plugindesc (v1.0.0) Character Filter
 * @author biud436
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.10.10 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_CharacterFilter = true;
var RS = RS || {};

(function () {

  var useFilterFilter = true;

  //============================================================================
  // RS.CharacterFilter
  //
  //

  RS.CharacterFilter = function () {

    var defaultVertexSrc = [
      'attribute vec2 aVertexPosition;',
      'attribute vec2 aTextureCoord;',

      'uniform mat3 projectionMatrix;',

      'varying vec2 vTextureCoord;',

      'void main(void)',
      '{',
          'gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);',
          'vTextureCoord = aTextureCoord;',
      '}      '
    ].join('\n');

    var fragmentSrc = [
      'uniform mediump float;',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      'uniform vec2 offset;',
      'uniform float dir;',
      'uniform mat4 scale;',

      'void main(void)',
      '{',
      '  vec2 flip = (vec4(vTextureCoord, 0.0, 0.0) * scale).xy;',
      '  vec2 other = vTextureCoord;',
      '  if(dir == 1.0) {',
      '    flip.y = 1.0 - flip.y;',
      '  } else if(dir == 2.0) {',
      '    flip.x = 1.0 - flip.x;',
      '  }',
      '  gl_FragColor = texture2D(uSampler, flip + offset);',
      '}      '
    ].join('\n');
    PIXI.Filter.call( this, defaultVertexSrc, fragmentSrc );
    this.uniforms.dir = 1;
    this.uniforms.scale = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
    this.uniforms.offset = {x: 0.0, y: 0.0};
    this.enabled = true;
  };

  RS.CharacterFilter.prototype = Object.create( PIXI.Filter.prototype );
  RS.CharacterFilter.prototype.constructor = RS.CharacterFilter;

  Object.defineProperties(RS.CharacterFilter.prototype, {
    direction: {
      get: function() {
          return this.uniforms.dir;
      },
      set: function(value) {
          this.uniforms.dir = value;
      }
    },
    offset: {
      get: function() {
          return this.uniforms.offset;
      },
      set: function(value) {
          this.uniforms.offset = value;
      }
    },
    lightning: {
      get: function() {
          return this.uniforms.scale[4];
      },
      set: function(value) {
          this.uniforms.scale[4] = value;
      }
    },
    scale: {
      get: function() {
          return this.uniforms.scale[0];
      },
      set: function(value) {
          var scale = 1 / value;
          this.uniforms.scale[0] = scale;
          this.uniforms.scale[5] = scale;
          this.uniforms.scale[10] = scale;
          this.uniforms.scale[15] = scale;
      }
    }
  });

  //============================================================================
  // Game_CharacterBase
  //
  //

  var alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    alias_Game_CharacterBase_initMembers.call(this);
    this._filterOffset = new Point( 0, 0 );
    this._filterScale = 1.0;
    this._filterDir = 0;
    this._filterLightning = 0;
  };

  // Set

  Game_CharacterBase.prototype.setFilterDir = function (value) {
    this._filterDir = value;
  };

  Game_CharacterBase.prototype.setFilterOffset = function (value) {
    if(typeof(offset) === 'object' && offset instanceof Point) {
      this._filterOffset = offset;
    }
  };

  Game_CharacterBase.prototype.setFilterScale = function (value) {
    this._filterScale = value;
  };

  Game_CharacterBase.prototype.setFilterLightning = function (useShake) {
    this._filterLightning = (useShake) ? 1.0 : 0.0;
  };

  // Get

  Game_CharacterBase.prototype.getFilterDir = function () {
    return this._filterDir;
  };

  Game_CharacterBase.prototype.getFilterOffset = function () {
    return this._filterOffset;
  };

  Game_CharacterBase.prototype.getFilterScale = function () {
    return this._filterScale;
  };

  Game_CharacterBase.prototype.getFilterLightning = function () {
    var sPower = 1.0 * this._filterLightning;
    var lightningValue = (-0.5 + Math.random()) * sPower;
    return lightningValue;
  };

  //============================================================================
  // Sprite_Character
  //
  //

  var alias_Sprite_Character_initialize = Sprite_Character.prototype.initialize;
  Sprite_Character.prototype.initialize = function(character) {
    alias_Sprite_Character_initialize.call(this, character);
    this.createCharacterFilter();
  };

  Sprite_Character.prototype.createCharacterFilter = function () {
    if( !Graphics.isWebGL() ) return false;
    this._characterFilter = new RS.CharacterFilter();
    this.filters = (useFilterFilter) ? [ this._characterFilter ] : [Sprite.voidFilter];
  };

  var alias_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
  Sprite_Character.prototype.updateCharacterFrame = function() {
      if( !Graphics.isWebGL() ) return alias_updateCharacterFrame.call(this);;
      this._characterFilter.direction = this._character.getFilterDir();
      this._characterFilter.offset = this._character.getFilterOffset();
      this._characterFilter.scale = this._character.getFilterScale();
      this._characterFilter.lightning = this._character.getFilterLightning();
      alias_updateCharacterFrame.call(this);
  };

})();
