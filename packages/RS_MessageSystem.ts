/// <reference types="../lunalite-pixi-mz" />
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
 * (Graphics.boxWidth is the same as the screen width)
 * @default Graphics.boxWidth
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
 * (Graphics.boxWidth는 화면 가로 길이)
 * @default (Graphics.boxWidth / 2) + (Graphics.boxWidth / 3)
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

import { Types } from "./types/parameters";

var Imported = <any>(Imported || {});
Imported.RS_MessageSystem = true;

export namespace RS {
  export interface TextCodes {}
  export interface MessageSystem {
    TextCodes: TextCodes;
  }
}

declare global {
  interface Array<T> {
    contains(value: T): boolean;
  }
  interface String {
    contains(value: string): boolean;
  }

  interface Number {
    clamp(min: number, max: number): number;
  }

  interface Bitmap {
    fontBold: boolean;
    fontGradient: boolean;
    highlightTextColor: Required<string | null>;
    _context: CanvasRenderingContext2D;
    _baseTexture: PIXI.BaseTexture;

    initialize(width: number, height: number): void;
    setGradient(
      text: string,
      color1: string,
      color2: string,
      color3: string,
      tx: number,
      ty: number
    ): void;
    setGradientStyle(
      text: string,
      color1: string,
      color2: string,
      color3: string,
      tx: number,
      ty: number
    ): CanvasGradient;
    _makeFontNameText(): string;
    _drawTextBody(text: string, tx: number, ty: number, maxWidth: number): void;
  }

  interface Game_Message {
    _waitTime: number;
    _gradientText: string;
    _balloon: number;
    _align: number[];
    _balloonPatternHeight: number;
    _lastAlign: number;
    _maxLine: number;

    setWaitTime(time: number): void;
    setGradientText(text: string): void;
    getWaitTime: () => number;
    getGradientText: () => string;
    getMaxLine: () => number;
    setMaxLine(maxLine: number): void;
    setBalloon(n: number): void;
    getBalloon(n?: number): number;
    setAlign: (n: number) => void;
    getAlign: (n?: number) => number;
    clearAlignLast(n?: number): void;
    setBalloonPatternHeight(value: number): void;
    getBalloonPatternHeight: () => number;
    isRTL: () => boolean;
  }

  interface Game_Temp {
    _callMSHeightFunc: Function;
    setMSHeightFunc(func: Function): void;
    setMaxLine(maxLine: number): void;
  }

  interface Game_CharacterBase {
    id: number;
    type: string;
  }

  interface Game_Map {
    _msgOwner: Game_CharacterBase;
    _msgEvent: number;

    getMsgOwner(): Game_CharacterBase;
    setMsgOwner(o: Game_CharacterBase): void;
    getMsgEvent(): number;
    setMsgEvent(eventId: number): void;
  }

  interface Sprite_Battler {
    screenX: () => number;
    screenY: () => number;
  }

  type TextState = rm.types.TextState & {
    x: number;
    y: number;
    px: number;
    py: number;
  };

  interface Window_Base {
    new (...args: any): Window_Base;

    _isUsedTextWidthEx: boolean;
    contents: Bitmap;
    _messageDesc: MessageDesc | undefined;
    _textState: TextState;

    obtainEscapeCode(textState: any): string;
    obtainNameColor(textState: TextState): string;
    changeTextColor(color: any): void;
    loadWindowskin(): void;
    getFontFace(): string;
    save(): void;
    restore(): void;
    createTextState(
      text: string,
      x: number,
      y: number,
      width: number
    ): TextState;
    itemPadding(): number;
    newLineX(textState: TextState): number;
    processNewLine(textState: TextState): void;
    processNewLine(textState: rm.types.TextState): void;
    processAlign(textState: TextState): void;
    setAlignLeft(textState: TextState): void;
    setAlignCenter(textState: TextState): void;
    setAlignRight(textState: TextState): void;
  }

  interface Window_Message extends Window_Base {
    new (...args: any): Window_Message;

    _pauseSignSprite: Sprite;
    _width: number;
    _height: number;
    _backBuffer: {
      buffer: Bitmap;
      textState: TextState | null;
      isDirty: boolean;
    };
    _showFast: boolean;
    _faceContents: Sprite;
    _goldWindow: Window_Gold;
    _positionType: number;
    _nameWindow: InstanceType<Window_Base>;
    _nameBoxWindow: Window_NameBox;
    _choiceListWindow: Window_ChoiceList;
    _isDirtyWindowskin: boolean;
    _textSoundInterval: number;

    obtainTextSpeed(textState: TextState): number;
    obtainGradientText(textState: TextState): string;
    obtainSoundName(textState: TextState): string;
    processEscapeCharacter(code: string, textState: TextState): void;
    processEscapeCharacter(code: string, textState: TextState | string): void;
    processCharacter(textState: TextState): void;
    setTextSize(textSize: number): void;
    setStrokeColor(color: string): void;
    setTextIndent(textState: TextState): void;
    setStrokeWidth(strokeWidth: number): void;
    setTextBold(bold: boolean): void;
    setTextItalic(italic: boolean): void;
    setTextGradient(textState: TextState | rm.types.TextState): void;
    setHighlightTextColor(color: string): void;
    playSe(soundName: string): void;
    showPicture<T extends Object>(param: T): void;
    showPicture(param: string): void;
    erasePicture(picId: number): void;
    resetGradient(textState: TextState): void;
    processWordWrap(
      textState: TextState,
      w: number,
      width: number,
      isValid: boolean
    ): void;
    needsNewPage(textState: TextState): boolean;
    processNormalCharacterProxy(textState: TextState, c: string): void;
    isEndOfText: (textState: TextState | rm.types.TextState) => boolean;
    updateBigFaceOpacity(): void;
    fadeInOutFaceContents(): void;
    updateBalloonPosition(): void;
    updateDefaultOpacity(): void;
    updateContentsOpacity(): void;
    setFaceZIndex(index: number): void;
    setHeight: (n: number) => void;
    createFaceContents(): void;
    removeEventHandler: () => void;
    onLoadWindowskin: () => void;
    removeFaceContents: () => void;
    isValidBigFace(faceName: string): RegExpExecArray | null;
    updateNameWindow(): void;
    shouldBreakHere(text: string): boolean;
  }

  export interface Window_NameBox extends Window_Base {
    _name: string;
    _messageWindow: Window_Message;

    new (...args: any): Window_NameBox;
  }

  export interface MessageDesc {
    save(contents: Bitmap): void;
    restore(contents: Bitmap): void;
  }

  export interface Scene_Map {
    _spriteset: Spriteset_Map;
  }

  export interface Scene_Battle {
    _spriteset: Spriteset_Battle;
  }
}

