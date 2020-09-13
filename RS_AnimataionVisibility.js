//================================================================
// RS_AnimataionVisibility.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to remove the animation on the screen when the character is deactivated. <RS_AnimataionVisibility>
 * @author biud436
 * @help
 * ================================================================
 * Introduction
 * ================================================================
 * In case of the RPG Maker MV, 
 * The Animation will be played until the last cell even if the character doesn't show up anymore on the screen.
 * This plugin allows you to remove the animation on the screen when the character is deactivated.
 * 
 * ◆ Animation Stop Condition
 *   - erased event.
 *   - if the event execution conditions are not met.
 *   - empty graphic.
 * 
 * ================================================================
 * Version Log
 * ================================================================
 * 2019.03.24 (v1.0.0) - First Release.
 * 2020.09.13 (v1.0.1) :
 * - Fixed the issue that is not working when playing a animation to player.
 */
/*:ko
 * @plugindesc 애니메이션을 바로 정지시킵니다. <RS_AnimataionVisibility>
 * @author biud436
 * @help
 * ================================================================
 * 소개
 * ================================================================
 * RPG Maker MV의 경우, 캐릭터가 화면에서 보이지 않아도 애니메이션이 끝까지 재생됩니다.
 * 이 플러그인은 캐릭터가 화면에서 보이지 않으면 애니메이션을 바로 정지시킵니다.
 * 
 *  ◆ 정지 조건​
 *    - 이벤트 일시 삭제
 *    - 이벤트 실행 조건이 충족하지 않을 때 (변수, 스위치, 셀프 스위치)
 *    - 캐릭터 그래픽이 비어있을 때
 * 
 * ================================================================
 * Version Log
 * ================================================================
 * 2019.03.24 (v1.0.0) - First Release.
 * 2020.09.13 (v1.0.1) :
 * - 플레이어에 애니메이션 재생 시 오류가 나는 문제를 수정하였습니다.
 */
 
var Imported = Imported || {};
Imported.RS_AnimataionVisibility = true;
 
(function() {
  
  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_AnimataionVisibility>");
  })[0].parameters;
  
  var alias_Sprite_Animation_update = Sprite_Animation.prototype.update;
  Sprite_Animation.prototype.update = function() {
    alias_Sprite_Animation_update.call(this);
    this.updateVisibility();
  };

  Sprite_Animation.prototype.isTargetReady = function() {
    if(!this._target) return false;
    if(!(this._target instanceof Sprite_Character)) return false;
    var target = this._target._character;

    var isActivated = (target instanceof Game_Player) ? true : (target.findProperPageIndex() > -1); // 이벤트 페이지가 활성화 되었는가?
    var isTransparent = target.isTransparent(); // 투명한가?
    var isErased = target._erased || !target._characterName; // 이벤트 일시 삭제 또는 캐릭터 이름이 없나

    return isActivated && !isTransparent && !isErased;

  };
  
  Sprite_Animation.prototype.updateVisibility = function() {
    this.visible = this.isTargetReady();
  };

  var alias_Sprite_Animation_processTimingData = Sprite_Animation.prototype.processTimingData;
  Sprite_Animation.prototype.processTimingData = function(timing) {
    if(!this.isTargetReady()) return;
    alias_Sprite_Animation_processTimingData.call(this, timing);
  };
  
})();