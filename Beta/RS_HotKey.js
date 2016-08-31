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
  // Input
  //
  //

  var __LocalTouchInput = {'x': 0, 'y': 0 };
  __LocalTouchInput.set = function(x, y) {
    __LocalTouchInput.x = x;
    __LocalTouchInput.y = y;
  }

  for(var i = 0, index, key; i < 10; i++) {
    index = 48 + i;
    key = "Digit" + i;
    Input.keyMapper[index] = key;
  };

  //----------------------------------------------------------------------------
  // TouchInput
  //
  //
  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    __LocalTouchInput.set(x, y);
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
    this._item = null;
    this._index = index;
    this._keyName = index.toString();
    this._status = {'count':  0,
                    'enabled': false};
    this._toolTip = false;
    this.refresh();
    this.activate();
    this._windowFrameSprite.visible = false;
  };

  Window_ItemAreas.prototype.item = function () {
    if(!!this._item) return this._item;
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
    if (this._item !== item) {
        this._item = item;
        this.initStatus(this._item);
        this.setStatus(this._item);
        this.refresh();
    }
  };

  Window_ItemAreas.prototype.setStatus = function (item) {
    this._status = {};
    this._status.count = $gameParty.numItems(item);
    this._status.enabled = this.isEnabled();
  };

  Window_ItemAreas.prototype.initStatus = function(item) {
    if(!item) return false;
    this._status = {};
    this._status.count = $gameParty.numItems(item);
    this._status.enabled = this.isEnabled();
  }

  // 새로고침
  Window_ItemAreas.prototype.isRefresh = function () {

    if(!this._status) {
      return false;
    }

    if( (this._status.count !== $gameParty.numItems(this._item)) ||
        (this._status.enabled !== this.isEnabled()) ) {
          this.initStatus();
          this.setStatus(this._item);
          this.activate();
          this.refresh();
          return true;
      }

    return false;

  };

  Window_ItemAreas.prototype.isTriggered = function () {
    if(Input.isTriggered("Digit%1".format(this._keyName)) ) {
      this.setBlueTone();
      this.consumeItem();
      this.setOriginTone();
    }
  };

  Window_ItemAreas.prototype.setEmpty = function () {
    this._item = null;
    this._status = null;
  };

  Window_ItemAreas.prototype.isEmpty = function () {
    return !!this.item;
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
      var x = this.canvasToLocalX(__LocalTouchInput.x);
      var y = this.canvasToLocalY(__LocalTouchInput.y);
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
  };

  Window_ItemAreas.prototype.isOver = function () {
    if(this.isTouchedInsideFrame()) {
      if(TouchInput.isPressed()) {
        this.setOriginTone();
        this.setBlueTone();
      }
      if(TouchInput.isTriggered()) {
        this.consumeItem();
      } else {
        this.setRedTone();
        if( this._item ) {
          var item = this.item();
          RS.HotKey.setToolTip(this.x, this.y - this.fittingHeight(5), item);
          this._toolTip = true;
        }
      }
    } else {
      this.setOriginTone();
      if( this._item && this._toolTip) {
        RS.HotKey.invisibleToolTip();
        this._toolTip = false;
      }
    }
  };

  Window_ItemAreas.prototype.setBlueTone = function () {
    this.setTone(10, 10, 255);
  };

  Window_ItemAreas.prototype.setRedTone = function () {
    this.setTone(255, 10, 10);
  };

  Window_ItemAreas.prototype.setOriginTone = function () {
    var tone = $gameSystem.windowTone();
    this.setTone(tone[0], tone[1], tone[2]);
  };

  Window_ItemAreas.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.isRefresh();
    this.isTriggered();
    this.isOver();
  }

  Window_ItemAreas.prototype.refresh = function() {
    this.contents.clear();
    this.drawText(this._keyName, 0, 0 - 8, this.width - this.textWidth('00'), 'left');
    if ($gameParty.hasItem(this._item)) {
      this.drawItem();
    }
  };

  Window_ItemAreas.prototype.isEnabled = function() {
    return $gameParty.canUse(this._item) || false;
  };

  Window_ItemAreas.prototype.itemRect = function () {
    var w = Window_ItemAreas.WIDTH;
    var h = Window_ItemAreas.HEIGHT;
    var rect = new Rectangle(0, 0, w, h);
    return rect;
  };

  Window_ItemAreas.prototype.drawItemName = function(item, x, y, width) {
    width = width || Window_ItemAreas.WIDTH;
    if (item) {
        var x = this.contentsWidth() / 2 - Window_Base._iconWidth / 2;
        var y =  this.contentsHeight() / 2 - Window_Base._iconHeight / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x , y);
    }
  };

  Window_ItemAreas.prototype.drawItem = function() {
    if (this._item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect();
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled());
        this.drawItemName(this._item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(this._item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
  };

  Window_ItemAreas.prototype.numberWidth = function() {
    return this.textWidth('000');
  };

  Window_ItemAreas.prototype.drawItemNumber = function(item, x, y, width) {
    var ny = this.contentsHeight() / 2;
    this.drawText(this._status.count, x, ny , width - this.textWidth('00'), 'right');
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
      this._text = '';
      this._windowFrameSprite.visible = false;
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
      if (this._text !== text) {
          this._text = text;
          this.refresh();
      }
  };

  Window_ToolTip.prototype.clear = function() {
      this.setText('');
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
