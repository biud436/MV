//================================================================
// RS_MessageSystem.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_MessageSystem.js
 * @plugindesc (v0.1.140) Hangul Message System <RS_MessageSystem>
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
 * @param Face Smooth
 * @text Face Smooth
 * @type boolean
 * @parent Bust Option
 * @desc if true, the face bitmap shows up the smoothly.
 * @default true
 * @on true
 * @off false
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
 * The face image displays always smoothy on the message window.
 * if you want to display the face image smoothly, you can use this plugin command.
 * if not, you can pass parameter named 'false' to this plugin command.
 *
 * Message faceSmooth true
 * Message faceSmooth false
 *
 * ======================================================================================================
 * Change Log
 * =======================================================================================================
 * 2024.03.09 (v0.1.9) :
 * - Fixed readability issues with some code.
 * 2024.01.16 (v0.1.7) :
 * - fixed the issue that is not compatible with SRD_TranslationEngine.js
 * 2022.01.25 (v0.1.67) :
 * - added a new feature that can set the anti-aliasing(smooth) or aliasing of bust shot.
 * 2021.06.29 (v0.1.66) :
 * - Fixed the bug that is incorrect function name called "self.loadWindowSkin"
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
* RS_MessageSystem.js
* @plugindesc (v0.1.140) 한글 메시지 시스템 <RS_MessageSystem>
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
* @param Face Smooth
* @text 얼굴 부드럽게 표시
* @type boolean
* @parent 큰 페이스칩
* @desc 얼굴 이미지를 부드럽게 표시합니다.
* @default true
* @on 부드럽게 표시
* @off 그대로 표시
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
* 얼굴 이미지를 부드럽게 표시하고 싶으시다면, 다음과 같이 하세요.
* 
* 메시지 페이스칩부드럽게 true    (부드럽게 표시 = 기본값)
* 메시지 페이스칩부드럽게 false   (있는 그대로를 표시)
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
*
* =============================================================================
* 버전 로그(Version Log)
* =============================================================================
* 2024.03.09 (v0.1.9) :
* - fixed readability issues with some code.
* 2024.01.16 (v0.1.7) :
* - SRD_TranslationEngine 플러그인과 호환되지 않는 문제를 수정하였습니다.
* 2022.01.25 (v0.1.67) : 
* - 얼굴 이미지를 부드럽게 표시하는 기능을 끌 수 있게 되었습니다.
* 2021.06.29 (v0.1.66) :
* - Fixed the bug that is incorrect function name called "self.loadWindowSkin"
* 2020.07.11 (v0.1.65) :
* - optimized color transformation.
* 2020.05.14 (v0.1.64) :
* - 커스텀 폰트가 로드되지 않는 현상을 수정하였습니다.
* - fonts 폴더에 있는 모든 폰트를 자동으로 로드하는 기능을 추가하였습니다.
* - RPG Maker MV v1.5.2 이하 버전에서도 동작할 수 있게 하였습니다.
* - 이름 윈도우의 텍스트 패딩 값을 수정하여 정확히 가운데에 표시되도록 하였습니다.
* - 적군의 이름에서도 텍스트 코드를 사용할 수 있습니다.
* - 텍스트 색상 변경 함수를 수정하였습니다.
* - RS.MessageSystem.Params.extraSubWindows 변수를 추가하였습니다.
* 2020.01.24 (v0.1.63) : 
* - 말풍선 모드에서 타겟 캐릭터가 움직이지 않을 때, 배경 화면이 깜빡거리는 문제를 수정하였습니다.
* 2019.09.23 (v0.1.61) :
* - 텍스트 정렬 명령어를 사용하지 않았을 때에도, 왼쪽으로 강제 정렬되는 문제를 수정하였습니다.
* 2019.08.29 (v0.1.60) : 
* - 텍스트 정렬이 왼쪽일 때, 두 번째 라인에 공백이 삽입되는 문제를 수정하였습니다.
* 2019.08.07 (v0.1.59) :
* - 희미한 배경, 투명한 배경 설정 시, 스탠딩 CG가 보이지 않던 문제를 수정하였습니다.
* - 스탠딩 CG가 설정되었을 때의 텍스트 시작 좌표를 6으로 수정하였습니다.
* 2019.08.03 (v0.1.58) :
* - 말풍선 시 메시지 창이 캐릭터를 따라다니게 되는 기능을 추가하였습니다.
* - 스탠딩 CG를 전면에 표시할 때, 텍스트가 가려지지 않게 수정하였습니다. 
* 2019.06.12 (v0.1.57) :
* - 전투에서 말풍선, 적그룹, 아군 제어 코드가 동작하지 않는 문제를 해결하였습니다.
* 2019.05.23 (v0.1.56) :
* - 일반 얼굴 이미지를 오른쪽에 위치시킬 수 있습니다.
* - 일반 얼굴 이미지도 별도의 스프라이트로 표시됩니다.
* - 말풍선이 설정되어있을 때 숫자 입력 창이 제대로 위치하도록 수정하였습니다.
* - 큰 얼굴 이미지가 사이드에 설정되어있을 때 텍스트 시작 위치가 0부터 시작됩니다.
* - 멈춤 표시 스프라이트 위치가 잘못되어있는데 수정하였습니다.
* - 얼굴 이미지의 방향을 제어할 수 있는 텍스트 코드를 추가하였습니다.
* - 대화창이 열리고 닫힐 때 얼굴 이미지의 스케일도 같이 조정됩니다.
* 2019.04.15 (v0.1.49) :
* - 텍스트 정렬 기능을 스크롤 텍스트나 사용자 프로필에서 사용할 수 있습니다.
* - 멀티 라인 사용 여부 체크 함수를 한층 더 보완하였습니다.
* - 텍스트 정렬자 사용 시 폰트 크기가 초기 설정으로 되돌아가는 문제를 수정하였습니다.
* 2019.04.10 (v0.1.48) :
* - 라인 확장 관련 버그를 수정하였습니다.
* - 라인 확장 시에도 선택지가 바로 표시되게 수정하였습니다.
* - 이제 라인 확장 시 메시지가 아랫쪽일 때 선택지 위치가 위쪽에 표시됩니다.
* 2019.03.23 (v0.1.46) :
* - 말풍선 소유자가 플레이어로 고정되는 문제를 수정하였습니다.
* 2019.03.07 (v0.1.45) : 
* - 말풍선 멈춤 스프라이트의 위치가 잘못되는 문제 수정
* - 메시지 사운드 볼륨 값을 0.4로 수정하였습니다.
* - 이제 메시지 오프셋 값을 수정할 수 있습니다.
* 2019.02.16 (v0.1.44) :
* - 자동 개행 기능 추가 (일반 메시지에서만 사용 가능)
* - 배경색 기능을 추가하였습니다.
* - 그레디언트(Gradient) 텍스트를 2개 이상 사용하면 색상 영역이 확장되는 현상을 수정하였습니다.
* - 그레디언트 스타일 추가
* - 윈도우 폭 설정 기능 추가
* - 큰 페이스칩(스탠딩 CG) 투명도 조절 기능 추가
* 2018.12.08 (v0.1.43) : 
* - \} \축소! 사용 시 라인 높이보다 작아질 수 없게 하였습니다.
* 2018.11.30 (v0.1.42) :
* - \! 사용 시 생기는 문제를 수정하였습니다.
* 2018.11.21 (v0.1.41) :
* - 윈도우 스킨을 사전에 로드하지 않았을 때, 기본 텍스트 색상이 기본색으로 설정되도록 하였습니다.
* - 말풍선 텍스트 코드를 전투에서 그대로 쓸 수 있게 새로운 기능을 추가하였습니다.
* - 암호화 설정이 없는 1.3.5 미만 MV에서 오류 없이 동작하도록 예외 처리를 추가하였습니다.
* - 말풍선 모드에서 RPG Maker XP 스타일의 선택지 설정이 가능해졌습니다.
* - 메시지 윈도우의 위치를 위쪽으로 설정했을 때, 이름 윈도우의 크기 만큼 남는 현상을 수정하였습니다.
* - 이름 윈도우의 위치를 가운데 또는 오른쪽으로 설정했을 때, 기본 선택지와 겹치지 않도록 수정하였습니다. 
* - 이벤트 커맨드 실행 내용의 첫번 째 커맨드에 노트 태그를 설정하면 읽지 못했던 문제를 수정하였습니다.
* - 선택지 윈도우의 윈도우 스킨도 같이 변경됩니다.
* 2018.11.19 (v0.1.33) : 
* - 윈도우 스킨 변경 후 다음 메시지의 가로 길이가 더 넓어지면 글자가 잘리는 현상 수정.
* 2018.11.16 (v0.1.32) :
* - 1.6.1 버전이 아닌 MV에서 동작하지 않는 문제 수정
* - 0~31 사이의 숫자를 입력하면 시스템 텍스트 컬러로 반환
* 2018.11.10 (v0.1.31) :
* - 프리 로드 함수에 아무것도 설정하지 않으면 오류가 나는 문제를 수정하였습니다.
* 2018.11.10 (v0.1.30) :
* - 이름 윈도우에서도 희미한 배경 이미지 지원
* - 노트 태그 기능을 추가하였습니다.
* - 시스템 이미지 프리 로드 기능을 추가하였습니다.
* - 윈도우스킨을 변경하는 한글 플러그인 명령이 제대로 되어있지 않았던 걸 수정하였습니다.
* 2018.11.05 (v0.1.27) :
* - 태그처럼 쓸 수 있는 텍스트 코드를 지원합니다.
* - 이스케이프 코드에서 한글 + 영어 혼용이 가능합니다.
* - 한글이 아닌 텍스트 코드 사용 시, RegExp 객체에서 특정 유니코드(아스키코드)가 처리되지 않는 문제를 수정하였습니다.
* - 텍스트 사운드 재생 간격을 설정할 수 있는 기능을 추가하였습니다.
* 2018.09.04 (v0.1.25) : 
* - 시스템 폰트로 설정하는 폰트 관련 매개변수를 추가하였습니다.
* - 일본어 지원
* 2018.07.02 (v0.1.23) : 
* - 다른 메시지 플러그인과 호환될 수 없게 만드는 종속성 모듈을 제거하였습니다. 
* - 말풍선 모드에서 텍스트 크기를 인식되지 않았던 문제를 수정하였습니다.
* - 실제 그레디언트 적용 범위를 텍스트 크기 정도로 줄였습니다.
* - 마지막 텍스트 정렬 위치를 저장합니다.
* 2018.04.25 (v0.1.18) : 말풍선 높이 계산 함수 변경
* 2018.02.06 (v0.1.17) : 기본 언어 코드 탐지 방법을 변경했습니다. 이젠 직접 입력하세요.
* 2018.01.24 (v0.1.16) - 사운드 풀 초기화 관련 문제 수정
* 2018.01.21 (v0.1.15) :
* - 텍스트 효과음 처리 방식을 사운드 풀 방식으로 변경했습니다.
* - 플러그인 매개변수에서 사운드 풀의 크기를 지정할 수 있습니다.
* 2018.01.16 (v0.1.14) - 텍스트 처리 시 효과음을 같이 재생합니다.
* 2018.01.15 (v0.1.12) :
* - 전투에서 '아군', '적그룹' 텍스트 코드를 사용하여 말풍선을 띄울 수 있습니다.
* - 플러그인 관리자에서 사용자 커스텀 색상을 정의할 수 있습니다(예 : \색[연한보라])
* - 왼쪽 정렬 패딩 값 변경
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

var Imported = Imported || {};
Imported.RS_MessageSystem = true;

/**
 * RS.MessageSystem.Params 타입 정의
 *
 * @typedef {Object} RS.MessageSystem.Params
 * @property {number} fontSize
 * @property {number} textSpeed
 * @property {number} minFontSize
 * @property {number} maxFontSize
 * @property {number} textStartX
 * @property {number} faceStartOriginX
 * @property {number} numVisibleRows
 * @property {string} gradientColor1
 * @property {string} gradientColor2
 * @property {string} gradientColor3
 * @property {number} nameWindowX
 * @property {number} nameWindowY
 * @property {number} nameWindowWidth
 * @property {number} nameWindowRows
 * @property {number} nameWindowStdPadding
 * @property {string} namePositionTypeAtX
 * @property {number} faceOX
 * @property {number} faceOY
 * @property {boolean} faceSide
 * @property {number} FONT_SIZE
 * @property {number} STD_PADDING
 * @property {number} WIDTH
 * @property {number} HEIGHT
 * @property {number} TabSize
 * @property {number} backOpacity
 * @property {number} translucentOpacity
 * @property {number} defaultOpacity
 * @property {number} contentsOpacity
 * @property {number} defaultOutlineWidth
 * @property {string} defaultOutlineColor
 * @property {boolean} isValidShakingChoice
 * @property {{fonts: {[key: string]: string}}} fonts 시스템에 설치된 폰트 목록
 *
 * @property {boolean} customFont
 * @property {string} customFontName
 * @property {string} customFontSrc
 * @property {string} windowskin
 * @property {string} windowskinForNameWindow
 * @property {string} choiceWindowStyle
 * @property {string} defaultChoicePostion 선택지 위치
 *
 * @property {boolean} isTempSpriteContainerVisibility
 * @property {{}} exTextColors
 *
 * @property {boolean} isPlayTextSound
 * @property {string} pathTextSound
 * @property {string} textSoundEval1
 * @property {string} textSoundEval2
 * @property {number} textSoundInterval 텍스트 사운드 재생 간격
 * @property {number} textSoundPoolSize 텍스트 사운드 풀 크기
 *
 * @property {string} langCode 언어 코드
 * @property {number} lineHeight
 * @property {boolean} fontSmoothingEnabled 폰트 스무딩 사용 여부
 * @property {string[]} preloadWindowskins
 * @property {boolean} isParagraphMinifier
 *
 * @property {Point} windowOffset
 * @property {string} gradientStyle
 * @property {number} faceOpacity
 * @property {number} faceDirection
 * @property {boolean} faceSmooth
 *
 * @property {number} RESET_DEFAULT_STYLE
 *
 * @property {number} windowWidth
 */

/**
 * MessageSystem 타입 정의
 *
 * @typedef {Object} MessageSystem
 * @property {(...args: unknown) => any} PopParameter
 */

/**
 * RS 타입 정의
 *
 * @typedef {Object} RS
 * @property {Object} MessageSystem
 * @property {Object} Window_Name
 */

/**
 * Color 타입 정의
 *
 * @typedef {Object} Color
 * @property {(n: number) => string} getColor
 * @property {string} baseColor
 * @property {() => string} getBaseColor
 * @property {(customColor: string) => string} getUserCustomColor
 * @property {(colorName: string) => string} gmColor
 */

/**
 * @typedef {Object} EventMetadata
 */

/**
 * RS 타입 정의
 *
 * @type {{
 *  MessageSystem: {
 *      Params: RS.MessageSystem.Params;
 *      popParameter: {(...args: unknown) => any};
 *      jsonParse: (str: str) => Object;
 *      Reg: {
 *              Default: Array,
 *              Group: Array,
 *              Korean: Array,
 *              Chinese: Array,
 *              English: Array,
 *              Japanese: Array,
 *              KoreanEscapeCode: RegExp,
 *              ChineseEscapeCode: RegExp,
 *              EnglishEscapeCode: RegExp,
 *              JapaneseEscapeCode: RegExp,
 *              defaultEscapeCode: RegExp
 *       };
 *       TextCodes: {
 *             Korean: string[];
 *             Chinese: string[];
 *             English: string[];
 *             Japanese: string[];
 *             Main: string[];
 *             ENUM: Record<string, number>
 *      };
 *      getTextCode: (idx: number) => string;
 *      getEventComments: (eventId: number, index: number) => EventMetadata;
 *      jsonParse: (str: string) => Object;
 *      getKoreanColor: (colorName: string) => string;
 *      getChineseColor: (colorName: string) => string;
 *      getEnglishColor: (colorName: string) => string;
 *      getJapaneseColor: (colorName: string) => string;
 *      getBrowser: () => {name: string; version: string};
 *
 *  };
 *  Window_Name: (...args: unknown) => void;
 * }}
 */
var RS = RS || {};
RS.MessageSystem = RS.MessageSystem || {};

RS.Window_Name = function () {
  this.initialize.apply(this, arguments);
};

/**
 * @type {Color}
 */
var Color = Color || {};

