/*:
 * @plugindesc <RS_TurnActorEnemy>
 * @author biud436
 * @help
 * In the battle event condition,
 * This plugin allows you to set the enemy's turn and the actor's turn count values.
 * 
 * In the condition window of the troop tab,
 * You must set the following note tags to the switch's name.
 * 
 * <TURN_ACTOR : actor_id turn_a turn_b>
 * <TURN_ENEMY : enemy_index turn_a turn_b>
 * 
 * Suppose you set the switch name as follows:
 * 
 * <TURN_ACTOR : 2 0 1>
 * 
 * The turn calculates using formulas such as 'turn_a + (turn_b * X)',
 * So the battle event is executed whenever actor2's turn is returned.
 * 
 * ==================================================
 * Version Log
 * ==================================================
 * 2019.06.29 (v1.0.0) - First Release.
 * 2019.06.30 (v1.0.1) :
 * - Added the new feature that checks whether the actor's id or enemy's index is correct.
 * - Now it starts the battle event together when enemy or actor gets a turn.
 * - It is now compatible with YEP_BattleEngineCore.
 */
/*:ko
 * @plugindesc RM2K3의 전투 이벤트 시작 조건처럼 몬스터의 턴, 액터의 턴을 설정합니다. <RS_TurnActorEnemy>
 * @author biud436
 * @help
 * 
 * 사용법은 다음과 같습니다.
 * 
 * 적 그룹의 전투 이벤트 설정으로 가면 조건 창이 있습니다.
 * 조건 창에 노트 태그 란이 없기 때문에 스위치 체크 박스를 활성화하고,
 * 한 스위치를 선택하여 이름 부분에 다음과 같은 노트 태그를 설정하세요.
 * 
 * <TURN_ACTOR : actor_id turn_a turn_b>
 * <TURN_ENEMY : enemy_index turn_a turn_b>
 * 
 * 조건 -스위치 이름을 다음과 같이 설정했다고 가정해봅시다.
 * 
 * <TURN_ACTOR : 2 0 1>
 * 
 * 턴은 turn_a + (turn_b * X)로 계산되며 1X로 환산됩니다.
 * 따라서 전투 이벤트는 2번 액터의 턴이 돌아올 때마다 실행됩니다.
 * 
 * ==================================================
 * Version Log
 * ==================================================
 * 2019.06.29 (v1.0.0) - First Release.
 * 2019.06.30 (v1.0.2) :
 * - actorId 및 enemyIndex를 체크하는 기능 추가
 * - 배틀러의 턴이 시작될 때, 전투 이벤트도 같이 시작됩니다.
 * - YEP_BattleEngineCore 관련 기능 추가
 */

var Imported = Imported || {};
Imported.RS_TurnActorEnemy = true;

var RS = RS || {};
RS.TurnActorEnemy = RS.TurnActorEnemy || {};

