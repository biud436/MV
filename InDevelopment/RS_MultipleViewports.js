/*:
 * RS_MultipleViewports.js
 * @plugindesc (v1.1.7 Beta) This plugin provides the multiple viewports.
 * @author biud436
 *
 * @param Maximum viewport
 * @desc Sets the number of viewports to display on the screen.
 * @default 4
 *
 * @param Viewport orientation
 * @desc Sets the viewport to portrait orientation.
 * @default true
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
 * This is the plugin command can create the child scene to certain viewport.
 * - ChildScene push viewId SceneClass
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

var RS = RS || {};
RS.MultipleViewports = RS.MultipleViewports || {};

(function () {

  var isFilterPIXI4 = (PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0");

  var isMultipleViewport = false;
  var isShake = 0;
  var shakePower = 10;

  var isStoppingMainScene = false;

  var parameters = PluginManager.parameters('RS_MultipleViewports');
  var maxDisplayCounts = Number(parameters['Maximum viewport'] || 4);

  RS.MultipleViewports.isVertical = Boolean(parameters['Viewport orientation'] === 'false');

  //============================================================================
  // Fixed bug in library that can not play the texture video in PIXI 4.0.3 version.
  //============================================================================

  var ticker = PIXI.ticker;

  PIXI.VideoBaseTexture.prototype._onPlayStart = function _onPlayStart() {
      // Just in case the video has not recieved its can play even yet..
      if (!this.hasLoaded) {
          this._onCanPlay();
      }

      if (!this._isAutoUpdating && this.autoUpdate) {
          ticker.shared.add(this.update, this);
          ticker.shared.stop();
          ticker.shared.start();
          this._isAutoUpdating = true;

      }
  };

  //============================================================================
  // Multiple Viewport Stage
  //============================================================================

  // RS.ViewportStage = function () {
  //   this.initialize.apply(this, arguments);
  // }
  //
  // RS.ViewportStage.prototype = Object.create(Stage.prototype);
  // RS.ViewportStage.prototype.constructor = RS.ViewportStage;
  //
  // RS.ViewportStage.prototype.initialize = function () {
  //   Stage.prototype.initialize.call(this);
  //   this.initMembers();
  //   this.createRenderTexture();
  // };
  //
  // RS.ViewportStage.prototype.initMembers = function () {
  //   this._viewports = [];
  //   this._currentViewportId = -1;
  //   this._renderTexture = [];
  // };
  //
  // RS.ViewportStage.prototype.createRenderTexture = function () {
  //   [1,2,3,4].forEach(function (e, i) {
  //     this._renderTexture[i] = PIXI.RenderTexture.create(Graphics.boxWidth,
  //                                                        Graphics.boxHeight,
  //                                                        PIXI.SCALE_MODES.NEAREST);
  //   }, this);
  // };
  //
  // RS.ViewportStage.prototype.getRenderTexture = function (i) {
  //   var texture = this._renderTexture[i];
  //   if(texture) return texture;
  // };
  //
  // RS.ViewportStage.prototype.update = function () {
  //   this.children.forEach(function (child, viewId) {
  //     if(child.update && this._currentViewportId !== viewId) {
  //       child.update();
  //       this.renderStage(child, viewId);
  //     }
  //   }, this);
  // };
  //
  // RS.ViewportStage.prototype.renderStage = function (currentStage, viewId) {
  //   var renderer = Graphics._renderer;
  //   var renderTexture = this._renderTexture[viewId - 1];
  //   if(renderer && renderTexture) {
  //     if(Graphics.isWebGL()) renderer.bindRenderTexture(renderTexture);
  //     renderer.render(currentStage, renderTexture);
  //     // if(Graphics.isWebGL() && Graphics._renderTarget) renderer.bindRenderTarget(Graphics._renderTarget);
  //   }
  // };
  //
  // RS.ViewportStage.prototype.hasChildScene = function (i) {
  //   return !!this.children[i] && this._viewports[i];
  // };
  //
  // RS.ViewportStage.prototype.addRealScene = function (viewId, SceneClass) {
  //   var currentScene = this.children[viewId - 1];
  //   var started = false;
  //   if(currentScene) {
  //     currentScene.stop();
  //     currentScene.terminate();
  //   }
  //   if(SceneClass) {
  //     currentScene = new SceneClass();
  //     if(currentScene.create) {
  //       currentScene.create();
  //     }
  //     SceneManager.onSceneCreate();
  //     while(!started) {
  //       if(!started) {
  //         currentScene.start();
  //         SceneManager.onSceneStart();
  //         started = true;
  //       }
  //         SceneManager.onSceneLoading();
  //     }
  //     this.addChild(viewId, currentScene);
  //   }
  // };
  //
  // RS.ViewportStage.prototype.addChild = function (viewId, child) {
  //   var idx = viewId - 1;
  //   if( this._viewports.contains(viewId) ) {
  //     if(this._viewports[idx]) {
  //       this._viewports[idx] = viewId;
  //       this.addChildAt(idx, child);
  //     }
  //   } else {
  //     this._viewports[idx] = viewId;
  //     Stage.prototype.addChild.call(this, child);
  //   }
  //
  // };
  //
  // RS.ViewportStage.prototype.removeChild = function (viewId, child) {
  //   var idx = viewId - 1;
  //   if(this.childred[idx]) {
  //     // @1: if its scene has been existed and has already been started, it will be terminated.
  //     // @1: 해당 씬이 있고 이미 시작되었다면 해당 씬이 파괴됩니다.
  //     currentScene.stop();
  //     currentScene.terminate();
  //   }
  //   if( this._viewports.contains(viewId) ) {
  //     delete this._viewports[idx];
  //     this.removeChildAt(idx);
  //   }
  // };
  //
  // RS.ViewportStage.prototype.autoRemoveChild = function (child) {
  //   var idx = this.children.indexOf(child);
  //   var viewId = idx + 1;
  //   if(idx !== -1) {
  //     this.removeChild(viewId, child);
  //   }
  // };
  //
  // RS.ViewportStage.isTriggerIn = function (viewId) {
  //   if(maxDisplayCounts < 4) return false;
  //   var tx, ty, cx, cy, mscale, xscale, yscale, result, id;
  //   mscale = 1.0;
  //   tx = TouchInput.x;
  //   ty = TouchInput.y;
  //   cx = (Graphics.boxWidth / 2) * mscale;
  //   cy = (Graphics.boxHeight / 2) * mscale;
  //   xscale = Graphics.boxWidth / cx;
  //   yscale = Graphics.boxHeight / cy;
  //   result = [];
  //   id = 0;
  //   if(tx < cx && ty > cy) result.push(id++);
  //   if(tx > cx && ty < cy) result.push(id++);
  //   if(tx < cx && ty > cy) result.push(id++);
  //   if(tx > cx && ty > cy)  result.push(id);
  //   return result.contains(viewId - 1);
  // };

  //============================================================================
  // Scene_Base
  //============================================================================

//   RS.MultipleViewports.stage = new RS.ViewportStage();
//
//   var alias_Scene_Base_update = Scene_Base.prototype.update;
//   Scene_Base.prototype.update = function () {
//     alias_Scene_Base_update.call(this);
//     RS.MultipleViewports.stage.update();
//   };
// ``
//   var alias_Scene_Base_terminate = Scene_Base.prototype.terminate;
//   Scene_Base.prototype.terminate = function () {
//     alias_Scene_Base_terminate.call(this);
//     RS.MultipleViewports.stage.autoRemoveChild(this);
//   };

  //============================================================================
  // Graphics
  //============================================================================

  Graphics.getRenderPosition = function(width, height) {
    var positionType = [];
    var w, h;
    switch (maxDisplayCounts) {
      case 2: case 3:
        var size = maxDisplayCounts;
        if(RS.MultipleViewports.isVertical) {
          w = width / size;
          h = height;
          this._mtHorizontalScale = 1 / maxDisplayCounts;
          this._mtVerticalScale = 1.0;
        } else {
          w = width;
          h = height / size;
          this._mtHorizontalScale = 1.0;
          this._mtVerticalScale = (1 / maxDisplayCounts);
        }
        for(var i = vx = vy = 0; i < maxDisplayCounts; i++) {
          vx = (i % maxDisplayCounts);
          vy = (i / maxDisplayCounts);
          if(RS.MultipleViewports.isVertical) {
            positionType[i] = new Rectangle(w * vx, 0, w, h);
          } else {
            positionType[i] = new Rectangle(0, h * i, w, h);
          }
        }
        break;
      case 4: // Grid
        w = width / 2;
        h = height / 2;
        this._mtHorizontalScale = 1 / 2;
        this._mtVerticalScale = 1 / 2;
        for(var i = vx = vy = 0; i < maxDisplayCounts; i++) {
          vx = (i % 2);
          vy = Math.floor(i / 2);
          positionType[i] = new Rectangle(w * vx, h * vy, w, h);
        }
        // positionType[0] = new Rectangle(0, 0, width / 2, height / 2);
        // positionType[1] = new Rectangle(width / 2, 0, width / 2, height / 2);
        // positionType[2] = new Rectangle(0, height / 2, width / 2, height / 2);
        // positionType[3] = new Rectangle(width / 2, height / 2, width / 2, height / 2);
        break;
    }
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
    for(var i = 0; i < maxDisplayCounts; i++) {
      self._renderSprite.addChild(new Sprite());
    }

    self._viewImageCached = [];

    self._renderBounds = new Rectangle(0, 0, self._frameWidth, self._frameHeight);

  }

  Graphics.setRenderSprite = function (i) {

    var sPower = shakePower * isShake;
    var shake = (-0.5 + Math.random()) * sPower;
    var child = this._renderSprite.getChildAt(i);
    var otherStage = RS.MultipleViewports.stage;

    child.x = this._rect[i].x + shake;
    child.y = this._rect[i].y + shake;

    // if(otherStage.hasChildScene(i)) {
    //
    //   child.texture = otherStage.getRenderTexture(i);
    //   child.scale.x = this._mtHorizontalScale;
    //   child.scale.y = this._mtVerticalScale;
    //
    // } else {

      if(Graphics.isCheckedViewImage(i)) {

        var texture = child.texture = this._viewImageCached[i];
        child.scale.x = (Graphics.boxWidth / texture.width) * this._mtHorizontalScale;
        child.scale.y = (Graphics.boxHeight / texture.height) * this._mtVerticalScale;

      } else {

        child.texture = this._renderTexture;
        child.scale.x = this._mtHorizontalScale;
        child.scale.y = this._mtVerticalScale;

      }
    
    // }

  };

  Graphics.setViewportImage = function (viewID, texture) {
    if(this._viewImageCached[viewID - 1]) {
      this._viewImageCached[viewID - 1] = null;
    }
    this._viewImageCached.splice(viewID - 1, texture);
    this._viewImageCached[viewID - 1] = texture;
  };

  Graphics.moveMoviesToCertainView = function (viewID, funcName, second) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      switch (funcName) {
        case 'Move Back':
          if(video) video.currentTime -= second;
          break;
        case 'Move Forward':
          if(video) video.currentTime += second;
          break;
      }
    }
  };

  Graphics.playMoviesToCertainView = function (viewID) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      if(video) {
        video.play();
      } else {
        if(texture.baseTexture._onCanPlay) texture.baseTexture._onCanPlay();
      }
    }
  };

  Graphics.pauseMoviesToCertainView = function (viewID) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      if(video) video.pause();
    }
  };

  Graphics.stopMoviesToCertainView = function (viewID) {
    var texture = this._viewImageCached[viewID - 1];
    if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
      var video = texture.baseTexture.source;
      if(video) {
        video.pause();
        video.currentTime = 0.0;
      }
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
            for(var i = 0; i < maxDisplayCounts; i++) this.setRenderSprite(i);
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

  //============================================================================
  // Game_Interpreter
  //============================================================================

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
            var texture = PIXI.Texture.fromVideoUrl(videoName);
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
      // if(command === 'ChildScene') {
      //   var childSceneManager = RS.MultipleViewports.stage;
      //   var args0 = args[0].toLowerCase();
      //   var viewId = Number(args[1]);
      //   var scene = eval(args[2]);
      //   if(args0 === 'push') {
      //     childSceneManager.addRealScene(viewId, scene);
      //   }
      // }
  };

})();
