//================================================================
// RS_WalkingStepSound.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @author biud436
 * @url https://github.com/biud436
 * @plugindesc <RS_WalkingStepSound>
 * @base RS_WaveSupport
 * @orderAfter RS_WaveSupport
 *
 * @param --- Sound Range
 * @desc
 * @default
 *
 * @param Dirt Sound Name
 * @desc Array
 * @default ['stepdirt_', 1, 8]
 *
 * @param Snow Sound Name
 * @desc Array
 * @default ['stepsnow_', 1, 2]
 *
 * @param Stone Sound Name
 * @desc Array
 * @default ['stepstone_', 1, 8]
 *
 * @param Water Sound Name
 * @desc Array
 * @default ['stepwater_', 1 , 2]
 *
 * @param Wood Sound Name
 * @desc Array
 * @default ['stepwood_', 1, 2]
 *
 * @param --- Dirt SE
 * @desc
 * @default
 *
 * @param Audio Assets 1
 * @desc If you have an audio, you must edit this
 * @default stepdirt_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 2
 * @desc If you have an audio, you must edit this
 * @default stepdirt_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 3
 * @desc If you have an audio, you must edit this
 * @default stepdirt_3
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 4
 * @desc If you have an audio, you must edit this
 * @default stepdirt_4
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 5
 * @desc If you have an audio, you must edit this
 * @default stepdirt_5
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 6
 * @desc If you have an audio, you must edit this
 * @default stepdirt_6
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 7
 * @desc If you have an audio, you must edit this
 * @default stepdirt_7
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 8
 * @desc If you have an audio, you must edit this
 * @default stepdirt_8
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Snow SE
 * @desc
 * @default
 *
 * @param Audio Assets 9
 * @desc If you have an audio, you must edit this
 * @default stepsnow_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 10
 * @desc If you have an audio, you must edit this
 * @default stepsnow_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Stone SE
 * @desc
 * @default
 *
 * @param Audio Assets 11
 * @desc If you have an audio, you must edit this
 * @default stepstone_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 12
 * @desc If you have an audio, you must edit this
 * @default stepstone_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 13
 * @desc If you have an audio, you must edit this
 * @default stepstone_3
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 14
 * @desc If you have an audio, you must edit this
 * @default stepstone_4
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 15
 * @desc If you have an audio, you must edit this
 * @default stepstone_5
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 16
 * @desc If you have an audio, you must edit this
 * @default stepstone_6
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 17
 * @desc If you have an audio, you must edit this
 * @default stepstone_7
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 18
 * @desc If you have an audio, you must edit this
 * @default stepstone_8
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Water SE
 * @desc
 * @default
 *
 * @param Audio Assets 19
 * @desc If you have an audio, you must edit this
 * @default stepwater_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 20
 * @desc If you have an audio, you must edit this
 * @default stepwater_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Wood SE
 * @desc
 * @default
 *
 * @param Audio Assets 21
 * @desc If you have an audio, you must edit this
 * @default stepwood_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 22
 * @desc If you have an audio, you must edit this
 * @default stepwood_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Sound Tags
 * @desc
 * @default
 *
 * @param Dirt Terrain Tag
 * @desc
 * @default 1
 *
 * @param Snow Terrain Tag
 * @desc
 * @default 2
 *
 * @param Stone Terrain Tag
 * @desc
 * @default 3
 *
 * @param Water Terrain Tag
 * @desc
 * @default 4
 *
 * @param Wood Terrain Tag
 * @desc
 * @default 5
 *
 * @param --- Settings
 * @desc
 * @default
 *
 * @param Step Interval
 * @parent --- Settings
 * @desc
 * @default 2
 *
 * @param Volume
 * @parent --- Settings
 * @desc
 * @default 30
 *
 * @param Step Sound
 * @parent --- Settings
 * @desc This is a command name in the menu option.
 * @default Step Sound
 *
 * @help
 * Whenever you are walking in your world, this plugin automatically plays the walking footstep sound.
 *
 * 1. First step is to add sound effect files on the audio/wav folder.
 * 2. Second step is to add this plugin file on the js/plugin folder.
 * 3. Third step is to set the following note tag on the database-tileset-note.
 *
 * <Step Sounds>
 *
 * 4. Fourth step is to set the following terrain tag on the database-tileset.
 * (This plugin distinguishes the footstep sound effects via the terrain tag)
 *
 * Dirt Terrain / 1
 * Snow Terrain / 2
 * Stone Terrain / 3
 * Water Terrain / 4
 * Wood Terrain / 5
 *
 * =============================================================================
 * Version Log
 * =============================================================================
 * 2015.12.26 (v1.0.0)- First Release.
 * 2016.03.04 (v1.0.1)- Added the comments for include used files.
 * 2016.03.05 (v1.0.2) - Fixed the class structure.
 * 2016.03.10 (v1.0.3) - Fixed the sound option.
 * 2016.09.14 (v1.0.4) - Fixed the issue that the step sound property is initialized to the false in ConfigManager.
 * 2016.12.05 (v1.0.5) - Fixed the value of ConfigManager.stepSound
 * 2017.02.26 (v1.0.6) - Fixed a bug that is not configurable the config value called 'stepSound' as true when starting the game.
 * 2019.04.18 (v1.0.8) :
 * - Added the MOG_Footsteps Compatibility.
 * 2022.01.26 (v2.0.0) :
 * - Released for RPG Maker MZ
 */
