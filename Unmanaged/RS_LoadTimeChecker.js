//================================================================
// RS_LoadTimeChecker.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to check the time that has passed since last save. <RS_LoadTimeChecker>
 * @author biud436
 *
 * @param Text Option
 *
 * @param Day
 * @parent Text Option
 * @desc Specify the 'Day' text to show up on the screen.
 * @default 일
 *
 * @param Hours
 * @parent Text Option
 * @desc Specify the 'Hours' text to show up on the screen.
 * @default 시간
 *
 * @param Minutes
 * @parent Text Option
 * @desc Specify the 'Minutes' text to show up on the screen.
 * @default 분
 *
 * @param Seconds
 * @parent Text Option
 * @desc Specify the 'Seconds' text to show up on the screen.
 * @default 초
 *
 * @param Description Text
 * @parent Text Option
 * @desc Specify the description text to show up on the screen.
 * @default 만에 게임으로 돌아오셨습니다.
 *
 * @param Hide Time
 * @parent Text Option
 * @type number
 * @desc Specify the hide seconds.
 * @default 6
 *
 * @param Position
 *
 * @param X
 * @parent Position
 * @desc Change the x-coordinate of bitmap text.
 * (This is evaluated the javascript)
 * @default 0
 *
 * @param Y
 * @parent Position
 * @desc Change the y-coordinate of bitmap text.
 * (This is evaluated the javascript)
 * @default 0
 *
 * @param Font Option
 *
 * @param Font Face
 * @parent Font Option
 * @desc Specify the font face.
 * @default GameFont
 *
 * @param Font Size
 * @parent Font Option
 * @type number
 * @desc Specify the font size.
 * @default 28
 *
 * @param Text Color
 * @parent Font Option
 * @desc Specify the text color.
 * @default #ffffff
 *
 * @param Outline Color
 * @parent Font Option
 * @desc Specify the outline color.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Outline Width
 * @parent Font Option
 * @type number
 * @desc Specify the outline width.
 * @default 4
 *
 * @param Text Align
 * @parent Font Option
 * @type select
 * @desc Specify the text alignment.
 * @default center
 * @option left
 * @value left
 * @option cetner
 * @value center
 * @option right
 * @value right
 *
 * @param Bitmap Width
 * @parent Font Option
 * @desc Specify the bitmap width.
 * (This is evaluated the javascript)
 * @default Graphics.boxWidth
 *
 * @param Bitmap Height
 * @parent Font Option
 * @desc Specify the bitmap height.
 * (This is evaluated the javascript)
 * @default 64
 *
 * @param Reward Option
 *
 * @param Code Injection
 * @parent Reward Option
 * @type note
 * @desc Can evaluate a javascript code using day, hours, mins, seconds variables.
 * @default "// if(day >= 1) {\n//   $gameParty.gainGold(1000 * day);\n// }\n// if(hours >= 1) {\n//   $gameParty.gainGold(200 * hours);\n// }\n// if(mins >= 30) {\n//   $gameParty.gainGold(100 * mins);\n// }\n// if(seconds >= 45) {\n//   $gameParty.gainGold(50 * seconds);\n// }"
 *
 * @help
 * ========================================================
 * Introduction
 * ========================================================
 * This plugin allows you to check the time that has passed since last save
 * and drawing its time text on the screen when loading the map.
 *
 * The text for time will be gone after a period of time
 * and then you can put the code in a preset points and evaluate it.
 *
 * You can be also accessed a lot of local variables such as day, hours, mins, seconds.
 * and can give an user some rewards like as item, gold.
 *
 * ========================================================
 * Change Log
 * ========================================================
 * 2019.07.13 (v1.0.0) - First Release.
 * 2019.07.14 (v1.0.1) :
 * - Fixed the bug. Now every 24 hours by default, the day variable will increase.
 */
