/*:
 * RS_DefaultAttackSkillChanges.js
 * @plugindesc This plugin allows you to change a default attack skill depending on the class id
 * @author biud436
 *
 * @help
 * please write a comment to a note area from the class tab as follows
 *
 * <NormalAttackID:x>
 *
 * The x is an ID for skill
 */
/*:ko
 * RS_DefaultAttackSkillChanges.js
 * @plugindesc 기본 공격 스킬을 Class ID에 따라 변경합니다.
 * @author biud436
 *
 * @help
 * Class 의 Note 란에 아래를 기입하세요.
 * <NormalAttackID:x>
 * x 는 스킬의 ID 입니다.
 */

var Imported = Imported || {};
Imported.RS_DefaultAttackSkillChanges = true;

(function () {
  Game_Actor.prototype.attackSkillId = function () {
    var c = $dataClasses[this._classId].meta;
    var id = Number(c.NormalAttackID) || 1;
    return id;
  };
})();
