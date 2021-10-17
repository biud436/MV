//================================================================
// RS_GraphicsMenu.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

var Imported = Imported || {};
Imported.RS_GraphicsMenu = true;

/*:
 * @target MZ
 * @plugindesc This plugin allows you to indicate the menu as an image <RS_GraphicsMenu>
 * @author biud436
 * @url https://biud436.tistory.com
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
 * @default Graphics.width / 2 - ((W * RECT.length) / 2)
 *
 * @param Start Y
 * @parent Starting Position
 * @type string
 * @desc Set up the starting y-position of the menu panel
 * @default Graphics.height / 2 - H / 2
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
 * @type multiline_string[]
 * @desc Specify the name of Scene constructor.
 * (you can exit the game when setting the text as :exit)
 * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
 *
 * @param Menu Before Eval
 * @type multiline_string
 * @desc Specify the evaluate code block.
 * @default
 *
 * @param Menu After Eval
 * @type multiline_string
 * @desc Specify the evaluate code block.
 * @default
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
 *  RS.GraphicsMenu.Params.startX = Graphics.width / 2 - ((W * menu.length) / 2)
 *  RS.GraphicsMenu.Params.startY = Graphics.height / 2 - H / 2
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
 * 2020.09.01 (v2.0.0) : First Release for MZ.
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

/*:ko
 * @target MZ
 * @plugindesc 이 플러그인은 메뉴를 그래픽으로 표시합니다<RS_GraphicsMenu>
 * @author biud436
 * @url biud436.tistory.com
 *
 * @param Menu Image
 * @text 메뉴 이미지
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc 사용 할 메뉴 이미지를 선택하세요
 * @default inter_alpha
 *
 * @param Starting Position
 * @text 시작 위치
 *
 * @param Start X
 * @text 시작 X
 * @parent Starting Position
 * @type string
 * @desc 메뉴 이미지의 시작 위치 X 값을 설정하세요
 * @default Graphics.width / 2 - ((W * RECT.length) / 2)
 *
 * @param Start Y
 * @text 시작 Y
 * @parent Starting Position
 * @type string
 * @desc 메뉴 이미지의 시작 위치 Y 값을 설정하세요
 * @default Graphics.height / 2 - H / 2
 *
 * @param W
 * @text 버튼의 가로 크기
 * @type number
 * @desc 버튼의 크기를 픽셀 단위로 설정하세요.
 * @default 78
 * @min 1
 *
 * @param H
 * @text 버튼의 세로 크기
 * @type number
 * @desc 버튼의 크기를 픽셀 단위로 설정하세요.
 * @default 78
 * @min 1
 *
 * @param Rect
 * @text 영역
 *
 * @param Menu Rect
 * @text 메뉴 영역
 * @parent Rect
 * @type struct<MenuRect>[]
 * @desc 메뉴 영역을 설정하세요
 * @default ["{\"x\":\"0\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"78\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"156\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"234\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"312\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}"]
 *
 * @param Menu Index
 * @text 메뉴 인덱스
 * @type multiline_string[]
 * @desc Scene 함수(클래스)의 이름를 정확하게 입력하세요.
 * :exit라고 적으면 게임을 즉각 종료할 수 있습니다.
 * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
 *
 * @param Menu Before Eval
 * @type multiline_string
 * @desc 메뉴 시작 전에 실행할 스크립트를 지정하세요.
 * @default
 *
 * @param Menu After Eval
 * @type multiline_string
 * @desc 메뉴가 종료된 이후 실행할 스크립트를 지정하세요.
 * @default
 *
 * @help
 * =============================================================================
 * 사용법
 * -----------------------------------------------------------------------------
 * 메뉴 인덱스 값에 씬 이름 대신 :exit가 설정되어있으면, 메뉴 씬을 종료하는 기능을
 * 넣을 수 있습니다.
 *
 * 이외에도 EVAL 구문으로 자바스크립트를 실행할 수 있습니다.
 *
 * EVAL : x
 *
 * 문법은 위와 같습니다.
 *
 * =============================================================================
 * 크레딧 (이미지)
 * -----------------------------------------------------------------------------
 * 포함된 리소스의 원작자는 다음과 같습니다 (메뉴 이미지) :
 *
 *  numg94 - http://blog.naver.com/numg94
 *
 * =============================================================================
 * Version Log
 * -----------------------------------------------------------------------------
 * 2020.09.01 (v2.0.0) : MZ 버전으로 변환
 */

