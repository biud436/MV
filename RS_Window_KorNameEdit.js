//================================================================
// RS_Window_KorNameEdit.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to type in korean in the Name Input Proccessing <RS_Window_KorNameEdit>
 *
 * @author biud436
 * @since 2015.10.19
 *
 * @param windowWidth
 * @desc Directly specify the width of a window for editing name.
 * (It will automatically calculate if specifying the width as 'auto')
 * @default auto
 *
 * @param windowCenter
 * @type boolean
 * @desc The window will align to the center of the screen unless set the same as 'false' value.
 * @default false
 *
 * @param editWindow_Opacity
 * @type number
 * @desc The opacity can set as number between 0 and 255.
 * @default 225
 * @min 0
 * @max 255
 *
 * @param helpWindow_Opacity
 * @text Help Window Opacity
 * @type number
 * @desc The opacity can set as number between 0 and 255.
 * @default 225
 * @min 0
 * @max 255
 *
 * @param askingText
 * @desc This is a text hint
 * @default Please enter the name
 *
 * @param outlineWidth
 * @desc Specify the outline width as you want
 * @default 1
 *
 * @param outlineColor
 * @desc Specify the outline color as you want
 * @default black
 *
 * @param fontColor
 * @desc Specify the font color as you want
 * @default white
 *
 * @param standardFontSize
 * @desc Specify the font size as you want
 * @default 28
 *
 * @param Chinese Fonts
 * @desc Specify the Chinese font as you want
 * @default SimHei, Heiti TC, sans-serif, Noto Sans
 *
 * @param Korean Fonts
 * @desc Specify the Korean font as you want
 * @default Noto Sans, Dotum, AppleGothic, sans-serif
 *
 * @param Default Fonts
 * @desc Specify the default font as you want
 * @default GameFont
 *
 * @param Default CharWidth
 * @desc This plugin calculates a text width using this letter when the system language is English.
 * @default A
 *
 * @param Default Background
 * @desc Specify the background on your scene for editing the name from img/pictures folder
 * 'auto' : default map background
 * @default auto
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Default Edit Button
 * @desc Specify the button name that would activate the edit window
 * @default Edit
 *
 * @param Default OK Button
 * @desc Specify the button name that would return to previous map after finishing the actor name
 * @default OK
 *
 * @param Default Cancel Button
 * @desc Specify the button name that would return to previous map.
 * @default Cancel
 * 
 * @param Error Message
 * 
 * @param didnt_type_anytext
 * @parent Error Message
 * @desc Write here a warning message to be displayed when no letters are entered.
 * @default Cannot an empty name
 * 
 * @param cant_type_same_name
 * @parent Error Message
 * @desc Write here a warning message to be displayed when texts are the same name.
 * @default Cannot set as the same name
 * 
 * @param Show Error Message
 * @parent Error Message
 * @type boolean
 * @desc Specify whether the error messsage shows.
 * @default true
 * @on true
 * @off false
 * 
 * @param Keyboard Editor Hidden
 * @type boolean
 * @desc <input> form allows you to open the virtual keyboard editor on the screen. it can open manually after touching with input form.
 * @default true
 * @on hide
 * @off show
 * 
 * @param Style
 * @type struct<TextBox>
 * @desc when showing the input form on the screen, you can change the style of input.
 * @default {"width":"60%","textIndent":"10px","fontSize":"16px","lineHeight":"120%","border":"3px solid #bd7419","cursor":"text","Position":"","top":"\"\"","left":"\"\"","right":"0","bottom":"0"}
 *
 * @param Show Face
 * @type boolean
 * @desc Specify whther the face image shows.
 * @default true
 * 
 * @help
 * This plugin provides a keyboard that allows you to type in korean
 * or other native language in the Name Input Proccessing.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * These plugin commands can change the properties of the name window. 
 * 
 * KNE width number
 * KNE center true/false
 * KNE outlineWidth number
 * KNE outlineColor string
 * KNE fontColor string
 * KNE fontSize number
 * KNE opacity number
 * KNE askText string
 * 
 * if you want to type a name is to 9 characters or more, you must call at the following plugin command.
 * 
 * OpenXNameInput leader 9
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2016.03.05 (v1.3.3) - Fixed the class structure.
 * 2016.03.22 (v1.4.0) - Fixed a bug that causes a serious problem.
 * 2016.04.05 (v1.5.0) - Fixed a bug that causes to delete the text automatically
 * when you can type Hangul text of length less than 2.
 * 2016.06.18 (v1.6.0) - Fixed the inheritance structure, and the parameter called 'askText'.
 * 2016.08.09 (v1.6.1) - Fixed shouldPreventDefault function of Input class.
 * 2016.12.20 (v1.6.2) : Added Default CharWidth parameter.
 * That is because this plugin has a bug that 'navigator.language' has always returned
 * 'en-US' due to a bug of crosswalk-10.39.235.16 xwalk library. So I added this
 * to solve the problem of returning the wrong character width.
 * 2017.01.13 (v1.6.3) - Fixed a bug that didn't hide the status bar after firing onchange event on android.
 * 2017.06.07 (v1.6.4) :
 * - Added a new feature that can change a default background image.
 * - Fixed the issue that is not changed the text after pressing the cancel button on an Android.
 * - Now it does not get the focus of a text editor unless pressing the edit button.
 * 2017.09.15 (v1.6.5) :
 * - Added a new feature that pre-sets the default name when the name processing.
 * 2018.10.26 (v1.6.6) :
 * - Added the alert window. 
 * 2018.11.08 (v1.6.7) :
 * - Actor's name can change the same as previous name. 
 * - Now command buttons are show up only in mobile devices. 
 * - Fixed the position of the edit window.
 * 2019.05.30 (v1.6.8) :
 * - Added the feature that the name can type as 9 characters or more.
 * 2019.11.23 (v1.6.9) :
 * - Added a new feature that can select whether input method editor shows on the screen. 
 * its feature can be resolved many of issues on the mobile device.
 * - Added a new feature that can hide the face image on the name edit window.
 * 2020.07.14 (v1.6.10) :
 * - Fixed the issue, https://github.com/biud436/MV/issues/18
 * 2021.01.11 (v1.6.11) :
 * - Now it is possible to use a text code in the asking text.
 */
