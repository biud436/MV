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
        // this.createRenderTexture();

        this.once("removed", () => {
            this.terminateMainTextLayer();
        });

    }

    // createRenderTexture() {
    //     const gl = Graphics._renderer.gl;
    
    //     // Create RenderTexture
    //     this._renderTexture = PIXI.RenderTexture.create(
    //         this.width,
    //         this.height,
    //         PIXI.SCALE_MODES.NEAREST
    //     );
    
    //     // Create RenderTarget
    //     if(Graphics.isWebGL()) {
    //         this._renderTarget = new PIXI.RenderTarget(
    //             gl, 
    //             this.width,
    //             this.height,
    //             PIXI.SCALE_MODES.NEAREST
    //         );
    //     } else {
    //         this._renderTarget = new PIXI.CanvasRenderTarget(this.width, this.height);
    //     }
    
    //     // Create Sprite
    //     this._renderSprite = new Sprite();

    //     this.on("removed", this.destroyRenderTexture, this);

    //     this._init = true;

    // }

    // destroyRenderTexture() {
    //     if( this._renderTexture ) this._renderTexture.destroy({ destroyBase: true });
    //     if( this._renderSprite ) this._renderSprite.destroy({ children: true });
    //     if( this._renderTarget ) this._renderTarget.destroy();
    //     this._renderTexture = null;
    //     this._renderSprite = null;
    //     this._renderTarget = null;     
    // }

    clearFlags() {
        super.clearFlags();
        if(RS.MessageEffects.Params.clearFlag) {
            RS.MessageEffects.Params.currentEffect = 'none';
        }
    }

    // /**
    //  * @param {String} text 
    //  * @return {String}
    //  */
    // textProcessing(text) {
    //     text = text.slice(0);

    //     return text;
    // }

    // /**
    //  * Get the text size like as RPG Maker VX Ace
    //  * @param {String} text
    //  */
    // getTextSize(text) {
    //     var font = this.contents._makeFontNameText();
    //     var textDiv = document.createElement("div");
        
    //     textDiv.style.position = 'absolute';
    //     textDiv.style.float = 'left';
    //     textDiv.style.whiteSpace = 'nowrap';
    //     textDiv.style.visibility = 'hidden';
    //     textDiv.style.font = font;
    //     textDiv.innerHTML = text;

    //     document.body.appendChild(textDiv);

    //     const rect = new PIXI.Rectangle(
    //         0, 
    //         0, 
    //         textDiv.clientWidth,
    //         textDiv.clientHeight,
    //     );

    //     document.body.removeChild(textDiv);

    //     return rect;
    // }    

    // /**
    //  * Create a texture.
    //  * @param {MV.TextState} textState 
    //  */          
    // createLocalTexture(textState) {
 
    //     var temp = textState.text;
    //     var lines = temp.split(/[\r\n]+/i);

    //     var rect = this.getTextSize(temp);
    //     var bitmap = new Bitmap(rect.width, rect.height * lines.length);
        
    //     this.contents.clear();

    //     // lines.forEach((line,i,a) => {
    //     //     bitmap.drawText(line, 0, i * rect.height, rect.width, rect.height, "left");
    //     // });

    //     this.drawTextEx(temp, 0, this.height + 6);

    //     bitmap.blt(this.contents, 0, this.height + 6, bitmap.width, bitmap.height, 0, 0, this.bitmap.width, bitmap.height);

    //     return bitmap;

    // }

    _updateContents() {
        super._updateContents();

        // if(this._mainTextLayer) {
        //     var padding = this.textPadding();
        //     this._mainTextLayer.x = this.x + padding;
        //     this._mainTextLayer.y = this.y + padding;
        // }
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


    // renderCanvas(renderer) {
    //     if (!this.visible || !this.renderable) {
    //         return;
    //     }
    
    //     var layers = this.children;
    //     for (var i = 0; i < layers.length; i++)
    //         layers[i].renderCanvas(renderer);
    
    //     if(this._mainTextLayer && this._mainTextLayer.parent !== this) {
    //       this._mainTextLayer.setParent(this);
    //     }
    
    //     for (var i = 0; i <this._mainTextLayer.children.length; i++ ) {
    //       var child = this._mainTextLayer.children[i];
    //       if(child) renderer.plugins.sprite.render(child);
    //     }
        
    // }

    // /**
    //  * 
    //  * @param {PIXI.WebGLRenderer} renderer 
    //  */
    // renderWebGL(renderer) {

    //     if(!this.visible || !this.renderable) {
    //         return;
    //     }     
    
    //     renderer.bindRenderTexture(this._renderTexture);

    //     for(var i = 0; i < this.children.length; ++i) {
    //         var child = this.children[i];
    //         if(child.visible) renderer.render(child, this._renderTexture);
    //     }
    
    //     if(this._mainTextLayer.visible) renderer.render(this._mainTextLayer, this._renderTexture);
    
    //     renderer.bindRenderTarget(this._renderTarget);

    // }    


}

window.Window_Message = Window_MessageImpl;

var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "MessageEffectMap") {
        RS.MessageEffects.Params.currentEffect = args[0];
    }
};                 