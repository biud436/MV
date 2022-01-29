//================================================================
// RS_FaceAnimation.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc This plugin allows you to show up the animation face in the messsage window <RS_FaceAnimation>
 * @author biud436
 * @url https://blog.naver.com/biud436
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
 * + show
 *
 * You wish to hide the animated face after it indicates on the screen.
 * it is returned back as a normal face if you use this plugin command.
 *
 * + hide
 *
 * This plugin will be checked the ID value of activated face
 * and then show up it when the next message opens up.
 * So you need to set the ID of the animated face before the message window sets up.
 * it will be already set in the plugin parameter called 'Set Animation Face'
 * The ID value should be changed as your own purposes.
 *
 * + set
 *  - id : blink
 *
 * For example, there is the face ID called 'blink' into it
 * and you can use like this before the message window starts up, as follows.
 *
 * + show
 * + set
 *  - id : char
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
 * change
 *  - angle : 60.0
 *
 * into the message window, the position of the animated-face image is basically the
 * relative coordinates to parent message window.
 * So its coordinates are (0, 0) px.
 *
 * change
 *  - x : 0.0
 * change
 *  - y : 0.0
 *
 * and you can also apply the padding value into it, like this.
 *
 * change
 *  - x : 18.0
 * change
 *  - y : 18.0
 *
 * In this part, You'll learn how to change a scale of the animated face sprite.
 *
 * To scale the animated face, you passed scale to the plugin command ChangeParamAnimationFace,
 * like this.
 *
 * change
 *  - scale : 1.0
 *
 * The 1.0 is the default scale and 2.0 is to zoom in by double.
 *
 * ================================================================
 * Change Log
 * ================================================================
 * 2021.04.18 (v1.0.0) - First Release.
 *
 * @command show
 * @text Show Animation
 * @desc if you use this plugin command, you can show up an animated face in the message window.
 *
 * @command hide
 * @text Remove Animation
 * @desc This command allows you to remove face animation.
 *
 * @command set
 * @text Set State
 * @desc Specify a certain state.
 *
 * @arg id
 * @text id
 * @desc Specify the desired state name.
 * (Ex: blink)
 * @default blink
 *
 * @command change
 * @text Change Parameters
 * @desc This command allows you to change global parameters (x, y, angle, scale)
 *
 * @arg stateName
 * @text Parameters
 * @type string
 * @desc (Available Parameters : x, y, angle, scale)
 * @default none
 *
 * @arg value
 * @text value
 * @type number
 * @desc it is possible to change parameters such as x, y, angle, scale
 * @default 0
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
/*:ko
 * @target MZ
 * @plugindesc This plugin allows you to show up the animation face in the messsage window <RS_FaceAnimation>
 * @author biud436
 * @url https://blog.naver.com/biud436
 *
 * @param Set Animation Face
 * @type struct<AnimationFace>[]
 * @desc Animation Face에 대한 옵션 데이터를 설정할 수 있습니다.
 * @default ["{\"id\":\"blink\",\"x\":\"0\",\"y\":\"0\",\"width\":\"144\",\"height\":\"144\",\"cols\":\"4\",\"maxFrames\":\"3\",\"delay\":\"5.00\",\"looping\":\"true\"}"]
 *
 * @help
 * ================================================================
 * 사용법 (MV)
 * ================================================================
 *
 * 애니메이션 얼굴 이미지와 일반 얼굴 이미지를 토글하려면 다음과 같은 플러그인 명령을 사용해야 합니다.
 *
 * show
 *
 * 기본적으로 토글 상태이므로 다음 플러그인 명령을 호출하면 일반 얼굴 이미지가 묘화됩니다.
 *
 * hide
 *
 * 애니메이션 얼굴 이미지의 설정 정보는 Set Animation Face 매개변수에서 설정합니다.
 * AnimationFace에는 ID 값이 존재합니다.
 * ID는 빠르게 데이터를 취득 하기 위해 존재하는 데이터 식별 값으로 ID라고 부릅니다.
 * 이 값은 문자열이나 숫자 값 등을 지정할 수 있습니다.
 *
 * set
 *  - id : blink
 *
 * 예를 들어, 매개변수에서 char라는 Id 값에 해당하는 JSON 데이터를 만들어놓았다고 가정합니다.
 * 이 경우에는 문장의 표시를 호출하기 전에 다음 플러그인 명령을 사용해야 합니다.
 *
 * show
 * set
 *  - id : char
 *
 * 문장의 표시에선 해당 얼굴 이미지를 찾아 선택해야 합니다.
 * 옵션 정보에 맞게 얼굴 이미지를 자르고 프레임을 만들기 때문입니다.
 *
 * 혹 다시 일반 얼굴 이미지를 사용하고 싶다면, 다음 플러그인 명령을 호출해야 합니다.
 *
 * hie
 *
 * 위 명령을 호출하면 다시 기본 상태로 되돌아갈 것입니다.
 *
 * 회전, 위치 변경, 스케일 변경 기능에 대해서 설명하겠습니다.
 * 이 기능은 전역에 적용되므로 매우 조심스럽게 사용해야 합니다.
 * 모든 인자는 소문자로 적어야 합니다.
 *
 * 예를 들어,스프라이트를 60도 회전을 시키고 싶다면 다음과 같이 해야 합니다.
 *
 * change
 *  - angle : 60.0
 *
 * 메시지 윈도우 내에서 애니메이션 얼굴 이미지의 위치는 기본적으로
 * 메시지 윈도우의 상대 좌표로 결정됩니다.
 * 따라서 상단 좌표는 0, 0 입니다.
 *
 * change
 *  - x : 0.0
 * change
 *  - y : 0.0
 *
 * 애니메이션 얼굴 이미지의 크기는 scale 인자를 전달하여 조절이 가능한데요.
 * 1.0은 기본 스케일이며, 2.0은 두 배 확대입니다.
 *
 * change
 *  - scale :  1.0
 *
 * 다시 한 번 말하지만 위 인자들은 글로벌에 적용되기 때문에,
 * 이후에 표시되는 모든 얼굴 애니메이션에 적용되므로 조심히 사용하시기 바랍니다.
 *
 * ================================================================
 * Change Log
 * ================================================================
 * 2021.04.18 (v1.0.0) - First Release.
 *
 * @command show
 * @text 애니메이션 있음
 * @desc 셀을 순서대로 순회하며 애니메이션 모드로 동작시킵니다.
 *
 * @command hide
 * @text 애니메이션 없음
 * @desc 애니메이션을 제거합니다.
 *
 * @command set
 * @text 상태 설정
 * @desc 특정 상태로 설정합니다.
 *
 * @arg id
 * @text id
 * @desc 상태를 설정합니다.
 * @default blink
 *
 * @command change
 * @text 매개변수 변경
 * @desc 글로벌 매개변수를 변경합니다.
 *
 * @arg stateName
 * @text 매개변수 명
 * @type string
 * @desc (사용 가능한 매개변수명 : x, y, angle, scale)
 * @default none
 *
 * @arg value
 * @text value
 * @type number
 * @desc 조절 가능한 값 : x, y, angle, scale
 * @default 0
 */
