/*:
 * RS_ParallaxTitleEx.js
 * @plugindesc This plugin changes the title screen image.
 * @author biud436
 *
 * @param parallaxImage
 * @desc parallax Image
 * @default BlueSky
 * @require 1
 * @dir img/parallaxes
 * @type file
 *
 * @param TextAnimation
 * @desc Push, Split
 * @default Push
 *
 * @param Interval
 * @desc Interval
 * @default 80
 *
 * @param Menu Size
 * @desc Menu Size
 * @default 3
 *
 * @param Angle Speed
 * @desc Angle Speed
 * @default 120.0
 *
 * @param Text outline Color
 * @desc Text outline Color
 * @default #6799FF
 *
 * @param Text Tone
 * @desc Text Tone
 * @default  0xD9FF80
 *
 * @param Game Start
 * @desc Game Start
 * @default  Game Start
 *
 * @param Game Load
 * @desc Game Load
 * @default  Game Load
 *
 * @param Game Exit
 * @desc Game Exit
 * @default  Game Exit
 *
 * @help
 *
 * [Text Animation]
 *
 * - Push
 * 텍스트가 전체적으로 작아졌다가 커집니다.
 *
 * - Split
 * 텍스트가 좌우로 커졌다가 작아집니다.
 *
 * -Change Log
 * 2016.03.04(v1.0.1) - Added the comments for include used files.
 *
 */

var Imported = Imported || {};
Imported.RS_ParallaxTitleEx = true;

/**
 * RS.Utils
 * @namespace RS
 */
var RS = RS || {};

(function() {

  /**
   * @static
   * @memberof RS
   */
  RS.Utils = {
    /**
     * 라디안 단위로 변경하는 함수
     * @method wrapMax
     * @return {Number}
     */
    convertToRadian : function(angle) {
      return (Math.PI / 180) * angle;
    },
    /**
     * 각도 범위 제한 함수
     * @method wrapMax
     * @param angle {Number}
     * @return angle {Number}
     */
    wrapMax : function(angle) {
      while(angle > 360.0) { angle -= 360.0; }
      while(angle < -360.0) { angle += 360.0; }
      return angle;
    },
    /**
     * 각도 범위 제한 함수
     * @method wrapMax
     * @param angle {Number}
     * @return angle {Number}
     */
    wrapAngle : function(angle) {
      while(angle > 180.0) { angle -= 360.0; }
      while(angle < -180.0) { angle += 360.0; }
      return angle;
    }
  };

  /**
   * Array.prototype.max
   * @method max
   * @return {Array}
   */
  Array.prototype.max = function() {
    return this.slice(0).sort().reverse()[0];
  };
  /**
   * Array.prototype.min
   * @method min
   * @return {Array}
   */
  Array.prototype.min = function() {
    return this.slice(0).sort()[0];
  };

})();


