/*:
 * RS_ShopSale.js
 * @plugindesc (v1.1.0) This plugin provides simple commands for shop processing.
 * @author biud436
 *
 * @help
 * -----------------------------------------------------------------------------
 * Plugin Commands
 * -----------------------------------------------------------------------------
 * 50% discounting - Shop buyRatio 0.5
 * 50% raising - Shop buyRatio 1.5
 *
 * -----------------------------------------------------------------------------
 * Script
 * -----------------------------------------------------------------------------
 * To set the following code, A selling price discounts at 50 percent.
 * $gameParty.buyRatio = 0.5;
 *
 * -----------------------------------------------------------------------------
 * Version
 * -----------------------------------------------------------------------------
 * 2016.01.21 (v1.0.0) - First Release.
 * 2016.08.24 (v1.1.0) - Fixed sellRatio and Added additional functions.
 */

var Imported = Imported || {};
Imported.RS_ShopSale = true;

(function() {

  var parameters = PluginManager.parameters('RS_ShopSale');
  var isTextRectFill = true;

  if(Imported.YEP_ShopMenuCore) {
    console.warn('RS_ShopSale plugin is not supported YEP_ShopMenuCore');
    return false;
  }

  //----------------------------------------------------------------------------
  // Scene_Shop
  //
  //

  Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor((this._item.price / 2) * $gameParty.buyRatio);
  };

  Scene_Shop.prototype.onBuyOk = function() {
    this._item = this._buyWindow.item();
    this._buyWindow.hide();
    this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice(), this.originalBuyingPrice());
    this._numberWindow.setCurrencyUnit(this.currencyUnit());
    this._numberWindow.show();
    this._numberWindow.activate();
  };

  Scene_Shop.prototype.originalBuyingPrice = function() {
      return this._buyWindow.originalPrice(this._item);
  };

  //----------------------------------------------------------------------------
  // Window_Base
  //
  //

  Window_Base.prototype.drawLineThrough = function (textWidth, rect) {
    var context = this.contents._context,
        cancelLineY = rect.y + (rect.height / 2) - 1,
        priceWidth = 96, length = 15;

    context.save();
    context.fillStyle = 'white';
    context.fillRect(rect.x + rect.width - priceWidth - textWidth,
                    cancelLineY, textWidth + length, 2);
    context.restore();
  };

  Window_Base.prototype.drawArrowLine = function (textWidth, rect) {
    var context = this.contents._context,
        cancelLineY = rect.y + (rect.height / 2) - 1,
        priceWidth = 96,
        length = 15,
        x = (rect.x + rect.width - priceWidth + length),
        y = cancelLineY;

    context.save();
    context.beginPath();
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.moveTo(x - 8, y - 8);
    context.lineTo(x, y);
    context.moveTo(x - 8, y + 8);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.restore();
  };

  Window_Base.prototype.drawTextFillRect = function(text, x, y, maxWidth, align, color) {
    if(color === undefined || color === null) color = 'rgba(255, 255, 255, 0.4)';
    this.contents.fillRect(x, y + 1, maxWidth, this.lineHeight() - 2, color);
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
  };

  //----------------------------------------------------------------------------
  // Window_ShopBuy
  //
  //

  Window_ShopBuy.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    var priceWidth = 96;
    var textWidth = this.textWidth(this.originalPrice(item));
    rect.width -= this.textPadding();

    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);

    if(isTextRectFill) {
      this.drawTextFillRect(this.originalPrice(item), rect.x + rect.width - priceWidth * 2,
       rect.y, priceWidth, 'right', this.hpGaugeColor1());
    } else {
      this.drawText(this.originalPrice(item), rect.x + rect.width - priceWidth * 2,
       rect.y, priceWidth, 'right');
    }

    if(isTextRectFill) {
      this.drawTextFillRect(this.price(item), rect.x + rect.width - priceWidth,
       rect.y, priceWidth, 'right', this.tpCostColor());
    } else {
      this.drawText(this.price(item), rect.x + rect.width - priceWidth,
       rect.y, priceWidth, 'right');
    }

    this.drawLineThrough(textWidth, rect);
    this.drawArrowLine(textWidth, rect);

    this.changePaintOpacity(true);
  };

  Window_ShopBuy.prototype.originalPrice = function(item) {
    return Math.floor(this._price[this._data.indexOf(item)] || 0);
  };

  Window_ShopBuy.prototype.price = function(item) {
    return Math.floor(this._price[this._data.indexOf(item)] * $gameParty.buyRatio) || 0;
  };

  //----------------------------------------------------------------------------
  // Window_ShopNumber
  //
  //

  Window_ShopNumber.prototype.setup = function(item, max, price, originalPrice) {
    this._item = item;
    this._max = Math.floor(max);
    this._price = price;
    this._originalPrice = originalPrice
    this._number = 1;
    this.placeButtons();
    this.updateButtonsVisiblity();
    this.refresh();
  };

  Window_ShopNumber.prototype.drawTotalPrice = function() {
    var originalTotal = this._originalPrice * this._number;
    var total = this._price * this._number;
    var width = this.contentsWidth() - this.textPadding();
    this.drawCurrencyValue(originalTotal, total, this._currencyUnit, 0, this.priceY(), width);
  };

  Window_ShopNumber.prototype.drawCurrencyValue = function(value1, value2, unit, x, y, width) {
    var unitWidth = Math.min(80, this.textWidth(unit));
    var item = [value1, value2];
    var text = ["\x1bI[88]NORMAL PRICE", "\x1bI[87]DISCOUNT PRICE"];
    var color = [this.hpGaugeColor1(), this.tpCostColor()];
    for(var i in item) {
      var dy = this.lineHeight() * (-1 * i);
      this.resetTextColor();
      this.drawTextFillRect(item[i], x, y + dy, width - unitWidth - 6, 'right', color[i]);
      this.drawTextEx(text[i], x, y + dy, width - unitWidth - 6);
      this.changeTextColor(this.systemColor());
      this.drawText(unit, x + width - unitWidth, y + dy, unitWidth, 'right');
    }
  };

  //----------------------------------------------------------------------------
  // Game_Party
  //
  //

  Game_Party.prototype.__defineSetter__('buyRatio', function(value) {
    this._buyRatio = value;
  });

  Game_Party.prototype.__defineGetter__('buyRatio', function(value) {
    return this._buyRatio || 1.0;
  });

  Game_Party.prototype.__defineSetter__('sellRatio', function(value) {
    this._sellRatio = value;
  });

  Game_Party.prototype.__defineGetter__('sellRatio', function(value) {
    return this._sellRatio || 1.0;
  });

  var alias_Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    alias_Game_Party_initialize.call(this);
    this._buyRatio = 1.0;
    this._sellRatio = 1.0;
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //

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
