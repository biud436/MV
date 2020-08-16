//================================================================
// RS_MessageSystemMZ.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_MessageSystemMZ>
 * @author biud436
 * @base PluginCommonBase
 * @url biud436.tistory.com
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_MessageSystemMZ = true;

var RS = RS || {};
RS.MessageSystemMZ = RS.MessageSystemMZ || {};

($ => {

    "use strict";

    return;

    const pluginParams = plugins.filter(i => {
        return i.description.contains('<RS_MessageSystemMZ>');
    });

    const pluginName = (pluginParams.length > 0) && pluginParams[0].name;
    const parameters = (pluginParams.length > 0) && pluginParams[0].parameters;

    RS.MessageSystemMZ = new class {

        constructor() {
            this.initWithParameters();
        }

        initWithParameters() {
            this.Reg = new MessageReg();
            this.Params = new MessageParams();
            this.TextCodes = new MessageTextCodes();
        }

        /**
         * @method popParameter
         */
        popParameter(...args) {
            var k = Object.keys(args);
            var lastUsed = "";
            while (k.length > 0) {
                lastUsed = args[parseInt(k.pop())];
                if (parameters[lastUsed]) return parameters[lastUsed];
            }
            return "";
        }      

        jsonParse(str) {

            const retData = JSON.parse(str, (k, v) => {
                try {
                    return this.jsonParse(v);
                } catch (e) {
                    return v;
                }
            });
    
            return retData;
    
        }

        getTextCode(idx) {
            var langCode = this.Params.langCode;
            if (langCode.match(/ko/)) {
                return this.TextCodes['Korean'][idx];
            }
            if (langCode.match(/zh/)) {
                return this.TextCodes['Chinese'][idx];
            }
            if (langCode.match(/en/)) {
                return this.TextCodes['English'][idx];
            }
            if (langCode.match(/ja/)) {
                return this.TextCodes['Japanese'][idx];
            }
            return this.TextCodes['English'][idx];
        }
    
        /**
         * 노트 태그를 읽습니다.
         * @memberof RS.MessageSystem
         * @param {Number} eventId
         * @return {Object} meta
         */
        getEventComments(eventId, index) {
            var data = {
                note: "",
                meta: {}
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
                    note: "",
                    meta: {}
                };
            }
            return data.meta;
        };        

    }

    class MessageReg {
        constructor() {     
            this.initWithDefaultParameters();
            this.initWithEscapeCode();  
        }

        initWithDefaultParameters() {
            this.Default = [];
            this.Group = [];
            this.Korean = [];
            this.Chinese = [];
            this.English = [];
            this.Japanese = [];  
        }

        initWithEscapeCode() {
            this.KoreanEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z가-ퟻ]+[!]*/i;
            this.ChineseEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[a-zA-Z一-鼣]+[!]*/i;
            this.EnglishEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+[!]*/i;
            this.JapaneseEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z\u3040-\u309F\u30A0-\u30FF\u3300-\u33FF\u4E00-\u9FFF\uFF00-\uFFEF]+[!]*/i;
            this.defaultEscapeCode = /^[\$\.\|\^!><\{\}\\]|^[A-Z가-ퟻ]+[!]*/i;   
        }
    }


    class MessageParams {

        constructor() {

            this.fontSize = Number(parameters['Font Size']);
            this.textSpeed = Number(parameters['Text Speed'] || 0);
            this.minFontSize = Number(parameters['Text Min Size'] || 24);
            this.maxFontSize = Number(parameters['Text Max Size'] || 96);
            this.textStartX = Number(parameters['Text Start X']);
            this.faceStartOriginX = 168;

            this.numVisibleRows = Number(parameters['numVisibleRows'] || 4);
            this.gradientColor1 = String(parameters['gradientColor1'] || '#FFFFFF');
            this.gradientColor2 = String(parameters['gradientColor2'] || '#F29661');
            this.gradientColor3 = String(parameters['gradientColor3'] || '#CC3D3D');

            this.faceOX = Number(parameters['Big Face OX'] || 0);
            this.faceOY = Number(parameters['Big Face OY'] || 0);
            this.faceSide = Boolean(parameters['Show Big Face Back'] === 'true' || false);

            this.FONT_SIZE = 28;
            this.STD_PADDING = 18;
            this.WIDTH = (this.FONT_SIZE * 6) + this.STD_PADDING;
            this.HEIGHT = this.FONT_SIZE + (this.STD_PADDING / 2);

            this.TabSize = Number(parameters['Tab Size']);

            this.backOpacity = Number(parameters['back Opacity']);
            this.translucentOpacity = Number(parameters['translucent Opacity']);
            this.defaultOpacity = Number(parameters['default Opacity']);
            this.contentsOpacity = Number(parameters['contents Opacity']);
            this.defaultOutlineWidth = Number(parameters['default outline width']);
            this.defaultOutlineColor = parameters['default outline Color'] || 'white';
        
            this.isValidShakingChoice = false;   
            
            this.fonts = {
                'default': 'GameFont'
            };

            this.customFont = Boolean(parameters['Using Custom Font'] === 'true');
            this.customFontName = String(parameters['Custom Font Name'] || 'GameFont');
            this.customFontSrc = String(parameters['Custom Font Src'] || 'fonts/mplus-1m-regular.ttf');
            this.windowskin = parameters['Default Windowskin'] || 'Window';
            this.windowskinForNameWindow = parameters['Name Windowskin'] || 'Window';
            this.choiceWindowStyle = String(parameters['Choice Style'] || 'default');
            this.defaultChoicePostion = parameters["Default Choice Position"] || "right";
            this.isTempSpriteContainerVisibility = false;
            this.exTextColors = this.jsonParse(parameters["Text Color"]);
            this.isPlayTextSound = Boolean(parameters['Text Sound ON/OFF'] === "true");
            this.pathTextSound = String(parameters['Text Sound'] || "Cursor1.ogg");
            this.textSoundEval1 = this.jsonParse(parameters["Text Sound Execution Condition"] || "Math.randomInt(100) < 45");
            this.textSoundEval2 = this.jsonParse(parameters["Text Sound Volume"] || "(0.4 + (RS.MessageSystemMZ.randomNormal(0.8)[0])).clamp(0.0, 0.8)");
            this.textSoundInterval = parseInt(parameters["Text Sound Interval"]);
            this.textSoundPoolSize = parseInt(parameters['텍스트 사운드 풀 크기'] || 6);
            this.langCode = parameters['언어 코드'] || "ko";
            this.lineHeight = 36;
            this.fontSmoothingEnabled = true;
            this.preloadWindowskins = JSON.parse(parameters["preload windowskin"] || "[]");
            this.isParagraphMinifier = Boolean(parameters["Paragraph Minifier"] === "true");
            this.windowOffset = new Point(0, 0);
            this.gradientStyle = parameters["Gradient Style"];
            this.faceOpacity = parseInt(parameters["face Opacity"] || 21);
            this.faceDirection = parseInt(parameters["face Direction"] || 0);            

        }

        jsonParse(str) {

            const retData = JSON.parse(str, (k, v) => {
                try {
                    return this.jsonParse(v);
                } catch (e) {
                    return v;
                }
            });
    
            return retData;
    
        }

        readSystemFonts() {
            const systemFonts = RS.MessageSystemMZ.jsonParse(parameters["systemFont"]);
            if (!this.fonts) return;
            systemFonts.settings.forEach(function (i) {
                let params = {};
                params[i.languageCode] = i.fontName;
                Object.assign(this.fonts, params);
            }, this);
        }

    }    

    class MessageTextCodes {
        constructor() {
            this.initWithParameters();
            this.Main = [];
            this.ENUM = {
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
        }

        initWithParameters() {
            const rowData = parameters['Text Code'];
            const data = JSON.parse(rowData);
            this.Korean = [undefined].concat(JSON.parse(data.Korean));
            this.Chinese = [undefined].concat(JSON.parse(data.Chinese));
            this.English = [undefined].concat(JSON.parse(data.English));
            this.Japanese = [undefined].concat(JSON.parse(data.Japanese));            
        }

    }

    //============================================================================
    // Lazy Initialize Parameters (느린 초기화)
    //============================================================================

    const alias_Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        alias_Game_Temp_initialize.call(this);
        RS.MessageSystemMZ.Params.windowWidth = eval(parameters["Window Width"]) || Graphics.boxWidth;
    };

    //============================================================================
    // Multiple Language supports
    //============================================================================

    (function () {
        'use strict';
        var regData = ["Korean", "English", "Chinese", "Japanese"];
        regData.forEach(function (e, i, a) {
            var tcGroup = RS.MessageSystemMZ.TextCodes[e];
            tcGroup = tcGroup.map(function (e, i, a) {
                if (e === undefined) return;
                var data = [];
                var ret = "";
                for (var str of e) {
                    if (/[a-zA-Z]/i) {
                        data.push(str);
                        continue;
                    }
                    var text = str.charCodeAt().toString(16);
                    data.push('\\u' + "{" + text + "}");
                }
                ret = data.join("");
                return ret;
            }, this);
            RS.MessageSystemMZ.Reg[e][0] = undefined;
            RS.MessageSystemMZ.Reg[e][1] = new RegExp(`(?:\x1bC|\x1b${tcGroup[1]})\\[(.+?)\\]`, 'gi'); // 색
            RS.MessageSystemMZ.Reg[e][2] = new RegExp(`\x1b${tcGroup[2]}\\[(\\d+)\\]`, 'gi'); // 속도
            RS.MessageSystemMZ.Reg[e][3] = new RegExp(`\x1b${tcGroup[3]}\\[(.+?)\\]`, 'gi'); // 테두리색
            RS.MessageSystemMZ.Reg[e][4] = new RegExp(`\x1b${tcGroup[4]}\\[(\\d+)\\]`, 'gi'); // 테두리크기
            RS.MessageSystemMZ.Reg[e][5] = new RegExp(`\x1b${tcGroup[5]}\\[(\\d+)\\]`, 'gi'); // 들여쓰기
            RS.MessageSystemMZ.Reg[e][6] = new RegExp(`\x1b${tcGroup[6]}`, 'gi'); // 굵게!
            RS.MessageSystemMZ.Reg[e][7] = new RegExp(`\x1b${tcGroup[7]}`, 'gi'); // 이탤릭!
            RS.MessageSystemMZ.Reg[e][8] = new RegExp(`\x1b${tcGroup[8]}\\<(.+?)\\>`, 'gi'); // 이름
            RS.MessageSystemMZ.Reg[e][9] = new RegExp(`\x1b${tcGroup[9]}\\<(.+)\\>`, 'gi'); // 그레디언트
            RS.MessageSystemMZ.Reg[e][10] = new RegExp(`(?:\x1bP|\x1b${tcGroup[10]})\\[(\\d+)\\]`, 'gi'); // 파티원
            RS.MessageSystemMZ.Reg[e][11] = new RegExp(`(?:\x1bN|\x1b${tcGroup[11]})\\[(\\d+)\\]`, 'gi'); // 주인공
            RS.MessageSystemMZ.Reg[e][12] = new RegExp(`(?:\x1bV|\x1b${tcGroup[12]})\\[(\\d+)\\]`, 'gi'); // 변수
            RS.MessageSystemMZ.Reg[e][13] = new RegExp(`(?:\x1bI|\x1b${tcGroup[13]})\\[(\\d+)\\]`, 'g'); // 아이콘
            RS.MessageSystemMZ.Reg[e][14] = new RegExp(`(?:\x1b{|\x1b${tcGroup[14]})`, 'gi'); // 확대!
            RS.MessageSystemMZ.Reg[e][15] = new RegExp(`(?:\x1b}|\x1b${tcGroup[15]})`, 'gi'); // 축소!
            RS.MessageSystemMZ.Reg[e][16] = new RegExp(`(?:\x1bG|\x1b${tcGroup[16]})`, 'gi'); // 골드
            RS.MessageSystemMZ.Reg[e][17] = new RegExp(`\x1b${tcGroup[17]}\\[(.*?)\\]`, 'gi'); // 말풍선
            RS.MessageSystemMZ.Reg[e][18] = new RegExp(`\x1b${tcGroup[18]}\\[(\\d+)\\]`, 'gi'); // 정렬자
            RS.MessageSystemMZ.Reg[e][19] = new RegExp(`\x1b${tcGroup[19]}\\[(\\d+)\\]`, 'gi'); // 숫자
            RS.MessageSystemMZ.Reg[e][20] = new RegExp(`\x1b${tcGroup[20]}\\[(\\d+)\\]`, 'gi'); // 크기
            RS.MessageSystemMZ.Reg[e][21] = new RegExp(`\x1b${tcGroup[21]}`, 'gi'); // r
            RS.MessageSystemMZ.Reg[e][22] = new RegExp(`\x1b${tcGroup[22]}`, 'gi'); // t
            RS.MessageSystemMZ.Reg[e][23] = new RegExp(`\x1b${tcGroup[23]}\\<(.+?)\\>`, 'gi'); // 효과음
            RS.MessageSystemMZ.Reg[e][24] = new RegExp(`\x1b${tcGroup[24]}\\<(.+?)\\>`, 'gi'); // 그림 표시
            RS.MessageSystemMZ.Reg[e][25] = new RegExp(`\x1b${tcGroup[25]}\\[(\\d+)\\]`, 'gi'); // 그림 제거
            RS.MessageSystemMZ.Reg[e][26] = new RegExp(`(?:\x1b${tcGroup[26]})\\[(\\d+)\\]`, 'g'); // 아이템
            RS.MessageSystemMZ.Reg[e][27] = new RegExp(`(?:\x1b${tcGroup[27]})\\[(\\d+)\\]`, 'g'); // 무기구
            RS.MessageSystemMZ.Reg[e][28] = new RegExp(`(?:\x1b${tcGroup[28]})\\[(\\d+)\\]`, 'g'); // 방어구
            RS.MessageSystemMZ.Reg[e][29] = new RegExp(`(?:\x1b${tcGroup[29]})\\[(\\d+)\\]`, 'g'); // 직업
            RS.MessageSystemMZ.Reg[e][30] = new RegExp(`(?:\x1b${tcGroup[30]})\\[(\\d+)\\]`, 'g'); // 적군
            RS.MessageSystemMZ.Reg[e][31] = new RegExp(`(?:\x1b${tcGroup[31]})\\[(\\d+)\\]`, 'g'); // 상태
            RS.MessageSystemMZ.Reg[e][32] = new RegExp(`(?:\x1b${tcGroup[32]})\\[(\\d+)\\]`, 'g'); // 스킬
            RS.MessageSystemMZ.Reg[e][33] = new RegExp(`\x1b${tcGroup[33]}\\<(.*)\\>`, 'gi'); // 얼굴
            RS.MessageSystemMZ.Reg[e][34] = new RegExp(`(?:\x1b${tcGroup[34]})\\[(\\d+)\\]`, 'gi'); // 아군
            RS.MessageSystemMZ.Reg[e][35] = new RegExp(`(?:\x1b${tcGroup[35]})\\[(\\d+)\\]`, 'gi'); // 적군

            RS.MessageSystemMZ.Reg[e][36] = new RegExp(`\x1b${tcGroup[36]}`, 'gi'); // [.]
            RS.MessageSystemMZ.Reg[e][37] = new RegExp(`\x1b${tcGroup[37]}`, 'gi'); // [|]
            RS.MessageSystemMZ.Reg[e][38] = new RegExp(`\x1b${tcGroup[38]}`, 'gi'); // [!]
            RS.MessageSystemMZ.Reg[e][39] = new RegExp(`\x1b${tcGroup[39]}`, 'gi'); // [<]
            RS.MessageSystemMZ.Reg[e][40] = new RegExp(`\x1b${tcGroup[40]}`, 'gi'); // [>]
            RS.MessageSystemMZ.Reg[e][41] = new RegExp(`\x1b${tcGroup[41]}`, 'gi'); // [\^]

            RS.MessageSystemMZ.Reg[e][42] = new RegExp(`\x1b${tcGroup[42]}`, 'gi'); // AS굵게!
            RS.MessageSystemMZ.Reg[e][43] = new RegExp(`\x1b${tcGroup[43]}`, 'gi'); // AE굵게!
            RS.MessageSystemMZ.Reg[e][44] = new RegExp(`\x1b${tcGroup[44]}`, 'gi'); // AS이탤릭!
            RS.MessageSystemMZ.Reg[e][45] = new RegExp(`\x1b${tcGroup[45]}`, 'gi'); // AE이탤릭!

            RS.MessageSystemMZ.Reg[e][46] = new RegExp(`(?:<${tcGroup[46]}>)`, 'gi'); // LEFT
            RS.MessageSystemMZ.Reg[e][47] = new RegExp(`(?:<${tcGroup[47]}>)`, 'gi'); // CENTER
            RS.MessageSystemMZ.Reg[e][48] = new RegExp(`(?:<${tcGroup[48]}>)`, 'gi'); // RIGHT

            RS.MessageSystemMZ.Reg[e][49] = new RegExp(`(?:<[${tcGroup[49]}]>)`, 'gi'); // B
            RS.MessageSystemMZ.Reg[e][50] = new RegExp(`(?:<\/[${tcGroup[50]}]>)`, 'gi'); // B
            RS.MessageSystemMZ.Reg[e][51] = new RegExp(`(?:<[${tcGroup[51]}]>)`, 'gi'); // I
            RS.MessageSystemMZ.Reg[e][52] = new RegExp(`(?:<\/[${tcGroup[52]}]>)`, 'gi'); // I
            RS.MessageSystemMZ.Reg[e][53] = new RegExp(`\x1b${tcGroup[53]}`, 'gi'); // AEND : ALIGN_CLEAR
            RS.MessageSystemMZ.Reg[e][54] = new RegExp(`\x1b${tcGroup[54]}\\[(.*)\\]`, 'gi'); // \배경색[색상] \HC[색상]
            RS.MessageSystemMZ.Reg[e][55] = new RegExp(`\x1b${tcGroup[55]}\\[(\\d+)\\]`, 'gi'); // \FD

        }, this);
    }());

    RS.MessageSystemMZ.initSystem = function () {
        var type = RS.MessageSystemMZ.Params.langCode;
        var ret = false;
        if (type.match(/ko/)) {
            RS.MessageSystemMZ.Reg.Group = RS.MessageSystemMZ.Reg.Korean;
            RS.MessageSystemMZ.Reg.defaultEscapeCode = RS.MessageSystemMZ.Reg.KoreanEscapeCode;
            RS.MessageSystemMZ.TextCodes.Main = RS.MessageSystemMZ.TextCodes.Korean;
            ret = true;
        }
        if (type.match(/zh/)) {
            RS.MessageSystemMZ.Reg.Group = RS.MessageSystemMZ.Reg.Chinese;
            RS.MessageSystemMZ.Reg.defaultEscapeCode = RS.MessageSystemMZ.Reg.ChineseEscapeCode;
            RS.MessageSystemMZ.TextCodes.Main = RS.MessageSystemMZ.TextCodes.Chinese;
            ret = true;
        }
        if (type.match(/en/)) {
            RS.MessageSystemMZ.Reg.Group = RS.MessageSystemMZ.Reg.English;
            RS.MessageSystemMZ.Reg.defaultEscapeCode = RS.MessageSystemMZ.Reg.EnglishEscapeCode;
            RS.MessageSystemMZ.TextCodes.Main = RS.MessageSystemMZ.TextCodes.English;
            ret = true;
        }
        if (type.match(/ja/)) {
            RS.MessageSystemMZ.Reg.Group = RS.MessageSystemMZ.Reg.Japanese;
            RS.MessageSystemMZ.Reg.defaultEscapeCode = RS.MessageSystemMZ.Reg.JapaneseEscapeCode;
            RS.MessageSystemMZ.TextCodes.Main = RS.MessageSystemMZ.TextCodes.Japanese;
            ret = true;
        }
        if (ret === false) {
            RS.MessageSystemMZ.Reg.Group = RS.MessageSystemMZ.Reg.English;
            RS.MessageSystemMZ.Reg.defaultEscapeCode = RS.MessageSystemMZ.Reg.EnglishEscapeCode;
            RS.MessageSystemMZ.TextCodes.Main = RS.MessageSystemMZ.TextCodes.English;
        }
    };

    //=============================================================================
    // Color
    //=============================================================================

    window.Color = new class ColorImpl {

        constructor() {
            this._baseColor = this.getColor(16777215);
        }

        getColor(n) {
            var r = (n) & 255;
            var g = (n >> 8) & 255;
            var b = (n >> 16) & 255;
            var result = `rgba(${r},${g},${b},1)`;
            return result;            
        }

        get baseColor() {
            return this._baseColor;
        }

        getBseColor() {
            return this._baseColor;
        }

        getUserCustomColor(string) {    
            const obj = RS.MessageSystemMZ.Params.exTextColors;
            let ret = string;
    
            if (!typeof (obj[0]) === "object") return ret;
            if (!obj[0].hasOwnProperty("Color Name")) return ret;
    
            obj.forEach((e, i, a) => {
    
                if (e["Color Name"] === string) {
    
                    const r = parseInt(e["Red"]) || 0;
                    const g = parseInt(e["Green"]) || 0;
                    const b = parseInt(e["Blue"]) || 0;
                    const a = parseFloat(e["Alpha"]) || 1.0;
    
                    ret = `rgba(${r},${g},${b},${a})`;
    
                }
    
            });
    
            return ret;
    
        }

    };

    const KOREAN_COLORS = {
        "청록": "rgba(0,255,255,1)",
        "청록색": "rgba(0,255,255,1)",
        "c_aqua": "rgba(0,255,255,1)",
        "검은색": "rgba(0,0,0,1)",
        "검정": "rgba(0,0,0,1)",
        "c_black": "rgba(0,0,0,1)",
        "파란색": "rgba(0,0,255,1)",
        "파랑": "rgba(0,0,255,1)",
        "c_blue": "rgba(0,0,255,1)",
        "짙은회색": "rgba(64,64,64,1)",
        "c_dkgray": "rgba(64,64,64,1)",
        "자홍색": "rgba(255,0,255,1)",
        "자홍": "rgba(255,0,255,1)",
        "c_fuchsia": "rgba(255,0,255,1)",
        "회색": "rgba(128,128,128,1)",
        "c_gray": "rgba(128,128,128,1)",
        "녹색": "rgba(0,128,0,1)",
        "c_green": "rgba(0,128,0,1)",
        "밝은녹색": "rgba(0,255,0,1)",
        "라임": "rgba(0,255,0,1)",
        "c_lime": "rgba(0,255,0,1)",
        "밝은회색": "rgba(192,192,192,1)",
        "c_ltgray": "rgba(192,192,192,1)",
        "밤색": "rgba(128,0,0,1)",
        "마룬": "rgba(128,0,0,1)",
        "c_maroon": "rgba(128,0,0,1)",
        "감청색": "rgba(0,0,128,1)",
        "네이비": "rgba(0,0,128,1)",
        "c_navy": "rgba(0,0,128,1)",
        "황록색": "rgba(128,128,0,1)",
        "올리브": "rgba(128,128,0,1)",
        "c_olive": "rgba(128,128,0,1)",
        "주황색": "rgba(255,160,64,1)",
        "주황": "rgba(255,160,64,1)",
        "오렌지": "rgba(255,160,64,1)",
        "c_orange": "rgba(255,160,64,1)",
        "보라색": "rgba(128,0,128,1)",
        "보라": "rgba(128,0,128,1)",
        "c_purple": "rgba(128,0,128,1)",
        "빨간색": "rgba(255,0,0,1)",
        "빨강": "rgba(255,0,0,1)",
        "c_red": "rgba(255,0,0,1)",
        "은색": "rgba(192,192,192,1)",
        "은": "rgba(192,192,192,1)",
        "c_silver": "rgba(192,192,192,1)",
        "민트색": "rgba(0,128,128,1)",
        "c_teal": "rgba(0,128,128,1)",
        "흰색": "rgba(255,255,255,1)",
        "흰": "rgba(255,255,255,1)",
        "c_white": "rgba(255,255,255,1)",
        "노란색": "rgba(255,255,0,1)",
        "노랑": "rgba(255,255,0,1)",
        "c_yellow": "rgba(255,255,0,1)"
    };

    const CHINESE_COLOR = {
        "水色": "rgba(0,255,255,1)",
        "c_aqua": "rgba(0,255,255,1)",
        "黑色": "rgba(0,0,0,1)",
        "c_black": "rgba(0,0,0,1)",
        "蓝色": "rgba(0,0,255,1)",
        "c_blue": "rgba(0,0,255,1)",
        "深灰色": "rgba(64,64,64,1)",
        "c_dkgray": "rgba(64,64,64,1)",
        "紫红色": "rgba(255,0,255,1)",
        "c_fuchsia": "rgba(255,0,255,1)",
        "灰色": "rgba(128,128,128,1)",
        "c_gray": "rgba(128,128,128,1)",
        "绿色": "rgba(0,128,0,1)",
        "c_green": "rgba(0,128,0,1)",
        "浅绿色": "rgba(0,255,0,1)",
        "c_lime": "rgba(0,255,0,1)",
        "浅灰色": "rgba(192,192,192,1)",
        "c_ltgray": "rgba(192,192,192,1)",
        "栗色": "rgba(128,0,0,1)",
        "c_maroon": "rgba(128,0,0,1)",
        "绀青色": "rgba(0,0,128,1)",
        "c_navy": "rgba(0,0,128,1)",
        "黄绿色": "rgba(128,128,0,1)",
        "c_olive": "rgba(128,128,0,1)",
        "橙黄色": "rgba(255,160,64,1)",
        "c_orange": "rgba(255,160,64,1)",
        "紫色": "rgba(128,0,128,1)",
        "c_purple": "rgba(128,0,128,1)",
        "红色": "rgba(255,0,0,1)",
        "c_red": "rgba(255,0,0,1)",
        "银白色": "rgba(192,192,192,1)",
        "c_silver": "rgba(192,192,192,1)",
        "水鸭色": "rgba(0,128,128,1)",
        "c_teal": "rgba(0,128,128,1)",
        "白色": "rgba(255,255,255,1)",
        "c_white": "rgba(255,255,255,1)",
        "黄色": "rgba(255,255,0,1)",
        "c_yellow": "rgba(255,255,0,1)"
    };

    const ENGLISH_COLOR = {
        "AQUA": "rgba(0,255,255,1)",
        "c_aqua": "rgba(0,255,255,1)",
        "BLACK": "rgba(0,0,0,1)",
        "c_black": "rgba(0,0,0,1)",
        "BLUE": "rgba(0,0,255,1)",
        "c_blue": "rgba(0,0,255,1)",
        "DKGRAY": "rgba(64,64,64,1)",
        "c_dkgray": "rgba(64,64,64,1)",
        "FUCHSIA": "rgba(255,0,255,1)",
        "c_fuchsia": "rgba(255,0,255,1)",
        "GRAY": "rgba(128,128,128,1)",
        "c_gray": "rgba(128,128,128,1)",
        "GREEN": "rgba(0,128,0,1)",
        "c_green": "rgba(0,128,0,1)",
        "LIME": "rgba(0,255,0,1)",
        "c_lime": "rgba(0,255,0,1)",
        "LTGRAY": "rgba(192,192,192,1)",
        "c_ltgray": "rgba(192,192,192,1)",
        "MAROON": "rgba(128,0,0,1)",
        "c_maroon": "rgba(128,0,0,1)",
        "NAVY": "rgba(0,0,128,1)",
        "c_navy": "rgba(0,0,128,1)",
        "OLIVE": "rgba(128,128,0,1)",
        "c_olive": "rgba(128,128,0,1)",
        "ORANGE": "rgba(255,160,64,1)",
        "c_orange": "rgba(255,160,64,1)",
        "PURPLE": "rgba(128,0,128,1)",
        "c_purple": "rgba(128,0,128,1)",
        "RED": "rgba(255,0,0,1)",
        "c_red": "rgba(255,0,0,1)",
        "SILVER": "rgba(192,192,192,1)",
        "c_silver": "rgba(192,192,192,1)",
        "TEAL": "rgba(0,128,128,1)",
        "c_teal": "rgba(0,128,128,1)",
        "WHITE": "rgba(255,255,255,1)",
        "c_white": "rgba(255,255,255,1)",
        "YELLOW": "rgba(255,255,0,1)",
        "c_yellow": "rgba(255,255,0,1)"
    };

    const JAPANESE_COLOR = {
        "水色": "rgba(0,255,255,1)",
        "アクア色": "rgba(0,255,255,1)",
        "c_aqua": "rgba(0,255,255,1)",
        "黑色": "rgba(0,0,0,1)",
        "c_black": "rgba(0,0,0,1)",
        "靑色": "rgba(0,0,255,1)",
        "c_blue": "rgba(0,0,255,1)",
        "ふか灰色": "rgba(64,64,64,1)",
        "c_dkgray": "rgba(64,64,64,1)",
        "紫紅色": "rgba(255,0,255,1)",
        "c_fuchsia": "rgba(255,0,255,1)",
        "灰色": "rgba(128,128,128,1)",
        "c_gray": "rgba(128,128,128,1)",
        "綠色": "rgba(0,128,0,1)",
        "c_green": "rgba(0,128,0,1)",
        "黃綠": "rgba(0,255,0,1)",
        "c_lime": "rgba(0,255,0,1)",
        "鼠色": "rgba(192,192,192,1)",
        "c_ltgray": "rgba(192,192,192,1)",
        "―色": "rgba(128,0,0,1)",
        "c_maroon": "rgba(128,0,0,1)",
        "群青色": "rgba(0,0,128,1)",
        "ネイビー": "rgba(0,0,128,1)",
        "c_navy": "rgba(0,0,128,1)",
        "黃綠色": "rgba(128,128,0,1)",
        "オリーブ色": "rgba(128,128,0,1)",
        "c_olive": "rgba(128,128,0,1)",
        "橙色": "rgba(255,160,64,1)",
        "オレンジ色": "rgba(255,160,64,1)",
        "c_orange": "rgba(255,160,64,1)",
        "紫色": "rgba(128,0,128,1)",
        "c_purple": "rgba(128,0,128,1)",
        "赤色": "rgba(255,0,0,1)",
        "レッド": "rgba(255,0,0,1)",
        "c_red": "rgba(255,0,0,1)",
        "銀色": "rgba(192,192,192,1)",
        "c_silver": "rgba(192,192,192,1)",
        "ミント色": "rgba(0,128,128,1)",
        "薄荷色": "rgba(0,128,128,1)",
        "c_teal": "rgba(0,128,128,1)",
        "白色": "rgba(255,255,255,1)",
        "c_white": "rgba(255,255,255,1)",
        "黃色": "rgba(255,255,0,1)",
        "c_yellow": "rgba(255,255,0,1)"
    };

    RS.MessageSystemMZ.getKoreanColor = function (string) {
        let color = KOREAN_COLORS[string];

        if (color) {
            return color;
        }

        if (["기본", "기본색", "c_normal"].contains(string)) {
            return Color.getBaseColor();
        }

        return Color.getUserCustomColor(string);
    };

    RS.MessageSystemMZ.getChineseColor = function (string) {
        let color = CHINESE_COLOR[string];

        if (color) {
            return color;
        }

        if (['通常', 'c_normal'].contains(string)) {
            return Color.getBaseColor();
        }

        return Color.getUserCustomColor(string);
    };

    RS.MessageSystemMZ.getEnglishColor = function (string) {
        let color = ENGLISH_COLOR[string];

        if (color) {
            return color;
        }

        if ('c_normal' === string) {
            return Color.getBaseColor();
        }

        return Color.getUserCustomColor(string);
    };

    RS.MessageSystemMZ.getJapaneseColor = function (string) {
        let color = JAPANESE_COLOR[string];

        if (color) {
            return color;
        }

        if (['基本色', 'c_normal'].contains(string)) {
            return Color.getBaseColor();
        }

        return Color.getUserCustomColor(string);
    };

    RS.MessageSystemMZ.getBrowser = function () {

        /* Refer to https://stackoverflow.com/a/16938481 */
        var ua = navigator.userAgent,
            tem, M = ua.match(/(opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {

            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

            return {
                name: 'IE',
                version: (tem[1] || '')
            };

        }

        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) {
                return {
                    name: 'Opera',
                    version: tem[1]
                };
            }

            tem = ua.match(/\bEdge\/(\d+)/);
            if (tem != null) {
                return {
                    name: 'Edge',
                    version: tem[1]
                };
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        return {
            name: M[0],
            version: M[1]
        };

    };

    Color.gmColor = function (string) {
        var type = RS.MessageSystemMZ.Params.langCode;
        if (type.match(/ko/)) {
            return RS.MessageSystemMZ.getKoreanColor(string);
        }
        if (type.match(/zh/)) {
            return RS.MessageSystemMZ.getChineseColor(string);
        }
        if (type.match(/en/)) {
            return RS.MessageSystemMZ.getEnglishColor(string);
        }
        if (type.match(/ja/)) {
            return RS.MessageSystemMZ.getJapaneseColor(string);
        }
        return RS.MessageSystemMZ.getEnglishColor(string);
    };

})(RS.MessageSystemMZ);