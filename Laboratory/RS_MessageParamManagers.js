/*:ko
 * @plugindesc 대화창을 이루는 각 요소의 투명도를 조절합니다.
 * @author biud436
 *
 * @param back Opacity
 * @text 배경 투명도
 * @type number
 * @desc 배경 이미지의 투명도를 조절합니다.
 * @default 192
 * @min 0
 * @max 255
 *
 * @param default Opacity
 * @text 기본 투명도
 * @type number
 * @desc 기본 투명도를 조절합니다(배경 이미지와 창 프레임이 영향을 받습니다)
 * @default 255
 * @min 0
 * @max 255
 *
 * @param contents Opacity
 * @text 메시지 내용 투명도
 * @type number
 * @desc 텍스트가 묘화되는 비트맵 표면의 투명도를 조절합니다.
 * @default 255
 * @min 0
 * @max 255
 *
 * @param translucent Opacity
 * @text 기본 투명도
 * @type number
 * @desc 투명도가 적용되어야 할 내부 컨텐츠에 이 값이 기본적으로 적용됩니다.
 * @default 160
 * @min 0
 * @max 255
 *
 * @param default outline width
 * @text 기본 테두리 굵기
 * @type number
 * @desc 기본 텍스트의 굵기를 특정 값으로 재설정합니다.
 * @default 2
 *
 * @param default outline Color
 * @text 기본 테두리 색상
 * @desc 기본 테두리 색상을 특정 색상으로 재설정합니다.
 * @default rgba(0, 0, 0, 1.0)
 *
 * @help
 *==============================================================================
 * 플러그인 동작 환경
 *==============================================================================
 * 이 플러그인은 심플하게 사용하기 위해 따로 제작된 것으로 메시지 코어나 한글 메시지 시
 * 스템보다 아래에 추가되어야 합니다.
 */
/*:
 * @plugindesc Set the opacity of each element on a Message Box.
 * @author biud436
 *
 * @param back Opacity
 * @type number
 * @desc
 * @default 192
 * @min 0
 * @max 255
 *
 * @param default Opacity
 * @type number
 * @desc
 * @default 255
 * @min 0
 * @max 255
 *
 * @param contents Opacity
 * @type number
 * @desc
 * @default 255
 * @min 0
 * @max 255
 *
 * @param translucent Opacity
 * @type number
 * @desc
 * @default 160
 * @min 0
 * @max 255
 *
 * @param default outline width
 * @type number
 * @desc
 * @default 2
 *
 * @param default outline Color
 * @desc
 * @default rgba(0, 0, 0, 1.0)
 *
 * @help
 */

var Imported = Imported || {};
Imported.RS_MessageParamManagers = '1.0.1';

(function () {
  var parameters = PluginManager.parameters('RS_MessageParamManagers');
  var __backOpacity = Number(parameters['back Opacity'] || 192);
  var __translucentOpacity = Number(parameters['translucent Opacity'] || 160);
  var __defaultOpacity = Number(parameters['default Opacity'] || 255);
  var __contentsOpacity = Number(parameters['contents Opacity'] || 255);
  var __defaultOutlineWidth = Number(parameters['default outline width'] || 2);
  var __defaultOutlineColor = parameters['default outline Color'] || 'white';

  Window_Message.prototype.standardBackOpacity = function () {
    return __backOpacity;
  };

  Window_Message.prototype.translucentOpacity = function () {
    return __translucentOpacity;
  };

  Window_Message.prototype.updateDefaultOpacity = function () {
    this.opacity = __defaultOpacity;
  };

  Window_Message.prototype.updateContentsOpacity = function () {
    this.contentsOpacity = __contentsOpacity;
  };

  var alias_Window_Message_updatePlacement =
    Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function () {
    alias_Window_Message_update.call(this);
    this.updateDefaultOpacity();
    this.updateContentsOpacity();
  };

  var alias_Window_Message_resetFontSettings =
    Window_Message.prototype.resetFontSettings;
  Window_Message.prototype.resetFontSettings = function () {
    alias_Window_Message_resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = __defaultOutlineWidth;
    this.contents.outlineColor = __defaultOutlineColor;
  };
})();
