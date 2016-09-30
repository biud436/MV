/*:
 * RS_MultipleViewports.js
 * @plugindesc (v1.1.6) This plugin provides the multiple viewports.
 * @author biud436
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * This is a plugin command that this can activate the multiple viewports.
 * If you call this plugin command, You can be using the multiple viewports.
 * - MultipleViewport Enable
 *
 * This can disable the multiple viewports.
 * If you call this plugin command, You can be using original stage renderer.
 * - MultipleViewport Disable
 *
 * This is the plugin command you can set the power of the viewport shake.
 * - MultipleViewport StartShake shakePower
 *
 * This is the plugin command you can set the end of the viewport shake.
 * - MultipleViewport EndShake
 *
 * This is the plugin command you can set an image to certain viewport.
 * (View ID is number between 1 and 4)
 * - MultipleViewport Image ViewID ImageName
 *
 * This is the plugin command you can delete the image to certain viewport.
 * (View ID is number between 1 and 4)
 * - MultipleViewport ClearImage ViewID
 *
 * This is the plugin command that can set the video to certain viewport.
 * Note that the file type should set the WEBM(.webm)
 * ViewID is the number between 1 and 4.
 * szSrc Indicates an video name from the movies directory.
 * loop allows you to set with the true or false.
 * You can repeat the video via this value. (If you are omitted this loop value, its video will only play once.)
 *
 * - MultipleViewport Video viewID szSrc loop
 *
 * This command moves back x seconds from current video position.
 * - MultipleViewport MoveBackSeconds viewID second
 *
 * This command moves forward x seconds from current video position.
 * - MultipleViewport MoveForwardSeconds viewID second
 *
 * This is the plugin command can play the video to certain viewport.
 * - MultipleViewport PlayVideo viewID
 *
 * This is the plugin command can stop the video to certain viewport.
 * - MultipleViewport StopVideo viewID
 *
 * This is the plugin command can pause the video to certain viewport.
 * - MultipleViewport PauseVideo viewID
 *
 * This is the plugin command can remove the video to certain viewport.
 * - MultipleViewport ClearVideo viewID
 *
 * -----------------------------------------------------------------------------
 * Changle Log
 * -----------------------------------------------------------------------------
 * 2016.06.13 (v1.0.0) - First Release.
 * 2016.08.24 (v1.1.0) - Now RPG Maker MV 1.3.0 or more is supported.
 * 2016.08.24 (v1.1.2) - Added Plugin Commands
 * 2016.08.25 (v1.1.4) - Added the functions that sets an image of certain viewport.
 * 2016.09.30 (v1.1.5) - Added the function that plays an video of certain viewport.
 * 2016.10.01 (v1.1.6) - Added the rendering code that is compatible with the canvas mode.
 */

var Imported = Imported || {};
Imported.RS_MultipleViewports = true;

