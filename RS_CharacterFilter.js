/*:
 * @plugindesc (v1.0.0) Character Filter
 * @author biud436
 * @help
 * =============================================================================
 * Note Tags
 * =============================================================================
 * This note tag requires YEP_BattleEngineCore.
 *
 * LIGHTNING EFFECT: target, (FRAME)
 * If the 'FRAME' is omitted, it will set the duration of the LIGHTNING EFFECT to 15 frames.
 *
 * CHARACTER SCALE: target, (SCALE)
 * If the 'SCALE' is omitted, it will set the scale of the target to 1.
 *
 * CHARACTER OFFSET : target, (offsetX), (offsetY)
 * If the 'offsetX' is omitted, it will set the offset of the target to 0.
 * If the 'offsetY' is omitted, it will set the offset of the target to 0.
 *
 * -----------------------------------------------------------------------------
 * Note Tags Example
 *
 * <finish action>
 * LIGHTNING EFFECT: targets, 30
 * </finish action>
 *
 * <finish action>
 * CHARACTER SCALE: targets, 0.5
 * </finish action>
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 *
 * This code is possible to use in Script Command or Set Movement Route.
 *
 * -----------------------------------------------------------------------------
 * Script Command, It looks like this
 * -----------------------------------------------------------------------------
 *
 * --- Apply the Mirror Image to certain character
 * var target = this.character(0);
 * target.setFilterDir(2);
 *
 * --- Apply the Flip Image to certain character
 * var target = this.character(0);
 * target.setFilterDir(1);
 *
 * --- Apply the Lightning Effect to certain character
 * var target = this.character(0);
 * target.setFilterLightning(true, 15);
 *
 * -----------------------------------------------------------------------------
 * For Set Movement Route, It looks like this.
 * -----------------------------------------------------------------------------
 *
 * --- Apply the Mirror Image to certain character
 * this.setFilterDir(2);
 *
 * --- Apply the Flip Image to certain character
 * this.setFilterDir(1);
 *
 * --- Apply the Lightning Effect to certain character
 * this.setFilterLightning(true, 15);
 *
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
    this.uniforms.dir = 0;
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
    this._filterLightningTime = 0;
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

  Game_CharacterBase.prototype.setFilterLightning = function (useShake, count) {
    this._filterLightningTime = count;
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
    if(this._filterLightningTime <= 0) {
      this._filterLightning = 0;
      this._filterLightningTime = 0;
      return 0;
    }
    this._filterLightningTime--;
    var sPower = 0.3 * this._filterLightning;
    var lightningValue = (-0.5 + Math.random()) * sPower;
    return lightningValue;
  };

  //============================================================================
  // Game_Battler
  //
  //

  var alias_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    alias_Game_Battler_initMembers.call(this);
    this._filterOffset = new Point( 0, 0 );
    this._filterScale = 1.0;
    this._filterDir = 0;
    this._filterLightning = 0;
    this._filterLightningTime = 0;
  };

  // Set

  Game_Battler.prototype.setFilterDir = function (value) {
    this._filterDir = value;
  };

  Game_Battler.prototype.setFilterOffset = function (value) {
    if(typeof(offset) === 'object' && offset instanceof Point) {
      this._filterOffset = offset;
    }
  };

  Game_Battler.prototype.setFilterScale = function (value) {
    this._filterScale = value;
  };

  Game_Battler.prototype.setFilterLightning = function (useShake, count) {
    this._filterLightningTime = count;
    this._filterLightning = (useShake) ? 1.0 : 0.0;
  };

  // Get

  Game_Battler.prototype.getFilterDir = function () {
    return this._filterDir;
  };

  Game_Battler.prototype.getFilterOffset = function () {
    return this._filterOffset;
  };

  Game_Battler.prototype.getFilterScale = function () {
    return this._filterScale;
  };

  Game_Battler.prototype.getFilterLightning = function () {
    if(this._filterLightningTime <= 0) {
      this._filterLightningTime = 0;
      return 0;
    }
    this._filterLightningTime--;
    var sPower = 0.3 * this._filterLightning;
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
    if(this.filters && this.filters.length >= 1) {
      this.filters = this.filters.concat(this._characterFilter);
    } else {
      this.filters = (useFilterFilter) ? [ this._characterFilter ] : [Sprite.voidFilter];
    }
  };

  var alias_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
  Sprite_Character.prototype.updateCharacterFrame = function() {
      if( !Graphics.isWebGL() || !$gameParty.inBattle() ) return alias_updateCharacterFrame.call(this);
      this._characterFilter.direction = this._character.getFilterDir();
      this._characterFilter.offset = this._character.getFilterOffset();
      this._characterFilter.scale = this._character.getFilterScale();
      this._characterFilter.lightning = this._character.getFilterLightning();
      alias_updateCharacterFrame.call(this);
  };

  //============================================================================
  // Sprite_Battler
  //
  //

  var alias_Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
  Sprite_Battler.prototype.initialize = function(battler) {
    alias_Sprite_Battler_initialize.call(this, battler);
    this.createBattlerFilter();
  };

  Sprite_Battler.prototype.createBattlerFilter = function () {
    if( !Graphics.isWebGL() ) return false;
    this._battlerFilter = new RS.CharacterFilter();
    this.filters = (useFilterFilter) ? [ this._battlerFilter ] : [Sprite.voidFilter];
  };

  var alias_Sprite_Battler_update = Sprite_Battler.prototype.update;
  Sprite_Battler.prototype.update = function() {
    alias_Sprite_Battler_update.call(this);
    if(this._battler && Graphics.isWebGL() && $gameParty.inBattle() ) {
      this._battlerFilter.direction = this._battler.getFilterDir();
      this._battlerFilter.offset = this._battler.getFilterOffset();
      this._battlerFilter.scale = this._battler.getFilterScale();
      this._battlerFilter.lightning = this._battler.getFilterLightning();
    }
  };

  //============================================================================
  // YEP_BattleEngineCore - Action Sequence Pack
  //
  //
  if(Imported.YEP_BattleEngineCore) {

    var alias_BE_processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function(actionName, actionArgs) {
      if(actionName === 'LIGHTNING EFFECT') {
        return this.actionActionLightningEffect(actionArgs);
      }
      if(actionName === 'CHARACTER SCALE') {
        return this.actionActionCharacterScale(actionArgs);
      }
      if(actionName === 'CHARACTER OFFSET') {
        return this.actionActionCharacterOffset(actionArgs);
      }
      return alias_BE_processActionSequence.call(this, actionName, actionArgs);
    };

    // LIGHTNING EFFECT : target, (sec)
    BattleManager.actionActionLightningEffect = function(actionArgs) {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var frame = 15;
      if (actionArgs[1]) frame = parseInt(actionArgs[1]);
      targets.forEach(function(target) {
        target.setFilterLightning(true, frame);
      }, this);
      return true;
    };

    // CHARACTER SCALE : target, (scale)
    BattleManager.actionActionCharacterScale = function(actionArgs) {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var scale = 1;
      if (actionArgs[1]) scale = parseFloat(actionArgs[1]);
      targets.forEach(function(target) {
        target.setFilterScale(scale);
      }, this);
      return true;
    };

    // CHARACTER OFFSET : target, (offsetX), (offsetY)
    BattleManager.actionActionCharacterOffset = function(actionArgs) {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var x = 0, y = 0;
      if (actionArgs[1]) x = parseFloat(actionArgs[1]);
      if (actionArgs[2]) y = parseFloat(actionArgs[2]);
      targets.forEach(function(target) {
        var offset = new Point(x, y);
        target.setFilterOffset(offset);
      }, this);
      return true;
    };

  }

})();
