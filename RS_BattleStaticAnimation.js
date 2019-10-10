//================================================================
// RS_BattleStaticAnimation.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
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
 */
/*:ko
 * @plugindesc This plugin allows you to play the loop animation during the battle <RS_BattleStaticAnimation>
 * @author biud436
 *          
 * @help
 * 
 * 플러그인을 구동 시 YEP_CoreEngine과 YEP_BattleEngineCore.js 파일이 필요하므로, 
 * YEP_CoreEngine과 YEP_BattleEngineCore 플러그인 아래 어딘가에 플러그인을 배치하시기 바랍니다.
 * 
 * 전투 도중에 특정 애니메이션을 반복 재생합니다.
 * 
 * PlayStaticAnimation uniqId battlerId animationId
 *      - uniqId : 애니메이션 제거 시에 필요한 식별자를 문자열로 지정하세요.
 *      - battlerId : 배틀러 ID가 -일 경우, Enemy의 ID 값을 뜻하고 +면 아군의 ID 값을 뜻합니다.
 *      - animationId : 애니메이션의 ID 값을 지정하세요.
 * 
 * 애니메이션 반복 재생은 배틀러가 도중에 죽었을 땐 반복이 중단됩니다.
 * 전투 애니메이션은 통상적으로 모든 배틀러의 앞 쪽에 위치합니다.
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
 * - 프론트 뷰에서도 사용 가능
 * - 설명을 수정하였습니다.
 */

var Imported = Imported || {};
Imported.RS_BattleStaticAnimation = true;

var RS = RS || {};
RS.BattleStaticAnimation = RS.BattleStaticAnimation || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_BattleStaticAnimation>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    if(Utils.RPGMAKER_VERSION < "1.6.1") {
        throw new Error(`Sorry. This plugin couldn't execute it in the RPG Maker MV v1.5.2 or less.`);
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
            if(!this._effectTarget) return false;
            if(!this._battler) return false;
            if(this._animationId <= 0) return false;
            return !this._battler.isDead();
        }

        removeMembers() {
            this._battler = null;
            this._effectTarget = null;
            this._animationId = 0;            
        }

        update() {
            super.update();
            if(this.isPlayable() && this.isValid()) {
                const anim = $dataAnimations[this._animationId];
                this.startAnimation(anim, false, 0);
            }
        }

    }

    //=====================================================================
    // Spriteset_Battle
    //=====================================================================    

    Spriteset_Battle.prototype.createStaticAnimation = function() {
        if(!Imported.YEP_BattleEngineCore) return;
        if(this._staticAnimation) this._baseSprite.removeChild(this._staticAnimation);

        this._staticAnimation = new Sprite();
        this._baseSprite.addChild(this._staticAnimation);
        this.on('removed', this.removeStaticAnimation, this);
    };    

    Spriteset_Battle.prototype.removeStaticAnimation = function() {
        if(!Imported.YEP_BattleEngineCore) return;
        if(!this._staticAnimation) return;    
        this._staticAnimation.removeChildren();
        this._baseSprite.removeChild(this._staticAnimation);
        this._staticAnimation = null;
    };    

    Spriteset_Battle.prototype.playStaticAnimation = function(uniqId, battler, animationId) {
        if(!Imported.YEP_BattleEngineCore) return;
        if(!BattleManager.allBattleMembers().contains(battler)) {
            return;
        }
        if(!this._staticAnimation) return;
        
        const x = battler.spriteHomeX();
        const y = battler.spriteHomeY();

        let animation = new Sprite_StaticAnimation(battler, animationId);

        animation.x = x;
        animation.y = y;
        animation.uniqId = uniqId;
        
        this._staticAnimation.addChild(animation);

    };

    Spriteset_Battle.prototype.stopStaticAnimation = function(uniqId) {
        if(!Imported.YEP_BattleEngineCore) return;
        if(!this._staticAnimation) return;

        const children = this._staticAnimation.children;
        if(!children) return;
        
        deleted = children.filter(i => i.uniqId === uniqId);

        if(deleted[0]) {
            deleted[0].removeMembers();
            this._staticAnimation.removeChild(deleted[0]);
        }

    };

    let alias_Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
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
    BattleManager.playStaticAnimation = function(uniqId, battlerId, animationId) {
        if(!Imported.YEP_BattleEngineCore) return;       
        if(!this._spriteset) return;
        let battlers = BattleManager.allBattleMembers();
        const maxBattlers = battlers.length;
        const maxActors = $gameParty.members().length;
        
        if(battlerId < 0) {
            battlerId = ((maxActors - 1) + Math.abs(battlerId)) % maxBattlers;
        } else {
            battlerId = (battlerId - 1) % maxActors;
        }

        let battler = battlers[battlerId];

        if(battlers.contains(battler)) {
            this._spriteset.playStaticAnimation(uniqId, battler, animationId);
        }

    };

    BattleManager.stopStaticAnimation = function(uniqId) {
        if(!Imported.YEP_BattleEngineCore) return;    
        if(!this._spriteset) return;   
        this._spriteset.stopStaticAnimation(uniqId);
    };

    //=====================================================================
    // Game_Interprter
    //=====================================================================        
    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "PlayStaticAnimation") {
            const uniqId = args[0];
            const battlerId = Number(args[1]);
            const animationId = Number(args[2]);
            BattleManager.playStaticAnimation(uniqId, battlerId, animationId);
        }
        if(command === "StopStaticAnimation") {
            const uniqId = args[0];
            BattleManager.stopStaticAnimation(uniqId);
        }
    };

})(RS.BattleStaticAnimation);