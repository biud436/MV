/*:
 *
 * RS_WinTray.js (PC)
 *
 * @version 1.0
 * @date 2016.01.21
 *
 * @plugindesc 트레이로 최소화
 * @author biud436
 *
 * @param url
 * @desc 게임 제작자의 블로그를 네이티브 브라우저로
 * 띄우는 기능입니다
 * @default http://biud436.blog.me/
 *
 * @param --트레이 메뉴--
 * @default -
 *
 * @param tooltip
 * @desc 트레이 위에 마우스를 가져다대면 보이는 툴팁
 * @default 클릭하면 창이 다시 활성화 됩니다.
 *
 * @param Minimize To Tray
 * @desc 트레이로 최소화
 * @default 숨기기
 *
 * @param Show Window
 * @desc 윈도우 활성화
 * @default 활성화
 *
 * @param Window Always On Top
 * @desc 창을 항상 위로
 * @default 항상 위에
 *
 * @param Fullscreen
 * @desc 전체 화면
 * @default 전체 화면
 *
 * @param Show Internet
 * @desc 제작자 블로그 열기
 * @default 제작자 블로그 열기
 *
 * @param Exit
 * @desc 끝내기
 * @default 끝내기
 *
 */

(function() {

  // Private Members
  var parameters, path, gui, win, tray, menu;
  var _tooltip, _url, _minimize_to_tray, _show_window, _window_always_on_top;
  var _show_internet, _exit;

  // Tray Menu
  parameters = PluginManager.parameters('RS_WinTray');
  _tooltip = parameters['tooltip'];
  _url = parameters['url'];
  _minimize_to_tray = parameters['Minimize To Tray'];
  _show_window = parameters['Show Window'];
  _window_always_on_top = parameters['Window Always On Top'];
  _full_screen = parameters['Fullscreen'];
  _show_internet = parameters['Show Internet'];
  _exit = parameters['Exit'];

  /**
   * @function init
   */
  function initialize() {
    initMembers();
    initTray();
    setupMenu();
  }

  /**
   * @function initMembers
   */
  function initMembers() {


    path = setupPath();
    gui = require('nw.gui');
    win = gui.Window.get();
    tray = new gui.Tray({icon: path + 'icon.png' });
    menu = new gui.Menu();
  }

  /**
   * @function initPath
   */
  function setupPath() {
    // 아이콘 경로
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/icon/');
    if (path.match(/^\/([A-Z]\:)/)) {
      path = path.slice(1);
    }
    return decodeURIComponent(path);
  };

  /**
   * @function initTray
   */
  function initTray() {
    // initialize tray
    tray.menu = menu;
    tray.tooltip = _tooltip;
    tray.on('click', function() {
      win.show();
    });
  }

  /**
   * @function setupMenu
   */
  function setupMenu() {

    var menuItem = new gui.MenuItem({ type: 'normal', label: _minimize_to_tray});

    // 메뉴 추가
    menuItem.click = function() {
      if(this.label === _minimize_to_tray) {
        win.hide();
        this.label = _show_window;
      } else {
        win.show();
        this.label = _minimize_to_tray;
      }
    };

    menu.append(menuItem);

    menu.append(new gui.MenuItem({ type: 'checkbox', label: _window_always_on_top, click: function() {
        win.setAlwaysOnTop(this.checked);
      }
    }));

    menu.append(new gui.MenuItem({ type: 'checkbox', label: _full_screen, click: function() {
        win.isFullscreen = this.checked;
      }
    }));

    menu.append(new gui.MenuItem({ type: 'normal', label: _show_internet, click: function() {
        var shell = require('nw.gui').Shell;
        shell.openExternal(_url);
      }
    }));

    menu.append(new gui.MenuItem({ type: 'normal', label: _exit, click: function() {
        win.close();
      }
    }));
  };

  initialize();

})();
