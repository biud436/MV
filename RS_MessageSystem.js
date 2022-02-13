//================================================================
// RS_MessageSystem.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2021 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_MessageSystem>
 * @author biud436
 * @url https://biud436.tistory.com/
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
 * @default 6
 *
 * @param Bust Option
 *
 * @param Big Face OX
 * @parent Bust Option
 * @type number
 * @desc Sets the large face bitmap's offset x
 * @default 0
 *
 * @param Big Face OY
 * @parent Bust Option
 * @type number
 * @desc Sets the large face bitmap's offset y
 * @default 0
 *
 * @param face Opacity
 * @parent Bust Option
 * @text Big Face Opacity
 * @type number
 * @desc Set the opacity of the large face.
 * (0 - 255)
 * @default 255
 *
 * @param Show Big Face Back
 * @text Face Z-Index
 * @parent Bust Option
 * @type boolean
 * @desc if true, the bust image'll show behind the background of the message window.
 * @default false
 * @on true
 * @off false
 *
 * @param face Direction
 * @parent Bust Option
 * @text Face Position
 * @type select
 * @desc Specify the position of the normal face image.
 * @default 0
 * @option Left
 * @value 0
 * @option Right
 * @value 2
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
 * @param System Font Settings
 *
 * @param systemFont
 * @parent System Font Settings
 * @text System Font
 * @type struct<SystemFont>
 * @desc The font is setting up as the system font.
 * @default {"settings":"[\"{\\\"languageCode\\\":\\\"ko\\\",\\\"fontName\\\":\\\"나눔고딕, Dotum, AppleGothic, sans-serif\\\"}\",\"{\\\"languageCode\\\":\\\"zh\\\",\\\"fontName\\\":\\\"SimHei, Heiti TC, sans-serif\\\"}\"]"}
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
 * @param Default Choice Position
 * @parent Choice Window
 * @type select
 * @desc Set the position of the choice window.
 * @default right
 * @option Right (Default)
 * @value right
 * @option Middle (Center)
 * @value middle
 * @option Left
 * @value left
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
 * @param Text Color
 * @type struct<TextColor>[]
 * @desc This allows you to add desired text color.
 * @default ["{\"Color Name\":\"c_lviolet \",\"Red\":\"200\",\"Green\":\"191\",\"Blue\":\"231\",\"Alpha\":\"1.0\"}"]
 *
 * @param Text Code
 * @type struct<TextCode>
 * @desc Can change with desired text codes
 * @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\",\"아군\",\"적그룹\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS굵게!\",\"AE굵게!\",\"AS이탤릭!\",\"AE이탤릭!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"배경색\",\"FD\"]","Chinese":"[\"色\",\"速度\",\"轮廓颜色\",\"轮廓宽度\",\"缩进\",\"加粗!\",\"倾斜!\",\"名字\",\"渐变颜色\",\"队伍成员\",\"角色\",\"变量\",\"图标\",\"增大!\",\"减少!\",\"金币\",\"对话框\",\"对齐\",\"数\",\"大小\",\"TAB!\",\"CR!\",\"音效播放\",\"显示图像\",\"隐藏图像\",\"道具\",\"武器\",\"装甲\",\"职业\",\"敌人\",\"状态\",\"技能\",\"脸\",\"我军\",\"敌人组\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS加粗!\",\"AE加粗!\",\"AS倾斜!\",\"AE倾斜!\",\"左\",\"中間\",\"右\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","English":"[\"COLOR\",\"TEXT_SPEED\",\"OUTLINE_COLOR\",\"OUTLINE_WIDTH\",\"INDENT\",\"BOLD!\",\"ITALIC!\",\"NAME\",\"GRADIENT\",\"PARTY_MEMBER\",\"PLAYER\",\"VAR\",\"ICON\",\"INCREASE!\",\"DECREASE!\",\"GOLD\",\"BALLOON\",\"ALIGN\",\"NUM\",\"TEXT_SIZE\",\"TAB!\",\"CR!\",\"PLAY_SE\",\"SHOW_PICTURE\",\"HIDE_PICTURE\",\"ITEM\",\"WEAPON\",\"ARMOR\",\"CLASSES\",\"ENEMY\",\"STATE\",\"SKILL\",\"FACE\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"ASBOLD!\",\"AEBOLD!\",\"ASITALIC!\",\"AEITALIC!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","Japanese":"[\"色\",\"テキストスピード\",\"輪郭の色\",\"輪郭のサイズ\",\"インデント\",\"太字!\",\"斜体!\",\"名前\",\"グラデーション\",\"パーティーメンバー\",\"アクタ\",\"変数\",\"アイコン\",\"INCREASE!\",\"DECREASE!\",\"通貨単位表示\",\"フキダシ\",\"整列\",\"数字\",\"テキストのサイズ\",\"TAB!\",\"CR!\",\"効果音\",\"ピクチャの表示\",\"ピクチャの消去\",\"アイテム\",\"武器\",\"防具\",\"職業\",\"敵キャラ\",\"ステート\",\"スキル\",\"顔\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS太字!\",\"AE太字!\",\"AS斜体!\",\"AE斜体!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]"}
 *
 * @param Sound Effects
 *
 * @param Text Sound ON/OFF
 * @parent Sound Effects
 * @type boolean
 * @default true
 *
 * @param Text Sound
 * @parent Sound Effects
 * @type file
 * @dir audio/se/
 * @desc Plays back the text sound when processing for each text.
 * @default Cursor1
 * @require 1
 *
 * @param Text Sound Execution Condition
 * @parent Sound Effects
 * @type note
 * @desc Make the probability to play the text sound.
 * @default "Math.randomInt(100) < 45"
 *
 * @param Text Sound Pool Size
 * @parent Sound Effects
 * @type number
 * @desc Specify the size of the text sound pool.
 * @default 2
 * @min 1
 *
 * @param Text Sound Interval
 * @parent Sound Effects
 * @type number
 * @desc Specify the text sound interval.
 * @default 2
 * @min 1
 *
 * @param Text Sound Volume
 * @parent Sound Effects
 * @type note
 * @desc Make the volume of the text sound by the random value that is float between 0.0 and 1.0
 * @default "0.4"
 *
 * @param Language Code
 * @type select
 * @desc Specify the language code of the text codes.
 * @default en
 * @option English
 * @value en
 * @option Korean
 * @value ko
 * @option Japanese
 * @value ja
 * @option Chinese
 * @value zh
 *
 * @param preload windowskin
 * @require 1
 * @dir img/system/
 * @type file[]
 * @desc preload windowskin files
 * @default
 *
 * @param Window Width
 * @text Window Width
 * @type string
 * @desc Specify the window width
 * (Graphics.width is the same as the screen width)
 * @default Graphics.width
 *
 * @param Gradient Style
 * @text Gradient Style
 * @type select
 * @desc Specify the gradient style.
 * @default linear-horizontal
 * @option linear-horizontal
 * @value linear-horizontal
 * @option axial-horizontal
 * @value axial-horizontal
 * @option linear-vertical
 * @value linear-vertical
 * @option axial-vertical
 * @value axial-vertical
 * @option radial
 * @value radial
 *
 * @param Paragraph Minifier
 * @text Automatic New Line
 * @type boolean
 * @desc Specify whether the word wrap is used.
 * (The default value is to false)
 * @default false
 * @on true
 * @off false
 *
 * @help
 * //! ===================================================================
 * //! Introduction
 * //! ===================================================================
 * This plugin allows you to use text codes in English, Korean, Chinese, Japanese.
 *
 * To send me general feedback, simply send an e-mail to biud436(gmail.com)
 * and mention the plugin name via the subject of your message.
 *
 * But, This plugin also provide the text codes in English instead of Korean.
 * To use the text codes in English,
 * You must set with 'en' in the plugin parameter named 'Language Code'
 *
 * English Text Codes :
 *
 *   \COLOR[html_color_name]
 *   \TEXT_SPEED[value]
 *   \OUTLINE_COLOR[color_name]
 *   \OUTLINE_WIDTH[value]
 *   \INDENT[value]
 *   \BOLD!
 *   \ITALIC!
 *   \NAME<event_name>
 *   \GRADIENT<text>
 *   \PARTY_MEMBER[nth]
 *   \PLAYER[nth]
 *   \VAR[nth]
 *   \ICON[nth]
 *   \INCREASE!
 *   \DECREASE!
 *   \GOLD
 *   \BALLOON[event_id]
 *   \BALLOON[0]
 *   \BALLOON[-1]
 *   \ALIGN[1]
 *   \ALIGN[2]
 *   \NUM[number]
 *   \TEXT_SIZE[number]
 *   \TAB!
 *   \CR!
 *   \PLAY_SE<se_name>
 *   \SHOW_PICTURE<nth, picture_name, origin_number, x, y>
 *   \HIDE_PICTURE[nth]
 *   \ITEM[nth]
 *   \WEAPON[nth]
 *   \ARMOR[nth]
 *   \CLASSES[nth]
 *   \ENEMY[nth]
 *   \STATE[nth]
 *   \SKILL[nth]
 *   \FACE<face_name,face_index>
 *   \FRIENDLY_TROOPS[nth]
 *   \ENEMY_TROOPS[nth]
 *   <B></B>
 *   <I></I>
 *   <LEFT></LEFT>
 *   <CENTER></CENTER>
 *   <RIGHT></RIGHT>
 *   \HC[color_name]
 *   \FD[face_position]
 *
 * //? ===================================================================
 * //? Opening the name window
 * //? ===================================================================
 * The name window is executed once before all the text codes start.
 * and automatically transforms the name window to fit the width of the text area.
 *
 * To open the name window, do as follows.
 * You put the name text between Less-than sign and Greater-than sign.
 *
 * \NAME<text>
 *
 * You can add a certain command by attaching a colon(:) at the end of the name text.
 * To change the position of the name window, as follows.
 *
 * \NAME<text:left>
 * \NAME<text:right>
 * \NAME<text:center>
 *
 * To change the opacity of the name window, as follows.
 *
 * \NAME<text:opacity0>
 * \NAME<text:defaultOpacity>
 *
 * To set the name window above the speech balloon, as follows
 *
 * \BALLOON[0]\NAME<eric>\COLOR[red]hello?
 *
 * To change the text color in the name window, as follows
 *
 * \NAME<\COLOR[red]eric>
 *
 * //? ===================================================================
 * //? Opening the speech balloon window
 * //? ===================================================================
 * The speech balloon window is executed once before all the text codes start.
 * and transforms the message window to fit with a target sprite and changes the position of it, too.
 *
 * To create a new speech balloon window and indicate, do as follows.
 *
 * You put the index between square brackets.
 * if the index sets to 0, it'll set to a current event.
 * if the index sets to -1, it'll set to a player.
 *
 * \BALLOON[event_id]
 * \BALLOON[0] ** current event
 * \BALLOON[-1] ** player
 *
 * In the battle, To indicate the window in above the battler, do as follows.
 * it can obtain the nth battler of the party members and indicate the message window.
 *
 * \FRIENDLY_TROOPS[nth]
 * \FRIENDLY_TROOPS[1] is the same as \BALLOON[1] and it can obtain the second FRIENDLY battler.
 * \FRIENDLY_TROOPS[2] is the same as \BALLOON[2]
 *
 * This can obtain the nth battler of the enemy troops and indicate the message window.
 *
 * \ENEMY_TROOPS[nth]
 * \ENEMY_TROOPS[1] is the same as \BALLOON[-1]
 * \ENEMY_TROOPS[2] is the same as \BALLOON[-2]
 *
 * Note that it will appear as the normal message window if the battler is in a dead state or does not exist.
 *
 * \BALLOON[1] // party member 1
 * \BALLOON[2] // party member 2
 * \BALLOON[3] // party member 3
 * \BALLOON[4] // party member 4
 * \BALLOON[5] // if the party member 5 is not existed, the target sets as party member 4.
 * \BALLOON[-1] // enemy 1
 * \BALLOON[-2] // enemy 2
 *
 * In the battle, it must put a negative or positive numbers between square brackets.
 * if you put to 0, it indicates as the normal message window.
 *
 * \BALLOON[0] // normal message window
 *
 * //? ===================================================================
 * //? Changing the text speed.
 * //? ===================================================================
 * This text code is applied once in the one page so in the other page has been invalid.
 *
 * To change the text speed in the message window, as follows.
 *
 * \TEXT_SPEED[frame]
 *
 * You put the speed value between square brackets.
 * if the value is to 0, The text will be drawn without delay.
 * if the value is to 1, The text will be drawn every 1 frame.
 *
 * Note that it will be reset with initial value when starting the next page.
 *
 * //? ===================================================================
 * //? Making the bold and the italic text.
 * //? ===================================================================
 * To change the font setting, it is possible to do bold and italic
 * settings by using a html tag such as <B></B><I></I>.
 *
 * For Example, you could use the following things.
 *
 * \BALLOON[0]\NAME<Wanderers>Hello. <B>Eric.</B> <I>Welcome to the game.</I>
 *
 * //? ===================================================================
 * //? Indenting the text
 * //? ===================================================================
 * To indent the text in the current page, as follows.
 * you can put the number for indent between square brackets.
 *
 * \INDENT[value]
 *
 * For instance, you are possible to use as follows.
 *
 * \indent[10]Leaves change their color in the fall
 *
 * Notice that the indent settings resets with initial value in the next page starts up.
 *
 * //? ===================================================================
 * //? A Text Alingment
 * //? ===================================================================
 * You can use a html tag such as <CENTER>, <LEFT>, <RIGHT> in the message window.
 * For instance, You can use as follows.
 *
 * <CENTER>The god appeared in the from of a fairy</CENTER>
 * <RIGHT>The robbers hid in the bushes and fell on me from four sides.</RIGHT>
 *
 * //? ===================================================================
 * //? Setting the standing CG.
 * //? ===================================================================
 * This plugin allows you to show up the large face image on the message window.
 *
 * To set the large face image that means the standing CG,
 * You must place Big_*.png that starts with prefix called Big_ from the img/faces folder
 * on your root project folder.
 *
 * so it will be going to create using img/faces/Big_*.png
 *
 * and then you select the face index that can set the position of it.
 *
 * The face image has an index, as follows:
 *
 *  0 1 2 3
 *  4 5 6 7
 *
 * For instance,
 * if the face index is to 0, the face image will show up on the left of message window.
 * if the face index is to 1 or more, the face image will show up on the right of message window.
 *
 * To change a standing CG after the message window starts up, you can use this text code.
 *
 * \FACE<face_name,face_index>
 *
 * You put the face name and face index between Less-than sign and Greater-than sign, as follows
 *
 * \FACE<Big_ScaredActor,0>
 *
 * But, this text code should be used for a special purpose.
 * You should preload the face image because loading image is the asynchronous.
 * Otherwise, You will not be going to show anything.
 *
 * //? ===================================================================
 * //? Changing the position of face image.
 * //? ===================================================================
 * To change the face image to the right side of message window, as follows.
 *
 * You can use the text code called \FD[2] or
 * use the plugin command called 'Message facePos 2'
 *
 * To show up the face image again to the left side on the message window,
 * You can use the text code called \FD[0] or use the plugin command called 'Message facePos 0'
 *
 * //? ===================================================================
 * //? Dealing with colors
 * //? ===================================================================
 * You can various color code such as web hex code or built-in color.
 * it can use them everywhere that can use text codes.
 *
 * \COLOR[c_red]
 * \COLOR[c_silver]
 * \COLOR[c_normal]
 * \COLOR[#ffffff]
 * \COLOR[aqua]
 * \COLOR[rgb(255, 0, 0)]
 *
 * \OUTLINE_COLOR[color_name]
 *
 * To change the background color of your text area, do as follows.
 * \HC[color_name]
 *
 * To use web colors, you must pass hex format like as #RRGGBB.
 * For example, the lime color is to \COLOR[#00FF00] or \COLOR[lime]
 *
 * //! ===================================================================
 * //! Plugin Commands
 * //! ===================================================================
 *
 * Changes the text speed. The n is the delay frame of each character:
 *
 *  Message textSpeed [n]
 *
 *  Message fontSize [n]
 *
 * Changes the offset position of the message window. the n is the number value:
 *
 *  Message offsetX [n]
 *  Message offsetY [n]
 *
 *  Message minFontSize [n]
 *  Message maxFontSize [n]
 *
 * Changes the number of lines in which it appears on the message window.
 * Notice that the number of lines must restore as default value after changing lines:
 *
 *  Message line [n]
 *
 *  Message textStartX [n]
 *
 * Changes the offset or the padding of the name window in which it appears above the message window.
 *  Message name x [n]
 *  Message name y [n]
 *  Message name padding [n]
 *
 * Changes the windowskin in which it appears on the name window.
 * Notice that you need to preload the window skin before starting the name window.
 * if not, it can fail to correctly get the text color table inside the window skin.
 *  Message name windowskin [...]
 *
 * Changes the offset of the large face image in which it appears on the screen.
 *  Message faceOX [n]
 *  Message faceOY [n]
 *
 * Changes the large face image's z-index in which it appears on the message window.
 * if the z-index is to 0, the face image will show up in front of the message window.
 * if it is to -1, the face image will show up behind the background image of the message window.
 *
 *  Message faceZ -1
 *  Message faceZ [n]
 *
 * Changes the position of the normal face image in which it appears on the message window.
 * By default, the face image will be located at the left side of the message window.
 * if you use this plugin command, you can change the position of the face image.
 * if the value is to 2, it will be located at the right side of the message window.
 * if the value is t0 0, it will be located at the left side of the message window.
 *
 *  Message facePos [n]
 *
 * Changes the size of the tab, which adds a space when you are used the text code called '\TAB!'
 *  Message setTabSize [n]
 *
 *  Message backgroundOpacity [n]
 *  Message contentsOpacity [n]
 *
 * Changes the windowskin in which it appears on the message window.
 * Notice that you need to preload the window skin before starting the message window.
 * if not, it can fail to correctly get the text color table inside the window skin.
 *
 *  Message windowskin [...]
 *
 * Changes the word wrap settings.
 * if true, it will be going to remove a custom line break in all of lines and it fills the texts finely.
 *
 *  Message minifier true
 *  Message minifier false
 *
 */
/*~struct~TextCode:
 *
 * @param Korean
 * @type string[]
 * @desc Can specify the desired text code as Korean.
 * (This will be used when the system language is in Korean)
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴","아군","적그룹","[.]","[|]","[!]","[<]","[>]","[\\^]","AS굵게!","AE굵게!","AS이탤릭!","AE이탤릭!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","배경색","FD"]
 *
 * @param Chinese
 * @type string[]
 * @desc Can specify the desired text code as Chinese
 * (This will be used when the system language is in Chinese)
 * @default ["色","速度","轮廓颜色","轮廓宽度","缩进","加粗!","倾斜!","名字","渐变颜色","队伍成员","角色","变量","图标","增大!","减少!","金币","对话框","对齐","数","大小","TAB!","CR!","音效播放","显示图像","隐藏图像","道具","武器","装甲","职业","敌人","状态","技能","脸","我军","敌人组","[.]","[|]","[!]","[<]","[>]","[\\^]","AS加粗!","AE加粗!","AS倾斜!","AE倾斜!","左","中間","右","B","B","I","I","AEND", "HC", "FD"]
 *
 * @param English
 * @type string[]
 * @desc Can specify the desired text code as English
 * (This will be used when the system language is to English)
 * @default ["COLOR","TEXT_SPEED","OUTLINE_COLOR","OUTLINE_WIDTH","INDENT","BOLD!","ITALIC!","NAME","GRADIENT","PARTY_MEMBER","PLAYER","VAR","ICON","INCREASE!","DECREASE!","GOLD","BALLOON","ALIGN","NUM","TEXT_SIZE","TAB!","CR!","PLAY_SE","SHOW_PICTURE","HIDE_PICTURE","ITEM","WEAPON","ARMOR","CLASSES","ENEMY","STATE","SKILL","FACE","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","ASBOLD!","AEBOLD!","ASITALIC!","AEITALIC!","LEFT","CENTER","RIGHT","B","B","I","I","AEND", "HC", "FD"]
 *
 * @param Japanese
 * @type string[]
 * @desc To work this, Note that you can set the system lanuage is to Japanese.
 * @default ["色","テキストスピード","輪郭の色","輪郭のサイズ","インデント","太字!","斜体!","名前","グラデーション","パーティーメンバー","アクタ","変数","アイコン","INCREASE!","DECREASE!","通貨単位表示","フキダシ","整列","数字","テキストのサイズ","TAB!","CR!","効果音","ピクチャの表示","ピクチャの消去","アイテム","武器","防具","職業","敵キャラ","ステート","スキル","顔","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","AS太字!","AE太字!","AS斜体!","AE斜体!","LEFT","CENTER","RIGHT","B","B","I","I","AEND", "HC", "FD"]
 *
 */
/*~struct~TextColor:
 *
 * @param Color Name
 * @desc Specify desired color name
 * @default
 *
 * @param Red
 * @type number
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Green
 * @type number
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Blue
 * @type number
 * @desc 0 ~ 255
 * @min 0
 * @max 255
 * @default 0
 *
 * @param Alpha
 * @type number
 * @desc 0.0 ~ 1.0
 * @min 0
 * @max 1
 * @decimals 1
 * @default 1.0
 *
 */
/*~struct~SystemFont:
 *
 * @param settings
 * @text Settings
 * @type struct<SystemFontDescriptor>[]
 * @desc Set the font for each language.
 * @default ["{\"languageCode\":\"ko\",\"fontName\":\"나눔고딕, Dotum, AppleGothic, sans-serif\"}","{\"languageCode\":\"zh\",\"fontName\":\"SimHei, Heiti TC, sans-serif\"}"]
 *
 */
/*~struct~SystemFontDescriptor:
 *
 * @param languageCode
 * @text Language Code
 * @desc Please enter the language code.
 * @default en
 *
 * @param fontName
 * @text Font Name
 * @desc Specify multiple fonts. (Separated by commas)
 * @default GameFont
 *
 */
/*:ko
 * @target MZ
 * @plugindesc <RS_MessageSystem>
 * @author biud436
 * @url https://biud436.tistory.com
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
 * @param 큰 페이스칩
 *
 * @param 텍스트 시작 X
 * @parent 큰 페이스칩
 * @type number
 * @desc 큰 페이스칩이 설정되어있을 때 텍스트 시작 좌표를 정수로 기입하세요.
 * @default 6
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
 * @param Default Choice Position
 * @parent 선택지 표시
 * @type select
 * @desc 선택지의 위치를 설정할 수 있습니다.
 * @default right
 * @option 우측 (기본)
 * @value right
 * @option 중앙
 * @value middle
 * @option 왼쪽
 * @value left
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
 * @default {"Korean":"[\"색\",\"속도\",\"테두리색\",\"테두리크기\",\"들여쓰기\",\"굵게!\",\"이탤릭!\",\"이름\",\"그레디언트\",\"파티원\",\"주인공\",\"변수\",\"아이콘\",\"확대!\",\"축소!\",\"골드\",\"말풍선\",\"정렬자\",\"숫자\",\"크기\",\"탭!\",\"캐리지리턴!\",\"효과음\",\"그림표시\",\"그림제거\",\"아이템\",\"무기구\",\"방어구\",\"직업\",\"적군\",\"상태\",\"스킬\",\"얼굴\",\"아군\",\"적그룹\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS굵게!\",\"AE굵게!\",\"AS이탤릭!\",\"AE이탤릭!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"배경색\",\"FD\"]","Chinese":"[\"色\",\"速度\",\"轮廓颜色\",\"轮廓宽度\",\"缩进\",\"加粗!\",\"倾斜!\",\"名字\",\"渐变颜色\",\"队伍成员\",\"角色\",\"变量\",\"图标\",\"增大!\",\"减少!\",\"金币\",\"对话框\",\"对齐\",\"数\",\"大小\",\"TAB!\",\"CR!\",\"音效播放\",\"显示图像\",\"隐藏图像\",\"道具\",\"武器\",\"装甲\",\"职业\",\"敌人\",\"状态\",\"技能\",\"脸\",\"我军\",\"敌人组\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS加粗!\",\"AE加粗!\",\"AS倾斜!\",\"AE倾斜!\",\"左\",\"中間\",\"右\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","English":"[\"COLOR\",\"TEXT_SPEED\",\"OUTLINE_COLOR\",\"OUTLINE_WIDTH\",\"INDENT\",\"BOLD!\",\"ITALIC!\",\"NAME\",\"GRADIENT\",\"PARTY_MEMBER\",\"PLAYER\",\"VAR\",\"ICON\",\"INCREASE!\",\"DECREASE!\",\"GOLD\",\"BALLOON\",\"ALIGN\",\"NUM\",\"TEXT_SIZE\",\"TAB!\",\"CR!\",\"PLAY_SE\",\"SHOW_PICTURE\",\"HIDE_PICTURE\",\"ITEM\",\"WEAPON\",\"ARMOR\",\"CLASSES\",\"ENEMY\",\"STATE\",\"SKILL\",\"FACE\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"ASBOLD!\",\"AEBOLD!\",\"ASITALIC!\",\"AEITALIC!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]","Japanese":"[\"色\",\"テキストスピード\",\"輪郭の色\",\"輪郭のサイズ\",\"インデント\",\"太字!\",\"斜体!\",\"名前\",\"グラデーション\",\"パーティーメンバー\",\"アクタ\",\"変数\",\"アイコン\",\"INCREASE!\",\"DECREASE!\",\"通貨単位表示\",\"フキダシ\",\"整列\",\"数字\",\"テキストのサイズ\",\"TAB!\",\"CR!\",\"効果音\",\"ピクチャの表示\",\"ピクチャの消去\",\"アイテム\",\"武器\",\"防具\",\"職業\",\"敵キャラ\",\"ステート\",\"スキル\",\"顔\",\"FRIENDLY_TROOPS\",\"ENEMY_TROOPS\",\"[.]\",\"[|]\",\"[!]\",\"[<]\",\"[>]\",\"[\\\\^]\",\"AS太字!\",\"AE太字!\",\"AS斜体!\",\"AE斜体!\",\"LEFT\",\"CENTER\",\"RIGHT\",\"B\",\"B\",\"I\",\"I\",\"AEND\",\"HC\",\"FD\"]"}
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
 * @type select
 * @desc 사용할 텍스트 코드의 언어 코드를 입력하세요
 * @default ko
 * @option English
 * @value en
 * @option Korean
 * @value ko
 * @option Japanese
 * @value ja
 * @option Chinese
 * @value zh
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
 * (Graphics.width는 화면 가로 길이)
 * @default Graphics.width
 * 
 * @param Gradient Style
 * @text 그레디언트 스타일
 * @type select
 * @desc 그레디언트 스타일을 지정합니다.
 * @default linear-horizontal
 * @option 선형 (가로)
 * @value linear-horizontal
 * @option 축형 (가로)
 * @value axial-horizontal
 * @option 선형 (세로)
 * @value linear-vertical
 * @option 축형 (세로)
 * @value axial-vertical
 * @option 방사선
 * @value radial
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
 * 배경투명도의 경우, 주의 사항이 있습니다.
 * 255로 설정하면 완전히 불투명해야 하지만 기본 이미지의 알파 채널 자체가 반투명하여
 * 완전 불투명하게 표시되지 않습니다. 완전 불투명하게 표시하려면 이미지의 알파 채널도
 * 불투명해야 합니다.
 * 
 * 메시지 탭크기 number
 * 메시지 배경투명도 number
 * 메시지 컨텐츠투명도 number
 * 
 * 윈도우 스킨 노트 태그의 경우, 프리로드 기능을 사용해야만 정상적으로 폰트 색상이 설정됩니다.
 *
 * 메시지 윈도우스킨 skin_name
 * 
 * 텍스트가 대화창보다 더 길게 넘어가면 자동으로 줄바꿈 처리를 합니다.
 * 또한 불필요한 개행 문자를 없애고 문단을 최대한 최소화하여 메시지 창에서 보이게 만듭니다.
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
 * 단, 선택 창이 왼쪽 위에 놓으면 페이스칩이 메시지 창의 왼쪽에 표시됩니다.
 * (아닌 경우에는 오른쪽에 표시할 것입니다)
 *
 * - 페이스칩이 메시지 창에 가려지게 설정하려면 플러그인 매개변수 값을 바꾸세요.
 *
 * =============================================================================
 * 노트 태그(Note Tags)
 * =============================================================================
 * 문장의 표시가 시작되기 전에 메시지 설정을 노트 태그로 바꾸는 기능입니다.
 * ※유의사항 : 문장의 표시 바로 위에 있는 노트 커맨드 2개만 읽어옵니다.
 * 
 * 윈도우 스킨 노트 태그의 경우, 프리로드 기능을 사용해야만 정상적으로 폰트 색상이 설정됩니다.
 * 
 * <윈도우 스킨:Window>
 * <이름 윈도우 스킨:Window>
 * <라인 높이:36>
 * <폰트 크기:28>
 * <텍스트 시작 X:256>
 * <큰 페이스칩 OX:0>
 * <큰 페이스칩 OY:0>
 * <대화창 뒤에 얼굴 표시:true>
 * <대화창 투명도:255>
 * <텍스트 효과음 재생 여부:true>
 * <기본 텍스트 출력 속도:0>
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
 *   \색[색상명]
 *   \테두리색[색상명]
 *   \배경색[색상명]
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
 * 그레디언트 텍스트를 만드는 텍스트 코드입니다. 기본 색상 값은 플러그인 매개변수에서
 * 변경이 가능합니다. 세밀한 설정은 불가능합니다.
 *
 *   \그레디언트<텍스트>
 *
 * 설명 할 필요가 없는 텍스트 코드들:
 *
 *   \테두리크기[값]
 *   \들여쓰기[값]
 *   \파티원[번호]
 *   \파티원[번호]
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
 * 이렇게 간단히 쓸 수 있게 되었습니다. 
 * 하지만 왜 영어일까요?
 * 태그는 만국 공통이자 일종의 약속이므로 한글로 번역하지 않았습니다.
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
/*~struct~TextCode:ko
 *
 * @param Korean
 * @type string[]
 * @desc 시스템 언어가 한국어(우리나라 말)일 경우에만 동작합니다.
 * @default ["색","속도","테두리색","테두리크기","들여쓰기","굵게!","이탤릭!","이름","그레디언트","파티원","주인공","변수","아이콘","확대!","축소!","골드","말풍선","정렬자","숫자","크기","탭!","캐리지리턴!","효과음","그림표시","그림제거","아이템","무기구","방어구","직업","적군","상태","스킬","얼굴","아군","적그룹","[.]","[|]","[!]","[<]","[>]","[\\^]","AS굵게!","AE굵게!","AS이탤릭!","AE이탤릭!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","배경색","FD"]
 *
 * @param Chinese
 * @type string[]
 * @desc 시스템 언어가 중국어로 설정되어있을 때에만 동작합니다
 * @default ["色","速度","轮廓颜色","轮廓宽度","缩进","加粗!","倾斜!","名字","渐变颜色","队伍成员","角色","变量","图标","增大!","减少!","金币","对话框","对齐","数","大小","TAB!","CR!","音效播放","显示图像","隐藏图像","道具","武器","装甲","职业","敌人","状态","技能","脸","我军","敌人组","[.]","[|]","[!]","[<]","[>]","[\\^]","AS加粗!","AE加粗!","AS倾斜!","AE倾斜!","左","中間","右","B","B","I","I","AEND","HC","FD"]
 *
 * @param English
 * @type string[]
 * @desc 시스템 언어가 '영어'로 설정되어있을 때에만 동작합니다.
 * @default ["COLOR","TEXT_SPEED","OUTLINE_COLOR","OUTLINE_WIDTH","INDENT","BOLD!","ITALIC!","NAME","GRADIENT","PARTY_MEMBER","PLAYER","VAR","ICON","INCREASE!","DECREASE!","GOLD","BALLOON","ALIGN","NUM","TEXT_SIZE","TAB!","CR!","PLAY_SE","SHOW_PICTURE","HIDE_PICTURE","ITEM","WEAPON","ARMOR","CLASSES","ENEMY","STATE","SKILL","FACE","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","ASBOLD!","AEBOLD!","ASITALIC!","AEITALIC!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","HC","FD"]
 *
 * @param Japanese
 * @type string[]
 * @desc 시스템 언어가 '일본어'일 때에만 동작합니다.
 * @default ["色","テキストスピード","輪郭の色","輪郭のサイズ","インデント","太字!","斜体!","名前","グラデーション","パーティーメンバー","アクタ","変数","アイコン","INCREASE!","DECREASE!","通貨単位表示","フキダシ","整列","数字","テキストのサイズ","TAB!","CR!","効果音","ピクチャの表示","ピクチャの消去","アイテム","武器","防具","職業","敵キャラ","ステート","スキル","顔","FRIENDLY_TROOPS","ENEMY_TROOPS","[.]","[|]","[!]","[<]","[>]","[\\^]","AS太字!","AE太字!","AS斜体!","AE斜体!","LEFT","CENTER","RIGHT","B","B","I","I","AEND","HC","FD"]
 *
 */
/*~struct~TextColor:ko
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
/*~struct~SystemFont:ko
 *
 * @param settings
 * @text 시스템 폰트 설정
 * @type struct<SystemFontDescriptor>[]
 * @desc 언어 별 폰트를 설정합니다.
 * @default ["{\"languageCode\":\"ko\",\"fontName\":\"나눔고딕, Dotum, AppleGothic, sans-serif\"}","{\"languageCode\":\"zh\",\"fontName\":\"SimHei, Heiti TC, sans-serif\"}"]
 *
 */
/*~struct~SystemFontDescriptor:ko
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
!function(e){var t={};function s(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(a,n,function(t){return e[t]}.bind(null,n));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0;const a=s(5);class n extends a.Component{constructor(e){super(e)}onReady(e){"messageWindow"in e?(console.log("On Ready 이벤트가 실행되었습니다."),this._messageWindow=e.messageWindow):console.error("messageWindow is not defined")}get messageWindow(){return this._messageWindow}get contents(){return this._messageWindow.contents}get _nameWindow(){if(!this._messageWindow._nameBoxWindow)throw new Error("이름 윈도우가 아직 정의되지 않았습니다. DI를 제대로된 시점에 하시기 바랍니다.");return this._messageWindow._nameBoxWindow}get _choiceWindow(){return this._messageWindow._choiceListWindow?this._messageWindow._choiceListWindow:{windowWidth:()=>0,windowHeight:()=>0}}save(){this._messageWindow.save()}restore(){this._messageWindow.restore()}standardPadding(){this._messageWindow.updatePadding();return this._messageWindow.padding||12}textPadding(){return this._messageWindow.itemPadding()||6}newLineX(){return this._messageWindow.newLineX()}fittingHeight(e){return this._messageWindow.fittingHeight(e)}drawTextEx(e){return this._messageWindow.textSizeEx(e).width}lineHeight(){return this._messageWindow.lineHeight()}updatePlacement(){}drawMessageFace(){this._messageWindow.drawMessageFace()}set x(e){this._messageWindow.x=e}set y(e){this._messageWindow.y=e}set width(e){this._messageWindow.width=e}set height(e){this._messageWindow.height=e}get width(){return this._messageWindow.width}get _width(){return this._messageWindow.width}get height(){return this._messageWindow.height}get _height(){return this._messageWindow.height}canvasToLocalX(e){return e}canvasToLocalY(e){return e}}t.BaseComponent=n},function(e,t,s){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const n=s(2),i=s(3);a(s(8)).default.getInstance().add("bitmap",()=>{const e=Bitmap.prototype.initialize;Bitmap.prototype.initialize=function(t,s){e.call(this,t,s),this.fontBold=!1,this.fontGradient=!1,this.highlightTextColor=null},Bitmap.prototype.setGradient=function(e,t,s,a,n,i){const o=this._context,r=this.measureTextWidth(e);o.save();const g=o.createLinearGradient(n,0,n+r,0);return g.addColorStop(0,t),g.addColorStop(.6,s),g.addColorStop(1,a),o.restore(),this._baseTexture.update(),g},Bitmap.prototype.setGradientStyle=function(e,t,s,a,n,i){const o=this._context,r=this.measureTextWidth(e),g=RS.MessageSystem.Params.lineHeight;let c;o.save();const h=RS.MessageSystem.Params.gradientStyle;if("radial"!==h)c=h.contains("horizontal")?o.createLinearGradient(n,0,n+r,0):o.createLinearGradient(n,0,0,i+g);else{const e=.5*r,t=.5*g;c=o.createRadialGradient(e,t,0,e,t,e)}return"radial"===h?(c.addColorStop(0,t),c.addColorStop(1,s)):h.contains("axial")?(c.addColorStop(0,t),c.addColorStop(.5,s),c.addColorStop(1,a)):(c.addColorStop(0,t),c.addColorStop(1,s)),o.restore(),this._baseTexture.update(),c},Bitmap.prototype._makeFontNameText=function(){return(this.fontItalic?"Italic ":"")+(this.fontBold?"bold ":"")+this.fontSize+"px "+this.fontFace},Bitmap.prototype._drawTextBody=function(e,t,s,a){const n=this._context;if(n.save(),n.imageSmoothingEnabled=RS.MessageSystem.Params.fontSmoothingEnabled,this.fontGradient){var i=this.setGradientStyle(e,RS.MessageSystem.Params.gradientColor1,RS.MessageSystem.Params.gradientColor2,RS.MessageSystem.Params.gradientColor3,t,s);n.fillStyle=i}else n.fillStyle=this.textColor;n.fillText(e,t,s,a),n.fillStyle=this.textColor,n.restore()}}).add("main",()=>{const e=Game_Message.prototype.clear;Game_Message.prototype.clear=function(){e.call(this),this._waitTime=0,this._gradientText="",this._balloon=-2,this._align=[],this._balloonPatternHeight=0,this._lastAlign=-1},Game_Message.prototype.setWaitTime=function(e){this._waitTime=e},Game_Message.prototype.setGradientText=function(e){this._gradientText=e},Game_Message.prototype.getWaitTime=function(){return this._waitTime||0},Game_Message.prototype.getGradientText=function(){return this._gradientText},Game_Message.prototype.getMaxLine=function(){return this._maxLine},Game_Message.prototype.setMaxLine=function(e){this._maxLine=e,RS.MessageSystem.Params.numVisibleRows=e},Game_Message.prototype.setBalloon=function(e){this._balloon=e},Game_Message.prototype.getBalloon=function(e){return this._balloon},Game_Message.prototype.setAlign=function(e){this._align=this._align||[],this._lastAlign=e,this._align.push(e)},Game_Message.prototype.getAlign=function(e){const t=this._align.shift();return void 0===t?this._lastAlign:t},Game_Message.prototype.clearAlignLast=function(e){this._lastAlign=-1},Game_Message.prototype.setBalloonPatternHeight=function(e){this._balloonPatternHeight=e},Game_Message.prototype.getBalloonPatternHeight=function(){return this._balloonPatternHeight},Sprite_Battler.prototype.screenX=function(){return this.x||0},Sprite_Battler.prototype.screenY=function(){return this.y||0};class t{constructor(){this.fontFace="Nanum Gothic",this.fontSize=12,this.fontBold=!1,this.fontItalic=!1,this.textColor="#000",this.outlineColor="#fff",this.outlineWidth=1,this.fontGradient=!1,this.highlightTextColor=null,this.textSpeed=1,this._isSaved=!1}save(e){this.fontFace=e.contents.fontFace,this.fontSize=+e.contents.fontSize,this.fontBold=e.contents.fontBold,this.fontItalic=e.contents.fontItalic,this.textColor=e.contents.textColor,this.outlineColor=e.contents.outlineColor,this.outlineWidth=e.contents.outlineWidth,this.fontGradient=e.contents.fontGradient,this.highlightTextColor=e.contents.highlightTextColor,$gameMessage&&(this.textSpeed=$gameMessage.getWaitTime()),this._isSaved=!0}restore(e){this._isSaved&&e.contents instanceof Bitmap&&(e.contents.fontFace=this.fontFace,e.contents.fontSize=this.fontSize,e.contents.fontBold=this.fontBold,e.contents.fontItalic=this.fontItalic,e.contents.textColor=this.textColor,e.contents.outlineColor=this.outlineColor,e.contents.outlineWidth=this.outlineWidth,e.contents.fontGradient=this.fontGradient,e.contents.highlightTextColor=this.highlightTextColor,$gameMessage&&$gameMessage.setWaitTime(this.textSpeed),this._isSaved=!1)}}Window_Base.prototype.obtainEscapeCode=function(e){const t=RS.MessageSystem.Reg.defaultEscapeCode.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,t[0].toUpperCase()):""},Window_Base.prototype.obtainNameColor=function(e){const t=/\[(.+?)\]/gi.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,n.Color.gmColor(t[1])):ColorManager.textColor(0)},Window_Base.prototype.changeTextColor=function(e){const t=parseInt(e);t>0&&t<32&&(e=ColorManager.textColor(e)),this.contents.textColor=e};const s=Window_Base.prototype.processEscapeCharacter;Window_Base.prototype.processEscapeCharacter=function(e,t){const a=RS.MessageSystem.TextCodes.ENUM,n=RS.MessageSystem.TextCodes.Main;switch(e){case"C":this.changeTextColor(this.textColor(this.obtainEscapeParam(t)));break;case n[a.COLOR]:this.changeTextColor(this.obtainNameColor(t));break;case"I":case n[a.ICON]:this.processDrawIcon(this.obtainEscapeParam(t),t);break;case"{":case n[a.INCREASE]:this.makeFontBigger();break;case"}":case n[a.DECREASE]:this.makeFontSmaller();break;case"AEND":$gameMessage.clearAlignLast();break;default:s.call(this,e,t)}};const a=Window_Base.prototype.loadWindowskin;Window_Base.prototype.loadWindowskin=function(){a.call(this),this.windowskin.addLoadListener(()=>{n.Color.baseColor=ColorManager.textColor(0)})},Window_Base.prototype.getFontFace=function(){const e=RS.MessageSystem.Params.langCode||navigator.language.slice(0,2),t=RS.MessageSystem.Params.fonts[e];return t||RS.MessageSystem.Params.fonts.default},Window_Base.prototype.drawTextEx=function(e,t,s,a){this.save(),this.resetFontSettings();const n=this.createTextState(e,t,s,a);return this.processAllText(n),this.restore(),n.outputWidth},Window_Base.prototype.makeFontSmaller=function(){this.contents.fontSize>=RS.MessageSystem.Params.minFontSize&&(this.contents.fontSize-=12)},Window_Base.prototype.resetFontSettings=function(){this.contents.fontFace=this.getFontFace(),this.contents.fontSize=RS.MessageSystem.Params.fontSize,this.contents.fontBold=!1,this.contents.fontItalic=!1,this.contents.outlineWidth=RS.MessageSystem.Params.defaultOutlineWidth,this.contents.outlineColor=RS.MessageSystem.Params.defaultOutlineColor,this.contents.fontGradient=!1,this.contents.highlightTextColor=null,this.resetTextColor()},Window_Base.prototype.makeFontBigger=function(){this.contents.fontSize<=RS.MessageSystem.Params.maxFontSize&&(this.contents.fontSize+=12)},Window_Base.prototype.save=function(){this._messageDesc=new t,this._messageDesc.save(this),console.log(this._messageDesc)},Window_Base.prototype.restore=function(){this._messageDesc&&(this._messageDesc.restore(this),this._messageDesc=void 0)};const o=Window_Base.prototype.convertEscapeCharacters;Window_Base.prototype.convertEscapeCharacters=function(e){const t=RS.MessageSystem.Reg.Group,s=RS.MessageSystem.TextCodes.ENUM,a=RS.MessageSystem.TextCodes.Main;return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=o.call(this,e)).replace(t[s.VAR],function(...e){return $gameVariables.value(parseInt(e[1])).toString()}.bind(this))).replace(t[s.VAR],function(...e){return $gameVariables.value(parseInt(e[1])).toString()}.bind(this))).replace(t[s.PLAYER],(...e)=>this.actorName(parseInt(e[1])))).replace(t[s.PARTY_MEMBER],(...e)=>this.partyMemberName(parseInt(e[1])))).replace(t[s.NUM],function(...e){return e[1].toComma()}.bind(this))).replace(t[s.GOLD],TextManager.currencyUnit)).replace(t[s.CLASSES],function(...e){return $dataClasses[parseInt(e[1])].name||""}.bind(this))).replace(t[s.ITEM],function(...e){return $dataItems[parseInt(e[1])].name||""}.bind(this))).replace(t[s.WEAPON],function(...e){return $dataWeapons[parseInt(e[1])].name||""}.bind(this))).replace(t[s.ARMOR],function(...e){return $dataArmors[parseInt(e[1])].name||""}.bind(this))).replace(t[s.ENEMY],function(...e){return $dataEnemies[parseInt(e[1])].name||""}.bind(this))).replace(t[s.STATE],function(...e){return $dataStates[parseInt(e[1])].name||""}.bind(this))).replace(t[s.SKILL],function(...e){return $dataSkills[parseInt(e[1])].name||""}.bind(this))).replace(t[s.ALIGN_LEFT],function(){return""+a[s.ALIGN]+"[0]"}.bind(this))).replace(t[s.ALIGN_CENTER],function(){return""+a[s.ALIGN]+"[1]"}.bind(this))).replace(t[s.ALIGN_RIGHT],function(){return""+a[s.ALIGN]+"[2]"}.bind(this))).replace(t[s.ALIGN],(...e)=>(this._isUsedTextWidthEx||$gameMessage.setAlign(Number(e[1]||0)),""))).replace(/<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi,function(){return t[s.ALIGN_CLEAR].source}.bind(this))},Window_Base.prototype.textPadding=function(){return this.itemPadding()},Window_Base.prototype.newLineX=function(e){return this.textPadding()},Window_Base.prototype.processAlign=function(e){if(!(e=e||this._textState).rtl)switch($gameMessage.getAlign()){case 0:this.setAlignLeft(e);break;case 1:this.setAlignCenter(e);break;case 2:this.setAlignRight(e)}};const r=Window_Base.prototype.processNewLine;Window_Base.prototype.processNewLine=function(e){r.call(this,e),this.processAlign(e)},Window_Base.prototype.setAlignLeft=function(e){e.x=this.newLineX(e),e.startX=e.x},Window_Base.prototype.setAlignCenter=function(e){const t=this.textPadding();e.x=(this.newLineX(e)+this.contentsWidth()+t)/2-e.outputWidth/2,e.startX=e.x},Window_Base.prototype.setAlignRight=function(e){const t=this.textPadding();e.x=this.contentsWidth()-t-e.outputWidth,e.startX=e.x},Window_Message.prototype.obtainTextSpeed=function(e){const t=/\[(\d+)\]/.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,parseInt(t[1])):0},Window_Message.prototype.obtainGradientText=function(e){const t=/^<(.+?)>/.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,String(t[1])):"Empty Text"},Window_Message.prototype.obtainSoundName=function(e){const t=/\<(.+?)\>/.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,String(t[1])):""};const g=Window_Message.prototype.processEscapeCharacter;Window_Message.prototype.processEscapeCharacter=function(e,t){const s=RS.MessageSystem.TextCodes.ENUM,a=RS.MessageSystem.TextCodes.Main;switch(e){case a[s.TEXT_SPEED]:$gameMessage.setWaitTime(this.obtainEscapeParam(t));break;case a[s.TEXT_SIZE]:this.setTextSize(this.obtainEscapeParam(t));break;case a[s.OUTLINE_COLOR]:this.setStrokeColor(this.obtainNameColor(t));break;case a[s.INDENT]:this.setTextIndent(t);break;case a[s.OUTLINE_WIDTH]:this.setStrokeWidth(this.obtainEscapeParam(t));break;case a[s.BOLD]:this.setTextBold(!this.contents.fontBold);break;case a[s.BOLD_START]:this.setTextBold(!0);break;case a[s.BOLD_END]:this.setTextBold(!1);break;case a[s.ITALIC]:this.setTextItalic(!this.contents.fontItalic);break;case a[s.ITALIC_START]:this.setTextItalic(!0);break;case a[s.ITALIC_END]:this.setTextItalic(!1);break;case a[s.GRADIENT]:this.setTextGradient(t);break;case a[s.HIGHLIGHT_TEXT_COLOR]:this.setHighlightTextColor(this.obtainNameColor(t));break;case a[s.TAB]:t.x+=Number(this.textWidth("A")*RS.MessageSystem.Params.TabSize);break;case a[s.CARRIAGE_RETURN]:t.x=Number(t.startX||0),this._isUsedTextWidthEx||this.startWait(1);break;case a[s.PLAY_SE]:this._isUsedTextWidthEx||this.playSe(this.obtainSoundName(t));break;case a[s.SHOW_PICTURE]:if(this._isUsedTextWidthEx)break;this.showPicture(this.obtainSoundName(t)),this.startWait(15);case a[s.HIDE_PICTURE]:if(this._isUsedTextWidthEx)break;this.erasePicture(this.obtainEscapeParam(t)),this.startWait(15);case a[s.FACE]:if(this._isUsedTextWidthEx)break;this.obtainSoundName(t).split(",");this.startWait(1);break;default:g.call(this,e,t)}},Window_Message.prototype.setTextItalic=function(...e){this.contents.fontItalic=e[0]},Window_Message.prototype.setTextBold=function(...e){this.contents.fontBold=e[0]},Window_Message.prototype.setTextSize=function(...e){this.contents.fontSize=e[0].clamp(RS.MessageSystem.Params.minFontSize,RS.MessageSystem.Params.maxFontSize)},Window_Message.prototype.setStrokeWidth=function(...e){this.contents.outlineWidth=e[0]},Window_Message.prototype.setStrokeColor=function(...e){this.contents.outlineColor=e[0]},Window_Message.prototype.setTextIndent=function(e){const t=parseInt(this.obtainEscapeParam(e));e.x+=t},Window_Message.prototype.setHighlightTextColor=function(...e){let t=e[0];"null"!==t&&"없음"!==t||(t=null),this.contents.highlightTextColor=t},Window_Message.prototype.setTextGradient=function(e){this.contents.fontGradient=!0},Window_Message.prototype.playSe=function(e){const t={name:e.trim(),pan:0,pitch:100,volume:ConfigManager.seVolume};AudioManager.playSe(t)},Window_Message.prototype.showPicture=function(e){const t=e.split(",").map(e=>e.trim());let s=[Number(t[0]),t[1],Number(t[2]),Number(t[3]),Number(t[4]),100,100,255,0],a=!0;return s&&s.forEach((e,t,s)=>{null==e&&(a=!1)}),!!a&&($gameScreen.showPicture.apply($gameScreen,s),!0)},Window_Message.prototype.erasePicture=function(e){"number"==typeof e&&$gameScreen.erasePicture(e)},Window_Message.prototype.resetFontSettings=function(){Window_Base.prototype.resetFontSettings.call(this),this._pauseSignSprite&&(this._pauseSignSprite.move(this._width/2,this._height),this._pauseSignSprite.scale.y=1),$gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed)},Window_Message.prototype.resetGradient=function(e){this.contents.fontGradient=!1},Window_Message.prototype.numVisibleRows=function(){return RS.MessageSystem.Params.numVisibleRows};const c=Window_Message.prototype.createTextState;Window_Message.prototype.createTextState=function(e,t,s,a){let n=c.call(this,e,t,s,a);const i=n.x,o=n.y;return Object.assign(n,{px:i,py:o}),n},Window_Message.prototype.processWordWrap=function(e,t,s,a){const n=e.px;Math.floor(n+2*t)>s&&a&&(this.processNewLine(e),this.needsNewPage(e)&&this.startPause())};const h=Window_Message.prototype.processNewLine;Window_Message.prototype.processNewLine=function(e){if(h.call(this,e),e.px=e.startX||e.x,this._backBuffer&&this._backBuffer.isDirty){this._backBuffer.textState}},Window_Message.prototype.processCharacter=function(e){const t=e.text[e.index++];t.charCodeAt(0)<32?(this.flushTextState(e),this.processControlCharacter(e,t)):(e.buffer+=t,e.px+=this.textWidth(t))};const m=Window_Message.prototype.processCharacter;Window_Message.prototype.processCharacter=function(e){let t=!1;let s=(e.buffer||"").length;m.call(this,e);if(s!==(e.buffer||"").length&&(t=!0),t){const t=e.buffer.substr(e.buffer.length-1,1);this.processNormalCharacterProxy(e,t)}},Window_Message.prototype.processNormalCharacterProxy=function(e,t){const s=this.textWidth(t);let a=this.contentsWidth();const n=-2===$gameMessage.getBalloon(),i=e.drawing;let o=n&&i&&RS.MessageSystem.Params.isParagraphMinifier;this.processWordWrap(e,s,a,o);const r=this.contents;""!==$gameMessage.faceName()&&(a=r.width-ImageManager.faceWidth,o=2===RS.MessageSystem.Params.faceDirection,this.processWordWrap(e,s,a,o));if(null!==r.highlightTextColor){const t=Math.floor(2*s)+1,a=this.lineHeight(),{px:n,py:i}=e;this._backBuffer={buffer:new Bitmap(t,a),textState:e,isDirty:!1,x:n,y:i},this._backBuffer.buffer.fillAll(r.highlightTextColor),this._backBuffer.isDirty=!0,this._backBuffer.textState=e}};const p=Window_Message.prototype.flushTextState;Window_Message.prototype.flushTextState=function(e){const t=e.drawing,s=!this._showFast&&!this.isEndOfText(e)&&t,a=t&&this._backBuffer&&this._backBuffer.isDirty;if(s&&this.startWait($gameMessage.getWaitTime()||0),a&&t){const t=this._backBuffer,s=t.buffer;if(t.textState.py!==e.y)return this._backBuffer.isDirty=!1,void p.call(this,e);t.x,t.y;e.x,e.y,Math.min(this.innerWidth,Math.floor(s.width)),Math.min(this.innerHeight,Math.floor(s.height));this._backBuffer.isDirty=!1}p.call(this,e)},Window_Message.prototype.flushTextBackgbround=function(e){},Window_Message.prototype.updateBigFaceOpacity=function(){if(!this._faceContents)return;let{faceOpacity:e}=RS.MessageSystem.Params;e||(e=255);const t=e.clamp(0,255);this._faceContents.opacity=t},Window_Message.prototype.fadeInOutFaceContents=function(){if(!this._faceContents)return;if(this.isOpening()||this.isClosing()){const e=(this.openness||0).clamp(0,255);this._faceContents.scale.y=e/255,this._faceContents.y=this._faceContents.height/2*(1-this.openness/255)}};const d=Window_Message.prototype.checkToNotClose;Window_Message.prototype.checkToNotClose=function(){this.fadeInOutFaceContents(),d.call(this)},Window_Message.prototype.updateBalloonPosition=function(){const e=i.DependencyInjector.getComponent("BalloonWindowTransformComponent");e&&e.updateBalloonPosition()},Window_Message.prototype.getDefaultSizeOption=function(){const e=Utils.isMobileDevice(),t=e?window.outerWidth:window.screen.availWidth,s=e?window.outerHeight:window.screen.availHeight,a=this.width,n=this.height;return{maxSW:t,maxSH:s,maxWidth:a,maxHeight:n,maxY:s-n,maxX:t-a}},Window_Message.prototype.updatePlacement=function(){const e=this._goldWindow,t=-2===$gameMessage.getBalloon(),s=SceneManager._scene instanceof Scene_Map;if(this._positionType=$gameMessage.positionType(),t){const{maxWidth:e,maxHeight:t,maxX:s,maxY:a}=this.getDefaultSizeOption(),n=Graphics.width/2-e/2+RS.MessageSystem.Params.windowOffset.x,i=this._positionType*(Graphics.height-t)/2+RS.MessageSystem.Params.windowOffset.y;this.x=Math.min(n,s),this.y=Math.min(i,a)}else s&&this.updateBalloonPosition();if(e){const t=e.height;this._goldWindow.y=this.y>t?0:Graphics.height-e.height}if(this.updateDefaultOpacity(),this.updateContentsOpacity(),this.updateBigFaceOpacity(),""!==$gameMessage.faceName()){const e=/^Big_/.exec($gameMessage.faceName()),t=2;RS.MessageSystem.Params.faceSide?this.setFaceZIndex(e?0:t):this.setFaceZIndex(t)}},Window_Message.prototype.isAlreadyDrawnFace=function(){return this._faceContents.bitmap||this.newLineX()>0},Window_Message.prototype.setFaceZIndex=function(e=0){const t=this.parent,s=RS.MessageSystem.Params.faceSide;t&&s&&this.setChildIndex(this._faceContents,e)},Window_Message.prototype.clearFaceBitmap=function(){this._faceContents.bitmap&&(this._faceContents.bitmap=null)};const l=Window_Message.prototype.convertEscapeCharacters;Window_Message.prototype.convertEscapeCharacters=function(e){const t=RS.MessageSystem.TextCodes.ENUM,s=(RS.MessageSystem.TextCodes.Main,RS.MessageSystem.Reg.Group);return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=l.call(this,e)).replace(s[t.BOLD_START_CV],function(){return s[t.BOLD_START].source}.bind(this))).replace(s[t.BOLD_END_CV],function(){return s[t.BOLD_END].source}.bind(this))).replace(s[t.ITALIC_START_CV],function(){return s[t.ITALIC_START].source}.bind(this))).replace(s[t.ITALIC_END_CV],function(){return s[t.ITALIC_END].source}.bind(this))).replace(s[t.NAME],(...e)=>{let t=e[1];return t.endsWith(":left")&&(t=t.replace(":left",""),RS.MessageSystem.Params.namePositionTypeAtX="left"),t.endsWith(":auto")&&(t=t.replace(":auto",""),RS.MessageSystem.Params.namePositionTypeAtX="auto"),t.endsWith(":center")&&(t=t.replace(":center",""),RS.MessageSystem.Params.namePositionTypeAtX="center"),t.endsWith(":opacity0")&&(t=t.replace(":opacity0",""),RS.MessageSystem.Params.namePositionTypeAtX="opacity0"),t.endsWith(":defaultOpacity")&&(t=t.replace(":defaultOpacity",""),RS.MessageSystem.Params.namePositionTypeAtX="defaultOpacity"),t.endsWith(":right")&&(t=t.replace(":right",""),RS.MessageSystem.Params.namePositionTypeAtX="right"),this._nameBoxWindow.setName(t),""})).replace(s[t.BALLOON],function(){const e=Number(arguments[1]||-2);return $gameParty.inBattle()?$gameMessage.setBalloon(e<0?"ENEMIES : "+Math.abs(e):"ACTORS : "+e):$gameMessage.setBalloon(e),""}.bind(this))).replace(s[t.FRIENDLY_TROOPS],function(){const e=Number(arguments[1]||0);return $gameMessage.setBalloon("ACTORS : "+e),""}.bind(this))).replace(s[t.ENEMY_TROOPS],function(){const e=Number(arguments[1]||0);return $gameMessage.setBalloon("ENEMIES : "+e),""}.bind(this))).replace(s[t.FACE_DIRECTION],()=>{const e=Number(arguments[1]||0);return this._isUsedTextWidthEx||(RS.MessageSystem.Params.faceDirection=e),""})},Window_Message.prototype.setHeight=function(e){this.contents.clear(),$gameMessage.setMaxLine(e),this.height=this.fittingHeight(e),this.createContents(),this.updatePlacement()};const S=Window_Message.prototype.initialize;Window_Message.prototype.initialize=function(e){S.call(this,e),$gameTemp.setMSHeightFunc(this.setHeight.bind(this)),this.setHeight(RS.MessageSystem.Params.numVisibleRows),this.createFaceContents(),this.on("removed",this.removeEventHandler,this),this.on("onLoadWindowskin",this.onLoadWindowskin,this)},Window_Message.prototype.calcBalloonRect=function(e){i.DependencyInjector.getComponent("BalloonWindowTransformComponent").calcBalloonRect(e)};const u=Window_Message.prototype.newPage;Window_Message.prototype.newPage=function(e){this.setFaceZIndex(),this.clearFaceBitmap(),this.loadWindowskin(),this.emit("onLoadWindowskin"),this.openBalloon($gameMessage.getBalloon()),u.call(this,e)},Window_Message.prototype.updateBalloonPositionInBattle=function(){const e=i.DependencyInjector.getComponent("BalloonWindowTransformComponent");e&&e.updateBalloonPositionInBattle()},Window_Message.prototype.openBalloon=function(e){-2!==e?(this.setupOwner(e),SceneManager._scene instanceof Scene_Battle?this.updateBalloonPositionInBattle():this.updateBalloonPosition()):this.resizeMessageSystem()};Window_Message.prototype.startMessage;Window_Message.prototype.startMessage=function(){const e=$gameMessage.allText(),t=this.createTextState(e,0,0,0);t.x=this.newLineX(t),t.startX=t.x,this._textState=t;let s=t.text.slice(0);-2===$gameMessage.getBalloon()&&RS.MessageSystem.Params.isParagraphMinifier&&(s=s.replace(/[\r\n]+/gm," ")),this.calcBalloonRect(s),this.newPage(this._textState),this.resizeMessageSystem("no reset"),this.updatePlacement(),this.updateBackground(),this.open(),this._nameBoxWindow.start()},Window_Message.prototype.getDefaultWindowRect=function(){return Scene_Message.prototype.messageWindowRect()},Window_Message.prototype.windowWidth=function(){return this.getDefaultWindowRect().width},Window_Message.prototype.windowHeight=function(){return this.getDefaultWindowRect().height},Window_Message.prototype.resizeMessageSystem=function(...e){const t=!(e.length>0);if(console.log("resize message system"),!t&&SceneManager._scene instanceof Scene_Battle)return;const s=$gameMessage.positionType(),a=RS.MessageSystem.Params.windowOffset.x,n=RS.MessageSystem.Params.windowOffset.y,i={width:this.windowWidth(),height:this.windowHeight()},o=Graphics.width/2-i.width/2+a,r=s*(Graphics.height-i.height)/2+n,g=i.width,c=i.height;o!==this.x&&(this.x=o),r!==this.y&&(this.y=r),g===this.width&&c===this.height||(this.width=g,this.height=c),t&&$gameMap.setMsgOwner($gamePlayer)},Window_Message.prototype.removeEventHandler=function(){this.off("onLoadWindowskin",this.onLoadWindowskin,this)},Window_Message.prototype.textColor=function(e){const t=this.windowskin;if(!t.isReady())return n.Color.baseColor;const s=96+e%8*12+6,a=144+12*Math.floor(e/8)+6;return t.getPixel(s,a)},Window_Message.prototype.onLoadWindowskin=function(){n.Color.baseColor=this.textColor(0),this.changeTextColor(n.Color.baseColor)},Window_Message.prototype.loadWindowskin=function(){const e=ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);if(e!==this.windowskin&&(this.windowskin=e,this._isDirtyWindowskin=!1,this.windowskin.addLoadListener(()=>{this._isDirtyWindowskin=!0}),this.contents||this.createContents(),this.changeTextColor(n.Color.baseColor),!this.windowskin.isReady()))return setTimeout(()=>this.loadWindowskin(),10)};const y=Window_Message.prototype.updateLoading;Window_Message.prototype.updateLoading=function(){let e=!0;return this._isDirtyWindowskin&&(n.Color.baseColor=ColorManager.textColor(0),this.changeTextColor(n.Color.baseColor),this._isDirtyWindowskin=!1,e=!0),y.call(this)&&e},Window_Message.prototype.needsNewPage=function(e){return!this.isEndOfText(e)&&e.y+e.height>this.contentsHeight()},Window_Message.prototype.createFaceContents=function(){return this._faceContents=new Sprite,this._faceContents.x=0,this._faceContents.y=0,this.addChildAt(this._faceContents,2),this._faceContents},Window_Message.prototype.removeFaceContents=function(){this._faceContents&&this.removeChild(this._faceContents)},Window_Message.prototype.newLineX=function(){const e=$gameMessage.faceName(),t=$gameMessage.faceIndex();if(/^Big_/i.exec(e)){var s=RS.MessageSystem.Params.faceSide?0:RS.MessageSystem.Params.textStartX;return t>0?0:s}return 2===RS.MessageSystem.Params.faceDirection?0:e?RS.MessageSystem.Params.faceStartOriginX:0},Window_Message.prototype.isValidBigFace=function(e){return/^Big_/i.exec(e)},Window_Message.prototype.updateNameWindow=function(){},Window_Message.prototype.standardBackOpacity=function(){return RS.MessageSystem.Params.backOpacity},Window_Message.prototype.translucentOpacity=function(){return RS.MessageSystem.Params.translucentOpacity},Window_Message.prototype.updateDefaultOpacity=function(){this.opacity=RS.MessageSystem.Params.defaultOpacity},Window_Message.prototype.updateContentsOpacity=function(){this.contentsOpacity=RS.MessageSystem.Params.contentsOpacity},Window_Message.prototype.getSpriteActors=function(e){if(!$gameParty.members())return null;const t=$gameParty.members().length;return{type:"actor",id:(e=e.clamp(0,t))-1}},Window_Message.prototype.getSpriteEnemies=function(e){if(!$gameTroop.members())return null;const t=$gameTroop.members().length;return{type:"enemy",id:(e=e.clamp(0,t))-1}},Window_Message.prototype.setupOwner=function(e){switch(e){case-1:$gameMap.setMsgOwner($gamePlayer);break;case 0:$gameMap.setMsgOwner($gameMap.getMsgEvent());break;default:SceneManager._scene instanceof Scene_Battle?(/(?:ENEMIES)[ ]*:(.*)/.test(e.toString())&&$gameMap.setMsgOwner(this.getSpriteEnemies(parseInt(RegExp.$1))),/(?:ACTORS)[ ]*:(.*)/.test(e.toString())&&$gameMap.setMsgOwner(this.getSpriteActors(parseInt(RegExp.$1)))):$gameMap.setMsgOwner($gameMap.event(e))}};const _=Window_Message.prototype.shouldBreakHere;Window_Message.prototype.shouldBreakHere=function(e){const t=_.call(this,e);if(t&&RS.MessageSystem.Params.isPlayTextSound){const e=RS.MessageSystem.Params.textSoundInterval;this._textSoundInterval--<=0&&(AudioManager.playStaticSe({name:RS.MessageSystem.popParameter("Text Sound","텍스트 효과음"),pan:0,pitch:100,volume:90}),this._textSoundInterval=e)}return t},Game_Interpreter.prototype.processMessageParams=function(e,t){const s=RS.MessageSystem.getEventComments(e,t-1);s["윈도우 스킨"]&&(RS.MessageSystem.Params.windowskin=s["윈도우 스킨"].trim()||"Window",ImageManager.loadSystem(RS.MessageSystem.Params.windowskin)),s["이름 윈도우 스킨"]&&(RS.MessageSystem.Params.windowskinForNameWindow=s["이름 윈도우 스킨"].trim()||"Window",ImageManager.loadSystem(RS.MessageSystem.Params.windowskinForNameWindow)),s["라인 높이"]&&(RS.MessageSystem.Params.lineHeight=parseInt(s["라인 높이"])),s["폰트 크기"]&&(RS.MessageSystem.Params.fontSize=parseInt(s["폰트 크기"])),s["라인"]&&(RS.MessageSystem.Params.numVisibleRows=parseInt(s["라인"])),s["텍스트 시작 X"]&&(RS.MessageSystem.Params.textStartX=parseInt(s["텍스트 시작 X"])),s["큰 페이스칩 OX"]&&(RS.MessageSystem.Params.faceOX=Number(s["큰 페이스칩 OX"])),s["큰 페이스칩 OY"]&&(RS.MessageSystem.Params.faceOY=Number(s["큰 페이스칩 OY"])),s["대화창 뒤에 얼굴 표시"]&&(RS.MessageSystem.Params.faceSide=Boolean("true"===s["대화창 뒤에 얼굴 표시"])),s["대화창 투명도"]&&(RS.MessageSystem.Params.defaultOpacity=parseInt(s["대화창 투명도"])),s["텍스트 효과음 재생 여부"]&&(RS.MessageSystem.Params.isPlayTextSound=Boolean("true"===s["텍스트 효과음 재생 여부"])),s["기본 텍스트 출력 속도"]&&(RS.MessageSystem.Params.textSpeed=Number(s["기본 텍스트 출력 속도"]))},Game_Interpreter.prototype.isValidMultiLine=function(){const e=[];let t=401,s=0;for(let a=1;a<8;a++){const n=this._list[this._index+a];if(n){const a=n.code;e.push(a),t=a,[101,401].contains(a)&&s++}}return!e.contains(102)&&(!e.contains(103)&&(!($gameMessage.getMaxLine()<=4)&&(!(s<=4)&&"RMXP"!=RS.MessageSystem.Params.choiceWindowStyle)))},Game_Interpreter.prototype.command101=function(e){if($gameMessage.isBusy())return!1;if($gameMap.setMsgEvent(this.character(this._eventId>0?0:-1)),$gameMessage.setFaceImage(e[0],e[1]),$gameMessage.setBackground(e[2]),$gameMessage.setPositionType(e[3]),$gameMessage.setSpeakerName(e[4]),this.processMessageParams(this._eventId,this._index),this.isMultiLine())this.multiLineAddMessage();else for(;401===this.nextEventCode();)this._index++,$gameMessage.add(this.currentCommand().parameters[0]);switch(this.nextEventCode()){case 102:this._index++,this.setupChoices(this.currentCommand().parameters);break;case 103:this._index++,this.setupNumInput(this.currentCommand().parameters);break;case 104:this._index++,this.setupItemChoice(this.currentCommand().parameters)}return this.setWaitMode("message"),!0},Game_Interpreter.prototype.multiLineAddMessage=function(){for(this.initLineHeight();$gameMessage._texts.length<$gameMessage.getMaxLine();){for(;401===this.nextEventCode()&&(this._index++,$gameMessage.add(this.currentCommand().parameters[0]),this.addLineHeight(),!(this._lineHeight>=$gameMessage.getMaxLine())););if(101!==this.nextEventCode())break}for(;401===this.nextEventCode();)this._index++},Game_Interpreter.prototype.initLineHeight=function(){this._lineHeight=0},Game_Interpreter.prototype.isMultiLine=function(){return this.isValidMultiLine()},Game_Interpreter.prototype.addLineHeight=function(){this._lineHeight++,101===this.nextEventCode()&&this._index++},Window_NameBox.prototype.updatePlacement=function(){this.width=this.windowWidth(),this.height=this.windowHeight();const e=this._messageWindow;$gameMessage.isRTL()?this.x=e.x+e.width-this.width:this.x=e.x,e.y>0?this.y=e.y-this.height:this.y=e.y+e.height},Game_Temp.prototype.setMSHeightFunc=function(e){this._callMSHeightFunc=e},Game_Temp.prototype.setMaxLine=function(e){this._callMSHeightFunc&&this._callMSHeightFunc(e)};const M=Game_Map.prototype.initialize;Game_Map.prototype.initialize=function(){M.call(this),this._msgOwner=$gamePlayer,this._msgEvent=0},Game_Map.prototype.getMsgOwner=function(){return this._msgOwner},Game_Map.prototype.setMsgOwner=function(e){this._msgOwner=e,$gameMessage.setBalloonPatternHeight(this.tileHeight())},Game_Map.prototype.getMsgEvent=function(){return this._msgEvent},Game_Map.prototype.setMsgEvent=function(e){this._msgEvent=e};const f=Scene_Message.prototype.associateWindows;Scene_Message.prototype.associateWindows=function(){f.call(this);const e=this._messageWindow;i.DependencyInjector.injectMessageWindow(e),i.DependencyInjector.ready()},Scene_Message.prototype.messageWindowRect=function(){const e=Graphics.width,t=this.calcWindowHeight(4,!1)+8,s=(Graphics.height-e)/2;return new Rectangle(s,0,e,t)};const R=Scene_Message.prototype.terminate;if(Scene_Message.prototype.terminate=function(){R.call(this),i.DependencyInjector.ejectMessageWindow()},RS.MessageSystem.initSystem(),RS.MessageSystem.Params.DEBUG){nw.Window.get().showDevTools();nw.Window.get().moveTo(window.outerWidth/3,153)}}).ready("bitmap").ready("main").executeAll()},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Color=void 0;const pluginParams=$plugins.filter(e=>e.description.contains("<RS_MessageSystem>")),pluginName=pluginParams.length>0&&pluginParams[0].name,parameters=pluginParams.length>0&&pluginParams[0].parameters,RS={MessageSystem:{}};var MessageParams;RS.MessageSystem.jsonParse=function(e){return JSON.parse(e,(e,t)=>{try{return RS.MessageSystem.jsonParse(t)}catch(e){return t}})},RS.MessageSystem.popParameter=function(...e){const t=Object.keys(e);let s="";for(;t.length>0;)if(s=e[parseInt(t.pop())],parameters[s])return parameters[s];return""},RS.MessageSystem.Reg={Default:[],Group:[],Korean:[],Chinese:[],English:[],Japanese:[]},function(e){e[e.FACE_START_ORIGIN_X=168]="FACE_START_ORIGIN_X",e[e.NAME_WINDOW_WIDTH=140]="NAME_WINDOW_WIDTH",e[e.NAME_WINDOW_ROWS=1]="NAME_WINDOW_ROWS",e[e.FONT_SIZE=28]="FONT_SIZE",e[e.STD_PADDING=18]="STD_PADDING"}(MessageParams||(MessageParams={})),RS.MessageSystem.Params={faceStartOriginX:MessageParams.FACE_START_ORIGIN_X,nameWindowWidth:MessageParams.NAME_WINDOW_WIDTH,nameWindowRows:MessageParams.NAME_WINDOW_ROWS,FONT_SIZE:MessageParams.FONT_SIZE,STD_PADDING:MessageParams.STD_PADDING,isValidShakingChoice:!1,fontSize:Number(RS.MessageSystem.popParameter("Font Size","글꼴 크기")||28),textSpeed:Number(RS.MessageSystem.popParameter("Text Speed","기본 텍스트 출력 속도")||0),minFontSize:Number(RS.MessageSystem.popParameter("Text Min Size","폰트 최소 크기")||24),maxFontSize:Number(RS.MessageSystem.popParameter("Text Max Size","폰트 최대 크기")||96),textStartX:Number(RS.MessageSystem.popParameter("Text Start X","텍스트 시작 X")),numVisibleRows:Number(RS.MessageSystem.popParameter("numVisibleRows","라인 갯수")||4),gradientColor1:String(RS.MessageSystem.popParameter("gradientColor1","그레디언트 시작 색상")||"#FFFFFF"),gradientColor2:String(RS.MessageSystem.popParameter("gradientColor2","그레디언트 중간 색상")||"#F29661"),gradientColor3:String(RS.MessageSystem.popParameter("gradientColor3","그레디언트 끝 색상")||"#CC3D3D"),nameWindowX:Number(RS.MessageSystem.popParameter("Name Window X","이름 윈도우 X")||0),nameWindowY:Number(RS.MessageSystem.popParameter("Name Window Y","이름 윈도우 Y")||0),nameWindowStdPadding:Number(RS.MessageSystem.popParameter("Name Window Inner Padding","이름 윈도우 안쪽 여백")||18),namePositionTypeAtX:RS.MessageSystem.popParameter("Name Window Position","이름 윈도우 위치")||"left",faceOX:Number(RS.MessageSystem.popParameter("Big Face OX","큰 페이스칩 OX")||0),faceOY:Number(RS.MessageSystem.popParameter("Big Face OY","큰 페이스칩 OY")||0),faceSide:Boolean("true"===RS.MessageSystem.popParameter("Show Big Face Back","대화창 뒤에 얼굴 표시")||!1),WIDTH:6*MessageParams.FONT_SIZE+MessageParams.STD_PADDING,HEIGHT:MessageParams.FONT_SIZE+MessageParams.STD_PADDING/2,TabSize:Number(RS.MessageSystem.popParameter("Tab Size","탭 크기")),backOpacity:Number(RS.MessageSystem.popParameter("back Opacity","배경 그림의 투명도")),translucentOpacity:Number(RS.MessageSystem.popParameter("translucent Opacity","반투명도")),defaultOpacity:Number(RS.MessageSystem.popParameter("default Opacity","기본 투명도")),contentsOpacity:Number(RS.MessageSystem.popParameter("contents Opacity","내용의 투명도")),defaultOutlineWidth:Number(RS.MessageSystem.popParameter("default outline width","테두리 크기")),defaultOutlineColor:RS.MessageSystem.popParameter("default outline Color","테두리 색상")||"white",fonts:{default:"rmmz-mainfont"},isTempSpriteContainerVisibility:!1,lineHeight:36,windowOffset:new Point(-4,-4),fontSmoothingEnabled:!0,customFont:Boolean("true"===RS.MessageSystem.popParameter("Using Custom Font","사용자 지정 폰트 사용 여부")),customFontName:String(RS.MessageSystem.popParameter("Custom Font Name","사용자 지정 폰트명")||"GameFont"),customFontSrc:String(RS.MessageSystem.popParameter("Custom Font Src","사용자 지정 폰트 경로")||"fonts/mplus-1m-regular.ttf"),windowskin:RS.MessageSystem.popParameter("Default Windowskin","기본 윈도우스킨")||"Window",windowskinForNameWindow:RS.MessageSystem.popParameter("Name Windowskin","이름 윈도우스킨")||"Window",choiceWindowStyle:String(RS.MessageSystem.popParameter("Choice Style","선택지 스타일")||"default"),defaultChoicePostion:parameters["Default Choice Position"]||"right",exTextColors:RS.MessageSystem.jsonParse(RS.MessageSystem.popParameter("Text Color","텍스트 색상")),isPlayTextSound:Boolean("true"===RS.MessageSystem.popParameter("Text Sound ON/OFF","텍스트 효과음 재생 여부")),pathTextSound:String(RS.MessageSystem.popParameter("Text Sound","텍스트 효과음")||"Cursor1.ogg"),textSoundEval1:RS.MessageSystem.jsonParse(RS.MessageSystem.popParameter("Text Sound Execution Condition","텍스트 효과음 실행 조건")||"Math.randomInt(100) < 45"),textSoundEval2:RS.MessageSystem.jsonParse(RS.MessageSystem.popParameter("Text Sound Volume","텍스트 효과음 볼륨")||"(0.4 + (RS.MessageSystem.randomNormal(0.8)[0])).clamp(0.0, 0.8)"),textSoundInterval:parseInt(RS.MessageSystem.popParameter("Text Sound Interval","텍스트 사운드 재생 간격")),textSoundPoolSize:parseInt(RS.MessageSystem.popParameter("텍스트 사운드 풀 크기","Text Sound Pool Size")||6),langCode:RS.MessageSystem.popParameter("언어 코드","Language Code")||"ko",preloadWindowskins:JSON.parse(parameters["preload windowskin"]||"[]"),isParagraphMinifier:Boolean("true"===parameters["Paragraph Minifier"]),gradientStyle:parameters["Gradient Style"],faceOpacity:parseInt(parameters["face Opacity"]||21),faceDirection:parseInt(parameters["face Direction"]||0),DEBUG:!0},(()=>{const e=RS.MessageSystem.jsonParse(parameters.systemFont);RS.MessageSystem.Params.fonts&&e.settings.forEach(e=>{const t={};t[e.languageCode]=e.fontName,Object.assign(RS.MessageSystem.Params.fonts,t)})})();var alias_Game_Temp_initialize=Game_Temp.prototype.initialize;Game_Temp.prototype.initialize=function(){alias_Game_Temp_initialize.call(this),RS.MessageSystem.Params.windowWidth=eval(parameters["Window Width"])||Graphics.boxWidth},RS.MessageSystem.Reg.KoreanEscapeCode=/^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-힣]+[!]*/i,RS.MessageSystem.Reg.ChineseEscapeCode=/^[\$\.\|\^!><\{\}\\]|^[a-zA-Z一-鼣]+[!]*/i,RS.MessageSystem.Reg.EnglishEscapeCode=/^[\$\.\|\^!><\{\}\\]|^[A-Z]+[!]*/i,RS.MessageSystem.Reg.JapaneseEscapeCode=/^[\$\.\|\^!><\{\}\\]|^[A-Z\u3040-\u309F\u30A0-\u30FF\u3300-\u33FF\u4E00-\u9FFF\uFF00-\uFFEF]+[!]*/i,RS.MessageSystem.Reg.defaultEscapeCode=/^[\$\.\|\^!><\{\}\\]|^[A-Z가-힣]+[!]*/i,RS.MessageSystem.TextCodes=function(){const e=RS.MessageSystem.popParameter("Text Code","텍스트 코드"),t=JSON.parse(e),s={};return s.Korean=[void 0].concat(JSON.parse(t.Korean)),s.Chinese=[void 0].concat(JSON.parse(t.Chinese)),s.English=[void 0].concat(JSON.parse(t.English)),s.Japanese=[void 0].concat(JSON.parse(t.Japanese)),s}(),RS.MessageSystem.TextCodes.Main=[],RS.MessageSystem.TextCodes.ENUM={COLOR:1,TEXT_SPEED:2,OUTLINE_COLOR:3,OUTLINE_WIDTH:4,INDENT:5,BOLD:6,ITALIC:7,NAME:8,GRADIENT:9,PARTY_MEMBER:10,PLAYER:11,VAR:12,ICON:13,INCREASE:14,DECREASE:15,GOLD:16,BALLOON:17,ALIGN:18,NUM:19,TEXT_SIZE:20,TAB:21,CARRIAGE_RETURN:22,PLAY_SE:23,SHOW_PICTURE:24,HIDE_PICTURE:25,ITEM:26,WEAPON:27,ARMOR:28,CLASSES:29,ENEMY:30,STATE:31,SKILL:32,FACE:33,FRIENDLY_TROOPS:34,ENEMY_TROOPS:35,WAIT_SEC_15:36,WAIT_SEC_60:37,START_PAUSE:38,LINE_SHOW_FAST_LT:39,LINE_SHOW_FAST_GT:40,PAUSE_SKIP:41,BOLD_START:42,BOLD_END:43,ITALIC_START:44,ITALIC_END:45,ALIGN_LEFT:46,ALIGN_CENTER:47,ALIGN_RIGHT:48,BOLD_START_CV:49,BOLD_END_CV:50,ITALIC_START_CV:51,ITALIC_END_CV:52,ALIGN_CLEAR:53,HIGHLIGHT_TEXT_COLOR:54,FACE_DIRECTION:55},RS.MessageSystem.getTextCode=function(e){const t=RS.MessageSystem.Params.langCode;return t.match(/ko/)?RS.MessageSystem.TextCodes.Korean[e]:t.match(/zh/)?RS.MessageSystem.TextCodes.Chinese[e]:t.match(/en/)?RS.MessageSystem.TextCodes.English[e]:t.match(/ja/)?RS.MessageSystem.TextCodes.Japanese[e]:RS.MessageSystem.TextCodes.English[e]},RS.MessageSystem.getEventComments=function(e,t){let s={note:"",meta:{}};try{let n=$gameMap.event(e).list();if(t<0&&(t=0),e<=0){var a=$gameTemp.reservedCommonEvent();if(a&&(n=a.list,!n))return s}let i=n[t];for(;i&&[108,408].contains(i.code);)s.note+=i.parameters[0]+"\r\n",i=n[--t];if(i&&108===i.code){for(s.note+=i.parameters[0]+"\r\n",i=n[--t];408===i.code;)s.note+=i.parameters[0]+"\r\n",i=n[--t];108===i.code&&(s.note+=i.parameters[0]+"\r\n")}const o=/<([^<>:]+)(:?)([^>]*)>/g;for(s.meta={};;){const e=o.exec(s.note);if(!e)break;":"===e[2]?s.meta[e[1].trim()]=e[3]:s.meta[e[1].trim()]=!0}}catch(e){return{note:"",meta:{}}}return s.meta},["Korean","English","Chinese","Japanese"].forEach((function(e,t,s){var a=RS.MessageSystem.TextCodes[e];a=a.map((e,t,s)=>{if(void 0!==e){var a=[];for(var n of e)a.push(n);return a.join("")}}),RS.MessageSystem.Reg[e][0]=void 0,RS.MessageSystem.Reg[e][1]=new RegExp(`(?:C|${a[1]})\\[(.+?)\\]`,"gi"),RS.MessageSystem.Reg[e][2]=new RegExp(`${a[2]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][3]=new RegExp(`${a[3]}\\[(.+?)\\]`,"gi"),RS.MessageSystem.Reg[e][4]=new RegExp(`${a[4]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][5]=new RegExp(`${a[5]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][6]=new RegExp(""+a[6],"gi"),RS.MessageSystem.Reg[e][7]=new RegExp(""+a[7],"gi"),RS.MessageSystem.Reg[e][8]=new RegExp(`${a[8]}\\<(.+?)\\>`,"gi"),RS.MessageSystem.Reg[e][9]=new RegExp(`${a[9]}\\<(.+)\\>`,"gi"),RS.MessageSystem.Reg[e][10]=new RegExp(`(?:P|${a[10]})\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][11]=new RegExp(`(?:N|${a[11]})\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][12]=new RegExp(`(?:V|${a[12]})\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][13]=new RegExp(`(?:I|${a[13]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][14]=new RegExp(`(?:{|${a[14]})`,"gi"),RS.MessageSystem.Reg[e][15]=new RegExp(`(?:}|${a[15]})`,"gi"),RS.MessageSystem.Reg[e][16]=new RegExp(`(?:G|${a[16]})`,"gi"),RS.MessageSystem.Reg[e][17]=new RegExp(`${a[17]}\\[(.*?)\\]`,"gi"),RS.MessageSystem.Reg[e][18]=new RegExp(`${a[18]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][19]=new RegExp(`${a[19]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][20]=new RegExp(`${a[20]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][21]=new RegExp(""+a[21],"gi"),RS.MessageSystem.Reg[e][22]=new RegExp(""+a[22],"gi"),RS.MessageSystem.Reg[e][23]=new RegExp(`${a[23]}\\<(.+?)\\>`,"gi"),RS.MessageSystem.Reg[e][24]=new RegExp(`${a[24]}\\<(.+?)\\>`,"gi"),RS.MessageSystem.Reg[e][25]=new RegExp(`${a[25]}\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][26]=new RegExp(`(?:${a[26]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][27]=new RegExp(`(?:${a[27]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][28]=new RegExp(`(?:${a[28]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][29]=new RegExp(`(?:${a[29]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][30]=new RegExp(`(?:${a[30]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][31]=new RegExp(`(?:${a[31]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][32]=new RegExp(`(?:${a[32]})\\[(\\d+)\\]`,"g"),RS.MessageSystem.Reg[e][33]=new RegExp(`${a[33]}\\<(.*)\\>`,"gi"),RS.MessageSystem.Reg[e][34]=new RegExp(`(?:${a[34]})\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][35]=new RegExp(`(?:${a[35]})\\[(\\d+)\\]`,"gi"),RS.MessageSystem.Reg[e][36]=new RegExp(""+a[36],"gi"),RS.MessageSystem.Reg[e][37]=new RegExp(""+a[37],"gi"),RS.MessageSystem.Reg[e][38]=new RegExp(""+a[38],"gi"),RS.MessageSystem.Reg[e][39]=new RegExp(""+a[39],"gi"),RS.MessageSystem.Reg[e][40]=new RegExp(""+a[40],"gi"),RS.MessageSystem.Reg[e][41]=new RegExp(""+a[41],"gi"),RS.MessageSystem.Reg[e][42]=new RegExp(""+a[42],"gi"),RS.MessageSystem.Reg[e][43]=new RegExp(""+a[43],"gi"),RS.MessageSystem.Reg[e][44]=new RegExp(""+a[44],"gi"),RS.MessageSystem.Reg[e][45]=new RegExp(""+a[45],"gi"),RS.MessageSystem.Reg[e][46]=new RegExp(`(?:<${a[46]}>)`,"gi"),RS.MessageSystem.Reg[e][47]=new RegExp(`(?:<${a[47]}>)`,"gi"),RS.MessageSystem.Reg[e][48]=new RegExp(`(?:<${a[48]}>)`,"gi"),RS.MessageSystem.Reg[e][49]=new RegExp(`(?:<[${a[49]}]>)`,"gi"),RS.MessageSystem.Reg[e][50]=new RegExp(`(?:</[${a[50]}]>)`,"gi"),RS.MessageSystem.Reg[e][51]=new RegExp(`(?:<[${a[51]}]>)`,"gi"),RS.MessageSystem.Reg[e][52]=new RegExp(`(?:</[${a[52]}]>)`,"gi"),RS.MessageSystem.Reg[e][53]=new RegExp(""+a[53],"gi"),RS.MessageSystem.Reg[e][54]=new RegExp(`${a[54]}\\[(.*)\\]`,"gi"),RS.MessageSystem.Reg[e][55]=new RegExp(`${a[55]}\\[(\\d+)\\]`,"gi")})),RS.MessageSystem.initSystem=function(){var e=RS.MessageSystem.Params.langCode,t=!1;e.match(/ko/)&&(RS.MessageSystem.Reg.Group=RS.MessageSystem.Reg.Korean,RS.MessageSystem.Reg.defaultEscapeCode=RS.MessageSystem.Reg.KoreanEscapeCode,RS.MessageSystem.TextCodes.Main=RS.MessageSystem.TextCodes.Korean,t=!0),e.match(/zh/)&&(RS.MessageSystem.Reg.Group=RS.MessageSystem.Reg.Chinese,RS.MessageSystem.Reg.defaultEscapeCode=RS.MessageSystem.Reg.ChineseEscapeCode,RS.MessageSystem.TextCodes.Main=RS.MessageSystem.TextCodes.Chinese,t=!0),e.match(/en/)&&(RS.MessageSystem.Reg.Group=RS.MessageSystem.Reg.English,RS.MessageSystem.Reg.defaultEscapeCode=RS.MessageSystem.Reg.EnglishEscapeCode,RS.MessageSystem.TextCodes.Main=RS.MessageSystem.TextCodes.English,t=!0),e.match(/ja/)&&(RS.MessageSystem.Reg.Group=RS.MessageSystem.Reg.Japanese,RS.MessageSystem.Reg.defaultEscapeCode=RS.MessageSystem.Reg.JapaneseEscapeCode,RS.MessageSystem.TextCodes.Main=RS.MessageSystem.TextCodes.Japanese,t=!0),!1===t&&(RS.MessageSystem.Reg.Group=RS.MessageSystem.Reg.English,RS.MessageSystem.Reg.defaultEscapeCode=RS.MessageSystem.Reg.EnglishEscapeCode,RS.MessageSystem.TextCodes.Main=RS.MessageSystem.TextCodes.English)},exports.Color={},exports.Color.getColor=function(e){return`rgba(${255&e},${e>>8&255},${e>>16&255},1)`},exports.Color.baseColor=exports.Color.getColor(16777215),exports.Color.getBaseColor=function(){return exports.Color.baseColor},exports.Color.getUserCustomColor=function(e){var t=RS.MessageSystem.Params.exTextColors,s=e;return"object"!=typeof t[0]?s:t[0].hasOwnProperty("Color Name")?(t.forEach((t,a,n)=>{if(t["Color Name"]===e){var i=parseInt(t.Red)||0,o=parseInt(t.Green)||0,r=parseInt(t.Blue)||0,g=parseFloat(t.Alpha)||1;s=`rgba(${i},${o},${r},${g})`}}),s):s};const KOREAN_COLORS={"청록":"rgba(0,255,255,1)","청록색":"rgba(0,255,255,1)",c_aqua:"rgba(0,255,255,1)","검은색":"rgba(0,0,0,1)","검정":"rgba(0,0,0,1)",c_black:"rgba(0,0,0,1)","파란색":"rgba(0,0,255,1)","파랑":"rgba(0,0,255,1)",c_blue:"rgba(0,0,255,1)","짙은회색":"rgba(64,64,64,1)",c_dkgray:"rgba(64,64,64,1)","자홍색":"rgba(255,0,255,1)","자홍":"rgba(255,0,255,1)",c_fuchsia:"rgba(255,0,255,1)","회색":"rgba(128,128,128,1)",c_gray:"rgba(128,128,128,1)","녹색":"rgba(0,128,0,1)",c_green:"rgba(0,128,0,1)","밝은녹색":"rgba(0,255,0,1)","라임":"rgba(0,255,0,1)",c_lime:"rgba(0,255,0,1)","밝은회색":"rgba(192,192,192,1)",c_ltgray:"rgba(192,192,192,1)","밤색":"rgba(128,0,0,1)","마룬":"rgba(128,0,0,1)",c_maroon:"rgba(128,0,0,1)","감청색":"rgba(0,0,128,1)","네이비":"rgba(0,0,128,1)",c_navy:"rgba(0,0,128,1)","황록색":"rgba(128,128,0,1)","올리브":"rgba(128,128,0,1)",c_olive:"rgba(128,128,0,1)","주황색":"rgba(255,160,64,1)","주황":"rgba(255,160,64,1)","오렌지":"rgba(255,160,64,1)",c_orange:"rgba(255,160,64,1)","보라색":"rgba(128,0,128,1)","보라":"rgba(128,0,128,1)",c_purple:"rgba(128,0,128,1)","빨간색":"rgba(255,0,0,1)","빨강":"rgba(255,0,0,1)",c_red:"rgba(255,0,0,1)","은색":"rgba(192,192,192,1)","은":"rgba(192,192,192,1)",c_silver:"rgba(192,192,192,1)","민트색":"rgba(0,128,128,1)",c_teal:"rgba(0,128,128,1)","흰색":"rgba(255,255,255,1)","흰":"rgba(255,255,255,1)",c_white:"rgba(255,255,255,1)","노란색":"rgba(255,255,0,1)","노랑":"rgba(255,255,0,1)",c_yellow:"rgba(255,255,0,1)"},CHINESE_COLOR={"水色":"rgba(0,255,255,1)",c_aqua:"rgba(0,255,255,1)","黑色":"rgba(0,0,0,1)",c_black:"rgba(0,0,0,1)","蓝色":"rgba(0,0,255,1)",c_blue:"rgba(0,0,255,1)","深灰色":"rgba(64,64,64,1)",c_dkgray:"rgba(64,64,64,1)","紫红色":"rgba(255,0,255,1)",c_fuchsia:"rgba(255,0,255,1)","灰色":"rgba(128,128,128,1)",c_gray:"rgba(128,128,128,1)","绿色":"rgba(0,128,0,1)",c_green:"rgba(0,128,0,1)","浅绿色":"rgba(0,255,0,1)",c_lime:"rgba(0,255,0,1)","浅灰色":"rgba(192,192,192,1)",c_ltgray:"rgba(192,192,192,1)","栗色":"rgba(128,0,0,1)",c_maroon:"rgba(128,0,0,1)","绀青色":"rgba(0,0,128,1)",c_navy:"rgba(0,0,128,1)","黄绿色":"rgba(128,128,0,1)",c_olive:"rgba(128,128,0,1)","橙黄色":"rgba(255,160,64,1)",c_orange:"rgba(255,160,64,1)","紫色":"rgba(128,0,128,1)",c_purple:"rgba(128,0,128,1)","红色":"rgba(255,0,0,1)",c_red:"rgba(255,0,0,1)","银白色":"rgba(192,192,192,1)",c_silver:"rgba(192,192,192,1)","水鸭色":"rgba(0,128,128,1)",c_teal:"rgba(0,128,128,1)","白色":"rgba(255,255,255,1)",c_white:"rgba(255,255,255,1)","黄色":"rgba(255,255,0,1)",c_yellow:"rgba(255,255,0,1)"},ENGLISH_COLOR={AQUA:"rgba(0,255,255,1)",c_aqua:"rgba(0,255,255,1)",BLACK:"rgba(0,0,0,1)",c_black:"rgba(0,0,0,1)",BLUE:"rgba(0,0,255,1)",c_blue:"rgba(0,0,255,1)",DKGRAY:"rgba(64,64,64,1)",c_dkgray:"rgba(64,64,64,1)",FUCHSIA:"rgba(255,0,255,1)",c_fuchsia:"rgba(255,0,255,1)",GRAY:"rgba(128,128,128,1)",c_gray:"rgba(128,128,128,1)",GREEN:"rgba(0,128,0,1)",c_green:"rgba(0,128,0,1)",LIME:"rgba(0,255,0,1)",c_lime:"rgba(0,255,0,1)",LTGRAY:"rgba(192,192,192,1)",c_ltgray:"rgba(192,192,192,1)",MAROON:"rgba(128,0,0,1)",c_maroon:"rgba(128,0,0,1)",NAVY:"rgba(0,0,128,1)",c_navy:"rgba(0,0,128,1)",OLIVE:"rgba(128,128,0,1)",c_olive:"rgba(128,128,0,1)",ORANGE:"rgba(255,160,64,1)",c_orange:"rgba(255,160,64,1)",PURPLE:"rgba(128,0,128,1)",c_purple:"rgba(128,0,128,1)",RED:"rgba(255,0,0,1)",c_red:"rgba(255,0,0,1)",SILVER:"rgba(192,192,192,1)",c_silver:"rgba(192,192,192,1)",TEAL:"rgba(0,128,128,1)",c_teal:"rgba(0,128,128,1)",WHITE:"rgba(255,255,255,1)",c_white:"rgba(255,255,255,1)",YELLOW:"rgba(255,255,0,1)",c_yellow:"rgba(255,255,0,1)"},JAPANESE_COLOR={"水色":"rgba(0,255,255,1)","アクア色":"rgba(0,255,255,1)",c_aqua:"rgba(0,255,255,1)","黑色":"rgba(0,0,0,1)",c_black:"rgba(0,0,0,1)","靑色":"rgba(0,0,255,1)",c_blue:"rgba(0,0,255,1)","ふか灰色":"rgba(64,64,64,1)",c_dkgray:"rgba(64,64,64,1)","紫紅色":"rgba(255,0,255,1)",c_fuchsia:"rgba(255,0,255,1)","灰色":"rgba(128,128,128,1)",c_gray:"rgba(128,128,128,1)","綠色":"rgba(0,128,0,1)",c_green:"rgba(0,128,0,1)","黃綠":"rgba(0,255,0,1)",c_lime:"rgba(0,255,0,1)","鼠色":"rgba(192,192,192,1)",c_ltgray:"rgba(192,192,192,1)","―色":"rgba(128,0,0,1)",c_maroon:"rgba(128,0,0,1)","群青色":"rgba(0,0,128,1)","ネイビー":"rgba(0,0,128,1)",c_navy:"rgba(0,0,128,1)","黃綠色":"rgba(128,128,0,1)","オリーブ色":"rgba(128,128,0,1)",c_olive:"rgba(128,128,0,1)","橙色":"rgba(255,160,64,1)","オレンジ色":"rgba(255,160,64,1)",c_orange:"rgba(255,160,64,1)","紫色":"rgba(128,0,128,1)",c_purple:"rgba(128,0,128,1)","赤色":"rgba(255,0,0,1)","レッド":"rgba(255,0,0,1)",c_red:"rgba(255,0,0,1)","銀色":"rgba(192,192,192,1)",c_silver:"rgba(192,192,192,1)","ミント色":"rgba(0,128,128,1)","薄荷色":"rgba(0,128,128,1)",c_teal:"rgba(0,128,128,1)","白色":"rgba(255,255,255,1)",c_white:"rgba(255,255,255,1)","黃色":"rgba(255,255,0,1)",c_yellow:"rgba(255,255,0,1)"};RS.MessageSystem.getKoreanColor=function(e){let t=KOREAN_COLORS[e];return t||(["기본","기본색","c_normal"].contains(e)?exports.Color.getBaseColor():exports.Color.getUserCustomColor(e))},RS.MessageSystem.getChineseColor=function(e){let t=CHINESE_COLOR[e];return t||(["通常","c_normal"].contains(e)?exports.Color.getBaseColor():exports.Color.getUserCustomColor(e))},RS.MessageSystem.getEnglishColor=function(e){let t=ENGLISH_COLOR[e];return t||("c_normal"===e?exports.Color.getBaseColor():exports.Color.getUserCustomColor(e))},RS.MessageSystem.getJapaneseColor=function(e){let t=JAPANESE_COLOR[e];return t||(["基本色","c_normal"].contains(e)?exports.Color.getBaseColor():exports.Color.getUserCustomColor(e))},RS.MessageSystem.getBrowser=function(){var e,t=navigator.userAgent,s=t.match(/(opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];if(/trident/i.test(s[1]))return{name:"IE",version:(e=/\brv[ :]+(\d+)/g.exec(t)||[])[1]||""};if("Chrome"===s[1]){if(null!=(e=t.match(/\bOPR\/(\d+)/)))return{name:"Opera",version:e[1]};if(null!=(e=t.match(/\bEdge\/(\d+)/)))return{name:"Edge",version:e[1]}}return s=s[2]?[s[1],s[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(e=t.match(/version\/(\d+)/i))&&s.splice(1,1,e[1]),{name:s[0],version:s[1]}},exports.Color.gmColor=function(e){const t=RS.MessageSystem.Params.langCode;return t.match(/ko/)?RS.MessageSystem.getKoreanColor(e):t.match(/zh/)?RS.MessageSystem.getChineseColor(e):t.match(/en/)?RS.MessageSystem.getEnglishColor(e):t.match(/ja/)?RS.MessageSystem.getJapaneseColor(e):RS.MessageSystem.getEnglishColor(e)},window.RS=RS},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DependencyInjector=void 0;const a=s(4),n=s(0),i=s(7);class o{static injectMessageWindow(e){o._messageWindow=e,o.inject(e)}static ejectMessageWindow(){o._isDirty&&(o._messageWindow=void 0,o.COMPONENTS=void 0,o._isDirty=!1)}static inject(e){o._isDirty?console.log("components are already injected"):(o.COMPONENTS=[new a.BalloonWindowTransformComponent({messageWindow:e}),new i.NameWindowPositionComponent({messageWindow:e})],o._isDirty=!0)}static getComponent(e){return o.COMPONENTS.filter(t=>t instanceof o.getComponentClass(e)).pop()}static getComponentClass(e){switch(e){case"BalloonWindowTransformComponent":return a.BalloonWindowTransformComponent;case"NameWindowPositionComponent":return i.NameWindowPositionComponent;default:return n.BaseComponent}}static ready(){o.COMPONENTS&&o.COMPONENTS.forEach(e=>{e.ready()})}}t.DependencyInjector=o,o._components={},o._isDirty=!1},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BalloonWindowTransformComponent=void 0;const a=s(0);class n extends a.BaseComponent{constructor(){super(...arguments),this._bWidth=0,this._bHeight=0}onReady(e){super.onReady(e),this._bWidth=this.width,this._bHeight=this.height}calcBalloonRect(e){this.save();{const t=this.textSizeEx(e),s=this.standardPadding();this._bWidth=t.width+2*s,this._bHeight=Math.max(t.height+2*s,this.fittingHeight(1))}this.restore()}textSizeEx(e){this.messageWindow._isUsedTextWidthEx=!0;const t=this.messageWindow.textSizeEx(e);return this.messageWindow._isUsedTextWidthEx=!1,t}updatePlacement(){this.messageWindow.updatePlacement()}isActiveInBalloon(){return!(-2===$gameMessage.getBalloon())||(this.updatePlacement(),!1)}setBalloonRect(e){const t=$gameMessage.faceName(),s=RS.MessageSystem.Params.faceDirection,a=RS.MessageSystem.Params.windowOffset.x,n=RS.MessageSystem.Params.windowOffset.y;this.x=e.dx+a,this.y=e.dy+n,this.width=this._bWidth,this.height=this._bHeight,t&&2===s&&this.drawMessageFace()}setBalloonPlacement(e){Graphics.width,Graphics.height;const t=Graphics.boxWidth,s=Graphics.boxHeight;if(console.log("setBalloonPlacement() + "+JSON.stringify(e)),e)return e.mx-this._bWidth/2<0&&(e.dx=0,e.tx=this.canvasToLocalX(e.mx)),e.mx-this._bWidth/2>t-this._bWidth&&(e.dx=t-this._bWidth,e.tx=this.canvasToLocalX(e.mx)),e.my-this._bHeight-e.tileHeight/2<0&&(e.dy=e.my+e.tileHeight/2,e.scaleY=-1,e.ty=this._height*e.scaleY+this._height,e.ny=this.y+this._bHeight+RS.MessageSystem.Params.nameWindowY),e.my-this._bHeight>s-this._bHeight&&(e.dy=s-this._bHeight,e.ty=this._height),e}updateSubBalloonElements(e){const t=this.messageWindow._pauseSignSprite;t&&(t.move(e.tx,e.ty),t.scale.y=e.scaleY),this._nameWindow.y=e.ny}getNameWindowY(){const e=this.y-this._nameWindow.height-RS.MessageSystem.Params.nameWindowY;return e||0}updateBalloonPosition(){console.log("============ DEBUG updateBalloonPosition() ====================");let e={};if(!this.isActiveInBalloon())return;const t=$gameMap.getMsgOwner();if(!t)throw console.warn($gameMap.getMsgOwner()),new Error("말풍선 소유자가 없습니다.");e.mx=t.screenX(),e.my=t.screenY(),console.log("%d %d",e.mx,e.my),e.tx=this._bWidth/2,e.ty=this._bHeight,e.scaleY=1,e.tileHeight=$gameMessage.getBalloonPatternHeight(),e.dx=e.mx-this._bWidth/2,e.dy=e.my-this._bHeight-e.tileHeight,e.ny=this.getNameWindowY(),console.log(JSON.stringify(e)),e=this.setBalloonPlacement(e),e.dx+RS.MessageSystem.Params.windowOffset.x===this.x&&e.dy+RS.MessageSystem.Params.windowOffset.y===this.y&&this._bWidth===this.width&&this._bHeight===this.height||(this.setBalloonRect(e),this.updateSubBalloonElements(e))}updateBalloonPositionInBattle(){if(!$gameParty.inBattle())return void console.warn("전투가 아닙니다");if(!$gameSystem.isSideView())return void console.warn("사이드뷰 전투가 아닙니다.");let e={},t=$gameMap.getMsgOwner();if(!t)return void console.warn("owner 변수가 없습니다");if(!t.hasOwnProperty("type"))return void console.warn("type 속성이 없습니다 : "+t);if(!t.hasOwnProperty("id"))return void console.warn("id 속성이 없습니다 : "+t);let s,a=SceneManager._scene;if(!(a instanceof Scene_Battle))return console.warn("전투 장면이 아닙니다"),!1;s="actor"===t.type?a._spriteset._actorSprites:a._spriteset._enemySprites;let n=[];n=s;let i=n[t.id];i?"actor"===t.type&&!i._actor.isAlive()||"enemy"===t.type&&!i._enemy.isAlive()||(e.mx=i.x,e.my=i.y,e.padY="actor"===t.type?i._mainSprite.bitmap.height/6:i.bitmap.height,e.tx=this._width/2,e.ty=this._height,e.scaleY=1,e.tileHeight=$gameMessage.getBalloonPatternHeight(),e.dx=e.mx-this._bWidth/2,e.dy=e.my-this._bHeight-e.tileHeight-e.padY,e.ny=this.y-this._nameWindow.height-RS.MessageSystem.Params.nameWindowY,e=this.setBalloonPlacement(e),this.setBalloonRect(e),this.updateSubBalloonElements(e),this.transform&&this.updateTransform()):console.warn("타겟이 없습니다")}updateTransform(){this.messageWindow.updateTransform()}calcBalloonRectHeight(e){this.save();const t=this.messageWindow,s=this.contents.fontSize,a=t.createTextState(e,0,0,0);return a.text=t.convertEscapeCharacters(e),a.height=t.calcTextHeight(a,!1),this.restore(),t.setTextSize(s),a.height}}t.BalloonWindowTransformComponent=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0;const a=s(6);class n extends a.EventEmitter{constructor(e){super(),this.init(e)}init(e){this.props=e,this.on("ready",e=>this.onReady(e)),this.on("mounted",e=>this.mounted(e)),this.on("destroy",e=>this.onDestroy())}ready(){this.emit("ready",this.props)}destroy(){this.emit("destroy",this.props)}execute(){this.emit("mounted",this.props)}onReady(e){}onDestroy(){}mounted(e){}}t.Component=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EventEmitter=void 0;t.EventEmitter=class{constructor(e={}){this._listeners=e,this._listeners={}}on(e,t){this._listeners[e]||(this._listeners[e]=[]),t&&t instanceof Function&&this._listeners[e].push(t)}emit(e,...t){this._listeners[e]&&this._listeners[e].forEach(e=>{e instanceof Function?e(...t):console.warn("호출된 이벤트 리스너가 함수가 아닙니다.")})}}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NameWindowPositionComponent=void 0;const a=s(0);class n extends a.BaseComponent{setOpacity(e){let t=e;"number"!=typeof t&&(t=Number(t)),isNaN(t)&&(t=255),this._nameWindow.opacity=e}updatePositionX(){if(!this._nameWindow)return;const e=this.x,t=this.width,s=this._nameWindow.width,a=RS.MessageSystem.Params.namePositionTypeAtX,n=RS.MessageSystem.Params.nameWindowX;let i=e+n;switch(a){case"right":i=e+t-s-n;break;case"center":i=e+t/2-s/2-n;break;case"left":i=e+n;break;case"opacity0":this.setOpacity(0);break;case"defaultOpacity":this.setOpacity(RS.MessageSystem.Params.defaultOpacity);break;case"auto":i=this.x+this.newLineX()+n}this._nameWindow.x=i}updatePositionY(){RS.MessageSystem.Params.windowOffset.x;const e=RS.MessageSystem.Params.windowOffset.y,t=$gameMessage.positionType(),s=$gameMessage.getBalloon();if(this.updatePositionX(),0===t&&-2===s){const t=0;this._nameWindow.y=t+e,this.y=this._nameWindow.isOpen()?t+this._nameWindow.height+RS.MessageSystem.Params.nameWindowY+e:t+e}else this._nameWindow.y=this.y-this._nameWindow.height-RS.MessageSystem.Params.nameWindowY}}t.NameWindowPositionComponent=n},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class a{constructor(){this._components={}}static getInstance(){return a.INSTANCE||(a.INSTANCE=new a),a.INSTANCE}add(e,t){if(""===e){let t=97,s=122,a=7;for(let n=0;n<a;n++)e+=String.fromCharCode(Math.floor(Math.random()*(s-t))+t)}return this._components[e]={callbackFunction:t,active:!1},this}wrap(e,t){return this.add(e,t)}get(e){return this._components[e].callbackFunction}active(e){return this._components[e].active=!0,this}deactive(e){return this._components[e].active=!1,this}ready(e){return this.active(e)}executeAll(){try{for(const e in this._components){if(this._components[e].active){const t=this.get(e);t instanceof Function&&t()}}}catch(e){console.log(e)}}}t.default=a}]);
//# sourceMappingURL=RS_MessageSystem.js.map