
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

        return RS.ArabicNameEdit.Params.fontFace;
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