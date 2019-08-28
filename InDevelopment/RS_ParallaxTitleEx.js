//================================================================
// RS_ParallaxTitleEx.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
// Change Log
//================================================================
// 2016.03.04 (v1.0.1) - Added the comments for include used files.
// 2016.11.21 (v1.0.2) - Fixed the bugs.
// 2016.11.21 (v1.0.3) : Added new features.
// - Removed the error that causes when using objects for older versions.
// - Correctly created the contents of the default sprite button
// by reading the elements in the command window and bound them.
// 2016.11.22 (v1.0.4) - Added backgrounds that have applied a parallax scrolling.
// 2016.11.22 (v1.0.5) - Optimized some code.
// 2019.08.28 (v1.0.7) : 
// - Added features for the new Plugin Manager in RPG Maker MV v1.5+
// - Update docs.
//================================================================
/*:
 * @plugindesc This plugin allows you to apply parallax scrolling feature to title screen<RS_ParallaxTitleEx>
 * @author biud436
 *
 * @param Parallax
 * @type struct<Position>[]
 * @desc 여러 이미지를 타이틀 배경에 설정할 수 있습니다.
 * @default ["{\"image\":\"BlueSky\",\"x\":\"0\",\"y\":\"0\",\"blend\":\"0\"}"]
 * 
 * @param TextAnimation
 * @desc 텍스트 애니메이션을 설정하세요.
 * @default Push
 * @type select
 * @option Push
 * @option Split
 *
 * @param Interval
 * @type number
 * @desc 버튼 사이의 거리 차이를 지정하세요
 * @default 80
 *
 * @param Menu Size
 * @type number
 * @desc 타이틀 커맨드의 버튼 갯수를 지정하세요
 * @default 3
 *
 * @param Angle Speed
 * @type number
 * @desc 타이틀 커맨드의 각속도를 지정하세요
 * @default 120.0
 * @decimals 1
 *
 * @param Text outline Color
 * @desc 텍스트 테두리 색상을 지정하세요
 * @default #6799FF
 *
 * @param Selected Color
 * @desc 버튼이 선택되어있을 때의 색상을 지정하세요
 * @default #6799FF
 *
 * @param Unselected Color
 * @desc 버튼이 선택되지 않았을 때의 색상을 지정하세요
 * @default #888888
 *
 * @param Circular Rotation
 * @type boolean
 * @desc 원형 회전으로 설정하려면 true로 설정하세요.
 * @default false
 *
 * @param X Offset
 * @desc 타이틀 커맨드가 생성될 좌표를 지정하세요.
 * @default this._commandWindow.width / 4
 *
 * @param Subtext
 * @desc 게임 제목 밑에 표시될 부제목을 입력하세요.
 * @default v1.0.0
 *
 * @param Font Family
 * @desc 타이틀 텍스트의 폰트를 설정하세요.
 * @default GameFont
 * 
 * @param No Save File Opacity
 * @type number
 * @desc 세이브 파일이 없을 때, 세이브 화면 불러오기 버튼의 투명도를 낮춥니다.
 * @default 64
 * 
 * @param Parallax Formula
 * @desc 더 멀리 있는 배경을 더 느리게 스크롤 하기 위해 사용하는 공식입니다.
 * @default ((Graphics.boxWidth) / idx) / ((Graphics.boxWidth) / (idx - 1));
 *
 * @help
 * 
 * 이 플러그인은 타이틀에 패러랠스 스크롤링을 적용하는 플러그인입니다.
 * 타이틀 이미지는 원경 img/parallaxes 폴더에 넣어두어야 합니다.
 * 
 * 타이틀 이미지를 2개 이상 사용할 때,
 * 스크롤 속도는 거리에 따라 다르게 지정됩니다.
 * 
 * 예를 들면, 더 멀리 있는 배경이 더 천천히 움직이게 됩니다.
 * 앞에 있는 배경은 뒷배경을 투영할 수 있게 투명성을 지니고 있어야 합니다.
 * 나무, 건물, 구름 등을 겹쳐 타이틀을 더 깊이감있게 표현할 수 있습니다.
 * 
 * 스크롤 속도는 다음과 같이 단순한 식으로 결정됩니다.
 * 
 * ((Graphics.boxWidth) / idx) / ((Graphics.boxWidth) / (idx - 1));
 * 
 * 쉽게 말하면 보는 사람으로부터 더 멀어질 수록 스크롤 속도가 느려지게 됩니다.
 * 이 값은 정확한 예측 값은 아니나, 멀리 있는 배경을 천천히 움직이게 하는 데에는 충분합니다.
 * 
 * =============================================================================
 * Installation
 * =============================================================================
 * Place a custom parallax image in img/parallax folder into your project folder.
 * and then you can specify its image in your Plugin Managers.
 * =============================================================================
 * Text Animation
 * =============================================================================
 * The main game text has two text annimations as follows.
 * - 'Push' animation that text becomes smaller and larger.
 * - 'Split' animation that the text grows in the horizontal direction and becomes smaller.
 * The default animation of them is same as 'Push' animation.
 */
