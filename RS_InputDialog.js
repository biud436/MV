/*:
 * RS_InputDialog.js
 * @plugindesc this plugin allows you to display Text Edit Box on the screen.
 * @author biud436
 *
 * @param textBox Width
 * @desc Sets the width of Text Box.
 * @default 488
 *
 * @param textBox Height
 * @desc Sets the height of Text Box.
 * @default 36
 *
 * @param variable ID
 * @desc Sets an id of the game variables.
 * @default 3
 *
 * @param debug
 * @desc Whether this determines the alert window.
 * @default false
 *
 * @param Text
 * @desc Sets the string that is the top of the text box.
 * @default Please enter the value...
 *
 * @param Background Color
 * @desc Sets a background color of the text box.
 * @default rgba(255, 255, 255, 0.8)
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
 * - Changes a background color of the text box.
 * InputDialog backgroundColor rgba(255, 255, 255, 0.8)
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.08.09(v1.0.0) - First Release.
 * 2016.08.09(v1.0.1) - Added Background Color.
 * 2016.08.10(v1.0.1A) - Added ID Variables.
 */

var Imported = Imported || {};
Imported.RS_InputDialog = true;

var RS = RS || {};
RS.InputDialog = RS.InputDialog || {};

function Scene_InputDialog() {
  this.initialize.apply(this, arguments);
}

