 /*:
 * @plugindesc (v0.1.57-android-opt) 한글 메시지 시스템 <RS_MessageSystem>
 * @author 러닝은빛(biud436)
 *
 * @param 글꼴 크기
 * @type number
 * @desc 글꼴의 크기를 정수로 지정하세요
 * @default 28
 *
 * @param 라인 갯수
 * @type number
 * @desc 라인 갯수
 * @default 4
 * @min 1
 * 
 * @param 기본 텍스트 출력 속도
 * @type number
 * @desc 기본 값 : 0 프레임
 * @default 0
 *
 * @param 폰트 최소 크기
 * @type number
 * @desc \}로 텍스트 크기를 한 단계 줄일 때 최소 크기를 제한합니다
 * @default 24
 *
 * @param 폰트 최대 크기
 * @type number
 * @desc \{로 텍스트 크기를 한 단계 키울 때 최대 크기를 제한합니다
 * @default 96
 *
 * @param 일반 페이스칩
 * 
 * @param normalFaceNewLineX
 * @text 텍스트 시작 X
 * @parent 일반 페이스칩
 * @type number
 * @desc 일반 페이스칩이 설정되어있을 때 텍스트 시작 좌표를 정수로 기입하세요.
 * @default 168
 *
 * @param 큰 페이스칩
 *
 * @param 텍스트 시작 X
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩이 설정되어있을 때 텍스트 시작 좌표를 정수로 기입하세요.
 * @default 256
 *
 * @param 큰 페이스칩 OX
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩의 오프셋 X
 * @default 0
 * @min -1280
 *
 * @param 큰 페이스칩 OY
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩의 오프셋 Y
 * @default 0
 * @min -1280
 * 
 * @param face Opacity
 * @text 큰 페이스칩 투명도
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩의 투명도를 조절합니다.
 * (0 - 255)
 * @default 255
 *
 * @param 대화창 뒤에 얼굴 표시
 * @type boolean
 * @parent 큰 페이스칩
 * @desc 큰 페이스칩을 메시지창의 뒷면에 표시합니다.
 * 예 - true   아니오 - false
 * @default false
 * @on 대화창 뒤에
 * @off 대화창을 가림
 * 
 * @param face Direction
 * @text 얼굴 이미지의 위치
 * @type select
 * @parent 큰 페이스칩
 * @desc 일반 얼굴 이미지의 위치를 설정합니다.
 * @default 0
 * @option 왼쪽
 * @value 0
 * @option 오른쪽
 * @value 2
 *
 * @param 탭 크기
 * @type number
 * @desc 탭 크기
 * @default 4
 *
 * @param 배경 그림의 투명도
 * @type number
 * @desc 대화창 배경의 투명도입니다
 * @default 192
 * @min 0
 * @max 255
 *
 * @param 기본 투명도
 * @type number
 * @desc 대화창의 기본적인 투명도 값입니다
 * @default 255
 * @min 0
 * @max 255
 *
 * @param 내용의 투명도
 * @type number
 * @desc 대화창 컨텐츠의 투명도 값입니다
 * @default 255
 * @min 0
 * @max 255
 *
 * @param 반투명도
 * @type number
 * @desc 대화창의 반투명도를 조절합니다.
 * @default 160
 * @min 0
 * @max 255
 *
 * @param 테두리 크기
 * @type number
 * @desc 텍스트의 테두리 크기를 정수로 지정하세요
 * @default 2
 * @min 0
 *
 * @param 테두리 색상
 * @desc 텍스트의 테두리 색상을 웹컬러 규격으로 지정하세요
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param 기본 윈도우스킨
 * @desc 기본 윈도우의 윈도우 스킨을 지정하세요
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param System Font Settings
 * @text 시스템 폰트 설정
 * 
 * @param systemFont
 * @parent System Font Settings
 * @text 시스템 폰트
 * @type struct<SystemFont>
 * @desc 사용자 컴퓨터에 설치된 폰트로 구성합니다.
 * @default {"settings":"[\"{\\\"languageCode\\\":\\\"ko\\\",\\\"fontName\\\":\\\"나눔고딕, Dotum, AppleGothic, sans-serif\\\"}\",\"{\\\"languageCode\\\":\\\"zh\\\",\\\"fontName\\\":\\\"SimHei, Heiti TC, sans-serif\\\"}\"]"}
 *
 * @param 커스텀 폰트
 *
 * @param 사용자 지정 폰트 사용 여부
 * @parent 커스텀 폰트
 * @type boolean
 * @desc 사용자 지정 폰트를 사용하시겠습니까?
 * 예 - true   아니오 - false
 * @default false
 * @on 사용
 * @off 사용하지 않음
 *
 * @param 사용자 지정 폰트명
 * @parent 커스텀 폰트
 * @desc Font의 이름을 작성하세요
 * @default NanumBrush
 *
 * @param 사용자 지정 폰트 경로
 * @parent 커스텀 폰트
 * @desc 사용자 지정 Font의 경로를 지정하세요
 * @default fonts/NanumBrush.ttf
 *
 * @param 선택지 표시
 *
 * @param 선택지 스타일
 * @parent 선택지 표시
 * @type select
 * @desc 선택지 창의 스타일을 설정할 수 있습니다
 * (숫자 입력은 XP 스타일로 나오지 않습니다.)
 * @default default
 * @option RMXP 스타일
 * @value RMXP
 * @option 기본 스타일 (MV, VXA)
 * @value default
 *
 * @param 이름 윈도우
 *
 * @param 이름 윈도우스킨
 * @parent 이름 윈도우
 * @desc 이름 윈도우의 윈도우 스킨을 지정하세요
 * @require 1
 * @default Window
 * @dir img/system/
 * @type file
 *
 * @param 이름 윈도우 X
 * @parent 이름 윈도우
 * @type number
 * @desc 대화창의 좌표를 기준으로 오프셋 됩니다
 * @default 0
 *
 * @param 이름 윈도우 Y
 * @parent 이름 윈도우
 * @type number
 * @desc 대화창의 좌표를 기준으로 오프셋 됩니다
 * @default 0
 *
 * @param 이름 윈도우 안쪽 여백
 * @parent 이름 윈도우
 * @type number
 * @desc 이름 윈도우 안쪽 여백
 * @default 10
 *
 * @param 이름 윈도우 위치
 * @parent 이름 윈도우
 * @type select
 * @desc 이름 윈도우 위치를 지정합니다.
 * @default left
 * @option 왼쪽-위 (기본)
 * @value left
 * @option 오른쪽-위
 * @value right
 * 
 * @param 텍스트 색상
 * @type struct<TextColor>[]
 * @desc 사용자 정의 텍스트 색상을 추가합니다.
 * @default ["{\"Color Name\":\"연한보라\",\"Red\":\"200\",\"Green\":\"191\",\"Blue\":\"231\",\"Alpha\":\"1.0\"}"]
 *
 * @param 텍스트 코드
 * @type struct<TextCode>
 * @desc 텍스트 코드 변경
 * @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\",\"아군\",\"적그룹\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS굵게!\",\"AE굵게!\",\"AS이탤릭!\",\"AE이탤릭!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"배경색\",\"FD\"]"}
 *
 * @param 효과음 재생
 *
 * @param 텍스트 효과음 재생 여부
 * @parent 효과음 재생
 * @type boolean
 * @default true
 * @on 재생합니다.
 * @off 재생하지 않습니다.
 *
 * @param 텍스트 효과음
 * @parent 효과음 재생
 * @type file
 * @dir audio/se/
 * @desc 텍스트 처리 시 특정 사운드를 같이 재생합니다.
 * @default Cursor1
 * @require 1
 * 
 * @param 텍스트 효과음 실행 조건
 * @parent 효과음 재생
 * @type note
 * @desc 텍스트 효과음이 재생될 확률을 만듭니다.
 * @default "Math.randomInt(100) < 45"
 *
 * @param 텍스트 사운드 풀 크기
 * @parent 효과음 재생
 * @type number
 * @desc 사운드 풀의 크기를 지정합니다.
 * @default 2
 * @min 1
 * 
 * @param 텍스트 사운드 재생 간격
 * @parent 효과음 재생
 * @type number
 * @desc 사운드 재생 간격를 설정합니다.
 * @default 2
 * @min 1
 * 
 * @param 텍스트 효과음 볼륨
 * @parent 효과음 재생
 * @type note
 * @desc 텍스트 효과음의 볼륨을 정합니다. (0.0 ~ 1.0 사이)
 * @default "0.4"
 *
 * @param 언어 코드
 * @desc 사용할 텍스트 코드의 언어 코드를 입력하세요
 * @default ko
 * 
 * @param preload windowskin
 * @text 윈도우스킨 프리로드
 * @require 1
 * @dir img/system/
 * @type file[]
 * @desc 윈도우 스킨을 프리 로드합니다.
 * @default
 * 
 * @param Window Width
 * @text 윈도우 폭
 * @type string
 * @desc 윈도우 폭 지정
 * (Graphics.boxWidth는 화면 가로 길이)
 * @default (Graphics.boxWidth / 2) + (Graphics.boxWidth / 3)
 * 
 * @param Paragraph Minifier
 * @text 자동 개행 여부
 * @type boolean
 * @desc 자동 개행 여부를 설정하십시오
 * (기본 값은 false)
 * @default false
 * @on 자동 개행 설정
 * @off 미설정
 * 
 * @param Line Height
 * @text 라인 크기
 * @type number
 * @desc 라인 크기를 지정하세요
 * (기본값 : 36)
 * @default 36
 * 
 * @help
 * =============================================================================
 * 플러그인 커맨드
 * =============================================================================
 * 
 * 텍스트 하나가 메시지 창에 그려지는 속도를 조절하는 플러그인 명령입니다. 
 * 텍스트를 딜레이 없이 그리려면 속도를 0으로 하거나 \<,\> 명령을 사용하는 것이 좋습니다.
 * 속도 단위는 프레임 단위입니다.
 * 
 * 메시지 텍스트속도 number
 * 
 * 폰트 크기는 기본적으로 pt 단위입니다.
 * RPG Maker MV에서는 28pt를 기본 폰트 사이즈로 사용합니다.
 * 웹페이지 상에서 통상적으로 보여지는 글자의 기본 크기는 12pt입니다.
 * 
 * 메시지 폰트크기 number
 * 
 * 폰트의 최소 pt, 최대 pt 범위를 지정합니다.
 * 
 * 메시지 폰트최소크기 number
 * 메시지 폰트최대크기 number
 * 
 * 메시지의 라인을 바꿀 수 있는 명령입니다.
 * 기본적으로 4가 기본 값이며 5 이상인 경우에는 멀티 라인으로 취급됩니다.
 * 선택지 표시 방법을 RPG Maker XP 형식으로 설정하였을 땐 멀티 라인으로 설정되지 않습니다.
 * 
 * 메시지 라인 number
 * 
 * 얼굴 이미지가 메시지 창에 설정되어있을 때 텍스트의 시작 좌표를 변경하는 명령입니다.
 * 텍스트와 얼굴 이미지는 같은 레이어에 그려지기 때문에 텍스트가 가려지지 않게 텍스트의 시작 위치를 조절할 필요성이 있습니다.
 * 
 * 얼굴 이미지가 왼쪽에 있을 경우에만 해당합니다.
 * 
 * 메시지 시작위치 number
 *
 * 이름 윈도우의 좌표를 세밀하게 조절하기 위한 오프셋 좌표를 설정할 수 있는 명령입니다.
 * 
 * 메시지 이름윈도우 offset_x number
 * 메시지 이름윈도우 offset_y number
 * 
 * 이름 윈도우의 여백 값을 변경할 수 있습니다.
 * 창 테두리 쪽으로부터 왼쪽, 위, 오른쪽, 아래에 균일한 여백 값이 적용됩니다.
 * 
 * 메시지 이름윈도우 padding number
 * 
 * 이름 윈도우의 윈도우스킨을 변경할 수 있는 명령입니다.
 * 미리 사전에 해당 윈도우 스킨을 로드를 해놓고 호출하시기 바랍니다.
 * 이미지를 사전에 로드해놓지 않았을 경우에도 동작하지만 몇 가지 단계를 더 거치게 되고,
 * 색상이 제대로 표시가 되지 않을 수도 있습니다.
 * 
 * 메시지 이름윈도우 윈도우스킨 skin_name
 *
 * 얼굴 이미지를 스탠딩 CG로 활용하는 경우, 오프셋 좌표를 조절할 수 있습니다.
 * 
 * 메시지 큰페이스칩X number
 * 메시지 큰페이스칩Y number
 * 
 * 대부분 스탠딩 CG에는 여백이 있고 각 이미지마다 이 여백의 크기가 다르므로 오프셋도 달라집니다.
 * 프리셋을 지정하거나 오프셋 좌표를 기억하는 기능이 없기 때문에 별도로 데이터를 관리해야 합니다.
 * 
 * 예를 들면, 
 * data라는 변수에 오프셋 좌표가 있다고 한다면 다음과 같이 스크립트 호출로 오프셋 좌표를 변경할 수 있습니다.
 * 
 * RS.MessageSystem.Params.faceOX = data.x;
 * RS.MessageSystem.Params.faceOY = data.y;
 *
 * number가 -1이면 메시지 창이 페이스칩을 가리고, 다른 값이면 가리지 않습니다:
 * 메시지 큰페이스칩Z number
 *
 * 배경투명도의 경우, 주의 사항이 있습니다.
 * 255로 설정하면 완전히 불투명해야 하지만 기본 이미지의 알파 채널 자체가 반투명하여
 * 완전 불투명하게 표시되지 않습니다. 완전 불투명하게 표시하려면 이미지의 알파 채널도
 * 불투명해야 합니다.
 * 
 * 메시지 탭크기 number
 * 메시지 배경투명도 number
 * 메시지 컨텐츠투명도 number
 * 
 * 윈도우 스킨 노트의 경우, 프리로드 기능을 사용해야만 정상적으로 폰트 색상이 설정됩니다.
 *
 * 메시지 윈도우스킨 skin_name
 * 
 * 텍스트가 대화창보다 더 길게 넘어가면 자동으로 줄바꿈 처리를 합니다.
 * 또한 불필요한 개행 문자를 없애고 문단을 최대한 최소화하여 메시지 창에서 보이게 만듭니다.
 * 
 * 메시지 문단최소화 true
 * 
 * 개행 문자를 그대로 두고, 자동으로 줄바꿈 처리를 하지 않습니다.
 * 메시지 문단최소화 false
 * 
 * 문단 최소화가 true(ON)인 상태에서 정렬자를 사용하면 정렬자가 제대로 동작하지 않을 수 있
 * 으니 주의 하시기 바랍니다.
 * 
 * 말풍선 모드나 일반 메시지 창의 오프셋을 조정할 수 있습니다.
 * 
 * 메시지 오프셋X number
 * 메시지 오프셋Y number
 * 
 * 얼굴 이미지의 정렬 위치를 바꾸려면 다음과 같은 플러그인 명령을 호출하세요.
 * 왼쪽 정렬은 0을, 오른쪽 정렬은 2를 인자 값으로 전달하세요.
 * 
 * 메시지 페이스칩위치 0
 * 메시지 페이스칩위치 2
 *
 * =============================================================================
 * 큰 페이스칩 설정
 * =============================================================================
 * 페이스칩을 img/faces 에 넣고 페이스칩의 이름을 Big_ 으로 시작하게 하면 됩니다.
 *
 * - 페이스칩이 메시지 창에 가려지게 설정하려면 플러그인 매개변수 값을 바꾸세요.
 *
 * 단, 선택 창이 왼쪽 위에 놓으면 페이스칩이 메시지 창의 왼쪽에 표시됩니다.
 * (아닌 경우에는 오른쪽에 표시할 것입니다)
 *  
 * 페이스칩의 인덱스는 다음과 같은 순서입니다.
 * 
 *  0 1 2 3
 *  4 5 6 7
 * 
 * 선택 창이 가장 왼쪽 위에 있으면 인덱스가 0이고, 왼쪽에 표시됩니다.
 * 0이 아닌 다른 인덱스 값인 경우에는 오른쪽에 표시됩니다.
 * 
 * =============================================================================
 * 텍스트 코드(Text Code)
 * =============================================================================
 *
 * 다양한 색상 코드를 사용할 수 있습니다. 
 * 미리 입력된 색을 사용할 수도 있고 웹 색상을 설정할 수도 있습니다. 
 * 이것은 최상위 클래스에 정의되므로 어느 창에서나 사용할 수 있습니다.
 * 다만 텍스트 코드를 처리하는 창에서만 사용해야 합니다:
 *
 * \색[색상명]
 * \테두리색[색상명]
 * \배경색[색상명]
 * 
 * 사용 가능한 색상은 다음과 같습니다.
 * 
 * \색[기본색] - 이 색은 기본 윈도우 스킨 하단 색상 테이블에 위치한 0번 색과 같습니다.
 * \색[청록]
 * \색[검은색]
 * \색[파란색]
 * \색[짙은회색]
 * \색[자홍색]
 * \색[회색]
 * \색[녹색]
 * \색[밝은녹색]
 * \색[밝은회색]
 * \색[밤색]
 * \색[감청색]
 * \색[황록색]
 * \색[주황색]
 * \색[보라색]
 * \색[빨간색]
 * \색[은색]
 * \색[민트색]
 * \색[흰색]
 * \색[노란색]
 * \색[기본]
 * \색[청록색]
 * \색[검정]
 * \색[파랑]
 * \색[c_dkgray]
 * \색[자홍]
 * \색[c_gray]
 * \색[c_green]
 * \색[라임]
 * \색[c_ltgray]
 * \색[마룬]
 * \색[네이비]
 * \색[올리브]
 * \색[주황]
 * \색[보라]
 * \색[빨강]
 * \색[은]
 * \색[c_teal]
 * \색[흰]
 * \색[노랑]
 * \색[오렌지]
 * \색[c_orange]
 * \색[c_aqua]
 * \색[c_black]
 * \색[c_blue]
 * \색[c_fuchsia]
 * \색[c_lime]
 * \색[c_maroon]
 * \색[c_navy]
 * \색[c_olive]
 * \색[c_purple]
 * \색[red]
 * \색[c_red]
 * \색[c_silver]
 * \색[white]
 * \색[c_white]
 * \색[c_yellow]
 * \색[c_normal]
 * 
 * 미리 정의한 색상 말고도 다른 색상을 사용하려면 이렇게 하면 됩니다.
 * 
 * \색[#ffffff] 과 \색[white]는 흰색입니다.
 * \색[rgb(255, 0, 0)]과 \색[red] 그리고 \색[#ff0000]은 빨강색입니다.
 * \색[aqua], \색[lime] 등 브라우저에 기본 정의된 색상 테이블에서도 가져올 수 있습니다.
 * 
 * 텍스트 출력 속도를 조절하려면 이것을 쓰면 되는데, 값은 대기 프레임 단위입니다
 * 가장 빠른 속도는 0프레임입니다:
 
 *   \속도[값]
 *
 * 이름 윈도우를 띄우려면 아래 텍스트 코드를 사용하세요, 색상 변경 텍스트 코드도 사용할
 * 수 있습니다. 이름 윈도우는 폭과 높이를 알아서 맞춰줍니다. 아래와 같이 뒤에 콜론(:)을
 * 붙이는 방식으로 이름 윈도우의 위치를 바꿀 수도 있습니다.
 *
 *   \이름<이벤트명>
 *   \이름<이벤트명:right>
 *   \이름<이벤트명:left>
 *   \이름<\색[red]이벤트명>
 *   \이름<\색[주황]러닝은빛>
 *
 * 설명 할 필요가 없는 텍스트 코드들:
 *
 *   \테두리크기[값]
 *   \들여쓰기[값]
 *   \파티원[번호]
 *   \주인공[번호]
 *   \변수[번호]
 *   \아이콘[번호]
 *
 * 지금까지 텍스트를 굵게 하는 명령과 기울이는 명령은 다음과 같았습니다.
 *
 *   \굵게!
 *   \이탤릭!
 * 
 * 하지만 너무 가독성이 좋지 않았기 때문에 태그처럼 사용할 수 있게 했습니다.
 * 
 * 예를 들면 :)
 * 
 * <B>유령의 저택</B>에 함부로 들어가선 안돼.
 * <I>정신력</I> 문제는 아니야.
 * 
 * 글자의 크기를 확대하거나 축소하는 기능입니다 (\{, \}와 같습니다):
 *   \확대!
 *   \축소!
 *
 * 골드 윈도우를 표시합니다:
 *
 *   \골드
 *
 * 말풍선 메시지 창을 만들 수 있는 기능입니다. 0은 이 이벤트, -1은 플레이어입니다:
 *
 *   \말풍선[이벤트의 ID]
 *   \말풍선[0]
 *   \말풍선[-1]
 * 
 * 전투에서는 \말풍선[배틀러의 ID]의 배틀러 ID 값에 음수 값을 전달하면 적 배틀러에 말풍선을 띄우고, 
 * 양수 값을 전달할 경우, 아군에게 띄웁니다.
 * 
 * 음수 또는 양수를 전달해야 하므로 ID 값은 0이 될 수 없습니다.
 * 
 * 복잡하게 느껴진다면 \말풍선[인덱스] 대신 \아군[인덱스], \적그룹[인덱스]을 사용하세요.
 * 
 * 왼쪽, 중앙 또는 오른쪽에 텍스트를 정렬할 수 있습니다. 
 * 정렬은 각 라인이 시작될 때 한 번씩 이뤄집니다.
 * 정렬자는 스택 방식이므로 각 라인에 하나씩 사용 바랍니다.
 * 
 *   \정렬자[0]
 *   \정렬자[1]
 *   \정렬자[2]
 * 
 * 조금 어렵게 느껴진다면 태그를 사용해보세요.
 * 
 * <left>안녕하세요?</left>
 * <right>식사는 하셨나요?</right>
 * <center>지금 저녁 식사를 먹으려고 합니다. </center>
 * 
 * 태그는 대화가 시작되면 실제 텍스트 코드로 변환됩니다.
 * 예를 들어, <left>는 \정렬자[0]으로 변경됩니다.
 * 
 * HTML 태그는 만국 공통이므로 우리말로 번역하지 않았습니다.
 * 유사한 기능일 뿐 실제 HTML 태그와는 다릅니다.
 * 
 * 숫자 값에 엑셀 통화 서식 문자를 적용합니다: (예: 10,000)
 *
 *   \숫자[숫자]
 *
 * 텍스트의 크기를 변경할 수 있습니다:
 *
 *   \크기[숫자]
 *
 * 탭과 캐리지 리턴 기능입니다.
 * 캐리지리턴을 사용하면 겹침 글자를 사용할 수 있습니다.
 *
 *   \탭! : 탭의 크기는 8 입니다.
 *   \캐리지리턴! : X를 시작 위치로 되돌립니다.
 *
 * 효과음을 재생하는 기능으로 SE 파일을 재생합니다:
 *
 *   \효과음<효과음명>
 *
 * 이벤트 편집창의 기본 그림을 제어할 수 있는 텍스트 코드입니다:
 *
 *   \그림표시<그림번호, 그림이름, 원점번호, X좌표, Y좌표>
 *   \그림제거[그림번호]
 *
 * 다음 텍스트 코드가있으면 메시지 시스템에서 데이터베이스 항목명으로 대체됩니다:
 *
 *   \아이템[번호]
 *   \무기구[번호]
 *   \방어구[번호]
 *   \직업[번호]
 *   \적군[번호]
 *   \상태[번호]
 *   \스킬[번호]
 *
 * 얼굴 이미지를 메시지 표시 도중에 바꾸려면 다음 텍스트 코드를 사용하시기 바랍니다.
 * '얼굴_이미지_이름'은 페이스칩의 이름을 말하고, 인덱스는 페이스칩 선택 창에서
 * 각 얼굴에 붙는 번호입니다. 0부터 시작하고 가장 왼쪽 위에 있는 얼굴이 0번입니다:
 * 
 * 각 번호는 다음과 같은 순서입니다.
 * 0 1 2 3
 * 4 5 6 7
 *
 *   \얼굴<얼굴_이미지_이름, 얼굴_이미지_인덱스>
 *
 * 전투 중 플레이어 또는 아군 파티원에게 말풍선을 띄우고 싶다면 다음 텍스트 코드를 사용
 * 하세요.
 *
 *   \아군[아군_인덱스]
 *
 * 전투 중 적 파티 일원 중 하나가 말풍선으로 대화를 나눠야 한다면, 다음 텍스트 코드를 사용
 * 하세요.
 *
 *   \적그룹[적군_인덱스]
 *
 * 대화 중에 배틀러가 전투 불능 상태가 되면 일반 대화창으로 표시됩니다.
 * 
 * 얼굴 이미지의 위치를 오른쪽으로 변경하려면 다음 텍스트 코드를 사용하세요.
 * 
 *   \FD[2]
 * 
 * 얼굴 이미지의 위치를 왼쪽으로 변경하려면 다음 텍스트 코드를 사용하세요.
 * 
 *   \FD[0]
 */
