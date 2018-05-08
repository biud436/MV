/*:
 * RS_WaveFilter.js
 * @plugindesc This plugin applies the wave effect to the all objects by using the Fragment Shader.
 * @date 2016.01.12
 *
 * @author biud436
 *
 * @help
 *
 * =============================================================================
 * Sprite
 * =============================================================================
 * The following properties applies the wave effect to Sprite.
 * For Information, Refer to http://biud436.tistory.com/17
 *
 *    - wave : The default value is false.
 *    - wave_amp : The default value is to 0.05
 *    - wave_length : The default value is to a maxHeight (deprecated)
 *    - wave_speed : The default value is to 0.25
 *    - wave_phase : The default value is to 360
 *
 * =============================================================================
 * Picture
 * =============================================================================
 * This plugin command would activate the wave effect to your picture:
 *
 *    PictureWave Start picture_id wave_speed wave_amp
 *      - picture_id : Specify the id of the game picture.
 *      - wave_speed : The available value is the number between 0 and 1.
 *                    (The default value is to 0.25)
 *      - wave_amp : The available value is the number between 0 and 1.
 *                   (The default value is to 0.05)
 *
 * This plugin command would deactivate the wave effect of your picture:
 *
 *    PictureWave Stop picture_id
 *      - picture_id : Specify the id of the game picture.
 *
 * =============================================================================
 * Tilemap
 * =============================================================================
 *
 * The following plugin commands applies the wave effect to Tilemap.
 * This plugin contains these six types the plugin commands.
 *
 * These plugin commands allow you to enable or disable the wave effect
 *
 *    TilemapWave Enable
 *    TilemapWave Disable
 *
 * This plugin command allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 2.
 * Default value is to 2.0. But the fragment shader does not use this value.
 *
 *    TilemapWave waveSpeed x
 *
 * This plugin command allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.02
 *
 *    TilemapWave waveFrequency x
 *
 * This plugin command allows you to set the UV speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * Default value is to 0.25
 *
 *    TilemapWave UVSpeed x
 *
 * =============================================================================
 * Event Notetags
 * =============================================================================
 *
 * Notetags :
 *
 * These note tags allow you to enable or disable the wave effect.
 *    <WAVE true>
 *    <WAVE false>
 *
 * This note tag allows you to set the amplitude of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * the default value is to 0.02
 *
 *    <WAVE_AMP x>
 *
 * This note tag allows you to set the speed of the wave effect.
 * the x is a floating-point number between 0 and 1.
 * the default value is to 0.25
 *
 *    <WAVE_SPEED x>
 *
 * =============================================================================
 * Battle Notetags
 * =============================================================================
 *
 * These note tags allow you to set the wave effect.
 * You have to put the note tags in the note area of the map properties.
 *
 *    <BATTLEBACK_WAVE : x y>
 *
 *    These values must replace by a real value such as 0.02
 *    - x : the x value is the same as a waveFrequency.
 *    - y : the y value is the same as a waveSpeed.
 *
 *    For Example :
 *    <BATTLEBACK_WAVE : 0.02 0.25>
 *
 * When using Yanfly's Action Sequence Pack 1, you can enable its filter too.
 * This function has the pointer of the Spriteset_Battle and easy to use.
 *
 *    eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
 *      - cond : Specify true or false whether the wave effect is used.
 *      - waveAmp : the default value is to 0.02
 *      - waveSpeed : the default value is to 0.25
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.14 (v1.0.0) - First Release.
 * 2016.01.16 (v1.0.1) - Added the function to remove the filter.
 * 2016.01.18 (v1.1.0) - Added the plugin command.
 * 2016.01.22 (v1.2.0) - Fixed the Save and Load bug
 * 2016.02.16 (v1.3.0) - Fixed Bug (After the player came back to Menu, you had to set the wave effect again)
 * 2016.02.26 (v1.3.1) - Fixed the default padding value of the sprite. (default value is to 512)
 * 2016.03.03 (v1.3.2) - Added new Sprite Properties (wave_amp, wave_speed, wave_length, wave_phase)
 * 2016.08.17 (v1.4.0) - Fixed the issue that is not working in RMMV 1.3.0 (This filter does not support for the time being in Tile-map)
 * 2016.08.18 (v1.5.0) - Supports a wave filter in ShaderTilemap.
 * 2016.10.20 (v1.5.1) - Fixed the issue that is not working in RMMV 1.3.2
 * 2016.11.10 (v1.5.2) - Fixed the issue that is not working in Orange Overlay plugin.
 * 2016.11.18 (v1.5.3) - Fixed an issue where the original tilemap is rendered when using Orange Overlay plugin.
 * 2016.11.26 (v1.5.4) - Added certain code to remove the texture from memory.
 * 2016.11.30 (v1.5.5) - Fixed the issue that has the black border in a filter area.
 * 2017.12.10 (v1.5.6) - Added the plugin command called 'PictureWave' (it is tested on 1.6.0 beta version)
 * 2018.04.12 (v1.5.7) - Fixed a cutting issue.
 * 2018.04.13 (v1.5.7c) - Added the event note tags that can have the wave effect directly for an event graphic.
 * 2018.04.15 (v1.5.7e) - Added a new feature that can apply the wave filter in the battle background images
 * 2018.04.25 (v1.5.7f) - Fixed the note tag error in Battle Test.
 * 2018.05.09 (v1.5.8) :
 * - Now set the variable called '_initWaveFilter' above the function named
 * 'changeWaveEffect' so that the wave filter can work in battle background.
 * =============================================================================
 * Terms of Use
 * =============================================================================
 * Free for commercial and non-commercial use
 *
 */

