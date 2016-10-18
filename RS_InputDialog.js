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
 * @param Text Hint
 * @desc Sets the string that is the top of the text box.
 * @default Please enter the value...
 *
 * @param Background Color
 * @desc Sets a background color of the text box.
 * @default rgba(255, 255, 255, 0.8)
 *
 * @param direction
 * @desc Sets the direction of content flow.
 * ltr - Left to Right, rtl - Right to Left
 * @default ltr
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
 * 2016.08.09 (v1.0.0) - First Release.
 * 2016.08.09 (v1.0.1) - Added Background Color.
 * 2016.08.10 (v1.0.1A) - Added ID Variables.
 * 2016.08.10 (v1.1.0) - Fixed Window_DialogHelp class into the plugin.
 * 2016.08.16 (v1.1.1) - Added the direction property setting the direction of content flow.
 * 2016.08.16 (v1.1.1A) - Fixed a whitespace bug.
 * 2016.10.14 (v1.1.2) - Fixed the issue that is not working in Battle.
 * 2016.10.14 (v1.1.3) :
 * - Fixed the bug that does not change the background color.
 * - Fixed the bug that does not change the variable ID.
 * 2016.10.17 (v1.1.4) - Fixed the frame works of input dialog in battle.
 * 2016.10.18 (V1.1.5) - Fixed an issue that battler's movement is too fast.
 */

var Imported = Imported || {};
Imported.RS_InputDialog = true;

var RS = RS || {};
RS.InputDialog = RS.InputDialog || {};
RS.InputDialog.Params = RS.InputDialog.Params || {};

function Scene_InputDialog() {
  this.initialize.apply(this, arguments);
}