/*~struct~TextBox:
 * 
 * @param width
 * @type string
 * @default 60%
 *
 * @param textIndent
 * @type string
 * @default 10px
 *
 * @param fontSize
 * @type string
 * @default 16px
 * 
 * @param lineHeight
 * @type string
 * @default 120%
 *
 * @param border
 * @type string
 * @default 3px solid #bd7419
 * 
 * @param cursor
 * @type string
 * @default text
 * 
 * @param Position
 * 
 * @param top
 * @parent Position
 * @default ""
 * 
 * @param left
 * @parent Position
 * @default ""
 * 
 * @param right
 * @parent Position
 * @default 0
 * 
 * @param bottom
 * @parent Position
 * @default 0
 * 
 */
/*:ko
 * RS_Window_KorNameEdit.js
 * @plugindesc 한글 이름 입력 처리 플러그인입니다. <RS_Window_KorNameEdit>
 * @author 러닝은빛(biud436)
 * 
 * @param windowWidth
 * @text 창 폭 (가로 크기)
 * @desc 숫자값을 입력하세요.
 * ('auto'로 설정하면 자동으로 설정됩니다)
 * @default auto
 *
 * @param windowCenter
 * @text 화면 중앙 정렬
 * @type boolean
 * @desc true 또는 false를 입력하세요.
 * @default false
 * @on 참
 * @off 거짓
 *
 * @param editWindow_Opacity
 * @text 투명도
 * @type number
 * @desc 이름 윈도우의 투명도 값으로 0 ~ 255 사이의 숫자 값을 입력하세요.
 * @default 225
 * @min 0
 * @max 255
 *
 * @param helpWindow_Opacity
 * @text Help Window 투명도
 * @type number
 * @desc 이름 윈도우의 투명도 값으로 0 ~ 255 사이의 숫자 값을 입력하세요.
 * @default 225
 * @min 0
 * @max 255
 * 
 * @param askingText
 * @text 안내 텍스트
 * @desc 텍스트 힌트
 * @default 이름을 입력하세요.
 *
 * @param outlineWidth
 * @text 기본 테두리 굵기
 * @desc 테두리 두께
 * @default 1
 *
 * @param outlineColor
 * @text 기본 테두리 색상
 * @desc 테두리 색상
 * @default black
 *
 * @param fontColor
 * @text 기본 폰트 색상
 * @desc 폰트 색상
 * @default white
 *
 * @param standardFontSize
 * @text 기본 폰트 크기
 * @desc 기본 폰트 크기
 * @default 28
 *
 * @param Chinese Fonts
 * @text 중국어 폰트
 * @desc 중국어 폰트
 * @default SimHei, Heiti TC, sans-serif
 *
 * @param Korean Fonts
 * @text 한글 폰트
 * @desc 한국어 폰트
 * @default 나눔고딕, Dotum, AppleGothic, sans-serif
 *
 * @param Default Fonts
 * @text 기본 폰트명
 * @desc 기본 폰트명은 fonts/gamefont.css에 GameFont로 설정되어있습니다.
 * @default GameFont
 *
 * @param Default CharWidth
 * @text 기본 문자 폭 (영어)
 * @desc 시스템 언어가 영어인 경우, 여기 설정된 텍스트를 사용하여 폭을 계산합니다.
 * @default A
 *
 * @param Default Background
 * @text 기본 배경 이미지
 * @desc 기본 배경으로 쓸 이미지 파일을 설정하세요
 * 'auto' : 맵을 배경 화면으로 사용합니다
 * @default auto
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Default Edit Button
 * @text 기본 수정 키 이름
 * @desc 에디트 윈도우를 활성화 할 수 있는 버튼의 이름입니다
 * @default 수정
 *
 * @param Default OK Button
 * @text 기본 결정 키 이름
 * @desc 이름 입력을 끝내고 맵으로 돌아갈 수 있는 버튼의 이름입니다
 * @default 결정
 *
 * @param Default Cancel Button
 * @text 기본 취소 키 이름
 * @desc 이름 입력을 취소하고 맵으로 돌아갈 수 있는 버튼의 이름입니다
 * @default 돌아가기
 * 
 * @param Error Message
 * @text 오류 메시지
 * 
 * @param didnt_type_anytext
 * @text 이름을 적지 않았을 때
 * @parent Error Message
 * @desc 아무 글자도 입력하지 않았을 때 띄울 메시지를 적으십시오.
 * @default 아무 글자도 입력하지 않았습니다!
 * 
 * @param cant_type_same_name
 * @text 이름이 같을 때
 * @parent Error Message
 * @desc 같은 이름으로 설정하려 할 때 띄울 메시지를 적으십시오.
 * @default 같은 이름으로 설정할 수 없습니다!
 * 
 * @param Show Error Message
 * @text 오류 메시지 표시 여부
 * @parent Error Message
 * @type boolean
 * @desc 오류 메시지를 표시할 지 여부를 설정합니다.
 * @default true
 * @on 표시한다
 * @off 표시안함
 * 
 * @param Keyboard Editor Hidden
 * @type boolean
 * @desc 모바일에서 입력 양식을 터치하여 수동으로 가상 키보드 입력기를 띄울 수 있게 하는 기능입니다.
 * @default true
 * @on 숨김
 * @off 보임
 * 
 * @param Style
 * @type struct<TextBox>
 * @desc 입력 양식의 스타일을 설정할 수 있습니다 (기본적으로는 하단에 표시됨)
 * @default {"width":"60%","textIndent":"10px","fontSize":"16px","lineHeight":"120%","border":"3px solid #bd7419","cursor":"text","Position":"","top":"\"\"","left":"\"\"","right":"0","bottom":"0"}
 * 
 * @param Show Face
 * @text 얼굴 이미지 표시
 * @type boolean
 * @desc 얼굴 이미지 표시 여부를 설정합니다.
 * @default true
 * @on 표시
 * @off 감추기
 * 
 * @help
 * 화면에서 보이지 않는 <input> 폼을 생성하여 텍스트를 직접 입력 받을 수 있게 하는 플러그인입니다.
 *
 * 안드로이드 기기에서 상태바 관련 버그가 있으신 분들은 다음 플러그인으로
 * 대체해주시기 바랍니다 :
 *
 * https://github.com/biud436/MV/raw/master/RS_Window_KoreanNameInput.js
 *
 * ============================================================================
 * 플러그인 명령
 * ============================================================================
 *
 * KNE 폭 숫자
 * 
 * 윈도우의 가로 크기를 변경하려면 위 명령을 사용해주세요.
 * 숫자 부분을 원하는 값으로 변경해야 합니다.
 * 숫자 값은 0보다 커야 합니다.
 * 
 * KNE 중앙정렬 true/false
 * 
 * 이름 입력 윈도우는 기본적으로 상단에 생성됩니다.
 * 창을 정확히 중앙으로 옮기고 싶다면 "KNE 중앙정렬 true"을 호출하세요.
 * 
 * KNE 테두리크기 숫자
 * KNE 테두리색상 문자열
 * KNE 폰트색상 문자열
 * KNE 폰트크기 숫자
 * 
 * 위 플러그인 명령은 폰트 패밀리를 제외한 나머지 폰트 설정을 변경할 수 있습니다.
 * 폰트 패밀리는 플러그인 매개변수에서 변경이 가능합니다.
 * 
 * KNE 투명도 숫자
 * 
 * 투명도는 0에서 완전 투명하고 255에서 완전 불투명합니다.
 * 완전 투명할 경우, 창의 기본 배경과 프레임이 사라지고 글자만 남게 됩니다.
 * 글자만 덩그라니 놓일 경우, 기본 배경 이미지와 잘 겹쳐지게 됩니다.
 * 플러그인 매개변수에서 기본 배경 이미지를 다른 것으로 바꿨을 경우 유용합니다.
 * 
 * KNE 텍스트 문자열
 * 
 * 이름 입력 창 상단에 도움말 메시지를 작성할 수 있습니다.
 * "KNE 텍스트 이름을 입력해주세요" 등과 같이 사용할 수 있습니다.
 * 
 * OpenXNameInput leader 9
 * 
 * 이름을 9자 이상으로 입력하려면 위와 같이 플러그인 명령을 직접 호출해주십시오.
 *
 * ============================================================================
 * 변경 사항
 * ============================================================================
 * 2015.10.19 (v1.0.0) - 최초 작성일
 * 2015.12.10 (v1.1.0) - 버그 픽스(화면 축소 버그 수정)
 * 2016.02.15 (v1.2.0) - 플러그인 매개변수 및 플러그인 커맨드 추가
 * 2016.03.22 (v1.3.0) - 플러그인 커맨드에서 문자열을 길게 쓸 수 있게 되었으며 백스페이스 버그를 수정했습니다.
 * 2016.04.05 (v1.4.0) - 한글 입력 시, 두 글자 이상을 꼭 입력해야 하는 버그가 수정되었습니다.
 * 2016.06.18 (v1.5.0) - 상속 구조 변경, 파라미터 기본 값 수정, 폰트 변경 기능 추가, 시스템 언어에 따라 글자 폭 자동 감지 기능 추가
 * 2016.12.20 (v1.6.2) : Default CharWidth 라는 플러그인 매개변수를 추가했습니다.
 * 안드로이드에서 crosswalk-10.39.235.16를 사용하여 빌드했을 때 폭이 제대로 계산되지 않는 버그가 있습니다.
 * (시스템 언어가 항상 'en-US'로 고정되는 라이브러리 상의 버그가 있었습니다)
 * 2017.01.13 (v1.6.3) - android cordova에서 onchange 이벤트를 실행 한 후 상태 표시 줄이 사라지지 않는 버그를 수정했습니다.
 * 2017.06.07 (v1.6.4) :
 * - 이제 배경 이미지를 따로 설정할 수 있습니다.
 * - 취소 버튼을 눌렀을 때 간헐적으로 편집이 되지 않는 문제를 수정했습니다.
 * - 이제 수정 버튼을 누르지 않으면 포커스를 얻을 수 없습니다.
 * 2017.09.15 (v1.6.5) :
 * - 이름 입력 시작 시 기본 이름을 미리 설정하는 기능이 추가되었습니다.
 * 2018.10.26 (v1.6.6) :
 * - 오류 메시지를 띄우는 창을 추가했습니다.
 * - 매개변수 명을 한국어로 변경하였습니다.
 * 2018.11.08 (v1.6.7) :
 * - 같은 이름으로 설정할 수 있게 변경하였습니다.
 * - 수정, 확인, 취소 칸은 모바일 디바이스에서만 뜨게 변경하였습니다.
 * - 에디트 윈도우의 좌표를 모든 해상도에 대응할 수 있게 상대 좌표로 수정하였습니다.
 * 2019.05.30 (v1.6.8) :
 * - 이름을 9자 이상으로 입력할 수 있는 기능이 추가되었습니다.
 * 2019.11.23 (v1.6.9) :
 * - 입력 에디터를 화면에 표시하거나 숨길 수 있는 매개변수를 추가했습니다.
 * - 얼굴 이미지를 감출 수 있는 기능을 추가하였습니다.
 * 2020.07.14 (v1.6.10) :
 * - Fixed the issue, https://github.com/biud436/MV/issues/18
 * 2021.01.11 (v1.6.11) :
 * - 안내 텍스트에서 이제 텍스트 코드를 사용할 수 있습니다.
 */
