/*:
 * @plugindesc (v1.0.1) This plugin allows you to clearly display a gauge bar for Exp value to status window.
 * @author biud436
 *
 * @param Exp Gauge Color1
 * @desc Change the gauge color for exp
 * @default 10
 *
 * @param Exp Gauge Color2
 * @desc Change the gauge color for exp
 * @default 11
 *
 * @param Padding
 * @desc Change padding value of each line in Menu Status
 * @default 10
 *
 * @help
 * =============================================================================
 * Change log
 * =============================================================================
 * 2017.04.11 (v1.0.0) - First Release.
 * 2017.04.12 (v1.0.1) - Added a new parameter can be able to set the padding
 * value of each line in Menu Status Window.
 */

var Imported = Imported || {};
var Yanfly = Yanfly || {};

Imported.RS_WindowActorExp = true;

(function () {

  var parameter = PluginManager.parameters('RS_WindowActorExp');
  var colorExpGauge1 = parseInt(parameter['Exp Gauge Color1'] || 10);
  var colorExpGauge2 = parseInt(parameter['Exp Gauge Color2'] || 11);
  var linePadding = parseInt(parameter['Padding'] || 10);

  //============================================================================
  // Using YEP?
  //============================================================================
  Yanfly.Param = Yanfly.Param || {}
  Yanfly.Param.MenuTpGauge = false;

  //============================================================================
  // Game_Actor
  //============================================================================

  Game_Actor.prototype.relativeExp = function () {
    if(this.isMaxLevel()) {
       return this.expForLevel(this.maxLevel());
    } else {
      return this.currentExp() - this.currentLevelExp();
    }
  };

  Game_Actor.prototype.relativeMaxExp = function () {
    if(!this.isMaxLevel()) {
      return this.nextLevelExp() - this.currentLevelExp();
    } else {
      return this.expForLevel(this.maxLevel());
    }
  };

  //============================================================================
  // Window_Base
  //============================================================================

  Window_Base.prototype.drawActorExp = function(actor, x, y, width) {
      width = width || 186;
      var color1 = this.textColor(colorExpGauge1);
      var color2 = this.textColor(colorExpGauge2);
      var exp = actor.relativeExp();
      var mexp = actor.relativeMaxExp();
      var mpRate = (actor.relativeExp() / actor.relativeMaxExp());
      this.drawGauge(x, y, width, mpRate, color1, color2);
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.expA, x, y, 44);
      this.drawCurrentAndMax(exp, mexp, x, y, width,
                             this.normalColor(), this.normalColor());
  };

  //============================================================================
  // Window_MenuStatus
  //============================================================================

  var alias_Window_MenuStatus_drawActorSimpleStatus = Window_MenuStatus.prototype.drawActorSimpleStatus;
  Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
      var lineHeight = this.lineHeight() - linePadding;
      var x2 = x + 180;
      var width2 = Math.min(200, width - 180 - this.textPadding());
      var xpad = 0;
      if(Imported.YEP_CoreEngine) {
        xpad = Window_Base._faceWidth + (2 * Yanfly.Param.TextPadding);
        x2 = x + xpad;
        width2 = Math.max(180, width - xpad - this.textPadding());
      }
      this.contents.fontSize = lineHeight;
      this.drawActorName(actor, x, y);
      this.drawActorLevel(actor, x, y + lineHeight * 1);
      this.drawActorIcons(actor, x, y + lineHeight * 2);
      this.drawActorClass(actor, x2, y);
      this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
      this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
      this.drawActorExp(actor, x2, y + lineHeight * 3, width2);
  };

  //============================================================================
  // Window_Status
  //============================================================================

  Window_Status.prototype.drawActorExp2 = function(actor, x, y, width) {
      width = width || 186;
      var color1 = this.textColor(colorExpGauge1);
      var color2 = this.textColor(colorExpGauge2);
      var requiredExp = this._actor.nextRequiredExp();
      var exp = actor.relativeExp();
      var mexp = actor.relativeMaxExp();
      var mpRate = (exp / mexp);
      if (actor.isMaxLevel()) requiredExp = '-------';
      this.drawGauge(x, y, width, mpRate, color1, color2);
      this.drawText(requiredExp, x, y, width, 'right');
  };

  Window_Status.prototype.drawExpInfo = function(x, y) {
      var lineHeight = this.lineHeight();
      var expTotal = TextManager.expTotal.format(TextManager.exp);
      var expNext = TextManager.expNext.format(TextManager.level);
      var value1 = this._actor.currentExp();
      var value2 = this._actor.nextRequiredExp();
      if (this._actor.isMaxLevel()) {
          value1 = '-------';
          value2 = '-------';
      }
      this.changeTextColor(this.systemColor());
      this.drawText(expTotal, x, y + lineHeight * 0, 270);
      this.drawText(expNext, x, y + lineHeight * 2, 270);
      this.resetTextColor();
      this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
      this.drawActorExp2(this._actor, x, y + lineHeight * 3, 270);
  };


})();