(function() {

  /**
   * 플러그인 매니저에서 변수값을 가져와 설정하는 부분
   * @private
   */
  var parameters = PluginManager.parameters('RS_ParallaxTitleEx');
  var parallaxImage = (parameters['parallaxImage'] || 'BlueSky');
  var textType = parameters['TextAnimation'] || 'Push';
  var szExit = String(parameters['Game Exit'] || "Game Exit");
  var _x = null;
  var _y = null;
  var _dist = Number(parameters['Interval'] || 80);
  var _menuSize = Number(parameters['Menu Size'] || 3);
  var _maxAngle =  360.0 / _menuSize;
  var _angleSpeed = parseFloat(parameters['Angle Speed'] || 120.0);
  var _pi = Math.PI;
  var _outLineColor = String(parameters['Text outline Color'] || '#6799FF');
  var _tintColor = parseInt(parameters['Text Tone'] || 0xD9FF80);
  var _gameStart = String(parameters['Game Start'] || "Game Start");
  var _gameContinue = String(parameters['Game Load'] || "Game Load");
  var _gameOptions = String(parameters['Game Exit'] || "Game Exit");

  /**
   * 배경화면 생성
   * @override
   * @method createForeground
   */
  Scene_Title.prototype.createForeground = function() {

    var style = {
      font : 'normal 72px Arial',
      // 색상
      fill : '#FFFFFF',
      // 테두리 크기
      strokeThickness : 0,
      // 그림자 효과
      dropShadow : true,
      // 그림자 색상
      dropShadowColor : '#000000',
      // 그림자 각도
      dropShadowAngle : Math.PI / 6,
      // 그림자와의 거리
      dropShadowDistance : 3,
      // 텍스트 wrap
      wordWrap : true,
      // 텍스트 wrap 의 폭 (폭을 넘기면 글자 자동 개행)
      wordWrapWidth : 400,
      textBaseline: 'alphabetic',
    };
    // 텍스트 생성
    this._gameTitleSprite = new PIXI.Text($dataSystem.gameTitle, style);
    // 화면에 텍스트 추가
    this.addChild(this._gameTitleSprite);

    if ($dataSystem.optDrawTitle) {
      this.drawGameTitle();
    }

  };

  /**
   * 게임제목 텍스트 생성
   * @override
   * @method drawGameTitle
   */
  Scene_Title.prototype.drawGameTitle = function() {

    // 텍스트 초기 위치 설정
    this._gameTitleSprite.x = Graphics.width / 2;
    this._gameTitleSprite.y = Graphics.height / 4;

    // 텍스트 원점 중앙
    this._gameTitleSprite.anchor.x = 0.5;
    this._gameTitleSprite.anchor.y = 0.5;

    // 초기값
    var power = 0;
    var scroll = 0.01;

    // 매 프레임마다 텍스트 왜곡 처리
    this._gameTitleSprite.update = function() {

      // 진폭 제한
      if(power >= 1) {
        scroll = -scroll;
      } else if (power < 0) {
        scroll = -scroll;
      }

      // 진폭 주기 측정을 위한 변수
      power += scroll;

      // 텍스트 왜곡 처리
      this.scale.x =Math.sin(power);
      this.scale.y = textType.contains("Push") ? Math.sin(power) : Math.cos(power);

      // 텍스트 회전 처리
      if(this.rotation <= Math.PI * 2) {
        this.rotation += (2 * Math.PI ) / 90;
      }

    };

  };

  /**
   * 배경화면 생성
   * @override
   * @method createBackground
   */
  Scene_Title.prototype.createBackground = function() {
    // 타일링 스프라이트 생성
    this._backSprite1 = new TilingSprite(ImageManager.loadParallax(parallaxImage));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));

    // 영역 설정
    this._backSprite1.move(0,0,Graphics.boxWidth,Graphics.boxHeight);

    // 타일링 스프라이트 업데이트 함수 재정의
    var _backSprite1_update = this._backSprite1.update;
    this._backSprite1.update = function() {
      _backSprite1_update.call(this);
      // 매프레임마다 오른쪽으로 이동
      this.origin.x--;
    };

    // 게임 화면에 추가
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
  };

  /**
   * 커맨드 리스트 생성
   * @override
   * @method makeCommandList
   */
  Window_TitleCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.newGame,   'newGame');
    this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
    this.addCommand(szExit,   'exit');
  };

  /**
   * 커맨드 윈도우 생성 함수
   * @override
   * @method createCommandWindow
   */
  Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
    this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
    this._commandWindow.setHandler('exit',  this.commandExit.bind(this));
    this.addWindow(this._commandWindow);
  };

  /**
   * Game Exit 커맨드
   * @method commandExit
   */
  Scene_Title.prototype.commandExit = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    window.close();
  };

  /**
   * 타이틀 시작 처리
   * @alias start
   */
  var _alias_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    _alias_start.call(this);
    // 매개변수 초기화
    this.initSpriteParameter();
    // 터치 매개변수 초기화
    this.initTouchParameter();
    // 스프라이트 생성
    this.makeSprite();
    // 세이브 파일 유무 확인
    if(!DataManager.isAnySavefileExists()) {
      this.text2.opacity = 128;
    }
  };

  /**
   * 멤버 초기화
   * @method initSpriteParameter
   */
  Scene_Title.prototype.initSpriteParameter = function() {
    _x = Graphics.width / 2;
    _y = Graphics.height / 2 + _dist;
    this._max = 1;
    this._rotateLeft = false;
    this._rotateRight = false;
    this._isGameStarted = false;
    this._originPosition = [_x, _y];
    this._r = 3;
    this._angle = 0.0;
  };

  /**
   * 터치 멤버 초기화
   * @method initTouchParameter
   */
  Scene_Title.prototype.initTouchParameter = function() {
    // 드래그 모션 체크 용 변수 초기화
    this._firstPos = 0;
    this._lastPos = 0;
    this._touch_velocity = false;
  };

  /**
   * 드래그 모션 체크
   * @method updateTouchInput
   */
  Scene_Title.prototype.updateTouchInput = function() {
    if(TouchInput.isTriggered() && !this._touch_velocity) {
      this._firstPos = TouchInput.x;
      this._touch_velocity = true;
    } else  if(TouchInput.isReleased() && this._touch_velocity) {
      this._lastPos = TouchInput.x;
      this._velocity = this._lastPos - this._firstPos;
      this._velocity < 0 ? this.left(true) : this.right(true);
      this._touch_velocity = false;
    }
  };

  /**
   * 키보드 체크
   * @method updateKeyboardCheck
   */
  Scene_Title.prototype.updateKeyboardCheck = function() {

    // 왼쪽 버튼을 눌렀을 때
    this.left(Input.isTriggered("left"));

    // 오른쪽 버튼을 눌렀을 때
    this.right(Input.isTriggered("right") );

    // 결정키를 눌렀을 때
    if( Input.isTriggered("ok") || TouchInput.isCancelled() ) {
      this.selectMenu();
    }
  };

  /**
   * 업데이트
   * @alias update
   */
  var _alias_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function() {
    this.updateSprite();
    this.updateTouchInput();
    this.updateKeyboardCheck();
    _alias_update.call(this);
  };

  /**
   * 방향 체크
   * @method isCheckDir
   * @param dir {String}
   * @return {Boolean}
   */
  Scene_Title.prototype.isCheckDir = function(dir) {

    var isLeft = !this._rotateRight && this._rotateLeft
    var radian = RS.Utils.convertToRadian(this._max)
    var isRight = this._rotateRight && !this._rotateLeft
    var result = null;

    return result = {
       'left': isLeft && (this._angle > radian)
     , 'right': isRight && (this._angle < radian)
    }[dir] && true;

  };

  /**
   * 스프라이트 업데이트
   * @method updateSprite
   */
  Scene_Title.prototype.updateSprite = function() {

    // 텍스트가 생성되지 않았다면
    if(!this._textCreated) {

      return false;

    }

    // 왼쪽으로 돌릴 수 있는가?
    if(this.isCheckDir('left')) {

      RS.Utils.wrapAngle(this._angle -= this.upAngle());

    // 오른쪽으로 돌릴 수 있는가?
    } else if(this.isCheckDir('right')) {

      RS.Utils.wrapAngle(this._angle += this.upAngle());

    }

    // 메뉴 이동 처리
    this.moveMenu();

    // 크기 변경
    this.updateScale();
  };

  /**
   * 메뉴 페이드아웃 처리
   * @alias startFadeOut
   * @param duration {Number}
   * @param white {Boolean}
   */
  var _alias_startFadeOut = Scene_Title.prototype.startFadeOut;
  Scene_Title.prototype.startFadeOut = function (duration, white) {
    _alias_startFadeOut.apply(this, arguments);
    this.text1.opacity = 0;
    this.text2.opacity = 0;
    this.text3.opacity = 0;
  };

  /**
   * 크기 확대
   * @method updateScale
   */
  Scene_Title.prototype.updateScale = function() {

    // 위에서 가까운 순서대로 정렬
    var l = this.getTopItem();

    // 버튼 전체 탐색
    l.forEach( function(i) {
      // 인덱스값이 0 과 같다면
      if(l.indexOf(i) === 0) {
        // 크기 확대
        i.scale.set(1.3,1.3);
        // 색조 변경
        i.tint = _tintColor;
      } else {
        // 원래 크기로
        i.scale.set(1.0,1.0);
        // 원래 색조로
        i.tint = 0xFFFFFF;
      }
    }, this);

  };

  /**
   * y 값을 기준으로 정렬
   * @method getTopItem
   * @return {Array}
   */
  Scene_Title.prototype.getTopItem = function() {
    var list = [this.text1, this.text2, this.text3];
    list.sort( function(a, b) { return Math.floor(a.y) - Math.floor(b.y) });
    return list;
  };

  /**
   * 메뉴 선택 처리
   * @method selectMenu
   */
  Scene_Title.prototype.selectMenu = function() {

    // 버튼이 이미 눌렸다면
    if(this._isGameStarted) {
      return false;
    }

    // 메뉴 인덱스
    var i = this.menuIndex();
    var result = null;

    // Ok 사운드 재생
    SoundManager.playOk();

    result = {
      // Game Start 처리
      0: function() {
            this.commandNewGame();
            // Game Start 처리
            this._isGameStarted = true;
      },
      // 게임 로드 처리
      1: function() {
          if(DataManager.isAnySavefileExists()) {
            this.commandContinue();
          }
      },
      // Game Exit 처리
      2: function() {
          this.commandExit();
        }
    }[i].call(this);

  };

  /**
   *
   * @method left
   * @param wrap {Boolean}
   */
  Scene_Title.prototype.left= function(wrap) {

    if(wrap) {
      // 커서 사운드 재생
      SoundManager.playCursor();

      this._rotateLeft = true;
      this._rotateRight = false;

      // 각도 범위 확인
      RS.Utils.wrapMax(this._max -= _maxAngle);

    }

  };

  /**
   *
   * @method right
   * @param wrap {Boolean}
   */
  Scene_Title.prototype.right = function(wrap) {

    if(wrap) {
      // 커서 사운드 재생
      SoundManager.playCursor();

      this._rotateLeft = false;
      this._rotateRight = true;

      // 각도 범위 확인
      RS.Utils.wrapMax(this._max +=_maxAngle);

    }

  };

  /**
   *
   * @method upAngle
   * @return {Number}
   */
  Scene_Title.prototype.upAngle = function() {
    // 각도 증가
    return (2 * Math.PI ) / _angleSpeed;
  };

  /**
   *
   * @method moveMenu
   */
  Scene_Title.prototype.moveMenu = function() {
    // 메뉴 이동 처리
    this.move(this.text1, this._r + _dist, this._angle + 180);
    this.move(this.text2, this._r + _dist, this._angle);
    this.move(this.text3, this._r + _dist, this._angle + 90);
  };

  /**
   * 메뉴 인덱스값 반환
   * @method menuIndex
   * @return {Number}
   */
  Scene_Title.prototype.menuIndex = function() {
    var n = this.spriteDistance();
    return n.indexOf(n.min());
  };

  /**
   * 원점과의 거리 측정
   * @method spriteDistance
   * @return {Array}
   */
  Scene_Title.prototype.spriteDistance = function() {
    var a = this.text1.position.y - this._originPosition[1];
    var b = this.text2.position.y - this._originPosition[1];
    var c = this.text3.position.y - this._originPosition[1];
    var result = [a,b,c];
    return result;
  };

  /**
   * 메뉴 이동 처리
   * @method move
   * @param sprite {Sprite}
   * @param r {Number}
   * @param r {angle}
   */
  Scene_Title.prototype.move = function(sprite, r, angle) {
    var x = ( this._originPosition[0] )+ r * Math.sin(angle) - sprite.width / 2;
    var y = ( this._originPosition[1] ) + r * Math.sin(angle) - sprite.height / 2;
    sprite.position.x = x;
    sprite.position.y = y;
  };

  /**
   * 텍스트 객체 생성
   * @method makeSprite
   */
  Scene_Title.prototype.makeSprite = function() {
    this.text1 = this.makeText(_gameStart);
    this.text2 = this.makeText(_gameContinue);
    this.text3 = this.makeText(_gameOptions);
    this._textCreated = true;
  };

  /**
   * 텍스트 객체 생성
   * @method makeText
   * @param str {String}
   */
  Scene_Title.prototype.makeText = function(str) {

    // 스프라이트 버튼 생성
    var text = new Sprite_Button();

    // 텍스트 묘화 및 스타일 설정
    text.bitmap = new Bitmap(120, 72);
    text.bitmap.outlineWidth = 1;
    text.bitmap.fontSize = 24;
    text.bitmap.outlineColor = _outLineColor;
    text.bitmap.drawText(String(str), 0, 0, 120, 72);
    text.setClickHandler(this.selectMenu.bind(this));

    // 화면에 텍스트 추가
    this.addChild(text);

    // 텍스트 객체 반환
    return text;
  };

  /**
   * 커맨드 윈도우 비활성화 처리
   * @alias createCommandWindow
   */
  var _alias_createCommandWindow = Scene_Title.prototype.createCommandWindow;
   Scene_Title.prototype.createCommandWindow = function() {
    _alias_createCommandWindow.call(this);
    this._commandWindow.x = (Graphics.width - this._commandWindow.width) - 20;
    this._commandWindow.opacity = 0;
    this._commandWindow.contentsOpacity = 0;
    this._commandWindow.active = false;
  };

})();
