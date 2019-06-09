/*:
 * @plugindesc (v1.0.9) This plugin allows you to create or copy or delete an event
 *
 * @author biud436
 *
 * @param Default Event Data
 * @desc Specify the default event data
 * @type struct<EventData>
 * @default {"id":"1","name":"","note":"\"\"","pages":"[\"{\\\"conditions\\\":\\\"{\\\\\\\"actorId\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"actorValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"itemId\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"itemValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"selfSwitchCh\\\\\\\":\\\\\\\"A\\\\\\\",\\\\\\\"selfSwitchValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switch1Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"switch1Valid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switch2Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"switch2Valid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"variableId\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"variableValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"variableValue\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"directionFix\\\":\\\"false\\\",\\\"image\\\":\\\"{\\\\\\\"tileId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"characterName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"direction\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"pattern\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"characterIndex\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"indent\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"moveFrequency\\\":\\\"3\\\",\\\"moveRoute\\\":\\\"{\\\\\\\"list\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"repeat\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"skippable\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"wait\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"moveSpeed\\\":\\\"3\\\",\\\"moveType\\\":\\\"0\\\",\\\"priorityType\\\":\\\"1\\\",\\\"stepAnime\\\":\\\"false\\\",\\\"through\\\":\\\"false\\\",\\\"trigger\\\":\\\"0\\\",\\\"walkAnime\\\":\\\"true\\\"}\"]","x":"0","y":"0"}
 *
 * @help
 * =============================================================================
 * Plugin Command
 * =============================================================================
 * This plugin command is copying an event.
 * MapID : if the value is zero or - 1, the mapId will set up an id of currently map.
 * Event Copy X Y MapID EventID
 *
 * This plugin command deletes a previously created event on currently map.
 * Event Delete EventID
 *
 * This plugin command creates a new event on currently map.
 * Event Create X Y CharacterName CharacterIndex
 *
 * =============================================================================
 * Script Calls
 * =============================================================================
 * RS.Event.instanceCopy(x, y, mapID, eventId, customData);
 * customData : if its value sets to null, it will use existing event data.
 *
 * RS.Event.instanceDestroy($gameMap.events().last);
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2015.10.17 (v1.0.0) - First Release Date
 * 2016.02.19 (v1.0.1) - Fixed a bug that causes a serious problem.
 * 2016.02.23 (v1.0.2) - Fixed a bug.
 * 2016.02.24 (v1.0.3) - Fixed a bug that is initialized to the default value when the parameters were set to zero.
 * 2016.10.30 (v1.0.4) - Optimized.
 * 2016.10.30 (v1.0.5) - Optimized.
 * 2017.07.07 (v1.0.6) :
 * - Added a feature that changes a default event data.
 * - Fixed the bug with the image file extension in a creating function.
 * 2017.12.05 (v1.0.7) :
 * - Added the default value in the plugin parameter called 'Default Event Data'.
 * - Removed the code that is creating a testing message in an event create command.
 * 2018.08.09 (v1.0.8) :
 * - Now the eventId is set to equal the index of $gameMap._events.
 */

 /*~struct~EventData:
  *
  * @param id
  * @type number
  * @desc IDs will be automatically set for each map in the order that they are created.
  * @min 1
  * @default 1
  *
  * @param name
  * @desc The name of the map event.
  * @default
  *
  * @param note
  * @type note
  * @desc A text area where you can freely enter notes.
  * @default ""
  *
  * @param pages
  * @type struct<Page>[]
  * @desc The event page that you want to edit.
  * @default ["{\"conditions\":\"{\\\"actorId\\\":\\\"1\\\",\\\"actorValid\\\":\\\"false\\\",\\\"itemId\\\":\\\"1\\\",\\\"itemValid\\\":\\\"false\\\",\\\"selfSwitchCh\\\":\\\"A\\\",\\\"selfSwitchValid\\\":\\\"false\\\",\\\"switch1Id\\\":\\\"1\\\",\\\"switch1Valid\\\":\\\"false\\\",\\\"switch2Id\\\":\\\"1\\\",\\\"switch2Valid\\\":\\\"false\\\",\\\"variableId\\\":\\\"1\\\",\\\"variableValid\\\":\\\"false\\\",\\\"variableValue\\\":\\\"0\\\"}\",\"directionFix\":\"false\",\"image\":\"{\\\"tileId\\\":\\\"0\\\",\\\"characterName\\\":\\\"\\\",\\\"direction\\\":\\\"2\\\",\\\"pattern\\\":\\\"1\\\",\\\"characterIndex\\\":\\\"0\\\"}\",\"list\":\"[\\\"{\\\\\\\"code\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"indent\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"parameters\\\\\\\":\\\\\\\"[]\\\\\\\"}\\\"]\",\"moveFrequency\":\"3\",\"moveRoute\":\"{\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"repeat\\\":\\\"true\\\",\\\"skippable\\\":\\\"false\\\",\\\"wait\\\":\\\"false\\\"}\",\"moveSpeed\":\"3\",\"moveType\":\"0\",\"priorityType\":\"1\",\"stepAnime\":\"false\",\"through\":\"false\",\"trigger\":\"0\",\"walkAnime\":\"true\"}"]
  *
  * @param x
  * @type number
  * @desc the x where indicates the map x-position of the event.
  * @default 0
  * @min 0
  *
  * @param y
  * @type number
  * @desc the y where indicates the map y-position of the event.
  * @default 0
  * @min 0
  *
  */

 /*~struct~Page:
  *
  * @param conditions
  * @type struct<Conditions>
  * @desc Conditions for the map event to appear on the map based on the settings of this event page.
  * @default {"actorId":"1","actorValid":"false","itemId":"1","itemValid":"false","selfSwitchCh":"A","selfSwitchValid":"false","switch1Id":"1","switch1Valid":"false","switch2Id":"1","switch2Valid":"false","variableId":"1","variableValid":"false","variableValue":"0"}
  *
  * @param directionFix
  * @type boolean
  * @desc Prevents the direction that the image is facing from changing while moving.
  * @default false
  *
  * @param image
  * @type struct<Image>
  * @desc Images that are displayed when an event occurs on a map (does not affect the game).
  * @default {"tileId":"0","characterName":"","direction":"2","pattern":"1","characterIndex":"0"}
  *
  * @param list
  * @type struct<List>[]
  * @default ["{\"code\":\"0\",\"indent\":\"0\",\"parameters\":\"[]\"}"]
  *
  * @param moveFrequency
  * @type select
  * @desc select the move frequency
  * @default 3
  * @option Lowest
  * @value 1
  * @option Lower
  * @value 2
  * @option Normal
  * @value 3
  * @option Higher
  * @value 4
  * @option Highest
  * @value 5
  *
  * @param moveRoute
  * @type struct<MoveRoute>
  * @default {"list":"[\"{\\\"code\\\":\\\"0\\\",\\\"parameters\\\":\\\"[]\\\"}\"]","repeat":"true","skippable":"false","wait":"false"}
  *
  * @param moveSpeed
  * @type select
  * @desc select the move speed
  * @default 3
  * @option x8 Slower
  * @value 1
  * @option x4 Slower
  * @value 2
  * @option x2 Slower
  * @value 3
  * @option Normal
  * @value 4
  * @option x2 Faster
  * @value 5
  * @option x4 Faster
  * @value 6
  *
  * @param moveType
  * @type select
  * @desc Specifies how the map event will move
  * @default 0
  * @option Fixed
  * @value 0
  * @option Random
  * @value 1
  * @option Approach
  * @value 2
  * @option Custom
  * @value 3
  *
  * @param priorityType
  * @type select
  * @desc Choose from the below in order to specify the priority of how players and other events are displayed on top of one another.
  * @default 1
  * @option Below characters
  * @value 0
  * @option Same as characters
  * @value 1
  * @option Above characters
  * @value 2
  *
  * @param stepAnime
  * @type boolean
  * @desc Displays the stepping animation while the character is stopped.
  * @default false
  *
  * @param through
  * @type boolean
  * @desc Allows to pass through terrain and events that cannot be passed through.
  * @default false
  *
  * @param trigger
  * @type select
  * @desc Choose the timing for when the processing of the [Contents] of an event that occurs on the map will be.
  * @default 0
  * @option Action Button
  * @value 0
  * @option Player Touch
  * @value 1
  * @option Event Touch
  * @value 2
  * @option Autorun
  * @value 3
  * @option Parallel
  * @value 4
  *
  * @param walkAnime
  * @type boolean
  * @desc Displays animation when moving.
  * @default true
  *
  */

