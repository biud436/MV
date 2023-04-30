/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-eval */
//================================================================
// RS_GraphicsMenu.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

/*:
 * @target MV
 * @plugindesc This plugin allows you to indicate the menu as an image <RS_GraphicsMenu>
 * @author biud436
 *
 * @param Menu Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Select the menu image to used
 * @default inter_alpha
 *
 * @param Starting Position
 *
 * @param Start X
 * @parent Starting Position
 * @type string
 * @desc Set up the starting x-position of the menu panel
 * @default Graphics.boxWidth / 2 - ((W * RECT.length) / 2)
 *
 * @param Start Y
 * @parent Starting Position
 * @type string
 * @desc Set up the starting y-position of the menu panel
 * @default Graphics.boxHeight / 2 - H / 2
 *
 * @param Rect
 *
 * @param W
 * @type number
 * @desc Setup the button size as pixel unit.
 * (Include the macro string called 'W' and then it replaces as a real value.)
 * @default 78
 * @min 1
 *
 * @param H
 * @type number
 * @desc Setup the button size as pixel unit.
 * (Include the macro string called 'H' and then it replaces as a real value.)
 * @default 78
 * @min 1
 *
 * @param Menu Rect
 * @parent Rect
 * @type struct<MenuRect>[]
 * @desc Specify the menu rect structs
 * @default ["{\"x\":\"0\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"78\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"156\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"234\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"312\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}"]
 *
 * @param Menu Index
 * @type string[]
 * @desc Specify the name of Scene constructor.
 * (you can exit the game when setting the text as :exit)
 * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
 *
 * @help
 * =============================================================================
 * Usage
 * -----------------------------------------------------------------------------
 *
 * - Menu Index, A Button size and struct<MenuRect>
 * First up, You specify the name of certain Scene constructor using plugin parameter,
 * then have to set up a bound of the button to fit a sprite sheet image.
 *
 * The width and height values of the default button are 78 pixel and they have
 * been set in plugin parameters called 'W' and 'H'.
 *
 * Note that these values should also be the same as the width and height value
 * used in a struct<MenuRect>.
 *
 * - Starting position of the menu panel
 * The starting position will set to fit in the center of the screen. The default
 * values are as follows:
 *
 *  RS.GraphicsMenu.Params.startX = Graphics.boxWidth / 2 - ((W * menu.length) / 2)
 *  RS.GraphicsMenu.Params.startY = Graphics.boxHeight / 2 - H / 2
 *
 * 'W' and 'H" is predefined button size values based on plugin parameters.
 *
 * -----------------------------------------------------------------------------
 * Script calls :
 * -----------------------------------------------------------------------------
 * In the menu plugin parameters,
 * You can execute the javascript code block using an evaluate statement.
 *
 * EVAL : x
 *
 * The 'x' is the code block.
 * For Example, if you are using the plugin named YEP_CommonEventMenu,
 * You will run the code as belows.
 *
 * EVAL : $gameMap._interpreter.openCommonEventMenu();
 *
 * But, The current scene is not a map scene. so you may also need to use
 * an anonymous function or lambda expression, as follows.
 *
 * (function() {
 *     setTimeout(function() {
 *         $gameTemp.reserveCommonEvent(1);
 *         SceneManager.push(Scene_Map);
 *     }, 0);
 * })();
 *
 * Note that the command named 'EVAL' is not stable in latest browser.
 *
 * =============================================================================
 * Credits (Image)
 * -----------------------------------------------------------------------------
 * The author of the included resources is as follows (a menu image) :
 *
 *  numg94 - http://blog.naver.com/numg94
 *
 * =============================================================================
 * Version Log
 * -----------------------------------------------------------------------------
 * 2017.07.11 (v1.0.0) - First Release
 * 2017.12.19 (v1.0.1) - Added a new feature that can exit the game.
 * 2017.12.29 (v1.0.2) - Fixed the issue that is not changed the button index when using a button index is six or above.
 * 2018.01.29 (v1.0.3) - Added a new feature that runs the eval code when pressing certain menu button.
 * 2018.11.16 (v1.0.4) - Open Menu Screen command is not supported.
 * 2020.01.31 (v1.0.5) :
 * - Fixed the bug that appears incorrect button frame when selected the button.
 * 2022.12.11 (v1.0.7) :
 * - Fixed the bug that is not touched the button when using the mobile device such as Android.
 */

/*~struct~MenuRect:
 *
 * @param x
 * @type number
 * @decimals 0
 * @desc Specify the x-position of the button in the menu panel
 * @default 0
 * @min 0
 *
 * @param y
 * @type number[]
 * @desc Note that each elements indicate a y-position inside the sprite sheet.
 * if an element index is to 1(starts with 0), it will appear the graphics when mouse over.
 * @default ["0","78"]
 *
 * @param width
 * @type number
 * @desc A button width inside a sprite sheet.
 * @default 78
 * @min 1
 *
 * @param height
 * @type number
 * @desc A button height inside a sprite sheet.
 * @default 78
 * @min 1
 *
 */
