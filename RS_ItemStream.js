/*:
 * RS_ItemStream.js
 * @plugindesc This plugin sends an item to the save-file or gets an item from the save-file.
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
 * 2016.04.24 (v1.0.2) - Fixed a bug
 * 2017.01.23 (v1.0.3) - Converted sources to ES6
 */

var Imported = Imported || {};
Imported.RS_ItemStream = true;

(function() {

  "use strict";

  //============================================================================
  // ** Services Class
  //============================================================================

  class Services {

    constructor(sender, receiver) {
      this._senderHeader = sender.header;
      this._receiverHeader = receiver.header;
      this._senderContents = sender.contents;
      this._receiverContents = receiver.contents;
    }

    setMethod(m) {
      this._method = m;
    }

    callMethod(sender_index,receiver_index) {
      this._method(sender_index, this._senderHeader, this._senderContents);
      this._method(receiver_index, this._receiverHeader, this._receiverContents);
    }

    sender() {
      return this._senderContents.party;
    }

    receiver() {
      return this._receiverContents.party;
    }

    gainItem(item) {
      if(this.sender().hasItem(item)) {
        this.sender().gainItem(item, -1);
        this.receiver().gainItem(item, +1);
      }
    }

    gainGold(value) {
      if(this.sender().gold() >= value) {
        this.sender().loseGold(value);
        this.receiver().gainGold(value);
      }
    }

  }

  //============================================================================
  // ** Sender Class
  //============================================================================

  class Sender extends Services {

    constructor(sender, receiver) {
      super(sender, receiver);
      this._senderHeader = sender.header;
      this._senderContents = {'party': $gameParty};
    }

    callMethod(sender_index, receiver_index) {
      this._method(receiver_index, this._receiverHeader, this._receiverContents);
    }

  }

  //============================================================================
  // ** Receiver Class
  //============================================================================

  class Receiver extends Sender {

    constructor(sender, receiver) {
      super(sender, receiver);
    }

    sender() {
      return this._receiverContents.party;
    }

    receiver() {
      return this._senderContents.party;
    }

  }

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

  class Stream {

    static makeSaveContents(data) {
      let contents = {};
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
    }

    static loadGameWithoutRescue(savefileId) {
      try {
          if(savefileId === Stream.RECEIVER ||
             savefileId === Stream.SENDER) {
            return {'header': "", "contents": {'party': $gameParty}};
          }
          let _header, _contents, json;
          json = StorageManager.load(savefileId);
          _header = DataManager.loadSavefileInfo(savefileId);
          _contents = JsonEx.parse(json);
          return {'header': _header, 'contents': _contents};

      } catch(e) {
        console.error(e);
      }
    }

    static saveGameWithoutRescue(savefileId, header, contents) {

      let json = JsonEx.stringify(this.makeSaveContents(contents));

      if (json.length >= 200000) {
          console.warn('Save data too big!');
      }

      StorageManager.save(savefileId, json);
      this._lastAccessedId = savefileId;

      let globalInfo = DataManager.loadGlobalInfo() || [];
      globalInfo[savefileId] = DataManager.makeSavefileInfo2(header, contents);
      DataManager.saveGlobalInfo(globalInfo);

      return true;
    }

    static createServices(sender, receiver) {
      this._services = new Services(sender, receiver);
      this._services.setMethod(this.saveGameWithoutRescue.bind(this));
    }

    static createSender(sender, receiver) {
      this._services = new Sender(sender, receiver);
      this._services.setMethod(this.saveGameWithoutRescue.bind(this));
    }

    static createReceiver(sender, receiver) {
      this._services = new Receiver(sender, receiver);
      this._services.setMethod(this.saveGameWithoutRescue.bind(this));
    }

    static callServices(sender_index, receiver_index) {
      this._services.callMethod(sender_index, receiver_index);
    }

    static destroyServices() {
      this._services = null;
    }

    static selectServices(index, sender, receiver) {
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
    }

    static sendItem(sender_index, receiver_index, sym, id) {
      try {

          let sender, receiver;
          sender = this.loadGameWithoutRescue(sender_index);
          receiver = this.loadGameWithoutRescue(receiver_index);
          this.selectServices(sender_index, sender, receiver);

          switch (sym) {
            case 'gold':
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

          this.callServices(sender_index, receiver_index);
          this.destroyServices();

      } catch(err) {
          console.error(err);
      }
    }

  }

  Stream.RECEIVER = -1;
  Stream.SENDER = 0;

  //============================================================================
  // ** Game_Interpreter
  //============================================================================

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