/*~struct~TextCode:
 *
 * @param Korean
 * @type string[]
 * @desc 시스템 언어가 한국어(우리나라 말)일 경우에만 동작합니다.
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴","아군","적그룹","[.]","[|]","[!]","[<]","[>]","[\\^]","AS굵게!","AE굵게!","AS이탤릭!","AE이탤릭!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","배경색","FD"]
 * 
 */
/*~struct~TextColor:
 *
 * @param Color Name
 * @text 색상명
 * @desc 텍스트 코드에서 호출하게 될 색상명을 기입하세요
 * @default
 *
 * @param Red
 * @type number
 * @text 빨강
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Green
 * @type number
 * @text 녹색
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Blue
 * @type number
 * @text 파랑
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Alpha
 * @type number
 * @text 투명도
 * @desc 0.0 ~ 1.0 사이의 실수값
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 *
 */
/*~struct~SystemFont:
 * 
 * @param settings
 * @text 시스템 폰트 설정
 * @type struct<SystemFontDescriptor>[]
 * @desc 언어 별 폰트를 설정합니다.
 * @default ["{\"languageCode\":\"ko\",\"fontName\":\"나눔고딕, Dotum, AppleGothic, sans-serif\"}","{\"languageCode\":\"zh\",\"fontName\":\"SimHei, Heiti TC, sans-serif\"}"]
 *  
 */
/*~struct~SystemFontDescriptor:
 * 
 * @param languageCode
 * @text 언어 코드
 * @desc 언어 코드를 기입해주세요. 한국어는 ko입니다.
 * @default ko
 * 
 * @param fontName
 * @text 폰트명
 * @desc 여러 개의 폰트를 쓸 수 있습니다. (콤마로 구분합니다)
 * @default 나눔고딕, Dotum, AppleGothic, sans-serif
 * 
 */
  
var Imported = Imported || {};
Imported.RS_MessageSystem = true;

var RS = RS || {};
RS.MessageSystem = RS.MessageSystem || {};

RS.Window_Name = function() {
  this.initialize.apply(this, arguments);
};
  
var Color = Color || {};
  
