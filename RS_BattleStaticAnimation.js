//================================================================
// RS_BattleStaticAnimation.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to play the loop animation during the battle <RS_BattleStaticAnimation>
 * @author biud436
 *
 * @help
 *
 * This plugin must require YEP_CoreEngine and YEP_BattleEngineCore plugins.
 * You should place this plugin somewhere below 'YEP_CoreEngine' and 'YEP_BattleEngineCore' in the Plugin Manager.
 *
 * This plugin allows you to playback certain animation.
 * Unless the battler is died, the animation will never stop until the battle is end.
 *
 * PlayStaticAnimation uniqId battlerId animationId
 *      - uniqId : Specify the unique identifier that needs when removing certain animation on the screen.
 *                 This value can write with a string type, but it can not type the space.
 *      - battlerId : if it is to negative number, it means the id of specific enemy.
 *                 if not, it means the actor's ID.
 *
 *      - animationId : Specify the Animation ID of the DataBase. it starts with from 1.
 *
 * Notice that the animation will be placed in front of all battlers.
 *
 * You can play the screen animation using the following plugin command.
 * Notice that this function will be changed origins by force to center and
 * then moved animation sprite's position on the center of the screen.
 *
 * PlayScreenAnimation uniqId ox oy animationId
 *      - uniqId : Specify the unique identifier that needs when removing certain animation on the screen.
 *                 This value can write with a string type, but it can not type the space.
 *      - ox, oy : ox and oy parameters will must be exactly zero when you don't need offsets.
 *      - animationId : Specify the Animation ID of the DataBase. it starts with from 1.
 *
 * StopStaticAnimation uniqId
 *      - uniqId : Specify the unique identifier that needs when removing certain animation on the screen.
 *                 This value can write with a string type, but it can not type the space.
 *
 * it will be removed automatically when the battle is end.
 *
 * Notice that this plugin can use only in RPG Maker MV v1.6.1 or more.
 *
 * =====================================================================
 * Change Log
 * =====================================================================
 * 2019.09.11 (v1.0.0) - First Release.
 * 2019.10.10 (v1.0.1) :
 * - Fixed the issue that is not working in front-view battle.
 * - Update description.
 * 2019.10.11 (v1.0.2) :
 * - Added a new feature that can play the animation without setting the battler.
 * - Fixed the issue that is not played the animation correctly on the center of the screen.
 */
