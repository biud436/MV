//================================================================
// RS_MoreEnemies.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc This plugin allows you to add a lot of enemies. <RS_MoreEnemies>
 * @author biud436
 *
 * @param Troop Settings
 * @type struct<Troop>[]
 * @desc Add the more enemies settings as you want!
 * @default []
 *
 * @help
 * ======================================================
 * Introduction
 * ======================================================
 * This plugin allows you to add more enemies to existing enemy troops
 * in your game. By default, RPG Maker MV has a limitation on enemy
 * placement, but with this plugin you can add many more enemies and
 * control their positions.
 *
 * ======================================================
 * Features
 * ======================================================
 * - Add multiple enemies to any troop
 * - Custom enemy positioning
 * - Automatic grid-based positioning system
 * - Option to make enemies hidden at battle start
 * - Compatible with existing battle system
 *
 * ======================================================
 * How to Use
 * ======================================================
 * 1. Set up the "Troop Settings" parameter in the plugin manager
 * 2. For each troop you want to modify, add an entry with the troop ID
 * 3. Add enemies to the "moreEnemies" parameter with positions
 * 4. Optionally use the auto-positioning feature with "enemyReposition"
 *
 * Example of auto-positioning:
 * - Set "reposition" to true
 * - Set "width" and "height" for your grid (e.g. 4x6)
 * - The formulas for x and y will automatically position enemies in a grid
 *
 * ======================================================
 * Tips
 * ======================================================
 * - For large battles, consider using a wider battle screen
 * - Hidden enemies can be revealed with regular event commands
 * - You can adjust the grid spacing by modifying the x/y formulas
 * - Make sure to balance your battles after adding more enemies
 *
 * ======================================================
 * Change Log
 * ======================================================
 * 2018.08.31 (v1.0.0) - First Release.
 * 2018.08.31 (v1.0.1) :
 * - Now this plugin will be included the struct named Enemy Reposition in the plugin parameter called Troop Settings.
 * 2022.05.08 (v1.0.2) :
 * - migrated to ES6
 */
/*~struct~Troop:
 *
 * @param troopId
 * @type troop
 * @min 1
 * @desc Specify troop's ID.
 * @default 1
 *
 * @param moreEnemies
 * @type struct<Enemy>[]
 * @desc Add a new enemy in their troop and set up the position.
 * @default ["{\"enemyId\":\"1\",\"x\":\"300\",\"y\":\"200\",\"hidden\":\"false\"}"]
 *
 * @param enemyReposition
 * @type struct<EnemyReposition>
 * @desc if you need to set up enemies' location automatically? it is here.
 * @default {"reposition":"false","width":"4","height":"6","x":"96 + (96 * x);","y":"Graphics.boxHeight / 3 + (96 * y);"}
 *
 */
/*~struct~Enemy:
 *
 * @param enemyId
 * @text enemyId
 * @type enemy
 * @desc Specify the ID for enemy.
 * @default 1
 *
 * @param x
 * @text x
 * @type number
 * @min 0
 * @desc Specify the screen x position for enemy
 * @default 300
 *
 * @param y
 * @text y
 * @type number
 * @min 0
 * @desc Specify the screen y position for enemy
 * @default 200
 *
 * @param hidden
 * @type boolean
 * @desc Visible or hidden settings. this sets up as the hiding state basically. This state can be changed later
 * @default false
 * @on true
 * @off false
 *
 */
/*~struct~EnemyReposition:
 *
 * @param reposition
 * @type boolean
 * @desc if you are added a lot of monsters to your game? to use this, it could set the location automatically.
 * @default false
 * @on true
 * @off false
 *
 * @param width
 * @type number
 * @desc The field is represented by a two-dimensional array. I used a double loop to set its location in the entries.
 * @default 4
 * @min 3
 *
 * @param height
 * @type number
 * @desc The field is represented by a two-dimensional array. I used a double loop to set its location in the entries.
 * @default 6
 * @min 3
 *
 * @param x
 * @desc make it possible for the game to place enemies' x position when initializing the combat.
 * @default 96 + (96 * x);
 *
 * @param y
 * @desc make it possible for the game to place enemies' y position when initializing the combat.
 * @default Graphics.boxHeight / 3 + (96 * y);
 *
 */
/*:ko
 * @plugindesc <RS_MoreEnemies>
 * @author biud436
 *
 * @param Troop Settings
 * @text 적 그룹 설정
 * @type struct<Troop>[]
 * @desc 적 그룹을 설정하십시오.
 * @default []
 *
 * @help
 * ======================================================
 * Change Log
 * ======================================================
 * 2018.08.31 (v1.0.0) - First Release.
 * 2018.08.31 (v1.0.1) - 적 그룹 매개변수 안에 위치 재설정 기능이 포함되게 수정하였습니다.
 * 2022.05.08 (v1.0.2) :
 * - migrated to ES6
 */
