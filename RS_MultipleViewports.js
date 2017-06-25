/*:
 * RS_MultipleViewports.js
 * @plugindesc (v1.2.1) This plugin provides the multiple viewports.
 * @author biud436
 *
 * @param Maximum viewport
 * @type number
 * @desc Sets the number of viewports to display on the screen.
 * @default 4
 *
 * @param Viewport orientation
 * @type boolean
 * @desc Sets the viewport to portrait orientation.
 * @default true
 *
 * @help
 * =============================================================================
 * Activate/Deactivate
 * =============================================================================
 *
 * This plugin command that can activate the multiple viewports.
 * If you call this plugin command, You can be using the multiple viewports.
 * - MultipleViewport Enable
 *
 * This plugin command that can disable the multiple viewports.
 * Note that any drawing object of previous viewport is not removed in memory.
 * So if you will need it, you try to call the MultipleViewport ClearImage plugin command.
 * If you call this plugin command, You can be using original stage renderer.
 * - MultipleViewport Disable
 *
 * =============================================================================
 * Shake
 * =============================================================================
 *
 * This is the plugin command you can set the power of the viewport shake.
 * 'shakePower' can set a value as the number what you want.
 * - MultipleViewport StartShake shakePower
 *
 * This is the plugin command you can set the end of the viewport shake.
 * - MultipleViewport EndShake
 *
 * =============================================================================
 * Image
 * =============================================================================
 *
 * This is the plugin command you can set an image to certain viewport.
 * ('ViewID' is number between 1 and 4)
 * - MultipleViewport Image ViewID ImageName
 *
 * This is the plugin command you can delete the image to certain viewport.
 * ('ViewID' is number between 1 and 4)
 * - MultipleViewport ClearImage ViewID
 *
 * =============================================================================
 * Video playback
 * =============================================================================
 * Note that the file type should set .webm when using a node webkit in test play
 * 'viewID' is the number between 1 and 4.
 * 'szSrc' indicates an video name from the movies directory.
 * 'loop' allows you to set with the 'true' or 'false'.
 * You can repeat the video via this value. (If you are omitted this loop value, its video will only play once.)
 *
 * This is the plugin command that can set the video to certain viewport.
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
 * =============================================================================
 * Display Position
 * =============================================================================
 * This plugin command allows you to change a display position of the viewport
 * 'viewID' is the number between 1 and 4.
 * If 'EventID' is same as -1, the viewport target will set as the game player.
 * if not, it will set as certain event.
 *
 * - MultipleViewport Target viewID EventID
 *
 * =============================================================================
 * Changle Log
 * =============================================================================
 * 2016.06.13 (v1.0.0) - First Release.
 * 2016.08.24 (v1.1.0) - Now RPG Maker MV 1.3.0 or more is supported.
 * 2016.08.24 (v1.1.2) - Added Plugin Commands
 * 2016.08.25 (v1.1.4) - Added the functions that sets an image of certain viewport.
 * 2016.09.30 (v1.1.5) - Added the function that plays an video of certain viewport.
 * 2016.10.01 (v1.1.6) - Added the rendering code that is compatible with the canvas mode.
 * 2016.10.20 (v1.1.7) - Fixed the issue that is not working in RMMV 1.3.2
 * 2016.10.23 (v1.1.8) - Fixed the issue that the video frame is not updated in PIXI 4.0.3
 * 2016.11.24 (v1.1.9) - Now this can change the viewport orientation such as portrait, landscape and can also set the number of viewports.
 * 2016.11.26 (v1.2.0) - Added certain code to remove the texture from memory.
 * 2017.02.08 (v1.2.1) :
 * - Added new function that can change the inner position of certain viewport
 * - Fixed the bug that video is played in duplicate.
 * - Fixed an issue that image is set in duplicate.
 * - Converted some sources to ES6
 */

var Imported = Imported || {};
Imported.RS_MultipleViewports = true;

var RS = RS || {};
RS.MultipleViewports = RS.MultipleViewports || {};