(() => {
  const RS = window.RS || {};
  RS.BattleStaticAnimation = RS.BattleStaticAnimation || {};

  const Imported = window.Imported || {};
  Imported.RS_BattleStaticAnimation = true;

  /**
   * @class Sprite_StaticAnimation
   */
  class Sprite_StaticAnimation extends Sprite_Base {
    constructor(battler, animationId) {
      super();
      this._battler = battler;
      this._effectTarget = battler.battler();
      this._animationId = animationId;
    }

    isPlayable() {
      return !this.isAnimationPlaying();
    }

    isValid() {
      if (!this._effectTarget) return false;
      if (!this._battler) return false;
      if (this._animationId <= 0) return false;
      return !this._battler.isDead();
    }

    removeMembers() {
      this._battler = null;
      this._effectTarget = null;
      this._animationId = 0;
    }

    update() {
      super.update();
      if (this.isPlayable() && this.isValid()) {
        const anim = $dataAnimations[this._animationId];
        this.startAnimation(anim, false, 0);
      }
    }
  }

  //=====================================================================
  // Sprite_ScreenAnimation
  //=====================================================================

  class Sprite_ScreenAnimation extends Sprite_Base {
    constructor(animationId) {
      super();
      this._effectTarget = this;
      this._animationId = animationId;
    }

    isPlayable() {
      return !this.isAnimationPlaying();
    }

    isValid() {
      if (this._animationId <= 0) return false;
      return true;
    }

    removeMembers() {
      this._effectTarget = null;
      this._animationId = 0;
    }

    update() {
      super.update();
      if (this.isPlayable() && this.isValid()) {
        const anim = $dataAnimations[this._animationId];

        anim.position = 1;

        this.startAnimation(anim, false, 0);
      }
    }
  }

  //=====================================================================
  // Spriteset_Battle
  //=====================================================================

  Spriteset_Battle.prototype.createStaticAnimation = function () {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (this._staticAnimation)
      this._baseSprite.removeChild(this._staticAnimation);

    this._staticAnimation = new Sprite();

    const width = Graphics.boxWidth;
    const height = Graphics.boxHeight;
    const x = (Graphics.width - width) / 2;
    const y = (Graphics.height - height) / 2;
    this._staticAnimation.x = x;
    this._staticAnimation.y = y;
    this._staticAnimation.setFrame(x, y, width, height);

    this._baseSprite.addChild(this._staticAnimation);
    this.on('removed', this.removeStaticAnimation, this);
  };

  Spriteset_Battle.prototype.removeStaticAnimation = function () {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!this._staticAnimation) return;
    this._staticAnimation.removeChildren();
    this._baseSprite.removeChild(this._staticAnimation);
    this._staticAnimation = null;
  };

  Spriteset_Battle.prototype.playStaticAnimation = function (
    uniqId,
    battler,
    animationId
  ) {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!BattleManager.allBattleMembers().contains(battler)) {
      return;
    }
    if (!this._staticAnimation) return;

    const x = battler.spriteHomeX();
    const y = battler.spriteHomeY();

    const animation = new Sprite_StaticAnimation(battler, animationId);

    animation.x = x;
    animation.y = y;
    animation.uniqId = uniqId;

    this._staticAnimation.addChild(animation);
  };

  /**
   * @method
   * @name   Spriteset_Battle#playScreenAnimation
   * @param  {Number} uniqId
   * @param  {Number} ox
   * @param  {Number} oy
   * @param  {Number} animationId
   */
  Spriteset_Battle.prototype.playScreenAnimation = function (
    uniqId,
    ox,
    oy,
    animationId
  ) {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!this._staticAnimation) return;

    const animation = new Sprite_ScreenAnimation(animationId);

    animation.x = Graphics.boxWidth / 2 + ox;
    animation.y = Graphics.boxHeight / 2 + oy;
    animation.uniqId = uniqId;

    this._staticAnimation.addChild(animation);
  };

  Spriteset_Battle.prototype.stopStaticAnimation = function (uniqId) {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!this._staticAnimation) return;

    const { children } = this._staticAnimation;
    if (!children) return;

    deleted = children.filter(i => i.uniqId === uniqId);

    if (deleted[0]) {
      deleted[0].removeMembers();
      this._staticAnimation.removeChild(deleted[0]);
    }
  };

  const alias_Spriteset_Battle_createLowerLayer =
    Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function () {
    alias_Spriteset_Battle_createLowerLayer.call(this);
    this.createStaticAnimation();
  };

  //=====================================================================
  // BattleManager
  //=====================================================================

  /**
   *
   * @param {Number} battlerId
   */
  BattleManager.playStaticAnimation = function (
    uniqId,
    battlerId,
    animationId
  ) {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!this._spriteset) return;
    const battlers = BattleManager.allBattleMembers();
    const maxBattlers = battlers.length;
    const maxActors = $gameParty.members().length;

    if (battlerId < 0) {
      battlerId = (maxActors - 1 + Math.abs(battlerId)) % maxBattlers;
    } else {
      battlerId = (battlerId - 1) % maxActors;
    }

    const battler = battlers[battlerId];

    if (battlers.contains(battler)) {
      this._spriteset.playStaticAnimation(uniqId, battler, animationId);
    }
  };

  /**
   * @param  {Number} uniqId
   * @param  {Number} ox
   * @param  {Number} oy
   * @param  {Number} animationId
   */
  BattleManager.playScreenAnimation = function (uniqId, ox, oy, animationId) {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!this._spriteset) return;
    if (!animationId) return;

    this._spriteset.playScreenAnimation(uniqId, ox, oy, animationId);
  };

  BattleManager.stopStaticAnimation = function (uniqId) {
    if (!Imported.YEP_CoreEngine) return;
    if (!Imported.YEP_BattleEngineCore) return;
    if (!this._spriteset) return;
    this._spriteset.stopStaticAnimation(uniqId);
  };

  //=====================================================================
  // Game_Interprter
  //=====================================================================
  const aliasGameInterpreterPluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    aliasGameInterpreterPluginCommand.call(this, command, args);
    if (command === 'PlayStaticAnimation') {
      const uniqId = args[0];
      const battlerId = Number(args[1]);
      const animationId = Number(args[2]);
      BattleManager.playStaticAnimation(uniqId, battlerId, animationId);
    } else if (command === 'PlayScreenAnimation') {
      const uniqId = args[0];
      const ox = Number(args[1]);
      const oy = Number(args[2]);
      const animationId = Number(args[3]);
      BattleManager.playScreenAnimation(uniqId, ox, oy, animationId);
    } else if (command === 'StopStaticAnimation') {
      const uniqId = args[0];
      BattleManager.stopStaticAnimation(uniqId);
    }
  };
})();