(function () {

  var isFilterPIXI4 = (PIXI.VERSION === "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");

  var isMultipleViewport = false;
  var isShake = 0;
  var shakePower = 10;

  Graphics.getRenderPosition = function(width, height) {
    var positionType = [];
    positionType[0] = new Rectangle(0, 0, width / 2, height / 2);
    positionType[1] = new Rectangle(width / 2, 0, width / 2, height / 2);
    positionType[2] = new Rectangle(0, height / 2, width / 2, height / 2);
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
    if(this.isWebGL()) var gl = self._renderer.gl;
    self._renderSprite = [];

    // Calculrate Screen
    if(this.isWebGL()) {
      self._frameWidth = gl.drawingBufferWidth || 816;
      self._frameHeight = gl.drawingBufferHeight || 624;
    } else {
      self._frameWidth = self._renderer.width || 816;
      self._frameHeight = self._renderer.height || 624;
    }

    // Create RenderTexture
    self._renderTexture = PIXI.RenderTexture.create(self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);

    // Create Rect
    self._rect = self.getRenderPosition(self._frameWidth, self._frameHeight);

    // Create RenderTarget
    if(this.isWebGL()) {
      self._renderTarget = new PIXI.RenderTarget(gl, self._frameWidth,
                                                    self._frameHeight,
                                                    PIXI.SCALE_MODES.NEAREST);
    } else {
      self._renderTarget = new PIXI.CanvasRenderTarget(self._frameWidth, self._frameHeight);
    }

    // Create Sprite
    self._renderSprite = new Sprite();

    // Add Child Sprite
    for(var i = 0; i < 4; i++) {
      self._renderSprite.addChild(new Sprite());
    }

    self._viewImageCached = [];

    self._renderBounds = new Rectangle(0, 0, self._frameWidth, self._frameHeight);

  }

  Graphics.setRenderSprite = function (i) {
    var sPower = shakePower * isShake;
    var shake = (-0.5 + Math.random()) * sPower;
    this._renderSprite.children[i].x = this._rect[i].x + shake;
    this._renderSprite.children[i].y = this._rect[i].y + shake;
    if(Graphics.isCheckedViewImage(i)) {
      var texture = this._renderSprite.children[i].texture = this._viewImageCached[i];
      this._renderSprite.children[i].scale.x = (Graphics.boxWidth / texture.width) * 0.5;
      this._renderSprite.children[i].scale.y = (Graphics.boxHeight / texture.height) * 0.5;
    } else {
      this._renderSprite.children[i].texture = this._renderTexture;
      this._renderSprite.children[i].scale.x = 0.5;
      this._renderSprite.children[i].scale.y = 0.5;
    }
  };

  Graphics.setViewportImage = function (viewID, texture) {
    if(this._viewImageCached[viewID - 1]) {
      this._viewImageCached[viewID - 1] = null;
    }
    this._viewImageCached[viewID - 1] = texture;
  };

  Graphics.moveMoviesToCertainView = function (viewID, funcName, second) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      switch (funcName) {
        case 'Move Back':
          video.currentTime -= second;
          break;
        case 'Move Forward':
          video.currentTime += second;
          break;
      }
    }
  };

  Graphics.playMoviesToCertainView = function (viewID) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      video.play();
    }
  };

  Graphics.pauseMoviesToCertainView = function (viewID) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      video.pause();
    }
  };

  Graphics.stopMoviesToCertainView = function (viewID) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      video.pause();
      video.currentTime = 0.0;
    }
  };

  Graphics.pauseAllMovies = function () {
    this._viewImageCached.forEach(function (i) {
      if(i.baseTexture instanceof PIXI.VideoBaseTexture) i.baseTexture.source.pause();
    })
  };

  Graphics.playAllMovies = function () {
    this._viewImageCached.forEach(function (i) {
      if(i.baseTexture instanceof PIXI.VideoBaseTexture) i.baseTexture.source.play();
    })
  };

  Graphics.isCheckedViewImage = function (viewID) {
    var texture = this._viewImageCached[viewID];
    if(texture instanceof PIXI.Texture) {
      return !!texture.baseTexture && texture.baseTexture.hasLoaded;
    } else {
      return false;
    }
  };

  Graphics.clearViewImage = function (viewID) {
    if(this._viewImageCached[viewID - 1]) {
        delete this._viewImageCached[viewID - 1];
    }
  };

  Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
          if(isMultipleViewport) {
            if(this.isWebGL()) this._renderer.bindRenderTexture(this._renderTexture);
            this._renderer.render(stage, this._renderTexture);
            if(this.isWebGL()) this._renderer.bindRenderTarget(this._renderTarget);
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
            Graphics.playAllMovies();
            break;
          case 'Disable':
            isMultipleViewport = false;
            Graphics.pauseAllMovies();
            break;
          case 'StartShake':
            isShake = 1;
            shakePower = Number(args[1] || 10);
            break;
          case 'EndShake':
            isShake = 0;
            break;
          case 'Image':
            var viewID = Number(args[1] || 1);
            var name = args.slice(2, args.length).join(' ');
            var imageName = 'img/pictures/' + name + '.png';
            var texture = PIXI.Texture.fromImage(imageName);
            Graphics.setViewportImage(viewID.clamp(1, 4), texture);
            break;
          case 'ClearImage':
            Graphics.clearViewImage(Number(args[1]));
            break;
          case 'Video':
            var viewID = Number(args[1] || 1);
            var name = args[2];
            var looping = (args[3] === 'true');
            var videoName = 'movies/' + name + '.webm';
            var texture = PIXI.Texture.fromVideo(videoName);
            texture.baseTexture.source.loop = looping;
            Graphics.setViewportImage(viewID.clamp(1, 4), texture);
            break;
          case 'PlayVideo':
            var viewID = Number(args[1] || 1);
            Graphics.playMoviesToCertainView(viewID);
            break;
          case 'PauseVideo':
            var viewID = Number(args[1] || 1);
            Graphics.pauseMoviesToCertainView(viewID);
            break;
          case 'MoveBackSeconds':
            var viewID = Number(args[1] || 1);
            var sec = parseInt(args[2] || 0);
            Graphics.moveMoviesToCertainView(viewID, 'Move Back', sec);
            break;
          case 'MoveForwardSeconds':
            var viewID = Number(args[1] || 1);
            var sec = parseInt(args[2] || 0);
            Graphics.moveMoviesToCertainView(viewID, 'Move Forward', sec);
            break;
          case 'StopVideo':
            var viewID = Number(args[1] || 1);
            Graphics.stopMoviesToCertainView(viewID);
            break;
          case 'ClearVideo':
            var viewID = Number(args[1] || 1);
            Graphics.stopMoviesToCertainView(viewID);
            Graphics.clearViewImage(viewID);
            break;
        }
      }
  };

})();
