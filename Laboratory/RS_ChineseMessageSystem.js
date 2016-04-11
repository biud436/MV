/*:
 * RS_ChineseMessageSystem.js
 * @plugindesc Chinese Message System (v1.0, 2016.03.11)
 * This plugin provides Chinese text code to the Message System.
 * @author biud436
 *
 *-------------------------------------------------------------------------------
 * Plugin Parameters
 *-------------------------------------------------------------------------------
 *
 * @param Font Size
 * @desc Font Size
 * @default 28
 *
 * @param numVisibleRows
 * @desc numVisibleRows
 * @default 4
 *
 * @param gradientColor1
 * @desc gradientColor1
 * @default #FFFFFF
 *
 * @param gradientColor2
 * @desc gradientColor2
 * @default #F29661
 *
 * @param gradientColor3
 * @desc gradientColor3
 * @default #CC3D3D
 *
 * @param Text Speed
 * @desc Text Speed
 * @default 0
 *
 * @param Text Min Size
 * @desc Text Min Size
 * @default 24
 *
 * @param Text Max Size
 * @desc Text Max Size
 * @default 96
 *
 * @param Text Start X
 * @desc Text Start X
 * @default 256
 *
 * @param Name Window X
 * @desc Name Window X
 * @default 0
 *
 * @param Name Window Y
 * @desc Name Window Y
 * @default 0
 *
 * @param Name Window Inner Padding
 * @desc Name Window Padding
 * @default 10
 *
 * @param Big Face OX
 * @desc Big Face OX
 * @default 0
 *
 * @param Big Face OY
 * @desc Big Face OY
 * @default 0
 *
 * @param Show Big Face Back
 * @desc Show Big Face Back
 * @default false
 *
 *-------------------------------------------------------------------------------
 * Help
 *-------------------------------------------------------------------------------
 * @help
 *
 *
 * - Plugin Commands
 *
 * RSM textSpeed number
 * RSM fontSize number
 * RSM minFontSize number
 * RSM maxFontSize number
 * RSM gradient color1 color2 color3
 * RSM line number
 * RSM textStartX number
 * RSM name x number
 * RSM name y number
 * RSM name padding number
 * RSM faceOX number
 * RSM faceOY number
 * RSM faceZ number
 *
 * - Text Code
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
 * c_aqua
 * c_black
 * c_blue
 * c_dkgray
 * c_fuchsia
 * c_gray
 * c_green
 * c_lime
 * c_ltgray
 * c_maroon
 * c_navy
 * c_olive
 * c_orange
 * c_purple
 * c_red
 * c_silver
 * c_teal
 * c_white
 * c_yellow
 * c_normal
 * AliceBlue
 * AntiqueWhite
 * Aqua
 * Aquamarine
 * Azure
 * Beige
 * Bisque
 * Black
 * BlanchedAlmond
 * Blue
 * BlueViolet
 * Brown
 * BurlyWood
 * CadetBlue
 * Chartreuse
 * Chocolate
 * Coral
 * CornflowerBlue
 * Cornsilk
 * Crimson
 * Cyan
 * DarkBlue
 * DarkCyan
 * DarkGoldenRod
 * DarkGray
 * DarkGreen
 * DarkKhaki
 * DarkMagenta
 * DarkOliveGreen
 * DarkOrange
 * DarkOrchid
 * DarkRed
 * DarkSalmon
 * DarkSeaGreen
 * DarkSlateBlue
 * DarkSlateGray
 * DarkTurquoise
 * DarkViolet
 * DeepPink
 * DeepSkyBlue
 * DimGray
 * DodgerBlue
 * FireBrick
 * FloralWhite
 * ForestGreen
 * Fuchsia
 * Gainsboro
 * GhostWhite
 * Gold
 * GoldenRod
 * Gray
 * Green
 * GreenYellow
 * HoneyDew
 * HotPink
 * IndianRed
 * Indigo
 * Ivory
 * Khaki
 * Lavender
 * LavenderBlush
 * LawnGreen
 * LemonChiffon
 * LightBlue
 * LightCoral
 * LightCyan
 * LightGoldenRodYellow
 * LightGray
 * LightGreen
 * LightPink
 * LightSalmon
 * LightSeaGreen
 * LightSkyBlue
 * LightSlateGray
 * LightSteelBlue
 * LightYellow
 * Lime
 * LimeGreen
 * Linen
 * Magenta
 * Maroon
 * MediumAquaMarine
 * MediumBlue
 * MediumOrchid
 * MediumPurple
 * MediumSeaGreen
 * MediumSlateBlue
 * MediumSpringGreen
 * MediumTurquoise
 * MediumVioletRed
 * MidnightBlue
 * MintCream
 * MistyRose
 * Moccasin
 * NavajoWhite
 * Navy
 * OldLace
 * Olive
 * OliveDrab
 * Orange
 * OrangeRed
 * Orchid
 * PaleGoldenRod
 * PaleGreen
 * PaleTurquoise
 * PaleVioletRed
 * PapayaWhip
 * PeachPuff
 * Peru
 * Pink
 * Plum
 * PowderBlue
 * Purple
 * RebeccaPurple
 * Red
 * RosyBrown
 * RoyalBlue
 * SaddleBrown
 * Salmon
 * SandyBrown
 * SeaGreen
 * SeaShell
 * Sienna
 * Silver
 * SkyBlue
 * SlateBlue
 * SlateGray
 * Snow
 * SpringGreen
 * SteelBlue
 * Tan
 * Teal
 * Thistle
 * Tomato
 * Turquoise
 * Violet
 * Wheat
 * White
 * WhiteSmoke
 * Yellow
 * YellowGreen
 *
 * - Change Log
 * 2016.04.11 (v1.0.1) - Fixed a range of the CJK Unified Ideographs. (between 一[19968] and 鼣[40739])
 */
var Imported = Imported || {};
Imported.RS_ChineseMessageSystem = true;

/**
 * @namespace RS
 */
var RS = RS || {};

/**
 * @class RS.Window_Name
 * @constructor
 */
RS.Window_Name = function() {
    this.initialize.apply(this, arguments);
};

/**
 * @namespace Color
 */
var Color = Color || {};

