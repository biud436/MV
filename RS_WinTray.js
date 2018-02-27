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
        var shell = require('nw.gui').Shell;
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
