/*:
 * RS_ShopSale.js
 * @plugindesc RS_ShopSale
 * @author biud436
 *
 * @help
 * - 플러그인 커맨드
 * 50% 할인 - Shop buyRatio 0.5
 * 50% 인상 - Shop buyRatio 1.5
 *
 * - 스크립트
 * 아래 코드를 설정하면 판매 가격이 -50% 로 할인됩니다.
 * $gameParty.buyRatio = 0.5
 *
 */

(function() {

  var parameters = PluginManager.parameters('RS_ShopSale');

  Scene_Shop.prototype.sellingPrice = function() {
      return Math.floor((this._item.price / 2) * $gameParty.buyRatio);
  };

  Window_ShopBuy.prototype.price = function(item) {
      return Math.floor(this._price[this._data.indexOf(item)] * $gameParty.buyRatio) || 0;
  };

  Game_Party.prototype.__defineSetter__('buyRatio', function(value) {
      this._buyRatio = value;
  });

  Game_Party.prototype.__defineGetter__('buyRatio', function(value) {
      return this._buyRatio || 1.0;
  });

  var alias_Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    alias_Game_Party_initialize.call(this);
    this._buyRatio = 1.0;
    this._sellRatio = 1.0;
  }

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_Game_Interpreter_pluginCommand.call(this, command, args);
      if(command === "Shop" && args[0] === "buyRatio") {
        $gameParty.buyRatio = Number(args[1] || 1.0);
      }
      if(command === "Shop" && args[0] === "sellRatio") {
        $gameParty.sellRatio = Number(args[1] || 1.0);
      }
  };

})();
