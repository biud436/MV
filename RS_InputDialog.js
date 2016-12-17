/*:
 * RS_InputDialog.js
 * @plugindesc This plugin allows you to display Text Edit Box on the screen.
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
 * @param direction
 * @desc Sets the direction of content flow.
 * ltr - Left to Right, rtl - Right to Left
 * @default ltr
 *
 * @param Max Length
 * @desc Specifies the maximum number of character for an input field
 * @default 255
 *
 * @param Style ----
 * @desc
 * @default
 *
 * @param Background Color
 * @desc Specifies a background color of the text box.
 * @default #cff09e
 *
 * @param Border
 * @desc Specifies a border color of the text box.
 * @default 2px solid #3b8686
 *
 * @param Border Radius
 * @desc Specifies a border radius of the text box.
 * @default 10px
 *
 * @param Text Shadow
 * @desc Specifies a text shadow of the text box.
 * @default 0px 1px 3px #a8dba8
 *
 * @param Font Family
 * @desc Specifies a font family of the text box.
 * @default arial
 *
 * @param Color
 * @desc Specifies a font color of the text box.
 * @default #79bd9a
 *
 * @param Opacity
 * @desc Specifies a opacity of the text box.
 * (value range : 0.0 ~ 1.0)
 * @default 0.8
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
 * - Specifies the maximum number of character for an input field
 * InputDialog maxLength 10
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
 * 2016.10.18 (v1.1.5) - Fixed an issue that battler's movement is too fast.
 * 2016.10.29 (v1.1.6) - Added the function that allows you to specify the maximum number of character for an input field.
 * 2016.11.13 (v1.1.61) - Fixed the issue that is directly calling the requestUpdate function of SceneManager.
 * 2016.12.02 (v1.1.65) :
 * - Added some style codes such as a text shadow and an outline into the text box.
 * - Fixed the way that can temporarily stop attack and skill actions with an enemy when the text box is activated in the battle.
 * - It will not process the text input when the text box is not shown in the battle.
 * - In the debug mode, It adds the result value to a log window after the text input is done.
 * 2016.12.08 (v1.1.68) - Removed the text hint window.
 * 2016.12.17 (v1.1.69) - Fixed an issue that an integer value could not be checked due to the text type issue.
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
  RS.InputDialog.Params.backgroundColor = String(parameters['Background Color'] || '#cff09e');
  RS.InputDialog.Params.inputDirection = String(parameters['direction'] || 'ltr');
  RS.InputDialog.Params.nMaxLength = parseInt(parameters['Max Length'] || '6');

  RS.InputDialog.Params.border = parameters['Border'] || "2px solid #3b8686";
  RS.InputDialog.Params.borderRadius = parameters['Border Radius'] || '10px';
  RS.InputDialog.Params.textShadow = parameters['Text Shadow'] || "0px 1px 3px #a8dba8";
  RS.InputDialog.Params.fontFamily = parameters['Font Family'] || 'arial';
  RS.InputDialog.Params.color = parameters['Color'] || "#79bd9a";
  RS.InputDialog.Params.opacity = parameters['Opacity'] || "0.8";

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
      textBox.style.border = RS.InputDialog.Params.border;
      textBox.style.borderRadius = RS.InputDialog.Params.borderRadius;
      textBox.style.textShadow = RS.InputDialog.Params.textShadow;
      textBox.style.fontFamily = RS.InputDialog.Params.fontFamily;
      textBox.style.color = RS.InputDialog.Params.color;
      textBox.style.width = RS.InputDialog.Params.textBoxWidth + 'px';
      textBox.style.height = RS.InputDialog.Params.textBoxHeight + 'px';
      textBox.style.direction = RS.InputDialog.Params.inputDirection;
      textBox.maxLength = RS.InputDialog.Params.nMaxLength;
      textBox.max = RS.InputDialog.Params.nMaxLength;
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
    this._textBox.style.opacity = RS.InputDialog.Params.opacity;
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
    this._textBox.style.border = RS.InputDialog.Params.border;
    this._textBox.style.borderRadius = RS.InputDialog.Params.borderRadius;
    this._textBox.style.textShadow = RS.InputDialog.Params.textShadow;
    this._textBox.style.fontFamily = RS.InputDialog.Params.fontFamily;
    this._textBox.style.color = RS.InputDialog.Params.color;
    this._textBox.style.outline = 'none';
    this._textBox.style.width = RS.InputDialog.Params.textBoxWidth + 'px';
    this._textBox.style.height = RS.InputDialog.Params.textBoxHeight + 'px';
    this._textBox.maxLength = RS.InputDialog.Params.nMaxLength;
    this._textBox.max = RS.InputDialog.Params.nMaxLength;

    this._textBox.addEventListener('keydown', this.onKeyDown.bind(this));

    var field = document.getElementById(this._fieldId);
    field.appendChild(this._textBox);

    Graphics._centerElement(this._textBox);

    window.addEventListener('resize', function () {
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
    }, false);

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

    if (keyCode < TextBox.IS_NOT_CHAR) {

      if(keyCode === TextBox.ENTER) {

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
    return textBox;
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

  TextBox.prototype.setTextHint = function () {
    this.setText(RS.InputDialog.Params.localText).select();
  };

  TextBox.prototype.isBusy = function () {
    var field = document.getElementById(this._fieldId);
    return field.style.zIndex > 0;
  };

  TextBox.prototype.terminate =  function() {
    this.terminateTextBox();
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

  Scene_InputDialog.prototype.createTextBox = function () {
    this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
    this._textBox.setEvent(this.okResult.bind(this));
    this._textBox.show();
    this._textBox.setTextHint();
  };

  Scene_InputDialog.prototype.okResult = function () {
    var text = this._textBox.getText() || '';
    if(text.match(/^([\d]+)/g)) text = Number(RegExp.$1);
    $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
    if(SceneManager._stack.length > 0) {
      Input.clear();
      this.popScene();
    };
  };

  //============================================================================
  // Game_Troop
  //
  //

  Game_Troop.prototype.battleInterpreterTaskLock = function () {
    this._interpreter._waitMode = 'IME Mode';
  };

  Game_Troop.prototype.battleInterpreterTaskUnlock = function () {
    this._interpreter._waitMode = '';
  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if(this._waitMode === 'IME Mode') {
      return true;
    } else {
      return alias_Game_Interpreter_updateWaitMode.call(this);
    }
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
    this._textBox.setEvent(this.okResult.bind(this));
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

  Scene_Battle.prototype.okResult = function () {
    if(!this._textBox) return '';
    if( this.textBoxIsBusy() ) {
      var text = this._textBox.getText() || '';
      if(text.match(/^([\d]+)/g)) text = Number(RegExp.$1);
      $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
      this._textBox.setText('');
      if(RS.InputDialog.Params.debug) {
        var dmsg = 'You typed the text is same as '.concat($gameVariables.value(RS.InputDialog.Params.variableID) + '' || 'NONE');
        this._logWindow.push('addText', dmsg);
      }
      this.hideTextBox();
    }
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
          case 'maxLength':
            RS.InputDialog.Params.nMaxLength  = Number(args[1] || 255);
            RS.InputDialog.setRect();
            break;
        }
      }
  };

})();
