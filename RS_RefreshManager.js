//================================================================
// RS_RefreshManager.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to change the plugin configuration during the game. <RS_RefreshManager>
 * @author biud436
 *
 * @param Save File ID
 * @type number
 * @desc Specify the filename that saves the current game status.
 * @default 1
 *
 * @param Show Preview Window
 * @type boolean
 * @desc if true, the preview window will file's contents show after saving the file named plugins.js
 * @default false
 *
 * @param Auto Reload
 * @type boolean
 * @desc Loads a map faster after saving the file named plugins.js
 * @default true
 *
 * @param Auto closing time
 * @type number
 * @desc The preview window can be hided automatically after some seconds take.
 * (1000ms = 1s)
 * @default 2500
 *
 * @param Target Path
 * @desc Specify the file path that is saved the plugin configuration.
 * @default /js/plugins.js
 *
 * @param Save Path
 * @desc Specify the file path that would be saved the plugin configuration.
 * @default /js/plugins.js
 *
 * @help
 * This plugin allows you to change the plugin configuration during the game.
 * You can change the configuration of a specific plugin that didn't use during
 * the game without restarting the program.
 *
 * To change a plugin configuration scene, you need to call below plugin command.
 *
 *    RefreshManager open
 *
 * it can create a new plugin configuration and then it loads a map faster without
 * starting the title scene.
 *
 * Note that this tool can be used only in PC platform and this tool is for game
 * developers, not game user.
 *
 * If you change a plugin configuration without selecting the plugin in the plugin
 * configuration window, You must call the script code, as follows.
 *
 * PluginManager.refreshStatus("Community_Basic", false);
 *
 * In the script command,
 * if you are execute it safety after exiting the current event, you can call below code blocks.
 *
 * setTimeout(function() { PluginManager.refreshStatus("Community_Basic", false); }, 0);
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.05.16 (v0.0.1) - Beta
 * 2016.05.23 (v1.0.0) - Added new function and Fixed a bug.
 * 2016.05.23 (v1.1.0) - Added the window auto reload function and the preview
 * window that could be able to show the json file.
 * 2016.07.12 (v1.1.01) - Added two plugin parameters about File Path.
 * 2016.07.20 (v1.1.02) - Added hyphen(-) and three plugin parameters.
 * 2016.07.21 (v1.1.03) - Fixed the bug that is separating wrong identifier.
 * 2016.07.25 (v1.1.04) - Fixed default save file id.
 * 2016.08.07 (v1.1.05) - Fixed save bug.
 * 2016.12.08 (v1.1.08) - Added code to remove references to URL objects.
 * 2017.01.08 (v1.1.1) - Converted sources to ES6
 * 2018.02.27 (v1.1.2) : (RMMV 1.6.0)
 * - Now that it will be restored as the previous plugins.js file after exiting the game.
 * - Fixed an encoding of of text in the preview window.
 * 2019.09.19 (v1.2.0) :
 * - Fixed the bug that is not parsed the plugin parameter that is written with Korean.
 * - Removed the unstable JSON parser that I've written while studying the compiler theory.
 * 2020.01.13 (v1.2.1) :
 * - Fixed the bug that is not working a function called 'PluginManager.refreshStatus("Community_Basic", false);'
 * - Fixed the issue that can't show the content of preview window.
 */
/*:ko
 * @plugindesc 플러그인 구성 파일을 게임 실행 도중 변경합니다. <RS_RefreshManager>
 * @author 러닝은빛(biud436)
 *
 * @param Save File ID
 * @text 세이브 파일 ID
 * @type number
 * @desc 현재 게임 상태를 저장하기 위한 세이브 파일의 이름을 지정하세요.
 * @default 1
 *
 * @param Show Preview Window
 * @text 미리보기 창 보기
 * @type boolean
 * @desc 설정 변경 이후 미리보기 창에 js/plugins.js 내용을 표시합니다.
 * @default false
 *
 * @param Auto Reload
 * @text 자동으로 다시 불러오기
 * @type boolean
 * @desc 게임을 재시작하고 자동으로 동일한 지점으로 복귀합니다.
 * @default true
 *
 * @param Auto closing time
 * @text 미리보기 창 닫기 딜레이
 * @type number
 * @desc 미리보기 창이 몇 초후에 자동으로 숨겨집니다.
 * (1000ms = 1초)
 * @default 2500
 *
 * @param Target Path
 * @text 타겟 경로
 * @desc 플러그인 구성 파일의 경로를 지정하십시오.
 * @default /js/plugins.js
 *
 * @param Save Path
 * @text 저장 경로
 * @desc 플러그인 구성 파일을 저장 할 경로를 지정하십시오.
 * @default /js/plugins.js
 *
 * @help
 * 이 플러그인을 사용하면 게임 실행 도중에 플러그인 구성 파일을 변경할 수 있으며,
 * 게임 프로그램을 종료하지 않고 게임 도중에 특정 플러그인의 사용 여부를 변경할 수 있습니다.
 * 이 플러그인은 PC 플랫폼에서만 동작합니다.
 *
 * =============================================================================
 * 플러그인 명령에 대해...
 * =============================================================================
 * 다음 플러그인 명령을 호출하면 RefreshManager가 열립니다.
 *
 * RefreshManager open
 *
 * 플러그인 설정 변경은 RefreshManager에서 가능합니다.
 *
 * 수동으로 변경하시려면 다음과 같이 하시기 바랍니다.
 *
 * PluginManager.setStatus(pluginName, status);
 *
 * 예를 들면, 다음과 같습니다.
 *  ex) PluginManager.refreshStatus("Community_Basic", false);
 *
 * 스크립트 커맨드에서 현재 실행 중인 이벤트가 종료된 후, 코드를 실행하려면 아래와 같이 하세요.
 *
 * setTimeout(function() { PluginManager.refreshStatus("Community_Basic", false); }, 0);
 *
 */

