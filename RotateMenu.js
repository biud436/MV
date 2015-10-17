/**
 * @author biud436
 * @date 2015.10.17
 * @version 1.0
 */
 
var oRSUtils = function() { 
    this.initialize.apply(this, arguments); 
};
 
Array.prototype.max = function() { 
    return this.slice(0).sort().reverse()[0]; 
};
 
Array.prototype.min = function() { 
    return this.slice(0).sort()[0]; 
};
 
(function() {
 
    oRSUtils.prototype.initialize = function() {
        if(!this.X ) {
            this.add({
                'X': Graphics.width / 2, 
                'Y': Graphics.height / 2 + 80, 
                'DIST': 80,
                'MENU_SIZE': 3,
                'MAX_ANGLE': 360.0 / 3,
                'ANGLE_SPEED': 120.0,
                'PI': Math.PI
            }); 
        }
    };
    
    oRSUtils.prototype.add= function(m) {
        var item = Object.keys(m);
        item.forEach( function(key) {            
            Object.defineProperty(oRSUtils.prototype, key, {
                get: function() {     
                    return m[key];
                }
            });            
        });
    };    
    
    oRSUtils.prototype.convertToRadian = function(angle) {
        return (Math.PI / 180) * angle;
    };
    
    oRSUtils.prototype.wrapMax = function(angle) {
        while(angle > 360.0) { angle -= 360.0; }
        while(angle < -360.0) { angle += 360.0; }
        return angle;
    };    
    
    oRSUtils.prototype.wrapAngle = function(angle) {
        while(angle > 180.0) { angle -= 360.0; }
        while(angle < -180.0) { angle += 360.0; }
        return angle;
    };        
    
})();
 
 
(function() {
 
    var _alias_start = Scene_Title.prototype.start,
          _alias_createCommandWindow = Scene_Title.prototype.createCommandWindow,
          _alias_update = Scene_Title.prototype.update;
 
    Scene_Title.prototype.start = function() {
        _alias_start.call(this);
        
        if(this._utils == null) {
            this._utils = new oRSUtils();
        }
        
        this._max = 1;
        this._rotateLeft = this._rotateRight = this._isGameStarted = false;
        this._originPosition = [this._utils.X, this._utils.Y];
        this._r = 3;
        this._angle = 0.0;
    
        this.makeSprite();
    };
    
    Scene_Title.prototype.update = function() {
        _alias_update.call(this);        
        
        if(this._textCreated) { 
            this.updateSprite() ; 
        }
        
        this.left(Input.isTriggered("left"));
        this.right(Input.isTriggered("right"));
        
        if(Input.isTriggered("ok")) { 
            this.selectMenu(); 
        }
    };
    
    Scene_Title.prototype.updateSprite = function() {
    
        if(!this._rotateRight && this._rotateLeft && this._angle > this._utils.convertToRadian(this._max) ) {
            this._utils.wrapAngle(this._angle -= this.upAngle());
        }
        
        if(this._rotateRight && !this._rotateLeft && this._angle < this._utils.convertToRadian(this._max) ) {
            this._utils.wrapAngle(this._angle += this.upAngle());
        }
        
        if(this._textCreated) {
            this.moveMenu();
            this.updateTone();
            this.updateScale();
        }
        
    };
    
    var _alias_startFadeOut = Scene_Title.prototype.startFadeOut;
    Scene_Title.prototype.startFadeOut = function (duration, white) {
        _alias_startFadeOut.apply(this, arguments);
        this.text1.opacity = this.text2.opacity = this.text3.opacity = 0;
    };    
    
    Scene_Title.prototype.updateTone = function() { 
    
    };
    
    Scene_Title.prototype.updateScale = function() { 
    
    };
    
    Scene_Title.prototype.selectMenu = function() {
        if(this._isGameStarted == false) {
            switch(this.menuIndex()) {
                case 1: 
                    this.commandNewGame();
                    this._isGameStarted = true;
                    break;
                case 2: 
                    if( DataManager.isAnySavefileExists() ) {
                        this.commandContinue();
                    }
                    break;
                case 0: 
                    this.commandOptions();
                    break;
            }
            SoundManager.playOk();
        }
    };
    
    Scene_Title.prototype.left= function(wrap) {
        if(wrap) {
            SoundManager.playCursor();
            this._rotateLeft = true;
            this._rotateRight = false;
            this._utils.wrapMax(this._max -=  ( 360.0 / this._utils.MENU_SIZE ) );
        }
    };
    
    Scene_Title.prototype.right = function(wrap) {
        if(wrap) {
            SoundManager.playCursor();
            this._rotateLeft = false;
            this._rotateRight = true;
            this._utils.wrapMax(this._max +=  ( 360.0 / this._utils.MENU_SIZE ) );
        }
    };    
    
    Scene_Title.prototype.upAngle = function() {
        return (2 * Math.PI ) / this._utils.ANGLE_SPEED;
    };    
    
    Scene_Title.prototype.moveMenu = function() {
        this.move(this.text1, this._r + this._utils.DIST, this._angle + 180);
        this.move(this.text2, this._r + this._utils.DIST, this._angle);
        this.move(this.text3, this._r + this._utils.DIST, this._angle + 90);
    };
    
    Scene_Title.prototype.menuIndex = function() {
        var n = this.spriteDistance();
        return n.indexOf(n.min());
    };
    
    Scene_Title.prototype.spriteDistance = function() {
        var    a = this.text1.position.y - this._originPosition[1],
                b = this.text2.position.y - this._originPosition[1],
                c = this.text3.position.y - this._originPosition[1],
              result = [a,b,c];
        return result;
    };
    
    Scene_Title.prototype.move = function(sprite, r, angle) {
        var    x = ( this._originPosition[0] )+ r * Math.cos(angle) - sprite.width / 2,
                y = ( this._originPosition[1] ) + r * Math.sin(angle) - sprite.height / 2;
        sprite.position.x = x;
        sprite.position.y = y;
    };        
    
    Scene_Title.prototype.makeSprite = function() {
        this.text1 = this.makeText("Game Start");
        this.text2 = this.makeText("Game Continue");
        this.text3 = this.makeText("Game Options");        
        this._textCreated = true;
    };
    
    Scene_Title.prototype.makeText = function(str) {
        var text = new Sprite();
        text.bitmap = new Bitmap(100, 48);
        this.addChild(text);
        var rect = text.bitmap.rect;
        text.bitmap.drawText(String(str), rect.x, rect.y, rect.width, rect.height);
        return text;
    };    
    
     Scene_Title.prototype.createCommandWindow = function() {
       _alias_createCommandWindow.call(this);
        this._commandWindow.x = (Graphics.width - this._commandWindow.width) - 20;
        this._commandWindow.opacity = 0;
        this._commandWindow.contentsOpacity = 0;
        this._commandWindow.active = false;
    };    
    
})();
 
SceneManager.goto(Scene_Title);