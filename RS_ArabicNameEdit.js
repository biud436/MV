//================================================================
// RS_ArabicNameEdit.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_ArabicNameEdit>
 * @author biud436
 * 
 * @param Font
 * @desc Specify the font face as you want.
 * @default GameFont
 *    
 * @help
 * ================================================================
 * Change Log
 * ================================================================
 * 2020.01.31 (v1.0.0) - First Release.
 * 2020.01.31 (v1.0.1) :
 * - Reviewed the Arabic letters, by Koro San.
 */

var Imported = Imported || {};
Imported.RS_ArabicNameEdit = true;

var RS = RS || {};
RS.ArabicNameEdit = RS.ArabicNameEdit || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_ArabicNameEdit>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
          try { return $.jsonParse(v); } catch (e) { return v; }
        });
        return retData;
    };

    $.Params = {};
    $.Params.fontFace = parameters["Font"] || "GameFont";

    class Window_ArabicNameEdit extends Window_NameEdit {

        constructor(actor, maxLength) {
            super(actor, maxLength);
        }

        createActorFace() {
            this._actorSprite = new Sprite();
            this._actorSprite.visible = false;
            
            this._windowContentsSprite.addChild(this._actorSprite);
        }

        standardFontFace() {
            if(!navigator.language.match(/^ar/)) {
                return super.standardFontFace();
            }

            return $.Params.fontFace;
        }

        /**
         * @param {Number} textWdith 
         */
        right(textWidth) {
            let padding = this.textPadding();
            let width = this.contents.width - padding;

            let faceWidth = Window_Base._faceWidth;

            if(this._actor.faceName() !== "") {
                width -= faceWidth;
            }

            return width;

        }

        itemRect2(textWidth) {
            return new Rectangle( this.right(textWidth), 54, 42, this.lineHeight());
        }

        makeText(text) { 
            return String("\u202B" + text);
        };

        add(ch) {
            if (this._index < this._maxLength) {
                this._name += ch;
                this._index++;
                this.refresh();
                return true;
            } else {
                return false;
            }            
        }

        name() {
            return this.makeText(this._name);
        }

        drawUnderline2(rect, textWidth) {
            var color = this.underlineColor();
            this.contents.paintOpacity = 96;
            this.contents.fillRect(rect.x, rect.y + rect.height - 4, textWidth, 2, color);
            this.contents.paintOpacity = 255;
        }

        drawArabicText(rect, text) {
            this.resetTextColor();            
            this.drawText(text, rect.x, rect.y);    
        }

        /**
         * 
         * @param {Rectangle} rect 
         */
        drawActorFace2(rect) {

            const faceName = this._actor.faceName();
            
            if(faceName == null || faceName == "") {
                return;
            }

            const faceIndex = this._actor.faceIndex();
            const w = Window_Base._faceWidth;
            const h = Window_Base._faceHeight;
            const cols = 4;

            this._actorSprite.bitmap = ImageManager.loadFace(faceName);

            this._actorSprite.setFrame(
                w * (faceIndex % cols),
                h * Math.floor(faceIndex / cols),
                w, 
                h
            );

            this._actorSprite.x = rect.x;
            this._actorSprite.visible = true;

        }

        refresh() {
            this.contents.clear();

            // Make an arabic text
            var text = this.makeText(this._name || '');
            var textWidth = this.textWidth(text);

            var rect = this.itemRect2(textWidth);
            
            if(!this._actorSprite) {
                this.createActorFace();                
            }

            this.drawActorFace2(rect);
            rect.x -= Math.round(textWidth);
            this.drawUnderline2(rect, textWidth);
            this.drawArabicText(rect, text);
        
        }
    }

    window.Window_NameEdit = Window_ArabicNameEdit;
    
    Window_NameInput.ARABIC1 = [ 
        '١','٢','٣','٤','٥',  '٦','٧','٨','٩','٠',
       'ذ','د','خ','ح','ج',  'ث','ت','ب','أ','ا',
       'غ','ع','ظ','ط','ض',  'ص','ش','س','ز','ر',
       'ي','ؤ','و','ه','ن',  'م','ل','ك','ق','ف',
       '','','','ـ','ئ',  'ى','ة','آ','إ','ء',
       '~','!','@','#','$',  '%','^','&','*','(',
       ')','_','+','=','-',   '','','','','',
       '','','','','',   '','','','','',
       ' ',' ',' ',' ',' ',  ' ',' ',' ','Page','OK' 
   ];

   Window_NameInput.ARABIC2 = [ 
       '0','1','2','3','4',   '5','6','7','8','9',
       'A','B','C','D','E',  'a','b','c','d','e',
       'F','G','H','I','J',  'f','g','h','i','j',
       'K','L','M','N','O',  'k','l','m','n','o',
       'P','Q','R','S','T',  'p','q','r','s','t',
       'U','V','W','X','Y',  'u','v','w','x','y',
       'Z','','','','',  'z','','','','',
       ' ',' ',' ',' ',' ',  ' ',' ',' ',' ',' ',
       ' ',' ',' ',' ',' ',  ' ',' ',' ','Page','OK' 
   ];      
   
    class Window_ArabicNameInput extends Window_NameInput {

        standardFontFace() {
            if(!navigator.language.match(/^ar/)) {
                return super.standardFontFace();
            }

            return $.Params.fontFace;
        }

        table() {
            return [Window_NameInput.ARABIC1,
                Window_NameInput.ARABIC2];            
        }

    }

    window.Window_NameInput = Window_ArabicNameInput;
    
})(RS.ArabicNameEdit);