/*~struct~TextBox:ko
 * 
 * @param width
 * @type string
 * @default 60%
 *
 * @param textIndent
 * @type string
 * @default 10px
 *
 * @param fontSize
 * @type string
 * @default 16px
 * 
 * @param lineHeight
 * @type string
 * @default 120%
 *
 * @param border
 * @type string
 * @default 3px solid #bd7419
 * 
 * @param cursor
 * @type string
 * @default text
 * 
 * @param Position
 * 
 * @param top
 * @parent Position
 * @default ""
 * 
 * @param left
 * @parent Position
 * @default ""
 * 
 * @param right
 * @parent Position
 * @default 0
 * 
 * @param bottom
 * @parent Position
 * @default 0
 * 
 */

var Imported = Imported || {};
Imported.Window_KorNameEdit = true;

var RS = RS || {};
RS.Window_KorNameEdit = RS.Window_KorNameEdit || {};

(function($) {

  "use strict";
  
  $.Params = RS.Window_KorNameEdit.Params || {};
  
  // private class
  function TextBox() {
    this.initialize.apply(this, arguments);
  };
  
  //===========================================================================
  // Private Members
  //===========================================================================
  
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_Window_KorNameEdit>');
  });
  
  parameters = (parameters.length > 0) && parameters[0].parameters;
  
  $.Params.windowWidth = parameters['windowWidth'];
  $.Params.windowCenter = String(parameters['windowCenter'] || 'false');
  $.Params.outlineWidth = Number(parameters['outlineWidth'] || 1);
  $.Params.outlineColor = String(parameters['outlineColor'] || 'black');
  $.Params.fontColor = String(parameters['fontColor'] || 'white');
  $.Params.opacity = Number(parameters['editWindow_Opacity'] || 225);
  $.Params.askText = String(parameters['askingText'] || 'Please enter the name');
  $.Params.standardFontSize = Number(parameters['standardFontSize'] || 28);
  $.Params.fonts = {
    'ChineseFonts': parameters['Chinese Fonts'] || 'SimHei, Heiti TC, sans-serif',
    'KoreanFonts': parameters['Korean Fonts'] || 'Dotum, AppleGothic, sans-serif',
    'DefaultFonts': parameters['Default Fonts'] || 'GameFont',
  };
  $.Params.defaultCharWidth = parameters['Default CharWidth'] || 'A';
  $.Params.defaultBackground = parameters["Default Background"] || 'auto';
  
  $.Params.defaultEditButtonName = parameters["Default Edit Button"] || 'Edit';
  $.Params.defaultOKButtonName = parameters["Default OK Button"] || 'OK';
  $.Params.defaultCancelButtonName = parameters["Default Cancel Button"] || 'Cancel';
  
  $.Params.didnt_type_anytext = parameters["didnt_type_anytext"] || "아무 글자도 입력하지 않았습니다";
  $.Params.cant_type_same_name = parameters["cant_type_same_name"] || "같은 이름으로 설정할 수 없습니다.";

  $.Params.isKeyboardEditorHidden = Boolean(parameters["Keyboard Editor Hidden"] === "true");

  $.Params.helpWindowOpacity = Number(parameters['helpWindow_Opacity'] || 225);
  $.Params.isValidErrorMessage = Boolean(parameters["Show Error Message"] === "true");
  
  var original_Input_shouldPreventDefault = Input._shouldPreventDefault;
  var dialog_Input_shouldPreventDefault = function(keyCode) {
    switch (keyCode) {
      case 33:    // pageup
      case 34:    // pagedown
      case 37:    // left arrow
      case 38:    // up arrow
      case 39:    // right arrow
      case 40:    // down arrow
      return true;
    }
    return false;
  };

  $.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return $.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };  
  
  $.Params.style = $.jsonParse(parameters["Style"]);

  $.Params.isValidFace = Boolean(parameters["Show Face"] === "true");
  
  //===========================================================================
  // TextBox Class
  //===========================================================================
  
  TextBox.BACK_SPACE = 8;
  TextBox.ENTER = 13;
  TextBox.IS_NOT_CHAR = 32;
  TextBox.KEYS_ARRAY = 255;
  
  TextBox.prototype.initialize = function(_editWindow)  {
    this._editWindow = _editWindow;
    this.createTextBox();
    this.startToConvertInput();
    this.blur();
  };

  TextBox.prototype.isKeyboardEditorHidden = function() {
    // Some devices in Android platform have an issue that is not showing the keyboard editor.
    // There is no way that detects the model name in the default WebView. 
    // In the Android Studio, you should detect the device model, like as belows.
    // See https://developer.android.com/reference/android/os/Build
    //
    // import android.os.Build;
    // 
    // Build.MODEL.contains("MODEL_NAME");
    // Build.MODEL.contains("Emulator");
    //
    // as the result, you must change the visibility of input form manually.
    var isMobileDevice = Utils.isMobileDevice();
    return $.Params.isKeyboardEditorHidden && !isMobileDevice;
  };
  
  TextBox.prototype.createTextBox = function() {
    this._textBox = document.createElement('input');
    this._textBox.type = "text";
    this._textBox.id = "textBox";

    // Get z-index of the game canvas.
    var canvasIndex = Number(Graphics._canvas.style.zIndex);

    this._textBox.style.zIndex = this.isKeyboardEditorHidden() ? -1 : (canvasIndex + 2);
    
    this._textBox.style.position = 'absolute';
    this._textBox.style.top = 0;
    this._textBox.style.left = 0;
    this._textBox.style.right = 0;
    this._textBox.style.bottom = 0;
    
    // 자동 완성 off
    var chrome_versions_ = navigator.userAgent.split(/(?:Chrome\/)(.{2})/);
    if(chrome_versions_ && chrome_versions_[1] >= '69') {
      this._textBox.autocomplete = "off";
    }
    
    if(this.isKeyboardEditorHidden()) {
      if(Utils.isMobileDevice()) {
        this._textBox.style.background = "transparent";
        this._textBox.style.color = "none";
        this._textBox.style.border = "none";
        this._textBox.style.outline = "none";
      } else {
        this._textBox.style.opacity = 0;
      }
      this._textBox.style.width = "0.1px";
      this._textBox.style.height = "0.1px";
      this._textBox.style.overflow = "hidden";
      this._textBox.style.opacity = 0;
    } else {
      this._textBox.style.width = $.Params.width || "60%";
      this._textBox.style.textIndent = $.Params.textIndent || "10px";
      this._textBox.style.fontSize = $.Params.fontSize || "16px";
      this._textBox.style.lineHeight = $.Params.lineHeight || "120%";
      this._textBox.style.border = $.Params.border || "3px solid #bd7419";
      this._textBox.style.cursor = $.Params.cursor || "text";

      this._textBox.style.top = $.Params.top || "";
      this._textBox.style.left = $.Params.left || "";      
      this._textBox.style.right = $.Params.right || 0;
      this._textBox.style.bottom = $.Params.bottom || 0;

    }
    
    this._textBox.onkeydown = this.onKeyDown.bind(this);
    
    this._alertFunc = function() {};
    this._okFunc = function() {};
    this._defaultName = "";
  
    document.body.appendChild(this._textBox);

  };
  
  TextBox.prototype.startToConvertInput = function () {
    Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
  };
  
  TextBox.prototype.startToOriginalInput = function () {
    Input._shouldPreventDefault = original_Input_shouldPreventDefault;
  };
  
  TextBox.prototype.setEvent = function(func) {
    this._textBox.onchange = func;
    this._okFunc = func;
  };  
  
  TextBox.prototype.removeEvent = function() {
    this._textBox.onchange = null;
    this._okFunc = null;
  };
  
  TextBox.prototype.setAlertWindow = function(alert_) {
    this._alertFunc = alert_;
  };
  
  TextBox.prototype.removeElement = function () {
    this._textBox.style.display = 'none';
    document.body.removeChild(this._textBox);
  };
  
  TextBox.prototype.terminateTextBox = function() {
    this.removeEvent();
    this.removeElement();
    this.startToOriginalInput();
  };
  
  TextBox.prototype.onKeyDown = function(e) {
    var keyCode = e.which;
    
    // TODO: It may be performance down because recalculating a style and layout.
    this.getFocus();
    
    if (keyCode < TextBox.IS_NOT_CHAR) {
      if(keyCode === TextBox.BACK_SPACE) {
        // if(e && e.preventDefault) e.preventDefault();
      } else if(keyCode === TextBox.ENTER) {
        if(this.getTextLength() <= 0) {
          e.preventDefault();
          this._alertFunc($.Params.didnt_type_anytext);
        } else if( this._defaultName === this._textBox.value ) {
          // e.preventDefault();
          this._alertFunc($.Params.cant_type_same_name);
          if(this._okFunc) this._okFunc();
        }
      }
    } else if (keyCode < TextBox.KEYS_ARRAY) {
      //
    }
  }
  
  TextBox.prototype.getTextLength = function() {
    return this._textBox.value.length;
  };
  
  TextBox.prototype.getMaxLength = function() {
    return this._editWindow._maxLength;
  };
  
  TextBox.prototype.backSpace = function() {
    this._editWindow._name = this._editWindow._name.slice(0, this._textBox.value.length - 1);
    this._editWindow._index = this._textBox.value.length;
    this._textBox.value = this._editWindow._name;
    this._editWindow.refresh();
  };
  
  TextBox.prototype.refreshNameEdit = function()  {
    this._editWindow._name = this._textBox.value.toString();
    this._editWindow._index = this._textBox.value.length || 0;
    this._editWindow.refresh();
  };
  
  TextBox.prototype.update = function() {
    if(this.getTextLength() <= this._editWindow._maxLength) {
      this.refreshNameEdit();
    }
  };
  
  TextBox.prototype.getFocus = function() {
    this._textBox.focus();
  };
  
  TextBox.prototype.blur = function() {
    this._textBox.blur();
  };
  
  TextBox.prototype.terminate =  function() {
    this.terminateTextBox();
  };
  
  TextBox.prototype.setDefaultName = function (name) {
    this._textBox.value = name || '';
    this._defaultName = name;
    this.refreshNameEdit();
  };
  
  //===========================================================================
  // Window_NameEdit Class
  //===========================================================================
  
  function Window_KorNameEdit() {
    this.initialize.apply(this, arguments);
  }
  
  Window_KorNameEdit.prototype = Object.create(Window_NameEdit.prototype);
  Window_KorNameEdit.prototype.constructor = Window_KorNameEdit;
  
  Window_KorNameEdit.prototype.initialize = function(actor, maxLength) {
    Window_NameEdit.prototype.initialize.call(this, actor, maxLength);
    this.updateWindowWidth();
  };
  
  Window_KorNameEdit.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
      return $.Params.fonts.ChineseFonts;
    } else if ($gameSystem.isKorean()) {
      return $.Params.fonts.KoreanFonts;
    } else {
      return $.Params.fonts.DefaultFonts;
    }
  };
  
  Window_KorNameEdit.prototype.charWidth = function () {
    // TODO: This code has a bug that 'navigator.language' has always returned
    // 'en-US' due to a bug of crosswalk-10.39.235.16 xwalk library.
    var text = $.Params.defaultCharWidth;
    if (navigator.language.match(/^zh/)) { // isChinese
      text = '\u4E00';
    } else if (navigator.language.match(/^ko/)) { // isKorean
      text = '\uAC00';
    } else if (navigator.language.match(/^ja/)) { // isJapanese
      text = '\u3042';
    }
    return this.textWidth(text);
  };

  Window_KorNameEdit.prototype.faceWidth = function() {
    return $.Params.isValidFace ? 144 : 0;
  };

  Window_KorNameEdit.prototype.left = function() {
    var nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
    var nameWidth = (this._maxLength + 1) * this.charWidth();
    return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
  };  
  
  Window_KorNameEdit.prototype.drawActorFace = function(actor, x, y, width, height) {
    if($.Params.isValidFace) {
      this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    }
    this.changeTextColor(this.hpColor(actor));
    this.drawTextEx($.Params.askText, this.left(), y + this.fittingHeight(1) / 2);
  };

  Window_KorNameEdit.prototype.itemRect = function(index) {
    return {
      x: this.left() + index * this.charWidth(),
      y: this.fittingHeight(1),
      width: this.charWidth(),
      height: this.lineHeight()
    };
  };

  Window_KorNameEdit.prototype.windowWidth = function () {
    return 580;
  };
  
  Window_KorNameEdit.prototype.updateWindowWidth = function () {
    var padding = this.padding * 2;
    var faceWidth = $.Params.isValidFace ? this.faceWidth() : 0;
    var textWidth = this.textWidth($.Params.askText) + this.textPadding() * 2;
    if($.Params.windowWidth === 'auto') {
      this.width = Math.max(Math.min(padding + faceWidth + textWidth, Graphics.boxWidth - padding), 580);
    } else {
      this.width = Number($.Params.windowWidth || 580);
    }
  };
  
  Window_KorNameEdit.prototype.drawChar = function (index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.contents.outlineWidth = $.Params.outlineWidth;
    this.contents.outlineColor = $.Params.outlineColor;
    this.contents.fontColor = $.Params.fontColor;
    this.drawText(this._name[index] || '', rect.x, rect.y)
  };
  
  Window_KorNameEdit.prototype.standardFontSize = function() {
    return $.Params.standardFontSize;
  };
  
  Window_KorNameEdit.prototype.refresh = function() {
    this.contents.clear();
    this.drawActorFace(this._actor, 0, 0);
    
    var rect = this.itemRect(Math.max(this._index - 1, 0));
    
    for (var i = 0; i < this._maxLength; i++) {
      this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
      this.drawChar(j);
    }
    
    if(this._index === 0) {
      this.setCursorRect(rect.x, rect.y, 1, rect.height);
    } else {
      this.setCursorRect(rect.x + (rect.width - 1), rect.y, 1, rect.height);
    }
    
  };
  
  //===========================================================================
  // Window_NameOK
  //===========================================================================
  function Window_KorNameInput() {
    this.initialize.apply(this, arguments);
  }
  
  Window_KorNameInput.prototype = Object.create(Window_Command.prototype);
  Window_KorNameInput.prototype.constructor = Window_KorNameInput;
  
  Window_KorNameInput.prototype.initialize = function(editWindow) {
    this._editWindow = editWindow;
    this.clearCommandList();
    this.makeCommandList();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.updatePlacement();
    this.refresh();
    this.select(0);
    this.activate();
  };
  
  Window_KorNameInput.prototype.maxCols = function () {
    return 3;
  };
  
  Window_KorNameInput.prototype.makeCommandList = function() {
    this.addCommand($.Params.defaultEditButtonName, 'edit');
    this.addCommand($.Params.defaultOKButtonName, 'ok');
    this.addCommand($.Params.defaultCancelButtonName, 'cancel');
  };
  
  Window_KorNameInput.prototype.itemTextAlign = function() {
    return 'center';
  };
  
  Window_KorNameInput.prototype.updatePlacement = function() {
    var width = 0;
    for (var i = 0; i < this.maxItems(); i++) {
      width += this.textWidth(this._list[i].name) + this.textPadding() * 2;
    }
    width += this.padding * 2 + this.spacing();
    this.width = width;
    this.x = this._editWindow.x + this._editWindow.width - width;
    this.y = this._editWindow.y + this._editWindow.height + 10;
  };
  
  //===========================================================================
  // Scene_Name Class
  //===========================================================================
  
  function Scene_KorName() {
    this.initialize.apply(this, arguments);
  }
  
  Scene_KorName.prototype = Object.create(Scene_Name.prototype);
  Scene_KorName.prototype.constructor = Scene_KorName;
  
  Scene_KorName.prototype.initialize = function() {
    // 한글 비트맵 폰트 사용을 잠시 중단한다.
    if(Imported.RS_HangulBitmapText) {
      $gameTemp.setHangulBitmapText(false);
    }
    this._nowTime = Date.now();      
    Scene_Name.prototype.initialize.call(this);
  };
  
  Scene_KorName.prototype.createBackground = function() {
    var bitmap = SceneManager.backgroundBitmap();
    var customBackgroundImageName = $.Params.defaultBackground;
    this._backgroundSprite = new Sprite();
    
    // 배경 설정이 auto면 이전 장면의 스냅샷을 배경 화면으로 사용한다.
    if(customBackgroundImageName === 'auto') {
      this._backgroundSprite.bitmap = bitmap;
    } else {
      this._backgroundSprite.bitmap = ImageManager.loadPicture(customBackgroundImageName || '');
    }
    
    this.addChild(this._backgroundSprite);
    
  };
  
  Scene_KorName.prototype.createPlatformFeatures = function() {
    if(Utils.isMobileDevice()) {
      this.createCommandWindow();
    } else {
      this._textBox.getFocus();
    }
  };
  
  Scene_KorName.prototype.updatePlatformFeatures = function() {
    if(Utils.isMobileDevice()) {
      if(this._commandWindow.active) {
        this._textBox.blur();
      } else {
        this._textBox.getFocus();
      }
    } else {
      this._textBox.getFocus();
    }
  };  
  
  Scene_KorName.prototype.onInputOkPlatformFeatures = function() {
    if(Utils.isMobileDevice()) {    
      
      // Lose Focus
      this._editWindow.deactivate();
      this._textBox.blur();

      // Select symbol.
      this._commandWindow.selectSymbol('ok');
      this._commandWindow.activate();    
      
    } else {

      this._editWindow.deactivate();
      this._textBox.blur();

      this._actor.setName(this._editWindow.name());
      this.popScene();
    }
  };
  
  Scene_KorName.prototype.terminatePlatformFeatures = function() {
    if(Utils.isMobileDevice()) {  
    } else {
      this._textBox.blur();
    }
  };    
  
  Scene_KorName.prototype.update = function() {
    this.updatePlatformFeatures();
    this._textBox.update();
    this.updateHelpWindow();
    Scene_MenuBase.prototype.update.call(this);
  };
  
  Scene_KorName.prototype.updateHelpWindow = function() {
    // 1초가 경과했을 경우, 도움말의 라이프를 1 줄인다.
    if( Date.now() - this._nowTime >= 1000) {
      this._helpWindowLife--;
      if(this._helpWindowLife <= 0) {
        this._helpWindow.hide();
      }
      this._nowTime = Date.now();
    }
  };
  
  Scene_KorName.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    this.terminatePlatformFeatures();
    this._textBox.terminate();
    // 한글 비트맵 폰트 사용을 재개한다.
    if(Imported.RS_HangulBitmapText) {
      $gameTemp.setHangulBitmapText(RS.HangulBitmapText.Params.tempInit);
    }
  };
  
  Scene_KorName.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createTextBox();
    this.createPlatformFeatures();
    this.createHelpWindow();
    this._textBox.setEvent( this.onInputOk.bind(this) );
    this._textBox.setAlertWindow( this.onAlert.bind(this) );
  };
  
  Scene_KorName.prototype.onAlert = function(text) {
    if(!$.Params.isValidErrorMessage) return;
    if(!this._helpWindow) return;
    this._helpWindow.show();
    this._helpWindow.setText(text);
    this._helpWindowLife = 3;    
  };
  
  Scene_KorName.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help(1);
    this._helpWindow.x = 0;
    this._helpWindow.y = Graphics.boxHeight - Math.ceil(Graphics.boxHeight / 6) - this._helpWindow.height;
    this._helpWindow.opacity = $.Params.helpWindowOpacity;
    this._helpWindowLife = 0;    
    this._helpWindow.hide();
    this.addWindow(this._helpWindow);
  };
  
  Scene_KorName.prototype.createEditWindow = function() {
    this._editWindow = new Window_KorNameEdit(this._actor, this._maxLength);
    var self = this._editWindow;
    var width = self.windowWidth();
    var height = self.windowHeight();    
    var x = (Graphics.boxWidth - width) / 2;
    var y = Math.floor(Graphics.boxHeight / 6);
    this._editWindow.x = x;
    this._editWindow.y = y;
    this.addWindow(this._editWindow);
  };
  
  Scene_KorName.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_KorNameInput(this._editWindow);
    this._commandWindow.y = this._editWindow.y + this._editWindow.height;
    this._commandWindow.setHandler('edit', this.commandEdit.bind(this));
    this._commandWindow.setHandler('ok', this.commandInput.bind(this));
    this._commandWindow.setHandler('cancel', this.commandCancel.bind(this));
    this.addWindow(this._commandWindow);
  };
  
  Scene_KorName.prototype.commandEdit = function () {
    this._commandWindow.deactivate();
    this._editWindow.activate();
    this._textBox.getFocus();
  };
  
  /**
  * specify the name on your actor and then a currently scene ends up
  * @method commandInput
  */
  Scene_KorName.prototype.commandInput = function () {
    var name = this._editWindow._name;
    
    this._editWindow.deactivate();
    this._textBox.blur();
    this._actor.setName(this._editWindow.name());
    this.popScene();
  };
  
  /**
  * A currently scene ends up
  * @method commandCancel
  */
  Scene_KorName.prototype.commandCancel = function () {
    this._textBox.blur();
    this.popScene();
  };
  
  Scene_KorName.prototype.createTextBox =  function() {
    this._textBox = new TextBox(this._editWindow);
    this._initialName = "";
    if(this._actor) { 
      this._textBox.setDefaultName(this._actor.name());
      this._initialName = this._actor.name();
    }
    if($.Params.windowCenter === "true") {
      this._editWindow.y = Graphics.boxHeight / 2 - this._editWindow.height / 2;
    }
    this._editWindow.opacity = $.Params.opacity;
  };
  
  Scene_KorName.prototype.onInputOk = function() {
    this.onInputOkPlatformFeatures();
    
    Input.clear();
    
  };
  
  //===========================================================================
  // Game_Interpreter
  //===========================================================================
  
  // Name Input Processing
  Game_Interpreter.prototype.command303 = function() {
    if (!$gameParty.inBattle()) {
      if ($dataActors[this._params[0]]) {
        SceneManager.push(Scene_KorName);
        SceneManager.prepareNextScene(this._params[0], this._params[1]);
      }
    }
    return true;
  };
  
  //===========================================================================
  // Game_Interpreter
  //===========================================================================
  
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "KNE") {
      switch(args[0]) {
        case 'width':
        case '폭':
        if(args[1] !== 'auto') {
          $.Params.windowWidth = Number(args[1] || 580);
        } else {
          $.Params.windowWidth = 'auto';
        }
        break;
        case 'center':
        case '중앙정렬':
        $.Params.windowCenter = String(args[1] || 'false');
        break;
        case 'outlineWidth':
        case '테두리크기':
        $.Params.outlineWidth = Number(args[1] || 1);
        break;
        case 'outlineColor':
        case '테두리색상':
        $.Params.outlineColor = String(args[1] || 'black');
        break;
        case 'fontColor':
        case '폰트색상':
        $.Params.fontColor = String(args[1] || 'white');
        break;
        case 'fontSize':
        case '폰트크기':
        $.Params.standardFontSize = Number(args[1] || 28);
        break;
        case 'opacity':
        case '투명도':
        var _opacity = Number(args[1] || 1);
        $.Params.opacity = _opacity.clamp(0, 255);
        break;
        case 'askText':
        case '텍스트':
        $.Params.askText = String(args.slice(1).join(""));
        break;
      }
    }
    if(command === "OpenXNameInput") {
      if (!$gameParty.inBattle()) {
        var leaderId = $gameParty.leader().actorId();
        var actorId = (args[0] === "leader") ? leaderId : (parseInt(args[0]) || leaderId);
        var digits = parseInt(args[1]) || 6;
        if ($dataActors[actorId]) {
          SceneManager.push(Scene_KorName);
          SceneManager.prepareNextScene(actorId, digits);
        }
      }
    }       
  };
  
})(RS.Window_KorNameEdit);