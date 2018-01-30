/*:
 * RS_InputDialog.js
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
 * @default "      .inputDialogContainer {\n        min-width : 10em;\n        max-width : 2.5em;\n        top : 0em;\n        left : 0em;\n        width : 10em;\n        height : 2.5em;\n        display : flex;\n        flex-flow : column wrap;\n        align-items : center;\n        justify-content : center;\n        padding : 0;\n        margin : 0;\n        box-sizing : border-box;\n        resize : both;\n      }\n      .inputDialog {\n        ime-mode : active;\n        top : 0em;\n        left : 0em;\n        right : 0em;\n        bottom : 0em;\n        z-index : 1000;\n        opacity : 0.8;\n        position : relative;\n        background-color : #cff09e;\n        border : 2px solid #3b8686;\n        border-radius : 10px;\n        text-shadow : 0px 1px 3px #a8dba8;\n        font-family : arial;\n        color : #79bd9a;\n        outline : none;\n      }\n      .defaultButton {\n        opacity : 0.8;\n        font-family : arial;\n        border : 1px solid #777;\n        background-image: -webkit-linear-gradient(top, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 100%)\n        color : #fff;\n        text-shadow : rgba(0,0,0,.7) 0 1px 0;\n        cursor : pointer;\n        border-radius : 0.5em;\n        box-sizing : border-box;\n        box-shadow : 0 1px 4px rgba(0, 0, 0, .6);\n\t\tfont-size : 1.4em;\n      }\n      .row {\n        width : 70%;\n        height: 1em;\n      }\n      .col {\n        width : 70%;\n        height: 1em;\n      }\n\t  \n\t  @media screen and (min-width : 192px) and (max-width 768px) {\n\t\t.defaultButton {\n\t\t\tfont-size : 6em;\n\t\t}\n\t\t.row {\n\t\t\twidth : 100%;\n\t\t\theight: 2em;\n\t\t}\n\t\t.col {\n\t\t\twidth : 100%;\n\t\t\theight: 2em;\n\t\t}\n\t\t.inputDialog {\n\t\t\tfont-size : 6em;\n\t\t}\n\t  }\n\t  @media screen and (min-width : 768px) and (max-width 1000px) {\n\t\t.defaultButton {\n\t\t\tfont-size : 5em;\n\t\t}\t  \n\t\t.row {\n\t\t\twidth : 100%;\n\t\t\theight: 2em;\n\t\t}\n\t\t.col {\n\t\t\twidth : 100%;\n\t\t\theight: 2em;\n\t\t}\t\n\t\t.inputDialog {\n\t\t\tfont-size : 6em;\n\t\t}\t\t\n\t  }\t  \n\t  \n\t  "
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
 */

var Imported = Imported || {};
Imported.RS_InputDialog = true;

var RS = RS || {};
RS.InputDialog = RS.InputDialog || {};
RS.InputDialog.Params = RS.InputDialog.Params || {};
RS.Utils = RS.Utils || {};