/*~struct~Conditions:
 * @param actorId
 * @type actor
 * @default 1
 *
 * @param actorValid
 * @type boolean
 * @default false
 *
 * @param itemId
 * @type item
 * @default 1
 *
 * @param itemValid
 * @type boolean
 * @default false
 *
 * @param selfSwitchCh
 * @type select
 * @default A
 * @option A
 * @option B
 * @option C
 * @option D
 *
 * @param selfSwitchValid
 * @type boolean
 * @default false
 *
 * @param switch1Id
 * @type switch
 * @default 1
 *
 * @param switch1Valid
 * @type boolean
 * @default false
 *
 * @param switch2Id
 * @type switch
 * @default 1
 *
 * @param switch2Valid
 * @type boolean
 * @default false
 *
 * @param variableId
 * @type variable
 * @default 1
 *
 * @param variableValid
 * @type boolean
 * @default false
 *
 * @param variableValue
 * @type number
 * @default 0
 *
 */

/*~struct~Image:
 *
 * @param tileId
 * @type number
 * @default 0
 *
 * @param characterName
 * @type file
 * @dir img/characters/
 * @default
 *
 * @param direction
 * @type select
 * @default 2
 * @option Up
 * @value 8
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 *
 * @param pattern
 * @type number
 * @default 1
 * @min 0
 * @max 3
 *
 * @param characterIndex
 * @type number
 * @default 0
 * @min 0
 * @max 7
 *
 */

