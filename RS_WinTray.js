/*:
 * @plugindesc This plugin provides a function that minimizes to system tray.
 * @author biud436
 *
 * @param url
 * @desc game developer's website
 * @default http://www.google.com/
 *
 * @param --- Tray Menu
 * @desc
 * @default
 *
 * @param tooltip
 * @desc You can write a tooltip for the tray. When you place your
 * mouse on top of the tray's icon, the tooltip is shown.
 * @default Minimized window becomes active.
 *
 * @param Minimize To Tray
 * @desc you can edit a contents about the 'minimize to tray'
 * @default Active window becomes minimized to tray.
 *
 * @param Window Always On Top
 * @desc you can edit a contents about the 'Window Always On Top'
 * @default Window Always On Top
 *
 * @param Show Internet
 * @desc Show developer's website
 * @default Open URL
 *
 * @param Exit
 * @desc Game Exit
 * @default Game Exit
 *
 * @help
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.21 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_WinTray = true;

(function() {

  if(!Utils.isNwjs()) {
    return false;
  }

  // Private Members
  var parameters, path, gui, win, tray, menu;
  var _tooltip, _url, _minimize_to_tray, _show_window, _window_always_on_top;
  var _show_internet, _exit;

  // Tray Menu
  parameters = PluginManager.parameters('RS_WinTray');
  _tooltip = parameters['tooltip'];
  _url = parameters['url'];
  _minimize_to_tray = parameters['Minimize To Tray'];
  _window_always_on_top = parameters['Window Always On Top'];
  _show_internet = parameters['Show Internet'];
  _exit = parameters['Exit'];

  function initialize() {
    initMembers();
    initTray();
    setupMenu();
  }

  function initMembers() {
    path = setupPath();
    gui = require('nw.gui');
    win = gui.Window.get();
    tray = new gui.Tray({icon: path + 'icon.png' });
    menu = new gui.Menu();
  }

  // Icon Path
  function setupPath() {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/icon/');
    if (path.match(/^\/([A-Z]\:)/)) {
      path = path.slice(1);
    }
    return decodeURIComponent(path);
  }

  function initTray() {
    tray.menu = menu;
    tray.tooltip = _tooltip;
    tray.on('click', function() {
      win.show();
    });
  }

  function setupMenu() {

    // Create Tray Menu
    var menuItem = new gui.MenuItem({ type: 'checkbox', label: _minimize_to_tray});

    // Add Tray Menu
    menuItem.click = function() {

      if(this.checked) {
        win.hide();
      } else {
        win.show();
      }
    };

    menu.append(menuItem);

    // Add the button called always on top.
    menu.append(new gui.MenuItem({ type: 'checkbox', label: _window_always_on_top, click: function() {
        win.setAlwaysOnTop(this.checked);
      }
    }));

    // Add the button called show internet.
    menu.append(new gui.MenuItem({ type: 'normal', label: _show_internet, click: function() {
        var shell = require('nw.gui').Shell;
        shell.openExternal(_url);
      }
    }));

    // Add the button called exit
    menu.append(new gui.MenuItem({ type: 'normal', label: _exit, click: function() {
        win.close();
      }
    }));
  }

  initialize();

})();
