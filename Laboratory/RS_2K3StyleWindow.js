/*:
 * @plugindesc This plugin allows you to change as the window layout the same as RM2K3
 * @author biud436
 * @help
 * ==============================================================================
 * Change Log
 * -----------------------------------------------------------------------------
 * 2017.05.25 - First Release
 * 2017.05.27 - Fixed an issue that is not updated a text inside a help window when begin skill or item windows.
 */

var Imported = Imported || {};
Imported.RS_2K3StyleWindow = true;

(function() {

  //-----------------------------------------------------------------------------
  // Window_ItemList

  function Window_ItemList_2K3() {
      this.initialize.apply(this, arguments);
  };

  Window_ItemList_2K3.prototype = Object.create(Window_ItemList.prototype);
  Window_ItemList_2K3.prototype.constructor = Window_ItemList_2K3;

  var alias_Window_ItemList_initialize = Window_ItemList.prototype.initialize;
  Window_ItemList_2K3.prototype.initialize = function(x, y, width, height) {
      Window_ItemList.prototype.initialize.call(this, x, y, width, height);
      this.refresh();
      this.resetScroll();
      this.select(0);
      this.activate();
  };

  Window_ItemList_2K3.prototype.setCategory = function(category) {
  };

  Window_ItemList_2K3.prototype.makeItemList = function() {
      this._data = $gameParty.allItems();
  };

  //-----------------------------------------------------------------------------
  // Scene_Item

  Scene_Item.prototype.createCategoryWindow = function() {
  };

  Scene_Item.prototype.createItemWindow = function() {
      var wy = this._helpWindow.height;
      var wh = Graphics.boxHeight - wy;
      this._itemWindow = new Window_ItemList_2K3(0, wy, Graphics.boxWidth, wh);
      this._itemWindow.setHelpWindow(this._helpWindow);
      this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
      this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
      this._itemWindow.callUpdateHelp();
      this.addWindow(this._itemWindow);
  };

  Scene_Item.prototype.onItemCancel = function() {
      this._itemWindow.deselect();
      this.popScene();
  };

  //-----------------------------------------------------------------------------
  // Window_SkillList

  function Window_SkillList_2K3() {
      this.initialize.apply(this, arguments);
  };

  Window_SkillList_2K3.prototype = Object.create(Window_SkillList.prototype);
  Window_SkillList_2K3.prototype.constructor = Window_SkillList_2K3;

  Window_SkillList_2K3.prototype.initialize = function(x, y, width, height) {
      Window_SkillList.prototype.initialize.call(this, x, y, width, height);
      this.refresh();
      this.resetScroll();
      this.select(0);
      this.activate();
  };

  Window_SkillList_2K3.prototype.setStypeId = function(stypeId) {
  };

  Window_SkillList_2K3.prototype.makeItemList = function() {
      if (this._actor) {
          this._data = this._actor.skills();
      } else {
          this._data = [];
      }
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill

  Scene_Skill.prototype.createSkillTypeWindow = function() {
  };

  Scene_Skill.prototype.createStatusWindow = function() {
  };

  Scene_Skill.prototype.createItemWindow = function() {
      var wx = 0;
      var wy = this._helpWindow.height;;
      var ww = Graphics.boxWidth;
      var wh = Graphics.boxHeight - wy;
      this._itemWindow = new Window_SkillList_2K3(wx, wy, ww, wh);
      this._itemWindow.setHelpWindow(this._helpWindow);
      this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
      this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
      this._itemWindow.setHandler('pagedown', this.nextActor.bind(this));
      this._itemWindow.setHandler('pageup',   this.previousActor.bind(this));
      this._itemWindow.callUpdateHelp();
      this.addWindow(this._itemWindow);
  };

  Scene_Skill.prototype.refreshActor = function() {
      var actor = this.actor();
      this._itemWindow.setActor(actor);
  };

  Scene_Skill.prototype.onItemCancel = function() {
      this._itemWindow.deselect();
      this.popScene();
  };

  Scene_Skill.prototype.useItem = function() {
      Scene_ItemBase.prototype.useItem.call(this);
      this._itemWindow.refresh();
  };

  Scene_Skill.prototype.onActorChange = function() {
      this.refreshActor();
      this._skillTypeWindow.activate();
  };

  //-----------------------------------------------------------------------------
  // Scene_Equip

  Scene_Equip.prototype.createCommandWindow = function() {
  };

  Scene_Equip.prototype.createSlotWindow = function() {
      var wx = this._statusWindow.width;
      var wy = this._helpWindow.height;
      var ww = Graphics.boxWidth - this._statusWindow.width;
      var wh = this._statusWindow.height;
      this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
      this._slotWindow.setHelpWindow(this._helpWindow);
      this._slotWindow.setStatusWindow(this._statusWindow);
      this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
      this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
      this.addWindow(this._slotWindow);
  };

  var alias_Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
  Scene_Equip.prototype.createItemWindow = function() {
      alias_Scene_Equip_createItemWindow.call(this);
      this.commandEquip();
  };

  Scene_Equip.prototype.commandOptimize = function() {
  };

  Scene_Equip.prototype.commandClear = function() {
  };

  Scene_Equip.prototype.onSlotCancel = function() {
      this._slotWindow.deselect();
      this.popScene();
  };

  Scene_Equip.prototype.onActorChange = function() {
      this.refreshActor();
      this._slotWindow.activate();
  };

})();
