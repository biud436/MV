import {TextEffect, EffectFactory} from "./TextEffect";

class ZoomOut extends TextEffect {
    
    constructor(bitmap) {
        super(bitmap);
        
        this._effectType = "zoomout";
    }    

    updateEffects() {
        if(!this._isStarted) return;
        this.scale.x = (200.0 - this._power) / 100.0;
        this.scale.y = (200.0 - this._power) / 100.0;
        
        if((this.scale.x + 0.0001) <= 1.0) {
            this.flush();
        }

        this._power++;
    }   
    
    start(textState) {
        super.start(textState);
        this.scale.x = 1.5;
        this.scale.y = 1.5;
    }    
}

class Marquee extends TextEffect {
    constructor(bitmap) {
        super(bitmap);
        
        this._effectType = "marquee";
    }    

    updateEffects() {
        if(!this._isStarted) return;

        this._ox -= 4;

        this.x = this._startX + this._ox;

        if(this._ox < 0) {
            this.flush();
        }
    }   
    
    /**
     * 
     * @param {MV.TextState} textState 
     */
    start(textState) {
        super.start(textState);

        let width = 0;
        let scene = SceneManager._scene;
        if(scene && scene._messageWindow) {
            width = scene._messageWindow.width;
        } else {
            width = Math.floor(Graphics.boxWidth / 2);
        }
            
        this._ox = width;
        this.x += width;

    }    
}

class Wave extends TextEffect {
    constructor(bitmap) {
        super(bitmap);
        
        this._effectType = "wave";
    }    

    updateEffects() {
        if(!this._isStarted) return;
        this.skew.x = 60.0 * Math.max(this._startX % 5, 1);
        this.skew.y = Math.random() * 2.0 * this._index;
        if(this._power >= 60) {
            this.flush();
        }
        this._power++;
    }   
    
    start(textState) {
        super.start(textState);
    }    
}

class Spread extends TextEffect {
    constructor(bitmap) {
        super(bitmap);
        
        this._effectType = "spread";
    }    

    updateEffects() {
        if(!this._isStarted) return;
        if(!(performance.now() - this._lazy) >= 1500) return;
        switch(this._index) {
            case 3:
                this.x = this._startX - this._power;
                break;
            case 1:
                this.x = this._startX + this._power;
                break;
            case 0:
                this.y = this._startY - this._power;
                break;
            case 2:
                this.y = this._startY + this._power;
                break;
        }

        if(this._power >= 600) {
            this.flush();
        }

    }   
    
    /**
     * 
     * @param {MV.TextState} textState 
     */
    start(textState) {
        super.start(textState);
        this._lazy = performance.now();
        this._index = textState.index % 4;
    }    
}

class MouseTracking extends TextEffect {
    constructor(bitmap) {
        super(bitmap);
        
        this._effectType = "mouse_tracking";
    }

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
    }

    updateEffects() {
        if(!this._isStarted) return;

        let moveSpeed = this._dist / 30.0;

        let x1 = this._startX - this.x;
        let y1 = this._startY - this.y;
        let xDist = 0;
        let yDist = 0;

        if(x1 < 0) {
            xDist = moveSpeed;
        } else if(x1 > 0) {
            xDist = -moveSpeed;
        } else {
            xDist = 0;
        }

        if(y1 < 0) {
            yDist = moveSpeed;
        } else if(y1 > 0) {
            yDist = -moveSpeed;
        } else {
            yDist = 0;
        }

        let tx = this.x - xDist;
        let ty = this.y - yDist;

        this.x = tx;
        this.y = ty;

        let dist = Math.floor(this.getDistance(this._startX, this._startY, TouchInput.x, TouchInput.y));
        if(dist < 16) {
            this.flush();
        }

    }   
    
    start(textState) {
        super.start(textState);
        this.x = TouchInput.x;
        this.y = TouchInput.y;
        this._dist = Math.floor(this.getDistance(this._startX, this._startY, TouchInput.x, TouchInput.y));
    }
}

EffectFactory.add({
    "zoomout": ZoomOut,
    "marquee": Marquee,
    "wave": Wave,
    "zoomout": ZoomOut,
    "spread": Spread,
    "mouse_tracking": MouseTracking,
});