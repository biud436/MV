/*:
 * @plugindesc Message Align
 * @author biud436
 * @help
 * =============================================================================
 * Usage
 * -----------------------------------------------------------------------------
 * To be able to use this stuff, It must require a YEP_MessageCore plugin.
 *
 * All text codes process before drawn the text.
 * For each line you can set a different text alignment.
 *
 * \TA[0] - LEFT
 * \TA[1] - CENTER
 * \TA[2] - RIGHT
 *
 * - It may not be working properly when using px and py textcodes in Yanfly Message Core.
 * - It may not be working properly when wordwrapping in Yanfly Message Core.
 *
 * =============================================================================
 * Change Log
 * -----------------------------------------------------------------------------
 * 2017.01.25 (v1.00) - First Release
 * 2017.06.25 (v1.01) - Fixed an issue that resets a font setting at each line
 * 2017.07.23 (v1.02) - Fixed a bug that the alignment is not processing in a newly line
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
   };

   Game_Message.prototype.setAlign = function(n) {
     this._align = this._align || [];
     this._align.push(n);
   };

   Game_Message.prototype.getAlign = function(n) {
     return this._align.shift() || 0;
   };

   //============================================================================
   // Window_Base
   //============================================================================

   var alias_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
   Window_Base.prototype.convertEscapeCharacters = function(text) {
     text = alias_Window_Base_convertEscapeCharacters.call(this, text);
     text = text.replace(/\x1bTA\[(\d+)\]/gi, function() {
       $gameMessage.setAlign(Number(arguments[1] || 0));
       return "";
     }.bind(this));
     return text;
   };

   Window_Base.prototype.processAlign = function(textState) {
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

   var alias_Window_Base_processNewLine = Window_Base.prototype.processNewLine;
   Window_Base.prototype.processNewLine = function(textState) {
     alias_Window_Base_processNewLine.call(this, textState);
     this.processAlign(textState);
   };

   Window_Base.prototype.calcTextWidth = function(text) {
     var tempText = text; tempText = tempText.split(/[\n]+/);
     return this.textWidthExCheck(tempText[0]);
   };

   Window_Base.prototype.setAlignLeft = function(textState) {
     var padding = this.textPadding();
     textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
     textState.x = ( this.newLineX() + padding * 2 );
     textState.left = textState.x;
   };

   Window_Base.prototype.setAlignCenter = function(textState) {
     var padding = this.textPadding();
     textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
     textState.x = ( this.newLineX() + this.contentsWidth() + padding * 2) / 2 - textState.tx / 2;
     textState.left = textState.x;
   };

   Window_Base.prototype.setAlignRight = function(textState) {
     var padding = this.textPadding();
     textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
     textState.x = ( this.contentsWidth() - padding * 2) - textState.tx;
     textState.left = textState.x;
   };

   //============================================================================
   // Window_Message
   //============================================================================

   var alias_Window_Message_startMessage_setAlignCenter = Window_Message.prototype.startMessage;
   Window_Message.prototype.startMessage = function() {
     alias_Window_Message_startMessage_setAlignCenter.call(this);
     this.processAlign();
   };

 })();