/*:ko
 * @target MZ
 * @author biud436
 * @url https://github.com/biud436
 * @plugindesc 발소리를 자동으로 재생합니다. <RS_WalkingStepSound>
 * @base RS_WaveSupport
 * @orderAfter RS_WaveSupport
 *
 * @param --- Sound Range
 * @text 효과음 범위
 * @desc
 * @default
 *
 * @param Dirt Sound Name
 * @text 진흙
 * @parent --- Sound Range
 * @desc 불러올 효과음 파일의 이름을 만들기 위한 배열입니다.
 * @default ['stepdirt_', 1, 8]
 *
 * @param Snow Sound Name
 * @text 눈
 * @parent --- Sound Range
 * @desc 불러올 효과음 파일의 이름을 만들기 위한 배열입니다.
 * @default ['stepsnow_', 1, 2]
 *
 * @param Stone Sound Name
 * @text 암석
 * @parent --- Sound Range
 * @desc 불러올 효과음 파일의 이름을 만들기 위한 배열입니다.
 * @default ['stepstone_', 1, 8]
 *
 * @param Water Sound Name
 * @text 물
 * @parent --- Sound Range
 * @desc 불러올 효과음 파일의 이름을 만들기 위한 배열입니다.
 * @default ['stepwater_', 1 , 2]
 *
 * @param Wood Sound Name
 * @text 나무
 * @parent --- Sound Range
 * @desc 불러올 효과음 파일의 이름을 만들기 위한 배열입니다.
 * @default ['stepwood_', 1, 2]
 *
 * @param --- Dirt SE
 * @text 진흙길 발소리
 * @desc
 * @default
 *
 * @param Audio Assets 1
 * @parent --- Dirt SE
 * @text 오디오 에셋 1
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 2
 * @parent --- Dirt SE
 * @text 오디오 에셋 2
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 3
 * @parent --- Dirt SE
 * @text 오디오 에셋 3
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_3
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 4
 * @parent --- Dirt SE
 * @text 오디오 에셋 4
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_4
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 5
 * @parent --- Dirt SE
 * @text 오디오 에셋 5
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_5
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 6
 * @parent --- Dirt SE
 * @text 오디오 에셋 6
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_6
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 7
 * @parent --- Dirt SE
 * @text 오디오 에셋 7
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_7
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 8
 * @parent --- Dirt SE
 * @text 오디오 에셋 8
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepdirt_8
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Snow SE
 * @text 눈길 발소리
 * @desc
 * @default
 *
 * @param Audio Assets 9
 * @parent --- Snow SE
 * @text 오디오 에셋 9
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepsnow_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 10
 * @parent --- Snow SE
 * @text 오디오 에셋 10
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepsnow_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Stone SE
 * @text 암석 SE
 * @desc
 * @default
 *
 * @param Audio Assets 11
 * @parent --- Stone SE
 * @text 오디오 에셋 11
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 12
 * @parent --- Stone SE
 * @text 오디오 에셋 12
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 13
 * @parent --- Stone SE
 * @text 오디오 에셋 13
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_3
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 14
 * @parent --- Stone SE
 * @text 오디오 에셋 14
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_4
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 15
 * @parent --- Stone SE
 * @text 오디오 에셋 15
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_5
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 16
 * @parent --- Stone SE
 * @text 오디오 에셋 16
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_6
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 17
 * @parent --- Stone SE
 * @text 오디오 에셋 17
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_7
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 18
 * @parent --- Stone SE
 * @text 오디오 에셋 18
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepstone_8
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Water SE
 * @desc
 * @default
 *
 * @param Audio Assets 19
 * @parent --- Water SE
 * @text 오디오 에셋 19
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepwater_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 20
 * @parent --- Water SE
 * @text 오디오 에셋 20
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepwater_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Wood SE
 * @text 나무 SE
 * @desc
 * @default
 *
 * @param Audio Assets 21
 * @parent --- Wood SE
 * @text 오디오 에셋 21
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepwood_1
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param Audio Assets 22
 * @parent --- Wood SE
 * @text 오디오 에셋 22
 * @desc 재생 할 효과음 파일을 지정하십시오.
 * @default stepwood_2
 * @require 1
 * @dir audio/wav/
 * @type file
 *
 * @param --- Sound Tags
 * @text 효과음 지형 태그
 * @desc
 * @default
 *
 * @param Dirt Terrain Tag
 * @text 흙길 지형 태그
 * @desc 발소리를 재생할 지형 태그의 번호를 지정하십시오.
 * @default 1
 *
 * @param Snow Terrain Tag
 * @text 눈길 지형 태그
 * @desc 발소리를 재생할 지형 태그의 번호를 지정하십시오.
 * @default 2
 *
 * @param Stone Terrain Tag
 * @text 암석 지형 태그
 * @desc 발소리를 재생할 지형 태그의 번호를 지정하십시오.
 * @default 3
 *
 * @param Water Terrain Tag
 * @text 물, 강, 수중 지형 태그
 * @desc 발소리를 재생할 지형 태그의 번호를 지정하십시오.
 * @default 4
 *
 * @param Wood Terrain Tag
 * @text 나무 지형 태그
 * @desc 발소리를 재생할 지형 태그의 번호를 지정하십시오.
 * @default 5
 *
 * @param --- Settings
 * @text 설정
 * @desc
 * @default
 *
 * @param Step Interval
 * @parent --- Settings
 * @text 걸음 수
 * @desc 일정 걸음 수에 도달하면 발소리를 재생하게 됩니다.
 * @default 2
 *
 * @param Volume
 * @parent --- Settings
 * @text 볼륨
 * @desc 기본 발소리 효과음 계수
 * @default 30
 *
 * @param Step Sound
 * @parent --- Settings
 * @text 발걸음 소리
 * @desc 메뉴에서 옵션에 들어가면 나오는 옵션 버튼의 이름
 * @default Step Sound
 *
 * @help
 *
 * 타일을 밟을 때 마다 해당 타일에 맞는 발소리를 재생하는 플러그인입니다.
 * 발소리는 타일에 설정된 지형 태그 값을 읽어 재생하며 파일의 범위를 설정하면
 * 한 발소리가 아니라 다양한 발소리를 재생할 수 있습니다.
 *
 * 사운드 재생에는 audio/wav 폴더에 .wav 파일이 있어야 합니다.
 * wav 폴더는 기본 폴더가 아니니 새로 만들어주시기 바랍니다.
 * 사운드 리소스를 웨이브 파일로 결정한 이유는 찾은 리소스가 웨이브 파일이었기 때문입니다.
 *
 * 사용된 사운드는 아래와 같습니다(사용 조건에 주의)
 * http://opengameart.org/content/foot-walking-step-sounds-on-stone-water-snow-wood-and-dirt
 *
 * 이 플러그인은 발소리를 지역 태그 번호로 구분합니다. 지역 태그 번호가 0 이면 아무 소리가 재생되지 않고 아래 조건에 해당되는 지역 태그가 있으면 해당 타일에 맞는 웨이브 파일이 재생 됩니다.
 *
 * 흙 / 1번
 * 눈 / 2번
 * 돌 / 3번
 * 물 / 4번
 * 나무 / 5번
 * 발소리는 데이터베이스 타일셋 메모란에 아래와 같은 노트 태그를 추가해야 재생됩니다.
 *
 * <Step Sounds>
 *
 * 추가적으로 설정하자면 플러그인 매니저에서 여러가지 유용한 설정들을 할 수 있습니다.
 * 지형 태그 번호를 다른 번호로 설정하거나 기본적으로 설정되어있는 사운드 파일의 이름을
 * 바꿀 수도 있으며 발소리가 재생되는 간격도 정할 수 있습니다.
 * 또한 초기에 정해지는 볼륨값도 플러그인 매니저에서 설정할 수 있음을 참고 하시기 바랍니다.
 *
 * 옵션에서 볼륨 값 등을 조절할 수 있습니다.
 *
 * =============================================================================
 * 다운로드
 * =============================================================================
 * 기본적으로 필요한 파일
 * - https://raw.githubusercontent.com/biud436/MV/master/RS_WaveSupport.js
 * - https://raw.githubusercontent.com/biud436/MV/master/RS_WalkingStepSound.js
 *
 * OGG 파일 재생 기반으로 바꾸려면, RS_WalkingStepSound.js 대신 아래를 사용하세요
 * - https://github.com/biud436/MV/raw/master/RS_WalkingStepSoundForOgg.js
 *
 * 어떻게 설정하는 지 모르시는 분들은 아래 링크에서 데모 게임을 다운로드 받으세요 (3.48MB)
 * https://www.dropbox.com/s/0sphmziuhsawrcl/Footstep%20Sound.zip?dl=1
 *
 * 데모 게임에 포함된 사운드 파일의 저작권 정보입니다 (데모 게임의 CREDITS.txt 파일에서도 확인 가능합니다)
 * - 저작권자 : Jute
 * - 원 게시물 주소 : http://opengameart.org/content/foot-walking-step-sounds-on-stone-water-snow-wood-and-dirt
 * - 라이센스 : GPU 2.0 or later (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html)
 * =============================================================================
 * 버전 로그
 * =============================================================================
 * 2015.12.26 (v1.0.0) - 배포일
 * 2016.03.04 (v1.0.1) - RPG Maker MV v1.1.0 대응
 * 2016.03.05 (v1.0.2) - 클래스 구조 수정
 * 2016.03.10 (v1.0.3) - 사운드 옵션값 수정
 * 2016.09.14 (v1.0.4) - 옵션에 표시되는 Step Sound 속성이 false로 초기화되는 문제를 해결했습니다.
 * 2016.12.05 (v1.0.5) - ConfigManager.stepSound 값 수정
 * 2017.02.26 (v1.0.6) - 게임 옵션 창의 Step Sound 속성이 false 상태로 시작되는 문제를 수정했습니다.
 * 게임 프로그램이 시작되면 옵션이 저장된 세이브 파일을 가장 먼저 불러오게 되는데
 * 여기에 관련 옵션이 존재하지 않을 경우 생기는 문제였습니다.
 * 2018.04.04 (v1.0.7) - 영어권엔 비슷한 플러그인도 많기 때문에 그냥 한국어(우리말)로 설명을 변경합니다.
 * 2019.04.18 (v1.0.8) :
 * - Added the MOG_Footsteps Compatibility.
 * 2022.01.26 (v2.0.0) :
 * - RPG Maker MZ 용으로 업데이트 되었습니다.
 */
