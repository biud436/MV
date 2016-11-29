/*:
* RS_MessageSystem.js
* @plugindesc (v0.1.4) 한글 메시지 시스템 <RS_MessageSystem>
* @author 러닝은빛(biud436)
*
* @param Font Size
* @desc 텍스트 기본 크기
* @default 28
*
* @param numVisibleRows
* @desc 라인 갯수
* @default 4
*
* @param gradientColor1
* @desc 그레디언트 시작 색상
* @default #FFFFFF
*
* @param gradientColor2
* @desc 그레디언트 중간 색상
* @default #F29661
*
* @param gradientColor3
* @desc 그레디언트 끝 색상
* @default #CC3D3D
*
* @param Text Speed
* @desc 기본 텍스트 출력 속도
* @default 0
*
* @param Text Min Size
* @desc 폰트 최대 크기
* @default 24
*
* @param Text Max Size
* @desc 폰트 최소 크기
* @default 96
*
* @param Text Start X
* @desc 텍스트 시작 X
* @default 256
*
* @param Name Window X
* @desc 이름 윈도우 X
* @default 0
*
* @param Name Window Y
* @desc 이름 윈도우 Y
* @default 0
*
* @param Name Window Inner Padding
* @desc 이름 윈도우 안쪽 여백
* @default 10
*
* @param Big Face OX
* @desc 큰 페이스칩 X
* @default 0
*
* @param Big Face OY
* @desc 큰 페이스칩 OY
* @default 0
*
* @param Show Big Face Back
* @desc 큰 페이스칩을 메시지창의 뒷면에 표시합니다.
* @default false
*
* @param Tab Size
* @desc 탭 크기
* @default 4
*
* @param back Opacity
* @desc 배경 그림의 투명도
* @default 192
*
* @param default Opacity
* @desc 기본 투명도
* @default 255
*
* @param contents Opacity
* @desc 내용의 투명도
* @default 255
*
* @param translucent Opacity
* @desc 반투명도
* @default 160
*
* @param default outline width
* @desc 테두리의 크기를 지정하세요
* @default 2
*
* @param default outline Color
* @desc 테두리 색상을 지정하세요
* @default rgba(0, 0, 0, 1.0)
*
* @param --- Custom Font
* @desc
* @default
*
* @param Using Custom Font
* @desc 사용자 지정 폰트를 사용하시겠습니까?
* 예 - true   아니오 - false
* @default false
*
* @param Custom Font Name
* @desc Font의 이름을 작성하세요
* @default NanumBrush
*
* @param Custom Font Src
* @desc 사용자 지정 Font의 경로를 지정하세요
* @default fonts/NanumBrush.ttf
*
* @help
* =============================================================================
* 플러그인 커맨드
* =============================================================================
* 이 플러그인은 아래와 같은 플러그인 커맨드를 제공합니다.
*
* - 텍스트의 속도는 0에서 가장 빠르고, 프레임 단위로 지정할 수 있습니다.
* 메시지 텍스트속도 number
*
* 메시지 폰트크기 number
* 메시지 폰트최소크기 number
* 메시지 폰트최대크기 number
*
* - 그레디언트 텍스트로 색상을 변경할 수 있습니다.
* 메시지 그레디언트 color1 color2 color3
*
* - 라인 수를 바꿀 수 있는 플러그인 명령입니다.
* 메시지 라인 number
* 메시지 시작위치 number
*
* 이름 윈도우의 좌표를 조절
* 메시지 이름윈도우 x number
* 메시지 이름윈도우 y number
* 메시지 이름윈도우 padding number
* 메시지 큰페이스칩X number
* 메시지 큰페이스칩Y number
* 메시지 큰페이스칩Z number
* 메시지 탭크기 number
* 메시지 배경투명도 number
* 메시지 컨텐츠투명도 number
*
* =============================================================================
* 큰 페이스칩 설정
* =============================================================================
* 페이스칩을 img/faces 에 넣고 페이스칩의 이름을 Big_ 으로 시작하게 합니다.
*
* =============================================================================
* 텍스트 코드(Text Code)
* =============================================================================
* \색[색상명]
* \속도[값]
* \테두리색[색상명]
* \테두리크기[값]
* \들여쓰기[값]
* \굵게!
* \이탤릭!
* \이름<이벤트명>
* \그레디언트<텍스트>
* \파티원[번호]
* \주인공[번호]
* \변수[번호]
* \아이콘[번호]
* \확대
* \축소
* \골드
* \말풍선[이벤트의 ID]
* \말풍선[0]
* \말풍선[-1]
* \정렬자[1]
* \정렬자[2]
* \숫자[숫자]
* \크기[숫자]
* \t : 탭의 크기는 8 입니다.
* \r : X를 시작 위치로 되돌립니다.
*
* =============================================================================
* 색상(Colors)
* =============================================================================
* 청록, 청록색, c_aqua
* 검은색, 검정, c_black
* 파란색, 파랑, c_blue
* 짙은회색, c_dkgray
* 자홍색, 자홍, c_fuchsia
* 회색, c_gray
* 녹색, c_green
* 밝은녹색, 라임, c_lime
* 밝은회색, c_ltgray
* 밤색, 마룬, c_maroon
* 감청색, 네이비, c_navy
* 황록색, 올리브, c_olive
* 주황색, 주황, 오렌지, c_orange
* 보라색, 보라, c_purple
* 빨간색, 빨강, c_red
* 은색, 은, c_silver
* 민트색, c_teal
* 흰색, 흰, c_white
* 노란색, 노랑, c_yellow
* 기본, 기본색, c_normal
*
* =============================================================================
* 버전 로그(Version Log)
* =============================================================================
* 2016.11.27 (v0.1.4) : 플러그인 커맨드에서 '0'값을 설정할 수 없는 오류를 수정했습니다.
* 2016.11.12 (v0.1.3) :
* - 사용자 정의 폰트, 배경 투명도 변경 기능 추가
* - 탭 및 캐리지 리턴 기능 동작하지 않는 버그가 있습니다.
* - 이름 윈도우와 같이 말풍선 윈도우를 띄울 경우, 이름 윈도우가 화면 밖으로 빠져나가는 버그가 있습니다.
* 2016.10.12 (v0.1.2) - 규격에 맞지 않는 캐릭터도 이제 말풍선이 제대로 표시됩니다.
* 2016.09.19 (v0.1.1) - 정렬자 기능 개선
* 2016.06.18 (v0.1.0) - 이름 윈도우 후면에 스프라이트가 그려지지 않는 문제를 수정했습니다
* 2016.03.21 (v0.0.9) - \t (탭), \r (캐리지 리턴) 추가
* 2016.03.01 (v0.0.8) - 말풍선 모드에 페이스칩 표시, 플러그인 커맨드 및 버그 픽스
* 2016.02.27 (v0.0.7) - 통화 서식 추가
* 2016.02.15 (v0.0.6) - 가운데 정렬, 오른쪽 정렬 관련 텍스트 코드 추가
* 2016.01.18 (v0.0.5) - 버그 픽스 (updateNameWindow, calcBalloonRect)
* 2016.01.01 (v0.0.4) - 버그 픽스 (resizeMessageSystem)
* 2015.12.03 (v0.0.3) - 말풍선 기능 추가
* 2015.12.02 (v0.0.2) - 큰 페이스칩 기능 추가
* 2015.12.01 (v0.0.1) - 최초 작성
*/
/*:zh
* @plugindesc (v0.1.4) Chinese Message System <RS_MessageSystem>
* @author biud436
*
* @param Font Size
* @desc Sets the text size
* @default 28
*
* @param numVisibleRows
* @desc Sets the visible rows in the message window.
* @default 4
*
* @param gradientColor1
* @desc Sets the gradient color 1
* @default #FFFFFF
*
* @param gradientColor2
* @desc Sets the gradient color 2
* @default #F29661
*
* @param gradientColor3
* @desc Sets the gradient color 3
* @default #CC3D3D
*
* @param Text Speed
* @desc Sets the text speed
* @default 0
*
* @param Text Min Size
* @desc Sets minimum size of the text
* @default 24
*
* @param Text Max Size
* @desc Sets maximum size of the text
* @default 96
*
* @param Text Start X
* @desc Sets stating position of the text
* @default 256
*
* @param Name Window X
* @desc Sets position-x in the name window
* @default 0
*
* @param Name Window Y
* @desc Sets position-y in the name window
* @default 0
*
* @param Name Window Inner Padding
* @desc Sets the inner padding value in a name window
* @default 10
*
* @param Big Face OX
* @desc Sets the offset position-x of a face
* @default 0
*
* @param Big Face OY
* @desc Sets the offset position-y of a face
* @default 0
*
* @param Show Big Face Back
* @desc Hidden the face in the message window.
* @default false
*
* @param Tab Size
* @desc Tab Size
* @default 4
*
* @param back Opacity
* @desc
* @default 192
*
* @param default Opacity
* @desc
* @default 255
*
* @param contents Opacity
* @desc
* @default 255
*
* @param translucent Opacity
* @desc
* @default 160
*
* @param default outline width
* @desc
* @default 2
*
* @param default outline Color
* @desc
* @default rgba(0, 0, 0, 1.0)
*
* @param --- Custom Font
* @desc
* @default
*
* @param Using Custom Font
* @desc
* @default false
*
* @param Custom Font Name
* @desc
* @default NanumBrush
*
* @param Custom Font Src
* @desc
* @default fonts/NanumBrush.ttf
*
*-------------------------------------------------------------------------------
* Help
*-------------------------------------------------------------------------------
* @help
*
* - Plugin Commands
* You are available plugin commands as follows.
* These plugin commands may be very useful to user.
*
* Message textSpeed number
* Message fontSize number
* Message minFontSize number
* Message maxFontSize number
* Message gradient color1 color2 color3
* Message line number
* Message textStartX number
* Message name x number
* Message name y number
* Message name padding number
* Message faceOX number
* Message faceOY number
* Message faceZ number
* Message TabSize number
* Message backOpacity number
* Message contentsOpacity number
*
* - Text Code
* These text codes are available in the message window.
*
* 色[文本]
* 速度[值]
* 大小[值]
* 轮廓颜色[颜色的名]
* 轮廓宽度[大小]
* 缩进[值]
* 加粗!
* 倾斜!
* 名字<文本>
* 渐变颜色<文本>
* 队伍成员[号码]
* 角色[号码]
* 变量[号码]
* 图标[号码]
* 增大
* 减少
* 金币
* 对话框[EventID]
* 对话框[0]
* 对话框[-1]
* 对齐[1] (居中对齐)
* 对齐[2] (右对齐)
* 数[值]
*
* - Colors
* These text colors are available in the message window.

* 水色
* 黑色
* 蓝色
* 深灰色
* 紫红色
* 灰色
* 绿色
* 浅绿色
* 浅灰色
* 栗色
* 绀青色
* 黄绿色
* 橙黄色
* 紫色
* 红色
* 银白色
* 水鸭色
* 白色
* 黄色
* 通常
* =============================================================================
* Version Log
* =============================================================================
* 2016.11.27 (v0.1.4) : Fixed the issue that did not get the zero value in plugin commands.
*/