/*~struct~AnimationFace:ko
 *
 * @param id
 * @desc 해시 테이블을 이 ID 값으로 탐색하여 상태를 빠르게 취득합니다.
 * @default 0
 *
 * @param x
 * @type number
 * @desc 화면 상의 좌표가 아니라, 스프라이트 시트 내에서의 시작점을 의미합니다.
 * @default 0
 *
 * @param y
 * @type number
 * @desc 화면 상의 좌표가 아니라, 스프라이트 시트 내에서의 시작점을 의미합니다.
 * @default 0
 *
 * @param width
 * @type number
 * @desc 화면에 표시 할 프레임의 가로 길이입니다.
 * @default 144
 *
 * @param height
 * @type number
 * @desc 화면에 표시 할 프레임의 세로 길이입니다.
 * @default 144
 *
 * @param cols
 * @type number
 * @desc 열의 수. 애니메이션을 하려면 스프라이트 시트에서 한 프레임만을 잘라야 합니다.
 * @default 4
 *
 * @param maxFrames
 * @type number
 * @desc 최대 프레임입니다. 기본적으로 애니메이션 상태는 2 프레임 이상입니다.
 * @default 3
 *
 * @param delay
 * @type number
 * @desc 한 프레임이 끝나면 일정 시간 딜레이를 걸어줘야 자연스럽습니다.
 * @default 5.00
 * @decimals 2
 *
 * @param looping
 * @type boolean
 * @desc 반복 재생을 위한 옵션입니다. 재생이 끝나면 반복적으로 재생되어야 하는 경우가 있습니다.
 * @default false
 * @on true
 * @off false
 *
 */
