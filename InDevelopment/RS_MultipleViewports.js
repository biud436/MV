//================================================================
// RS_MultipleViewports.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc (v1.2.2) This plugin provides the multiple viewports. <RS_MultipleViewports>
 * @author biud436
 * @url https://biud436.tistory.com
 *
 * @param Maximum viewport
 * @type number
 * @desc Sets the number of viewports to display on the screen.
 * @default 4
 * @min 2
 * @max 4
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
 * 2018.12.25 (v1.2.2) :
 * - Fixed the issue that couldn't set a number of viewports less than 4.
 * - Fixed the issue that causes the size error when setting a number of viewports less than 4.
 *
 * @command Enable
 * @text Enable
 * @desc
 *
 * @commmand Disable
 * @text Disable
 * @desc
 *
 * @command StartShake
 * @text Start Shake
 * @desc
 *
 * @arg shakePower
 * @text Shake Power
 * @type number
 * @default 10
 *
 */
/*:ko
 * RS_MultipleViewports.js
 * @plugindesc (v1.2.2) 분할된 화면에 서로 다른 장소를 표시할 수 있습니다. <RS_MultipleViewports>
 * @author biud436
 *
 * @param Maximum viewport
 * @text 최대 뷰포트 사이즈
 * @type number
 * @desc 화면에 표시되는 뷰포트의 갯수
 * @default 4
 * @min 2
 * @max 4
 *
 * @param Viewport orientation
 * @text 뷰포트 화면 방향
 * @type boolean
 * @desc 가로 또는 세로 방향으로 설정할 수 있습니다.
 * @default true
 * @on 가로
 * @off 세로
 *
 * @help
 * =============================================================================
 * 활성화 및 비활성화하는 방법
 * =============================================================================
 *
 * 뷰포트를 활성화하려면 이벤트 에디터의 플러그인 명령 기능으로 다음 명령을 호출하시기
 * 바랍니다.
 *
 *    MultipleViewport Enable
 *
 * 이미 뷰포트가 활성화되어있다면 다음 명령으로 뷰포트를 비활성화할 수 있습니다.
 * 알아두셔야 할 점은 이전 뷰포트에서 사용된 메모리가 해제되지 않는다는 것입니다.
 * 메모리를 비우고 싶다면 'MultipleViewport ClearImage ViewID' 명령을 사용하세요.
 *
 *    MultipleViewport Disable
 *
 * =============================================================================
 * 뷰포트 흔들기 기능
 * =============================================================================
 *
 * 뷰포트를 흔들고 싶다면 다음 명령으로 뷰포트에 쉐이크 효과를 줄 수 있습니다.
 *
 *    MultipleViewport StartShake 쉐이크_강도
 *
 * 지속적으로 흔들리게 되는데, 다음 명령으로 쉐이크 효과를 종료할 수 있습니다.
 *
 *    MultipleViewport EndShake
 *
 * =============================================================================
 * 이미지 설정 기능
 * =============================================================================
 *
 * 특정 뷰포트에 이미지를 설정하고 고정시켜둘 수 있습니다.
 * ImageName은 이미지 파일의 이름을 적어주시기 바랍니다 (공백 사용 가능)
 *
 *    MultipleViewport Image ViewID ImageName
 *
 * 특정 뷰포트에 설정된 이미지의 메모리를 해제하고 일반 맵을 묘화합니다.
 *
 *    MultipleViewport ClearImage ViewID
 *
 * ViewID(뷰포트의 ID) 값은 1부터 4까지의 값입니다.
 *
 * =============================================================================
 * 동영상 재생 기능
 * =============================================================================
 * 테스트 플레이에선 저작권 문제로 인하여 (아마도) .webm만 지원하고 있습니다.
 *
 * 따라서, 동영상 파일은 .webm만 사용해주시기 바랍니다.
 *
 * 'viewID' 에는 1-4의 숫자 값을 적으세요.
 * 'szSrc'에는 폴더에 있는 동영상의 이름을 적으세요.
 * 'loop'에는 반복 재생 여부 true 또는 false로 기입하시기 바랍니다.
 * 'loop' 값을 생략하면 기본적으로 동영상은 한 번만 재생될 것입니다.
 *
 * 이 플러그인 커맨드는 특정 뷰포트에 동영상을 설정합니다.
 *    MultipleViewport Video viewID szSrc loop
 *
 * '몇 초 뒤로' 되돌리는 기능입니다.
 *    MultipleViewport MoveBackSeconds viewID second
 *
 * '몇 초 앞으로' 건너뛰는 기능입니다.
 *    MultipleViewport MoveForwardSeconds viewID second
 *
 * 특정 뷰포트에 설정된 동영상을 재생합니다.
 *    MultipleViewport PlayVideo viewID
 *
 * 동영상을 멈춥니다.
 *    MultipleViewport StopVideo viewID
 *
 * 동영상을 일시 정지합니다. 이렇게 하면 나중에 다시 재개할 수 있습니다.
 *    MultipleViewport PauseVideo viewID
 *
 * 뷰포트에 설정된 동영상 텍스처를 제거합니다.
 *    MultipleViewport ClearVideo viewID
 *
 * 잊지 말고 동영상 텍스처를 제거해주시기 바랍니다.
 *
 * =============================================================================
 * 뷰포트 중심점 설정
 * =============================================================================
 * 이 플러그인 커맨드를 사용하면 특정 뷰포트를 특정 이벤트가 있는 곳으로
 * 옮길 수 있습니다.
 *
 * 'EventID'가 -1이면 플레이어가 있는 곳으로 뷰포트가 설정되며,
 *
 * 그외의 경우 특정 이벤트의 화면 좌표로 설정됩니다.
 *
 *    MultipleViewport Target viewID EventID
 *
 * RMMV에서는 플레이어 중심(뷰포트가 설정되지 않았을 떄의 기존 화면)에서
 * 이벤트가 멀어지면, 최적화를 위해 해당 이벤트의 이동 이벤트를 중단시킵니다.
 * 이 플러그인은 해당 로직을 따로 해제하지 않았음에 유의하시기 바랍니다.
 *
 * =============================================================================
 * 변경 기록
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
 * 2018.12.25 (v1.2.2) :
 * - Fixed the issue that couldn't set a number of viewports less than 4.
 * - Fixed the issue that causes the size error when setting a number of viewports less than 4.
 */

