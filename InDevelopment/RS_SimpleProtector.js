/*:
 * @plugindesc Simple Protector
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_SimpleProtector = true; 

(function() {
  
  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._checkPartyGoldData = {
        hashKey: Date.now(),
        value: 0,
        init: false
    };    
  };
  
  Game_System.prototype.initPartyGoldData = function() {
    this._checkPartyGoldData.init = true;
  };
  
  Game_System.prototype.isInitPartyGoldData = function() {
    return this._checkPartyGoldData.init;
  };  
  
  Game_System.prototype.setPartyGoldData = function(value) {
    this._checkPartyGoldData.value = value ^ this._checkPartyGoldData.hashKey;
  };
  
  Game_System.prototype.getHashedPartyGoldData = function(value) {
    return this._checkPartyGoldData.value ^ this._checkPartyGoldData.hashKey;
  };  
    
  var alias_Game_Party_gainGold = Game_Party.prototype.gainGold;
  Game_Party.prototype.gainGold = function(amount) {
      alias_Game_Party_gainGold.call(this, amount);
      $gameSystem.setPartyGoldData(this._gold);
      if(!$gameSystem.isInitPartyGoldData()) $gameSystem.initPartyGoldData();
  };
  
  Game_Party.prototype.isValidGold = function() {
      var hashedValue = 0;
      if($gameSystem.isInitPartyGoldData()) {
        hashedValue = $gameSystem.getHashedPartyGoldData();
      }
      if(hashedValue !== $gameParty.gold()) {
        return false;
      }
      if($gameParty.gold() > $gameParty.maxGold()) {
        return false;
      }    
      return true;
  };
  
  Scene_Map.prototype.updateCheckPartyGold = function() {
    if(!$gameParty.isValidGold()) {
      console.warn("Memory hacking has detected.");
    }
  };
   
  var alias_Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    alias_Scene_Map_update.call(this);
    this.updateCheckPartyGold();
  };
 
})();