/*~struct~Position:
 *
 * @param image
 * @desc
 * @default
 * @require 1
 * @dir img/parallaxes
 * @type file
 *
 * @param x
 * @type number
 * @desc
 * @default 0
 * 
 * @param y
 * @type number
 * @desc
 * @default 0
 * 
 * @param blend
 * @type select
 * @desc Set up the blend type.
 * @default 0
 * @option NORMAL
 * @value 0
 * @option ADD
 * @value 1
 * @option MULTIPLY
 * @value 2
 * @option SCREEN
 * @value 3
 * @option OVERLAY
 * @value 4
 * @option DARKEN
 * @value 5
 * @option LIGHTEN
 * @value 6
 * @option COLOR_DODGE
 * @value 7
 * @option COLOR_BURN
 * @value 8
 * @option HARD_LIGHT
 * @value 9
 * @option SOFT_LIGHT
 * @value 10
 * @option DIFFERENCE
 * @value 11
 * @option EXCLUSION
 * @value 12
 * @option HUE
 * @value 13
 * @option SATURATION
 * @value 14
 * @option COLOR
 * @value 15
 * @option LUMINOSITY
 * @value 16
 * @option NORMAL_NPM
 * @value 17
 * @option ADD_NPM
 * @value 18
 * @option SCREEN_NPM
 * @value 19
 */
