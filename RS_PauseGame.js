//================================================================
// RS_PauseGame.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2017 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows user to pause the game. <RS_PauseGame>
 * @author biud436
 *
 * @param keyCode
 * @text Key Name
 * @desc Specify the Key Name
 * (Please refer to help documentation!)
 * @default p
 *
 * @param Pause Image Src
 * @desc Specify an image path
 * @default pause
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Notification
 * @text Notification (>= v1.6.1+)
 *
 * @param Enabled Notification
 * @parent Notification
 * @text Enabled Notification
 * @type boolean
 * @desc Specify the whether the Notification will be enabled.
 * @default true
 * @on true
 * @off false
 *
 * @param Title Text
 * @parent Notification
 * @desc Specify the text for the chromium notification.
 * @default Pause
 *
 * @param Body Text
 * @parent Notification
 * @desc Specify the text for the chromium notification.
 * @default The game has been paused.
 *
 * @param Icon
 * @parent Notification
 * @desc Specify the icon image for the chromium notification from icon folder.
 * @default icon
 *
 * @param Time
 * @type number
 * @parent Notification
 * @desc Specify the time that shows up the chromium notification.
 * @default 2000
 *
 * @help
 * =============================================================================
 * Plugin Commands
 * -----------------------------------------------------------------------------
 * This is to ensure that it cannot be toggled the pause mode when pressed the pause key.
 *
 *  DisablePauseGame
 *
 * if you use this feature, you can be toggled the pause mode when pressing the pause key.
 *
 * EnablePauseGame
 * =============================================================================
 * Available Key Names
 * -----------------------------------------------------------------------------
 * VK_LBUTTON
 * VK_RBUTTON
 * VK_CANCEL
 * VK_MBUTTON
 * VK_XBUTTON1
 * VK_XBUTTON2
 * VK_BACK
 * VK_TAB
 * VK_CLEAR
 * VK_RETURN
 * VK_SHIFT
 * VK_CONTROL
 * VK_MENU
 * VK_PAUSE
 * VK_CAPITAL
 * VK_KANA
 * VK_HANGEUL
 * VK_HANGUL
 * VK_JUNJA
 * VK_FINAL
 * VK_HANJA
 * VK_KANJI
 * VK_ESCAPE
 * VK_CONVERT
 * VK_NONCONVERT
 * VK_ACCEPT
 * VK_MODECHANGE
 * VK_SPACE
 * VK_PRIOR
 * VK_NEXT
 * VK_END
 * VK_HOME
 * VK_LEFT
 * VK_UP
 * VK_RIGHT
 * VK_DOWN
 * VK_SELECT
 * VK_PRINT
 * VK_EXECUTE
 * VK_SNAPSHOT
 * VK_INSERT
 * VK_DELETE
 * VK_HELP
 * VK_LWIN
 * VK_RWIN
 * VK_APPS
 * VK_SLEEP
 * VK_NUMPAD0
 * VK_NUMPAD1
 * VK_NUMPAD2
 * VK_NUMPAD3
 * VK_NUMPAD4
 * VK_NUMPAD5
 * VK_NUMPAD6
 * VK_NUMPAD7
 * VK_NUMPAD8
 * VK_NUMPAD9
 * VK_MULTIPLY
 * VK_ADD
 * VK_SEPARATOR
 * VK_SUBTRACT
 * VK_DECIMAL
 * VK_DIVIDE
 * VK_F1
 * VK_F2
 * VK_F3
 * VK_F4
 * VK_F5
 * VK_F6
 * VK_F7
 * VK_F8
 * VK_F9
 * VK_F10
 * VK_F11
 * VK_F12
 * VK_F13
 * VK_F14
 * VK_F15
 * VK_F16
 * VK_F17
 * VK_F18
 * VK_F19
 * VK_F20
 * VK_F21
 * VK_F22
 * VK_F23
 * VK_F24
 * VK_NUMLOCK
 * VK_SCROLL
 * VK_OEM_NEC_EQUAL
 * VK_OEM_FJ_JISHO
 * VK_OEM_FJ_MASSHOU
 * VK_OEM_FJ_TOUROKU
 * VK_OEM_FJ_LOYA
 * VK_OEM_FJ_ROYA
 * VK_LSHIFT
 * VK_RSHIFT
 * VK_LCONTROL
 * VK_RCONTROL
 * VK_LMENU
 * VK_RMENU
 * VK_BROWSER_BACK
 * VK_BROWSER_FORWARD
 * VK_BROWSER_REFRESH
 * VK_BROWSER_STOP
 * VK_BROWSER_SEARCH
 * VK_BROWSER_FAVORITES
 * VK_BROWSER_HOME
 * VK_VOLUME_MUTE
 * VK_VOLUME_DOWN
 * VK_VOLUME_UP
 * VK_MEDIA_NEXT_TRACK
 * VK_MEDIA_PREV_TRACK
 * VK_MEDIA_STOP
 * VK_MEDIA_PLAY_PAUSE
 * VK_LAUNCH_MAIL
 * VK_LAUNCH_MEDIA_SELECT
 * VK_LAUNCH_APP1
 * VK_LAUNCH_APP2
 * VK_OEM_1
 * VK_OEM_PLUS
 * VK_OEM_COMMA
 * VK_OEM_MINUS
 * VK_OEM_PERIOD
 * VK_OEM_2
 * VK_OEM_3
 * VK_OEM_4
 * VK_OEM_5
 * VK_OEM_6
 * VK_OEM_7
 * VK_OEM_8
 * VK_OEM_AX
 * VK_OEM_102
 * VK_ICO_HELP
 * VK_ICO_00
 * VK_PROCESSKEY
 * VK_ICO_CLEAR
 * VK_PACKET
 * VK_OEM_RESET
 * VK_OEM_JUMP
 * VK_OEM_PA1
 * VK_OEM_PA2
 * VK_OEM_PA3
 * VK_OEM_WSCTRL
 * VK_OEM_CUSEL
 * VK_OEM_ATTN
 * VK_OEM_FINISH
 * VK_OEM_COPY
 * VK_OEM_AUTO
 * VK_OEM_ENLW
 * VK_OEM_BACKTAB
 * VK_ATTN
 * VK_CRSEL
 * VK_EXSEL
 * VK_EREOF
 * VK_PLAY
 * VK_ZOOM
 * VK_NONAME
 * VK_PA1
 * VK_OEM_CLEAR
 * VK_KEY_0
 * VK_KEY_1
 * VK_KEY_2
 * VK_KEY_3
 * VK_KEY_4
 * VK_KEY_5
 * VK_KEY_6
 * VK_KEY_7
 * VK_KEY_8
 * VK_KEY_9
 * ~
 * `
 * [
 * {
 * }
 * ]
 * ;
 * :
 * ''
 * '
 * <
 * ,
 * >
 * ,
 * ?
 * /
 * -
 * _
 * +
 * =
 * ==============================================================================
 * Change Log
 * ------------------------------------------------------------------------------
 * 2017.05.06 (v1.0.0) - First Release.
 * 2017.05.06 (v1.0.1) - Fixed an issue when using a option called 'Exclude unused files'
 * 2018.10.30 (v1.0.2) :
 * - Fixed the issue that is not working in RPG Maker MV v1.6.1
 * - Added the chromium notification (>= v1.6.1+)
 * - Added the keycode converter.
 * 2019.03.05 (v1.0.3) :
 * - Added new plugin commands.
 * - Added the feature that sets whether the chromium notification is enabled or disabled.
 * - Fixed the issue that is not working in the strict mode of RPG Maker MV v1.5.x.
 */
/*:ko
 * @plugindesc 특정 버튼으로 게임을 일지 정지합니다. <RS_PauseGame>
 * @author biud436
 *
 * @param keyCode
 * @text 사용 키 이름
 * @desc 키보드 자판의 자판 이름을 적으세요.
 * (사용 가능한 키 목록은 플러그인 도움말을 참고해주세요)
 * @default VK_F6
 *
 * @param Pause Image Src
 * @text 일지 정지 이미지 경로
 * @desc 이미지 경로를 설정하세요
 * @default pause
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Notification
 * @text 알림 (v1.6.1 이상)
 *
 * @param Enabled Notification
 * @text Notification 사용 여부
 * @parent Notification
 * @type boolean
 * @desc Notification 사용 가능 여부를 지정하십시오.
 * @default true
 * @on 사용
 * @off 사용하지 않음
 *
 * @param Title Text
 * @text 타이틀
 * @parent Notification
 * @desc 크로미움 알림 창에 적을 타이틀 메시지를 지정하십시오.
 * @default 일시 정지 알림
 *
 * @param Body Text
 * @parent Notification
 * @desc 크로미움 알림 창에 적을 메시지를 지정하십시오.
 * @default 게임이 일시적으로 중지되었습니다.
 *
 * @param Icon
 * @parent Notification
 * @desc 아이콘 폴더에 있는 아이콘의 이름을 지정하십시오 (확장자 생략)
 * @default icon
 *
 * @param Time
 * @text 시간
 * @type number
 * @parent Notification
 * @desc 알림 창이 떠있는 시간을 지정하세요 (밀리세컨드 단위)
 * @default 2000
 *
 * @help
 * =============================================================================
 * 플러그인 명령
 * -----------------------------------------------------------------------------
 * 이 플러그인 명령은 일시 정지 키를 눌렀을 때 일시 정지 모드로 전환 할 수 없도록 하기 위한 것입니다.
 *
 *  DisablePauseGame
 *
 * 일시 정지 모드를 다시 사용할 수 있게 됩니다.
 *
 *  EnablePauseGame
 * =============================================================================
 * 사용 가능한 키의 이름
 * -----------------------------------------------------------------------------
 * VK_LBUTTON
 * VK_RBUTTON
 * VK_CANCEL
 * VK_MBUTTON
 * VK_XBUTTON1
 * VK_XBUTTON2
 * VK_BACK
 * VK_TAB
 * VK_CLEAR
 * VK_RETURN
 * VK_SHIFT
 * VK_CONTROL
 * VK_MENU
 * VK_PAUSE
 * VK_CAPITAL   // Caps Lock
 * VK_KANA
 * VK_HANGEUL
 * VK_HANGUL
 * VK_JUNJA
 * VK_FINAL
 * VK_HANJA
 * VK_KANJI
 * VK_ESCAPE
 * VK_CONVERT
 * VK_NONCONVERT
 * VK_ACCEPT
 * VK_MODECHANGE
 * VK_SPACE
 * VK_PRIOR   // PgUp
 * VK_NEXT    // PgDn
 * VK_END
 * VK_HOME
 * VK_LEFT
 * VK_UP
 * VK_RIGHT
 * VK_DOWN
 * VK_SELECT
 * VK_PRINT
 * VK_EXECUTE
 * VK_SNAPSHOT
 * VK_INSERT
 * VK_DELETE
 * VK_HELP
 * VK_LWIN
 * VK_RWIN
 * VK_APPS
 * VK_SLEEP
 * VK_NUMPAD0
 * VK_NUMPAD1
 * VK_NUMPAD2
 * VK_NUMPAD3
 * VK_NUMPAD4
 * VK_NUMPAD5
 * VK_NUMPAD6
 * VK_NUMPAD7
 * VK_NUMPAD8
 * VK_NUMPAD9
 * VK_MULTIPLY
 * VK_ADD
 * VK_SEPARATOR
 * VK_SUBTRACT
 * VK_DECIMAL
 * VK_DIVIDE
 * VK_F1
 * VK_F2
 * VK_F3
 * VK_F4
 * VK_F5
 * VK_F6
 * VK_F7
 * VK_F8
 * VK_F9
 * VK_F10
 * VK_F11
 * VK_F12
 * VK_F13
 * VK_F14
 * VK_F15
 * VK_F16
 * VK_F17
 * VK_F18
 * VK_F19
 * VK_F20
 * VK_F21
 * VK_F22
 * VK_F23
 * VK_F24
 * VK_NUMLOCK
 * VK_SCROLL
 * VK_OEM_NEC_EQUAL
 * VK_OEM_FJ_JISHO
 * VK_OEM_FJ_MASSHOU
 * VK_OEM_FJ_TOUROKU
 * VK_OEM_FJ_LOYA
 * VK_OEM_FJ_ROYA
 * VK_LSHIFT
 * VK_RSHIFT
 * VK_LCONTROL
 * VK_RCONTROL
 * VK_LMENU
 * VK_RMENU
 * VK_BROWSER_BACK
 * VK_BROWSER_FORWARD
 * VK_BROWSER_REFRESH
 * VK_BROWSER_STOP
 * VK_BROWSER_SEARCH
 * VK_BROWSER_FAVORITES
 * VK_BROWSER_HOME
 * VK_VOLUME_MUTE
 * VK_VOLUME_DOWN
 * VK_VOLUME_UP
 * VK_MEDIA_NEXT_TRACK
 * VK_MEDIA_PREV_TRACK
 * VK_MEDIA_STOP
 * VK_MEDIA_PLAY_PAUSE
 * VK_LAUNCH_MAIL
 * VK_LAUNCH_MEDIA_SELECT
 * VK_LAUNCH_APP1
 * VK_LAUNCH_APP2
 * VK_OEM_1
 * VK_OEM_PLUS
 * VK_OEM_COMMA
 * VK_OEM_MINUS
 * VK_OEM_PERIOD
 * VK_OEM_2
 * VK_OEM_3
 * VK_OEM_4
 * VK_OEM_5
 * VK_OEM_6
 * VK_OEM_7
 * VK_OEM_8
 * VK_OEM_AX
 * VK_OEM_102
 * VK_ICO_HELP
 * VK_ICO_00
 * VK_PROCESSKEY
 * VK_ICO_CLEAR
 * VK_PACKET
 * VK_OEM_RESET
 * VK_OEM_JUMP
 * VK_OEM_PA1
 * VK_OEM_PA2
 * VK_OEM_PA3
 * VK_OEM_WSCTRL
 * VK_OEM_CUSEL
 * VK_OEM_ATTN
 * VK_OEM_FINISH
 * VK_OEM_COPY
 * VK_OEM_AUTO
 * VK_OEM_ENLW
 * VK_OEM_BACKTAB
 * VK_ATTN
 * VK_CRSEL
 * VK_EXSEL
 * VK_EREOF
 * VK_PLAY
 * VK_ZOOM
 * VK_NONAME
 * VK_PA1
 * VK_OEM_CLEAR
 * VK_KEY_0
 * VK_KEY_1
 * VK_KEY_2
 * VK_KEY_3
 * VK_KEY_4
 * VK_KEY_5
 * VK_KEY_6
 * VK_KEY_7
 * VK_KEY_8
 * VK_KEY_9
 * ~
 * `
 * [
 * {
 * }
 * ]
 * ;
 * :
 * ''
 * '
 * <
 * ,
 * >
 * ,
 * ?
 * /
 * -
 * _
 * +
 * =
 *
 * =============================================================================
 * 플러그인 동작 환경
 * -----------------------------------------------------------------------------
 * Windows
 * Mac OS X
 *
 * 모바일 기기에서는 동작하지 않습니다.
 *
 * =============================================================================
 * 변경 기록
 * -----------------------------------------------------------------------------
 * 2017.05.06 (v1.0.0) - First Release.
 * 2017.05.06 (v1.0.1) - Fixed an issue when using a option called 'Exclude unused files'
 * 2018.10.30 (v1.0.2) :
 * - Fixed the issue that is not working in RPG Maker MV v1.6.1
 * - Added the chromium notification (>= v1.6.1+)
 * - Added the keycode converter.
 * 2019.03.05 (v1.0.3) :
 * - Added new plugin commands.
 * - Added the feature that sets whether the chromium notification is enabled or disabled.
 * - Fixed the issue that is not working in the strict mode of RPG Maker MV v1.5.x.
 */

