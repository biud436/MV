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
  // Window_ItemAreas
  //
  //

  Window_ItemAreas.WIDTH = 68;
  Window_ItemAreas.HEIGHT = 68;
  Window_ItemAreas.ToolTip = null;

  Window_ItemAreas.prototype = Object.create(Window_Base.prototype);
  Window_ItemAreas.prototype.constructor = Window_ItemAreas;

  // 초기화
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

  // 아이템 획득
  Window_ItemAreas.prototype.item = function () {
    if(!!this._item) return this._item;
  };

  // 기본 텍스트 사이즈
  Window_ItemAreas.prototype.standardFontSize = function() {
    return 14;
  };

  // 텍스트 간격
  Window_ItemAreas.prototype.textPadding = function() {
    return 2;
  };

  // 기본 간격
  Window_ItemAreas.prototype.standardPadding = function() {
    return 8;
  };

  // 아이템 설정
  Window_ItemAreas.prototype.setItem = function(item) {
    if (this._item !== item) {
        this._item = item;
        this.initStatus(this._item);
        this.setStatus(this._item);
        this.refresh();
    }
  };

  // 아이템 상태(갯수, 활성화 상태) 설정
  Window_ItemAreas.prototype.setStatus = function (item) {
    this._status = {};
    this._status.count = $gameParty.numItems(item);
    this._status.enabled = this.isEnabled();
  };

  // 상태를 초기화합니다
  Window_ItemAreas.prototype.initStatus = function(item) {
    if(!item) return false;
    this._status = {};
    this._status.count = $gameParty.numItems(item);
    this._status.enabled = this.isEnabled();
  }

  // 새로고침
  Window_ItemAreas.prototype.isRefresh = function () {

    // 상태가 초기화되지 않았다면 실패
    if(!this._status) {
      return false;
    }

    // 정보가 다르면 새로고침
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

  // 키입력 (0 ~ 9)
  Window_ItemAreas.prototype.isTriggered = function () {
    if(Input.isTriggered("Digit%1".format(this._keyName)) ) {
      this.setBlueTone();
      this.consumeItem();
      this.setOriginTone();
    }
  };

  // 아이템을 비웁니다
  Window_ItemAreas.prototype.setEmpty = function () {
    this._item = null;
    this._status = null;
  };

  // 아이템이 텅 빈 상태인지 확인합니다
  Window_ItemAreas.prototype.isEmpty = function () {
    return !!this.item;
  };

  // 아이템을 소비합니다.
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

  // 아이템을 소비하는 대상(타겟)을 설정합니다
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

  // 터치 영역을 획득합니다
  Window_ItemAreas.prototype.isTouchedInsideFrame = function() {
      var x = this.canvasToLocalX(__LocalTouchInput.x);
      var y = this.canvasToLocalY(__LocalTouchInput.y);
      return x >= 0 && y >= 0 && x < this.width && y < this.height;
  };

  // 마우스가 위에 올라와있는지 확인합니다
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

  // 톤을 변경합니다.
  Window_ItemAreas.prototype.setBlueTone = function () {
    this.setTone(10, 10, 255);
  };

  // 톤을 변경합니다.
  Window_ItemAreas.prototype.setRedTone = function () {
    this.setTone(255, 10, 10);
  };

  // 원래의 톤으로 되돌립니다.
  Window_ItemAreas.prototype.setOriginTone = function () {
    var tone = $gameSystem.windowTone();
    this.setTone(tone[0], tone[1], tone[2]);
  };

  // 업데이트
  Window_ItemAreas.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.isRefresh();
    this.isTriggered();
    this.isOver();
  }

  // 다시 그립니다
  Window_ItemAreas.prototype.refresh = function() {
    this.contents.clear();
    this.drawText(this._keyName, 0, 0 - 8, this.width - this.textWidth('00'), 'left');
    if ($gameParty.hasItem(this._item)) {
      this.drawItem();
    }
  };

  // 아이템을 사용할 수 있는지 없는지 여부를 반환합니다.
  Window_ItemAreas.prototype.isEnabled = function() {
    return $gameParty.canUse(this._item) || false;
  };

  // 아이템 하나의 영역을 획득합니다.
  Window_ItemAreas.prototype.itemRect = function () {
    var w = Window_ItemAreas.WIDTH;
    var h = Window_ItemAreas.HEIGHT;
    var rect = new Rectangle(0, 0, w, h);
    return rect;
  };

  // 아이템의 이름 영역을 그립니다.
  Window_ItemAreas.prototype.drawItemName = function(item, x, y, width) {
    width = width || Window_ItemAreas.WIDTH;
    if (item) {
        var x = this.contentsWidth() / 2 - Window_Base._iconWidth / 2;
        var y =  this.contentsHeight() / 2 - Window_Base._iconHeight / 2;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x , y);
    }
  };

  // 아이템을 그립니다.
  Window_ItemAreas.prototype.drawItem = function() {
    if (this._item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect();
        rect.width -= this.textPadding();
        // 투명도 설정
        this.changePaintOpacity(this.isEnabled());
        // 아이템 이름
        this.drawItemName(this._item, rect.x, rect.y, rect.width - numberWidth);
        // 아이템 갯수
        this.drawItemNumber(this._item, rect.x, rect.y, rect.width);
        // 투명도 설정
        this.changePaintOpacity(1);
    }
  };

  // 아이템 갯수 텍스트의 폭
  Window_ItemAreas.prototype.numberWidth = function() {
    return this.textWidth('000');
  };

  // 아이템 갯수를 그립니다
  Window_ItemAreas.prototype.drawItemNumber = function(item, x, y, width) {
    var ny = this.contentsHeight() / 2;
    this.drawText(this._status.count, x, ny , width - this.textWidth('00'), 'right');
  };

  //----------------------------------------------------------------------------
  // Window_ToolTip
  //
  // 툴팁을 표시하는 객체입니다.

  Window_ToolTip.prototype = Object.create(Window_Base.prototype);
  Window_ToolTip.prototype.constructor = Window_ToolTip;

  // 초기화
  Window_ToolTip.prototype.initialize = function(numLines) {
      var width = 240;
      var height = this.fittingHeight(numLines || 4);
      Window_Base.prototype.initialize.call(this, 0, 0, width, height);
      this._text = '';
      this._windowFrameSprite.visible = false;
  };

  // 기본적으로 표시되는 텍스트입니다.
  Window_ToolTip.prototype.defaultText = function(text) {
    var text = ["\\c[11]Name\\c[0] : %1   \\I[%4] ",
                "\\c[11]Price\\c[0] : %2\\G",
                "\\c[11]Desc\\c[0] : %3"].join("\n");
    return text;
  };

  // 무기일 경우 표시되는 텍스트입니다.
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

  // 기본 텍스트의 크기
  Window_ToolTip.prototype.standardFontSize = function() {
      return 14;
  };

  // 라인의 크기
  Window_ToolTip.prototype.lineHeight = function() {
      return 36;
  };

  // 간격
  Window_ToolTip.prototype.standardPadding = function() {
      return 6;
  };

  // 텍스트 간격
  Window_ToolTip.prototype.textPadding = function() {
      return 6;
  };

  // 텍스트를 설정합니다.
  Window_ToolTip.prototype.setText = function(text) {
      if (this._text !== text) {
          this._text = text;
          this.refresh();
      }
  };

  // 비어있는 텍스트를 설정합니다.
  Window_ToolTip.prototype.clear = function() {
      this.setText('');
  };

  // 아이템을 설정합니다.
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
    // 아이템이 있으면 텍스트, 없으면 비어있는 텍스트
    this.setText(item ? text : '');
  };

  // 설명이 폭을 넘어가면 자동으로 줄바꿈을 합니다.
  var alias_Window_ToolTip_processNormalCharacter = Window_ToolTip.prototype.processNormalCharacter;
  Window_ToolTip.prototype.processNormalCharacter = function(textState) {
      var w = this.textWidth(textState.text[textState.index]);
      if(textState.x + (w * 2) >= this.contentsWidth()) {
        textState.index--;
        this.processNewLine(textState);
      }
      alias_Window_ToolTip_processNormalCharacter.call(this,textState);
  };

  // 텍스트의 정확한 폭을 구합니다.
  Window_ToolTip.prototype.textWidthEx = function(text) {
    return this.drawTextEx.call(this, text, 0, this.contents.height);
  };

  // 다시 그립니다.
  Window_ToolTip.prototype.refresh = function() {
      this.contents.clear();
      this.drawTextEx(this._text, this.textPadding(), 0);
  };

  //----------------------------------------------------------------------------
  // Game_System
  //
  // 게임 정보를 저장합니다.
  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    this._hotKeyItem = [];
  }

  //----------------------------------------------------------------------------
  // HotKey
  //
  //

  // 10열
  HotKey.MAX_ROWS = 10;

  // 1행
  HotKey.MAX_COLS = 1;

  HotKey.prototype = Object.create(Sprite.prototype);
  HotKey.prototype.constructor = HotKey;

  // 아이템 스택
  HotKey.ITEM_STACK = [];

  // (static) 아이템 스택에 아이템을 추가합니다.
  HotKey.addItemHandler = function(func) {
    // HotKey.ITEM_STACK.push(func);
  };

  // 초기화
  HotKey.prototype.initialize = function() {
    Sprite.prototype.initialize.apply(this, arguments);

    // 화면 영역
    this.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);

    // 윈도우 레이어 생성
    this._windowLayer = new WindowLayer();
    this._windowLayer.move(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    this.addChild(this._windowLayer);

    // 모든 아이템 윈도우 생성
    this.createAllItemWindow();

    // 아이템 툴팁 생성
    this.createToolTip();

    // 셀프 포인터
    RS.HotKey = this;

    // 카운터
    this._stayCount = 0;

  };

  // 툴팁 윈도우를 생성합니다.
  HotKey.prototype.createToolTip = function () {
    //
    // this._toolTipWindow = new Window_ToolTip(5);
    // this.invisibleToolTip();
    // this.addChild(this._toolTipWindow);
    //
  };

  // 툴팁을 설정합니다.
  HotKey.prototype.setToolTip = function (x, y, item) {
    // var width = this._toolTipWindow.width;
    // var height = this._toolTipWindow.height;
    // this._toolTipWindow.setItem(item);
    // this._toolTipWindow.move(x, y, width, height);
    // this.visibleToolTip();
  }

  // 툴팁을 보이지 않게 합니다.
  HotKey.prototype.invisibleToolTip = function () {
    // this._toolTipWindow.visible = false;
  }

  // 툴팁을 보이게 합니다.
  HotKey.prototype.visibleToolTip = function () {
    // this._toolTipWindow.visible = true;
  }

  // 인벤토리를 업데이트합니다.
  HotKey.prototype.update = function() {
    Sprite.prototype.update.call(this);
  };

  // Bug : setItem 함수가 undefined로 인식되는 버그가 있다.
  // Bug Fix : args[1] 의 범위가 9를 초과하는 버그를 해결했다.
  HotKey.prototype.executeHandler = function () {
    // var self = this;
    // for(var i = 0; i < HotKey.ITEM_STACK.length, HotKey.ITEM_STACK[i] !== undefined; i++) {
    //   var args = HotKey.ITEM_STACK[i]();
    //   if(args) {
    //     if(this.isItem(args[0])) {
    //       self.addItem(args[0], args[1].clamp(0, 9));
    //     }
    //   }
    // }
    // HotKey.ITEM_STACK = [];
  };

  // 윈도우를 추가합니다.
  HotKey.prototype.addWindow = function(object) {
    // if(this._windowLayer && object) {
    //   this._windowLayer.addChild(object);
    // }
  };

  // 모든 아이템 윈도우를 생성합니다.
  HotKey.prototype.createAllItemWindow = function () {
    try {
      // var startX, w = 68 ,
      //     h = 68,
      //     startY,
      //     localItem,
      //     lastItem,
      //     padding = 10,
      //     self = this,
      //     dectectedItem;
      //
      // startX = Graphics.boxWidth / 2 - (w * HotKey.MAX_ROWS) / 2;
      // startY = Graphics.boxHeight - h - padding;

      // this.autoDectectedItem();
      //
      // for(var i = 0; i < HotKey.MAX_ROWS; i++) {
      //   localItem = this.createWindow(i, w, padding, startX, startY);
      //   dectectedItem = this.loadDectectedItem(i);
      //   if(dectectedItem) {
      //     localItem.setItem(dectectedItem.item);
      //   }
      //   self.addWindow(localItem);
      // }
      //
      // this.refreshHotKey();
    } catch(e) {
      throw new Error(e.message);
    }
  };

  // 아이템 윈도우를 생성합니다.
  HotKey.prototype.createWindow = function(i, w, padding, startX, startY) {
    // var equ = (i * w) + padding;
    // var localItem = new Window_ItemAreas((i + 1) % HotKey.MAX_ROWS);
    // localItem.x = startX + equ;
    // localItem.y = startY;
    // return localItem;
  }

  // 아이템이 하나라도 있는지 확인합니다
  HotKey.prototype.isItem = function (__item) {
    // var includes = [];
    // includes.push( DataManager.isItem( __item ) );
    // includes.push( DataManager.isSkill( __item ) );
    // includes.push( DataManager.isWeapon( __item ) );
    // includes.push( DataManager.isArmor( __item ) );
    // return includes.indexOf(true) !== -1;
  };

  // 아이템을 자동으로 감지하여 추가합니다.
  HotKey.prototype.autoDectectedItem = function() {
    // 윈도우 레이어가 생성되지 않았으면 빈 배열을 반환합니다.

    // if(!this._windowLayer) return [];
    //
    // if(($gameSystem._hotKeyItem instanceof Array) &&
    //     $gameSystem._hotKeyItem.length === 0) {
    //   $gameSystem._hotKeyItem = [];
    //   var list = this._windowLayer.children.filter(function(i) {
    //       var __item = i.item();
    //       return this.isItem(__item);
    //   }, this);
    //   for(var i of list) {
    //     $gameSystem._hotKeyItem.push({'_index': i._index, 'item': i.item()});
    //   }
    // }
    //
    // return $gameSystem._hotKeyItem;
  };

  // 아이템을 로드합니다.
  HotKey.prototype.loadDectectedItem = function(index) {
    // 윈도우 레이어가 없으면 빈 배열을 반환합니다.

    // if(!this._windowLayer) return [];
    // if($gameSystem._hotKeyItem.length === 0) return [];
    // return $gameSystem._hotKeyItem[index];
  }

  // 아이템 추가합니다.
  HotKey.prototype.addItem = function (item, index) {
    // if(this._windowLayer) {
    //     var key = index;
    //     var wnd = this._windowLayer.children.filter(function(i) {
    //       if(i._keyName == key.toString()) {
    //         return true;
    //       }
    //     }, this)[0];
    //     if(wnd) {
    //       wnd.setItem(item);
    //       $gameSystem._hotKeyItem.push({'_index': wnd._index, 'item': wnd.item()});
    //     }
    // }
  };

  HotKey.prototype.refreshHotKey = function () {
    // var list = $gameSystem._hotKeyItem;
    // list.forEach(function(i) {
    //   this.addItem(i.item, i._index);
    // }, this);
  };

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
