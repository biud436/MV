//==============================================================================
// RS_HotKey.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_HotKey = true;

/*:
 * @author biud436
 */

var RS = RS || {};
RS.HotKey = RS.HotKey || {};

(function($) {

  var localInput = null;

  function Window_ItemAreas() {
    this.initialize.apply(this, arguments);
  }

  function Window_ToolTip() {
      this.initialize.apply(this, arguments);
  }

  function HotKey() {
    this.initialize.apply(this, arguments);
  }

  //----------------------------------------------------------------------------
  // LocalTouchInput
  //
  //

  function LocalTouchInput() {};
  
  LocalTouchInput.prototype = Object.assign(Object.create({
    'constructor': LocalTouchInput,
    'initPosition': function () {
      this.x = 0;
      this.y = 0;
    },
    'set': function(x, y) {
      this.x = x;
      this.y = y;
    },
    'initKeyMapper': function () {
      for(var i = 0, index, key; i < 10; i++) {
        index = 48 + i;
        key = "Digit" + i;
        Input.keyMapper[index] = key;
      };
    }
  }));

  localInput = new localInput().initPosition();
  localInput.initKeyMapper();

  //----------------------------------------------------------------------------
  // TouchInput
  //
  //
  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    localInput.set(x, y);
  };

  //----------------------------------------------------------------------------
  // Window_ItemAreas
  //
  //

  Window_ItemAreas.WIDTH = 68;
  Window_ItemAreas.HEIGHT = 68;
  Window_ItemAreas.ToolTip = null;

  Window_ItemAreas.prototype = Object.create(Window_Base.prototype);
  Window_ItemAreas.prototype.constructor = Window_ItemAreas;

  Window_ItemAreas.prototype.initialize = function (index) {
    Window_Base.prototype.initialize.call(this, 0, 0, Window_ItemAreas.WIDTH, Window_ItemAreas.HEIGHT);
  };

  Window_ItemAreas.prototype.item = function () {
  };

  Window_ItemAreas.prototype.standardFontSize = function() {
    return 14;
  };

  Window_ItemAreas.prototype.textPadding = function() {
    return 2;
  };

  Window_ItemAreas.prototype.standardPadding = function() {
    return 8;
  };

  Window_ItemAreas.prototype.setItem = function(item) {
  };

  Window_ItemAreas.prototype.setStatus = function (item) {
  };

  Window_ItemAreas.prototype.initStatus = function(item) {
  };

  Window_ItemAreas.prototype.isRefresh = function () {
  };

  Window_ItemAreas.prototype.isTriggered = function () {
  };

  Window_ItemAreas.prototype.setEmpty = function () {
  };

  Window_ItemAreas.prototype.isEmpty = function () {
  };

  Window_ItemAreas.prototype.consumeItem = function () {
    if(this.isEnabled()) {
      var target = $gameParty.members()[0];
      var action = new Game_Action(target);
      var item = this.item();
      action.setItemObject(item);
      $gameParty.members()[0].useItem(item);
      if(action.testApply(target)) {
        this.itemTargetActors().forEach(function(_target) {
            for (var i = 0; i < action.numRepeats(); i++) {
                action.apply(_target);
            }
        }, this);
        action.applyGlobal();
      }
    }
  };

  Window_ItemAreas.prototype.itemTargetActors = function () {
    var target = $gameParty.members()[0];
    var action = new Game_Action(target);
    action.setItemObject(this.item());
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [$gameParty.members()[0]];
    }
  };

  Window_ItemAreas.prototype.isTouchedInsideFrame = function() {
  };

  Window_ItemAreas.prototype.isOver = function () {
  };

  Window_ItemAreas.prototype.setBlueTone = function () {
  };

  Window_ItemAreas.prototype.setRedTone = function () {
  };

  Window_ItemAreas.prototype.setOriginTone = function () {
  };

  Window_ItemAreas.prototype.update = function() {
    Window_Base.prototype.update.call(this);
  }

  Window_ItemAreas.prototype.refresh = function() {
  };

  Window_ItemAreas.prototype.isEnabled = function() {
  };

  Window_ItemAreas.prototype.itemRect = function () {
  };

  Window_ItemAreas.prototype.drawItemName = function(item, x, y, width) {
  };

  Window_ItemAreas.prototype.drawItem = function() {
  };

  Window_ItemAreas.prototype.numberWidth = function() {
  };

  Window_ItemAreas.prototype.drawItemNumber = function(item, x, y, width) {
  };

  //----------------------------------------------------------------------------
  // Window_ToolTip
  //
  //

  Window_ToolTip.prototype = Object.create(Window_Base.prototype);
  Window_ToolTip.prototype.constructor = Window_ToolTip;

  Window_ToolTip.prototype.initialize = function(numLines) {
    var width = 240;
    var height = this.fittingHeight(numLines || 4);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  };

  Window_ToolTip.prototype.defaultText = function(text) {
    var text = ["\\c[11]Name\\c[0] : %1   \\I[%4] ",
                "\\c[11]Price\\c[0] : %2\\G",
                "\\c[11]Desc\\c[0] : %3"].join("\n");
    return text;
  };

  Window_ToolTip.prototype.weaponText = function(text) {
    var text = ["\\c[11]Name\\c[0] : %1   \\I[%12] ",
                "\\c[11]Price\\c[0] : %2\\G",
                "\\c[11]MHP\\c[0] : %3  \\c[11]MMP\\c[0] : %4",
                "\\c[11]ATK\\c[0] : %5  \\c[11]DEF\\c[0] : %6",
                "\\c[11]MATK\\c[0] : %7  \\c[11]MDEF\\c[0] : %8",
                "\\c[11]AGI\\c[0] : %9  \\c[11]LUCK\\c[0] : %10",
                "\\c[11]Desc\\c[0] : %11"].join("\n");
    return text;
  };

  Window_ToolTip.prototype.standardFontSize = function() {
      return 14;
  };

  Window_ToolTip.prototype.lineHeight = function() {
      return 36;
  };

  Window_ToolTip.prototype.standardPadding = function() {
      return 6;
  };

  Window_ToolTip.prototype.textPadding = function() {
      return 6;
  };

  Window_ToolTip.prototype.setText = function(text) {
  };

  Window_ToolTip.prototype.clear = function() {
  };

  Window_ToolTip.prototype.setItem = function(item) {
    var text = '';
    if(item) {
      // 아이템?
      if(DataManager.isItem(item)) {
        text = this.defaultText().format(item.name, item.price, item.description, item.iconIndex);
      }
      // 무기?
      if(DataManager.isWeapon(item)) {
        text = this.weaponText().format(item.name, item.price,
          item.params[0], item.params[1],
          item.params[2], item.params[3],
          item.params[4], item.params[5],
          item.params[6], item.params[7],
          item.description, item.iconIndex);
      }
    }
    this.setText(item ? text : '');
  };

  var alias_Window_ToolTip_processNormalCharacter = Window_ToolTip.prototype.processNormalCharacter;
  Window_ToolTip.prototype.processNormalCharacter = function(textState) {
      var w = this.textWidth(textState.text[textState.index]);
      if(textState.x + (w * 2) >= this.contentsWidth()) {
        textState.index--;
        this.processNewLine(textState);
      }
      alias_Window_ToolTip_processNormalCharacter.call(this,textState);
  };

  Window_ToolTip.prototype.textWidthEx = function(text) {
    return this.drawTextEx.call(this, text, 0, this.contents.height);
  };

  Window_ToolTip.prototype.refresh = function() {
      this.contents.clear();
      this.drawTextEx(this._text, this.textPadding(), 0);
  };

  //----------------------------------------------------------------------------
  // HotKey
  //
  //

  HotKey.MAX_ROWS = 10;

  HotKey.MAX_COLS = 1;

  HotKey.prototype = Object.create(Sprite.prototype);
  HotKey.prototype.constructor = HotKey;

  HotKey.ITEM_STACK = [];

  HotKey.addItemHandler = function(func) {
  };

  HotKey.prototype.initialize = function() {
    Sprite.prototype.initialize.apply(this, arguments);
  };

  HotKey.prototype.createToolTip = function () {
  };

  HotKey.prototype.setToolTip = function (x, y, item) {
  };

  HotKey.prototype.invisibleToolTip = function () {
  };

  HotKey.prototype.visibleToolTip = function () {
  };

  HotKey.prototype.update = function() {
    Sprite.prototype.update.call(this);
  };

  HotKey.prototype.executeHandler = function () {
  };

  HotKey.prototype.addWindow = function(object) {
  };

  HotKey.prototype.createAllItemWindow = function () {
  };

  HotKey.prototype.createWindow = function(i, w, padding, startX, startY) {
  };

  HotKey.prototype.isItem = function (__item) {
  };

  HotKey.prototype.autoDectectedItem = function() {
  };

  HotKey.prototype.loadDectectedItem = function(index) {
  };

  HotKey.prototype.addItem = function (item, index) {
  };

  HotKey.prototype.refreshHotKey = function () {
  };


  //----------------------------------------------------------------------------
  // Game_System
  //
  //
  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
  }

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  // 인벤토리를 생성합니다.
  var alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    alias_Scene_Map_start.call(this);
    this._HotKey = new HotKey();
    this.addChild(this._HotKey);
    this.swapChildren(this._windowLayer, this._HotKey);
  };

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    alias_Scene_Map_terminate.call(this);
    this._HotKey = null;
  };

  //----------------------------------------------------------------------------
  // Game_Interpreter
  //
  //
  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "AddHotKey") {
        switch (args[0].toLowerCase()) {
          case 'item':
            var item_index = Number(args[1]||1);
            var slot_index = Number(args[2]||0);
            var item = $dataItems[item_index];
            if($gameParty.hasItem(item, false)) {
              RS.HotKey.addItem(item, slot_index);
            }
            break;
          case 'weapon':
            var item_index = Number(args[1]||1);
            var slot_index = Number(args[2]||0);
            var item = $dataWeapons[item_index];
            if($gameParty.hasItem(item, false)) {
              RS.HotKey.addItem(item, slot_index);
            }
            break;
        }
    }
    if(command === "DeleteHotKey") {
      var slot_index = Number(args[0]||0);
      var item = null;
      RS.HotKey.addItem(item, slot_index);
    }
  };

})(RS.HotKey);
