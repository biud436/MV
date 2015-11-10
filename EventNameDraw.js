/*:
 * EventNameDraw.js
 * 
 * @plugindesc 이벤트 이름 표시하기
 * @author biud436
 *
 * @param textSize
 * @desc 텍스트 사이즈
 * @default 16
 *
 * @help
 * 
 */
 
/**
 * @class Sprite_Name
 * @extends Sprite
 */  
function Sprite_Name() {
  this.initialize.apply(this, arguments);
};

(function() {
  Sprite_Name.prototype = Object.create(Sprite.prototype);
  Sprite_Name.constructor = Sprite_Name;

  Sprite_Name.prototype.initialize = function(data) {
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(120, 40);
    this._offsetY = data.height;
    this._member = data.member;
    this.setTextSize(data.textSize);
    this.setTextColor(data.textColor);
    this.setTextOutlineWidth(data.outlineWidth);
    this.setPosition();  
    this.setAnchor(data.anchor);
    this.drawName();
    this._visible = this.visible = this.isReady();
  };

  Sprite_Name.prototype.setTextSize = function(n) {
    this.bitmap.fontSize = n;
  };

  Sprite_Name.prototype.setTextOutlineWidth = function(n) {
    this.bitmap.outlineWidth = n || 2;
  };

  Sprite_Name.prototype.setPosition = function() {
    this.x = this._member.screenX();
    this.y = this._member.screenY() - (this._offsetY() || 0) + 10;
  };

  Sprite_Name.prototype.setAnchor = function(pt) {
    this.anchor.x = pt.x || 0.5;
    this.anchor.y = pt.y || 1.0;
  };

  Sprite_Name.prototype.isTransparent = function() {
    return this._member.isTransparent();
  };

  Sprite_Name.prototype.isErased = function() {
    return this._member._erased;
  };

  /**
   * @method isReady
   */ 
  Sprite_Name.prototype.isReady = function() {
    return (this._member.findProperPageIndex() > -1) && (!this.isTransparent()) && (!this.isErased());
  };

  Sprite_Name.prototype.setTextColor = function(color) {
    this.bitmap.textColor = Utils.rgbToCssColor.apply(this, color);
  };

  Sprite_Name.prototype.drawName = function() {
    var name = this._member.event().name || "";
    this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
  };

  Sprite_Name.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.x = this._member.screenX();
    this.y = this._member.screenY() - (this._offsetY() || 0) + 10;
    if(this._visible !== this.isReady()) {
      this.visible = this._visible = this.isReady();
    }
  };

})();
 
/**
 * @class Sprite_PlayerName
 * @extends Sprite_Name
 */ 
function Sprite_PlayerName() {
  this.initialize.apply(this, arguments);
};

+function() {

  Sprite_PlayerName.prototype = Object.create(Sprite_Name.prototype);
  Sprite_PlayerName.constructor = Sprite_PlayerName;

  Sprite_PlayerName.prototype.initialize = function(data) {
    Sprite_Name.prototype.initialize.call(this, data);
    this._visible = this.visible = this.isReady();
  };
  
  Sprite_PlayerName.prototype.setPosition = function() {
    this.x = this._member.screenX();
    this.y = this._member.screenY() - (this._offsetY() || 0) + 10;
  };

  Sprite_PlayerName.prototype.isTransparent = function() {
    return this._member.isTransparent();
  };

  Sprite_PlayerName.prototype.isReady = function() {
    return ($gameParty.members().length > 0) && (!this.isTransparent())
  };

  Sprite_PlayerName.prototype.drawName = function() {
    var name = $gameParty.members()[0].name() || "";
    this.bitmap.drawText(name, 0, 0, 120, 40, 'center');
  };
   
  Sprite_PlayerName.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.x =  this._member.screenX();
    this.y =  this._member.screenY() - (this._offsetY() || 0) + 10;
    if(this._visible !== this.isReady()) {
      this.visible = this._visible = this.isReady();
    }
  }; 
  
}();
 

(function() {

  var parameters = PluginManager.parameters('EventNameDraw');
  var textSize = Number(parameters['textSize'] || 14 );
  var colorMatch = /@color\[*(\d*)[ ]*,*[ ]*(\d*)[ ]*,*[ ]*(\d*)\]*/
  
  /**
   * @method drawName
   */    
  Sprite_Character.prototype.drawName = function(member) {     
    
    if(this._tileId > 0) return;
    
    // Game_Event
    if((member instanceof Game_Event)) {
      if(member._erased) return;
      if(member.isTransparent()) return;
      if(!member.event().note.match(colorMatch)) return;    
      this.drawEventName(member);
      
    // Game_Player
    } else if((member instanceof Game_Player)) {
      this.drawPlayerName();
    }    
  };
 
  /**
   * @method drawPlayerName
   */     
  Sprite_Character.prototype.drawPlayerName = function() {
    this._nameSprite = new Sprite_PlayerName({
      'member': $gamePlayer,
      'textSize': textSize,
      'textColor': [255,255,255],      
      'outlineWidth': 2,
      'anchor': new Point(0.5, 1.0),
      'height': $gameMap.tileHeight.bind(this)
    });
    this._name = this.getName();
    this._nameSprite .z = 260;     
    this.parent.addChild(this._nameSprite);  
  };
  
  /**
   * @method drawEventName
   * @param {Game_Event|Game_Player}
   */      
  Sprite_Character.prototype.drawEventName = function(member) {
      
      var color = [];
      color.push(Number(RegExp.$1 || 255));
      color.push(Number(RegExp.$2 || 255));
      color.push(Number(RegExp.$3 || 255));
      
      this._nameSprite = new Sprite_Name({
        'member': member,
        'textSize': textSize,
        'textColor': color,      
        'outlineWidth': 2,
        'anchor': new Point(0.5, 1.0),
        'height': this.patternHeight.bind(this)
      });
      
      this._nameSprite.z = 250;
      this._name = this.getName();
      
      this.parent.addChild(this._nameSprite);      
      
  };
  
  /**
   * @method getName
   * @return {Number}
   */   
  Sprite_Character.prototype.getName = function() {
  
    // Game_Player
    if(this._character instanceof Game_Player) {
      return $gameParty.members()[0].name();
      
    // Game_Event
    } else if(this._character instanceof Game_Event) {
      return this._character.event().name; 
    }
  };
  
  Sprite_Character.prototype.redrawName = function() {
    
    if(this._tileId > 0) return false;
    if(!this._nameSprite) return false;
    
    if( this._name !== this.getName() ) {
      this._nameSprite.bitmap.clear();
      this.drawName(this._character);
    }
  };
  
  var aliasUpdateBitmap = Sprite_Character.prototype.updateBitmap;
  Sprite_Character.prototype.updateBitmap = function() {
    aliasUpdateBitmap.call(this);
    this.redrawName();
  };
  
  var alias2 = Sprite_Character.prototype.setCharacterBitmap;
  Sprite_Character.prototype.setCharacterBitmap = function() {
    alias2.call(this);
    this.drawName(this._character);
  };
  
})(); 