(function () {

  var parameters = PluginManager.parameters('RS_InputDialog');
  RS.InputDialog.Params.textBoxWidth = Number(parameters['textBox Width'] || 488);
  RS.InputDialog.Params.textBoxHeight = Number(parameters['textBox Height'] || 36);
  RS.InputDialog.Params.variableID = Number(parameters['variable ID'] || 3);
  RS.InputDialog.Params.debug = Boolean(parameters['debug'] === 'true');
  RS.InputDialog.Params.localText = String(parameters['Text Hint'] || 'Test Message');
  RS.InputDialog.Params.backgroundColor = String(parameters['Background Color'] || 'rgba(255,255,255,0.8)');
  RS.InputDialog.Params.inputDirection = String(parameters['direction'] || 'ltr')

  RS.InputDialog.Params.szTextBoxId = 'md_textBox';
  RS.InputDialog.Params.szFieldId = 'md_inputField';

  RS.InputDialog.createInstance = function() {
    var scene = SceneManager._scene;
    if(scene instanceof Scene_Battle) {
      scene.showTextBox();
    } else {
      SceneManager.push(Scene_InputDialog);
    }
  };

  RS.InputDialog.setRect = function () {
    var textBox = document.getElementById(RS.InputDialog.Params.szTextBoxId);
    if(textBox) {
      textBox.style.fontSize = (RS.InputDialog.Params.textBoxHeight - 4) + 'px';
      textBox.style.backgroundColor = RS.InputDialog.Params.backgroundColor;
      textBox.style.width = RS.InputDialog.Params.textBoxWidth + 'px';
      textBox.style.height = RS.InputDialog.Params.textBoxHeight + 'px';
      textBox.style.direction = RS.InputDialog.Params.inputDirection;
    }
  };

  RS.InputDialog.startBattleBlur = function(target, value) {
    var blur = "blur(%1px)".format(value);
    target.style.webkitFilter = blur;
    target.style.filter = blur;
  };

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
    this._textBox.style.direction = RS.InputDialog.Params.inputDirection;
    this._textBox.style.fontSize = (RS.InputDialog.Params.textBoxHeight - 4) + 'px';
    this._textBox.style.backgroundColor = RS.InputDialog.Params.backgroundColor;
    this._textBox.style.width = RS.InputDialog.Params.textBoxWidth + 'px';
    this._textBox.style.height = RS.InputDialog.Params.textBoxHeight + 'px';

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
            textBox.style.fontSize = (RS.InputDialog.Params.textBoxHeight - 4) + 'px';
            textBox.style.width = RS.InputDialog.Params.textBoxWidth + 'px';
            textBox.style.height = RS.InputDialog.Params.textBoxHeight + 'px';
        }
      }
    };

  };

  TextBox.prototype.setRect = function () {
    var textBox = document.getElementById(this._textBoxID);
    textBox.style.fontSize = (RS.InputDialog.Params.textBoxHeight - 4) + 'px';
    textBox.style.backgroundColor = RS.InputDialog.Params.backgroundColor;
    textBox.style.width = RS.InputDialog.Params.textBoxWidth + 'px';
    textBox.style.height = RS.InputDialog.Params.textBoxHeight + 'px';
    textBox.style.direction = RS.InputDialog.Params.inputDirection;
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
    field.style.zIndex = "0";
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

  TextBox.prototype.setText = function (text) {
    var textBox = document.getElementById(this._textBoxID);
    textBox.value = text || '';
  };

  TextBox.prototype.getText = function () {
    var textBox = document.getElementById(this._textBoxID);
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

  TextBox.prototype.isBusy = function () {
    var field = document.getElementById(this._fieldId);
    return field.style.zIndex > 0;
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

  Window_DialogHelp.prototype.refresh = function() {
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
    this._text.y = Graphics.boxHeight / 2 - RS.InputDialog.Params.textBoxHeight - this._text.height;
    this._text.setText(RS.InputDialog.Params.localText);
    this._text.backOpacity = 0;
    this._text._windowFrameSprite.alpha = 0;
    this.addWindow(this._text);
  };

  Scene_InputDialog.prototype.createTextBox = function () {
    this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
    this._textBox.setEvent(this.okResult.bind(this));
    this._textBox.show();
  };

  Scene_InputDialog.prototype.okResult = function () {
    var text = this._textBox.getText() || '';
    $gameVariables.setValue(RS.InputDialog.Params.variableID, text);

    if(RS.InputDialog.Params.debug) {
      window.alert(text);
    }

    if(SceneManager._stack.length > 0) {
      Input.clear();
      this.popScene();
    };

  };

  //============================================================================
  // Scene_Battle
  //
  //

  var alias_Scene_Battle_initialize = Scene_Battle.prototype.initialize;
  Scene_Battle.prototype.initialize = function () {
    alias_Scene_Battle_initialize.call(this);
    this.createTextBox();
  };

  var alias_Scene_Battle_create = Scene_Battle.prototype.create;
  Scene_Battle.prototype.create = function () {
    alias_Scene_Battle_create.call(this);
    this.createTextBoxHelp();
  };

  var alias_Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    if(!this.textBoxIsBusy()) alias_Scene_Battle_update.call(this);
  };

  var alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    alias_Scene_Battle_terminate.call(this);
    if(this._textBox) {
      this._textBox.terminate();
      this._textBox = null;
    }
  };

  Scene_Battle.prototype.createTextBoxHelp = function () {
    this._tbHelp = new Window_DialogHelp(2);
    this._tbHelp.hide();
    this._tbHelp.x = Graphics.boxHeight - Graphics.boxHeight / 2 - this._tbHelp.width / 2;
    this._tbHelp.y = Graphics.boxHeight / 2 - RS.InputDialog.Params.textBoxHeight - this._tbHelp.height;
    this._tbHelp.setText(RS.InputDialog.Params.localText);
    this._tbHelp.backOpacity = 0;
    this._tbHelp._windowFrameSprite.alpha = 0;
    this.addChild(this._tbHelp);
  };

  Scene_Battle.prototype.createTextBox = function () {
    this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
    this._textBox.setEvent(this.okResult.bind(this));
  };

  Scene_Battle.prototype.textBoxIsBusy = function () {
    return this._textBox.isBusy();
  };

  Scene_Battle.prototype.showTextBox = function () {
    this._tempPhase = BattleManager._phase;
    this._tbHelp.show();
    this._textBox.show();
    SceneManager._stopped = true;
  };

  Scene_Battle.prototype.hideTextBox = function () {
    Input.clear();
    this._textBox.hide();
    this._tbHelp.hide();
    SceneManager._stopped = false;
    SceneManager.requestUpdate();
  };

  Scene_Battle.prototype.okResult = function () {
    if(!this._textBox) return '';
    var text = this._textBox.getText() || '';
    $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
    if(RS.InputDialog.Params.debug) window.alert(text);
    this._textBox.setText('');
    this.hideTextBox();
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
          case 'backgroundColor':
            RS.InputDialog.Params.backgroundColor = args.slice(1, args.length).join('');
            RS.InputDialog.setRect();
            break;
        }
      }
  };


})();
