//================================================================
// RS_Window_KorNameEdit.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc (v0.5.2) This plugin allows you to type in korean in the Name Input Proccessing <RS_Window_KorNameEdit>
 * @author biud436
 * @url https://biud436.tistory.com/
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
 * @on true
 * @off false
 * 
 * @help
 * # Credit and Thanks
 * Biud436
 * 
 * # Terms of Use
 * Free for commercial and non-commercial use.
 * 
 * # License
 * The MIT License (MIT)
 * 
 * ============================================
 * Change Log
 * ============================================
 * 2020.08.07 (v0.5.2) :
 * - Fixed the bug that can't hide IME.
 * 
 * @command KNE
 * @text Korean Name Input
 * @desc This plugin command allows you to type the name using IME.
 * 
 * @arg width
 * @desc Specify the width of name edit window.
 * @default 580
 * 
 * @arg center
 * @type boolean
 * @desc Sets whether the name window will be placed to center of the screen.
 * @default true
 * @on true
 * @off false
 * 
 * @arg outlineWidth
 * @type number
 * @desc Specify the outline width.
 * @default 1
 * @min 0
 * 
 * @arg outlineColor
 * @type string
 * @desc Specify the outline color as you want.
 * @default black
 * 
 * @arg textColor
 * @text Text Color
 * @type string
 * @desc Specify the desired text color (default : white)
 * @default white
 * 
 * @arg fontSize
 * @type number
 * @desc Specify the font size (default : 28)
 * @default 28
 * @min 0
 * 
 * @arg opacity
 * @type number
 * @desc Specify the window opacity (default : 225)
 * @default 225
 * @min 0
 * @max 255
 * 
 * @arg askText
 * @type string
 * @desc Specify the default text hint text.
 * @default Please enter the name
 * 
 * @command OpenXNameInput
 * @text Open XName Input
 * @desc Type the name using IME
 * 
 * @arg actorId
 * @type number
 * @desc if -1, actor's id sets as an id of leader.
 * @default -1
 * @min -1
 * @max 4000
 * 
 * @arg digits
 * @type number
 * @desc Specify the size of the name (default : 6)
 * @default 6
 * @min 6
 * 
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
 * @target MZ
 * @plugindesc 한글 이름 입력 플러그인 <RS_Window_KorNameEdit>
 * @author 러닝은빛(biud436)
 * @url https://biud436.blog.me
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
 * MZ용 한글 이름 입력 플러그인입니다.
 * 
 * 한글 이름 입력 방식에는 크게는 유니코드와 키보드 이벤트를 이용하여 초성, 중성, 종성을 직접 조합하는 방법이 있고,
 * 유니티나 cocos2d-x 같은 게임 엔진에서 사용하는 방법처럼 IME를 이용하는 방법이 있습니다.
 * 
 * 본 플러그인은 IME를 사용합니다.
 * IME는 인터넷 게시판에서 글을 작성할 때와 동일한 한글 조합 기능을 제공하며 한국어, 중국어, 일본어 등 여러가지 언어도 입력할 수 있습니다.
 * 
 * IME는 화면에서는 보이지 않는 <input> 폼을 생성하여 처리합니다.
 * 
 * @command KNE
 * @text Korean Name Input
 * @desc IME를 이용하여 액터의 이름을 설정할 수 있습니다.
 * 
 * @arg width
 * @text 폭
 * @desc 이름 편집 윈도우의 폭을 지정하세요 (기본값 : 580)
 * @default 580
 * 
 * @arg center
 * @text 중앙 정렬
 * @type boolean
 * @desc 창을 정확히 중앙에 정렬하고자 한다면 참으로 설정하세요
 * @default true
 * @on 참
 * @off 거짓
 * 
 * @arg outlineWidth
 * @text 테두리 굵기
 * @type number
 * @desc 폰트의 테두리 굵기를 설정하세요 (기본값 : 1)
 * @default 1
 * @min 0
 * 
 * @arg outlineColor
 * @text 테두리 색상
 * @type string
 * @desc 원하는 테두리 색상을 지정하세요 (기본값 : black)
 * @default black
 * 
 * @arg textColor
 * @text 텍스트 색상
 * @text Text Color
 * @type string
 * @desc 텍스트 색상을 변경할 수 있습니다 (기본값 : white)
 * @default white
 * 
 * @arg fontSize
 * @text 폰트 크기
 * @type number
 * @desc 폰트의 크기를 설정하세요 (기본값 : 28)
 * @default 28
 * @min 0
 * 
 * @arg opacity
 * @text 투명도
 * @type number
 * @desc 투명도를 설정하세요 (기본값 : 225)
 * @default 225
 * @min 0
 * @max 255
 * 
 * @arg askText
 * @text 안내 텍스트
 * @type string
 * @desc 안내 텍스트를 설정하세요
 * @default Please enter the name
 * 
 * @command OpenXNameInput
 * @text 이름 8자 이상 입력 받기
 * @desc 8자 이상의 이름을 설정하고자 할 때 사용하는 플러그인 명령입니다.
 * 
 * @arg actorId
 * @type number
 * @desc -1로 설정하면 자동으로 리더 파티원으로 설정됩니다.
 * @default -1
 * @min -1
 * @max 4000
 * 
 * @arg digits
 * @type number
 * @desc 이름의 길이를 입력하세요 (기본값 : 6)
 * @default 6
 * @min 6
 * 
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