(function () {

  var parameters = PluginManager.parameters('RS_ChineseMessageSystem');

  RS.__fontSize = Number(parameters['Font Size'] || 28);
  RS.__textSpeed = Number(parameters['Text Speed'] || 0);
  RS.__minFontSize = Number(parameters['Text Min Size'] || 24);
  RS.__maxFontSize = Number(parameters['Text Max Size'] || 96);

  /**
   * 텍스트 시작 X
   * @memberOf RS
   * @property __textStartX
   * @type Number
   */
  RS.__textStartX = Number(parameters['Text Start X'] || 192);

  /**
   * 페이스칩이 설정되어있을 때 텍스트의 시작 지점
   * @memberOf RS
   * @property __faceStartOriginX
   * @type Number
   */
  RS.__faceStartOriginX = 168;

  /**
   * 표시 할 라인의 수
   * @memberOf RS
   * @property __numVisibleRows
   * @type Number
   */
  RS.__numVisibleRows  = Number(parameters['numVisibleRows'] || 4);

  /**
   * 그레디언트 텍스트 시작 색상
   * @memberOf RS
   * @property __gradientColor1
   * @type String
   */
  RS.__gradientColor1 = String(parameters['gradientColor1'] || '#FFFFFF');

  /**
   * 그레디언트 텍스트 중간 색상
   * @memberOf RS
   * @property __gradientColor1
   * @type String
   */
  RS.__gradientColor2 = String(parameters['gradientColor2'] || '#F29661');

  /**
   * 그레디언트 텍스트 끝 색상
   * @memberOf RS
   * @property __gradientColor1
   * @type String
   */
  RS.__gradientColor3 = String(parameters['gradientColor3'] || '#CC3D3D');

  /**
   * 이름 윈도우 X
   * @memberOf RS
   * @property __nameWindowX
   * @type Number
   */
  RS.__nameWindowX = Number(parameters['Name Window X'] || 0);

  /**
   * 이름 윈도우 Y
   * @private
   * @memberOf RS
   * @property __nameWindowX
   * @type Number
   */
  RS.__nameWindowY = Number(parameters['Name Window Y'] || 0);

  /**
   * 이름 윈도우 안쪽 여백
   * @private
   * @memberOf RS
   * @property __nameWindowStdPadding
   * @type Number
   */
  RS.__nameWindowStdPadding = Number(parameters['Name Window Inner Padding'] || 18);

  /**
   * 큰 페이스칩 OX
   * @private
   * @memberOf RS
   * @property __faceOX
   * @type Number
   */
  RS.__faceOX = Number(parameters['Big Face OX'] || 0);

  /**
   * 큰 페이스칩 OY
   * @private
   * @memberOf RS
   * @property __faceOY
   * @type Number
   */
  RS.__faceOY = Number(parameters['Big Face OY'] || 0);

  /**
   * 큰 페이스칩 사이드에 표시
   * @private
   * @memberOf RS
   * @property __faceSide
   * @type Boolean
   */
  RS.__faceSide = Boolean(parameters['Show Big Face Back'] === 'true'|| false);

  /**
   * 말풍선의 폰트사이즈
   * @memberOf RS
   * @property __FONT_SIZE
   * @type Number
   */
  RS.__FONT_SIZE = 28;

  /**
   * 말풍선의 안쪽 여백
   * @memberOf RS
   * @property __STD_PADDING
   * @type Number
   */
  RS.__STD_PADDING = 18;

  /**
   * 말풍선의 폭
   * @memberOf RS
   * @property __WIDTH
   * @type Number
   */
  RS.__WIDTH = (RS.__FONT_SIZE * 6) + RS.__STD_PADDING;

  /**
   * 말풍선의 높이
   * @memberOf RS
   * @property __HEIGHT
   * @type Number
   */
  RS.__HEIGHT = RS.__FONT_SIZE + (RS.__STD_PADDING / 2);

  /**
   * int 형 정수값에서 CSS 색상 코드를 취득합니다
   * @static
   * @memberOf Color
   * @method getColor
   * @param n {Number} 정수값
   * @returns {Number}
   */
  Color.getColor = function(n) {
      var r = (n) & 255;
      var g = (n >> 8) & 255;
      var b = (n >> 16) & 255;
      var result = 'rgba(%1,%2,%3,1)'.format(r,g,b);
      return result;
  }

  /**
   * @static
   * @memberOf Color
   * @property baseColor
   * @type String
   */
  Color.baseColor = Color.getColor(16777215);

  /**
   * 기본 색상을 취득합니다.
   * @static
   * @memberOf Color
   * @method getBaseColor
   * @returns {Color.baseColor}
   */
  Color.getBaseColor = function() {
      return Color.baseColor;
  }

  /**
   * 색상값을 int에서 javascript color로
   * @static
   * @memberOf Color
   * @method gmColor
   * @param string {String}
   * @returns {Color.getColor|String}
   */
  Color.gmColor = function(string) {
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
  }

  /**
   * @class Window_Base
   */

  /**
   * 이스케이프 코드를 취득합니다
   * @memberOf Window_Base
   * @method obtainEscapeCode
   * @param textState {textState} 텍스트 상태
   * @returns {String}
   */
  Window_Base.prototype.obtainEscapeCode = function(textState) {
      textState.index++;
      var regExp = /^[\$\.\|\^!><\{\}\\]|^[A-Z]+|^[一-鼣]+[!]*/i;
      var arr = regExp.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          return arr[0].toUpperCase();
      } else {
          return '';
      }
  };

  /**
   * 텍스트 코드 추출( 글자 색상 변경 )
   * @memberOf Window_Base
   * @method obtainNameColor
   * @param textState {textState} 텍스트 상태
   * @returns {Color.gmColor|String}
   */
  Window_Base.prototype.obtainNameColor = function(textState) {
      var arr = /\[(.+?)\]/gi.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          return Color.gmColor(arr[1]);
      } else {
          return this.textColor(0);
      }
  };

  /**
   * 이스케이프 코드값을 읽고 관련 명령 처리
   * @memberOf Window_Base
   * @method processEscapeCharacter
   * @param code {Number} 텍스트 코드
   * @param textState {textState} 텍스트 상태
   */
  Window_Base.prototype.processEscapeCharacter = function(code, textState) {
      switch (code) {
      case 'C':
        this.changeTextColor(this.textColor(this.obtainEscapeParam(textState)));
        break;
      case '色':
        this.changeTextColor(this.obtainNameColor(textState));
        break;
      case 'I':
      case '图标':
        this.processDrawIcon(this.obtainEscapeParam(textState), textState);
        break;
      case '{':
      case '增大':
        this.makeFontBigger();
        break;
      case '}':
      case '减少':
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

  /**
   * @memberOf Window_Base
   * @method makeFontSmaller
   */
  Window_Base.prototype.makeFontSmaller = function() {
      if (this.contents.fontSize >= RS.__minFontSize) {
          this.contents.fontSize -= 12;
      }
  };

  /**
   * @memberOf Window_Base
   * @method makeFontBigger
   */
  Window_Base.prototype.makeFontBigger = function() {
      if (this.contents.fontSize <= RS.__maxFontSize) {
          this.contents.fontSize += 12;
      }
  };

   /**
   * @memberOf Window_Base
   * @method convertEscapeCharacters
   * @param text {String}
   * @return text {String}
   */
  var alias_Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
      text = alias_Window_Base_convertEscapeCharacters.call(this, text);
      text = text.replace(/\x1b变量\[(\d+)\]/gi, function() {
          return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1b变量\[(\d+)\]/gi, function() {
          return $gameVariables.value(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1b角色\[(\d+)\]/gi, function() {
          return this.actorName(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1b队伍成员\[(\d+)\]/gi, function() {
          return this.partyMemberName(parseInt(arguments[1]));
      }.bind(this));
      text = text.replace(/\x1b数\[(\d+)\]/gi, function() {
          return arguments[1].toComma();
      }.bind(this));
      text = text.replace(/\x1b金币/gi, TextManager.currencyUnit);
      return text;
  };

  /**
   * @class Bitmap.prototype
   */

  /**
   * 윈도우 스킨 로딩이 완료되면 기본 색상 설정
   * @constructs Bitmap
   * @param width {Number}  폭
   * @param height {Number} 높이
   */
  var alias_Bitmap_initialize = Bitmap.prototype.initialize;
  Bitmap.prototype.initialize = function(width, height) {
      alias_Bitmap_initialize.call(this, width, height);
      this.fontBold = false;
      this.fontGradient = false;
  }
  /**
   * 그레디언트 설정
   * @memberOf Bitmap
   * @method setGradient
   * @param tWidth {Number} 텍스트의 폭을 지정하세요
   * @param color1 {String} 시작 색상
   * @param color2 {String} 중간 색상
   * @param color3 {String} 끝 색상
   * @return fillStyle {Object} 선형 그레디언트 객체를 반환합니다
   */
  Bitmap.prototype.setGradient = function(tWidth, color1, color2, color3) {
      var context = this._context;
      var gradient = context.createLinearGradient(0, 0, tWidth, 0);
      gradient.addColorStop('0', color1);
      gradient.addColorStop('0.6', color2);
      gradient.addColorStop('1', color3);
      return gradient;
  };

  /**
   * 폰트 정보 설정
   * @private
   * @memberOf Bitmap
   * @method _makeFontNameText
   * @return {String}
   */
  Bitmap.prototype._makeFontNameText = function() {
      return (this.fontItalic ? 'Italic ' : '') + (this.fontBold ? 'bold ' : '') +
              this.fontSize + 'px ' + this.fontFace;
  };

  /**
   * 텍스트 묘화
   * @private
   * @memberOf Bitmap
   * @method _drawTextBody
   * @param text {String} 텍스트
   * @param tx {Number} 텍스트의 x좌표
   * @param ty {Number} 텍스트의 y좌표
   * @param maxWidth {Number} 최대 폭
   */
  Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
      var context = this._context;
      if(this.fontGradient) {
        var gradient = this.setGradient(this.measureTextWidth(text),
        RS.__gradientColor1,
        RS.__gradientColor2,
        RS.__gradientColor3);
        context.fillStyle = gradient;
      } else {
        context.fillStyle = this.textColor;
      }
      context.fillText(text, tx, ty, maxWidth);
      context.fillStyle = this.textColor;
  };

  /**
   * @class Game_Message
   */

  /**
   * 게임 메시지 초기화
   * @memberOf Game_Message
   * @method clear
   */
  var alias_Game_Message_clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
      alias_Game_Message_clear.call(this);
      this._waitTime = 0;
      this._gradientText = '';
      this._balloon = -2;
      this._align = 0;
  }

  /**
   * 대기 설정
   * @memberOf Game_Message
   * @method setWaitTime
   */
  Game_Message.prototype.setWaitTime = function(time) {
    this._waitTime = time;
  };

  /**
   * 그레디언트 텍스트 설정 함수입니다.
   * @memberOf Game_Message
   * @method setGradientText
   * @param text {String} 그레디언트로 그릴 텍스트를 설정합니다.
   */
  Game_Message.prototype.setGradientText = function(text) {
      this._gradientText = text;
  };

  /**
   * 대기 시간을 반환합니다.
   * @memberOf Game_Message
   * @method getWaitTime
   * @return {Number}
   */
  Game_Message.prototype.getWaitTime = function() {
      return this._waitTime || 0;
  };

  /**
   * 그레디언트 텍스트를 반환합니다.
   * @memberOf Game_Message
   * @method getWaitTime
   * @return {String}
   */
  Game_Message.prototype.getGradientText = function() {
      return this._gradientText;
  };

  /**
   * @memberOf Game_Message
   * @method getMaxLine
   * @return {Number}
   */
  Game_Message.prototype.getMaxLine = function() {
      return this._maxLine;
  };

  /**
   * @memberOf Game_Message
   * @method setMaxLine
   * @param n {Number}
   */
  Game_Message.prototype.setMaxLine = function(n) {
      this._maxLine = RS.__numVisibleRows = n;
  };

  /**
   * @memberOf Game_Message
   * @method setBalloon
   * @param n {Number}
   */
  Game_Message.prototype.setBalloon = function(n) {
      this._balloon = n;
  };

  /**
   * @memberOf Game_Message
   * @method setBalloon
   * @param n {Number}
   */
  Game_Message.prototype.getBalloon = function(n) {
      return this._balloon;
  };

  /**
   * @memberOf Game_Message
   * @method setAlign
   * @param n {Number}
   */
  Game_Message.prototype.setAlign = function(n) {
     this._align = n;
  }

  /**
   * @memberOf Game_Message
   * @method getAlign
   * @param n {Number}
   */
  Game_Message.prototype.getAlign = function(n) {
     return this._align;
  }

  /**
   * @class Window_Message
   */

  /**
   * 텍스트 코드 추출( 글자 색상 변경 )
   * @memberOf Window_Message
   * @method obtainTextSpeed
   * @param textState {textState}
   * @return {Number}
   */
  Window_Message.prototype.obtainTextSpeed = function(textState) {
      var arr = /\[(\d+)\]/.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          console.log(textState.text[textState.index]);
          return parseInt(arr[1]);
      } else {
          return 0;
      }
  };


  /**
   * 텍스트 추출( 그레디언트 설정 )
   * @memberOf Window_Message
   * @method obtainGradientText
   * @param textState {textState}
   * @return {String}
   */
  Window_Message.prototype.obtainGradientText = function(textState) {
      var arr = /^<(.+)>/.exec(textState.text.slice(textState.index));
      if (arr) {
          textState.index += arr[0].length;
          return String(arr[1]);
      } else {
          return 'Empty Text';
      }
  };

  /**
   * 이스케이프 코드 추가 정의
   * @memberOf Window_Message
   * @method processEscapeCharacter
   * @param code {Number} 텍스트 코드
   * @param textState {textState} 텍스트 상태
   */
  var alias_Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {

      switch (code) {
      case '速度':
          $gameMessage.setWaitTime(this.obtainEscapeParam(textState));
          break;
      case '大小':
          this.setTextSize(this.obtainEscapeParam(textState));
          break;
      case '轮廓颜色':
          this.setStrokeColor(this.obtainNameColor(textState));
          break;
      case '缩进':
          this.setTextIndent(textState);
          break;
      case '轮廓宽度':
          this.setStrokeWidth(this.obtainEscapeParam(textState));
          break;
      case '加粗!':
          this.setTextBold(!this.contents.fontBold);
          break;
      case '倾斜!':
          this.setTextItalic(!this.contents.fontItalic);
          break;
      case '渐变颜色':
          this.setTextGradient(textState);
          break;
      default:
          alias_Window_Message_processEscapeCharacter.call(this, code, textState);
      }

  };

   /**
   * 데이터베이스 항목의 이름을 반환합니다.
   * @memberOf Window_Message
   * @method getDBData
   * @param ev {Array}
   * @return text {String}
   */
  Window_Message.prototype.getDBData = function(ev) {
    try {
      return ev.name;
    } catch(e) {
      return "";
    }
  };

  /**
   * @memberOf Window_Message
   * @method setTextItalic
   * @param value {Boolean}
   */
  Window_Message.prototype.setTextItalic = function() {
      this.contents.fontItalic = arguments[0];
  };

  /**
   * @memberOf Window_Message
   * @method setTextBold
   * @param value {Boolean}
   */
  Window_Message.prototype.setTextBold = function() {
      this.contents.fontBold = arguments[0];
  };

  /**
   * @memberOf Window_Message
   * @method setTextSize
   * @param value {Number}
   */
  Window_Message.prototype.setTextSize = function() {
      this.contents.fontSize = arguments[0];
  };

  /**
   * @memberOf Window_Message
   * @method setStrokeWidth
   * @param value {Number}
   */
  Window_Message.prototype.setStrokeWidth = function() {
      this.contents.outlineWidth = arguments[0];
  };

  /**
   * @memberOf Window_Message
   * @method setStrokeColor
   * @param value {String}
   */
  Window_Message.prototype.setStrokeColor = function() {
      this.contents.outlineColor = arguments[0];
  };

  /**
   * @memberOf Window_Message
   * @method setTextIndent
   * @param value {Number}
   */
  Window_Message.prototype.setTextIndent = function(textState) {
      textState.x += this.obtainEscapeParam(textState);
  };

  /**
   * 텍스트를 그레디언트로 채색합니다.
   * @memberOf Window_Message
   * @method setGradientText
   * @param textState {textState} 텍스트 상태
   */
  Window_Message.prototype.setTextGradient = function(textState) {
      this.contents.fontGradient = true;
      $gameMessage.setGradientText(this.obtainGradientText(textState));
      var c = $gameMessage.getGradientText();
      var w = this.textWidth(c);
      this.contents.drawText(c, textState.x, textState.y, w * 2, textState.height);
      textState.x += w;
      this.contents.fontGradient = false;
  };

  /**
   * 폰트를 초기화합니다
   * @memberOf Window_Message
   * @method resetFontSettings
   */
  Window_Message.prototype.resetFontSettings = function() {
      Window_Base.prototype.resetFontSettings.call(this);
      this.contents.fontBold = false;
      this.contents.fontItalic = false;
      this.contents.outlineWidth = 4;
      this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
      this.contents.fontGradient = false;
      $gameMessage.setWaitTime(RS.__textSpeed);
  };

  /**
   * 기본 폰트 크기를 반환합니다.
   * @memberOf Window_Message
   * @method standardFontSize
   * @return {Number}
   */
  Window_Message.prototype.standardFontSize = function() {
      return RS.__fontSize;
  };

  /**
   * 메시지 시스템의 최대 라인 수를 반환합니다.
   * @memberOf Window_Message
   * @method numVisibleRows
   * @return {Number}
   */
  Window_Message.prototype.numVisibleRows = function() {
      return RS.__numVisibleRows;
  };

  /**
   * 기본 폰트 크기를 반환합니다.
   * @memberOf Window_Message
   * @method processNormalCharacter
   * @param textState {textState} 텍스트 상태
   */
  Window_Message.prototype.processNormalCharacter = function(textState) {
      Window_Base.prototype.processNormalCharacter.call(this, textState);
      !this._showFast && this.startWait($gameMessage.getWaitTime() || 0);
  };

  /**
   * @memberOf Window_Message
   * @method createSubWindows
   */
  var alias_Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
  Window_Message.prototype.createSubWindows = function() {
      alias_Window_Message_createSubWindows.call(this);
      this._nameWindow = new RS.Window_Name();
      this.updateNameWindow();
  };

  /**
   * @memberOf Window_Message
   * @method subWindows
   */
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

  /**
   * @memberOf Window_Message
   * @method updatePlacement
   */
  var alias_Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
  Window_Message.prototype.updatePlacement = function() {
      alias_Window_Message_updatePlacement.call(this);
      if(this._nameWindow.isOpen() || this.areSettingsChanged()) {
        this.updateNameWindow();
      }
  };

   /**
   * @memberOf Window_Message
   * @method convertEscapeCharacters
   * @param text {String}
   * @return text {String}
   */
  var alias_Window_Message_convertEscapeCharacters = Window_Message.prototype.convertEscapeCharacters;
  Window_Message.prototype.convertEscapeCharacters = function(text) {
      text = alias_Window_Message_convertEscapeCharacters.call(this, text);
      text = text.replace(/\x1b名字<(.+?)>/gi, function() {
          this._nameWindow.drawName(arguments[1]);
          return '';
      }.bind(this));
      text = text.replace(/\x1b对话框\[(\d+|-\d+)\]/gi, function() {
          $gameMessage.setBalloon(Number(arguments[1] || -2));
          return '';
      }.bind(this));
      text = text.replace(/\x1b对齐\[(\d+)]/gi, function() {
          $gameMessage.setAlign(Number(arguments[1] || 0));
          return '';
      }.bind(this));
      return text;
  };

   /**
   * @memberOf Window_Message
   * @method terminateMessage
   */
  var alias_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() {
      this._nameWindow.close();
      alias_Window_Message_terminateMessage.call(this);
  };

   /**
   * @memberOf Window_Message
   * @method setHeight
   * @param n {Number}
   */
  Window_Message.prototype.setHeight = function(n) {
    this.contents.clear();
    $gameMessage.setMaxLine(n);
    this.height = this.fittingHeight(n);
    this.createContents();
    this.updatePlacement();
    this.updateNameWindow();
  };

   /**
   * @memberOf Window_Message
   * @methods updateNameWindow
   */
  Window_Message.prototype.updateNameWindow = function() {
      var self = this;
      this._nameWindow.x = this.x + this.newLineX() + RS.__nameWindowX;
      if($gameMessage.positionType() === 0 && $gameMessage.getBalloon() === -2) {
        this._nameWindow.y = 0;
        this.y = this._nameWindow.height + RS.__nameWindowY;
      } else {
        this._nameWindow.y = self.y - this._nameWindow.height - RS.__nameWindowY;
      }
  };

   /**
   * @memberOf Window_Message
   * @constructor Window_Message
   */
  var alias_Window_Message_initialize = Window_Message.prototype.initialize;
  Window_Message.prototype.initialize = function() {
    alias_Window_Message_initialize.call(this);
    $gameTemp.setMSHeightFunc(this.setHeight.bind(this));
    this.setHeight(RS.__numVisibleRows);
    this.createNewContents();
  };

  /**
   * @memberOf Window_Message
   * @method needsNewPage
   * @param textState {textState}
   */
  Window_Message.prototype.needsNewPage = function(textState) {
      return (!this.isEndOfText(textState) &&
              textState.y + textState.height > this.contentsHeight());
  };

  /**
   * @memberOf Window_Message
   * @method createNewContents
   * @return sprite {Sprite}
   */
  Window_Message.prototype.createNewContents = function() {
    this._newContents = new Sprite();
    this._newContents.x = 0;
    this._newContents.y = 0;
    this.addChild(this._newContents);
    return this._newContents;
  };

  /**
   * @memberOf Window_Message
   * @method removeNewContents
   */
  Window_Message.prototype.removeNewContents = function() {
    if(this._newContents) {
      this.removeChild(this._newContents);
    }
  };

  /**
   * @memberOf Window_Message
   * @method newLineX
   * @return {Number}
   */
  Window_Message.prototype.newLineX = function() {
      if(/^Big_/i.exec( $gameMessage.faceName() ) ) {
        return ($gameMessage.faceIndex() > 0) ? 0 : RS.__textStartX;
      } else {
        return (($gameMessage.faceName()) ? RS.__faceStartOriginX : 0);
      }
  };

  /**
   * @memberOf Window_Message
   * @method setBigFace
   * @param faceName {String}
   */
  Window_Message.prototype.drawBigFace = function(faceName) {
      this._newContents.bitmap = ImageManager.loadFace(faceName);
      this._newContents.y = (Graphics.boxHeight - this._faceBitmap.height) - this.y + RS.__faceOY;

      if($gameMessage.faceIndex() > 0) {
          this._newContents.x = (Graphics.boxWidth - this._faceBitmap.width) - this.x + RS.__faceOX;
      } else {
          this._newContents.x = this.x + RS.__faceOX;
      }

  };

  /**
   * @memberOf Window_Message
   * @method drawMessageFace
   */
  Window_Message.prototype.drawMessageFace = function() {
      if(/^Big_/i.exec( $gameMessage.faceName() ) ) {
        this.drawBigFace($gameMessage.faceName());
      } else {
        this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), 0, 0);
      }
  };

  /**
   * @memberOf Window_Message
   * @method newPage
   * @param textState {textState}
   */
  var alias_Window_Message_newPage = Window_Message.prototype.newPage;
  Window_Message.prototype.newPage = function(textState) {

      if(this.parent && RS.__faceSide) {
        this.setChildIndex(this._newContents, 0);
      }

      if(this._newContents.bitmap) { this._newContents.bitmap = null; }
      this.openBalloon($gameMessage.getBalloon());
      alias_Window_Message_newPage.call(this, textState);
  };

  /**
   * @memberOf Window_Message
   * @method startMessage
   */
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

  /**
   * @memberOf Window_Message
   * @method openBalloon
   * @param sign {Number}
   */
  Window_Message.prototype.openBalloon = function(sign) {

    if(sign === -2) {
      this.resizeMessageSystem();
      return;
    }

    this.setupOwner(sign);
    this.updateBalloonPosition();
  };

  /**
   * @memberOf Window_Message
   * @method resizeMessageSystem
   */
  Window_Message.prototype.resizeMessageSystem = function() {

      var n = $gameMessage.positionType();

      this.x = 0;
      this.y = n * (Graphics.boxHeight - this.windowHeight()) / 2;
      this.width = this.windowWidth();
      this.height = this.windowHeight();

      $gameMap.setMsgOwner($gamePlayer);

  };

  /**
   * @memberOf Window_Message
   * @method textProcessing
   * @param text {String}
   */
  Window_Message.prototype.textProcessing = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/(?:\x1bV|\x1b变量)\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/(?:\x1bV|\x1b变量)\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/(?:\x1bN|\x1b角色)\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/(?:\x1bP|\x1b队伍成员)\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b数\[(\d+)\]/gi, function() {
        return arguments[1].toComma();
    }.bind(this));
    text = text.replace(/(?:\x1bG|\x1b金币)/gi, TextManager.currencyUnit);
    text = text.replace(/\x1b对话框\[(\d+)\]/gi, '');
    text = text.replace(/\x1b名字\[(.+?)\]/gi, '');
    text = text.replace(/\x1b对齐\[(\d+)]/gi, '');
    text = text.replace(/(?:\x1bI|\x1b图标)\[(\d+)\]/g,'');
    text = text.replace(/(?:\x1bC|\x1b色)\[(.+?)\]/gi,'');
    text = text.replace(/(?:\x1b{|\x1b增大)/gi, '');
    text = text.replace(/(?:\x1b}|\x1b减少)/gi, '');
    text = text.replace(/\x1b速度\[(\d+)\]/gi, '');
    text = text.replace(/\x1b大小\[(\d+)\]/gi, '');
    text = text.replace(/\x1b轮廓颜色\[(.+?)\]/gi, '');
    text = text.replace(/\x1b轮廓宽度\[(\d+)\]/gi, '');
    text = text.replace(/\x1b缩进\[(\d+)\]/gi, '');
    text = text.replace(/\x1b加粗!/gi, '');
    text = text.replace(/\x1b倾斜!/gi, '');
    text = text.replace(/\x1b渐变颜色<(.+)>/gi, '');
    return text;
  };

  /**
   * @memberOf Window_Message
   * 2016.03.01 - 말풍선 모드 페이스칩 대응
   * @method calcBalloonRect
   * @param text {String}
   */
  Window_Message.prototype.calcBalloonRect = function(text) {
      var temp = text;
      var tempText = this.textProcessing(temp);
      tempText = tempText.split(/[\r\n]+/);
      tempText = tempText.sort(function(a, b) {
          return b.length - a.length;
      }.bind(this));
      var height = tempText.length * this.lineHeight() + this.standardPadding() * 2;
      this._bWidth = this.textWidth(tempText[0]) + RS.__STD_PADDING * 2 || RS.__WIDTH;
      if($gameMessage.faceName() !== '') {
        var min = this.fittingHeight(4);
        this._bWidth += this.newLineX() + this.standardPadding() * 2;
        if(height < min) height = height.clamp(min, height + (min - height));
      }
      this._bHeight = height;
  };

  /**
   * @memberOf Window_Message
   * @method updateBalloonPosition
   */
  Window_Message.prototype.updateBalloonPosition = function() {

      // -2 라면 이 함수를 처리하지 않습니다.
      if($gameMessage.getBalloon() === -2) {
          this.updatePlacement();
          return;
      };

      // 말풍선 소유자의 화면 좌표
      var mx = $gameMap.getMsgOwner().screenX();
      var my = $gameMap.getMsgOwner().screenY();

      // 말풍선의 폭과 높이 범위 제한
      this._bWidth = this._bWidth.clamp(RS.__WIDTH, Graphics.boxWidth - RS.__WIDTH);
      this._bHeight = this._bHeight.clamp(RS.__HEIGHT, Graphics.boxHeight - RS.__HEIGHT);

      // 말풍선 위치 및 크기 설정 (화면 내에 가두지 않습니다)
      this.x =  mx - (this._bWidth / 2);
      this.y =  my - this._bHeight - $gameMap.tileHeight();
      this.width = this._bWidth;
      this.height = this._bHeight;

      // 1프레임 대기
      this.startWait(1);

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

  /**
   * @class Game_Interpreter
   */

  /**
   * Show Text
   * @memberOf Game_Interpreter
   * @method command101
   */
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

  /**
   * @memberOf Game_Interpreter
   * @method multiLineAddMessage
   */
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

  /**
   * @memberOf Game_Interpreter
   * @method initLineHeight
   */
  Game_Interpreter.prototype.initLineHeight = function() {
      this._lineHeight = 0;
  };

  /**
   * @memberOf Game_Interpreter
   * @method isMultiLine
   */
  Game_Interpreter.prototype.isMultiLine = function() {
      return $gameMessage.getMaxLine() > 4;
  };

  /**
   * @memberOf Game_Interpreter
   * @method addLineHeight
   */
  Game_Interpreter.prototype.addLineHeight = function() {
      this._lineHeight++;
      if(this.nextEventCode() === 101) {
        this._index++;
      }
  };


  /**
   * @class RS.Window_Name
   * @constructor
   */
  RS.Window_Name.prototype = Object.create(Window_Base.prototype);
  RS.Window_Name.prototype.constructor = RS.Window_Name;

  /**
   * @memberOf RS.Window_Name
   * @method initialize
   */
  RS.Window_Name.prototype.initialize = function() {
      var width = this.windowWidth();
      var height = this.windowHeight();
      Window_Base.prototype.initialize.call(this, 0, 0, width, height);
      this.openness = 0;
  };

  /**
   * @memberOf RS.Window_Name
   * @method windowWidth
   * @return {Number}
   */
  RS.Window_Name.prototype.windowWidth = function() {
      return 140;
  };

  /**
   * @memberOf RS.Window_Name
   * @method windowHeight
   * @return {Number}
   */
  RS.Window_Name.prototype.windowHeight = function() {
      return this.fittingHeight(1);
  };

  /**
   * @memberOf RS.Window_Name
   * @method standardPadding
   * @return {Number}
   */
  RS.Window_Name.prototype.standardPadding = function() {
    return 18;
  };

  /**
   * 정확한 폭을 계산합니다
   * @memberOf RS.Window_Name
   * @method getWidth
   * @param text {String}
   */
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

  /**
   * @memberOf RS.Window_Name
   * @method textProcessing
   * @param text {String}
   * @return {String}
   */
  RS.Window_Name.prototype.textProcessing = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/(?:\x1bC|\x1b色)\[(.+?)\]/gi,function(i) {
      this.changeTextColor(Color.gmColor(RegExp.$1));
      return "";
    }.bind(this));
    text = text.replace(/(?:\x1bV|\x1b变量)\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/(?:\x1bV|\x1b变量)\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/(?:\x1bN|\x1b角色)\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/(?:\x1bP|\x1b队伍成员)\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1b数\[(\d+)\]/gi, function() {
        return arguments[1].toComma();
    }.bind(this));
    text = text.replace(/(?:\x1bG|\x1b金币)/gi, TextManager.currencyUnit);
    text = text.replace(/\x1b对话框\[(\d+)\]/gi, '');
    text = text.replace(/\x1b名字\[(.+?)\]/gi, '');
    text = text.replace(/\x1b对齐\[(\d+)]/gi, '');
    text = text.replace(/(?:\x1bI|\x1b图标)\[(\d+)\]/g,'');
    text = text.replace(/(?:\x1b{|\x1b增大)/gi, '');
    text = text.replace(/(?:\x1b}|\x1b减少)/gi, '');
    text = text.replace(/\x1b速度\[(\d+)\]/gi, '');
    text = text.replace(/\x1b大小\[(\d+)\]/gi, '');
    text = text.replace(/\x1b轮廓颜色\[(.+?)\]/gi, '');
    text = text.replace(/\x1b轮廓宽度\[(\d+)\]/gi, '');
    text = text.replace(/\x1b缩进\[(\d+)\]/gi, '');
    text = text.replace(/\x1b加粗!/gi, '');
    text = text.replace(/\x1b倾斜!/gi, '');
    text = text.replace(/\x1b渐变颜色<(.+)>/gi, '');
    return text;
  };

  /**
   * @memberOf RS.Window_Name
   * @method refresh
   */
  RS.Window_Name.prototype.refresh = function() {
    this.contents.clear();
    this.createContents();
    this.contents.fontSize = RS.__fontSize;
    this.text = this.convertEscapeCharacters(this.text);
    this.text = this.textProcessing(this.text);
    this.drawText(this.text, 0, 0, this.width, 'left');
  };

  /**
   * @memberOf RS.Window_Name
   * @method drawName
   */
  RS.Window_Name.prototype.drawName = function(text) {
    this.text = text;
    this.width = this.windowWidth();
    this.contents.fontSize = RS.__fontSize;
    this.getWidth(this.text);
    this.open();
  };

  /**
   * @memberOf RS.Window_Name
   * @method open
   */
  RS.Window_Name.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
  };

  /**
   * @memberOf RS.Window_Name
   * @method close
   */
  RS.Window_Name.prototype.close = function() {
    Window_Base.prototype.close.call(this);
    this.changeTextColor(this.textColor(0));
  };

  /**
   * @class Game_Temp
   */

  /**
   * @memberOf Game_Temp
   * @method setMSHeightFunc
   * @param func {Function}
   */
  Game_Temp.prototype.setMSHeightFunc = function(func) {
     this._callMSHeightFunc = func;
  };

  /**
   * @memberOf Game_Temp
   * @method setMaxLine
   * @param n {Number}
   */
  Game_Temp.prototype.setMaxLine = function(n) {
    this._callMSHeightFunc(n);
  }

  /**
   * @class Game_Map
   */

  /**
   * @memberOf Game_Map
   * @method initialize
   */
  var alias_Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function() {
    alias_Game_Map_initialize.call(this);
    this._msgOwner = $gamePlayer;
    this._msgEvent = 0;
  };

  /**
   * @memberOf Game_Map
   * @method getMsgOwner
   * @return {Game_Event | Game_Player}
   */
  Game_Map.prototype.getMsgOwner = function() {
    return this._msgOwner;
  };

  /**
   * @memberOf Game_Map
   * @method setMsgOwner
   * @param o {Game_Event | Game_Player}
   */
  Game_Map.prototype.setMsgOwner = function(o) {
      this._msgOwner = o;
  };

  /**
   * @memberOf Game_Map
   * @method getMsgEvent
   * @return {Game_Event}
   */
  Game_Map.prototype.getMsgEvent = function() {
    return this._msgEvent;
  };

  /**
   * @memberOf Game_Map
   * @method setMsgEvent
   * @param ev {Game_Event}
   */
  Game_Map.prototype.setMsgEvent = function(ev) {
      this._msgEvent = ev;
  };