(() => {
    const pluginParams = $plugins.filter((i) => {
        return i.description.contains("<RS_WalkingStepSound>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    const TerrainTag = {
        DIRT: Number(parameters["Dirt Terrain Tag"] || 1),
        SNOW: Number(parameters["Snow Terrain Tag"] || 2),
        STONE: Number(parameters["Stone Terrain Tag"] || 3),
        WATER: Number(parameters["Water Terrain Tag"] || 4),
        WOOD: Number(parameters["Wood Terrain Tag"] || 5),
    };

    const config = {
        stepInterval: Number(parameters["Step Interval"] || 2),
        volume: Number(parameters["Volume"] || 30),
        dirtSoundName: eval(parameters["Dirt Sound Name"]),
        snowSoundName: eval(parameters["Snow Sound Name"]),
        stoneSoundName: eval(parameters["Stone Sound Name"]),
        waterSoundName: eval(parameters["Water Sound Name"]),
        woodSoundName: eval(parameters["Wood Sound Name"]),
        symbolName: String(parameters["Step Sound"] || "Step Sound"),
        terrainTags: Object.values(TerrainTag),
    };

    const TerrainSound = {
        dirt: config.dirtSoundName,
        snow: config.snowSoundName,
        stone: config.stoneSoundName,
        water: config.waterSoundName,
        wood: config.woodSoundName,
    };

    const REQUEST_SOUND = {
        SOUND_NAME: 0,
        MIN: 1,
        MAX: 2,
    };

    const TerrainKeyMap = {
        1: "dirt",
        2: "snow",
        3: "stone",
        4: "water",
        5: "wood",
    };

    /**
     * this class is the Anonymous class for representing terrain tag.
     * @class TerrainManager
     * @type {{isRunning: Function}}
     */
    const TerrainManager = new (class {
        constructor() {
            this._init = false;
            this._state = false;
            this._steps = 0;
            this._staticVolume = undefined;
        }

        setDirty(value) {
            this._state = value;
        }

        initWithMembers() {
            this._init = false;
            this._state = false;
            this._steps = 0;
        }

        isRunning() {
            this.initWithMembers();

            const tileset = $gameMap.tileset();

            const lines = tileset.note.split(/[\r\n]+/);
            const stepRegex = /<Step Sounds>/i;
            lines.forEach((i) => {
                const isStepSound = i.match(stepRegex);
                if (isStepSound) {
                    this._init = true;
                    ConfigManager.save();
                }
            });
        }

        requestSound(type) {
            const sound = TerrainSound[type];

            const originalFileName = sound[REQUEST_SOUND.SOUND_NAME];
            const min = sound[REQUEST_SOUND.MIN];
            const max = sound[REQUEST_SOUND.MAX];

            const index = ((1 + Math.random() * max) >> 0).clamp(min, max);
            const vol = this.getSoundVolume();
            const volRate = AudioManager.wavVolume / 100;

            const targetWavFileName = "%1%2".format(originalFileName, index);
            AudioManager.playWav(
                targetWavFileName,
                Math.floor(vol * volRate),
                ".wav"
            );
        }

        /**
         * if the persistent volume value is saved in the instance, it returns it just.
         * this logic will save the CPU time pretty.
         * @returns
         */
        getSoundVolume() {
            if (this._staticVolume) {
                return this._staticVolume;
            }

            // get the volume value between 30 and 40
            const vol = (30 + Math.random() * 10) >> 0;

            // set the persistent volume value.
            this._staticVolume = vol;

            return this._staticVolume;
        }

        isInit() {
            return this._init && !!ConfigManager.stepSound;
        }

        playSound() {
            const terrain = $gamePlayer.terrainTag();
            if (!this._state) {
                console.warn("the variable called 'state' is not defined");
                return;
            }

            if (this.isInit()) {
                // this switch statement is possible to convert with hash map.
                // hash map is faster than switch statement.
                // TODO: switch -> hash map
                if (TerrainKeyMap[terrain]) {
                    this.requestSound(TerrainKeyMap[terrain]);
                }
                this.setDirty(false);
            }
        }

        update() {
            const prevStepCount = this._steps;
            const stepCount = $gameParty.steps();
            const distance = this.getDistance();

            if (this._state) {
                if (stepCount === prevStepCount) this.playSound();
            } else {
                this._steps = stepCount + distance;
                this.setDirty(true);
            }
        }

        getDistance() {
            return config.stepInterval;
        }
    })();

    const alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        alias_Scene_Map_start.call(this);
        TerrainManager.isRunning();
    };

    //========================================================
    // Frame Update
    //========================================================

    const alias_Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        alias_Game_Map_update.call(this, sceneActive);
        TerrainManager.update();
    };

    //========================================================
    // ConfigManager
    //========================================================

    ConfigManager.stepSound = true;

    const alias_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        const config = alias_makeData.call(this);
        config.stepSound = ConfigManager.stepSound;
        return config;
    };

    const alias_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        alias_applyData.call(this, config);
        const ret = config["stepSound"];
        const temp = ConfigManager.stepSound;
        if (ret !== undefined) {
            this.stepSound = ret;
        } else {
            this.stepSound = temp;
        }
    };

    //========================================================
    // Window_Options
    //========================================================

    const alias_addVolumeOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function () {
        alias_addVolumeOptions.call(this);
        this.addCommand(config.symbolName, "stepSound");
    };
})();
