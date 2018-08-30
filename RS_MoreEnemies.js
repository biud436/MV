/*:
 * @plugindesc <RS_MoreEnemies>
 * @author biud436
 * 
 * @param Troop Settings
 * @type struct<Troop>[]
 * @desc
 * @default []
 * 
 * @param Enemy Reposition
 * @type struct<EnemyReposition>
 * @desc 
 * @default {"reposition":"false","width":"4","height":"6","x":"96 + (96 * x);","y":"Graphics.boxHeight / 3 + (96 * y);"}
 * 
 * @help
 * ======================================================
 * Change Log
 * ======================================================
 * 2018.08.31 (v1.0.0) - First Release.
 */
/*~struct~Troop:
 * 
 * @param troopId
 * @type troop
 * @min 1
 * @desc
 * @default 1
 * 
 * @param moreEnemies
 * @type struct<Enemy>[]
 * @desc
 * @default
 * 
 */
 /*~struct~Enemy:
  *
  * @param enemyId
  * @text enemyId
  * @type enemy
  * @desc 
  * @default 1
  * 
  * @param x
  * @text x
  * @type number
  * @min 0
  * @desc
  * @default 300
  *
  * @param y
  * @text y
  * @type number
  * @min 0
  * @desc
  * @default 200
  * 
  * @param hidden
  * @type boolean
  * @desc
  * @default false
  * @on true
  * @off false
  * 
  */
  /*~struct~EnemyReposition:
  *
  * @param reposition
  * @type boolean
  * @desc
  * @default false
  * @on true
  * @off false
  * 
  * @param width
  * @type number
  * @desc
  * @default 4
  * @min 3
  * 
  * @param height
  * @type number
  * @desc
  * @default 6
  * @min 3
  * 
  */ 
/*:ko
 * @plugindesc <RS_MoreEnemies>
 * @author biud436
 * 
 * @param Troop Settings
 * @type struct<Troop>[]
 * @desc 적 그룹을 설정하십시오.
 * @default []
 * 
 * @param Enemy Reposition
 * @type struct<EnemyReposition>
 * @desc 에너미의 위치를 바둑판 형식으로 재정렬합니다.
 * @default {"reposition":"false","width":"4","height":"6","x":"96 + (96 * x);","y":"Graphics.boxHeight / 3 + (96 * y);"}
 * 
 * @help
 * ======================================================
 * Change Log
 * ======================================================
 * 2018.08.31 (v1.0.0) - First Release.
 */
/*~struct~Troop:ko
 * 
 * @param troopId
 * @type troop
 * @min 1
 * @desc 적 군단(적 그룹)의 ID 값을 선택하십시오.
 * @default 1
 * 
 * @param moreEnemies
 * @type struct<Enemy>[]
 * @desc 새로운 적을 생성하십시오.
 * @default 
 * 
 */
 /*~struct~Enemy:ko
  *
  * @param enemyId
  * @text enemyId
  * @type enemy
  * @desc ID 값을 설정합니다
  * @default 1
  * 
  * @param x
  * @text x
  * @type number
  * @min 0
  * @desc x좌표를 설정합니다.
  * @default 300
  *
  * @param y
  * @text y
  * @type number
  * @min 0
  * @desc y좌표를 설정합니다.
  * @default 200
  * 
  * @param hidden
  * @type boolean
  * @desc 숨어있다가 중간에 나타날 지 여부를 설정합니다.
  * @default false
  * @on true
  * @off false
  * 
  */
  /*~struct~EnemyReposition:ko
  *
  * @param reposition
  * @type boolean
  * @desc 위치를 바둑판으로 재설정하는 기능을 사용하시겠습니까? (기본값 = 사용하지 않는다)
  * @default false
  * @on 사용한다.
  * @off 사용하지 않는다.
  * 
  * @param width
  * @type number
  * @desc 바둑판 배열 계산에 필요한 폭 값 (바둑판의 폭)
  * @default 4
  * @min 3
  * 
  * @param height
  * @type number
  * @desc 바둑판 배열 계산에 필요한 높이 값 (바둑판의 높이)
  * @default 6
  * @min 3
  * 
  * @param x
  * @desc 좌표 계산식을 입력하세요.
  * @default 96 + (96 * x);
  * 
  * @param y
  * @desc 좌표 계산식을 입력하세요.
  * @default Graphics.boxHeight / 3 + (96 * y);
  * 
  */

var Imported = Imported || {};
Imported.RS_MoreEnemies = true;

var RS = RS || {};
RS.MoreEnemies = RS.MoreEnemies || {};

(function($) {

    "use strict";

    var parameters = $plugins.filter(function(i) {
        return i.description.contains('<RS_MoreEnemies>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;


    $.jsonParse = function (str) {
        var retData = JSON.parse(str, function (k, v) {
          try { return $.jsonParse(v); } catch (e) { return v; }
        });
        return retData;
    };    

    var troopSettings;
    if(parameters["Troop Settings"] !== "") {
        troopSettings = $.jsonParse(parameters["Troop Settings"]);
    }

    var enemyReposition;
    if(parameters["Enemy Reposition"]) {
        enemyReposition = $.jsonParse(parameters["Enemy Reposition"]);
    }

    $.createMoreEnemies = function() {
        troopSettings.forEach(function(settings) {
            var troopId = settings.troopId;
            var troop = $dataTroops && $dataTroops[troopId];
            if(troop) {
                settings.moreEnemies.forEach(function(event) {
                    if($dataTroops[troopId].members instanceof Array) {
                        $dataTroops[troopId].members.push(event);
                    }
                }, this);
            }
        }, this);
    };

    var alias_Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        alias_Spriteset_Battle_createEnemies.call(this);
        if(enemyReposition && enemyReposition.reposition) this.setPositionForEnemies();
    };

    Spriteset_Battle.prototype.setPositionForEnemies = function() {
        
        let id = 0;
        const WIDTH = enemyReposition.width || 6;
        const HEIGHT = enemyReposition.height || 4;

        for(let y = 0; y < 6; y++) {
            for(let x = 0; x < 4; x++) {
                let mx = eval(enemyReposition.x) || (96 + (96 * x));
                let my = eval(enemyReposition.y) || (Graphics.boxHeight / 3 + (96 * y));
                if(this._enemySprites[id]) this._enemySprites[id].setHome(mx, my);
                id += 1;
            }
        }
    };

    var alias_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        $.createMoreEnemies();        
        alias_Scene_Boot_start.call(this);
    };
  
})(RS.MoreEnemies);