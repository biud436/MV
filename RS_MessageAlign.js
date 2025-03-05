//================================================================
// RS_MessageAlign.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc (v1.0.30) This plugin allows you to align the text in the message system.
 * @author biud436
 * @help
 * =============================================================================
 * Usage
 * -----------------------------------------------------------------------------
 * That plugin is an addon, so it should be installed the plugin somewhere
 * below 'YEP_MessageCore'.
 *
 * All text codes process before drawn the text.
 * For each line you can set a different text alignment.
 *
 * \TA[0] - LEFT
 * \TA[1] - CENTER (It is easier to use the <CENTER> tag)
 * \TA[2] - RIGHT
 *
 * When using Yanfly Message Core :
 * - Do not use the text code like as 'px' and 'py'.
 * - Do not use the wordwrapping.
 * =============================================================================
 * Example
 * -----------------------------------------------------------------------------
 *
 * Ex 1 :)
 * <CENTER>All of scenes have default implementations
 * for create, start and update that can be
 * in derived classes. and then the scene class </CENTER>
 * has a lot of the member functions.
 *
 * Ex 2 :)
 * \TA[1] The Game_Player object inherits from
 * \TA[2] the Game_Character class and implements
 * <CENTER> its own functions.</CENTER>
 *
 * Ex 3 :)
 * <CENTER>Hide in 5 seconds!
 *
 * =============================================================================
 * Change Log
 * -----------------------------------------------------------------------------
 * 2017.01.25 (v1.0.0) - First Release
 * 2017.06.25 (v1.0.1) - Fixed an issue that resets a font setting at each line
 * 2017.07.23 (v1.0.2) - Fixed a bug that the alignment is not processing in a newly line
 * 2017.10.13 (v1.0.3) - Fixed the class name.
 * 2018.05.09 (v1.0.4) - Added a variable that stores a last alignment value.
 * 2018.07.09 (v1.0.5) :
 * - Fixed the text padding for left, center, right alignment.
 * - Now it is worked fine even without YEP Message Core.
 * 2018.08.14 (v1.0.6) - Fixed the LF(line feed) and CR(carriage return)
 * 2018.11.05 (v1.0.7) :
 * - Added text codes like as <LEFT>, <CENTER>, <RIGHT>, </LEFT>, </CENTER>, </RIGHT>
 * 2018.12.22 (v1.0.8) :
 * - Now it is possible to use a text alignment in scroll text window and item window.
 * 2019.03.18 (v1.0.9) :
 * - Added something for Galv's Message Styles Compatibility.
 * 2019.04.13 (v1.0.10) :
 * - Fixed the issue that is not working in the scrolling text.
 * 2019.04.15 (v1.0.12) :
 * - Added the feature that recalculates the text height when using a text code called \fs[x].
 * - Fixed the bug that goes a font resetting for each line.
 * 2019.08.29 (v1.0.13) :
 * - Fixed the issue that is added the spaces from the second line when the text alignment is the left.
 * 2019.09.23 (v1.0.14) :
 * - Fixed issues that conflict with YEP_StatAllocation and YEP_StatusMenuCore plugins.
 * 2020.05.13 (v1.0.15) :
 * - Removed unused value.
 * 2020.08.13 (v1.0.16) :
 * - Fixed an issue that worked twicely when using text codes such as "\!", "\.", "\|" in the vanilla mode.
 * 2023.07.13 (v1.0.28) :
 * - Converted to the ES6 (Object Literal Shorthand, Spread Syntax, Arrow Function, Const/Let)
 * 2023.07.15 (v1.0.29) :
 * - Fixed the issue that is not defined the variable called 'tx' after refactoring the code.
 * 2023.11.08 (v1.0.30) :
 * - Fixed a compatibility issue with the YEP_EventMiniLabel plugin.
 */

// eslint-disable-next-line no-var
var Imported = Imported || {};
Imported.RS_MessageAlign = true;

RS = window.RS || {};
RS.MessageAlign = RS.MessageAlign || {};