/*:ko
 * @plugindesc <RS_ParallaxTitleEx>
 * @author biud436
 *
 * @param Parallax
 * @text 이미지 설정
 * @type struct<Position>[]
 * @desc 여러 이미지를 타이틀 배경에 설정할 수 있습니다.
 * @default ["{\"image\":\"BlueSky\",\"x\":\"0\",\"y\":\"0\",\"blend\":\"0\"}"]
 * 
 * @param TextAnimation
 * @text 텍스트 애니메이션
 * @desc 텍스트 애니메이션을 설정하세요.
 * @default Push
 * @type select
 * @option Push
 * @option Split
 *
 * @param Interval
 * @text 버튼 사이 거리
 * @type number
 * @desc 버튼 사이의 거리 차이를 지정하세요
 * @default 80
 *
 * @param Menu Size
 * @text 타이틀 커맨드 갯수
 * @type number
 * @desc 타이틀 커맨드의 버튼 갯수를 지정하세요
 * @default 3
 *
 * @param Angle Speed
 * @text 각 속도
 * @type number
 * @desc 타이틀 커맨드의 각속도를 지정하세요
 * @default 120.0
 * @decimals 1
 *
 * @param Text outline Color
 * @text 테두리 색상
 * @desc 텍스트 테두리 색상을 지정하세요
 * @default #6799FF
 *
 * @param Selected Color
 * @text 선택되어있을 때 색상
 * @desc 버튼이 선택되어있을 때의 색상을 지정하세요
 * @default #6799FF
 *
 * @param Unselected Color
 * @text 선택되지 않았을 때 색상
 * @desc 버튼이 선택되지 않았을 때의 색상을 지정하세요
 * @default #888888
 *
 * @param Circular Rotation
 * @text 원형 회전 여부
 * @type boolean
 * @desc 원형 회전으로 설정하려면 true로 설정하세요.
 * @default false
 *
 * @param X Offset
 * @text 타이틀 커맨드 오프셋
 * @desc 타이틀 커맨드가 생성될 좌표를 지정하세요.
 * @default this._commandWindow.width / 4
 *
 * @param Subtext
 * @text 부제목 설정
 * @desc 게임 제목 밑에 표시될 부제목을 입력하세요.
 * @default v1.0.0
 *
 * @param Font Family
 * @text 폰트 설정
 * @desc 타이틀 텍스트의 폰트를 설정하세요.
 * @default 나눔고딕
 * 
 * @param No Save File Opacity
 * @text 세이브 커맨드 투명도 설정
 * @type number
 * @desc 세이브 파일이 없을 때, 세이브 화면 불러오기 버튼의 투명도를 낮춥니다.
 * @default 64
 * 
 * @param Parallax Formula
 * @text 시차 공식
 * @desc 더 멀리 있는 배경을 더 느리게 스크롤 하기 위해 사용하는 공식입니다.
 * @default ((Graphics.boxWidth) / idx) / ((Graphics.boxWidth) / (idx - 1));
 *
 * @help
 * 이 플러그인은 타이틀에 패러랠스 스크롤링을 적용하는 플러그인입니다.
 * 타이틀 이미지는 원경 img/parallaxes 폴더에 넣어두어야 합니다.
 * 
 * 타이틀 이미지를 2개 이상 사용할 때,
 * 스크롤 속도는 거리에 따라 다르게 지정됩니다.
 * 
 * 예를 들면, 더 멀리 있는 배경이 더 천천히 움직이게 됩니다.
 * 앞에 있는 배경은 뒷배경을 투영할 수 있게 투명성을 지니고 있어야 합니다.
 * 나무, 건물, 구름 등을 겹쳐 타이틀을 더 깊이감있게 표현할 수 있습니다.
 * 
 * 스크롤 속도는 다음과 같이 단순한 식으로 결정됩니다.
 * 
 * ((Graphics.boxWidth) / idx) / ((Graphics.boxWidth) / (idx - 1));
 * 
 * 쉽게 말하면 보는 사람으로부터 더 멀어질 수록 스크롤 속도가 느려지게 됩니다.
 * 이 값은 정확한 예측 값은 아니나, 멀리 있는 배경을 천천히 움직이게 하는 데에는 충분합니다.
 * 
 */
/*~struct~Position:ko
 *
 * @param image
 * @text 이미지
 * @desc
 * @default
 * @require 1
 * @dir img/parallaxes
 * @type file
 *
 * @param x
 * @type number
 * @desc
 * @default 0
 * 
 * @param y
 * @type number
 * @desc
 * @default 0
 * 
 * @param blend
 * @text 블렌드 타입
 * @type select
 * @desc Set up the blend type.
 * @default 0
 * @option NORMAL
 * @value 0
 * @option ADD
 * @value 1
 * @option MULTIPLY
 * @value 2
 * @option SCREEN
 * @value 3
 * @option OVERLAY
 * @value 4
 * @option DARKEN
 * @value 5
 * @option LIGHTEN
 * @value 6
 * @option COLOR_DODGE
 * @value 7
 * @option COLOR_BURN
 * @value 8
 * @option HARD_LIGHT
 * @value 9
 * @option SOFT_LIGHT
 * @value 10
 * @option DIFFERENCE
 * @value 11
 * @option EXCLUSION
 * @value 12
 * @option HUE
 * @value 13
 * @option SATURATION
 * @value 14
 * @option COLOR
 * @value 15
 * @option LUMINOSITY
 * @value 16
 * @option NORMAL_NPM
 * @value 17
 * @option ADD_NPM
 * @value 18
 * @option SCREEN_NPM
 * @value 19
 */

var Imported = Imported || {};
Imported.RS_ParallaxTitleEx = true;

var RS = RS || {};
RS.ParallaxTitleEx = RS.ParallaxTitleEx || {};
RS.ParallaxTitleEx.Params = RS.ParallaxTitleEx.Params || {};
RS.Utils = RS.Utils || {};

