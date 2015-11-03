/*:
 * Scene_RotateTitle.js
 *
 * @plugindesc 원형 회전 타이틀 메뉴
 * @author biud436
 * @since 2015.10.17
 * @version 1.3
 * 
 * @param 간격
 * @desc 
 * @default 80
 *
 * @param 메뉴 사이즈
 * @desc 
 * @default 3
 *
 * @param 각속도
 * @desc 
 * @default 120.0
 * 
 * @param 텍스트 테두리 색상
 * @desc
 * @default #6799FF
 *
 * @param 텍스트의 톤
 * @desc
 * @default  0xD9E5FF
 *
 * @param 게임 시작
 * @desc
 * @default  Game Start
 *
 * @param 게임 계속
 * @desc
 * @default  Game Continue
 *
 * @param 게임 옵션
 * @desc
 * @default  Game Options
 */

/**
 * @namespace RS
 */ 
var RS = RS || {};  
(function() {

  /*** 각도 함수 */
  RS.Utils = { 
    convertToRadian : function(angle) {
      return (Math.PI / 180) * angle;
    },
    wrapMax : function(angle) {
      while(angle > 360.0) { angle -= 360.0; }
      while(angle < -360.0) { angle += 360.0; }
      return angle;
    },  
    wrapAngle : function(angle) {
      while(angle > 180.0) { angle -= 360.0; }
      while(angle < -180.0) { angle += 360.0; }
      return angle;
    }
  };
  
  Array.prototype.max = function() { 
    return this.slice(0).sort().reverse()[0]; 
  };
   
  Array.prototype.min = function() { 
    return this.slice(0).sort()[0]; 
  };  
  
})();

/**
 * Scene_Title
 * @class
 */ 
