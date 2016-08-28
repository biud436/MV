/*:
 * RS_NoiseFilters.js
 * @plugindesc (v1.0.0) This plugin applies the noise filter to the tilemap.
 * @author biud436
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Command
 * -----------------------------------------------------------------------------
 * Tilemap_noise Enable a b
 * Tilemap_noise Enable 0.2 0.98
 * Tilemap_noise Disable
 * -----------------------------------------------------------------------------
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.08.28 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_NoiseFilters = true;

var RS = RS || {};
RS.NoiseFilters = RS.NoiseFilters || {};

(function () {

  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');

  if(!isFilterPIXI4) {
    console.error('This plugin is not PIXI 4.0.0 and RMMV 1.3.0 or more');
    return;
  }

  if(!isWebGL || isUseCanvas) {
    console.error('This plugin does not support in Canvas Mode');
    return;
  }

  var isNoiseFilter = false;
  var enabledNoiseFilter = false;
  var defaultNoiseValue = 0.5;

  //----------------------------------------------------------------------------
  // RS.NoiseFilters
  //
  //

  RS.NoiseFilters.enabled = null;
  RS.NoiseFilters.a = null;
  RS.NoiseFilters.b = null;
  RS.NoiseFilters.c = null;
  RS.NoiseFilters.save = function (enabled, a, b, c) {
    var self = RS.NoiseFilters;
    self.enabled = enabled;
    self.a = a || self.a;
    self.b = b || self.b;
    self.c = c || self.c;
  };
  RS.NoiseFilters.getData = function () {
    var self = RS.NoiseFilters;
    return [self.enabled, self.a, self.b, self.c];
  }

  //----------------------------------------------------------------------------
  // Math
  //
  //

  Math.lerpMotion = function (a, b) {
    var t = Date.now() % 10000 / 10000;
    var result = ((1 - t) * a) + (t * b);
    return result;
  };

  Math.quadraticMotion = function (a, b, c) {
    var d = Math.lerpMotion(a, b);
    var e = Math.lerpMotion(b, c);
    var result = Math.lerpMotion(d, e);
    return result;
  };

  //----------------------------------------------------------------------------
  // DataManager
  //
  //

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
    var contents = alias_DataManager_makeSaveContents.call(this);
    contents.noise = RS.NoiseFilters.getData();
    return contents;
  };

  var alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    alias_DataManager_extractSaveContents.call(this, contents);
    if(contents.noise) {
      RS.NoiseFilters.save(contents.noise[0], contents.noise[1],
                           contents.noise[2], contents.noise[3]);
      if(contents.noise[0]) {
        isNoiseFilter = contents.noise[0];
        Graphics.applyNoiseFilter(contents.noise[1], contents.noise[2], contents.noise[3]);
      }
    }
  };

  //----------------------------------------------------------------------------
  // Graphics
  //
  //

  var alias_Graphics__createRenderer = Graphics._createRenderer;
  Graphics._createRenderer = function() {
    alias_Graphics__createRenderer.call(this);
    this._createRenderTexture();
  };

  Graphics._createRenderTexture = function () {
    var sprite; var rect; var self = Graphics;
    if(!self._renderer) { return; }
    var gl = self._renderer.gl;

    // Calculrate Screen
    self._frameWidth = gl.drawingBufferWidth || 816;
    self._frameHeight = gl.drawingBufferHeight || 624;

    // Create RenderTexture
    self._renderTexture = PIXI.RenderTexture.create(self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);

    // Create RenderTarget
    self._renderTarget = new PIXI.RenderTarget(gl, self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);
    // Create Sprite
    self._renderSprite = new Sprite();
    self._renderSprite.filters = [new PIXI.filters.VoidFilter()];

  };

  Graphics.checkNoiseFilter = function () {
    var data = RS.NoiseFilters.getData();
    if(data && !isNoiseFilter) {
      isNoiseFilter = !!data[0];
      Graphics.applyNoiseFilter(data[1], data[2], data[3]);
    }
  }

  Graphics.applyNoiseFilter = function (a, b, c) {
    if(!this._renderTexture) return;
    if(this._noiseFilter) {
        this._noiseFilter.noise = Math.quadraticMotion(a, b, c);
    } else {
      this._noiseFilter = new PIXI.filters.NoiseFilter();
      this._noiseFilter.noise = Math.quadraticMotion(a, b, c);
      this._renderSprite.filters = [this._noiseFilter];
      enabledNoiseFilter = true;
    }
    RS.NoiseFilters.save(enabledNoiseFilter, a, b, c);
  };

  Graphics.destroyNoiseFilter = function () {
    if(!this._renderTexture) return;
    this._renderTexture.filters = [new PIXI.filters.VoidFilter()];
    this._noiseFilter = null;
    RS.NoiseFilters.save(enabledNoiseFilter);
  };

  Graphics.isSceneMapOrBattle = function (stage) {
    return (stage instanceof Scene_Map || stage instanceof Scene_Battle);
  }

  Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
          if(isNoiseFilter && this.isSceneMapOrBattle(stage)) {
            this._renderer.bindRenderTexture(this._renderTexture);
            this._renderer.render(stage, this._renderTexture);
            this._renderer.bindRenderTarget(this._renderTarget);
            this._renderSprite.texture = this._renderTexture;
            this._renderer.render(this._renderSprite);
          } else {
            this._renderer.render(stage);
          }
        }
        var endTime = Date.now();
        var elapsed = endTime - startTime;
        this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
        this._rendered = true;
    } else {
        this._skipCount--;
        this._rendered = false;
    }
    this.frameCount++;
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Tilemap_noise") {
        switch(args[0]) {
          case 'Enable':
            isNoiseFilter = true;
            Graphics.applyNoiseFilter(Number(args[1] || 0.2),
                                      Number(args[2] || 0.8),
                                      Number(args[1] || 0.2));
            break;
          case 'Disable':
            isNoiseFilter = false;
            enabledNoiseFilter = false;
            Graphics.destroyNoiseFilter();
            break;
        }
      }
  };

})();
