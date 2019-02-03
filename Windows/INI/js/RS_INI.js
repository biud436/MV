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
 * @plugindesc INI 모듈
 * @author biud436
 * @help
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