(function () {

  var parameters = PluginManager.parameters('RS_InputDialog');
  var textBoxWidth = Number(parameters['textBox Width'] || 488);
  var textBoxHeight = Number(parameters['textBox Height'] || 36);
  var variableID = Number(parameters[''] || 3);
  var debug = Boolean(parameters['debug'] === 'true');
  var localText = String(parameters['Text'] || 'Test Message');
  var backgroundColor = String(parameters['Background Color'] || 'rgba(255,255,255,0.8)');

  var szTextBoxId = 'md_textBox';
  var szFieldId = 'md_inputField';


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

  // private class
  function TextBox() {
    this.initialize.apply(this, arguments);
  };

  TextBox.BACK_SPACE = 8;
  TextBox.ENTER = 13;
  TextBox.IS_NOT_CHAR = 32;
  TextBox.KEYS_ARRAY = 255;

  TextBox.prototype.initialize = function(fieldID, textBoxID)  {
    this._fieldId = fieldID;
    this._textBoxID = textBoxID;
    this.prepareElement(fieldID);
    this.createTextBox(textBoxID);
    this.getFocus();
    this.setRect();
    this.startToConvertInput();
  };

  TextBox.prototype.startToConvertInput = function () {
    Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
  };

  TextBox.prototype.startToOriginalInput = function () {
    Input._shouldPreventDefault = original_Input_shouldPreventDefault;
  };

  TextBox.prototype.createTextBox = function(id) {

    var self = this;

    this._textBox = document.createElement('input');
    this._textBox.type = "text";
    this._textBox.id = id;
    this._textBox.style.opacity = 255;
    this._textBox.style.zIndex = 1000;
    this._textBox.autofocus = false;
    this._textBox.multiple = false;
    this._textBox.style.imeMode = 'active';
    this._textBox.style.position = 'absolute';
    this._textBox.style.top = 0;
    this._textBox.style.left = 0;
    this._textBox.style.right = 0;
    this._textBox.style.bottom = 0;
    this._textBox.style.fontSize = (textBoxHeight - 4) + 'px';
    this._textBox.style.backgroundColor = backgroundColor;
    this._textBox.style.width = textBoxWidth + 'px';
    this._textBox.style.height = textBoxHeight + 'px';

    // 키를 눌렀을 때의 처리
    this._textBox.onkeydown = this.onKeyDown.bind(this);

    // 화면에 에디트박스를 표시한다.
    var field = document.getElementById(this._fieldId);
    field.appendChild(this._textBox);

    // 에디트 박스를 캔버스 중앙에 정렬합니다.
    Graphics._centerElement(this._textBox);

    window.onresize = function () {
      if(SceneManager._scene instanceof Scene_InputDialog) {
        var field = document.getElementById(self._fieldId);
        var textBox = document.getElementById(self._textBoxID);
        if(field && textBox) {
            Graphics._centerElement(field);
            Graphics._centerElement(textBox);
            textBox.style.fontSize = (textBoxHeight - 4) + 'px';
            textBox.style.width = textBoxWidth + 'px';
            textBox.style.height = textBoxHeight + 'px';
        }
      }
    };

  };

  TextBox.prototype.setRect = function () {
    var textBox = document.getElementById(this._textBoxID);
    textBox.style.fontSize = (textBoxHeight - 4) + 'px';
    textBox.style.width = textBoxWidth + 'px';
    textBox.style.height = textBoxHeight + 'px';
  };

  TextBox.prototype.prepareElement = function(id) {
    var field = document.createElement('div');
    field.id = id;
    field.style.position = 'absolute';
    field.style.left = '0';
    field.style.top = '0';
    field.style.right = '0';
    field.style.bottom = '0';
    field.style.width = Graphics.boxWidth + 'px';
    field.style.height = Graphics.boxHeight + 'px';
    field.style.zIndex = "1000";
    document.body.appendChild(field);
    Graphics._centerElement(field);
    return field;
  };

  TextBox.prototype.setEvent = function(func) {
    var textBox = document.getElementById(this._textBoxID);
    textBox.onchange = func;
    this._func = func;
  };

  TextBox.prototype.terminateTextBox = function() {
    var field = document.getElementById(this._fieldId);
    var textBox = document.getElementById(this._textBoxID);
    field.removeChild(textBox);
    document.body.removeChild(field);
    this.startToOriginalInput();
  };

  TextBox.prototype.onKeyDown = function(e) {

    var keyCode = e.which;

    // this.getFocus();

    if (keyCode < TextBox.IS_NOT_CHAR) {

      // 결정키를 눌렸는가?
      if(keyCode === TextBox.ENTER) {

        // 텍스트가 없으면 결정키 눌림이 취소된다.
        // if(this.getTextLength() <= 0) {
        //   e.preventDefault();
        // }

        // 버튼 입력 체크
        if(this._func instanceof Function) this._func();

      }

    }

  }

  TextBox.prototype.getTextLength = function() {
    var textBox = document.getElementById(this._textBoxID);
    return textBox.value.length;
  };

  TextBox.prototype.getFocus = function() {
    var textBox = document.getElementById(this._textBoxID);
    textBox.focus();
  };

  TextBox.prototype.getText = function () {
    var textBox = document.getElementById(this._textBoxID);
    return textBox.value;
  };

  TextBox.prototype.terminate =  function() {
    this.terminateTextBox();
  };

  //============================================================================
  //
  //
  //
  function Window_DialogHelp() {
      this.initialize.apply(this, arguments);
  }

  Window_DialogHelp.prototype = Object.create(Window_Help.prototype);
  Window_DialogHelp.prototype.constructor = Window_DialogHelp;

  Window_DialogHelp.prototype.initialize = function(numLines) {
    Window_Help.prototype.initialize.call(this, numLines);
  };

  Window_DialogHelp.prototype.textWidthEx = function(text) {
      return this.drawTextEx(text, 0, this.contents.height);
  };

  Window_Help.prototype.refresh = function() {
    this.contents.clear();
    var w = this.textWidthEx(this._text);
    var x = this.width - w - (w / 2);
    this.drawTextEx(this._text, x + this.textPadding(), 0);
  };

  //============================================================================
  // Scene_InputDialog
  //
  //

  Scene_InputDialog.prototype = Object.create(Scene_Base.prototype);
  Scene_InputDialog.prototype.constructor = Scene_InputDialog;

  Scene_InputDialog.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
  };

  Scene_InputDialog.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createText();
    this.createTextBox();
  };

  Scene_InputDialog.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    this._textBox.terminate();
    this._textBox = null;
  };

  Scene_InputDialog.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.opacity = 128;
    this.addChild(this._backgroundSprite);
  };

  Scene_InputDialog.prototype.createText = function () {
    this._text = new Window_DialogHelp(2);
    this._text.x = Graphics.boxHeight / 2 - this._text.width / 2;
    this._text.y = Graphics.boxHeight / 2 - textBoxHeight - this._text.height;
    this._text.setText(localText);
    this._text.backOpacity = 0;
    this._text._windowFrameSprite.alpha = 0;
    this.addWindow(this._text);
  };

  Scene_InputDialog.prototype.createTextBox = function () {
    this._textBox = new TextBox(szFieldId, szTextBoxId);
    this._textBox.setEvent(this.okResult.bind(this));
  };

  Scene_InputDialog.prototype.okResult = function () {
    var text = this._textBox.getText() || '';
    $gameVariables.setValue(variableID, text);

    if(debug) {
      window.alert(text);
    }

    if(SceneManager._stack.length > 0) {
      Input.clear();
      this.popScene();
    };

  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "InputDialog") {
        switch(args[0]) {
          case 'open':
            SceneManager.push(Scene_InputDialog);
            break;
          case 'width':
            textBoxWidth = Number(args[1] || 488);
            break;
          case 'text':
            localText = args.slice(1, args.length).join('');
            break;
          case 'variableID':
            variableID = Number(args[1] || 3);
            break;
          case 'debug':
            debug = Boolean(args[1] === 'true');
            break;
          case 'backgroundColor':
            backgroundColor = args.slice(1, args.length).join('');
            break;
        }
      }
  };


})();
