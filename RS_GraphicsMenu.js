
//==============================================================================
// RS_GraphicsMenu.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_GraphicsMenu = true;

/*:
 *
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
  *
  * @plugindesc 이 플러그인은 메뉴를 그래픽으로 표시합니다<RS_GraphicsMenu>
  * @author biud436
  *
  * @param Menu Image
  * @text 메뉴 이미지
  * @type file
  * @dir img/pictures/
  * @require 1
  * @desc 사용 할 메뉴 이미지를 선택하세요
  * @default inter
  *
  * @param Starting Position
  * @text 시작 위치
  *
  * @param Start X
  * @text 시작 X
  * @parent Starting Position
  * @type string
  * @desc 메뉴 이미지의 시작 위치 X 값을 설정하세요
  * @default Graphics.boxWidth / 2 - ((W * RECT.length) / 2)
  *
  * @param Start Y
  * @text 시작 Y
  * @parent Starting Position
  * @type string
  * @desc 메뉴 이미지의 시작 위치 Y 값을 설정하세요
  * @default Graphics.boxHeight / 2 - H / 2
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
  * @type note[]
  * @desc Scene 함수(클래스)의 이름를 정확하게 입력하세요.
  * :exit라고 적으면 게임을 즉각 종료할 수 있습니다.
  * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
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
  * 2017.07.11 (v1.0.0) - 공개
  * 2017.12.19 (v1.0.1) - 게임 종료 기능 추가
  * 2017.12.29 (v1.0.2) - 메뉴 버튼이 6개 이상일 때, 5개까지만 선택되는 버그 수정
  * 2018.01.29 (v1.0.3) - 스크립트 실행 기능 추가
  * 2018.11.16 (v1.0.4) - 메뉴 화면 열기 기능으로도 열 수 있습니다.
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

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_GraphicsMenu>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  RS.GraphicsMenu.Params.RECT = RS.Utils.jsonParse(parameters['Menu Rect']);
  RS.GraphicsMenu.Params.MENU = RS.Utils.jsonParse(parameters['Menu Index']);

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    // 세이브 데이터에 저장을 하기 위해 여기에 변수를 정의했습니다.
    this._menuMouseX = 0;
    this._menuMouseY = 0;
  };

  Object.defineProperties(Game_System.prototype, {
    // 마우스 X 좌표
    menuMouseX: {
      get: function() {
          return this._menuMouseX;
      },
      set: function(value) {
          this._menuMouseX = value;
      },
      configurable: true
    },
    // 마우스 Y 좌표
    menuMouseY: {
      get: function() {
          return this._menuMouseY;
      },
      set: function(value) {
          this._menuMouseY = value;
      },
      configurable: true
    }
  });

  //============================================================================
  // TouchInput
  //============================================================================

  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    // 마우스의 움직임이 감지되면 마우스 좌표를 업데이트 합니다
    // 일반 마우스 좌표는 업데이트를 하지 않으므로 호환성을 위해 그대로 두었습니다
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if($gameSystem) {
      $gameSystem.menuMouseX = x;
      $gameSystem.menuMouseY = y;
    }
  };

  //============================================================================
  // Scene_LinearMenu
  //============================================================================

  function Scene_LinearMenu() {
    this.initialize.apply(this, arguments);
  };

  Scene_LinearMenu.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_LinearMenu.prototype.constructor = Scene_LinearMenu;

  // Static 변수...
  Scene_LinearMenu.INDEX = 0;

  Scene_LinearMenu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._touched = false;
    this.createImage();
  };

  Scene_LinearMenu.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);
  };

  Scene_LinearMenu.prototype.createHelpWindow = function () {
  };

  Scene_LinearMenu.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
  };

  Scene_LinearMenu.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    this.updateIndex();
    this.processExit();
  };

  Scene_LinearMenu.prototype.right = function () {
    var RECT = RS.GraphicsMenu.Params.RECT;
    Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX + 1).mod(RECT.length);
    SoundManager.playCursor();
  };

  Scene_LinearMenu.prototype.left = function () {
    var RECT = RS.GraphicsMenu.Params.RECT;
    Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX - 1).mod(RECT.length);
    SoundManager.playCursor();
  };

  Scene_LinearMenu.prototype.updateIndex = function () {

    // 키 체크
    if(Input.isTriggered('right')) {
      this.right();
    }
    if(Input.isTriggered('left')) {
      this.left();
    }
    if(Input.isTriggered('ok')) {
      this.selectScene();
    }

    // 마우스 및 터치
    this.isSelectedInTouchInput();

    // 현재 인덱스에 맞는 영역으로 재설정한다.
    this.setRect(this._rect[Scene_LinearMenu.INDEX], Scene_LinearMenu.INDEX);

  };

  Scene_LinearMenu.prototype.isSelectedInTouchInput = function () {

    var menu = RS.GraphicsMenu.Params.MENU;
    if(!menu) return;

    var W = parseInt(parameters['W']);
    var H = parseInt(parameters['H']);
    var x = RS.GraphicsMenu.Params.startX;
    var y = RS.GraphicsMenu.Params.startY;
    var width = Math.floor(W * menu.length);
    var height = H;
    var mx = $gameSystem.menuMouseX || 0;
    var my = $gameSystem.menuMouseY || 0;

    // 인덱스 값 : (마우스 좌표 - 메뉴 시작 위치) / 메뉴의 폭
    var index = Math.floor( (mx - x) / W );
    var previousIndex = Scene_LinearMenu.INDEX;

    // 범위 내에 있는 지 확인
    if(mx > x && my > y && mx < (x + width) && my < (y + height)) {
      Scene_LinearMenu.INDEX = index.clamp(0, menu.length - 1);
      if(TouchInput.isTriggered()) this.selectScene();
    }

    // 커서 사운드 재생
    if(previousIndex !== Scene_LinearMenu.INDEX && !this._touched) {
      SoundManager.playCursor();
      this._touched = true;
    } else {
      this._touched = false;
    }

  };

  Scene_LinearMenu.prototype.selectScene = function () {
    var sceneObject = RS.GraphicsMenu.Params.MENU[Scene_LinearMenu.INDEX];
    var self = this;
    if(sceneObject.endsWith(':exit')) {
      setTimeout(function () {
        self._touched = false;
        SoundManager.playOk();
        SceneManager.exit();
      }, 0);
      return;
    }
    if(sceneObject.match(/(?:EVAL[ ]*:[ ]*)(.*)/i)) {
      try {
        this._touched = false;
        eval(RegExp.$1);
        SoundManager.playOk();
      } catch(e) {
        console.warn(e);
      }
    }
    if(typeof window[sceneObject] === 'function') {
      // push : 현재 메뉴 씬을 메뉴 스택에 누적
      this._touched = false;
      SceneManager.push(window[sceneObject]);
      SoundManager.playOk();
    }
  };

  Scene_LinearMenu.prototype.processExit = function () {
    if(Scene_Map.prototype.isMenuCalled.call(this)) {
      // goto : 메뉴 스택에 누적하지 않고 씬 오브젝트 생성
      this._touched = false;
      SceneManager.goto(Scene_Map);
      SoundManager.playCancel();
    }
  };

  Scene_LinearMenu.prototype.loadBitmap = function (x, y, w, h, index) {
    // 드로우 콜을 줄이기 위해 하나의 이미지만 사용
    var sprite = new Sprite(ImageManager.loadPicture(parameters['Menu Image']));
    var H = parseInt(parameters['H']);
    sprite.setFrame(x, y, w, h);
    this.addChild(sprite);
    return sprite;
  };

  Scene_LinearMenu.prototype.createImage = function () {
    var RECT = RS.GraphicsMenu.Params.RECT;
    var W = parseInt(parameters['W']);
    var H = parseInt(parameters['H']);

    RS.GraphicsMenu.Params.startX = eval(parameters['Start X']);
    RS.GraphicsMenu.Params.startY = eval(parameters['Start Y']);

    this._rect = [];

    for (var i = 0; i < RECT.length; i++) {
      var imageRect = RECT[i];
      if(!imageRect) continue;
      this._rect[i] = this.loadBitmap(imageRect.x, 0, imageRect.width, imageRect.height);
      this._rect[i].x = RS.GraphicsMenu.Params.startX + imageRect.x;
      this._rect[i].y = RS.GraphicsMenu.Params.startY + 0;
    }
    this.setRect(this._rect[Scene_LinearMenu.INDEX], Scene_LinearMenu.INDEX);
  };

  /**
   * @method setRect
   * @param {Object} rect
   * @param {Number} i
   */
  Scene_LinearMenu.prototype.setRect = function (rect, index) {
    var dRect = RS.GraphicsMenu.Params.RECT;
    var H = 78;

    // 선택된 메뉴를 마우스 오버 상태의 이미지로 변경
    rect.setFrame(dRect[index].x, H, dRect[index].width, dRect[index].height);

    for (var i = 0; i < dRect.length; i++) {

      // 선택된 메뉴가 아니라면 모두 일반 이미지로 변경
      if(i === Scene_LinearMenu.INDEX) continue;
      this._rect[i].setFrame(dRect[i].x, 0, dRect[i].width, dRect[i].height);

    }

  };

  //============================================================================
  // Scene_Map
  //============================================================================
  Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_LinearMenu);
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
  };

  Game_Interpreter.prototype.command351 = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_LinearMenu);
        Window_MenuCommand.initCommandPosition();
    }
    return true;
  };


})();