var Imported = Imported || {};
Imported.RS_RefreshManager = true;

var RS = RS || {};

(function () {
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_RefreshManager>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  let fastLoadFileId = Number(parameters['Save File ID'] || 1);
  let nClosingTime = Number(parameters['Auto closing time'] || 2500);
  let isPreviewWindow = Boolean(parameters['Show Preview Window'] === 'true');
  let isAutoReload = Boolean(parameters['Auto Reload'] === 'true');
  let _previewWindow = null;

  let fs = require('fs');

  class RefreshManager {
    static localFilePath(fileName) {
      if (!Utils.isNwjs()) return '';
      var path, base;
      path = require('path');
      base = path.dirname(process.mainModule.filename);
      return path.join(base, fileName);
    }

    static makeTempPlugins() {
      let self = this;
      let path = this.localFilePath(self._savePath);
      let tempPath = this.localFilePath(
        self._savePath.replace('plugins', 'temp_plugins')
      );
      fs.readFile(path, function (err, data) {
        if (err) throw err;
        fs.writeFile(tempPath, data, function (err) {
          if (err) throw err;
        });
      });
    }

    static restoreTempPlugins() {
      let self = this;
      let path = this.localFilePath(
        self._savePath.replace('plugins', 'temp_plugins')
      );
      let tempPath = this.localFilePath(self._savePath);
      fs.readFile(path, function (err, data) {
        if (err) throw err;
        fs.writeFile(
          tempPath,
          data,
          { encoding: 'utf8', mode: 0o666, flag: 'w+' },
          function (err) {
            if (err) throw err;
            fs.unlink(path, function (err) {
              if (err) throw err;
            });
          }
        );
      });
    }

    static makePlugins(texts) {
      let self = this;
      let path = this.localFilePath(self._savePath);
      fs.writeFile(path, texts, function (err) {
        if (err) throw new Error(err);
        let finText = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title></title>
          </head>
          <body>
            <pre>${texts}</pre>
          </body>
        </html>
        `;
        let blob = new Blob([finText], {
          endings: 'native',
          type: 'text/html;charset=utf-8',
        });
        let url = URL.createObjectURL(blob);
        if (isPreviewWindow) {
          _previewWindow = window.open(url, '_blank');
          _previewWindow.onclose = function () {
            URL.revokeObjectURL(this.location.href);
          };
        }
        RefreshManager._changed = true;
      });
    }

    static isChanged() {
      let self = this;
      return self._changed;
    }
  }

  RefreshManager._path = parameters['Target Path'] || '/js/plugins.js';
  RefreshManager._savePath = parameters['Save Path'] || '/js/plugins.js';

  //============================================================================
  // PluginManager
  //
  //

  /**
   * 이 함수는 변경된 플러그인의 상태를 plugins.js 파일에 반영합니다.
   * 하지만 변경된 플러그인의 내용은 게임 프로그램을 완전히 재시작해야만 반영됩니다.
   * @param  {String} pluginName
   * @param  {Boolean} status
   */
  PluginManager.setStatus = function (pluginName, status) {
    for (var i in $plugins) {
      if ($plugins[i]['name'] === pluginName) {
        $plugins[i]['status'] = status;
      }
    }

    RefreshManager.makePlugins(
      'var $plugins = \r\n' + JSON.stringify($plugins, null, '\t')
    );
  };

  /**
   * plugins.js 파일을 수정하고 세이브 파일을 만든 후 게임을 완전히 재시작합니다.
   * 이전에 저장해뒀던 세이브 파일이 있으면 타이틀이 스킵되고 이전의 세이브 파일을 바로 로드합니다.
   * @param  {String} pluginName
   * @param  {Boolean} status
   */
  PluginManager.refreshStatus = function (pluginName, status) {
    PluginManager.setStatus(pluginName, status);
    $gameSystem.onBeforeSave();

    if (DataManager.saveRefreshGame(fastLoadFileId)) {
      StorageManager.cleanBackup(fastLoadFileId);

      setTimeout(function () {
        if (_previewWindow) {
          _previewWindow.close();
        }

        RefreshManager._changed = false;

        if (_previewWindow) {
          _previewWindow = null;
        }

        window.location.reload();
      }, nClosingTime);
    }
  };

  //============================================================================
  // Window_PluginDesc
  //
  //

  class Window_PluginDesc extends Window_Help {
    constructor(numLines) {
      super(numLines);
    }
    processNormalCharacter(textState) {
      let w = this.textWidth(textState.text[textState.index]);
      if (textState.x + w * 2 >= this.contentsWidth()) {
        textState.index--;
        this.processNewLine(textState);
      }
      super.processNormalCharacter(textState);
    }
    textWidthEx(text) {
      return this.drawTextEx.call(this, text, 0, this.contents.height);
    }
  }

  //============================================================================
  // Window_PluginManager
  //
  //

  class Window_PluginManager extends Window_Selectable {
    constructor(x, y) {
      super(
        x,
        y,
        Graphics.boxWidth,
        Graphics.boxHeight - Window_Base.prototype.fittingHeight(2)
      );
      this._data = [];
      this._index = 0;
      this.initToken();
    }

    initToken() {
      let _this = this;

      for (var i in $plugins) {
        var plugin = $plugins[i];
        this._data.push({
          name: { text: plugin['name'] },
          status: { text: plugin['status'].toString() },
          description: { text: plugin['description'] },
        });
      }

      this.refresh();
      this.activate();
    }

    windowWidth() {
      return Graphics.boxWidth;
    }

    windowHeight() {
      return Graphics.boxHeight - this.fittingHeight(2);
    }

    maxItems() {
      if (this._data) {
        return this._data.length;
      } else {
        return 1;
      }
    }

    item(index) {
      if (this._data) {
        return this._data[index];
      } else {
        return {
          name: { text: 'No Plugin' },
          status: { text: 'false' },
          description: { text: 'No Description' },
        };
      }
    }

    itemHeight() {
      let clientHeight = this.height - this.padding * 2;
      return Math.floor(clientHeight / this.numVisibleRows());
    }

    numVisibleRows() {
      return 8;
    }

    drawItem(index) {
      this.drawScript(index);
    }

    drawScript(index) {
      let rect = this.itemRect(index);
      let item = this.item(index);
      this.drawText(item.name.text, rect.x, rect.y, rect.width, 'left');
      this.drawText(item.status.text, rect.x, rect.y, rect.width, 'right');
    }

    processOk() {
      try {
        let item, name, enabled;
        if (this.isCurrentItemEnabled()) {
          this.playOkSound();
          this.updateInputData();
          this.callOkHandler();
          item = this.item(this.index());
          name = item.name.text;
          enabled = item.status.text !== 'true';
          item.status.text = enabled.toString();
          PluginManager.setStatus(name, enabled);
        } else {
          this.playBuzzerSound();
        }
      } catch (e) {}
    }

    drawScript(index) {
      let rect = this.itemRect(index);
      let item = this.item(index);
      this.changeTextColor(this.normalColor());
      this.drawText(item.name.text, rect.x, rect.y, rect.width, 'left');
      if (item.status.text === 'true') {
        this.changeTextColor(this.mpGaugeColor1());
      } else {
        this.changeTextColor(this.hpGaugeColor1());
      }
      this.drawText(item.status.text, rect.x, rect.y, rect.width, 'right');
    }

    select(index) {
      super.select(index);
      try {
        let item = this.item(this.index());
        let name = item.name.text;
        let description = item.description.text;
        this._helpWindow.setText(description);
      } catch (e) {}
    }
  }

  //============================================================================
  // Scene_PluginManager
  //
  //

  class Scene_PluginManager extends Scene_Base {
    constructor() {
      super();
    }

    create() {
      super.create();
      this.createBackground();
      this.createWindowLayer();
      this.createAllWindows();
    }

    start() {
      super.start();
    }

    update() {
      super.update();
      if (RefreshManager.isChanged() && this._windowPluginManager) {
        this._windowPluginManager.activate();
        this._windowPluginManager.refresh();
        this.onSavefileOk();
        RefreshManager._changed = false;
      }
    }

    terminate() {
      super.terminate();
      this._windowLayer.removeChild(this._windowPluginManager);

      this._windowPluginManager = null;
    }

    createBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
    }

    createAllWindows() {
      this._helpWindow = new Window_PluginDesc(2);
      this._windowPluginManager = new Window_PluginManager(
        0,
        this._helpWindow.y + this._helpWindow.height + 1
      );
      this._windowPluginManager.setHelpWindow(this._helpWindow);
      this._windowPluginManager.setHandler('ok', this.onButtonOk.bind(this));
      this._windowPluginManager.setHandler('cancel', this.onCancel.bind(this));
      this._windowLayer.addChild(this._helpWindow);
      this._windowLayer.addChild(this._windowPluginManager);

      this._windowPluginManager.select(0);
    }

    onButtonOk() {}

    onCancel() {
      this.popScene();
    }

    onSavefileOk() {
      $gameSystem.onBeforeSave();
      if (DataManager.saveRefreshGame(fastLoadFileId)) {
        this.onSaveSuccess();
        if (_previewWindow) {
          setTimeout(function () {
            _previewWindow.close();

            if (isAutoReload) window.location.reload();

            _previewWindow = null;

            RefreshManager._counter++;
          }, nClosingTime);
        } else {
          // Decide whether or not to reload the game.
          if (isAutoReload) window.location.reload();
        }
      } else {
        this.onSaveFailure();
      }
    }

    onSaveSuccess() {
      SoundManager.playSave();
      StorageManager.cleanBackup(fastLoadFileId);
      this.popScene();
    }

    onSaveFailure() {
      SoundManager.playBuzzer();
    }

    static onLoadfileOk(fastLoadFileId) {
      if (DataManager.loadGame(fastLoadFileId)) {
        this.onLoadSuccess();
      } else {
        this.onLoadFailure();
      }
    }

    static onLoadSuccess() {
      Scene_PluginManager.reloadMapIfUpdated();
      SceneManager.goto(Scene_Map);
      $gameSystem.onAfterLoad();
      try {
        if (StorageManager.exists(fastLoadFileId)) {
          StorageManager.remove(fastLoadFileId);
        }
      } catch (e) {}
    }

    static onLoadFailure() {
      SoundManager.playBuzzer();
    }

    static reloadMapIfUpdated() {
      if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer(
          $gameMap.mapId(),
          $gamePlayer.x,
          $gamePlayer.y
        );
        $gamePlayer.requestMapReload();
      }
    }
  }

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'RefreshManager') {
      switch (args[0]) {
        case 'open':
          SceneManager.push(Scene_PluginManager);
          break;
      }
    }
  };

  //============================================================================
  // Game_Temp
  //
  //

  Game_Temp.prototype.setRefreshMode = function (b) {
    this._refreshMode = b;
  };

  Game_Temp.prototype.isRefreshMode = function () {
    return this._refreshMode;
  };

  //============================================================================
  // DataManager
  //
  //

  var alias_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
  DataManager.makeSavefileInfo = function () {
    var info = alias_DataManager_makeSavefileInfo.call(this);
    if ($gameTemp.isRefreshMode()) info.refresh = true;
    return info;
  };

  DataManager.saveRefreshGame = function (fastLoadFileId) {
    $gameTemp.setRefreshMode(true);
    return DataManager.saveGame(fastLoadFileId);
  };

  DataManager.existsRefreshVariable = function (saveFileId) {
    var info = DataManager.loadSavefileInfo(saveFileId);
    if (info && info.refresh) {
      return true;
    } else {
      return false;
    }
  };

  //============================================================================
  // Scene_Boot
  //
  //

  var alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    if (
      DataManager.existsRefreshVariable(fastLoadFileId) &&
      StorageManager.exists(fastLoadFileId)
    ) {
      Scene_Base.prototype.start.call(this);
      SoundManager.preloadImportantSounds();
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      Scene_PluginManager.onLoadfileOk(fastLoadFileId);
      document.title = $dataSystem.gameTitle;
    } else {
      RefreshManager.makeTempPlugins();
      alias_Scene_Boot_start.call(this);
    }
  };

  var _nw = require('nw.gui');
  var win = _nw.Window.get();
  _nw.Window.get().on('close', function () {
    this.hide();
    this.close(true);
  });

  window.RefreshManager = RefreshManager;
})();