/*~struct~Troop:ko
 *
 * @param troopId
 * @text 적 그룹 ID
 * @type troop
 * @min 1
 * @desc 적 군단(적 그룹)의 ID 값을 선택하십시오.
 * @default 1
 *
 * @param moreEnemies
 * @text 새로운 에너미 생성
 * @type struct<Enemy>[]
 * @desc 새로운 적을 생성하십시오.
 * @default ["{\"enemyId\":\"1\",\"x\":\"300\",\"y\":\"200\",\"hidden\":\"false\"}"]
 *
 * @param enemyReposition
 * @text 에너미 위치 설정
 * @type struct<EnemyReposition>
 * @desc 에너미의 위치를 바둑판 형식으로 재정렬합니다.
 * @default {"reposition":"false","width":"4","height":"6","x":"96 + (96 * x);","y":"Graphics.boxHeight / 3 + (96 * y);"}
 *
 */
/*~struct~Enemy:ko
 *
 * @param enemyId
 * @text 에너미 ID
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
 * @text 숨김 여부
 * @type boolean
 * @desc 숨어있다가 중간에 나타날 지 여부를 설정합니다.
 * @default false
 * @on 숨긴다
 * @off 표시한다
 *
 */
/*~struct~EnemyReposition:ko
 *
 * @param reposition
 * @text 위치 재설정 여부
 * @type boolean
 * @desc 위치를 바둑판으로 재설정하는 기능을 사용하시겠습니까? (기본값 = 사용하지 않는다)
 * @default false
 * @on 사용한다.
 * @off 사용하지 않는다.
 *
 * @param width
 * @text 폭
 * @type number
 * @desc 바둑판 배열 계산에 필요한 폭 값 (바둑판의 폭). 이중 루프를 사용하여 배치합니다.
 * @default 4
 * @min 3
 *
 * @param height
 * @text 높이
 * @type number
 * @desc 바둑판 배열 계산에 필요한 높이 값 (바둑판의 높이). 이중 루프를 사용하여 배치합니다.
 * @default 6
 * @min 3
 *
 * @param x
 * @desc 좌표 계산식을 입력하세요. (x는 이중 루프로 구성한 2차원 셀에서의 인덱스 값입니다)
 * @default 96 + (96 * x);
 *
 * @param y
 * @desc 좌표 계산식을 입력하세요. (y는 이중 루프로 구성한 2차원 셀에서의 인덱스 값입니다)
 * @default Graphics.boxHeight / 3 + (96 * y);
 *
 */

(() => {
  'use strict';

  let parameters = $plugins.filter(i => {
    return i.description.contains('<RS_MoreEnemies>');
  });
  parameters = parameters.length > 0 && parameters[0].parameters;

  const RS = {};
  RS.MoreEnemies = {
    jsonParse(str) {
      const retData = JSON.parse(str, (k, v) => {
        try {
          return this.jsonParse(v);
        } catch (e) {
          return v;
        }
      });
      return retData;
    },
  };

  let troopSettings;
  if (parameters['Troop Settings'] !== '') {
    troopSettings = RS.MoreEnemies.jsonParse(parameters['Troop Settings']);
  }

  Object.assign(RS.MoreEnemies, {
    createMoreEnemies() {
      troopSettings.forEach(settings => {
        const troopId = settings.troopId;
        const troop = $dataTroops && $dataTroops[troopId];
        if (troop) {
          settings.moreEnemies.forEach(event => {
            if ($dataTroops[troopId].members instanceof Array) {
              $dataTroops[troopId].members.push(event);
            }
          });
        }
      });
    },
  });

  const alias_Spriteset_Battle_createEnemies =
    Spriteset_Battle.prototype.createEnemies;
  Spriteset_Battle.prototype.createEnemies = function () {
    alias_Spriteset_Battle_createEnemies.call(this);
    this.setPositionForEnemies();
  };

  Spriteset_Battle.prototype.setPositionForEnemies = function () {
    const troopId = $gameTroop._troopId;

    if (!troopSettings) return;

    // if there has troop settings?
    let enemyReposition = troopSettings.filter(settings => {
      return settings.troopId === troopId;
    });

    if (Array.isArray(enemyReposition) && enemyReposition.length <= 0) return;

    enemyReposition = enemyReposition[0].enemyReposition;

    // if the reposition is enabled?
    if (!enemyReposition.reposition) return;

    let id = 0;
    const WIDTH = enemyReposition.width || 4;
    const HEIGHT = enemyReposition.height || 6;

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let mx = eval(enemyReposition.x) || 96 + 96 * x;
        let my = eval(enemyReposition.y) || Graphics.boxHeight / 3 + 96 * y;
        if (this._enemySprites[id]) this._enemySprites[id].setHome(mx, my);
        id += 1;
      }
    }
  };

  const alias_Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    RS.MoreEnemies.createMoreEnemies();
    alias_Scene_Boot_start.call(this);
  };
})();
