//================================================================
// RS_AnimataionVisibility.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
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
 * 2020.09.14 (v1.0.2) :
 * - Fixed the bug that is not playing the animation to object character.
 * 2020.09.17 (v1.0.3) :
 * - Fixed the issue that is not working an animation in tile event.
 */

(() => {
  'use strict';

  const aliasSpriteAnimationUpdate = Sprite_Animation.prototype.update;
  Sprite_Animation.prototype.update = function () {
    aliasSpriteAnimationUpdate.call(this);
    this.updateVisibility();
  };

  Sprite_Animation.prototype.isTargetReady = function () {
    if (!this._target) return false;
    if (!(this._target instanceof Sprite_Character)) return false;
    const target = this._target._character;

    let isActivated = false;

    if (target instanceof Game_Event) {
      isActivated = target.findProperPageIndex() > -1;
    } else if (target instanceof Game_CharacterBase) {
      isActivated = true;
    } else {
      return false;
    }

    const isTransparent = target.isTransparent(); // 투명한가?
    let isErased = target._erased;

    if (!isErased) {
      isErased = target.isTile() ? isErased : !target._characterName;
    }

    return isActivated && !isTransparent && !isErased;
  };

  Sprite_Animation.prototype.updateVisibility = function () {
    this.visible = this.isTargetReady();
  };

  const aliasSpriteAnimationProcessTimingData =
    Sprite_Animation.prototype.processTimingData;
  Sprite_Animation.prototype.processTimingData = function (timing) {
    if (!this.isTargetReady()) return;
    aliasSpriteAnimationProcessTimingData.call(this, timing);
  };
})();
