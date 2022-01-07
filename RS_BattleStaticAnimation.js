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
/*:ko
 * @target MV
 * @plugindesc This plugin allows you to play the loop animation during the battle <RS_BattleStaticAnimation>
 * @author biud436
 *
 * @help
 *
 * 플러그인을 구동 시 YEP_CoreEngine과 YEP_BattleEngineCore.js 파일이 필요하므로,
 * YEP_CoreEngine과 YEP_BattleEngineCore 플러그인 아래 어딘가에 플러그인을 배치하시기 바랍니다.
 *
 * 전투 도중에 특정 애니메이션을 반복 재생합니다.
 * 애니메이션의 원점은 애니메이션 설정에 따라 달라집니다.
 * 원점이라는 건 데이터베이스 애니메이션 탭에서 위치 값을 뜻합니다.
 * '상단'으로 설정되어있을 경우, 타겟의 머리 위에서 재생되고
 * '하단'으로 설정되어있을 경우, 타겟의 다리 쪽에서 재생되는 것이 보통입니다.
 * '중앙'으로 설정되어있을 경우, 타겟의 중앙에 재생됩니다.
 * '화면'이라면 전투 필드의 중앙 지점에 설정됩니다. 즉, 쉽게 말하면 화면 중앙에 표시됩니다.
 *
 * PlayStaticAnimation uniqId battlerId animationId
 *      - uniqId : 애니메이션 제거 시에 필요한 식별자를 문자열로 지정하세요.
 *      - battlerId : 배틀러 ID가 -일 경우, Enemy의 ID 값을 뜻하고 +면 아군의 ID 값을 뜻합니다.
 *      - animationId : 애니메이션의 ID 값을 지정하세요. 이 값은 1부터 시작해야 합니다.
 *
 * 배틀러의 ID는 데이터베이스에서의 ID 값이 아닌, 턴제 전투에서의 아군과 적그룹 내에서의 인덱스입니다.
 * 인덱스는 0이 아닌 1부터 시작하며, 파티원 1에 애니메이션을 표시하려면 1을 전달해야 합니다.
 * 반면 적군 1에 애니메이션을 표시하려면 -1을 전달해야 합니다.
 * 배틀러 ID 값에 해당하는 배틀러가 없는 경우에는 애니메이션이 재생되지 않습니다.
 *
 * 애니메이션 반복 재생은 배틀러가 도중에 죽었을 땐 반복이 중단됩니다.
 * 전투 애니메이션은 통상적으로 모든 배틀러의 앞 쪽에 위치합니다.
 *
 * 배틀러와 상관 없이 화면에 항상 재생하고 싶다면 다음 플러그인 명령을 사용해주시기 바랍니다.
 * 다음 플러그인 명령은 화면 중앙에 특정 애니메이션을 반복 재생합니다.
 * 또한 애니메이션의 원점을 중앙으로 강제 변경하고 화면 중앙에 애니메이션을 표시합니다.
 * 애니메이션의 원점은 데이터베이스에서 애니메이션 탭에서 '위치'에 해당하는 값입니다.
 *
 * PlayScreenAnimation uniqId ox oy animationId
 *      - uniqId : 애니메이션 제거 시에 필요한 식별자를 문자열로 지정하세요.
 *      - ox and oy : 기본적으로는 화면 중앙에 표시되지만 오프셋 좌표를 설정하면
 *                    화면 중앙을 기점으로 상대적으로 좌표를 조절할 수 있습니다.
 *                    이 기능이 필요하지 않은 경우, 매개변수 값을 0으로 설정하시기 바랍니다.
 *      - animationId : 애니메이션의 ID 값을 지정하세요. 이 값은 1부터 시작해야 합니다.
 *
 * StopStaticAnimation uniqId
 *      - uniqId : 애니메이션 제거 시에 필요한 식별자를 문자열로 지정하세요.
 *
 * 애니메이션을 제거하지 않아도 전투가 종료될 때 알아서 제거됩니다.
 *
 * 이 플러그인은 의도적으로 ES6 문법을 위주로 사용하였기 때문에
 * RPG Maker MV v1.6.1 이상에서만 사용할 수 있습니다.
 *
 * =====================================================================
 * Change Log
 * =====================================================================
 * 2019.09.11 (v1.0.0) - First Release.
 * 2019.10.10 (v1.0.1) :
 * - 프론트 뷰에서 애니메이션이 재생되지 않는 문제를 수정하였습니다.
 * - YEP_CoreEngine 의존성에 대한 설명이 추가되었습니다.
 * 2019.10.11 (v1.0.2) :
 * - 배틀러 설정 없이 애니메이션을 표시할 수 있는 기능을 추가하였습니다.
 * - 화면 중앙에 표시되지 않는 문제를 수정하였습니다.
 */

var Imported = Imported || {};
Imported.RS_BattleStaticAnimation = true;

var RS = RS || {};
RS.BattleStaticAnimation = RS.BattleStaticAnimation || {};

(() => {
    "use strict";

    let parameters = $plugins.filter((i) => {
        return i.description.contains("<RS_BattleStaticAnimation>");
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    if (Utils.RPGMAKER_VERSION < "1.6.1") {
        throw new Error(
            `Sorry. This plugin couldn't execute it in the RPG Maker MV v1.5.2 or less.`
        );
    }

    //=====================================================================
    // Sprite_StaticAnimation
    //=====================================================================

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
        this.on("removed", this.removeStaticAnimation, this);
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

        let animation = new Sprite_StaticAnimation(battler, animationId);

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

        let animation = new Sprite_ScreenAnimation(animationId);

        animation.x = Graphics.boxWidth / 2 + ox;
        animation.y = Graphics.boxHeight / 2 + oy;
        animation.uniqId = uniqId;

        this._staticAnimation.addChild(animation);
    };

    Spriteset_Battle.prototype.stopStaticAnimation = function (uniqId) {
        if (!Imported.YEP_CoreEngine) return;
        if (!Imported.YEP_BattleEngineCore) return;
        if (!this._staticAnimation) return;

        const children = this._staticAnimation.children;
        if (!children) return;

        deleted = children.filter((i) => i.uniqId === uniqId);

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
        let battlers = BattleManager.allBattleMembers();
        const maxBattlers = battlers.length;
        const maxActors = $gameParty.members().length;

        if (battlerId < 0) {
            battlerId = (maxActors - 1 + Math.abs(battlerId)) % maxBattlers;
        } else {
            battlerId = (battlerId - 1) % maxActors;
        }

        let battler = battlers[battlerId];

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
    var alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "PlayStaticAnimation") {
            const uniqId = args[0];
            const battlerId = Number(args[1]);
            const animationId = Number(args[2]);
            BattleManager.playStaticAnimation(uniqId, battlerId, animationId);
        } else if (command === "PlayScreenAnimation") {
            const uniqId = args[0];
            const ox = Number(args[1]);
            const oy = Number(args[2]);
            const animationId = Number(args[3]);
            BattleManager.playScreenAnimation(uniqId, ox, oy, animationId);
        } else if (command === "StopStaticAnimation") {
            const uniqId = args[0];
            BattleManager.stopStaticAnimation(uniqId);
        }
    };
})(RS.BattleStaticAnimation);
