//================================================================
// RS_ItemStream.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin lets you send or receive gold or items to specific save files.
 * @author biud436
 *
 * @help
 * ===========================================================================
 * Plugin Command
 * ===========================================================================
 * With this plugin, you can send or receive gold or items to or from a specific save file.
 *
 * To send gold, use a command in the following format:
 *
 *  Stream Send Gold saveFileId gold_value
 *
 * saveFileId must be a numeric value. Use Stream Send to send and Stream Bring to receive.
 *
 * Send the weapon item to a specific save file.
 *  Stream Send Weapon saveFileId weapon_id
 *
 * Send the armor item to a specific save file.
 *  Stream Send Armor saveFileId armor_id
 *
 * Send the item to a specific save file.
 *  Stream Send Item saveFileId item_id
 *
 * Get the gold from a specific save file.
 *  Stream Bring Gold saveFileId gold_value
 *
 * Get the weapon item from a specific save file.
 *  Stream Bring Weapon saveFileId weapon_id
 *
 * Get the armor item from a specific save file.
 *  Stream Bring Armor saveFileId armor_id
 *
 * Get the item from a specific save file.
 *  Stream Bring Item saveFileId item_id
 *
 * Check the current gold in a specific save file.
 *  Stream Check Gold saveFileId
 *
 * Check the available items in a specific save file.
 *  Stream Check Item saveFileId
 *
 * Check the available weapons in a specific save file.
 *  Stream Check Weapon saveFileId
 *
 * Check the available armors in a specific save file.
 *  Stream Check Armor saveFileId
 *
 * Delete gold from a specific save file.
 *  Stream Delete Gold saveFileId gold_value
 *
 * Delete an item from a specific save file.
 *  Stream Delete Item saveFileId item_id
 *
 * Delete a weapon from a specific save file.
 *  Stream Delete Weapon saveFileId weapon_id
 *
 * Delete armor from a specific save file.
 *  Stream Delete Armor saveFileId armor_id
 *
 * Note: Ensure that saveFileId is a valid numeric ID and that the item, weapon, or armor IDs exist in the game data.
 * ===========================================================================
 * Change Log
 * ===========================================================================
 * 2016.03.07 (v1.0.0) - First Release.
 * 2016.03.22 (v1.0.1) - Compatibility fixes.
 * 2016.04.24 (v1.0.2) - Fixed the bug.
 * 2017.01.23 (v1.0.3) - Fixed the source code to ES6.
 */
/*:ko
 * @plugindesc 아이템이나 소유 금액을 다른 세이브 파일로 보내거나 받아올 수 있는 플러그인입니다.
 * @author biud436
 * @date 2016.03.07
 * @version 1.0.1
 *
 * @help
 * //===========================================================================
 * // Plugin Command
 * //===========================================================================
 *
 * 골드를 보냅니다
 * Stream Send Gold saveFileId gold_value
 *
 * 무기를 보냅니다.
 * Stream Send Weapon saveFileId weapon_id
 *
 * 방어구를 보냅니다
 * Stream Send Armor saveFileId armor_id
 *
 * 아이템을 보냅니다
 * Stream Send Item saveFileId item_id
 *
 * 골드를 가져옵니다
 * Stream Bring Gold saveFileId gold_value
 *
 * 무기를 가져옵니다
 * Stream Bring WeaponsaveFileId weapon_id
 *
 * 방어구를 가져옵니다
 * Stream Bring Armor saveFileId armor_id
 *
 * 아이템을 가져옵니다
 * Stream Bring Item saveFileId item_id
 *
 * //===========================================================================
 * // Change Log
 * //===========================================================================
 * 2016.03.07 (v1.0.0) - 공개
 * 2016.03.22 (v1.0.1) - 심플 라이트 플러그인과 호환되지 않는 오류를 수정했습니다.
 * 2016.04.24 (v1.0.2) - 버그를 수정했습니다.
 * 2017.01.23 (v1.0.3) - 소스 코드를 ES6 기준으로 변경하였습니다.
 */

