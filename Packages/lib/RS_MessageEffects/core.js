window.Imported = window.Imported || {};
Imported.RS_MessageEffects = true;

window.RS = window.RS || {};
window.RS.MessageEffects = window.RS.MessageEffects || {};

var parameters = $plugins.filter(function (i) {
  return i.description.contains('<RS_MessageEffects>');
});

parameters = (parameters.length > 0) && parameters[0].parameters;

RS.MessageEffects.Params = {};

RS.MessageEffects.Params.defaultTextEffect = parameters["Default Text Effect"] || "none";
RS.MessageEffects.Params.currentEffect = RS.MessageEffects.Params.defaultTextEffect;
RS.MessageEffects.Params.clearFlag = Boolean(parameters["Clear Flag"] === "true");

//================================================================
// Window_MessageImpl
//================================================================    
class Window_MessageImpl extends Window_Message {
    constructor() {
        super();

        this.createMainTextLayer();

        this.once("removed", () => {
            this.terminateMainTextLayer();
        });

    }

    clearFlags() {
        super.clearFlags();
        if(RS.MessageEffects.Params.clearFlag) {
            RS.MessageEffects.Params.currentEffect = 'none';
        }
    }

    _updateContents() {
        super._updateContents();
    }

    createMainTextLayer() {
        var w = this._width - this._padding * 2;
        var h = this._height - this._padding * 2;

        this._mainTextLayer = new Sprite();
        this._mainTextLayer.setFrame(this.origin.x, this.origin.y, w, h);
        this._mainTextLayer.on("effect", this.startTextEffect, this);
        this._windowContentsSprite.addChild(this._mainTextLayer);
    }

    terminateMainTextLayer() {
        if(this._mainTextLayer) {
            this._windowContentsSprite.removeChild(this._mainTextLayer);
            this._mainTextLayer = null;
        }
    }

    terminateMessage() {
        super.terminateMessage();

        if(this._mainTextLayer) {
            this._mainTextLayer.removeChildren();
        }
    }

    /**
     * @param {Array} args
     */
    startTextEffect(args) {

        /**
         * @type {TextEffect}
         */
        const bitmap = args[0];  
        const effectType = RS.MessageEffects.Params.currentEffect;
        const textState = args[1];

        if(!bitmap) return;                       

        let sprite = EffectFactory.create(effectType);

        sprite.bitmap = bitmap;
             
        this._mainTextLayer.addChild(sprite);       

        sprite.start(textState);

    }

    /**
     * 
     * @param {MV.TextState} textState 
     */
    addText(textState) {
        if(!this.contents) {
            this.createContents();
        }

        let c = textState.text[textState.index++];
        
        let w = this.textWidth(c);
        let h = textState.height;

        var bitmap = new Bitmap(w * 2, h);

        // FontFace를 먼저 설정해야 색깔이 정상적으로 변경됨
        bitmap.fontFace = this.standardFontFace();

        bitmap.fontSize = this.standardFontSize();
        bitmap.fontItalic = this.contents.fontItalic;
        bitmap.textColor = this.contents.textColor;
        bitmap.outlineColor = this.contents.outlineColor;
        bitmap.outlineWidth = this.contents.outlineWidth;

        if(this.contents.width < Math.floor(textState.x + w * 2)) {
            return;
        }

        // 자동 개행, 배경색 설정을 위해서.
        if(Imported.RS_MessageSystem) {
            bitmap.fontBold = this.contents.fontBold;

            var width = this.contentsWidth();

            var isValid = ($gameMessage.getBalloon() === -2) && !this._isUsedTextWidthEx && RS.MessageSystem.Params.isParagraphMinifier;
        
            this.processWordWrap(textState, w, width, isValid);
        
            if($gameMessage.faceName() !== "") {
              width = this.contents.width - (Window_Base._faceWidth);
              isValid = (RS.MessageSystem.Params.faceDirection === 2);
              this.processWordWrap(textState, w, width, isValid);
            }

            if(this.contents.highlightTextColor != null) {
                bitmap.fillRect( 0, 0, w + 1.0, textState.height, this.contents.highlightTextColor);
            }
            
        }

        bitmap.drawText(c, 0, 0, w * 2 , h, "left");

        this._mainTextLayer.emit("effect", [
            bitmap,
            textState
        ]);
        
        textState.x += w;

        if(Imported.RS_MessageSystem) {
            !this._showFast && this.startWait($gameMessage.getWaitTime() || 0);
            if((textState.index % RS.MessageSystem.Params.textSoundInterval) === 0) this._requestTextSound();                
        }
    }

    /**
     * @method obtainTextEffectName
     * @param {MV.TextState} textState 
     */
    obtainTextEffectName(textState) {
        var arr = /\<(.*)\>/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return String(arr[1]);
        } else {
            return "";
        }
    }

    setTextEffect(textEffect) {
        if(typeof(textEffect) === "number") {
            var keys = Object.keys(EffectFactory.TYPE);
            var effects = keys[textEffect];
            if(keys.contains(effects)) {
                textEffect = effects;
            } else {
                textEffect = RS.MessageEffects.Params.defaultTextEffect;
            }
        }
        RS.MessageEffects.Params.currentEffect = textEffect;
    }

    /**
     * 
     * @param {String} code 
     * @param {MV.TextState} textState 
     */
    processEscapeCharacter(code, textState) {                          
        switch (code) {
            case '텍스트효과':
            case 'TE': // \TE<PingPong>
                const textEffectName = this.obtainTextEffectName(textState);
                if(!this._isUsedTextWidthEx) {
                    this.setTextEffect(textEffectName);
                }
                break;
            case 'E': // \E[1]
                const effectNum = this.obtainEscapeParam(textState);
                if(!this._isUsedTextWidthEx) {                    
                    this.setTextEffect(effectNum - 1);
                }                
            default:
                super.processEscapeCharacter(code, textState);
                break;
        }
    }

    /**
     * @param {MV.TextState} textState 
     */        
    processNormalCharacter(textState) {
        if(RS.MessageEffects.Params.currentEffect !== "none") {
            this.addText(textState);
        } else {
            super.processNormalCharacter(textState);
        }
    }

    startPause() {
        super.startPause();
        // this._mainTextLayer.children.forEach(i => i.flush());
    }

}

window.Window_Message = Window_MessageImpl;

var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "MessageEffectMap") {
        RS.MessageEffects.Params.currentEffect = args[0];
    }
};                 