(function($) {
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_TurnActorEnemy>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = {};
    $.Params.isDatabaseLoaded = false;

    //====================
    // DataManager
    //====================         

    var alias_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if(!alias_DataManager_isDatabaseLoaded.call(this)) return false;
        if($.Params.isDatabaseLoaded) return true;

        for(var i = 1; i < $dataTroops.length; i++) {
            var pages = $dataTroops[i].pages;
            for(var j = 0; j < pages.length; j++) {
                var page = pages[j];
                var c = page.conditions;
                var switchId = c.switchId;
                if(c.switchValid) {
                    var note = $dataSystem.switches[switchId];
                    if(/\<(?:TURN_ENEMY)[ ]:[ ](\d+)[ ](\d+)[ ](\d+)\>/.exec(note)) {
                        var enemyIndex = parseInt(RegExp.$1); 
                        var turnA = parseInt(RegExp.$2);
                        var turnB = parseInt(RegExp.$3);

                        c.turnEnemyValid = true;
                        c.turnEnemyIndex = enemyIndex;
                        c.turnEnemyA = turnA;
                        c.turnEnemyB = turnB;               
                    } else if(/\<(?:TURN_ACTOR)[ ]:[ ](\d+)[ ](\d+)[ ](\d+)\>/.exec(note)) {
                        var actorId = parseInt(RegExp.$1); 
                        var turnA = parseInt(RegExp.$2);
                        var turnB = parseInt(RegExp.$3);

                        c.turnActorValid = true;
                        c.turnActorId = actorId;
                        c.turnActorA = turnA;
                        c.turnActorB = turnB;               
                    }
                }
            }
        }

        $.Params.isDatabaseLoaded = true;

        return true;
    };

    //====================
    // Game_Troop
    //====================       

    var alias_Game_Troop_clear = Game_Troop.prototype.clear;
    Game_Troop.prototype.clear = function() {
        alias_Game_Troop_clear.call(this);
        this._turnFlags = {};
    };
    
    Game_Troop.prototype.setup2K3BattleEvent = function(index) {
        if (!this._interpreter.isRunning()) {
            if (this._interpreter.setupReservedCommonEvent()) {
                return;
            }
            var pages = this.troop().pages;
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (this.meetsConditions2(page, index) && !this._turnFlags[i]) {
                    this._interpreter.setup(page.list);
                    if (page.span <= 1) {
                        this._turnFlags[index] = true;
                    }                    
                    break;
                }
            }            
        }
    };

    Game_Troop.prototype.onTurnFlags = function(index) {
        var pages = this.troop().pages;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page.span === 1) {
                this._turnFlags[index] = false;
            }
        }
    };

    Game_Troop.prototype.meetsConditions2 = function(page, index) {
        var c = page.conditions;
        if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
                !c.actorValid && !c.turnActorValid && !c.turnEnemyValid && !c.switchValid) {
            return false;  // Conditions not set
        }
        if (c.turnEnding) {
            if (!BattleManager.isTurnEnd()) {
                return false;
            }
        }
        if (c.turnValid) {
            var n = this._turnCount;
            var a = c.turnA;
            var b = c.turnB;
            if ((b === 0 && n !== a)) {
                return false;
            }
            if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
                return false;
            }
        }
        if (c.enemyValid) {
            var enemy = $gameTroop.members()[c.enemyIndex];
            if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
                return false;
            }
        }
        if (c.actorValid) {
            var actor = $gameActors.actor(c.actorId);
            if (!actor || actor.hpRate() * 100 > c.actorHp) {
                return false;
            }
        }
        if (c.turnActorValid) {
            var actor = $gameActors.actor(c.turnActorId);
            if(!actor) {
                return false;
            }
            var n = actor.turnCount();
            var a = c.turnActorA;
            var b = c.turnActorB;
            var id = index.split("_");
            if(id[0] !== "actor") {
                return false;
            }
            if(parseInt(id[1]) !== c.turnActorId) {
                return false;
            }            
            if ((b === 0 && n !== a)) {
                return false;
            }
            if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
                return false;
            }
        } else if (c.turnEnemyValid) {
            var enemy = $gameTroop.members()[c.turnEnemyIndex];
            if(!enemy) {
                return false;
            }
            var n = enemy.turnCount();
            var a = c.turnEnemyA;
            var b = c.turnEnemyB;
            var id = index.split("_");
            if(id[0] !== "enemy") {
                return false;
            }            
            if(parseInt(id[1]) !== c.turnEnemyIndex) {
                return false;
            }            
            if ((b === 0 && n !== a)) {
                return false;
            }
            if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
                return false;
            }      
        } else if (c.switchValid) {
            if (!$gameSwitches.value(c.switchId)) {
                return false;
            }
        }
        return true;
    };

    //====================
    // Game_Battler
    //====================

    $.isBattleEngineCore = function() {
        if(!Imported.YEP_BattleEngineCore) return false;
        if(!BattleManager.isTickBased()) return false;
        if(!Yanfly.Param.BECAISelfTurn) return false;
        return true;
    };

    var alias_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        alias_Game_Battler_initMembers.call(this);
        if(!$.isBattleEngineCore()) this._turnCount = 0;
    };

    Game_Battler.prototype.clearTurn = function() {
        if($.isBattleEngineCore()) return;
        this._turnCount = 0;
    };

    Game_Battler.prototype.increaseTurn = function(index) {
        if($.isBattleEngineCore()) {
            this.increaseSelfTurnCount();
            return;
        }
        this._turnCount++;
    };

    var alias_Game_Battler_turnCount = Game_Battler.prototype.turnCount;
    Game_Battler.prototype.turnCount = function() {
        if($.isBattleEngineCore()) {
            return alias_Game_Battler_turnCount.call(this);
        }
        return this._turnCount;
    };

    var alias_Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        alias_Game_Battler_onBattleStart.call(this);
        this.clearTurn();
    };

    //====================
    // BattleManager
    //====================    

    var alias_BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        alias_BattleManager_startAction.call(this);  
        var subject = this._subject;
        if(subject) {
            var index = "";
            if(subject.isEnemy()) {
                index += "enemy_";
                index += subject.index();
            } else if(subject.isActor()) {
                index += "actor_"; 
                index += subject.actorId();
            }
            subject.increaseTurn(index);
            $gameTroop.setup2K3BattleEvent(index);
            $gameTroop.onTurnFlags(index);            
        }        
    };    

})(RS.TurnActorEnemy);