var Imported = Imported || {};
Imported.RS_PauseGame = true;

var RS = RS || {};
RS.PauseGame = RS.PauseGame || {};

(function () {
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_PauseGame>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  var imageSrc = parameters['Pause Image Src'] || 'pause';
  var titleText = parameters['Title Text'] || 'Pause';
  var bodyText = parameters['Body Text'] || 'The game has been paused.';
  var iconPath = parameters['Icon'] || 'icon';
  var time = parseInt(parameters['Time']) || 2000;

  RS.PauseGame.Params = RS.PauseGame.Params || {};
  RS.PauseGame.Params.isEnabled = true;

  RS.PauseGame.Params.isEnabledNotification = Boolean(
    parameters['Enabled Notification'] === 'true'
  );

  var KEY = {
    VK_LBUTTON: 0x01,
    VK_RBUTTON: 0x02,
    VK_CANCEL: 0x03,
    VK_MBUTTON: 0x04,
    VK_XBUTTON1: 0x05,
    VK_XBUTTON2: 0x06,
    VK_BACK: 0x08, //  백스페이스
    VK_TAB: 0x09, //  탭
    VK_CLEAR: 0x0c, //  NumLock이 해제되었을 때의 5
    VK_RETURN: 0x0d, //  Enter
    VK_SHIFT: 0x10, //  Shift
    VK_CONTROL: 0x11, //  Ctrl
    VK_MENU: 0x12, //  Alt
    VK_PAUSE: 0x13, //  Pause
    VK_CAPITAL: 0x14, //  Caps Lock

    VK_KANA: 0x15,
    VK_HANGEUL: 0x15,
    VK_HANGUL: 0x15, //  한/영 변환
    VK_JUNJA: 0x17,
    VK_FINAL: 0x18,
    VK_HANJA: 0x19, //  한자
    VK_KANJI: 0x19,

    VK_ESCAPE: 0x1b, //  Esc
    VK_CONVERT: 0x1c,
    VK_NONCONVERT: 0x1d,
    VK_ACCEPT: 0x1e,
    VK_MODECHANGE: 0x1f,
    VK_SPACE: 0x20,
    VK_PRIOR: 0x21, //  PgUp
    VK_NEXT: 0x22, //  PgDn
    VK_END: 0x23, //  End
    VK_HOME: 0x24, //  Home
    VK_LEFT: 0x25, //
    VK_UP: 0x26,
    VK_RIGHT: 0x27,
    VK_DOWN: 0x28,
    VK_SELECT: 0x29,
    VK_PRINT: 0x2a,
    VK_EXECUTE: 0x2b,
    VK_SNAPSHOT: 0x2c, //  Print Screen
    VK_INSERT: 0x2d, //  Insert
    VK_DELETE: 0x2e, //  Delete
    VK_HELP: 0x2f,
    VK_LWIN: 0x5b, //  왼쪽 윈도우 키
    VK_RWIN: 0x5c, //  오른쪽 윈도우 키
    VK_APPS: 0x5d,
    VK_SLEEP: 0x5f,
    VK_NUMPAD0: 0x60, //  숫자 패드 0 ~ 9
    VK_NUMPAD1: 0x61,
    VK_NUMPAD2: 0x62,
    VK_NUMPAD3: 0x63,
    VK_NUMPAD4: 0x64,
    VK_NUMPAD5: 0x65,
    VK_NUMPAD6: 0x66,
    VK_NUMPAD7: 0x67,
    VK_NUMPAD8: 0x68,
    VK_NUMPAD9: 0x69,
    VK_MULTIPLY: 0x6a, //  숫자 패드 *
    VK_ADD: 0x6b, //  숫자 패드 +
    VK_SEPARATOR: 0x6c,
    VK_SUBTRACT: 0x6d, //  숫자 패드 -
    VK_DECIMAL: 0x6e, //  숫자 패드 .
    VK_DIVIDE: 0x6f, //  숫자 패드 /
    VK_F1: 0x70,
    VK_F2: 0x71,
    VK_F3: 0x72,
    VK_F4: 0x73,
    VK_F5: 0x74,
    VK_F6: 0x75,
    VK_F7: 0x76,
    VK_F8: 0x77,
    VK_F9: 0x78,
    VK_F10: 0x79,
    VK_F11: 0x7a,
    VK_F12: 0x7b,
    VK_F13: 0x7c,
    VK_F14: 0x7d,
    VK_F15: 0x7e,
    VK_F16: 0x7f,
    VK_F17: 0x80,
    VK_F18: 0x81,
    VK_F19: 0x82,
    VK_F20: 0x83,
    VK_F21: 0x84,
    VK_F22: 0x85,
    VK_F23: 0x86,
    VK_F24: 0x87,
    VK_NUMLOCK: 0x90, //  Num Lock
    VK_SCROLL: 0x91, //  Scroll Lock
    VK_OEM_NEC_EQUAL: 0x92,
    VK_OEM_FJ_JISHO: 0x92,
    VK_OEM_FJ_MASSHOU: 0x93,
    VK_OEM_FJ_TOUROKU: 0x94,
    VK_OEM_FJ_LOYA: 0x95,
    VK_OEM_FJ_ROYA: 0x96,
    VK_LSHIFT: 0xa0,
    VK_RSHIFT: 0xa1,
    VK_LCONTROL: 0xa2,
    VK_RCONTROL: 0xa3,
    VK_LMENU: 0xa4,
    VK_RMENU: 0xa5,
    VK_BROWSER_BACK: 0xa6,
    VK_BROWSER_FORWARD: 0xa7,
    VK_BROWSER_REFRESH: 0xa8,
    VK_BROWSER_STOP: 0xa9,
    VK_BROWSER_SEARCH: 0xaa,
    VK_BROWSER_FAVORITES: 0xab,
    VK_BROWSER_HOME: 0xac,
    VK_VOLUME_MUTE: 0xad,
    VK_VOLUME_DOWN: 0xae,
    VK_VOLUME_UP: 0xaf,
    VK_MEDIA_NEXT_TRACK: 0xb0,
    VK_MEDIA_PREV_TRACK: 0xb1,
    VK_MEDIA_STOP: 0xb2,
    VK_MEDIA_PLAY_PAUSE: 0xb3,
    VK_LAUNCH_MAIL: 0xb4,
    VK_LAUNCH_MEDIA_SELECT: 0xb5,
    VK_LAUNCH_APP1: 0xb6,
    VK_LAUNCH_APP2: 0xb7,
    VK_OEM_1: 0xba,
    VK_OEM_PLUS: 0xbb,
    VK_OEM_COMMA: 0xbc,
    VK_OEM_MINUS: 0xbd,
    VK_OEM_PERIOD: 0xbe,
    VK_OEM_2: 0xbf,
    VK_OEM_3: 0xc0, //  `
    VK_OEM_4: 0xdb,
    VK_OEM_5: 0xdc,
    VK_OEM_6: 0xdd,
    VK_OEM_7: 0xde,
    VK_OEM_8: 0xdf,
    VK_OEM_AX: 0xe1,
    VK_OEM_102: 0xe2,
    VK_ICO_HELP: 0xe3,
    VK_ICO_00: 0xe4,
    VK_PROCESSKEY: 0xe5,
    VK_ICO_CLEAR: 0xe6,
    VK_PACKET: 0xe7,
    VK_OEM_RESET: 0xe9,
    VK_OEM_JUMP: 0xea,
    VK_OEM_PA1: 0xeb,
    VK_OEM_PA2: 0xec,
    VK_OEM_PA3: 0xed,
    VK_OEM_WSCTRL: 0xee,
    VK_OEM_CUSEL: 0xef,
    VK_OEM_ATTN: 0xf0,
    VK_OEM_FINISH: 0xf1,
    VK_OEM_COPY: 0xf2,
    VK_OEM_AUTO: 0xf3,
    VK_OEM_ENLW: 0xf4,
    VK_OEM_BACKTAB: 0xf5,
    VK_ATTN: 0xf6,
    VK_CRSEL: 0xf7,
    VK_EXSEL: 0xf8,
    VK_EREOF: 0xf9,
    VK_PLAY: 0xfa,
    VK_ZOOM: 0xfb,
    VK_NONAME: 0xfc,
    VK_PA1: 0xfd,
    VK_OEM_CLEAR: 0xfe,

    //  상단 숫자 키
    'VK_KEY_0 ': 0x30,
    'VK_KEY_1 ': 0x31,
    'VK_KEY_2 ': 0x32,
    'VK_KEY_3 ': 0x33,
    'VK_KEY_4 ': 0x34,
    'VK_KEY_5 ': 0x35,
    'VK_KEY_6 ': 0x36,
    'VK_KEY_7 ': 0x37,
    'VK_KEY_8 ': 0x38,
    'VK_KEY_9 ': 0x39,

    '~': 192,
    '`': 192,
    '[': 219,
    '{': 219,
    '}': 221,
    ']': 221,
    ';': 186,
    ':': 186,
    '"': 222,
    "'": 222,
    '<': 188,
    ',': 188,
    '>': 190,
    '?': 191,
    '/': 191,
    '-': 189,
    _: 189,
    '+': 187,
    '=': 187,
  };

  /**
   *
   * @param {String} _char
   */
  function convertKeycode(_char) {
    // upper case
    var ret = false;
    var c = _char;

    if (c.length === 1) {
      var keycode = c.charCodeAt();
      // 65 ~ 90, 90 ~ 122
      if (keycode >= 65 && keycode <= 90 && keycode >= 90 && keycode <= 122) {
        ret = true;
      }
    } else {
      keycode = KEY[c];
      if (keycode) {
        ret = true;
      }
    }

    if (ret) {
      return keycode;
    } else {
      return null;
    }
  }

  var keyCode = convertKeycode(parameters['keyCode'] || 'p') || 0x50;

  SceneManager.pause = false;

  //=========================================================================
  // Event Listener
  //=========================================================================

  window.addEventListener('keydown', function (event) {
    var ret = SceneManager.pause;
    var ctx, dx, dy;

    if (event.keyCode === keyCode && RS.PauseGame.Params.isEnabled) {
      event.preventDefault();
      SceneManager.pause = !ret;
      if (SceneManager.pause) {
        Graphics.showPause();
      } else {
        Graphics.hidePause();
      }
    }
  });

  //=========================================================================
  // Graphics
  //=========================================================================
  Graphics.initPause = function () {
    this._pauseImage = new Image();
    this._pauseImage.src = 'img/pictures/' + imageSrc + '.png';
    this._pauseZIndex = 5;
    this._pauseZIndexTemp = 0;
  };

  Graphics.showPause = function () {
    var self = this;

    var canvas = self._upperCanvas;
    var ctx = canvas.getContext('2d');

    var mx = self._width / 2 - self._pauseImage.width / 2;
    var my = self._height / 2 - self._pauseImage.height / 2;

    // Show upper canvas;
    self._canvas.style.opacity = 0.3;
    canvas.style.opacity = 1;
    canvas.style.zIndex = self._pauseZIndex;

    // Temp zIndex
    self._pauseZIndexTemp = parseInt(canvas.style.zIndex || 0);

    // Clear rect
    ctx.clearRect(0, 0, self._width, self._height);

    ctx.save();
    ctx.drawImage(self._pauseImage, mx, my);
    ctx.restore();

    if (
      Utils.isNwjs() &&
      Utils.RPGMAKER_VERSION >= '1.6.1' &&
      RS.PauseGame.Params.isEnabledNotification
    ) {
      var t = new Notification(titleText, {
        body: bodyText,
        icon: `icon/${iconPath}.png`,
      });
      setTimeout(function () {
        t.close();
      }, time);
    }
  };

  Graphics.hidePause = function () {
    var self = this;
    var canvas = self._upperCanvas;

    // Hide upper canvas
    this._canvas.style.opacity = 1;
    canvas.style.opacity = 0;

    // Restore zIndex
    canvas.style.zIndex = this._pauseZIndexTemp;
  };

  //=========================================================================
  // SceneManager
  // Setting the main framework with pause scene
  //=========================================================================

  if (Utils.RPGMAKER_VERSION < '1.6.1') {
    SceneManager._getTimeInMsWithoutMobileSafari = function () {
      return performance.now();
    };
  }

  SceneManager.updateMain = function () {
    var self = this;

    if (!self.pause) {
      if (Utils.isMobileSafari()) {
        this.changeScene();
        this.updateScene();
      } else {
        var newTime = this._getTimeInMsWithoutMobileSafari();
        var fTime = (newTime - this._currentTime) / 1000;
        if (fTime > 0.25) fTime = 0.25;
        this._currentTime = newTime;
        this._accumulator += fTime;
        while (this._accumulator >= this._deltaTime) {
          this.updateInputData();
          this.changeScene();
          this.updateScene();
          this._accumulator -= this._deltaTime;
        }
      }
    }
    this.renderScene();
    this.requestUpdate();
  };

  var alias_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_Game_Interpreter_pluginCommand.call(this);
    if (command === 'EnablePauseGame') {
      RS.PauseGame.Params.isEnabled = true;
    }
    if (command === 'DisablePauseGame') {
      RS.PauseGame.Params.isEnabled = false;
    }
  };

  Graphics.initPause();
})();