function Scene_InputDialog() {
  this.initialize.apply(this, arguments);
}

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_InputDialog>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  //============================================================================
  // Global Variables in RS.InputDialog
  //============================================================================

  RS.InputDialog.Params.textBoxWidth = Number(parameters['textBox Width'] || 488);
  RS.InputDialog.Params.textBoxHeight = Number(parameters['textBox Height'] || 36);
  RS.InputDialog.Params.variableID = Number(parameters['variable ID'] || 3);

  RS.InputDialog.Params.debug = Boolean(parameters['debug'] === 'true');

  RS.InputDialog.Params.localText = String(parameters['Text Hint'] || 'Test Message');
  RS.InputDialog.Params.inputDirection = String(parameters['direction'] || 'ltr');

  RS.InputDialog.Params.nMaxLength = parseInt(parameters['Max Length'] || '6');

  RS.InputDialog.Params.szTextBoxId = 'md_textBox';
  RS.InputDialog.Params.szFieldId = 'md_inputField';

  RS.InputDialog.Params.nCheckScreenLock = 8000;

  RS.InputDialog.Params.okButtonName = parameters['Ok'] || "Ok";
  RS.InputDialog.Params.cancelButtonName = parameters['Cancel'] || "Cancel";

  RS.InputDialog.Params.exStyle = RS.Utils.jsonParse(parameters['CSS']);

  //============================================================================
  // public methods in RS.InputDialog
  //============================================================================

  RS.InputDialog.createInstance = function() {
    var scene = SceneManager._scene;
    if(scene instanceof Scene_Battle) {
      scene.showTextBox();
    } else {
      SceneManager.push(Scene_InputDialog);
    }
  };

  RS.InputDialog.setRect = function () {
    "use strict";

    var query, textBox, OkButton, CancelButton;

    query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
    textBox = document.querySelector(query);

    query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-OkBtn]`;
    OkButton = document.querySelector(query);

    query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-CancelBtn]`;
    CancelButton = document.querySelector(query);

    if(textBox) {
      textBox.style.fontSize = (2 * Graphics._realScale) + "em";
      textBox.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
      textBox.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';
    }

    if(OkButton) OkButton.style.fontSize = (1 * Graphics._realScale) + "em";
    if(CancelButton) CancelButton.style.fontSize = (1 * Graphics._realScale) + "em";

  };

  RS.InputDialog.startBattleBlur = function(target, value) {
    var blur = "blur(%1px)".format(value);
    target.style.webkitFilter = blur;
    target.style.filter = blur;
  };

  RS.InputDialog.getScreenWidth = function (value) {
    return value;
  };

  RS.InputDialog.getScreenHeight = function (value) {
    return value;
  };

  //============================================================================
  // Input
  //============================================================================

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

  //============================================================================
  // TextBox
  //============================================================================

  function TextBox() {
    this.initialize.apply(this, arguments);
  };

  TextBox.BACK_SPACE = 8;
  TextBox.ENTER = 13;
  TextBox.ESC = 27;
  TextBox.IS_NOT_CHAR = 32;
  TextBox.KEYS_ARRAY = 255;

  TextBox.prototype.initialize = function(fieldID, textBoxID)  {
    this._fieldId = fieldID;
    this._textBoxID = textBoxID;
    this._lastInputTime = performance.now();
    this.prepareElement(fieldID);
    this.createTextBox(textBoxID);
  };

  TextBox.prototype.startToConvertInput = function () {
    Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
  };

  TextBox.prototype.startToOriginalInput = function () {
    Input._shouldPreventDefault = original_Input_shouldPreventDefault;
  };

  TextBox.prototype.createTextBox = function(id) {

    "use strict";

    var self = this;
    var field = document.getElementById(this._fieldId);

    var style = eval("`" + RS.InputDialog.Params.exStyle + "`");

    var divInnerHTML = `
    <style>
    ${style}
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

    field.innerHTML += divInnerHTML;

  };

  TextBox.onLoadAfterInnerHTML = function () {
    if(SceneManager._scene) {
      if( (SceneManager._scene instanceof Scene_InputDialog) ||
          (SceneManager._scene instanceof Scene_Battle) ) {
          if(SceneManager._scene._textBox) {
            SceneManager._scene._textBox.addAllEventListener();
          }
        }
    }
  };

  TextBox.prototype.getTextBoxId = function () {
    "use strict";
    var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
    return document.querySelector(query);
  };

  TextBox.prototype.getDefaultButtonId = function (id) {
    "use strict";
    id = id || "inputDialog-OkBtn";
    var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=${id}]`;
    return document.querySelector(query);
  };

  TextBox.prototype.getMainContainer = function () {
    "use strict";
    var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer`;
    return document.querySelector(query);
  };

  TextBox.prototype.addAllEventListener = function () {

    this._textBox = this.getTextBoxId();
    this._textBox.maxLength = RS.InputDialog.Params.nMaxLength;
    this._textBox.max = RS.InputDialog.Params.nMaxLength;

    this._textBox.addEventListener('keydown', this.onKeyDown.bind(this), false);
    if(!Utils.isMobileDevice()) {
      this._textBox.addEventListener('focus', this.onFocus.bind(this), false);
    }
    this._textBox.addEventListener('blur', this.onBlur.bind(this), false);
    this._textBox.addEventListener('autosize', this.onResize.bind(this), false);

    window.addEventListener('resize', this.onResize.bind(this), false);

    this.getFocus();
    this.setRect();
    this.startToConvertInput();
    this.onResize();
    this.show();

  };

  TextBox.prototype.setRect = function () {
    var textBox = this.getTextBoxId();
    var OkButton = this.getDefaultButtonId("inputDialog-OkBtn");
    var CancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");

    if(!Utils.isMobileDevice()) {
      OkButton.style.fontSize = (1 * Graphics._realScale) + "em";
      CancelButton.style.fontSize = (1 * Graphics._realScale) + "em";
    }

    textBox.style.fontSize = (2 * Graphics._realScale) + "em";
    textBox.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
    textBox.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';

  };

  TextBox.prototype.prepareElement = function(id) {
    var field = document.createElement('div');
    field.id = id;
    field.style.position = 'absolute';
    field.style.left = '0';
    field.style.top = '0';
    field.style.right = '0';
    field.style.bottom = '0';
    field.style.width = '100%';
    field.style.height = '100%';
    field.style.zIndex = "0";
    document.body.appendChild(field);
    Graphics._centerElement(field);
    return field;
  };

  TextBox.prototype.setEvent = function(okFunc, cancelFunc) {
    var okButton = this.getDefaultButtonId("inputDialog-OkBtn");
    var cancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");
    okButton.addEventListener('click', function (e) {
      okFunc();
      e.preventDefault();
    }, false);
    cancelButton.addEventListener('click', function (e) {
      cancelFunc();
      e.preventDefault();
    }, false);
    okButton.addEventListener('touchend', function (e) {
      okFunc();
      e.preventDefault();
    }, false);
    cancelButton.addEventListener('touchend', function (e) {
      cancelFunc();
      e.preventDefault();
    }, false);
    this._okFunc = okFunc;
    this._cancelFunc = cancelFunc;
  };

  TextBox.prototype.terminateTextBox = function() {
    var field = document.getElementById(this._fieldId);
    document.body.removeChild(field);
    this.startToOriginalInput();
  };

  TextBox.prototype.onKeyDown = function(e) {
    var keyCode = e.which;
    if (keyCode < TextBox.IS_NOT_CHAR) {
      if(keyCode === TextBox.ENTER) {
        if(this._okFunc instanceof Function) this._okFunc();
      }
      if(keyCode === TextBox.ESC) {
        if(this._cancelFunc instanceof Function) this._cancelFunc();
      }
    }

    this._lastInputTime = performance.now();

  };

  TextBox.prototype.onFocus = function (e) {
    var text = this.getTextBoxId();
    if(text && Utils.isMobileDevice()) {
      text.style.bottom = RS.InputDialog.getScreenHeight(Graphics.boxHeight / 2) + 'px';
    }
  };

  TextBox.prototype.onBlur = function (e) {
    var text = this.getTextBoxId();
    if(text && Utils.isMobileDevice()) {
      text.style.bottom = '0';
      text.focus();
    }
    e.preventDefault();
  };

  TextBox.prototype.onResize = function () {
    var self = this;
    if(SceneManager._scene instanceof Scene_InputDialog) {
      var field = document.getElementById(self._fieldId);
      var textBox = self.getTextBoxId();
      var mainContainer = self.getMainContainer();
      if(field && textBox) {
          Graphics._centerElement(field);
          Graphics._centerElement(mainContainer);
          this.setRect();
      }
    }
  };

  TextBox.prototype.isScreenLock = function () {
    var val = parseInt(performance.now() - this._lastInputTime);
    var ret = false;
    if(val >= RS.InputDialog.Params.nCheckScreenLock && this.isBusy()) ret = true;
    this._lastInputTime = performance.now();
    return ret;
  };

  TextBox.prototype.getTextLength = function() {
    var textBox = this.getTextBoxId();
    return textBox.value.length;
  };

  TextBox.prototype.getFocus = function() {
    var textBox = this.getTextBoxId();
    textBox.focus();
  };

  TextBox.prototype.setText = function (text) {
    var textBox = this.getTextBoxId();
    textBox.value = text || '';
    return textBox;
  };

  TextBox.prototype.getText = function () {
    var textBox = this.getTextBoxId();
    return textBox.value;
  };

  TextBox.prototype.hide = function () {
    var field = document.getElementById(this._fieldId);
    field.style.zIndex = 0;
  };

  TextBox.prototype.show = function () {
    var field = document.getElementById(this._fieldId);
    field.style.zIndex = 1000;
  };

  TextBox.prototype.setTextHint = function () {
    var textBox = this.getTextBoxId();
    return textBox.placeholder = RS.InputDialog.Params.localText;
  };

  TextBox.prototype.isBusy = function () {
    var field = document.getElementById(this._fieldId);
    return field.style.zIndex > 0;
  };

  TextBox.prototype.removeAllEventListener = function () {
    this._textBox.onchange = undefined;
    this._okFunc = null;

    this._textBox.removeEventListener('keydown', this.onKeyDown.bind(this));
    if(!Utils.isMobileDevice()) {
      this._textBox.removeEventListener('focus', this.onFocus.bind(this));
    }
    this._textBox.removeEventListener('blur', this.onBlur.bind(this));
    this._textBox.removeEventListener('autosize', this.onResize.bind(this));
    window.removeEventListener('resize', this.onResize.bind(this), false);

  };

  TextBox.prototype.terminate =  function() {
    this.removeAllEventListener();
    this.terminateTextBox();
  };

  //============================================================================
  // Scene_InputDialog
  //============================================================================

  Scene_InputDialog.prototype = Object.create(Scene_Base.prototype);
  Scene_InputDialog.prototype.constructor = Scene_InputDialog;

  Scene_InputDialog.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
  };

  Scene_InputDialog.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createTextBox();
  };

  var alias_Scene_InputDialog_update = Scene_InputDialog.prototype.update;
  Scene_InputDialog.prototype.update = function () {
    alias_Scene_InputDialog_update.call(this);
    // TODO: 모바일에서 취소키를 누르면 키입력 창이 사라지는 버그가 있다.
    // 그래서 추가했지만 화면을 누르면 꺼진다는 것을 모르는 유저들이 버그로 착각할 수 있다.
    if(this.isScreenLock() && TouchInput.isTriggered()) {
      this.okResult();
    }
  };

  Scene_InputDialog.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    this._textBox.terminate();
    this._textBox = null;
  };

  Scene_InputDialog.prototype.isScreenLock = function () {
    return this._textBox.isScreenLock();
  };

  Scene_InputDialog.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.opacity = 128;
    this.addChild(this._backgroundSprite);
  };

  Scene_InputDialog.prototype.createTextBox = function () {
    this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
    this._textBox.setEvent(this.okResult.bind(this), this.cancelResult.bind(this));
    this._textBox.show();
    this._textBox.setTextHint();
  };

  Scene_InputDialog.prototype.okResult = function () {
    var text = this._textBox.getText() || '';
    if(text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
    $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
    if(SceneManager._stack.length > 0) {
      TouchInput.clear();
      Input.clear();
      this.popScene();
    };
  };

  Scene_InputDialog.prototype.cancelResult = function () {
    if(SceneManager._stack.length > 0) {
      TouchInput.clear();
      Input.clear();
      this.popScene();
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

  var alias_Scene_Battle_initialize = Scene_Battle.prototype.initialize;
  Scene_Battle.prototype.initialize = function () {
    alias_Scene_Battle_initialize.call(this);
    this.createTextBox();
  };

  var alias_Scene_Battle_create = Scene_Battle.prototype.create;
  Scene_Battle.prototype.create = function () {
    alias_Scene_Battle_create.call(this);
  };

  var alias_Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    alias_Scene_Battle_update.call(this);
    // TODO: 모바일에서 취소키를 누르면 키입력 창이 사라지는 버그가 있다.
    // 그래서 추가했지만 화면을 누르면 꺼진다는 것을 모르는 유저들이 버그로 착각할 수 있다.
    if(this.isScreenLock() && TouchInput.isTriggered()) {
      this.okResult();
    }
  };

  var alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    alias_Scene_Battle_terminate.call(this);
    if(this._textBox) {
      this._textBox.terminate();
      this._textBox = null;
    }
    if($gameTemp.isCommonEventReserved()) {
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
    $gameTroop.battleInterpreterTaskLock();
  };

  Scene_Battle.prototype.hideTextBox = function () {
    if(!this.textBoxIsBusy()) return false;
    this._textBox.hide();
    Input.clear();
    $gameTroop.battleInterpreterTaskUnlock();
  };

  Scene_Battle.prototype.isScreenLock = function () {
    return this._textBox.isScreenLock();
  };

  Scene_Battle.prototype.okResult = function () {
    if(!this._textBox) return '';
    if( this.textBoxIsBusy() ) {
      var text = this._textBox.getText() || '';
      if(text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
      $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
      this._textBox.setText('');
      if(RS.InputDialog.Params.debug) {
        var dmsg = 'You typed the text is same as '.concat($gameVariables.value(RS.InputDialog.Params.variableID) + '' || 'NONE');
        this._logWindow.push('addText', dmsg);
      }
      this.hideTextBox();
    }
  };

  Scene_Battle.prototype.cancelResult = function () {
    if(!this._textBox) return '';
    if( this.textBoxIsBusy() ) {
      this._textBox.setText('');
      this.hideTextBox();
    }
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if(this._waitMode === 'IME Mode') {
      return true;
    } else {
      return alias_Game_Interpreter_updateWaitMode.call(this);
    }
  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "InputDialog") {
        switch(args[0]) {
          case 'open':
            RS.InputDialog.createInstance();
            break;
          case 'width':
            RS.InputDialog.Params.textBoxWidth = Number(args[1] || 488);
            RS.InputDialog.setRect();
            break;
          case 'text':
            RS.InputDialog.Params.localText = args.slice(1, args.length).join(' ');
            break;
          case 'variableID':
            RS.InputDialog.Params.variableID = Number(args[1] || 3);
            break;
          case 'debug':
            RS.InputDialog.Params.debug = Boolean(args[1] === 'true');
            break;
          case 'maxLength':
            RS.InputDialog.Params.nMaxLength  = Number(args[1] || 255);
            RS.InputDialog.setRect();
            break;
        }
      }
  };

  window.TextBox = TextBox;

})();