/*~struct~List:
 * @param code
 * @type number
 * @default 0
 *
 * @param indent
 * @type number
 * @default 0
 *
 * @param parameters
 * @type string[]
 * @default []
 *
 */

 /*~struct~MoveRoute:
  * @param list
  * @type struct<MoveRouteList>[]
  * @default ["{\"code\":\"0\",\"parameters\":\"[]\"}"]
  *
  * @param repeat
  * @type boolean
  * @default true
  *
  * @param skippable
  * @type boolean
  * @default false
  *
  * @param wait
  * @type boolean
  * @default false
  *
  */

 /*~struct~MoveRouteList:
  * @param code
  * @type number
  * @default 0
  *
  * @param parameters
  * @type string[]
  * @default []
  *
  */
/*:ko
 * @plugindesc (v1.0.9) 커스텀 이벤트 생성 및 복제 플러그인
 * @author 러닝은빛(biud436)
 *
 * @param Default Event Data
 * @text 기본 이벤트 데이터
 * @desc 기본 이벤트 데이터를 생성할 수 있습니다 (JSON)
 * @type struct<EventData>
 * @default {"id":"1","name":"","note":"\"\"","pages":"[\"{\\\"conditions\\\":\\\"{\\\\\\\"actorId\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"actorValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"itemId\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"itemValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"selfSwitchCh\\\\\\\":\\\\\\\"A\\\\\\\",\\\\\\\"selfSwitchValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switch1Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"switch1Valid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"switch2Id\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"switch2Valid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"variableId\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"variableValid\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"variableValue\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"directionFix\\\":\\\"false\\\",\\\"image\\\":\\\"{\\\\\\\"tileId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"characterName\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"direction\\\\\\\":\\\\\\\"2\\\\\\\",\\\\\\\"pattern\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"characterIndex\\\\\\\":\\\\\\\"0\\\\\\\"}\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"indent\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"moveFrequency\\\":\\\"3\\\",\\\"moveRoute\\\":\\\"{\\\\\\\"list\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"]\\\\\\\",\\\\\\\"repeat\\\\\\\":\\\\\\\"true\\\\\\\",\\\\\\\"skippable\\\\\\\":\\\\\\\"false\\\\\\\",\\\\\\\"wait\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"moveSpeed\\\":\\\"3\\\",\\\"moveType\\\":\\\"0\\\",\\\"priorityType\\\":\\\"1\\\",\\\"stepAnime\\\":\\\"false\\\",\\\"through\\\":\\\"false\\\",\\\"trigger\\\":\\\"0\\\",\\\"walkAnime\\\":\\\"true\\\"}\"]","x":"0","y":"0"}
 *
 * @help
 * =============================================================================
 * 플러그인 명령에 대해
 * =============================================================================
 * 이벤트를 특정 맵에서 복사해오는 플러그인 명령입니다.
 * Event Copy X Y MapID EventID
 *  - MapID : 0이나 -1로 적으면 현재 맵의 ID 값과 동일하게 설정됩니다.
 *  - EventID : 이벤트의 ID 값.
 *
 * 현재 맵에 존재하는 이벤트를 삭제하는 명령입니다.
 * Event Delete EventID
 *  - EventID : 이벤트의 ID 값.
 *
 * 현재 맵에 새로운 이벤트를 생성합니다. 
 * 이벤트 데이터는 기본 이벤트 데이터에서 가져옵니다.
 * Event Create X Y CharacterName CharacterIndex
 *  - X : 이벤트의 X 좌표 (맵의 폭 크기 내로 기입 바랍니다)
 *  - Y : 이벤트의 Y 좌표 (맵의 높이 크기 내로 기입 바랍니다)
 *  - CharacterName : 캐릭터 이름
 *  - CharacterIndex : 캐릭터 인덱스
 *
 * =============================================================================
 * 스크립트 호출에 대해
 * =============================================================================
 * 
 * 이벤트를 복사 생성하는 메서드입니다.
 * 
 * RS.Event.instanceCopy(x, y, mapID, eventId, customData);
 * 
 * - customData : RPG Maker MV에는 이벤트 클래스가 따로 없어서 커스텀 데이터를 정의
 * 하기가 힘듭니다. 기존 데이터를 복제하여 적당히 바꾸는 방법을 사용해야 합니다.
 * 기존 데이터는 $dataMap.events[eventId]로 가져올 수 있으며 복제해서 내부 속성을
 * 적당히 바꿀 수 있습니다. 객체화할 수도 있지만 기존 데이터를 복제하는 게 더 효율적
 * 입니다. 이 부분을 생략하면 기존 맵 데이터에서 가져오게 됩니다.
 * 
 * 이벤트를 삭제하는 메서드입니다. 예제에서 인자로 사용된 $gameMap.events().last는
 * 이벤트 배열의 마지막 원소(이벤트)를 가져옵니다. 
 *
 * RS.Event.instanceDestroy($gameMap.events().last);
 * 
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2015.10.17 (v1.0.0) - First Release Date
 * 2016.02.19 (v1.0.1) - Fixed a bug that causes a serious problem.
 * 2016.02.23 (v1.0.2) - Fixed a bug.
 * 2016.02.24 (v1.0.3) - Fixed a bug that is initialized to the default value when the parameters were set to zero.
 * 2016.10.30 (v1.0.4) - Optimized.
 * 2016.10.30 (v1.0.5) - Optimized.
 * 2017.07.07 (v1.0.6) :
 * - Added a feature that changes a default event data.
 * - Fixed the bug with the image file extension in a creating function.
 * 2017.12.05 (v1.0.7) :
 * - Added the default value in the plugin parameter called 'Default Event Data'.
 * - Removed the code that is creating a testing message in an event create command.
 * 2018.08.09 (v1.0.8) :
 * - Now the eventId is set to equal the index of $gameMap._events.
 * 2019.06.09 (v1.0.9) :
 * - 이벤트가 계속 생성되고 삭제될 때 커스텀 데이터 오류가 나는 문제 수정.
 */

 /*~struct~EventData:ko
  *
  * @param id
  * @type number
  * @desc 기본적으로 알만툴에서는 이벤트가 생성된 순서대로 ID 값이 증가합니다. 다만 그렇지 않은 경우도 있습니다.
  * @min 1
  * @default 1
  *
  * @param name
  * @desc 이벤트 이름
  * @default
  *
  * @param note
  * @type note
  * @desc 이벤트 노트 태그를 기입하는 이벤트 메모 영역
  * @default ""
  *
  * @param pages
  * @type struct<Page>[]
  * @desc 이벤트 페이지 설정입니다.
  * @default ["{\"conditions\":\"{\\\"actorId\\\":\\\"1\\\",\\\"actorValid\\\":\\\"false\\\",\\\"itemId\\\":\\\"1\\\",\\\"itemValid\\\":\\\"false\\\",\\\"selfSwitchCh\\\":\\\"A\\\",\\\"selfSwitchValid\\\":\\\"false\\\",\\\"switch1Id\\\":\\\"1\\\",\\\"switch1Valid\\\":\\\"false\\\",\\\"switch2Id\\\":\\\"1\\\",\\\"switch2Valid\\\":\\\"false\\\",\\\"variableId\\\":\\\"1\\\",\\\"variableValid\\\":\\\"false\\\",\\\"variableValue\\\":\\\"0\\\"}\",\"directionFix\":\"false\",\"image\":\"{\\\"tileId\\\":\\\"0\\\",\\\"characterName\\\":\\\"\\\",\\\"direction\\\":\\\"2\\\",\\\"pattern\\\":\\\"1\\\",\\\"characterIndex\\\":\\\"0\\\"}\",\"list\":\"[\\\"{\\\\\\\"code\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"indent\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"parameters\\\\\\\":\\\\\\\"[]\\\\\\\"}\\\"]\",\"moveFrequency\":\"3\",\"moveRoute\":\"{\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"code\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"parameters\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"[]\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"repeat\\\":\\\"true\\\",\\\"skippable\\\":\\\"false\\\",\\\"wait\\\":\\\"false\\\"}\",\"moveSpeed\":\"3\",\"moveType\":\"0\",\"priorityType\":\"1\",\"stepAnime\":\"false\",\"through\":\"false\",\"trigger\":\"0\",\"walkAnime\":\"true\"}"]
  *
  * @param x
  * @type number
  * @desc 맵 X좌표
  * @default 0
  * @min 0
  *
  * @param y
  * @type number
  * @desc 맵 Y좌표
  * @default 0
  * @min 0
  *
  */

 /*~struct~Page:ko
  *
  * @param conditions
  * @text 이벤트 출현 조건
  * @type struct<Conditions>
  * @desc 어떤 상황에서 이벤트가 맵에 등장하는 지 실행 조건을 설정합니다.
  * @default {"actorId":"1","actorValid":"false","itemId":"1","itemValid":"false","selfSwitchCh":"A","selfSwitchValid":"false","switch1Id":"1","switch1Valid":"false","switch2Id":"1","switch2Valid":"false","variableId":"1","variableValid":"false","variableValue":"0"}
  *
  * @param directionFix
  * @text 방향 고정
  * @type boolean
  * @desc 캐릭터의 방향을 변경할 수 없도록 만듭니다.
  * @default false
  *
  * @param image
  * @text 이미지
  * @type struct<Image>
  * @desc 이미지 설정
  * @default {"tileId":"0","characterName":"","direction":"2","pattern":"1","characterIndex":"0"}
  *
  * @param list
  * @type struct<List>[]
  * @desc 이벤트 리스트
  * @default ["{\"code\":\"0\",\"indent\":\"0\",\"parameters\":\"[]\"}"]
  *
  * @param moveFrequency
  * @text 이동 빈도
  * @type select
  * @desc 캐릭터의 이동 빈도를 설정합니다.
  * @default 3
  * @option Lowest
  * @value 1
  * @option Lower
  * @value 2
  * @option Normal
  * @value 3
  * @option Higher
  * @value 4
  * @option Highest
  * @value 5
  *
  * @param moveRoute
  * @text 커스텀 이동 루트...
  * @type struct<MoveRoute>
  * @desc 커스텀 이동 루트를 설정합니다.
  * @default {"list":"[\"{\\\"code\\\":\\\"0\\\",\\\"parameters\\\":\\\"[]\\\"}\"]","repeat":"true","skippable":"false","wait":"false"}
  *
  * @param moveSpeed
  * @text 이동 속도
  * @type select
  * @desc 캐릭터의 이동 속도를 설정합니다.
  * @default 3
  * @option x8 Slower
  * @value 1
  * @option x4 Slower
  * @value 2
  * @option x2 Slower
  * @value 3
  * @option Normal
  * @value 4
  * @option x2 Faster
  * @value 5
  * @option x4 Faster
  * @value 6
  *
  * @param moveType
  * @text 이동 유형
  * @type select
  * @desc 이동 유형을 설정하세요.
  * @default 0
  * @option Fixed
  * @value 0
  * @option Random
  * @value 1
  * @option Approach
  * @value 2
  * @option Custom
  * @value 3
  *
  * @param priorityType
  * @text 이벤트 우선 순위(우선권)
  * @type select
  * @desc 이벤트 우선 순위를 설정하세요.
  * @default 1
  * @option 캐릭터 아래
  * @value 0
  * @option 캐릭터와 같음
  * @value 1
  * @option 캐릭터 위
  * @value 2
  *
  * @param stepAnime
  * @text 제자리걸음 움직임
  * @type boolean
  * @desc 캐릭터가 이동하지 않을 때에도 이동하는 애니메이션을 사용합니다.
  * @default false
  *
  * @param through
  * @text 통과
  * @type boolean
  * @desc 통행이 불가능한 타일도 통과가 가능합니다.
  * @default false
  *
  * @param trigger
  * @text 이벤트 실행 방식(발동)
  * @type select
  * @desc 이벤트 실행 방식을 설정합니다.
  * @default 0
  * @option 결정 버튼
  * @value 0
  * @option 플레이어 접근
  * @value 1
  * @option 이벤트 접근
  * @value 2
  * @option 자동 실행
  * @value 3
  * @option 병렬 처리
  * @value 4
  *
  * @param walkAnime
  * @text 보행 움직임
  * @type boolean
  * @desc 캐릭터가 이동할 때 애니메이션을 사용합니다.
  * @default true
  *
  */

