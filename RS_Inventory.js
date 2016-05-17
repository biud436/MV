/*:
 * RS_Inventory.js
 * @plugindesc Inventory
 * @author biud436
 * @help
 * 이 플러그인은 아이템을 간단하게 사용할 수 있는 인터페이스 플러그인입니다. 하단에 툴
 * 팁과 아이템 갯수 등이 표시되고, 슬롯에 아이템을 추가하거나 삭제할 수 있는 기능을 제
 * 공합니다. 단축키는 0 ~ 9번까지 사용이 가능하며 기본 세팅은 바꿀 수 없습니다.
 *
 * -----------------------------------------------------------------------------
 * Plugin Command
 * -----------------------------------------------------------------------------
 * AddHotKey Item item_index slot_index
 * DeleteHotKey slot_index
 *
 * -----------------------------------------------------------------------------
 * Development Note
 * -----------------------------------------------------------------------------
 * 2016.05.05 - Start Development
 * 2016.05.06 - Fixed a bug
 */

var Imported = Imported || {};
Imported.RS_Inventory = true;

var RS = RS || {};
RS.Inventory = RS.Inventory || {};

(function($) {

  var __LocalTouchInput = {'x': 0, 'y': 0 };
  __LocalTouchInput.set = function(x, y) {
    __LocalTouchInput.x = x;
    __LocalTouchInput.y = y;
  }

  //----------------------------------------------------------------------------
  // Input
  //
  //
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
  // Window_ItemThings
  //
  //
  function Window_ItemThings() {
    this.initialize.apply(this, arguments);
  };

  Window_ItemThings.WIDTH = 68;
  Window_ItemThings.HEIGHT = 68;
  Window_ItemThings.ToolTip = null;

  Window_ItemThings.prototype = Object.create(Window_Base.prototype);
  Window_ItemThings.prototype.constructor = Window_ItemThings;

  Window_ItemThings.prototype.initialize = function (index) {
    Window_Base.prototype.initialize.call(this, 0, 0, Window_ItemThings.WIDTH, Window_ItemThings.HEIGHT);
    this._item = null;
    this._index = index;
    this._keyString = index.toString();
    this._status = {'count': 0,
                    'enabled': false};
    this._toolTip = false;
    this.refresh();
    this.activate();
    this._windowFrameSprite.visible = false;
  };

  Window_ItemThings.prototype.item = function () {
    if(!!this._item) return this._item;
  };

  Window_ItemThings.prototype.standardFontSize = function() {
    return 14;
  };

  Window_ItemThings.prototype.textPadding = function() {
    return 2;
  };

  Window_ItemThings.prototype.standardPadding = function() {
    return 8;
  };

  Window_ItemThings.prototype.setItem = function(item) {
    if (this._item !== item) {
        this._item = item;
        this.setStatus(item);
        this.refresh();
    }
  };

  Window_ItemThings.prototype.setStatus = function (item) {
    // 상태 정보가 선언되지 않았을 경우
    if(this._status === undefined || this._status === null) {
      this._status = {'count': 0, 'enabled': false};
    }
    // 상태 정보가 있을 경우, 최신 정보로 업데이트한다.
    if(this._status) {
      this._status.count = $gameParty.numItems(item);
      this._status.enabled = this.isEnabled();
    }

  };

  Window_ItemThings.prototype.initStatus = function() {
    this._status = {};
    this._status.count = $gameParty.numItems(item);
    this._status.enabled = this.isEnabled();
  }

  Window_ItemThings.prototype.isRefresh = function () {
    if(!this._status) {
      return false;
    }
    if( (this._status.count !== $gameParty.numItems(this._item)) ||
        (this._status.enabled !== this.isEnabled()) ) {
          this.setStatus(this._item);
          this.activate();
          this.refresh();
          return true;
      }
    return false;
  };

  Window_ItemThings.prototype.isTriggered = function () {
    if(Input.isTriggered("Digit%1".format(this._keyString)) ) {
      this.setBlueTone();
      this.consumeItem();
      this.setOriginTone();
    }
  };

  Window_ItemThings.prototype.setEmpty = function () {
    this._item = null;
    this._status = null;
  };

  Window_ItemThings.prototype.isEmpty = function () {
    return !!this.item;
  };

  Window_ItemThings.prototype.consumeItem = function () {
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

  Window_ItemThings.prototype.itemTargetActors = function () {
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

  Window_ItemThings.prototype.isTouchedInsideFrame = function() {
      var x = this.canvasToLocalX(__LocalTouchInput.x);
      var y = this.canvasToLocalY(__LocalTouchInput.y);
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
  };

  Window_ItemThings.prototype.isOver = function () {
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
          RS.Inventory.setToolTip(this.x, this.y - this.fittingHeight(5), item);
          this._toolTip = true;
        }
      }
    } else {
      this.setOriginTone();
      if( this._item && this._toolTip) {
        RS.Inventory.invisibleToolTip();
        this._toolTip = false;
      }
    }
  };

  Window_ItemThings.prototype.setBlueTone = function () {
    this.setTone(10, 10, 255);
  };

  Window_ItemThings.prototype.setRedTone = function () {
    this.setTone(255, 10, 10);
  };

  Window_ItemThings.prototype.setOriginTone = function () {
    var tone = $gameSystem.windowTone();
    this.setTone(tone[0], tone[1], tone[2]);
  };

  Window_ItemThings.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.isRefresh();
    this.isTriggered();
    this.isOver();
  }

  Window_ItemThings.prototype.refresh = function() {
    this.contents.clear();
    this.drawText(this._keyString, 0, 0 - 8, this.width - this.textWidth('00'), 'left');
    if (this._item) {
      this.drawItem();
    }
  };

  Window_ItemThings.prototype.isEnabled = function() {
    return $gameParty.canUse(this._item);
  };

  Window_ItemThings.prototype.itemRect = function () {
    var w = Window_ItemThings.WIDTH;
    var h = Window_ItemThings.HEIGHT;
    var rect = new Rectangle(0, 0, w, h);
    return rect;
  };

  Window_ItemThings.prototype.drawItemName = function(item, x, y, width) {
    width = width || Window_ItemThings.WIDTH;
    if (item) {
        var x = this.contentsWidth() / 2 - Window_Base._iconWidth / 2;
        var y =  this.contentsHeight() / 2 - Window_Base._iconHeight / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x , y);
    }
  };

  Window_ItemThings.prototype.drawItem = function() {
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

  Window_ItemThings.prototype.numberWidth = function() {
    return this.textWidth('000');
  };

  Window_ItemThings.prototype.drawItemNumber = function(item, x, y, width) {
    var ny = this.contentsHeight() / 2;
    this.drawText($gameParty.numItems(item), x, ny , width - this.textWidth('00'), 'right');
  };

  //----------------------------------------------------------------------------
  // Window_ToolTip
  //
  //
  function Window_ToolTip() {
      this.initialize.apply(this, arguments);
  }

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
      if(DataManager.isItem(item)) {
        text = this.defaultText().format(item.name, item.price, item.description, item.iconIndex);
      }
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
  // Window_ItemList
  //
  //
  Window_ItemList.prototype.select = function(index) {
      this._index = index;
      this._stayCount = 0;
      this.ensureCursorVisible();
      this.updateCursor();
      this.callUpdateHelp();
  };

  var alias_Window_ItemList_processCursorMove = Window_ItemList.prototype.processCursorMove;
  Window_ItemList.prototype.processCursorMove = function() {
      if (this.isCursorMovable()) {
          var lastIndex = this.index();
          var lastSlotIndex = 0;
          var lastKey = '';
          for(var i = 0; i < 10; i++) {
            lastKey = "Digit%1".format(i);
            if(Input._latestButton === lastKey ) {
              if(Input.isTriggered(lastKey)) {
                var item = this.item();
                lastSlotIndex = lastKey.match(/[0-9]+/gi)[0];
                if(lastSlotIndex && $gameParty.hasItem(item, false)) {
                  Inventory.addItemHandler(function() {
                    var data = [item, lastSlotIndex];
                    return data;
                  });
                }
              }
            }
          }
      }
      alias_Window_ItemList_processCursorMove.call(this);
  };

  //----------------------------------------------------------------------------
  // Game_System
  //
  //
  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._hotKeyItem = [];
  }
  //----------------------------------------------------------------------------
  // Inventory
  //
  //
  function Inventory() {
    this.initialize.apply(this, arguments);
  };

  Inventory.MAX_ROWS = 10;
  Inventory.MAX_COLS = 1;

  Inventory.prototype = Object.create(Sprite.prototype);
  Inventory.prototype.constructor = Inventory;

  Inventory.ITEM_STACK = [];

  Inventory.addItemHandler = function(func) {
    Inventory.ITEM_STACK.push(func);
  }

  Inventory.prototype.initialize = function() {
    Sprite.prototype.initialize.apply(this, arguments);

    this.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

    // Create Window Layer
    this._windowLayer = new WindowLayer();
    this._windowLayer.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.addChild(this._windowLayer);

    // Create All Item Window
    this.createAllItemWindow();

    // Create ToolTips
    this.createToolTip();

    RS.Inventory = this;

    this._stayCount = 0;

  };

  Inventory.prototype.createToolTip = function () {
    this._toolTipWindow = new Window_ToolTip(5);
    this._toolTipWindow.visible = false;
    this.addChild(this._toolTipWindow);
  };

  Inventory.prototype.setToolTip = function (x, y, item) {
    var width = this._toolTipWindow.width;
    var height = this._toolTipWindow.height;
    this._toolTipWindow.setItem(item);
    this._toolTipWindow.move(x, y, width, height);
    this._toolTipWindow.visible = true;
  }

  Inventory.prototype.invisibleToolTip = function () {
    this._toolTipWindow.visible = false;
  }

  Inventory.prototype.visibleToolTip = function () {
    this._toolTipWindow.visible = true;
  }

  Inventory.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this._stayCount++;
    if(this._stayCount >= 300) {
      this.executeHandler();
      this._stayCount = 0;
    }
  };

  // Bug : setItem 함수가 undefined로 인식되는 버그가 있다.
  // Bug Fix : args[1] 의 범위가 9를 초과하는 버그를 해결했다.
  Inventory.prototype.executeHandler = function () {
    var self = this;
    for(var i = 0; i < Inventory.ITEM_STACK.length, Inventory.ITEM_STACK[i] !== undefined; i++) {
      var args = Inventory.ITEM_STACK[i]();
      if(args) {
        if(this.isItem(args[0])) {
          self.addItem(args[0], args[1].clamp(0, 9));
        }
      }
    }
    Inventory.ITEM_STACK = [];
  };

  Inventory.prototype.addWindow = function(object) {
    if(this._windowLayer && object) {
      this._windowLayer.addChild(object);
    }
  };

  Inventory.prototype.createAllItemWindow = function () {
    try {

      var startX, w = 68 , h = 68, startY, localItem, lastItem,
      padding = 10, self = this, dectectedItem;

      startX = Graphics.boxWidth / 2 - (w * Inventory.MAX_ROWS) / 2;
      startY = Graphics.boxHeight - h - padding;

      for(var i = 0; i < Inventory.MAX_ROWS; i++) {
        localItem = this.createWindow(i, w, padding, startX, startY);
        dectectedItem = this.loadDectectedItem((i + 1) % Inventory.MAX_ROWS);
        if(dectectedItem) {
          localItem.setItem(dectectedItem.item);
        }
        self.addWindow(localItem);
      }

    } catch(e) {
      throw new Error(e.message);
    }

  };

  Inventory.prototype.createWindow = function(i, w, padding, startX, startY) {
    var equ = (i * w) + padding;
    var localItem = new Window_ItemThings((i + 1) % Inventory.MAX_ROWS);
    localItem.x = startX + equ;
    localItem.y = startY;
    return localItem;
  }

  Inventory.prototype.isItem = function (__item) {
    var includes = [];
    includes.push( DataManager.isItem( __item ) );
    includes.push( DataManager.isSkill( __item ) );
    includes.push( DataManager.isWeapon( __item ) );
    includes.push( DataManager.isArmor( __item ) );
    return includes.indexOf(true) !== -1;
  };

  Inventory.prototype.autoDectectedItem = function() {
    if(!this._windowLayer) return [];
    var list = this._windowLayer.children.filter(function(i) {
        var __item = i.item();
        return this.isItem(__item);
    }, this);
    $gameSystem._hotKeyItem = list.map(function(i) {
      return {'_index': i._index, 'item': i.item()};
    });
    return $gameSystem._hotKeyItem;
  };

  Inventory.prototype.loadDectectedItem = function(index) {
    if(!this._windowLayer) return [];
    var result = $gameSystem._hotKeyItem.filter(function(i) {
      if(i._index === index && this.isItem(i.item)) {
        return true;
      }
    }, this);
    return result[0];
  }

  Inventory.prototype.addItem = function (item, index) {
    if(this._windowLayer) {
      var key = index;
      var wnd = this._windowLayer.children.filter(function(i) {
        if(i._keyString === key.toString()) {
          return true;
        }
      }, this)[0];
      if(wnd) wnd.setItem(item);
      this.autoDectectedItem();
    }
  };

  //----------------------------------------------------------------------------
  // Scene_Map
  //
  //
  var alias_Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    alias_Scene_Map_start.call(this);
    this._inventory = this._inventory || new Inventory();
    this.addChild(this._inventory);
    this.swapChildren(this._windowLayer, this._inventory);
  };

  var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    alias_Scene_Map_terminate.call(this);
    this._inventory = null;
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
              RS.Inventory.addItem(item, slot_index);
            }
            break;
          case 'weapon':
            var item_index = Number(args[1]||1);
            var slot_index = Number(args[2]||0);
            var item = $dataWeapons[item_index];
            if($gameParty.hasItem(item, false)) {
              RS.Inventory.addItem(item, slot_index);
            }
            break;
        }
    }
    if(command === "DeleteHotKey") {
      var slot_index = Number(args[0]||0);
      var item = null;
      RS.Inventory.addItem(item, slot_index);
    }
  };

})(RS.Inventory);