(function () {

  "use strict";

  let isMultipleViewport = false;
  let isShake = 0;
  let shakePower = 10;

  let isStoppingMainScene = false;

  let parameters = PluginManager.parameters('RS_MultipleViewports');

  RS.MultipleViewports.isVertical = Boolean(parameters['Viewport orientation'] === 'false');

  //============================================================================
  // Fixed bug in library that can not play the texture video in PIXI 4.0.3 version.
  //============================================================================

  if( (PIXI.VERSION >= "4.0.0" && Utils.RPGMAKER_VERSION >= "1.3.0") ) {

    let ticker = PIXI.ticker;

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

  }

  //============================================================================
  // ViewportTarget
  //============================================================================

  class ViewportTarget
  {
    constructor()
    {
      this._target = null;
      this._x = 0;
      this._y = 0;
    }
    setTarget(target)
    {
      this._target = target;
    }
    clearTarget()
    {
      this._target = undefined;
    }
    update()
    {
      if(!this._target) return;
      this._x = this._target._realX - $gamePlayer.centerX();
      this._y = this._target._realY - $gamePlayer.centerY();
      $gameMap.setDisplayPos(this._x, this._y);
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
  }

  //============================================================================
  // ViewportManager
  //============================================================================

  class ViewportManager
  {
      constructor(g)
      {
          this._graphics = g;
      }

      initMembers()
      {
        this._mtHorizontalScale = 1.0;
        this._mtVerticalScale = 1.0;
        this._renderSprite = [];
        this._viewportDisplayPos = [];
        this._frameWidth = 0;
        this._frameHeight = 0;
        this._renderTexture = [];
        this._rect = null;
        this._renderTarget = null;
        this._renderSprite = null;
        this._tempPos = new PIXI.Point(0, 0);
        this._viewImageCached = [];
        this._renderBounds = null;
        this._target = null;
        this._maxDisplayCounts = Number(parameters['Maximum viewport'] || 4);
      }

      clear()
      {
        for (var i = 0; i < this._maxDisplayCounts; i++) {
          this._viewportDisplayPos[i].clearTarget();
        }
      }

      isValid()
      {
        return (SceneManager._scene instanceof Scene_Map);
      }

      isRendererValid()
      {
        return this._graphics._renderer;
      }

      isWebGL()
      {
        return this._graphics.isWebGL();
      }

      restore()
      {
        for(var i = 0; i < this._maxDisplayCounts; i++) {
          Graphics.viewport.setDisplayPos(i + 1, $gameMap._multipleViewportTargetIds[i]);
        }
      }

      renderer() {
        return this._graphics._renderer;
      }

      createRenderTexture()
      {
        if(!this.isRendererValid()) return;

        let gl;

        if(Graphics.isWebGL()) gl = this.renderer().gl;

        this.initMembers();

        // Calculrate Screen
        if( this.isWebGL() ) {

          this._frameWidth = gl.drawingBufferWidth || 816;
          this._frameHeight = gl.drawingBufferHeight || 624;

        } else {

          this._frameWidth = this.renderer().width || 816;
          this._frameHeight = this.renderer().height || 624;

        }

        // Create RenderTexture
        for(let i = 0; i < this._maxDisplayCounts; i++) {

          this._renderTexture[i] = PIXI.RenderTexture.create(this._frameWidth,
                                                          this._frameHeight,
                                                          PIXI.SCALE_MODES.NEAREST);
        }
        // Create Rect
        this._rect = this.getRenderPosition(this._frameWidth, this._frameHeight);

        // Create RenderTarget
        if( this.isWebGL() ) {

          this._renderTarget = new PIXI.RenderTarget(gl, this._frameWidth,
                                                        this._frameHeight,
                                                        PIXI.SCALE_MODES.NEAREST);

        } else {

          this._renderTarget = new PIXI.CanvasRenderTarget(this._frameWidth,
                                                          this._frameHeight);

        }

        // Create Sprite
        this._renderSprite = new Sprite();

        // Add Child Sprite
        for(let i = 0; i < this._maxDisplayCounts; i++) {

          this._renderSprite.addChild(new Sprite());
          this._viewportDisplayPos[i] = new ViewportTarget();

        }

        this._tempPos = new ViewportTarget();
        this._viewImageCached = [];
        this._renderBounds = new Rectangle(0, 0, this._frameWidth, this._frameHeight);

      }

      getRenderPosition(width, height)
      {
        let positionType = [];
        let w, h;
        let vx, vy;
        switch (this._maxDisplayCounts) {
          case 2: case 3:
            if(RS.MultipleViewports.isVertical) {
              w = width / size;
              h = height;
              this._mtHorizontalScale = 1 / this._maxDisplayCounts;
              this._mtVerticalScale = 1.0;
            } else {
              w = width;
              h = height / size;
              this._mtHorizontalScale = 1.0;
              this._mtVerticalScale = (1 / this._maxDisplayCounts);
            }
            for(let i = vx = vy = 0; i < this._maxDisplayCounts; i++) {
              vx = (i % this._maxDisplayCounts);
              vy = (i / this._maxDisplayCounts);
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
            for(let i = vx = vy = 0; i < this._maxDisplayCounts; i++) {
              vx = (i % 2);
              vy = Math.floor(i / 2);
              positionType[i] = new Rectangle(w * vx, h * vy, w, h);
            }
            break;
        }
        return positionType;
      }

      setRenderSprite(i)
      {
        let sPower = $gameMap._multipleViewportShakePower * $gameMap._multipleViewportShakeEnabled;
        let shake = (-0.5 + Math.random()) * sPower;
        let child = this._renderSprite.getChildAt(i);

        child.x = this._rect[i].x + shake;
        child.y = this._rect[i].y + shake;

          if(this.isCheckedViewImage(i)) {

            const texture = child.texture = this._viewImageCached[i];
            child.scale.x = (Graphics.boxWidth / texture.width) * this._mtHorizontalScale;
            child.scale.y = (Graphics.boxHeight / texture.height) * this._mtVerticalScale;

          } else {

            child.texture = this._renderTexture[i];
            child.scale.x = this._mtHorizontalScale;
            child.scale.y = this._mtVerticalScale;
          }
      }

      // Image

      setViewportImage(viewID, texture)
      {
        if(this._viewImageCached[viewID - 1]) {
          this._viewImageCached[viewID - 1] = null;
        }
        this._viewImageCached.splice(viewID - 1, texture);
        this._viewImageCached[viewID - 1] = texture;
      }

      isCheckedViewImage(viewID)
      {
        const texture = this._viewImageCached[viewID];
        if(texture instanceof PIXI.Texture) {
          return !!texture.baseTexture && texture.baseTexture.hasLoaded;
        } else {
          return false;
        }
      }

      clearViewImage(viewID)
      {
        if(this._viewImageCached[viewID - 1]) {
            const texture = this._viewImageCached[viewID - 1];
            if(texture) texture.destroy({ destroyBase: true });
            delete this._viewImageCached[viewID - 1];
        }
      }

      // Video

      moveMoviesToCertainView(viewID, funcName, second)
      {
        const texture = this._viewImageCached[viewID - 1];
        if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
          let video = texture.baseTexture.source;
          switch (funcName) {
            case 'Move Back':
              if(video) video.currentTime -= second;
              break;
            case 'Move Forward':
              if(video) video.currentTime += second;
              break;
          }
        }
      }

      playMoviesToCertainView(viewID)
      {
        const texture = this._viewImageCached[viewID - 1];
        if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
          let video = texture.baseTexture.source;
          if(video) {
            video.play();
          } else {
            if(texture.baseTexture._onCanPlay) texture.baseTexture._onCanPlay();
          }
        }
      }

      pauseMoviesToCertainView(viewID)
      {
        const texture = this._viewImageCached[viewID - 1];
        if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
          let video = texture.baseTexture.source;
          if(video) video.pause();
        }
      }

      stopMoviesToCertainView(viewID)
      {
        const texture = this._viewImageCached[viewID - 1];
        if(texture && texture.baseTexture instanceof PIXI.VideoBaseTexture) {
          let video = texture.baseTexture.source;
          if(video) {
            video.pause();
            video.currentTime = 0.0;
          }
        }
      }

      pauseAllMovies()
      {
        this._viewImageCached.forEach(function (i) {
          if(i.baseTexture instanceof PIXI.VideoBaseTexture) i.baseTexture.source.pause();
        });
      }

      playAllMovies()
      {
        this._viewImageCached.forEach(function (i) {
          if(i.baseTexture instanceof PIXI.VideoBaseTexture) i.baseTexture.source.play();
        })
      }

      // Display

      saveCurrentDisplayPos()
      {
        if(!$gameMap) return;
        this._tempPos.setTarget($gamePlayer);
        this._viewportDisplayPos["temp"] = this._tempPos;
      }

      setDisplayPos(viewID, targetId)
      {
        let target;
        if(targetId < 0) {
          target = $gamePlayer;
          targetId = -1;
        } else {
          let evt = $gameMap.event(targetId);
          if(evt) target = evt;
        }
        $gameMap._multipleViewportTargetIds[viewID - 1] = targetId;
        var targetPos = this._viewportDisplayPos[viewID - 1];
        if(targetPos) targetPos.setTarget(target || $gamePlayer);
      }

      lockDisplayPos(stage, i)
      {
        const targetPos = this._viewportDisplayPos[i];
        if(!targetPos) return false;
        targetPos.update();
        SceneManager._scene._spriteset.update();
      }

      unlockDisplayPos(stage)
      {
        this.lockDisplayPos(stage, "temp");
      }

      setTarget(target)
      {
        this._target = target;
      }

      disposeTarget()
      {
        this._target = null;
      }

      // Render

      render(stage)
      {
        if($gameMap._multipleViewportEnabled) {

          this.saveCurrentDisplayPos();

          for(let i = 0; i < this._maxDisplayCounts; i++) {

            // Lock
            this.lockDisplayPos(stage, i);

            // Render
            if(this.isWebGL()) this.renderer().bindRenderTexture(this._renderTexture[i]);
            this.renderer().render(stage, this._renderTexture[i]);
            if(this.isWebGL()) this.renderer().bindRenderTarget(this._renderTarget);
            this.setRenderSprite(i);

            // Unlock
            this.unlockDisplayPos(stage);

          }

          this.renderer().render(this._renderSprite);

        } else {

          this.renderer().render(stage);

        }
      }
  }

  //============================================================================
  // Graphics
  //============================================================================

  var alias_Graphics_createRenderer = Graphics._createRenderer;
  Graphics._createRenderer = function() {
    alias_Graphics_createRenderer.call(this);
    this._viewportManager = new ViewportManager(this);
    this._viewportManager.createRenderTexture();
  };

  Graphics.render = function(stage) {
    if (this._skipCount === 0) {
        var startTime = Date.now();
        if (stage) {
          if(this._viewportManager.isValid()) {
            this._viewportManager.render(stage);
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

  Object.defineProperty(Graphics, 'viewport', {
    get: function () {
      return this._viewportManager;
    },
    configurable: false
  });

  //============================================================================
  // Game_Map
  //============================================================================
  var alias_Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    alias_Game_Map_initialize.call(this);
    this._multipleViewportEnabled = false;
    this._multipleViewportShakeEnabled = 0;
    this._multipleViewportShakePower = 10;
    this._multipleViewportTargetIds = [];
  };

  var alias_Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function (mapId) {
    alias_Game_Map_setup.call(this, mapId);
  };

  Game_Map.prototype.setViewport = function (b) {
    this._multipleViewportEnabled = isMultipleViewport = b;
  };

  Game_Map.prototype.setViewportShake = function (b) {
    this._multipleViewportShakeEnabled = isShake = b;
  };

  Game_Map.prototype.setViewportShakePower = function (n) {
    this._multipleViewportShakePower = shakePower = n;
  };

  //============================================================================
  // Game_Player
  //============================================================================

  var alias_Game_Player_clearTransferInfo = Game_Player.prototype.clearTransferInfo
  Game_Player.prototype.clearTransferInfo = function() {
    alias_Game_Player_clearTransferInfo.call(this);

    // clear target and target ids when transferring
    $gameMap._multipleViewportTargetIds = [];
    Graphics.viewport.clear();

    // initializing the target as the player when transferring
    for(var i = 0; i < Graphics.viewport._maxDisplayCounts; i++) {
      Graphics.viewport.setDisplayPos(i + 1, $gamePlayer);
    }
  };

  //============================================================================
  // DataManager
  //============================================================================

  var alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function() {
      var contents = alias_DataManager_makeSaveContents.call(this);
      contents.viewportTargetIds = $gameMap._multipleViewportTargetIds;
      return contents;
  };

  var alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
    alias_DataManager_extractSaveContents.call(this, contents);
    $gameMap._multipleViewportTargetIds = contents.viewportTargetIds;
    Graphics.viewport.restore();
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
            $gameMap.setViewport(true);
            Graphics.viewport.playAllMovies();
            Graphics.viewport.setTarget($gamePlayer);
            for(var i = 0; i < Graphics.viewport._maxDisplayCounts; i++) {
              Graphics.viewport.setDisplayPos(i + 1, $gamePlayer);
            }
            break;
          case 'Disable':
            $gameMap.setViewport(false);
            Graphics.viewport.unlockDisplayPos(SceneManager._scene);
            Graphics.viewport.pauseAllMovies();
            Graphics.viewport.disposeTarget();
            break;
          case 'StartShake':
            $gameMap.setViewportShake(1);
            $gameMap.setViewportShakePower(Number(args[1] || 10));
            break;
          case 'EndShake':
            $gameMap.setViewportShake(0);
            break;
          case 'Image':
            var viewID = Number(args[1] || 1).clamp(1, 4);
            var name = args.slice(2, args.length).join(' ');
            var imageName = 'img/pictures/' + name + '.png';
            var texture = PIXI.Texture.fromImage(imageName);
            Graphics.viewport.clearViewImage(viewID);
            Graphics.viewport.setViewportImage(viewID, texture);
            break;
          case 'ClearImage':
            Graphics.viewport.clearViewImage(Number(args[1]));
            break;
          case 'Video':
            var viewID = Number(args[1] || 1).clamp(1, 4);
            var name = args[2];
            var looping = (args[3] === 'true');
            var videoName = 'movies/' + name + '.webm';
            var texture = PIXI.Texture.fromVideoUrl(videoName);
            texture.baseTexture.source.loop = looping;
            Graphics.viewport.stopMoviesToCertainView(viewID);
            Graphics.viewport.clearViewImage(viewID);
            Graphics.viewport.setViewportImage(viewID, texture);
            break;
          case 'PlayVideo':
            var viewID = Number(args[1] || 1);
            Graphics.viewport.playMoviesToCertainView(viewID);
            break;
          case 'PauseVideo':
            var viewID = Number(args[1] || 1);
            Graphics.viewport.pauseMoviesToCertainView(viewID);
            break;
          case 'MoveBackSeconds':
            var viewID = Number(args[1] || 1);
            var sec = parseInt(args[2] || 0);
            Graphics.viewport.moveMoviesToCertainView(viewID, 'Move Back', sec);
            break;
          case 'MoveForwardSeconds':
            var viewID = Number(args[1] || 1);
            var sec = parseInt(args[2] || 0);
            Graphics.viewport.moveMoviesToCertainView(viewID, 'Move Forward', sec);
            break;
          case 'StopVideo':
            var viewID = Number(args[1] || 1);
            Graphics.viewport.stopMoviesToCertainView(viewID);
            break;
          case 'ClearVideo':
            var viewID = Number(args[1] || 1);
            Graphics.viewport.stopMoviesToCertainView(viewID);
            Graphics.viewport.clearViewImage(viewID);
            break;
          case 'Target':
            var viewID = Number(args[1] || 1).clamp(1, 4);
            var eventId = parseInt(args[2] || 0);
            Graphics.viewport.setDisplayPos(viewID, eventId);
            break;
        }
      }
  };

})();
