/*:
 * RS_ItemStream.js
 * @plugindesc This plugin sends an item to the save-file or
 * gets an item from the save-file.
 * @author biud436
 * @date 2016.03.07
 * @version 1.0.1
 *
 * @help
 * //===========================================================================
 * // Plugin Command
 * //===========================================================================
 *
 * This plugin commands allows you to send the gold to the save-data.
 * Stream Send Gold saveFileId gold_value
 *
 * This plugin commands allows you to send the weapon to the save-data.
 * Stream Send Weapon saveFileId weapon_id
 *
 * This plugin commands allows you to send an armor to the save-data.
 * Stream Send Armor saveFileId armor_id
 *
 * This plugin commands allows you to send an item to the save-data.
 * Stream Send Item saveFileId item_id
 *
 * This plugin commands allows you to get the gold from the save-data.
 * Stream Bring Gold saveFileId gold_value
 *
 * This plugin commands allows you to get the weapon from the save-data.
 * Stream Bring WeaponsaveFileId weapon_id
 *
 * This plugin commands allows you to get an armor from the save-data.
 * Stream Bring Armor saveFileId armor_id
 *
 * This plugin commands allows you to get an item from the save-data.
 * Stream Bring Item saveFileId item_id
 *
 * //===========================================================================
 * // Change Log
 * //===========================================================================
 * 2016.03.07 (v1.0.0) - First Release
 * 2016.03.22 (v1.0.1) - The simple light plugin was not compatible
 * with this plugin, But Fixed it.
 */

var Imported = Imported || {};
Imported.RS_ItemStream = true;

