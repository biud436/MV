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
 * @default 180
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
 * @default ".inputDialogContainer {\n    font-size: 16px;\n}\n\n.inputDialog {\n    font-size: 1rem;\n}\n\n.defaultButton {\n    opacity : 0.8;\n    font-family : arial;\n    border : 1px solid rgb(73, 73, 73);\n    background-image: -webkit-linear-gradient(top, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 100%);\n    color : rgb(19, 19, 19);\n    text-shadow : rgba(105, 105, 105, 0.7) 0 1px 0;\n    cursor : pointer;\n    border-radius : 0.5em;\n    box-sizing : border-box;\n    box-shadow : 0 1px 4px rgba(78, 78, 78, 0.6);\n    font-size : 1rem;\n}\n\n@media screen and (min-width : 192px) and (max-width : 768px) {\n    .inputDialog {\n        font-size : 1rem;\n    }\n}\n  \n@media screen and (min-width : 768px) and (max-width : 1000px) {\n    .inputDialog {\n        font-size : 1rem;\n    }    \n}"
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
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a robust text input system to your RPG Maker MV games,
 * allowing players to enter text or numbers directly within the game.
 * You can use this for character naming, password systems, quiz games,
 * message input, numeric code entry, and many other interactive features.
 *
 * The input dialog works in both map scenes and battle scenes, and offers
 * extensive customization options including size, position, appearance,
 * and button naming.
 *
 * ============================================================================
 * Features
 * ============================================================================
 *
 * - Display a text input dialog anywhere in your game
 * - Works in both map scenes and battle scenes
 * - Automatically saves input to a game variable
 * - Customizable width, height, position and appearance
 * - Support for mobile devices with proper keyboard handling
 * - RTL (Right-to-Left) language support
 * - Custom CSS styling for complete visual control
 * - Customizable button names and text hints
 * - Maximum character limit setting
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * InputDialog open
 * - Opens the input dialog window and displays it on the screen.
 * - This command activates the text input field with all current settings.
 * - The player can then type text which will be stored in the designated variable.
 *
 * InputDialog width [number]
 * - Changes the width of Input Dialog in pixels.
 * - Example: InputDialog width 488
 * - Note: The width must be at least 28 pixels to be visible.
 * - This affects only future dialog openings, not currently open ones.
 *
 * InputDialog text [text]
 * - Changes the text hint (placeholder text) shown in the input field.
 * - Example: InputDialog text Please enter your character name...
 * - Multiple words are allowed; the entire text after "text" becomes the hint.
 *
 * InputDialog variableID [number]
 * - Changes which game variable will store the input result.
 * - Example: InputDialog variableID 3
 * - The input text will be stored in this variable when OK is clicked or Enter is pressed.
 * - If the input contains only numbers, it will be converted to a number type.
 *
 * InputDialog debug [true/false]
 * - When set to true, shows a debug message with the input value.
 * - Example: InputDialog debug true
 * - Useful during development to verify the input is being captured correctly.
 *
 * InputDialog maxLength [number]
 * - Specifies the maximum number of characters allowed in the input field.
 * - Example: InputDialog maxLength 10
 * - Valid range is from 1 to 255 characters.
 *
 * InputDialog pos [position]
 * - Sets the position of the input dialog on the screen.
 * - Two formats are supported:
 *   InputDialog pos center (centers the dialog on screen)
 *   InputDialog pos 0 0 (positions at specific x, y coordinates)
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * RS.InputDialog.createInstance()
 * - Opens the input dialog programmatically
 *
 * RS.InputDialog.isEqual(text)
 * - Checks if the variable value matches the specified text
 * - Returns true or false
 * - Example: if(RS.InputDialog.isEqual("PASSWORD")) {
 *               // do something
 *            }
 *
 * this.isEqualInputData(text)
 * - Same as above but usable in event scripts
 *
 * ============================================================================
 * Usage Examples
 * ============================================================================
 *
 * Example 1: Name Entry System
 * 1. Use "InputDialog text Enter character name..." to set hint text
 * 2. Use "InputDialog open" to show the dialog
 * 3. Store player input in Variable #3 (or change with variableID command)
 * 4. Use the variable with \V[3] in messages or for character naming
 *
 * Example 2: Password System
 * 1. Set up the input dialog with appropriate settings
 * 2. Open the dialog when player interacts with a door/chest
 * 3. Use conditional branch with script: this.isEqualInputData("SECRET")
 * 4. Execute different events based on correct/incorrect password
 *
 * Example 3: Quiz Game
 * 1. Display a question to the player using Show Text
 * 2. Open input dialog for answer
 * 3. Check if the input matches the correct answer
 * 4. Award points or proceed based on correctness
 *
 * ============================================================================
 * Compatibility Notes
 * ============================================================================
 *
 * - Works in both desktop and mobile environments
 * - Compatible with most other plugins
 * - Special compatibility with Irina_PerformanceUpgrade plugin
 * - Optimized for RMMV 1.5.1 and later versions
 *
 * ============================================================================
 * Technical Notes
 * ============================================================================
 *
 * - Input is stored as a string by default unless it contains only numbers
 * - Numeric-only input is automatically converted to number type
 * - The dialog creates HTML elements that overlay the game canvas
 * - Mobile optimization includes automatic keyboard display and positioning
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
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_InputDialog>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

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
  // Parameters
  //============================================================================

  RS.InputDialog.Params = {
    textBoxWidth: Number(parameters['textBox Width'] || 488),
    textBoxHeight: Number(parameters['textBox Height'] || 36),
    variableID: Number(parameters['variable ID'] || 3),
    debug: Boolean(parameters['debug'] === 'true'),
    localText: String(parameters['Text Hint'] || 'Test Message'),
    inputDirection: String(parameters['direction'] || 'ltr'),
    nMaxLength: parseInt(parameters['Max Length'] || '6'),
    szTextBoxId: 'md_textBox',
    szFieldId: 'md_inputField',
    nCheckScreenLock: 8000,
    okButtonName: parameters['Ok'] || 'Ok',
    cancelButtonName: parameters['Cancel'] || 'Cancel',
    exStyle: RS.Utils.jsonParse(parameters['CSS']),
    pos: new PIXI.Point(0, 0),

    isCenterAlignment: (function () {
      var position = parameters['Position'];
      position = position.trim();
      if (position === 'center') {
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
    })(),

    isMultiLine: true,
    isKeyboardEvent: false,
  };

  //============================================================================
  // RS.InputDialog
  //============================================================================

  Object.assign(RS.InputDialog, {
    createInstance() {
      var scene = SceneManager._scene;
      if (scene instanceof Scene_Battle) {
        scene.showTextBox();
      } else {
        SceneManager.push(Scene_InputDialog);
      }
    },

    setRect() {
      'use strict';

      var query, textBox, okButton, cancelButton;

      query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
      textBox = document.querySelector(query);

      query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-OkBtn]`;
      okButton = document.querySelector(query);

      query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-CancelBtn]`;
      cancelButton = document.querySelector(query);

      var fontSizeOnPC = 1 * Graphics._realScale + 'em';

      if (okButton) {
        okButton.style.fontSize = Utils.isMobileDevice()
          ? '1rem'
          : fontSizeOnPC;
      }

      if (cancelButton) {
        cancelButton.style.fontSize = Utils.isMobileDevice()
          ? '1rem'
          : fontSizeOnPC;
      }
    },

    startBattleBlur(target, value) {
      var blur = 'blur(%1px)'.format(value);
      target.style.webkitFilter = blur;
      target.style.filter = blur;
    },

    getScreenWidth(value) {
      return value;
    },

    getScreenHeight(value) {
      return value;
    },
  });

  //============================================================================
  // Input
  //============================================================================

  var original_Input_shouldPreventDefault = Input._shouldPreventDefault;
  var dialog_Input_shouldPreventDefault = function (keyCode) {
    switch (keyCode) {
      // case 8:     // backspace
      case 33: // pageup
      case 34: // pagedown
        // case 37:    // left arrow
        // case 38:    // up arrow
        // case 39:    // right arrow
        // case 40:    // down arrow
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
      var self = this;
      var field = document.getElementById(this._fieldId);

      var renderer = Graphics._renderer;
      var renderTexture = PIXI.RenderTexture.create(
        renderer.width,
        renderer.height
      );
      var stage = SceneManager._scene;
      if (stage) {
        renderer.render(stage, renderTexture);
        var canvas = renderer.extract.base64(renderTexture);
        var imageUrl = canvas;
        if (renderTexture) renderTexture.destroy({ destroyBase: true });
      }

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
                font-size: 16px;
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
                font-size: 1rem;
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
                font-size : 1rem;
                z-index: 1000;
            }
            
            .row {
                width : 70%;
                height: 1rem;
            }
            
            .col {
                width : 70%;
                height: 1rem;
            }
            
            img.backgroundM2 {
                position: fixed;
                top: 0;
                left: 0;
                right: 0; 
                left: 50%;
                top: 50%;
                filter: sepia(1);
                transform: translate(-50%, -50%);
            }
            
            @media screen and (min-width : 192px) and (max-width : 768px) {
                .defaultButton {
                    font-size : 1rem;
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
                    font-size : 1rem;
                }
            }
            
            @media screen and (min-width : 768px) and (max-width : 1000px) {
                .defaultButton {
                    font-size : 1rem;
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
                    font-size : 1rem;
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
            <img id="inputDialog-background" class="backgroundM2" src="${imageUrl}">
            <table class="inputDialogContainer">
            <tr class="row">
            <td class="col">
            <textarea class="inputDialog" row="4" col="60" type="text" id"=${id} placeholder=${RS.InputDialog.Params.localText}></textarea>
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
    }

    static onLoadAfterInnerHTML() {
      if (SceneManager._scene) {
        if (SceneManager._scene instanceof Scene_InputDialog) {
          if (SceneManager._scene._textBox) {
            SceneManager._scene._textBox.addAllEventListener();
          }
        }
      }
    }

    getTextBoxId() {
      var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td textarea[type=text]`;
      return document.querySelector(query);
    }

    getDefaultButtonId(id) {
      id = id || 'inputDialog-OkBtn';
      var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=${id}]`;
      return document.querySelector(query);
    }

    getMainContainer() {
      var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer`;
      return document.querySelector(query);
    }

    addAllEventListener() {
      /**
       * @type {HTMLTextAreaElement}
       */
      this._textBox = this.getTextBoxId();
      this._textBox.maxLength = RS.InputDialog.Params.nMaxLength;
      this._textBox.max = RS.InputDialog.Params.nMaxLength;

      if (!RS.InputDialog.Params.isMultiLine) {
        this._textBox.style.overflow = 'hidden';
        this._textBox.style.resize = 'none';
      }

      if (RS.InputDialog.Params.isKeyboardEvent) {
        this._textBox.addEventListener(
          'keydown',
          this.onKeyDown.bind(this),
          false
        );
      }

      if (!Utils.isMobileDevice()) {
        this._textBox.addEventListener('focus', this.onFocus.bind(this), false);
      }

      this._textBox.addEventListener('blur', this.onBlur.bind(this), false);
      this._textBox.addEventListener(
        'touchstart',
        this.getFocus.bind(this),
        false
      );
      this._textBox.addEventListener(
        'autosize',
        this.onResize.bind(this),
        false
      );

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
      var textBox = this.getTextBoxId();
      var okButton = this.getDefaultButtonId('inputDialog-OkBtn');
      var cancelButton = this.getDefaultButtonId('inputDialog-CancelBtn');
      var fontSizeOnPC = 1 * Graphics._realScale + 'em';

      if (okButton) {
        okButton.style.fontSize = Utils.isMobileDevice()
          ? '1rem'
          : fontSizeOnPC;
      }

      if (cancelButton) {
        cancelButton.style.fontSize = Utils.isMobileDevice()
          ? '1rem'
          : fontSizeOnPC;
      }

      var width = RS.InputDialog.getScreenWidth(
        RS.InputDialog.Params.textBoxWidth * Graphics._realScale
      );
      var height;

      if (RS.InputDialog.Params.isMultiLine) {
        height =
          RS.InputDialog.getScreenHeight(
            RS.InputDialog.Params.textBoxHeight * Graphics._realScale
          ) + 'px';
      } else {
        height = '2rem';
      }

      textBox.style.width = width + 'px';
      textBox.style.height = height;
    }

    prepareElement(id) {
      var field = document.createElement('div');
      field.id = id;
      field.style.position = 'absolute';
      field.style.left = '0';
      field.style.top = '0';
      field.style.right = '0';
      field.style.bottom = '0';
      field.style.width = '100%';
      field.style.height = '100%';
      field.style.zIndex = '0';
      field.style.display = 'none'; // there is a bug occurs in nwjs 0.33.4
      document.body.appendChild(field);
      if (RS.InputDialog.Params.isCenterAlignment) {
        Graphics._centerElement(field);
      }
      return field;
    }

    setEvent(okFunc, cancelFunc) {
      var okButton = this.getDefaultButtonId('inputDialog-OkBtn');
      var cancelButton = this.getDefaultButtonId('inputDialog-CancelBtn');

      okButton.addEventListener(
        'click',
        function (e) {
          okFunc();
          e.preventDefault();
        },
        false
      );

      cancelButton.addEventListener(
        'click',
        function (e) {
          cancelFunc();
          e.preventDefault();
        },
        false
      );

      okButton.addEventListener(
        'touchend',
        function (e) {
          okFunc();
          e.preventDefault();
        },
        false
      );

      cancelButton.addEventListener(
        'touchend',
        function (e) {
          cancelFunc();
          e.preventDefault();
        },
        false
      );

      this._okFunc = okFunc;
      this._cancelFunc = cancelFunc;
    }

    terminateTextBox() {
      var field = document.getElementById(this._fieldId);

      if (field) {
        document.body.removeChild(field);
      }

      this.startToOriginalInput();
    }

    onKeyDown(e) {
      var keyCode = e.which;
      if (keyCode < TextBox.IS_NOT_CHAR) {
        if (keyCode === TextBox.ENTER) {
          if (this._okFunc instanceof Function) this._okFunc();
        }
        if (keyCode === TextBox.ESC) {
          if (this._cancelFunc instanceof Function) this._cancelFunc();
        }
      }

      this._lastInputTime = performance.now();
    }

    onFocus(e) {
      var text = this.getTextBoxId();
      if (text && Utils.isMobileDevice()) {
        text.style.bottom =
          RS.InputDialog.getScreenHeight(Graphics.boxHeight / 2) + 'px';
      }
    }

    onBlur(e) {
      var text = this.getTextBoxId();
      if (text && Utils.isMobileDevice()) {
        text.style.bottom = '0';
        text.focus();
      }
      e.preventDefault();
    }

    setPosition(x, y) {
      var self = this;
      var field = document.getElementById(self._fieldId);
      var textBox = self.getTextBoxId();
      var mainContainer = self.getMainContainer();
      if (field) {
        field.style.margin = '0';
        mainContainer.style.margin = '0';
        if (x < 0) {
          x = 0;
        }
        if (x > Graphics.boxWidth - RS.InputDialog.Params.textBoxWidth) {
          x = Graphics.boxWidth - RS.InputDialog.Params.textBoxWidth;
        }
        if (y < 0) {
          y = 0;
        }
        if (y > Graphics.boxHeight - RS.InputDialog.Params.textBoxHeight) {
          y = Graphics.boxHeight - RS.InputDialog.Params.textBoxHeight;
        }
        mainContainer.style.left =
          Graphics._canvas.getBoundingClientRect().left + x + 'px';
        mainContainer.style.top =
          Graphics._canvas.getBoundingClientRect().top + y + 'px';
      }
    }

    onResize() {
      var self = this;
      var field = document.getElementById(self._fieldId);
      var textBox = self.getTextBoxId();
      var mainContainer = self.getMainContainer();
      if (field && textBox) {
        Graphics._centerElement(field);
        Graphics._centerElement(mainContainer);
        this.setRect();

        if (RS.InputDialog.Params.isCenterAlignment) {
          var px =
            Graphics.boxWidth / 2 - RS.InputDialog.Params.textBoxWidth / 2;
          var py =
            Graphics.boxHeight / 2 - RS.InputDialog.Params.textBoxHeight / 2;
          this.setPosition(px, py);
        } else {
          this.setPosition(
            RS.InputDialog.Params.pos.x,
            RS.InputDialog.Params.pos.y
          );
        }
      }
    }

    isScreenLock() {
      var val = parseInt(performance.now() - this._lastInputTime);
      var ret = false;
      if (val >= RS.InputDialog.Params.nCheckScreenLock && this.isBusy())
        ret = true;
      this._lastInputTime = performance.now();
      return ret;
    }

    getTextLength() {
      var textBox = this.getTextBoxId();
      return textBox.value.length;
    }

    getFocus() {
      var textBox = this.getTextBoxId();
      textBox.focus();
    }

    setText(text) {
      var textBox = this.getTextBoxId();
      textBox.value = text || '';
      return textBox;
    }

    getText() {
      var textBox = this.getTextBoxId();
      return textBox.value;
    }

    hide() {
      var field = document.getElementById(this._fieldId);
      field.style.zIndex = 0;
      field.style.display = 'none'; // for 0.33.4
    }

    show() {
      var field = document.getElementById(this._fieldId);
      field.style.zIndex = 1000;
      field.style.display = 'block'; // for 0.33.4
    }

    setTextHint() {
      var textBox = this.getTextBoxId();
      return (textBox.placeholder = RS.InputDialog.Params.localText);
    }

    isBusy() {
      var field = document.getElementById(this._fieldId);
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

  Scene_InputDialog.prototype = Object.create(Scene_Base.prototype);
  Scene_InputDialog.prototype.constructor = Scene_InputDialog;

  Scene_InputDialog.prototype.initialize = function () {
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
    if (this.isScreenLock() && TouchInput.isTriggered()) {
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

  Scene_InputDialog.prototype.createBackground = function () {
    if (Imported.Irina_PerformanceUpgrade) {
      Scene_MenuBase.prototype.createBackground.call(this);
    } else {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this._backgroundSprite.opacity = 128;
      this.addChild(this._backgroundSprite);
    }
  };

  Scene_InputDialog.prototype.createTextBox = function () {
    this._textBox = new TextBox(
      RS.InputDialog.Params.szFieldId,
      RS.InputDialog.Params.szTextBoxId
    );
    this._textBox.setEvent(
      this.okResult.bind(this),
      this.cancelResult.bind(this)
    );
    this._textBox.show();
    this._textBox.setTextHint();
  };

  Scene_InputDialog.prototype.okResult = function () {
    var text = this._textBox.getText() || '';
    if (text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
    $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
    if (SceneManager._stack.length > 0) {
      TouchInput.clear();
      Input.clear();
      this.popScene();
    }
  };

  Scene_InputDialog.prototype.cancelResult = function () {
    if (SceneManager._stack.length > 0) {
      TouchInput.clear();
      Input.clear();
      this.popScene();
    }
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
    if (this.isScreenLock() && TouchInput.isTriggered()) {
      this.okResult();
    }
  };

  var alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
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
    this._textBox = new TextBox(
      RS.InputDialog.Params.szFieldId,
      RS.InputDialog.Params.szTextBoxId
    );
    this._textBox.setEvent(
      this.okResult.bind(this),
      this.cancelResult.bind(this)
    );
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
      var text = this._textBox.getText() || '';
      if (text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
      $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
      this._textBox.setText('');
      if (RS.InputDialog.Params.debug) {
        var dmsg = 'You typed the text is same as '.concat(
          $gameVariables.value(RS.InputDialog.Params.variableID) + '' || 'NONE'
        );
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

  var alias_Game_Interpreter_updateWaitMode =
    Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode === 'IME Mode') {
      return true;
    } else {
      return alias_Game_Interpreter_updateWaitMode.call(this);
    }
  };

  RS.InputDialog.isEqual = function (eq) {
    var data = String($gameVariables.value(RS.InputDialog.Params.variableID));
    eq = String(eq);
    return data === eq;
  };

  Game_Interpreter.prototype.isEqualInputData = function (eq) {
    return RS.InputDialog.isEqual(eq);
  };

  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'InputDialog') {
      switch (args[0]) {
        case 'open':
          RS.InputDialog.createInstance();
          break;
        case 'width':
          RS.InputDialog.Params.textBoxWidth = Number(args[1] || 488);
          RS.InputDialog.setRect();
          break;
        case 'text':
          RS.InputDialog.Params.localText = args
            .slice(1, args.length)
            .join(' ');
          break;
        case 'variableID':
          RS.InputDialog.Params.variableID = Number(args[1] || 3);
          break;
        case 'debug':
          RS.InputDialog.Params.debug = Boolean(args[1] === 'true');
          break;
        case 'maxLength':
          RS.InputDialog.Params.nMaxLength = Number(args[1] || 255);
          RS.InputDialog.setRect();
          break;
        case 'pos':
          if (args[1] === 'center') {
            RS.InputDialog.Params.isCenterAlignment = true;
          } else {
            RS.InputDialog.Params.isCenterAlignment = false;
            RS.InputDialog.Params.pos.x = parseFloat(args[1] || 0);
            RS.InputDialog.Params.pos.y = parseFloat(args[2] || 0);
          }
          break;
      }
    }
  };

  window.TextBox = TextBox;
})();
