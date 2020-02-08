import {TextEffect, EffectFactory} from "./TextEffect";

const DEG_TO_RAD  = (Math.PI / 180.0);

class PingPong extends TextEffect {
    
  constructor(bitmap) {
      super(bitmap);
      this._effectType = "pingpong";
  }

  updateEffects() {
      if(!this._isStarted) return;            
      if(this._power <= 60) {
          this.y = this._startY + (PIXI.PI_2 / this._power) * 4.0;
          this._power++;
      } else {
          this.flush();
      }
  }
}    

class Slide extends TextEffect {
  
  constructor(bitmap) {
    super(bitmap);
    this._effectType = "slide";
  }
  
  updateEffects() {
    if(!this._isStarted) return;            
    if(this._power <= 60) {
      this.x = this._startX + (PIXI.PI_2 / this._power) * (this._index % 4) * 4;
      this.opacity = 4 * this._power;
      this._power++;
    } else {
      this.flush();
    }
  }
}        

class HighRotation extends TextEffect {
  
  constructor(bitmap) {
    super(bitmap);
    this._effectType = "high_rot";
  }
  
  updateEffects() {
    if(!this._isStarted) return;            
    if(this._power <= this._random) {
      let dist = this._random - this._power;
      let tm = performance.now();
      let r = DEG_TO_RAD * dist * (this._random % 2 == 0 ? -tm : tm);
      let c = Math.cos(r);
      let s = Math.sin(r);
      let tx = this._startX - dist;
      let ty = this._startY - dist;
      this.x = tx * c - ty * s;
      this.y = tx * s + ty * c;
      this._power++;
    } else {
      this.flush();
    }
  }
}            

class NormalRotation extends TextEffect {
  
  constructor(bitmap) {
    super(bitmap);
    this._effectType = "normal_rot";
  }
  
  updateEffects() {
    if(!this._isStarted) return;            
    if(this._power <= this._random) {
      let dist = this._random - this._power;
      let tm = performance.now();
      let r = DEG_TO_RAD * dist * (this._index % 3 == 0 ? -1 : 1);
      let c = Math.cos(r);
      let s = Math.sin(r);
      let tx = (this._startX - dist);
      let ty = this._startY - dist;
      this.x = tx * c - ty * s;
      this.y = tx * s + ty * c;
      this._power++;
    } else {
      this.flush();
    }
  }
}       

class RandomRotation extends TextEffect {
  
  constructor(bitmap) {
    super(bitmap);
    this._effectType = "random_rot";
  }
  
  updateEffects() {
    if(!this._isStarted) return;            
    if(this._power <= this._random) {
      let dist = this._random - this._power;
      let r = DEG_TO_RAD * dist * (this._random % 2 == 0 ? -1 : 1);
      let c = Math.cos(r);
      let s = Math.sin(r);
      let tx = this._startX - dist;
      let ty = this._startY - dist;
      this.x = tx * c - ty * s;
      this.y = tx * s + ty * c;
      this._power++;
    } else {
      this.flush();
    }
  }
}         

class Shock extends TextEffect {
  constructor(bitmap) {
    super(bitmap);
    
    this._effectType = "shock";
  }
  
  flush() {
    super.flush();
    this.rotation = 0.0;
    this.anchor.x = 0.0;
    this.anchor.y = 0.0;
  }
  
  updateEffects() {
    if(!this._isStarted) return;      
    if(this._power <= 60) {
      this.anchor.x = -0.8 + Math.random();
      this.anchor.y = -0.8 + Math.random();                
    } else {
      this.flush();
    }
  }
  
  start(textState) {
    super.start(textState);
  }
  
}    

EffectFactory.add({
  'pingpong': PingPong,  
  'slide': Slide,
  'high_rot': HighRotation,
  'normal_rot': NormalRotation,
  'random_rot': RandomRotation,
  'shock': Shock,    
});