//================================================================
// RS_INI.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015-2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc INI
 * @author biud436
 * @help
 * ==============================================================================
 * Terms of Use
 * ==============================================================================
 * Free for commercial and non-commercial use
 */
/*:ko
 * @plugindesc INI 파일 생성 또는 메시지 박스를 띄우는 플러그인입니다.
 * @author biud436
 * @help
 * ==============================================================================
 * 설치법
 * ==============================================================================
 * js/libs 폴더에 node 파일(DLL과 같은 개념)을 두어야 합니다.
 * 
 * 데모 - https://drive.google.com/open?id=105zvVpbiKDwkuzB3vJjworjA2Nv1mV9m
 * 
 * NW.js 버전에 맞는 라이브러리 파일을 둬야 합니다. 
 * RPG Maker MV의 각 버전의 NW.js 바닐라 상태에 해당하는 라이브러리 파일은 미리 빌드해두었습니다.
 * 하지만 더 상위 버전을 사용하신다면 직접 빌드를 하셔야 합니다.
 * 
 * 데모 게임 파일에서는 RPG Maker MV v1.6.2이며 바닐라가 아닌 NWJS 0.33.4 버전을 
 * 사용하고 있습니다.
 * 
 * 부가 기능
 * 
 * 아이콘을 지닌 메시지 박스 또는 예/아니오 질문을 할 수 있는 메시지 박스를 띄웁니다. 
 * 아래 코드는 '창 닫기' 이벤트를 수신하여 닫기 전에 종료하겠냐는 질문을 합니다.
 * 
 * // In RPG Maker MV 1.6.0 version or above, it can use 'nw' instead of require('nw.gui')
 * var gui = nw.Window.get();
 * 
 * // This callback function listens for the exit button being pressed.
 * gui.on('close', function() {
 * 
 *     var ret = RS.MSGBOX.yesno("안내", "게임을 종료하시겠습니까?");
 *     var iconType = RS.MSGBOX.MB_TYPE.MB_OK | RS.MSGBOX.MB_TYPE.MB_ICONINFORMATION;
 *     if(ret) {
 *         RS.MSGBOX.open("안내", "예(YES) 버튼을 눌렀습니다.", iconType);
 *         this.close(true);
 *     } else {
 *         RS.MSGBOX.open("안내", "아니오(NO) 버튼을 눌렀습니다.", iconType);
 *     }
 * 
 * });
 * 
 * 다음은 오류 메시지 박스를 띄우는 부가 기능입니다.
 * 
 * // The title of message box is set as a game title automatically.
 * Utils.errorMsg("에러가 발생하였습니다. 개발자에게 문의하세요");
 * 
 * Utils.yesno("Do you want to download the help file?", function() {
 *     // this callback function listens for the 'yes' button being pressed.
 * }, function() {
 *     // this callback function listens for the 'no' button being pressed.
 * });
 * 
 * ==============================================================================
 * 소스 코드
 * ==============================================================================
 * 문자셋 변환 작업이 주된 작업이며, MV 버전이 1.5.2 이하라면 node-gyp로 빌드되며, 
 * 1.6.1 이상이면 nw-gyp를 사용해야 합니다.
 * 
 * npm_setup.bat 파일을 수정하여 사용하시면 편리합니다.
 * 
 * 소스 코드 링크 - https://github.com/biud436/MV/tree/master/Windows/INI
 * 
 * 소스 코드는 C++로 작성되었습니다.
 * 
 * ==============================================================================
 * 설치 및 빌드
 * ==============================================================================
 * 'latest.cmd' 파일을 실행하면  v9.11.1-INI-x64.node 파일이 bin 폴더에 생성됩니다.  
 * RPG Maker MV 버전이 1.5.2 이하라면, 명령 프롬프트에서 다음 코드를 실행하시기 바랍니다.
 * 
 * latest.cmd "0.12.3"
 * 
 * 빌드 결과물은 NWJS의 버전에 따라 파일명이 달라집니다.
 * 
 * 바닐라 상태의 NWJS를 사용하시는 경우, 직접 빌드를 하지 않아도 됩니다. 
 * 미리 빌드된 라이브러리를 파일을 다운로드 받아서 쓰셔도 됩니다.
 * 
 * - RPG Maker MV v1.5.2 이하 (32비트/64비트)
 * https://github.com/biud436/MV/raw/master/Windows/INI/bin/v1.2.0-INI-ia32.node
 * https://github.com/biud436/MV/raw/master/Windows/INI/bin/v1.2.0-INI-x64.node
 * 
 * - RPG Maker MV v1.6.1+ (32비트/64비트)
 * https://github.com/biud436/MV/raw/master/Windows/INI/bin/v9.11.1-INI-ia32.node
 * https://github.com/biud436/MV/raw/master/Windows/INI/bin/v9.11.1-INI-x64.node
 * 
 * vX.XX.X-INI-X.node 파일을 준비하셨다면, js/libs 폴더에 넣어주세요.
 * 이 다음에는 RS_INI.js라는 파일을 js/plugins 폴더에 삽입하여 플러그인 관리로 설정하세요.
 * 
 * 라이브러리를 직접 빌드하려면 Node.js 와 Visual Studio와 Python이 설치되어있어야 합니다.
 * 
 * ==============================================================================
 * Terms of Use
 * ==============================================================================
 * Free for commercial and non-commercial use
 */

