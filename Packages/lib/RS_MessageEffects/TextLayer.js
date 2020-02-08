class TextLayer extends Sprite {
    constructor(bitmap) {
        super(bitmap);

        if(Graphics.isWebGL()) {
            this.filters = [Sprite.voidFilter];
        }

        this.on("added", this.onAdded, this);
        this.on("removed", this.onRemoved, this);

    }

    initMembers() {
        this._isReady = false;
    }

    /**
     * 
     * @param {Window_Message} messageWindow 
     */
    prepare(messageWindow) {
        const contents = messageWindow.contents;
        const width = contents.width;
        const height = contents.height;
        
        this.createSharedTexture(width, height);

        this._isReady = true;
    }

    flush() {
        if(this._sharedBitmap) {
            this._sharedBitmap.dispose();
        }
        this._sharedBitmap = null;
        this._isReady = false;
    }

    createSharedTexture(width, height) {
        if(this._sharedBitmap) {
            this._sharedBitmap.dispose();
        }

        this._sharedBitmap = new Bitmap(width, height);
        
        return this._sharedBitmap;
    }

    getSharedBitmap() {
        if(!this._sharedBitmap && !this._isReady) {
            return new Bitmap(32, 32);
        }

        return this._sharedBitmap;
    }

    /**
     * @param {Sprite} child 
     */
    onAdded(child) {
        child.bitmap = this.getSharedBitmap();
        if(child._textureID !== this._textureID) {
            console.log("child._textureID !== this._textureID");
        }
    }

    onRemoved(child) {
        child.bitmap = null;
        
        this.off("added", this.onAdded, this);
        this.off("removed", this.onRemoved, this);
    }

    renderCanvas(renderer) {
        if(!this.visible || !this.renderable) {
            return;
        }
        
        this.children.forEach(child => {
            if(child.visible) {
                child.renderCanvas(renderer);
            }            
        });

    }

    renderWebGL(renderer) {
        if(!this.visible || !this.renderable) {
            return;
        }

        this.children.forEach(child => {
            if(child.visible) {
                if(child._textureID === this._textureID) {
                    renderer.render(child);
                }
            }
        });

    }

}

export default TextLayer;