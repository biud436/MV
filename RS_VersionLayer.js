//================================================================
// RS_VersionLayer.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc (v1.0.2) This plugin allows you to show up the version anywhere. <RS_VersionLayer>
 * @author biud436
 *
 * @param Version
 * @desc Indicate the text with a version
 * @default 1.0
 *
 * @param visible
 * @type boolean
 * @desc set whether the version shows up on the screen
 * @default true
 *
 * @param --- Font
 *
 * @param textSize
 * @parent --- Font
 * @desc Specify a size of the version text
 * @default 14
 *
 * @param textColor
 * @parent --- Font
 * @desc Specify a color of the version text
 * @default rgb(56, 150, 119)
 *
 * @param outlineColor
 * @parent --- Font
 * @desc Specify a outline color of the version text
 * @default rgb(255, 255, 255)
 *
 * @param outlineWidth
 * @parent --- Font
 * @desc Specify a outline width of the version text
 * @default 2
 *
 * @param defaultText
  * @parent --- Font
 * @desc Specify the prefix in front a text
 * @default Version :
 *
 * @param textAlign
 * @parent --- Font
 * @type select
 * @desc Sets up a text align as you want
 * @default right
 * @option left
 * @option center
 * @option right
 *
 * @param opacity
 * @parent --- Font
 * @type number
 * @desc Sets up the text opacity
 * @default 255
 * @min 0
 * @max 255
 *
 * @param -- Position
 *
 * @param Position
 * @parent -- Position
 * @type select
 * @desc Specify either 'Bottom' or 'Top' positions.
 * @default Bottom
 * @option Bottom
 * @option Top
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 *
 * The command is that shows a version text :
 *    VersionLayer true
 *
 * The command is that hides a version text :
 *    VersionLayer false
 *
 * -----------------------------------------------------------------------------
 * Version Log
 * -----------------------------------------------------------------------------
 * 2015.12.13 (v1.0.0) - First Release
 * 2016.08.23 (v1.0.1) - Fixed and Added Parameters.
 * 2016.08.23 (v1.0.2) - Added position parameter.
 */
/*:ko
 * @plugindesc (v1.0.2) 버전 텍스트를 화면에 표시합니다. <RS_VersionLayer>
 * @author 러닝은빛(biud436)
 *
 * @param Version
 * @text 버전
 * @desc 버전을 기입하세요 (eval 구문으로 실행된 후 문자열화 됩니다.)
 * @default 1.0
 *
 * @param visible
 * @text 초기화 시 표시 여부
 * @type boolean
 * @desc 화면에 버전을 표시 할 지 여부를 설정합니다.
 * @default true
 *
 * @param --- Font
 * @text 폰트
 *
 * @param textSize
 * @text 폰트 크기
 * @parent --- Font
 * @desc 버전 텍스트의 폰트 크기를 설정하세요.
 * @default 14
 *
 * @param textColor
 * @text 텍스트 색상
 * @parent --- Font
 * @desc 버전 텍스트의 색상을 설정합니다.
 * @default rgb(56, 150, 119)
 *
 * @param outlineColor
 * @text 테두리 색상
 * @parent --- Font
 * @desc 버전 텍스트의 텍스트 테두리 색상을 설정합니다.
 * @default rgb(255, 255, 255)
 *
 * @param outlineWidth
 * @text 테두리 굵기
 * @parent --- Font
 * @desc 버전 텍스트의 텍스트 테두리 굵기를 설정합니다.
 * @default 2
 *
 * @param defaultText
 * @text 기본 텍스트
 * @parent --- Font
 * @desc 버전 텍스트 보다 먼저 표시될 머릿말을 설정합니다.
 * @default Version :
 *
 * @param textAlign
 * @text 텍스트 정렬 방향
 * @parent --- Font
 * @type select
 * @desc 텍스트 정렬 방향을 left, center, right 중에 하나를 선택할 수 있습니다.
 * @default right
 * @option left
 * @option center
 * @option right
 *
 * @param opacity
 * @text 투명도
 * @parent --- Font
 * @type number
 * @desc 텍스트의 투명도를 설정합니다.
 * @default 255
 * @min 0
 * @max 255
 *
 * @param -- Position
 * @text 위치 설정
 *
 * @param Position
 * @text 위치
 * @parent -- Position
 * @type select
 * @desc 버전 레이어의 위치 값을 설정합니다. (y 값 자동 계산)
 * @default Bottom
 * @option Bottom
 * @value 바닥
 * @option Top
 * @value 위
 *
 * @help
 * -----------------------------------------------------------------------------
 * 플러그인 명령에 대해...
 * -----------------------------------------------------------------------------
 *
 * 다음 명령으로 버전 텍스트를 화면에 표시할 수 있습니다. 초기화 시 나타나지 않게
 * 해놓으신 분들은 이 명령을 사용하여 활성화 할 수 있을 것입니다.
 *    VersionLayer true
 *
 * 다음 명령은 버전 레이어를 화면에서 감춰 렌더링되지 않게 합니다.
 *    VersionLayer false
 *
 * -----------------------------------------------------------------------------
 * 변동 사항
 * -----------------------------------------------------------------------------
 * 2015.12.13 (v1.0.0) - First Release
 * 2016.08.23 (v1.0.1) - Fixed and Added Parameters.
 * 2016.08.23 (v1.0.2) - Added position parameter.
 */