(() => {
    const RS = window.RS || {};
    RS.GraphicsMenu = RS.GraphicsMenu || {};
    RS.GraphicsMenu.Params = RS.GraphicsMenu.Params || {};
    RS.Utils = RS.Utils || {};

    const Imported = window.Imported || {};

    let parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_GraphicsMenu>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    RS.Utils.jsonParse = function (str) {
        const retData = JSON.parse(str, (k, v) => {
            try {
                return RS.Utils.jsonParse(v);
            } catch (e) {
                return v;
            }
        });
        return retData;
    };

    RS.GraphicsMenu.Params.RECT = RS.Utils.jsonParse(parameters['Menu Rect']);
    RS.GraphicsMenu.Params.MENU = RS.Utils.jsonParse(parameters['Menu Index']);

    RS.GraphicsMenu.Params.isValidGameCoreUpdate = false;

    //============================================================================
    // Game_System
    //============================================================================

    const aliasGameSystemInitialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        aliasGameSystemInitialize.call(this);
        // 세이브 데이터에 저장을 하기 위해 여기에 변수를 정의했습니다.
        this._menuMouseX = 0;
        this._menuMouseY = 0;
    };

    Object.defineProperties(Game_System.prototype, {
        // 마우스 X 좌표
        menuMouseX: {
            get: () => {
                return this._menuMouseX;
            },
            set: value => {
                this._menuMouseX = value;
            },
            configurable: true,
        },
        // 마우스 Y 좌표
        menuMouseY: {
            get: () => {
                return this._menuMouseY;
            },
            set: value => {
                this._menuMouseY = value;
            },
            configurable: true,
        },
    });

    //============================================================================
    // TouchInput
    //============================================================================

    const aliasTouchInputOnMouseMove = TouchInput._onMouseMove;
    TouchInput._onMouseMove = function (event) {
        aliasTouchInputOnMouseMove.call(this, event);
        // 마우스의 움직임이 감지되면 마우스 좌표를 업데이트 합니다
        // 일반 마우스 좌표는 업데이트를 하지 않으므로 호환성을 위해 그대로 두었습니다
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        if ($gameSystem) {
            $gameSystem.menuMouseX = x;
            $gameSystem.menuMouseY = y;
        }
    };

    //============================================================================
    // Scene_LinearMenu
    //============================================================================

    function Scene_LinearMenu(...args) {
        this.initialize.call(this, ...args);
    }

    Scene_LinearMenu.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_LinearMenu.prototype.constructor = Scene_LinearMenu;

    Scene_LinearMenu.INDEX = 0;

    Scene_LinearMenu.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this._touched = false;
        this.createImage();

        if (Imported.YEP_CommonEventMenu) {
            this.createCommonEventMenuWindows();
        }
    };

    Scene_LinearMenu.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);
    };

    Scene_LinearMenu.prototype.createHelpWindow = function () {};

    Scene_LinearMenu.prototype.terminate = function () {
        Scene_MenuBase.prototype.terminate.call(this);
    };

    Scene_LinearMenu.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);

        if (Imported.YEP_CommonEventMenu) {
            /**
             * @type {Window} targetWindow
             */
            const targetWindow = this._commonEventMenuWindow;

            if (targetWindow.active) {
                const isActive = this.isActive();

                $gameMap.update(isActive);
                $gamePlayer.update(isActive);
                $gameTimer.update(isActive);
                $gameScreen.update();
            } else {
                this.updateIndex();
                this.processExit();
            }
        } else {
            this.updateIndex();
            this.processExit();
        }
    };

    Scene_LinearMenu.prototype.right = function () {
        const { RECT } = RS.GraphicsMenu.Params;
        Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX + 1).mod(RECT.length);
        SoundManager.playCursor();
    };

    Scene_LinearMenu.prototype.left = function () {
        const { RECT } = RS.GraphicsMenu.Params;
        Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX - 1).mod(RECT.length);
        SoundManager.playCursor();
    };

    Scene_LinearMenu.prototype.updateIndex = function () {
        // 키 체크
        if (Input.isTriggered('right')) {
            this.right();
        }
        if (Input.isTriggered('left')) {
            this.left();
        }
        if (Input.isTriggered('ok')) {
            this.selectScene();
        }

        // 마우스 및 터치
        this.isSelectedInTouchInput();

        // 현재 인덱스에 맞는 영역으로 재설정한다.
        this.setRect(
            this._rect[Scene_LinearMenu.INDEX],
            Scene_LinearMenu.INDEX
        );
    };

    Scene_LinearMenu.prototype.isSelectedInTouchInput = function () {
        const menu = RS.GraphicsMenu.Params.MENU;
        if (!menu) return;

        const W = parseInt(parameters.W, 10);
        const H = parseInt(parameters.H, 10);
        const x = RS.GraphicsMenu.Params.startX;
        const y = RS.GraphicsMenu.Params.startY;
        const width = Math.floor(W * menu.length);
        const height = H;
        let mx = $gameSystem.menuMouseX || 0;
        let my = $gameSystem.menuMouseY || 0;

        if (Utils.isMobileDevice()) {
            mx = TouchInput.x;
            my = TouchInput.y;
        }

        // 인덱스 값 : (마우스 좌표 - 메뉴 시작 위치) / 메뉴의 폭
        const index = Math.floor((mx - x) / W);
        const previousIndex = Scene_LinearMenu.INDEX;

        // 범위 내에 있는 지 확인
        if (mx > x && my > y && mx < x + width && my < y + height) {
            Scene_LinearMenu.INDEX = index.clamp(0, menu.length - 1);
            if (TouchInput.isTriggered()) this.selectScene();
        }

        // 커서 사운드 재생
        if (previousIndex !== Scene_LinearMenu.INDEX && !this._touched) {
            SoundManager.playCursor();
            this._touched = true;
        } else {
            this._touched = false;
        }
    };

    Scene_LinearMenu.prototype.selectScene = function () {
        const sceneObject = RS.GraphicsMenu.Params.MENU[Scene_LinearMenu.INDEX];
        const self = this;

        if (sceneObject.endsWith(':exit')) {
            setTimeout(function () {
                self._touched = false;
                SoundManager.playOk();
                SceneManager.exit();
            }, 0);
            return;
        }
        if (sceneObject.match(/(?:EVAL[ ]*:[ ]*)(.*)/i)) {
            try {
                this._touched = false;
                eval(RegExp.$1);
                SoundManager.playOk();
            } catch (e) {
                console.warn(e);
            }
        }
        if (typeof window[sceneObject] === 'function') {
            // push : 현재 메뉴 씬을 메뉴 스택에 누적
            this._touched = false;
            SceneManager.push(window[sceneObject]);
            SoundManager.playOk();
        }
    };

    Scene_LinearMenu.prototype.processExit = function () {
        if (Scene_Map.prototype.isMenuCalled.call(this)) {
            // goto : 메뉴 스택에 누적하지 않고 씬 오브젝트 생성
            this._touched = false;
            SceneManager.goto(Scene_Map);
            SoundManager.playCancel();
        }
    };

    Scene_LinearMenu.prototype.loadBitmap = function (x, y, w, h, index) {
        // 드로우 콜을 줄이기 위해 하나의 이미지만 사용
        const sprite = new Sprite(
            ImageManager.loadPicture(parameters['Menu Image'])
        );
        // eslint-disable-next-line no-unused-vars
        const H = parseInt(parameters.H, 10);
        sprite.setFrame(x, y, w, h);
        this.addChild(sprite);
        return sprite;
    };

    Scene_LinearMenu.prototype.createImage = function () {
        const { RECT } = RS.GraphicsMenu.Params;
        const W = parseInt(parameters.W, 10);
        const H = parseInt(parameters.H, 10);

        RS.GraphicsMenu.Params.startX = eval(parameters['Start X']);
        RS.GraphicsMenu.Params.startY = eval(parameters['Start Y']);

        this._rect = [];

        for (let i = 0; i < RECT.length; i++) {
            const imageRect = RECT[i];

            if (!imageRect) {
                continue;
            }
            this._rect[i] = this.loadBitmap(
                imageRect.x,
                0,
                imageRect.width,
                imageRect.height
            );
            this._rect[i].x = RS.GraphicsMenu.Params.startX + imageRect.x;
            this._rect[i].y = RS.GraphicsMenu.Params.startY + 0;
        }
        this.setRect(
            this._rect[Scene_LinearMenu.INDEX],
            Scene_LinearMenu.INDEX
        );
    };

    /**
     * @method setRect
     * @param {Object} rect
     * @param {Number} i
     */
    Scene_LinearMenu.prototype.setRect = function (rect, index) {
        const dRect = RS.GraphicsMenu.Params.RECT;
        const H = parseInt(parameters.H, 10);

        // 선택된 메뉴를 마우스 오버 상태의 이미지로 변경
        rect.setFrame(
            dRect[index].x,
            H,
            dRect[index].width,
            dRect[index].height
        );

        for (let i = 0; i < dRect.length; i++) {
            // 선택된 메뉴가 아니라면 모두 일반 이미지로 변경
            if (i === Scene_LinearMenu.INDEX) continue;
            this._rect[i].setFrame(
                dRect[i].x,
                0,
                dRect[i].width,
                dRect[i].height
            );
        }
    };

    //============================================================================
    // Scene_Map
    //============================================================================
    Scene_Map.prototype.callMenu = function () {
        SoundManager.playOk();
        SceneManager.push(Scene_LinearMenu);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    Game_Interpreter.prototype.command351 = function () {
        if (!$gameParty.inBattle()) {
            SceneManager.push(Scene_LinearMenu);
            Window_MenuCommand.initCommandPosition();
        }
        return true;
    };
})();