(function () {
    'use strict';

    //============================================================================
    // Game_Message
    //============================================================================

    const alias_Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        alias_Game_Message_clear.call(this);
        this._align = [];
        this._alignLast = undefined;  // Changed from -1
    };

    Game_Message.prototype.setAlign = function (n) {
        this._align = this._align || [];
        this._alignLast = n;
        this._align.push(n);
    };

    Game_Message.prototype.getAlign = function() {
        if (this._align.length > 0) {
            return this._align[0]; // Peek at next alignment without shifting
        }
        return this._alignLast; // Returns undefined when no alignment set
    };

    Game_Message.prototype.clearAlignLast = function () {
        this._alignLast = -1;
    };

    //============================================================================
    // Window_Base
    //============================================================================

    Window_Base.prototype.isUsedTextWidthEx = function () {
        let ret = false;
        if (Imported.YEP_MessageCore && this._checkWordWrapMode) {
            ret = true;
        }
        if (!Imported.YEP_MessageCore) {
            ret = this._isUsedTextWidth;
        }
        if (Imported.YEP_EventMiniLabel) {
            ret = true;
        }

        return ret;
    };

    const alias_Window_Base_convertEscapeCharacters =
        Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function (text) {
        text = alias_Window_Base_convertEscapeCharacters.call(this, text);
        text = text.replace(/\\/g, '\x1b');
        // eslint-disable-next-line no-control-regex
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/(?:<LEFT>)/gi, () => {
            return '\x1bTA[0]';
        });
        text = text.replace(/(?:<CENTER>)/gi, () => {
            return '\x1bTA[1]';
        });
        text = text.replace(/(?:<RIGHT>)/gi, () => {
            return '\x1bTA[2]';
        });
        text = text.replace(
            // eslint-disable-next-line no-control-regex
            /\x1bTA\[(\d+)\]/gi,
            (...args) => {
                if (!this.isUsedTextWidthEx()) {
                    $gameMessage.setAlign(Number(args[1] || 0));
                }
                return '';
            }
        );
        text = text.replace(/<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi, () => {
            return '\x1bAEND';
        });
        return text;
    };

    const alias_Window_Base_processEscapeCharacter =
        Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        switch (code) {
            case 'AEND':
                $gameMessage.clearAlignLast();
                break;
            default:
                alias_Window_Base_processEscapeCharacter.call(
                    this,
                    code,
                    textState
                );
        }
    };

    Window_Base.prototype.processAlign = function(textState) {
        textState = textState || this._textState;
        const alignment = $gameMessage.getAlign();
        
        // Only process valid alignments
        if (typeof alignment !== 'number' || alignment < 0 || alignment > 2) {
            return; // Preserve original alignment
        }
    
        switch(alignment) {
            case 0:
                this.setAlignLeft(textState);
                break;
            case 1:
                this.setAlignCenter(textState);
                break;
            case 2:
                this.setAlignRight(textState);
                break;
        }
        
        // Remove processed alignment
        if ($gameMessage._align.length > 0) {
            $gameMessage._align.shift();
        }
    };

    const alias_Window_Base_processNewLine =
        Window_Base.prototype.processNewLine;
    Window_Base.prototype.processNewLine = function (textState) {
        alias_Window_Base_processNewLine.call(this, textState);
        this.processAlign(textState);
    };

    if (!Imported.YEP_MessageCore) {
        Window_Base.prototype.saveFontSettings = function () {
            this._messageDesc = {};
            this._messageDesc.fontFace = this.contents.fontFace;
            this._messageDesc.fontSize = this.contents.fontSize;
            this._messageDesc.textColor = this.contents.textColor;
        };

        Window_Base.prototype.restoreFontSettings = function () {
            if (!this._messageDesc) return;
            this.contents.fontFace = this._messageDesc.fontFace;
            this.contents.fontSize = this._messageDesc.fontSize;
            this.contents.textColor = this._messageDesc.textColor;
            this._messageDesc = undefined;
        };
    }

    Window_Base.prototype.calcTextWidth = function (text) {
        let tempText = text;
        tempText = tempText.split(/[\r\n]+/);
        let textWidth = 0;

        // Galv's Message Styles Compatibility
        if (Imported.Galv_MessageStyles) {
            let ret = 0;

            let faceoffset = Window_Base._faceWidth + 25;

            if (Imported.Galv_MessageBusts) {
                if ($gameMessage.bustPos === 1) {
                    faceoffset = 0;
                } else {
                    faceoffset = Galv.MB.w;
                }
            }

            // Calc X Offset
            let xO = $gameMessage._faceName ? faceoffset : 0;
            // eslint-disable-next-line no-unused-vars
            xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

            if (this.pTarget != null) {
                this.resetFontSettings();
                ret = this.testWidthEx(tempText[0]);
                this.resetFontSettings();
                textWidth = Math.max(textWidth, ret);
                if (textWidth !== 0) return textWidth;
            }
        }

        if (Imported.YEP_MessageCore) {
            const setting = this._wordWrap;
            this._wordWrap = false;
            this.saveCurrentWindowSettings();
            this._checkWordWrapMode = true;
            textWidth = this.drawTextExForAlign(
                tempText[0],
                0,
                this.contents.height
            );
            this._checkWordWrapMode = false;
            this.restoreCurrentWindowSettings();
            this.clearCurrentWindowSettings();
            this._wordWrap = setting;
        } else {
            this.saveFontSettings();
            this._isUsedTextWidth = true;
            textWidth = this.drawTextExForAlign(
                tempText[0],
                0,
                this.contents.height
            );
            this.restoreFontSettings();
            this._isUsedTextWidth = false;
        }

        return textWidth;
    };

    if (Imported.YEP_MessageCore) {
        Window_Base.prototype.calcTextHeight = function (textState, all) {
            'use strict';

            const lastFontSize = this.contents.fontSize;
            let textHeight = 0;
            const lines = textState.text.slice(textState.index).split('\n');
            const maxLines = all ? lines.length : 1;

            for (let i = 0; i < maxLines; i++) {
                let maxFontSize = this.contents.fontSize;
                // eslint-disable-next-line no-control-regex, no-useless-escape
                const regExp = /\x1b[\{\}]|\x1bFS\[(\d+)\]/gi;
                for (;;) {
                    const array = regExp.exec(lines[i]);
                    if (array) {
                        if (array[0] === '\x1b{') {
                            this.makeFontBigger();
                        }
                        if (array[0] === '\x1b}') {
                            this.makeFontSmaller();
                        }
                        if (array[0].contains('\x1bfs'.toLowerCase())) {
                            this.contents.fontSize = parseInt(array[1], 10);
                        }
                        if (maxFontSize < this.contents.fontSize) {
                            maxFontSize = this.contents.fontSize;
                        }
                    } else {
                        break;
                    }
                }
                textHeight += maxFontSize + 8;
            }

            this.contents.fontSize = lastFontSize;

            return textHeight;
        };
    }

    Window_Base.prototype.newLineX = function () {
        return this.textPadding();
    };

    Window_Base.prototype.setAlignLeft = function (textState) {
        textState.x = this.newLineX();
        textState.left = textState.x;
    };

    Window_Base.prototype.setAlignCenter = function (textState) {
        const padding = this.textPadding();
        const tx = this.calcTextWidth(textState.text.slice(textState.index));
        textState.x =
            (this.newLineX() + this.contentsWidth() + padding) / 2 - tx / 2;
        textState.left = textState.x;
    };

    Window_Base.prototype.setAlignRight = function (textState) {
        const padding = this.textPadding();
        const tx = this.calcTextWidth(textState.text.slice(textState.index));
        textState.x = this.contentsWidth() - padding - tx;
        textState.left = textState.x;
    };

    Window_Base.prototype.doFirstLineAlign = function (textState) {
        const isValid = !this.isUsedTextWidthEx();
        if (isValid) {
            this.processAlign(textState);
        }
    };

    Window_Base.prototype.drawTextExForAlign = function (text, x, y) {
        if (text) {
            const textState = { index: 0, x, y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        }

        return 0;
    };

    const alias_origin_Window_Base_drawTextEx =
        Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function (text, x, y) {
        if (text) {
            this.resetFontSettings();
            const textState = { index: 0, x, y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            this.doFirstLineAlign(textState);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        }

        return 0;
    };

    //============================================================================
    // Window_Message
    //============================================================================

    // Galv's Message Styles Compatibility
    if (Imported.Galv_MessageStyles) {
        Window_Message.prototype.textPadding = function () {
            let faceoffset = Window_Base._faceWidth + 25;

            if (Imported.Galv_MessageBusts) {
                if ($gameMessage.bustPos === 1) {
                    faceoffset = 0;
                } else {
                    faceoffset = Galv.MB.w;
                }
            }

            // Calc X Offset
            let xO = $gameMessage._faceName ? faceoffset : 0;
            xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

            return xO;
        };
    }

    Window_Message.prototype.processAlign = function (textState) {
        textState = textState || this._textState;
        switch ($gameMessage.getAlign()) {
            case 1:
                this.setAlignCenter(textState);
                break;
            case 2:
                this.setAlignRight(textState);
                break;
            default:
                this.setAlignLeft(textState);
                break;
        }
    };

    if (!Imported.YEP_MessageCore) {
        const alias_Window_Message_startPause =
            Window_Message.prototype.startPause;
        Window_Message.prototype.startPause = function () {
            if (this.isUsedTextWidthEx()) return;
            alias_Window_Message_startPause.call(this);
        };

        const alias_Window_Message_startWait =
            Window_Message.prototype.startWait;
        Window_Message.prototype.startWait = function (count) {
            if (this.isUsedTextWidthEx()) return;
            alias_Window_Message_startWait.call(this, count);
        };
    }

    const alias_Window_Message_startMessage_setAlignCenter =
        Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        alias_Window_Message_startMessage_setAlignCenter.call(this);
        this.processAlign();
    };

    //============================================================================
    // Window_ChoiceList
    //============================================================================
    Window_ChoiceList.prototype.drawTextEx = function (text, x, y) {
        return alias_origin_Window_Base_drawTextEx.call(this, text, x, y);
    };

    //============================================================================
    // Window_ScrollText
    //============================================================================

    Window_ScrollText.prototype.refresh = function () {
        const textState = { index: 0 };
        textState.text = this.convertEscapeCharacters(this._text);
        this.resetFontSettings();
        this._allTextHeight = this.calcTextHeight(textState, true);
        this.createContents();
        this.origin.y = -this.height;
        this.processAlign(textState);
        this.drawTextEx(this._text, this.textPadding(), 1);
    };
})();
