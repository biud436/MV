//================================================================
// TextEffect
//================================================================
class TextEffect extends Sprite {
    constructor(bitmap) {
        super(bitmap);
        this._isStarted = false;
        this._effectType = "pingpong";

        if(Graphics.isWebGL()) {
            this.filters = [Sprite.voidFilter];
        }        
    }

    update() {
        super.update();
        this.updateEffects();
    }

    /**
     * 종료
     */
    flush() {
        this._isStarted = false;
        this.x = this._startX;
        this.y = this._startY;
        this.rotation = this._desc.rotation;
        this.scale.x = this._desc.scaleX;
        this.scale.y = this._desc.scaleY;
        this.skew.x = this._desc.skewX;
        this.skew.y = this._desc.skewY;
        this.tint = this._desc.tint;
        this.filters = this._desc.filters;
        this.opacity = this._tempOpacity;
        this._desc = {};
    }

    updateEffects() {
    }

    /**
     * 시작
     * @param {MV.TextState} textState
     */
    start(textState) {
        this._now = performance.now();
        this._isStarted = true;       
        this._power = 1;   
        this.x = textState.x;
        this.y = textState.y;
        this._startX = this.x;
        this._startY = this.y;
        this._random = Math.floor(Math.random() * 60);
        this._index = textState.index;
        this._tempOpacity = this.opacity;

        this._desc = {
            x: this.x,
            y: this.y,
            rotation: this.rotation,    
            scaleX: this.scale.x || 1.0,
            scaleY: this.scale.y || 1.0,
            skewX :this.skew.x || 0.0,
            skewY :this.skew.y || 0.0,
            opacity: this.opacity,
            tint: this.tint,
            filters: this.filters,
        };
        

    };
}

class EffectFactory {
    static create(effectType) {
        
        let sprite;

        var keys = Object.keys(EffectFactory.TYPE);

        if(keys.contains(effectType)) {
            var ET_CLASS = EffectFactory.TYPE[effectType];
            sprite = new ET_CLASS();
        } else {
            sprite = new TextEffect();
        }

        return sprite;

    }

    static add(values) {
        Object.assign( EffectFactory.TYPE, values );
    }

}

if(!EffectFactory.TYPE) {

    EffectFactory.TYPE = {
    };

    window.EffectFactory = EffectFactory;

}

export {TextEffect, EffectFactory};