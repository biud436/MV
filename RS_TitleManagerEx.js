//================================================================
// RS_TitleManagerEx.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================

var Imported = Imported || {};
Imported.RS_TitleManagerEx = true;

/*:
 * @plugindesc This plugin allows player to change resources of the title scene after the user has been ended a certain epilogue.
 * @author biud436
 *
 * @param Epilogue 1
 *
 * @param ep1 Title1
 * @text Title 1
 * @parent Epilogue 1
 * @desc Specify the title 1 image.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep1 Title2
 * @text Title 2
 * @parent Epilogue 1
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep1 BGM
 * @text BGM
 * @parent Epilogue 1
 * @desc Specify the BGM file
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 2
 *
 * @param ep2 Title1
 * @text Title 1
 * @parent Epilogue 2
 * @desc Specify the title 1 image.
 * @default Devil
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep2 Title2
 * @text Title 2
 * @parent Epilogue 2
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep2 BGM
 * @text BGM
 * @parent Epilogue 2
 * @desc Specify the BGM file.
 * @default Field2
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 3
 *
 * @param ep3 Title1
 * @text Title 1
 * @parent Epilogue 3
 * @desc Specify the title 1 image.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep3 Title2
 * @text Title 2
 * @parent Epilogue 3
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep3 BGM
 * @text BGM
 * @parent Epilogue 3
 * @desc Specify the BGM file.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 4
 *
 * @param ep4 Title1
 * @text Title 1
 * @parent Epilogue 4
 * @desc Specify the title 1 image.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep4 Title2
 * @text Title 2
 * @parent Epilogue 4
 * @desc Specify the title 2 image.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep4 BGM
 * @text BGM
 * @parent Epilogue 4
 * @desc Specify the BGM file.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Location
 *
 * @param Map ID
 * @parent Location
 * @desc Specify the id of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @default 1
 *
 * @param Map X
 * @parent Location
 * @desc Specify the starting point of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @min 0
 * @default 0
 *
 * @param Map Y
 * @parent Location
 * @desc Specify the starting point of hidden map. This can move to a hidden map through a newly created command
 * @type number
 * @min 0
 * @default 0
 *
 * @param Additional Command
 *
 * @param Specific Command
 * @parent Additional Command
 * @desc Specify the command name. This can move to a hidden map through this command
 * @type text
 * @default Specific Command
 *
 * @param Show Specific Command
 * @text Show
 * @parent Additional Command
 * @desc Decide whether the command window is visible.
 * @type boolean
 * @default true
 * @on visible
 * @off hide
 *
 * @help
 * =============================================================================
 * Plugin Features
 * =============================================================================
 *
 * The RS_TitleManagerEx plugin allows you to dynamically change the title screen
 * resources (background images and music) after players complete specific epilogues
 * or endings in your game.
 *
 * Key Features:
 *
 * 1. Dynamic Title Screen:
 *    - Configure up to 4 different title screen variations (epilogues)
 *    - Each epilogue can have unique background images and BGM
 *
 * 2. Epilogue Tracking:
 *    - The plugin automatically tracks which endings the player has seen
 *    - Use this information to unlock content or provide bonuses
 *
 * 3. Special Menu Command:
 *    - Add a special command to the title menu after completing an ending
 *    - This command can transfer players to a hidden/bonus map
 *
 * 4. Hidden Content Access:
 *    - Allow access to post-game content through the special command
 *    - Create New Game+ or gallery features
 *
 * =============================================================================
 * Plugin Commands
 * =============================================================================
 *
 * 1. Setting an Epilogue as Completed:
 *    When a player reaches an ending, use this command:
 *
 *    Ending Setup ending1    // For the first epilogue
 *    Ending Setup ending2    // For the second epilogue
 *    Ending Setup ending3    // For the third epilogue
 *    Ending Setup ending4    // For the fourth epilogue
 *
 * 2. Resetting All Epilogues:
 *    To reset the title screen to its original state:
 *
 *    Ending RemoveAll
 *
 * =============================================================================
 * JavaScript API
 * =============================================================================
 *
 * 1. Check if an Epilogue is Completed:
 *
 *    if ($gameMap.isClearEnding("ending1")) {
 *        // Code to execute if ending1 is completed
 *        // E.g., unlock special content, show different dialogue
 *    }
 *
 * 2. Get All Completed Epilogues:
 *
 *    const completedEndings = $gameMap.getEnding();
 *    console.log("Completed endings:", completedEndings);
 *    // Example output: ["ending1", "ending3"]
 *
 * 3. Count Completed Epilogues:
 *
 *    const endingCount = $gameMap.getEnding().length;
 *    console.log(`Player has seen ${endingCount} out of 4 possible endings`);
 *
 *    // Calculate completion percentage
 *    const completionPercentage = (endingCount / 4) * 100;
 *    console.log(`Game completion: ${completionPercentage}%`);
 *
 * =============================================================================
 * Implementation Examples
 * =============================================================================
 *
 * Example 1: Setting Different Epilogues Based on Player Choices
 * -----------------------------------------------------------------------------
 *
 * // Place this in your ending event
 * if ($gameSwitches.value(10)) { // Good Ending switch
 *     this.pluginCommand('Ending', ['Setup', 'ending1']);
 *
 *     // Show message about unlocking the good ending
 *     this.showText("Good Ending Achieved!");
 *     this.showText("The title screen has been changed to reflect your heroic journey.");
 *
 * } else if ($gameSwitches.value(11)) { // Bad Ending switch
 *     this.pluginCommand('Ending', ['Setup', 'ending2']);
 *
 *     // Show message about unlocking the bad ending
 *     this.showText("Dark Ending Achieved!");
 *     this.showText("The title screen now reflects the darkness of your path.");
 * }
 *
 * Example 2: Creating a New Game+ Feature
 * -----------------------------------------------------------------------------
 *
 * function setupNewGamePlus() {
 *     // Check if player has completed any ending
 *     if ($gameMap.getEnding().length > 0) {
 *         // Set up a new game
 *         DataManager.setupNewGame();
 *
 *         // Add bonuses based on which endings were completed
 *         if ($gameMap.isClearEnding("ending1")) {
 *             $gameParty.gainGold(1000);  // Bonus gold from good ending
 *             $gameParty.gainItem($dataItems[5], 3);  // Special items
 *         }
 *
 *         if ($gameMap.isClearEnding("ending2")) {
 *             $gameParty.members()[0].addParam(2, 5);  // +5 ATK to leader
 *         }
 *
 *         if ($gameMap.isClearEnding("ending3")) {
 *             // Special weapon from secret ending
 *             $gameParty.gainItem($dataWeapons[15], 1);
 *         }
 *
 *         // Set a switch to indicate New Game+
 *         $gameSwitches.setValue(15, true);
 *
 *         // Start the game
 *         SceneManager.goto(Scene_Map);
 *     }
 * }
 * =============================================================================
 * Storage Mechanism
 * =============================================================================
 *
 * The plugin stores epilogue data persistently:
 * - Desktop games: In a file called "ending.dat" in the save directory
 * - Web games: In browser localStorage with key "RPG Ending"
 *
 * This ensures players will continue to see the updated title screen even after
 * closing and reopening the game.
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2015.12.21 (v1.0.0) - First Release.
 * 2015.12.22 (v1.0.2) - Fixed a bug about the web local storage.
 * 2016.03.07 (v1.0.3) - Fixed a bug that causes a serious problem when the parameters were set to English.
 * 2017.06.09 (v1.0.4) - Fixed the parameter not to remove the resource when deploying the game.
 * 2017.07.23 (v1.0.5) - Fixed the incorrect description
 * 2018.08.28 (v1.0.6) - Fixed the inccorect plugin parameter's name.
 * 2018.12.01 (v1.0.7) :
 * - Fixed the issue that couldn't playback the BGM.
 */