/*~struct~Conditions:ko
 * @param actorId
 * @text 액터의 ID 값
 * @type actor
 * @desc 지정된 액터의 ID 값입니다.
 * @default 1
 *
 * @param actorValid
 * @type boolean
 * @desc 지정된 액터가 파티에 있는 지 여부.
 * @default false
 *
 * @param itemId
 * @type item
 * @default 1
 *
 * @param itemValid
 * @type boolean
 * @default false
 *
 * @param selfSwitchCh
 * @type select
 * @default A
 * @option A
 * @option B
 * @option C
 * @option D
 *
 * @param selfSwitchValid
 * @type boolean
 * @default false
 *
 * @param switch1Id
 * @type switch
 * @default 1
 *
 * @param switch1Valid
 * @type boolean
 * @default false
 *
 * @param switch2Id
 * @type switch
 * @default 1
 *
 * @param switch2Valid
 * @type boolean
 * @default false
 *
 * @param variableId
 * @type variable
 * @default 1
 *
 * @param variableValid
 * @type boolean
 * @default false
 *
 * @param variableValue
 * @type number
 * @default 0
 *
 */

/*~struct~Image:ko
 *
 * @param tileId
 * @type number
 * @default 0
 *
 * @param characterName
 * @type file
 * @dir img/characters/
 * @default
 *
 * @param direction
 * @type select
 * @default 2
 * @option Up
 * @value 8
 * @option Down
 * @value 2
 * @option Left
 * @value 4
 * @option Right
 * @value 6
 *
 * @param pattern
 * @type number
 * @default 1
 * @min 0
 * @max 3
 *
 * @param characterIndex
 * @type number
 * @default 0
 * @min 0
 * @max 7
 *
 */

