//================================================================
// RS_WinTray.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin provides a function that minimizes to system tray.
 * @author biud436
 *
 * @param url
 * @desc
 * @default http://www.google.com/
 *
 * @param --- Tray Menu
 *
 * @param Open
 * @parent --- Tray Menu
 * @desc
 * @default Open
 * @type text
 *
 * @param tooltip
 * @parent --- Tray Menu
 * @desc
 * @default tooltip
 * @type text
 *
 * @param Minimize To Tray
 * @parent --- Tray Menu
 * @desc
 * @default To Tray
 * @type text
 *
 * @param Window Always On Top
 * @parent --- Tray Menu
 * @desc
 * @default Window Always On Top
 * @type text
 *
 * @param Show Internet
 * @parent --- Tray Menu
 * @desc
 * @default Open URL
 * @type text
 *
 * @param Exit
 * @parent --- Tray Menu
 * @desc
 * @default Game Exit
 * @type text
 *
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.21 (v1.0.0) - First Release.
 * 2016.12.28 (v1.0.1) - Fixed a bug that a previous tray will remain after reloading the window.
 * 2018.02.27 (v1.0.2) - Changed the source code for RMMV 1.6.0.
 */
/*:ko
 * @plugindesc nw.js의 Tray 메뉴 기능을 플러그인으로 구현하였습니다.
 * @author 러닝은빛(biud436)
 *
 * @param url
 * @text 주소
 * @desc 링크 버튼이 눌리면 여기 입력된 주소를 시스템 기본 브라우저로 띄웁니다.
 * @default http://www.google.com/
 *
 * @param --- Tray Menu
 * @text 트레이 메뉴
 *
 * @param Open
 * @type text
 * @text 열기
 * @parent --- Tray Menu
 * @desc '열기' 버튼의 이름을 수정합니다. (열기 버튼을 누르면 게임 창이 뜹니다)
 * @default 열기
 *
 * @param tooltip
 * @type text
 * @text 툴팁
 * @parent --- Tray Menu
 * @desc 트레이 아이콘에 마우스를 올렸을 때 표시될 툴팁 메시지를 적으세요.
 * @default 더블 클릭하면 창을 띄울 수 있습니다.
 *
 * @param Minimize To Tray
 * @type text
 * @text 트레이로 최소화
 * @parent --- Tray Menu
 * @desc 트레이로 최소화 버튼의 이름을 수정합니다.
 * @default 트레이로 최소화
 *
 * @param Window Always On Top
 * @type text
 * @text 항상 위에
 * @parent --- Tray Menu
 * @desc 항상 위에 버튼의 이름을 수정합니다.
 * @default 항상 위에
 *
 * @param Show Internet
 * @type text
 * @text 링크
 * @parent --- Tray Menu
 * @desc 링크 버튼의 이름을 수정합니다.
 * @default 버그 문의 및 공식 카페
 *
 * @param Exit
 * @type text
 * @text 종료
 * @parent --- Tray Menu
 * @desc 게임 종료 버튼의 이름을 수정합니다.
 * @default 게임 종료
 *
 * @help
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.01.21 (v1.0.0) - First Release.
 * 2016.12.28 (v1.0.1) - Fixed a bug that a previous tray will remain after reloading the window.
 * 2018.02.27 (v1.0.2) - Changed the source code for RMMV 1.6.0.
 */


var Imported = Imported || {};
var RS = RS || {};
RS.Tray = RS.Tray || {};
RS.Tray.Params = RS.Tray.Params || {};
Imported.RS_WinTray = true;

function Tray() {
    this.initialize.apply(this, arguments);
}

(function($) {

  if(typeof require === 'undefined') return false;

  // Tray Menu
  var parameters = PluginManager.parameters('RS_WinTray');

  $.menuString = {
    'open': parameters['Open'],
    'tooltip': parameters['tooltip'],
    'url': parameters['url'],
    'minimize_to_tray': parameters['Minimize To Tray'],
    'window_always_on_top': parameters['Window Always On Top'],
    'show_internet': parameters['Show Internet'],
    'exit': parameters['Exit']
  }

  Tray.prototype.initialize = function() {
      this.initMembers();
      this.initTray();
      this.setupMenu();
  };

  Tray.prototype.initMembers = function() {
      var self = this;
      // In RMMV 1.6.0,
      // All NW specific APIs, including require() is moved into a nw object from the nw.gui library.
      var gui;
      if(Utils.RPGMAKER_VERSION >= "1.6.0") {
        gui = nw;
      } else {
        gui = require('nw.gui');
      }
      this._path = this.setupPath();
      this._win = gui.Window.get();
      this._tray = new gui.Tray({icon: self._path + 'icon.png' });
      this._menu = new gui.Menu();
      this._status = false;
  };

  $.localFilePath = function () {
    if(!Utils.isNwjs()) return '';
    var path, base;
    path = require('path');
    base = path.dirname(process.mainModule.filename);
    return path.join(base, 'icon/');
  };

  Tray.prototype.setupPath = function () {
      if(Utils.RPGMAKER_VERSION >= "1.6.0") return $.localFilePath();
      var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/icon/');
      if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
      }
      return decodeURIComponent(path);
  };

  Tray.prototype.initTray = function () {
      var self = this;
      this._tray.menu = this._menu;
      this._tray.tooltip = $.menuString['tooltip'];
      this._tray.on('click', function() {
        self._menu.items[0].click();
      });
      this._tray.on('close', function () {
        if(self._tray) {
          self._tray.remove();
          self._tray = null;
        }
      });
  };

  Tray.prototype.setupMenu = function () {

    var self = this;
    var gui;
    if(Utils.RPGMAKER_VERSION >= "1.6.0") {
      gui = nw;
    } else {
      gui = require('nw.gui');
    }

    self._menu.append(new gui.MenuItem({
      type: 'normal',
      label: $.menuString['open'],
      click: function() {
        self._win.show();
        self._win.focus();
      }
    }));

    self._menu.append(new gui.MenuItem({
      type: 'checkbox',
      label:  $.menuString['minimize_to_tray'],
      click: function () {
        if(this.checked) {
          self._win.hide();
        } else {
          self._win.show();
          self._win.focus();
        }
      }
    }));

    self._menu.append(new gui.MenuItem({
      type: 'checkbox',
      label: $.menuString['window_always_on_top'],
      click: function() {
        self._win.setAlwaysOnTop(this.checked);
      }
    }));

    self._menu.append(new gui.MenuItem({
      type: 'normal',
      label: $.menuString['show_internet'],
      click: function() {
        var gui;
        if(Utils.RPGMAKER_VERSION >= "1.6.0") {
          gui = nw;
        } else {
          gui = require('nw.gui');
        }
        var shell = gui.Shell;
        shell.openExternal($.menuString['url']);
      }
    }));

    self._menu.append(new gui.MenuItem({
      type: 'normal',
      label: $.menuString['exit'],
      click: function() {
        if(self._tray) {
          self._tray.remove();
          self._tray = null;
        }
        if(self._win !== null) {
          self._win.close(true);
          self._win = null;
        }
      }
    }));

  };

  if(!RS.Tray.system) {
    RS.Tray.system = new Tray();
  }


})(RS.Tray.Params);
