
//==============================================================================
// RS_GraphicsMenu.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_GraphicsMenu = true;

/*:
 *
 * @plugindesc <RS_GraphicsMenu>
 * @author biud436
 *
 * @param Menu Image
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc 사용 할 메뉴 이미지를 선택하세요
 * @default inter
 *
 * @param Starting Position
 *
 * @param Start X
 * @parent Starting Position
 * @type string
 * @desc 메뉴 이미지의 시작 위치 X 값을 설정하세요
 * @default Graphics.boxWidth / 2 - ((W * 5) / 2)
 *
 * @param Start Y
 * @parent Starting Position
 * @type string
 * @desc 메뉴 이미지의 시작 위치 Y 값을 설정하세요
 * @default Graphics.boxHeight / 2 - H / 2
 *
 * @param Rect
 *
 * @param W
 * @type number
 * @desc 버튼의 크기를 픽셀 단위로 설정하세요.
 * (Include the macro string called 'W' and then it replaces as a real value.)
 * @default 78
 * @min 1
 *
 * @param H
 * @type number
 * @desc 버튼의 크기를 픽셀 단위로 설정하세요.
 * (Include the macro string called 'H' and then it replaces as a real value.)
 * @default 78
 * @min 1
 *
 * @param Menu Rect
 * @parent Rect
 * @type struct<MenuRect>[]
 * @desc 메뉴 영역을 설정하세요
 * @default ["{\"x\":\"0\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"78\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"156\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"234\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"312\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}"]
 *
 * @param Menu Index
 * @type string[]
 * @desc Scene 함수(클래스)의 이름를 정확하게 입력하세요
 * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
 *
 * @help
 * =============================================================================
 * Version Log
 * -----------------------------------------------------------------------------
 * 2017.07.10 (v0.0.1) - 테스트 중
 */

/*~struct~MenuRect:
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

 /*:ko
  *
  * @plugindesc <RS_GraphicsMenu>
  * @author biud436
  *
  * @param Menu Image
  * @type file
  * @dir img/pictures/
  * @require 1
  * @desc 사용 할 메뉴 이미지를 선택하세요
  * @default inter
  *
  * @param Starting Position
  *
  * @param Start X
  * @parent Starting Position
  * @type string
  * @desc 메뉴 이미지의 시작 위치 X 값을 설정하세요
  * @default Graphics.boxWidth / 2 - ((W * 5) / 2)
  *
  * @param Start Y
  * @parent Starting Position
  * @type string
  * @desc 메뉴 이미지의 시작 위치 Y 값을 설정하세요
  * @default Graphics.boxHeight / 2 - H / 2
  *
  * @param Rect
  *
  * @param W
  * @type number
  * @desc 버튼의 크기를 픽셀 단위로 설정하세요.
  * (Include the macro string called 'W' and then it replaces as a real value.)
  * @default 78
  * @min 1
  *
  * @param H
  * @type number
  * @desc 버튼의 크기를 픽셀 단위로 설정하세요.
  * (Include the macro string called 'H' and then it replaces as a real value.)
  * @default 78
  * @min 1
  *
  * @param Menu Rect
  * @parent Rect
  * @type struct<MenuRect>[]
  * @desc 메뉴 영역을 설정하세요
  * @default ["{\"x\":\"0\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"78\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"156\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"234\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"312\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}"]
  *
  * @param Menu Index
  * @type string[]
  * @desc Scene 함수(클래스)의 이름를 정확하게 입력하세요
  * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
  *
  * @help
  * =============================================================================
  * Version Log
  * -----------------------------------------------------------------------------
  * 2017.07.10 (v0.0.1) - 테스트 중
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

function Sprite_MenuCommand() {
  this.initialize.apply(this, arguments);
};


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
    $gameSystem.menuMouseX = x;
    $gameSystem.menuMouseY = y;
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
    Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX + 1).mod(5);
    SoundManager.playCursor();
  };

  Scene_LinearMenu.prototype.left = function () {
    // %를 사용하면 계산 오류가 있어서 mod로 변경
    Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX - 1).mod(5);
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

    // 버튼의 크기
    var W = parseInt(parameters['W']);
    var H = parseInt(parameters['H']);

    // 시작 위치
    var x = RS.GraphicsMenu.Params.startX;
    var y = RS.GraphicsMenu.Params.startY;

    // 전체 메뉴 패널의 크기
    var width = Math.floor(W * 5);
    var height = H;

    // 마우스 좌표
    var mx = $gameSystem.menuMouseX;
    var my = $gameSystem.menuMouseY;

    // 인덱스 값 : (마우스 좌표 - 메뉴 시작 위치) / 메뉴의 폭
    var index = Math.floor( (mx - x) / W );

    if(mx > x && my > y && mx < (x + width) && my < (y + height)) {
      Scene_LinearMenu.INDEX = index.clamp(0, 4);
      if(TouchInput.isTriggered()) this.selectScene();
    }

  };

  Scene_LinearMenu.prototype.selectScene = function () {
    var sceneObject = RS.GraphicsMenu.Params.MENU[Scene_LinearMenu.INDEX];
    if(typeof window[sceneObject] === 'function') {
      // push : 현재 메뉴 씬을 메뉴 스택에 누적
      SceneManager.push(window[sceneObject]);
      SoundManager.playOk();
    }
  };

  Scene_LinearMenu.prototype.processExit = function () {
    if(Scene_Map.prototype.isMenuCalled.call(this)) {
      // goto : 메뉴 스택에 누적하지 않고 씬 오브젝트 생성
      SceneManager.goto(Scene_Map);
      SoundManager.playCancel();
    }
  };

  Scene_LinearMenu.prototype.loadBitmap = function (x, y, w, h, index) {
    // 드로우 콜을 줄이기 위해 하나의 이미지만 사용
    var sprite = new Sprite(ImageManager.loadPicture(parameters['Menu Image']), index);
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

})();