(function($) {

  "use strict";

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ParallaxTitleEx>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;    

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

  $.parallaxImage = []
  $.maxParallaxImages = 0;  

  (function() {
    try {
      $.parallaxImage = $.jsonParse(parameters["Parallax"]);
      if(typeof($.parallaxImage) === "object" && 
        Array.isArray($.parallaxImage)) {
          $.maxParallaxImages = $.parallaxImage.length;
      }
    } catch (error) {
      throw new Error("Failed to parse!");
    }
  })();

  $.textType = parameters['TextAnimation'] || 'Push';
  $._x = null;
  $._y = null;
  $._dist = Number(parameters['Interval'] || 80);
  $._menuSize = Number(parameters['Menu Size'] || 3);
  $._maxAngle =  360.0 / $._menuSize;
  $._angleSpeed = parseFloat(parameters['Angle Speed'] || 120.0);
  $._outLineColor = String(parameters['Text outline Color'] || '#6799FF');
  $.selectedColor = parameters['Selected Color'] || '#6799FF';
  $.unselectedColor = parameters['Unselected Color'] || '#888888';
  $.saveCmdOpacity = Number(parameters["No Save File Opacity"] || 64);

  $.fontFamily = parameters['Font Family'] || 'Arial';

  $.parallaxFormula = parameters["Parallax Formula"];

  $.defaultTextStyle = {
    fontFamily: $.fontFamily,
    fontStyle: 'normal',
    align: 'center',
    fontSize : 72,
    // Color
    fill : '#FFFFFF',
    // A number that represents the thickness of the stroke.
    strokeThickness : 0,
    // Shadow effect
    dropShadow : true,
    // Shadow color
    dropShadowColor : '#000000',
    // Shadow angle
    dropShadowAngle : Math.PI / 6,
    // Distance to shadow
    dropShadowDistance : 3,
    // Text wrap
    wordWrap : true,
    // width of the text wrap (wrapping the width automatically)
    wordWrapWidth : 576,
    textBaseline: 'alphabetic'
  };

  $.subtext = {
    text: parameters['Subtext'] || 'v1.0.0',
    fontSize: 24,
    dropShadow: true,
    fill: [$.unselectedColor,'#FFFFFF'],
    align: 'right'
  };

  $.touchPoint = new PIXI.Point();

  $.isCircularRotation = Boolean(parameters['Circular Rotation'] === 'true');
  $.xPadding = parameters['X Offset'] || 'this._commandWindow.width / 4';

  // Find the position with parallax.

  $.parallaxPos = [];

  //============================================================================
  // RS.Utils
  //
  //

  RS.Utils.convertToRadian = function(angle) {
    return (Math.PI / 180) * angle;
  };

  // This prevents the angular value from increasing continuously.
  RS.Utils.wrapMax = function(angle) {
    while(angle > 360.0) { angle -= 360.0; }
    while(angle < -360.0) { angle += 360.0; }
    return angle;
  };

// This prevents the angular value from increasing continuously.
  RS.Utils.wrapAngle = function(angle) {
    while(angle > 180.0) { angle -= 360.0; }
    while(angle < -180.0) { angle += 360.0; }
    return angle;
  };

  //============================================================================
  // Array
  //
  //

  Array.prototype.max = function() {
    return this.slice(0).sort().reverse()[0];
  };

  Array.prototype.min = function() {
    return this.slice(0).sort()[0];
  };

  //============================================================================
  // Scene_Title
  //
  //

  var alias_Scene_Title_start = Scene_Title.prototype.start;
  Scene_Title.prototype.start = function() {
    alias_Scene_Title_start.call(this);
    this.initSpriteParameter();
    this.initTouchParameter();
    if(!DataManager.isAnySavefileExists()) this._texts[1].opacity = $.saveCmdOpacity;
  };

  var alias_Scene_Title_update = Scene_Title.prototype.update;
  Scene_Title.prototype.update = function() {
    this.updateSprite();
    this.updateTouchInput();
    this.updateKeyboardCheck();
    this.updateParallaxBackground();
    alias_Scene_Title_update.call(this);
  };

  var alias_Scene_Title_terminate = Scene_Title.prototype.terminate;
  Scene_Title.prototype.terminate = function () {
    if(alias_Scene_Title_terminate) alias_Scene_Title_terminate.call(this);
    // When there is already a title scene in the scene stack, this will remove the TilingSprite.
    for (var i = 0; i < $.maxParallaxImages; i++) {
      if(this._parallax[i]) this.removeChild(this._parallax[i]);
    }
  };

  Scene_Title.prototype.createForeground = function() {

    if (!$dataSystem.optDrawTitle) return;

    var style = $.defaultTextStyle;

    var textStyle1 = new PIXI.TextStyle(style);
    var textStyle2 = new PIXI.TextStyle(style);
    textStyle2.fontSize = $.subtext.fontSize;
    textStyle2.dropShadow = $.subtext.dropShadow;
    textStyle2.fill = $.subtext.fill;
    textStyle2.align = $.subtext.align;

    this._gameTitleSprite = new PIXI.Text($dataSystem.gameTitle, textStyle1);
    this._gameTitleSprite.addChild( new PIXI.Text('\n' + $.subtext.text, textStyle2) );
    this.addChild(this._gameTitleSprite);

    this.drawGameTitle();

  };

  Scene_Title.prototype.drawGameTitle = function() {

    // Set text initial position
    this._gameTitleSprite.x = Graphics.width / 2;
    this._gameTitleSprite.y = Graphics.height / 4;

    // Center of text origin
    this._gameTitleSprite.anchor.x = 0.5;
    this._gameTitleSprite.anchor.y = 0.5;

    // Initial value
    var power = 0;
    var scroll = 0.01;

    // Distort the text every frame.
    this._gameTitleSprite.update = function() {

      // Limit amplitude.
      if(power >= 1) {
        scroll = -scroll;
      } else if (power < 0) {
        scroll = -scroll;
      }

      // Calculate the frequency.
      power += scroll;

      // Distort the text by distortion type such as 'Push' and 'Split' types.
      this.scale.x = Math.sin(power);
      this.scale.y = ($.textType === "Push") ? Math.sin(power) : Math.cos(power);

      // Rotate the text.
      if(this.rotation <= Math.PI * 2) this.rotation += (2 * Math.PI ) / 90;

      // Update child objects.
      if(this.children) {
        this.children.forEach(function (e) {
          if(e.update) e.update();
        }, this);
      }

    };

  };

  Scene_Title.prototype.createBackground = function() {

    this._parallax = [];

    // Create tiling sprite
    this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));

    // It is a fixed window frame.
    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));

    // Add to game screen.
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);

    for (var i = 0; i < $.maxParallaxImages; i++) {
      this._parallax[i] = new TilingSprite();
      this._parallax[i].bitmap = ImageManager.loadParallax($.parallaxImage[i].image);
      this._parallax[i].move($.parallaxImage[i].x, $.parallaxImage[i].y, Graphics.boxWidth, Graphics.boxHeight);
      this._parallax[i].blendMode = $.parallaxImage[i].blend || PIXI.BLEND_MODES.NORMAL;
      this.addChild(this._parallax[i]);
    }

  };

  Scene_Title.prototype.getParallaxSpeed = function (idx) {
    return eval($.parallaxFormula);
  };

  Scene_Title.prototype.updateParallaxBackground = function () {
    var speed = [];
    if(Math.abs(this._parallaxSpeed) > 10000) this._parallaxSpeed = 0;
    this._parallaxSpeed -= 1.5;

    for (var i = 0; i < $.maxParallaxImages; i++) {
      if(i === 0) {
        speed[0] = this._parallaxSpeed * this.getParallaxSpeed(2);
        this._parallax[0].origin.x = speed[0];
      } else {
        speed[i] = this._parallax[i - 1].origin.x * this.getParallaxSpeed(i + 2);
        this._parallax[i].origin.x = speed[i];
      }
    }

  };

  Scene_Title.prototype.initSpriteParameter = function() {
    $._x = Graphics.width / 2 + eval($.xPadding);
    $._y = Graphics.height / 2 + $._dist;
    this._max = 1;
    this._rotateLeft = false;
    this._rotateRight = false;
    this._isGameStarted = false;
    this._originPosition = [$._x, $._y];
    this._r = 3;
    this._angle = 0.0;
    this._parallaxSpeed = 0;
  };

  Scene_Title.prototype.initTouchParameter = function() {
    this._firstPos = 0;
    this._lastPos = 0;
    this._touch_velocity = false;
  };

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

  Scene_Title.prototype.updateKeyboardCheck = function() {

    this._wheelBegin = TouchInput.isPressed() && TouchInput.wheelY;

    // Key press check and mouse wheel detection.
    this.left(Input.isTriggered("left") || (TouchInput.wheelY - this._wheelBegin) < 0  );
    this.right(Input.isTriggered("right") || (TouchInput.wheelY - this._wheelBegin) > 0 );

    // When the decision key is pressed
    // if( Input.isTriggered("ok") || TouchInput.isTriggered() ) {
    if( Input.isTriggered("ok") ) {
      this.selectMenu();
    }

    this._wheelBegin = TouchInput.isPressed() && TouchInput.wheelY;

  };

  Scene_Title.prototype.isCheckDir = function(dir) {

    // Should the button rotate left?
    var isLeft = !this._rotateRight && this._rotateLeft;

    // Converts angles to radians.
    var radian = RS.Utils.convertToRadian(this._max);

    // Should the button rotate right?
    var isRight = this._rotateRight && !this._rotateLeft;

    // Set the result to null.
    var result = null;

    // Check the direction and maximum angle.
    return result = {
      'left': isLeft && (this._angle > radian),
      'right': isRight && (this._angle < radian)
    }[dir] && true;

  };

  Scene_Title.prototype.updateSprite = function() {

    if(!this._textCreated) return false;

    // Check the direction of rotation.
    if(this.isCheckDir('left')) {

      RS.Utils.wrapAngle( this._angle -= this.upAngle() );

    } else if(this.isCheckDir('right')) {

      RS.Utils.wrapAngle( this._angle += this.upAngle() );

    }

    // Moves the menu.
    this.moveMenu();

    // Change the scale of all graphic objects.
    this.updateScale();

  };

  var _alias_startFadeOut = Scene_Title.prototype.startFadeOut;
  Scene_Title.prototype.startFadeOut = function (duration, white) {
    _alias_startFadeOut.apply(this, arguments);
    this._texts.forEach(function (e) {
      e.opacity = 0;
    });
  };

  Scene_Title.prototype.updateScale = function() {
    var t = (Date.now() % 1000 / 1000);
    var a = 1.0;
    var b = 1.5;
    var d = a + t * (b - a);
    var e = b + t * (a - b);
    var p = d + t * (e - d);

    // Sort from near top
    var l = this.getTopItem();

    // Search the entire button.
    l.forEach( function(i) {

      // If the index value equals zero?
      if(l.indexOf(i) === 0) {

        // Increase size.
        i.scale.set(p, p);
        if(i.children[0]) i.children[0].style.fill = [$.selectedColor,'#FFFFFF'];

      } else {

        // Set the original size.
        i.scale.set(1.0, 1.0);
        if(i.children[0]) i.children[0].style.fill = [$.unselectedColor,'#FFFFFF'];

      }
    }, this);

  };

  Scene_Title.prototype.getTopItem = function() {
    var list = this._texts.slice(0);
    list.sort(function(a, b) { return a.y - b.y });
    return list;
  };

  Scene_Title.prototype.selectMenu = function() {

    // If the button has already been pressed.
    if(this._isGameStarted) return false;

    // Return menu index.
    var i = this.menuIndex();

    var self = this._commandWindow;

    var symbol = self.commandSymbol(i);
    if(symbol !== 'continue') {
      if(self._handlers[symbol]) {
        // Plays the OK sound.
        SoundManager.playOk();
        self._handlers[symbol]();
      }
    } else {
      if(self.isContinueEnabled()) {
        // Plays the OK sound.
        SoundManager.playOk();
        if(self._handlers[symbol]) self._handlers[symbol]();
      } else {
        SoundManager.playBuzzer();
      }
    }
  };

  Scene_Title.prototype.left= function(wrap) {

    if(wrap) {
      // Plays the cursor sound.
      SoundManager.playCursor();

      this._rotateLeft = true;
      this._rotateRight = false;

      // Check the range of angles.
      RS.Utils.wrapMax(this._max -= $._maxAngle);

    }

  };

  Scene_Title.prototype.right = function(wrap) {

    if(wrap) {

      // Plays the cursor sound.
      SoundManager.playCursor();

      this._rotateLeft = false;
      this._rotateRight = true;

      // Check the range of angles.
      RS.Utils.wrapMax(this._max += $._maxAngle);

    }

  };

  Scene_Title.prototype.upAngle = function() {
    return (2 * Math.PI ) / $._angleSpeed;
  };

  Scene_Title.prototype.moveMenu = function() {
    // Returns the angle of the command window (parent)
    var parentRate = Math.atan2(this._commandWindow.y, this._commandWindow.x) * (180 / Math.PI);
    var angle = 0;
    for (var i = 0; i < this._listLength; i++) {
      angle = Math.cos( (Math.PI / 2) * i );
      if(Math.abs(angle) === 1) {
        angle *= 90;
      } else {
        angle = 0;
      }
      this.move(this._texts[i], // sprite
        this._r + $._dist, // r
        this._angle + RS.Utils.convertToRadian(parentRate * angle) // angle
      );
    }
  };

  Scene_Title.prototype.menuIndex = function() {
    // If the element is not found, it returns the minimum value of the array.
    // TODO: Is it better to use the sort function?
    var n = this.spriteDistance();
    return this._texts.indexOf(n.min());
  };

  Scene_Title.prototype.spriteDistance = function() {
    var list = this._texts.slice(0);
    list.sort(function (a, b) {
      return a.y - b.y;
    });
    return list;
  };

  Scene_Title.prototype.move = function(sprite, r, angle) {
    if(!sprite) return;
    var xDirAngle = Math.sin(angle);
    if($.isCircularRotation) xDirAngle = Math.cos(angle);
    var x = ( this._originPosition[0] ) + r * xDirAngle - sprite.width / 2;
    var y = ( this._originPosition[1] ) + r * Math.sin(angle) - sprite.height / 2;
    sprite.x = x;
    sprite.y = y;
  };

  Scene_Title.prototype.makeSprite = function(list) {
    this._texts = [];
    this._listLength = parseInt(list.length);
    this._lists = list;
    $._menuSize = this._listLength;
    $._maxAngle =  360.0 / $._menuSize;
    list.forEach(function (e, i, a) {
      this._texts.push(this.makeText(list[i]));
    }, this);

    // This flag indicates that the text was successfully created.
    this._textCreated = true;

  };

  Scene_Title.prototype.makeText = function(str) {

    // Create sprite button
    var text = new Sprite_Button();
    var textStyle = new PIXI.TextStyle($.defaultTextStyle);
    textStyle.fontSize = 32;
    textStyle.strokeThickness = 1;
    textStyle.stroke = $._outLineColor;
    textStyle.fill = ['#888888','#FFFFFF'];

    var bmt = new PIXI.Text(str.name, textStyle);
    var self = this._commandWindow;

    text.setColdFrame(0, 0, bmt.width, bmt.height);
    text.setHotFrame(0, 0, bmt.width, bmt.height);
    text.setClickHandler(function () {

      var symbol = str.symbol;
      if(symbol !== 'continue') {
        if(self._handlers[symbol]) {
          // Plays the OK sound.
          SoundManager.playOk();
          self._handlers[symbol]();
        }
      } else {
        if(self.isContinueEnabled()) {
          // Plays the OK sound.
          SoundManager.playOk();
          if(self._handlers[symbol]) self._handlers[symbol]();
        } else {
          SoundManager.playBuzzer();
        }
      }

    });

    // Add text to the screen
    text.addChild(bmt);
    this.addChild(text);

    // Return a text object.
    return text;

  };

  var _alias_createCommandWindow = Scene_Title.prototype.createCommandWindow;
   Scene_Title.prototype.createCommandWindow = function() {
    _alias_createCommandWindow.call(this);
    this._commandWindow.x = (Graphics.width - this._commandWindow.width) - 20;
    this._commandWindow.opacity = 0;
    this._commandWindow.contentsOpacity = 0;
    this._commandWindow.active = false;
    this.makeSprite(JsonEx.makeDeepCopy(this._commandWindow._list));
  };

})(RS.ParallaxTitleEx.Params);