var Imported = Imported || {};
Imported.RS_WaveFilter = true;

var RS = RS || {};
RS.WaveConfig = RS.WaveConfig || {};

(function() {
  var isFilterPIXI4 = (PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  if(!isFilterPIXI4) {
    console.error('This version does not work on your project');
    console.error('Please download the compatible version from the following link : ');
    console.error('https://github.com/biud436/MV/raw/MV/RS_WaveFilter.js');
    return;
  }
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');
  if(isUseCanvas || !isWebGL) {
    console.error('This plugin does not support in your project');
    return;
  }
  //----------------------------------------------------------------------------
  // PIXI.WaveFilter
  //
  //

  PIXI.WaveFilter = function()
  {
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

     var fragmentSrc = [
       'precision mediump float;',

       'varying vec2 vTextureCoord;',

       // 'uniform float waveWidth;',
       'uniform float waveHeight;',
       'uniform float waveFrequency;',
       'uniform float waveTime;',
       'uniform float wavePhase;',
       'uniform float UVSpeed;',

       'uniform vec4 filterArea;',
       'uniform vec4 filterClamp;',
       'uniform vec2 origin;',

       'uniform sampler2D uSampler;',

       'void main(void) {',
       // '   float time = waveFrequency * sin( wavePhase * (waveTime - vTextureCoord.y / (waveHeight / filterArea.y)) );',
       // '   vec2 vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y);',
       '   float time = waveFrequency * sin( wavePhase * (waveTime - (vTextureCoord.y + vTextureCoord.x) / (waveHeight / filterArea.y)) );',
       '   vec2 vCoord = vec2(vTextureCoord.x + time * UVSpeed, vTextureCoord.y) - (origin / filterArea.xy);',
       '   gl_FragColor = texture2D(uSampler, clamp(vCoord, filterClamp.xy, filterClamp.zw));',
       '}'
     ].join('\n');

     PIXI.Filter.call( this, vertexSrc, fragmentSrc );

     this.padding = 0;

     this.uniforms.waveHeight = 0.5;
     this.uniforms.waveFrequency = 0.02;
     this.uniforms.waveTime = 0.0;
     this.uniforms.UVSpeed = 0.25;
     this.uniforms.origin = new PIXI.Point(0, 0);
     this.uniforms.wavePhase = 3.141592653589793 * 2;

     this.enabled = true;
     this.resolution = 1;

  };

  PIXI.WaveFilter.prototype = Object.create( PIXI.Filter.prototype );
  PIXI.WaveFilter.prototype.constructor = PIXI.WaveFilter;

  PIXI.WaveFilter.prototype.apply = function(filterManager, input, output, clear) {

    this.uniforms.waveHeight = input.sourceFrame.height / 4;

    filterManager.applyFilter(this, input, output, clear);
  };

  Object.defineProperties(PIXI.WaveFilter.prototype, {
    waveHeight: {
      get: function() {
          return this.uniforms.waveHeight;
      },
      set: function(value) {
          this.uniforms.waveHeight = value;
      }
    },
    waveSpeed: {
      get: function() {
          return this.uniforms.UVSpeed;
      },
      set: function(value) {
          this.uniforms.UVSpeed = value;
      }
    },
    waveFrequency: {
      get: function() {
          return this.uniforms.waveFrequency;
      },
      set: function(value) {
          this.uniforms.waveFrequency = value;
      }
    },
    UVSpeed: {
      get: function() {
          return this.uniforms.UVSpeed;
      },
      set: function(value) {
          this.uniforms.UVSpeed = value;
      }
    },
    waveTime: {
      get: function() {
          return this.uniforms.waveTime;
      },
      set: function(value) {
          this.uniforms.waveTime = value;
      }
    },
    wavePhase: {
      get: function() {
          return this.uniforms.wavePhase;
      },
      set: function(value) {
          this.uniforms.wavePhase = (Math.PI / 180) * Number(value);
      }
    },
    origin: {
      get: function() {
          return this.uniforms.origin;
      },
      set: function(value) {
          this.uniforms.origin = value;
      }
    }
  });

  //============================================================================
  // Sprite
  //============================================================================

  var alias_Sprite_initialize = Sprite.prototype.initialize;
  Sprite.prototype.initialize = function(bitmap) {
    alias_Sprite_initialize.call(this, bitmap);
    this._waveTime = 0;
    this._waveHeight = 0.5;
    this._waveSpeed = 0.25;
    this._waveFrequency = 0.02;
    this._wavePhase = 360;
    this._waveFilter = new PIXI.WaveFilter();
    this._wave = false;
  };

  var alias_Sprite_update = Sprite.prototype.update;
  Sprite.prototype.update = function() {
   alias_Sprite_update.call(this);
   this.waveUpdate();
  };

  Sprite.prototype.getWaveFrameTime = function() {
    this._waveTime = Date.now() % 10000 / 10000;
    return this._waveTime;
  };

  Sprite.prototype.setWaveHeight = function(n) {
    this._waveHeight = this.height;
  }

  Sprite.prototype.getWaveHeight = function() {
    return this._waveHeight;
  };

  Sprite.prototype.waveUpdate = function() {
    if(this._wave) {
      this._waveFilter.waveTime = this.getWaveFrameTime();
      this._waveFilter.waveHeight = this.getWaveHeight();
      this._waveFilter.waveSpeed = this._waveSpeed;
      this._waveFilter.waveFrequency = this._waveFrequency;
      this._waveFilter.wavePhase = this._wavePhase;
      this._waveFilter.origin.x = $gameMap.canvasToMapX(this.x);
      this._waveFilter.origin.x = $gameMap.canvasToMapY(this.y);
    }
  }

  Object.defineProperty(Sprite.prototype, 'waveSpeed', {
     get: function() {
         return this._waveSpeed;
     },
     set: function(value) {
       this._waveSpeed = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'waveFrequency', {
     get: function() {
         return this._waveFrequency;
     },
     set: function(value) {
       this._waveFrequency = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_amp', {
     get: function() {
         return this._waveFrequency;
     },
     set: function(value) {
       this._waveFrequency = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_length', {
     get: function() {
         return this._waveHeight;
     },
     set: function(value) {
       this.setWaveHeight(value);
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_speed', {
     get: function() {
         return this._waveSpeed;
     },
     set: function(value) {
       this._waveSpeed = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave_phase', {
     get: function() {
         return this._wavePhase;
     },
     set: function(value) {
       this._wavePhase = value;
     }
  });

  Object.defineProperty(Sprite.prototype, 'wave', {
     get: function() {
         return this._wave;
     },
     set: function(value) {
       this._wave = value;

       if(this._wave) {
         if(!this._waveFilter) {
           this._waveFilter = new PIXI.WaveFilter();
         }
         this.filterArea = new PIXI.Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
         this.filters = [this._waveFilter];
       } else {
         this.filters = [new PIXI.filters.VoidFilter()];
       }
     },
     configurable: true
  });

  //============================================================================
  // TilingSprite
  //============================================================================

  var alias_TilingSprite_initialize = TilingSprite.prototype.initialize;
  TilingSprite.prototype.initialize = function(bitmap) {
    alias_TilingSprite_initialize.call(this, bitmap);

    this._waveTime = 0;
    this._waveHeight = 0.5;
    this._waveSpeed = 0.25;
    this._waveFrequency = 0.02;
    this._wavePhase = 360;
    this._waveFilter = new PIXI.WaveFilter();
    this._wave = false;

  };

  var alias_TilingSprite_update = TilingSprite.prototype.update;
  TilingSprite.prototype.update = function() {
    alias_TilingSprite_update.call(this);
    this.waveUpdate();
  };

  TilingSprite.prototype.getWaveFrameTime = function() {
    this._waveTime = Date.now() % 10000 / 10000;
    return this._waveTime;
  };

  TilingSprite.prototype.setWaveHeight = function(n) {
    this._waveHeight = this.height;
  }

  TilingSprite.prototype.getWaveHeight = function() {
    return this._waveHeight;
  };

  TilingSprite.prototype.waveUpdate = function() {
    if(this._wave) {
      this._waveFilter.waveTime = this.getWaveFrameTime();
      this._waveFilter.waveHeight = this.getWaveHeight();
      this._waveFilter.waveSpeed = this._waveSpeed;
      this._waveFilter.waveFrequency = this._waveFrequency;
      this._waveFilter.wavePhase = this._wavePhase;
    }
  }

  Object.defineProperty(TilingSprite.prototype, 'waveSpeed', {
     get: function() {
         return this._waveSpeed;
     },
     set: function(value) {
       this._waveSpeed = value;
     }
  });

  Object.defineProperty(TilingSprite.prototype, 'waveFrequency', {
     get: function() {
         return this._waveFrequency;
     },
     set: function(value) {
       this._waveFrequency = value;
     }
  });

  Object.defineProperty(TilingSprite.prototype, 'wave_amp', {
     get: function() {
         return this._waveFrequency;
     },
     set: function(value) {
       this._waveFrequency = value;
     }
  });

  Object.defineProperty(TilingSprite.prototype, 'wave_length', {
     get: function() {
         return this._waveHeight;
     },
     set: function(value) {
       this.setWaveHeight(value);
     }
  });

  Object.defineProperty(TilingSprite.prototype, 'wave_speed', {
     get: function() {
         return this._waveSpeed;
     },
     set: function(value) {
       this._waveSpeed = value;
     }
  });

  Object.defineProperty(TilingSprite.prototype, 'wave_phase', {
     get: function() {
         return this._wavePhase;
     },
     set: function(value) {
       this._wavePhase = value;
     }
  });

  Object.defineProperty(TilingSprite.prototype, 'wave', {
     get: function() {
         return this._wave;
     },
     set: function(value) {
       this._wave = value;

       if(this._wave) {
         if(!this._waveFilter) {
           this._waveFilter = new PIXI.WaveFilter();
         }
         this.filterArea = new PIXI.Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
         this.filters = [this._waveFilter];
       } else {
         this.filters = [new PIXI.filters.VoidFilter()];
       }
     },
     configurable: true
  });

  //============================================================================
  // Sprite_Picture
  //============================================================================

  Sprite_Picture.prototype.updateWave = function() {
    var picture = this.picture();
    this.wave = picture.wave();
    this.wave_speed = picture.waveSpeed();
    this.wave_amp = picture.waveAmp();
  };

  var alias_Sprite_Picture_update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    alias_Sprite_Picture_update.call(this);
    if(this.visible && this.wave) {
      this.updateWave();
    }
  };

  //============================================================================
  // Spriteset_Map
  //============================================================================

  var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    alias_Spriteset_Map_createLowerLayer.call(this);
    this.overwriteWaveProperty();
  };

  Spriteset_Map.prototype.overwriteWaveProperty = function () {
    if(!this._baseSprite) return false;
    var self = this;
    Object.defineProperty(this._baseSprite, 'wave', {
      get: function () { return this._wave; },
      set: function (value) {
        this._wave = value;
        if(this._wave) {
          if(!this._waveFilter) this._waveFilter = new PIXI.WaveFilter();
          this.filters = [this._waveFilter, self._toneFilter];
        } else {
          this.filters = [self._toneFilter];
        }
      }
    });
  };

  var alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    alias_Spriteset_Map_update.call(this);
    this.updateWaveFilter();
  };

  Spriteset_Map.prototype.updateWaveFilter = function () {
   if($gameSystem && $gameSystem.getWaveEnabled) {
     this._baseSprite.wave = $gameSystem.getWaveEnabled() || false;
     this._baseSprite.wave_amp = $gameSystem.getWaveFrequency() || 0.02;
     this._baseSprite.wave_phase = $gameSystem.getWavePhase() || 360;
     this._baseSprite.wave_speed = $gameSystem.getUVSpeed() || 0.25;
   }
  };

  //============================================================================
  // Spriteset_Battle
  //============================================================================

  var alias_Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
  Spriteset_Battle.prototype.createBattleback = function() {
    alias_Spriteset_Battle_createBattleback.call(this);
    this.initWithWaveEffect();
  };

  Spriteset_Battle.prototype.initWithWaveEffect = function () {

    if(!$dataMap) return;

    var note = $dataMap.note.split(/[\r\n]+/);
    var self = this;

    note.forEach(function (mapNote) {

      if($dataMap.note.match(/<BATTLEBACK_WAVE[ ]:[ ]*(.*)[ ](.*)>/i)) {
        this._initWaveFilter = true;
        self.changeWaveEffect(true, RegExp.$1, RegExp.$2);
      }

    }, this);
  };

  Spriteset_Battle.prototype.changeWaveEffect = function (cond, fre, spd) {
    if(!this._initWaveFilter) return;
    var backs = [this._back1Sprite, this._back2Sprite];
    backs.forEach(function (back) {
      back.wave = cond;
      back.waveFrequency = parseFloat(fre) || 0.02;
      back.waveSpeed = parseFloat(spd) || 0.25;
    }, this);
  };

  //============================================================================
  // Game_Picture
  //============================================================================

  var alias_Game_Picture_initBasic = Game_Picture.prototype.initBasic;
  Game_Picture.prototype.initBasic = function() {
    alias_Game_Picture_initBasic.call(this);
    this._wave = false;
    this._waveSpeed = 0.25;
    this._waveAmp = 0.02;
  };

  Game_Picture.prototype.wave = function () {
    return this._wave;
  };

  Game_Picture.prototype.waveSpeed = function () {
    return this._waveSpeed;
  };

  Game_Picture.prototype.waveAmp = function () {
    return this._waveAmp;
  };

  Game_Picture.prototype.startWave = function(waveSpeed, waveAmp) {
    this._wave = true;
    this._waveSpeed = waveSpeed;
    this._waveAmp = waveAmp
  };

  Game_Picture.prototype.stopWave = function() {
    this._wave = false;
  };

  //============================================================================
  // Game_Screen
  //============================================================================

  Game_Screen.prototype.startWave = function(pictureId, waveSpeed, waveAmp) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture.startWave(waveSpeed, waveAmp);
    }
  };

  Game_Screen.prototype.stopWave = function(pictureId) {
    var picture = this.picture(pictureId);
    if (picture) {
        picture.stopWave();
    }
  };

  //============================================================================
  // Game_Temp
  //============================================================================

  /**
   * In Action Sequence Pack 1, you can use this function.
   * eval: $gameTemp.setBattleBackWaveEffect(cond, waveAmp, waveSpeed);
   */
  Game_Temp.prototype.setBattleBackWaveEffect = function (cond, fre, spd) {
    if(!$gameParty.inBattle()) return;
    var container = SceneManager._scene._spriteset;
    if(container) {
      container.changeWaveEffect(cond, fre, spd);
    }
  };

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
   alias_Game_System_initialize.call(this);
   this.initWaveProperty();
  };

  Game_System.prototype.initWaveProperty = function () {
   this._waveProp = {
     'wave': false,
     'waveHeight': Graphics.boxHeight,
     'waveFrequency': 0.02,
     'waveTime': 0.0,
     'UVSpeed': 0.25,
     'wavePhase': 360
   };
  };

  Game_System.prototype.setWaveProperty = function (name, value) {
   if(this._waveProp) {
     this._waveProp[name] = value;
     return this._waveProp[name];
   }
   return 0.0;
  };

  Game_System.prototype.getWaveEnabled = function () {
   return this._waveProp.wave;
  };

  Game_System.prototype.getWaveHeight = function () {
   return this._waveProp.waveHeight;
  };

  Game_System.prototype.getWaveFrequency = function () {
   return this._waveProp.waveFrequency;
  };

  Game_System.prototype.getWaveTime = function () {
   return this._waveProp.waveTime;
  };

  Game_System.prototype.getUVSpeed = function () {
   return this._waveProp.UVSpeed;
  };

  Game_System.prototype.getWavePhase = function () {
   return this._waveProp.wavePhase;
  };

  //============================================================================
  // Game_CharacterBase
  //============================================================================

  var alias_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    alias_Game_CharacterBase_initMembers.call(this);
    this._wave = false;
    this._waveFrequency = 0.02;
    this._waveSpeed = 0.25;
  };

  Game_CharacterBase.prototype.setWave = function (toggle) {
    this._wave = toggle;
  };

  Game_CharacterBase.prototype.setWaveFrequency = function (value) {
    this._waveFrequency = value;
  };

  Game_CharacterBase.prototype.setWaveSpeed = function (value) {
    this._waveSpeed = value;
  };

  Game_CharacterBase.prototype.wave = function () {
    return this._wave;
  };

  Game_CharacterBase.prototype.waveFrequency = function () {
    return this._waveFrequency;
  };

  Game_CharacterBase.prototype.waveSpeed = function () {
    return this._waveSpeed;
  };

  //============================================================================
  // Sprite_Character
  //============================================================================

  var alias_Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
  Sprite_Character.prototype.updatePosition = function() {
    alias_Sprite_Character_updatePosition.call(this);
    if(!this._character) return;
    if(!(this._character instanceof Game_Event)) return;
    this.wave = this._character.wave();
    if(this.wave) {
      this.waveFrequency = this._character.waveFrequency();
      this.waveSpeed = this._character.waveSpeed();
    }
  };

  //============================================================================
  // Game_Map
  //============================================================================

  var alias_Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    alias_Game_Event_initMembers.call(this);
    this._lastPageIndex = -2;
  };

  Game_Event.prototype.updateWaveEffect = function() {
    var self = this;
    if(this._pageIndex === this._lastPageIndex) return;
    if(self.findProperPageIndex() < 0) return false;
    if(self._trigger > 3) return false;

    self.list().forEach(function(list) {

      if(list.code === 108 || list.code === 408) {

        if( list.parameters[0].match(/<(?:WAVE)[ ](.*)>/i) ) {
            self.setWave( Boolean( RegExp.$1 == "true" ) );
        }
        if( list.parameters[0].match(/<(?:WAVE_AMP)[ ](.*)>/i) ) {
            self.setWaveFrequency( parseFloat(RegExp.$1) || 0.02 );
        }
        if( list.parameters[0].match(/<(?:WAVE_SPEED)[ ](.*)>/i) ) {
            self.setWaveSpeed( parseFloat(RegExp.$1) || 0.25 );
        }

      }
    }, this);

    this._lastPageIndex = this._pageIndex;

  };

  var alias_Game_Event_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function() {
    alias_Game_Event_refresh.call(this);
    this.updateWaveEffect();
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
     alias_Game_Interpreter_pluginCommand.call(this, command, args);
     if(command === "Tilemap_Wave" || command === "TilemapWave") {
       switch(args[0]) {
         case 'Enable':
           $gameSystem.setWaveProperty('wave', true);
           break;
         case 'Disable':
           $gameSystem.setWaveProperty('wave', false);
           break;
         case 'waveSpeed':
           $gameSystem.setWaveProperty('waveSpeed', Number(args[1]));
           break;
         case 'waveFrequency':
           $gameSystem.setWaveProperty('waveFrequency', Number(args[1]));
           break;
         case 'UVSpeed':
           $gameSystem.setWaveProperty('UVSpeed', Number(args[1]));
           break;
       }
     }
     if(command === "Picture_Wave" || command === "PictureWave") {
       switch (args[0].toLowerCase()) {
         case "start":
           $gameScreen.startWave(Number(args[1]), Number(args[2]), Number(args[3]));
           break;
         case "stop":
           $gameScreen.stopWave(Number(args[1]));
       }
     }
  };

})();