(function ($) {

  "use strict";
    
  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MessageSystem>');
  });
  
  parameters = (parameters.length > 0) && parameters[0].parameters;
  
  $.popParameter = function () {
    var k = Object.keys(arguments);
    var lastUsed = "";
    while(k.length > 0) {
      lastUsed = arguments[parseInt(k.pop())];
      if(parameters[lastUsed]) return parameters[lastUsed];
    }
    return "";
  };
  
  $.jsonParse = function (str) {
    
    var retData = JSON.parse(str, function (k, v) {
      try {
        return $.jsonParse(v);
      } catch (e) {
        return v;
      }
    });
    
    return retData;
    
  };
  
  $.Reg = $.Reg || {};
  $.Reg.Default = $.Reg.Default || [];
  $.Reg.Group = $.Reg.Group || [];
  $.Reg.Korean = $.Reg.Korean || [];
  $.TextCodes = $.TextCodes || {};
  
  $.Params = $.Params || {};
  
  $.Params.fontSize = Number($.popParameter('Font Size', "글꼴 크기") || 28);
  $.Params.textSpeed = Number($.popParameter('Text Speed', "기본 텍스트 출력 속도") || 0);
  $.Params.minFontSize = Number($.popParameter('Text Min Size', "폰트 최소 크기") || 24);
  $.Params.maxFontSize = Number($.popParameter('Text Max Size', "폰트 최대 크기") || 96);
  $.Params.textStartX = Number($.popParameter('Text Start X', "텍스트 시작 X"));
  $.Params.faceStartOriginX = Number(parameters["normalFaceNewLineX"] || 168);
  $.Params.numVisibleRows  = Number($.popParameter('numVisibleRows', "라인 갯수") || 4);

  $.Params.nameWindowX = Number($.popParameter('Name Window X', "이름 윈도우 X") || 0);
  $.Params.nameWindowY = Number($.popParameter('Name Window Y', "이름 윈도우 Y") || 0);
  $.Params.nameWindowRows = 1;  
  $.Params.nameWindowStdPadding = Number($.popParameter('Name Window Inner Padding', "이름 윈도우 안쪽 여백") || 18);
  $.Params.namePositionTypeAtX = $.popParameter("Name Window Position", "이름 윈도우 위치") || "left";
  
  // 이름 윈도우의 폭이 제대로 계산되지 않았을 때, 기본적으로 설정될 윈도우의 폭
  $.Params.nameWindowWidth = 140;  

  $.Params.faceOX = Number($.popParameter('Big Face OX', "큰 페이스칩 OX") || 0);
  $.Params.faceOY = Number($.popParameter('Big Face OY', "큰 페이스칩 OY") || 0);
  $.Params.faceSide = Boolean($.popParameter('Show Big Face Back', "대화창 뒤에 얼굴 표시") === 'true'|| false);

  // 말풍선 폭이 제대로 계산되지 않았을 때, 기본적으로 설정될 윈도우 폭과 높이
  $.Params.FONT_SIZE = 28; 
  $.Params.STD_PADDING = 18;
  $.Params.WIDTH = ($.Params.FONT_SIZE * 6) + $.Params.STD_PADDING;
  $.Params.HEIGHT = $.Params.FONT_SIZE + ($.Params.STD_PADDING / 2);

  $.Params.TabSize = Number($.popParameter('Tab Size', "탭 크기"));
  
  $.Params.backOpacity = Number($.popParameter('back Opacity', "배경 그림의 투명도"));
  $.Params.translucentOpacity = Number($.popParameter('translucent Opacity', "반투명도"));
  $.Params.defaultOpacity = Number($.popParameter('default Opacity', "기본 투명도"));
  $.Params.contentsOpacity = Number($.popParameter('contents Opacity', "내용의 투명도"));
  $.Params.defaultOutlineWidth = Number($.popParameter('default outline width', "테두리 크기"));
  $.Params.defaultOutlineColor = $.popParameter('default outline Color', "테두리 색상") || 'white';
 
  // 시스템에 설치된 폰트
  $.Params.fonts = {
    'default': 'GameFont'
  };

  (function() {
    var systemFonts = $.jsonParse(parameters["systemFont"]);
    if(!$.Params.fonts) return;
    systemFonts.settings.forEach(function(i) {
      var params = {};
      params[i.languageCode] = i.fontName;
      Object.assign($.Params.fonts, params);
    }, this);
  })();
    
  // 시스템에 설치되지 않은 커스텀 폰트
  $.Params.customFont = Boolean($.popParameter('Using Custom Font', "사용자 지정 폰트 사용 여부") === 'true');
  $.Params.customFontName = String($.popParameter('Custom Font Name', "사용자 지정 폰트명") || 'GameFont' );
  $.Params.customFontSrc = String($.popParameter('Custom Font Src', "사용자 지정 폰트 경로") || 'fonts/mplus-1m-regular.ttf');
  
  $.Params.windowskin = $.popParameter('Default Windowskin', "기본 윈도우스킨") || 'Window';
  $.Params.windowskinForNameWindow = $.popParameter('Name Windowskin', "이름 윈도우스킨") || 'Window';
  
  $.Params.choiceWindowStyle = String($.popParameter('Choice Style', "선택지 스타일") || 'default');
  $.Params.isTempSpriteContainerVisibility = false;
  
  $.Params.exTextColors = $.jsonParse($.popParameter("Text Color", "텍스트 색상"));
  
  $.Params.isPlayTextSound = Boolean($.popParameter('Text Sound ON/OFF', "텍스트 효과음 재생 여부") === "true");
  $.Params.pathTextSound = String($.popParameter('Text Sound', "텍스트 효과음") || "Cursor1.ogg");
  $.Params.textSoundEval1 = $.jsonParse($.popParameter("Text Sound Execution Condition", "텍스트 효과음 실행 조건") || "Math.randomInt(100) < 45");
  $.Params.textSoundEval2 = $.jsonParse($.popParameter("Text Sound Volume", "텍스트 효과음 볼륨") || "(0.4 + ($.randomNormal(0.8)[0])).clamp(0.0, 0.8)");
  $.Params.textSoundInterval = parseInt($.popParameter("Text Sound Interval", "텍스트 사운드 재생 간격"));
  $.Params.textSoundPoolSize = parseInt($.popParameter('텍스트 사운드 풀 크기', "Text Sound Pool Size") || 6);
  
  $.Params.langCode = $.popParameter('언어 코드', "Language Code") || "ko";
  
  // 기본 라인의 크기
  $.Params.lineHeight = Number(parameters["Line Height"] || 36);

  $.Params.preloadWindowskins = JSON.parse(parameters["preload windowskin"] || "[]");

  $.Params.isParagraphMinifier = Boolean(parameters["Paragraph Minifier"] === "true");

  $.Params.windowOffset = new Point(0, 0);
  
  $.Params.faceOpacity = parseInt(parameters["face Opacity"] || 21);

  $.Params.faceDirection = parseInt(parameters["face Direction"] || 0);

  //============================================================================
  // Lazy Initialize Parameters (느린 초기화)
  //============================================================================

  var alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() { 
    alias_Game_Temp_initialize.call(this);
    $.Params.windowWidth = eval(parameters["Window Width"]) || Graphics.boxWidth;
  };
    
  //============================================================================
  // Multiple Language supports
  //============================================================================
    
  $.Reg.KoreanEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-ퟻ]+[!]*/i;
  $.Reg.defaultEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z가-ퟻ]+[!]*/i;
    
  $.TextCodes = (function() {
    'use strict';
    var rowData = $.popParameter('Text Code', "텍스트 코드");
    var data = JSON.parse(rowData);
    var retData = {};
    retData.Korean = [undefined].concat(JSON.parse(data.Korean));
    return retData;
  }());
    
  $.TextCodes.Main = [];
    
  $.TextCodes.ENUM = {
    COLOR: 1,
    TEXT_SPEED: 2,
    OUTLINE_COLOR: 3,
    OUTLINE_WIDTH: 4,
    INDENT: 5,
    BOLD: 6,
    ITALIC: 7,
    NAME: 8,
    GRADIENT: 9,
    PARTY_MEMBER: 10,
    PLAYER: 11,
    VAR: 12,
    ICON: 13,
    INCREASE: 14,
    DECREASE: 15,
    GOLD: 16,
    BALLOON: 17,
    ALIGN: 18,
    NUM: 19,
    TEXT_SIZE: 20,
    TAB: 21,
    CARRIAGE_RETURN: 22,
    PLAY_SE: 23,
    SHOW_PICTURE: 24,
    HIDE_PICTURE: 25,
    ITEM: 26,
    WEAPON: 27,
    ARMOR: 28,
    CLASSES: 29,
    ENEMY: 30,
    STATE: 31,
    SKILL: 32,
    FACE: 33,
    FRIENDLY_TROOPS: 34, // 여긴 2018.01.14에 추가됨
    ENEMY_TROOPS: 35,
    WAIT_SEC_15: 36, // .
    WAIT_SEC_60: 37, // |
    START_PAUSE: 38, // !
    LINE_SHOW_FAST_LT: 39, // <
    LINE_SHOW_FAST_GT: 40, // >
    PAUSE_SKIP: 41, // ^
    BOLD_START: 42, // <B>
    BOLD_END: 43, // </B>
    ITALIC_START: 44,
    ITALIC_END: 45,
    ALIGN_LEFT: 46,
    ALIGN_CENTER: 47,
    ALIGN_RIGHT: 48,
    BOLD_START_CV: 49,
    BOLD_END_CV: 50,
    ITALIC_START_CV: 51,
    ITALIC_END_CV: 52,
    ALIGN_CLEAR: 53, // AEND
    HIGHLIGHT_TEXT_COLOR: 54,
    FACE_DIRECTION: 55,
  };
    
  $.getTextCode = function (idx) {
    return $.TextCodes['Korean'][idx];
  };

  /**
   * @memberof $
   * @param {Number} eventId
   * @return {Object} meta
   */
  $.getEventComments = function(eventId, index) {
    var data = {note: "", meta: {}}; 
    try {

      // 리스트를 가져옵니다.
      var list = $gameMap.event(eventId).list();
      
      // 바로 이전 인덱스에 노트 태그가 있었는 지 확인합니다.
      if(index < 0) index = 0;

      // 부모 이벤트 없이 호출되는 공통 이벤트가 있는 지 확인합니다. 
      if(eventId <= 0) {
        var commonEvent = $gameTemp.reservedCommonEvent();
        if(commonEvent) {
          list = commonEvent.list;
          // 공통 이벤트는 한 번 설치된 후 클리어되므로 목록을 두 번 읽을 순 없으므로 예외 처리
          if(!list) {
            return data; 
          }
        }
      }

      var param = list[index];

      // 코멘트를 읽어옵니다.
      while(param && [108, 408].contains(param.code)) {
        data.note += param.parameters[0] + "\r\n";
        index--;
        param = list[index];        
      }

      if(param && param.code === 108) {
        data.note += param.parameters[0] + "\r\n";

        index--;
        param = list[index];   
        
        while(param.code === 408) {
          data.note += param.parameters[0] + "\r\n";
          index--;
          param = list[index];        
        }        
 
        if(param.code === 108) {
          data.note += param.parameters[0] + "\r\n";
        }

      }

      // 노트 태그를 추출합니다 (DataManager.extractMetadata의 변형입니다)
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      data.meta = {};
      for (;;) {
          var match = re.exec(data.note);
          if (match) {
              if (match[2] === ':') {
                  data.meta[match[1].trim()] = match[3];
              } else {
                  data.meta[match[1].trim()] = true;
              }
          } else {
              break;
          }
      }
    } catch(e) {
      // 리스트를 읽지 못할 경우 try-catch 문에 의해 예외 처리가 됩니다.
      return {note: "", meta: {}};
    }
    return data.meta;
  };

  (function() {
    'use strict';

    var tcGroup = $.TextCodes["Korean"];
    tcGroup = tcGroup.map(function (e, i, a) {
      if(e === undefined) return;
      var data = [];
      var ret = "";
      for (var str of e) {
        if(/[a-zA-Z]/i) {
          data.push(str);
          continue;
        }
        var text = str.charCodeAt().toString(16);
        data.push('\\u' + "{" + text + "}");
      }
      ret = data.join("");
      return ret;
    }, this);

    $.Reg[e][0] = undefined;
    $.Reg[e][1] = new RegExp(`(?:\x1bC|\x1b${tcGroup[1]})\\[(.+?)\\]`, 'gi');   // 색
    $.Reg[e][2] = new RegExp(`\x1b${tcGroup[2]}\\[(\\d+)\\]`, 'gi');    // 속도
    $.Reg[e][3] = new RegExp(`\x1b${tcGroup[3]}\\[(.+?)\\]`, 'gi');  // 테두리색
    $.Reg[e][4] = new RegExp(`\x1b${tcGroup[4]}\\[(\\d+)\\]`, 'gi'); // 테두리크기
    $.Reg[e][5] = new RegExp(`\x1b${tcGroup[5]}\\[(\\d+)\\]`, 'gi'); // 들여쓰기
    $.Reg[e][6] = new RegExp(`\x1b${tcGroup[6]}`, 'gi'); // 굵게!
    $.Reg[e][7] = new RegExp(`\x1b${tcGroup[7]}`, 'gi'); // 이탤릭!
    $.Reg[e][8] = new RegExp(`\x1b${tcGroup[8]}\\<(.+?)\\>`, 'gi'); // 이름
    $.Reg[e][9] = new RegExp(`\x1b${tcGroup[9]}\\<(.+)\\>`, 'gi'); // 그레디언트
    $.Reg[e][10] = new RegExp(`(?:\x1bP|\x1b${tcGroup[10]})\\[(\\d+)\\]`, 'gi'); // 파티원
    $.Reg[e][11] = new RegExp(`(?:\x1bN|\x1b${tcGroup[11]})\\[(\\d+)\\]`, 'gi'); // 주인공
    $.Reg[e][12] = new RegExp(`(?:\x1bV|\x1b${tcGroup[12]})\\[(\\d+)\\]`, 'gi'); // 변수
    $.Reg[e][13] = new RegExp(`(?:\x1bI|\x1b${tcGroup[13]})\\[(\\d+)\\]`, 'g'); // 아이콘
    $.Reg[e][14] = new RegExp(`(?:\x1b{|\x1b${tcGroup[14]})`, 'gi');  // 확대!
    $.Reg[e][15] = new RegExp(`(?:\x1b}|\x1b${tcGroup[15]})`, 'gi'); // 축소!
    $.Reg[e][16] = new RegExp(`(?:\x1bG|\x1b${tcGroup[16]})`, 'gi'); // 골드
    $.Reg[e][17] = new RegExp(`\x1b${tcGroup[17]}\\[(.*?)\\]`, 'gi'); // 말풍선
    $.Reg[e][18] = new RegExp(`\x1b${tcGroup[18]}\\[(\\d+)\\]`, 'gi'); // 정렬자
    $.Reg[e][19] = new RegExp(`\x1b${tcGroup[19]}\\[(\\d+)\\]`, 'gi'); // 숫자
    $.Reg[e][20] = new RegExp(`\x1b${tcGroup[20]}\\[(\\d+)\\]`, 'gi'); // 크기
    $.Reg[e][21] = new RegExp(`\x1b${tcGroup[21]}`, 'gi');   // r
    $.Reg[e][22] = new RegExp(`\x1b${tcGroup[22]}`, 'gi'); // t
    $.Reg[e][23] = new RegExp(`\x1b${tcGroup[23]}\\<(.+?)\\>`, 'gi');  // 효과음
    $.Reg[e][24] = new RegExp(`\x1b${tcGroup[24]}\\<(.+?)\\>`, 'gi'); // 그림 표시
    $.Reg[e][25] = new RegExp(`\x1b${tcGroup[25]}\\[(\\d+)\\]`, 'gi'); // 그림 제거
    $.Reg[e][26] = new RegExp(`(?:\x1b${tcGroup[26]})\\[(\\d+)\\]`, 'g'); // 아이템
    $.Reg[e][27] = new RegExp(`(?:\x1b${tcGroup[27]})\\[(\\d+)\\]`, 'g'); // 무기구
    $.Reg[e][28] = new RegExp(`(?:\x1b${tcGroup[28]})\\[(\\d+)\\]`, 'g'); // 방어구
    $.Reg[e][29] = new RegExp(`(?:\x1b${tcGroup[29]})\\[(\\d+)\\]`, 'g'); // 직업
    $.Reg[e][30] = new RegExp(`(?:\x1b${tcGroup[30]})\\[(\\d+)\\]`, 'g'); // 적군
    $.Reg[e][31] = new RegExp(`(?:\x1b${tcGroup[31]})\\[(\\d+)\\]`, 'g'); // 상태
    $.Reg[e][32] = new RegExp(`(?:\x1b${tcGroup[32]})\\[(\\d+)\\]`, 'g'); // 스킬
    $.Reg[e][33] = new RegExp(`\x1b${tcGroup[33]}\\<(.*)\\>`, 'gi'); // 얼굴
    $.Reg[e][34] = new RegExp(`(?:\x1b${tcGroup[34]})\\[(\\d+)\\]`, 'gi'); // 아군
    $.Reg[e][35] = new RegExp(`(?:\x1b${tcGroup[35]})\\[(\\d+)\\]`, 'gi'); // 적군
    
    $.Reg[e][36] = new RegExp(`\x1b${tcGroup[36]}`, 'gi'); // [.]
    $.Reg[e][37] = new RegExp(`\x1b${tcGroup[37]}`, 'gi'); // [|]
    $.Reg[e][38] = new RegExp(`\x1b${tcGroup[38]}`, 'gi'); // [!]
    $.Reg[e][39] = new RegExp(`\x1b${tcGroup[39]}`, 'gi'); // [<]
    $.Reg[e][40] = new RegExp(`\x1b${tcGroup[40]}`, 'gi'); // [>]
    $.Reg[e][41] = new RegExp(`\x1b${tcGroup[41]}`, 'gi'); // [\^]

    $.Reg[e][42] = new RegExp(`\x1b${tcGroup[42]}`, 'gi'); // AS굵게!
    $.Reg[e][43] = new RegExp(`\x1b${tcGroup[43]}`, 'gi'); // AE굵게!
    $.Reg[e][44] = new RegExp(`\x1b${tcGroup[44]}`, 'gi'); // AS이탤릭!
    $.Reg[e][45] = new RegExp(`\x1b${tcGroup[45]}`, 'gi'); // AE이탤릭!

    $.Reg[e][46] = new RegExp(`(?:<${tcGroup[46]}>)`, 'gi'); // LEFT
    $.Reg[e][47] = new RegExp(`(?:<${tcGroup[47]}>)`, 'gi'); // CENTER
    $.Reg[e][48] = new RegExp(`(?:<${tcGroup[48]}>)`,'gi'); // RIGHT

    $.Reg[e][49] = new RegExp(`(?:<[${tcGroup[49]}]>)`, 'gi'); // B
    $.Reg[e][50] = new RegExp(`(?:<\/[${tcGroup[50]}]>)`, 'gi'); // B
    $.Reg[e][51] = new RegExp(`(?:<[${tcGroup[51]}]>)`, 'gi'); // I
    $.Reg[e][52] = new RegExp(`(?:<\/[${tcGroup[52]}]>)`, 'gi'); // I
    $.Reg[e][53] = new RegExp(`\x1b${tcGroup[53]}`, 'gi'); // AEND : ALIGN_CLEAR
    $.Reg[e][54] = new RegExp(`\x1b${tcGroup[54]}\\[(.*)\\]`, 'gi'); // \배경색[색상] \HC[색상]
    $.Reg[e][55] = new RegExp(`\x1b${tcGroup[55]}\\[(\\d+)\\]`, 'gi'); // \FD

  }());
    
  $.initSystem = function () {
    var type = $.Params.langCode;
    $.Reg.Group = $.Reg.Korean;
    $.Reg.defaultEscapeCode = $.Reg.KoreanEscapeCode;
    $.TextCodes.Main = $.TextCodes.Korean;
  };
    
  //=============================================================================
  // Color
  //=============================================================================
    
  Color.getColor = function(n) {
    var r = (n) & 255;
    var g = (n >> 8) & 255;
    var b = (n >> 16) & 255;
    var result = 'rgba(%1,%2,%3,1)'.format(r,g,b);
    return result;
  };
  
  Color.baseColor = Color.getColor(16777215);
  
  Color.getBaseColor = function() {
    return Color.baseColor;
  };
    
  Color.getUserCustomColor = function (string) {
    "use strict";
    
    var obj = $.Params.exTextColors;
    var ret = string;
    
    if(!typeof(obj[0]) === "object") return ret;
    if(!obj[0].hasOwnProperty("Color Name")) return ret;
    
    obj.forEach(function (e, i, a) {
      
      if(e["Color Name"] === string) {
        
        var r = parseInt(e["Red"]) || 0;
        var g = parseInt(e["Green"]) || 0;
        var b = parseInt(e["Blue"]) || 0;
        var a = parseFloat(e["Alpha"]) || 1.0;
        
        ret = `rgba(${r},${g},${b},${a})`;
        
      }
      
    }, this);
    
    return ret;
    
  };
    
  $.getKoreanColor = function(string) {
    switch(string) {
      case '청록': case '청록색': case 'c_aqua':
      return Color.getColor(16776960);
      case '검은색': case '검정': case 'c_black':
      return Color.getColor(0);
      case '파란색': case '파랑': case 'c_blue':
      return Color.getColor(16711680);
      case '짙은회색': case 'c_dkgray':
      return Color.getColor(4210752);
      case '자홍색': case '자홍': case 'c_fuchsia':
      return Color.getColor(16711935);
      case '회색': case 'c_gray':
      return Color.getColor(8421504);
      case '녹색': case 'c_green':
      return Color.getColor(32768);
      case '밝은녹색': case '라임': case 'c_lime':
      return Color.getColor(65280);
      case '밝은회색': case 'c_ltgray':
      return Color.getColor(12632256);
      case '밤색': case '마룬': case 'c_maroon':
      return Color.getColor(128);
      case '감청색': case '네이비': case 'c_navy':
      return Color.getColor(8388608);
      case '황록색': case '올리브': case 'c_olive':
      return Color.getColor(32896);
      case '주황색': case '주황': case '오렌지': case 'c_orange':
      return Color.getColor(4235519);
      case '보라색': case '보라': case 'c_purple':
      return Color.getColor(8388736);
      case '빨간색': case '빨강': case 'c_red':
      return Color.getColor(255);
      case '은색': case '은': case 'c_silver':
      return Color.getColor(12632256);
      case '민트색': case 'c_teal':
      return Color.getColor(8421376);
      case '흰색': case '흰': case 'c_white':
      return Color.getColor(16777215);
      case '노란색': case '노랑': case 'c_yellow':
      return Color.getColor(65535);
      case '기본': case '기본색': case 'c_normal':
      return Color.getBaseColor();
      default:
      return Color.getUserCustomColor(string);
    }
  };
  
  $.getBrowser = function() {
    /* Refer to https://stackoverflow.com/a/16938481 */
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };    
  };
    
  Color.gmColor = function(string) {
    var type = $.Params.langCode;
    return $.getKoreanColor(string);
  };

  //============================================================================
  // Bitmap
  //============================================================================
  
  var alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function(width, height) {
    alias_Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
    this.highlightTextColor = null;
  };
  
  Bitmap.prototype._makeFontNameText = function() {
    return (this.fontItalic ? 'Italic ' : '') + (this.fontBold ? 'bold ' : '') +
    this.fontSize + 'px ' + this.fontFace;
  };
  
  //============================================================================
  // Game_Message
  //============================================================================
  
  var alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    alias_Game_Message_clear.call(this);
    this._waitTime = 0;
    this._balloon = -2;
    this._align = [];
    this._balloonPatternHeight = 0;
  };
  
  Game_Message.prototype.setWaitTime = function(time) {
    this._waitTime = time;
  };
  
  Game_Message.prototype.getWaitTime = function() {
    return this._waitTime || 0;
  };
  
  Game_Message.prototype.getMaxLine = function() {
    return this._maxLine;
  };
  
  Game_Message.prototype.setMaxLine = function(n) {
    this._maxLine = n;
    $.Params.numVisibleRows = n;
  };
  
  Game_Message.prototype.setBalloon = function(n) {
    this._balloon = n;
  };
  
  Game_Message.prototype.getBalloon = function(n) {
    return this._balloon;
  };
  
  Game_Message.prototype.setAlign = function(n) {
    this._align = this._align || [];
    this._lastAlign = n;
    this._align.push(n);
  };
  
  Game_Message.prototype.getAlign = function(n) {
    var n = this._align.shift();
    if(n === undefined) {
      return this._lastAlign;
    }
    return n;
  };

  Game_Message.prototype.clearAlignLast = function(n) {
    this._lastAlign = 0;
  };      
  
  Game_Message.prototype.setBalloonPatternHeight = function (value) {
    this._balloonPatternHeight = value;
  };
  
  Game_Message.prototype.getBalloonPatternHeight = function () {
    return this._balloonPatternHeight;
  };
      
  //============================================================================
  // Sprite_Battler
  //============================================================================
  
  Sprite_Battler.prototype.screenX = function() {
    return this.x || 0;
  };
  
  Sprite_Battler.prototype.screenY = function() {
    return this.y || 0;
  };

  //============================================================================
  // Window_Base
  //============================================================================
    
  Window_Base.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = $.Reg.defaultEscapeCode;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[0].toUpperCase();
    } else {
      return '';
    }
  };
  
  Window_Base.prototype.obtainNameColor = function(textState) {
    var arr = /\[(.+?)\]/gi.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return Color.gmColor(arr[1]);
    } else {
      return this.textColor(0);
    }
  };

  Window_Base.prototype.changeTextColor = function(color) {
    var c = parseInt(color);
    if(c > 0 && c < 32) {
      color = this.textColor(color);
    }
    this.contents.textColor = color;
  }; 
  
  Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    var tcGroup = $.TextCodes.ENUM;
    var textCode = $.TextCodes.Main;
    switch (code) {
      case 'C':
      this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
      break;
      case textCode[tcGroup.COLOR]:
      this.changeTextColor(this.obtainNameColor(textState));
      break;
      case 'I':
      case textCode[tcGroup.ICON]:
      this.processDrawIcon(this.obtainEscapeParam(textState), textState);
      break;
      case '{':
      case textCode[tcGroup.INCREASE]:
      this.makeFontBigger();
      break;
      case '}':
      case textCode[tcGroup.DECREASE]:
      this.makeFontSmaller();
      break;
      case 'AEND':
      $gameMessage.clearAlignLast();
      break;      
    }
  };
  
  var alias_loadWindowskin = Window_Base.prototype.loadWindowskin;
  Window_Base.prototype.loadWindowskin = function() {
    alias_loadWindowskin.call(this);
    this.windowskin.addLoadListener(function() {
      Color.baseColor = this.textColor(0);
    }.bind(this));
  };
  
  Window_Base.prototype.makeFontSmaller = function() {
    if (this.contents.fontSize >= $.Params.minFontSize) {
      this.contents.fontSize -= 12;
    }
  };

  Window_Base.prototype.standardFontFace = function() {
    var langCode = $.Params.langCode || navigator.language.slice(0, 2);
    var fonts = $.Params.fonts[langCode];
    if(fonts) {
      return fonts;
    } else {
      $.Params.fonts.default;
    }
  };

  Window_Base.prototype.standardFontSize = function() {
    return $.Params.fontSize;
  };
  
  Window_Base.prototype.makeFontBigger = function() {
    if (this.contents.fontSize <= $.Params.maxFontSize) {
      this.contents.fontSize += 12;
    }
  };

  Window_Base.prototype.save = function() {
    this._messageDesc = {};
    this._messageDesc.fontFace = this.contents.fontFace;
    this._messageDesc.fontSize = this.contents.fontSize;
    this._messageDesc.fontBold = this.contents.fontBold;
    this._messageDesc.fontItalic = this.contents.fontItalic;
    this._messageDesc.textColor = this.contents.textColor;
    this._messageDesc.outlineColor = this.contents.outlineColor;
    this._messageDesc.outlineWidth = this.contents.outlineWidth;
    this._messageDesc.highlightTextColor = this.contents.highlightTextColor;
    this._messageDesc.textSpeed = $gameMessage.getWaitTime();
  };

  Window_Base.prototype.restore = function() {
    if(!this._messageDesc) return;
    this.contents.fontFace = this._messageDesc.fontFace;
    this.contents.fontSize = this._messageDesc.fontSize;
    this.contents.fontBold = this._messageDesc.fontBold;
    this.contents.fontItalic = this._messageDesc.fontItalic;
    this.contents.textColor = this._messageDesc.textColor;
    this.contents.outlineColor = this._messageDesc.outlineColor;
    this.contents.outlineWidth = this._messageDesc.outlineWidth;
    this.contents.highlightTextColor = this._messageDesc.highlightTextColor;
    $gameMessage.setWaitTime(this._messageDesc.textSpeed);
    this._messageDesc = undefined;
  };
    
  var alias_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    var regGroup = $.Reg.Group;
    var tcGroup = $.TextCodes.ENUM;
    var textCode = $.TextCodes.Main;
    text = alias_Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(regGroup[tcGroup.VAR], function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.VAR], function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.PLAYER], function() {
      return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.PARTY_MEMBER], function() {
      return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.NUM], function() {
      return arguments[1].toComma();
    }.bind(this));
    text = text.replace(regGroup[tcGroup.GOLD], TextManager.currencyUnit);
    text = text.replace(regGroup[tcGroup.CLASSES], function() {
      return $dataClasses[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ITEM], function() {
      return $dataItems[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.WEAPON], function() {
      return $dataWeapons[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ARMOR], function() {
      return $dataArmors[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ENEMY], function() {
      return $dataEnemies[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.STATE], function() {
      return $dataStates[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.SKILL], function() {
      return $dataSkills[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ALIGN_LEFT], function() {
      return '\x1b' + textCode[tcGroup.ALIGN] + "[0]";
    }.bind(this));      
    text = text.replace(regGroup[tcGroup.ALIGN_CENTER], function() {
      return '\x1b' + textCode[tcGroup.ALIGN] + "[1]";
    }.bind(this));        
    text = text.replace(regGroup[tcGroup.ALIGN_RIGHT], function() {
      return '\x1b' + textCode[tcGroup.ALIGN] + "[2]";
    }.bind(this));      
    text = text.replace(regGroup[tcGroup.ALIGN], function() {
      if(!this._isUsedTextWidthEx) {
        $gameMessage.setAlign(Number(arguments[1] || 0));
      }
      return '';
    }.bind(this));
    text = text.replace(/<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi, function() {
      return regGroup[tcGroup.ALIGN_CLEAR].source;
    }.bind(this));     
    return text;
  };

  Window_Base.prototype.processAlign = function(textState) {
    textState = textState || this._textState;
    switch($gameMessage.getAlign()) {
        case 1:
        this.setAlignCenter(textState);
        break;
        case 2:
        this.setAlignRight(textState);
        break;
        default:
        this.setAlignLeft(textState);
    }
  };

  var alias_Window_Base_processNewLine_align = Window_Base.prototype.processNewLine;
  Window_Base.prototype.processNewLine = function(textState) {
      alias_Window_Base_processNewLine_align.call(this, textState);
      this.processAlign(textState);
  };  
  
  Window_Base.prototype.calcTextWidth2 = function(text) {
        
    var tempText = text; tempText = tempText.split(/[\r\n]+/);
    var textWidth = 0;

    // Galv's Message Styles Compatibility
    if(Imported.Galv_MessageStyles) {
        var ret = 0;
        
        if (Imported.Galv_MessageBusts) {
            if ($gameMessage.bustPos == 1) {
                var faceoffset = 0;
            } else {
                var faceoffset = Galv.MB.w;
            };
        } else {
            var faceoffset = Window_Base._faceWidth + 25;
        };

        // Calc X Offset
        var xO = $gameMessage._faceName ? faceoffset : 0;
        xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3];

        if (this.pTarget != null) {
            this.resetFontSettings();                
            ret = this.testWidthEx(tempText[0]);
            this.resetFontSettings();  
            textWidth = Math.max(textWidth, ret);
            if(textWidth !== 0) return textWidth;
        }
        
    }

    this.save();
    this._isUsedTextWidthEx = true;
    textWidth = this.drawTextExForAlign(tempText[0], 0, this.contents.height);
    this._isUsedTextWidthEx = false;
    this.restore();        

    return textWidth;        

  };

  Window_Base.prototype.newLineX = function() {
    return this.textPadding();
  };  
  
  Window_Base.prototype.setAlignLeft = function(textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth2(textState.text.slice(textState.index));
    textState.x = ( this.newLineX() + padding );
    textState.left = textState.x;
  };

  Window_Base.prototype.setAlignCenter = function(textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth2(textState.text.slice(textState.index));
    textState.x = ( this.newLineX() + this.contentsWidth() + padding) / 2 - textState.tx / 2;
    textState.left = textState.x;
  };

  Window_Base.prototype.setAlignRight = function(textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth2(textState.text.slice(textState.index));
    textState.x = ( this.contentsWidth() - padding) - textState.tx;
    textState.left = textState.x;
  };  

  Window_Base.prototype.doFirstLineAlign = function(textState) {
    var isValid = !this._isUsedTextWidthEx;
    if(isValid) {
        this.processAlign(textState);
    }
  };  

  Window_Base.prototype.drawTextEx = function(text, x, y) {
    if (text) {
        this.resetFontSettings();
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        this.doFirstLineAlign(textState);
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
  };    

  Window_Base.prototype.drawTextExForAlign = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
  };      

  //============================================================================
  // Window_Message
  //============================================================================
  
  Window_Message.prototype.obtainTextSpeed = function(textState) {
    var arr = /\[(\d+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return parseInt(arr[1]);
    } else {
      return 0;
    }
  };
  
  Window_Message.prototype.obtainGradientText = function(textState) {
    var arr = /^<(.+?)>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return 'Empty Text';
    }
  };
  
  Window_Message.prototype.obtainSoundName = function(textState) {
    var arr = /\<(.+?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return "";
    }
  };
  
  var alias_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    var tcGroup = $.TextCodes.ENUM;
    var textCode = $.TextCodes.Main;
    switch (code) {
      case textCode[tcGroup.TEXT_SPEED]:
      $gameMessage.setWaitTime(this.obtainEscapeParam(textState));
      break;
      case textCode[tcGroup.TEXT_SIZE]:
      this.setTextSize(this.obtainEscapeParam(textState));
      break;
      case textCode[tcGroup.OUTLINE_COLOR]:
      this.setStrokeColor(this.obtainNameColor(textState));
      break;
      case textCode[tcGroup.INDENT]:
      this.setTextIndent(textState);
      break;
      case textCode[tcGroup.OUTLINE_WIDTH]:
      this.setStrokeWidth(this.obtainEscapeParam(textState));
      break;
      case textCode[tcGroup.BOLD]:
      this.setTextBold(!this.contents.fontBold);
      break;
      case textCode[tcGroup.BOLD_START]:
      this.setTextBold(true);
      break;
      case textCode[tcGroup.BOLD_END]:
      this.setTextBold(false);
      break;      
      case textCode[tcGroup.ITALIC]:
      this.setTextItalic(!this.contents.fontItalic);
      break;
      case textCode[tcGroup.ITALIC_START]:
      this.setTextItalic(true);
      break;      
      case textCode[tcGroup.ITALIC_END]:
      this.setTextItalic(false);
      break;            
      case textCode[tcGroup.HIGHLIGHT_TEXT_COLOR]:
      this.setHighlightTextColor(this.obtainNameColor(textState));
      break;
      case textCode[tcGroup.TAB]:
      textState.x += Number(this.textWidth("A") * $.Params.TabSize);
      break;
      case textCode[tcGroup.CARRIAGE_RETURN]:
      textState.x = Number(textState.left || 0);
      this.startWait(1);
      break;
      case textCode[tcGroup.PLAY_SE]:
      if(!this._isUsedTextWidthEx) this.playSe(this.obtainSoundName(textState));
      break;
      case textCode[tcGroup.SHOW_PICTURE]:
      if(!this._isUsedTextWidthEx) this.showPicture(this.obtainSoundName(textState));
      this.startWait(15);
      break;
      case textCode[tcGroup.HIDE_PICTURE]:
      if(!this._isUsedTextWidthEx) this.erasePicture(this.obtainEscapeParam(textState));
      this.startWait(15);
      break;
      case textCode[tcGroup.FACE]:
      if(this._isUsedTextWidthEx) break;
      var params = this.obtainSoundName(textState).split(',');
      this.redrawFaceImage(textState, params[0], params[1], 0, 0);
      this.startWait(1);
      break;
      default:
      alias_Window_Message_processEscapeCharacter.call(this, code, textState);
      break;
    }
  };

  Window_Message.prototype.setTextItalic = function() {
    this.contents.fontItalic = arguments[0];
  };
  
  Window_Message.prototype.setTextBold = function() {
    this.contents.fontBold = arguments[0];
  };
  
  Window_Message.prototype.setTextSize = function() {
    this.contents.fontSize = arguments[0].clamp($.Params.minFontSize, $.Params.maxFontSize);
  };
  
  Window_Message.prototype.setStrokeWidth = function() {
    this.contents.outlineWidth = arguments[0];
  };
  
  Window_Message.prototype.setStrokeColor = function() {
    this.contents.outlineColor = arguments[0];
  };
  
  Window_Message.prototype.setTextIndent = function(textState) {
    textState.x += this.obtainEscapeParam(textState);
  };

  Window_Message.prototype.setHighlightTextColor = function() {
    var color = arguments[0];
    if(color === "null" || color === "없음") {
      color = null;
    }
    this.contents.highlightTextColor = color;
  };

  Window_Message.prototype.playSe = function (seName) {
    var realName = seName.trim();
    var data = {"name": realName, "pan": 0, "pitch": 100, "volume": ConfigManager.seVolume};
    AudioManager.playSe(data);
  };
  
  Window_Message.prototype.showPicture = function (param) {
    var param = param.split(',');
    var params = [Number(param[0].trim()), param[1].trim(), Number(param[2].trim()), Number(param[3].trim()), Number(param[4].trim()), 100, 100, 255, 0];
    var ret = true;
    
    // 모든 요소 검증
    if(params) {
      params.forEach(function (e, i, a) {
        if(e === undefined || e === null) {
          ret = false;
        }
      });
    }
    // 검증 결과가 참이라면 그림 표시
    if(ret) {
      $gameScreen.showPicture.apply($gameScreen, params);
      return true;
    }
    return false;
  };
  
  Window_Message.prototype.erasePicture = function (picId) {
    if(typeof picId === 'number') {
      $gameScreen.erasePicture(picId);
    }
  };
  
  Window_Message.prototype.resetFontSettings = function() {
    Window_Base.prototype.resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = $.Params.defaultOutlineWidth;
    this.contents.outlineColor = $.Params.defaultOutlineColor;
    this.contents.highlightTextColor = null;
    this._windowPauseSignSprite.move(this._width / 2, this._height);
    this._windowPauseSignSprite.scale.y = 1;
    $gameMessage.setWaitTime($.Params.textSpeed);
  };
     
  Window_Message.prototype.standardFontSize = function() {
    return $.Params.fontSize;
  };
  
  Window_Message.prototype.numVisibleRows = function() {
    return $.Params.numVisibleRows;
  };

  Window_Message.prototype.processWordWrap = function(textState, w, width, isValid) {
    if(Math.floor(textState.x + (w * 2)) > width) {
      if(isValid) {
        this.processNewLine(textState);
        textState.index--;
        if(this.needsNewPage(textState)) {
          textState.index--;
          this.startPause();
        }
      }
    }
  };

  var alias_Window_Message_origin_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function(textState) {
    
    var c = textState.text[textState.index++];

    // 실제 값은 28.25165154 이런 식이므로 오차가 생기게 된다.
    // 무언가 계산을 하려면 이 값을 정수로 변환해서 사용하자.
    var w = this.textWidth(c);

    var width = this.contentsWidth();

    // 일반 메시지 모드에서만 동작 한다.
    var isValid = ($gameMessage.getBalloon() === -2) && !this._isUsedTextWidthEx && $.Params.isParagraphMinifier;

    // 소수점 자리를 버려야 정확히 계산된다.
    this.processWordWrap(textState, w, width, isValid);

    // 얼굴 이미지가 있고 오른쪽인가?
    if($gameMessage.faceName() !== "") {
      // 내부 컨텐츠의 가로 크기 - 얼굴의 가로 크기
      width = this.contents.width - (Window_Base._faceWidth);
      isValid = ($.Params.faceDirection === 2);
      this.processWordWrap(textState, w, width, isValid);
    }
    
    // 배경색
    if(this.contents.highlightTextColor !== null) {
      var pad = 1.0;
      this.contents.fillRect( textState.x, textState.y, w + pad, textState.height, this.contents.highlightTextColor);
    }

    this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;

    !this._showFast && this.startWait($gameMessage.getWaitTime() || 0);

  };
  
  var alias_Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
  Window_Message.prototype.createSubWindows = function() {
    alias_Window_Message_createSubWindows.call(this);
    this._nameWindow = new RS.Window_Name();
    this.updateNameWindow();
  };
  
  Window_Message.prototype.subWindows = function() {
    return [this._goldWindow, this._choiceWindow,
      this._numberWindow, this._itemWindow, this._nameWindow];
  };

  Window_Message.prototype.updateBigFaceOpacity = function() {
    if(!this._faceContents) {
      return;
    }
    var value = $.Params.faceOpacity.clamp(0, 255);
    this._faceContents.opacity = value;
  };

  var alias_Window_Message_checkToNotClose = Window_Message.prototype.checkToNotClose;
  Window_Message.prototype.checkToNotClose = function() {
    if(this.isOpening() || this.isClosing()) {
      this._faceContents.scale.y = this._windowSpriteContainer.scale.y;
      this._faceContents.y = this._faceContents.height / 2 * (1 - this._openness / 255);      
    } 
    alias_Window_Message_checkToNotClose.call(this);
  };
    
  Window_Message.prototype.updatePlacement = function() {

    this._positionType = $gameMessage.positionType();

    if($gameMessage.getBalloon() === -2) {
      this.x = (Graphics.boxWidth / 2) - (this.width / 2) + $.Params.windowOffset.x;
      this.y = this._positionType * (Graphics.boxHeight - this.height) / 2 + $.Params.windowOffset.y;
    } else {
      if(SceneManager._scene instanceof Scene_Map) this.updateBalloonPosition();
    }

    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
    this.updateDefaultOpacity();
    this.updateContentsOpacity();
    this.updateBigFaceOpacity();

    if(this._nameWindow.isOpen() || this.areSettingsChanged()) {
      this.updateNameWindow();
    }   

    if($gameMessage.faceName() !== "") {
      var isBigFace = /^Big_/.exec($gameMessage.faceName());
      var backIndex = this.children.length - 1;

      if($.Params.faceSide) {
        this.setFaceZIndex(isBigFace ? 0 : backIndex);
      } else {
        this.setFaceZIndex(backIndex);
      }
    }

  };
        
  var alias_Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
  Window_Message.prototype.convertEscapeCharacters = function(text) {
    var tcGroup = $.TextCodes.ENUM;
    var textCode = $.TextCodes.Main;
    var regGroup = $.Reg.Group;
    text = alias_Window_Message_convertEscapeCharacters.call(this, text);
    text = text.replace(regGroup[tcGroup.BOLD_START_CV], function() {
      return regGroup[tcGroup.BOLD_START].source;
    }.bind(this));   
    text = text.replace(regGroup[tcGroup.BOLD_END_CV], function() {
      return regGroup[tcGroup.BOLD_END].source;
    }.bind(this));        
    text = text.replace(regGroup[tcGroup.ITALIC_START_CV], function() {
      return regGroup[tcGroup.ITALIC_START].source;
    }.bind(this));   
    text = text.replace(regGroup[tcGroup.ITALIC_END_CV], function() {
      return regGroup[tcGroup.ITALIC_END].source;
    }.bind(this));
    text = text.replace(regGroup[tcGroup.NAME], function() {
      var retName = arguments[1];
      if(retName.endsWith(':left')) {
        retName = retName.replace(':left', '');
        $.Params.namePositionTypeAtX = "left";
      }
      if(retName.endsWith(':auto')) {
        retName = retName.replace(':auto', '');
        $.Params.namePositionTypeAtX = "auto";
      }
      if(retName.endsWith(':center')) {
        retName = retName.replace(':center', '');
        $.Params.namePositionTypeAtX = "center";
      }        
      if(retName.endsWith(':opacity0')) {
        retName = retName.replace(':opacity0', '');
        $.Params.namePositionTypeAtX = "opacity0";
      }            
      if(retName.endsWith(':defaultOpacity')) {
        retName = retName.replace(':defaultOpacity', '');
        $.Params.namePositionTypeAtX = "defaultOpacity";
      }                    
      if(retName.endsWith(':right')) {
        retName = retName.replace(':right', '');
        $.Params.namePositionTypeAtX = "right";
      }
      this._nameWindow.drawName(retName);
      return '';
    }.bind(this));    
    text = text.replace(regGroup[tcGroup.BALLOON], function() {
      var value = Number(arguments[1] || -2);
      if($gameParty.inBattle()) {
        $gameMessage.setBalloon( (value < 0) ? 'ENEMIES : ' + Math.abs(value) :  'ACTORS : ' + value);
      } else {
        $gameMessage.setBalloon(value);
      }
      return '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.FRIENDLY_TROOPS], function() {
      var value = Number(arguments[1] || 0);
      $gameMessage.setBalloon( 'ACTORS : ' + value );
      return '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ENEMY_TROOPS], function() {
      var value = Number(arguments[1] || 0);
      $gameMessage.setBalloon( 'ENEMIES : ' + value );
      return '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.FACE_DIRECTION], function() {
      var value = Number(arguments[1] || 0);
      if(!this._isUsedTextWidthEx) {
        $.Params.faceDirection = value;
      }
      return '';
    }.bind(this));    
    return text;
  };
    
  var alias_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.close();
    alias_Window_Message_terminateMessage.call(this);
  };
  
  Window_Message.prototype.setHeight = function(n) {
    this.contents.clear();
    $gameMessage.setMaxLine(n);
    this.height = this.fittingHeight(n);
    this.createContents();
    this.updatePlacement();
    this.updateNameWindow();
  };

  Window_Message.prototype.updateNameWindowPositionXImpl = function() {
    var namePositionTypeAtX = $.Params.namePositionTypeAtX;
    var newX = this.x + $.Params.nameWindowX;

    switch(namePositionTypeAtX) {
      case 'right':
        newX = (this.x + this.width) - this._nameWindow.width - $.Params.nameWindowX;
        break;
      case 'center':
        newX = (this.x + this.width / 2) - (this._nameWindow.width / 2) - $.Params.nameWindowX;
        break;
      case 'left':
        newX = this.x + $.Params.nameWindowX;
        break;
      case 'opacity0':
        this._nameWindow.opacity = 0;
        break;
      case 'defaultOpacity':
        this._nameWindow.opacity = $.Params.defaultOpacity;
        break;
      case 'auto':
        newX = this.x + this.newLineX() + $.Params.nameWindowX;        
        break;      
    }

    this._nameWindow.x = newX;
  };
    
  Window_Message.prototype.updateNameWindow = function() {
    var self = this;
    var ox = $.Params.windowOffset.x;
    var oy = $.Params.windowOffset.y;    
    this.updateNameWindowPositionXImpl();
    
    // Y 값
    if($gameMessage.positionType() === 0 && $gameMessage.getBalloon() === -2) {
      this._nameWindow.y = (0 + oy);
      this.y = this._nameWindow.isOpen() ? (this._nameWindow.height + $.Params.nameWindowY + oy) : (0 + oy);
    } else {
      this._nameWindow.y = self.y - this._nameWindow.height - $.Params.nameWindowY;
    }
    
  };
    
  var alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function() {
    alias_Window_Message_initialize.call(this);
    $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
    this.setHeight($.Params.numVisibleRows);
    this.createFaceContents();
    this.on('removed', this.removeEventHandler, this);
    this.on('onLoadWindowskin', this.onLoadWindowskin, this);            
  };

  Window_Message.prototype.removeEventHandler = function() {
    this.off('onLoadWindowskin', this.onLoadWindowskin, this);
  };

  Window_Message.prototype.textColor = function(n) {
    var windowskin = this.windowskin;
    if(!windowskin.isReady()) {
      return Color.baseColor;
    }
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return windowskin.getPixel(px, py);
  };    

  Window_Message.prototype.onLoadWindowskin = function() {
    Color.baseColor = this.textColor(0);      
    this.changeTextColor(Color.baseColor);
  };
  
  Window_Message.prototype.loadWindowskin = function() {
    var self = this;
    var bitmap = ImageManager.loadSystem($.Params.windowskin);
    if(bitmap !== this.windowskin) {
      this.windowskin = bitmap;
      this._isDirtyWindowskin = false;
      this.windowskin.addLoadListener(function() {
        this._isDirtyWindowskin = true;
      }.bind(this));
      if(!this.contents) {
        this.createContents();
      }

      this.changeTextColor(Color.baseColor);   

      if(!this.windowskin.isReady()) {
        return setTimeout(function() {
            self.loadWindowSkin();
        }.bind(this), 10);
      }
      
    }
  };

  var _Window_Message_updateLoading = Window_Message.prototype.updateLoading;
  Window_Message.prototype.updateLoading = function() {
    var ret = true;
    if(this._isDirtyWindowskin) {
      Color.baseColor = this.textColor(0);      
      this.changeTextColor(Color.baseColor);        
      this._isDirtyWindowskin = false;
      ret = true;
    }
    return _Window_Message_updateLoading.call(this) && ret;
  };    
  
  Window_Message.prototype.needsNewPage = function(textState) {
    return (!this.isEndOfText(textState) && textState.y + textState.height > this.contentsHeight());
  };

  //===================================
  // BustFace
  //===================================
  class BustFace extends Sprite {
    constructor(bitmap) {
      super(bitmap);
    }
  }
  
  Window_Message.prototype.createFaceContents = function() {
    this._faceContents = new BustFace();
    this._windowSpriteContainer.addChild(this._faceContents);
    return this._faceContents;
  };
  
  Window_Message.prototype.removeFaceContents = function() {
    if(this._faceContents) this._windowSpriteContainer.removeChild(this._faceContents);
  };
  
  Window_Message.prototype.newLineX = function() {
    var reg = /^Big_/i;
    var faceName = $gameMessage.faceName();
    var faceIndex = $gameMessage.faceIndex();
    if( reg.exec( faceName ) ) { 
      var faceStartX = $.Params.faceSide ? 0 : $.Params.textStartX;
      return (faceIndex > 0) ? 0 : faceStartX; 
    } else {
      if($.Params.faceDirection === 2) return 0;
      return ((faceName) ? $.Params.faceStartOriginX : 0);
    }
  };
  
  Window_Message.prototype.drawBigFace = function(faceName, faceIndex) {
    
    this.loadMessageFace();
    var w = Graphics.boxWidth - this._faceBitmap.width;
    var h = Graphics.boxHeight - this._faceBitmap.height;
    var offsetX = this.x + $.Params.faceOX;
    var offsetY = this.y + $.Params.faceOY;
    var faceIndex = $gameMessage.faceIndex();
    
    this._faceContents.bitmap = this._faceBitmap;
    this._faceContents.scale = new Point(1.0, 1.0);
    
    if(faceIndex > 0) { // 1 이상이면 오른쪽에 위치
      this._faceContents.x = w - offsetX; 
    } else { // 0이면 왼쪽에 위치
      this._faceContents.x = offsetX - this._faceBitmap.width / 2;
    }
    
    this._faceContents.y = h - offsetY;
    this._faceContents.setFrame(0, 0, this._faceBitmap.width, this._faceBitmap.height);
    
  };

  Window_Message.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;

    this._faceContents.bitmap = bitmap;
    this._faceContents.setFrame(sx, sy, sw, sh);

    this._faceContents.x = this.standardPadding() + dx;
    this._faceContents.y = this.standardPadding() + dy;
    this._faceContents.scale = new Point(1.0, 1.0);

  };  

  Window_Message.prototype.drawMessageFace = function() {
    
    var reg = /^Big_/i;
    var faceName = $gameMessage.faceName();
    var faceIndex = $gameMessage.faceIndex();
    
    // 큰 얼굴 그래픽이 있으면
    if(reg.exec( faceName ) ) { 
      this.drawBigFace( faceName, faceIndex );
    } else {

      var fx = 0;
      var fw = Window_Base._faceWidth;
      var padding = this.standardPadding();
      if($.Params.faceDirection === 2) {
        fx = (($gameMessage.getBalloon() === -2) ? this.contents.width : (this._bWidth - padding * 2)) - fw;
      }      
      this.drawFace( faceName, faceIndex , fx, 0);

    }
    
  };
  
  Window_Message.prototype.isAlreadyDrawnFace = function () {
    return this._faceContents.bitmap || this.newLineX() > 0;
  };
  
  Window_Message.prototype.setFaceZIndex = function (zIndex) {
    zIndex = zIndex || 0;
    if(this.parent && $.Params.faceSide) this.setChildIndex( this._faceContents, zIndex );
  };
  
  Window_Message.prototype.clearFaceBitmap = function () {
    if(this._faceContents.bitmap) this._faceContents.bitmap = null;
  };
  
  Window_Message.prototype.redrawFaceImage = function (textState, faceName, faceIndex, x, y, width, height) {
    
    if(!this._faceContents) return;
    var isValid = (this.newLineX() > 0);
    if(!isValid) return;

    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    faceName = faceName.trim() || "";
    faceIndex = parseInt(faceIndex) || 0;
    
    $gameMessage._faceName = faceName;
    $gameMessage._faceIndex = faceIndex;
    
    if( /^Big_/i.test( faceName )) {
      faceIndex = faceIndex.clamp(0, 1);
      this.setFaceZIndex();
      this.drawBigFace( faceName, faceIndex );
    } else {
      // 특정 영역 삭제 및 일반 얼굴 이미지 묘화
      this.contents.clearRect(x, y, width, height);
      var fx = 0;
      var fw = Window_Base._faceWidth;
      var padding = this.standardPadding();
      if($.Params.faceDirection === 2) {
        fx = (($gameMessage.getBalloon() === -2) ? this.contents.width : (this._bWidth - padding * 2)) - fw;
      }
      this.drawFace( faceName, faceIndex , fx, 0);
    }
  };
  
  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function(textState) {
    this.setFaceZIndex();
    this.clearFaceBitmap();
    this.loadWindowskin(); 
    this.emit('onLoadWindowskin');
    this.openBalloon( $gameMessage.getBalloon() );
    alias_Window_Message_newPage.call( this, textState );
  };
  
  Window_Message.prototype.startMessage = function() {      
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
    var tempText = this._textState.text.slice(0);
    if($gameMessage.getBalloon() === -2 && $.Params.isParagraphMinifier) {
      this._textState.text = this._textState.text.replace(/[\r\n]+/gm, " ");
    }   
    this.calcBalloonRect(tempText); // 말풍선 영역 계산        
    this.newPage(this._textState); // 페이지 시작
    this.resizeMessageSystem('no reset'); // width 와 height를 재설정한다.
    this.createContents();
    this.updatePlacement(); // 위치 설정
    this.updateBackground();
    this.open();
  };
    
  var alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function() {
    alias_Window_Message_startMessage.call(this);
    this.updateNameWindow();
    this.startWait(1); // 1프레임 대기
  };
  
  Window_Message.prototype.openBalloon = function(sign) {
    
    // 말풍선 모드가 아니면 빠져나간다.
    if(sign === -2) {
      this.resizeMessageSystem();
      return;
    }
    
    this.setupOwner(sign);
    
    // 전투 중일 경우
    if(SceneManager._scene instanceof Scene_Battle) {
      this.updateBalloonPositionInBattle();
    } else {
      this.updateBalloonPosition();
    }

  };

  Window_Message.prototype.windowWidth = function() {
    var value = $.Params.windowWidth;
    return value || Graphics.boxWidth;
  };
  
  Window_Message.prototype.resizeMessageSystem = function() {

    var isResetOwner = !(arguments.length > 0);
    
    if (!isResetOwner && (SceneManager._scene instanceof Scene_Battle)) return;
    
    var n = $gameMessage.positionType();
    var ox = $.Params.windowOffset.x;
    var oy = $.Params.windowOffset.y;

    this.x = (Graphics.boxWidth / 2) - (this.windowWidth() / 2) + ox;
    // 상, 중, 하
    this.y = n * (Graphics.boxHeight - this.windowHeight()) / 2 + oy;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    
    if(isResetOwner) {
      $gameMap.setMsgOwner($gamePlayer);
    }
    
    
  };
    
  Window_Message.prototype.calcTextHeight = function(textState, all) {
    "use strict";
    
    var tcGroup = $.TextCodes.ENUM;
    var regGroup = $.Reg.Group;
    
    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;
      
      for (var i = 0; i < maxLines; i++) {
        var maxFontSize = this.contents.fontSize;
        var regExp = new RegExp(`\x1b[\{\}]|\x1b${tcGroup.INCREASE}|\x1b${tcGroup.DECREASE}|\x1b${tcGroup.TEXT_SIZE}\[(\d+)\]`, 'ig');
        for (;;) {
          var array = regExp.exec(lines[i]);
          if (array) {
            if (array[0] === '\x1b{') { // \{
              this.makeFontBigger();
            }
            if (array[0] === '\x1b}') { // \}
            this.makeFontSmaller();
          }
          if (array[0] === `\x1b${tcGroup.INCREASE}`) { // \확대!
            this.makeFontBigger();
          }
          if (array[0] === `\x1b${tcGroup.DECREASE}`) { // \축소!
            this.makeFontSmaller();
          }
          if (array[0].contains(`\x1b${tcGroup.TEXT_SIZE}`)) { // \크기[size]
            this.setTextSize(array[1]);
          }
          if (maxFontSize < this.contents.fontSize) {
            maxFontSize = this.contents.fontSize;
          }
        } else {
          break;
        }
      }
      textHeight += maxFontSize + 8;
    }
    
    this.contents.fontSize = lastFontSize;

    if(textHeight < this.lineHeight()) {
      textHeight = this.lineHeight();
    }

    return textHeight;
  };
  
  Window_Message.prototype.calcBalloonRectHeight = function (text) {
    var tempFontSize = this.contents.fontSize;
    var textState = { index: 0, x: 0, y: 0, left: 0, height: 0 };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    this.setTextSize(tempFontSize);
    return textState.height;
  };
  
  Window_Message.prototype.lineHeight = function () {
    return $.Params.lineHeight;
  };

  var alias_Window_Message_startWait = Window_Message.prototype.startWait;
  Window_Message.prototype.startWait = function(count) {
    if(this._isUsedTextWidthEx) return;
    alias_Window_Message_startWait.call(this, count);
  };

  var alias_Window_Message_startPause = Window_Message.prototype.startPause;
  Window_Message.prototype.startPause = function() {
    if(this._isUsedTextWidthEx) return;
    alias_Window_Message_startPause.call(this);
  };

  var _alias_Window_Gold_open = Window_Gold.prototype.open;
  Window_Gold.prototype.open = function() {
    if(SceneManager._scene instanceof Scene_Map ||
    SceneManager._scene instanceof Scene_Battle) {
      if(SceneManager._scene._messageWindow._isUsedTextWidthEx) {
        return;
      }
    }
    _alias_Window_Gold_open.call(this);
  };

  Window_Message.prototype.calcBalloonRect = function(text) {
    var self = this;
    var temp, baseWidth, tempText, height, min, pad, numOfLines;
    
    // drawTextEx를 사용하기 전에 현재 상태를 저장한다.
    this.save();
    
    temp = text;
    
    // 라인 갯수를 구하기 위해 텍스트를 줄바꿈 문자를 기준으로 나눈다.
    tempText = text.slice(0);
    tempText = tempText.split(/[\r\n]+/);
    numOfLines = tempText.length;
    
    pad = (this.standardPadding() * 2);
    
    // 높이를 구한다.
    height = 0;
    tempText.forEach(function(i) {
      height += this.calcBalloonRectHeight(i);
    }, this);
        
    if(height <= 0) {
      // 높이를 구할 수 없었다면,
      height = this.fittingHeight(numOfLines);
    } else {
      // 높이를 구했다면
      height = height + pad;
    }
    
    var textPadding = this.textPadding();
    
    // 폭을 계산한다.
    var pw = 0;
    for(var i = 0; i < numOfLines; i++) {
      this._isUsedTextWidthEx = true;
      var x = this.drawTextEx(tempText[i], 0, this.contents.height + textPadding);
      this._isUsedTextWidthEx = false;
      if(x >= pw) {
        pw = x;
      }
    }
    
    baseWidth = pw;
    this._bWidth = (baseWidth + pad + textPadding) || $.Params.WIDTH;
    
    // 얼굴 이미지가 설정되어있다면 ?
    if($gameMessage.faceName() !== '') {
      // 최소 높이를 설정한다.
      min = this.fittingHeight(4);
      // 기존 폭 값에 얼굴 이미지의 폭을 더한다.
      this._bWidth += this.newLineX() + pad;
      if($.Params.faceDirection === 2) {
        this._bWidth += (Window_Base._faceWidth);
      }
      // 높이 값이 최소 높이보다 작으면, 최소 높이 값으로 설정한다.
      if(height < min) height = height.clamp(min, height + (min - height));
    }

    var type = $.Params.choiceWindowStyle;

    // 선택지가 있고, XP 스타일로 설정했을 때
    if(type === 'RMXP' && $gameMessage.isChoice()) {
      var maxLines = tempText.length;
      var maxChoices = $gameMessage.choices().length;
      var lineHeight = this.lineHeight();
      // 선택지 갯수를 확장했을 수도 있지만, 4개로 가정한다.
      height = height + (maxChoices * lineHeight);
      // 선택지 윈도우의 폭이 말풍선보다 크면 제한을 둔다.
      if(this._choiceWindow.windowWidth() > this._bWidth) {
        this._bWidth = this._choiceWindow.windowWidth();
      }
    }
    
    this._bHeight = height;

    // this.drawTextEx() 사용하기 이전 상태로 복구한다.
    this.restore();

  };
  
  Window_Message.prototype.isActiveInBalloon = function () {
    // 말풍선 모드가 아니라면
    if($gameMessage.getBalloon() === -2) {
      this.updatePlacement();
      return false;
    };
    return true;
  };
  
  Window_Message.prototype.setBalloonRect = function (data) {
    var ox = $.Params.windowOffset.x;
    var oy = $.Params.windowOffset.y;
    this.x = data.dx + ox;
    this.y = data.dy + oy;
    this.width = this._bWidth;
    this.height = this._bHeight;

    if($gameMessage.faceName() && $.Params.faceDirection === 2) {
      this.drawMessageFace();
    }

  };
  
  Window_Message.prototype.setBalloonPlacement = function (data) {
    // 화면 좌측
    if(!data) return;
    if(data.mx - (this._bWidth / 2) < 0) {
      data.dx = 0;
      data.tx = this.canvasToLocalX(data.mx);
    }
    
    // 화면 우측
    if(data.mx - (this._bWidth / 2) > Graphics.boxWidth - this._bWidth ) {
      data.dx = Graphics.boxWidth - this._bWidth;
      data.tx = this.canvasToLocalX(data.mx);
    }
    
    // 화면 상단
    if( (data.my - this._bHeight - data.tileHeight / 2) < 0 ) {
      data.dy = data.my + data.tileHeight / 2;
      data.scaleY = -1;
      data.ty = (this._height * data.scaleY) + this._height;
      data.ny = (this.y + this._bHeight) + $.Params.nameWindowY;
    }
    
    // 화면 하단
    if(data.my - this._bHeight > Graphics.boxHeight - this._bHeight ) {
      data.dy = Graphics.boxWidth - this._bHeight;
      data.ty = this._height;
    }
    
    return data;
    
  };
  
  Window_Message.prototype.updateSubBalloonElements = function (data) {
    this._windowPauseSignSprite.move(data.tx, data.ty);
    this._windowPauseSignSprite.scale.y = data.scaleY;
    this._nameWindow.y = data.ny;
    
    // 1프레임 대기
    this.startWait(1);
    
  };
  
  Window_Message.prototype.updateBalloonPosition = function() {
    var data = {};
    
    if(!this.isActiveInBalloon()) return;
    
    // 말풍선 소유자의 화면 좌표
    var owner = $gameMap.getMsgOwner();
    data.mx = owner.screenX();
    data.my = owner.screenY();

    data.tx = this._bWidth / 2;
    data.ty = this._bHeight;
    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();
    data.dx = data.mx - (this._bWidth / 2);
    data.dy = data.my - this._bHeight - data.tileHeight;
    data.ny = this.y - this._nameWindow.height - $.Params.nameWindowY;
    
    data = this.setBalloonPlacement(Object.create(data));
    
    // 말풍선 위치 및 크기 설정
    this.setBalloonRect(data);
    
    // 멈춤 표시 스프라이트 위치 조정
    this.updateSubBalloonElements(data);
    
    if(this.transform) this.updateTransform();
    
  };
  
  Window_Message.prototype.getSpriteActors = function (sign) {
    if(!typeof(sign) === "number") return;
    if(!$gameParty.members()) return null;
    var max = $gameParty.members().length;
    sign = sign.clamp(0, max);
    
    return {type: 'actor', id: sign - 1};
    
  };
  
  Window_Message.prototype.getSpriteEnemies = function (sign) {
    if(!typeof(sign) === "number") {
      return;
    }
    if(!$gameTroop.members()) return null;
    var max = $gameTroop.members().length;
    sign = sign.clamp(0, max);
    
    return {type: 'enemy', id: sign - 1};
    
  };
  
  Window_Message.prototype.updateBalloonPositionInBattle = function() {
    if(!$gameParty.inBattle()) { // 전투 씬인지 확인
      console.warn("전투가 아닙니다");
      return;
    }
    if(!$gameSystem.isSideView()) { // 사이드뷰 전투인지 확인
      console.warn("사이드뷰 전투가 아닙니다.");
      return;
    }
    
    var data = {};
    
    // 타겟의 화면 좌표 설정
    var owner = $gameMap.getMsgOwner();
    if(!owner) {
      console.warn("owner 변수가 없습니다");
      return;
    }
    if(!owner.hasOwnProperty('type')) {
      console.warn("type 속성이 없습니다 : " + owner);
      return;
    }
    if(!owner.hasOwnProperty('id')) {
      console.warn("id 속성이 없습니다 : " + owner);
      return;
    }
    
    // 현재 씬이 전투 씬이 아닌 경우를 확인한다.
    var scene = SceneManager._scene;
    if(!scene instanceof Scene_Battle) {
      console.warn("전투 장면이 아닙니다");
      return false;
    }
    
    var parent;
    
    // 액터인가?
    if(owner.type === 'actor') {
      parent = scene._spriteset._actorSprites; // 액터 스프라이트 군을 반환
    } else {
      parent = scene._spriteset._enemySprites; // 적 스프라이트 군을 반환
    }
    
    // 타겟 스프라이트를 id 값으로 찾는다.
    var tempBattlers = [];
    tempBattlers = parent;
    var target = tempBattlers[owner.id];
    if(!target) {
      console.warn("타겟이 없습니다");
      return;
    }
    
    // 이미 죽어있다면 메시지를 일반 메시지로 표시한다.
    if(owner.type === 'actor' && !target._actor.isAlive() ||
    (owner.type === 'enemy' && !target._enemy.isAlive()) ) {
      return;
    }
    
    data.mx = target.x;
    data.my = target.y;
    
    data.padY = (owner.type === 'actor') ? (target._mainSprite.bitmap.height / 6) : target.bitmap.height;
    
    data.tx = this._width / 2;
    data.ty = this._height;
    
    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();
    
    data.dx = data.mx - (this._bWidth / 2);
    data.dy = data.my - this._bHeight - data.tileHeight - data.padY;
    
    data.ny = this.y - this._nameWindow.height - $.Params.nameWindowY;
    
    data = this.setBalloonPlacement(Object.create(data));
    
    // 말풍선 위치 및 크기 설정
    this.setBalloonRect(data);
    
    // 멈춤 표시 스프라이트 위치 조정
    this.updateSubBalloonElements(data);
    
    if(this.transform) this.updateTransform();
    
  };
  
  Window_Message.prototype.setupOwner = function(sign) {
    var self = this;
    switch(sign) {
      case -1: // 플레이어
      $gameMap.setMsgOwner($gamePlayer);
      break;
      case 0: // 이 이벤트
      $gameMap.setMsgOwner($gameMap.getMsgEvent());
      break;
      default:
      if(SceneManager._scene instanceof Scene_Battle) { // 전투 중인가?
        if(/(?:ENEMIES)[ ]*:(.*)/.test(sign)) { // 적
          $gameMap.setMsgOwner( self.getSpriteEnemies(parseInt(RegExp.$1)) );
        }
        if(/(?:ACTORS)[ ]*:(.*)/.test(sign)) { // 아군
          $gameMap.setMsgOwner( self.getSpriteActors(parseInt(RegExp.$1)) );
        }
      } else { // 맵 이벤트
        $gameMap.setMsgOwner($gameMap.event(sign));
      }
      break;
    }
  };
  
  var alias_Window_Message_standardFontFace = Window_Message.prototype.standardFontFace
  Window_Message.prototype.standardFontFace = function() {
    if($.Params.customFont) {
      return $.Params.customFontName;
    } else {
      return alias_Window_Message_standardFontFace.call(this);
    }
  };
  
  /**
  * Window 구성 스프라이트 _windowBackSprite의 투명도를 조절합니다.
  * @method standardBackOpacity
  */
  Window_Message.prototype.standardBackOpacity = function() {
    return $.Params.backOpacity;
  };
  
  /**
  * Bitmap의 context.globalAlpha 값을 변경합니다.
  * @method translucentOpacity
  */
  Window_Message.prototype.translucentOpacity = function() {
    return $.Params.translucentOpacity;
  };
  
  /**
  * 윈도우를 구성하는 모든 객체의 투명도를 변경합니다.
  * @method updateDefaultOpacity
  */
  Window_Message.prototype.updateDefaultOpacity = function() {
    this.opacity = $.Params.defaultOpacity;
  };
  
  /**
  * Window 구성 스프라이트 _windowContentsSprite의 투명도를 변경합니다.
  * @method updateContentsOpacity
  */
  Window_Message.prototype.updateContentsOpacity = function() {
    this.contentsOpacity = $.Params.contentsOpacity;
  };
  
  //============================================================================
  // Game_Interpreter
  //============================================================================

  /**
   * This function obtains the message param on platform such as PC.
   * @param {Number} eventId Pass an event's id can obtain the note tags.
   * @param {Number} index Pass the index of the list.
   */
  Game_Interpreter.prototype.processMessageParams = function(eventId, index) {
    var meta = $.getEventComments(eventId, index - 1);
    if(meta["윈도우 스킨"]) { // Load the window skin
      $.Params.windowskin = meta["윈도우 스킨"].trim() || "Window";
      ImageManager.loadSystem($.Params.windowskin);
    }
    if(meta["이름 윈도우 스킨"]) { // Load the window skin for name window
      $.Params.windowskinForNameWindow = meta["이름 윈도우 스킨"].trim() || "Window";
      ImageManager.loadSystem($.Params.windowskinForNameWindow);
    }    
    if(meta["라인 높이"]) { // Sets the line height for window objects
      $.Params.lineHeight = parseInt(meta["라인 높이"]);
    }
    if(meta["폰트 크기"]) { // Sets the font size in the window contents.
      $.Params.fontSize = parseInt(meta["폰트 크기"]);
    }    
    if(meta["라인"]) { // Sets the number of visible rows in the message window.
      $.Params.numVisibleRows = parseInt(meta["라인"]);
    }
    if(meta["텍스트 시작 X"]) { // Sets the x-coordinate of text starting point.
      $.Params.textStartX = parseInt(meta["텍스트 시작 X"]);
    }   
    if(meta["큰 페이스칩 OX"]) { // Sets the offset-x-coordinate of the large face image.
      $.Params.faceOX = Number(meta["큰 페이스칩 OX"]);
    }
    if(meta["큰 페이스칩 OY"]) { // Sets the offset-y-coordinate of the large face image.
      $.Params.faceOY = Number(meta["큰 페이스칩 OY"]);
    }
    // This sets the z-coordinate of the large face. 
    // if true, it sets to 0, 
    // the game invokes z-sorting function when starting the message window.
    if(meta["대화창 뒤에 얼굴 표시"]) { 
      $.Params.faceSide = Boolean(meta["대화창 뒤에 얼굴 표시"] === "true");     
    }
    if(meta["대화창 투명도"]) { // Sets the opacity of the message window.
      $.Params.defaultOpacity = parseInt(meta["대화창 투명도"]);      
    }
    // Sets whether the text sound plays back.
    if(meta["텍스트 효과음 재생 여부"]) {
      $.Params.isPlayTextSound = Boolean(meta["텍스트 효과음 재생 여부"] === "true");     
    }  
    // Sets the message speed.
    if(meta["기본 텍스트 출력 속도"]) {
      $.Params.textSpeed = Number(meta["기본 텍스트 출력 속도"]);
    }
  };

  Game_Interpreter.prototype.isValidMultiLine = function() {
    var codes = [];
    var prevCode = 401;
    var lineCount = 0;
    for(var i = 1; i < 8; i++) {
      var currentCommand = this._list[this._index + i];
      if(currentCommand) {
        var code = currentCommand.code;
        codes.push(code);
        prevCode = code;
        if([101, 401].contains(code)) {
          lineCount++;
        }
      }
    }
    if(codes.contains(102)) {
      return false;
    } else if(codes.contains(103)) {
      return false;
    } else if($gameMessage.getMaxLine() <= 4) {
      return false;
    } else if(lineCount <= 4) {
      return false;
    } else if($.Params.choiceWindowStyle == "RMXP") {
      return false;
    } else {
      return true;
    }
  };
  
  Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMap.setMsgEvent(this.character((this._eventId > 0) ? 0 : -1));
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
      
      if(!Utils.isMobileDevice()) {
        this.processMessageParams(this._eventId, this._index);
      }
    
      if(this.isMultiLine()) {
        this.multiLineAddMessage();
      } else {
        while (this.nextEventCode() === 401) { 
          this._index++;
          $gameMessage.add(this.currentCommand().parameters[0]);
        }
      }
      
      switch (this.nextEventCode()) {
        case 102:  // Show Choices
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
        case 103:  // Input Number
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
        case 104:  // Select Item
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
  };
  
  Game_Interpreter.prototype.multiLineAddMessage = function() {
    
    this.initLineHeight();
    
    while($gameMessage._texts.length < $gameMessage.getMaxLine()) {
      while(this.nextEventCode() === 401) {
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
        this.addLineHeight();
        if(this._lineHeight >= $gameMessage.getMaxLine()) {
          break;
        }
      }
      if(this.nextEventCode() !== 101) {
        break;
      }
    }

    while(this.nextEventCode() === 401) {
      this._index++;
    }
      
  };
  
  Game_Interpreter.prototype.initLineHeight = function() {
    this._lineHeight = 0;
  };
  
  Game_Interpreter.prototype.isMultiLine = function() {
    return this.isValidMultiLine();
  };
  
  Game_Interpreter.prototype.addLineHeight = function() {
    this._lineHeight++;
    if(this.nextEventCode() === 101) {
      this._index++;
    }
  };
  
  //============================================================================
  // RS.Window_Name
  //============================================================================
  
  RS.Window_Name.prototype = Object.create(Window_Base.prototype);
  RS.Window_Name.prototype.constructor = RS.Window_Name;
  
  RS.Window_Name.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.setWindowStyle();
  };
  
  RS.Window_Name.prototype.setWindowStyle = function () {
    this.openness = 0;
    this.opacity = $.Params.defaultOpacity;
    this.backOpacity = $.Params.backOpacity;
    this.contentsOpacity = $.Params.contentsOpacity;
    this.translucentOpacity = $.Params.translucentOpacity;
    this._isWindow = false;
  };

  RS.Window_Name.prototype.updateBackground = function() {
    this._background = $gameMessage.background();
    this.setBackgroundType(this._background);
  };  
  
  RS.Window_Name.prototype.windowWidth = function() {
    return $.Params.nameWindowWidth;
  };
  
  RS.Window_Name.prototype.windowHeight = function() {
    return this.fittingHeight($.Params.nameWindowRows);
  };
  
  RS.Window_Name.prototype.standardPadding = function() {
    return $.Params.nameWindowStdPadding;
  };
  
  RS.Window_Name.prototype.getWidth = function(text) {
    try {
      var tempText = this.textProcessing(text);
      var textPadding = this.textPadding() * 2;
      tempText = tempText.split(/[\r\n]/);
      tempText = tempText.sort(function(a, b) {
        return b.length - a.length;
      }.bind(this));
      this.width = this.textWidth(tempText[0]) + (this.standardPadding() * 2) + textPadding;
    } catch(e) {
      this.width = this.windowWidth + this.standardPadding();
    }
  };
  
  RS.Window_Name.prototype.textProcessing = function(text) {
    var tcGroup = $.TextCodes.ENUM;
    var regGroup = $.Reg.Group;
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(regGroup[tcGroup.COLOR],function(i) {
      this.changeTextColor(Color.gmColor(RegExp.$1));
      return "";
    }.bind(this));
    text = text.replace(regGroup[tcGroup.VAR], function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.VAR], function() {
      return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.PLAYER], function() {
      return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.PARTY_MEMBER], function() {
      return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(regGroup[tcGroup.NUM], function() {
      return arguments[1].toComma();
    }.bind(this));
    text = text.replace(regGroup[tcGroup.GOLD], TextManager.currencyUnit);
    text = text.replace(regGroup[tcGroup.BALLOON], '');
    text = text.replace(regGroup[tcGroup.NAME], '');
    text = text.replace(regGroup[tcGroup.ALIGN], '');
    text = text.replace(regGroup[tcGroup.ICON], '');
    text = text.replace(regGroup[tcGroup.INCREASE], '');
    text = text.replace(regGroup[tcGroup.DECREASE], '');
    text = text.replace(regGroup[tcGroup.TEXT_SPEED], '');
    text = text.replace(regGroup[tcGroup.TEXT_SIZE], '');
    text = text.replace(regGroup[tcGroup.OUTLINE_COLOR], '');
    text = text.replace(regGroup[tcGroup.OUTLINE_WIDTH], '');
    text = text.replace(regGroup[tcGroup.INDENT], '');
    text = text.replace(regGroup[tcGroup.BOLD], '');
    text = text.replace(regGroup[tcGroup.ITALIC], '');
    text = text.replace(regGroup[tcGroup.GRADIENT], '');
    text = text.replace(regGroup[tcGroup.TAB], '');
    text = text.replace(regGroup[tcGroup.CARRIAGE_RETURN], '');
    text = text.replace(regGroup[tcGroup.PLAY_SE], '');
    text = text.replace(regGroup[tcGroup.SHOW_PICTURE], '');
    text = text.replace(regGroup[tcGroup.HIDE_PICTURE], '');
    text = text.replace(regGroup[tcGroup.CLASSES], function() {
      return $dataClasses[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ITEM], function() {
      return $dataItems[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.WEAPON], function() {
      return $dataWeapons[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ARMOR], function() {
      return $dataArmors[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.ENEMY], function() {
      return $dataEnemies[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.STATE], function() {
      return $dataStates[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.SKILL], function() {
      return $dataSkills[parseInt(arguments[1])].name || '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.FACE], '');
    text = text.replace(regGroup[tcGroup.FRIENDLY_TROOPS], '');
    text = text.replace(regGroup[tcGroup.ENEMY_TROOPS], '');
    return text;
  };
  
  RS.Window_Name.prototype.refresh = function() {
    this.contents.clear();
    this.createContents();
    this.changeTextColor(Color.baseColor);
    this.contents.fontSize = $.Params.fontSize;
    this.text = this.convertEscapeCharacters(this.text);
    this.text = this.textProcessing(this.text);
    this.drawText(this.text, 0, 0, this.width, 'left');
  };
  
  RS.Window_Name.prototype.drawName = function(text) {
    this.text = text;
    this.width = this.windowWidth();
    this.contents.fontSize = $.Params.fontSize;
    this.getWidth(this.text);
    this.updateBackground();
    this.open();
  };
  
  RS.Window_Name.prototype.open = function() {
    this.loadWindowskin();    
    this.refresh();
    Window_Base.prototype.open.call(this);
  };
  
  RS.Window_Name.prototype.close = function() {
    Window_Base.prototype.close.call(this);
  };
  
  RS.Window_Name.prototype.loadWindowskin = function() {
    var self = this;
    this.windowskin = ImageManager.loadSystem($.Params.windowskinForNameWindow);
  };
  
  //============================================================================
  // Game_Temp
  //============================================================================
  
  Game_Temp.prototype.setMSHeightFunc = function(func) {
    this._callMSHeightFunc = func;
  };
  
  Game_Temp.prototype.setMaxLine = function(n) {
    if(this._callMSHeightFunc) this._callMSHeightFunc(n);
  };
  
  //============================================================================
  // Game_Map
  //============================================================================
  
  var alias_Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    alias_Game_Map_initialize.call(this);
    this._msgOwner = $gamePlayer;
    this._msgEvent = 0;
  };
  
  Game_Map.prototype.getMsgOwner = function() {
    return this._msgOwner;
  };
  
  /**
  * @method setMsgOwner
  * @param o {Game_Event | Game_Player}
  */
  Game_Map.prototype.setMsgOwner = function(o) {
    this._msgOwner = o;
    $gameMessage.setBalloonPatternHeight(this.tileHeight());
  };
  
  Game_Map.prototype.getMsgEvent = function() {
    return this._msgEvent;
  };
  
  Game_Map.prototype.setMsgEvent = function(ev) {
    this._msgEvent = ev;
  };
      
  //============================================================================
  // Window_Message (텍스트 정렬)
  //============================================================================  

  // Galv's Message Styles Compatibility
  if(Imported.Galv_MessageStyles) {

    Window_Message.prototype.textPadding = function() {
        if (Imported.Galv_MessageBusts) {
            if ($gameMessage.bustPos == 1) {
                var faceoffset = 0;
            } else {
                var faceoffset = Galv.MB.w;
            };
        } else {
            var faceoffset = Window_Base._faceWidth + 25;
        };

        // Calc X Offset
        var xO = $gameMessage._faceName ? faceoffset : 0;
        xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

        return xO;
    };   
  }

  var alias_Window_Message_startMessage_setAlignCenter = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function() {
    alias_Window_Message_startMessage_setAlignCenter.call(this);
    this.processAlign(this._textState);
  }
    
  //============================================================================
  // Window_ScrollText (텍스트 정렬)
  //============================================================================    

  Window_ScrollText.prototype.refresh = function() {
    var textState = { index: 0 };
    textState.text = this.convertEscapeCharacters(this._text);
    this.resetFontSettings();
    this._allTextHeight = this.calcTextHeight(textState, true);
    this.createContents();
    this.origin.y = -this.height;
    this.processAlign(textState);
    this.drawTextEx(this._text, this.textPadding(), 1);
  };
  
  //============================================================================
  // Play the text sound into the message system.
  //============================================================================
  
  $.randomNormal = function (maxValue) {
    // 이 코드는 성능에 영향을 줄 수 있다.
    var r = Math.sqrt(-2 * Math.log(Math.random()));
    var t = Math.PI * 2 * Math.random();
    var x = r * Math.cos(t) * maxValue;
    var y = r * Math.sin(t) * maxValue;
    return [x, y];
  };
  
  /**
  * 암호화 파일 디코딩을 위한 함수
  * @param {String} url 
  * @param {Function} cb 
  */
  Window_Message.prototype.setDecryptTextSoundSrc = function(url, cb) {
    var self = this;
    var requestFile = new XMLHttpRequest();
    requestFile.open("GET", url);
    requestFile.responseType = "arraybuffer";
    requestFile.send();
    
    requestFile.onload = function () {
      if(this.status < Decrypter._xhrOk) {
        var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
        var _url = Decrypter.createBlobUrl(arrayBuffer);
        
        cb(_url);
        
      }
    };
  };
  
  Window_Message.prototype._createTextSoundPool = function () {
    var self = this;
    var maxPool;
    
    if(!$.Params.isPlayTextSound) return false;
    
    if(!window.HTMLAudioElement) return false;
    
    if(this._soundPool) return false;
    
    this._soundPool = {};
    this._soundPool.maxPool = $.Params.textSoundPoolSize;
    this._soundPool.currentId = 0;
    this._soundPool.defaultSymbol = "message_system_text_sound";
    this._soundPool.src = "./audio/se/" + $.Params.pathTextSound + AudioManager.audioFileExt();
    
    // 암호화 파일 처리
    var hasEncrypted = (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.5");
    if(hasEncrypted && Decrypter.hasEncryptedAudio) {
      var url = Decrypter.extToEncryptExt(this._soundPool.src);
      this.setDecryptTextSoundSrc(url, function (src) {
        if(src) self._soundPool.src = src;
        self._addTextSoundToPool();
      });
    } else {
      // 일반적인 처리
      self._addTextSoundToPool();
    }

    /*
      * Promise 브라우저 별 지원 여부
      * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
      */
    var browserType = $.getBrowser();      
    if(browserType.name.contains("Chrom")) {
      this._soundPool.isValid = (browserType.version >= "32");
    }
    
    this._soundPool.isValid = (typeof(Promise) === "function");
    if(this._soundPool.isValid) {
      if(!("then" in Promise.prototype)) this._soundPool.isValid = false;
      if(!('catch' in Promise.prototype)) this._soundPool.isValid = false;
    }

  };
  
  Window_Message.prototype._addTextSoundToPool = function () {
    
    // 사운드 풀에 사운드를 넣고 대기 상태로
    var maxPool = this._soundPool.maxPool;
    
    for(var id = 0; id < maxPool; ++id) {
      var textSound = document.createElement('audio');
      textSound.id = this._soundPool.defaultSymbol + id;
      textSound.src = this._soundPool.src;
      textSound.volume = 0;
      textSound.loop = false;
      textSound.load();
      
      document.body.appendChild(textSound);
      
    }
    
  };
  
  Window_Message.prototype.isValidTextSound = function () {
    
    // 사운드 풀이 있는가?
    if(!this._soundPool) return false;
    if(!this._soundPool.hasOwnProperty('maxPool')) return false;
    
    // 텍스트 사운드 기능이 ON이 아니라면
    if(!$.Params.isPlayTextSound) return false;
    
    // HTML5 Audio 지원 여부 확인
    if(!window.HTMLAudioElement) return false;
    
    return true;
    
  };
  
  Window_Message.prototype._removeTextSoundPool = function () {
    
    // 사운드 풀 유효성 체크
    if(!this.isValidTextSound()) return;
    
    var maxPool = this._soundPool.maxPool;
    
    // 사운드 풀에 있는 모든 사운드 엘리먼트를 없앤다.
    for(var id = 0; id < maxPool; ++id) {
      var textSound = document.getElementById(this._soundPool.defaultSymbol + id);
      document.body.removeChild(textSound);
    }
    // 암호화 사운드 파일이라면
    var hasEncrypted = (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.3.5");
    if(hasEncrypted && Decrypter.hasEncryptedAudio) {
      URL.revokeObjectURL(this._soundPool.src);
    }
    
  };
  
  Window_Message.prototype._requestTextSound = function () {
    var textSound, currentId;
    
    if(this._isUsedTextWidthEx) return false;

    if(!this.isValidTextSound()) return false;
    
    if(!eval($.Params.textSoundEval1)) return false;
    
    currentId = (this._soundPool.currentId + 1) % (this._soundPool.maxPool);
    textSound = document.getElementById(this._soundPool.defaultSymbol + currentId);
    
    this._soundPool.currentId = currentId;
    
    if(textSound) {
      
      textSound.pause();
      textSound.currentTime = 0;
      textSound.volume = eval($.Params.textSoundEval2).clamp(0.0, 1.0);
      
      textSound.load();

      if(this._soundPool.isValid) {
        var playPromise = textSound.play();
        if (playPromise !== undefined) {
          playPromise.then(function() {
            
          }).catch(function (err) {
            
          });
        }        
      } else {
        textSound.play();        
      }
    }
    
    return true;
    
  };
  
  var alias_TextSound_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function () {
    alias_TextSound_Window_Message_initialize.call(this);
    this._createTextSoundPool();
    this.on('removed', this._removeTextSoundPool, this);
  };
  
  var alias_TextSound_Window_Message_processNormalCharacter = Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function(textState) {
    alias_TextSound_Window_Message_processNormalCharacter.call(this, textState);
    if((textState.index % $.Params.textSoundInterval) === 0) this._requestTextSound();
  };
  
  //============================================================================
  // Window_ChoiceList
  //============================================================================
  
  var alias_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function (messageWindow) {
    alias_Window_ChoiceList_initialize.call(this, messageWindow);
    this._isDirty = false;
  };
  
  Window_ChoiceList.prototype.initWithStyle = function (type) {
    switch (type) {
      case 'RMXP': // 선택지 스타일을 RPG Maker XP처럼 변경한다.
      this.onChangeStyleToRMXP();
      break;
      default: // 선택지 스타일을 RPG Maker MV 기본으로 변경한다.
      this.onChangeStyleToDefault();
    }
  };
  
  var alias_Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
    var type = $.Params.choiceWindowStyle;
    this.initWithStyle(type);
    this.setWindowStyle();
  };

  Window_ChoiceList.prototype.setWindowStyle = function () {
    this.opacity = $.Params.defaultOpacity;
    this.backOpacity = $.Params.backOpacity;
    this.contentsOpacity = $.Params.contentsOpacity;
    this.translucentOpacity = $.Params.translucentOpacity;
  };

  Window_ChoiceList.prototype.updateNormalPlacement = function() {

    // XP 스타일이면 메서드를 종료한다.
    var type = $.Params.choiceWindowStyle;
    if(type === 'RMXP') return;

    var messageX = this._messageWindow.x;     
    var messageY = this._messageWindow.y;   
    var messageWidth = this._messageWindow.width;
    var messageHeight = this._messageWindow.height;
    var positionType = $gameMessage.positionType();
    var nameWindow = this._messageWindow._nameWindow;
    var nameWindowXPositionType = $.Params.namePositionTypeAtX;    
    var nameWindowPad = 0;
    
    if(nameWindow.isOpen() && ['center', 'right'].contains(nameWindowXPositionType)) {
      nameWindowPad = nameWindow.height;
    }

    // 메시지 윈도우가 화면 하단에 위치한다면
    if (messageY >= Graphics.boxHeight / 2) {

      // 이름 윈도우가 가운데 또는 오른쪽에 있으면 패딩 값이 추가된다.
      this.y = messageY - nameWindowPad - this.height;
        
    } else {

      // 메시지 윈도우가 상단에 있으면 선택지 윈도우는 메시지 윈도우 하단으로 오게 된다.
      var ty = messageY + messageHeight;
      if(ty > Graphics.boxHeight - this.height) {
        // 이름 윈도우가 가운데 또는 오른쪽에 있으면 패딩 값이 추가된다.
        this.y = messageY - nameWindowPad - this.height;     
      } else {
        this.y = messageY + messageHeight;
      }
    }

    this.x = messageX + messageWidth - this.width;
  };

  var alias_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function() {
    this.windowskin = ImageManager.loadSystem($.Params.windowskin);
    alias_Window_ChoiceList_start.call(this);
  };  
    
  Window_ChoiceList.prototype.onChangeStyleToRMXP = function () {
    $.Params.isTempSpriteContainerVisibility = false;
    this.updateOpacity();
    this.setPlacement();
    this.updateBackground();
  };
  
  Window_ChoiceList.prototype.onChangeStyleToDefault = function () {
    $.Params.isTempSpriteContainerVisibility = true;
    this.needToUpdateWhenChangingVisibility();
    alias_Window_ChoiceList_updatePlacement.call(this);
    this.updateNormalPlacement();
    this.updateBackground();
  };
  
  Window_ChoiceList.prototype.updateOpacity = function () {
    // 텍스트를 제외한 모든 것들이 렌더링에서 제외된다.
    this._windowSpriteContainer.visible = false;
  };
  
  Window_ChoiceList.prototype.needToUpdateWhenChangingVisibility = function () {
    var visible = $.Params.isTempSpriteContainerVisibility;
    if(this._windowSpriteContainer.visible !== visible) {
      this._windowSpriteContainer.visible = visible;
    }
  };
  
  Window_ChoiceList.prototype.setPlacement = function () {
    
    // false로 설정해 마스킹이 씌워지지 않도록 했다 
    this._isWindow = false;
    
    var messageHeight = this._messageWindow.windowHeight();
    var messageTextState = this._messageWindow._textState;
    var newLineX = this._messageWindow.newLineX();
    var textLength, currentTextHeight, height;
    
    if(messageTextState.text) {
      
      textLength = messageTextState.text.slice(0).split('\n').length;
      // fittingHeight 함수에 패딩 값이 포함되었기 때문에, 패딩 값을 빼준 것.
      currentTextHeight = this.fittingHeight(textLength) - this.standardPadding() * 2;
      height = this._messageWindow.height - currentTextHeight;
      
    } else {
      
      currentTextHeight = textLength = 0;
      height = this._messageWindow.height;
      
    }

    this.width = this._messageWindow.width - newLineX;
    
    // messageHeight는 원래 높이.
    // height는 텍스트가 없는 부분의 높이.
    this.height = (height <= 0) ? messageHeight : height;
    
    this.x = this._messageWindow.x + newLineX;
    this.y = this._messageWindow.y + currentTextHeight;
    
  };

  //===========================================================================
  // Window_NumberInput
  //===========================================================================  
  
  Window_NumberInput.prototype.updatePlacement = function() {
    var messageY = this._messageWindow.y;
    var spacing = 8;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = this._messageWindow.x + (this._messageWindow.width - this.width) / 2;
    if (messageY >= Graphics.boxHeight / 2) {
        this.y = messageY - this.height - spacing;
    } else {
        this.y = messageY + this._messageWindow.height + spacing;
    }
  };

  //===========================================================================
  // String
  //===========================================================================
  
  String.prototype.toArray = function() {
    return this.split("");
  };
  
  String.prototype.reverse = function() {
    return this.toArray().reverse().join("");
  };
  
  String.prototype.reversed = function() {
    var r = "";
    for (var i = this.length - 1; i >= 0; i--) {
      r += this[i];
    }
    return r;
  };
  
  String.prototype.toComma = function(){
    return this.reverse().match(/.{1,3}/g).join(",").reverse();
  };
  
  
  //===========================================================================
  // Scene_Boot
  //===========================================================================
  
  var alias_Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    alias_Scene_Boot_loadSystemImages.call(this);
    if($.Params.customFont) { // 커스텀 폰트 로드 처리
      Graphics.loadFont($.Params.customFontName, $.Params.customFontSrc);
    }
  };
  
  //===========================================================================
  // Game_Interpreter
  //===========================================================================
  
  /**
  * 페이스칩 변경 텍스트 코드 호출 시, 해당 페이스칩의 로딩 시간을 없애는 기능이다.
  * 맵 로드 과정에서 미리 로드하기 때문에 중간에 안나오는 일은 없을 것이다.
  * 해당하는 텍스트 코드 : \얼굴<얼굴_이미지_이름, 얼굴_이미지_인덱스>
  */
  if(Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') {
    var alias_Game_Interpreter_requestImages = Game_Interpreter.requestImages;
    Game_Interpreter.requestImages = function(list, commonList) {
      alias_Game_Interpreter_requestImages.call(this, list, commonList);
      if(!list) return;
      list.forEach(function(command, index) { // 이벤트 리스트를 읽는다.
        var params = command.parameters;
        switch(command.code){
          case 401: // 문장의 표시의 텍스트 부분
          var tcGroup = $.TextCodes.ENUM;
          var regGroup = $.Reg.Group;
          var text = params[0].slice(0);
          text = text.replace(/\\/g, '\x1b');
          var data = text.match(regGroup[tcGroup.FACE]);
          if(data) {
            data.forEach(function (e, i, a) {
              var faceName = RegExp.$1.split(',')[0].trim();
              ImageManager.loadFace(faceName);
              return '';
            });
          }      
          data = text.match(regGroup[tcGroup.CHANGE_WINDOWSKIN]);
          if(data) {
            var windowskinName = RegExp.$1.trim();
            ImageManager.loadSystem(windowskinName);
          }  
          break;
        };
      });
    };
  }

  var _Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
  Scene_Boot.prototype.loadSystemWindowImage = function() {
    _Scene_Boot_loadSystemWindowImage.call(this);
    $.Params.preloadWindowskins.forEach(function(i) {
      if(typeof(i) === "string") {
        ImageManager.reserveSystem(i);
      }
    });
  };  
            
  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_pluginCommand.call(this, command, args);
    
    if(command === "Message" || command === "메시지") {
      switch (args[0]) {
        //-------------------------------------------------------------------------
        case 'textSpeed': case '텍스트속도':
        $.Params.textSpeed = Number(args[1]);
        break;
        //-------------------------------------------------------------------------
        case 'fontSize': case '폰트크기':
        $.Params.fontSize = Number(args[1]);
        break;
        //-------------------------------------------------------------------------
        case 'offsetX': case '오프셋X':
        $.Params.windowOffset.x = Number(args[1]);
        break;        
        //-------------------------------------------------------------------------
        case 'offsetY': case '오프셋Y':
        $.Params.windowOffset.y = Number(args[1]);
        break;                
        //-------------------------------------------------------------------------
        case 'minFontSize': case '폰트최소크기':
        $.Params.minFontSize = Number(args[1]);
        break;
        //-------------------------------------------------------------------------
        case 'maxFontSize':  case '폰트최대크기':
        $.Params.maxFontSize = Number(args[1] || 96);
        break;
        //-------------------------------------------------------------------------
        case 'line': case '라인':
        $gameTemp.setMaxLine(Number(args[1] || 4));
        break;
        //-------------------------------------------------------------------------
        case 'textStartX': case '시작위치':
        $.Params.textStartX = Number(args[1]);
        break;
        //-------------------------------------------------------------------------
        case 'name': case '이름윈도우':
        switch (args[1].toLowerCase()) {
          case 'x':
          $.Params.nameWindowX = Number(args[2]);
          break;
          case 'y':
          $.Params.nameWindowY = Number(args[2]);
          break;
          case 'padding':
          $.Params.nameWindowStdPadding = Number(args[2]);
          break;
          case 'windowskin': case '윈도우스킨':
          $.Params.windowskinForNameWindow = args.slice(2, args.length).join('');
          ImageManager.loadSystem($.Params.windowskinForNameWindow);
          break;
        }
        break;
        //-------------------------------------------------------------------------
        case 'faceOX': case '큰페이스칩X':
        $.Params.faceOX = Number(args[1]);
        break;
        //-------------------------------------------------------------------------
        case 'faceOY': case '큰페이스칩Y':
        $.Params.faceOY = Number(args[1]);
        break;
        //-------------------------------------------------------------------------
        case 'faceZ': case '큰페이스칩Z':
        if(Number(args[1] || 0) === -1) {
          $.Params.faceSide = true;
        } else {
          $.Params.faceSide = false;
        }
        break;
        //-------------------------------------------------------------------------        
        case 'facePos': case '페이스칩위치':
        $.Params.faceDirection = parseInt(args[1] || 0);
        break;
        //-------------------------------------------------------------------------
        case 'setTabSize': case '탭크기':
        $.Params.TabSize = Number(args[1]);
        break;
        case 'backgroundOpacity': case '배경투명도':
        $.Params.defaultOpacity = Number(args[1]);
        break;
        case 'contentsOpacity': case '컨텐츠투명도':
        $.Params.contentsOpacity = Number(args[1]);
        break;
        case 'windowskin': case '윈도우스킨':
        $.Params.windowskin = args.slice(1, args.length).join('');
        ImageManager.loadSystem($.Params.windowskin);
        break;
        case 'minifier': case '문단최소화':
        $.Params.isParagraphMinifier = Boolean(args[1] === "true");
        break;
        // End main switch
      }
      // End if
    }
    // End Function
  };
      
  $.initSystem();
      
})(RS.MessageSystem);
    