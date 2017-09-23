/*:
* RS_MessageSystem.js
* @plugindesc (v0.1.9) Hangul Message System <RS_MessageSystem>
* @author biud436
*
* @param Font Size
* @type number
* @desc Specifies the text size as integer type.
* (default : 28)
* @default 28
*
* @param numVisibleRows
* @type number
* @desc Sets the number of rows to indicate in a message window.
* @default 4
* @min 1
*
* @param gradientColor1
* @desc Sets needed gradient color for the start point of the gradient text.
* @default #FFFFFF
*
* @param gradientColor2
* @desc Sets needed gradient color for the middle point of the gradient text.
* @default #F29661
*
* @param gradientColor3
* @desc Sets needed gradient color for the ended point of the gradient text.
* @default #CC3D3D
*
* @param Text Speed
* @type number
* @desc Sets the default text speed
* @default 0
* @min 0
*
* @param Text Min Size
* @type number
* @desc limits the text size by specifying the minimum text size when using the text code called '\}'.
* @default 24
*
* @param Text Max Size
* @type number
* @desc limits the text size by specifying the maximum text size when using the text code called '\{'.
* @default 96
*
* @param Text Start X
* @type number
* @desc The starting x position of the text in case of using a large face bitmap.
* @default 256
*
* @param Big Face OX
* @type number
* @desc Sets the large face bitmap's offset x
* @default 0
*
* @param Big Face OY
* @type number
* @desc Sets the large face bitmap's offset y
* @default 0
*
* @param Show Big Face Back
* @type boolean
* @desc Whether display a large face bitmap on the backside of the message window.
* @default false
* @on Can Display
* @off Can't Display
*
* @param Tab Size
* @type number
* @desc Sets the maximum width for tabs.
* @default 4
*
* @param back Opacity
* @type number
* @desc Sets the opacity of the message window for backgrounds.
* @default 192
*
* @param default Opacity
* @type number
* @desc Sets the default opacity of the message window.
* @default 255
*
* @param contents Opacity
* @type number
* @desc Sets the opacity of the message window for all contents.
* @default 255
*
* @param translucent Opacity
* @type number
* @desc Sets the translucent opacity of the message window.
* @default 160
*
* @param default outline width
* @type number
* @desc Specifies the maximum width for text borders.
* @default 2
*
* @param default outline Color
* @desc Specifies the color for text borders.
* @default rgba(0, 0, 0, 1.0)
*
* @param Default Windowskin
* @desc Specifies a window skin to message window
* @require 1
* @default Window
* @dir img/system/
* @type file
*
* @param Custom Font
*
* @param Using Custom Font
* @parent Custom Font
* @type boolean
* @desc Do you wish to use a custom font?
* @default false
*
* @param Custom Font Name
* @parent Custom Font
* @desc Specifies the name for fonts
* @default NanumBrush
*
* @param Custom Font Src
* @parent Custom Font
* @desc Specifies the file path for fonts
* @default fonts/NanumBrush.ttf
*
* @param Choice Window
*
* @param Choice Style
* @parent Choice Window
* @type select
* @desc Can change as the desired choice window style
* @default default
* @option RMXP Style
* @value RMXP
* @option Default Style
* @value default
*
* @param Name Window
*
* @param Name Windowskin
* @parent Name Window
* @desc Specifies a window skin for a name window
* @require 1
* @default Window
* @dir img/system/
* @type file
*
* @param Name Window X
* @parent Name Window
* @type number
* @desc Sets the name window's offset x by dx.
* @default 0
*
* @param Name Window Y
* @parent Name Window
* @type number
* @desc Sets the name window's offset y by dy.
* @default 0
*
* @param Name Window Inner Padding
* @parent Name Window
* @type number
* @desc Sets the name window's inner padding
* @default 10
*
* @param Name Window Position
* @parent Name Window
* @type select
* @desc The name window's position sets up as certain position in message window
* @default left
* @option Top of left (default)
* @value left
* @option Top of right
* @value right
*
* @param Text Code
* @type struct<TextCode>
* @desc Can change with desired text codes
* @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\"]","Chinese":"[\"色\",\"速度\",\"轮廓颜色\",\"轮廓宽度\",\"缩进\",\"加粗!\",\"倾斜!\",\"名字\",\"渐变颜色\",\"队伍成员\",\"角色\",\"变量\",\"图标\",\"增大!\",\"减少!\",\"金币\",\"对话框\",\"对齐\",\"数\",\"大小\",\"TAB!\",\"CR!\",\"音效播放\",\"显示图像\",\"隐藏图像\",\"道具\",\"武器\",\"装甲\",\"职业\",\"敌人\",\"状态\",\"技能\",\"脸\"]","English":"[\"COLOR\",\"TEXT_SPEED\",\"OUTLINE_COLOR\",\"OUTLINE_WIDTH\",\"INDENT\",\"BOLD!\",\"ITALIC!\",\"NAME\",\"GRADIENT\",\"PARTY_MEMBER\",\"PLAYER\",\"VAR\",\"ICON\",\"INCREASE!\",\"DECREASE!\",\"GOLD\",\"BALLOON\",\"ALIGN\",\"NUM\",\"TEXT_SIZE\",\"TAB!\",\"CR!\",\"PLAY_SE\",\"SHOW_PICTURE\",\"HIDE_PICTURE\",\"ITEM\",\"WEAPON\",\"ARMOR\",\"CLASSES\",\"ENEMY\",\"STATE\",\"SKILL\",\"FACE\"]"}
*
* @help
* =============================================================================
* Plugin Commands
* =============================================================================
*
* You can be available the plugin commands as follows.
*
* - The speed of the text is the fastest at 0, then you can specify as the frame units.
* Message textSpeed number
*
* Message fontSize number
* Message minFontSize number
* Message maxFontSize number
*
* - This plugin command allows you to change the color of the gradient text.
* 'color1' is the color of the start point of the gradient text.
* 'color2' is the color of the middle point of the gradient text.
* 'color3' is the color of the ended point of the gradient text.
* All colors must set as a string type the same as #FFFFFF
* Message gradient color1 color2 color3
*
* - This plugin command allows you to change the number of rows in the message window.
* Message line number
*
* - This plugin command allows you to change the starting x position of the text when using a large face bitmap.
* Message textStartX number
*
* - These plugin commands can set the name window's offset by x, y
* Message name x number
* Message name y number
* Message name padding number
* Message name windowskin skin_name
*
* - These plugin commands can set the large face bitmap's offset by dx, dy
* Message faceOX dx
* Message faceOY dy
*
* - This plugin command allows you to set whether display a large face bitmap on the backside of the message window.
* If you set the 'value' by 0, -1, it will display the bitmap on the backside of the message window.
* Otherwise, it will display it in a front in case of the 'value' is 1 or more.
* Message faceZ value
*
* - This plugin command allows you to set the maximum width for tabs.
* Message TabSize number
*
* Message backOpacity number
* Message contentsOpacity number
*
* Message windowskin skin_name
*
* =============================================================================
* Large Face Bitmap (Bust Image)
* =============================================================================
* Adding prefixes like "Big_" to names is a good way to immediately find out a
* bitmap for a bust from img/faces folder. So you place the image for a bust
* in your img/faces folder and then its file name must set up to start with 'Big_'
* Always make sure your resources name.
* =============================================================================
* Text code list (English)
* =============================================================================
* To use these text codes, you must set the system language setting as English.
*
* \color[color_name] - Specify the color name as you want it.
* \text_speed[x]
* \outline_color[color_name]
* \outline_width[x]
* \indent[x]
* \bold!
* \italic!
* \name<text> - Shows up the name window over the message window
* \name<text:left>
* \name<text:right>
* \gradient<text>
* \party_member[x]
* \player[x]
* \var[x]
* \icon[x]
* \increase!
* \decrease!
* \gold
* \balloon[0] - A balloon is set over the position of this event.
* \balloon[-1] - A balloon is set over the position of the game player.
* \balloon[id] - A balloon is set over the position of certain event.
* \align[0] - left
* \align[1] - center
* \align[2] - right
* \num[x] - formatted number
* \text_size[x]
* \tab! - the tab size is to 8
* \cr!
* \play_se[name]
* \show_picture<picid, picname, origin, x, y>
* \hide_picture[picid]
* \item[x]
* \weapon[x]
* \armor[x]
* \classes[x]
* \enemy[x]
* \state[x]
* \skill[x]
* \face<facename, faceindex>
*
* =============================================================================
* Color list (English)
* =============================================================================
* To use these colors, you must set the language setting as English.
*
* Built in color lists are :
*
* \color[AQUA]
*
* AQUA
* BLACK
* BLUE
* DKGRAY
* FUCHSIA
* GRAY
* GREEN
* LIME
* LTGRAY
* MAROON
* OLIVE
* NAVY
* ORANGE
* PURPLE
* RED
* SILVER
* TEAL
* WHITE
* YELLOW
* NORMAL
*
* The Web colors can use the same as :
* \color[#FFFFFF]
*
* =============================================================================
* Text code list (Korean)
* =============================================================================
* To use these text codes, you must set the language setting as Korean.
*
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
* \확대!
* \축소!
* \골드
* \말풍선[이벤트의 ID]
* \말풍선[0]
* \말풍선[-1]
* \정렬자[1]
* \정렬자[2]
* \숫자[숫자]
* \크기[숫자]
* \탭! : 탭의 크기는 8 입니다.
* \캐리지리턴! : X를 시작 위치로 되돌립니다.
* \효과음<효과음명>
* \그림표시<그림번호, 그림이름, 원점번호, X좌표, Y좌표>
* \그림제거[그림번호]
* \아이템[번호]
* \무기구[번호]
* \방어구[번호]
* \직업[번호]
* \적군[번호]
* \상태[번호]
* \스킬[번호]
* \얼굴<페이스칩 이름, 페이스칩 인덱스>
*
* =============================================================================
* Color list (Korean)
* =============================================================================
* To use these colors, you must set the language setting as Korean.
*
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
* Text code list (Chinese)
* =============================================================================
* To use these text codes, you must set the language setting as Chinese (zh)
*
* \色[文本]
* \速度[值]
* \大小[值]
* \轮廓颜色[颜色的名]
* \轮廓宽度[大小]
* \缩进[值]
* \加粗!
* \倾斜!
* \名字<文本>
* \渐变颜色<文本>
* \队伍成员[号码]
* \角色[号码]
* \变量[号码]
* \图标[号码]
* \增大!
* \减少!
* \金币
* \对话框[EventID]
* \对话框[0]
* \对话框[-1]
* \对齐[1] (居中对齐)
* \对齐[2] (右对齐)
* \数[值]
* \音效播放<sound name>
* \显示图像<号码, picture name, origin, x, y>
* \隐藏图像[号码]
* \道具[号码]
* \武器[号码]
* \装甲[号码]
* \职业[号码]
* \敌人[号码]
* \状态[号码]
* \技能[号码]
* \脸<faceName, faceIndex>
* \TAB!
* \CR!
*
* =============================================================================
* Color list (Chinese)
* =============================================================================
* To use these colors, you must set the language setting as Chinese.
*
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
*
* =============================================================================
* Version Log
* =============================================================================
* 2017.09.23 (v0.1.9) - Fixed the issue that is not changed the background type.
* 2017.07.21 (v0.1.8) :
* - Fixed the issue that the value couldn't set with 0 in the opacity parameter.
* - Fixed a bug that the alignment is not processing in a newly line
* - Added a feature that changes the window skin.
* - Added a feature that changes the name window positions.
* - Added a new text code that can change as a different face image during to draw a text.
* - Added a feature that can change as a different text code.
* - Fixed the bugs with TAB and CR text codes are not working, and even their name.
* - Added a feature that can change the style with a choice window.
* 2017.06.04 (v0.1.7) - Fixed the issue that is not changed the y-position for a name window
* 2017.05.27 (v0.1.6) :
* - In the balloon window mode, Added a new feature that the pause sign sprite
* displays as the position of an message owner.
* - In the balloon window mode, Added a new feature that the name window is
* located up at the bottom of the message window when indicating the message
* window at the top of the screen.
* - Fixed an issue that the name window moves up a little bit to the right when
* setting up the face image inside a message window.
* 2017.02.18 (v0.1.5) :
* - Fixed the problem that has incorrect a range for Hangul Unicode.
* - Added a feature that plays back a sound files
* - Added a feature that displays and removes a picture
* - Added a feature that the text code converted as names of an item in Database.
* - Fixed the function that calculates the maximum width of the text when using the alignment feature.
* 2016.11.27 (v0.1.4) : Fixed the issue that the value couldn't set to 0 in plugin commands
* 2016.11.12 (v0.1.3) - Added the features with changing a custom font and background opacity values
* 2016.10.12 (v0.1.2) - Now it is possible to use a non-standard sprites in the popup window.
* 2016.09.19 (v0.1.1) - Improved the feature with a text alignment.
* 2016.06.18 (v0.1.0) - Fixed the mask issue in a name window.
* 2016.03.21 (v0.0.9) - Added text codes for tap and carriage return escape characters.
* 2016.03.01 (v0.0.8) :
* - Added a feature that can indicate a face image into message window for popup message mode
* - Fixed the bugs with plugin commands
* 2016.02.27 (v0.0.7) - Added a feature that texts are set as currency format.
* 2016.02.15 (v0.0.6) - Added a feature with a text alignment
* 2016.01.18 (v0.0.5) - Fixed an issue with positioning the message window and calculating its bounding rect incorrectly.
* 2016.01.01 (v0.0.4) - Fixed an issue with resizing the message. (resizeMessageSystem)
* 2015.12.03 (v0.0.3) - Added a feature with a popup message
* 2015.12.02 (v0.0.2) - Added a feature for large face image.
* 2015.12.01 (v0.0.1) - First Release
*/
/*~struct~TextCode:
 *
 * @param Korean
 * @type string[]
 * @desc Can specify the desired text code as Korean.
 * (This will be used when the system language is in Korean)
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴"]
 *
 * @param Chinese
 * @type string[]
 * @desc Can specify the desired text code as Chinese
 * (This will be used when the system language is in Chinese)
 * @default ["色","速度","轮廓颜色","轮廓宽度","缩进","加粗!","倾斜!","名字","渐变颜色","队伍成员","角色","变量","图标","增大!","减少!","金币","对话框","对齐","数","大小","TAB!","CR!","音效播放","显示图像","隐藏图像","道具","武器","装甲","职业","敌人","状态","技能","脸"]
 *
 * @param English
 * @type string[]
 * @desc Can specify the desired text code as English
 * (This will be used when the system language is to English)
 * @default ["COLOR","TEXT_SPEED","OUTLINE_COLOR","OUTLINE_WIDTH","INDENT","BOLD!","ITALIC!","NAME","GRADIENT","PARTY_MEMBER","PLAYER","VAR","ICON","INCREASE!","DECREASE!","GOLD","BALLOON","ALIGN","NUM","TEXT_SIZE","TAB!","CR!","PLAY_SE","SHOW_PICTURE","HIDE_PICTURE","ITEM","WEAPON","ARMOR","CLASSES","ENEMY","STATE","SKILL","FACE"]
 *
 */
