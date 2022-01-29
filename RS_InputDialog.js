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
 * @url https://biud436.tistory.com
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
 *
 * @help
 * This plugin is RS_InputDialog for MZ version.
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
 * 2020.08.28 (v2.0.0) :
 * - Ported with MZ.
 *
 * @command open
 * @desc Opens Input Dialog.
 *
 * @command width
 * @desc Changes the width of Input Dialog.
 *
 * @arg width
 * @type number
 * @desc Specify the width value.
 * @default 488
 *
 * @command text
 * @text Set placeholder Text
 * @desc Changes the text of Input Dialog for representing the description.
 *
 * @arg text
 * @type string
 * @desc Specify the placeholder text
 * @default Please enter the string...
 *
 * @command variableID
 * @desc Changes an id of the variable for saving the value.
 *
 * @arg number
 * @type variable
 * @desc Specify game variable's id.
 * @default 3
 *
 * @command debug
 * @desc Displays a alert window of the browser when you are pressing the enter
 *
 * @arg valid
 * @type boolean
 * @desc Checks with whether the alert window is displayed.
 * @default false
 * @on true
 * @off false
 *
 * @command maxLength
 * @desc Specifies the maximum number of character for an input field
 *
 * @arg value
 * @type number
 * @desc Specify the maxLength value.
 * @default 10
 *
 * @command pos
 * @desc This plugin commands decide how to set the position of the input dialog.
 *
 * @arg posType
 * @type select
 * @desc Specify the position type value.
 * @default center
 * @option center
 * @value center
 * @option 0 0
 * @value 0 0
 *
 */

var Imported = Imported || {};
Imported.RS_InputDialog = true;

var RS = RS || {};
RS.InputDialog = RS.InputDialog || {};
RS.InputDialog.Params = RS.InputDialog.Params || {};
RS.Utils = RS.Utils || {};