/*:ko
 * @plugindesc 엔딩 에필로그 이후 타이틀 설정을 변경할 수 있는 플러그인입니다.
 * @author 러닝은빛(biud436)
 *
 * @param Epilogue 1
 * @text 에필로그 1
 *
 * @param ep1 Title1
 * @text 타이틀 1
 * @parent Epilogue 1
 * @desc 배경으로 쓸 타이틀1 이미지를 고르세요.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep1 Title2
 * @text 타이틀 2
 * @parent Epilogue 1
 * @desc 배경으로 쓸 타이틀2 이미지를 고르세요.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep1 BGM
 * @text BGM
 * @parent Epilogue 1
 * @desc 배경 음악을 설정하세요.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 2
 * @text 에필로그 2
 *
 * @param ep2 Title1
 * @text 타이틀 1
 * @parent Epilogue 2
 * @desc 배경으로 쓸 타이틀1 이미지를 고르세요.
 * @default Devil
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep2 Title2
 * @text 타이틀 2
 * @parent Epilogue 2
 * @desc 배경으로 쓸 타이틀2 이미지를 고르세요.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep2 BGM
 * @text BGM
 * @parent Epilogue 2
 * @desc 배경 음악을 설정하세요.
 * @default Field2
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 3
 * @text 에필로그 3
 *
 * @param ep3 Title1
 * @text Title 1
 * @parent Epilogue 3
 * @desc 배경으로 쓸 타이틀1 이미지를 고르세요.
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep3 Title2
 * @text Title 2
 * @parent Epilogue 3
 * @desc 배경으로 쓸 타이틀2 이미지를 고르세요.
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep3 BGM
 * @text BGM
 * @parent Epilogue 3
 * @desc 배경 음악을 설정하세요.
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Epilogue 4
 * @text 에필로그 4
 *
 * @param ep4 Title1
 * @text Title 1
 * @parent Epilogue 4
 * @desc 에필로그 4의 타이틀1 이미지를 설정하세요
 * @default Book
 * @require 1
 * @dir img/titles1/
 * @type file
 *
 * @param ep4 Title2
 * @text Title 2
 * @parent Epilogue 4
 * @desc 에필로그 4의 타이틀2 이미지를 설정하세요
 * @default
 * @require 1
 * @dir img/titles2/
 * @type file
 *
 * @param ep4 BGM
 * @text BGM
 * @parent Epilogue 4
 * @desc 에필로그 4의 배경 음악을 설정하세요
 * @default Theme1
 * @require 1
 * @dir audio/bgm/
 * @type file
 *
 * @param Location
 * @text 플레이어 초기 위치
 *
 * @param Map ID
 * @text 맵 ID
 * @parent Location
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 활성화 되는데 해당 맵의 ID입니다.
 * @type number
 * @default 1
 *
 * @param Map X
 * @text 맵 X
 * @parent Location
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 활성화 되는데 해당 맵의 X좌표입니다.
 * @type number
 * @min 0
 * @default 0
 *
 * @param Map Y
 * @text 맵 Y
 * @parent Location
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 활성화 되는데 해당 맵의 Y좌표입니다.
 * @type number
 * @min 0
 * @default 0
 *
 * @param Additional Command
 * @text 추가 버튼 설정
 *
 * @param Specific Command
 * @text 추가 버튼명
 * @parent Additional Command
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼의 이름입니다.
 * @type text
 * @default Specific Command
 *
 * @param Show Specific Command
 * @text 추가 버튼 표시 여부
 * @parent Additional Command
 * @desc 에필로그 이후 특전 맵으로 들어갈 수 있는 버튼이 표시되어야 하는 지 여부
 * @type boolean
 * @default true
 * @on 표시한다
 * @off 표시하지 않는다
 *
 * @help
 * =============================================================================
 * 플러그인 기능 상세 설명
 * =============================================================================
 *
 * RS_TitleManagerEx 플러그인은 플레이어가 특정 에필로그나 엔딩을 본 후에
 * 타이틀 화면의 리소스(배경 이미지와 배경 음악)를 변경할 수 있게 해주는
 * 플러그인입니다.
 *
 * 주요 기능:
 *
 * 1. 동적 타이틀 화면:
 *    - 최대 4개의 서로 다른 타이틀 화면 변형(에필로그)을 설정 가능
 *    - 각 에필로그마다 독특한 배경 이미지와 BGM 설정 가능
 *
 * 2. 엔딩 추적:
 *    - 플러그인이 플레이어가 본 엔딩을 자동으로 기록
 *    - 이 정보를 활용하여 콘텐츠 잠금 해제 또는 보너스 제공 가능
 *
 * 3. 특별 메뉴 명령:
 *    - 엔딩 완료 후 타이틀 메뉴에 특별 명령 추가 가능
 *    - 이 명령을 통해 플레이어를 숨겨진/보너스 맵으로 이동 가능
 *
 * 4. 숨겨진 콘텐츠 접근:
 *    - 특별 명령을 통해 게임 후반 콘텐츠 접근 가능
 *    - 뉴게임+ 또는 갤러리 기능 구현 가능
 *
 * =============================================================================
 * 플러그인 커맨드
 * =============================================================================
 * 에필로그 이후 아래 플러그인 커맨드를 호출해야 에필로그가 끝났음을 인식합니다.
 *
 *    엔딩 설정 ending1
 *    엔딩 설정 ending2
 *    엔딩 설정 ending3
 *    엔딩 설정 ending4
 *
 * 새로운 플러그인 관리자의 구조체 기능을 사용하기에는 구조가 적합하지 않아,
 * 엔딩 이름은 고정되어있습니다.
 *
 * 다음 명령은 설정된 에필로그를 모두 지우고 타이틀을 게임 화면과 동일하게 만듭니다.
 *
 *    엔딩 초기화
 *
 * =============================================================================
 * 자바스크립트 API
 * =============================================================================
 *
 * 1. 엔딩 완료 여부 확인:
 *
 *    if ($gameMap.isClearEnding("ending1")) {
 *        // ending1이 완료된 경우 실행할 코드
 *        // 예: 특별 콘텐츠 잠금 해제, 다른 대화 표시 등
 *    }
 *
 * 2. 완료된 모든 엔딩 가져오기:
 *
 *    const completedEndings = $gameMap.getEnding();
 *    console.log("완료된 엔딩:", completedEndings);
 *    // 예상 출력: ["ending1", "ending3"]
 *
 * 3. 완료된 엔딩 수 계산:
 *
 *    const endingCount = $gameMap.getEnding().length;
 *    console.log(`플레이어가 ${endingCount}개의 엔딩 중 4개를 봤습니다`);
 *
 *    // 완료율 계산
 *    const completionPercentage = (endingCount / 4) * 100;
 *    console.log(`게임 완료율: ${completionPercentage}%`);
 * =============================================================================
 * 구현 예제
 * =============================================================================
 *
 * 예제 1: 플레이어 선택에 따른 다른 에필로그 설정
 * -----------------------------------------------------------------------------
 *
 * // 엔딩 이벤트에 배치
 * if ($gameSwitches.value(10)) { // 해피 엔딩 스위치
 *     this.pluginCommand('엔딩', ['설정', 'ending1']);
 *
 *     // 해피 엔딩 잠금 해제 메시지 표시
 *     this.showText("축하합니다! 해피 엔딩을 달성하셨습니다.");
 *     this.showText("타이틀 화면이 당신의 영웅적인 여정을 반영합니다.");
 *
 * } else if ($gameSwitches.value(11)) { // 배드 엔딩 스위치
 *     this.pluginCommand('엔딩', ['설정', 'ending2']);
 *
 *     // 배드 엔딩 잠금 해제 메시지 표시
 *     this.showText("어둠의 엔딩을 맞이하셨군요...");
 *     this.showText("타이틀 화면이 이제 당신의 선택을 반영합니다.");
 * }
 *
 *
 * 예제 2: 뉴게임+ 기능 만들기
 * -----------------------------------------------------------------------------
 *
 * function setupNewGamePlus() {
 *     // 플레이어가 어떤 엔딩이라도 완료했는지 확인
 *     if ($gameMap.getEnding().length > 0) {
 *         // 새 게임 설정
 *         DataManager.setupNewGame();
 *
 *         // 완료된 엔딩에 따른 보너스 추가
 *         if ($gameMap.isClearEnding("ending1")) {
 *             $gameParty.gainGold(1000);  // 해피 엔딩 보너스 골드
 *             $gameParty.gainItem($dataItems[5], 3);  // 특수 아이템
 *             this.showText("해피 엔딩 보너스로 1,000골드와 특수 아이템을 받았습니다!");
 *         }
 *
 *         if ($gameMap.isClearEnding("ending2")) {
 *             $gameParty.members()[0].addParam(2, 5);  // 리더에게 +5 ATK
 *             this.showText("어둠의 엔딩 보너스로 공격력이 증가했습니다!");
 *         }
 *
 *         if ($gameMap.isClearEnding("ending3")) {
 *             // 비밀 엔딩에서 얻은 특수 무기
 *             $gameParty.gainItem($dataWeapons[15], 1);
 *             this.showText("비밀 엔딩 보너스로 특수 무기를 얻었습니다!");
 *         }
 *
 *         // 뉴게임+를 나타내는 스위치 설정
 *         $gameSwitches.setValue(15, true);
 *
 *         // 게임 시작
 *         SceneManager.goto(Scene_Map);
 *     } else {
 *         this.showText("아직 어떤 엔딩도 완료하지 않았습니다. 계속 이야기를 이어가세요!");
 *     }
 * }
 *
 * 예제 3: 완료된 엔딩에 반응하는 NPC
 * -----------------------------------------------------------------------------
 *
 * function endingChroniclerDialogue() {
 *     const completedEndings = $gameMap.getEnding();
 *
 *     if (completedEndings.length === 0) {
 *         // 플레이어가 아직 엔딩을 완료하지 않음
 *         this.showText("저는 연대기를 기록하는 학자입니다. 아직 당신의 이야기는 끝나지 않았군요.");
 *     } else {
 *         // 플레이어가 적어도 하나의 엔딩을 완료함
 *         this.showText("오, 벌써 " + completedEndings.length + "개의 결말을 보셨군요.");
 *
 *         // 특정 엔딩에 대한 언급
 *         if ($gameMap.isClearEnding("ending1")) {
 *             this.showText("빛의 길을 택하셨군요. 참으로 흥미로운 선택입니다.");
 *         }
 *
 *         if ($gameMap.isClearEnding("ending2")) {
 *             this.showText("어둠의 길을 걸으셨군요. 예상 밖의 선택이군요.");
 *         }
 *
 *         // 모든 엔딩이 완료되었는지 확인
 *         if (completedEndings.length >= 4) {
 *             this.showText("모든 결말을 경험하셨군요. 이 보상을 받아주세요.");
 *             $gameParty.gainItem($dataItems[20], 1); // 특별 보상 아이템
 *         }
 *     }
 * }
 *
 * =============================================================================
 * 저장 매커니즘
 * =============================================================================
 *
 * 플러그인은 에필로그 데이터를 영구적으로 저장합니다:
 * - 데스크톱 게임: 저장 디렉토리에 "ending.dat" 파일로 저장
 * - 웹 게임: 브라우저 localStorage에 "RPG Ending" 키로 저장
 *
 * 이렇게 하면 플레이어가 게임을 닫고 다시 열어도 업데이트된 타이틀 화면을 계속 볼 수 있습니다.
 *
 * =============================================================================
 * 변경 기록
 * =============================================================================
 * 2015.12.21 (v1.0.0) - First Release.
 * 2015.12.22 (v1.0.2) - Fixed a bug about the web local storage.
 * 2016.03.07 (v1.0.3) - Fixed a bug that causes a serious problem when the parameters were set to English.
 * 2017.06.09 (v1.0.4) - Fixed the parameter not to remove the resource when deploying the game.
 * 2017.07.23 (v1.0.5) - Fixed the incorrect description
 * 2018.08.28 (v1.0.6) - Fixed the incorrect plugin parameter's name.
 * 2018.12.01 (v1.0.7) :
 * - BGM이 재생되지 않았던 문제를 수정했습니다.
 */

