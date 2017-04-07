/*:
* @plugindesc Hangul Message System <RS_MessageSystem_NameWindow1>
* @author biud436
*
* @param Name Windowskin
* @desc Specifies a window skin for a name window
* @require 1
* @default Window
* @dir img/system/
* @type file
*
* @param Default Windowskin
* @desc Specifies a window skin to message window
* @require 1
* @default Window
* @dir img/system/
* @type file
*
* @help
* =============================================================================
* Plugin Command
* =============================================================================
* This plugin allows you to specify namewindow's windowskin file from img/system folder.
* 'filename' must be a name that omitted extension name. you must also notice that
* the window-skin file may not be included in a deploy folder.
*
*     Message name windowskin filename
*
* =============================================================================
* Change Log
* =============================================================================
* 2017.04.07 (v1.0.0) - First Release
*
*/
/*:ko
 * @plugindesc 한글 메시지 시스템 <RS_MessageSystem_NameWindow1>
 * @author 러닝은빛(biud436)
 *
 * @param 이름 윈도우스킨
 * @desc 이름 윈도우의 윈도우 스킨을 지정하세요
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param 기본 윈도우스킨
 * @desc 기본 윈도우의 윈도우 스킨을 지정하세요
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @help
 * =============================================================================
 * 플러그인 명령
 * =============================================================================
 * 파일명에는 확장자를 생략한 윈도우 스킨 파일의 이름을 적어주셔야 합니다. 이렇게 바꾸면
 * 최종 배포 파일에 윈도우 스킨 파일이 포함되지 않을 수도 있습니다.
 *
 *    메시지 이름윈도우 윈도우스킨 파일명
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.04.07 (v1.0.0) - First Release
 *
 */

var Imported = Imported || {};
Imported.RS_MessageSystem_NameWindow1 = true;

var RS = RS || {};
RS.MessageSystem = RS.MessageSystem || {};
RS.MessageSystem.Params = RS.MessageSystem.Params || {};

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MessageSystem_NameWindow1>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  if( Imported.RS_MessageSystem ) {

    var popParameter = function () {
      var k = Object.keys(arguments);
      var lastUsed = "";
      while(k.length > 0) {
        lastUsed = arguments[parseInt(k.pop())];
        if(parameters[lastUsed]) return parameters[lastUsed];
      }
      return "";
    };

    RS.MessageSystem.Params.windowskin = popParameter('Default Windowskin', "기본 윈도우스킨") || 'Window';
    RS.MessageSystem.Params.windowskinForNameWindow = popParameter('Name Windowskin', "이름 윈도우스킨") || 'Window';

    Window_Message.prototype.loadWindowskin = function() {
        this.windowskin = ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);
    };

    RS.Window_Name.prototype.loadWindowskin = function() {
        this.windowskin = ImageManager.loadSystem(RS.MessageSystem.Params.windowskinForNameWindow);
    };

    //===========================================================================
    // Game_Interpreter
    //===========================================================================

    var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);

      if(command === "Message" || command === "메시지") {
        switch (args[0]) {
          case 'name': case '이름윈도우':
            if(args[1].toLowerCase() === "windowskin" || args[1].toLowerCase() === "윈도우스킨") {
              RS.MessageSystem.Params.windowskinForNameWindow = args.slice(2, args.length).join('');
            }
            break;
          case 'windowskin':
            RS.MessageSystem.Params.windowskin = args.slice(1, args.length).join('');
            break;
        }
      }
    };

  }
})();