(function() {

  var Stream = Stream || {};

  Stream.RECEIVER = -1;
  Stream.SENDER = 0;

  //============================================================================
  // ** Services Class
  //============================================================================

  function Services() {
      this.initialize.apply(this, arguments);
  }

  Services.prototype.constructor = Services;

  Services.prototype.initialize = function(sender, receiver) {
      this._senderHeader = sender.header;
      this._receiverHeader = receiver.header;
      this._senderContents = sender.contents;
      this._receiverContents = receiver.contents;
  };

  Services.prototype.setMethod = function(m) {
      this._method = m;
  };

  Services.prototype.callMethod = function(sender_index,receiver_index) {
      this._method(sender_index, this._senderHeader, this._senderContents);
      this._method(receiver_index, this._receiverHeader, this._receiverContents);
  };

  Services.prototype.sender = function() {
      return this._senderContents.party;
  };

  Services.prototype.receiver = function() {
      return this._receiverContents.party;
  };

  Services.prototype.gainItem = function(item) {
      if(this.sender().hasItem(item)) {
        this.sender().gainItem(item, -1);
        this.receiver().gainItem(item, +1);
      }
  };

  Services.prototype.gainGold = function(value) {
      if(this.sender().gold() >= value) {
        this.sender().loseGold(value);
        this.receiver().gainGold(value);
      }
  };

  //============================================================================
  // ** Sender Class
  //============================================================================

  function Sender() {
      this.initialize.apply(this, arguments);
  }

  Sender.prototype = Object.create(Services.prototype);
  Sender.prototype.constructor = Sender;

  Sender.prototype.initialize = function(sender, receiver) {
      Services.prototype.initialize.call(this, sender, receiver);
      this._senderHeader = sender.header;
      this._senderContents = {'party': $gameParty};
  }

  Sender.prototype.callMethod = function(sender_index, receiver_index) {
      this._method(receiver_index, this._receiverHeader, this._receiverContents);
  };

  //============================================================================
  // ** Receiver Class
  //============================================================================

  function Receiver() {
      this.initialize.apply(this, arguments);
  }

  Receiver.prototype = Object.create(Sender.prototype);
  Receiver.prototype.constructor = Sender;

  Receiver.prototype.initialize = function(sender, receiver) {
        Sender.prototype.initialize.call(this, sender, receiver);
  }

  Receiver.prototype.sender = function() {
      return this._receiverContents.party;
  };

  Receiver.prototype.receiver = function() {
      return this._senderContents.party;
  };

  //============================================================================
  // ** DataManager
  //============================================================================

  DataManager.makeSavefileInfo2 = function(header,contents) {
      var info = {};
      info.globalId   = this._globalId;
      info.title      = $dataSystem.gameTitle;
      if(header && header.hasOwnProperty('characters')) {
        info.characters = header.characters;
        info.faces      = header.faces;
        info.playtime   = header.playtime;
      } else {
        info.characters = contents.party.charactersForSavefile();
        info.faces      = contents.party.facesForSavefile();
        info.playtime   = contents.system.playtimeText();
      }
      info.timestamp  = Date.now();
      return info;
  };

  //============================================================================
  // ** Stream Class (Static)
  //============================================================================

  Stream.makeSaveContents = function(data) {
      // A save data does not contain $gameTemp, $gameMessage, and $gameTroop.
      var contents = {};
      contents.system       = data.system;
      contents.screen       = data.screen;
      contents.timer        = data.timer
      contents.switches     = data.switches;
      contents.variables    = data.variables;
      contents.selfSwitches = data.selfSwitches;
      contents.actors       = data.actors;
      contents.party        = data.party;
      contents.map          = data.map;
      contents.player       = data.player;
      if(!!Imported.RS_SimpleLight) contents.lightConfig = RS.LightConfig.makeLightConfig();
      return contents;
  };

  // 세이브 파일 불러오기
  Stream.loadGameWithoutRescue = function(savefileId) {
      try {
          if(savefileId === Stream.RECEIVER ||
             savefileId === Stream.SENDER) {
            return {'header': "", "contents": {'party': $gameParty}};
          }
          var _header, _contents, json;
          json = StorageManager.load(savefileId);
          _header = DataManager.loadSavefileInfo(savefileId);
          _contents = JsonEx.parse(json);
          return {'header': _header, 'contents': _contents};

      } catch(e) {
        console.error(e);
      }
  };

  // 세이브 파일 저장하기
  Stream.saveGameWithoutRescue = function(savefileId, header, contents) {
      var json = JsonEx.stringify(this.makeSaveContents(contents));
      if (json.length >= 200000) {
          console.warn('Save data too big!');
      }
      StorageManager.save(savefileId, json);
      this._lastAccessedId = savefileId;

      var globalInfo = DataManager.loadGlobalInfo() || [];
      globalInfo[savefileId] = DataManager.makeSavefileInfo2(header, contents);
      DataManager.saveGlobalInfo(globalInfo);

      return true;
  };

  // 서비스 만들기
  Stream.createServices = function(sender, receiver) {
      this._services = new Services(sender, receiver);
      this._services.setMethod(this.saveGameWithoutRescue.bind(this));
  };

  // 전송자 만들기
  Stream.createSender = function(sender, receiver) {
      this._services = new Sender(sender, receiver);
      this._services.setMethod(this.saveGameWithoutRescue.bind(this));
  };

  // 수신자 만들기
  Stream.createReceiver = function(sender, receiver) {
      this._services = new Receiver(sender, receiver);
      this._services.setMethod(this.saveGameWithoutRescue.bind(this));
  };

  // 서비스 호출
  // callServices
  Stream.callServices = function(sender_index, receiver_index) {
      this._services.callMethod(sender_index, receiver_index);
  };

  // 서비스 종료
  Stream.destroyServices = function() {
      this._services = null;
  };

  // 서비스 선택
  Stream.selectServices = function(index, sender, receiver) {
      switch (index) {
        // 다른 세이브 파일에서 아이템 받기
        case Stream.RECEIVER:
          this.createReceiver(sender, receiver);
          break;
        // 자신이 가지고 있는 아이템 전송
        case Stream.SENDER:
          this.createSender(sender, receiver);
          break;
        // 세이브파일 간의 전송
        default:
          this.createServices(sender, receiver);
      }
  };

  // 아이템 전송
  Stream.sendItem = function(sender_index, receiver_index, sym, id) {
      try {

          var sender, receiver;
          sender = this.loadGameWithoutRescue(sender_index);
          receiver = this.loadGameWithoutRescue(receiver_index);
          this.selectServices(sender_index, sender, receiver);

          switch (sym) {
            case 'gold':
              // console.log('test1');
              this._services.gainGold(id);
              break;
            case 'item':
              this._services.gainItem($dataItems[id]);
              break;
            case 'weapon':
              this._services.gainItem($dataWepons[id]);
              break;
            case 'armor':
              this._services.gainItem($dataArmors[id]);
              break;
          }

          // console.log('test2');
          this.callServices(sender_index, receiver_index);
          // console.log('test3');
          this.destroyServices();

      } catch(err) {
          console.error(err);
      }
  };

  /**
   * @method sendItem
   * @param save_file1 {Number} 전송할 아이템이 있는 세이브 파일의 번호를 지정합니다.
   * -1 을 지정하면 다른 세이브 파일에서 아이템을 가져오고,
   * 0 을 지정하면 자신의 아이템을 다른 세이브 파일로 보내게 됩니다.
   * @param save_file2 {Number}  아이템을 받을 세이브 파일의 번호를 지정합니다.
   * @param item_id {Number} item_id : 아이템의 아이디값을 나타내는 인자입니다.
   */
  Game_Interpreter.prototype.sendItem = function(save_file1,save_file2,item_id) {
      Stream.sendItem(save_file1, save_file2, 'item', item_id);
  };

  /**
   * @method sendWeapon
   * @param save_file1 {Number} 전송할 아이템이 있는 세이브 파일의 번호를 지정합니다.
   * -1 을 지정하면 다른 세이브 파일에서 아이템을 가져오고,
   * 0 을 지정하면 자신의 아이템을 다른 세이브 파일로 보내게 됩니다.
   * @param save_file2 {Number}  아이템을 받을 세이브 파일의 번호를 지정합니다.
   * @param item_id {Number} item_id : 아이템의 아이디값을 나타내는 인자입니다.
   */
  Game_Interpreter.prototype.sendWeapon = function(save_file1,save_file2,item_id) {
      Stream.sendItem(save_file1, save_file2, 'weapon', item_id);
  };

  /**
   * @method sendArmor
   * @param save_file1 {Number} 전송할 아이템이 있는 세이브 파일의 번호를 지정합니다.
   * -1 을 지정하면 다른 세이브 파일에서 아이템을 가져오고,
   * 0 을 지정하면 자신의 아이템을 다른 세이브 파일로 보내게 됩니다.
   * @param save_file2 {Number}  아이템을 받을 세이브 파일의 번호를 지정합니다.
   * @param item_id {Number} item_id : 아이템의 아이디값을 나타내는 인자입니다.
   */
  Game_Interpreter.prototype.sendArmor = function(save_file1,save_file2,item_id) {
      Stream.sendItem(save_file1, save_file2, 'armor', item_id);
  };

  /**
   * @method sendGold
   * @param save_file1 {Number} 골드를 소유하고 있는 세이브 파일의 번호를 지정합니다.
   * -1 을 지정하면 다른 세이브 파일에서 골드를 가져오고,
   * 0 을 지정하면 자신의 골드를 다른 세이브 파일로 보냅니다.
   * @param save_file2 {Number} 골드를 전송 받을 세이브 파일의 번호를 지정합니다.
   * @param value {Number} 보낼 골드의 값을 기입하세요.
   */
  Game_Interpreter.prototype.sendGold = function(save_file1, save_file2, value) {
      Stream.sendItem(save_file1, save_file2, 'gold', value);
  };

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Stream") {
      switch (args[0].toLowerCase()) {
      case 'send':
        var methodName = 'send' + args[1].slice(0,1).toUpperCase() + args[1].slice(1).toLowerCase();
        if(!!this[methodName]) {
          this[methodName].call(this, Stream.SENDER, Number(args[2]), Number(args[3]));
        }
        break;
      case 'bring':
        var methodName = 'send' + args[1].slice(0,1).toUpperCase() + args[1].slice(1).toLowerCase();
        if(!!this[methodName]) {
          this[methodName].call(this, Stream.RECEIVER, Number(args[2]), Number(args[3]));
        }
        break;
      }
    }
  };

})();