(function() {

  var _alias_start = Scene_Title.prototype.start,
      _alias_createCommandWindow = Scene_Title.prototype.createCommandWindow,
      _alias_update = Scene_Title.prototype.update,
      _alias_startFadeOut = Scene_Title.prototype.startFadeOut;

  /*** 기본 설정 */
  var parameters = PluginManager.parameters('Scene_RotateTitle')
       , _x = null
       , _y = null
       , _dist = Number(parameters['간격'] || 80)
       , _menuSize = Number(parameters['메뉴 사이즈'] || 3)
       , _maxAngle =  360.0 / _menuSize
       , _angleSpeed = parseFloat(parameters['각속도'] || 120.0)
       , _pi = Math.PI
       , _outLineColor = String(parameters['텍스트 테두리 색상'] || '#6799FF')
       , _tintColor = parseInt(parameters['텍스트의 톤'] || 0xD9E5FF)
       , _gameStart = String(parameters['게임 시작'] || "Game Start")
       , _gameContinue = String(parameters['게임 계속'] || "Game Continue")
       , _gameOptions = String(parameters['게임 옵션'] || "Game Options");
       
  Scene_Title.prototype.start = function() {
    _alias_start.call(this);
    this.initSpriteParameter();
    this.initTouchParameter();
    this.makeSprite();
    if(!DataManager.isAnySavefileExists()) {
      this.text2.opacity = 128;
    }
  };
  
  Scene_Title.prototype.initSpriteParameter = function() {
    console.log(Graphics.width);
    _x = Graphics.width / 2;
    _y = Graphics.height / 2 + _dist;
    this._max = 1;
    this._rotateLeft = false;
    this._rotateRight = false;
    this._isGameStarted = false;
    this._originPosition = [_x, _y];
    this._r = 3;
    this._angle = 0.0;
  };
  
  Scene_Title.prototype.initTouchParameter = function() {
    this._firstPos = 0;
    this._lastPos = 0;
    this._touch_velocity = false;  
  };
   
  Scene_Title.prototype.updateTouchInput = function() {
    if(TouchInput.isTriggered() && !this._touch_velocity) {
      this._firstPos = TouchInput.x;
      this._touch_velocity = true;
    }  
    else  if(TouchInput.isReleased() && this._touch_velocity) {
      this._lastPos = TouchInput.x;
      this._velocity = this._lastPos - this._firstPos;    
      this._velocity < 0? this.left(true) : this.right(true);
      this._touch_velocity = false;
    }
  };
  
  Scene_Title.prototype.updateKeyboardCheck = function() {
    this.left(Input.isTriggered("left"));
    this.right(Input.isTriggered("right") );

    if( Input.isTriggered("ok") || TouchInput.isCancelled() ) { 
      this.selectMenu();
    }
  };
  
  Scene_Title.prototype.update = function() {
    this.updateSprite();
    this.updateTouchInput();
    this.updateKeyboardCheck();
    _alias_update.call(this);    
  };
    
  Scene_Title.prototype.isCheckDir = function(dir) {
  
    var isLeft = !this._rotateRight && this._rotateLeft
        , radian = RS.Utils.convertToRadian(this._max)
        , isRight = this._rotateRight && !this._rotateLeft
        , result = null;
    
    return result = {
       'left': isLeft && (this._angle > radian)
     , 'right': isRight && (this._angle < radian)
    }[dir] && true;
    
  };
     
  Scene_Title.prototype.updateSprite = function() {
    if(!this._textCreated) { 
      return false;
    }
    if(this.isCheckDir('left')) {
      RS.Utils.wrapAngle(this._angle -= this.upAngle());
    }
    else if(this.isCheckDir('right')) {
      RS.Utils.wrapAngle(this._angle += this.upAngle());
    }
    this.moveMenu();
    this.updateScale();
  };
  
  Scene_Title.prototype.startFadeOut = function (duration, white) {
    _alias_startFadeOut.apply(this, arguments);
    this.text1.opacity = 0;
    this.text2.opacity = 0;
    this.text3.opacity = 0;
  };  
    
  Scene_Title.prototype.updateScale = function() { 
    
    var l = this.getTopItem();
    
    l.forEach( function(i) { 
      if(l.indexOf(i) === 0) {
          i.scale.set(1.3,1.3);
          i.tint = _tintColor;
      } else {
          i.scale.set(1.0,1.0);
          i.tint = 0xFFFFFF;
      }
    }.bind(this));
    
  };
  
  Scene_Title.prototype.getTopItem = function() {
    
    var list = [this.text1, this.text2, this.text3];
    
    list.sort( function(a, b) { 
      return Math.floor(a.y) - Math.floor(b.y) 
    });
    
    return list;
  };
   
  Scene_Title.prototype.selectMenu = function() {
    if(this._isGameStarted) {
      return false;
    }
    
    var i = this.menuIndex()
        , result = null;
        
    result = {
      1: function() { 
            SoundManager.playOk();
            this.commandNewGame();
            this._isGameStarted = true;
        }
    , 2: function() {
          if(DataManager.isAnySavefileExists()) {
            SoundManager.playOk();
            this.commandContinue();
          } else {
            SoundManager.playBuzzer();
          }
        }
    , 0: function() {
          SoundManager.playOk();
          this.commandOptions();
        }
    }[i].call(this);
    
  };
   
  Scene_Title.prototype.left= function(wrap) {
    if(wrap) {
      SoundManager.playCursor();
      this._rotateLeft = true;
      this._rotateRight = false;
      RS.Utils.wrapMax(this._max -= _maxAngle);
    }
  };

  Scene_Title.prototype.right = function(wrap) {
    if(wrap) {
      SoundManager.playCursor();
      this._rotateLeft = false;
      this._rotateRight = true;
      RS.Utils.wrapMax(this._max +=_maxAngle);
    }
  };  

  Scene_Title.prototype.upAngle = function() {
    return (2 * Math.PI ) / _angleSpeed;
  };  

  Scene_Title.prototype.moveMenu = function() {
    this.move(this.text1, this._r + _dist, this._angle + 180);
    this.move(this.text2, this._r + _dist, this._angle);
    this.move(this.text3, this._r + _dist, this._angle + 90);
  };
  
  Scene_Title.prototype.menuIndex = function() {
    var n = this.spriteDistance();
    return n.indexOf(n.min());
  };
  
  Scene_Title.prototype.spriteDistance = function() {
    var a, b, c; 
    a = this.text1.position.y - this._originPosition[1];
    b = this.text2.position.y - this._originPosition[1];
    c = this.text3.position.y - this._originPosition[1];
    result = [a,b,c];
    return result;
  };
  
  Scene_Title.prototype.move = function(sprite, r, angle) {
    var x = ( this._originPosition[0] )+ r * Math.cos(angle) - sprite.width / 2
        , y = ( this._originPosition[1] ) + r * Math.sin(angle) - sprite.height / 2;
    sprite.position.x = x;
    sprite.position.y = y;
  };
  
  Scene_Title.prototype.makeSprite = function() {
    this.text1 = this.makeText(_gameStart);
    this.text2 = this.makeText(_gameContinue);
    this.text3 = this.makeText(_gameOptions);    
    this._textCreated = true;
  };
  
  Scene_Title.prototype.makeText = function(str) {
    var text = new Sprite_Button()
        , rect = null;
    text.bitmap = new Bitmap(100, 48);
    rect = text.bitmap.rect;
    text.bitmap.outlineWidth = 3;
    text.bitmap.fontSize = 72;
    text.bitmap.outlineColor = _outLineColor;
    text.bitmap.drawText(String(str), rect.x, rect.y, rect.width, rect.height);
    text.setClickHandler(this.selectMenu.bind(this));
    this.addChild(text);
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