var Imported = Imported || {};
Imported.RS_VersionLayer = true;

(function () {

  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_VersionLayer>");
  })

  parameters = (parameters.length > 0) && parameters[0].parameters;

  var params = [
    String(eval(parameters["Version"] || '1.0')),
    Number(parameters['fontSize'] || 14),
    String(parameters['textColor'] || "rgb(56, 150, 119)"),
    String(parameters['outlineColor'] || "rgb(255, 255, 255)"),
    Number(parameters['outlineWidth'] || 2),
    String(parameters['defaultText'] || 'Version : '),
    String(parameters['textAlign'] || 'right'),
    Boolean(parameters['visible'] === 'true'),
    Number(parameters['opacity'] || 255),
    String(parameters['Position'] || 'Top'),
    false
  ];

  //----------------------------------------------------------------------------
  // VersionLayer
  //
  //

  function VersionLayer() {
    this.initialize.apply(this, arguments);
  };

  VersionLayer.prototype = Object.create(Sprite.prototype);
  VersionLayer.prototype.constructor = VersionLayer;

  VersionLayer.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this.refresh();
  };

  VersionLayer.prototype.refresh = function () {
    if(!this.bitmap) return;
    var width = this.bitmap.width;
    var height = this.bitmap.height;
    this.visible = params[7];
    this.opacity = params[8];
    this.bitmap.clear();
    this.bitmap.fontSize = params[1];
    this.bitmap.textColor = params[2];
    this.bitmap.outlineColor = params[3];
    this.bitmap.outlineWidth = params[4];
    this.bitmap.drawText(params[5] + ' ' + params[0], 0, 0, width, height, params[6]);
  };

  VersionLayer.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if(params[10]) {
      this.refresh();
      params[10] = false;
    }
  };

  //----------------------------------------------------------------------------
  // Scene_Base
  //
  //

  var alias_Scene_Base_create = Scene_Base.prototype.create;
  Scene_Base.prototype.create = function() {
    alias_Scene_Base_create.call(this);
    this.createVersionLayer();
  };

  var alias_Scene_Base_start = Scene_Base.prototype.start;
  Scene_Base.prototype.start = function () {
    alias_Scene_Base_start.call(this);
    this.addVersionLayer();
  };

  var alias_Scene_Base_terminate = Scene_Base.prototype.terminate;
  Scene_Base.prototype.terminate = function () {
    if(alias_Scene_Base_terminate) alias_Scene_Base_terminate.call(this);
    this.removeChild(this._versionLayer);
  };

  Scene_Base.prototype.createVersionLayer = function () {
    var pos = params[9].toLowerCase();
    var padding = 1;
    var fontSize = params[1] + 2;
    this._versionLayer = new VersionLayer(new Bitmap(Graphics.boxWidth, fontSize));
    this._versionLayer.y = (pos === 'bottom') ? (Graphics._renderer.height - fontSize - padding) : padding;
  };

  Scene_Base.prototype.addVersionLayer = function () {
    var length = this.children.length;
    this.addChildAt(this._versionLayer, length);
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "VersionLayer") {
        switch(args[0]) {
          case 'true':
            params.splice(7, 1, true);
            params.splice(10, 1, true);
            break;
          case 'false':
            params.splice(7, 1, false);
            params.splice(10, 1, true);
            break;
        }
      }
  };


})();