(() => {
    "use strict";

    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_InputDialog>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    RS.Utils.jsonParse = function (str) {
        let retData = JSON.parse(str, function (k, v) {
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

    RS.InputDialog.Params.textBoxWidth = Number(
        parameters["textBox Width"] || 488
    );
    RS.InputDialog.Params.textBoxHeight = Number(
        parameters["textBox Height"] || 36
    );
    RS.InputDialog.Params.variableID = Number(parameters["variable ID"] || 3);

    RS.InputDialog.Params.debug = Boolean(parameters["debug"] === "true");

    RS.InputDialog.Params.localText = String(
        parameters["Text Hint"] || "Test Message"
    );
    RS.InputDialog.Params.inputDirection = String(
        parameters["direction"] || "ltr"
    );

    RS.InputDialog.Params.nMaxLength = parseInt(
        parameters["Max Length"] || "6"
    );

    RS.InputDialog.Params.szTextBoxId = "md_textBox";
    RS.InputDialog.Params.szFieldId = "md_inputField";

    RS.InputDialog.Params.nCheckScreenLock = 8000;

    RS.InputDialog.Params.okButtonName = parameters["Ok"] || "Ok";
    RS.InputDialog.Params.cancelButtonName = parameters["Cancel"] || "Cancel";

    RS.InputDialog.Params.exStyle = RS.Utils.jsonParse(parameters["CSS"]);

    RS.InputDialog.Params.pos = new PIXI.Point(0, 0);
    RS.InputDialog.Params.isCenterAlignment = (() => {
        let position = parameters["Position"];
        position = position.trim();
        if (position === "center") {
            return true;
        }
        const reg = /(.*)[ ]*,[ ]*(.*)/i;
        if (reg.exec(position)) {
            if (RS.InputDialog.Params.pos) {
                RS.InputDialog.Params.pos.x = parseFloat(RegExp.$1);
                RS.InputDialog.Params.pos.y = parseFloat(RegExp.$2);
            }
        }
        return false;
    })();

    //============================================================================
    // public methods in RS.InputDialog
    //============================================================================

    Object.assign(RS.InputDialog, {
        createInstance() {
            const scene = SceneManager._scene;
            if (scene instanceof Scene_Battle) {
                scene.showTextBox();
            } else {
                SceneManager.push(Scene_InputDialog);
            }
        },

        setRect() {
            "use strict";

            let query, textBox, OkButton, CancelButton;

            query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
            textBox = document.querySelector(query);

            query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-OkBtn]`;
            OkButton = document.querySelector(query);

            query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-CancelBtn]`;
            CancelButton = document.querySelector(query);

            if (textBox) {
                textBox.style.fontSize = Utils.isMobileDevice()
                    ? "1rem"
                    : 2 * Graphics._realScale + "em";
                textBox.style.width =
                    RS.InputDialog.getScreenWidth(
                        RS.InputDialog.Params.textBoxWidth * Graphics._realScale
                    ) + "px";
                textBox.style.height =
                    RS.InputDialog.getScreenHeight(
                        RS.InputDialog.Params.textBoxHeight *
                            Graphics._realScale
                    ) + "px";
            }

            if (OkButton)
                OkButton.style.fontSize = Utils.isMobileDevice()
                    ? "1rem"
                    : 1 * Graphics._realScale + "em";
            if (CancelButton)
                CancelButton.style.fontSize = Utils.isMobileDevice()
                    ? "1rem"
                    : 1 * Graphics._realScale + "em";
        },

        startBattleBlur(target, value) {
            var blur = "blur(%1px)".format(value);
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

    const utils = {
        createVirutalElement(tagName) {
            if (typeof document === "undefined") {
                const jsdom = require("jsdom").JSDOM;
                const doc = new jsdom("<html><body></body></html>");
                const document = doc.window.document;

                return document.createElement(tagName);
            } else {
                if (tagName === "body") return document.body;
                return document.createElement(tagName);
            }
        },
        toCamelCase(name) {
            const snake = name || "";

            let nodes = snake.split(/[\s\-]/);
            let nodesTail = nodes.slice(1);

            const camel = nodes[0].concat(
                nodesTail.map((i) => {
                    return i[0].toUpperCase() + i.slice(1);
                })
            );
            return camel;
        },
        getClassName(name) {
            const str = toCamelCase(name);
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        },
    };

    /**
     * @class TextBoxBuilder
     * @description
     * This class is used to create a text box.
     */

    class TextBoxBuilder {
        render() {
            const elements = this.prepareElement();
            const rootElement = elements.root;
            let parentNode = null;

            const virtualRender = (root) => {
                if (!root.tagName) {
                    return;
                }

                // create an element.
                const elem = utils.createVirutalElement(root.tagName);
                if (!parentNode) {
                    // parentNode = document.body;
                    parentNode = body;
                }
                parentNode.appendChild(elem);

                // set attributes.
                if (root.attributes) {
                    for (const attr in root.attributes) {
                        elem.setAttribute(attr, root.attributes[attr]);
                    }
                }

                // set class.
                if (root.class) {
                    elem.className = root.class;
                }

                // set type.
                if (root.type) {
                    elem.setAttribute("type", root.type);
                }

                // set id.
                if (root.id) {
                    elem.setAttribute("id", root.id);
                }

                // set placeholder.
                if (root.placeholder) {
                    elem.setAttribute("placeholder", root.placeholder);
                }

                // set value.
                if (root.value) {
                    elem.setAttribute("value", root.value);
                }

                // set style.
                if (root.style) {
                    // change snake to camel.
                    const propertyName = utils.toCamelCase(style);

                    for (const style in root.style) {
                        elem.style[propertyName] = root.style[style];
                    }
                }

                // set injected style.
                if (root.injectedStyle) {
                    elem.setAttribute("style", root.injectedStyle);
                }

                // set children.
                if (root.children) {
                    // parent node를 이것으로 설정
                    parentNode = elem;

                    root.children.forEach((child) => {
                        virtualRender(child);
                    });
                }
            };

            virtualRender(rootElement);
        }

        prepareElement() {
            return {
                root: {
                    class: "inputDialogContainer",
                    tagName: "table",
                    children: [
                        {
                            tagName: "tr",
                            children: [
                                {
                                    tagName: "td",
                                    class: "col",
                                    children: [
                                        {
                                            tagName: "input",
                                            type: "text",
                                            id: "RS.InputDialog.Params.szTextBoxId",
                                            class: "inputDialog",
                                            placeholder:
                                                "RS.InputDialog.Params.localText",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            tagName: "tr",
                            class: "row",
                            attributes: {
                                valign: "bottom",
                            },
                            children: [
                                {
                                    tagName: "td",
                                    class: "col",
                                    attributes: {
                                        align: "right",
                                    },
                                    children: [
                                        {
                                            tagName: "input",
                                            type: "button",
                                            class: "defaultButton",
                                            id: "inputDialog-OkBtn",
                                            value: "RS.InputDialog.Params.okButtonName",
                                        },
                                        {
                                            tagName: "input",
                                            type: "button",
                                            class: "defaultButton",
                                            id: "inputDialog-CancelBtn",
                                            value: "RS.InputDialog.Params.cancelButtonName",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            };
        }
    }

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

            const field = document.getElementById(this._fieldId);

            const style = `
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

      .inputDialogContainer > tr:last-child {
            position:relative;
      }
      
      .inputDialog {
          top : 0em;
          left : 0em;
          right : 0em;
          bottom : 0em;
          z-index : 1000;
          opacity : 0.8;
          position : relative;
          background-image: 
            linear-gradient(to bottom, #ccc, white 50%, #ccc);
          border : 2px solid #ccc;
          border-radius : 10px;
          text-shadow : 0px 1px 3px #696969;
          font-family : arial;
          font-weight: bold;
          outline : none;
          font-size: 1rem!important;
      }
      
      .defaultButton {
          opacity : 0.8;
          font-family : arial;
          border : 2px solid #ccc;
          background-image: 
            linear-gradient(to bottom, #ffffff 0%, #f4f4f4 100%);
          color : rgb(19, 19, 19);
          text-shadow : rgba(105, 105, 105, 0.7) 0 1px 0;
          cursor : pointer;
          color: #9c9c9c;
          border-radius: 5px;
          box-sizing : border-box;
          box-shadow : 0 1px 4px rgba(78, 78, 78, 0.6);
          font-size : 1rem!important;
      }

      .defaultButton:active {
        color : rgb(19, 19, 38); 
      } 

      .defaultButton:hover, .defaultButton:focus {
        transform: scale(1.1);
        font-weight: bold;
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
        }

        static onLoadAfterInnerHTML = function () {
            if (SceneManager._scene) {
                if (SceneManager._scene instanceof Scene_InputDialog) {
                    if (SceneManager._scene._textBox) {
                        SceneManager._scene._textBox.addAllEventListener();
                    }
                }
            }
        };

        getTextBoxId() {
            "use strict";
            const query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text]`;
            return document.querySelector(query);
        }

        getDefaultButtonId(id) {
            "use strict";
            id = id || "inputDialog-OkBtn";
            const query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=${id}]`;
            return document.querySelector(query);
        }

        getMainContainer() {
            "use strict";
            const query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer`;
            return document.querySelector(query);
        }

        addAllEventListener() {
            this._textBox = this.getTextBoxId();
            this._textBox.maxLength = RS.InputDialog.Params.nMaxLength;
            this._textBox.max = RS.InputDialog.Params.nMaxLength;

            this._textBox.addEventListener(
                "keydown",
                this.onKeyDown.bind(this),
                false
            );
            if (!Utils.isMobileDevice()) {
                this._textBox.addEventListener(
                    "focus",
                    this.onFocus.bind(this),
                    false
                );
            }
            this._textBox.addEventListener(
                "blur",
                this.onBlur.bind(this),
                false
            );
            this._textBox.addEventListener(
                "touchstart",
                this.getFocus.bind(this),
                false
            );
            this._textBox.addEventListener(
                "autosize",
                this.onResize.bind(this),
                false
            );

            window.addEventListener("resize", this.onResize.bind(this), false);

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
            const textBox = this.getTextBoxId();
            const OkButton = this.getDefaultButtonId("inputDialog-OkBtn");
            const CancelButton = this.getDefaultButtonId(
                "inputDialog-CancelBtn"
            );

            if (OkButton)
                OkButton.style.fontSize = Utils.isMobileDevice()
                    ? "1rem"
                    : 1 * Graphics._realScale + "em";
            if (CancelButton)
                CancelButton.style.fontSize = Utils.isMobileDevice()
                    ? "1rem"
                    : 1 * Graphics._realScale + "em";

            textBox.style.fontSize = Utils.isMobileDevice()
                ? "1rem"
                : 2 * Graphics._realScale + "em";
            textBox.style.width =
                RS.InputDialog.getScreenWidth(
                    RS.InputDialog.Params.textBoxWidth * Graphics._realScale
                ) + "px";
            textBox.style.height =
                RS.InputDialog.getScreenHeight(
                    RS.InputDialog.Params.textBoxHeight * Graphics._realScale
                ) + "px";
        }

        prepareElement(id) {
            const field = document.createElement("div");

            field.id = id;
            field.style.position = "absolute";
            field.style.left = "0";
            field.style.top = "0";
            field.style.right = "0";
            field.style.bottom = "0";
            field.style.width = "100%";
            field.style.height = "100%";
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
            const cancelButton = this.getDefaultButtonId(
                "inputDialog-CancelBtn"
            );
            okButton.addEventListener(
                "click",
                (e) => {
                    okFunc();
                    e.preventDefault();
                },
                false
            );
            cancelButton.addEventListener(
                "click",
                (e) => {
                    cancelFunc();
                    e.preventDefault();
                },
                false
            );
            okButton.addEventListener(
                "touchend",
                (e) => {
                    okFunc();
                    e.preventDefault();
                },
                false
            );
            cancelButton.addEventListener(
                "touchend",
                (e) => {
                    cancelFunc();
                    e.preventDefault();
                },
                false
            );

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

        onKeyDown(e) {
            const keyCode = e.which;
            if (keyCode < TextBox.IS_NOT_CHAR) {
                if (keyCode === TextBox.ENTER) {
                    if (this._okFunc instanceof Function) this._okFunc();
                }
                if (keyCode === TextBox.ESC) {
                    if (this._cancelFunc instanceof Function)
                        this._cancelFunc();
                }
            }

            this._lastInputTime = performance.now();
        }

        onFocus(e) {
            const text = this.getTextBoxId();
            if (text && Utils.isMobileDevice()) {
                text.style.bottom =
                    RS.InputDialog.getScreenHeight(Graphics.height / 2) + "px";
            }
        }

        onBlur(e) {
            const text = this.getTextBoxId();
            if (text && Utils.isMobileDevice()) {
                text.style.bottom = "0";
                text.focus();
            }
            e.preventDefault();
        }

        setPosition(x, y) {
            let self = this;

            const field = document.getElementById(self._fieldId);
            const mainContainer = self.getMainContainer();
            if (field) {
                field.style.margin = "0";
                mainContainer.style.margin = "0";
                if (x < 0) {
                    x = 0;
                }
                if (x > Graphics.width - RS.InputDialog.Params.textBoxWidth) {
                    x = Graphics.width - RS.InputDialog.Params.textBoxWidth;
                }
                if (y < 0) {
                    y = 0;
                }
                if (y > Graphics.height - RS.InputDialog.Params.textBoxHeight) {
                    y = Graphics.height - RS.InputDialog.Params.textBoxHeight;
                }
                mainContainer.style.left =
                    Graphics._canvas.getBoundingClientRect().left + x + "px";
                mainContainer.style.top =
                    Graphics._canvas.getBoundingClientRect().top + y + "px";
            }
        }

        onResize() {
            let self = this;

            const field = document.getElementById(self._fieldId);
            const textBox = self.getTextBoxId();
            const mainContainer = self.getMainContainer();

            if (field && textBox) {
                Graphics._centerElement(field);
                Graphics._centerElement(mainContainer);
                this.setRect();

                if (RS.InputDialog.Params.isCenterAlignment) {
                    const px =
                        Graphics.width / 2 -
                        RS.InputDialog.Params.textBoxWidth / 2;
                    const py =
                        Graphics.height / 2 -
                        RS.InputDialog.Params.textBoxHeight / 2;
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
            const val = parseInt(performance.now() - this._lastInputTime);
            let ret = false;
            if (val >= RS.InputDialog.Params.nCheckScreenLock && this.isBusy())
                ret = true;
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
            textBox.value = text || "";
            return textBox;
        }

        getText() {
            const textBox = this.getTextBoxId();
            return textBox.value;
        }

        hide() {
            const field = document.getElementById(this._fieldId);
            field.style.zIndex = 0;
            field.style.display = "none";
        }

        show() {
            const field = document.getElementById(this._fieldId);
            field.style.zIndex = 1000;
            field.style.display = "block";
        }

        setTextHint() {
            const textBox = this.getTextBoxId();
            return (textBox.placeholder = RS.InputDialog.Params.localText);
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

            window.removeEventListener(
                "resize",
                this.onResize.bind(this),
                false
            );
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
        }

        update() {
            super.update();
            // TODO: 모바일에서 취소키를 누르면 키입력 창이 사라지는 버그가 있다.
            // 그래서 추가했지만 화면을 누르면 꺼진다는 것을 모르는 유저들이 버그로 착각할 수 있다.
            if (this.isScreenLock() && TouchInput.isTriggered()) {
                this.okResult();
            }
        }

        terminate() {
            super.terminate();
            this._textBox.terminate();
            this._textBox = null;
        }

        isScreenLock() {
            return this._textBox.isScreenLock();
        }

        createBackground() {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this._backgroundSprite.opacity = 128;
            this.addChild(this._backgroundSprite);
        }

        createTextBox() {
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
        }

        okResult() {
            let text = this._textBox.getText() || "";
            if (text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
            $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
            if (SceneManager._stack.length > 0) {
                TouchInput.clear();
                Input.clear();
                this.popScene();
            }
        }

        cancelResult() {
            if (SceneManager._stack.length > 0) {
                TouchInput.clear();
                Input.clear();
                this.popScene();
            }
        }
    }

    window.Scene_InputDialog = Scene_InputDialog;

    //============================================================================
    // Game_Troop
    //============================================================================

    Object.assign(Game_Troop.prototype, {
        battleInterpreterTaskLock() {
            this._interpreter._waitMode = "IME Mode";
        },
        battleInterpreterTaskUnlock() {
            this._interpreter._waitMode = "";
        },
    });

    //============================================================================
    // Scene_Battle
    //============================================================================

    const alias_Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    const alias_Scene_Battle_create = Scene_Battle.prototype.create;
    const alias_Scene_Battle_update = Scene_Battle.prototype.update;
    const alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;

    Object.assign(Scene_Battle.prototype, {
        initialize() {
            alias_Scene_Battle_initialize.call(this);
            this.createTextBox();
        },

        create() {
            alias_Scene_Battle_create.call(this);
        },

        update() {
            alias_Scene_Battle_update.call(this);
            // TODO: 모바일에서 취소키를 누르면 키입력 창이 사라지는 버그가 있다.
            // 그래서 추가했지만 화면을 누르면 꺼진다는 것을 모르는 유저들이 버그로 착각할 수 있다.
            if (this.isScreenLock() && TouchInput.isTriggered()) {
                this.okResult();
            }
        },

        terminate() {
            alias_Scene_Battle_terminate.call(this);
            if (this._textBox) {
                this._textBox.terminate();
                this._textBox = null;
            }
            if ($gameTemp.isCommonEventReserved()) {
                $gameTemp.clearCommonEvent();
            }
        },

        createTextBox() {
            this._textBox = new TextBox(
                RS.InputDialog.Params.szFieldId,
                RS.InputDialog.Params.szTextBoxId
            );
            this._textBox.setEvent(
                this.okResult.bind(this),
                this.cancelResult.bind(this)
            );
        },

        textBoxIsBusy() {
            return this._textBox.isBusy();
        },

        showTextBox() {
            this._textBox.setText("");
            this._textBox.show();
            this._textBox.getFocus();
            this._textBox.setTextHint();
            this._textBox.setRect();
            this._textBox.onResize();
            $gameTroop.battleInterpreterTaskLock();
            this._textBox.addAllEventListener();
        },

        hideTextBox() {
            if (!this.textBoxIsBusy()) return false;
            this._textBox.hide();
            Input.clear();
            $gameTroop.battleInterpreterTaskUnlock();
        },

        isScreenLock() {
            return this._textBox.isScreenLock();
        },

        okResult() {
            if (!this._textBox) return "";
            if (this.textBoxIsBusy()) {
                let text = this._textBox.getText() || "";
                if (text.match(/^([\d]+)$/g)) text = Number(RegExp.$1);
                $gameVariables.setValue(RS.InputDialog.Params.variableID, text);
                this._textBox.setText("");
                if (RS.InputDialog.Params.debug) {
                    const dmsg = "You typed the text is same as ".concat(
                        $gameVariables.value(RS.InputDialog.Params.variableID) +
                            "" || "NONE"
                    );
                    this._logWindow.push("addText", dmsg);
                }
                this.hideTextBox();
            }
        },

        cancelResult() {
            if (!this._textBox) return "";
            if (this.textBoxIsBusy()) {
                this._textBox.setText("");
                this.hideTextBox();
            }
        },
    });

    //============================================================================
    // RS.InputDialog.isEqual
    //============================================================================

    RS.InputDialog.isEqual = function (eq) {
        const data = String(
            $gameVariables.value(RS.InputDialog.Params.variableID)
        );
        eq = String(eq);
        return data === eq;
    };

    //============================================================================
    // Game_Interpreter
    //============================================================================

    const alias_Game_Interpreter_updateWaitMode =
        Game_Interpreter.prototype.updateWaitMode;

    Object.assign(Game_Interpreter.prototype, {
        updateWaitMode() {
            if (this._waitMode === "IME Mode") {
                return true;
            } else {
                return alias_Game_Interpreter_updateWaitMode.call(this);
            }
        },

        isEqualInputData(eq) {
            return RS.InputDialog.isEqual(eq);
        },
    });

    //============================================================================
    // Plugin Commands
    //============================================================================

    PluginManager.registerCommand(pluginName, "open", () => {
        RS.InputDialog.createInstance();
    });

    PluginManager.registerCommand(pluginName, "width", (args) => {
        RS.InputDialog.Params.textBoxWidth = Number(args.width || 488);
        RS.InputDialog.setRect();
    });

    PluginManager.registerCommand(pluginName, "text", (args) => {
        RS.InputDialog.Params.localText = args.text;
    });

    PluginManager.registerCommand(pluginName, "variableID", (args) => {
        RS.InputDialog.Params.variableID = Number(args.number || 3);
    });

    PluginManager.registerCommand(pluginName, "debug", (args) => {
        RS.InputDialog.Params.debug = Boolean(args.valid === "true");
    });

    PluginManager.registerCommand(pluginName, "maxLength", (args) => {
        RS.InputDialog.Params.nMaxLength = Number(args.value || 255);
        RS.InputDialog.setRect();
    });

    PluginManager.registerCommand(pluginName, "pos", (args) => {
        if (args.posType === "center") {
            RS.InputDialog.Params.isCenterAlignment = true;
        } else {
            RS.InputDialog.Params.isCenterAlignment = false;
            RS.InputDialog.Params.pos.x = parseFloat(args[1] || 0);
            RS.InputDialog.Params.pos.y = parseFloat(args[2] || 0);
        }
    });

    window.TextBox = TextBox;
})();
