//================================================================
// RS_ArabicNameEdit.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_ArabicNameEdit>
 * @author biud436
 * 
 * @param Font
 * @desc Specify the font face as you want.
 * @default Simplified Arabic, Times New Roman, Segoe UI, rmmz-mainfont
 *    
 * @help
 * 2020.08.23 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_ArabicNameEdit = true;

var RS = RS || {};
RS.ArabicNameEdit = RS.ArabicNameEdit || {};

($ => {

    "use strict";

    const pluginParams = $plugins.filter(function (i) {
      return i.description.contains('<RS_ArabicNameEdit>');
    });
    
    const pluginName = (pluginParams.length > 0) && pluginParams[0].name;
    const parameters = (pluginParams.length > 0) && pluginParams[0].parameters;

    $.Params = {};
    $.Params.fontFace = parameters["Font"];

    class Window_ArabicNameEdit extends Window_NameEdit {

        constructor(rect) {
            super(rect);
        }

        setup(actor, maxLength) {
            super.setup(actor, maxLength);
        }

        createActorFace() {
            this._actorSprite = new Sprite();
            this._actorSprite.visible = false;
            
            this._clientArea.addChild(this._actorSprite);
        }

        standardFontFace() {
            return $.Params.fontFace;
        }

        resetFontSettings() {
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = $gameSystem.mainFontSize();
            this.resetTextColor();
        }        

        textPadding() {
            return 0;
        }

        /**
         * @param {Number} textWdith 
         */
        right(textWidth) {
            let padding = this.textPadding();
            let width = this.innerWidth - padding;

            let faceWidth = ImageManager.faceWidth;

            if(this._actor.faceName() !== "") {
                width -= faceWidth;
            }

            width -= textWidth;

            return width;

        }

        itemRect2(textWidth) {
            return new Rectangle
            ( 
                this.right(textWidth), 
                54, 
                42,
                this.lineHeight()
            );
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

        /**
         * Draw the arabic text in name edit window
         * @param {Rectangle} rect 
         * @param {String} text 
         */
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
            const w = ImageManager.faceWidth;
            const h = ImageManager.faceHeight;
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

            let rect = 
                new Rectangle
                    (
                        this.innerWidth - ImageManager.faceWidth - this.itemPadding(),
                        this.itemPadding(),
                        this.innerWidth,
                        this.innerHeight
                    );

            if(!this._actorSprite) {
                this.createActorFace();                
            }

            this.drawActorFace2(rect);
            const text = this.makeText(this._name || '');
            const textWidth = this.textWidth(text);                          

            rect = this.itemRect2(textWidth);

            const width = this.textWidth(text);
            const px = this.right(width);            
            const py = this.innerHeight / 2 - rect.height / 2;

            rect.x = px;
            rect.y = py;
            rect.x -= ImageManager.faceWidth;

            this.drawUnderline2(rect, textWidth);      
            this.drawArabicText(rect, text);
            this.setCursorRect(rect.x, rect.y, width, rect.height);
        
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

        constructor(rect) {
            super(rect);
        }

        standardFontFace() {
            return $.Params.fontFace;
        }

        resetFontSettings() {
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = $gameSystem.mainFontSize();
            this.resetTextColor();
        }

        table() {
            return [Window_NameInput.ARABIC1,
                Window_NameInput.ARABIC2];            
        }

    }

    window.Window_NameInput = Window_ArabicNameInput;
    
})(RS.ArabicNameEdit);