(function () {
  'use strict';

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_MessageSystem>');
  });

  parameters = parameters.length > 0 && parameters[0].parameters;

  /**
   * @method popParameter
   */
  RS.MessageSystem.popParameter = function () {
    const k = Object.keys(arguments);
    let lastUsed = '';
    while (k.length > 0) {
      lastUsed = arguments[parseInt(k.pop())];
      if (parameters[lastUsed]) return parameters[lastUsed];
    }
    return '';
  };

  /**
   * JSON을 파싱하는 함수 (재귀적)
   */
  RS.MessageSystem.jsonParse = function (str) {
    const retData = JSON.parse(str, function (k, v) {
      try {
        return RS.MessageSystem.jsonParse(v);
      } catch (e) {
        return v;
      }
    });

    return retData;
  };

  RS.MessageSystem.Reg = RS.MessageSystem.Reg || {};
  RS.MessageSystem.Reg.Default = RS.MessageSystem.Reg.Default || [];
  RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Group || [];
  RS.MessageSystem.Reg.Korean = RS.MessageSystem.Reg.Korean || [];
  RS.MessageSystem.Reg.Chinese = RS.MessageSystem.Reg.Chinese || [];
  RS.MessageSystem.Reg.English = RS.MessageSystem.Reg.English || [];
  RS.MessageSystem.Reg.Japanese = RS.MessageSystem.Reg.Japanese || [];
  RS.MessageSystem.TextCodes = RS.MessageSystem.TextCodes || {};

  RS.MessageSystem.Params = RS.MessageSystem.Params || {};

  RS.MessageSystem.Params.fontSize = Number(
    RS.MessageSystem.popParameter('Font Size', '글꼴 크기') || 28
  );
  RS.MessageSystem.Params.textSpeed = Number(
    RS.MessageSystem.popParameter('Text Speed', '기본 텍스트 출력 속도') || 0
  );
  RS.MessageSystem.Params.minFontSize = Number(
    RS.MessageSystem.popParameter('Text Min Size', '폰트 최소 크기') || 24
  );
  RS.MessageSystem.Params.maxFontSize = Number(
    RS.MessageSystem.popParameter('Text Max Size', '폰트 최대 크기') || 96
  );
  RS.MessageSystem.Params.textStartX = Number(
    RS.MessageSystem.popParameter('Text Start X', '텍스트 시작 X')
  );
  RS.MessageSystem.Params.faceStartOriginX = 168;
  RS.MessageSystem.Params.numVisibleRows = Number(
    RS.MessageSystem.popParameter('numVisibleRows', '라인 갯수') || 4
  );
  RS.MessageSystem.Params.gradientColor1 = String(
    RS.MessageSystem.popParameter('gradientColor1', '그레디언트 시작 색상') ||
      '#FFFFFF'
  );
  RS.MessageSystem.Params.gradientColor2 = String(
    RS.MessageSystem.popParameter('gradientColor2', '그레디언트 중간 색상') ||
      '#F29661'
  );
  RS.MessageSystem.Params.gradientColor3 = String(
    RS.MessageSystem.popParameter('gradientColor3', '그레디언트 끝 색상') ||
      '#CC3D3D'
  );

  RS.MessageSystem.Params.nameWindowX = Number(
    RS.MessageSystem.popParameter('Name Window X', '이름 윈도우 X') || 0
  );
  RS.MessageSystem.Params.nameWindowY = Number(
    RS.MessageSystem.popParameter('Name Window Y', '이름 윈도우 Y') || 0
  );
  RS.MessageSystem.Params.nameWindowWidth = 140;
  RS.MessageSystem.Params.nameWindowRows = 1;
  RS.MessageSystem.Params.nameWindowStdPadding = Number(
    RS.MessageSystem.popParameter(
      'Name Window Inner Padding',
      '이름 윈도우 안쪽 여백'
    ) || 18
  );
  RS.MessageSystem.Params.namePositionTypeAtX =
    RS.MessageSystem.popParameter('Name Window Position', '이름 윈도우 위치') ||
    'left';

  RS.MessageSystem.Params.faceOX = Number(
    RS.MessageSystem.popParameter('Big Face OX', '큰 페이스칩 OX') || 0
  );
  RS.MessageSystem.Params.faceOY = Number(
    RS.MessageSystem.popParameter('Big Face OY', '큰 페이스칩 OY') || 0
  );
  RS.MessageSystem.Params.faceSide = Boolean(
    RS.MessageSystem.popParameter(
      'Show Big Face Back',
      '대화창 뒤에 얼굴 표시'
    ) === 'true' || false
  );

  RS.MessageSystem.Params.FONT_SIZE = 28;
  RS.MessageSystem.Params.STD_PADDING = 18;
  RS.MessageSystem.Params.WIDTH =
    RS.MessageSystem.Params.FONT_SIZE * 6 + RS.MessageSystem.Params.STD_PADDING;
  RS.MessageSystem.Params.HEIGHT =
    RS.MessageSystem.Params.FONT_SIZE + RS.MessageSystem.Params.STD_PADDING / 2;

  RS.MessageSystem.Params.TabSize = Number(
    RS.MessageSystem.popParameter('Tab Size', '탭 크기')
  );

  RS.MessageSystem.Params.backOpacity = Number(
    RS.MessageSystem.popParameter('back Opacity', '배경 그림의 투명도')
  );
  RS.MessageSystem.Params.translucentOpacity = Number(
    RS.MessageSystem.popParameter('translucent Opacity', '반투명도')
  );
  RS.MessageSystem.Params.defaultOpacity = Number(
    RS.MessageSystem.popParameter('default Opacity', '기본 투명도')
  );
  RS.MessageSystem.Params.contentsOpacity = Number(
    RS.MessageSystem.popParameter('contents Opacity', '내용의 투명도')
  );
  RS.MessageSystem.Params.defaultOutlineWidth = Number(
    RS.MessageSystem.popParameter('default outline width', '테두리 크기')
  );
  RS.MessageSystem.Params.defaultOutlineColor =
    RS.MessageSystem.popParameter('default outline Color', '테두리 색상') ||
    'white';

  RS.MessageSystem.Params.isValidShakingChoice = false;

  // 시스템에 설치된 폰트
  RS.MessageSystem.Params.fonts = {
    default: 'GameFont',
  };

  (function () {
    const systemFonts = RS.MessageSystem.jsonParse(parameters['systemFont']);
    if (!RS.MessageSystem.Params.fonts) return;
    systemFonts.settings.forEach(i => {
      const params = {};
      params[i.languageCode] = i.fontName;
      Object.assign(RS.MessageSystem.Params.fonts, params);
    });
  })();

  // 시스템에 설치되지 않은 커스텀 폰트
  RS.MessageSystem.Params.customFont = Boolean(
    RS.MessageSystem.popParameter(
      'Using Custom Font',
      '사용자 지정 폰트 사용 여부'
    ) === 'true'
  );
  RS.MessageSystem.Params.customFontName = String(
    RS.MessageSystem.popParameter('Custom Font Name', '사용자 지정 폰트명') ||
      'GameFont'
  );
  RS.MessageSystem.Params.customFontSrc = String(
    RS.MessageSystem.popParameter('Custom Font Src', '사용자 지정 폰트 경로') ||
      'fonts/mplus-1m-regular.ttf'
  );

  RS.MessageSystem.Params.windowskin =
    RS.MessageSystem.popParameter('Default Windowskin', '기본 윈도우스킨') ||
    'Window';
  RS.MessageSystem.Params.windowskinForNameWindow =
    RS.MessageSystem.popParameter('Name Windowskin', '이름 윈도우스킨') ||
    'Window';

  RS.MessageSystem.Params.choiceWindowStyle = String(
    RS.MessageSystem.popParameter('Choice Style', '선택지 스타일') || 'default'
  );
  RS.MessageSystem.Params.defaultChoicePostion =
    parameters['Default Choice Position'] || 'right';

  RS.MessageSystem.Params.isTempSpriteContainerVisibility = false;

  RS.MessageSystem.Params.exTextColors = RS.MessageSystem.jsonParse(
    RS.MessageSystem.popParameter('Text Color', '텍스트 색상')
  );

  RS.MessageSystem.Params.isPlayTextSound = Boolean(
    RS.MessageSystem.popParameter(
      'Text Sound ON/OFF',
      '텍스트 효과음 재생 여부'
    ) === 'true'
  );
  RS.MessageSystem.Params.pathTextSound = String(
    RS.MessageSystem.popParameter('Text Sound', '텍스트 효과음') ||
      'Cursor1.ogg'
  );
  RS.MessageSystem.Params.textSoundEval1 = RS.MessageSystem.jsonParse(
    RS.MessageSystem.popParameter(
      'Text Sound Execution Condition',
      '텍스트 효과음 실행 조건'
    ) || 'Math.randomInt(100) < 45'
  );
  RS.MessageSystem.Params.textSoundEval2 = RS.MessageSystem.jsonParse(
    RS.MessageSystem.popParameter('Text Sound Volume', '텍스트 효과음 볼륨') ||
      '(0.4 + (RS.MessageSystem.randomNormal(0.8)[0])).clamp(0.0, 0.8)'
  );
  RS.MessageSystem.Params.textSoundInterval = parseInt(
    RS.MessageSystem.popParameter(
      'Text Sound Interval',
      '텍스트 사운드 재생 간격'
    )
  );
  RS.MessageSystem.Params.textSoundPoolSize = parseInt(
    RS.MessageSystem.popParameter(
      '텍스트 사운드 풀 크기',
      'Text Sound Pool Size'
    ) || 6
  );

  RS.MessageSystem.Params.langCode =
    RS.MessageSystem.popParameter('언어 코드', 'Language Code') || 'ko';

  RS.MessageSystem.Params.lineHeight = 36;
  RS.MessageSystem.Params.fontSmoothingEnabled = true;

  RS.MessageSystem.Params.preloadWindowskins = JSON.parse(
    parameters['preload windowskin'] || '[]'
  );

  RS.MessageSystem.Params.isParagraphMinifier = Boolean(
    parameters['Paragraph Minifier'] === 'true'
  );

  RS.MessageSystem.Params.windowOffset = new Point(0, 0);

  RS.MessageSystem.Params.gradientStyle = parameters['Gradient Style'];

  RS.MessageSystem.Params.faceOpacity = parseInt(
    parameters['face Opacity'] || 21
  );

  RS.MessageSystem.Params.faceDirection = parseInt(
    parameters['face Direction'] || 0
  );

  RS.MessageSystem.Params.faceSmooth = Boolean(
    parameters['Face Smooth'] === 'true'
  );

  // Constants
  RS.MessageSystem.Params.RESET_DEFAULT_STYLE = -2;

  //============================================================================
  // Lazy Initialize Parameters (느린 초기화)
  //============================================================================

  const alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    alias_Game_Temp_initialize.call(this);
    RS.MessageSystem.Params.windowWidth =
      eval(parameters['Window Width']) || Graphics.boxWidth;
  };

  //============================================================================
  // Multiple Language supports
  //============================================================================

  RS.MessageSystem.Reg.KoreanEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-ퟻ]+[!]*/i;
  RS.MessageSystem.Reg.ChineseEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z一-鼣]+[!]*/i;
  RS.MessageSystem.Reg.EnglishEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+[!]*/i;
  RS.MessageSystem.Reg.JapaneseEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[A-Z\u3040-\u309F\u30A0-\u30FF\u3300-\u33FF\u4E00-\u9FFF\uFF00-\uFFEF]+[!]*/i;
  RS.MessageSystem.Reg.defaultEscapeCode =
    /^[\$\.\|\^!><\{\}\\]|^[A-Z가-ퟻ]+[!]*/i;

  RS.MessageSystem.TextCodes = (function () {
    'use strict';
    const rowData = RS.MessageSystem.popParameter('Text Code', '텍스트 코드');
    const data = JSON.parse(rowData);
    const retData = {};
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

  RS.MessageSystem.getTextCode = function (idx) {
    const langCode = RS.MessageSystem.Params.langCode;
    if (langCode.match(/ko/)) {
      return RS.MessageSystem.TextCodes['Korean'][idx];
    }
    if (langCode.match(/zh/)) {
      return RS.MessageSystem.TextCodes['Chinese'][idx];
    }
    if (langCode.match(/en/)) {
      return RS.MessageSystem.TextCodes['English'][idx];
    }
    if (langCode.match(/ja/)) {
      return RS.MessageSystem.TextCodes['Japanese'][idx];
    }
    return RS.MessageSystem.TextCodes['English'][idx];
  };

  /**
   * Read an event's comments and return the meta data.
   *
   * @memberof RS.MessageSystem
   * @param {number} eventId
   * @param {number} index
   *
   * @return {Object} meta
   */
  RS.MessageSystem.getEventComments = function (eventId, index) {
    const data = {
      note: '',
      meta: {},
    };

    try {
      let list = $gameMap.event(eventId).list();

      // 바로 이전 인덱스에 노트 태그가 있었는 지 확인합니다.
      if (index < 0) {
        index = 0;
      }

      // 부모 이벤트 없이 호출되는 공통 이벤트가 있는 지 확인합니다.
      if (eventId <= 0) {
        const commonEvent = $gameTemp.reservedCommonEvent();

        if (commonEvent) {
          list = commonEvent.list;
          // 공통 이벤트는 한 번 설치된 후 클리어되므로 목록을 두 번 읽을 순 없으므로 예외 처리
          if (!list) {
            return data;
          }
        }
      }

      let param = list[index];

      const FIRST_EVENT_COMMENT = 108;
      const OTHER_EVENT_COMMENTS = 408;
      const EVENT_COMMENTS_RANGE = [FIRST_EVENT_COMMENT, OTHER_EVENT_COMMENTS];
      const LINE_BREAK = '\r\n';

      // 코멘트를 읽어옵니다.
      while (param && EVENT_COMMENTS_RANGE.contains(param.code)) {
        data.note += param.parameters[0] + LINE_BREAK;
        index--;
        param = list[index];
      }

      if (param && param.code === FIRST_EVENT_COMMENT) {
        data.note += param.parameters[0] + LINE_BREAK;

        index--;
        param = list[index];

        while (param.code === OTHER_EVENT_COMMENTS) {
          data.note += param.parameters[0] + LINE_BREAK;
          index--;
          param = list[index];
        }

        if (param.code === FIRST_EVENT_COMMENT) {
          data.note += param.parameters[0] + LINE_BREAK;
        }
      }

      // 노트 태그를 추출합니다 (DataManager.extractMetadata의 변형입니다)
      const re = /<([^<>:]+)(:?)([^>]*)>/g;
      data.meta = {};
      for (;;) {
        const match = re.exec(data.note);
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
    } catch (e) {
      // 리스트를 읽지 못할 경우 try-catch 문에 의해 예외 처리가 됩니다.
      return {
        note: '',
        meta: {},
      };
    }
    return data.meta;
  };

  (function () {
    'use strict';
    const regData = ['Korean', 'English', 'Chinese', 'Japanese'];
    regData.forEach(e => {
      let tcGroup = RS.MessageSystem.TextCodes[e];
      tcGroup = tcGroup.map(e => {
        const isUndefined = e === undefined;

        if (isUndefined) {
          return;
        }

        const data = [];
        let ret = '';

        for (const str of e) {
          const hasAlphabeticCharacters = /[a-zA-Z]/i.test(str);

          if (hasAlphabeticCharacters) {
            data.push(str);
            continue;
          }

          const text = str.charCodeAt().toString(16);
          data.push('\\u' + '{' + text + '}');
        }

        ret = data.join('');

        return ret;
      });
      RS.MessageSystem.Reg[e][0] = undefined;
      RS.MessageSystem.Reg[e][1] = new RegExp(
        `(?:\x1bC|\x1b${tcGroup[1]})\\[(.+?)\\]`,
        'gi'
      ); // 색
      RS.MessageSystem.Reg[e][2] = new RegExp(
        `\x1b${tcGroup[2]}\\[(\\d+)\\]`,
        'gi'
      ); // 속도
      RS.MessageSystem.Reg[e][3] = new RegExp(
        `\x1b${tcGroup[3]}\\[(.+?)\\]`,
        'gi'
      ); // 테두리색
      RS.MessageSystem.Reg[e][4] = new RegExp(
        `\x1b${tcGroup[4]}\\[(\\d+)\\]`,
        'gi'
      ); // 테두리크기
      RS.MessageSystem.Reg[e][5] = new RegExp(
        `\x1b${tcGroup[5]}\\[(\\d+)\\]`,
        'gi'
      ); // 들여쓰기
      RS.MessageSystem.Reg[e][6] = new RegExp(`\x1b${tcGroup[6]}`, 'gi'); // 굵게!
      RS.MessageSystem.Reg[e][7] = new RegExp(`\x1b${tcGroup[7]}`, 'gi'); // 이탤릭!
      RS.MessageSystem.Reg[e][8] = new RegExp(
        `\x1b${tcGroup[8]}\\<(.+?)\\>`,
        'gi'
      ); // 이름
      RS.MessageSystem.Reg[e][9] = new RegExp(
        `\x1b${tcGroup[9]}\\<(.+)\\>`,
        'gi'
      ); // 그레디언트
      RS.MessageSystem.Reg[e][10] = new RegExp(
        `(?:\x1bP|\x1b${tcGroup[10]})\\[(\\d+)\\]`,
        'gi'
      ); // 파티원
      RS.MessageSystem.Reg[e][11] = new RegExp(
        `(?:\x1bN|\x1b${tcGroup[11]})\\[(\\d+)\\]`,
        'gi'
      ); // 주인공
      RS.MessageSystem.Reg[e][12] = new RegExp(
        `(?:\x1bV|\x1b${tcGroup[12]})\\[(\\d+)\\]`,
        'gi'
      ); // 변수
      RS.MessageSystem.Reg[e][13] = new RegExp(
        `(?:\x1bI|\x1b${tcGroup[13]})\\[(\\d+)\\]`,
        'g'
      ); // 아이콘
      RS.MessageSystem.Reg[e][14] = new RegExp(
        `(?:\x1b{|\x1b${tcGroup[14]})`,
        'gi'
      ); // 확대!
      RS.MessageSystem.Reg[e][15] = new RegExp(
        `(?:\x1b}|\x1b${tcGroup[15]})`,
        'gi'
      ); // 축소!
      RS.MessageSystem.Reg[e][16] = new RegExp(
        `(?:\x1bG|\x1b${tcGroup[16]})`,
        'gi'
      ); // 골드
      RS.MessageSystem.Reg[e][17] = new RegExp(
        `\x1b${tcGroup[17]}\\[(.*?)\\]`,
        'gi'
      ); // 말풍선
      RS.MessageSystem.Reg[e][18] = new RegExp(
        `\x1b${tcGroup[18]}\\[(\\d+)\\]`,
        'gi'
      ); // 정렬자
      RS.MessageSystem.Reg[e][19] = new RegExp(
        `\x1b${tcGroup[19]}\\[(\\d+)\\]`,
        'gi'
      ); // 숫자
      RS.MessageSystem.Reg[e][20] = new RegExp(
        `\x1b${tcGroup[20]}\\[(\\d+)\\]`,
        'gi'
      ); // 크기
      RS.MessageSystem.Reg[e][21] = new RegExp(`\x1b${tcGroup[21]}`, 'gi'); // r
      RS.MessageSystem.Reg[e][22] = new RegExp(`\x1b${tcGroup[22]}`, 'gi'); // t
      RS.MessageSystem.Reg[e][23] = new RegExp(
        `\x1b${tcGroup[23]}\\<(.+?)\\>`,
        'gi'
      ); // 효과음
      RS.MessageSystem.Reg[e][24] = new RegExp(
        `\x1b${tcGroup[24]}\\<(.+?)\\>`,
        'gi'
      ); // 그림 표시
      RS.MessageSystem.Reg[e][25] = new RegExp(
        `\x1b${tcGroup[25]}\\[(\\d+)\\]`,
        'gi'
      ); // 그림 제거
      RS.MessageSystem.Reg[e][26] = new RegExp(
        `(?:\x1b${tcGroup[26]})\\[(\\d+)\\]`,
        'g'
      ); // 아이템
      RS.MessageSystem.Reg[e][27] = new RegExp(
        `(?:\x1b${tcGroup[27]})\\[(\\d+)\\]`,
        'g'
      ); // 무기구
      RS.MessageSystem.Reg[e][28] = new RegExp(
        `(?:\x1b${tcGroup[28]})\\[(\\d+)\\]`,
        'g'
      ); // 방어구
      RS.MessageSystem.Reg[e][29] = new RegExp(
        `(?:\x1b${tcGroup[29]})\\[(\\d+)\\]`,
        'g'
      ); // 직업
      RS.MessageSystem.Reg[e][30] = new RegExp(
        `(?:\x1b${tcGroup[30]})\\[(\\d+)\\]`,
        'g'
      ); // 적군
      RS.MessageSystem.Reg[e][31] = new RegExp(
        `(?:\x1b${tcGroup[31]})\\[(\\d+)\\]`,
        'g'
      ); // 상태
      RS.MessageSystem.Reg[e][32] = new RegExp(
        `(?:\x1b${tcGroup[32]})\\[(\\d+)\\]`,
        'g'
      ); // 스킬
      RS.MessageSystem.Reg[e][33] = new RegExp(
        `\x1b${tcGroup[33]}\\<(.*)\\>`,
        'gi'
      ); // 얼굴
      RS.MessageSystem.Reg[e][34] = new RegExp(
        `(?:\x1b${tcGroup[34]})\\[(\\d+)\\]`,
        'gi'
      ); // 아군
      RS.MessageSystem.Reg[e][35] = new RegExp(
        `(?:\x1b${tcGroup[35]})\\[(\\d+)\\]`,
        'gi'
      ); // 적군

      RS.MessageSystem.Reg[e][36] = new RegExp(`\x1b${tcGroup[36]}`, 'gi'); // [.]
      RS.MessageSystem.Reg[e][37] = new RegExp(`\x1b${tcGroup[37]}`, 'gi'); // [|]
      RS.MessageSystem.Reg[e][38] = new RegExp(`\x1b${tcGroup[38]}`, 'gi'); // [!]
      RS.MessageSystem.Reg[e][39] = new RegExp(`\x1b${tcGroup[39]}`, 'gi'); // [<]
      RS.MessageSystem.Reg[e][40] = new RegExp(`\x1b${tcGroup[40]}`, 'gi'); // [>]
      RS.MessageSystem.Reg[e][41] = new RegExp(`\x1b${tcGroup[41]}`, 'gi'); // [\^]

      RS.MessageSystem.Reg[e][42] = new RegExp(`\x1b${tcGroup[42]}`, 'gi'); // AS굵게!
      RS.MessageSystem.Reg[e][43] = new RegExp(`\x1b${tcGroup[43]}`, 'gi'); // AE굵게!
      RS.MessageSystem.Reg[e][44] = new RegExp(`\x1b${tcGroup[44]}`, 'gi'); // AS이탤릭!
      RS.MessageSystem.Reg[e][45] = new RegExp(`\x1b${tcGroup[45]}`, 'gi'); // AE이탤릭!

      RS.MessageSystem.Reg[e][46] = new RegExp(`(?:<${tcGroup[46]}>)`, 'gi'); // LEFT
      RS.MessageSystem.Reg[e][47] = new RegExp(`(?:<${tcGroup[47]}>)`, 'gi'); // CENTER
      RS.MessageSystem.Reg[e][48] = new RegExp(`(?:<${tcGroup[48]}>)`, 'gi'); // RIGHT

      RS.MessageSystem.Reg[e][49] = new RegExp(`(?:<[${tcGroup[49]}]>)`, 'gi'); // B
      RS.MessageSystem.Reg[e][50] = new RegExp(
        `(?:<\/[${tcGroup[50]}]>)`,
        'gi'
      ); // B
      RS.MessageSystem.Reg[e][51] = new RegExp(`(?:<[${tcGroup[51]}]>)`, 'gi'); // I
      RS.MessageSystem.Reg[e][52] = new RegExp(
        `(?:<\/[${tcGroup[52]}]>)`,
        'gi'
      ); // I
      RS.MessageSystem.Reg[e][53] = new RegExp(`\x1b${tcGroup[53]}`, 'gi'); // AEND : ALIGN_CLEAR
      RS.MessageSystem.Reg[e][54] = new RegExp(
        `\x1b${tcGroup[54]}\\[(.*)\\]`,
        'gi'
      ); // \배경색[색상] \HC[색상]
      RS.MessageSystem.Reg[e][55] = new RegExp(
        `\x1b${tcGroup[55]}\\[(\\d+)\\]`,
        'gi'
      ); // \FD
    });
  })();

  const langUtil = {
    /**
     * Check whether the language is Korean.
     * @param {string} langType
     * @returns
     */
    isKorean(langType) {
      return langType.match(/ko/);
    },
    /**
     * Check whether the language is Chinese.
     * @param {string} langType
     * @returns
     */
    isChinese(langType) {
      return langType.match(/zh/);
    },
    /**
     * Check whether the language is English.
     * @param {string} langType
     * @returns
     */
    isEnglish(langType) {
      return langType.match(/en/);
    },
    /**
     * Check whether the language is Japanese.
     * @param {string} langType
     * @returns
     */
    isJapanese(langType) {
      return langType.match(/ja/);
    },
  };

  RS.MessageSystem.initSystem = function () {
    const type = RS.MessageSystem.Params.langCode;

    const isKorean = langUtil.isKorean(type);
    const isChinese = langUtil.isChinese(type);
    const isEnglish = langUtil.isEnglish(type);
    const isJapanese = langUtil.isJapanese(type);

    if (isKorean) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Korean;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.KoreanEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Korean;

      return;
    }

    if (isChinese) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Chinese;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.ChineseEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Chinese;

      return;
    }

    if (isEnglish) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.EnglishEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;

      return;
    }

    if (isJapanese) {
      RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.Japanese;
      RS.MessageSystem.Reg.defaultEscapeCode =
        RS.MessageSystem.Reg.JapaneseEscapeCode;
      RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.Japanese;

      return;
    }

    RS.MessageSystem.Reg.Group = RS.MessageSystem.Reg.English;
    RS.MessageSystem.Reg.defaultEscapeCode =
      RS.MessageSystem.Reg.EnglishEscapeCode;
    RS.MessageSystem.TextCodes.Main = RS.MessageSystem.TextCodes.English;
  };

  //=============================================================================
  // Color
  //=============================================================================

  Color.getColor = function (n) {
    const r = n & 255;
    const g = (n >> 8) & 255;
    const b = (n >> 16) & 255;
    const result = `rgba(${r},${g},${b},1)`;
    return result;
  };

  Color.baseColor = Color.getColor(16777215);

  Color.getBaseColor = () => Color.baseColor;

  Color.getUserCustomColor = function (customColor) {
    'use strict';

    const obj = RS.MessageSystem.Params.exTextColors;
    let ret = customColor;

    const isObject = typeof obj[0] === 'object';
    const hasColorName = obj[0].hasOwnProperty('Color Name');

    if (!isObject) {
      return ret;
    }

    if (!hasColorName) {
      return ret;
    }

    obj.forEach(e => {
      const colorName = e['Color Name'];
      const isFoundColor = colorName === customColor;

      if (isFoundColor) {
        const r = parseInt(e.Red, 10) || 0;
        const g = parseInt(e.Green, 10) || 0;
        const b = parseInt(e.Blue, 10) || 0;
        const a = parseFloat(e.Alpha, 10) || 1.0;

        ret = `rgba(${r},${g},${b},${a})`;
      }
    });

    return ret;
  };

  const KOREAN_COLORS = {
    청록: 'rgba(0,255,255,1)',
    청록색: 'rgba(0,255,255,1)',
    c_aqua: 'rgba(0,255,255,1)',
    검은색: 'rgba(0,0,0,1)',
    검정: 'rgba(0,0,0,1)',
    c_black: 'rgba(0,0,0,1)',
    파란색: 'rgba(0,0,255,1)',
    파랑: 'rgba(0,0,255,1)',
    c_blue: 'rgba(0,0,255,1)',
    짙은회색: 'rgba(64,64,64,1)',
    c_dkgray: 'rgba(64,64,64,1)',
    자홍색: 'rgba(255,0,255,1)',
    자홍: 'rgba(255,0,255,1)',
    c_fuchsia: 'rgba(255,0,255,1)',
    회색: 'rgba(128,128,128,1)',
    c_gray: 'rgba(128,128,128,1)',
    녹색: 'rgba(0,128,0,1)',
    c_green: 'rgba(0,128,0,1)',
    밝은녹색: 'rgba(0,255,0,1)',
    라임: 'rgba(0,255,0,1)',
    c_lime: 'rgba(0,255,0,1)',
    밝은회색: 'rgba(192,192,192,1)',
    c_ltgray: 'rgba(192,192,192,1)',
    밤색: 'rgba(128,0,0,1)',
    마룬: 'rgba(128,0,0,1)',
    c_maroon: 'rgba(128,0,0,1)',
    감청색: 'rgba(0,0,128,1)',
    네이비: 'rgba(0,0,128,1)',
    c_navy: 'rgba(0,0,128,1)',
    황록색: 'rgba(128,128,0,1)',
    올리브: 'rgba(128,128,0,1)',
    c_olive: 'rgba(128,128,0,1)',
    주황색: 'rgba(255,160,64,1)',
    주황: 'rgba(255,160,64,1)',
    오렌지: 'rgba(255,160,64,1)',
    c_orange: 'rgba(255,160,64,1)',
    보라색: 'rgba(128,0,128,1)',
    보라: 'rgba(128,0,128,1)',
    c_purple: 'rgba(128,0,128,1)',
    빨간색: 'rgba(255,0,0,1)',
    빨강: 'rgba(255,0,0,1)',
    c_red: 'rgba(255,0,0,1)',
    은색: 'rgba(192,192,192,1)',
    은: 'rgba(192,192,192,1)',
    c_silver: 'rgba(192,192,192,1)',
    민트색: 'rgba(0,128,128,1)',
    c_teal: 'rgba(0,128,128,1)',
    흰색: 'rgba(255,255,255,1)',
    흰: 'rgba(255,255,255,1)',
    c_white: 'rgba(255,255,255,1)',
    노란색: 'rgba(255,255,0,1)',
    노랑: 'rgba(255,255,0,1)',
    c_yellow: 'rgba(255,255,0,1)',
  };

  const CHINESE_COLOR = {
    水色: 'rgba(0,255,255,1)',
    c_aqua: 'rgba(0,255,255,1)',
    黑色: 'rgba(0,0,0,1)',
    c_black: 'rgba(0,0,0,1)',
    蓝色: 'rgba(0,0,255,1)',
    c_blue: 'rgba(0,0,255,1)',
    深灰色: 'rgba(64,64,64,1)',
    c_dkgray: 'rgba(64,64,64,1)',
    紫红色: 'rgba(255,0,255,1)',
    c_fuchsia: 'rgba(255,0,255,1)',
    灰色: 'rgba(128,128,128,1)',
    c_gray: 'rgba(128,128,128,1)',
    绿色: 'rgba(0,128,0,1)',
    c_green: 'rgba(0,128,0,1)',
    浅绿色: 'rgba(0,255,0,1)',
    c_lime: 'rgba(0,255,0,1)',
    浅灰色: 'rgba(192,192,192,1)',
    c_ltgray: 'rgba(192,192,192,1)',
    栗色: 'rgba(128,0,0,1)',
    c_maroon: 'rgba(128,0,0,1)',
    绀青色: 'rgba(0,0,128,1)',
    c_navy: 'rgba(0,0,128,1)',
    黄绿色: 'rgba(128,128,0,1)',
    c_olive: 'rgba(128,128,0,1)',
    橙黄色: 'rgba(255,160,64,1)',
    c_orange: 'rgba(255,160,64,1)',
    紫色: 'rgba(128,0,128,1)',
    c_purple: 'rgba(128,0,128,1)',
    红色: 'rgba(255,0,0,1)',
    c_red: 'rgba(255,0,0,1)',
    银白色: 'rgba(192,192,192,1)',
    c_silver: 'rgba(192,192,192,1)',
    水鸭色: 'rgba(0,128,128,1)',
    c_teal: 'rgba(0,128,128,1)',
    白色: 'rgba(255,255,255,1)',
    c_white: 'rgba(255,255,255,1)',
    黄色: 'rgba(255,255,0,1)',
    c_yellow: 'rgba(255,255,0,1)',
  };

  const ENGLISH_COLOR = {
    AQUA: 'rgba(0,255,255,1)',
    c_aqua: 'rgba(0,255,255,1)',
    BLACK: 'rgba(0,0,0,1)',
    c_black: 'rgba(0,0,0,1)',
    BLUE: 'rgba(0,0,255,1)',
    c_blue: 'rgba(0,0,255,1)',
    DKGRAY: 'rgba(64,64,64,1)',
    c_dkgray: 'rgba(64,64,64,1)',
    FUCHSIA: 'rgba(255,0,255,1)',
    c_fuchsia: 'rgba(255,0,255,1)',
    GRAY: 'rgba(128,128,128,1)',
    c_gray: 'rgba(128,128,128,1)',
    GREEN: 'rgba(0,128,0,1)',
    c_green: 'rgba(0,128,0,1)',
    LIME: 'rgba(0,255,0,1)',
    c_lime: 'rgba(0,255,0,1)',
    LTGRAY: 'rgba(192,192,192,1)',
    c_ltgray: 'rgba(192,192,192,1)',
    MAROON: 'rgba(128,0,0,1)',
    c_maroon: 'rgba(128,0,0,1)',
    NAVY: 'rgba(0,0,128,1)',
    c_navy: 'rgba(0,0,128,1)',
    OLIVE: 'rgba(128,128,0,1)',
    c_olive: 'rgba(128,128,0,1)',
    ORANGE: 'rgba(255,160,64,1)',
    c_orange: 'rgba(255,160,64,1)',
    PURPLE: 'rgba(128,0,128,1)',
    c_purple: 'rgba(128,0,128,1)',
    RED: 'rgba(255,0,0,1)',
    c_red: 'rgba(255,0,0,1)',
    SILVER: 'rgba(192,192,192,1)',
    c_silver: 'rgba(192,192,192,1)',
    TEAL: 'rgba(0,128,128,1)',
    c_teal: 'rgba(0,128,128,1)',
    WHITE: 'rgba(255,255,255,1)',
    c_white: 'rgba(255,255,255,1)',
    YELLOW: 'rgba(255,255,0,1)',
    c_yellow: 'rgba(255,255,0,1)',
  };

  const JAPANESE_COLOR = {
    水色: 'rgba(0,255,255,1)',
    アクア色: 'rgba(0,255,255,1)',
    c_aqua: 'rgba(0,255,255,1)',
    黑色: 'rgba(0,0,0,1)',
    c_black: 'rgba(0,0,0,1)',
    靑色: 'rgba(0,0,255,1)',
    c_blue: 'rgba(0,0,255,1)',
    ふか灰色: 'rgba(64,64,64,1)',
    c_dkgray: 'rgba(64,64,64,1)',
    紫紅色: 'rgba(255,0,255,1)',
    c_fuchsia: 'rgba(255,0,255,1)',
    灰色: 'rgba(128,128,128,1)',
    c_gray: 'rgba(128,128,128,1)',
    綠色: 'rgba(0,128,0,1)',
    c_green: 'rgba(0,128,0,1)',
    黃綠: 'rgba(0,255,0,1)',
    c_lime: 'rgba(0,255,0,1)',
    鼠色: 'rgba(192,192,192,1)',
    c_ltgray: 'rgba(192,192,192,1)',
    '―色': 'rgba(128,0,0,1)',
    c_maroon: 'rgba(128,0,0,1)',
    群青色: 'rgba(0,0,128,1)',
    ネイビー: 'rgba(0,0,128,1)',
    c_navy: 'rgba(0,0,128,1)',
    黃綠色: 'rgba(128,128,0,1)',
    オリーブ色: 'rgba(128,128,0,1)',
    c_olive: 'rgba(128,128,0,1)',
    橙色: 'rgba(255,160,64,1)',
    オレンジ色: 'rgba(255,160,64,1)',
    c_orange: 'rgba(255,160,64,1)',
    紫色: 'rgba(128,0,128,1)',
    c_purple: 'rgba(128,0,128,1)',
    赤色: 'rgba(255,0,0,1)',
    レッド: 'rgba(255,0,0,1)',
    c_red: 'rgba(255,0,0,1)',
    銀色: 'rgba(192,192,192,1)',
    c_silver: 'rgba(192,192,192,1)',
    ミント色: 'rgba(0,128,128,1)',
    薄荷色: 'rgba(0,128,128,1)',
    c_teal: 'rgba(0,128,128,1)',
    白色: 'rgba(255,255,255,1)',
    c_white: 'rgba(255,255,255,1)',
    黃色: 'rgba(255,255,0,1)',
    c_yellow: 'rgba(255,255,0,1)',
  };

  RS.MessageSystem.getKoreanColor = function (colorName) {
    let color = KOREAN_COLORS[colorName];

    if (color) {
      return color;
    }

    const isBasicColor = ['기본', '기본색', 'c_normal'].contains(colorName);
    if (isBasicColor) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(colorName);
  };

  RS.MessageSystem.getChineseColor = function (colorName) {
    let color = CHINESE_COLOR[colorName];

    if (color) {
      return color;
    }

    const isBasicColor = ['通常', 'c_normal'].contains(colorName);
    if (isBasicColor) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(colorName);
  };

  RS.MessageSystem.getEnglishColor = function (colorName) {
    let color = ENGLISH_COLOR[colorName];

    if (color) {
      return color;
    }

    const isBasicColor = 'c_normal' === colorName;
    if (isBasicColor) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(colorName);
  };

  RS.MessageSystem.getJapaneseColor = function (colorName) {
    let color = JAPANESE_COLOR[colorName];

    if (color) {
      return color;
    }

    const isBasicColor = ['基本色', 'c_normal'].contains(colorName);
    if (isBasicColor) {
      return Color.getBaseColor();
    }

    return Color.getUserCustomColor(colorName);
  };

  RS.MessageSystem.getBrowser = function () {
    /* Refer to https://stackoverflow.com/a/16938481 */
    const ua = navigator.userAgent;

    let tem,
      M =
        ua.match(
          /(opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

      return {
        name: 'IE',
        version: tem[1] || '',
      };
    }

    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/);
      if (tem != null) {
        return {
          name: 'Opera',
          version: tem[1],
        };
      }

      tem = ua.match(/\bEdge\/(\d+)/);
      if (tem != null) {
        return {
          name: 'Edge',
          version: tem[1],
        };
      }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }

    return {
      name: M[0],
      version: M[1],
    };
  };

  Color.gmColor = function (colorName) {
    const langCode = RS.MessageSystem.Params.langCode;
    const {
      getKoreanColor,
      getChineseColor,
      getEnglishColor,
      getJapaneseColor,
    } = RS.MessageSystem;

    if (langUtil.isKorean(langCode)) {
      return getKoreanColor(colorName);
    }

    if (langUtil.isChinese(langCode)) {
      return getChineseColor(colorName);
    }

    if (langUtil.isEnglish(langCode)) {
      return getEnglishColor(colorName);
    }

    if (langUtil.isJapanese(langCode)) {
      return getJapaneseColor(colorName);
    }

    return getEnglishColor(colorName);
  };

  //============================================================================
  // Bitmap
  //============================================================================

  const alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function (width, height) {
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
    const context = this._context;
    const tWidth = this.measureTextWidth(text);
    context.save();
    const gradient = context.createLinearGradient(tx, 0, tx + tWidth, 0);
    gradient.addColorStop('0', color1);
    gradient.addColorStop('0.6', color2);
    gradient.addColorStop('1', color3);
    context.restore();
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
    const context = this._context;
    const width = this.measureTextWidth(text);
    const height = RS.MessageSystem.Params.lineHeight;
    let grd;

    context.save();

    const style = RS.MessageSystem.Params.gradientStyle;

    if (style !== 'radial') {
      if (style.contains('horizontal')) {
        grd = context.createLinearGradient(tx, 0, tx + width, 0);
      } else {
        grd = context.createLinearGradient(tx, 0, 0, ty + height);
      }
    } else {
      const ws = parseFloat(width * 0.5);
      const hs = parseFloat(height * 0.5);
      grd = context.createRadialGradient(ws, hs, 0.0, ws, hs, ws);
    }

    if (style === 'radial') {
      grd.addColorStop('0.0', color1);
      grd.addColorStop('1.0', color2);
    } else if (style.contains('axial')) {
      grd.addColorStop('0.0', color1);
      grd.addColorStop('0.5', color2);
      grd.addColorStop('1.0', color3);
    } else {
      grd.addColorStop('0.0', color1);
      grd.addColorStop('1.0', color2);
    }

    context.restore();
    return grd;
  };

  Bitmap.prototype._makeFontNameText = function () {
    return (
      (this.fontItalic ? 'Italic ' : '') +
      (this.fontBold ? 'bold ' : '') +
      this.fontSize +
      'px ' +
      this.fontFace
    );
  };

  Bitmap.prototype._drawTextBody = function (text, tx, ty, maxWidth) {
    const context = this._context;
    context.save(); // 드로잉 상태 저장
    context.imageSmoothingEnabled =
      RS.MessageSystem.Params.fontSmoothingEnabled;

    if (this.fontGradient) {
      const gradient = this.setGradientStyle(
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
    context.restore(); // 기존 드로잉 상태로 복구
  };

  //============================================================================
  // Game_Message
  //============================================================================

  const alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function () {
    alias_Game_Message_clear.call(this);

    this._waitTime = 0;
    this._gradientText = '';
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

  Game_Message.prototype.setMaxLine = function (n) {
    this._maxLine = n;
    RS.MessageSystem.Params.numVisibleRows = n;
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
    const n = this._align.shift();

    if (n === undefined) {
      return this._lastAlign;
    }
    return n;
  };

  Game_Message.prototype.clearAlignLast = function (n) {
    this._lastAlign = -1;
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
    constructor() {
      this.fontFace = null;
      this.fontSize = null;
      this.fontBold = null;
      this.fontItalic = null;
      this.textColor = null;
      this.outlineColor = null;
      this.outlineWidth = null;
      this.fontGradient = null;
      this.highlightTextColor = null;
      this.textSpeed = null;

      this._isSaved = false;
    }

    /**
     * Save the current settings.
     * @param {Bitmap} contents
     */
    save(contents) {
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

    /**
     * Restore the current settings from the saved settings.
     *
     * @param {Bitmap} contents
     * @returns
     */
    restore(contents) {
      const isBitmap = contents instanceof Bitmap;

      if (!this._isSaved) {
        return;
      }

      if (!isBitmap) {
        return;
      }

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
  // Method
  //============================================================================

  class Method {
    invoke(...args) {}
  }

  //============================================================================
  // Command
  //============================================================================

  class Command {
    constructor() {
      this._method = null;
    }

    setProxy(method) {
      this._method = method;
    }

    before() {}

    /**
     * 데코레이터 구현
     */
    run() {
      this.before();
      if (this._method) this._method.call(this);
      this.after();
    }

    after() {}
  }

  //============================================================================
  // Window_Base
  //============================================================================

  Window_Base.prototype.obtainEscapeCode = function (textState) {
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

  Window_Base.prototype.obtainNameColor = function (textState) {
    var arr = /\[(.+?)\]/gi.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return Color.gmColor(arr[1]);
    } else {
      return this.textColor(0);
    }
  };

  Window_Base.prototype.changeTextColor = function (color) {
    var c = parseInt(color);
    if (c > 0 && c < 32) {
      color = this.textColor(color);
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
      default:
        alias_Window_Base_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  var alias_loadWindowskin = Window_Base.prototype.loadWindowskin;
  Window_Base.prototype.loadWindowskin = function () {
    alias_loadWindowskin.call(this);
    this.windowskin.addLoadListener(
      function () {
        Color.baseColor = this.textColor(0);
      }.bind(this)
    );
  };

  Window_Base.prototype.standardFontFace = function () {
    var langCode =
      RS.MessageSystem.Params.langCode || navigator.language.slice(0, 2);
    var fonts = RS.MessageSystem.Params.fonts[langCode];
    if (Imported.YEP_MessageCore) {
      return $gameSystem.getMessageFontName();
    } else {
      if (fonts) {
        return fonts;
      } else {
        return RS.MessageSystem.Params.fonts.default;
      }
    }
  };

  Window_Base.prototype.standardFontSize = function () {
    return Imported.YEP_MessageCore
      ? $gameSystem.getMessageFontSize()
      : RS.MessageSystem.Params.fontSize;
  };

  var alias_Window_Base_makeFontSmaller = Window_Base.prototype.makeFontSmaller;
  Window_Base.prototype.makeFontSmaller = function () {
    if (Imported.YEP_MessageCore) {
      return alias_Window_Base_makeFontSmaller.call(this);
    }
    if (this.contents.fontSize >= RS.MessageSystem.Params.minFontSize) {
      this.contents.fontSize -= 12;
    }
  };

  var alias_Window_Base_makeFontBigger = Window_Base.prototype.makeFontBigger;
  Window_Base.prototype.makeFontBigger = function () {
    if (Imported.YEP_MessageCore) {
      return alias_Window_Base_makeFontBigger.call(this);
    }
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
    var regGroup = RS.MessageSystem.Reg.Group;
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
    text = alias_Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(
      regGroup[tcGroup.VAR],
      function () {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.VAR],
      function () {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.PLAYER],
      function () {
        return this.actorName(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.PARTY_MEMBER],
      function () {
        return this.partyMemberName(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.NUM],
      function () {
        return arguments[1].toComma();
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.GOLD], TextManager.currencyUnit);
    text = text.replace(
      regGroup[tcGroup.CLASSES],
      function () {
        return $dataClasses[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITEM],
      function () {
        return $dataItems[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.WEAPON],
      function () {
        return $dataWeapons[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ARMOR],
      function () {
        return $dataArmors[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY],
      function () {
        return $dataEnemies[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.STATE],
      function () {
        return $dataStates[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.SKILL],
      function () {
        return $dataSkills[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_LEFT],
      function () {
        return '\x1b' + textCode[tcGroup.ALIGN] + '[0]';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_CENTER],
      function () {
        return '\x1b' + textCode[tcGroup.ALIGN] + '[1]';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN_RIGHT],
      function () {
        return '\x1b' + textCode[tcGroup.ALIGN] + '[2]';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ALIGN],
      function () {
        if (!this._isUsedTextWidthEx) {
          $gameMessage.setAlign(Number(arguments[1] || 0));
        }
        return '';
      }.bind(this)
    );
    text = text.replace(
      /<\/LEFT>|<\/CENTER>|<\/RIGHT>/gi,
      function () {
        return regGroup[tcGroup.ALIGN_CLEAR].source;
      }.bind(this)
    );
    return text;
  };

  Window_Base.prototype.processAlign = function (textState) {
    textState = textState || this._textState;
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
    this.processAlign(textState);
  };

  Window_Base.prototype.calcTextWidth2 = function (text) {
    var tempText = text;
    tempText = tempText.split(/[\r\n]+/);
    var textWidth = 0;

    // Galv's Message Styles Compatibility
    if (Imported.Galv_MessageStyles) {
      var ret = 0;

      if (Imported.Galv_MessageBusts) {
        if ($gameMessage.bustPos == 1) {
          var faceoffset = 0;
        } else {
          var faceoffset = Galv.MB.w;
        }
      } else {
        var faceoffset = Window_Base._faceWidth + 25;
      }

      // Calc X Offset
      var xO = $gameMessage._faceName ? faceoffset : 0;
      xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

      if (this.pTarget != null) {
        this.resetFontSettings();
        ret = this.testWidthEx(tempText[0]);
        this.resetFontSettings();
        textWidth = Math.max(textWidth, ret);
        if (textWidth !== 0) return textWidth;
      }
    }

    this.save();
    this._isUsedTextWidthEx = true;
    textWidth = this.drawTextExForAlign(tempText[0], 0, this.contents.height);
    this._isUsedTextWidthEx = false;
    this.restore();

    return textWidth;
  };

  Window_Base.prototype.newLineX = function () {
    return this.textPadding();
  };

  Window_Base.prototype.setAlignLeft = function (textState) {
    textState.tx = this.calcTextWidth2(textState.text.slice(textState.index));
    textState.x = this.newLineX();
    textState.left = textState.x;
  };

  Window_Base.prototype.setAlignCenter = function (textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth2(textState.text.slice(textState.index));
    textState.x =
      (this.newLineX() + this.contentsWidth() + padding) / 2 - textState.tx / 2;
    textState.left = textState.x;
  };

  Window_Base.prototype.setAlignRight = function (textState) {
    var padding = this.textPadding();
    textState.tx = this.calcTextWidth2(textState.text.slice(textState.index));
    textState.x = this.contentsWidth() - padding - textState.tx;
    textState.left = textState.x;
  };

  Window_Base.prototype.doFirstLineAlign = function (textState) {
    var isValid = !this._isUsedTextWidthEx;
    if (isValid) {
      this.processAlign(textState);
    }
  };

  var origin_Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
  Window_Base.prototype.drawTextEx = function (text, x, y) {
    if (text) {
      this.resetFontSettings();
      var textState = {
        index: 0,
        x: x,
        y: y,
        left: x,
      };
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

  Window_Base.prototype.drawTextExForAlign = function (text, x, y) {
    if (text) {
      var textState = {
        index: 0,
        x: x,
        y: y,
        left: x,
      };
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
      return 'Empty Text';
    }
  };

  Window_Message.prototype.obtainSoundName = function (textState) {
    var arr = /\<(.+?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return String(arr[1]);
    } else {
      return '';
    }
  };

  var alias_Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function (code, textState) {
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
        this.setTextGradient(textState);
        break;
      case textCode[tcGroup.HIGHLIGHT_TEXT_COLOR]:
        this.setHighlightTextColor(this.obtainNameColor(textState));
        break;
      case textCode[tcGroup.TAB]:
        textState.x += Number(
          this.textWidth('A') * RS.MessageSystem.Params.TabSize
        );
        break;
      case textCode[tcGroup.CARRIAGE_RETURN]:
        textState.x = Number(textState.left || 0);
        if (!this._isUsedTextWidthEx) this.startWait(1);
        break;
      case textCode[tcGroup.PLAY_SE]:
        if (!this._isUsedTextWidthEx)
          this.playSe(this.obtainSoundName(textState));
        break;
      case textCode[tcGroup.SHOW_PICTURE]:
        if (this._isUsedTextWidthEx) break;
        this.showPicture(this.obtainSoundName(textState));
        this.startWait(15);
      case textCode[tcGroup.HIDE_PICTURE]:
        if (this._isUsedTextWidthEx) break;
        this.erasePicture(this.obtainEscapeParam(textState));
        this.startWait(15);
      case textCode[tcGroup.FACE]:
        if (this._isUsedTextWidthEx) break;
        var params = this.obtainSoundName(textState).split(',');
        this.redrawFaceImage(textState, params[0], params[1], 0, 0);
        this.startWait(1);
        break;
      default:
        alias_Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  Window_Message.prototype.setTextItalic = function () {
    this.contents.fontItalic = arguments[0];
  };

  Window_Message.prototype.setTextBold = function () {
    this.contents.fontBold = arguments[0];
  };

  Window_Message.prototype.setTextSize = function () {
    this.contents.fontSize = arguments[0].clamp(
      RS.MessageSystem.Params.minFontSize,
      RS.MessageSystem.Params.maxFontSize
    );
  };

  Window_Message.prototype.setStrokeWidth = function () {
    this.contents.outlineWidth = arguments[0];
  };

  Window_Message.prototype.setStrokeColor = function () {
    this.contents.outlineColor = arguments[0];
  };

  Window_Message.prototype.setTextIndent = function (textState) {
    textState.x += this.obtainEscapeParam(textState);
  };

  Window_Message.prototype.setHighlightTextColor = function () {
    var color = arguments[0];
    if (color === 'null' || color === '없음') {
      color = null;
    }
    this.contents.highlightTextColor = color;
  };

  Window_Message.prototype.setTextGradient = function (textState) {
    this.contents.fontGradient = true;
    $gameMessage.setGradientText(this.obtainGradientText(textState));
    var c = $gameMessage.getGradientText();
    var w = this.textWidth(c);
    this.contents.drawText(
      c,
      textState.x,
      textState.y,
      w * 2,
      textState.height
    );
    textState.x += w;
    this.contents.fontGradient = false;
  };

  Window_Message.prototype.playSe = function (seName) {
    var realName = seName.trim();
    var data = {
      name: realName,
      pan: 0,
      pitch: 100,
      volume: ConfigManager.seVolume,
    };
    AudioManager.playSe(data);
  };

  Window_Message.prototype.showPicture = function (param) {
    var param = param.split(',');
    var params = [
      Number(param[0].trim()),
      param[1].trim(),
      Number(param[2].trim()),
      Number(param[3].trim()),
      Number(param[4].trim()),
      100,
      100,
      255,
      0,
    ];
    var ret = true;

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
      $gameScreen.showPicture.apply($gameScreen, params);
      return true;
    }
    return false;
  };

  Window_Message.prototype.erasePicture = function (picId) {
    if (typeof picId === 'number') {
      $gameScreen.erasePicture(picId);
    }
  };

  Window_Message.prototype.resetFontSettings = function () {
    Window_Base.prototype.resetFontSettings.call(this);
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.outlineWidth = RS.MessageSystem.Params.defaultOutlineWidth;
    this.contents.outlineColor = RS.MessageSystem.Params.defaultOutlineColor;
    this.contents.fontGradient = false;
    this.contents.highlightTextColor = null;
    this._windowPauseSignSprite.move(this._width / 2, this._height);
    this._windowPauseSignSprite.scale.y = 1;
    $gameMessage.setWaitTime(RS.MessageSystem.Params.textSpeed);
  };

  Window_Message.prototype.standardFontSize = function () {
    return RS.MessageSystem.Params.fontSize;
  };

  Window_Message.prototype.numVisibleRows = function () {
    return RS.MessageSystem.Params.numVisibleRows;
  };

  Window_Message.prototype.processWordWrap = function (
    textState,
    w,
    width,
    isValid
  ) {
    if (Math.floor(textState.x + w * 2) > width) {
      if (isValid) {
        this.processNewLine(textState);
        textState.index--;
        if (this.needsNewPage(textState)) {
          textState.index--;
          this.startPause();
        }
      }
    }
  };

  var alias_Window_Message_origin_processNormalCharacter =
    Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function (textState) {
    var c = textState.text[textState.index++];

    // 실제 값은 28.25165154 이런 식이므로 오차가 생기게 된다.
    // 무언가 계산을 하려면 이 값을 정수로 변환해서 사용하자.
    var w = this.textWidth(c);

    var width = this.contentsWidth();

    // 일반 메시지 모드에서만 동작 한다.
    var isValid =
      $gameMessage.getBalloon() ===
        RS.MessageSystem.Params.RESET_DEFAULT_STYLE &&
      !this._isUsedTextWidthEx &&
      RS.MessageSystem.Params.isParagraphMinifier;

    // 소수점 자리를 버려야 정확히 계산된다.
    this.processWordWrap(textState, w, width, isValid);

    var contents = this.contents;

    // 얼굴 이미지가 있고 오른쪽인가?
    if ($gameMessage.faceName() !== '') {
      // 내부 컨텐츠의 가로 크기 - 얼굴의 가로 크기
      width = contents.width - Window_Base._faceWidth;
      isValid = RS.MessageSystem.Params.faceDirection === 2;
      this.processWordWrap(textState, w, width, isValid);
    }

    // 배경색
    if (contents.highlightTextColor !== null) {
      var pad = 1.0;
      contents.fillRect(
        textState.x,
        textState.y,
        w + pad,
        textState.height,
        contents.highlightTextColor
      );
    }

    contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
    textState.x += w;

    !this._showFast && this.startWait($gameMessage.getWaitTime() || 0);
  };

  var alias_Window_Message_createSubWindows =
    Window_Message.prototype.createSubWindows;
  Window_Message.prototype.createSubWindows = function () {
    alias_Window_Message_createSubWindows.call(this);
    this._nameWindow = new RS.Window_Name();
    this.updateNameWindow();
  };

  RS.MessageSystem.Params.extraSubWindows = [];

  Window_Message.prototype.subWindows = function () {
    var children = [];
    var includes = [
      '_goldWindow',
      '_choiceWindow',
      '_numberWindow',
      '_itemWindow',
      '_nameWindow',
    ];

    includes = includes.concat(RS.MessageSystem.Params.extraSubWindows);

    for (var i in this) {
      var child = this[i];
      if (child instanceof Window) {
        if (includes.contains(i)) {
          children.push(child);
        }
      }
    }

    return children;
  };

  Window_Message.prototype.updateBigFaceOpacity = function () {
    if (!this._faceContents) {
      return;
    }
    var value = RS.MessageSystem.Params.faceOpacity.clamp(0, 255);
    this._faceContents.opacity = value;
  };

  Window_Message.prototype.fadeInOutFaceContents = function () {
    if (this.isOpening() || this.isClosing()) {
      this._faceContents.scale.y = this._windowSpriteContainer.scale.y;
      this._faceContents.y =
        (this._faceContents.height / 2) * (1 - this._openness / 255);
    }
  };

  var alias_Window_Message_checkToNotClose =
    Window_Message.prototype.checkToNotClose;
  Window_Message.prototype.checkToNotClose = function () {
    this.fadeInOutFaceContents();
    alias_Window_Message_checkToNotClose.call(this);
  };

  Window_Message.prototype.updatePlacement = function () {
    this._positionType = $gameMessage.positionType();

    // 말풍선 모드가 아니라면 X좌표를 화면 중앙에 맞춘다.
    if (
      $gameMessage.getBalloon() === RS.MessageSystem.Params.RESET_DEFAULT_STYLE
    ) {
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
    var minGoldY = this._goldWindow.height;
    this._goldWindow.y =
      this.y > minGoldY ? 0 : Graphics.boxHeight - this._goldWindow.height;

    // 투명도 업데이트
    this.updateDefaultOpacity();
    this.updateContentsOpacity();
    this.updateBigFaceOpacity();

    // 이름 윈도우 업데이트
    if (this._nameWindow.isOpen() || this.areSettingsChanged()) {
      this.updateNameWindow();
    }

    // 얼굴 이미지의 Z-Index 업데이트
    if ($gameMessage.faceName() !== '') {
      var isBigFace = /^Big_/.exec($gameMessage.faceName());
      var backIndex = 2;

      if (RS.MessageSystem.Params.faceSide) {
        this.setFaceZIndex(isBigFace ? 0 : backIndex);
      } else {
        this.setFaceZIndex(backIndex);
      }
    }
  };

  var alias_Window_Message_convertEscapeCharacters =
    Window_Message.prototype.convertEscapeCharacters;
  Window_Message.prototype.convertEscapeCharacters = function (text) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var textCode = RS.MessageSystem.TextCodes.Main;
    var regGroup = RS.MessageSystem.Reg.Group;
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
    text = text.replace(
      regGroup[tcGroup.NAME],
      function () {
        var retName = arguments[1];
        if (retName.endsWith(':left')) {
          retName = retName.replace(':left', '');
          RS.MessageSystem.Params.namePositionTypeAtX = 'left';
        }
        if (retName.endsWith(':auto')) {
          retName = retName.replace(':auto', '');
          RS.MessageSystem.Params.namePositionTypeAtX = 'auto';
        }
        if (retName.endsWith(':center')) {
          retName = retName.replace(':center', '');
          RS.MessageSystem.Params.namePositionTypeAtX = 'center';
        }
        if (retName.endsWith(':opacity0')) {
          retName = retName.replace(':opacity0', '');
          RS.MessageSystem.Params.namePositionTypeAtX = 'opacity0';
        }
        if (retName.endsWith(':defaultOpacity')) {
          retName = retName.replace(':defaultOpacity', '');
          RS.MessageSystem.Params.namePositionTypeAtX = 'defaultOpacity';
        }
        if (retName.endsWith(':right')) {
          retName = retName.replace(':right', '');
          RS.MessageSystem.Params.namePositionTypeAtX = 'right';
        }
        this._nameWindow.drawName(retName);
        return '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.BALLOON],
      function () {
        var value = Number(
          arguments[1] || RS.MessageSystem.Params.RESET_DEFAULT_STYLE
        );
        if ($gameParty.inBattle()) {
          $gameMessage.setBalloon(
            value < 0 ? 'ENEMIES : ' + Math.abs(value) : 'ACTORS : ' + value
          );
        } else {
          $gameMessage.setBalloon(value);
        }
        return '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.FRIENDLY_TROOPS],
      function () {
        var value = Number(arguments[1] || 0);
        $gameMessage.setBalloon('ACTORS : ' + value);
        return '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY_TROOPS],
      function () {
        var value = Number(arguments[1] || 0);
        $gameMessage.setBalloon('ENEMIES : ' + value);
        return '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.FACE_DIRECTION],
      function () {
        var value = Number(arguments[1] || 0);
        if (!this._isUsedTextWidthEx) {
          RS.MessageSystem.Params.faceDirection = value;
        }
        return '';
      }.bind(this)
    );
    return text;
  };

  var alias_Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function () {
    this._nameWindow.close();
    alias_Window_Message_terminateMessage.call(this);
  };

  Window_Message.prototype.setHeight = function (n) {
    this.contents.clear();
    $gameMessage.setMaxLine(n);
    this.height = this.fittingHeight(n);
    this.createContents();
    this.updatePlacement();
    this.updateNameWindow();
  };

  /**
   * 이름 윈도우의 X좌표를 재설정합니다.
   */
  Window_Message.prototype.updateNameWindowPositionXImpl = function () {
    var namePositionTypeAtX = RS.MessageSystem.Params.namePositionTypeAtX;
    var newX = this.x + RS.MessageSystem.Params.nameWindowX;

    switch (namePositionTypeAtX) {
      case 'right':
        newX =
          this.x +
          this.width -
          this._nameWindow.width -
          RS.MessageSystem.Params.nameWindowX;
        break;
      case 'center':
        newX =
          this.x +
          this.width / 2 -
          this._nameWindow.width / 2 -
          RS.MessageSystem.Params.nameWindowX;
        break;
      case 'left':
        newX = this.x + RS.MessageSystem.Params.nameWindowX;
        break;
      case 'opacity0':
        this._nameWindow.opacity = 0;
        break;
      case 'defaultOpacity':
        this._nameWindow.opacity = RS.MessageSystem.Params.defaultOpacity;
        break;
      case 'auto':
        newX = this.x + this.newLineX() + RS.MessageSystem.Params.nameWindowX;
        break;
    }

    this._nameWindow.x = newX;
  };

  /**
   * 메시지 위치와 모드에 따라 이름 윈도우의 높이를 감안하여 메시지 윈도우의 좌표를 재설정합니다.
   */
  Window_Message.prototype.updateNameWindow = function () {
    var self = this;
    var ox = RS.MessageSystem.Params.windowOffset.x;
    var oy = RS.MessageSystem.Params.windowOffset.y;

    var positionType = $gameMessage.positionType();
    var ballonOwnerType = $gameMessage.getBalloon();

    this.updateNameWindowPositionXImpl();

    if (
      positionType === 0 &&
      ballonOwnerType === RS.MessageSystem.Params.RESET_DEFAULT_STYLE
    ) {
      // 메시지 윈도우가 상단일 때
      var topY = 0;
      this._nameWindow.y = topY + oy;
      this.y = this._nameWindow.isOpen()
        ? topY +
          this._nameWindow.height +
          RS.MessageSystem.Params.nameWindowY +
          oy
        : topY + oy;
    } else {
      this._nameWindow.y =
        self.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;
    }
  };

  var alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function () {
    alias_Window_Message_initialize.call(this);
    $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
    this.setHeight(RS.MessageSystem.Params.numVisibleRows);
    this.createFaceContents();
    this.on('removed', this.removeEventHandler, this);
    this.on('onLoadWindowskin', this.onLoadWindowskin, this);
  };

  Window_Message.prototype.removeEventHandler = function () {
    this.off('onLoadWindowskin', this.onLoadWindowskin, this);
  };

  Window_Message.prototype.textColor = function (n) {
    var windowskin = this.windowskin;
    if (!windowskin.isReady()) {
      // Set the default text color if the windowskin is not ready.
      return Color.baseColor;
    }
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return windowskin.getPixel(px, py);
  };

  Window_Message.prototype.onLoadWindowskin = function () {
    Color.baseColor = this.textColor(0);
    this.changeTextColor(Color.baseColor);
  };

  Window_Message.prototype.loadWindowskin = function () {
    var self = this;
    var bitmap = ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);

    // if the windowskin is changed?
    if (bitmap !== this.windowskin) {
      this.windowskin = bitmap;
      this._isDirtyWindowskin = false;
      this.windowskin.addLoadListener(
        function () {
          this._isDirtyWindowskin = true;
        }.bind(this)
      );
      if (!this.contents) {
        this.createContents();
      }
      // Set the default text color if the windowskin didn't load yet.
      this.changeTextColor(Color.baseColor);

      if (!this.windowskin.isReady()) {
        return setTimeout(
          function () {
            self.loadWindowskin();
          }.bind(this),
          10
        );
      }
    }
  };

  var _Window_Message_updateLoading = Window_Message.prototype.updateLoading;
  Window_Message.prototype.updateLoading = function () {
    var ret = true;
    if (this._isDirtyWindowskin) {
      Color.baseColor = this.textColor(0);
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
    var reg = /^Big_/i;
    var faceName = $gameMessage.faceName();
    var faceIndex = $gameMessage.faceIndex();
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

  Window_Message.prototype.drawBigFace = function (faceName, faceIndex) {
    // 얼굴 이미지를 부드럽게 표시해야 하는가?
    if (this._faceBitmap) {
      this._faceBitmap.smooth = RS.MessageSystem.Params.faceSmooth;
    }

    this.loadMessageFace();

    var w = Graphics.boxWidth - this._faceBitmap.width;
    var h = Graphics.boxHeight - this._faceBitmap.height;

    // 페이스칩의 투명한 영역이 실제 얼굴 이미지보다 더 큰 경우가 있다.
    // 따라서 얼굴 이미지의 실제 물리적인 픽셀 위치와는 달라지므로 오프셋 값이 더해져야 한다.
    var offsetX = this.x + RS.MessageSystem.Params.faceOX;
    var offsetY = this.y + RS.MessageSystem.Params.faceOY;

    var faceIndex = $gameMessage.faceIndex();
    var isPlacementToRight = faceIndex > 0;

    this._faceContents.bitmap = this._faceBitmap;
    this._faceContents.scale = new Point(1.0, 1.0);

    if (isPlacementToRight) {
      this._faceContents.x = w - offsetX;
    } else {
      this._faceContents.x = offsetX - this._faceBitmap.width / 2;
    }

    this._faceContents.y = h - offsetY;
    this._faceContents.setFrame(
      0,
      0,
      this._faceBitmap.width,
      this._faceBitmap.height
    );
  };

  Window_Message.prototype.drawFace = function (
    faceName,
    faceIndex,
    x,
    y,
    width,
    height
  ) {
    width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = (faceIndex % 4) * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;

    this._faceContents.bitmap = bitmap;
    this._faceContents.setFrame(sx, sy, sw, sh);

    this._faceContents.x = this.standardPadding() + dx;
    this._faceContents.y = this.standardPadding() + dy;
    this._faceContents.scale = new Point(1.0, 1.0);
  };

  Window_Message.prototype.drawNormalMessageFace = function (
    faceName,
    faceIndex
  ) {
    var fx = 0;
    var fw = Window_Base._faceWidth;
    var padding = this.standardPadding();
    if (RS.MessageSystem.Params.faceDirection === 2) {
      fx =
        ($gameMessage.getBalloon() ===
        RS.MessageSystem.Params.RESET_DEFAULT_STYLE
          ? this.contents.width
          : this._bWidth - padding * 2) - fw;
    }
    this.drawFace(faceName, faceIndex, fx, 0);
  };

  /**
   * @param {String} faceName
   */
  Window_Message.prototype.isValidBigFace = function (faceName) {
    var reg = /^Big_/i;
    return reg.exec(faceName);
  };

  Window_Message.prototype.drawMessageFace = function (faceName, faceIndex) {
    var faceName = $gameMessage.faceName();
    var faceIndex = $gameMessage.faceIndex();

    if (this.isValidBigFace(faceName)) {
      this.drawBigFace(faceName, faceIndex);
    } else {
      this.drawNormalMessageFace(faceName, faceIndex);
    }
  };

  Window_Message.prototype.isAlreadyDrawnFace = function () {
    return this._faceContents.bitmap || this.newLineX() > 0;
  };

  Window_Message.prototype.setFaceZIndex = function (zIndex) {
    zIndex = zIndex || 0;
    if (this.parent && RS.MessageSystem.Params.faceSide)
      this.setChildIndex(this._faceContents, zIndex);
  };

  Window_Message.prototype.clearFaceBitmap = function () {
    if (this._faceContents.bitmap) this._faceContents.bitmap = null;
  };

  Window_Message.prototype.redrawFaceImage = function (
    textState,
    faceName,
    faceIndex,
    x,
    y,
    width,
    height
  ) {
    if (!this._faceContents) return;
    var isValid = this.newLineX() > 0;
    if (!isValid) return;

    faceName = faceName.trim() || '';
    faceIndex = parseInt(faceIndex) || 0;

    $gameMessage._faceName = faceName;
    $gameMessage._faceIndex = faceIndex;

    if (this.isValidBigFace(faceName)) {
      faceIndex = faceIndex.clamp(0, 1);
      this.setFaceZIndex();
      this.drawBigFace(faceName, faceIndex);
    } else {
      width = width || Window_Base._faceWidth;
      height = height || Window_Base._faceHeight;
      this.contents.clearRect(x, y, width, height);
      this.drawNormalMessageFace(faceName, faceIndex);
    }
  };

  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function (textState) {
    this.setFaceZIndex();
    this.clearFaceBitmap();
    this.loadWindowskin();
    this.emit('onLoadWindowskin');
    this.openBalloon($gameMessage.getBalloon());
    alias_Window_Message_newPage.call(this, textState);
  };

  Window_Message.prototype.startMessage = function () {
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters($gameMessage.allText());
    var tempText = this._textState.text.slice(0);
    if (
      $gameMessage.getBalloon() ===
        RS.MessageSystem.Params.RESET_DEFAULT_STYLE &&
      RS.MessageSystem.Params.isParagraphMinifier
    ) {
      this._textState.text = this._textState.text.replace(/[\r\n]+/gm, ' ');
    }
    this.calcBalloonRect(tempText);
    this.newPage(this._textState);

    // width 와 height를 재설정한다.
    this.resizeMessageSystem('no reset');

    this.createContents();
    this.updatePlacement();
    this.updateBackground();
    this.open();
  };

  var alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function () {
    alias_Window_Message_startMessage.call(this);
    this.updateNameWindow();
    this.startWait(1);
  };

  Window_Message.prototype.openBalloon = function (sign) {
    // 말풍선 모드가 아니면 빠져나간다.
    if (sign === RS.MessageSystem.Params.RESET_DEFAULT_STYLE) {
      this.resizeMessageSystem();
      return;
    }

    this.setupOwner(sign);

    // 전투 중일 경우
    if (SceneManager._scene instanceof Scene_Battle) {
      this.updateBalloonPositionInBattle();
    } else {
      this.updateBalloonPosition();
    }
  };

  Window_Message.prototype.windowWidth = function () {
    if (Imported.YEP_MessageCore) {
      return $gameSystem.messageWidth();
    } else {
      return RS.MessageSystem.Params.windowWidth || Graphics.boxWidth;
    }
  };

  Window_Message.prototype.resizeMessageSystem = function () {
    var isResetOwner = !(arguments.length > 0);

    if (!isResetOwner && SceneManager._scene instanceof Scene_Battle) return;

    var n = $gameMessage.positionType();
    var ox = RS.MessageSystem.Params.windowOffset.x;
    var oy = RS.MessageSystem.Params.windowOffset.y;

    var x = Graphics.boxWidth / 2 - this.windowWidth() / 2 + ox;
    var y = (n * (Graphics.boxHeight - this.windowHeight())) / 2 + oy;
    var width = this.windowWidth();
    var height = this.windowHeight();

    if (x !== this.x) this.x = x;
    if (y !== this.y) this.y = y;
    if (width !== this.width || height !== this.height) {
      this.width = width;
      this.height = height;
    }

    if (isResetOwner) {
      $gameMap.setMsgOwner($gamePlayer);
    }
  };

  Window_Message.prototype.calcTextHeight = function (textState, all) {
    'use strict';

    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var regGroup = RS.MessageSystem.Reg.Group;

    var lastFontSize = this.contents.fontSize;
    var textHeight = 0;
    var lines = textState.text.slice(textState.index).split('\n');
    var maxLines = all ? lines.length : 1;

    for (var i = 0; i < maxLines; i++) {
      var maxFontSize = this.contents.fontSize;
      var regExp = new RegExp(
        `\x1b[\{\}]|\x1b${tcGroup.INCREASE}|\x1b${tcGroup.DECREASE}|\x1b${tcGroup.TEXT_SIZE}\[(\d+)\]`,
        'ig'
      );
      for (;;) {
        var array = regExp.exec(lines[i]);
        if (array) {
          if (array[0] === '\x1b{') {
            // \{
            this.makeFontBigger();
          }
          if (array[0] === '\x1b}') {
            // \}
            this.makeFontSmaller();
          }
          if (array[0] === `\x1b${tcGroup.INCREASE}`) {
            // \확대!
            this.makeFontBigger();
          }
          if (array[0] === `\x1b${tcGroup.DECREASE}`) {
            // \축소!
            this.makeFontSmaller();
          }
          if (array[0].contains(`\x1b${tcGroup.TEXT_SIZE}`)) {
            // \크기[size]
            this.setTextSize(array[1]);
          }
          if (Imported.YEP_MessageCore) {
            if (array[0].contains('\x1bfs'.toLowerCase())) {
              this.contents.fontSize = parseInt(array[1]);
            }
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

    if (textHeight < this.lineHeight()) {
      textHeight = this.lineHeight();
    }

    return textHeight;
  };

  Window_Message.prototype.calcBalloonRectHeight = function (text) {
    var tempFontSize = this.contents.fontSize;
    var textState = {
      index: 0,
      x: 0,
      y: 0,
      left: 0,
      height: 0,
    };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    this.setTextSize(tempFontSize);
    return textState.height;
  };

  Window_Message.prototype.lineHeight = function () {
    return RS.MessageSystem.Params.lineHeight;
  };

  var alias_Window_Message_startWait = Window_Message.prototype.startWait;
  Window_Message.prototype.startWait = function (count) {
    if (this._isUsedTextWidthEx) return;
    alias_Window_Message_startWait.call(this, count);
  };

  var alias_Window_Message_startPause = Window_Message.prototype.startPause;
  Window_Message.prototype.startPause = function () {
    if (this._isUsedTextWidthEx) return;
    alias_Window_Message_startPause.call(this);
  };

  var _alias_Window_Gold_open = Window_Gold.prototype.open;
  Window_Gold.prototype.open = function () {
    if (
      SceneManager._scene instanceof Scene_Map ||
      SceneManager._scene instanceof Scene_Battle
    ) {
      if (SceneManager._scene._messageWindow._isUsedTextWidthEx) {
        return;
      }
    }
    _alias_Window_Gold_open.call(this);
  };

  Window_Message.prototype.calcBalloonRect = function (text) {
    var self = this;
    var temp, baseWidth, tempText, height, min, pad, numOfLines;

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
    tempText.forEach(function (i) {
      height += this.calcBalloonRectHeight(i);
    }, this);

    if (height <= 0) {
      // 높이를 구할 수 없었다면,
      height = this.fittingHeight(numOfLines);
    } else {
      // 높이를 구했다면
      height = height + pad;
    }

    var textPadding = this.textPadding();

    // 폭을 계산한다.
    var pw = 0;
    for (var i = 0; i < numOfLines; i++) {
      this._isUsedTextWidthEx = true;
      var x = this.drawTextEx(
        tempText[i],
        0,
        this.contents.height + textPadding
      );
      this._isUsedTextWidthEx = false;
      if (x >= pw) {
        pw = x;
      }
    }

    baseWidth = pw;
    this._bWidth =
      baseWidth + pad + textPadding || RS.MessageSystem.Params.WIDTH;

    // 얼굴 이미지가 설정되어있다면 ?
    if ($gameMessage.faceName() !== '') {
      // 최소 높이를 설정한다.
      min = this.fittingHeight(4);
      // 기존 폭 값에 얼굴 이미지의 폭을 더한다.
      this._bWidth += this.newLineX() + pad;
      if (RS.MessageSystem.Params.faceDirection === 2) {
        this._bWidth += Window_Base._faceWidth;
      }
      // 높이 값이 최소 높이보다 작으면, 최소 높이 값으로 설정한다.
      if (height < min) height = height.clamp(min, height + (min - height));
    }

    var type = RS.MessageSystem.Params.choiceWindowStyle;

    // 선택지가 있고, XP 스타일로 설정했을 때
    if (type === 'RMXP' && $gameMessage.isChoice()) {
      var maxLines = tempText.length;
      var maxChoices = $gameMessage.choices().length;
      var lineHeight = this.lineHeight();
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
  };

  Window_Message.prototype.isActiveInBalloon = function () {
    if (
      $gameMessage.getBalloon() === RS.MessageSystem.Params.RESET_DEFAULT_STYLE
    ) {
      this.updatePlacement();
      return false;
    }
    return true;
  };

  Window_Message.prototype.setBalloonRect = function (data) {
    var ox = RS.MessageSystem.Params.windowOffset.x;
    var oy = RS.MessageSystem.Params.windowOffset.y;
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
  };

  Window_Message.prototype.setBalloonPlacement = function (data) {
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
  };

  Window_Message.prototype.updateSubBalloonElements = function (data) {
    this._windowPauseSignSprite.move(data.tx, data.ty);
    this._windowPauseSignSprite.scale.y = data.scaleY;
    this._nameWindow.y = data.ny;
  };

  Window_Message.prototype.updateBalloonPosition = function () {
    var data = {};

    if (!this.isActiveInBalloon()) return;

    // 말풍선 소유자의 화면 좌표
    var owner = $gameMap.getMsgOwner();

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

    data = this.setBalloonPlacement(Object.create(data));

    if (
      data.dx + RS.MessageSystem.Params.windowOffset.x !== this.x ||
      data.dy + RS.MessageSystem.Params.windowOffset.y !== this.y ||
      this._bWdith !== this.width ||
      this._bHeight !== this.height
    ) {
      // 말풍선 위치 및 크기 설정
      this.setBalloonRect(data);

      // 멈춤 표시 스프라이트 위치 조정
      this.updateSubBalloonElements(data);
    }
  };

  var alias_Window_Message_updateInput = Window_Message.prototype.updateInput;
  Window_Message.prototype.updateInput = function () {
    if (alias_Window_Message_updateInput.call(this)) {
      // 말풍선 모드일 때, 말풍선 창이 캐릭터를 따라다니게 됩니다.
      if (
        this.pause &&
        $gameMessage.getBalloon() !== -2 &&
        SceneManager._scene instanceof Scene_Map
      ) {
        /**
         * @type {Game_Character}
         */
        var owner = $gameMap.getMsgOwner();
        if (owner && owner.isMoving()) {
          this.updateBalloonPosition();
        }

        // 멈춤 표시 스프라이트에는 애니메이션이 있어 몇 프레임 간의 여유를 두고 완전 표시된다.
        // 하지만 ES5 기준, 루비의 Fiber나 유니티의 코루틴처럼 안전하게 재진입할 수 있는 방법이 현재까지 없다.
        // 하지만 1프레임의 여유도 없으므로 투명도를 255로 설정해야 한다.
        this._windowPauseSignSprite.opacity = 255;
      }
      return true;
    }
    return false;
  };

  Window_Message.prototype.getSpriteActors = function (sign) {
    if (!typeof sign === 'number') return;
    if (!$gameParty.members()) return null;
    var max = $gameParty.members().length;
    sign = sign.clamp(0, max);

    return {
      type: 'actor',
      id: sign - 1,
    };
  };

  Window_Message.prototype.getSpriteEnemies = function (sign) {
    if (!typeof sign === 'number') {
      return;
    }
    if (!$gameTroop.members()) return null;
    var max = $gameTroop.members().length;
    sign = sign.clamp(0, max);

    return {
      type: 'enemy',
      id: sign - 1,
    };
  };

  Window_Message.prototype.updateBalloonPositionInBattle = function () {
    if (!$gameParty.inBattle()) {
      // 전투 씬인지 확인
      console.warn('전투가 아닙니다');
      return;
    }
    if (!$gameSystem.isSideView()) {
      // 사이드뷰 전투인지 확인
      console.warn('사이드뷰 전투가 아닙니다.');
      return;
    }

    var data = {};

    // 타겟의 화면 좌표 설정
    var owner = $gameMap.getMsgOwner();
    if (!owner) {
      console.warn('owner 변수가 없습니다');
      return;
    }
    if (!owner.hasOwnProperty('type')) {
      console.warn('type 속성이 없습니다 : ' + owner);
      return;
    }
    if (!owner.hasOwnProperty('id')) {
      console.warn('id 속성이 없습니다 : ' + owner);
      return;
    }

    // 현재 씬이 전투 씬이 아닌 경우를 확인한다.
    var scene = SceneManager._scene;
    if (!scene instanceof Scene_Battle) {
      console.warn('전투 장면이 아닙니다');
      return false;
    }

    var parent;

    // 액터인가?
    if (owner.type === 'actor') {
      parent = scene._spriteset._actorSprites; // 액터 스프라이트 군을 반환
    } else {
      parent = scene._spriteset._enemySprites; // 적 스프라이트 군을 반환
    }

    // 타겟 스프라이트를 id 값으로 찾는다.
    var tempBattlers = [];
    tempBattlers = parent;
    var target = tempBattlers[owner.id];
    if (!target) {
      console.warn('타겟이 없습니다');
      return;
    }

    // 이미 죽어있다면 메시지를 일반 메시지로 표시한다.
    if (
      (owner.type === 'actor' && !target._actor.isAlive()) ||
      (owner.type === 'enemy' && !target._enemy.isAlive())
    ) {
      return;
    }

    data.mx = target.x;
    data.my = target.y;

    data.padY =
      owner.type === 'actor'
        ? target._mainSprite.bitmap.height / 6
        : target.bitmap.height;

    data.tx = this._width / 2;
    data.ty = this._height;

    data.scaleY = 1;
    data.tileHeight = $gameMessage.getBalloonPatternHeight();

    data.dx = data.mx - this._bWidth / 2;
    data.dy = data.my - this._bHeight - data.tileHeight - data.padY;

    data.ny =
      this.y - this._nameWindow.height - RS.MessageSystem.Params.nameWindowY;

    data = this.setBalloonPlacement(Object.create(data));

    // 말풍선 위치 및 크기 설정
    this.setBalloonRect(data);

    // 멈춤 표시 스프라이트 위치 조정
    this.updateSubBalloonElements(data);

    if (this.transform) this.updateTransform();
  };

  Window_Message.prototype.setupOwner = function (sign) {
    var self = this;
    switch (sign) {
      case -1: // 플레이어
        $gameMap.setMsgOwner($gamePlayer);
        break;
      case 0: // 이 이벤트
        $gameMap.setMsgOwner($gameMap.getMsgEvent());
        break;
      default:
        if (SceneManager._scene instanceof Scene_Battle) {
          // 전투 중인가?
          if (/(?:ENEMIES)[ ]*:(.*)/.test(sign)) {
            // 적
            $gameMap.setMsgOwner(self.getSpriteEnemies(parseInt(RegExp.$1)));
          }
          if (/(?:ACTORS)[ ]*:(.*)/.test(sign)) {
            // 아군
            $gameMap.setMsgOwner(self.getSpriteActors(parseInt(RegExp.$1)));
          }
        } else {
          // 맵 이벤트
          $gameMap.setMsgOwner($gameMap.event(sign));
        }
        break;
    }
  };

  var alias_Window_Message_standardFontFace =
    Window_Message.prototype.standardFontFace;
  Window_Message.prototype.standardFontFace = function () {
    if (RS.MessageSystem.Params.customFont) {
      return RS.MessageSystem.Params.customFontName;
    } else {
      return alias_Window_Message_standardFontFace.call(this);
    }
  };

  /**
   * Window 구성 스프라이트 _windowBackSprite의 투명도를 조절합니다.
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

  //============================================================================
  // Game_Interpreter
  //============================================================================

  Game_Interpreter.prototype.processMessageParams = function (eventId, index) {
    var meta = RS.MessageSystem.getEventComments(eventId, index - 1);
    if (meta['윈도우 스킨']) {
      RS.MessageSystem.Params.windowskin =
        meta['윈도우 스킨'].trim() || 'Window';
      ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);
    }
    if (meta['이름 윈도우 스킨']) {
      RS.MessageSystem.Params.windowskinForNameWindow =
        meta['이름 윈도우 스킨'].trim() || 'Window';
      ImageManager.loadSystem(RS.MessageSystem.Params.windowskinForNameWindow);
    }
    if (meta['라인 높이']) {
      RS.MessageSystem.Params.lineHeight = parseInt(meta['라인 높이']);
    }
    if (meta['폰트 크기']) {
      RS.MessageSystem.Params.fontSize = parseInt(meta['폰트 크기']);
    }
    if (meta['라인']) {
      RS.MessageSystem.Params.numVisibleRows = parseInt(meta['라인']);
    }
    if (meta['텍스트 시작 X']) {
      RS.MessageSystem.Params.textStartX = parseInt(meta['텍스트 시작 X']);
    }
    if (meta['큰 페이스칩 OX']) {
      RS.MessageSystem.Params.faceOX = Number(meta['큰 페이스칩 OX']);
    }
    if (meta['큰 페이스칩 OY']) {
      RS.MessageSystem.Params.faceOY = Number(meta['큰 페이스칩 OY']);
    }
    if (meta['대화창 뒤에 얼굴 표시']) {
      RS.MessageSystem.Params.faceSide = Boolean(
        meta['대화창 뒤에 얼굴 표시'] === 'true'
      );
    }
    if (meta['대화창 투명도']) {
      RS.MessageSystem.Params.defaultOpacity = parseInt(meta['대화창 투명도']);
    }
    if (meta['텍스트 효과음 재생 여부']) {
      RS.MessageSystem.Params.isPlayTextSound = Boolean(
        meta['텍스트 효과음 재생 여부'] === 'true'
      );
    }
    if (meta['기본 텍스트 출력 속도']) {
      RS.MessageSystem.Params.textSpeed = Number(meta['기본 텍스트 출력 속도']);
    }
  };

  Game_Interpreter.prototype.isValidMultiLine = function () {
    var codes = [];
    var prevCode = 401;
    var lineCount = 0;
    for (var i = 1; i < 8; i++) {
      var currentCommand = this._list[this._index + i];
      if (currentCommand) {
        var code = currentCommand.code;
        codes.push(code);
        prevCode = code;
        if ([101, 401].contains(code)) {
          lineCount++;
        }
      }
    }
    if (codes.contains(102)) {
      return false;
    } else if (codes.contains(103)) {
      return false;
    } else if ($gameMessage.getMaxLine() <= 4) {
      return false;
    } else if (lineCount <= 4) {
      return false;
    } else if (RS.MessageSystem.Params.choiceWindowStyle == 'RMXP') {
      return false;
    } else {
      return true;
    }
  };

  Game_Interpreter.prototype.command101 = function () {
    if (!$gameMessage.isBusy()) {
      $gameMap.setMsgEvent(this.character(this._eventId > 0 ? 0 : -1));
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);

      this.processMessageParams(this._eventId, this._index);

      if (this.isMultiLine()) {
        this.multiLineAddMessage();
      } else {
        while (this.nextEventCode() === 401) {
          // Text data
          this._index++;
          $gameMessage.add(this.currentCommand().parameters[0]);
        }
      }

      switch (this.nextEventCode()) {
        case 102: // Show Choices
          this._index++;
          this.setupChoices(this.currentCommand().parameters);
          break;
        case 103: // Input Number
          this._index++;
          this.setupNumInput(this.currentCommand().parameters);
          break;
        case 104: // Select Item
          this._index++;
          this.setupItemChoice(this.currentCommand().parameters);
          break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
  };

  Game_Interpreter.prototype.multiLineAddMessage = function () {
    this.initLineHeight();

    while ($gameMessage._texts.length < $gameMessage.getMaxLine()) {
      while (this.nextEventCode() === 401) {
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
        this.addLineHeight();
        if (this._lineHeight >= $gameMessage.getMaxLine()) {
          break;
        }
      }
      if (this.nextEventCode() !== 101) {
        break;
      }
    }

    // 커맨드 코드 401번이 아직 남아있는 상황이라면,
    // 다음 인덱스로 넘겨야 선택지가 제대로 동작한다.
    while (this.nextEventCode() === 401) {
      this._index++;
    }
  };

  Game_Interpreter.prototype.initLineHeight = function () {
    this._lineHeight = 0;
  };

  Game_Interpreter.prototype.isMultiLine = function () {
    return this.isValidMultiLine();
  };

  Game_Interpreter.prototype.addLineHeight = function () {
    this._lineHeight++;
    if (this.nextEventCode() === 101) {
      this._index++;
    }
  };

  //============================================================================
  // RS.Window_Name
  //============================================================================

  RS.Window_Name.prototype = Object.create(Window_Base.prototype);
  RS.Window_Name.prototype.constructor = RS.Window_Name;

  RS.Window_Name.prototype.initialize = function () {
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

  RS.Window_Name.prototype.updateBackground = function () {
    this._background = $gameMessage.background();
    this.setBackgroundType(this._background);
  };

  RS.Window_Name.prototype.windowWidth = function () {
    return RS.MessageSystem.Params.nameWindowWidth;
  };

  RS.Window_Name.prototype.windowHeight = function () {
    return this.fittingHeight(RS.MessageSystem.Params.nameWindowRows);
  };

  RS.Window_Name.prototype.standardPadding = function () {
    return RS.MessageSystem.Params.nameWindowStdPadding;
  };

  RS.Window_Name.prototype.getWidth = function (text) {
    try {
      var tempText = this.textProcessing(text);
      var textPadding = this.textPadding() * 2;
      tempText = tempText.split(/[\r\n]/);
      tempText = tempText.sort(
        function (a, b) {
          return b.length - a.length;
        }.bind(this)
      );
      this.width =
        this.textWidth(tempText[0]) + this.standardPadding() * 2 + textPadding;
    } catch (e) {
      this.width = this.windowWidth + this.standardPadding();
    }
  };

  RS.Window_Name.prototype.textProcessing = function (text) {
    var tcGroup = RS.MessageSystem.TextCodes.ENUM;
    var regGroup = RS.MessageSystem.Reg.Group;
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(
      regGroup[tcGroup.COLOR],
      function (i) {
        this.changeTextColor(Color.gmColor(RegExp.$1));
        return '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.VAR],
      function () {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.VAR],
      function () {
        return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.PLAYER],
      function () {
        return this.actorName(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.PARTY_MEMBER],
      function () {
        return this.partyMemberName(parseInt(arguments[1]));
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.NUM],
      function () {
        return arguments[1].toComma();
      }.bind(this)
    );
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
    text = text.replace(
      regGroup[tcGroup.CLASSES],
      function () {
        return $dataClasses[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ITEM],
      function () {
        return $dataItems[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.WEAPON],
      function () {
        return $dataWeapons[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ARMOR],
      function () {
        return $dataArmors[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.ENEMY],
      function () {
        return $dataEnemies[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.STATE],
      function () {
        return $dataStates[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(
      regGroup[tcGroup.SKILL],
      function () {
        return $dataSkills[parseInt(arguments[1])].name || '';
      }.bind(this)
    );
    text = text.replace(regGroup[tcGroup.FACE], '');
    text = text.replace(regGroup[tcGroup.FRIENDLY_TROOPS], '');
    text = text.replace(regGroup[tcGroup.ENEMY_TROOPS], '');
    return text;
  };

  RS.Window_Name.prototype.refresh = function () {
    this.contents.clear();
    this.createContents();
    // Set the default text color if the windowskin didn't load yet.
    this.changeTextColor(Color.baseColor);
    this.contents.fontSize = RS.MessageSystem.Params.fontSize;
    this.text = this.convertEscapeCharacters(this.text);
    this.text = this.textProcessing(this.text);

    // TO DO : replace this line as to this.drawTextEx(text, x, y)
    this.drawText(this.text, this.textPadding(), 0, this.width, 'left');
  };

  RS.Window_Name.prototype.drawName = function (text) {
    this.text = text;
    this.width = this.windowWidth();
    this.contents.fontSize = RS.MessageSystem.Params.fontSize;
    this.getWidth(this.text);
    this.updateBackground();
    this.open();
  };

  RS.Window_Name.prototype.open = function () {
    this.loadWindowskin();
    this.refresh();
    Window_Base.prototype.open.call(this);
  };

  RS.Window_Name.prototype.close = function () {
    Window_Base.prototype.close.call(this);
  };

  RS.Window_Name.prototype.loadWindowskin = function () {
    var self = this;
    this.windowskin = ImageManager.loadSystem(
      RS.MessageSystem.Params.windowskinForNameWindow
    );
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

  //============================================================================
  // Window_Message (텍스트 정렬)
  //============================================================================

  // Galv's Message Styles Compatibility
  if (Imported.Galv_MessageStyles) {
    Window_Message.prototype.textPadding = function () {
      if (Imported.Galv_MessageBusts) {
        if ($gameMessage.bustPos == 1) {
          var faceoffset = 0;
        } else {
          var faceoffset = Galv.MB.w;
        }
      } else {
        var faceoffset = Window_Base._faceWidth + 25;
      }

      // Calc X Offset
      var xO = $gameMessage._faceName ? faceoffset : 0;
      xO += Galv.Mstyle.padding[1] + Galv.Mstyle.padding[3]; // Added padding

      return xO;
    };
  }

  var alias_Window_Message_startMessage_setAlignCenter =
    Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function () {
    alias_Window_Message_startMessage_setAlignCenter.call(this);
    this.processAlign(this._textState);
  };

  //============================================================================
  // Window_ScrollText (텍스트 정렬)
  //============================================================================

  Window_ScrollText.prototype.refresh = function () {
    var textState = {
      index: 0,
    };
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

  RS.MessageSystem.randomNormal = function (maxValue) {
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
  Window_Message.prototype.setDecryptTextSoundSrc = function (url, cb) {
    var self = this;
    var requestFile = new XMLHttpRequest();
    requestFile.open('GET', url);
    requestFile.responseType = 'arraybuffer';
    requestFile.send();

    requestFile.onload = function () {
      if (this.status < Decrypter._xhrOk) {
        var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
        var _url = Decrypter.createBlobUrl(arrayBuffer);

        cb(_url);
      }
    };
  };

  Window_Message.prototype._createTextSoundPool = function () {
    var self = this;
    var maxPool;

    // 텍스트 사운드 기능이 ON이 아니라면
    if (!RS.MessageSystem.Params.isPlayTextSound) return false;

    // HTML5 Audio 지원 여부 확인
    if (!window.HTMLAudioElement) return false;

    // 이미 생성되어있다면
    if (this._soundPool) return false;

    this._soundPool = {};
    // 풀에 대기 할 사운드 최대 갯수
    this._soundPool.maxPool = RS.MessageSystem.Params.textSoundPoolSize;
    // 가져올 ID
    this._soundPool.currentId = 0;
    // 기본 사운드 엘리먼트 이름
    this._soundPool.defaultSymbol = 'message_system_text_sound';
    // 기본 사운드 경로
    this._soundPool.src =
      './audio/se/' +
      RS.MessageSystem.Params.pathTextSound +
      AudioManager.audioFileExt();

    // 암호화 파일 처리
    var hasEncrypted =
      Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.5';
    if (hasEncrypted && Decrypter.hasEncryptedAudio) {
      var url = Decrypter.extToEncryptExt(this._soundPool.src);
      this.setDecryptTextSoundSrc(url, function (src) {
        if (src) self._soundPool.src = src;
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
    var browserType = RS.MessageSystem.getBrowser();
    if (browserType.name.contains('Chrom')) {
      this._soundPool.isValid = browserType.version >= '32';
    }

    this._soundPool.isValid = typeof Promise === 'function';
    if (this._soundPool.isValid) {
      if (!('then' in Promise.prototype)) this._soundPool.isValid = false;
      if (!('catch' in Promise.prototype)) this._soundPool.isValid = false;
    }
  };

  Window_Message.prototype._addTextSoundToPool = function () {
    // 사운드 풀에 사운드를 넣고 대기 상태로
    var maxPool = this._soundPool.maxPool;

    for (var id = 0; id < maxPool; ++id) {
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
    if (!this._soundPool) return false;

    // 사운드 풀에 해당 속성이 있는가?
    if (!this._soundPool.hasOwnProperty('maxPool')) return false;

    // 텍스트 사운드 기능이 ON이 아니라면
    if (!RS.MessageSystem.Params.isPlayTextSound) return false;

    // HTML5 Audio 지원 여부 확인
    if (!window.HTMLAudioElement) return false;

    return true;
  };

  Window_Message.prototype._removeTextSoundPool = function () {
    // 사운드 풀 유효성 체크
    if (!this.isValidTextSound()) return;

    var maxPool = this._soundPool.maxPool;

    // 사운드 풀에 있는 모든 사운드 엘리먼트를 없앤다.
    for (var id = 0; id < maxPool; ++id) {
      var textSound = document.getElementById(
        this._soundPool.defaultSymbol + id
      );
      document.body.removeChild(textSound);
    }
    // 암호화 사운드 파일이라면
    var hasEncrypted =
      Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.3.5';
    if (hasEncrypted && Decrypter.hasEncryptedAudio) {
      URL.revokeObjectURL(this._soundPool.src);
    }
  };

  Window_Message.prototype._requestTextSound = function () {
    var textSound, currentId;

    if (this._isUsedTextWidthEx) return false;

    // 사운드 풀 유효성 체크
    if (!this.isValidTextSound()) return false;

    // 텍스트 사운드 재생 조건에 실패하면
    if (!eval(RS.MessageSystem.Params.textSoundEval1)) return false;

    // 가져올 ID를 찾는다
    currentId = (this._soundPool.currentId + 1) % this._soundPool.maxPool;
    // ID를 이용하여 사운드 엘리먼트를 가져온다
    textSound = document.getElementById(
      this._soundPool.defaultSymbol + currentId
    );
    // ID 업데이트
    this._soundPool.currentId = currentId;

    if (textSound) {
      // 멈춤
      textSound.pause();
      // 시간과 경로 재설정
      textSound.currentTime = 0;
      textSound.volume = eval(RS.MessageSystem.Params.textSoundEval2).clamp(
        0.0,
        1.0
      );

      // media-load-algorithm - https://html.spec.whatwg.org/multipage/media.html#concept-media-load-algorithm
      textSound.load();

      if (this._soundPool.isValid) {
        var playPromise = textSound.play();
        if (playPromise !== undefined) {
          playPromise.then(function () {}).catch(function (err) {});
        }
      } else {
        textSound.play();
      }
    }

    return true;
  };

  var alias_TextSound_Window_Message_initialize =
    Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function () {
    alias_TextSound_Window_Message_initialize.call(this);
    this._createTextSoundPool();
    this.on('removed', this._removeTextSoundPool, this);
  };

  var alias_TextSound_Window_Message_processNormalCharacter =
    Window_Message.prototype.processNormalCharacter;
  Window_Message.prototype.processNormalCharacter = function (textState) {
    alias_TextSound_Window_Message_processNormalCharacter.call(this, textState);
    if (textState.index % RS.MessageSystem.Params.textSoundInterval === 0)
      this._requestTextSound();
  };

  //============================================================================
  // Window_ChoiceList
  //============================================================================

  var alias_Window_ChoiceList_initialize =
    Window_ChoiceList.prototype.initialize;
  Window_ChoiceList.prototype.initialize = function (messageWindow) {
    alias_Window_ChoiceList_initialize.call(this, messageWindow);
    this._isDirty = false;
  };

  Window_ChoiceList.prototype.initWithStyle = function (type) {
    switch (type) {
      case 'RMXP': // 선택지 스타일을 RPG Maker XP처럼 변경한다.
        this.onChangeStyleToRMXP();
        break;
      default:
        // 선택지 스타일을 RPG Maker MV 기본으로 변경한다.
        this.onChangeStyleToDefault();
    }
  };

  var alias_Window_ChoiceList_updatePlacement =
    Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function () {
    var type = RS.MessageSystem.Params.choiceWindowStyle;
    this.initWithStyle(type);
    this.setWindowStyle();
  };

  Window_ChoiceList.prototype.setWindowStyle = function () {
    this.opacity = RS.MessageSystem.Params.defaultOpacity;
    this.backOpacity = RS.MessageSystem.Params.backOpacity;
    this.contentsOpacity = RS.MessageSystem.Params.contentsOpacity;
    this.translucentOpacity = RS.MessageSystem.Params.translucentOpacity;
  };

  Window_ChoiceList.prototype.updateNormalPlacement = function () {
    // XP 스타일이면 메서드를 종료한다.
    var type = RS.MessageSystem.Params.choiceWindowStyle;
    if (type === 'RMXP') return;

    var messageX = this._messageWindow.x;
    var messageY = this._messageWindow.y;
    var messageWidth = this._messageWindow.width;
    var messageHeight = this._messageWindow.height;
    var nameWindow = this._messageWindow._nameWindow;

    if (Imported['SumRndmDde Translation Engine']) {
      if (!nameWindow) {
        return;
      }
    }

    var nameWindowXPositionType = RS.MessageSystem.Params.namePositionTypeAtX;
    var nameWindowPad = 0;
    var choiceProp = {
      positionType: RS.MessageSystem.Params.defaultChoicePostion,
    };
    var width = this.width;
    var isOpenNameWindow = nameWindow.isOpen();

    if (
      isOpenNameWindow &&
      ['center', 'right'].contains(nameWindowXPositionType)
    ) {
      nameWindowPad = nameWindow.height;
    }

    // 메시지 윈도우가 화면 하단에 위치한다면
    if (messageY >= Graphics.boxHeight / 2) {
      // 이름 윈도우가 가운데 또는 오른쪽에 있으면 패딩 값이 추가된다.
      this.y = messageY - nameWindowPad - this.height;
    } else {
      // 메시지 윈도우가 상단에 있으면 선택지 윈도우는 메시지 윈도우 하단으로 오게 된다.
      var ty = messageY + messageHeight;

      // 선택지 창의 위치가 메시지 윈도우의 위에 있어야 할 떄
      if (ty > Graphics.boxHeight - this.height) {
        this.y = messageY - nameWindowPad - this.height;
      } else {
        this.y = messageY + messageHeight;
      }
    }

    // 선택지 창의 X좌표를 설정한다.
    switch (choiceProp.positionType) {
      default:
      case 'right':
        this.x = messageX + messageWidth - width;
        break;
      case 'middle':
        this.x = messageX + (messageWidth / 2 - width / 2);
        break;
      case 'left':
        this.x = messageX;
        break;
    }

    // 선택지 창만 달랑 있을 때는 중앙에 표시한다.
    if (!$gameMessage.hasText() && $gameMessage.isChoice()) {
      this.x = Graphics.boxWidth / 2 - this.width / 2;
      this.y = Graphics.boxHeight / 2 - this.height / 2;

      if (RS.MessageSystem.Params.isValidShakingChoice) {
        this._shakingTime = performance.now();
        PIXI.ticker.shared.add(this.shakingField, this, 0);
      }
    }
  };

  Window_ChoiceList.prototype.shakingField = function (deltaTime) {
    var sx;

    if (this.width < Graphics.boxWidth) {
      var w = this.width;
      if (w == 0) w = 1;
      sx = Graphics.boxWidth / w;
    } else {
      sx = this.width / Graphics.boxWidth;
    }

    var h = this.height;
    if (h == 0) h == 1;
    var sy = Graphics.boxWidth / h;

    var rotation =
      Math.sqrt(sx * sx + sy * sy) * Math.sin((Math.PI * 2 * deltaTime) / 4);

    this._windowContentsSprite.rotation =
      (Math.PI / 180.0) * (10 - Math.randomInt(20)) * rotation;
    this._windowContentsSprite.anchor.set(1.0, 0.5);
    this._windowContentsSprite.scale.x = 2.0 * Math.cos(deltaTime);
    this._windowContentsSprite.scale.y = 2.0;

    if (performance.now() - this._shakingTime >= 4000) {
      this._windowContentsSprite.rotation = 0;
      this._windowContentsSprite.scale.set(1.0, 1.0);
      this._windowContentsSprite.anchor.set(0.0, 0.0);
      PIXI.ticker.shared.remove(this.shakingField, this, 0);
      this._shakingTime = performance.now();
    }
  };

  var alias_Window_ChoiceList_start = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function () {
    this.windowskin = ImageManager.loadSystem(
      RS.MessageSystem.Params.windowskin
    );
    alias_Window_ChoiceList_start.call(this);
  };

  Window_ChoiceList.prototype.onChangeStyleToRMXP = function () {
    RS.MessageSystem.Params.isTempSpriteContainerVisibility = false;
    this.updateOpacity();
    this.setPlacement();
    this.updateBackground();
  };

  Window_ChoiceList.prototype.onChangeStyleToDefault = function () {
    RS.MessageSystem.Params.isTempSpriteContainerVisibility = true;
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
    var visible = RS.MessageSystem.Params.isTempSpriteContainerVisibility;
    if (this._windowSpriteContainer.visible !== visible) {
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

    if (messageTextState.text) {
      textLength = messageTextState.text.slice(0).split('\n').length;
      // fittingHeight 함수에 패딩 값이 포함되었기 때문에, 패딩 값을 빼준 것.
      currentTextHeight =
        this.fittingHeight(textLength) - this.standardPadding() * 2;
      height = this._messageWindow.height - currentTextHeight;
    } else {
      currentTextHeight = textLength = 0;
      height = this._messageWindow.height;
    }

    this.width = this._messageWindow.width - newLineX;

    // messageHeight는 원래 높이.
    // height는 텍스트가 없는 부분의 높이.
    this.height = height <= 0 ? messageHeight : height;

    this.x = this._messageWindow.x + newLineX;
    this.y = this._messageWindow.y + currentTextHeight;
  };

  Window_ChoiceList.prototype.textWidthEx = function (text) {
    return origin_Window_Base_drawTextEx.call(
      this,
      text,
      0,
      this.contents.height
    );
  };

  //===========================================================================
  // Window_NumberInput
  //===========================================================================

  Window_NumberInput.prototype.updatePlacement = function () {
    var messageY = this._messageWindow.y;
    var spacing = 8;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x =
      this._messageWindow.x + (this._messageWindow.width - this.width) / 2;
    if (messageY >= Graphics.boxHeight / 2) {
      this.y = messageY - this.height - spacing;
    } else {
      this.y = messageY + this._messageWindow.height + spacing;
    }
  };

  //===========================================================================
  // Window_BattleEnemy
  //===========================================================================

  Window_BattleEnemy.prototype.drawItem = function (index) {
    this.resetTextColor();
    var name = this._enemies[index].name();
    var rect = this.itemRectForText(index);
    this.drawTextEx(name, rect.x, rect.y);
  };

  //===========================================================================
  // String
  //===========================================================================

  String.prototype.toArray = function () {
    return this.split('');
  };

  String.prototype.reverse = function () {
    return this.toArray().reverse().join('');
  };

  String.prototype.reversed = function () {
    var r = '';
    for (var i = this.length - 1; i >= 0; i--) {
      r += this[i];
    }
    return r;
  };

  String.prototype.toComma = function () {
    return this.reverse()
      .match(/.{1,3}/g)
      .join(',')
      .reverse();
  };

  //===========================================================================
  // FontFinder
  //===========================================================================

  const FontFinder = new (class {
    /**
     * Browser에 로드되어있는 Font List를 구합니다.
     * @return {Array} fonts
     */
    getBrowserFontList() {
      let fonts = [];
      for (let elem of document.querySelectorAll('*')) {
        let font = getComputedStyle(elem).font;
        let raw = font
          .split(/[,\/]+/)
          .pop()
          .trim();
        if (/\"(.*)\"/i.exec(raw)) {
          fonts.push(RegExp.$1);
        } else if (
          /(?:normal|bold|bolder|lighter|number|initial|inherit)[ ]*(.*)/i.exec(
            raw
          )
        ) {
          fonts.push(RegExp.$1);
        } else if (/\d+px[ ]*(.*)/i.exec(raw)) {
          fonts.push(RegExp.$1);
        }
      }

      fonts = fonts.filter(function (e, i, a) {
        return i == a.indexOf(e);
      });
      // fonts = [...new Set(fonts)].filter(i => i.length > 0);

      return fonts;
    }

    /**
     * fonts 폴더에 있는 ttf 파일을 가져옵니다.
     */
    getLocalFontList() {
      if (!Utils.isNwjs()) return [];
      const os = require('os');
      const fs = require('fs');
      const path = require('path');
      const root = path.dirname(process.mainModule.filename);

      let fonts = fs.readdirSync(path.join(root, 'fonts'), 'utf8');

      fonts = fonts.filter(function (e, i, a) {
        return e.lastIndexOf('.ttf') >= 0;
      }, this);

      return fonts.map(function (e) {
        return path.join(root, 'fonts', e).replace(/\\/g, '/');
      });
    }

    /**
     * TTF 파일에서 폰트명을 취득하는 함수입니다.
     *
     * https://www.codeguru.com/cpp/g-m/gdi/fonthandlinganddetection/article.php/c3659/Retrieving-the-Font-Name-from-a-TTF-File.htm
     * https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6name.html
     *
     * @param {String} filename
     * @return {String}
     */
    getNativeFontFamily(filename) {
      if (!Utils.isNwjs()) return '';

      const fs = require('fs');
      const path = require('path');
      // const font = path.join(path.dirname(process.mainModule.filename), "fonts", filename);
      const font = filename.replace(/\\/g, '/');

      if (!fs.existsSync(font)) {
        throw new Error(`${font} didn't exist!`);
      }

      let buffer = fs.readFileSync(font);

      let offset = 0x00;

      // ! 폰트 테이블을 읽는다.
      // 폰트 테이블 : 0x00 ~ 0x0C
      let fontOffsetTableBuffer = buffer.slice(0, 12);

      // Big Endian으로 읽어야 한다.
      const fontOffsetTable = {
        majorVersion: fontOffsetTableBuffer.readInt16BE(0x00),
        minorVersion: fontOffsetTableBuffer.readInt16BE(0x02),
        numOfTables: fontOffsetTableBuffer.readInt16BE(0x04),
      };

      // ! 트루타입 폰트가 맞는 지 확인한다.
      if (
        fontOffsetTable.majorVersion !== 1 ||
        fontOffsetTable.minorVersion !== 0
      ) {
        throw new Error('This font is not True Type Font');
      }

      offset += 12;

      let isFoundNameTable = false;
      let nameTableOffset = 0x00;
      let nameTableLength = 0x00;

      // ! name 테이블을 찾는다.
      for (let i = 0; i < fontOffsetTable.numOfTables; i++) {
        const tagName = buffer.toString('utf8', offset, offset + 4);
        let dataOffset = offset;
        offset += 16;

        // 이름 테이블을 찾았다.
        if (tagName === 'name') {
          isFoundNameTable = true;
          let checkSum = buffer.readInt32BE(dataOffset + 4);
          nameTableOffset = buffer.readInt32BE(dataOffset + 8);
          nameTableLength = buffer.readInt32BE(dataOffset + 12);
          break;
        }
      }

      if (!isFoundNameTable) {
        throw new Error('이름 테이블을 찾지 못했습니다.');
      }

      offset = nameTableOffset;

      // ! 이름 테이블의 헤더 선언
      const nameHeader = {};
      nameHeader.formatSelector = buffer.readUInt16BE(offset);
      nameHeader.nameRecordCount = buffer.readUInt16BE(offset + 0x02);
      nameHeader.storageOffset = buffer.readUInt16BE(offset + 0x04);
      offset += 0x06;

      const nameTable = [];
      const PLATFORM = {
        UNICODE: 0,
        Macintosh: 1,
        Microsoft: 3,
      };

      for (let i = 0; i < nameHeader.nameRecordCount; i++) {
        let nameRecord = {
          PlatformID: buffer.readUInt16BE(offset),
          EncodingID: buffer.readUInt16BE(offset + 2),
          LanguageID: buffer.readUInt16BE(offset + 4), // 23인 경우, EUC-KR로 인코딩 필요
          NameID: buffer.readUInt16BE(offset + 6),
          StringLength: buffer.readUInt16BE(offset + 8),
          StringOffset: buffer.readUInt16BE(offset + 10),
          Name: '',
        };

        offset += 12;

        // ! Font Family 취득
        if (nameRecord.NameID === 1) {
          const tempOffset = offset;
          offset =
            nameTableOffset +
            nameRecord.StringOffset +
            nameHeader.storageOffset;
          nameRecord.Name = buffer
            .toString('ascii', offset, offset + nameRecord.StringLength)
            .replace(/\u0000/gi, '');
          nameTable.push(nameRecord);
          offset = tempOffset;
        }
      }

      let platformId = PLATFORM.Microsoft;

      switch (process.platform) {
        default:
        case 'darwin':
          platformId = PLATFORM.Macintosh;
          break;
        case 'win32':
          platformId = PLATFORM.Microsoft;
          break;
      }

      // $eucKr = [System.Text.Encoding]::GetEncoding(51949);
      // $bytes = [byte[]]@(0xB3, 0xAA, 0xB4, 0xAE, 0xB0, 0xED, 0xB5, 0xF1)
      // $eucKr.GetString($bytes)
      // => 나눔고딕

      // 한글의 경우,
      // UTF16-BE에서 EUC-KR로 문자열 변환을 해야 하며 iconv-lite가 필요하다.
      // (루비나 파이썬의 경우, EUC-KR을 지원한다)
      const fontFamiles = nameTable.filter(function (i) {
        return i.PlatformID === platformId;
      });

      if (Array.isArray(fontFamiles)) {
        if (fontFamiles.length > 0) {
          console.log(fontFamiles[0].Name);
          return fontFamiles[0].Name;
        } else {
          return '';
        }
      } else {
        return '';
      }
    }

    /**
     *
     * @param {String} filename
     */
    getFontFamily(filename) {
      return new Promise(function (resolve, reject) {
        if (!Utils.isNwjs()) {
          reject('This function will be going to work only in PC platform');
        }

        const fs = require('fs');
        const path = require('path');
        const cp = require('child_process');
        const font = filename;

        if (!fs.existsSync(font)) {
          reject(`${font} didn't exist!`);
        }

        if (process.platform.contains('win')) {
          const powershellProcess = cp.exec(
            `powershell -Command "Add-Type -AssemblyName PresentationCore; (New-Object -TypeName Windows.Media.GlyphTypeface -ArgumentList '${font}').Win32FamilyNames.Values"`,
            {
              shell: true,
              encoding: 'utf8',
            },
            function (err, stdout, stderr) {
              let fontFamily = stdout;
              if (fontFamily) {
                const fontFamilyTrim = fontFamily.trim().replace(/[\r\n]+/, '');
                console.log(fontFamilyTrim);
                resolve(fontFamilyTrim);
              } else {
                reject("Can't not get font name"); // 폰트를 구하지 못했습니다.
              }
            }
          );

          powershellProcess.on('beforeExit', function () {
            powershellProcess.kill();
          });
        } else {
          reject(
            'This function will be going to work in Windows platform only'
          );
        }
      });
    }

    /**
     *
     * @example
     * Font.getSystemFontList().then(fontList => {
     *  if(fontList.includes("나눔고딕")) {
     *    console.log("나눔고딕 폰트가 설치되어 있습니다");
     *  }
     * }).catch(err => console.warn(err));
     */
    getSystemFontList() {
      return new Promise(function (resolve, reject) {
        if (!Utils.isNwjs()) {
          reject('This function will be going to work only in PC platform');
        }
        chrome.fontSettings.getFontList(function (e) {
          resolve(
            JSON.stringify(
              e.map(function (i) {
                return i.fontId;
              })
            )
          );
        });
      });
    }
  })();

  window.FontFinder = FontFinder;

  //===========================================================================
  // Scene_Boot
  //===========================================================================

  var alias_Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
  Scene_Boot.loadSystemImages = function () {
    alias_Scene_Boot_loadSystemImages.call(this);

    // 커스텀 폰트 로드 처리
    if (RS.MessageSystem.Params.customFont) {
      Graphics.loadFont(
        RS.MessageSystem.Params.customFontName,
        RS.MessageSystem.Params.customFontSrc
      );
    }

    var langCode =
      RS.MessageSystem.Params.langCode || navigator.language.slice(0, 2);
    var fonts = RS.MessageSystem.Params.fonts[langCode];
    var retFonts = fonts ? fonts : RS.MessageSystem.Params.fonts.default;

    // Loads ttf file automatically from there is a Fonts folder.
    var browser = RS.MessageSystem.getBrowser();
    var isValid = false;

    if (browser.name === 'Chrome' && browser.version >= 55) {
      isValid = true;
    } else if (browser.name === 'Firefox' && browser.version >= 52) {
      isValid = true;
    } else {
      isValid = false;
    }

    if (Utils.isNwjs() && isValid) {
      try {
        const os = require('os');
        let isValidPowershell = false;

        if (
          process.platform === 'win32' &&
          /(\d+\.\d+).\d+/i.exec(os.release())
        ) {
          const version = parseFloat(RegExp.$1);

          // Windows 7 이상인가?
          if (version >= '6.1') {
            isValidPowershell = true;
          }
        }

        const fontList = FontFinder.getLocalFontList();
        eval(
          '        fontList.forEach(async fontFile => { const fontFamily = (isValidPowershell) ? await FontFinder.getFontFamily(fontFile) : FontFinder.getNativeFontFamily(fontFile); Graphics.loadFont(fontFamily, fontFile); });'
        );
      } catch (e) {
        console.warn(e);
      }
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
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') {
    var alias_Game_Interpreter_requestImages = Game_Interpreter.requestImages;
    Game_Interpreter.requestImages = function (list, commonList) {
      alias_Game_Interpreter_requestImages.call(this, list, commonList);
      if (!list) return;
      list.forEach(function (command, index) {
        // Read event list
        var params = command.parameters;
        switch (command.code) {
          case 401: // Show Message
            var tcGroup = RS.MessageSystem.TextCodes.ENUM;
            var regGroup = RS.MessageSystem.Reg.Group;
            var text = params[0].slice(0);
            text = text.replace(/\\/g, '\x1b');
            var data = text.match(regGroup[tcGroup.FACE]);
            if (data) {
              data.forEach(function (e, i, a) {
                var faceName = RegExp.$1.split(',')[0].trim();
                ImageManager.loadFace(faceName);
                return '';
              });
            }
            data = text.match(regGroup[tcGroup.CHANGE_WINDOWSKIN]);
            if (data) {
              var windowskinName = RegExp.$1.trim();
              ImageManager.loadSystem(windowskinName);
            }
            break;
        }
      });
    };
  }

  var _Scene_Boot_loadSystemWindowImage =
    Scene_Boot.prototype.loadSystemWindowImage;
  Scene_Boot.prototype.loadSystemWindowImage = function () {
    _Scene_Boot_loadSystemWindowImage.call(this);
    RS.MessageSystem.Params.preloadWindowskins.forEach(function (i) {
      if (typeof i === 'string') {
        ImageManager.reserveSystem(i);
      }
    });
  };

  var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    alias_pluginCommand.call(this, command, args);

    if (command === 'Message' || command === '메시지') {
      switch (args[0]) {
        //-------------------------------------------------------------------------
        case 'textSpeed':
        case '텍스트속도':
          RS.MessageSystem.Params.textSpeed = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'fontSize':
        case '폰트크기':
          RS.MessageSystem.Params.fontSize = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'offsetX':
        case '오프셋X':
          RS.MessageSystem.Params.windowOffset.x = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'offsetY':
        case '오프셋Y':
          RS.MessageSystem.Params.windowOffset.y = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'minFontSize':
        case '폰트최소크기':
          RS.MessageSystem.Params.minFontSize = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'maxFontSize':
        case '폰트최대크기':
          RS.MessageSystem.Params.maxFontSize = Number(args[1] || 96);
          break;
        //-------------------------------------------------------------------------
        case 'gradient':
        case '그레디언트':
          RS.MessageSystem.Params.gradientColor1 =
            args[1] || Color.gmColor('기본색');
          RS.MessageSystem.Params.gradientColor2 =
            args[2] || Color.gmColor('기본색');
          RS.MessageSystem.Params.gradientColor3 =
            args[3] || Color.gmColor('기본색');
          break;
        //-------------------------------------------------------------------------
        case 'line':
        case '라인':
          $gameTemp.setMaxLine(Number(args[1] || 4));
          break;
        //-------------------------------------------------------------------------
        case 'textStartX':
        case '시작위치':
          RS.MessageSystem.Params.textStartX = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'name':
        case '이름윈도우':
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
            case 'windowskin':
            case '윈도우스킨':
              RS.MessageSystem.Params.windowskinForNameWindow = args
                .slice(2, args.length)
                .join('');
              ImageManager.loadSystem(
                RS.MessageSystem.Params.windowskinForNameWindow
              );
              break;
          }
          break;
        //-------------------------------------------------------------------------
        case 'faceOX':
        case '큰페이스칩X':
          RS.MessageSystem.Params.faceOX = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'faceOY':
        case '큰페이스칩Y':
          RS.MessageSystem.Params.faceOY = Number(args[1]);
          break;
        //-------------------------------------------------------------------------
        case 'faceZ':
        case '큰페이스칩Z':
          if (Number(args[1] || 0) === -1) {
            RS.MessageSystem.Params.faceSide = true;
          } else {
            RS.MessageSystem.Params.faceSide = false;
          }
          break;
        //-------------------------------------------------------------------------
        case 'facePos':
        case '페이스칩위치':
          RS.MessageSystem.Params.faceDirection = parseInt(args[1] || 0);
          break;
        case 'faceSmooth':
        case '페이스칩부드럽게':
          RS.MessageSystem.Params.faceSmooth = args[1] === 'true';
          break;
        //-------------------------------------------------------------------------
        case 'setTabSize':
        case '탭크기':
          RS.MessageSystem.Params.TabSize = Number(args[1]);
          break;
        case 'backgroundOpacity':
        case '배경투명도':
          RS.MessageSystem.Params.defaultOpacity = Number(args[1]);
          break;
        case 'contentsOpacity':
        case '컨텐츠투명도':
          RS.MessageSystem.Params.contentsOpacity = Number(args[1]);
          break;
        case 'windowskin':
        case '윈도우스킨':
          RS.MessageSystem.Params.windowskin = args
            .slice(1, args.length)
            .join('');
          ImageManager.loadSystem(RS.MessageSystem.Params.windowskin);
          break;
        case 'minifier':
        case '문단최소화':
          RS.MessageSystem.Params.isParagraphMinifier = Boolean(
            args[1] === 'true'
          );
          break;
        // End main switch
      }
      // End if
    }
    // End Function
  };

  RS.MessageSystem.initSystem();
})();