(($) => {
  "use strict";

  const pluginParams = $plugins.filter((i) => {
    return i.description.contains("<RS_MessageSystem>");
  });

  const pluginName = <Types.PluginName>(
    (pluginParams.length > 0 && pluginParams[0].name)
  );
  const parameters = <Types.PluginParameters>(
    (pluginParams.length > 0 && pluginParams[0].parameters)
  );

  RS.MessageSystem.jsonParse = function (str: string) {
    const retData = JSON.parse(str, (k, v) => {
      try {
        return RS.MessageSystem.jsonParse(v);
      } catch (e) {
        return v;
      }
    });

    return retData;
  };

  /**
   * @method popParameter
   */
  RS.MessageSystem.popParameter = function (...args: any[]) {
    const k = Object.keys(args);
    let lastUsed = "";

    while (k.length > 0) {
      lastUsed = args[parseInt(<string>k.pop())];

      // @ts-ignore
      if (parameters[lastUsed]) return parameters[lastUsed];
    }

    return "";
  };

  RS.MessageSystem.Reg = {
    Default: [],
    Group: [],
    Korean: [],
    Chinese: [],
    English: [],
    Japanese: [],
  };

  RS.MessageSystem.TextCodes = {};

  enum MessageParams {
    FACE_START_ORIGIN_X = 168,
    NAME_WINDOW_WIDTH = 140,
    NAME_WINDOW_ROWS = 1,
    FONT_SIZE = 28,
    STD_PADDING = 18,
  }

  RS.MessageSystem.Params = {
    faceStartOriginX: MessageParams.FACE_START_ORIGIN_X,
    nameWindowWidth: MessageParams.NAME_WINDOW_WIDTH,
    nameWindowRows: MessageParams.NAME_WINDOW_ROWS,
    FONT_SIZE: MessageParams.FONT_SIZE,
    STD_PADDING: MessageParams.STD_PADDING,
    isValidShakingChoice: false,
    fontSize: Number(
      RS.MessageSystem.popParameter("Font Size", "글꼴 크기") || 28
    ),
    textSpeed: Number(
      RS.MessageSystem.popParameter("Text Speed", "기본 텍스트 출력 속도") || 0
    ),
    minFontSize: Number(
      RS.MessageSystem.popParameter("Text Min Size", "폰트 최소 크기") || 24
    ),
    maxFontSize: Number(
      RS.MessageSystem.popParameter("Text Max Size", "폰트 최대 크기") || 96
    ),
    textStartX: Number(
      RS.MessageSystem.popParameter("Text Start X", "텍스트 시작 X")
    ),
    numVisibleRows: Number(
      RS.MessageSystem.popParameter("numVisibleRows", "라인 갯수") || 4
    ),
    gradientColor1: String(
      RS.MessageSystem.popParameter("gradientColor1", "그레디언트 시작 색상") ||
        "#FFFFFF"
    ),
    gradientColor2: String(
      RS.MessageSystem.popParameter("gradientColor2", "그레디언트 중간 색상") ||
        "#F29661"
    ),
    gradientColor3: String(
      RS.MessageSystem.popParameter("gradientColor3", "그레디언트 끝 색상") ||
        "#CC3D3D"
    ),
    nameWindowX: Number(
      RS.MessageSystem.popParameter("Name Window X", "이름 윈도우 X") || 0
    ),
    nameWindowY: Number(
      RS.MessageSystem.popParameter("Name Window Y", "이름 윈도우 Y") || 0
    ),
    nameWindowStdPadding: Number(
      RS.MessageSystem.popParameter(
        "Name Window Inner Padding",
        "이름 윈도우 안쪽 여백"
      ) || 18
    ),
    namePositionTypeAtX:
      RS.MessageSystem.popParameter(
        "Name Window Position",
        "이름 윈도우 위치"
      ) || "left",
    faceOX: Number(
      RS.MessageSystem.popParameter("Big Face OX", "큰 페이스칩 OX") || 0
    ),
    faceOY: Number(
      RS.MessageSystem.popParameter("Big Face OY", "큰 페이스칩 OY") || 0
    ),
    faceSide: Boolean(
      RS.MessageSystem.popParameter(
        "Show Big Face Back",
        "대화창 뒤에 얼굴 표시"
      ) === "true" || false
    ),
    WIDTH: MessageParams.FONT_SIZE * 6 + MessageParams.STD_PADDING,
    HEIGHT: MessageParams.FONT_SIZE + MessageParams.STD_PADDING / 2,
    TabSize: Number(RS.MessageSystem.popParameter("Tab Size", "탭 크기")),
    backOpacity: Number(
      RS.MessageSystem.popParameter("back Opacity", "배경 그림의 투명도")
    ),
    translucentOpacity: Number(
      RS.MessageSystem.popParameter("translucent Opacity", "반투명도")
    ),
    defaultOpacity: Number(
      RS.MessageSystem.popParameter("default Opacity", "기본 투명도")
    ),
    contentsOpacity: Number(
      RS.MessageSystem.popParameter("contents Opacity", "내용의 투명도")
    ),
    defaultOutlineWidth: Number(
      RS.MessageSystem.popParameter("default outline width", "테두리 크기")
    ),
    defaultOutlineColor:
      RS.MessageSystem.popParameter("default outline Color", "테두리 색상") ||
      "white",
    fonts: {
      default: "rmmz-mainfont",
    },
  };

  (() => {
    const systemFonts: Types.SystemFonts = RS.MessageSystem.jsonParse(
      parameters["systemFont"]
    );
    if (!RS.MessageSystem.Params.fonts) return;

    // ! 여기서부터 변환 시작해야함
    systemFonts.settings.forEach((i) => {
      const params = <{ [key: string]: any } | any>{};
      params[i.languageCode] = i.fontName;
      Object.assign(RS.MessageSystem.Params.fonts as {}, params);
    });
  })();

  Object.assign(RS.MessageSystem.Params, {
    isTempSpriteContainerVisibility: false,
    lineHeight: 36,
    windowOffset: new Point(0, 0),
    fontSmoothingEnabled: true,
    customFont: Boolean(
      RS.MessageSystem.popParameter(
        "Using Custom Font",
        "사용자 지정 폰트 사용 여부"
      ) === "true"
    ),
    customFontName: String(
      RS.MessageSystem.popParameter("Custom Font Name", "사용자 지정 폰트명") ||
        "GameFont"
    ),
    customFontSrc: String(
      RS.MessageSystem.popParameter(
        "Custom Font Src",
        "사용자 지정 폰트 경로"
      ) || "fonts/mplus-1m-regular.ttf"
    ),
    windowskin:
      RS.MessageSystem.popParameter("Default Windowskin", "기본 윈도우스킨") ||
      "Window",
    windowskinForNameWindow:
      RS.MessageSystem.popParameter("Name Windowskin", "이름 윈도우스킨") ||
      "Window",
    choiceWindowStyle: String(
      RS.MessageSystem.popParameter("Choice Style", "선택지 스타일") ||
        "default"
    ),
    defaultChoicePostion: parameters["Default Choice Position"] || "right",
    exTextColors: RS.MessageSystem.jsonParse(
      RS.MessageSystem.popParameter("Text Color", "텍스트 색상")
    ),
    isPlayTextSound: Boolean(
      RS.MessageSystem.popParameter(
        "Text Sound ON/OFF",
        "텍스트 효과음 재생 여부"
      ) === "true"
    ),
    pathTextSound: String(
      RS.MessageSystem.popParameter("Text Sound", "텍스트 효과음") ||
        "Cursor1.ogg"
    ),
    textSoundEval1: RS.MessageSystem.jsonParse(
      RS.MessageSystem.popParameter(
        "Text Sound Execution Condition",
        "텍스트 효과음 실행 조건"
      ) || "Math.randomInt(100) < 45"
    ),
    textSoundEval2: RS.MessageSystem.jsonParse(
      RS.MessageSystem.popParameter(
        "Text Sound Volume",
        "텍스트 효과음 볼륨"
      ) || "(0.4 + (RS.MessageSystem.randomNormal(0.8)[0])).clamp(0.0, 0.8)"
    ),
    textSoundInterval: parseInt(
      RS.MessageSystem.popParameter(
        "Text Sound Interval",
        "텍스트 사운드 재생 간격"
      )
    ),
    textSoundPoolSize: parseInt(
      RS.MessageSystem.popParameter(
        "텍스트 사운드 풀 크기",
        "Text Sound Pool Size"
      ) || 6
    ),
    langCode:
      RS.MessageSystem.popParameter("언어 코드", "Language Code") || "ko",
    preloadWindowskins: JSON.parse(parameters["preload windowskin"] || "[]"),
    isParagraphMinifier: Boolean(parameters["Paragraph Minifier"] === "true"),
    gradientStyle: parameters["Gradient Style"],
    faceOpacity: parseInt(parameters["face Opacity"] || 21),
    faceDirection: parseInt(parameters["face Direction"] || 0),
  });

  //============================================================================
  // Lazy Initialize Parameters (느린 초기화)
  //============================================================================

  var alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    alias_Game_Temp_initialize.call(this);
    RS.MessageSystem.Params.windowWidth =
      eval(parameters["Window Width"]) || Graphics.boxWidth;
  };

  //============================================================================
  // Multiple Language supports
  //============================================================================

  RS.MessageSystem.Reg.KoreanEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-힣]+[!]*/i;
  RS.MessageSystem.Reg.ChineseEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z一-鼣]+[!]*/i;
  RS.MessageSystem.Reg.EnglishEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+[!]*/i;
  RS.MessageSystem.Reg.JapaneseEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[A-Z\u3040-\u309F\u30A0-\u30FF\u3300-\u33FF\u4E00-\u9FFF\uFF00-\uFFEF]+[!]*/i;
  RS.MessageSystem.Reg.defaultEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[A-Z가-힣]+[!]*/i;

  RS.MessageSystem.TextCodes = (function () {
    const rowData = RS.MessageSystem.popParameter("Text Code", "텍스트 코드");
    const data = JSON.parse(rowData);
    const retData = <Record<string, any>>{};

    retData.Korean = [undefined].concat(JSON.parse(data.Korean));
    retData.Chinese = [undefined].concat(JSON.parse(data.Chinese));
    retData.English = [undefined].concat(JSON.parse(data.English));
    retData.Japanese = [undefined].concat(JSON.parse(data.Japanese));

    return retData;
  })();

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

  /**
   * 주어진 ID 값으로 텍스트 코드를 현지화하여 반환합니다.
   * @param {Number} idx
   */
  RS.MessageSystem.getTextCode = function (idx: number) {
    const langCode = RS.MessageSystem.Params.langCode;

    if (langCode.match(/ko/)) {
      return RS.MessageSystem.TextCodes["Korean"][idx];
    }
    if (langCode.match(/zh/)) {
      return RS.MessageSystem.TextCodes["Chinese"][idx];
    }
    if (langCode.match(/en/)) {
      return RS.MessageSystem.TextCodes["English"][idx];
    }
    if (langCode.match(/ja/)) {
      return RS.MessageSystem.TextCodes["Japanese"][idx];
    }
    return RS.MessageSystem.TextCodes["English"][idx];
  };

  /**
   * 노트 태그를 읽습니다.
   * @memberof RS.MessageSystem
   * @param {Number} eventId
   * @return {Object} meta
   */
  RS.MessageSystem.getEventComments = function (
    eventId: number,
    index: number
  ) {
    let data = <Record<any, any>>{
      note: "",
      meta: {},
    };
    try {
      // 리스트를 가져옵니다.
      let list = $gameMap.event(eventId).list();

      // 바로 이전 인덱스에 노트 태그가 있었는 지 확인합니다.
      if (index < 0) index = 0;

      // 부모 이벤트 없이 호출되는 공통 이벤트가 있는 지 확인합니다.
      if (eventId <= 0) {
        var commonEvent = $gameTemp.reservedCommonEvent();
        if (commonEvent) {
          list = commonEvent.list;
          // 공통 이벤트는 한 번 설치된 후 클리어되므로 목록을 두 번 읽을 순 없으므로 예외 처리
          if (!list) {
            return data;
          }
        }
      }

      let param = list[index];

      // 코멘트를 읽어옵니다.
      while (param && [108, 408].contains(param.code)) {
        data.note += param.parameters[0] + "\r\n";
        index--;
        param = list[index];
      }

      if (param && param.code === 108) {
        data.note += param.parameters[0] + "\r\n";

        index--;
        param = list[index];

        while (param.code === 408) {
          data.note += param.parameters[0] + "\r\n";
          index--;
          param = list[index];
        }

        if (param.code === 108) {
          data.note += param.parameters[0] + "\r\n";
        }
      }

      // 노트 태그를 추출합니다 (DataManager.extractMetadata의 변형입니다)
      const re = /<([^<>:]+)(:?)([^>]*)>/g;
      data.meta = {};
      for (;;) {
        const match = re.exec(data.note);
        if (match) {
          if (match[2] === ":") {
            data.meta[match[1].trim()] = match[3];
          } else {
            data.meta[match[1].trim()] = true;
          }
        } else {
          break;
        }
      }
    } catch (e) {
      // 리스트를 읽지 못할 경우 try-catch 문에 의해 예외 처리가 됩니다.
      return {
        note: "",
        meta: {},
      };
    }
    return data.meta;
  };

  (() => {
    "use strict";
    var regData = ["Korean", "English", "Chinese", "Japanese"];
    regData.forEach(function (e, i, a) {
      var tcGroup = RS.MessageSystem.TextCodes[e];
      tcGroup = tcGroup.map((e: any, i: number, a: any[]) => {
        if (e === undefined) return;
        var data = [];
        var ret = "";
        for (var str of e) {
          if (/[a-zA-Z]/i) {
            data.push(str);
            continue;
          }
          var text = str.charCodeAt().toString(16);
          data.push("\\u" + "{" + text + "}");
        }
        ret = data.join("");
        return ret;
      });
      RS.MessageSystem.Reg[e][0] = undefined;
      RS.MessageSystem.Reg[e][1] = new RegExp(
        `(?:\x1bC|\x1b${tcGroup[1]})\\[(.+?)\\]`,
        "gi"
      ); // 색
      RS.MessageSystem.Reg[e][2] = new RegExp(
        `\x1b${tcGroup[2]}\\[(\\d+)\\]`,
        "gi"
      ); // 속도
      RS.MessageSystem.Reg[e][3] = new RegExp(
        `\x1b${tcGroup[3]}\\[(.+?)\\]`,
        "gi"
      ); // 테두리색
      RS.MessageSystem.Reg[e][4] = new RegExp(
        `\x1b${tcGroup[4]}\\[(\\d+)\\]`,
        "gi"
      ); // 테두리크기
      RS.MessageSystem.Reg[e][5] = new RegExp(
        `\x1b${tcGroup[5]}\\[(\\d+)\\]`,
        "gi"
      ); // 들여쓰기
      RS.MessageSystem.Reg[e][6] = new RegExp(`\x1b${tcGroup[6]}`, "gi"); // 굵게!
      RS.MessageSystem.Reg[e][7] = new RegExp(`\x1b${tcGroup[7]}`, "gi"); // 이탤릭!
      RS.MessageSystem.Reg[e][8] = new RegExp(
        `\x1b${tcGroup[8]}\\<(.+?)\\>`,
        "gi"
      ); // 이름
      RS.MessageSystem.Reg[e][9] = new RegExp(
        `\x1b${tcGroup[9]}\\<(.+)\\>`,
        "gi"
      ); // 그레디언트
      RS.MessageSystem.Reg[e][10] = new RegExp(
        `(?:\x1bP|\x1b${tcGroup[10]})\\[(\\d+)\\]`,
        "gi"
      ); // 파티원
      RS.MessageSystem.Reg[e][11] = new RegExp(
        `(?:\x1bN|\x1b${tcGroup[11]})\\[(\\d+)\\]`,
        "gi"
      ); // 주인공
      RS.MessageSystem.Reg[e][12] = new RegExp(
        `(?:\x1bV|\x1b${tcGroup[12]})\\[(\\d+)\\]`,
        "gi"
      ); // 변수
      RS.MessageSystem.Reg[e][13] = new RegExp(
        `(?:\x1bI|\x1b${tcGroup[13]})\\[(\\d+)\\]`,
        "g"
      ); // 아이콘
      RS.MessageSystem.Reg[e][14] = new RegExp(
        `(?:\x1b{|\x1b${tcGroup[14]})`,
        "gi"
      ); // 확대!
      RS.MessageSystem.Reg[e][15] = new RegExp(
        `(?:\x1b}|\x1b${tcGroup[15]})`,
        "gi"
      ); // 축소!
      RS.MessageSystem.Reg[e][16] = new RegExp(
        `(?:\x1bG|\x1b${tcGroup[16]})`,
        "gi"
      ); // 골드
      RS.MessageSystem.Reg[e][17] = new RegExp(
        `\x1b${tcGroup[17]}\\[(.*?)\\]`,
        "gi"
      ); // 말풍선
      RS.MessageSystem.Reg[e][18] = new RegExp(
        `\x1b${tcGroup[18]}\\[(\\d+)\\]`,
        "gi"
      ); // 정렬자
      RS.MessageSystem.Reg[e][19] = new RegExp(
        `\x1b${tcGroup[19]}\\[(\\d+)\\]`,
        "gi"
      ); // 숫자
      RS.MessageSystem.Reg[e][20] = new RegExp(
        `\x1b${tcGroup[20]}\\[(\\d+)\\]`,
        "gi"
      ); // 크기
      RS.MessageSystem.Reg[e][21] = new RegExp(`\x1b${tcGroup[21]}`, "gi"); // r
      RS.MessageSystem.Reg[e][22] = new RegExp(`\x1b${tcGroup[22]}`, "gi"); // t
      RS.MessageSystem.Reg[e][23] = new RegExp(
        `\x1b${tcGroup[23]}\\<(.+?)\\>`,
        "gi"
      ); // 효과음
      RS.MessageSystem.Reg[e][24] = new RegExp(
        `\x1b${tcGroup[24]}\\<(.+?)\\>`,
        "gi"
      ); // 그림 표시
      RS.MessageSystem.Reg[e][25] = new RegExp(
        `\x1b${tcGroup[25]}\\[(\\d+)\\]`,
        "gi"
      ); // 그림 제거
      RS.MessageSystem.Reg[e][26] = new RegExp(
        `(?:\x1b${tcGroup[26]})\\[(\\d+)\\]`,
        "g"
      ); // 아이템
      RS.MessageSystem.Reg[e][27] = new RegExp(
        `(?:\x1b${tcGroup[27]})\\[(\\d+)\\]`,
        "g"
      ); // 무기구
      RS.MessageSystem.Reg[e][28] = new RegExp(
        `(?:\x1b${tcGroup[28]})\\[(\\d+)\\]`,
        "g"
      ); // 방어구
      RS.MessageSystem.Reg[e][29] = new RegExp(
        `(?:\x1b${tcGroup[29]})\\[(\\d+)\\]`,
        "g"
      ); // 직업
      RS.MessageSystem.Reg[e][30] = new RegExp(
        `(?:\x1b${tcGroup[30]})\\[(\\d+)\\]`,
        "g"
      ); // 적군
      RS.MessageSystem.Reg[e][31] = new RegExp(
        `(?:\x1b${tcGroup[31]})\\[(\\d+)\\]`,
        "g"
      ); // 상태
      RS.MessageSystem.Reg[e][32] = new RegExp(
        `(?:\x1b${tcGroup[32]})\\[(\\d+)\\]`,
        "g"
      ); // 스킬
      RS.MessageSystem.Reg[e][33] = new RegExp(
        `\x1b${tcGroup[33]}\\<(.*)\\>`,
        "gi"
      ); // 얼굴
      RS.MessageSystem.Reg[e][34] = new RegExp(
        `(?:\x1b${tcGroup[34]})\\[(\\d+)\\]`,
        "gi"
      ); // 아군
      RS.MessageSystem.Reg[e][35] = new RegExp(
        `(?:\x1b${tcGroup[35]})\\[(\\d+)\\]`,
        "gi"
      ); // 적군

      RS.MessageSystem.Reg[e][36] = new RegExp(`\x1b${tcGroup[36]}`, "gi"); // [.]
      RS.MessageSystem.Reg[e][37] = new RegExp(`\x1b${tcGroup[37]}`, "gi"); // [|]
      RS.MessageSystem.Reg[e][38] = new RegExp(`\x1b${tcGroup[38]}`, "gi"); // [!]
      RS.MessageSystem.Reg[e][39] = new RegExp(`\x1b${tcGroup[39]}`, "gi"); // [<]
      RS.MessageSystem.Reg[e][40] = new RegExp(`\x1b${tcGroup[40]}`, "gi"); // [>]
      RS.MessageSystem.Reg[e][41] = new RegExp(`\x1b${tcGroup[41]}`, "gi"); // [\^]

      RS.MessageSystem.Reg[e][42] = new RegExp(`\x1b${tcGroup[42]}`, "gi"); // AS굵게!
      RS.MessageSystem.Reg[e][43] = new RegExp(`\x1b${tcGroup[43]}`, "gi"); // AE굵게!
      RS.MessageSystem.Reg[e][44] = new RegExp(`\x1b${tcGroup[44]}`, "gi"); // AS이탤릭!
      RS.MessageSystem.Reg[e][45] = new RegExp(`\x1b${tcGroup[45]}`, "gi"); // AE이탤릭!

      RS.MessageSystem.Reg[e][46] = new RegExp(`(?:<${tcGroup[46]}>)`, "gi"); // LEFT
      RS.MessageSystem.Reg[e][47] = new RegExp(`(?:<${tcGroup[47]}>)`, "gi"); // CENTER
      RS.MessageSystem.Reg[e][48] = new RegExp(`(?:<${tcGroup[48]}>)`, "gi"); // RIGHT

      RS.MessageSystem.Reg[e][49] = new RegExp(`(?:<[${tcGroup[49]}]>)`, "gi"); // B
      RS.MessageSystem.Reg[e][50] = new RegExp(
        `(?:<\/[${tcGroup[50]}]>)`,
        "gi"
      ); // B
      RS.MessageSystem.Reg[e][51] = new RegExp(`(?:<[${tcGroup[51]}]>)`, "gi"); // I
      RS.MessageSystem.Reg[e][52] = new RegExp(
        `(?:<\/[${tcGroup[52]}]>)`,
        "gi"
      ); // I
      RS.MessageSystem.Reg[e][53] = new RegExp(`\x1b${tcGroup[53]}`, "gi"); // AEND : ALIGN_CLEAR
      RS.MessageSystem.Reg[e][54] = new RegExp(
        `\x1b${tcGroup[54]}\\[(.*)\\]`,
        "gi"
      ); // \배경색[색상] \HC[색상]
      RS.MessageSystem.Reg[e][55] = new RegExp(
        `\x1b${tcGroup[55]}\\[(\\d+)\\]`,
        "gi"
      ); // \FD
    });
  })();

  RS.MessageSystem.initSystem = function () {
    var type = RS.MessageSystem.Params.langCode;
    var ret = false;
    if (type.match(/ko/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Korean;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.KoreanEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Korean;
      ret = true;
    }
    if (type.match(/zh/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Chinese;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.ChineseEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Chinese;
      ret = true;
    }
    if (type.match(/en/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.EnglishEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
      ret = true;
    }
    if (type.match(/ja/)) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Japanese;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.JapaneseEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Japanese;
      ret = true;
    }
    if (ret === false) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.EnglishEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
    }
  };

  //=============================================================================
  // Color
  //=============================================================================

  interface IColor {
    getColor(c: number): string;
    baseColor: string;
    getBaseColor(): string;
    getUserCustomColor(str: string): string;
    gmColor(str: string): string;
  }

  const Color = <IColor>{};

  Color.getColor = function (n: number) {
    var r = n & 255;
    var g = (n >> 8) & 255;
    var b = (n >> 16) & 255;
    var result = `rgba(${r},${g},${b},1)`;
    return result;
  };

  Color.baseColor = Color.getColor(16777215);

  Color.getBaseColor = function () {
    return Color.baseColor;
  };

  Color.getUserCustomColor = function (str) {
    "use strict";

    var obj: any[] = RS.MessageSystem.Params.exTextColors;
    var ret = str;

    if (!(typeof obj[0] === "object")) return ret;
    if (!obj[0].hasOwnProperty("Color Name")) return ret;

    obj.forEach((e: any, i: number, arr: any[]) => {
      if (e["Color Name"] === str) {
        var r = parseInt(e["Red"]) || 0;
        var g = parseInt(e["Green"]) || 0;
        var b = parseInt(e["Blue"]) || 0;
        var a = parseFloat(e["Alpha"]) || 1.0;

        ret = `rgba(${r},${g},${b},${a})`;
      }
    });

    return ret;
  };

  const KOREAN_COLORS: Record<string, string> = {
    청록: "rgba(0,255,255,1)",
    청록색: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    검은색: "rgba(0,0,0,1)",
    검정: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    파란색: "rgba(0,0,255,1)",
    파랑: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    짙은회색: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    자홍색: "rgba(255,0,255,1)",
    자홍: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    회색: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    녹색: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    밝은녹색: "rgba(0,255,0,1)",
    라임: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    밝은회색: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    밤색: "rgba(128,0,0,1)",
    마룬: "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    감청색: "rgba(0,0,128,1)",
    네이비: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    황록색: "rgba(128,128,0,1)",
    올리브: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    주황색: "rgba(255,160,64,1)",
    주황: "rgba(255,160,64,1)",
    오렌지: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    보라색: "rgba(128,0,128,1)",
    보라: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    빨간색: "rgba(255,0,0,1)",
    빨강: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    은색: "rgba(192,192,192,1)",
    은: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    민트색: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    흰색: "rgba(255,255,255,1)",
    흰: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    노란색: "rgba(255,255,0,1)",
    노랑: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
  };

  const CHINESE_COLOR: Record<string, string> = {
    水色: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    黑色: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    蓝色: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    深灰色: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    紫红色: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    灰色: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    绿色: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    浅绿色: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    浅灰色: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    栗色: "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    绀青色: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    黄绿色: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    橙黄色: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    紫色: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    红色: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    银白色: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    水鸭色: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    白色: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    黄色: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
  };

  const ENGLISH_COLOR: Record<string, string> = {
    AQUA: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    BLACK: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    BLUE: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    DKGRAY: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    FUCHSIA: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    GRAY: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    GREEN: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    LIME: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    LTGRAY: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    MAROON: "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    NAVY: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    OLIVE: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    ORANGE: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    PURPLE: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    RED: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    SILVER: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    TEAL: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    WHITE: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    YELLOW: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
  };

  const JAPANESE_COLOR: Record<string, string> = {
    水色: "rgba(0,255,255,1)",
    アクア色: "rgba(0,255,255,1)",
    c_aqua: "rgba(0,255,255,1)",
    黑色: "rgba(0,0,0,1)",
    c_black: "rgba(0,0,0,1)",
    靑色: "rgba(0,0,255,1)",
    c_blue: "rgba(0,0,255,1)",
    ふか灰色: "rgba(64,64,64,1)",
    c_dkgray: "rgba(64,64,64,1)",
    紫紅色: "rgba(255,0,255,1)",
    c_fuchsia: "rgba(255,0,255,1)",
    灰色: "rgba(128,128,128,1)",
    c_gray: "rgba(128,128,128,1)",
    綠色: "rgba(0,128,0,1)",
    c_green: "rgba(0,128,0,1)",
    黃綠: "rgba(0,255,0,1)",
    c_lime: "rgba(0,255,0,1)",
    鼠色: "rgba(192,192,192,1)",
    c_ltgray: "rgba(192,192,192,1)",
    "―色": "rgba(128,0,0,1)",
    c_maroon: "rgba(128,0,0,1)",
    群青色: "rgba(0,0,128,1)",
    ネイビー: "rgba(0,0,128,1)",
    c_navy: "rgba(0,0,128,1)",
    黃綠色: "rgba(128,128,0,1)",
    オリーブ色: "rgba(128,128,0,1)",
    c_olive: "rgba(128,128,0,1)",
    橙色: "rgba(255,160,64,1)",
    オレンジ色: "rgba(255,160,64,1)",
    c_orange: "rgba(255,160,64,1)",
    紫色: "rgba(128,0,128,1)",
    c_purple: "rgba(128,0,128,1)",
    赤色: "rgba(255,0,0,1)",
    レッド: "rgba(255,0,0,1)",
    c_red: "rgba(255,0,0,1)",
    銀色: "rgba(192,192,192,1)",
    c_silver: "rgba(192,192,192,1)",
    ミント色: "rgba(0,128,128,1)",
    薄荷色: "rgba(0,128,128,1)",
    c_teal: "rgba(0,128,128,1)",
    白色: "rgba(255,255,255,1)",
    c_white: "rgba(255,255,255,1)",
    黃色: "rgba(255,255,0,1)",
    c_yellow: "rgba(255,255,0,1)",
  };

  RS.MessageSystem.getKoreanColor = function (str: string) {
    let color = KOREAN_COLORS[str];

    if (color) {
      return color;
    }

    if (["기본", "기본색", "c_normal"].contains(str)) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
  };

  RS.MessageSystem.getChineseColor = function (str: string) {
    let color = CHINESE_COLOR[str];

    if (color) {
      return color;
    }

    if (["通常", "c_normal"].contains(str)) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
  };

  RS.MessageSystem.getEnglishColor = function (str: string) {
    let color = ENGLISH_COLOR[str];

    if (color) {
      return color;
    }

    if ("c_normal" === str) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
  };

  RS.MessageSystem.getJapaneseColor = function (str: string) {
    let color = JAPANESE_COLOR[str];

    if (color) {
      return color;
    }

    if (["基本色", "c_normal"].contains(str)) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(str);
  };

  RS.MessageSystem.getBrowser = function () {
    /* Refer to https://stackoverflow.com/a/16938481 */
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

      return {
        name: "IE",
        version: tem[1] || "",
      };
    }

    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        return {
          name: "Opera",
          version: tem[1],
        };
      }

      tem = ua.match(/\bEdge\/(\d+)/);
      if (tem != null) {
        return {
          name: "Edge",
          version: tem[1],
        };
      }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }

    return {
      name: M[0],
      version: M[1],
    };
  };

  Color.gmColor = function (str: string) {
    var type = RS.MessageSystem.Params.langCode;
    if (type.match(/ko/)) {
      return RS.MessageSystem.getKoreanColor(str);
    }
    if (type.match(/zh/)) {
      return RS.MessageSystem.getChineseColor(str);
    }
    if (type.match(/en/)) {
      return RS.MessageSystem.getEnglishColor(str);
    }
    if (type.match(/ja/)) {
      return RS.MessageSystem.getJapaneseColor(str);
    }
    return RS.MessageSystem.getEnglishColor(str);
  };

  //============================================================================
  // Bitmap
  //============================================================================

  var alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function (width: number, height: number) {
    alias_Bitmap_initialize.call(this, width, height);
    this.fontBold = false;
    this.fontGradient = false;
    this.highlightTextColor = null;
  };

  Bitmap.prototype.setGradient = function (
    text,
    color1,
    color2,
    color3,
    tx,
    ty
  ) {
    var context = this._context;
    var tWidth = this.measureTextWidth(text);
    context.save();
    var gradient = context.createLinearGradient(tx, 0, tx + tWidth, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.6, color2);
    gradient.addColorStop(1, color3);
    context.restore();

    this._baseTexture.update();

    return gradient;
  };

  Bitmap.prototype.setGradientStyle = function (
    text,
    color1,
    color2,
    color3,
    tx,
    ty
  ) {
    var context = this._context;
    var width = this.measureTextWidth(text);
    var height = RS.MessageSystem.Params.lineHeight;
    var grd;

    context.save();

    var style = RS.MessageSystem.Params.gradientStyle;

    if (style !== "radial") {
      if (style.contains("horizontal")) {
        grd = context.createLinearGradient(tx, 0, tx + width, 0);
      } else {
        grd = context.createLinearGradient(tx, 0, 0, ty + height);
      }
    } else {
      var ws = width * 0.5;
      var hs = height * 0.5;
      grd = context.createRadialGradient(ws, hs, 0.0, ws, hs, ws);
    }

    if (style === "radial") {
      grd.addColorStop(0.0, color1);
      grd.addColorStop(1.0, color2);
    } else if (style.contains("axial")) {
      grd.addColorStop(0.0, color1);
      grd.addColorStop(0.5, color2);
      grd.addColorStop(1.0, color3);
    } else {
      grd.addColorStop(0.0, color1);
      grd.addColorStop(1.0, color2);
    }

    context.restore();

    this._baseTexture.update();

    return grd;
  };

  Bitmap.prototype._makeFontNameText = function () {
    return (
      (this.fontItalic ? "Italic " : "") +
      (this.fontBold ? "bold " : "") +
      this.fontSize +
      "px " +
      this.fontFace
    );
  };

  Bitmap.prototype._drawTextBody = function (text, tx, ty, maxWidth) {
    const context = this._context;
    context.save(); // 드로잉 상태 저장
    context.imageSmoothingEnabled =
      RS.MessageSystem.Params.fontSmoothingEnabled;

    if (this.fontGradient) {
      var gradient = this.setGradientStyle(
        text,
        RS.MessageSystem.Params.gradientColor1,
        RS.MessageSystem.Params.gradientColor2,
        RS.MessageSystem.Params.gradientColor3,
        tx,
        ty
      );
      context.fillStyle = gradient;
    } else {
      context.fillStyle = this.textColor;
    }
    context.fillText(text, tx, ty, maxWidth);
    context.fillStyle = this.textColor;
    context.restore();
  };

  //============================================================================
  // Game_Message
  //============================================================================

  var alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function () {
    alias_Game_Message_clear.call(this);
    this._waitTime = 0;
    this._gradientText = "";
    this._balloon = -2;
    this._align = [];
    this._balloonPatternHeight = 0;
    this._lastAlign = -1;
  };

  Game_Message.prototype.setWaitTime = function (time) {
    this._waitTime = time;
  };

  Game_Message.prototype.setGradientText = function (text) {
    this._gradientText = text;
  };

  Game_Message.prototype.getWaitTime = function () {
    return this._waitTime || 0;
  };

  Game_Message.prototype.getGradientText = function () {
    return this._gradientText;
  };

  Game_Message.prototype.getMaxLine = function () {
    return this._maxLine;
  };

  Game_Message.prototype.setMaxLine = function (maxLine) {
    this._maxLine = maxLine;
    RS.MessageSystem.Params.numVisibleRows = maxLine;
  };

  Game_Message.prototype.setBalloon = function (n) {
    this._balloon = n;
  };

  Game_Message.prototype.getBalloon = function (n) {
    return this._balloon;
  };

  Game_Message.prototype.setAlign = function (n) {
    this._align = this._align || [];
    this._lastAlign = n; // 마지막 정렬 위치 기억
    this._align.push(n);
  };

  Game_Message.prototype.getAlign = function (n) {
    const last = this._align.shift();
    if (last === undefined) {
      return this._lastAlign;
    }
    return last;
  };

  Game_Message.prototype.clearAlignLast = function (n) {
    this._lastAlign = -1;
  };

  Game_Message.prototype.setBalloonPatternHeight = function (value: number) {
    this._balloonPatternHeight = value;
  };

  Game_Message.prototype.getBalloonPatternHeight = function () {
    return this._balloonPatternHeight;
  };

  //============================================================================
  // Sprite_Battler
  //============================================================================

  Sprite_Battler.prototype.screenX = function () {
    return this.x || 0;
  };

  Sprite_Battler.prototype.screenY = function () {
    return this.y || 0;
  };

  //============================================================================
  // MessageDesc
  //============================================================================

  class MessageDesc {
    public fontFace: string;
    public fontSize: number;
    public fontBold: boolean;
    public fontItalic: boolean;
    public textColor: string;
    public outlineColor: string;
    public outlineWidth: number;
    public fontGradient: boolean;
    public highlightTextColor: string | null;
    public textSpeed: number;

    private _isSaved: boolean;

    constructor() {
      this.fontFace = "Nanum Gothic";
      this.fontSize = 12;
      this.fontBold = false;
      this.fontItalic = false;
      this.textColor = "#000";
      this.outlineColor = "#fff";
      this.outlineWidth = 1;
      this.fontGradient = false;
      this.highlightTextColor = null;
      this.textSpeed = 1;

      this._isSaved = false;
    }

    /**
     *
     * @param {Bitmap} contents
     */
    save(contents: Bitmap) {
      this.fontFace = contents.fontFace;
      this.fontSize = contents.fontSize;
      this.fontBold = contents.fontBold;
      this.fontItalic = contents.fontItalic;
      this.textColor = contents.textColor;
      this.outlineColor = contents.outlineColor;
      this.outlineWidth = contents.outlineWidth;
      this.fontGradient = contents.fontGradient;
      this.highlightTextColor = contents.highlightTextColor;

      if ($gameMessage) {
        this.textSpeed = $gameMessage.getWaitTime();
      }

      this._isSaved = true;
    }

    restore(contents: Bitmap) {
      if (!this._isSaved) return;
      if (!(contents instanceof Bitmap)) return;
      contents.fontFace = this.fontFace;
      contents.fontSize = this.fontSize;
      contents.fontBold = this.fontBold;
      contents.fontItalic = this.fontItalic;
      contents.textColor = this.textColor;
      contents.outlineColor = this.outlineColor;
      contents.outlineWidth = this.outlineWidth;
      contents.fontGradient = this.fontGradient;
      contents.highlightTextColor = this.highlightTextColor;
      if ($gameMessage) {
        $gameMessage.setWaitTime(this.textSpeed);
      }
      this._isSaved = false;
    }
  }

  //============================================================================
  // Window_Base
  //============================================================================

  Window_Base.prototype.obtainEscapeCode = function (textState) {
    var regExp = RS.MessageSystem.Reg.defaultEscapeCode;
    var arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[0].toUpperCase();
    } else {
      return "";
    }
  };

  /**
   * 확장된 색상 변경 텍스트 코드 처리
   * \색[빨강]과 웹색상 처리를 위한 정규 표현식 처리
   * @param {}} textState
   */
  Window_Base.prototype.obtainNameColor = function (textState) {
    var arr = /\[(.+?)\]/gi.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return Color.gmColor(arr[1]);
    } else {
      return ColorManager.textColor(0);
    }
  };

  Window_Base.prototype.changeTextColor = function (color) {
    var c = parseInt(color);
    // 색상 코드가 숫자인 경우
    if (c > 0 && c < 32) {
      color = ColorManager.textColor(color);
    }
    if (!this._isUsedTextWidthEx) {
      this.contents.textColor = color;
    }
  };

  var alias_Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
  Window_Base.prototype.processEscapeCharacter = function (code, textState) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
    switch (code) {
      case "C":
        this.changeTextColor(
          this.textColor(<number>this.obtainEscapeParam(textState))
        );
        break;
      case textCode[tcGroup.COLOR]:
        this.changeTextColor(this.obtainNameColor(<TextState>textState));
        break;
      case "I":
      case textCode[tcGroup.ICON]:
        this.processDrawIcon(
          <number>this.obtainEscapeParam(textState),
          textState
        );
        break;
      case "{":
      case textCode[tcGroup.INCREASE]:
        this.makeFontBigger();
        break;
      case "}":
      case textCode[tcGroup.DECREASE]:
        this.makeFontSmaller();
        break;
      case "AEND":
        $gameMessage.clearAlignLast();
        break;
      default:
        alias_Window_Base_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  var alias_loadWindowskin = Window_Base.prototype.loadWindowskin;
  Window_Base.prototype.loadWindowskin = function () {
    alias_loadWindowskin.call(this);
    this.windowskin.addLoadListener(() => {
      Color.baseColor = ColorManager.textColor(0);
    });
  };

  Window_Base.prototype.getFontFace = function () {
    var langCode =
      RS.MessageSystem.Params.langCode || navigator.language.slice(0, 2);
    var fonts = RS.MessageSystem.Params.fonts[langCode];
    if (fonts) {
      return fonts;
    } else {
      return RS.MessageSystem.Params.fonts.default;
    }
  };

  Window_Base.prototype.drawTextEx = function (text, x, y, width) {
    this.save();
    this.resetFontSettings();
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    this.restore();
    return textState.outputWidth;
  };

  Window_Base.prototype.processAllText = function (textState) {
    this._isUsedTextWidthEx = !textState.drawing;
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    this.flushTextState(textState);
  };

  Window_Base.prototype.makeFontSmaller = function () {
    if (this.contents.fontSize >= RS.MessageSystem.Params.minFontSize) {
      this.contents.fontSize -= 12;
    }
  };

  Window_Base.prototype.resetFontSettings = function () {
    this.contents.fontFace = this.getFontFace();
    this.contents.fontSize = RS.MessageSystem.Params.fontSize;
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
    this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;
    this.contents.fontGradient = false;
    this.contents.highlightTextColor = null;
    this.resetTextColor();
  };

  Window_Base.prototype.makeFontBigger = function () {
    if (this.contents.fontSize <= RS.MessageSystem.Params.maxFontSize) {
      this.contents.fontSize += 12;
    }
  };

  Window_Base.prototype.save = function () {
    this._messageDesc = new MessageDesc();
    this._messageDesc.save(this.contents);
  };

  Window_Base.prototype.restore = function () {
    if (!this._messageDesc) return;
    this._messageDesc.restore(this.contents);
    this._messageDesc = undefined;
  };

  var alias_Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function (text) {
    const regGroup = RS.MessageSystem.Reg.Group;
    const tcGroup = RS.MessageSystem.TextCodes.ENUM;
    const textCode = RS.MessageSystem.TextCodes.Main;

    text = alias_Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(
      regGroup[tcGroup.VAR],
      function (...args: any[]): string {
        return $gameVariables.value(parseInt(<string>args[1])).toString();
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.VAR],
      function (...args: any[]) {
        return $gameVariables.value(parseInt(args[1])).toString();
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.PLAYER], (...args: any[]) => {
      return this.actorName(parseInt(args[1]));
    });
    text = text.replace(regGroup[tcGroup.PARTY_MEMBER], (...args: any[]) => {
      return this.partyMemberName(parseInt(args[1]));
    });
    text = text.replace(
      regGroup[tcGroup.NUM],
      function (...args: any[]) {
        return args[1].toComma();
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.GOLD], TextManager.currencyUnit);
    text = text.replace(
      regGroup[tcGroup.CLASSES],
      function (...args: any[]) {
        return $dataClasses[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITEM],
      function (...args: any[]) {
        return $dataItems[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.WEAPON],
      function (...args: any[]) {
        return $dataWeapons[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ARMOR],
      function (...args: any[]) {
        return $dataArmors[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY],
      function (...args: any[]) {
        return $dataEnemies[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.STATE],
      function (...args: any[]) {
        return $dataStates[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.SKILL],
      function (...args: any[]) {
        return $dataSkills[parseInt(args[1])].name || "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_LEFT],
      function () {
        return "\x1b" + textCode[tcGroup.ALIGN] + "[0]";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_CENTER],
      function () {
        return "\x1b" + textCode[tcGroup.ALIGN] + "[1]";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_RIGHT],
      function () {
        return "\x1b" + textCode[tcGroup.ALIGN] + "[2]";
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.ALIGN], (...args: any[]) => {
      if (!this._isUsedTextWidthEx) {
        $gameMessage.setAlign(Number(args[1] || 0));
      }
      return "";
    });
    text = text.replace(
      /<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi,
      function () {
        return regGroup[tcGroup.ALIGN_CLEAR].source;
      }.bind(this)
    );
    return text;
  };

  /**
   * @deprecated
   */
  Window_Base.prototype.textPadding = function () {
    return this.itemPadding();
  };

  Window_Base.prototype.newLineX = function (textState) {
    return this.textPadding();
  };

  Window_Base.prototype.processAlign = function (textState) {
    textState = textState || this._textState;

    // 아랍어 인가?
    if (textState.rtl) {
      return;
    }

    switch ($gameMessage.getAlign()) {
      case 0:
        this.setAlignLeft(textState);
        break;
      case 1:
        this.setAlignCenter(textState);
        break;
      case 2:
        this.setAlignRight(textState);
        break;
    }
  };

  var alias_Window_Base_processNewLine_align =
    Window_Base.prototype.processNewLine;
  Window_Base.prototype.processNewLine = function (textState) {
    alias_Window_Base_processNewLine_align.call(this, textState);
    this.processAlign(<TextState>textState);
  };

  Window_Base.prototype.setAlignLeft = function (textState) {
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
  };

  Window_Base.prototype.setAlignCenter = function (textState) {
    var padding = this.textPadding();
    textState.x =
      (this.newLineX(textState) + this.contentsWidth() + padding) / 2 -
      textState.outputWidth / 2;
    textState.startX = textState.x;
  };

  Window_Base.prototype.setAlignRight = function (textState) {
    var padding = this.textPadding();
    textState.x = this.contentsWidth() - padding - textState.outputWidth;
    textState.startX = textState.x;
  };

  //============================================================================
  // Window_Message
  //============================================================================

  Window_Message.prototype.obtainTextSpeed = function (textState) {
    var arr = /\[(\d+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return parseInt(arr[1]);
    } else {
      return 0;
    }
  };

  Window_Message.prototype.obtainGradientText = function (textState) {
    var arr = /^<(.+?)>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return "Empty Text";
    }
  };

  Window_Message.prototype.obtainSoundName = function (textState) {
    var arr = /\<(.+?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return "";
    }
  };

  var alias_Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function (
    code,
    textState: TextState | string
  ) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
    switch (code) {
      case textCode[tcGroup.TEXT_SPEED]:
        $gameMessage.setWaitTime(<number>this.obtainEscapeParam(textState));
        break;
      case textCode[tcGroup.TEXT_SIZE]:
        this.setTextSize(<number>this.obtainEscapeParam(textState));
        break;
      case textCode[tcGroup.OUTLINE_COLOR]:
        this.setStrokeColor(this.obtainNameColor(<TextState>textState));
        break;
      case textCode[tcGroup.INDENT]:
        this.setTextIndent(<TextState>textState);
        break;
      case textCode[tcGroup.OUTLINE_WIDTH]:
        this.setStrokeWidth(
          <number>this.obtainEscapeParam(<TextState>textState)
        );
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
      case textCode[tcGroup.GRADIENT]:
        this.setTextGradient(<TextState>textState);
        break;
      case textCode[tcGroup.HIGHLIGHT_TEXT_COLOR]:
        this.setHighlightTextColor(this.obtainNameColor(<TextState>textState));
        break;
      case textCode[tcGroup.TAB]:
        (<TextState>textState).x += Number(
          this.textWidth("A") * RS.MessageSystem.Params.TabSize
        );
        break;
      case textCode[tcGroup.CARRIAGE_RETURN]:
        (<TextState>textState).x = Number((textState as TextState).startX || 0);
        if (!this._isUsedTextWidthEx) this.startWait(1);
        break;
      case textCode[tcGroup.PLAY_SE]:
        if (!this._isUsedTextWidthEx)
          this.playSe(this.obtainSoundName(<TextState>textState));
        break;
      case textCode[tcGroup.SHOW_PICTURE]:
        if (this._isUsedTextWidthEx) break;
        this.showPicture(this.obtainSoundName(<TextState>textState));
        this.startWait(15);
      case textCode[tcGroup.HIDE_PICTURE]:
        if (this._isUsedTextWidthEx) break;
        this.erasePicture(<number>this.obtainEscapeParam(textState));
        this.startWait(15);
      case textCode[tcGroup.FACE]:
        if (this._isUsedTextWidthEx) break;
        var params = this.obtainSoundName(<TextState>textState).split(",");
        // this.redrawFaceImage(textState, params[0], params[1], 0, 0);
        this.startWait(1);
        break;
      default:
        alias_Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  Window_Message.prototype.setTextItalic = function (...args) {
    this.contents.fontItalic = args[0];
  };

  Window_Message.prototype.setTextBold = function (...args) {
    this.contents.fontBold = args[0];
  };

  Window_Message.prototype.setTextSize = function (...args) {
    this.contents.fontSize = args[0].clamp(
      RS.MessageSystem.Params.minFontSize,
      RS.MessageSystem.Params.maxFontSize
    );
  };

  Window_Message.prototype.setStrokeWidth = function (...args) {
    this.contents.outlineWidth = args[0];
  };

  Window_Message.prototype.setStrokeColor = function (...args) {
    this.contents.outlineColor = args[0];
  };

  Window_Message.prototype.setTextIndent = function (textState) {
    textState.x += <number>this.obtainEscapeParam(textState);
  };

  Window_Message.prototype.setHighlightTextColor = function (...args: any[]) {
    let color: any = args[0];
    if (color === "null" || color === "없음") {
      color = null;
    }
    this.contents.highlightTextColor = color;
  };

  Window_Message.prototype.setTextGradient = function (textState) {
    // TODO: 여기에서는 텍스트를 그리지 않는다.
    // TODO: 그레디언트 모드임을 명시하고 flush 단계에서 한 번에 그려야 한다 (배경색도 마찬가지이다)
    this.contents.fontGradient = true;
  };

  Window_Message.prototype.playSe = function (seName) {
    var realName = seName.trim();
    var data = <rm.types.AudioParameters>{
      name: realName,
      pan: 0,
      pitch: 100,
      volume: (<any>ConfigManager).seVolume,
    };
    AudioManager.playSe(data);
  };

  Window_Message.prototype.showPicture = function (param: string) {
    const raw = param.split(",").map((e) => {
      return e.trim();
    });

    let params = [
      Number(raw[0]),
      raw[1],
      Number(raw[2]),
      Number(raw[3]),
      Number(raw[4]),
      100,
      100,
      255,
      0,
    ];
    let ret = true;

    // 모든 요소 검증
    if (params) {
      params.forEach(function (e, i, a) {
        if (e === undefined || e === null) {
          ret = false;
        }
      });
    }
    // 검증 결과가 참이라면 그림 표시
    if (ret) {
      $gameScreen.showPicture.apply($gameScreen, <any>params);
      return true;
    }
    return false;
  };

  Window_Message.prototype.erasePicture = function (picId) {
    if (typeof picId !== "number") return;
    $gameScreen.erasePicture(picId);
  };

  // 구조가 변경된 메서드
  Window_Message.prototype.resetFontSettings = function () {
    Window_Base.prototype.resetFontSettings.call(this);

    // pause 아이콘 표시 위치 초기화
    if (this._pauseSignSprite) {
      this._pauseSignSprite.move(this._width / 2, this._height);
      this._pauseSignSprite.scale.y = 1;
    }

    $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
  };

  // 새로 추가된 메서드
  Window_Message.prototype.resetGradient = function (textState) {
    this.contents.fontGradient = false;
  };

  // 폰트 사이즈 설정 메서드는 MZ에서 없다
  Window_Message.prototype.numVisibleRows = function () {
    return RS.MessageSystem.Params.numVisibleRows;
  };

  /**
   * Create text state included px and py values for text word wrapping.
   */
  const alias_Window_Message_createTextState =
    Window_Message.prototype.createTextState;
  Window_Message.prototype.createTextState = function (text, x, y, width) {
    let textState = alias_Window_Message_createTextState.call(
      this,
      text,
      x,
      y,
      width
    );

    const px = textState.x;
    const py = textState.y;

    // mixin
    Object.assign(textState, {
      px,
      py,
    });

    return textState;
  };

  Window_Message.prototype.processWordWrap = function (
    textState,
    w,
    width,
    isValid
  ) {
    const px = <Required<number>>textState.px;

    if (Math.floor(px + w * 2) > width) {
      if (isValid) {
        this.processNewLine(textState);
        if (this.needsNewPage(textState)) {
          this.startPause();
        }
      }
    }
  };

  const alias_Window_Message_processNewLinePW =
    Window_Message.prototype.processNewLine;
  Window_Message.prototype.processNewLine = function (textState) {
    alias_Window_Message_processNewLinePW.call(this, textState);
    // 내부 버퍼의 위치를 시작 지점으로 초기화한다.
    (<TextState>textState).px = textState.startX || (<TextState>textState).x;
  };

  /**
   * ! Override
   * @param {Object} textState
   */
  Window_Message.prototype.processCharacter = function (textState) {
    const c = textState.text[textState.index++];
    if (c.charCodeAt(0) < 0x20) {
      this.flushTextState(textState);
      this.processControlCharacter(textState, c);
    } else {
      textState.buffer += c;

      // 내부 버퍼의 위치를 누적 계산한다.
      textState.px += this.textWidth(c);
    }
  };

  const alias_Window_Message_processCharacter =
    Window_Message.prototype.processCharacter;
  Window_Message.prototype.processCharacter = function (textState) {
    // 이전 텍스트의 길이를 계산한다.
    let isDirty = false;
    const preBuffer = textState.buffer || "";
    let preLen = preBuffer.length;

    alias_Window_Message_processCharacter.call(this, textState);

    // 새로운 텍스트가 이후에 있는가?
    // 그게 문자인지 제어 문자인지는 이 로직에선 알 수 없다.
    const postBuffer = textState.buffer || "";
    const postLen = postBuffer.length;
    if (preLen !== postLen) {
      isDirty = true;
    }

    if (isDirty) {
      // 끝에 있는 글자를 가지고 온다.
      // 하지만 제어 문자인지는 확인하지 않는다.
      // 제어 문자 여부는 메인 로직에서 판단하게 둔다.
      const c = textState.buffer.substr(textState.buffer.length - 1, 1);
      this.processNormalCharacterProxy(textState, c);
    }
  };

  /**
   * MZ에서는 processNormalCharacter의 구현이 없다.
   * 하지만, 자동 개행이나 사운드 재생 그리고 배경색 묘화를 위해 위치 계산이 필요하다.
   * 이 때문에 추가한 메서드이며, 텍스트의 묘화를 하진 않는다.
   * @param {*} textState
   * @param {*} c
   */
  Window_Message.prototype.processNormalCharacterProxy = function (
    textState,
    c
  ) {
    // MZ에서는 텍스트 상태(textState)가 다음 제어 문자가 등장해야 flush 처리된다.
    // 따라서 이곳에서는 텍스트가 그려질 수 없다.
    const w = this.textWidth(c);
    let width = this.contentsWidth();

    // 일반 메시지 모드에서만 동작 한다.
    let isValid =
      $gameMessage.getBalloon() === -2 &&
      !this._isUsedTextWidthEx &&
      RS.MessageSystem.Params.isParagraphMinifier;

    // 소수점 자리를 버려야 정확히 계산된다.
    this.processWordWrap(textState, w, width, isValid);

    const contents = this.contents;
    const faceName = $gameMessage.faceName();

    // if the faceName is not empty and the face direction is to right?
    if (faceName !== "") {
      width = contents.width - ImageManager.faceWidth;
      isValid = RS.MessageSystem.Params.faceDirection === 2;
      this.processWordWrap(textState, w, width, isValid);
    }

    // 배경색의 위치를 계산하고 비트맵 인스턴스를 생성한다.
    if (contents.highlightTextColor !== null) {
      const contentW = Math.floor(w * 2) + 1.0;
      const contentH = this.lineHeight();

      // 배경 버퍼의 생성
      this._backBuffer = {
        buffer: new Bitmap(contentW, contentH),
        textState: null,
        isDirty: false,
      };

      const { px, py } = <TextState>textState;

      // 배경 버퍼는 내부 버퍼의 초기 위치로부터 계산된다.
      this._backBuffer.buffer.fillAll(contents.highlightTextColor);
      // 이 플래그가 활성화되어있다면 flushTextState에서 그리기 처리를 해야 한다.
      this._backBuffer.isDirty = true;
      this._backBuffer.textState = textState;
    }
  };

  const alias_Window_Message_flushTextState =
    Window_Message.prototype.flushTextState;
  Window_Message.prototype.flushTextState = function (textState) {
    // 기본 지연 시간 설정
    if (
      !this._showFast &&
      !this.isEndOfText(textState) &&
      !this._isUsedTextWidthEx
    ) {
      this.startWait($gameMessage.getWaitTime() || 0);
    }

    // 배경색의 처리
    if (
      !this._isUsedTextWidthEx &&
      this._backBuffer &&
      this._backBuffer.isDirty
    ) {
      if (textState.drawing) {
        /**
         * @type {Bitmap}
         */
        const bitmap = this._backBuffer.buffer;
        const tx = (<TextState>textState).px;
        const ty = (<TextState>textState).py;
        const x = (<TextState>textState).x;
        const y = (<TextState>textState).y;
        const w = bitmap.width;
        const h = bitmap.height;

        this.contents.blt(bitmap, 0, 0, w, h, x, y);
        this._backBuffer.isDirty = false;
      }
    }
    alias_Window_Message_flushTextState.call(this, textState);
  };

  // [X] Window_Message.prototype.createSubWindows
  // [X] RS.MessageSystem.Params.extraSubWindows = [];
  // [X] Window_Message.prototype.subWindows

  Window_Message.prototype.updateBigFaceOpacity = function () {
    if (!this._faceContents) {
      return;
    }
    let { faceOpacity } = RS.MessageSystem.Params;
    if (!faceOpacity) faceOpacity = 255;
    const value = faceOpacity.clamp(0, 255);
    this._faceContents.opacity = value;
  };

  Window_Message.prototype.fadeInOutFaceContents = function () {
    if (!this._faceContents) {
      return;
    }

    const isValid = this.isOpening() || this.isClosing();
    if (isValid) {
      const openness = (this.openness || 0).clamp(0, 255);
      this._faceContents.scale.y = openness / 255;
      this._faceContents.y =
        (this._faceContents.height / 2) * (1 - this.openness / 255);
    }
  };

  const alias_Window_Message_checkToNotClose =
    Window_Message.prototype.checkToNotClose;
  Window_Message.prototype.checkToNotClose = function () {
    this.fadeInOutFaceContents();
    alias_Window_Message_checkToNotClose.call(this);
  };

  Window_Message.prototype.updatePlacement = function () {
    // TODO: try-catch statement will be deleted later.
    try {
      const goldWindow = this._goldWindow;
      this._positionType = $gameMessage.positionType();

      // 말풍선 모드가 아니라면 X좌표를 화면 중앙에 맞춘다.
      if ($gameMessage.getBalloon() === -2) {
        this.x =
          Graphics.boxWidth / 2 -
          this.width / 2 +
          RS.MessageSystem.Params.windowOffset.x;
        this.y =
          (this._positionType * (Graphics.boxHeight - this.height)) / 2 +
          RS.MessageSystem.Params.windowOffset.y;
      } else {
        if (SceneManager._scene instanceof Scene_Map)
          this.updateBalloonPosition();
      }

      // 골드 윈도우의 위치 설정
      const minGoldY = goldWindow.height;
      this._goldWindow.y =
        this.y > minGoldY ? 0 : Graphics.boxHeight - goldWindow.height;

      // 투명도 업데이트
      this.updateDefaultOpacity();
      this.updateContentsOpacity();
      this.updateBigFaceOpacity();

      // 이름 윈도우 업데이트

      // 얼굴 이미지의 Z-Index 업데이트
      if ($gameMessage.faceName() !== "") {
        const isBigFace = /^Big_/.exec($gameMessage.faceName());
        const backIndex = 2;

        if (RS.MessageSystem.Params.faceSide) {
          this.setFaceZIndex(isBigFace ? 0 : backIndex);
        } else {
          this.setFaceZIndex(backIndex);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const alias_Window_Message_convertEscapeCharacters =
    Window_Message.prototype.convertEscapeCharacters;
  Window_Message.prototype.convertEscapeCharacters = function (text) {
    const tcGroup = RS.MessageSystem.TextCodes.ENUM;
    const textCode = RS.MessageSystem.TextCodes.Main;
    const regGroup = RS.MessageSystem.Reg.Group;
    text = alias_Window_Message_convertEscapeCharacters.call(this, text);
    text = text.replace(
      regGroup[tcGroup.BOLD_START_CV],
      function () {
        return regGroup[tcGroup.BOLD_START].source;
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.BOLD_END_CV],
      function () {
        return regGroup[tcGroup.BOLD_END].source;
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITALIC_START_CV],
      function () {
        return regGroup[tcGroup.ITALIC_START].source;
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITALIC_END_CV],
      function () {
        return regGroup[tcGroup.ITALIC_END].source;
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.NAME], (...args) => {
      let retName = args[1];

      if (retName.endsWith(":left")) {
        retName = retName.replace(":left", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "left";
      }
      if (retName.endsWith(":auto")) {
        retName = retName.replace(":auto", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "auto";
      }
      if (retName.endsWith(":center")) {
        retName = retName.replace(":center", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "center";
      }
      if (retName.endsWith(":opacity0")) {
        retName = retName.replace(":opacity0", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "opacity0";
      }
      if (retName.endsWith(":defaultOpacity")) {
        retName = retName.replace(":defaultOpacity", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "defaultOpacity";
      }
      if (retName.endsWith(":right")) {
        retName = retName.replace(":right", "");
        RS.MessageSystem.Params.namePositionTypeAtX = "right";
      }
      (this._nameWindow as any).drawName(retName);
      return "";
    });
    text = text.replace(
      regGroup[tcGroup.BALLOON],
      function () {
        const value = Number(arguments[1] || -2);
        if ($gameParty.inBattle()) {
          $gameMessage.setBalloon(
            // @ts-ignore
            value < 0 ? "ENEMIES : " + Math.abs(value) : "ACTORS : " + value
          );
        } else {
          $gameMessage.setBalloon(value);
        }
        return "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.FRIENDLY_TROOPS],
      function () {
        var value = Number(arguments[1] || 0);
        $gameMessage.setBalloon(
          // @ts-ignore
          "ACTORS : " + value
        );
        return "";
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY_TROOPS],
      function () {
        var value = Number(arguments[1] || 0);
        $gameMessage.setBalloon(
          // @ts-ignore
          "ENEMIES : " + value
        );
        return "";
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.FACE_DIRECTION], () => {
      var value = Number(arguments[1] || 0);
      if (!this._isUsedTextWidthEx) {
        RS.MessageSystem.Params.faceDirection = value;
      }
      return "";
    });
    return text;
  };

  // Window_Message.prototype.terminateMessage

  Window_Message.prototype.setHeight = function (n) {
    this.contents.clear();
    $gameMessage.setMaxLine(n);
    this.height = this.fittingHeight(n);
    this.createContents();
    this.updatePlacement();
  };

  const alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function (rect) {
    alias_Window_Message_initialize.call(this, rect);
    $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
    this.setHeight(RS.MessageSystem.Params.numVisibleRows);
    this.createFaceContents();
    this.on("removed", this.removeEventHandler, this);
    this.on("onLoadWindowskin", this.onLoadWindowskin, this);
  };

  Window_Message.prototype.removeEventHandler = function () {
    this.off("onLoadWindowskin", this.onLoadWindowskin, this);
  };

  /**
   * TODO: ColorManager.textColor의 대체 구현.
   *
   * @param {Number} n
   * @returns
   */
  Window_Message.prototype.textColor = function (n) {
    const windowskin = this.windowskin;
    if (!windowskin.isReady()) {
      // Set the default text color if the windowskin is not ready.
      return Color.baseColor;
    }
    const px = 96 + (n % 8) * 12 + 6;
    const py = 144 + Math.floor(n / 8) * 12 + 6;
    return windowskin.getPixel(px, py);
  };

  Window_Message.prototype.onLoadWindowskin = function () {
    Color.baseColor = this.textColor(0);
    this.changeTextColor(Color.baseColor);
  };

  Window_Message.prototype.loadWindowskin = function () {
    const bitmap = ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);

    // if the windowskin is changed?
    if (bitmap !== this.windowskin) {
      this.windowskin = bitmap;
      this._isDirtyWindowskin = false;
      this.windowskin.addLoadListener(() => {
        this._isDirtyWindowskin = true;
      });
      if (!this.contents) {
        this.createContents();
      }
      // Set the default text color if the windowskin didn't load yet.
      this.changeTextColor(Color.baseColor);

      if (!this.windowskin.isReady()) {
        return setTimeout(() => this.loadWindowskin(), 10);
      }
    }
  };

  var _Window_Message_updateLoading = Window_Message.prototype.updateLoading;
  Window_Message.prototype.updateLoading = function () {
    let ret = true;

    if (this._isDirtyWindowskin) {
      Color.baseColor = ColorManager.textColor(0);
      this.changeTextColor(Color.baseColor);
      this._isDirtyWindowskin = false;
      ret = true;
    }
    return _Window_Message_updateLoading.call(this) && ret;
  };

  Window_Message.prototype.needsNewPage = function (textState) {
    return (
      !this.isEndOfText(textState) &&
      textState.y + textState.height > this.contentsHeight()
    );
  };

  Window_Message.prototype.createFaceContents = function () {
    this._faceContents = new Sprite();
    this._faceContents.x = 0;
    this._faceContents.y = 0;

    this.addChildAt(this._faceContents, 2);
    return this._faceContents;
  };

  Window_Message.prototype.removeFaceContents = function () {
    if (this._faceContents) this.removeChild(this._faceContents);
  };

  /**
   * 큰 얼굴 이미지가 설정되었을 때 텍스트 시작 위치
   */
  Window_Message.prototype.newLineX = function () {
    const reg = /^Big_/i;
    const faceName = $gameMessage.faceName();
    const faceIndex = $gameMessage.faceIndex();
    if (reg.exec(faceName)) {
      var faceStartX = RS.MessageSystem.Params.faceSide
        ? 0
        : RS.MessageSystem.Params.textStartX;
      return faceIndex > 0 ? 0 : faceStartX;
    } else {
      if (RS.MessageSystem.Params.faceDirection === 2) return 0;
      return faceName ? RS.MessageSystem.Params.faceStartOriginX : 0;
    }
  };

  // TODO: 큰 얼굴 이미지 구현 필요

  /**
   * @param {String} faceName
   */
  Window_Message.prototype.isValidBigFace = function (faceName) {
    var reg = /^Big_/i;
    return reg.exec(faceName);
  };

  /**
   * TODO: deprecated
   */
  Window_Message.prototype.updateNameWindow = function () {};

  /**
   * Window 구성 스프라이트 _windowBackSprite의 투명도를 조절합니다.
   * TODO: deprecated
   * @method standardBackOpacity
   */
  Window_Message.prototype.standardBackOpacity = function () {
    return RS.MessageSystem.Params.backOpacity;
  };

  /**
   * Bitmap의 context.globalAlpha 값을 변경합니다.
   * @method translucentOpacity
   */
  Window_Message.prototype.translucentOpacity = function () {
    return RS.MessageSystem.Params.translucentOpacity;
  };

  /**
   * 윈도우를 구성하는 모든 객체의 투명도를 변경합니다.
   * @method updateDefaultOpacity
   */
  Window_Message.prototype.updateDefaultOpacity = function () {
    this.opacity = RS.MessageSystem.Params.defaultOpacity;
  };

  /**
   * Window 구성 스프라이트 _windowContentsSprite의 투명도를 변경합니다.
   * @method updateContentsOpacity
   */
  Window_Message.prototype.updateContentsOpacity = function () {
    this.contentsOpacity = RS.MessageSystem.Params.contentsOpacity;
  };

  const alias_Window_Message_shouldBreakHere =
    Window_Message.prototype.shouldBreakHere;
  Window_Message.prototype.shouldBreakHere = function (text) {
    const isBreakCharacter = alias_Window_Message_shouldBreakHere.call(
      this,
      text
    );

    if (isBreakCharacter) {
      if (RS.MessageSystem.Params.isPlayTextSound) {
        const interval = RS.MessageSystem.Params.textSoundInterval;

        // prettier-ignore
        if ((this._textSoundInterval--) <= 0) {
              AudioManager.playStaticSe(< rm.types.AudioParameters >{
                  name: RS.MessageSystem.popParameter(
                      "Text Sound",
                      "텍스트 효과음"
                  ),
                  pan: 0,
                  pitch: 100,
                  volume: 90,
              });
              this._textSoundInterval = interval;
          }
      }
    }

    return isBreakCharacter;
  };

  //============================================================================
  // Components
  //============================================================================

  /**
   * @class EventEmitter
   * @description
   * 이벤트를 전달하기 위한 클래스입니다.
   */
  class EventEmitter {
    constructor(private _listeners: { [key: string]: Function[] } = {}) {
      this._listeners = {};
    }

    on(eventName: string, func: Function) {
      if (!this._listeners[eventName]) {
        this._listeners[eventName] = [];
      }

      if (!func) {
        return;
      }

      if (func instanceof Function) {
        this._listeners[eventName].push(func);
      }
    }

    emit(eventName: string, ...args: any[]) {
      if (!this._listeners[eventName]) {
        return;
      }

      this._listeners[eventName].forEach((func) => {
        if (!(func instanceof Function)) {
          console.warn("호출된 이벤트 리스너가 함수가 아닙니다.");
          return;
        }
        func(...args);
      });
    }
  }

  /**
   * @class Component
   * @description
   * 컴포넌트를 구현하기 위한 클래스입니다.
   */
  class Component extends EventEmitter {
    constructor(props: { [key: string]: any }) {
      super();
      this.init(props);
    }

    init(props: { [key: string]: any }) {
      this.on("ready", () => this.onReady(props));
      this.on("mounted", () => this.mounted(props));
      this.on("destroy", () => this.onDestroy());
    }

    ready() {
      this.emit("ready");
    }

    destroy() {
      this.emit("destroy");
    }

    execute() {
      this.emit("mounted");
    }

    onReady(props: { [key: string]: any }) {}
    onDestroy() {}
    mounted(props: { [key: string]: any }) {}
  }

  /**
   * @class BaseComponent
   * @description
   * 샌드박스 환경에서 MV 메소드를 호출하여 이전 버전에 대한 안전성을 제공합니다.
   */
  class BaseComponent extends Component {
    private _messageWindow!: Window_Message;

    constructor(props: { [key: string]: any }) {
      super(props);
    }

    onReady(props: { [key: string]: any }) {
      // if the message window is valid from passed props.
      if (!("messageWindow" in props)) {
        console.error("messageWindow is not defined");
        return;
      }

      /**
       * @type {Window_Message}
       */
      this._messageWindow = props.messageWindow;
    }

    // Getters
    get messageWindow() {
      return this._messageWindow;
    }

    get contents() {
      return this._messageWindow.contents;
    }

    /**
     * @returns {Window_NameBox}
     */
    get _nameWindow() {
      return this._messageWindow._nameBoxWindow;
    }

    get _choiceWindow() {
      return this._messageWindow._choiceListWindow
        ? this._messageWindow._choiceListWindow
        : {
            windowWidth: () => 0,
            windowHeight: () => 0,
          };
    }

    save() {
      // 'this._messageWindow?.save()'의 구현입니다.
      // 하지만 save는 함수가 아닐 수도 있습니다.
      // 타입의 안전성은 체크하지 않습니다.
      this._messageWindow.save ? this._messageWindow.save() : null;
    }

    restore() {
      // 'this._messageWindow?.restore()'의 구현입니다.
      // 하지만 save는 함수가 아닐 수도 있습니다.
      // 타입의 안전성은 체크하지 않습니다.
      this._messageWindow.restore ? this._messageWindow.restore() : null;
    }

    standardPadding() {
      // 패딩을 업데이트해야 합니다 (MZ에서 달라진 부분입니다)
      // 꼭 체크할 필요는 없지만...
      this._messageWindow.updatePadding();
      const padding = this._messageWindow.padding || 12;

      return padding;
    }

    textPadding() {
      // textPadding()의 구현입니다.
      return this._messageWindow.itemPadding() || 6;
    }

    newLineX() {
      return this._messageWindow.newLineX();
    }

    fittingHeight(numLines: number) {
      return this._messageWindow.fittingHeight(numLines);
    }

    drawTextEx(text: string) {
      const box = this._messageWindow.textSizeEx(text);
      return box.width;
    }

    lineHeight() {
      return this._messageWindow.lineHeight();
    }

    /**
     * TODO: 상속 시, 이 메소드를 오버라이드 하세요.
     */
    updatePlacement() {}

    drawMessageFace() {
      this._messageWindow.drawMessageFace();
    }

    set x(value: number) {
      this._messageWindow.x = value;
    }

    set y(value: number) {
      this._messageWindow.y = value;
    }

    set width(value: number) {
      this._messageWindow.width = value;
    }

    set height(value: number) {
      this._messageWindow.height = value;
    }

    get width() {
      return this._messageWindow.width;
    }

    get _width() {
      return this._messageWindow.width;
    }

    get height() {
      return this._messageWindow.height;
    }

    get _height() {
      return this._messageWindow.height;
    }

    canvasToLocalX(x: number) {
      return x;
    }

    canvasToLocalY(y: number) {
      return y;
    }
  }

  /**
   * @static
   * @class DependencyInjector
   * @description
   * 이 클래스는 MZ에서 MV에 의존성을 갖는 메소드를 실행하는데 필요한 컴포넌트를 주입합니다.
   * 또한 해당 컴포넌트를 안전한 샌드박스 환경에서 실행시키기 위해 사용됩니다.
   * 샌드박스 환경이라함은 MZ에서도 오류 없이 안전하게 동작한다는 것을 의미합니다.
   */
  class DependencyInjector {
    public static COMPONENTS: typeof BaseComponent[] = [];

    public static components: { [key: string]: BaseComponent } = {};
    private static _isDirty: Boolean = false;

    /**
     * inject all components inside the sandbox environment.
     *
     * @param messageWindow Specify the message window.
     * @returns void
     */
    public static inject(messageWindow: Window_Message): void {
      if (this._isDirty) {
        console.log("components are already injected");
        return;
      }

      if (DependencyInjector.COMPONENTS) {
        DependencyInjector.COMPONENTS.forEach((component) => {
          this.components[component.name] = new component({
            messageWindow,
          });
        });
      }

      this._isDirty = true;
    }

    /**
     * get the component by name.
     *
     * @param name Specify the component name
     * @returns BaseComponent
     */
    public static getComponent<T extends BaseComponent>(name: string): T {
      return <T>this.components[name];
    }
  }

  /**
   * @class BalloonWindowTransformComponent
   * @description
   * 말풍선 윈도우의 위치를 조정하기 위한 컴포넌트입니다.
   */
  class BalloonWindowTransformComponent extends BaseComponent {
    private _bWidth: number = 0;
    private _bHeight: number = 0;
    private _isUsedTextWidthEx: boolean = false;
    public transform!: PIXI.Transform;

    onReady(props: { [key: string]: any }) {
      super.onReady(props);
      this._bWidth = 0;
      this._bHeight = 0;
      this._isUsedTextWidthEx = false;
    }

    /**
     * 샌드박스 환경을 구성합니다.
     *
     * @param {String} text
     * @returns {Number}
     */
    calcBalloonRect(text: string) {
      let temp, baseWidth, tempText, height: number, min, pad, numOfLines;

      // drawTextEx를 사용하기 전에 현재 상태를 저장한다.
      this.save();

      temp = text;

      // 라인 갯수를 구하기 위해 텍스트를 줄바꿈 문자를 기준으로 나눈다.
      tempText = text.slice(0);
      tempText = tempText.split(/[\r\n]+/);
      numOfLines = tempText.length;

      pad = this.standardPadding() * 2;

      // 높이를 구한다.
      height = 0;
      tempText.forEach((i) => (height += this.calcBalloonRectHeight(i)));

      if (height <= 0) {
        // 높이를 구할 수 없었다면,
        height = this.fittingHeight(numOfLines);
      } else {
        // 높이를 구했다면
        height = height + pad;
      }

      const textPadding = this.textPadding();

      // 폭을 계산한다.
      let pw = 0;
      for (var i = 0; i < numOfLines; i++) {
        this._isUsedTextWidthEx = true;
        const x = this.drawTextEx(tempText[i]);
        this._isUsedTextWidthEx = false;
        if (x >= pw) {
          pw = x;
        }
      }

      baseWidth = pw;
      this._bWidth =
        baseWidth + pad + textPadding || RS.MessageSystem.Params.WIDTH;

      // 얼굴 이미지가 설정되어있다면 ?
      if ($gameMessage.faceName() !== "") {
        // 최소 높이를 설정한다.
        min = this.fittingHeight(4);
        // 기존 폭 값에 얼굴 이미지의 폭을 더한다.
        this._bWidth += this.newLineX() + pad;
        if (RS.MessageSystem.Params.faceDirection === 2) {
          this._bWidth += ImageManager.faceWidth;
        }
        // 높이 값이 최소 높이보다 작으면, 최소 높이 값으로 설정한다.
        if (height < min) height = height.clamp(min, height + (min - height));
      }

      const type = RS.MessageSystem.Params.choiceWindowStyle;

      // 선택지가 있고, XP 스타일로 설정했을 때
      if (type === "RMXP" && $gameMessage.isChoice()) {
        const maxLines = tempText.length;
        const maxChoices = $gameMessage.choices().length;
        const lineHeight = this.lineHeight();
        // 선택지 갯수를 확장했을 수도 있지만, 4개로 가정한다.
        height = height + maxChoices * lineHeight;
        // 선택지 윈도우의 폭이 말풍선보다 크면 제한을 둔다.
        if (this._choiceWindow.windowWidth() > this._bWidth) {
          this._bWidth = this._choiceWindow.windowWidth();
        }
      }

      this._bHeight = height;

      // this.drawTextEx() 사용하기 이전 상태로 복구한다.
      this.restore();
    }

    isActiveInBalloon() {
      const isValidBalloon = $gameMessage.getBalloon() === -2;
      if (isValidBalloon) {
        this.updatePlacement();
        return false;
      }
      return true;
    }

    setBalloonRect(data: { [key: string]: any }) {
      const ox = RS.MessageSystem.Params.windowOffset.x;
      const oy = RS.MessageSystem.Params.windowOffset.y;
      this.x = data.dx + ox;
      this.y = data.dy + oy;
      this.width = this._bWidth;
      this.height = this._bHeight;

      if (
        $gameMessage.faceName() &&
        RS.MessageSystem.Params.faceDirection === 2
      ) {
        this.drawMessageFace();
      }
    }

    setBalloonPlacement(data: { [key: string]: any }) {
      // 화면 좌측
      if (!data) return;
      if (data.mx - this._bWidth / 2 < 0) {
        data.dx = 0;
        data.tx = this.canvasToLocalX(data.mx);
      }

      // 화면 우측
      if (data.mx - this._bWidth / 2 > Graphics.boxWidth - this._bWidth) {
        data.dx = Graphics.boxWidth - this._bWidth;
        data.tx = this.canvasToLocalX(data.mx);
      }

      // 화면 상단
      if (data.my - this._bHeight - data.tileHeight / 2 < 0) {
        data.dy = data.my + data.tileHeight / 2;
        data.scaleY = -1;
        data.ty = this._height * data.scaleY + this._height;
        data.ny = this.y + this._bHeight + RS.MessageSystem.Params.nameWindowY;
      }

      // 화면 하단
      if (data.my - this._bHeight > Graphics.boxHeight - this._bHeight) {
        data.dy = Graphics.boxWidth - this._bHeight;
        data.ty = this._height;
      }

      return data;
    }

    updateSubBalloonElements(data: { [key: string]: any }) {
      // deprecated
    }

    updateBalloonPosition() {
      let data: { [key: string]: any } = {};

      if (!this.isActiveInBalloon()) return;

      // 말풍선 소유자의 화면 좌표
      const owner = $gameMap.getMsgOwner();

      data.mx = owner.screenX();
      data.my = owner.screenY();

      data.tx = this._bWidth / 2;
      data.ty = this._bHeight;
      data.scaleY = 1;
      data.tileHeight = $gameMessage.getBalloonPatternHeight();
      data.dx = data.mx - this._bWidth / 2;
      data.dy = data.my - this._bHeight - data.tileHeight;
      data.ny =
        this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

      data = <{ [key: string]: any }>(
        this.setBalloonPlacement(Object.create(data))
      );

      if (
        data.dx + RS.MessageSystem.Params.windowOffset.x !== this.x ||
        data.dy + RS.MessageSystem.Params.windowOffset.y !== this.y ||
        this._bWidth !== this.width ||
        this._bHeight !== this.height
      ) {
        // 말풍선 위치 및 크기 설정
        this.setBalloonRect(data);

        // 멈춤 표시 스프라이트 위치 조정
        this.updateSubBalloonElements(data);
      }
    }

    updateBalloonPositionInBattle() {
      if (!$gameParty.inBattle()) {
        // 전투 씬인지 확인
        console.warn("전투가 아닙니다");
        return;
      }
      if (!$gameSystem.isSideView()) {
        // 사이드뷰 전투인지 확인
        console.warn("사이드뷰 전투가 아닙니다.");
        return;
      }

      let data = <{ [key: string]: any }>{};

      // 타겟의 화면 좌표 설정
      let owner = $gameMap.getMsgOwner();
      if (!owner) {
        console.warn("owner 변수가 없습니다");
        return;
      }
      if (!owner.hasOwnProperty("type")) {
        console.warn("type 속성이 없습니다 : " + owner);
        return;
      }
      if (!owner.hasOwnProperty("id")) {
        console.warn("id 속성이 없습니다 : " + owner);
        return;
      }

      // 현재 씬이 전투 씬이 아닌 경우를 확인한다.
      let scene = SceneManager._scene;
      if (!(scene instanceof Scene_Battle)) {
        console.warn("전투 장면이 아닙니다");
        return false;
      }

      let parent;

      // 액터인가?
      if (owner.type === "actor") {
        parent = scene._spriteset._actorSprites; // 액터 스프라이트 군을 반환
      } else {
        parent = scene._spriteset._enemySprites; // 적 스프라이트 군을 반환
      }

      // 타겟 스프라이트를 id 값으로 찾는다.
      let tempBattlers = [];
      tempBattlers = parent;
      let target = tempBattlers[owner.id];
      if (!target) {
        console.warn("타겟이 없습니다");
        return;
      }

      // 이미 죽어있다면 메시지를 일반 메시지로 표시한다.
      if (
        (owner.type === "actor" && !(<Sprite_Actor>target)._actor.isAlive()) ||
        (owner.type === "enemy" && !(<Sprite_Enemy>target)._enemy.isAlive())
      ) {
        return;
      }

      data.mx = target.x;
      data.my = target.y;

      data.padY =
        owner.type === "actor"
          ? (target as Sprite_Actor)._mainSprite.bitmap.height / 6
          : target.bitmap.height;

      data.tx = this._width / 2;
      data.ty = this._height;

      data.scaleY = 1;
      data.tileHeight = $gameMessage.getBalloonPatternHeight();

      data.dx = data.mx - this._bWidth / 2;
      data.dy = data.my - this._bHeight - data.tileHeight - data.padY;

      data.ny =
        this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

      data = <{ [key: string]: any }>(
        this.setBalloonPlacement(Object.create(data))
      );

      // 말풍선 위치 및 크기 설정
      this.setBalloonRect(data);

      // 멈춤 표시 스프라이트 위치 조정
      this.updateSubBalloonElements(data);

      if (this.transform) this.updateTransform();
    }

    updateTransform(): void {
      this.messageWindow.updateTransform();
    }

    calcBalloonRectHeight(text: string) {
      // 상태 저장
      this.save();

      const messageWindow = this.messageWindow;
      const tempFontSize = this.contents.fontSize;

      const textState = messageWindow.createTextState(text, 0, 0, 0);
      textState.text = messageWindow.convertEscapeCharacters(text);
      textState.height = messageWindow.calcTextHeight(textState, false);

      // 상태 복구
      this.restore();

      messageWindow.setTextSize(tempFontSize);
      return textState.height;
    }
  }

  DependencyInjector.COMPONENTS.push(BalloonWindowTransformComponent);

  /**
   * @class NamwWindowPositionComponent
   * @description
   * 이름 윈도우의 X좌표를 재설정합니다.
   */
  class NamwWindowPositionComponent extends BaseComponent {
    setOpacity(value: number) {
      let opacity = value;
      if (typeof opacity !== "number") {
        opacity = Number(opacity);
      }
      if (isNaN(opacity)) {
        opacity = 255;
      }
      this._nameWindow.opacity = value;
    }

    updatePositionX() {
      // 이름 윈도우가 없다면
      if (!this._nameWindow) {
        return;
      }

      const mx = this.x;
      const w = this.width;
      const nw = this._nameWindow.width;

      const position = RS.MessageSystem.Params.namePositionTypeAtX;

      const nx = RS.MessageSystem.Params.nameWindowX;

      let newX = mx + nx;

      switch (position) {
        case "right":
          newX = mx + w - nw - nx;
          break;
        case "center":
          newX = mx + w / 2 - nw / 2 - nx;
          break;
        case "left":
          newX = mx + nx;
          break;
        case "opacity0":
          this.setOpacity(0);
          break;
        case "defaultOpacity":
          this.setOpacity(RS.MessageSystem.Params.defaultOpacity);
          break;
        case "auto":
          newX = this.x + this.newLineX() + nx;
          break;
      }

      this._nameWindow.x = newX;
    }

    updatePositionY() {
      const ox = RS.MessageSystem.Params.windowOffset.x;
      const oy = RS.MessageSystem.Params.windowOffset.y;
      const positionType = $gameMessage.positionType();
      const ballonOwnerType = $gameMessage.getBalloon();

      this.updatePositionX();

      // 메시지 윈도우가 상단이고, 말풍선 모드가 아니라면
      if (positionType === 0 && ballonOwnerType === -2) {
        // 최상단의 위치
        const topY = 0;

        this._nameWindow.y = topY + oy;

        // 이름 윈도우가 열렸는 지 여부에 따라 메시지 윈도우의 Y 좌표를 설정합니다.
        this.y = this._nameWindow.isOpen()
          ? topY +
            this._nameWindow.height +
            RS.MessageSystem.Params.nameWindowY +
            oy
          : topY + oy;
      } else {
        this._nameWindow.y =
          this.y -
          this._nameWindow.height -
          RS.MessageSystem.Params.nameWindowY;
      }
    }
  }

  DependencyInjector.COMPONENTS.push(NamwWindowPositionComponent);

  //============================================================================
  // Game_Interpreter
  //============================================================================

  Window_NameBox.prototype.updatePlacement = function () {
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    const messageWindow = this._messageWindow;
    if ($gameMessage.isRTL()) {
      this.x = messageWindow.x + messageWindow.width - this.width;
    } else {
      this.x = messageWindow.x;
    }
    if (messageWindow.y > 0) {
      this.y = messageWindow.y - this.height;
    } else {
      this.y = messageWindow.y + messageWindow.height;
    }
  };

  //============================================================================
  // Game_Temp
  //============================================================================

  Game_Temp.prototype.setMSHeightFunc = function (func) {
    this._callMSHeightFunc = func;
  };

  Game_Temp.prototype.setMaxLine = function (n) {
    if (this._callMSHeightFunc) this._callMSHeightFunc(n);
  };

  //============================================================================
  // Game_Map
  //============================================================================

  var alias_Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    alias_Game_Map_initialize.call(this);
    this._msgOwner = $gamePlayer;
    this._msgEvent = 0;
  };

  Game_Map.prototype.getMsgOwner = function () {
    return this._msgOwner;
  };

  /**
   * @method setMsgOwner
   * @param o {Game_Event | Game_Player}
   */
  Game_Map.prototype.setMsgOwner = function (o) {
    this._msgOwner = o;
    $gameMessage.setBalloonPatternHeight(this.tileHeight());
  };

  Game_Map.prototype.getMsgEvent = function () {
    return this._msgEvent;
  };

  Game_Map.prototype.setMsgEvent = function (ev) {
    this._msgEvent = ev;
  };

  RS.MessageSystem.initSystem();
})(RS.MessageSystem);