//===============================================================================
// 정렬을 위한 추가 함수들입니다.
//===============================================================================

  /**
   * @class Window_Message
   */

   /**
    * 가운데 정렬 여부를 체크합니다.
    * @method startMessage
    */
   var alias_Window_Message_startMessage_setAlignCenter = Window_Message.prototype.startMessage;
   Window_Message.prototype.startMessage = function() {
     alias_Window_Message_startMessage_setAlignCenter.call(this);

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

   /**
    * @method calcBalloonRect
    * @param text {String}
    * @return this._textWidth {Number}
    */
   Window_Message.prototype.calcTextWidth = function(text) {
       this.__textWidth = 0;
       var tempText = text;

       tempText = tempText.split(/[\r\n]+/);

       // 정렬을 하면 긴 문장을 찾게 됩니다
       tempText = tempText.sort(function(a, b) {
           return b.length - a.length;
       }.bind(this));

       // 폭이 계산됩니다
       this.getTextWidth(tempText[0]);

       return this.__textWidth;
   };

   /**
    * 이 함수는 모든 텍스트 코드를 제외한 텍스트의 실질적인 폭을 계산합니다.
    * @memberOf Window_Message
    * @method getTextWidth
    * @param text {String}
    * @return text {String}
    */
   Window_Message.prototype.getTextWidth = function(text) {
     text = text.replace(/\\/g, '\x1b');
     text = text.replace(/\x1b\x1b/g, '\\');
     text = text.replace(/(?:\x1bV|\x1b变量)\[(\d+)\]/gi, function() {
         return $gameVariables.value(parseInt(arguments[1]));
     }.bind(this));
     text = text.replace(/(?:\x1bV|\x1b变量)\[(\d+)\]/gi, function() {
         return $gameVariables.value(parseInt(arguments[1]));
     }.bind(this));
     text = text.replace(/(?:\x1bN|\x1b角色)\[(\d+)\]/gi, function() {
         return this.actorName(parseInt(arguments[1]));
     }.bind(this));
     text = text.replace(/(?:\x1bP|\x1b队伍成员)\[(\d+)\]/gi, function() {
         return this.partyMemberName(parseInt(arguments[1]));
     }.bind(this));
     text = text.replace(/\x1b数\[(\d+)\]/gi, function() {
         return arguments[1].toComma();
     }.bind(this));
     text = text.replace(/(?:\x1bG|\x1b金币)/gi, TextManager.currencyUnit);
     text = text.replace(/\x1b对话框\[(\d+)\]/gi, '');
     text = text.replace(/\x1b名字\[(.+?)\]/gi, '');
     text = text.replace(/\x1b对齐\[(\d+)]/gi, '');
     text = text.replace(/(?:\x1bI|\x1b图标)\[(\d+)\]/g,function() {
       this.__textWidth += Window_Base._iconWidth;
       return '';
     }.bind(this));
     text = text.replace(/(?:\x1bC|\x1b色)\[(.+?)\]/gi,'');
     text = text.replace(/(?:\x1b{|\x1b增大)/gi, '');
     text = text.replace(/(?:\x1b}|\x1b减少)/gi, '');
     text = text.replace(/\x1b速度\[(\d+)\]/gi, '');
     text = text.replace(/\x1b大小\[(\d+)\]/gi, '');
     text = text.replace(/\x1b轮廓颜色\[(.+?)\]/gi, '');
     text = text.replace(/\x1b轮廓宽度\[(\d+)\]/gi, '');
     text = text.replace(/\x1b缩进\[(\d+)\]/gi, '');
     text = text.replace(/\x1b加粗!/gi, '');
     text = text.replace(/\x1b倾斜!/gi, '');
     text = text.replace(/\x1b渐变颜色<(.+)>/gi, '');
     this.__textWidth += (this.textWidth(text) * 2);
     return text;
   };

   /**
    *
    * @method processNewLine
    * @param textState {Object}
    */
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

   }

   /**
    * 텍스트를 가운데로 정렬하는 함수입니다.
    * @method setAlignCenter
    * @param textState {Object}
    */
   Window_Message.prototype.setAlignCenter = function(textState) {
     textState.tx = this.calcTextWidth(textState.text);
     textState.x = ( this.newLineX() + this.contentsWidth() ) / 2 - textState.tx / 4;
     textState.left = textState.x;
   }

   /**
    * 텍스트를 오른쪽으로 정렬하는 함수입니다.
    * @method setAlignRight
    * @param textState {Object}
    */
   Window_Message.prototype.setAlignRight = function(textState) {
     textState.tx = this.calcTextWidth(textState.text);
     textState.x = ( this.contentsWidth() ) - textState.tx / 2;
     textState.left = textState.x;
   }

   /**
    * String.prototype.toArray
    */
   String.prototype.toArray = function(){
       return this.split("");
   }

   /**
    * String.prototype.reverse
    */
   String.prototype.reverse = function(){
       return this.toArray().reverse().join("");
   }

   /**
    * String.prototype.reversed (mozilla)
    */
   String.prototype.reversed = function() {
       var r = "";
       for (var i = this.length - 1; i >= 0; i--) {
           r += this[i];
       }
       return r;
   }

   /**
    * String.prototype.to_comma
    */
   String.prototype.toComma = function(){
       return this.reverse().match(/.{1,3}/g).join(",").reverse();
   }



   //===============================================================================
   // Plugin Commands
   //===============================================================================
   var alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
   Game_Interpreter.prototype.pluginCommand = function(command, args) {
       alias_pluginCommand.call(this, command, args);

       if(command === "RSM") {
         switch (args[0]) {
         //-------------------------------------------------------------------------
         case 'textSpeed':
           RS.__textSpeed = Number(args[1] || 0);
           break;
         //-------------------------------------------------------------------------
         case 'fontSize':
           RS.__fontSize = Number(args[1] || 28);
           break;
         //-------------------------------------------------------------------------
         case 'minFontSize':
           RS.__minFontSize = Number(args[1] || 24);
           break;
         //-------------------------------------------------------------------------
         case 'maxFontSize':
           RS.__maxFontSize = Number(args[1] || 96);
           break;
         //-------------------------------------------------------------------------
         case 'gradient':
           RS.__gradientColor1 = args[1] || Color.gmColor('通常');
           RS.__gradientColor2 = args[2] || Color.gmColor('通常');
           RS.__gradientColor3 = args[3] || Color.gmColor('通常');
           break;
         //-------------------------------------------------------------------------
         case 'line':
           $gameTemp.setMaxLine(Number(args[1] || 4));
           break;
         //-------------------------------------------------------------------------
         case 'textStartX':
           RS.__textStartX = Number(args[1] || 192);
           break;
         //-------------------------------------------------------------------------
         case 'name':
           switch (args[1].toLowerCase()) {
             case 'x':
               RS.__nameWindowX = Number(args[2] || 0);
               break;
             case 'y':
               RS.__nameWindowX = Number(args[2] || 0);
               break;
             case 'padding':
               RS.__nameWindowStdPadding = Number(args[2] || 18);
               break;
             default:
            }
            break;
         //-------------------------------------------------------------------------
          case 'faceOX':
            RS.__faceOX = Number(args[1] || 0);
            break;
         //-------------------------------------------------------------------------
          case 'faceOY':
            RS.__faceOY = Number(args[1] || 0);
            break;
         //-------------------------------------------------------------------------
          case 'faceZ':
            if(Number(args[1] || 0) === -1) {
              RS.__faceSide = true;
            } else {
              RS.__faceSide = false;
            }
            break;
          // End main switch
         }
         // End if
       }
       // End Function
   };

})();
