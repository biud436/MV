//================================================================
// RS_FaceAnimation.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to show up the animation face in the messsage window <RS_FaceAnimation>
 * @author biud436
 *
 * @param Set Animation Face
 * @type struct<AnimationFace>[]
 * @desc Set the option data for animated face
 * @default ["{\"id\":\"blink\",\"x\":\"0\",\"y\":\"0\",\"width\":\"144\",\"height\":\"144\",\"cols\":\"4\",\"maxFrames\":\"3\",\"delay\":\"5.00\",\"looping\":\"true\"}"]
 *
 * @help
 * ================================================================
 * Preparing for face data
 * ================================================================
 * In this section, you'll learn how to define a custom animated face data.
 *
 * You can show up a lot of emotions such as an idle, run, sad, blink,
 * die, and so on.
 *
 * In the plugin parameter called 'Set Animation Face',
 * You need to define a new custom face data for your own purposes.
 *
 * ** id value :
 * When the message window indicates a face, it must detect whether the face
 * is an animated type, so it need to a specific value.
 * it is the ID value of the animated face.
 *
 * You can define the ID value is to string type such as idle, blink, die.
 *
 * ** x and y values :
 * Next, You need to set the x and y internal coordinates.
 * Normally, it is used by 0 in both values.
 *
 * ** width and height values :
 * The width and height values are the real frame width and height of the face image.
 * it means width and height values of the first frame in the sprite sheet.
 * Normally, They are set as 144 px in both.
 *
 * ** cols value :
 * Next, You should set the cols value in the sprite sheets.
 * For example, if there are four cols and two rows in the sprite sheet.
 * The number of frames will be 8 and then cols value is to 4.
 *
 * ** maxFrames value :
 * if you set the maxFrames in custom data, you can want to limit a max frame
 * less than originally frames.
 *
 * ** delay value :
 * The delay time is the elapsed time since the previous frame.
 * 1.0 will be around 0.016s
 * For Example, 5.0 will be around 0.08s (0.016s * 5.0 = 0.08s)
 *
 * ** looping value :
 * if you set the looping value is to true, The animated face will never stop.
 * it is played forever until the message would be terminated.
 *
 * ================================================================
 * Plugin Commands
 * ================================================================
 *
 * This plugin provides a toggle functionality for animated face.
 * if you use this plugin command, you can show up an animated face in the message window.
 *
 * ShowAnimationFace
 *
 * You wish to hide the animated face after it indicates on the screen.
 * it is returned back as a normal face if you use this plugin command.
 *
 * HideAnimationFace
 *
 * This plugin will be checked the ID value of activated face
 * and then show up it when the next message opens up.
 * So you need to set the ID of the animated face before the message window sets up.
 * it will be already set in the plugin parameter called 'Set Animation Face'
 * The ID value should be changed as your own purposes.
 *
 * SetAnimationFace Id
 *
 * For example, there is the face ID called 'blink' into it
 * and you can use like this before the message window starts up, as follows.
 *
 * ShowAnimationFace
 * SetAnimationFace blink
 *
 * Next, you need to select the face image from the event command called 'Show Message'
 * then, The animated face system makes to add all the frames for that image
 *
 * In this part, you'll learn how to change the scale, rotation, position for the animated-
 * face sprites.
 *
 * Once changed that, all of the faces are affected since changed it.
 * Note that all of the parameters need to write in lower case.
 *
 * For examples, if you want to rotate the animated-face by 60 degree,
 * You must do like this.
 * You have passed angle 60.0 in to the plugin command called 'ChangeParamAnimationFace'
 *
 * ChangeParamAnimationFace angle 60.0
 *
 * into the message window, the position of the animated-face image is basically the
 * relative coordinates to parent message window.
 * So its coordinates are (0, 0) px.
 *
 * ChangeParamAnimationFace x 0.0
 * ChangeParamAnimationFace y 0.0
 *
 * and you can also apply the padding value into it, like this.
 *
 * ChangeParamAnimationFace x 18.0
 * ChangeParamAnimationFace y 18.0
 *
 * In this part, You'll learn how to change a scale of the animated face sprite.
 *
 * To scale the animated face, you passed scale to the plugin command ChangeParamAnimationFace,
 * like this.
 *
 * ChangeParamAnimationFace scale 1.0
 *
 * The 1.0 is the default scale and 2.0 is to zoom in by double.
 *
 * ================================================================
 * Change Log
 * ================================================================
 * 2019.07.16 (v1.0.0) - First Release.
 * 2019.07.17 (v1.0.1) :
 * - Fixed the issue that shows up the incorrect frame in the sprite sheet.
 * 2023.08.12 (v1.0.2) :
 * - Fixed the issue that is not set the active state ID.
 */