var RS = RS || {};
RS.FaceAnimation = RS.FaceAnimation || {};

(($) => {
    "use strict";

    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_FaceAnimation>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
            try {
                return $.jsonParse(v);
            } catch (e) {
                return v;
            }
        });

        return retData;
    };

    $.Params = {};

    $.Params.isAnimationFace = true;

    $.Params.data = $.jsonParse(parameters["Set Animation Face"]);
    $.Params.states = {};

    // ID 값 해시 테이블을 만들어 빠른 탐색을 도모한다.
    $.Params.data.forEach(function (e) {
        $.Params.states[e.id] = e;
    });

    // 활성화된 상태의 ID (2개 이상의 상태는 할당할 수 없는 방식)
    $.Params.activeStateId = "";

    $.Params.defaultState = {
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
    $.Params.globalStates = {
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
                    this._spriteData._rect = args[0];
                    break;
                case 4:
                    this._spriteData._rect.x = args[0];
                    this._spriteData._rect.y = args[1];
                    this._spriteData._rect.width = args[2];
                    this._spriteData._rect.height = args[3];
                default:
                    this._spriteData._rect.x =
                        (this._currentFrame % this._cols) *
                        this._spriteData._width;
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
        if (!$.Params.isAnimationFace) return false;
        return true;
    };

    const alias_Window_Message_drawMessageFace =
        Window_Message.prototype.drawMessageFace;
    Window_Message.prototype.drawMessageFace = function () {
        if (this.isAnimationFace()) {
            const state = $.Params.states[$.Params.activeStateId];
            if (!state) {
                return alias_Window_Message_drawMessageFace.call(this);
            }

            var x = Number(state.x);
            var y = Number(state.y);
            var width = Number(state.width);
            var height = Number(state.height);
            var cols = Number(state.cols);
            var maxFrames = Number(state.maxFrames);
            var delay = Number(state.delay);
            var looping = state.looping;

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
                .setPosition($.Params.globalStates.x, $.Params.globalStates.y)
                .setAngle($.Params.globalStates.angle)
                .setScale($.Params.globalStates.scale)
                .setLoop(looping)
                .setFrameDelay(delay)
                .setSpriteSheets(cols)
                .setFrames(0, maxFrames)
                .setVisible(true);

            this._contentsSprite.addChild(this._faceSprite);
        } else {
            alias_Window_Message_drawMessageFace.call(this);
        }
    };

    const alias_Window_Message_terminateMessage =
        Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        alias_Window_Message_terminateMessage.call(this);
        if (this._faceSprite) {
            this._contentsSprite.removeChild(this._faceSprite);
            this._faceSprite = null;
        }
    };

    /**
     * ================================================
     * Plugin Commands
     * ================================================
     */
    const pluginCommands = {
        show() {
            $.Params.isAnimationFace = true;
        },

        hide() {
            $.Params.isAnimationFace = false;
        },

        set(args) {
            const id = args.id;
            $.Params.activeStateId = id;
        },

        change(args) {
            const name = args.stateName;
            const value = Number(args.value);
            $.Params.globalStates[name] = value;
        },
    };

    for (let name in pluginCommands) {
        PluginManager.registerCommand(pluginName, name, pluginCommands[name]);
    }
})(RS.FaceAnimation);
0;
