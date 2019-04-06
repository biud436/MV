/*:
 * @plugindesc <ActionEnemiesShakeEffect>
 * @author biud436
 * @help
 * EVAL: BattleManager.actionEnemiesShakeEffect(["enemy 0", "enemy 1", "enemy 2"], 15);
 */

var Imported = Imported || {};
Imported.ActionEnemiesShakeEffect = true;

(function () {
    
    if(!Imported.YEP_BattleEngineCore) return;
    if(!Imported.YEP_X_ActSeqPack1) return;
    if(!Imported.YEP_X_ActSeqPack2) return;

    BattleManager.actionTargetShakeEffect = function (target, offset) {
        "use strict";
    
        var actionArgs1 = `${target}, base, 3, auto offset x +${offset}`.split(", ");
        var actionArgs2 = `${target}, base, 3, auto offset x -${offset}`.split(", ");
    
        for(var i = 0; i < 3; i++) {
            this.actionMove(target, actionArgs1);
            this.actionWait(3);
            this.actionMove(target, actionArgs2);
            this.actionWait(3);        
        }
    };
    
    BattleManager.actionEnemiesShakeEffect = function (targets, offset) {
        targets.forEach(function(target) { 
            BattleManager.actionTargetShakeEffect(target, offset); 
        });
    };

})();