var Imported = Imported || {};
Imported.RS_MultipleViewports = true;

var RS = RS || {};
RS.MultipleViewports = RS.MultipleViewports || {};

(($) => {
    "use strict";

    let isMultipleViewport = false;
    let isShake = 0;
    let shakePower = 10;

    let parameters = $plugins.filter(function (i) {
        return i.description.contains("<RS_MultipleViewports>");
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    RS.MultipleViewports.isVertical = Boolean(
        parameters["Viewport orientation"] === "false"
    );

    /**
     * PIXI v5.2.4에 대한 호환성을 제공합니다.
     */
    let V5 = {};
    V5.VideoTexture = class {
        constructor(videoName) {
            this._texture = PIXI.Texture.from(videoName);
        }

        /**
         * @return {PIXI.Texture}
         */
        get texture() {
            return this._texture;
        }

        /**
         * @returns {PIXI.resources.VideoResource} ret
         */
        getResource() {
            const baseTexture = this._texture.baseTexture;
            const ret = baseTexture.resource;
            return ret;
        }

        play() {
            const res = this.getResource();
            res.source.play();
        }

        pause() {
            const res = this.getResource();
            res.source.pause();
        }

        stop() {
            const res = this.getResource();
            res.source.stop();
        }

        setLooping(value) {
            const res = this.getResource();
            res.source.loop = value;
        }

        move(funcName, second) {
            const res = this.getResource();
            const video = res.source;

            switch (funcName) {
                case "Move Back":
                    if (video) video.currentTime -= second;
                    break;
                case "Move Forward":
                    if (video) video.currentTime += second;
                    break;
            }
        }
    };

    //============================================================================
    // ViewportTarget
    //============================================================================

    class ViewportTarget {
        constructor() {
            this._target = null;
            this._x = 0;
            this._y = 0;
        }
        setTarget(target) {
            this._target = target;
        }
        clearTarget() {
            this._target = undefined;
        }
        update() {
            if (!this._target) return;
            this._x = this._target._realX - $gamePlayer.centerX();
            this._y = this._target._realY - $gamePlayer.centerY();
            $gameMap.setDisplayPos(this._x, this._y);
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
    }

    //============================================================================
    // VideoManager
    //============================================================================

    V5.VideoManager = class {
        constructor(parent) {
            this._parent = parent;
        }

        move(viewID, funcName, second) {
            /**
             * @type {PIXI.Texture}
             */
            const texture = this._parent._viewImageCached[viewID - 1];
            if (
                texture &&
                texture.baseTexture.resource instanceof
                    PIXI.resources.VideoResource
            ) {
                let video = texture.baseTexture.resource.source;
                switch (funcName) {
                    case "Move Back":
                        if (video) video.currentTime -= second;
                        break;
                    case "Move Forward":
                        if (video) video.currentTime += second;
                        break;
                }
            }
        }

        play(viewID) {
            /**
             * @type {PIXI.Texture}
             */
            const texture = this._parent._viewImageCached[viewID - 1];
            if (!texture) return;
            const baseTexture = texture.baseTexture;
            if (!baseTexture) return;
            if (!baseTexture.resource) return;
            if (baseTexture.resource instanceof PIXI.resources.VideoResource) {
                let video = texture.baseTexture.resource.source;
                if (video) {
                    video.play();
                } else {
                    if (texture.baseTexture._onCanPlay)
                        texture.baseTexture._onCanPlay();
                }
            }
        }

        pause(viewID) {
            /**
             * @type {PIXI.Texture}
             */
            const texture = this._parent._viewImageCached[viewID - 1];
            if (!texture) return;
            const baseTexture = texture.baseTexture;
            if (!baseTexture) return;
            if (!baseTexture.resource) return;
            if (baseTexture.resource instanceof PIXI.resources.VideoResource) {
                let video = texture.baseTexture.resource.source;
                if (video) video.pause();
            }
        }

        stop(viewID) {
            /**
             * @type {PIXI.Texture}
             */
            const texture = this._parent._viewImageCached[viewID - 1];
            if (!texture) return;
            const baseTexture = texture.baseTexture;
            if (!baseTexture) return;
            if (!baseTexture.resource) return;
            if (baseTexture.resource instanceof PIXI.resources.VideoResource) {
                let video = texture.baseTexture.resource.source;
                if (video) {
                    video.pause();
                    video.currentTime = 0.0;
                }
            }
        }

        pauseAll() {
            this._parent._viewImageCached.forEach(function (texture) {
                if (!texture) return;
                const baseTexture = texture.baseTexture;
                if (!baseTexture) return;
                if (!baseTexture.resource) return;
                if (
                    baseTexture.resource instanceof PIXI.resources.VideoResource
                ) {
                    let video = texture.baseTexture.resource.source;
                    video.pause();
                }
            });
        }

        playAll() {
            this._parent._viewImageCached.forEach(function (texture) {
                if (!texture) return;
                const baseTexture = texture.baseTexture;
                if (!baseTexture) return;
                if (!baseTexture.resource) return;
                if (
                    baseTexture.resource instanceof PIXI.resources.VideoResource
                ) {
                    let video = texture.baseTexture.resource.source;
                    video.play();
                }
            });
        }
    };

    V5.ImageManager = class {
        /**
         *
         * @param {ViewportManager} parent
         */
        constructor(parent) {
            /**
             * @param {ViewportManager}
             */
            this._parent = parent;
        }

        set(viewID, texture) {
            if (this._parent._viewImageCached[viewID - 1]) {
                this._parent._viewImageCached_viewImageCached[viewID - 1] =
                    null;
            }
            this._parent._viewImageCached.splice(viewID - 1, texture);
            this._parent._viewImageCached[viewID - 1] = texture;
        }

        isValid(viewID) {
            const texture = this._parent._viewImageCached[viewID];
            if (texture instanceof PIXI.Texture) {
                return !!texture.baseTexture && texture.baseTexture.valid;
            } else {
                return false;
            }
        }

        clear(viewID) {
            if (this._parent._viewImageCached[viewID - 1]) {
                const texture = this._parent._viewImageCached[viewID - 1];
                if (texture)
                    texture.destroy({
                        destroyBase: true,
                    });
                delete this._parent._viewImageCached[viewID - 1];
            }
        }
    };

    //============================================================================
    // ViewportManager
    //============================================================================

    class ViewportManager {
        constructor(g) {
            this._graphics = g;

            this._video = new V5.VideoManager(this);
            this._image = new V5.ImageManager(this);
        }

        get video() {
            return this._video;
        }

        get image() {
            return this._image;
        }

        get view() {
            return this._viewImageCached;
        }

        initMembers() {
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
            this._tempPos = new ViewportTarget();

            /**
             * @param {PIXI.Texture[]}
             */
            this._viewImageCached = [];

            this._renderBounds = null;
            this._target = null;
            this._maxDisplayCounts = Number(
                parameters["Maximum viewport"] || 4
            ).clamp(2, 4);
        }

        clear() {
            for (let i = 0; i < this._maxDisplayCounts; i++) {
                this._viewportDisplayPos[i].clearTarget();
            }
        }

        isValid() {
            return SceneManager._scene instanceof Scene_Map;
        }

        isRendererValid() {
            return !!this._graphics.app.renderer;
        }

        isWebGL() {
            return Utils.canUseWebGL();
        }

        restore() {
            for (let i = 0; i < this._maxDisplayCounts; i++) {
                Graphics.viewport.setDisplayPos(
                    i + 1,
                    $gameMap._multipleViewportTargetIds[i]
                );
            }
        }

        /**
         * @return {PIXI.Renderer}
         */
        renderer() {
            return this._graphics.app.renderer;
        }

        createRenderTexture() {
            if (!this.isRendererValid()) return;

            const renderer = this.renderer();
            const boxMargin = 4;
            let gl = this.renderer().gl;

            this.initMembers();

            this._frameWidth = renderer.width;
            this._frameHeight = renderer.height;

            // Create RenderTexture
            for (let i = 0; i < this._maxDisplayCounts; i++) {
                this._renderTexture[i] = PIXI.RenderTexture.create(
                    this._frameWidth,
                    this._frameHeight,
                    PIXI.SCALE_MODES.NEAREST
                );
            }
            // Create Rect
            this._rect = this.getRenderPosition(
                this._frameWidth - boxMargin * 2,
                this._frameHeight - boxMargin * 2
            );

            // Create Sprite
            this._renderSprite = new Sprite();

            // Add Child Sprite
            for (let i = 0; i < this._maxDisplayCounts; i++) {
                this._renderSprite.addChild(new Sprite());
                this._viewportDisplayPos[i] = new ViewportTarget();
            }

            this._viewImageCached = [];
            this._renderBounds = new Rectangle(
                0,
                0,
                this._frameWidth,
                this._frameHeight
            );
        }

        getRenderPosition(width, height) {
            let positionType = [];
            let w, h;
            let vx, vy;
            let size = this._maxDisplayCounts;

            // TODO: 이 값을 정밀하게 측정해서 결정해야 한다.
            const margin = 0;

            switch (this._maxDisplayCounts) {
                case 2:
                case 3:
                    if (RS.MultipleViewports.isVertical) {
                        w = width / size;
                        h = height;
                        this._mtHorizontalScale = 1 / this._maxDisplayCounts;
                        this._mtVerticalScale = 1.0;
                    } else {
                        w = width;
                        h = height / size;
                        this._mtHorizontalScale = 1.0;
                        this._mtVerticalScale = 1 / this._maxDisplayCounts;
                    }
                    for (
                        let i = (vx = vy = 0);
                        i < this._maxDisplayCounts;
                        i++
                    ) {
                        vx = i % this._maxDisplayCounts;
                        vy = i / this._maxDisplayCounts;
                        if (RS.MultipleViewports.isVertical) {
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
                    for (
                        let i = (vx = vy = 0);
                        i < this._maxDisplayCounts;
                        i++
                    ) {
                        vx = i % 2;
                        vy = Math.floor(i / 2);
                        positionType[i] = new Rectangle(
                            w * vx,
                            h * vy,
                            w + margin * 2,
                            h + margin * 2
                        );
                    }
                    break;
            }
            return positionType;
        }

        setRenderSprite(i) {
            const gw = Graphics.width;
            const gh = Graphics.height;

            let sPower =
                $gameMap._multipleViewportShakePower *
                $gameMap._multipleViewportShakeEnabled;
            let shake = (-0.5 + Math.random()) * sPower;
            let child = this._renderSprite.getChildAt(i);

            child.x = this._rect[i].x + shake;
            child.y = this._rect[i].y + shake;

            if (this.image.isValid(i)) {
                const texture = (child.texture = this._viewImageCached[i]);
                child.scale.x = (gw / texture.width) * this._mtHorizontalScale;
                child.scale.y = (gh / texture.height) * this._mtVerticalScale;
            } else {
                child.texture = this._renderTexture[i];
                child.scale.x = this._mtHorizontalScale;
                child.scale.y = this._mtVerticalScale;
            }
        }

        // Display

        saveCurrentDisplayPos() {
            if (!$gameMap) return;
            this._tempPos.setTarget($gamePlayer);
            this._viewportDisplayPos["temp"] = this._tempPos;
        }

        setDisplayPos(viewID, targetId) {
            let target;
            if (targetId < 0) {
                target = $gamePlayer;
                targetId = -1;
            } else {
                let evt = $gameMap.event(targetId);
                if (evt) target = evt;
            }
            $gameMap._multipleViewportTargetIds[viewID - 1] = targetId;
            const targetPos = this._viewportDisplayPos[viewID - 1];
            if (targetPos) targetPos.setTarget(target || $gamePlayer);
        }

        lockDisplayPos(stage, i) {
            const targetPos = this._viewportDisplayPos[i];
            if (!targetPos) return false;
            targetPos.update();
            if (SceneManager._scene instanceof Scene_Map) {
                SceneManager._scene._spriteset.update();
            }
        }

        unlockDisplayPos(stage) {
            this.lockDisplayPos(stage, "temp");
        }

        setTarget(target) {
            this._target = target;
        }

        disposeTarget() {
            this._target = null;
        }

        // Render

        render(stage) {
            if ($gameMap._multipleViewportEnabled) {
                this.saveCurrentDisplayPos();

                for (let i = 0; i < this._maxDisplayCounts; i++) {
                    // Lock
                    this.lockDisplayPos(stage, i);

                    // Render
                    this.renderer().renderTexture.bind(this._renderTexture[i]);
                    this.renderer().render(stage, this._renderTexture[i]);
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

    const Graphics__createPixiApp = Graphics._createPixiApp;
    Graphics._createPixiApp = function () {
        Graphics__createPixiApp.call(this);
        /**
         * @type {ViewportManager}
         */
        this._viewportManager = new ViewportManager(this);
        this._viewportManager.createRenderTexture();

        this._app.ticker.remove(this._onTick, this);
        this._app.ticker.add(this.renderMultipleViewports, this);
    };

    Graphics.renderMultipleViewports = function (deltaTime) {
        this._fpsCounter.startTick();
        if (this._tickHandler) {
            this._tickHandler(deltaTime);
        }
        const stage = this._app.stage;
        if (this._canRender()) {
            if (this._viewportManager.isValid()) {
                this._viewportManager.render(stage);
            } else {
                this._app.render();
            }
        }
        this.frameCount++;
        this._fpsCounter.endTick();
    };

    Object.defineProperty(Graphics, "viewport", {
        get: function () {
            return this._viewportManager;
        },
        configurable: false,
    });

    //============================================================================
    // Game_Map
    //============================================================================
    const alias_Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function () {
        alias_Game_Map_initialize.call(this);
        this._multipleViewportEnabled = false;
        this._multipleViewportShakeEnabled = 0;
        this._multipleViewportShakePower = 10;
        this._multipleViewportTargetIds = [];
    };

    const alias_Game_Map_setup = Game_Map.prototype.setup;
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

    const alias_Game_Player_clearTransferInfo =
        Game_Player.prototype.clearTransferInfo;
    Game_Player.prototype.clearTransferInfo = function () {
        alias_Game_Player_clearTransferInfo.call(this);

        // clear target and target ids when transferring
        $gameMap._multipleViewportTargetIds = [];
        Graphics.viewport.clear();

        // initializing the target as the player when transferring
        for (let i = 0; i < Graphics.viewport._maxDisplayCounts; i++) {
            Graphics.viewport.setDisplayPos(i + 1, $gamePlayer);
        }
    };

    //============================================================================
    // DataManager
    //============================================================================

    const alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = alias_DataManager_makeSaveContents.call(this);
        contents.viewportTargetIds = $gameMap._multipleViewportTargetIds;
        return contents;
    };

    const alias_DataManager_extractSaveContents =
        DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        alias_DataManager_extractSaveContents.call(this, contents);
        $gameMap._multipleViewportTargetIds = contents.viewportTargetIds;
        Graphics.viewport.restore();
    };

    /**
     * PIXI v5.x.x에 대한 호환성을 제공하는 class입니다.
     *
     * @class V5.PluginCommand
     */
    V5.PluginCommand = new (class {
        enable(args) {
            $gameMap.setViewport(true);
            Graphics.viewport.video.playAll();
            Graphics.viewport.setTarget($gamePlayer);
            for (let i = 0; i < Graphics.viewport._maxDisplayCounts; i++) {
                Graphics.viewport.setDisplayPos(i + 1, $gamePlayer);
            }
        }

        disable(args) {
            $gameMap.setViewport(false);
            Graphics.viewport.unlockDisplayPos(SceneManager._scene);
            Graphics.viewport.video.pauseAll();
            Graphics.viewport.disposeTarget();
        }

        startShake(args) {
            $gameMap.setViewportShake(1);
            $gameMap.setViewportShakePower(Number(args[1] || 10));
        }

        endShake(args) {
            $gameMap.setViewportShake(0);
        }

        image(args) {
            const viewID = Number(args[1] || 1).clamp(1, 4);
            const name = args.slice(2, args.length).join(" ");
            const imageName = "img/pictures/" + name + ".png";
            const texture = PIXI.Texture.from(imageName);
            Graphics.viewport.image.clear(viewID);
            Graphics.viewport.image.set(viewID, texture);
        }

        clearImage(args) {
            Graphics.viewport.image.clear(Number(args[1]));
        }

        video(args) {
            const viewID = Number(args[1] || 1).clamp(1, 4);
            const name = args[2];
            const looping = args[3] === "true";
            const videoName = "movies/" + name + ".webm";
            /**
             * @type {PIXI.Texture}
             */
            const videoTexture = new V5.VideoTexture(videoName);
            videoTexture.setLooping(looping);
            Graphics.viewport.video.stop(viewID);
            Graphics.viewport.image.clear(viewID);
            Graphics.viewport.image.set(viewID, videoTexture.texture);
        }

        playVideo(args) {
            const viewID = Number(args[1] || 1);
            Graphics.viewport.video.play(viewID);
        }

        pauseVideo(args) {
            const viewID = Number(args[1] || 1);
            Graphics.viewport.video.pause(viewID);
        }

        moveBackSeconds(args) {
            const viewID = Number(args[1] || 1);
            const sec = parseInt(args[2] || 0);
            Graphics.viewport.video.move(viewID, "Move Back", sec);
        }

        moveForwardSeconds(args) {
            const viewID = Number(args[1] || 1);
            const sec = parseInt(args[2] || 0);
            Graphics.viewport.video.move(viewID, "Move Forward", sec);
        }

        stopVideo(args) {
            const viewID = Number(args[1] || 1);
            Graphics.viewport.video.stop(viewID);
        }

        clearVideo(args) {
            const viewID = Number(args[1] || 1);
            Graphics.viewport.video.stop(viewID);
            Graphics.viewport.image.clear(viewID);
        }

        target(args) {
            const viewID = Number(args[1] || 1).clamp(1, 4);
            const eventId = parseInt(args[2] || 0);
            Graphics.viewport.setDisplayPos(viewID, eventId);
        }
    })();

    //============================================================================
    // New Plugin Commands
    //============================================================================

    const pluginCommandNamesTable = {
        Enable: () => {
            V5.PluginCommand.enable();
        },
        Disable: () => {
            V5.PluginCommand.disable();
        },
        StartShake: (args) => {
            V5.PluginCommand.startShake(args);
        },
        EndShake: () => {
            V5.PluginCommand.endShake();
        },
        Image: (args) => {
            V5.PluginCommand.image(args);
        },
        ClearImage: (args) => {
            V5.PluginCommand.clearImage(args);
        },
        Video: (args) => {
            V5.PluginCommand.video(args);
        },
        PlayVideo: (args) => {
            V5.PluginCommand.playVideo(args);
        },
        PauseVideo: (args) => {
            V5.PluginCommand.pauseVideo(args);
        },
        MoveBackSeconds: (args) => {
            V5.PluginCommand.moveBackSeconds(args);
        },
        MoveForwardSeconds: (args) => {
            V5.PluginCommand.moveForwardSeconds(args);
        },
        StopVideo: (args) => {
            V5.PluginCommand.stopVideo(args);
        },
        ClearVideo: (args) => {
            V5.PluginCommand.clearVideo(args);
        },
        Target: (args) => {
            V5.PluginCommand.target(args);
        },
    };

    // 플러그인 커맨드를 나열합니다.
    Object.keys(pluginCommandNamesTable).forEach((pluginCommandName) => {
        const name = pluginCommandName;
        PluginManager.registerCommand(pluginName, pluginCommandName, (args) => {
            const callbackFunc = pluginCommandNamesTable[name];
            callbackFunc.call(this, ...args);
        });
    });

    window.V5 = V5;
})(RS.MultipleViewports);
