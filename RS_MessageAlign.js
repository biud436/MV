/*:
 * @plugindesc (v1.0.7) This plugin allows you to align the text in the message system.
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
 */

var Imported = Imported || {};
Imported.RS_MessageAlign = true;

var RS = RS || {};
RS.MessageAlign = RS.MessageAlign || {};

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

    Game_Message.prototype.clearAlignLast = function(n) {
        this._alignLast = 0;
    };    
    
    //============================================================================
    // Window_Message
    //============================================================================
    
    var alias_Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = function(text) {
        text = alias_Window_Message_convertEscapeCharacters.call(this, text);
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');        
        text = text.replace(/(?:<LEFT>)/gi, function() {
            return '\x1bTA[0]';
          }.bind(this));      
        text = text.replace(/(?:<CENTER>)/gi, function() {
            return '\x1bTA[1]';
        }.bind(this));       
        text = text.replace(/(?:<RIGHT>)/gi, function() {
            return '\x1bTA[2]';
        }.bind(this));              
        text = text.replace(/\x1bTA\[(\d+)\]/gi, function() {
            $gameMessage.setAlign(Number(arguments[1] || 0));
            return "";
        }.bind(this)); 
        text = text.replace(/<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi, function() {
            return '\x1bAEND';
        }.bind(this));              
        return text;
    };

    var alias_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
        case 'AEND':
        $gameMessage.clearAlignLast();
        break;
        default:
        alias_Window_Message_processEscapeCharacter.call(this, code, textState);
        }
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
    };
    
    var alias_Window_Message_processNewLine = Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function(textState) {
        alias_Window_Message_processNewLine.call(this, textState);
        // When processing a new line, the function that aligns a text will be executed.
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

    };    
    
    Window_Message.prototype.calcTextWidth = function(text) {
        
        var tempText = text; tempText = tempText.split(/[\r\n]+/);
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