/*~struct~AnimationFace:
 *
 * @param id
 * @desc Specify the ID of the animated face.
 * @default 0
 *
 * @param x
 * @type number
 * @desc Set the internal x-coordinate in the sprite sheet.
 * @default 0
 *
 * @param y
 * @type number
 * @desc Set the internal y-coordinate in the sprite sheet.
 * @default 0
 *
 * @param width
 * @type number
 * @desc Set the frame width in the sprite sheet.
 * @default 144
 *
 * @param height
 * @type number
 * @desc Set the frame height in the sprite sheet.
 * @default 144
 *
 * @param cols
 * @type number
 * @desc Set the cols value in the sprite sheets.
 * @default 4
 *
 * @param maxFrames
 * @type number
 * @desc Set the max frames. You can want to limit a max frame less than originally frames.
 * @default 3
 *
 * @param delay
 * @type number
 * @desc Once started animation, Each frame will take a delay time.
 * @default 5.00
 * @decimals 2
 *
 * @param looping
 * @type boolean
 * @desc if you set the looping value is to true, The animated face will never stop.
 * @default false
 * @on true
 * @off false
 *
 */

RS = window.RS || {};
RS.FaceAnimation = RS.FaceAnimation || {};

(function () {
  'use strict';

  let parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_FaceAnimation>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  RS.FaceAnimation.jsonParse = function (str) {
    const retData = JSON.parse(str, (k, v) => {
      try {
        return RS.FaceAnimation.jsonParse(v);
      } catch (e) {
        return v;
      }
    });

    return retData;
  };

  RS.FaceAnimation.Params = {};

  RS.FaceAnimation.Params.isAnimationFace = true;

  RS.FaceAnimation.Params.data = RS.FaceAnimation.jsonParse(
    parameters['Set Animation Face']
  );
  RS.FaceAnimation.Params.states = {};

  // ID 값 해시 테이블을 만들어 빠른 탐색을 도모한다.
  RS.FaceAnimation.Params.data.forEach(function (e) {
    RS.FaceAnimation.Params.states[e.id] = e;
  });

  // 활성화된 상태의 ID (2개 이상의 상태는 할당할 수 없는 방식)
  RS.FaceAnimation.Params.activeStateId = '';

  RS.FaceAnimation.Params.defaultState = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    cols: 1,
    startFrame: 0,
    maxFrames: 1,
    delay: 5.0,
    looping: false,
  };

  // 전역 상태
  RS.FaceAnimation.Params.globalStates = {
    x: 0,
    y: 0,
    angle: 0.0,
    scale: 1.0,
  };

  // ===============================================================
  // SpriteData
  // ===============================================================

  class SpriteData {
    constructor() {
      this._offsetX = 0.0;
      this._offsetY = 0.0;
      this._width = 4;
      this._height = 4;
      this._scale = 1.0;
      this._rotation = 0.0;
      this._frameDelay = 0.0;
      this._startFrame = 0;
      this._endFrame = 1;
      this._rect = new PIXI.Rectangle(0, 0, 4, 4);
      this._position = new PIXI.Point(0, 0);
      this._opacity = 255;
    }
  }

  // ===============================================================
  // FaceSprite
  // ===============================================================

  /**
   *
   * @class RS.FaceSprite
   * @example
   *
   * const bitmap = ImageManager.loadCharacter("011-Lancer03");
   * let sprite = new RS.FaceSprite(bitmap, 0, 0, 32, 48, 4);
   * sprite
   *  .setPosition(10, 50)
   *  .setAngle(10.0)
   *  .setScale(4.0)
   *  .setLoop(true)
   *  .setFrameDelay(0.5)
   *  .setSpriteSheets(4, 4);
   *
   * SceneManager._scene.addChild(sprite);
   *
   */

  class FaceSprite extends Sprite {
    constructor(bitmap, x, y, width, height, maxFrames, cols) {
      super();

      this._spriteData = new SpriteData();
      this._spriteData._position.x = x;
      this._spriteData._position.y = y;
      this._spriteData._width = width;
      this._spriteData._height = height;

      if (maxFrames === 0) {
        maxFrames = 1;
      }

      this._maxFrames = maxFrames;

      this.setFrames(0, this._maxFrames);
      this.setCurrentFrame(0);

      this._spriteData._frameDelay = 0.0;

      this._animationTime = 0.0;
      this._isAnimationCompleted = false;

      if (!cols) {
        cols = 1;
      }

      if (cols < 0) {
        cols = 1;
      }

      this._cols = cols;

      this.visible = false;
      this._visible = false;

      this.bitmap = bitmap;

      this._last = performance.now();

      this._isReady = true;
    }

    update() {
      super.update();

      if (!this._isReady) {
        return;
      }

      const startFrame = this._spriteData._startFrame;
      const endFrame = this._spriteData._endFrame;
      const delay = this._spriteData._frameDelay;

      const now = performance.now();

      const elapsed = (now - this._last) / 16.666666666666;

      if (endFrame - startFrame > 0) {
        this._animationTime += elapsed;

        if (this._animationTime > delay) {
          this._animationTime -= delay;
          this._currentFrame++;

          if (
            this._currentFrame < startFrame ||
            this._currentFrame > endFrame
          ) {
            if (this._isLooping) {
              this._currentFrame = startFrame;
            } else {
              this._currentFrame = endFrame;
              this._isAnimationCompleted = true;
            }
          }
          this.setRect();
        }
      }

      this.updateInternalProperties();

      this._last = now;
    }

    updateInternalProperties() {
      this.opacity = this._spriteData._opacity;
      this.visible = this._visible;

      const rect = this._spriteData._rect;
      if (rect) {
        this.setFrame(rect.x, rect.y, rect.width, rect.height);
      }

      this.x = this._spriteData._position.x;
      this.y = this._spriteData._position.y;

      const scale = this._spriteData._scale;

      if (!this.scale) {
        this.scale = new Point(scale, scale);
      } else {
        this.scale.x = scale;
        this.scale.y = scale;
      }

      const rotation = this._spriteData._rotation;

      this.rotation = rotation;
    }

    getX() {
      return this._spriteData._position.x;
    }

    getY() {
      return this._spriteData._position.y;
    }

    getWidth() {
      return this._spriteData._width;
    }

    getHeight() {
      return this._spriteData._height;
    }

    getAngle() {
      return (180.0 / Math.PI) * this._spriteData._rotation;
    }

    getRadians() {
      return this._spriteData._rotation;
    }

    getStartFrame() {
      return this._spriteData._startFrame;
    }

    getEndFrame() {
      return this._spriteData._endFrame;
    }

    getRect() {
      return this._spriteData._rect;
    }

    getAnimCompleted() {
      return this._isAnimationCompleted;
    }

    setX(x) {
      this._spriteData._position.x = x;
      return this;
    }

    setY(y) {
      this._spriteData._position.y = y;
      return this;
    }

    setScale(scale) {
      this._spriteData._scale = scale;

      return this;
    }

    setAngle(degree) {
      this._spriteData._rotation = (Math.PI / 180.0) * degree;

      return this;
    }

    setRadians(rad) {
      this._spriteData._rotation = rad;

      return this;
    }

    setVisible(visible) {
      this._visible = visible;

      return this;
    }

    setSpriteSheets(cols) {
      if (cols < 0) {
        cols = 1;
      }

      this._cols = cols;

      return this;
    }

    setOpacity(opacity) {
      if (opacity < 0) {
        opacity = 0;
      }

      if (opacity > 255) {
        opacity = 255;
      }

      this._spriteData._opacity = opacity;

      return this;
    }

    setFrameDelay(delay) {
      this._spriteData._frameDelay = delay;
      return this;
    }

    setPosition(x, y) {
      this.setX(x).setY(y);

      return this;
    }

    setFrames(startNum, endNum) {
      this._spriteData._startFrame = startNum;

      if (endNum < 0) {
        endNum = 1;
      }

      if (endNum > this._maxFrames) {
        endNum = this._maxFrames;
      }

      this._spriteData._endFrame = endNum - 1;

      return this;
    }

    setCurrentFrame(currentFrame) {
      if (currentFrame >= 0) {
        this._currentFrame = currentFrame;
        this._isAnimationCompleted = false;
        this._animationTime = 0.0;
        this.setRect();
      }

      return this;
    }

    setRect(...args) {
      const n = args.length;
      switch (n) {
        case 1:
          {
            const rect = args[0];
            this._spriteData._rect = rect;
          }
          break;
        case 4:
          {
            const { x, y, width, height } = args;
            this._spriteData._rect = new PIXI.Rectangle(x, y, width, height);
          }
          break;
        default:
          this._spriteData._rect.x =
            (this._currentFrame % this._cols) * this._spriteData._width;
          this._spriteData._rect.width = this._spriteData._width;
          this._spriteData._rect.y =
            Math.floor(this._currentFrame / this._cols) *
            this._spriteData._height;
          this._spriteData._rect.height = this._spriteData._height;
          break;
      }

      return this;
    }

    setLoop(isLooping) {
      this._isLooping = isLooping;

      return this;
    }

    setAnimComplete(isComplete) {
      this._isAnimationCompleted = isComplete;

      return this;
    }
  }

  RS.FaceSprite = FaceSprite;

  // ===============================================================
  // Window_Message
  // ===============================================================

  Window_Message.prototype.isAnimationFace = function () {
    if (this._faceSprite) return false;
    if (!RS.FaceAnimation.Params.isAnimationFace) return false;
    return true;
  };

  const alias_Window_Message_drawMessageFace =
    Window_Message.prototype.drawMessageFace;
  // eslint-disable-next-line consistent-return
  Window_Message.prototype.drawMessageFace = function () {
    if (this.isAnimationFace()) {
      const state =
        RS.FaceAnimation.Params.states[RS.FaceAnimation.Params.activeStateId];
      if (!state) {
        return alias_Window_Message_drawMessageFace.call(this);
      }

      const x = Number(state.x);
      const y = Number(state.y);
      const width = Number(state.width);
      const height = Number(state.height);
      const cols = Number(state.cols);
      const maxFrames = Number(state.maxFrames);
      const delay = Number(state.delay);
      const { looping } = state;

      this._faceSprite = new RS.FaceSprite(
        this._faceBitmap,
        x,
        y,
        width,
        height,
        maxFrames,
        cols
      );
      this._faceSprite
        .setPosition(
          RS.FaceAnimation.Params.globalStates.x,
          RS.FaceAnimation.Params.globalStates.y
        )
        .setAngle(RS.FaceAnimation.Params.globalStates.angle)
        .setScale(RS.FaceAnimation.Params.globalStates.scale)
        .setLoop(looping)
        .setFrameDelay(delay)
        .setSpriteSheets(cols)
        .setFrames(0, maxFrames)
        .setVisible(true);

      this.addChild(this._faceSprite);
      ImageManager.releaseReservation(this._imageReservationId);
    } else {
      alias_Window_Message_drawMessageFace.call(this);
    }
  };

  const alias_Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function () {
    alias_Window_Message_terminateMessage.call(this);
    if (this._faceSprite) {
      this.removeChild(this._faceSprite);
      this._faceSprite = null;
    }
  };

  const alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);

    switch (command) {
      case 'ShowAnimationFace':
        RS.FaceAnimation.Params.isAnimationFace = true;
        break;
      case 'HideAnimationFace':
        RS.FaceAnimation.Params.isAnimationFace = false;
        break;
      case 'SetAnimationFace':
        RS.FaceAnimation.Params.activeStateId = args.join(' ');
        break;
      case 'ChangeParamAnimationFace':
        RS.FaceAnimation.Params.globalStates[args[0]] = Number(args[1]);
        break;
      default:
        break;
    }
  };
})();
