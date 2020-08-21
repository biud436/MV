//================================================================
// RS_InputDialog.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc This plugin allows you to display Text Edit Box on the screen. <RS_InputDialog>
 * @author biud436
 *
 * @param textBox Width
 * @type number
 * @desc Sets the width of Text Box.
 * @default 488
 * @decimals 0
 * @min 28
 *
 * @param textBox Height
 * @type number
 * @desc Sets the height of Text Box.
 * @default 36
 * @decimals 0
 * @min 8
 *
 * @param variable ID
 * @type variable
 * @desc Sets an id of the game variables.
 * @default 3
 *
 * @param debug
 * @type boolean
 * @desc Whether this determines the alert window.
 * @default false
 *
 * @param Text Hint
 * @desc Sets the string that is the top of the text box.
 * @default Please enter the value...
 *
 * @param direction
 * @type select
 * @desc Sets the direction of content flow.
 * @default ltr
 * @option Left to Right
 * @value ltr
 * @option Right to Left
 * @value rtl
 *
 * @param Max Length
 * @type number
 * @desc Specifies the maximum number of character for an input field
 * @default 255
 * @min 1
 * @max 255
 *
 * @param Style
 *
 * @param CSS
 * @parent Style
 * @type note
 * @desc Edit the css as you want.
 * @default ""
 *
 * @param Button Name
 *
 * @param Ok
 * @parent Button Name
 * @text Ok Button Name
 * @desc Specify the name of the Ok Button.
 * @default OK
 *
 * @param Cancel
 * @parent Button Name
 * @text Cancel Button Name
 * @desc Specify the name of the Cancel Button.
 * @default Cancel
 *
 * @param Position
 * @text Initial Position
 * @desc Specify the position of the input dialog.
 * ('center' or '0, 0')
 * @default center
 *
 * @help
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 * - Opens Input Dialog.
 * InputDialog open
 *
 * - Changes the width of Input Dialog.
 * InputDialog width 488
 *
 * - Changes the text of Input Dialog for representing the description.
 * InputDialog text Please enter the string...
 *
 * - Changes an id of the variable for saving the value.
 * InputDialog variableID 3
 *
 * - Displays a alert window of the browser when you are pressing the enter
 * InputDialog debug true
 *
 * - Specifies the maximum number of character for an input field
 * InputDialog maxLength 10
 *
 * - This plugin commands decide how to set the position of the input dialog.
 * InputDialog pos center
 * InputDialog pos 0 0
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.08.09 (v1.0.0) - First Release.
 * 2016.08.09 (v1.0.1) - Added Background Color.
 * 2016.08.10 (v1.0.1a) - Added ID Variables.
 * 2016.08.10 (v1.1.0) - Fixed Window_DialogHelp class into the plugin.
 * 2016.08.16 (v1.1.1) - Added the direction property setting the direction of content flow.
 * 2016.08.16 (v1.1.1a) - Fixed a whitespace bug.
 * 2016.10.14 (v1.1.2) - Fixed the issue that is not working in Battle.
 * 2016.10.14 (v1.1.3) :
 * - Fixed the bug that does not change the background color.
 * - Fixed the bug that does not change the variable ID.
 * 2016.10.17 (v1.1.4) - Fixed the frame works of input dialog in battle.
 * 2016.10.18 (v1.1.5) - Fixed an issue that battler's movement is too fast.
 * 2016.10.29 (v1.1.6) - Added the function that allows you to specify the maximum number of character for an input field.
 * 2016.11.13 (v1.1.6a) - Fixed the issue that is directly calling the requestUpdate function of SceneManager.
 * 2016.12.02 (v1.1.6e) :
 * - Added some style codes such as a text shadow and an outline into the text box.
 * - Fixed the way that can temporarily stop attack and skill actions with an enemy when the text box is activated in the battle.
 * - It will not process the text input when the text box is not shown in the battle.
 * - In the debug mode, It adds the result value to a log window after the text input is done.
 * 2016.12.08 (v1.1.6h) - Removed the text hint window.
 * 2016.12.17 (v1.1.6i) - Fixed an issue that an integer value could not be checked due to the text type issue.
 * 2017.01.30 (v1.1.7) - Fixed an issue that is not working properly if the text dialog has a string to start with a number.
 * 2017.02.16 (v1.1.8) :
 * - Fixed incorrect position and width, height values in the text box.
 * - Added new feature that indicates the input dialog at the top position of the screen when pressing any key on your own mobile device.
 * - Added new feature that automatically returns a result of the text box if you did not press anything.
 * 2018.01.25 (v1.1.8a) - test...
 * 2018.01.30 (v1.1.9) :
 * - Added the button called 'OK'.
 * - Added the button called 'Cancel'.
 * - Removed the feature that can change the background-color of the input dialog.
 * - Fixed the issue that is not clicking the button in the mobile.
 * 2018.02.03 (v1.1.10) :
 * - Fixed the issue that is not working in RMMV 1.5.1
 * - Fixed the default value of the plugin parameter  called 'CSS'.
 * 2018.02.06 (v1.1.11) :
 * - Fixed the issue that is not working in the battle scene.
 * 2018.10.22 (v1.1.15) :
 * - Added a plugin command that sets the position of the input dialog.
 * - Added a feature that the keyboard layout is displayed again if you touch the text box from android devices.
 * - On the mobile device, the font size is now set to 1rem (16px).
 * - Fixed the default UI-theme is to black.
 * - In the chromium 69+ more over, The input element is always displayed even though <canvas>'s z-index is large than <input> element's z-index. so I've fixed that.
 * 2019.03.05 (v1.1.16) :
 * - Fixed the issue that can not create a background when using Irina_PerformanceUpgrade.
 *
 * @command open
 * @desc This command allows you to open the input dialog.
 *  
 * @command ChangeParams
 * @text Change Parameters
 * 
 * @arg width
 * @text width
 * @type number
 * @desc This arg allows you to change the width of Input Dialog.
 * @default 488
 * 
 * @arg text
 * @type string
 * @desc This arg allows you to change the text of Input Dialog for representing the description.
 * @default Please enter the string...
 * 
 * @arg variableId
 * @type variable
 * @desc This arg allows you to change an id of the variable for saving the value.
 * @default 3
 * 
 * @arg debug
 * @type boolean
 * @desc This arg allows you to display a alert window of the browser when you are pressing the enter.
 * @default true
 * @on true
 * @off false
 * 
 * @arg maxLength
 * @type number
 * @desc This arg allows you to specifie the maximum number of character for an input field.
 * @default 10
 * 
 * @arg pos
 * @type string
 * @default center
 * @desc This arg allows you to decide how to set the position of the input dialog. (center or 0, 0)
 */

