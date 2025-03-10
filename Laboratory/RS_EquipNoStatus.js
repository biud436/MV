/*:ko
 * @plugindesc 장비 창에서 상태 창을 숨길 수 있습니다.
 * @author biud436
 *
 * @param width
 * @text 폭
 * @type number
 * @desc 상태 창의 폭을 기입하십시오.
 * @default 312
 *
 * @param height
 * @text 높이
 * @type number
 * @desc 상태 창의 높이를 기입하십시오.
 * @default Window_Base.prototype.fittingHeight(7)
 *
 */
/*:
 * @plugindesc This plugin allows you to hide the status window in the equip window.
 * @author biud436
 *
 * @param width
 * @type number
 * @desc Specify the width of the virtual status window
 * @default 312
 *
 * @param height
 * @type number
 * @desc Specify the height of the virtual status window
 * (Important that it must set as the script)
 * @default Window_Base.prototype.fittingHeight(7)
 *
 */

var Imported = Imported || {};
Imported.RS_EquipNoStatus = true;

(function () {
  var parameters = PluginManager.parameters('RS_EquipNoStatus');
  var width = Number(parameters['width'] || 0);
  var height = eval(parameters['height']);

  //============================================================================
  // Scene_Equip
  //============================================================================

  Scene_Equip.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_Equip.prototype.createStatusWindow = function () {
    this._statusWindow = {
      width: width,
      height: height,
      x: 0,
      y: this._helpWindow.height,
    };
  };

  Scene_Equip.prototype.createCommandWindow = function () {
    var wx = 0;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - 0;
    this._commandWindow = new Window_EquipCommand(wx, wy, ww);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('equip', this.commandEquip.bind(this));
    this._commandWindow.setHandler('clear', this.commandClear.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_Equip.prototype.createSlotWindow = function () {
    var wx = 0;
    var wy = this._commandWindow.y + this._commandWindow.height;
    var ww = Graphics.boxWidth - 0;
    var wh = this._statusWindow.height - this._commandWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setHandler('ok', this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel', this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
  };

  Scene_Equip.prototype.createItemWindow = function () {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_EquipItem(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
  };

  Scene_Equip.prototype.refreshActor = function () {
    var actor = this.actor();
    this._slotWindow.setActor(actor);
    this._itemWindow.setActor(actor);
  };

  Scene_Equip.prototype.commandOptimize = function () {
    SoundManager.playEquip();
    this.actor().optimizeEquipments();
    this._slotWindow.refresh();
    this._commandWindow.activate();
  };

  Scene_Equip.prototype.commandClear = function () {
    SoundManager.playEquip();
    this.actor().clearEquipments();
    this._slotWindow.refresh();
    this._commandWindow.activate();
  };

  Scene_Equip.prototype.onItemOk = function () {
    SoundManager.playEquip();
    this.actor().changeEquip(this._slotWindow.index(), this._itemWindow.item());
    this._slotWindow.activate();
    this._slotWindow.refresh();
    this._itemWindow.deselect();
    this._itemWindow.refresh();
  };

  //============================================================================
  // Window_EquipSlot
  //============================================================================

  Window_EquipSlot.prototype.updateHelp = function () {
    Window_Selectable.prototype.updateHelp.call(this);
    this.setHelpWindowItem(this.item());
  };

  //============================================================================
  // Window_EquipItem
  //============================================================================

  Window_EquipItem.prototype.updateHelp = function () {
    Window_ItemList.prototype.updateHelp.call(this);
    if (this._actor && this._statusWindow) {
      var actor = JsonEx.makeDeepCopy(this._actor);
      actor.forceChangeEquip(this._slotId, this.item());
    }
  };

  //============================================================================
  // Window_EquipCommand
  //============================================================================

  Window_EquipCommand.prototype.maxCols = function () {
    return 2;
  };

  Window_EquipCommand.prototype.makeCommandList = function () {
    this.addCommand(TextManager.equip2, 'equip');
    this.addCommand(TextManager.clear, 'clear');
  };
})();