/*~struct~List:ko
 * @param code
 * @type number
 * @default 0
 *
 * @param indent
 * @type number
 * @default 0
 *
 * @param parameters
 * @type string[]
 * @default []
 *
 */

 /*~struct~MoveRoute:ko
  * @param list
  * @type struct<MoveRouteList>[]
  * @default ["{\"code\":\"0\",\"parameters\":\"[]\"}"]
  *
  * @param repeat
  * @type boolean
  * @default true
  *
  * @param skippable
  * @type boolean
  * @default false
  *
  * @param wait
  * @type boolean
  * @default false
  *
  */

 /*~struct~MoveRouteList:ko
  * @param code
  * @type number
  * @default 0
  *
  * @param parameters
  * @type string[]
  * @default []
  *
  */ 

var Imported = Imported || {};
Imported.RS_EventCreate = true;

var RS = RS || {};
RS.Event = RS.Event || {};

(function($) {

  var defaultFolder = "data/Map";
  var parameters = PluginManager.parameters('RS_EventCreate');

  //============================================================================
  // Array
  //============================================================================

  Object.defineProperty(Array.prototype, "first", {
    get: function() {
      return this[0];
    }
  });

  Object.defineProperty(Array.prototype, "last", {
    get: function() {
      var idx = this.length - 1;
      return this[idx];
    }
  });

  Array.prototype.delete = function(deleteItem) {
    var tmp = this.filter(
      function(findValue) {
        return findValue !== deleteItem;
      }
    );
    return tmp;
  };

  //============================================================================
  // RS.Event
  //============================================================================

  $.makeEventId = function () {
    return $gameMap.events().length + 1;
  };

  $.makeEventName = function (eventId) {
    return "EV" + String(eventId).padZero(3);
  };

  $.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return $.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  $.makeEventData = function (x, y, charName, charIdx, eventId, eventName) {
    var defaultEventData = $.jsonParse(parameters["Default Event Data"]);
    defaultEventData.id = eventId;
    defaultEventData.name = eventName;
    defaultEventData.x = x;
    defaultEventData.y = y;
    defaultEventData.pages[0].image.characterName = charName;
    defaultEventData.pages[0].image.characterIndex = charIdx;
    return defaultEventData;
  };

  $.applyEventOnMap = function (ev) {
    if(ev && ev.id) {
      $dataMap.events[ev.id] = ev;
    }
  };

  $.instanceCreate = function(x, y, charName, charIdx) {
    var eventId = $.makeEventId();
    var eventName = $.makeEventName(eventId);
    var newEvent = $.makeEventData(x, y, charName, charIdx, eventId, eventName);

    $.applyEventOnMap(newEvent);

    return $.instanceCopy(x, y, $gameMap.mapId(), eventId, newEvent);

  };

  $.instanceCopy = function(x, y, mapID, eventId ) {
    var eventData, scene;

    // Check that the map ID is the same.
    if($gameMap.mapId() === mapID) {

      // Create a new event.
      var eventData = new Game_Event(mapID || $gameMap.mapId(), eventId || 1);

      // Set up the position of the event itself.
      eventData.locate(x, y);

      // Check whether the fourth argument is used.
      if(arguments[4]) eventData.setCustomData(arguments[4]);

      // Set up the event page.
      eventData.refresh();

      // Added the event to event elements.
      $gameMap._events[eventId] = eventData;
      
      // Check whether the user is on the map.
      scene = SceneManager._scene;
      if(scene instanceof Scene_Map) {
        // Add the child of Sprite_Character
        var spriteset = scene._spriteset;
        spriteset._characterSprites.push(new Sprite_Character(eventData));
        spriteset._tilemap.addChild(spriteset._characterSprites.last);
      }

      return $gameMap._events.last;
    } else {
      return this.getMapData(x, y, mapID, eventId);
    }
  };

  $.getMapData = function(x, y, mapID, eventId) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var url = $.getParentFolder() + defaultFolder + mapID.padZero(3) + ".json";
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
          if (xhr.status < 400) {
              var item = JSON.parse(xhr.responseText);
              var event = item.events[eventId];
              event.id = $.makeEventId();
              $.applyEventOnMap(event);
              var newEvent = self.instanceCopy(x, y, $gameMap.mapId(), event.id);
              if(newEvent) {
                newEvent.setCustomData(event);
              }
          }
      }
    xhr.onerror = function() {
      throw new Error('Failed to load map data.');
    };
    xhr.send(null);
  };

  $.getParentFolder = function (url2) {
    url2 = url2 || location.href;
    var i = 0;
    var ret = '';
    while(url2[i] !== undefined) {
     i++;
    }
    while(url2[i] !== '/') {
     i--;
    }
    ret = url2.slice(0, i).concat('/');
    return ret;
  };

  $.checkCharacterImage = function(imageName, func) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var url = $.getParentFolder() + 'img/characters/' + imageName + '.png';
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
        if (xhr.status < 400) {
          func();
        }
      }
    xhr.onerror = function() {
      throw new Error('Failed to load an image ' + imageName);
    };
    xhr.send(null);
  };

  $.instanceDestroy = function(_event) {
    if(_event instanceof Game_Event) {
      var mapId = $gameMap.mapId();
      var eventId = _event.eventId();
      if($gameMap._events[eventId]) {
        delete $gameMap._events[eventId];
        $.deleteSpriteCharacter(_event);
        $gameSelfSwitches.setValue([mapId, eventId, 'A'], false);
        $gameSelfSwitches.setValue([mapId, eventId, 'B'], false);
        $gameSelfSwitches.setValue([mapId, eventId, 'C'], false);
        $gameSelfSwitches.setValue([mapId, eventId, 'D'], false);
      }
    }
  };

  $.deleteSpriteCharacter = function(owner) {
    var target, spriteItem = [];
    var scene = SceneManager._scene;
    var index = -1;
    if( (scene instanceof Scene_Map) ) {
      target = scene._spriteset;
      spriteItem = target._characterSprites.forEach(function(e, idx, a) {
        if(e._character === owner) {
          index = idx;
        };
      }, this);
      if(index !== -1) {
        target._tilemap.removeChild(target._characterSprites[index]);
      }
    }
  };

  //============================================================================
  // Game_Interpreter
  //============================================================================

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Event") {
      switch ( args[0].toLowerCase() ) {
      case 'create':
        var x = Number(args[1]).clamp(0, $gameMap.width() - 1);
        var y = Number(args[2]).clamp(0, $gameMap.height() - 1);
        var charName = args[3];
        var charIdx = Number(args[4]).clamp(0, 7);
        $.checkCharacterImage(charName, function () {
          $.instanceCreate(x, y, charName, charIdx);
        });
        break;
      case 'copy':
        var mapId = Number(args[3]);
        if(mapId <= 0) mapId = $gameMap.mapId();
        $.instanceCopy( Number(args[1]), Number(args[2]), mapId , Number(args[4]) );
        break;
      case 'delete':
        $.instanceDestroy( this.character(Number(args[1])) );
        break;
      }
    }
  };

  //============================================================================
  // Game_Event
  //============================================================================

  var alias_Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function(mapId, eventId) {
      alias_Game_Event_initialize.call(this, mapId, eventId);
      this._isCustomData = false;
  };

  Game_Event.prototype.setCustomData = function(data) {
    if(data) {
      this._isCustomData = true;
      this._customData = data;
      return this;
    }
  }

  Game_Event.prototype.event = function() {
    if(this._isCustomData) {
      return this._customData;
    } else {
      return $dataMap.events[this._eventId];
    }
  };

})(RS.Event);
