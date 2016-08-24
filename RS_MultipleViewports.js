/*:
 * RS_MultipleViewports.js
 * @plugindesc (v1.1.2) This plugin provides Multiple Viewport (WebGL only)
 * @author biud436
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 * MultipleViewport Enable
 * MultipleViewport Disable
 * MultipleViewport StartShake shakePower
 * MultipleViewport EndShake
 * -----------------------------------------------------------------------------
 * Changle Log
 * -----------------------------------------------------------------------------
 * 2016.06.13 (v1.0.0) - First Release.
 * 2016.08.24 (v1.1.0) - Now RPG Maker MV 1.3.0 or more is supported.
 * 2016.08.24 (v1.1.2) - Added Plugin Commands
 */

var Imported = Imported || {};
Imported.RS_MultipleViewports = true;

(function () {

  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");
  var isWebGL = PIXI.utils.isWebGLSupported();
  var isUseCanvas = Utils.isOptionValid('canvas');
  if(isUseCanvas) {
    console.error('This plugin does not support in Canvas Mode');
    return;
  }

  var isMultipleViewport = false;
  var isShake = 0;
  var shakePower = 10;

  Graphics.getRenderPosition = function(width, height) {
    var positionType = [];
    positionType[0] = new Rectangle(0, 0, width / 2, height / 2);
    positionType[1] = new Rectangle(0, height / 2, width / 2, height / 2);
    positionType[2] = new Rectangle(width / 2, 0, width / 2, height / 2);
    positionType[3] = new Rectangle(width / 2, height / 2, width / 2, height / 2);
    return positionType;
  };

  var alias_Graphics__createRenderer = Graphics._createRenderer;
  Graphics._createRenderer = function() {
    alias_Graphics__createRenderer.call(this);
    this._createRenderTexture();
  };

  Graphics._createRenderTexture = function () {
    var sprite; var rect; var self = Graphics;
    if(!self._renderer) { return; }
    var gl = self._renderer.gl;
    self._renderSprite = [];

    // Calculrate Screen
    self._frameWidth = gl.drawingBufferWidth || 816;
    self._frameHeight = gl.drawingBufferHeight || 624;

    // Create RenderTexture
    self._renderTexture = PIXI.RenderTexture.create(self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);

    // Create Rect
    self._rect = self.getRenderPosition(self._frameWidth, self._frameHeight);

    // Create RenderTarget
    self._renderTarget = new PIXI.RenderTarget(gl, self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);
    // Create Sprite
    self._renderSprite = new Sprite();

    // Add Child Sprite
    for(var i = 0; i < 4; i++) {
      self._renderSprite.addChild(new Sprite());
    }

  }

  Graphics.setRenderSprite = function (i) {
    var sPower = shakePower * isShake;
    var shake = (-0.5 + Math.random()) * sPower;
    this._renderSprite.children[i].x = this._rect[i].x + shake;
    this._renderSprite.children[i].y = this._rect[i].y + shake;
    this._renderSprite.children[i].texture = this._renderTexture;
    this._renderSprite.children[i].scale.x = 0.5;
    this._renderSprite.children[i].scale.y = 0.5;
  };

  Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
          if(isMultipleViewport) {
            this._renderer.bindRenderTexture(this._renderTexture);
            this._renderer.render(stage, this._renderTexture);
            this._renderer.bindRenderTarget(this._renderTarget);
            for(var i = 0; i < 4; i++) this.setRenderSprite(i);
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

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "MultipleViewport") {
        switch(args[0]) {
          case 'Enable':
            isMultipleViewport = true;
            break;
          case 'Disable':
            isMultipleViewport = false;
            break;
          case 'StartShake':
            isShake = 1;
            shakePower = Number(args[1] || 10);
            break;
          case 'EndShake':
            isShake = 0;
            break;
        }
      }
  };

})();
