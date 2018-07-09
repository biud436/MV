/*:
* @plugindesc This plugin allows you to align the text in the message system
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
* \TA[1] - CENTER
* \TA[2] - RIGHT
*
* When using Yanfly Message Core :
* - Do not use the text code like as 'px' and 'py'.
* - Do not use the wordwrapping.
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
* - Now it is worked fine without YEP Message Core.
*/


var Imported = Imported || {};
Imported.RS_MessageAlign = true;

(function() {
    
    //============================================================================
    // Game_Message
    //============================================================================
    
    var alias_Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        alias_Game_Message_clear.call(this);
        this._align = [];
        this._alignLast = 0;
    };
    
    Game_Message.prototype.setAlign = function(n) {
        this._align = this._align || [];
        this._alignLast = n;
        this._align.push(n);
    };
    
    Game_Message.prototype.getAlign = function(n) {
        return this._align.shift() || this._alignLast;
    };
    
    //============================================================================
    // Window_Message
    //============================================================================
    
    var alias_Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = function(text) {
        text = alias_Window_Message_convertEscapeCharacters.call(this, text);
        text = text.replace(/\x1bTA\[(\d+)\]/gi, function() {
            $gameMessage.setAlign(Number(arguments[1] || 0));
            return "";
        }.bind(this));
        return text;
    };
    
    Window_Message.prototype.processAlign = function(textState) {
        textState = textState || this._textState;
        switch($gameMessage.getAlign()) {
            case 1:
            this.setAlignCenter(textState);
            break;
            case 2:
            this.setAlignRight(textState);
            break;
            default:
            this.setAlignLeft(textState);
        }
    }
    
    var alias_Window_Message_processNewLine = Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function(textState) {
        alias_Window_Message_processNewLine.call(this, textState);
        this.processAlign(textState);
    };

    if(!Imported.YEP_MessageCore) {

        Window_Message.prototype.saveFontSettings = function() {
            this._messageDesc = {}; 
            this._messageDesc.fontFace = this.contents.fontFace;
            this._messageDesc.fontSize = this.contents.fontSize;
            this._messageDesc.textColor = this.contents.textColor;
        };
        
        Window_Message.prototype.restoreFontSettings = function() {
            if(!this._messageDesc) return;
            this.contents.fontFace = this._messageDesc.fontFace;
            this.contents.fontSize = this._messageDesc.fontSize;
            this.contents.textColor = this._messageDesc.textColor;
            this._messageDesc = undefined;
        };        

    }    
    
    Window_Message.prototype.calcTextWidth = function(text) {
        
        var tempText = text; tempText = tempText.split(/[\n]+/);
        var textWidth;

        // This makes it easier to get the text width.
        // But it will be drawn the text many times inside invisible area.
        if(Imported.YEP_MessageCore) {

            textWidth = this.textWidthExCheck(tempText[0]);

        } else { 

            this.saveFontSettings();
            textWidth = this.drawTextEx(tempText[0], 0, this.contents.height);
            this.restoreFontSettings();

        }

        return textWidth;        

    };
    
    Window_Message.prototype.setAlignLeft = function(textState) {
        var padding = this.textPadding();
        textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
        textState.x = ( this.newLineX() + padding );
        textState.left = textState.x;
    };
    
    Window_Message.prototype.setAlignCenter = function(textState) {
        var padding = this.textPadding();
        textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
        textState.x = ( this.newLineX() + this.contentsWidth() + padding) / 2 - textState.tx / 2;
        textState.left = textState.x;
    };
    
    Window_Message.prototype.setAlignRight = function(textState) {
        var padding = this.textPadding();
        textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
        textState.x = ( this.contentsWidth() - padding) - textState.tx;
        textState.left = textState.x;
    };
    
    var alias_Window_Message_startMessage_setAlignCenter = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        alias_Window_Message_startMessage_setAlignCenter.call(this);
        this.processAlign();
    };
    
})();