/*:ko
 * @plugindesc 세이브 파일을 로드할 때, 마지막 세이브 시간으로부터 현실 시간이 얼마나 지났나 확인하여 화면에 표시합니다. <RS_LoadTimeChecker>
 * @author 러닝은빛(biud436)
 *
 * @param Text Option
 * @text 텍스트 옵션
 *
 * @param Day
 * @text 일
 * @parent Text Option
 * @desc 시간 단위에서 '일(日)'을 어떻게 표시합니까?
 * @default 일
 *
 * @param Hours
 * @text 시간
 * @parent Text Option
 * @desc 시간 단위에서 '시간' 단위를 화면에 어떻게 표시할 것인지를 설정합니다.
 * @default 시간
 *
 * @param Minutes
 * @text 분
 * @parent Text Option
 * @desc 시간 단위에서 '분' 단위를 화면에 어떻게 표시할 것인지를 설정합니다.
 * @default 분
 *
 * @param Seconds
 * @text 초
 * @parent Text Option
 * @desc 시간 단위에서 '초' 단위를 화면에 어떻게 표시할 것인지를 설정합니다.
 * @default 초
 *
 * @param Description Text
 * @text 알림 텍스트
 * @parent Text Option
 * @desc 시간 알림과 함께 표시 할 텍스트를 지정하세요.
 * @default 만에 게임으로 돌아오셨습니다.
 *
 * @param Hide Time
 * @text 숨김 시간
 * @parent Text Option
 * @type number
 * @desc 시간 알림 이후, 텍스트가 화면에서 사라질 때 까지의 시간을 초 단위로 지정하세요.
 * @default 6
 *
 * @param Position
 * @text 위치
 *
 * @param X
 * @text X 좌표
 * @parent Position
 * @desc X 좌표를 지정하십시오.
 * (자바스크립트로 취급됩니다)
 * @default 0
 *
 * @param Y
 * @text Y 좌표
 * @parent Position
 * @desc Y 좌표를 지정하십시오.
 * (자바스크립트로 취급됩니다)
 * @default 0
 *
 * @param Font Option
 * @text 폰트 옵션
 *
 * @param Font Face
 * @text 폰트 설정
 * @parent Font Option
 * @desc 폰트를 설정하십시오.
 * @default 나눔고딕, Dotum, AppleGothic, sans-serif
 *
 * @param Font Size
 * @text 폰트 크기
 * @parent Font Option
 * @type number
 * @desc 폰트 크기를 지정하세요.
 * @default 28
 *
 * @param Text Color
 * @text 텍스트 색상
 * @parent Font Option
 * @desc 텍스트 색상을 설정하세요.
 * @default #ffffff
 *
 * @param Outline Color
 * @text 테두리 색상
 * @parent Font Option
 * @desc 테두리 색상을 설정할 수 있습니다.
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param Outline Width
 * @text 테두리 굵기
 * @parent Font Option
 * @type number
 * @desc 테두리 굵기를 변경할 수 있습니다.
 * @default 4
 *
 * @param Text Align
 * @text 텍스트 정렬
 * @parent Font Option
 * @type select
 * @desc 텍스트 정렬 옵션을 설정할 수 있습니다. 기본 값은 중앙입니다.
 * @default center
 * @option 왼쪽
 * @value left
 * @option 가운데
 * @value center
 * @option 오른쪽
 * @value right
 *
 * @param Bitmap Width
 * @text 비트맵 가로 길이
 * @parent Font Option
 * @desc 비트맵의 가로 길이를 설정할 수 있습니다.
 * (자바스크립트로 취급됩니다)
 * @default Graphics.boxWidth
 *
 * @param Bitmap Height
 * @text 비트맵 높이
 * @parent Font Option
 * @desc 비트맵의 높이를 설정할 수 있습니다.
 * (자바스크립트로 취급됩니다)
 * @default 64
 *
 * @param Reward Option
 * @text 보상 옵션
 *
 * @param Code Injection
 * @text 코드 삽입
 * @parent Reward Option
 * @type note
 * @desc day, hours, mins, seconds 와 같은 시간 변수를 활용하여 코드를 작성해 보상을 지급할 수 있습니다.
 * @default "// if(day >= 1) {\n//   $gameParty.gainGold(1000 * day);\n// }\n// if(hours >= 1) {\n//   $gameParty.gainGold(200 * hours);\n// }\n// if(mins >= 30) {\n//   $gameParty.gainGold(100 * mins);\n// }\n// if(seconds >= 45) {\n//   $gameParty.gainGold(50 * seconds);\n// }"
 *
 * @help
 * ========================================================
 * 소개
 * ========================================================
 * 이 플러그인을 사용하면 화면에 지난 세이브 파일로부터 지난 시간을 텍스트로 표시하고,
 * 시간에 따라 아이템이나 금전 같은 일정한 보상을 지급할 수 있습니다.
 *
 * 보상은 플러그인에 따로 정해져있지 않으며 코드를 작성하셔야 합니다.
 * 작성된 코드는 사전에 지정한 위치에 삽입됩니다.
 *
 * 따라서 day, hours, mins, seconds 지역 변수에 접근할 수 있고,
 * 이를 통해 다양한 보상을 할 수 있습니다.
 *
 * ========================================================
 * 버전 로그
 * ========================================================
 * 2019.07.13 (v1.0.0) - First Release.
 * 2019.07.14 (v1.0.1) :
 * - Fixed the bug. Now every 24 hours by default, the day variable will increase.
 */

var Imported = Imported || {};
Imported.RS_LoadTimeChecker = true;

var RS = RS || {};
RS.LoadTimeChecker = RS.LoadTimeChecker || {};

