/*:ko
 * @plugindesc 특정 창의 텍스트 색상을 원하는 색상으로 변경할 수 있습니다 <RS_ChangeWindowTextColorSafely>
 * @author biud436
 *
 * @param windowList
 * @text 사용자 정의 색상
 * @type note
 * @desc 도움말을 참고하세요!
 * @default ""
 *
 * @help
 * =============================================================================
 * 사용 방법
 * =============================================================================
 * 각 창에 서로 다른 텍스트 색상을 적용하려면,
 * 사용자 정의 색상 매개변수에 다음 노트 태그를 입력해야 합니다.
 *
 *    <Window_ItemList normalColor #ff0000>
 *    <Window_SkillList normalColor #ffff00>
 *    <Window_SkillList crisisColor #ff0000>
 *
 * 노트 태그는 클래스 이름과 해당 클래스의 메소드 이름 그리고 색상 값을 제공해야 하므로,
 * 정확히 입력하시기 바랍니다.
 *
 * 정말 많은 메소드를 바꿀 수 있지만 모두 표기하진 않았습니다.
 *
 * 바뀐 색상은 게임 내에서 확인할 수 있습니다.
 *
 * =============================================================================
 * 변경 기록
 * =============================================================================
 * 2017.12.21 (v1.0.0) - First Release.
 */
/*:
 * @plugindesc This plugin allows you to change the text color for window as you desired. <RS_ChangeWindowTextColorSafely>
 * @author biud436
 *
 * @param windowList
 * @text Window List
 * @type note
 * @desc Refer to a help documentation
 * @default ""
 *
 * @help
 *
 * We're going to define each window a different special color. To quickly define,
 * We must use to define a notetag in the plugin parameter called 'Window List'
 *
 *    <Window_ItemList normalColor #ff0000>
 *    <Window_SkillList normalColor #ffff00>
 *    <Window_SkillList crisisColor #ff0000>
 *
 * Note tags provide the information likes as a class name and method name,
 * color value for window. You can see how the text color for window that is
 * changed in the game.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2017.12.21 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_ChangeWindowTextColorSafely = true;

var RS = RS || {};
RS.Utils = RS.Utils || {};

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_ChangeWindowTextColorSafely>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  var defaultWindowClasses = RS.Utils.jsonParse(parameters['windowList']);

  Utils.changeWindowTextColorSafely = function(NOTETAGS) {

      var clsName = "";
      var funcName = "";
      var color = "";
      var done = false;

      var notetags = NOTETAGS.split(/[\r\n]+/);

      notetags.forEach(function (note) {

        if(note.match(/<(.*)[ ](.*)[ ](.*)>/)) {

          clsName = String(RegExp.$1);
          funcName = String(RegExp.$2);
          color = String(RegExp.$3);
          done = true;

        }

        if(done) {

          var CLASS_NAME = window[clsName];
          var FUNC_NAME = funcName.slice(0);
          var COLOR_NAME = color.slice(0);

          if(typeof(CLASS_NAME) === 'function') {

            var prototypeName = CLASS_NAME.prototype[FUNC_NAME];

            if(typeof(prototypeName) === 'function') {
              CLASS_NAME.prototype[funcName] = function() { return COLOR_NAME; };
            }

          }

        }

      }, this);

  };

  Utils.changeWindowTextColorSafely(defaultWindowClasses);

})();