var Imported = Imported || {};
Imported.RS_INI = true;

var RS = RS || {};
RS.INI = RS.INI || {};
RS.MSGBOX = RS.MSGBOX || {};

(function($, __msg) {

    var parameters = $plugins.filter(function (i) {
       return i.description.contains("<RS_INI>");
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.module = {};
    $.state = "ready";

    $.initModule = function() {

        if(!Utils.isNwjs()) return;

        try {
            
            "use strict";
            var path = require('path');
            var fs = require('fs');
            var version = process.versions.node;
            var arch = process.arch;
            var rootDir = path.join(process.mainModule.filename, "..", "js", "libs", `v${version}-INI-${arch}`);
            rootDir = rootDir.split("\\");
            var driveName = rootDir.shift();
            rootDir = rootDir.join("/");
            rootDir = driveName + "//" + rootDir;

            if(process.versions.node == "1.2.0" && process.execPath.contains("Game.exe")) {
                window.alert(`Please you must change the name of the executable file to nw.exe`);
                var targetName = path.join(process.execPath, "..", "nw.exe");
                fs.copyFile(process.execPath, targetName, "utf8", function(err, data) {});
                return;
            }            

            $.module  = require(rootDir);
            $.state = "initialized";

        } catch(e) {
            throw new Error("라이브러리가 해당 경로에 없거나 잘못되었습니다 : " + e);
        }

    };

    /**
     * Write the ini file.
     * @param {String} appName 
     * @param {String} keyName 
     * @param {String} str 
     * @param {String} fileName The file extension must end with .ini
     */
    $.writeString = function (appName, keyName, str, fileName) {
        $.module.WriteString(appName, keyName, str, fileName);
    };

    /**
     * Read the ini file.
     * @param {String} appName 
     * @param {String} keyName  
     * @param {String} fileName The file extension must end with .ini
     */
    $.readString = function (appName, keyName, fileName) {
        $.module.ReadString(appName, keyName, fileName);
    };

    __msg.MB_TYPE = {
        MB_OK:  0x00000000,
        MB_OKCANCEL:  0x00000001,
        MB_ABORTRETRYIGNORE:  0x00000002,
        MB_YESNOCANCEL:  0x00000003,
        MB_YESNO:  0x00000004,
        MB_RETRYCANCEL:  0x00000005,
        MB_CANCELTRYCONTINUE:  0x00000006,
        MB_ICONHAND:  0x00000010,
        MB_ICONQUESTION:  0x00000020,
        MB_ICONEXCLAMATION:  0x00000030,
        MB_ICONASTERISK:  0x00000040,
        MB_USERICON:  0x00000080,
        MB_ICONWARNING: 0x00000030,
        MB_ICONERROR:  0x00000010,
        MB_ICONINFORMATION:  0x00000040,
        MB_ICONSTOP:  0x00000010,
        MB_DEFBUTTON1:  0x00000000,
        MB_DEFBUTTON2:  0x00000100,
        MB_DEFBUTTON3:  0x00000200,
        MB_DEFBUTTON4:  0x00000300,
        MB_APPLMODAL:  0x00000000,
        MB_SYSTEMMODAL:  0x00001000,
        MB_TASKMODAL:  0x00002000,
        MB_HELP:  0x00004000,
        MB_NOFOCUS:  0x00008000,
        MB_SETFOREGROUND:  0x00010000,
        MB_DEFAULT_DESKTOP_ONLY:  0x00020000,
        MB_TOPMOST:  0x00040000,
        MB_RIGHT:  0x00080000,
        MB_RTLREADING:  0x00100000,
        MB_SERVICE_NOTIFICATION:  0x00200000,
        MB_TYPEMASK:  0x0000000F,
        MB_ICONMASK:  0x000000F0,
        MB_DEFMASK:  0x00000F00,
        MB_MODEMASK:  0x00003000,
        MB_MISCMASK:  0x0000C000,
        IDOK: 1,
        IDCANCEL: 2,
        IDABORT: 3,
        IDRETRY: 4,
        IDIGNORE: 5,
        IDYES: 6,
        IDNO: 7,
        IDCLOSE: 8,
        IDHELP: 9,
        IDTRYAGAIN: 10,
        IDCONTINUE: 11,
        IDTIMEOUT: 32000                   
    };

    /**
     * Create the message box that has an OK button and show up it on window.
     * @param {String} titleName 
     * @param {String} content 
     * @param {Number} type 
     */
    __msg.open = function (titleName, content, type) {
        if(!$.module) return;
        titleName = titleName || document.title;
        content = content || "";        
        var gui = require('nw.gui');
        var win = gui.Window.get();        
        var id = $.module.MessageBox(content, titleName, type);
        win.focus();
        Input.clear();        
        return id;
    };

    /**
     * Create the message box that has yes and no buttons and show up it on window.
     * @param {String} titleName 
     * @param {String} content 
     */
    __msg.yesno = function (titleName, content) {
        if(!$.module) return;
        
        titleName = titleName || document.title;
        content = content || "";

        var id = $.module.MessageBox(content, titleName, __msg.MB_TYPE.MB_YESNO);
        var ret = (id === __msg.MB_TYPE.IDYES) ? true : false;

        return ret;
    };

    /**
     * Create the message box that has an OK button and show up it on window.
     * @param {String} content 
     */
    Utils.msgbox = function (content) {
        var title = document.title;
        return __msg.open(title, content,  __msg.MB_TYPE.MB_OK);
    };

    /**
     * Create the error msg.
     * @param {String} content 
     */
    Utils.errorMsg = function (content) {
        var title = document.title;
        return __msg.open(title, content,  __msg.MB_TYPE.MB_OK | __msg.MB_TYPE.MB_ICONERROR);
    };

    /**
     * Create the message box that has yes and no buttons and show up it on window.
     * @param {String} content 
     * @param {Function} yes 
     * @param {Function} no 
     */
    Utils.yesno = function(content, yes, no) {
        var title = document.title;
        if(__msg.yesno(title, content)) {
            yes();
        } else {
            no();
        }
    };

    Input._wrapNwjsAlert = function() {
        if (Utils.isNwjs()) {
            var _alert = window.alert;
            window.alert = function() {
                var gui = require('nw.gui');
                var win = gui.Window.get();
                Utils.msgbox.apply(this, arguments);
                win.focus();
                Input.clear();
            };
        }
    };

    $.initModule();

})(RS.INI, RS.MSGBOX);