var Imported = Imported || {};
Imported.RS_MessageSystem = true;

var RS = RS || {};
RS.MessageSystem = RS.MessageSystem || {};

RS.Window_Name = function() {
  this.initialize.apply(this, arguments);
};

var Color = Color || {};

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MessageSystem>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.MessageSystem.Reg = RS.MessageSystem.Reg || {};
  RS.MessageSystem.Reg.Default = RS.MessageSystem.Reg.Default || [];
  RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Group || [];
  RS.MessageSystem.Reg.Korean = RS.MessageSystem.Reg.Korean || [];
  RS.MessageSystem.Reg.Chinese = RS.MessageSystem.Reg.Chinese || [];
  RS.MessageSystem.TextCodes = RS.MessageSystem.TextCodes || {};

  RS.MessageSystem.Params = RS.MessageSystem.Params || {};

  RS.MessageSystem.Params.fontSize = Number(parameters['Font Size'] || 28);
  RS.MessageSystem.Params.textSpeed = Number(parameters['Text Speed'] || 0);
  RS.MessageSystem.Params.minFontSize = Number(parameters['Text Min Size'] || 24);
  RS.MessageSystem.Params.maxFontSize = Number(parameters['Text Max Size'] || 96);
  RS.MessageSystem.Params.textStartX = Number(parameters['Text Start X'] || 192);
  RS.MessageSystem.Params.faceStartOriginX = 168;
  RS.MessageSystem.Params.numVisibleRows  = Number(parameters['numVisibleRows'] || 4);
  RS.MessageSystem.Params.gradientColor1 = String(parameters['gradientColor1'] || '#FFFFFF');
  RS.MessageSystem.Params.gradientColor2 = String(parameters['gradientColor2'] || '#F29661');
  RS.MessageSystem.Params.gradientColor3 = String(parameters['gradientColor3'] || '#CC3D3D');
  RS.MessageSystem.Params.nameWindowX = Number(parameters['Name Window X'] || 0);
  RS.MessageSystem.Params.nameWindowY = Number(parameters['Name Window Y'] || 0);
  RS.MessageSystem.Params.nameWindowStdPadding = Number(parameters['Name Window Inner Padding'] || 18);
  RS.MessageSystem.Params.faceOX = Number(parameters['Big Face OX'] || 0);
  RS.MessageSystem.Params.faceOY = Number(parameters['Big Face OY'] || 0);
  RS.MessageSystem.Params.faceSide = Boolean(parameters['Show Big Face Back'] === 'true'|| false);
  RS.MessageSystem.Params.FONT_SIZE = 28;
  RS.MessageSystem.Params.STD_PADDING = 18;
  RS.MessageSystem.Params.WIDTH = (RS.MessageSystem.Params.FONT_SIZE * 6) + RS.MessageSystem.Params.STD_PADDING;
  RS.MessageSystem.Params.HEIGHT = RS.MessageSystem.Params.FONT_SIZE + (RS.MessageSystem.Params.STD_PADDING / 2);
  RS.MessageSystem.Params.TabSize = Number(parameters['Tab Size'] || 4);

  RS.MessageSystem.Params.backOpacity = Number(parameters['back Opacity'] || 192);
  RS.MessageSystem.Params.translucentOpacity = Number(parameters['translucent Opacity'] || 160);
  RS.MessageSystem.Params.defaultOpacity = Number(parameters['default Opacity'] || 255);
  RS.MessageSystem.Params.contentsOpacity = Number(parameters['contents Opacity'] || 255);
  RS.MessageSystem.Params.defaultOutlineWidth = Number(parameters['default outline width'] || 2);
  RS.MessageSystem.Params.defaultOutlineColor = parameters['default outline Color'] || 'white';

  RS.MessageSystem.Params.customFont = Boolean(parameters['Using Custom Font'] === 'true');
  RS.MessageSystem.Params.customFontName = String(parameters['Custom Font Name'] || 'GameFont' );
  RS.MessageSystem.Params.customFontSrc = String(parameters['Custom Font Src'] || 'fonts/mplus-1m-regular.ttf');

  //============================================================================
  // Multiple Language supports
  //============================================================================

  RS.MessageSystem.Reg.KoreanEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[가-핳]+[!]*/i;
  RS.MessageSystem.Reg.ChineseEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[一-鼣]+[!]*/i;
  RS.MessageSystem.Reg.defaultEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[가-핳]+[!]*/i;
  RS.MessageSystem.TextCodes = {
    'Korean': [
      undefined, "색", "속도", "테두리색", "테두리크기", // 4
      "들여쓰기", "굵게!", "이탤릭!", "이름", // 8
      "그레디언트", "파티원", "주인공",  "변수", // 12
      "아이콘", "확대", "축소", "골드",  // 16
      '말풍선', "정렬자", "숫자", '크기', // 20
      't', 'r'], // 22
    'Chinese': [
      undefined, "色", "速度", "轮廓颜色", "轮廓宽度", // 4
      "缩进", "加粗!", "倾斜!", "名字", // 8
      "渐变颜色", "队伍成员", "角色", "变量", // 12
      "图标", "增大", "减少", "金币", // 16
      "对话框", "对齐", "数", "大小", // 20
      't', 'r']
  };
  
  RS.MessageSystem.TextCodes.Main = [];

  RS.MessageSystem.TextCodes.ENUM = {
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
    CARRIAGE_RETURN: 22
  };

  RS.MessageSystem.getTextCode = function (idx) {
    if(!!navigator.language.match(/ko/)) {
      return RS.MessageSystem.TextCodes['Korean'][idx];
    }
    if(!!navigator.language.match(/zh/)) {
      return RS.MessageSystem.TextCodes['Chinese'][idx];
    }
    return undefined;
  };

  // Korean Text Codes
  RS.MessageSystem.Reg.Korean[0] = undefined;
  RS.MessageSystem.Reg.Korean[1] = /(?:\x1bC|\x1b색)\[(.+?)\]/gi;   // 색
  RS.MessageSystem.Reg.Korean[2] = /\x1b속도\[(\d+)\]/gi;    // 속도
  RS.MessageSystem.Reg.Korean[3] = /\x1b테두리색\[(.+?)\]/gi;  // 테두리색
  RS.MessageSystem.Reg.Korean[4] = /\x1b테두리크기\[(\d+)\]/gi; // 테두리크기
  RS.MessageSystem.Reg.Korean[5] = /\x1b들여쓰기\[(\d+)\]/gi; // 들여쓰기
  RS.MessageSystem.Reg.Korean[6] = /\x1b굵게!/gi; // 굵게
  RS.MessageSystem.Reg.Korean[7] = /\x1b이탤릭!/gi; // 이탤릭!
  RS.MessageSystem.Reg.Korean[8] = /\x1b이름\<(.+?)\>/gi; // 이름
  RS.MessageSystem.Reg.Korean[9] = /\x1b그레디언트<(.+)>/gi; // 그레디언트
  RS.MessageSystem.Reg.Korean[10] = /(?:\x1bP|\x1b파티원)\[(\d+)\]/gi; // 파티원
  RS.MessageSystem.Reg.Korean[11] = /(?:\x1bN|\x1b주인공)\[(\d+)\]/gi; // 주인공
  RS.MessageSystem.Reg.Korean[12] = /(?:\x1bV|\x1b변수)\[(\d+)\]/gi; // 변수
  RS.MessageSystem.Reg.Korean[13] = /(?:\x1bI|\x1b아이콘)\[(\d+)\]/g; // 아이콘
  RS.MessageSystem.Reg.Korean[14] = /(?:\x1b{|\x1b확대)/gi;  // 확대
  RS.MessageSystem.Reg.Korean[15] = /(?:\x1b{|\x1b축소)/gi; // 축소
  RS.MessageSystem.Reg.Korean[16] = /(?:\x1bG|\x1b골드)/gi; // 골드
  RS.MessageSystem.Reg.Korean[17] = /\x1b말풍선\[(\d+|-\d+)\]/gi; // 말풍선
  RS.MessageSystem.Reg.Korean[18] = /\x1b정렬자\[(\d+)]/gi; // 정렬자
  RS.MessageSystem.Reg.Korean[19] = /\x1b숫자\[(\d+)\]/gi; // 숫자
  RS.MessageSystem.Reg.Korean[20] = /\x1b크기\[(\d+)\]/gi; // 크기
  RS.MessageSystem.Reg.Korean[21] = /\x1bR/gi;   // r
  RS.MessageSystem.Reg.Korean[22] = /\x1bT/gi; // t

  // Chinese Text Codes
  RS.MessageSystem.Reg.Chinese[0] = undefined;
  RS.MessageSystem.Reg.Chinese[1] = /(?:\x1bC|\x1b色)\[(.+?)\]/gi;   // 색
  RS.MessageSystem.Reg.Chinese[2] = /\x1b速度\[(\d+)\]/gi;    // 속도
  RS.MessageSystem.Reg.Chinese[3] = /\x1b轮廓颜色\[(.+?)\]/gi;  // 테두리색
  RS.MessageSystem.Reg.Chinese[4] = /\x1b轮廓宽度\[(\d+)\]/gi; // 테두리크기
  RS.MessageSystem.Reg.Chinese[5] = /\x1b缩进\[(\d+)\]/gi; // 들여쓰기
  RS.MessageSystem.Reg.Chinese[6] = /\x1b加粗!/gi; // 굵게
  RS.MessageSystem.Reg.Chinese[7] = /\x1b倾斜!/gi; // 이탤릭!
  RS.MessageSystem.Reg.Chinese[8] = /\x1b名字\<(.+?)\>/gi; // 이름
  RS.MessageSystem.Reg.Chinese[9] = /\x1b渐变颜色<(.+)>/gi; // 그레디언트
  RS.MessageSystem.Reg.Chinese[10] = /(?:\x1bP|\x1b队伍成员)\[(\d+)\]/gi; // 파티원
  RS.MessageSystem.Reg.Chinese[11] = /(?:\x1bN|\x1b角色)\[(\d+)\]/gi; // 주인공
  RS.MessageSystem.Reg.Chinese[12] = /(?:\x1bV|\x1b变量)\[(\d+)\]/gi; // 변수
  RS.MessageSystem.Reg.Chinese[13] = /(?:\x1bI|\x1b图标)\[(\d+)\]/g; // 아이콘
  RS.MessageSystem.Reg.Chinese[14] = /(?:\x1b{|\x1b增大)/gi;  // 확대
  RS.MessageSystem.Reg.Chinese[15] = /(?:\x1b{|\x1b减少)/gi; // 축소
  RS.MessageSystem.Reg.Chinese[16] = /(?:\x1bG|\x1b金币)/gi; // 골드
  RS.MessageSystem.Reg.Chinese[17] = /\x1b对话框\[(\d+)\]/gi; // 말풍선
  RS.MessageSystem.Reg.Chinese[18] = /\x1b对齐\[(\d+)]/gi; // 정렬자
  RS.MessageSystem.Reg.Chinese[19] = /\x1b数\[(\d+)\]/gi; // 숫자
  RS.MessageSystem.Reg.Chinese[20] = /\x1b大小\[(\d+)\]/gi; // 크기
  RS.MessageSystem.Reg.Chinese[21] = /\x1bR/gi;   // r
  RS.MessageSystem.Reg.Chinese[22] = /\x1bT/gi; // t

  RS.MessageSystem.initSystem = function () {
    var type = navigator.language;
    if(type.match(/ko/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Korean;
      RS.MessageSystem.Reg.defaultEscapeCode = RS.MessageSystem.Reg.KoreanEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Korean;
    }
    if(type.match(/zh/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Chinese;
      RS.MessageSystem.Reg.defaultEscapeCode = RS.MessageSystem.Reg.ChineseEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Chinese;
    }
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

  RS.MessageSystem.getKoreanColor = function(string) {
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
      return string;
    }
  };

  RS.MessageSystem.getChineseColor = function(string) {
    switch(string) {
      case '水色': case 'c_aqua':
      return Color.getColor(16776960);
      case '黑色': case 'c_black':
      return Color.getColor(0);
      case '蓝色': case 'c_blue':
      return Color.getColor(16711680);
      case '深灰色': case 'c_dkgray':
      return Color.getColor(4210752);
      case '紫红色': case 'c_fuchsia':
      return Color.getColor(16711935);
      case '灰色': case 'c_gray':
      return Color.getColor(8421504);
      case '绿色': case 'c_green':
      return Color.getColor(32768);
      case '浅绿色': case 'c_lime':
      return Color.getColor(65280);
      case '浅灰色': case 'c_ltgray':
      return Color.getColor(12632256);
      case '栗色': case 'c_maroon':
      return Color.getColor(128);
      case '绀青色': case 'c_navy':
      return Color.getColor(8388608);
      case '黄绿色': case 'c_olive':
      return Color.getColor(32896);
      case '橙黄色': case 'c_orange':
      return Color.getColor(4235519);
      case '紫色': case 'c_purple':
      return Color.getColor(8388736);
      case '红色': case 'c_red':
      return Color.getColor(255);
      case '银白色': case 'c_silver':
      return Color.getColor(12632256);
      case '水鸭色': case 'c_teal':
      return Color.getColor(8421376);
      case '白色': case 'c_white':
      return Color.getColor(16777215);
      case '黄色': case 'c_yellow':
      return Color.getColor(65535);
      case '通常': case 'c_normal':
      return Color.getBaseColor();
      default:
      return string;
    }
  };

  Color.gmColor = function(string) {
    var type = navigator.language;
    if(type.match(/ko/)) {
      return RS.MessageSystem.getKoreanColor(string);
    }
    if(type.match(/zh/)) {
      return RS.MessageSystem.getChineseColor(string);
    }
  };

  //============================================================================
  // Window_Base
  //============================================================================

  Window_Base.prototype.obtainEscapeCode = function(textState) {
    textState.index++;
    var regExp = RS.MessageSystem.Reg.defaultEscapeCode;
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

  Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
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
    }
  };

  /**
  * 윈도우 스킨 로딩이 완료되면 기본 색상 설정
  * @memberOf Window_Base
  * @method loadWindowskin
  */
  var alias_loadWindowskin = Window_Base.prototype.loadWindowskin;
  Window_Base.prototype.loadWindowskin = function() {
    alias_loadWindowskin.call(this);
    this.windowskin.addLoadListener(function() {
      Color.baseColor = this.textColor(0);
    }.bind(this));
  };

  Window_Base.prototype.makeFontSmaller = function() {
    if (this.contents.fontSize >= RS.MessageSystem.Params.minFontSize) {
      this.contents.fontSize -= 12;
    }
  };

  Window_Base.prototype.makeFontBigger = function() {
    if (this.contents.fontSize <= RS.MessageSystem.Params.maxFontSize) {
      this.contents.fontSize += 12;
    }
  };

  var alias_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    var regGroup = RS.MessageSystem.Reg.Group;
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
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
    return text;
  };

  //============================================================================
  // Bitmap
  //============================================================================

  var alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function(width, height) {
    alias_Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
    this.fontGradient = false;
  };

  Bitmap.prototype.setGradient = function(tWidth, color1, color2, color3) {
    var context = this._context;
    var gradient = context.createLinearGradient(0, 0, tWidth, 0);
    gradient.addColorStop('0', color1);
    gradient.addColorStop('0.6', color2);
    gradient.addColorStop('1', color3);
    return gradient;
  };

  Bitmap.prototype._makeFontNameText = function() {
    return (this.fontItalic ? 'Italic ' : '') + (this.fontBold ? 'bold ' : '') +
    this.fontSize + 'px ' + this.fontFace;
  };

  Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
    var context = this._context;
    if(this.fontGradient) {
      var gradient = this.setGradient(this.measureTextWidth(text),
      RS.MessageSystem.Params.gradientColor1,
      RS.MessageSystem.Params.gradientColor2,
      RS.MessageSystem.Params.gradientColor3);
      context.fillStyle = gradient;
    } else {
      context.fillStyle = this.textColor;
    }
    context.fillText(text, tx, ty, maxWidth);
    context.fillStyle = this.textColor;
  };

  //============================================================================
  // Game_Message
  //============================================================================

  var alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    alias_Game_Message_clear.call(this);
    this._waitTime = 0;
    this._gradientText = '';
    this._balloon = -2;
    this._align = 0;
    this._balloonPatternHeight = 0;
  };

  Game_Message.prototype.setWaitTime = function(time) {
    this._waitTime = time;
  };

  Game_Message.prototype.setGradientText = function(text) {
    this._gradientText = text;
  };

  Game_Message.prototype.getWaitTime = function() {
    return this._waitTime || 0;
  };

  Game_Message.prototype.getGradientText = function() {
    return this._gradientText;
  };

  Game_Message.prototype.getMaxLine = function() {
    return this._maxLine;
  };

  Game_Message.prototype.setMaxLine = function(n) {
    this._maxLine = RS.MessageSystem.Params.numVisibleRows = n;
  };

  Game_Message.prototype.setBalloon = function(n) {
    this._balloon = n;
  };

  Game_Message.prototype.getBalloon = function(n) {
    return this._balloon;
  };

  Game_Message.prototype.setAlign = function(n) {
    this._align = n;
  };

  Game_Message.prototype.getAlign = function(n) {
    return this._align;
  };

  Game_Message.prototype.getSpriteCharacter = function(owner) {
    var target, spriteItem = [];
    var scene = SceneManager._scene;
    if( (scene instanceof Scene_Map) ) {
      target = scene._spriteset;
      spriteItem = target._characterSprites.filter(function(i) {
        return i._character === owner;
      }, this);
    }
    return spriteItem[0];
  };

  Game_Message.prototype.getBattleEnemySprite = function (id) {
    var target, spriteItem = [];
    var scene = SceneManager._scene;
    if( (scene instanceof Scene_Battle) ) {
      target = scene._spriteset;
      spriteItem = target._enemySprites;
    }
    if(spriteItem[id]) return spriteItem[id];
  };

  Game_Message.prototype.getBattleActorSprite = function (id) {
    var target, spriteItem = [];
    var scene = SceneManager._scene;
    if( (scene instanceof Scene_Battle) ) {
      target = scene._spriteset;
      spriteItem = target._actorSprites;
    }
    if(spriteItem[id]) return spriteItem[id];
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
    var arr = /^<(.+)>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return 'Empty Text';
    }
  };

  var alias_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
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
      case textCode[tcGroup.ITALIC]:
      this.setTextItalic(!this.contents.fontItalic);
      break;
      case textCode[tcGroup.GRADIENT]:
      this.setTextGradient(textState);
      break;
      case textCode[tcGroup.TAB]:
      textState.x += this.textWidth("A") * RS.MessageSystem.Params.TabSize;
      break;
      case textCode[tcGroup.CARRIAGE_RETURN]:
      textState.x = 0;
      break;
      default:
      alias_Window_Message_processEscapeCharacter.call(this, code, textState);
    }
  };

  Window_Message.prototype.getDBData = function(ev) {
    try {
      return ev.name;
    } catch(e) {
      return "";
    }
  };

  Window_Message.prototype.setTextItalic = function() {
    this.contents.fontItalic = arguments[0];
  };

  Window_Message.prototype.setTextBold = function() {
    this.contents.fontBold = arguments[0];
  };

  Window_Message.prototype.setTextSize = function() {
    this.contents.fontSize = arguments[0];
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

  Window_Message.prototype.setTextGradient = function(textState) {
    this.contents.fontGradient = true;
    $gameMessage.setGradientText(this.obtainGradientText(textState));
    var c = $gameMessage.getGradientText();
    var w = this.textWidth(c);
    this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;
    this.contents.fontGradient = false;
  };

  Window_Message.prototype.resetFontSettings = function() {
    Window_Base.prototype.resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
    this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;
    this.contents.fontGradient = false;
    $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
  };

  Window_Message.prototype.standardFontSize = function() {
    return RS.MessageSystem.Params.fontSize;
  };

  Window_Message.prototype.numVisibleRows = function() {
    return RS.MessageSystem.Params.numVisibleRows;
  };

  Window_Message.prototype.processNormalCharacter = function(textState) {
    Window_Base.prototype.processNormalCharacter.call(this, textState);
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

    Window_Message.prototype.updatePlacement = function() {
      this._positionType = $gameMessage.positionType();
      if($gameMessage.getBalloon() === -2) {
        this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
      } else {
        this.updateBalloonPosition();
      }
      this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
    };

    var alias_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
      alias_Window_Message_updatePlacement.call(this);
      if(this._nameWindow.isOpen() || this.areSettingsChanged()) {
        this.updateNameWindow();
      }
    };

    var alias_Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
    Window_Message.prototype.convertEscapeCharacters = function(text) {
      var tcGroup = RS.MessageSystem.TextCodes.ENUM;
      var regGroup = RS.MessageSystem.Reg.Group;
      text = alias_Window_Message_convertEscapeCharacters.call(this, text);
      text = text.replace(regGroup[tcGroup.NAME], function() {
        this._nameWindow.drawName(arguments[1]);
        return '';
      }.bind(this));
      text = text.replace(regGroup[tcGroup.BALLOON], function() {
        $gameMessage.setBalloon(Number(arguments[1] || -2));
        return '';
      }.bind(this));
      text = text.replace(regGroup[tcGroup.ALIGN], function() {
        $gameMessage.setAlign(Number(arguments[1] || 0));
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

    Window_Message.prototype.updateNameWindow = function() {
      var self = this;
      this._nameWindow.x = this.x + this.newLineX() + RS.MessageSystem.Params.nameWindowX;
      if($gameMessage.positionType() === 0 && $gameMessage.getBalloon() === -2) {
        this._nameWindow.y = 0;
        this.y = this._nameWindow.height + RS.MessageSystem.Params.nameWindowY;
      } else {
        this._nameWindow.y = self.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;
      }
    };

    var alias_Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function() {
      alias_Window_Message_initialize.call(this);
      $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
      this.setHeight(RS.MessageSystem.Params.numVisibleRows);
      this.createNewContents();
    };

    Window_Message.prototype.needsNewPage = function(textState) {
      return (!this.isEndOfText(textState) && textState.y + textState.height > this.contentsHeight());
    };

    Window_Message.prototype.createNewContents = function() {
      this._newContents = new Sprite();
      this._newContents.x = 0;
      this._newContents.y = 0;
      this.addChild(this._newContents);
      return this._newContents;
    };

    Window_Message.prototype.removeNewContents = function() {
      if(this._newContents) this.removeChild(this._newContents);
    };

    Window_Message.prototype.newLineX = function() {
      if(/^Big_/i.exec( $gameMessage.faceName() ) ) {
        return ($gameMessage.faceIndex() > 0) ? 0 : RS.MessageSystem.Params.textStartX;
      } else {
        return (($gameMessage.faceName()) ? RS.MessageSystem.Params.faceStartOriginX : 0);
      }
    };

    Window_Message.prototype.drawBigFace = function(faceName) {
      this._newContents.bitmap = ImageManager.loadFace(faceName);
      this._newContents.y = (Graphics.boxHeight - this._faceBitmap.height) - this.y + RS.MessageSystem.Params.faceOY;

      if($gameMessage.faceIndex() > 0) {
        this._newContents.x = (Graphics.boxWidth - this._faceBitmap.width) - this.x + RS.MessageSystem.Params.faceOX;
      } else {
        this._newContents.x = this.x + RS.MessageSystem.Params.faceOX;
      }
    };

    Window_Message.prototype.drawMessageFace = function() {
      if(/^Big_/i.exec( $gameMessage.faceName() ) ) {
        this.drawBigFace($gameMessage.faceName());
      } else {
        this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
      }
    };

    var alias_Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
      // 부모 오브젝트가 있고, 설정이 참이라면, 큰 페이스칩을 뒷면에 표시한다.
      if(this.parent && RS.MessageSystem.Params.faceSide) this.setChildIndex( this._newContents, 0 );
      // 큰 페이스칩이 이미 설정되어있으면 메모리에서 제거한다.
      if(this._newContents.bitmap) this._newContents.bitmap = null;
      this.openBalloon( $gameMessage.getBalloon() );
      alias_Window_Message_newPage.call( this, textState );
    };

    Window_Message.prototype.startMessage = function() {
      this._textState = {};
      this._textState.index = 0;
      this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
      var tempText = this._textState.text.slice(0);
      this.calcBalloonRect(tempText);
      this.newPage(this._textState);
      this.updatePlacement();
      this.updateBackground();
      this.open();
    };

    var alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
      alias_Window_Message_startMessage.call(this);
      this.updateNameWindow();
      this.startWait(1);
    };

    Window_Message.prototype.openBalloon = function(sign) {

      if(sign === -2) {
        this.resizeMessageSystem();
        return;
      }

      this.setupOwner(sign);
      this.updateBalloonPosition();

    };

    Window_Message.prototype.resizeMessageSystem = function() {

      var n = $gameMessage.positionType();

      this.x = 0;
      this.y = n * (Graphics.boxHeight - this.windowHeight()) / 2;
      this.width = this.windowWidth();
      this.height = this.windowHeight();

      $gameMap.setMsgOwner($gamePlayer);

    };

    Window_Message.prototype.textProcessing = function(text) {
      var tcGroup = RS.MessageSystem.TextCodes.ENUM;
      var regGroup = RS.MessageSystem.Reg.Group;
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
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
      text = text.replace(regGroup[tcGroup.ICON],'');
      text = text.replace(regGroup[tcGroup.COLOR],'');
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
      text = text.replace(regGroup[tcGroup.TAB], function() {
        var arr = [];
        for(var i=0; i<RS.MessageSystem.Params.TabSize; i++) {
          arr.push(' ');
        }
        return arr.join("");
      }.bind(this));
      text = text.replace(regGroup[tcGroup.CARRIAGE_RETURN], '');
      return text;
    };

    Window_Message.prototype.calcBalloonRect = function(text) {
      var temp = text;
      var tempText = this.textProcessing(temp);
      tempText = tempText.split(/[\r\n]+/);
      tempText = tempText.sort(function(a, b) {
        return b.length - a.length;
      }.bind(this));
      var height = tempText.length * this.lineHeight() + this.standardPadding() * 2;
      this._bWidth = this.textWidth(tempText[0]) + this.standardPadding() * 2 || RS.MessageSystem.Params.WIDTH;
      if($gameMessage.faceName() !== '') {
        var min = this.fittingHeight(4);
        this._bWidth += this.newLineX() + this.standardPadding() * 2;
        if(height < min) height = height.clamp(min, height + (min - height));
      }
      this._bHeight = height;
    };

    Window_Message.prototype.updateBalloonPosition = function() {

      // -2 라면 이 함수를 처리하지 않습니다.
      if($gameMessage.getBalloon() === -2) {
        this.updatePlacement();
        return;
      };

      // 말풍선 소유자의 화면 좌표
      var mx = $gameMap.getMsgOwner().screenX();
      var my = $gameMap.getMsgOwner().screenY();
      var dx, dy, tileHeight;

      // 말풍선의 폭과 높이 범위 제한
      // this._bWidth = this._bWidth.clamp(RS.MessageSystem.Params.WIDTH, Graphics.boxWidth - RS.MessageSystem.Params.WIDTH);
      // this._bHeight = this._bHeight.clamp(RS.MessageSystem.Params.HEIGHT, Graphics.boxHeight - RS.MessageSystem.Params.HEIGHT);

      tileHeight = $gameMessage.getBalloonPatternHeight();
      dx =  mx - (this._bWidth / 2);
      dy =  my - this._bHeight - tileHeight;

      if(mx - (this._bWidth / 2) <= 0) {
        dx = 0;
        // this._downArrowSprite.move(this._width, h-q);
      }

      if(mx - (this._bWidth / 2) >= Graphics.boxWidth - this._bWidth ) {
        dx = Graphics.boxWidth - this._bWidth ;
      }

      if( (my - this._bHeight - tileHeight / 2) <= 0 ) {
        dy = my + tileHeight / 2;
      }

      // 말풍선 위치 및 크기 설정 (화면 내에 가두지 않습니다)
      this.x =  dx;
      this.y =  dy;
      this.width = this._bWidth;
      this.height = this._bHeight;

      // 1프레임 대기
      this.startWait(1);

    };

    var alias_Window_Message_refreshPauseSign = Window_Message.prototype._refreshPauseSign;
    Window_Message.prototype._refreshPauseSign = function() {

      // -2 라면 이 함수를 처리하지 않습니다.
      if($gameMessage.getBalloon() === -2) {
        return alias_Window_Message_refreshPauseSign.call(this);
      };

      var sx = 144;
      var sy = 96;
      var p = 24;
      this._windowPauseSignSprite.bitmap = this._windowskin;
      this._windowPauseSignSprite.anchor.x = 0.5;
      this._windowPauseSignSprite.anchor.y = 1;
      this._windowPauseSignSprite.move(this._width / 2, this._height);
      this._windowPauseSignSprite.setFrame(sx, sy, p, p);
      this._windowPauseSignSprite.alpha = 0;

    };

    var alias_Window_Message_updatePauseSign = Window_Message.prototype._updatePauseSign;
    Window_Message.prototype._updatePauseSign = function() {

      // -2 라면 이 함수를 처리하지 않습니다.
      if($gameMessage.getBalloon() === -2) {
        return alias_Window_Message_updatePauseSign.call(this);
      };

      var sprite = this._windowPauseSignSprite;
      var x = Math.floor(this._animationCount / 16) % 2;
      var y = Math.floor(this._animationCount / 16 / 2) % 2;
      var sx = 144;
      var sy = 96;
      var p = 24;
      if (!this.pause) {
        sprite.alpha = 0;
      } else if (sprite.alpha < 1) {
        sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
      }
      sprite.setFrame(sx+x*p, sy+y*p, p, p);
      sprite.visible = this.isOpen();

    };

    /**
    * @memberOf Window_Message
    * @method updateBalloonPosition
    */
    Window_Message.prototype.setupOwner = function(sign) {

      switch(sign) {
        case -1:
        $gameMap.setMsgOwner($gamePlayer);
        break;
        case 0:
        $gameMap.setMsgOwner($gameMap.getMsgEvent());
        break;
        default:
        $gameMap.setMsgOwner($gameMap.event(sign));
        break;
      }
    };

    var alias_Window_Message_standardFontFace = Window_Message.prototype.standardFontFace
    Window_Message.prototype.standardFontFace = function() {
      if(RS.MessageSystem.Params.customFont) {
        return RS.MessageSystem.Params.customFontName;
      } else {
        return alias_Window_Message_standardFontFace.call(this);
      }
    };

    Window_Message.prototype.standardBackOpacity = function() {
      return RS.MessageSystem.Params.backOpacity;
    };

    Window_Message.prototype.translucentOpacity = function() {
      return RS.MessageSystem.Params.translucentOpacity;
    };

    Window_Message.prototype.updateDefaultOpacity = function() {
      this.opacity = RS.MessageSystem.Params.defaultOpacity;
    };

    Window_Message.prototype.updateContentsOpacity = function() {
      this.contentsOpacity = RS.MessageSystem.Params.contentsOpacity;
    };

    var alias_Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
      alias_Window_Message_update.call(this);
      this.updateDefaultOpacity();
      this.updateContentsOpacity();
    };

    //============================================================================
    // Game_Interpreter
    //============================================================================

    Game_Interpreter.prototype.command101 = function() {
      if (!$gameMessage.isBusy()) {
        $gameMap.setMsgEvent(this.character((this._eventId > 0) ? 0 : -1));
        $gameMessage.setFaceImage(this._params[0], this._params[1]);
        $gameMessage.setBackground(this._params[2]);
        $gameMessage.setPositionType(this._params[3]);

        if(this.isMultiLine()) {
          this.multiLineAddMessage();
        } else {
          while (this.nextEventCode() === 401) {  // Text data
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

      while(this._lineHeight < $gameMessage.getMaxLine()) {
        while(this.nextEventCode() === 401) {
          this._index++;
          $gameMessage.add(this.currentCommand().parameters[0]);
          this.addLineHeight();
        }
        if(this.nextEventCode() !== 101) {
          break;
        }
      }
    };

    Game_Interpreter.prototype.initLineHeight = function() {
      this._lineHeight = 0;
    };

    Game_Interpreter.prototype.isMultiLine = function() {
      return $gameMessage.getMaxLine() > 4;
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
      this.openness = 0;

      // 스텐실 테스트를 거치지 않게 됩니다.
      this._isWindow = false;
    };

    RS.Window_Name.prototype.windowWidth = function() {
      return 140;
    };

    RS.Window_Name.prototype.windowHeight = function() {
      return this.fittingHeight(1);
    };

    RS.Window_Name.prototype.standardPadding = function() {
      return 18;
    };

    RS.Window_Name.prototype.getWidth = function(text) {
      try {
        var tempText = this.textProcessing(text);
        tempText = tempText.split(/[\r\n]/);
        tempText = tempText.sort(function(a, b) {
          return b.length - a.length;
        }.bind(this));
        this.width = this.textWidth(tempText[0]) + this.standardPadding() * 2;
      } catch(e) {
        this.width = this.windowWidth + this.standardPadding();
      }
    };

    RS.Window_Name.prototype.textProcessing = function(text) {
      var tcGroup = RS.MessageSystem.TextCodes.ENUM;
      var regGroup = RS.MessageSystem.Reg.Group;
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
      text = text.replace(regGroup[tcGroup.ICON],'');
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
      return text;
    };

    RS.Window_Name.prototype.refresh = function() {
      this.contents.clear();
      this.createContents();
      this.contents.fontSize = RS.MessageSystem.Params.fontSize;
      this.text = this.convertEscapeCharacters(this.text);
      this.text = this.textProcessing(this.text);
      this.drawText(this.text, 0, 0, this.width, 'left');
    };

    RS.Window_Name.prototype.drawName = function(text) {
      this.text = text;
      this.width = this.windowWidth();
      this.contents.fontSize = RS.MessageSystem.Params.fontSize;
      this.getWidth(this.text);
      this.open();
    };

    RS.Window_Name.prototype.open = function() {
      this.refresh();
      Window_Base.prototype.open.call(this);
    };

    RS.Window_Name.prototype.close = function() {
      Window_Base.prototype.close.call(this);
      this.changeTextColor(this.textColor(0));
    };

    //============================================================================
    // Game_Temp
    //============================================================================

    Game_Temp.prototype.setMSHeightFunc = function(func) {
      this._callMSHeightFunc = func;
    };

    Game_Temp.prototype.setMaxLine = function(n) {
      this._callMSHeightFunc(n);
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
      var sprite = $gameMessage.getSpriteCharacter(o);
      var n = (sprite) ? sprite.patternHeight() : this.tileHeight();
      $gameMessage.setBalloonPatternHeight(n);
    };

    Game_Map.prototype.getMsgEvent = function() {
      return this._msgEvent;
    };

    Game_Map.prototype.setMsgEvent = function(ev) {
      this._msgEvent = ev;
    };

    //============================================================================
    // Window_Message
    //============================================================================

    var alias_Window_Message_startMessage_setAlignCenter = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
      alias_Window_Message_startMessage_setAlignCenter.call(this);

      switch($gameMessage.getAlign()) {
        case 1:
        this.setAlignCenter(this._textState);
        break;
        case 2:
        this.setAlignRight(this._textState);
        break;
      }

    };

    Window_Message.prototype.calcTextWidth = function(text) {
      this.__textWidth = 0;
      var tempText = text;

      tempText = tempText.split(/[\n]+/);

      // 폭이 계산됩니다
      this.getTextWidth(tempText[0]);

      return this.__textWidth;
    };

    Window_Message.prototype.getTextWidth = function(text) {
      var tcGroup = RS.MessageSystem.TextCodes.ENUM;
      var regGroup = RS.MessageSystem.Reg.Group;
      text = text.replace(/\\/g, '\x1b');
      text = text.replace(/\x1b\x1b/g, '\\');
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
      text = text.replace(regGroup[tcGroup.ICON],function() {
        this.__textWidth += Window_Base._iconWidth;
        return '';
      }.bind(this));
      text = text.replace(regGroup[tcGroup.COLOR],'');
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
      text = text.replace(regGroup[tcGroup.TAB], function() {
        this.__textWidth += this.textWidth('A') * RS.MessageSystem.Params.TabSize;
      }.bind(this));
      text = text.replace(regGroup[tcGroup.CARRIAGE_RETURN], '');
      this.__textWidth += (this.textWidth(text) * 2);

      return text;
    };

    Window_Message.prototype.processNewLine = function(textState) {
      Window_Base.prototype.processNewLine.call(this, textState);
      // 텍스트를 정렬합니다
      switch($gameMessage.getAlign()) {
        case 1:
        this.setAlignCenter(this._textState);
        break;
        case 2:
        this.setAlignRight(this._textState);
        break;
      }
    };

    Window_Message.prototype.setAlignCenter = function(textState) {
      textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
      textState.x = ( this.newLineX() + this.contentsWidth() ) / 2 - textState.tx / 4;
      textState.left = textState.x;
    };

    Window_Message.prototype.setAlignRight = function(textState) {
      textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
      textState.x = ( this.contentsWidth() ) - textState.tx / 2;
      textState.left = textState.x;
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
      if(RS.MessageSystem.Params.customFont) {
        Graphics.loadFont(RS.MessageSystem.Params.customFontName, RS.MessageSystem.Params.customFontSrc);
      }
    };

    //===========================================================================
    // Game_Interpreter
    //===========================================================================

    var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      alias_pluginCommand.call(this, command, args);

      if(command === "Message" || command === "메시지") {
        switch (args[0]) {
          //-------------------------------------------------------------------------
          case 'textSpeed': case '텍스트속도':
          RS.MessageSystem.Params.textSpeed = Number(args[1]);
          break;
          //-------------------------------------------------------------------------
          case 'fontSize': case '폰트크기':
          RS.MessageSystem.Params.fontSize = Number(args[1]);
          break;
          //-------------------------------------------------------------------------
          case 'minFontSize': case '폰트최소크기':
          RS.MessageSystem.Params.minFontSize = Number(args[1]);
          break;
          //-------------------------------------------------------------------------
          case 'maxFontSize':  case '폰트최대크기':
          RS.MessageSystem.Params.maxFontSize = Number(args[1] || 96);
          break;
          //-------------------------------------------------------------------------
          case 'gradient':  case '그레디언트':
          RS.MessageSystem.Params.gradientColor1 = args[1] || Color.gmColor('기본색');
          RS.MessageSystem.Params.gradientColor2 = args[2] || Color.gmColor('기본색');
          RS.MessageSystem.Params.gradientColor3 = args[3] || Color.gmColor('기본색');
          break;
          //-------------------------------------------------------------------------
          case 'line': case '라인':
          $gameTemp.setMaxLine(Number(args[1] || 4));
          break;
          //-------------------------------------------------------------------------
          case 'textStartX': case '시작위치':
          RS.MessageSystem.Params.textStartX = Number(args[1]);
          break;
          //-------------------------------------------------------------------------
          case 'name': case '이름윈도우':
          switch (args[1].toLowerCase()) {
            case 'x':
            RS.MessageSystem.Params.nameWindowX = Number(args[2]);
            break;
            case 'y':
            RS.MessageSystem.Params.nameWindowX = Number(args[2]);
            break;
            case 'padding':
            RS.MessageSystem.Params.nameWindowStdPadding = Number(args[2]);
            break;
            default:
          }
          break;
          //-------------------------------------------------------------------------
          case 'faceOX': case '큰페이스칩X':
          RS.MessageSystem.Params.faceOX = Number(args[1]);
          break;
          //-------------------------------------------------------------------------
          case 'faceOY': case '큰페이스칩Y':
          RS.MessageSystem.Params.faceOY = Number(args[1]);
          break;
          //-------------------------------------------------------------------------
          case 'faceZ': case '큰페이스칩Z':
          if(Number(args[1] || 0) === -1) {
            RS.MessageSystem.Params.faceSide = true;
          } else {
            RS.MessageSystem.Params.faceSide = false;
          }
          break;
          //-------------------------------------------------------------------------
          case 'setTabSize': case '탭크기':
          RS.MessageSystem.Params.TabSize = Number(args[1]);
          break;
          case 'backgroundOpacity': case '배경투명도':
          RS.MessageSystem.Params.defaultOpacity = Number(args[1]);
          break;
          case 'contentsOpacity': case '컨텐츠투명도':
          RS.MessageSystem.Params.contentsOpacity = Number(args[1]);
          break;
          // End main switch
        }
        // End if
      }
      // End Function
    };

    RS.MessageSystem.initSystem();

})();