var Imported = Imported || {};
Imported.RS_InputDialog = true;

var RS = RS || {};
RS.Utils = RS.Utils || {};

function Scene_InputDialog() {
    this.initialize.apply(this, arguments);
}

(() => {

    "use strict";

    const pluginParams = plugins.filter(i => {
        return i.description.contains('<RS_InputDialog>');
    });

    const pluginName = (pluginParams.length > 0) && pluginParams[0].name;
    const parameters = (pluginParams.length > 0) && pluginParams[0].parameters;

    RS.Utils.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
            try {
                return RS.Utils.jsonParse(v);
            } catch (e) {
                return v;
            }
        });
        return retData;
    };

    //============================================================================
    // Global Variables in RS.InputDialog
    //============================================================================

    RS.InputDialog.Params = {

        textBoxWidth : Number(parameters['textBox Width'] || 488),
        textBoxHeight : Number(parameters['textBox Height'] || 36),
        variableID : Number(parameters['variable ID'] || 3),
    
        debug : Boolean(parameters['debug'] === 'true'),
    
        localText : String(parameters['Text Hint'] || 'Test Message'),
        inputDirection : String(parameters['direction'] || 'ltr'),
    
        nMaxLength : parseInt(parameters['Max Length'] || '6'),
    
        szTextBoxId : 'md_textBox',
        szFieldId : 'md_inputField',
    
        nCheckScreenLock : 8000,
    
        okButtonName : parameters['Ok'] || "Ok",
        cancelButtonName : parameters['Cancel'] || "Cancel",
    
        exStyle : RS.Utils.jsonParse(parameters['CSS']),
    
        pos : new PIXI.Point(0, 0),

        isCenterAlignment: (function () {

            var position = parameters['Position'];
            position = position.trim();
            if (position === "center") {
                return true;
            }
            var reg = /(.*)[ ]*,[ ]*(.*)/i;
            if (reg.exec(position)) {
                if (RS.InputDialog.Params.pos) {
                    RS.InputDialog.Params.pos.x = parseFloat(RegExp.$1);
                    RS.InputDialog.Params.pos.y = parseFloat(RegExp.$2);
                }
            }
            return false;
        })()

    };

    //============================================================================
    // public methods in RS.InputDialog
    //============================================================================

    RS.InputDialog = new class {

        createInstance() {
            var scene = SceneManager._scene;
            if (scene instanceof Scene_Battle) {
                scene.showTextBox();
            } else {
                SceneManager.push(Scene_InputDialog);
            }
        }
    
        setRect() {
            "use strict";
    
            var query, textBox, OkButton, CancelButton;
    
            query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
            textBox = document.querySelector(query);
    
            query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-OkBtn]`;
            OkButton = document.querySelector(query);
    
            query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-CancelBtn]`;
            CancelButton = document.querySelector(query);
    
            if (textBox) {
                textBox.style.fontSize = (Utils.isMobileDevice()) ? '1rem' : (2 * Graphics._realScale) + "em";
                textBox.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
                textBox.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';
            }
    
            if (OkButton) OkButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem' : (1 * Graphics._realScale) + "em";
            if (CancelButton) CancelButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem' : (1 * Graphics._realScale) + "em";
    
        }
    
        startBattleBlur(target, value) {
            var blur = "blur(%1px)".format(value);
            target.style.webkitFilter = blur;
            target.style.filter = blur;
        }
    
        getScreenWidth(value) {
            return value;
        }
    
        getScreenHeight(value) {
            return value;
        }
    }

    //============================================================================
    // Input
    //============================================================================

    var original_Input_shouldPreventDefault = Input._shouldPreventDefault;
    var dialog_Input_shouldPreventDefault = function (keyCode) {
        switch (keyCode) {
            case 33: // pageup
            case 34: // pagedown
                // case 37:    // left arrow
            case 38: // up arrow
                // case 39:    // right arrow
            case 40: // down arrow
                return true;
        }
        return false;
    };

    //============================================================================
    // TextBox
    //============================================================================

    class TextBox {

        constructor(fieldID, textBoxID) {
            this._fieldId = fieldID;
            this._textBoxID = textBoxID;
            this._lastInputTime = performance.now();
            this._ready = false;
            this.prepareElement(fieldID);
            this.createTextBox(textBoxID);
        }


        startToConvertInput() {
            Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
        }

        startToOriginalInput() {
            Input._shouldPreventDefault = original_Input_shouldPreventDefault;
        }

        createTextBox(id) {

            "use strict";

            var self = this;
            var field = document.getElementById(this._fieldId);

            var style = `
      .inputDialogContainer {
        min-width : 10em;
        max-width : 2.5em;
        top : 0em;
        left : 0em;
        width : 10em;
        height : 2.5em;
        display : flex;
        flex-flow : column wrap;
        align-items : left;
        justify-content : left;
        padding : 0;
        margin : 0;
        box-sizing : border-box;
        resize : both;
        font-size: 16px!important;
    }
    
    .inputDialog {
        top : 0em;
        left : 0em;
        right : 0em;
        bottom : 0em;
        z-index : 1000;
        opacity : 0.8;
        position : relative;
        background-color : #ffffff;
        border : 2px solid #414141;
        border-radius : 10px;
        text-shadow : 0px 1px 3px #696969;
        font-family : arial;
        color : #1a1a1a;
        outline : none;
        font-size: 1rem!important;
    }
    
    .defaultButton {
        opacity : 0.8;
        font-family : arial;
        border : 1px solid rgb(73, 73, 73);
        background-image: -webkit-linear-gradient(top, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 100%);
        color : rgb(19, 19, 19);
        text-shadow : rgba(105, 105, 105, 0.7) 0 1px 0;
        cursor : pointer;
        border-radius : 0.5em;
        box-sizing : border-box;
        box-shadow : 0 1px 4px rgba(78, 78, 78, 0.6);
        font-size : 1rem!important;
    }
    
    .row {
        width : 70%;
        height: 1rem;
    }
    
    .col {
        width : 70%;
        height: 1rem;
    }
    
    @media screen and (min-width : 192px) and (max-width : 768px) {
        .defaultButton {
            font-size : 1rem!important;
        }
        .row {
            width : 100%;
            height: 2rem;
        }
        .col {
            width : 100%;
            height: 2rem;
        }
        .inputDialog {
            font-size : 1rem!important;
        }
    }
    
    @media screen and (min-width : 768px) and (max-width : 1000px) {
        .defaultButton {
            font-size : 1rem!important;
        }
        .row {
            width : 100%;
            height: 2rem;
        }
        .col {
            width : 100%;
            height: 2rem;
        }
        .inputDialog {
            font-size : 1rem!important;
        }
    }
      `;

            var exStyle = RS.InputDialog.Params.exStyle;

            var divInnerHTML = `
      <style>
      ${style}
      ${exStyle}
      .inputDialog {
        direction : ${RS.InputDialog.Params.inputDirection};
      }
      </style>
      <table class="inputDialogContainer">
        <tr class="row">
          <td class="col">
            <input class="inputDialog" type="text" id"=${id} placeholder="${RS.InputDialog.Params.localText}">
          </td>
        </tr>
        <tr class="row" valign="bottom">
          <td class="col" align="right">
            <input class="defaultButton" id="inputDialog-OkBtn" type="button" value="${RS.InputDialog.Params.okButtonName}" name="">
            <input class="defaultButton" id="inputDialog-CancelBtn" type="button" value="${RS.InputDialog.Params.cancelButtonName}" name="">
          </td>
        </tr>
      <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
      </table>
      `;

            field.innerHTML = divInnerHTML;

        };
        onLoadAfterInnerHTML() {
            if (SceneManager._scene) {
                if ((SceneManager._scene instanceof Scene_InputDialog)) {
                    if (SceneManager._scene._textBox) {
                        SceneManager._scene._textBox.addAllEventListener();
                    }
                }
            }
        }

        getTextBoxId() {
            const query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
            return document.querySelector(query);
        }

        getDefaultButtonId(id) {
            "use strict";
            id = id || "inputDialog-OkBtn";
            var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=${id}]`;
            return document.querySelector(query);
        }

        getMainContainer() {
            "use strict";
            var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer`;
            return document.querySelector(query);
        }

        addAllEventListener() {

            this._textBox = this.getTextBoxId();
            this._textBox.maxLength = RS.InputDialog.Params.nMaxLength;
            this._textBox.max = RS.InputDialog.Params.nMaxLength;

            this._textBox.addEventListener('keydown', this.onKeyDown.bind(this), false);
            if (!Utils.isMobileDevice()) {
                this._textBox.addEventListener('focus', this.onFocus.bind(this), false);
            }
            this._textBox.addEventListener('blur', this.onBlur.bind(this), false);
            this._textBox.addEventListener('touchstart', this.getFocus.bind(this), false);
            this._textBox.addEventListener('autosize', this.onResize.bind(this), false);

            window.addEventListener('resize', this.onResize.bind(this), false);

            this.startToConvertInput();
            this.setRect();
            this.onResize();

            if (SceneManager._scene instanceof Scene_InputDialog) {
                this.getFocus();
                this.show();
            }

            this._ready = true;

        }

        setRect() {
            const scale = Graphics._realScale;
            const textBox = this.getTextBoxId();
            const OkButton = this.getDefaultButtonId("inputDialog-OkBtn");
            const CancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");

            if (OkButton) OkButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem' : (1 * scale) + "em";
            if (CancelButton) CancelButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem' : (1 * scale) + "em";

            textBox.style.fontSize = (Utils.isMobileDevice()) ? '1rem' : (2 * Graphics._realScale) + "em";
            textBox.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * scale) + 'px';
            textBox.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * scale) + 'px';

        }

        prepareElement(id) {
            const field = document.createElement('div');

            field.id = id;
            field.style.position = 'absolute';
            field.style.left = '0';
            field.style.top = '0';
            field.style.right = '0';
            field.style.bottom = '0';
            field.style.width = '100%';
            field.style.height = '100%';
            field.style.zIndex = "0";
            field.style.display = "none";

            document.body.appendChild(field);
            if (RS.InputDialog.Params.isCenterAlignment) {
                Graphics._centerElement(field);
            }
            return field;
        }

        setEvent(okFunc, cancelFunc) {
            const okButton = this.getDefaultButtonId("inputDialog-OkBtn");
            const cancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");

            // Added callback functions for buttons.
            okButton.addEventListener('click', e => {
                okFunc();
                e.preventDefault();
            }, false);

            cancelButton.addEventListener('click', e => {
                cancelFunc();
                e.preventDefault();
            }, false);

            okButton.addEventListener('touchend', e => {
                okFunc();
                e.preventDefault();
            }, false);

            cancelButton.addEventListener('touchend', e => {
                cancelFunc();
                e.preventDefault();
            }, false);

            this._okFunc = okFunc;
            this._cancelFunc = cancelFunc;
        }

        terminateTextBox() {
            const field = document.getElementById(this._fieldId);

            if (field) {
                document.body.removeChild(field);
            }

            this.startToOriginalInput();
        }

        /**
         * 
         * @param {KeyboardEvent} e 
         */
        onKeyDown(e) {
            const keyCode = e.which;

            if (keyCode < TextBox.IS_NOT_CHAR) {
                // Process ENTER
                if (keyCode === TextBox.ENTER) {
                    if (this._okFunc instanceof Function) this._okFunc();
                }
                // Process ESC
                if (keyCode === TextBox.ESC) {
                    if (this._cancelFunc instanceof Function) this._cancelFunc();
                }
            }

            this._lastInputTime = performance.now();

        }

        onFocus(e) {
            const text = this.getTextBoxId();

            if (text && Utils.isMobileDevice()) {
                text.style.bottom = RS.InputDialog.getScreenHeight(Graphics.boxHeight / 2) + 'px';
            }
        }

        onBlur(e) {
            const text = this.getTextBoxId();

            if (text && Utils.isMobileDevice()) {
                text.style.bottom = '0';
                text.focus();
            }
            e.preventDefault();
        }

        setPosition(x, y) {
            const field = document.getElementById(this._fieldId);
            
            if(!Graphics._canvas) {
                return;
            }

            const rect = canvas.getBoundingClientRect();
            const mainContainer = this.getMainContainer();
            const bw = Math.max(Graphics.boxWidth, Graphics.width);
            const bh = Math.max(Graphics.boxHeight, Graphics.height);
            const tw = RS.InputDialog.Params.textBoxWidth;
            const th = RS.InputDialog.Params.textBoxHeight;

            if (field) {
                field.style.margin = "0";
                mainContainer.style.margin = "0";

                if (x < 0) {
                    x = 0;
                }

                if (x > bw - tw) {
                    x = bw - tw;
                }

                if (y < 0) {
                    y = 0;
                }

                if (y > bh - th) {
                    y = bh - th;
                }

                mainContainer.style.left = rect.left + x + "px";
                mainContainer.style.top = rect.top + y + "px";

            }
        }

        onResize() {
            const field = document.getElementById(this._fieldId);
            const bw = Math.max(Graphics.boxWidth, Graphics.width);
            const bh = Math.max(Graphics.boxHeight, Graphics.height);            
            const tw = RS.InputDialog.Params.textBoxWidth;
            const th = RS.InputDialog.Params.textBoxHeight;            
            const textBox = this.getTextBoxId();
            const mainContainer = this.getMainContainer();

            if (field && textBox) {

                Graphics._centerElement(field);
                Graphics._centerElement(mainContainer);

                this.setRect();

                // if the input element is placed on the center of the screen?
                if (RS.InputDialog.Params.isCenterAlignment) {

                    const px = (bw / 2) - (tw / 2);
                    const py = (bh / 2) - (th / 2);

                    this.setPosition(px, py);
                } else {

                    this.setPosition(RS.InputDialog.Params.pos.x, RS.InputDialog.Params.pos.y);
                }

            }
        }

        isScreenLock() {
            const val = parseInt(performance.now() - this._lastInputTime);
            let ret = false;

            if (val >= RS.InputDialog.Params.nCheckScreenLock && this.isBusy()) ret = true;
            
            this._lastInputTime = performance.now();

            return ret;
        }

        getTextLength() {
            const textBox = this.getTextBoxId();

            return textBox.value.length;
        }

        getFocus() {
            const textBox = this.getTextBoxId();

            textBox.focus();
        }

        setText(text) {
            const textBox = this.getTextBoxId();
            textBox.value = text || '';

            return textBox;
        }

        getText() {
            const textBox = this.getTextBoxId();

            return textBox.value;
        }

        hide() {
            const field = document.getElementById(this._fieldId);

            field.style.zIndex = 0;
            field.style.display = "none"; // for 0.33.4 
        }

        show() {
            const field = document.getElementById(this._fieldId);

            field.style.zIndex = 1000;
            field.style.display = "block"; // for 0.33.4 
        }

        setTextHint() {
            const textBox = this.getTextBoxId();

            return textBox.placeholder = RS.InputDialog.Params.localText;
        }

        isBusy() {
            const field = document.getElementById(this._fieldId);

            return field.style.zIndex > 0;
        }

        removeAllEventListener() {
            this._okFunc = null;
            this._cancelFunc = null;

            if (this._textBox) {
                this._textBox.outerHTML = this._textBox.outerHTML;
            }

            window.removeEventListener('resize', this.onResize.bind(this), false);

        }

        terminate() {
            this.removeAllEventListener();
            this.terminateTextBox();
        }

    }

    TextBox.BACK_SPACE = 8;
    TextBox.ENTER = 13;
    TextBox.ESC = 27;
    TextBox.IS_NOT_CHAR = 32;
    TextBox.KEYS_ARRAY = 255;

    //============================================================================
    // Scene_InputDialog
    //============================================================================

    class Scene_InputDialog extends Scene_Base {
        create() {
            super.create();
            this.createBackground();
            this.createTextBox();
        };
    
        update() {
            super.update();
            // TODO: 모바일에서 취소키를 누르면 키입력 창이 사라지는 버그가 있다.
            // 그래서 추가했지만 화면을 누르면 꺼진다는 것을 모르는 유저들이 버그로 착각할 수 있다.
            if (this.isScreenLock() && TouchInput.isTriggered()) {
                this.okResult();
            }
        };
    
        terminate() {
            super.terminate();
            this._textBox.terminate();
            this._textBox = null;
        };
    
        isScreenLock() {
            return this._textBox.isScreenLock();
        };
    
        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this._backgroundSprite.opacity = 128;
            this.addChild(this._backgroundSprite);
        };
    
        createTextBox() {
            this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
            this._textBox.setEvent(this.okResult.bind(this), this.cancelResult.bind(this));
            this._textBox.show();
            this._textBox.setTextHint();
        };
    
        okResult() {
            const text = this._textBox.getText() || '';

            if (text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);

            $gameVariables.setValue(RS.InputDialog.Params.variableID, text);

            if (SceneManager._stack.length > 0) {
                TouchInput.clear();
                Input.clear();
                this.popScene();
            };

        };
    
        cancelResult() {
            if (SceneManager._stack.length > 0) {
                TouchInput.clear();
                Input.clear();
                this.popScene();
            };
        };

    };

    //============================================================================
    // Game_Troop
    //============================================================================

    Game_Troop.prototype.battleInterpreterTaskLock = function () {
        this._interpreter._waitMode = 'IME Mode';
    };

    Game_Troop.prototype.battleInterpreterTaskUnlock = function () {
        this._interpreter._waitMode = '';
    };

    //============================================================================
    // Scene_Battle
    //============================================================================

    const alias_Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function () {
        alias_Scene_Battle_initialize.call(this);
        this.createTextBox();
    };

    const alias_Scene_Battle_create = Scene_Battle.prototype.create;
    Scene_Battle.prototype.create = function () {
        alias_Scene_Battle_create.call(this);
    };

    const alias_Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        alias_Scene_Battle_update.call(this);
        // TODO: 모바일에서 취소키를 누르면 키입력 창이 사라지는 버그가 있다.
        // 그래서 추가했지만 화면을 누르면 꺼진다는 것을 모르는 유저들이 버그로 착각할 수 있다.
        if (this.isScreenLock() && TouchInput.isTriggered()) {
            this.okResult();
        }
    };

    const alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        alias_Scene_Battle_terminate.call(this);
        if (this._textBox) {
            this._textBox.terminate();
            this._textBox = null;
        }
        if ($gameTemp.isCommonEventReserved()) {
            $gameTemp.clearCommonEvent();
        }
    };

    Scene_Battle.prototype.createTextBox = function () {
        this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
        this._textBox.setEvent(this.okResult.bind(this), this.cancelResult.bind(this));
    };

    Scene_Battle.prototype.textBoxIsBusy = function () {
        return this._textBox.isBusy();
    };

    Scene_Battle.prototype.showTextBox = function () {
        this._textBox.setText('');
        this._textBox.show();
        this._textBox.getFocus();
        this._textBox.setTextHint();
        this._textBox.setRect();
        this._textBox.onResize();
        $gameTroop.battleInterpreterTaskLock();
        this._textBox.addAllEventListener();
    };

    Scene_Battle.prototype.hideTextBox = function () {
        if (!this.textBoxIsBusy()) return false;
        this._textBox.hide();
        Input.clear();
        $gameTroop.battleInterpreterTaskUnlock();
    };

    Scene_Battle.prototype.isScreenLock = function () {
        return this._textBox.isScreenLock();
    };

    Scene_Battle.prototype.okResult = function () {
        if (!this._textBox) return '';
        if (this.textBoxIsBusy()) {
            const text = this._textBox.getText() || '';
            
            // 문자에서 숫자로 변경
            if (text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
            $gameVariables.setValue(RS.InputDialog.Params.variableID, text);

            this._textBox.setText('');

            if (RS.InputDialog.Params.debug) {
                const dmsg = 'You typed the text is same as '.concat($gameVariables.value(RS.InputDialog.Params.variableID) + '' || 'NONE');
                this._logWindow.push('addText', dmsg);
            }
            this.hideTextBox();
        }
    };

    Scene_Battle.prototype.cancelResult = function () {
        if (!this._textBox) return '';
        if (this.textBoxIsBusy()) {
            this._textBox.setText('');
            this.hideTextBox();
        }
    };

    //============================================================================
    // Game_Interpreter
    //============================================================================

    const alias_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function () {
        if (this._waitMode === 'IME Mode') {
            return true;
        } else {
            return alias_Game_Interpreter_updateWaitMode.call(this);
        }
    };

    RS.InputDialog.isEqual = function (eq) {
        const data = String($gameVariables.value(RS.InputDialog.Params.variableID));
        eq = String(eq);
        return (data === eq);
    };

    Game_Interpreter.prototype.isEqualInputData = function (eq) {
        return RS.InputDialog.isEqual(eq);
    };

    window.TextBox = TextBox;

    // var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    // Game_Interpreter.prototype.pluginCommand = function (command, args) {
    //     alias_Game_Interpreter_pluginCommand.call(this, command, args);
    //     if (command === "InputDialog") {
    //         switch (args[0]) {
    //             case 'open':
    //                 RS.InputDialog.createInstance();
    //                 break;
    //             case 'width':
    //                 RS.InputDialog.Params.textBoxWidth = Number(args[1] || 488);
    //                 RS.InputDialog.setRect();
    //                 break;
    //             case 'text':
    //                 RS.InputDialog.Params.localText = args.slice(1, args.length).join(' ');
    //                 break;
    //             case 'variableID':
    //                 RS.InputDialog.Params.variableID = Number(args[1] || 3);
    //                 break;
    //             case 'debug':
    //                 RS.InputDialog.Params.debug = Boolean(args[1] === 'true');
    //                 break;
    //             case 'maxLength':
    //                 RS.InputDialog.Params.nMaxLength = Number(args[1] || 255);
    //                 RS.InputDialog.setRect();
    //                 break;
    //             case 'pos':
    //                 if (args[1] === "center") {
    //                     RS.InputDialog.Params.isCenterAlignment = true;
    //                 } else {
    //                     RS.InputDialog.Params.isCenterAlignment = false;
    //                     RS.InputDialog.Params.pos.x = parseFloat(args[1] || 0);
    //                     RS.InputDialog.Params.pos.y = parseFloat(args[2] || 0);
    //                 }
    //                 break;
    //         }
    //     }
    // };

})();