/*:ko
* RS_MessageSystem.js
* @plugindesc (v0.1.9) 한글 메시지 시스템 <RS_MessageSystem>
* @author 러닝은빛(biud436)
*
* @param 글꼴 크기
* @type number
* @desc 글꼴의 크기를 정수로 지정하세요
* 기본 값 : 28
* @default 28
*
* @param 라인 갯수
* @type number
* @desc 라인 갯수
* @default 4
* @min 1
*
* @param 그레디언트 시작 색상
* @desc 그레디언트 시작 색상
* @default #FFFFFF
*
* @param 그레디언트 중간 색상
* @desc 그레디언트 중간 색상
* @default #F29661
*
* @param 그레디언트 끝 색상
* @desc 그레디언트 끝 색상
* @default #CC3D3D
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
* @param 텍스트 시작 X
* @type number
* @desc 큰 페이스칩이 설정되어있을 때 텍스트 시작 좌표를 정수로 기입하세요.
* @default 256
*
* @param 큰 페이스칩 OX
* @type number
* @desc 큰 페이스칩의 오프셋 X
* @default 0
*
* @param 큰 페이스칩 OY
* @type number
* @desc 큰 페이스칩의 오프셋 Y
* @default 0
*
* @param 대화창 뒤에 얼굴 표시
* @type boolean
* @desc 큰 페이스칩을 메시지창의 뒷면에 표시합니다.
* 예 - true   아니오 - false
* @default false
* @on 대화창 뒤에
* @off 대화창을 가림
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
* @param 텍스트 코드
* @type struct<TextCode>
* @desc 텍스트 코드 변경
* @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\"]","Chinese":"[\"色\",\"速度\",\"轮廓颜色\",\"轮廓宽度\",\"缩进\",\"加粗!\",\"倾斜!\",\"名字\",\"渐变颜色\",\"队伍成员\",\"角色\",\"变量\",\"图标\",\"增大!\",\"减少!\",\"金币\",\"对话框\",\"对齐\",\"数\",\"大小\",\"TAB!\",\"CR!\",\"音效播放\",\"显示图像\",\"隐藏图像\",\"道具\",\"武器\",\"装甲\",\"职业\",\"敌人\",\"状态\",\"技能\",\"脸\"]","English":"[\"COLOR\",\"TEXT_SPEED\",\"OUTLINE_COLOR\",\"OUTLINE_WIDTH\",\"INDENT\",\"BOLD!\",\"ITALIC!\",\"NAME\",\"GRADIENT\",\"PARTY_MEMBER\",\"PLAYER\",\"VAR\",\"ICON\",\"INCREASE!\",\"DECREASE!\",\"GOLD\",\"BALLOON\",\"ALIGN\",\"NUM\",\"TEXT_SIZE\",\"TAB!\",\"CR!\",\"PLAY_SE\",\"SHOW_PICTURE\",\"HIDE_PICTURE\",\"ITEM\",\"WEAPON\",\"ARMOR\",\"CLASSES\",\"ENEMY\",\"STATE\",\"SKILL\",\"FACE\"]"}
*
* @help
* 이 플러그인은 복잡한 텍스트 코드가 아닌 한글 단어로 직관적으로 텍스트 코드를 호출하기
* 위해 개발된 것입니다. 제법 자유로운 라이센스를 따르고 있기 때문에 저작권 자를 따로
* 표시할 필요도 없고 소스 코드를 허락 없이 수정해도 상관 없습니다. 심도있게 테스트를
* 하진 않았기 때문에 버그가 있을 수 있지만, 버그는 언제든지 수정될 수 있습니다.
*
* 버그를 발견하신 분들은 게시 사이트의 댓글이나 메일을 통해 피드백 부탁 드립니다.
*
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
* 메시지 이름윈도우 x number
* 메시지 이름윈도우 y number
* 메시지 이름윈도우 padding number
* 메시지 이름윈도우 윈도우스킨 skin_name
*
* 메시지 큰페이스칩X number
* 메시지 큰페이스칩Y number
*
* number가 -1이면 메시지 창이 페이스칩을 가리고, 다른 값이면 가리지 않습니다:
* 메시지 큰페이스칩Z number
*
* 메시지 탭크기 number
* 메시지 배경투명도 number
* 메시지 컨텐츠투명도 number
*
* 메시지 윈도우스킨 skin_name
*
* =============================================================================
* 큰 페이스칩 설정
* =============================================================================
* 페이스칩을 img/faces 에 넣고 페이스칩의 이름을 Big_ 으로 시작하게 하면 됩니다.
*
* 단, 선택 창이 왼쪽 위에 놓으면 페이스칩이 메시지 창의 왼쪽에 표시됩니다.
* (아닌 경우에는 오른쪽에 표시할 것입니다)
*
* - 페이스칩이 메시지 창에 가려지게 설정하려면 플러그인 매개변수 값을 바꾸세요.
* - [없는 기능] 자동으로 화면 크기에 맞게 조절하는 고급 기능은 없습니다.
* - [없는 기능] 자동으로 메시지 윈도우와의 간격을 맞춰주진 않습니다.
* - [없는 기능] 메시지 윈도우 와의 간격을 조절하는 플러그인 커맨드는 있습니다.
* - [없는 기능] 페이스칩을 다른 것으로 변경하는 텍스트 코드는 없습니다.
* - [애드온] 페이스칩이 이동 애니메이션을 넣는 애드온은 있습니다.
* - 다른 사람이 만든 애드온을 쓰고 싶으면 이 플러그인보다 아래에 넣으세요.
*
* =============================================================================
* 텍스트 코드(Text Code)
* =============================================================================
*
* 다양한 색상 코드를 사용할 수 있습니다. 미리 입력된 색을 사용할 수도 있고 웹 색상을
* 설정할 수도 있습니다. 이것은 최상위 클래스에 정의되므로 어느 창에서나 사용할 수 있습니다.
* 다만 텍스트 코드를 처리하는 창에서만 사용해야 합니다:
*
*   \색[색상명]
*   \테두리색[색상명]
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
*
* 그레디언트 텍스트를 만드는 텍스트 코드입니다. 기본 색상 값은 플러그인 매개변수에서
* 변경이 가능합니다. 다만 세밀한 설정은 코드 상에 하드코딩되어있으므로 디자인이 좋지 않아
* 보여도 수정할 수가 없을 수 있습니다.
*
*   \그레디언트<텍스트>
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
* 텍스트를 굵게 하거나, 기울임 꼴로 바꿀 수 있는 텍스트 코드입니다.
* HTML의 <B>와 <I>에서 아이디어를 얻었기 때문에 "\굵게!텍스트\굵게!"와 같은 식으로
* 작성해야 다음 글자가 일반적으로 표시됩니다.
*
*   \굵게!
*   \이탤릭!
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
* \말풍선[이벤트의 ID]
* \말풍선[0]
* \말풍선[-1]
*
* 왼쪽, 중앙 또는 오른쪽에 텍스트를 정렬할 수 있습니다. 기본적으로 스택이 쌓이므로,
* 각 라인 마다 한 번씩만 사용하시기 바랍니다.
*
*   \정렬자[0]
*   \정렬자[1]
*   \정렬자[2]
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
*   \얼굴<얼굴_이미지_이름, 얼굴_이미지_인덱스>
*
* =============================================================================
* 색상(Colors)
* =============================================================================
* 미리 작성된 색상 목록입니다. 이 목록에 없는 경우에는 웹 색상으로 색상 값을 찾습니다.
* 따라서 기본적으로 많은 색상 값을 사용할 수 있습니다.
*
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
* 2017.09.23 (v0.1.9) - 배경 타입이 바뀌지 않는 문제를 수정했습니다.
* 2017.07.23 (v0.1.8) :
* - 투명도 매개변수를 0으로 설정할 수 없는 문제를 수정했습니다.
* - 새로운(또는 다음) 라인으로 넘어갈 때 정렬 텍스트 코드가 제대로 동작하지 않는 문제를 수정했습니다.
* - 문장을 왼쪽으로 정렬하는 텍스트 코드를 추가했습니다.
* - 이름 윈도우 또는 대화창의 기본 윈도우 스킨을 변경할 수 있습니다.
* - 이름 윈도우의 표시 위치를 왼쪽 또는 오른쪽으로 바꿀 수 있습니다.
* - 얼굴 이미지를 중간에 변경할 수 있는 새로운 텍스트 코드를 추가했습니다.
* - 텍스트 코드를 원하는 이름으로 변경할 수 있는 기능을 추가했습니다.
* - 캐리지 리턴과 탭의 버그를 수정했으며 텍스트 코드도 충돌로 인해 다른 이름으로 변경했습니다.
* - 선택지 윈도우의 스타일을 변경할 수 있습니다.
* 2017.06.04 (v0.1.7) - 이름 윈도우의 Y좌표가 수정이 되지 않는 문제를 수정했습니다.
* 2017.05.27 (v0.1.6) :
* - 말풍선 모드 시 멈춤 표시 스프라이트 위치를 화자의 위치로 자동 변경합니다.
* - 말풍선 모드 시 대화창이 상단에 있을 때 이름 윈도우를 아래에 표시합니다.
* - 얼굴 이미지가 설정되었을 때 이름 윈도우가 오른쪽으로 이동하는 현상을 제거했습니다.
* 2017.02.18 (v0.1.5) :
* - 한글 유니코드 범위가 잘못되어있던 문제 수정
* - 효과음 재생 기능 추가
* - 그림 표시 기능 추가
* - 그림 제거 기능 추가
* - 데이터베이스 항목 표시 기능 추가
* - 정렬자 함수의 텍스트 폭 계산 함수 수정
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
/*~struct~TextCode:ko
 *
 * @param Korean
 * @type string[]
 * @desc 시스템 언어가 한국어(우리나라 말)일 경우에만 동작합니다.
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴"]
 *
 * @param Chinese
 * @type string[]
 * @desc 시스템 언어가 중국어로 설정되어있을 때에만 동작합니다
 * @default ["色","速度","轮廓颜色","轮廓宽度","缩进","加粗!","倾斜!","名字","渐变颜色","队伍成员","角色","变量","图标","增大!","减少!","金币","对话框","对齐","数","大小","TAB!","CR!","音效播放","显示图像","隐藏图像","道具","武器","装甲","职业","敌人","状态","技能","脸"]
 *
 * @param English
 * @type string[]
 * @desc 시스템 언어가 '영어'로 설정되어있을 때에만 동작합니다.
 * @default ["COLOR","TEXT_SPEED","OUTLINE_COLOR","OUTLINE_WIDTH","INDENT","BOLD!","ITALIC!","NAME","GRADIENT","PARTY_MEMBER","PLAYER","VAR","ICON","INCREASE!","DECREASE!","GOLD","BALLOON","ALIGN","NUM","TEXT_SIZE","TAB!","CR!","PLAY_SE","SHOW_PICTURE","HIDE_PICTURE","ITEM","WEAPON","ARMOR","CLASSES","ENEMY","STATE","SKILL","FACE"]
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

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MessageSystem>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  /**
   * @method popParameter
   */
  RS.MessageSystem.popParameter = function () {
    var k = Object.keys(arguments);
    var lastUsed = "";
    while(k.length > 0) {
      lastUsed = arguments[parseInt(k.pop())];
      if(parameters[lastUsed]) return parameters[lastUsed];
    }
    return "";
  };

  RS.MessageSystem.Reg = RS.MessageSystem.Reg || {};
  RS.MessageSystem.Reg.Default = RS.MessageSystem.Reg.Default || [];
  RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Group || [];
  RS.MessageSystem.Reg.Korean = RS.MessageSystem.Reg.Korean || [];
  RS.MessageSystem.Reg.Chinese = RS.MessageSystem.Reg.Chinese || [];
  RS.MessageSystem.Reg.English = RS.MessageSystem.Reg.English || [];
  RS.MessageSystem.TextCodes = RS.MessageSystem.TextCodes || {};

  RS.MessageSystem.Params = RS.MessageSystem.Params || {};

  RS.MessageSystem.Params.fontSize = Number(RS.MessageSystem.popParameter('Font Size', "글꼴 크기") || 28);
  RS.MessageSystem.Params.textSpeed = Number(RS.MessageSystem.popParameter('Text Speed', "기본 텍스트 출력 속도") || 0);
  RS.MessageSystem.Params.minFontSize = Number(RS.MessageSystem.popParameter('Text Min Size', "폰트 최소 크기") || 24);
  RS.MessageSystem.Params.maxFontSize = Number(RS.MessageSystem.popParameter('Text Max Size', "폰트 최대 크기") || 96);
  RS.MessageSystem.Params.textStartX = Number(RS.MessageSystem.popParameter('Text Start X', "텍스트 시작 X"));
  RS.MessageSystem.Params.faceStartOriginX = 168;
  RS.MessageSystem.Params.numVisibleRows  = Number(RS.MessageSystem.popParameter('numVisibleRows', "라인 갯수") || 4);
  RS.MessageSystem.Params.gradientColor1 = String(RS.MessageSystem.popParameter('gradientColor1', "그레디언트 시작 색상") || '#FFFFFF');
  RS.MessageSystem.Params.gradientColor2 = String(RS.MessageSystem.popParameter('gradientColor2', "그레디언트 중간 색상") || '#F29661');
  RS.MessageSystem.Params.gradientColor3 = String(RS.MessageSystem.popParameter('gradientColor3', "그레디언트 끝 색상") || '#CC3D3D');
  RS.MessageSystem.Params.nameWindowX = Number(RS.MessageSystem.popParameter('Name Window X', "이름 윈도우 X") || 0);
  RS.MessageSystem.Params.nameWindowY = Number(RS.MessageSystem.popParameter('Name Window Y', "이름 윈도우 Y") || 0);
  RS.MessageSystem.Params.nameWindowStdPadding = Number(RS.MessageSystem.popParameter('Name Window Inner Padding', "이름 윈도우 안쪽 여백") || 18);
  RS.MessageSystem.Params.namePositionTypeAtX = RS.MessageSystem.popParameter("Name Window Position", "이름 윈도우 위치") || "left";
  RS.MessageSystem.Params.faceOX = Number(RS.MessageSystem.popParameter('Big Face OX', "큰 페이스칩 OX") || 0);
  RS.MessageSystem.Params.faceOY = Number(RS.MessageSystem.popParameter('Big Face OY', "큰 페이스칩 OY") || 0);
  RS.MessageSystem.Params.faceSide = Boolean(RS.MessageSystem.popParameter('Show Big Face Back', "대화창 뒤에 얼굴 표시") === 'true'|| false);
  RS.MessageSystem.Params.FONT_SIZE = 28;
  RS.MessageSystem.Params.STD_PADDING = 18;
  RS.MessageSystem.Params.WIDTH = (RS.MessageSystem.Params.FONT_SIZE * 6) + RS.MessageSystem.Params.STD_PADDING;
  RS.MessageSystem.Params.HEIGHT = RS.MessageSystem.Params.FONT_SIZE + (RS.MessageSystem.Params.STD_PADDING / 2);
  RS.MessageSystem.Params.TabSize = Number(RS.MessageSystem.popParameter('Tab Size', "탭 크기"));

  RS.MessageSystem.Params.backOpacity = Number(RS.MessageSystem.popParameter('back Opacity', "배경 그림의 투명도"));
  RS.MessageSystem.Params.translucentOpacity = Number(RS.MessageSystem.popParameter('translucent Opacity', "반투명도"));
  RS.MessageSystem.Params.defaultOpacity = Number(RS.MessageSystem.popParameter('default Opacity', "기본 투명도"));
  RS.MessageSystem.Params.contentsOpacity = Number(RS.MessageSystem.popParameter('contents Opacity', "내용의 투명도"));
  RS.MessageSystem.Params.defaultOutlineWidth = Number(RS.MessageSystem.popParameter('default outline width', "테두리 크기"));
  RS.MessageSystem.Params.defaultOutlineColor = RS.MessageSystem.popParameter('default outline Color', "테두리 색상") || 'white';

  RS.MessageSystem.Params.customFont = Boolean(RS.MessageSystem.popParameter('Using Custom Font', "사용자 지정 폰트 사용 여부") === 'true');
  RS.MessageSystem.Params.customFontName = String(RS.MessageSystem.popParameter('Custom Font Name', "사용자 지정 폰트명") || 'GameFont' );
  RS.MessageSystem.Params.customFontSrc = String(RS.MessageSystem.popParameter('Custom Font Src', "사용자 지정 폰트 경로") || 'fonts/mplus-1m-regular.ttf');

  RS.MessageSystem.Params.windowskin = RS.MessageSystem.popParameter('Default Windowskin', "기본 윈도우스킨") || 'Window';
  RS.MessageSystem.Params.windowskinForNameWindow = RS.MessageSystem.popParameter('Name Windowskin', "이름 윈도우스킨") || 'Window';

  RS.MessageSystem.Params.choiceWindowStyle = String(RS.MessageSystem.popParameter('Choice Style', "선택지 스타일") || 'default');
  RS.MessageSystem.Params.isTempSpriteContainerVisibility = false;

  //============================================================================
  // Multiple Language supports
  //============================================================================

  RS.MessageSystem.Reg.KoreanEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[가-ퟻ]+[!]*/i;
  RS.MessageSystem.Reg.ChineseEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[一-鼣]+[!]*/i;
  RS.MessageSystem.Reg.EnglishEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[A-Z]+[!]*/i;
  RS.MessageSystem.Reg.defaultEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[가-ퟻ]+[!]*/i;

  RS.MessageSystem.TextCodes = (function() {
    'use strict';
    var rowData = RS.MessageSystem.popParameter('Text Code', "텍스트 코드");
    var data = JSON.parse(rowData);
    var retData = {};
    retData.Korean = [undefined].concat(JSON.parse(data.Korean));
    retData.Chinese = [undefined].concat(JSON.parse(data.Chinese));
    retData.English = [undefined].concat(JSON.parse(data.English));
    return retData;
  }());

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
    FACE: 33
  };

  RS.MessageSystem.getTextCode = function (idx) {
    if(!!navigator.language.match(/ko/)) {
      return RS.MessageSystem.TextCodes['Korean'][idx];
    }
    if(!!navigator.language.match(/zh/)) {
      return RS.MessageSystem.TextCodes['Chinese'][idx];
    }
    if(!!navigator.language.match(/en/)) {
      return RS.MessageSystem.TextCodes['English'][idx];
    }
    return RS.MessageSystem.TextCodes['English'][idx];
  };

  (function() {
    'use strict';
    var regData = ["Korean", "English", "Chinese"];
    regData.forEach(function (e, i, a) {
      var tcGroup = RS.MessageSystem.TextCodes[e];
      tcGroup = tcGroup.map(function (e, i, a) {
        if(e === undefined) return;
        var data = [];
        var ret = "";
        for (var str of e) {
          data.push('\\u' + str.charCodeAt().toString(16));
        }
        ret = data.join("");
        return ret;
      }, this);
      RS.MessageSystem.Reg[e][0] = undefined;
      RS.MessageSystem.Reg[e][1] = new RegExp(`(?:\x1bC|\x1b${tcGroup[1]})\\[(.+?)\\]`, 'gi');   // 색
      RS.MessageSystem.Reg[e][2] = new RegExp(`\x1b${tcGroup[2]}\\[(\\d+)\\]`, 'gi');    // 속도
      RS.MessageSystem.Reg[e][3] = new RegExp(`\x1b${tcGroup[3]}\\[(.+?)\\]`, 'gi');  // 테두리색
      RS.MessageSystem.Reg[e][4] = new RegExp(`\x1b${tcGroup[4]}\\[(\\d+)\\]`, 'gi'); // 테두리크기
      RS.MessageSystem.Reg[e][5] = new RegExp(`\x1b${tcGroup[5]}\\[(\\d+)\\]`, 'gi'); // 들여쓰기
      RS.MessageSystem.Reg[e][6] = new RegExp(`\x1b${tcGroup[6]}`, 'gi'); // 굵게!
      RS.MessageSystem.Reg[e][7] = new RegExp(`\x1b${tcGroup[7]}`, 'gi'); // 이탤릭!
      RS.MessageSystem.Reg[e][8] = new RegExp(`\x1b${tcGroup[8]}\\<(.+?)\\>`, 'gi'); // 이름
      RS.MessageSystem.Reg[e][9] = new RegExp(`\x1b${tcGroup[9]}\\<(.+)\\>`, 'gi'); // 그레디언트
      RS.MessageSystem.Reg[e][10] = new RegExp(`(?:\x1bP|\x1b${tcGroup[10]})\\[(\\d+)\\]`, 'gi'); // 파티원
      RS.MessageSystem.Reg[e][11] = new RegExp(`(?:\x1bN|\x1b${tcGroup[11]})\\[(\\d+)\\]`, 'gi'); // 주인공
      RS.MessageSystem.Reg[e][12] = new RegExp(`(?:\x1bV|\x1b${tcGroup[12]})\\[(\\d+)\\]`, 'gi'); // 변수
      RS.MessageSystem.Reg[e][13] = new RegExp(`(?:\x1bI|\x1b${tcGroup[13]})\\[(\\d+)\\]`, 'g'); // 아이콘
      RS.MessageSystem.Reg[e][14] = new RegExp(`(?:\x1b{|\x1b${tcGroup[14]})`, 'gi');  // 확대!
      RS.MessageSystem.Reg[e][15] = new RegExp(`(?:\x1b}|\x1b${tcGroup[15]})`, 'gi'); // 축소!
      RS.MessageSystem.Reg[e][16] = new RegExp(`(?:\x1bG|\x1b${tcGroup[16]})`, 'gi'); // 골드
      RS.MessageSystem.Reg[e][17] = new RegExp(`\x1b${tcGroup[17]}\\[(.*?)\\]`, 'gi'); // 말풍선
      RS.MessageSystem.Reg[e][18] = new RegExp(`\x1b${tcGroup[18]}\\[(\\d+)\\]`, 'gi'); // 정렬자
      RS.MessageSystem.Reg[e][19] = new RegExp(`\x1b${tcGroup[19]}\\[(\\d+)\\]`, 'gi'); // 숫자
      RS.MessageSystem.Reg[e][20] = new RegExp(`\x1b${tcGroup[20]}\\[(\\d+)\\]`, 'gi'); // 크기
      RS.MessageSystem.Reg[e][21] = new RegExp(`\x1b${tcGroup[21]}`, 'gi');   // r
      RS.MessageSystem.Reg[e][22] = new RegExp(`\x1b${tcGroup[22]}`, 'gi'); // t
      RS.MessageSystem.Reg[e][23] = new RegExp(`\x1b${tcGroup[23]}\\<(.+?)\\>`, 'gi');  // 효과음
      RS.MessageSystem.Reg[e][24] = new RegExp(`\x1b${tcGroup[24]}\\<(.+?)\\>`, 'gi'); // 그림 표시
      RS.MessageSystem.Reg[e][25] = new RegExp(`\x1b${tcGroup[25]}\\[(\\d+)\\]`, 'gi'); // 그림 제거
      RS.MessageSystem.Reg[e][26] = new RegExp(`(?:\x1b${tcGroup[26]})\\[(\\d+)\\]`, 'g'); // 아이템
      RS.MessageSystem.Reg[e][27] = new RegExp(`(?:\x1b${tcGroup[27]})\\[(\\d+)\\]`, 'g'); // 무기구
      RS.MessageSystem.Reg[e][28] = new RegExp(`(?:\x1b${tcGroup[28]})\\[(\\d+)\\]`, 'g'); // 방어구
      RS.MessageSystem.Reg[e][29] = new RegExp(`(?:\x1b${tcGroup[29]})\\[(\\d+)\\]`, 'g'); // 직업
      RS.MessageSystem.Reg[e][30] = new RegExp(`(?:\x1b${tcGroup[30]})\\[(\\d+)\\]`, 'g'); // 적군
      RS.MessageSystem.Reg[e][31] = new RegExp(`(?:\x1b${tcGroup[31]})\\[(\\d+)\\]`, 'g'); // 상태
      RS.MessageSystem.Reg[e][32] = new RegExp(`(?:\x1b${tcGroup[32]})\\[(\\d+)\\]`, 'g'); // 스킬
      RS.MessageSystem.Reg[e][33] = new RegExp(`\x1b${tcGroup[33]}\\<(.+?)\\>`, 'gi'); // 얼굴
    }, this);
  }());

  RS.MessageSystem.initSystem = function () {
    var type = navigator.language;
    var ret = false;
    if(type.match(/ko/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Korean;
      RS.MessageSystem.Reg.defaultEscapeCode = RS.MessageSystem.Reg.KoreanEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Korean;
      ret = true;
    }
    if(type.match(/zh/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Chinese;
      RS.MessageSystem.Reg.defaultEscapeCode = RS.MessageSystem.Reg.ChineseEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Chinese;
      ret = true;
    }
    if(type.match(/en/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
      RS.MessageSystem.Reg.defaultEscapeCode = RS.MessageSystem.Reg.EnglishEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
      ret = true;
    }
    if(ret === false) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
      RS.MessageSystem.Reg.defaultEscapeCode = RS.MessageSystem.Reg.EnglishEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
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

  RS.MessageSystem.getEnglishColor = function(string) {
    switch(string) {
      case 'AQUA': case 'c_aqua':
      return Color.getColor(16776960);
      case 'BLACK': case 'c_black':
      return Color.getColor(0);
      case 'BLUE': case 'c_blue':
      return Color.getColor(16711680);
      case 'DKGRAY': case 'c_dkgray':
      return Color.getColor(4210752);
      case 'FUCHSIA': case 'c_fuchsia':
      return Color.getColor(16711935);
      case 'GRAY': case 'c_gray':
      return Color.getColor(8421504);
      case 'GREEN': case 'c_green':
      return Color.getColor(32768);
      case 'LIME': case 'c_lime':
      return Color.getColor(65280);
      case 'LTGRAY': case 'c_ltgray':
      return Color.getColor(12632256);
      case 'MAROON': case 'c_maroon':
      return Color.getColor(128);
      case 'NAVY': case 'c_navy':
      return Color.getColor(8388608);
      case 'OLIVE': case 'c_olive':
      return Color.getColor(32896);
      case 'ORANGE': case 'c_orange':
      return Color.getColor(4235519);
      case 'PURPLE': case 'c_purple':
      return Color.getColor(8388736);
      case 'RED': case 'c_red':
      return Color.getColor(255);
      case 'SILVER': case 'c_silver':
      return Color.getColor(12632256);
      case 'TEAL': case 'c_teal':
      return Color.getColor(8421376);
      case 'WHITE': case 'c_white':
      return Color.getColor(16777215);
      case 'YELLOW': case 'c_yellow':
      return Color.getColor(65535);
      case 'NORMAL': case 'c_normal':
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
    if(type.match(/en/)) {
      return RS.MessageSystem.getEnglishColor(string);
    }
    return RS.MessageSystem.getEnglishColor(string);
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
    this._align = [];
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
    this._maxLine = n;
    RS.MessageSystem.Params.numVisibleRows = n;
  };

  Game_Message.prototype.setBalloon = function(n) {
    this._balloon = n;
  };

  Game_Message.prototype.getBalloon = function(n) {
    return this._balloon;
  };

  Game_Message.prototype.setAlign = function(n) {
    this._align = this._align || [];
    this._align.push(n);
  };

  Game_Message.prototype.getAlign = function(n) {
    return this._align.shift() || 0;
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
      textState.x += Number(this.textWidth("A") * RS.MessageSystem.Params.TabSize);
      break;
      case textCode[tcGroup.CARRIAGE_RETURN]:
      textState.x = Number(textState.left || 0);
      this.startWait(1);
      break;
      case textCode[tcGroup.PLAY_SE]:
      this.playSe(this.obtainSoundName(textState));
      break;
      case textCode[tcGroup.SHOW_PICTURE]:
      this.showPicture(this.obtainSoundName(textState));
      this.startWait(15);
      break;
      case textCode[tcGroup.HIDE_PICTURE]:
      this.erasePicture(this.obtainEscapeParam(textState));
      this.startWait(15);
      break;
      case textCode[tcGroup.FACE]:
      var params = this.obtainSoundName(textState).split(',');
      this.redrawFaceImage(textState, params[0], params[1], 0, 0);
      this.startWait(1);
      break;
      default:
      alias_Window_Message_processEscapeCharacter.call(this, code, textState);
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
    this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
    this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;
    this.contents.fontGradient = false;
    this._windowPauseSignSprite.move(this._width / 2, this._height);
    this._windowPauseSignSprite.scale.y = 1;
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
    this.updateDefaultOpacity();
    this.updateContentsOpacity();
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
      var retName = arguments[1];
      if(retName.endsWith(':left')) {
        retName = retName.replace(':left', '');
        RS.MessageSystem.Params.namePositionTypeAtX = "left";
      }
      if(retName.endsWith(':right')) {
        retName = retName.replace(':right', '');
        RS.MessageSystem.Params.namePositionTypeAtX = "right";
      }
      this._nameWindow.drawName(retName);
      return '';
    }.bind(this));
    text = text.replace(regGroup[tcGroup.BALLOON], function() {
      var value = Number(arguments[1] || -2);
      if($gameParty.inBattle()) value = -2;
      $gameMessage.setBalloon(value);
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
    var namePositionTypeAtX = RS.MessageSystem.Params.namePositionTypeAtX;

    // X 값
    if(namePositionTypeAtX === 'right') {
      this._nameWindow.x = (this.x + this.width) - this._nameWindow.width - RS.MessageSystem.Params.nameWindowX;
    } else {
      this._nameWindow.x = this.x + RS.MessageSystem.Params.nameWindowX;
    }

    // Y 값
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
    this.createFaceContents();
  };

  Window_Message.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);
    this.windowskin.addLoadListener(function() {
      Color.baseColor = this.textColor(0);
    }.bind(this));
  };

  Window_Message.prototype.needsNewPage = function(textState) {
    return (!this.isEndOfText(textState) && textState.y + textState.height > this.contentsHeight());
  };

  Window_Message.prototype.createFaceContents = function() {
    this._faceContents = new Sprite();
    this._faceContents.x = 0;
    this._faceContents.y = 0;
    this.addChild(this._faceContents);
    return this._faceContents;
  };

  Window_Message.prototype.removeFaceContents = function() {
    if(this._faceContents) this.removeChild(this._faceContents);
  };

  Window_Message.prototype.newLineX = function() {
    var reg = /^Big_/i;
    var faceName = $gameMessage.faceName();
    var faceIndex = $gameMessage.faceIndex();
    if( reg.exec( faceName ) ) {
      return (faceIndex > 0) ? 0 : RS.MessageSystem.Params.textStartX;
    } else {
      return ((faceName) ? RS.MessageSystem.Params.faceStartOriginX : 0);
    }
  };

  Window_Message.prototype.drawBigFace = function(faceName) {

    this.loadMessageFace();
    var w = Graphics.boxWidth - this._faceBitmap.width;
    var h = Graphics.boxHeight - this._faceBitmap.height;
    var offsetX = this.x + RS.MessageSystem.Params.faceOX;
    var offsetY = this.y + RS.MessageSystem.Params.faceOY;
    var faceIndex = $gameMessage.faceIndex();

    this._faceContents.bitmap = this._faceBitmap;

    if(faceIndex > 0) {
      this._faceContents.x = w - offsetX;
    } else {
      this._faceContents.x = offsetX;
    }

    this._faceContents.y = h - offsetY;

  };

  Window_Message.prototype.drawMessageFace = function() {

    var reg = /^Big_/i;
    var faceName = $gameMessage.faceName();
    var faceIndex = $gameMessage.faceIndex();

    if(reg.exec( faceName ) ) {
      this.drawBigFace( faceName );
    } else {
      this.drawFace( faceName, faceIndex , 0, 0);
    }

  };

  Window_Message.prototype.isAlreadyDrawnFace = function () {
    return this._faceContents.bitmap || this.newLineX() > 0;
  };

  Window_Message.prototype.setFaceZIndex = function (zIndex) {
    zIndex = zIndex || 0;
    if(this.parent && RS.MessageSystem.Params.faceSide) this.setChildIndex( this._faceContents, zIndex );
  };

  Window_Message.prototype.clearFaceBitmap = function () {
    if(this._faceContents.bitmap) this._faceContents.bitmap = null;
  };

  Window_Message.prototype.redrawFaceImage = function (textState, faceName, faceIndex, x, y, width, height) {

    if(!this.isAlreadyDrawnFace()) return;

    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    faceName = faceName.trim() || "";
    faceIndex = parseInt(faceIndex) || 0;

    $gameMessage._faceName = faceName;
    $gameMessage._faceIndex = faceIndex;

    if( /^Big_/i.test( faceName ) ) {
      // TODO: 텍스쳐를 교체하는 코드.
      this.removeFaceContents();
      this.createFaceContents();
      this.setFaceZIndex();
      this.drawBigFace( faceName );
    } else {
      // TODO: 다른 플러그인의 영향으로 얼굴 이미지가 오른쪽에 표시된다면 텍스트 영역이 삭제될 수도 있다.
      // 특정 영역 삭제 및 일반 얼굴 이미지 묘화
      this.contents.clearRect(x, y, width, height);
      this.drawFace(faceName, faceIndex, 0, 0);
    }

    // ImageManager.releaseReservation(RS.MessageSystem.Params._imageReservationId);

  };

  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function(textState) {
    this.setFaceZIndex();
    this.clearFaceBitmap();
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
    return text;
  };

  Window_Message.prototype.calcBalloonRect = function(text) {
    var temp, tempText, height, min, pad;

    temp = text;
    tempText = this.textProcessing(temp);
    tempText = tempText.split(/[\r\n]+/);
    tempText = tempText.sort(function(a, b) {
      return b.length - a.length;
    }.bind(this));

    pad = (this.standardPadding() * 2) + this.textPadding() * 2;

    height = tempText.length * this.lineHeight() + pad;
    this._bWidth = (this.textWidth(tempText[0]) + pad) || RS.MessageSystem.Params.WIDTH;

    if($gameMessage.faceName() !== '') {
      min = this.fittingHeight(4);
      this._bWidth += this.newLineX() + pad;
      if(height < min) height = height.clamp(min, height + (min - height));
    }

    this._bHeight = height;

  };

  Window_Message.prototype.isActiveInBalloon = function () {
    // -2 라면 이 함수를 처리하지 않습니다.
    if($gameMessage.getBalloon() === -2) {
      this.updatePlacement();
      return false;
    };
    return true;
  };

  Window_Message.prototype.setBalloonRect = function (data) {
    this.x =  data.dx;
    this.y =  data.dy;
    this.width = this._bWidth;
    this.height = this._bHeight;
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
      data.ny = (this.y + this._bHeight) + RS.MessageSystem.Params.nameWindowY;
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

    data.tx = this._width / 2;
    data.ty = this._height;
    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();
    data.dx = data.mx - (this._bWidth / 2);
    data.dy = data.my - this._bHeight - data.tileHeight;
    data.ny = this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

    data = this.setBalloonPlacement(Object.create(data));

    // 말풍선 위치 및 크기 설정
    this.setBalloonRect(data);

    // 멈춤 표시 스프라이트 위치 조정
    this.updateSubBalloonElements(data);

    if(this.transform) this.updateTransform();

  };

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
    this.setWindowStyle();
  };

  RS.Window_Name.prototype.setWindowStyle = function () {
    this.openness = 0;
    this.opacity = RS.MessageSystem.Params.defaultOpacity;
    this.backOpacity = RS.MessageSystem.Params.backOpacity;
    this.contentsOpacity = RS.MessageSystem.Params.contentsOpacity;
    this.translucentOpacity = RS.MessageSystem.Params.translucentOpacity;
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

  RS.Window_Name.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(RS.MessageSystem.Params.windowskinForNameWindow);
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
      default:
      this.setAlignLeft(this._textState);
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
    this.__textWidth += this.textWidth(text);
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
    return text;
  };

  Window_Message.prototype.processNewLine = function(textState) {
    Window_Base.prototype.processNewLine.call(this, textState);
    // 텍스트를 정렬합니다
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

  Window_Message.prototype.setAlignLeft = function(textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
    textState.x = this.newLineX() + (padding * 2);
    textState.left = textState.x;
  };

  Window_Message.prototype.setAlignCenter = function(textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
    textState.x = ( this.newLineX() + this.contentsWidth() + padding * 2 ) / 2 - textState.tx / 2;
    textState.left = textState.x;
  };

  Window_Message.prototype.setAlignRight = function(textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
    textState.x = ( this.contentsWidth() - padding * 2) - textState.tx;
    textState.left = textState.x;
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
      case 'RMXP':
        this.onChangeStyleToRMXP();
        break;
      default:
        this.onChangeStyleToDefault();
    }
  };

  var alias_Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
    var type = RS.MessageSystem.Params.choiceWindowStyle;
    this.initWithStyle(type);
  };

  Window_ChoiceList.prototype.onChangeStyleToRMXP = function () {
    if(!this._messageWindow.isActiveInBalloon()) {
      RS.MessageSystem.Params.isTempSpriteContainerVisibility = false;
      this.updateOpacity();
      this.setPlacement();
    } else {
      this.onChangeStyleToDefault();
    }
  };

  Window_ChoiceList.prototype.onChangeStyleToDefault = function () {
    RS.MessageSystem.Params.isTempSpriteContainerVisibility = true;
    this.needToUpdateWhenChangingVisibility();
    alias_Window_ChoiceList_updatePlacement.call(this);
  };

  Window_ChoiceList.prototype.updateOpacity = function () {
    // 텍스트를 제외한 모든 것들이 렌더링에서 제외된다.
    // visible을 변경하면 바로 적용되지만,
    // alpha의 경우, updateTransform()을 수동으로 호출하거나,
    // 부모의 updateTransform()이 호출될 수 있게 해야 한다.
    this._windowSpriteContainer.visible = false;
  };

  Window_ChoiceList.prototype.needToUpdateWhenChangingVisibility = function () {
    var visible = RS.MessageSystem.Params.isTempSpriteContainerVisibility;
    if(this._windowSpriteContainer.visible !== visible) {
      this._windowSpriteContainer.visible = visible;
    }
  };

  Window_ChoiceList.prototype.setPlacement = function () {

    // 특정 영역을 마스킹하여 렌더링하고 싶지 않을 때 사용하는 옵션이다.
    // 프레임 버퍼가 지워질 때, 이 윈도우 영역에 있는 것이 모두 지워지므로,
    // false로 설정해 마스킹이 되지 않도록 했다.
    this._isWindow = false;

    var messageHeight = this._messageWindow.windowHeight();
    var messageTextState = this._messageWindow._textState;
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

    this.width = this._messageWindow.width - this._messageWindow.newLineX();

    // messageHeight는 원래 높이, height는 텍스트가 없는 부분의 높이
    this.height = (height <= 0) ? messageHeight : height;

    this.x = this._messageWindow.x + this._messageWindow.newLineX();
    this.y = this._messageWindow.y + currentTextHeight;

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

  if(Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') {
    var alias_Game_Interpreter_requestImages = Game_Interpreter.requestImages;
    Game_Interpreter.requestImages = function(list, commonList) {
      alias_Game_Interpreter_requestImages.call(this, list, commonList);
      if(!list) return;
      list.forEach(function(command) {
        var params = command.parameters;
        switch(command.code){
          case 401:
          var tcGroup = RS.MessageSystem.TextCodes.ENUM;
          var regGroup = RS.MessageSystem.Reg.Group;
          var text = params[0].slice(0);
          text = text.replace(/\\/g, '\x1b');
          var data = text.match(regGroup[tcGroup.FACE]);
          if(data) {
            data.forEach(function (e, i, a) {
              var faceName = RegExp.$1.split(',')[0].trim();
              // TODO: 캐시가 가득찰 경우, 삭제될 위험성이 있습니다
              ImageManager.loadFace(faceName);
              return '';
            });
          }
          break;
        };
      });
    };
  }

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
          RS.MessageSystem.Params.nameWindowY = Number(args[2]);
          break;
          case 'padding':
          RS.MessageSystem.Params.nameWindowStdPadding = Number(args[2]);
          break;
          case 'windowskin': case '윈도우스킨':
          RS.MessageSystem.Params.windowskinForNameWindow = args.slice(2, args.length).join('');
          break;
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
        case 'windowskin':
        RS.MessageSystem.Params.windowskin = args.slice(1, args.length).join('');
        break;
        // End main switch
      }
      // End if
    }
    // End Function
  };

  RS.MessageSystem.initSystem();

})();