(function ($) {
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_LoadTimeChecker>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  $.Params = {};
  $.Params.dayText = parameters['Day'] || '일';
  $.Params.hoursText = parameters['Hours'] || '시간';
  $.Params.minutesText = parameters['Minutes'] || '분';
  $.Params.secondsText = parameters['Seconds'] || '초';
  $.Params.descText = parameters['Description Text'];

  $.Params.hideTime = parseInt(parameters['Hide Time'] || 6);
  $.Params.dx = parameters['X'];
  $.Params.dy = parameters['Y'];

  $.Params.font = {
    fontFace: parameters['Font Face'] || 'GameFont',
    fontSize: Number(parameters['Font Size'] || 28),
    textColor: parameters['Text Color'] || '#ffffff',
    outlineColor: parameters['Outline Color'] || 'rgba(0, 0, 0, 0.5)',
    outlineWidth: Number(parameters['Outline Width'] || 4),
    textAlign: parameters['Text Align'] || 'center',
  };

  $.Params.bitmap = {
    width: parameters['Bitmap Width'],
    height: parameters['Bitmap Height'],
  };

  $.Params.evaluateCode = parameters['Code Injection'];

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    alias_Game_System_initialize.call(this);
    this._beforeDateTime = null;
    this._loadDateTime = null;
    this._refreshTime = false;
  };

  var alias_Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
  Game_System.prototype.onBeforeSave = function () {
    alias_Game_System_onBeforeSave.call(this);
    this._beforeDateTime = new Date().getTime();
  };

  var alias_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    alias_Game_System_onAfterLoad.call(this);
    this._loadDateTime = new Date().getTime();
    this.refreshTimeChecker();
  };

  Game_System.prototype.beforeTime = function () {
    return this._beforeDateTime;
  };

  Game_System.prototype.loadTime = function () {
    return this._loadDateTime;
  };

  Game_System.prototype.refreshTimeChecker = function () {
    this._refreshTime = true;
  };

  Game_System.prototype.restoreTimeChecker = function () {
    this._refreshTime = false;
  };

  var alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function () {
    alias_Scene_Map_onMapLoaded.call(this);
    if ($gameSystem._refreshTime) {
      this.refreshTimeChecker($gameSystem.beforeTime(), $gameSystem.loadTime());
      $gameSystem.restoreTimeChecker();
    }
  };

  Scene_Map.prototype.refreshTimeChecker = function (before, load) {
    if (!this._spriteset) return;
    this._spriteset.refreshTimeChecker(before, load);
  };

  var alias_Spriteset_Map_createLowerLayer =
    Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function () {
    alias_Spriteset_Map_createLowerLayer.call(this);
    this.createTimeChecker();
  };

  Spriteset_Map.prototype.createTimeChecker = function () {
    this._timeChecker = new Sprite();
    var width = eval($.Params.bitmap.width);
    var height = eval($.Params.bitmap.height);
    this._timeChecker.bitmap = new Bitmap(width, height);
    this._timeChecker.visible = false;
    this.addChild(this._timeChecker);
  };

  /**
   * @param {Date} before
   * @param {Date} load
   */
  Spriteset_Map.prototype.refreshTimeChecker = function (before, load) {
    'use strict';

    if (!this._timeChecker) {
      this.createTimeChecker();
    }

    var newBeforeTime = new Date(before);
    var newLoadTime = new Date(load);

    const width = eval($.Params.bitmap.width);
    const height = eval($.Params.bitmap.height);

    const dayValue = 60 * 60 * 24 * 1000;
    const hourValue = 60 * 60 * 1000;
    const minValue = 60 * 1000;
    const secondValue = 1000;

    let loadTime = newLoadTime.getTime();
    let beforeTime = newBeforeTime.getTime();

    var t =
      Math.floor(loadTime / hourValue) - Math.floor(beforeTime / hourValue);

    let day =
      Math.floor(loadTime / dayValue) -
      Math.floor(
        (beforeTime - newBeforeTime.getTimezoneOffset() * 60 * 1000) / dayValue
      );

    if (t < 24) {
      day = 0;
    }

    let hours = t % 24;
    let mins =
      (Math.floor(loadTime / minValue) - Math.floor(beforeTime / minValue)) %
      60;
    let seconds =
      (Math.floor(loadTime / secondValue) -
        Math.floor(beforeTime / secondValue)) %
      60;

    let text = `${day} ${$.Params.dayText} ${hours} ${$.Params.hoursText} ${mins} ${$.Params.minutesText} ${seconds} ${$.Params.secondsText} ${$.Params.descText}`;

    this._timeChecker.bitmap.clear();
    this._timeChecker.visible = true;
    this._timeChecker.bitmap.drawText(
      text,
      0,
      0,
      width,
      height,
      $.Params.font.textAlign
    );
    this._timeChecker.bitmap.fontFace = $.Params.font.fontFace;
    this._timeChecker.bitmap.fontSize = $.Params.font.fontSize;
    this._timeChecker.bitmap.textColor = $.Params.font.textColor;
    this._timeChecker.bitmap.outlineColor = $.Params.font.outlineColor;
    this._timeChecker.bitmap.outlineWidth = $.Params.font.outlineWidth;
    this._timeChecker.x = eval($.Params.dx);
    this._timeChecker.y = eval($.Params.dy);

    try {
      eval(JSON.parse($.Params.evaluateCode));
    } catch (e) {
      throw new Error(e.message);
    }

    setTimeout(() => {
      this._timeChecker.visible = false;
    }, 1000 * $.Params.hideTime);
  };
})(RS.LoadTimeChecker);