var RS = RS || {};
RS.TitleManagerEx = RS.TitleManagerEx || {};

(function () {
  'use strict';

  var parameters = PluginManager.parameters('RS_TitleManagerEx');

  RS.TitleManagerEx.Params = RS.TitleManagerEx.Params || {};
  RS.TitleManagerEx.Params.Position = RS.TitleManagerEx.Params.Position || {};
  RS.TitleManagerEx.Params.EndingClearList =
    RS.TitleManagerEx.Params.EndingClearList || [];

  RS.TitleManagerEx.Tool = RS.TitleManagerEx.Tool || {};
  RS.TitleManagerEx.Header = RS.TitleManagerEx.Header || {};

  //============================================================================

  RS.TitleManagerEx.Params.specialMenuName = String(
    parameters['Specific Command'] || 'Specific Command'
  );
  RS.TitleManagerEx.Params.showSpecialMenu = Boolean(
    parameters['Show Specific Command'] === 'true'
  );

  RS.TitleManagerEx.Tool.RESOURCE = RS.TitleManagerEx.Tool.RESOURCE || {};
  RS.TitleManagerEx.Tool.RESOURCE['base title'] = [];

  RS.TitleManagerEx.getEpilogue = function (name) {
    var ret = [];
    var failedRet = RS.TitleManagerEx.Tool.RESOURCE['base title'];
    if (name === 'base title') {
      return failedRet;
    }
    name = name.replace('ending', 'ep');
    ret.push(parameters[`${name} Title1`]);
    ret.push(parameters[`${name} Title2`]);
    ret.push(parameters[`${name} BGM`]);
    return !!ret ? ret : failedRet;
  };

  Object.assign(RS.TitleManagerEx.Tool.RESOURCE, {
    ending1: RS.TitleManagerEx.getEpilogue('ending1'),
    ending2: RS.TitleManagerEx.getEpilogue('ending2'),
    ending3: RS.TitleManagerEx.getEpilogue('ending3'),
    ending4: RS.TitleManagerEx.getEpilogue('ending4'),
  });

  RS.TitleManagerEx.Params.Position = {
    MAP_ID: Number(parameters['Map ID'] || 1),
    X: Number(parameters['Map X'] || 0),
    Y: Number(parameters['Map Y'] || 0),
  };

  RS.TitleManagerEx.Params.Position.RESULT = [
    RS.TitleManagerEx.Params.Position.MAP_ID,
    RS.TitleManagerEx.Params.Position.X,
    RS.TitleManagerEx.Params.Position.Y,
  ];

  //============================================================================
  // DataManager
  //============================================================================

  DataManager.setupSpecialGame = function () {
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(arguments[0], arguments[1], arguments[2]);
    Graphics.frameCount = 0;
  };

  DataManager.saveToEnding = function (string) {
    if (StorageManager.isLocalMode()) {
      StorageManager.saveToLocalEnding(string);
    } else {
      StorageManager.saveToWebEnding(string);
    }
  };

  DataManager.removeEnding = function () {
    if (StorageManager.isLocalMode()) {
      StorageManager.removeLocalEnding();
    } else {
      StorageManager.removeWebEnding();
    }
  };

  DataManager.loadFromEnding = function (string) {
    if (StorageManager.isLocalMode()) {
      return StorageManager.loadFromLocalEnding(string);
    } else {
      return StorageManager.loadFromWebEnding(string);
    }
  };

  //============================================================================
  // StorageManager
  //============================================================================

  StorageManager.saveToLocalEnding = function (string) {
    var json = JSON.stringify(this.publishKey(string));
    var data = LZString.compressToBase64(json);
    var fs = require('fs');
    var dirPath = this.localFileDirectoryPath();
    var filePath = dirPath + 'ending.dat';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(filePath, data);
  };

  StorageManager.loadFromLocalEnding = function (string) {
    var data = null;
    var fs = require('fs');
    var filePath = this.localFileDirectoryPath() + 'ending.dat';
    if (fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath, { encoding: 'utf8' });
      return JSON.parse(LZString.decompressFromBase64(data));
    } else {
      return this.endingNull();
    }
  };

  StorageManager.removeLocalEnding = function () {
    var fs = require('fs');
    var filePath = this.localFileDirectoryPath() + 'ending.dat';
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  };

  StorageManager.saveToWebEnding = function (string) {
    var key = 'RPG Ending';
    var json = JSON.stringify(this.publishKey(string));
    var data = LZString.compressToBase64(json);
    localStorage.setItem(key, data);
  };

  StorageManager.loadFromWebEnding = function (string) {
    var key = 'RPG Ending';
    var data = null;

    if (!!localStorage.getItem(key)) {
      data = localStorage.getItem(key);
      return JSON.parse(LZString.decompressFromBase64(data));
    } else {
      return this.endingNull();
    }
  };

  StorageManager.removeWebEnding = function () {
    var key = 'RPG Ending';
    localStorage.removeItem(key);
  };

  StorageManager.endingNull = function () {
    var ending;
    ending = {};
    ending.version = 0;
    ending.n = RS.TitleManagerEx.Tool.RESOURCE['base title'];
    ending.endingClearList = RS.TitleManagerEx.Params.EndingClearList;
    return ending;
  };

  StorageManager.publishKey = function (string) {
    try {
      var ending;
      ending = {};
      ending.version = 1000;
      ending.n = RS.TitleManagerEx.Tool.RESOURCE[string];
      RS.TitleManagerEx.Params.EndingClearList.push(string);
      ending.endingClearList = RS.TitleManagerEx.Params.EndingClearList;
      return ending;
    } catch (e) {
      return this.endingNull();
    }
  };

  //============================================================================
  // RS.TitleManagerEx.Header
  //============================================================================

  RS.TitleManagerEx.Header.background = null;

  RS.TitleManagerEx.Header.load = function () {
    var f = DataManager.loadFromEnding();
    RS.TitleManagerEx.Params.EndingClearList = f.endingClearList;
    var result = [f.version, f.n];
    return result;
  };

  RS.TitleManagerEx.Header.chooseBackground = function () {
    if (this.load()[0] === 1000) {
      this.loadBackground(this.load()[1]);
      return true;
    } else {
      RS.TitleManagerEx.Header.background =
        RS.TitleManagerEx.Tool.RESOURCE['base title'];
      return false;
    }
  };

  RS.TitleManagerEx.Header.loadBackground = function (set) {
    RS.TitleManagerEx.Header.background = set;
  };

  RS.TitleManagerEx.Header.exportBackground = function () {
    return RS.TitleManagerEx.Header.background;
  };

  RS.TitleManagerEx.Header.isSpecialMenu = function () {
    if (this.load()[0] === 1000 && RS.TitleManagerEx.Params.showSpecialMenu) {
      return true;
    } else {
      return false;
    }
  };

  //============================================================================
  // Game_Map
  //============================================================================

  Game_Map.prototype.isClearEnding = function (string) {
    var result = RS.TitleManagerEx.Params.EndingClearList.filter(
      function (i) {
        if (i === string) {
          return true;
        } else {
          return false;
        }
      }.bind(this)
    );
    return result.length > 0;
  };

  Game_Map.prototype.getEnding = function () {
    return RS.TitleManagerEx.Params.EndingClearList;
  };

  //============================================================================
  // Window_TitleCommand
  //============================================================================

  Window_TitleCommand.prototype.makeCommandList = function () {
    this.addCommand(TextManager.newGame, 'newGame');
    this.addCommand(
      TextManager.continue_,
      'continue',
      this.isContinueEnabled()
    );
    if (RS.TitleManagerEx.Header.isSpecialMenu()) {
      this.addCommand(RS.TitleManagerEx.Params.specialMenuName, 'specialMenu');
    }
    this.addCommand(TextManager.options, 'options');
  };

  //============================================================================
  // Scene_Title
  //============================================================================

  var alias_Scene_Title_create = Scene_Title.prototype.create;
  Scene_Title.prototype.create = function () {
    (RS.TitleManagerEx.Tool.RESOURCE['base title'] = [
      $dataSystem.title1Name,
      $dataSystem.title2Name,
      $dataSystem.titleBgm,
    ]),
      alias_Scene_Title_create.call(this);
  };

  Scene_Title.prototype.createBackground = function () {
    RS.TitleManagerEx.Header.chooseBackground();
    this._backSprite1 = new Sprite(
      ImageManager.loadTitle1(RS.TitleManagerEx.Header.exportBackground()[0])
    );
    this._backSprite2 = new Sprite(
      ImageManager.loadTitle2(RS.TitleManagerEx.Header.exportBackground()[1])
    );
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
  };

  Scene_Title.prototype.playTitleMusic = function () {
    if (RS.TitleManagerEx.Header.chooseBackground()) {
      var data = AudioManager.makeEmptyAudioObject();
      data.name = RS.TitleManagerEx.Header.exportBackground()[2];
      data.volume = 90;
      data.pitch = 100;
      AudioManager.playBgm(data);
    } else {
      AudioManager.playBgm($dataSystem.titleBgm);
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
  };

  var alias_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function () {
    alias_createCommandWindow.call(this);
    if (RS.TitleManagerEx.Header.isSpecialMenu()) {
      this._commandWindow.setHandler(
        'specialMenu',
        this.specialMenu.bind(this)
      );
    }
  };

  Scene_Title.prototype.specialMenu = function () {
    DataManager.setupSpecialGame.apply(
      DataManager,
      RS.TitleManagerEx.Params.Position.RESULT
    );
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_pluginCommand.call(this, command, args);
    if (command === 'Ending' || command === '엔딩') {
      switch (args[0].toLowerCase()) {
        case 'setup':
        case '설정':
          DataManager.saveToEnding(args[1]);
          break;
        case '초기화':
        case 'removeall':
          DataManager.removeEnding();
          break;
      }
    }
  };
})();