(($) => {

    "use strict";

    $.Params = RS.Window_KorNameEdit.Params || {};

    const pluginParams = $plugins.filter(i => {
        return i.description.contains('<RS_Window_KorNameEdit>');
    });

    const pluginName = (pluginParams.length > 0) && pluginParams[0].name;
    const parameters = (pluginParams.length > 0) && pluginParams[0].parameters;

    $.Params.windowWidth = parameters['windowWidth'];
    $.Params.windowCenter = String(parameters['windowCenter'] || 'false');
    $.Params.outlineWidth = Number(parameters['outlineWidth'] || 1);
    $.Params.outlineColor = String(parameters['outlineColor'] || 'black');
    $.Params.textColor = String(parameters['fontColor'] || 'white');
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

    const original_Input_shouldPreventDefault = Input._shouldPreventDefault;
    const dialog_Input_shouldPreventDefault = function (keyCode) {
        switch (keyCode) {
            case 33: // pageup
            case 34: // pagedown
            case 37: // left arrow
            case 38: // up arrow
            case 39: // right arrow
            case 40: // down arrow
                return true;
        }
        return false;
    };

    $.jsonParse = function (str) {
        const retData = JSON.parse(str, function (k, v) {
            try {
                return $.jsonParse(v);
            } catch (e) {
                return v;
            }
        });
        return retData;
    };

    $.Params.style = $.jsonParse(parameters["Style"]);

    $.Params.isValidFace = Boolean(parameters["Show Face"] === "true");

    //===========================================================================
    // Plugin Commands
    //===========================================================================

    PluginManager.registerCommand(pluginName, "KNE", args => {
        $.Params.windowWidth = (args.width === "auto") ? "auto" : Number(args.width);
        $.Params.windowCenter = Boolean(args.center == "true")
        $.Params.outlineWidth = Number(args.outlineWidth || 1);
        $.Params.outlineColor = String(args.outlineColor || 'black');
        $.Params.textColor = String(args.textColor || 'white');
        $.Params.standardFontSize = Number(args.fontSize || 28);
        $.Params.opacity = Number(args.opacity || 225);
        $.Params.askText = String(args.askText);
    });

    /**
     * @example
     * PluginManager.callCommand($gameMap._interpreter, "RS_Window_KorNameEdit", "OpenXNameInput", {actorId: -1, digits: 6});
     */
    PluginManager.registerCommand(pluginName, "OpenXNameInput", args => {
        let actorId = Number(args.actorId);
        const leaderId = $gameParty.leader().actorId();

        if (!$gameParty.inBattle()) {
            if (actorId === -1) actorId = leaderId;
            const digits = Number(args.digits);
            if ($dataActors[actorId]) {
                SceneManager.push(Scene_KorName);
                SceneManager.prepareNextScene(actorId, digits);
            }
        }
    });    

    //===========================================================================
    // TextBox Class
    //===========================================================================

    class TextBox {

        constructor(_editWindow) {
            this._editWindow = _editWindow;
            this.createTextBox();
            this.startToConvertInput();
            this.blur();
        }

        isKeyboardEditorHidden() {
            return $.Params.isKeyboardEditorHidden;
        }

        createTextBox() {
            this._textBox = document.createElement('input');
            this._textBox.type = "text";
            this._textBox.id = "textBox";

            // Get z-index of the game canvas.
            const canvasIndex = Number(Graphics._canvas.style.zIndex);

            this._textBox.style.zIndex = this.isKeyboardEditorHidden() ? -1 : (canvasIndex + 2);

            this._textBox.style.position = 'absolute';
            this._textBox.style.top = 0;
            this._textBox.style.left = 0;
            this._textBox.style.right = 0;
            this._textBox.style.bottom = 0;

            // 자동 완성 off
            const chrome_versions_ = navigator.userAgent.split(/(?:Chrome\/)(.{2})/);
            if (chrome_versions_ && chrome_versions_[1] >= '69') {
                this._textBox.autocomplete = "off";
            }

            if (this.isKeyboardEditorHidden()) {
                if (Utils.isMobileDevice()) {
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

            this._alertFunc = function () {};
            this._okFunc = function () {};
            this._defaultName = "";

            document.body.appendChild(this._textBox);

        }

        startToConvertInput() {
            Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
        }

        startToOriginalInput() {
            Input._shouldPreventDefault = original_Input_shouldPreventDefault;
        }

        setEvent(func) {
            this._textBox.onchange = func;
            this._okFunc = func;
        }

        removeEvent() {
            this._textBox.onchange = null;
            this._okFunc = null;
        }

        setAlertWindow(alert_) {
            this._alertFunc = alert_;
        }

        removeElement() {
            this._textBox.style.display = 'none';
            document.body.removeChild(this._textBox);
        }

        terminateTextBox() {
            this.removeEvent();
            this.removeElement();
            this.startToOriginalInput();
        }

        onKeyDown(e) {
            const keyCode = e.which;

            this.getFocus();

            if (keyCode < TextBox.IS_NOT_CHAR) {
                if (keyCode === TextBox.BACK_SPACE) {
                    // if(e && e.preventDefault) e.preventDefault();
                } else if (keyCode === TextBox.ENTER) {
                    if (this.getTextLength() <= 0) {
                        e.preventDefault();
                        this._alertFunc($.Params.didnt_type_anytext);
                    } else if (this._defaultName === this._textBox.value) {
                        // e.preventDefault();
                        this._alertFunc($.Params.cant_type_same_name);
                        if (this._okFunc) this._okFunc();
                    }
                }
            } else if (keyCode < TextBox.KEYS_ARRAY) {
                //
            }
        }

        getTextLength() {
            return this._textBox.value.length;
        }

        getMaxLength() {
            return this._editWindow._maxLength;
        }

        backSpace() {
            this._editWindow._name = this._editWindow._name.slice(0, this._textBox.value.length - 1);
            this._editWindow._index = this._textBox.value.length;
            this._textBox.value = this._editWindow._name;
            this._editWindow.refresh();
        }

        refreshNameEdit() {
            this._editWindow._name = this._textBox.value.toString();
            this._editWindow._index = this._textBox.value.length || 0;
            this._editWindow.refresh();
        }

        update() {
            if (this.getTextLength() <= this._editWindow._maxLength) {
                this.refreshNameEdit();
            }
        }

        getFocus() {
            this._textBox.focus();
        }

        blur() {
            this._textBox.blur();
        }

        terminate() {
            this.terminateTextBox();
        }

        setDefaultName(name) {
            this._textBox.value = name || '';
            this._defaultName = name;
            this.refreshNameEdit();
        }
    }

    TextBox.BACK_SPACE = 8;
    TextBox.ENTER = 13;
    TextBox.IS_NOT_CHAR = 32;
    TextBox.KEYS_ARRAY = 255;

    window.TextBox = TextBox;

    //===========================================================================
    // Window_KorNameEdit
    //===========================================================================

    class Window_KorNameEdit extends Window_NameEdit {
        constructor(rect) {
            super(rect);
            this.updateWindowWidth();
        }

        faceWidth() {
            return $.Params.isValidFace ? 144 : 0;
        }

        getStandardFontFace() {
            if ($gameSystem.isChinese()) {
                return $.Params.fonts.ChineseFonts;
            } else if ($gameSystem.isKorean()) {
                return $.Params.fonts.KoreanFonts;
            } else {
                return $.Params.fonts.DefaultFonts;
            }
        }

        textPadding() {
            return 6;
        }

        updateWindowWidth() {
            const padding = this.padding * 2;
            const faceWidth = $.Params.isValidFace ? this.faceWidth() : 0;
            const textWidth = this.textWidth($.Params.askText) + this.textPadding() * 2;
            if ($.Params.windowWidth === 'auto') {
                this.width = Math.max(Math.min(padding + faceWidth + textWidth, Graphics.boxWidth - padding), 580);
            } else {
                this.width = Number($.Params.windowWidth || 580);
            }
        };

        resetFontSettings() {
            super.resetFontSettings();
            this.contents.fontFace = this.getStandardFontFace();
            this.contents.textColor = $.Params.textColor;
            this.contents.outlineColor = $.Params.outlineColor;
            this.contents.outlineWidth = $.Params.outlineWidth;
            this.contents.fontSize = $.Params.standardFontSize;
        }

        charWidth() {
            let text = $.Params.defaultCharWidth;
            if (navigator.language.match(/^zh/)) { // isChinese
                text = '\u4E00';
            } else if (navigator.language.match(/^ko/)) { // isKorean
                text = '\uAC00';
            } else if (navigator.language.match(/^ja/)) { // isJapanese
                text = '\u3042';
            }
            return this.textWidth(text);
        }

        left() {
            const nameCenter = (this.innerWidth + this.faceWidth()) / 2;
            const nameWidth = (this._maxLength + 1) * this.charWidth();
            return Math.min(nameCenter - nameWidth / 2, this.innerWidth - nameWidth);
        }

        itemRect(index) {
            const x = this.left() + index * this.charWidth();
            const y = this.fittingHeight(1);
            const width = this.charWidth();
            const height = this.lineHeight();
            return new Rectangle(x, y, width, height);
        }

        drawActorFace(actor, x, y, width, height) {
            if ($.Params.isValidFace) {
                this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
            }
            this.changeTextColor(ColorManager.hpColor(actor));
            this.drawText($.Params.askText, this.left(), y + this.fittingHeight(1) / 2, this.width);
        }

        refresh() {
            this.contents.clear();
            this.drawActorFace(this._actor, 0, 0);

            const rect = this.itemRect(Math.max(this._index - 1, 0));

            for (let i = 0; i < this._maxLength; i++) {
                this.drawUnderline(i);
            }
            for (let j = 0; j < this._name.length; j++) {
                this.drawChar(j);
            }

            if (this._index === 0) {
                this.setCursorRect(rect.x, rect.y, 1, rect.height);
            } else {
                this.setCursorRect(rect.x + (rect.width - 1), rect.y, 1, rect.height);
            }
        }
    }

    //===========================================================================
    // Window_KorNameInput
    //===========================================================================
    class Window_KorNameInput extends Window_Command {

        constructor(rect) {
            super(rect);
            this.clearCommandList();
            this.makeCommandList();
            this.updatePlacement();
            this.refresh();
            this.select(0);
            this.activate();
        }

        setEditWindow(editWindow) {
            this._editWindow = editWindow;
        }

        spacing() {
            return 12;
        }

        makeCommandList() {
            this.addCommand($.Params.defaultEditButtonName, 'edit');
            this.addCommand($.Params.defaultOKButtonName, 'ok');
            this.addCommand($.Params.defaultCancelButtonName, 'cancel');
        }

        textPadding() {
            return 6;
        }

        updatePlacement() {
            if (!this._editWindow) {
                return;
            }

            let width = 0;

            for (let i = 0; i < this.maxItems(); i++) {
                width += this.textWidth(this._list[i].name) + this.textPadding() * 2;
            }

            width += this.padding * 2 + this.spacing();

            this.width = width;
            this.x = this._editWindow.x + this._editWindow.width - width;
            this.y = this._editWindow.y + this._editWindow.height + 10;
        };

        maxCols() {
            return 3;
        }
    }

    //===========================================================================
    // Scene_Name Class
    //===========================================================================

    class Scene_KorName extends Scene_Name {

        constructor() {
            super();
            this.initWithDeltaTime();
        }

        initWithDeltaTime() {
            this._nowTime = Date.now();
        }

        createBackground() {
            const bitmap = SceneManager.backgroundBitmap();
            const customBackgroundImageName = $.Params.defaultBackground;

            this._backgroundSprite = new Sprite();

            // 배경 설정이 auto면 이전 장면의 스냅샷을 배경 화면으로 사용한다.
            if (customBackgroundImageName === 'auto') {
                this._backgroundSprite.bitmap = bitmap;
            } else {
                this._backgroundSprite.bitmap = ImageManager.loadPicture(customBackgroundImageName || '');
            }

            this.addChild(this._backgroundSprite);

        }

        createPlatformFeatures() {
            if (Utils.isMobileDevice()) {
                this.createCommandWindow();
            } else {
                this._textBox.getFocus();
            }
        }

        updatePlatformFeatures() {
            if (Utils.isMobileDevice()) {
                if (this._commandWindow.active) {
                    this._textBox.blur();
                } else {
                    this._textBox.getFocus();
                }
            } else {
                this._textBox.getFocus();
            }
        }

        onInputOkPlatformFeatures() {
            if (Utils.isMobileDevice()) {

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
        }

        terminatePlatformFeatures() {
            if (Utils.isMobileDevice()) {} else {
                this._textBox.blur();
            }
        }

        update() {
            this.updatePlatformFeatures();
            this._textBox.update();
            this.updateHelpWindow();

            super.update();
        }

        updateHelpWindow() {
            // 1초가 경과했을 경우, 도움말의 라이프를 1 줄인다.
            if (Date.now() - this._nowTime >= 1000) {
                this._helpWindowLife--;
                if (this._helpWindowLife <= 0) {
                    this._helpWindow.hide();
                }
                this._nowTime = Date.now();
            }
        }

        terminate() {
            super.terminate();

            this.terminatePlatformFeatures();
            this._textBox.terminate();
        }

        create() {
            super.create();

            this._actor = $gameActors.actor(this._actorId);
            this.createEditWindow();
            this.createTextBox();
            this.createPlatformFeatures();
            this.createHelpWindow();
            this._textBox.setEvent(this.onInputOk.bind(this));
            this._textBox.setAlertWindow(this.onAlert.bind(this));
        }

        onAlert(text) {
            if (!$.Params.isValidErrorMessage) return;
            if (!this._helpWindow) return;
            this._helpWindow.show();
            this._helpWindow.setText(text);
            this._helpWindowLife = 3;
        }

        createHelpWindow() {
            let rect = this.helpWindowRect();
            rect.x = 0;
            rect.y = Graphics.boxHeight - Math.ceil(Graphics.boxHeight / 6) - this.helpAreaHeight();
            rect.height = this.calcWindowHeight(1, false);
            this._helpWindow = new Window_Help(rect);
            this._helpWindow.opacity = $.Params.helpWindowOpacity;
            this._helpWindowLife = 0;
            this._helpWindow.hide();
            this.addWindow(this._helpWindow);
        }

        createEditWindowRect() {
            const ww = 580;
            const wh = this.calcWindowHeight(4, false);
            const wx = (Graphics.boxWidth - ww) / 2;
            let wy = 0;

            if ($.Params.windowCenter) {
                wy = Graphics.boxHeight / 2 - wh / 2;
            } else {
                wy = this.mainAreaTop() + Math.floor(Graphics.boxHeight / 6);
            }

            return new Rectangle(wx, wy, ww, wh);
        }

        isBottomHelpMode() {
            return false;
        }

        createCommandWindowRect() {
            const gw = Graphics.boxWidth;
            const gh = Graphics.boxHeight;
            const w = this.mainCommandWidth();
            const h = this.calcWindowHeight(1, true);

            if (!this._editWindow) {
                return new Rectangle(
                    gw / 2 - w / 2,
                    gh / 2 - h / 2,
                    w,
                    h
                );
            }

            return new Rectangle(
                this._editWindow.x,
                this._editWindow.y + this._editWindow.height + 8,
                this._editWindow.width - w,
                h
            );
        }

        createEditWindow() {
            const rect = this.createEditWindowRect();
            this._editWindow = new Window_KorNameEdit(rect);
            this._editWindow.setup(this._actor, this._maxLength);
            this.addWindow(this._editWindow);
        }

        createInputWindow() {

        }

        inputWindowRect() {

        }

        createCommandWindow() {
            const rect = this.createCommandWindowRect();
            this._commandWindow = new Window_KorNameInput(rect);
            this._commandWindow.setEditWindow(this._editWindow);

            this._commandWindow.y = this._editWindow.y + this._editWindow.height;
            this._commandWindow.setHandler('edit', this.commandEdit.bind(this));
            this._commandWindow.setHandler('ok', this.commandInput.bind(this));
            this._commandWindow.setHandler('cancel', this.commandCancel.bind(this));
            this.addWindow(this._commandWindow);
        }

        commandEdit() {
            this._commandWindow.deactivate();
            this._editWindow.activate();
            this._textBox.getFocus();
        }

        /**
         * specify the name on your actor and then a currently scene ends up
         * @method commandInput
         */
        commandInput() {
            this._editWindow.deactivate();
            this._textBox.blur();
            this._actor.setName(this._editWindow.name());
            this.popScene();
        }

        /**
         * A currently scene ends up
         * @method commandCancel
         */
        commandCancel() {
            this._textBox.blur();
            this.popScene();
        }

        createTextBox() {
            this._textBox = new TextBox(this._editWindow);
            this._initialName = "";
            if (this._actor) {
                this._textBox.setDefaultName(this._actor.name());
                this._initialName = this._actor.name();
            }
            this._editWindow.opacity = $.Params.opacity;
        }

        onInputOk() {
            this.onInputOkPlatformFeatures();

            Input.clear();

        }

    }

    //===========================================================================
    // Game_Interpreter
    //===========================================================================

    // Name Input Processing
    Game_Interpreter.prototype.command303 = function (params) {
        if (!$gameParty.inBattle()) {
            if ($dataActors[params[0]]) {
                SceneManager.push(Scene_KorName);
                SceneManager.prepareNextScene(params[0], params[1]);
            }
        }
        return true;
    };

})(RS.Window_KorNameEdit);