/*~struct~MenuRect:ko
 *
 * @param x
 * @type number
 * @decimals 0
 * @desc X좌표를 입력하세요
 * @default 0
 * @min 0
 *
 * @param y
 * @type number[]
 * @desc 첫 번 째 인덱스에는 'Y좌표', 두 번 째 인덱스에는 버튼이 눌렸을 때의 Y좌표
 * @default ["0","78"]
 *
 * @param width
 * @type number
 * @desc 버튼의 폭
 * @default 78
 * @min 1
 *
 * @param height
 * @type number
 * @desc 버튼의 높이
 * @default 78
 * @min 1
 *
 */

var RS = RS || {};
RS.GraphicsMenu = RS.GraphicsMenu || {};
RS.GraphicsMenu.Params = RS.GraphicsMenu.Params || {};
RS.Utils = RS.Utils || {};

(() => {
    "use strict";

    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_GraphicsMenu>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    RS.Utils.jsonParse = function (str) {
        let retData = JSON.parse(str, function (k, v) {
            try {
                return RS.Utils.jsonParse(v);
            } catch (e) {
                return v;
            }
        });
        return retData;
    };

    RS.GraphicsMenu.Params.RECT = RS.Utils.jsonParse(parameters["Menu Rect"]);
    RS.GraphicsMenu.Params.MENU = RS.Utils.jsonParse(parameters["Menu Index"]);

    RS.GraphicsMenu.Params.isValidGameCoreUpdate = false;

    RS.GraphicsMenu.Params.menuBeforeEval = parameters["Menu Before Eval"];
    RS.GraphicsMenu.Params.menuAfterEval = parameters["Menu After Eval"];

    //============================================================================
    // Game_System
    //============================================================================

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        alias_Game_System_initialize.call(this);
        // 세이브 데이터에 저장을 하기 위해 여기에 변수를 정의했습니다.
        this._menuMouseX = 0;
        this._menuMouseY = 0;
    };

    Object.defineProperties(Game_System.prototype, {
        // 마우스 X 좌표
        menuMouseX: {
            get: function () {
                return this._menuMouseX;
            },
            set: function (value) {
                this._menuMouseX = value;
            },
            configurable: true,
        },
        // 마우스 Y 좌표
        menuMouseY: {
            get: function () {
                return this._menuMouseY;
            },
            set: function (value) {
                this._menuMouseY = value;
            },
            configurable: true,
        },
    });

    //============================================================================
    // TouchInput
    //============================================================================

    const alias_TouchInput_onHover = TouchInput._onHover;
    TouchInput._onHover = function (x, y) {
        alias_TouchInput_onHover.call(this, x, y);
        if ($gameSystem) {
            $gameSystem.menuMouseX = x;
            $gameSystem.menuMouseY = y;
        }
    };

    //============================================================================
    // Scene_LinearMenu
    //============================================================================

    class Scene_GraphicsMenu extends Scene_MenuBase {
        create() {
            super.create();

            this._touched = false;
            this.executeBeforeEval();
            this.createImage();
        }

        /**
         * YEP_BattleEngine의 Lunatic Mode와 같은 기능으로 메뉴 시작전에 스크립트를 실행합니다.
         */
        executeBeforeEval() {
            try {
                eval(RS.GraphicsMenu.Params.menuBeforeEval);
            } catch (e) {
                console.warn(e);
            }
        }

        needsCancelButton() {
            return false;
        }

        createHelpWindow() {}

        terminate() {
            eval(RS.GraphicsMenu.Params.menuAfterEval);
            super.terminate();
        }

        update() {
            super.update();
            this.updateIndex();
            this.processExit();
        }

        right() {
            const RECT = RS.GraphicsMenu.Params.RECT;
            Scene_GraphicsMenu.INDEX = (Scene_GraphicsMenu.INDEX + 1).mod(
                RECT.length
            );
            SoundManager.playCursor();
        }

        left() {
            const RECT = RS.GraphicsMenu.Params.RECT;
            Scene_GraphicsMenu.INDEX = (Scene_GraphicsMenu.INDEX - 1).mod(
                RECT.length
            );
            SoundManager.playCursor();
        }

        updateIndex() {
            // 키 체크
            if (Input.isTriggered("right")) {
                this.right();
            }
            if (Input.isTriggered("left")) {
                this.left();
            }
            if (Input.isTriggered("ok")) {
                this.selectScene();
            }

            // 마우스 및 터치
            this.isSelectedInTouchInput();

            // 현재 인덱스에 맞는 영역으로 재설정한다.
            this.setRect(
                this._rect[Scene_GraphicsMenu.INDEX],
                Scene_GraphicsMenu.INDEX
            );
        }

        isSelectedInTouchInput() {
            const menu = RS.GraphicsMenu.Params.MENU;
            if (!menu) return;

            const W = parseInt(parameters["W"]);
            const H = parseInt(parameters["H"]);
            const x = RS.GraphicsMenu.Params.startX;
            const y = RS.GraphicsMenu.Params.startY;
            const width = Math.floor(W * menu.length);
            const height = H;
            const mx = $gameSystem.menuMouseX || 0;
            const my = $gameSystem.menuMouseY || 0;

            // 인덱스 값 : (마우스 좌표 - 메뉴 시작 위치) / 메뉴의 폭
            const index = Math.floor((mx - x) / W);
            const previousIndex = Scene_GraphicsMenu.INDEX;

            // 범위 내에 있는 지 확인
            if (mx > x && my > y && mx < x + width && my < y + height) {
                Scene_GraphicsMenu.INDEX = index.clamp(0, menu.length - 1);
                if (TouchInput.isTriggered()) this.selectScene();
            }

            // 커서 사운드 재생
            if (previousIndex !== Scene_GraphicsMenu.INDEX && !this._touched) {
                SoundManager.playCursor();
                this._touched = true;
            } else {
                this._touched = false;
            }
        }

        selectScene() {
            const sceneObject =
                RS.GraphicsMenu.Params.MENU[Scene_GraphicsMenu.INDEX];

            if (sceneObject.endsWith(":exit")) {
                setTimeout(() => {
                    this._touched = false;
                    SoundManager.playOk();
                    SceneManager.exit();
                }, 0);

                return;
            }
            if (
                sceneObject
                    .replace(/[\n]+/, ";")
                    .match(/(?:EVAL[ ]*:[ ]*)(.*)/im)
            ) {
                try {
                    this._touched = false;
                    eval(RegExp.$1);
                    SoundManager.playOk();
                } catch (e) {
                    console.warn(e);
                }
            }
            if (typeof window[sceneObject] === "function") {
                // push : 현재 메뉴 씬을 메뉴 스택에 누적
                this._touched = false;
                SceneManager.push(window[sceneObject]);
                SoundManager.playOk();
            }
        }

        processExit() {
            if (Scene_Map.prototype.isMenuCalled.call(this)) {
                // goto : 메뉴 스택에 누적하지 않고 씬 오브젝트 생성
                this._touched = false;
                SceneManager.goto(Scene_Map);
                SoundManager.playCancel();
            }
        }

        loadBitmap(x, y, w, h, index) {
            // 드로우 콜을 줄이기 위해 하나의 이미지만 사용
            const sprite = new Sprite(
                ImageManager.loadPicture(parameters["Menu Image"])
            );
            sprite.setFrame(x, y, w, h);
            this.addChild(sprite);
            return sprite;
        }

        createImage() {
            const RECT = RS.GraphicsMenu.Params.RECT;
            var W = parseInt(parameters["W"]);
            var H = parseInt(parameters["H"]);

            RS.GraphicsMenu.Params.startX = eval(parameters["Start X"]);
            RS.GraphicsMenu.Params.startY = eval(parameters["Start Y"]);

            this._rect = [];

            for (let i = 0; i < RECT.length; i++) {
                const imageRect = RECT[i];
                if (!imageRect) continue;
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
                this._rect[Scene_GraphicsMenu.INDEX],
                Scene_GraphicsMenu.INDEX
            );
        }

        /**
         * @method setRect
         * @param {Object} rect
         * @param {Number} i
         */
        setRect(rect, index) {
            const dRect = RS.GraphicsMenu.Params.RECT;
            const H = parseInt(parameters["H"]);

            // 선택된 메뉴를 마우스 오버 상태의 이미지로 변경
            rect.setFrame(
                dRect[index].x,
                H,
                dRect[index].width,
                dRect[index].height
            );

            for (let i = 0; i < dRect.length; i++) {
                // 선택된 메뉴가 아니라면 모두 일반 이미지로 변경
                if (i === Scene_GraphicsMenu.INDEX) continue;
                this._rect[i].setFrame(
                    dRect[i].x,
                    0,
                    dRect[i].width,
                    dRect[i].height
                );
            }
        }
    }

    Scene_GraphicsMenu.INDEX = 0;

    //============================================================================
    // Scene_Map
    //============================================================================
    Scene_Map.prototype.callMenu = function () {
        SoundManager.playOk();
        SceneManager.push(Scene_GraphicsMenu);
        $gameTemp.clearDestination();
        this._mapNameWindow.hide();
        this._waitCount = 2;
    };

    Game_Interpreter.prototype.command351 = function () {
        if (!$gameParty.inBattle()) {
            SceneManager.push(Scene_GraphicsMenu);
            Window_MenuCommand.initCommandPosition();
        }
        return true;
    };
})();