(() => {
  'use strict';

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

    callMethod(sender_index, receiver_index) {
      this._method(sender_index, this._senderHeader, this._senderContents);
      this._method(
        receiver_index,
        this._receiverHeader,
        this._receiverContents
      );
    }

    sender() {
      return this._senderContents.party;
    }

    receiver() {
      return this._receiverContents.party;
    }

    gainItem(item) {
      if (this.sender().hasItem(item)) {
        this.sender().gainItem(item, -1);
        this.receiver().gainItem(item, +1);
      }
    }

    gainGold(value) {
      if (this.sender().gold() >= value) {
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
      this._senderContents = { party: $gameParty };
    }

    callMethod(sender_index, receiver_index) {
      this._method(
        receiver_index,
        this._receiverHeader,
        this._receiverContents
      );
    }
  }

  //============================================================================
  // ** Receiver Class
  //============================================================================

  class Receiver extends Sender {
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

  DataManager.makeSavefileInfo2 = function (header, contents) {
    const info = {};
    info.globalId = this._globalId;
    info.title = $dataSystem.gameTitle;
    if (header && 'characters' in header) {
      info.characters = header.characters;
      info.faces = header.faces;
      info.playtime = header.playtime;
    } else {
      info.characters = contents.party.charactersForSavefile();
      info.faces = contents.party.facesForSavefile();
      info.playtime = contents.system.playtimeText();
    }
    info.timestamp = Date.now();
    return info;
  };

  //============================================================================
  // ** Stream Class (Static)
  //============================================================================

  class Stream {
    static makeSaveContents(data) {
      const contents = {};
      contents.system = data.system;
      contents.screen = data.screen;
      contents.timer = data.timer;
      contents.switches = data.switches;
      contents.variables = data.variables;
      contents.selfSwitches = data.selfSwitches;
      contents.actors = data.actors;
      contents.party = data.party;
      contents.map = data.map;
      contents.player = data.player;

      return contents;
    }

    // eslint-disable-next-line consistent-return
    static loadGameWithoutRescue(savefileId) {
      try {
        if (savefileId === Stream.RECEIVER || savefileId === Stream.SENDER) {
          return { header: '', contents: { party: $gameParty } };
        }

        const json = StorageManager.load(savefileId);
        const _header = DataManager.loadSavefileInfo(savefileId);
        const _contents = JsonEx.parse(json);
        return { header: _header, contents: _contents };
      } catch (e) {
        console.error(e);
      }
    }

    static saveGameWithoutRescue(savefileId, header, contents) {
      const json = JsonEx.stringify(this.makeSaveContents(contents));

      if (json.length >= 200000) {
        console.warn('Save data too big!');
      }

      StorageManager.save(savefileId, json);
      this._lastAccessedId = savefileId;

      const globalInfo = DataManager.loadGlobalInfo() || [];
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
        const sender = this.loadGameWithoutRescue(sender_index);
        const receiver = this.loadGameWithoutRescue(receiver_index);
        this.selectServices(sender_index, sender, receiver);

        // eslint-disable-next-line default-case
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
      } catch (err) {
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
  Game_Interpreter.prototype.sendItem = function (
    save_file1,
    save_file2,
    item_id
  ) {
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
  Game_Interpreter.prototype.sendWeapon = function (
    save_file1,
    save_file2,
    item_id
  ) {
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
  Game_Interpreter.prototype.sendArmor = function (
    save_file1,
    save_file2,
    item_id
  ) {
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
  Game_Interpreter.prototype.sendGold = function (
    save_file1,
    save_file2,
    value
  ) {
    Stream.sendItem(save_file1, save_file2, 'gold', value);
  };

  const alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'Stream') {
      // eslint-disable-next-line default-case
      switch (args[0].toLowerCase()) {
        case 'send':
          {
            const methodName = `send${args[1]
              .slice(0, 1)
              .toUpperCase()}${args[1].slice(1).toLowerCase()}`;
            if (this[methodName]) {
              this[methodName].call(
                this,
                Stream.SENDER,
                Number(args[2]),
                Number(args[3])
              );
            }
          }
          break;
        case 'bring':
          {
            const methodName = `send${args[1]
              .slice(0, 1)
              .toUpperCase()}${args[1].slice(1).toLowerCase()}`;
            if (this[methodName]) {
              this[methodName].call(
                this,
                Stream.RECEIVER,
                Number(args[2]),
                Number(args[3])
              );
            }
          }
          break;
      }
    }
  };
})();
