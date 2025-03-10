//================================================================
// RS_Hangul.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2018 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin allows you to type the Korean. <RS_Hangul>
 * @author biud436
 * @help
 * This plugin combines the korean alphabet so you can type the Korean, without Input Method Editor.
 *
 * Q. What is Hangul?
 * Hangul is the the Korean alphabet and it has been used to write the Korean language
 * since its creation in the 15th century by King Sejong the Great.
 *
 * See more information : https://en.wikipedia.org/wiki/Hangul
 *
 * Q. How do we use this plugin?
 * To use this plugin, you can require plugin called 'RS_MessageSystem.js'
 * its plugin provides extra text codes for Korean so I've need to it.
 *
 * There are 19 consonants and 21 vowels and 28 final letters used in the modern alphabet.
 *
 * Initial Consonants : ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ
 * Vowels : ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ
 * Final Consonants : (none)ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ
 * ("none" means there is no final letter)
 *
 * = Initial Consonants + Vowels + Final Consonants
 * = ㄷ + ㅏ + ㄺ
 * = 닭
 *
 */
/*:ko
 * @target MV
 * @plugindesc 한글 조합 입력 기능을 제공합니다. <RS_Hangul>
 * @author biud436
 * @help
 * 한글 메시지 시스템이 있어야 정상적인 구동이 가능합니다.
 * =================================================================
 * 변동 사항
 * =================================================================
 * 2018.07.18 (v1.0.0) - First Release.
 * 2018.07.27 (v1.0.1) - Fixed the issue that couldn't type the character called '~' (Tilde)
 * 2019.06.20 (v1.0.3) :
 * - 띄어쓰기가 매끄럽지 않았던 문제를 수정했습니다.
 * - 백스페이스 시 조합 중이면 자모음 단위로 삭제하며, 조합이 완료되었을 땐 한 글자씩 삭제합니다.
 * 2019.07.13 (v1.0.5) :
 * - 문자열 인스턴스에서 indexOf를 사용하였을 때 빈 문자열("")을 인자로 넘기면 0을 반환합니다.
 * 하지만 원하는 반환 값은 -1이 되어야 합니다. 따라서 문자열을 문자열 배열로 변경하였습니다.
 * - 완성된 조합 문자열이 반환될 때, 남아있는 초성, 중성, 종성이 있을 수 있어 이에 대한 처리를 추가하였습니다.
 */

function HangulIME(...args) {
  this.initialize.call(this, ...args);
}

(() => {
  const RS = window.RS || {};
  RS.Hangul = RS.Hangul || {};
  RS.Keyboard = RS.Keyboard || {};

  // 한글 음절표 19 * 21 * (27 + 1) = 11172;

  // 초성 19자
  const chosung = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  // 중성 21자
  const joongsung = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    'ㅘ',
    'ㅙ',
    'ㅚ',
    'ㅛ',
    'ㅜ',
    'ㅝ',
    'ㅞ',
    'ㅟ',
    'ㅠ',
    'ㅡ',
    'ㅢ',
    'ㅣ',
  ];
  // 종성 28자 (공백 포함)
  const jongsung = [
    ' ',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];

  HangulIME.prototype.constructor = HangulIME;

  HangulIME.prototype.initialize = function () {
    this.initMembers();
  };

  HangulIME.STEP11 = 1;
  HangulIME.STEP12 = 2;
  HangulIME.STEP21 = 3;
  HangulIME.STEP22 = 4;
  HangulIME.STEP31 = 5;
  HangulIME.STEP32 = 6;
  HangulIME.STEP42 = 7;
  HangulIME.STEP43 = 8;

  HangulIME.prototype.initMembers = function () {
    this._composing = false; // 조합중
    this._messTexts = null; // 조합전 텍스트
    this._hanTexts = {
      first: -1,
      middle: -1,
      final: -1,
    }; // 조합후 텍스트
    this._retTexts = ''; // 조합후 텍스트
    this._index = 0;
    this._lastIndex = 0;
    this._currentStep = HangulIME.STEP11;
  };

  HangulIME.prototype.clear = function () {
    this.initMembers();
  };

  // 1.0. 키가 입력되면 커서가 조합 중으로 변경된다 (얇은 커서가 왼쪽 굵은 커서가 오른쪽)
  HangulIME.prototype.startWithComposite = function (texts, func) {
    this.initMembers();
    this._messTexts = this.decompress(texts);

    // 인덱스 0부터 시작
    this._index = 0;

    let depth = 0;

    for (;;) {
      // 문장이 너무 길어지는 것 방지
      if (depth > 1000) {
        func(this._retTexts);
        break;
      }

      // 조합 완료되었으면 끝낸다.
      if (this._index > this._messTexts.length) {
        func(this._retTexts);
        break;
      }

      switch (this._currentStep) {
        case HangulIME.STEP11: // 초성1 처리(겹받침 및 겹모음 처리)
          this.startStep11();
          break;
        case HangulIME.STEP12: // 초성 2 처리
          this.startStep12();
          break;
        case HangulIME.STEP21: // 중성 1 처리 (겹홀소리 처리)
          this.startStep21();
          break;
        case HangulIME.STEP22: // 중성 2 처리
          this.startStep22();
          break;
        case HangulIME.STEP31: // 종성 1 처리 (겹받침 처리)
          this.startStep31();
          break;
        case HangulIME.STEP32: // 종성 2 처리
          this.startStep32();
          break;
        case HangulIME.STEP42: // 완성형 글자를 만든다.
          this.startStep42();
          break;
        case HangulIME.STEP43: // 특수 문자, 영어 처리
          this.startStep43();
          break;
        default:
          break;
      }

      depth++;
    }
  };

  // 1.1. 초성이 종성으로 대체되고, 겹받침이 되었나? (ㄱㄴㄹㅂ)
  // = true이면 겹받침 처리 후 4.2로, false면 1.2로
  HangulIME.prototype.startStep11 = function () {
    const currentChar = this._messTexts[this._index];
    const nextChar = this._messTexts[this._index + 1];
    const lastChar = this._messTexts[this._index + 2];

    // 다음 글자가 없다면 인덱스를 늘린다.
    if (!currentChar) {
      this._index++;
      return;
    }

    // 겹받침 또는 겹모음인가?
    if (
      // eslint-disable-next-line no-cond-assign
      this.processDoubleFinalConsonant(currentChar, nextChar, lastChar)
    ) {
      this._currentStep = HangulIME.STEP42;
    } else {
      // 그외 글자라면
      this._currentStep = HangulIME.STEP12;
    }
  };

  HangulIME.prototype.isHangul = function (text) {
    // U+1100 ~ U+11FF 한글 자모 256
    // U+AC00 ~ U+D7AF 한글 글자 마디 11,184
    // https://d2.naver.com/helloworld/76650
    const pattern = /[\u1100-\u11FF\uAC00-\uD7AF]/;
    return pattern.test(text);
  };

  HangulIME.prototype.isWansungHangul = function (text) {
    // U+AC00 ~ U+D7AF 한글 글자 마디
    const pattern = /[\uAC00-\uD7AF]/;
    return pattern.test(text);
  };

  /**
   * 한글 자모 분리
   * @param {String}} text
   * @param {Boolean} isNumber
   */
  HangulIME.prototype.decompress = function (texts) {
    const ret = [];

    for (let i = 0; i < texts.length; i++) {
      const c = texts[i];
      if (!this.isHangul(c)) {
        ret.push(c);
        // eslint-disable-next-line no-continue
        continue;
      }

      const code = c.charCodeAt();
      const offset = code - 0xac00;

      const first = Math.floor(offset / 588);
      const middle = Math.floor((offset % 588) / 28);
      const final = Math.floor(offset % 28);

      ret.push(chosung[first]);
      ret.push(joongsung[middle]);
      ret.push(jongsung[final]);
    }

    return ret;
  };

  // 1.2. 쌍자음 또는 1.1이 아닌 정상 범주라면 정상 추가한다.
  // = true이면 글자 처리 후 2-1로 이동, false면 4.3으로 이동.
  HangulIME.prototype.startStep12 = function () {
    const c = this._messTexts[this._index];
    const idx = this.isFirst(c);

    // 초성이 맞다면 중성 단계로 진입한다.
    if (idx >= 0) {
      this._composing = true; // 조합 중으로 변경한다.
      // 초성을 설정한다.
      this.setFirst(idx);
      // 다음 단계로
      this._index++;
      this._currentStep = HangulIME.STEP21;
      return true;
    }

    // 초성이 아니라면, 다른 글자이므로 그냥 추가한다.
    if (this.isMiddle(c) >= 0) {
      // 중성이면 바로 중성 단계로
      this._currentStep = HangulIME.STEP21;
      return true;
    }

    // 중성이 아니면 영어나 특수 문자, 공백이므로 그냥 추가한다.
    this._composing = false;
    this._currentStep = HangulIME.STEP43;
    return false;
  };

  // 2.1. 중성이 겹모음이 될 가능성이 있나? ㅗㅜㅡ인가?
  // = true이면 겹모음 처리 후 3.1로, false면 2.2로
  HangulIME.prototype.startStep21 = function () {
    const currentChar = this._messTexts[this._index];
    const nextChar = this._messTexts[this._index + 1];
    const lastChar = this._messTexts[this._index + 2];

    // 겹홀소리 중 조합 가능하다면 처리 후 종성 단계로
    if (this.processDoubleVowel(currentChar, nextChar, lastChar)) {
      this._currentStep = HangulIME.STEP31;
      return true;
    }

    // 홀소리, 조합되지 않는 겹홀소리라면 중성 처리로
    this._currentStep = HangulIME.STEP22;
    return false;
  };

  // 2.2. 중성이 2.1에 위배되지 않고 정상 범주인가?
  // = true이면 글자 처리 후 3.1로, false면 4.3으로 이동
  HangulIME.prototype.startStep22 = function () {
    const c = this._messTexts[this._index];
    const idx = this.isMiddle(c);

    // 중성이 맞다면 종성 단계로 진입한다.
    if (idx >= 0) {
      // 중성을 설정한다.
      this.setMiddle(idx);
      // 다음 단계로
      this._currentStep = HangulIME.STEP31;
      this._index++;
      return true;
    }

    // 중성이 아니라면, 다른 글자이므로 그냥 추가한다.
    this._index--; // 중성이 없기 때문에 인덱스를 줄여 현재 인덱스로 설정한다.
    // this._composing = false;
    this._currentStep = HangulIME.STEP43;
    return false;
  };

  // 3.1. 종성이 겹받침이 될 수 있나? (ㄱㄴㄹㅂ)
  // = true이면 겹받침 처리 후 4.2로, false면 3.2로
  HangulIME.prototype.startStep31 = function () {
    const currentChar = this._messTexts[this._index];
    const nextChar = this._messTexts[this._index + 1];
    const lastChar = this._messTexts[this._index + 2];

    // 공백으로 초기화한다.
    if (this._hanTexts.final <= 0) {
      this.setFinal(0);
    }

    // 종성이 겹받침이 될 수 있나? 가능하다면 겹받침 처리
    if (this.processDoubleFinalConsonant(currentChar, nextChar, lastChar)) {
      this._composing = false;
      this._currentStep = HangulIME.STEP42;
    } else {
      // 조합이 불가능하다면 일반 종성 처리로

      if (this.isFirst(currentChar) >= 0 && this.isMiddle(nextChar) >= 0) {
        this._composing = false;
        this._currentStep = HangulIME.STEP42;
        return false;
      }

      // 종성이 없으면 조합을 마친다.
      if (currentChar === undefined) {
        this._currentStep = HangulIME.STEP42;
        return false;
      }

      this._currentStep = HangulIME.STEP32;
    }

    return true;
  };

  // 3.2. 종성이 공백 또는 정상 범주인가?
  // = true이면 4.2로, false는 4.3으로 이동
  HangulIME.prototype.startStep32 = function () {
    const c = this._messTexts[this._index];
    const idx = this.isFinal(c);

    // 종성이 맞다면 종성 단계로 진입한다.
    if (idx >= 0) {
      this.setFinal(idx);
      // 다음 단계로
      this._composing = false;
      this._currentStep = HangulIME.STEP42;
      this._index++;
      return true;
    }

    // 중성이 아니라면, 다른 글자이므로 그냥 추가한다.
    // 종성이 없으므로 인덱스를 줄여 현재 인덱스로 맞춘다.
    // 현재까지 조합된 것을 완료한다.
    // this.makeWansung(c.first, c.middle, c.final);
    this._composing = false;
    this._currentStep = HangulIME.STEP42;
    return false;
  };

  // 4.2. 마지막 글자를 추가하고 조합 완료 (커서가 굵은 것만 남는다)
  HangulIME.prototype.startStep42 = function () {
    const c = this._hanTexts;
    this._retTexts += this.makeWansung(c.first, c.middle, c.final);
    this._lastIndex = this._index;
    this._hanTexts.first = -1;
    this._hanTexts.middle = -1;
    this._hanTexts.final = -1;
    this._currentStep = HangulIME.STEP11;
    return true;
  };

  // 4.3. 조합 완료 후 글자 추가 (커서가 굵은 것만 남는다), 영어나 특수 문자, 숫자 등 한글 범주(인덱스)가 아니라면
  HangulIME.prototype.startStep43 = function () {
    this._retTexts += this._messTexts[this._index];
    this._currentStep = HangulIME.STEP11;
    this._index++;
    return true;
  };

  /**
   * 초성 인덱스
   * @param {Number} index
   */
  HangulIME.prototype.setFirst = function (index) {
    this._hanTexts.first = index;
  };

  /**
   * 중성 인덱스
   * @param {Number} index
   */
  HangulIME.prototype.setMiddle = function (index) {
    this._hanTexts.middle = index;
  };

  /**
   * 종성 인덱스
   * @param {Number} index
   */
  HangulIME.prototype.setFinal = function (index) {
    this._hanTexts.final = index;
  };

  HangulIME.prototype.isFirst = function (text) {
    const ret = chosung.indexOf(text);
    return ret >= 0 ? ret : -1;
  };

  HangulIME.prototype.isMiddle = function (text) {
    const ret = joongsung.indexOf(text);
    return ret >= 0 ? ret : -1;
  };

  HangulIME.prototype.isFinal = function (text) {
    const ret = jongsung.indexOf(text);
    return ret >= 0 ? ret : -1;
  };

  HangulIME.prototype.isComposite = function () {
    return this._composing === true;
  };

  HangulIME.prototype.isSpecialCharacter = function (text) {
    // eslint-disable-next-line
    return /[~`!#$%\^&*+=\-\[\]\\';,\./{}|\\":<>\?]/g.test(text);
  };

  // 겹받침 처리 후 리턴 위치로
  HangulIME.prototype.processDoubleFinalConsonant = function (
    currentChar,
    nextChar,
    lastChar
  ) {
    let ret = '';

    if (currentChar === '') {
      return false;
    }

    // 중성인가? 겹모음인가?
    if (this.isMiddle(currentChar) >= 0) {
      this.processDoubleVowel(currentChar, nextChar, lastChar);
      return false;
    }

    // 다음 글자의 다음 글자가 중성이면 빠져나가야 한다.
    if (this.isFirst(nextChar) >= 0 && this.isMiddle(lastChar) >= 0) {
      return false;
    }

    if (currentChar === 'ㄱ' && nextChar === 'ㅅ') {
      ret = 'ㄳ';
    } else if (currentChar === 'ㄴ' && nextChar === 'ㅈ') {
      ret = 'ㄵ';
    } else if (currentChar === 'ㄴ' && nextChar === 'ㅎ') {
      ret = 'ㄶ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㄱ') {
      ret = 'ㄺ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㅁ') {
      ret = 'ㄻ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㅂ') {
      ret = 'ㄼ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㅅ') {
      ret = 'ㄽ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㅌ') {
      ret = 'ㄾ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㅍ') {
      ret = 'ㄿ';
    } else if (currentChar === 'ㄹ' && nextChar === 'ㅎ') {
      ret = 'ㅀ';
    } else if (currentChar === 'ㅂ' && nextChar === 'ㅅ') {
      ret = 'ㅄ';
    }

    if (ret !== '') {
      // 겹받침이 분리된 부분을 제거한다.
      this._index++;
      this._index++;

      // 종성을 설정한다.
      const idx = this.isFinal(ret);
      if (idx >= 0) {
        // 종성인가?
        if (this._currentStep < HangulIME.STEP21) {
          this.setFirst(-1);
          this.setMiddle(-1);
        }
        this.setFinal(idx);
        return true;
      }

      return false;
    }

    return false;
  };

  // 겹모음 처리 후 리턴 위치로
  HangulIME.prototype.processDoubleVowel = function (currentChar, nextChar) {
    // 겹모음으로 조합이 가능한 ㅗㅜㅡ인가?
    const middles = 'ㅗㅜㅡ';

    if (currentChar === undefined || currentChar === '') {
      return false;
    }

    if (middles.indexOf(currentChar) < 0) {
      return false;
    }

    let ret = '';

    if (currentChar === 'ㅗ') {
      if (nextChar === 'ㅏ') ret = 'ㅘ';
      if (nextChar === 'ㅐ') ret = 'ㅙ';
      if (nextChar === 'ㅣ') ret = 'ㅚ';
    } else if (currentChar === 'ㅜ') {
      if (nextChar === 'ㅓ') ret = 'ㅝ';
      if (nextChar === 'ㅔ') ret = 'ㅞ';
      if (nextChar === 'ㅣ') ret = 'ㅟ';
    } else if (currentChar === 'ㅡ') {
      if (nextChar === 'ㅣ') ret = 'ㅢ';
    }

    if (ret !== '') {
      this._index++;
      this._index++;

      const idx = this.isMiddle(ret);

      // 중성인가?
      if (idx >= 0) {
        this.setMiddle(idx); // 중성 설정

        // 초성이 없는 상태라면
        if (this._currentStep < HangulIME.STEP21) {
          this._currentStep = HangulIME.STEP11;
        }

        return true;
      }
    }

    return false;
  };

  HangulIME.prototype.makeWansung = function (first, middle, final) {
    // 초성 글자만 있다면
    if (first >= 0 && middle < 0 && final < 0) {
      return chosung[first];
    }

    // 종성 글자만 있다면
    if (first < 0 && middle < 0 && final > 0) {
      return jongsung[final];
    }

    if (final < 0 || !final) final = 0;

    // 초성, 중성, 종성 OK
    const code = startCode + first * 588 + middle * 28 + final;
    const ret = String.fromCharCode(code);

    return ret;
  };

  RS.Hangul = new HangulIME();
})();

(function () {
  if (!Utils) return;

  //===============================================================
  // Window_Hangul
  //===============================================================

  function Window_Hangul(...args) {
    this.initialize.call(this, ...args);
  }

  Window_Hangul.prototype = Object.create(Window_Base.prototype);
  Window_Hangul.prototype.constructor = Window_Hangul;

  Window_Hangul.prototype.initialize = function () {
    const width = this.windowWidth();
    const height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.refresh();
    RS.Keyboard.valid();
    // Window_Hangul이 제거될 때, 실행되어야 하는 콜백 함수
    this.on(
      'removed',
      function () {
        RS.Keyboard.inValid();
      },
      this
    );
  };

  Window_Hangul.prototype.windowWidth = function () {
    return Math.floor(Graphics.boxWidth);
  };

  Window_Hangul.prototype.windowHeight = function () {
    return this.fittingHeight(1);
  };

  Window_Hangul.prototype.setChatView = function (window) {
    this._chatViewWindow = window;
  };

  Window_Hangul.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (RS.Keyboard.isValid()) {
      $gameSystem.disableMenu();
      this.visible = true;
      if (RS.Keyboard.lastKeyCode() === 13) {
        // Enter가 눌렸나?
        if (Imported.RS_MessageSystem) {
          if ($gameSystem._chatList.length > 10) $gameSystem._chatList.shift();
          $gameMessage.add(`\x1b말풍선[-1]${RS.Keyboard.getTexts()}`);
          $gameSystem._chatList.push(
            `\x1bC[2][일반]\x1bC[0] ${RS.Keyboard.getTexts()}`
          );
          this._chatViewWindow.select($gameSystem._chatList.length - 1);
          this._chatViewWindow.refresh();
        }
        RS.Keyboard.clear();
      }
    } else {
      $gameSystem.enableMenu();
      this.visible = false;
    }
    this.refresh();
  };

  Window_Hangul.prototype.standardFontSize = function () {
    return 24;
  };

  Window_Hangul.prototype.refresh = function () {
    this.contents.clear();
    this.changeTextColor(this.normalColor());
    const text = RS.Keyboard.getTexts();
    const pos = RS.Keyboard.currentCursorPosition();
    const textWidth = this.contents.measureTextWidth(text.slice(0, pos));
    this.drawText(text, this.textPadding(), 0, this.contentsWidth());
    if (Graphics.frameCount % 15 === 0) {
      this.contents.fillRect(
        textWidth + 1,
        0,
        2,
        this.contentsHeight(),
        'white'
      );
    }
  };

  //===============================================================
  // Game_System
  //===============================================================

  const aliasGameSystemInitialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    aliasGameSystemInitialize.call(this);
    this._chatList = [];
  };

  Game_System.prototype.chatList = function () {
    return this._chatList;
  };

  Game_System.prototype.addChat = function (text) {
    if ($gameSystem._chatList) {
      if ($gameSystem._chatList) $gameSystem._chatList.push(text);
    }
  };

  //===============================================================
  // Window_HangulChatView
  //===============================================================

  function Window_HangulChatView(...args) {
    this.initialize.call(this, ...args);
  }

  Window_HangulChatView.prototype = Object.create(Window_Selectable.prototype);
  Window_HangulChatView.prototype.constructor = Window_HangulChatView;

  Window_HangulChatView.prototype.initialize = function () {
    const width = this.windowWidth();
    const height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this._pendingIndex = -1;
    this.refresh();
  };

  Window_HangulChatView.prototype.windowWidth = function () {
    return Math.floor(Graphics.boxWidth / 2);
  };

  Window_HangulChatView.prototype.windowHeight = function () {
    return this.fittingHeight(4);
  };

  Window_HangulChatView.prototype.maxItems = function () {
    return $gameSystem._chatList.length;
  };

  Window_HangulChatView.prototype.standardFontSize = function () {
    return 14;
  };

  Window_HangulChatView.prototype.numVisibleRows = function () {
    return 5;
  };

  Window_HangulChatView.prototype.itemWidth = function () {
    return this.contentsWidth();
  };

  Window_HangulChatView.prototype.itemHeight = function () {
    const innerHeight = this.height - this.padding * 2;
    return Math.floor(innerHeight / this.numVisibleRows());
  };

  Window_HangulChatView.prototype.processCursorMove = function () {};

  Window_HangulChatView.prototype.drawItem = function (index) {
    const rect = this.itemRect(index);
    this.changePaintOpacity(false);
    this.drawTextEx($gameSystem._chatList[index], rect.x, rect.y);
    this.changePaintOpacity(true);
  };

  //===============================================================
  // Scene_Map
  //===============================================================

  const aliasSceneMapStart = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    aliasSceneMapStart.call(this);
    this._hangul = new Window_Hangul();
    this._hangul.y = Graphics.boxHeight - this._hangul.windowHeight();
    this._chatView = new Window_HangulChatView();
    this._chatView.y = this._hangul.y - this._chatView.height;
    this._hangul.setChatView(this._chatView);
    this._chatView.activate();
    this.addWindow(this._hangul);
    this.addWindow(this._chatView);
  };
})();

(() => {
  function VirtualKeyboardMV(...args) {
    this.initialize.call(this, ...args);
  }

  VirtualKeyboardMV.prototype.constructor = VirtualKeyboardMV;

  VirtualKeyboardMV.BACK_SPACE = 8;
  VirtualKeyboardMV.ENTER = 13;
  VirtualKeyboardMV.IS_NOT_CHAR = 32; // SPACE_BAR와 동일
  VirtualKeyboardMV.KEYS_ARRAY = 255;
  VirtualKeyboardMV.HAN_EN = 21; // 한영키

  VirtualKeyboardMV.KEYS = {
    ko: {
      8: [''],
      21: [''],
      32: [' '],
      192: ['`', '~'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      48: ['0', ')'],
      45: ['-', '_'],
      43: ['+', '='],
      65: ['ㅁ'],
      66: ['ㅠ'],
      67: ['ㅊ'],
      68: ['ㅇ'],
      69: ['ㄷ', 'ㄸ'],
      70: ['ㄹ'],
      71: ['ㅎ'],
      72: ['ㅗ'],
      73: ['ㅑ'],
      74: ['ㅓ'],
      75: ['ㅏ'],
      76: ['ㅣ'],
      77: ['ㅡ'],
      78: ['ㅜ'],
      79: ['ㅐ', 'ㅒ'],
      80: ['ㅔ', 'ㅖ'],
      81: ['ㅂ', 'ㅃ'],
      82: ['ㄱ', 'ㄲ'],
      83: ['ㄴ'],
      84: ['ㅅ', 'ㅆ'],
      85: ['ㅕ'],
      86: ['ㅍ'],
      87: ['ㅈ', 'ㅉ'],
      88: ['ㅌ'],
      89: ['ㅛ'],
      90: ['ㅋ'],
      96: ['0'],
      97: ['1'],
      98: ['2'],
      99: ['3'],
      100: ['4'],
      101: ['5'],
      102: ['6'],
      103: ['7'],
      104: ['8'],
      105: ['9'],
      106: ['*'],
      107: ['+'],
      109: ['-'],
      110: ['.'],
      111: ['/'],
      186: [';', ':'],
      188: [',', '<'],
      190: ['.', '>'],
      191: ['/', '?'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
    },
    en: {
      8: [''],
      21: [''],
      32: [' '],
      192: ['`', '~'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      48: ['0', ')'],
      45: ['-', '_'],
      43: ['+', '='],
      65: ['a', 'A'],
      66: ['b', 'B'],
      67: ['c', 'C'],
      68: ['d', 'D'],
      69: ['e', 'E'],
      70: ['f', 'F'],
      71: ['g', 'G'],
      72: ['h', 'H'],
      73: ['i', 'I'],
      74: ['j', 'J'],
      75: ['k', 'K'],
      76: ['l', 'L'],
      77: ['m', 'M'],
      78: ['n', 'M'],
      79: ['o', 'O'],
      80: ['p', 'P'],
      81: ['q', 'Q'],
      82: ['r', 'R'],
      83: ['s', 'S'],
      84: ['t', 'T'],
      85: ['u', 'U'],
      86: ['v', 'V'],
      87: ['w', 'W'],
      88: ['x', 'X'],
      89: ['y', 'Y'],
      90: ['z', 'Z'],
      96: ['0'],
      97: ['1'],
      98: ['2'],
      99: ['3'],
      100: ['4'],
      101: ['5'],
      102: ['6'],
      103: ['7'],
      104: ['8'],
      105: ['9'],
      106: ['*'],
      107: ['+'],
      109: ['-'],
      110: ['.'],
      111: ['/'],
      186: [';', ':'],
      188: [',', '<'],
      190: ['.', '>'],
      191: ['/', '?'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
    },
  };

  VirtualKeyboardMV.prototype.initialize = function () {
    this.initMembers();
  };

  VirtualKeyboardMV.prototype.initMembers = function () {
    this._texts = '';
    this._lastTexts = '';
    this._cursorIndex = 0;
    this._isValid = false;
    this._keyboardMode = 'ko';
    this._composeMode = false;
    this._prevComposeCursorIndex = 0;
    this._lastKeyCode = 0;
    this._composeCursorIndex = 0;
    this._cursor = {
      curIndex: 0,
      savedIndex: 0,
    };
  };

  VirtualKeyboardMV.prototype.processSpacebar = function () {
    const han = RS.Hangul.decompress(this._texts);
    const text = han.pop();
    const pos = this._cursorIndex;
    this._texts = this._texts.split('');

    // 아무 글자도 입력되었다면 띄어쓰기 한 번
    if (han.length === 0) {
      this._texts.splice(pos, 0, ' ');
      this._cursorIndex++;
      this._texts = this._texts.join('');
      return;
    }

    // 이전 글자가 중성이고, 현재 종성이 비어있다면 띄어쓰기를 두번 한다.
    if (RS.Hangul.isFinal(text) <= 0) {
      if (!RS.Hangul.isSpecialCharacter(text)) {
        this._texts.splice(pos, 0, ' ');
      }
      this._texts.splice(pos, 0, ' ');
      this._cursorIndex++;
    } else {
      // 완성된 글자라면 띄어쓰기를 한 번만 한다.
      this._texts.splice(pos, 0, ' ');
    }
    this._texts = this._texts.join('');
    this._cursorIndex++;
  };

  VirtualKeyboardMV.prototype.processBackspace = function () {
    const joinedText = this._texts.split('');
    const texts = RS.Hangul.decompress(this._texts);
    let pos = this.currentCursorPosition() - 1;
    if (pos < 0) pos = 0;

    if (RS.Hangul.isComposite()) {
      const text = texts[pos];
      let deletedCharacter = -2;

      // 특수 문자인가?
      if (RS.Hangul.isSpecialCharacter(text)) {
        deletedCharacter = -1;
      } else if (RS.Hangul.isFinal(text) <= 0) {
        deletedCharacter = -2;
      }

      const compositedChars = texts.slice(0, deletedCharacter);

      RS.Hangul.startWithComposite(
        compositedChars,
        function (ret) {
          this._texts = ret;
          this._cursorIndex = ret.length;
        }.bind(this)
      );
    } else {
      joinedText.splice(pos, 1);
      this._texts = joinedText.join('');
      this._cursorIndex = this._texts.length;
    }
  };

  VirtualKeyboardMV.prototype.processHangul = function (text) {
    this._lastTexts = text; // 조합된 텍스트 저장

    // 글자 길이가 조합 이전과 같다면 조합 모드로 판단한다.
    // this._composeMode = (this._prevComposeCursorIndex === this._lastTexts.length)? true : false;

    this._composeMode = RS.Hangul._currentStep < 7;

    // 조합 모드가 아니면 인덱스를 저장한다.
    if (!this._composeMode) {
      this._composeCursorIndex = this._lastTexts.length;
      this._cursor.savedIndex = this._cursor.curIndex; // 이전 인덱스 저장
      this._cursor.curIndex = this._cursorIndex; // 갱신
    }
  };

  VirtualKeyboardMV.prototype.getTexts = function () {
    return this._lastTexts.slice(0);
  };

  VirtualKeyboardMV.prototype.clear = function () {
    const temp = this._isValid;
    this.initMembers();
    this._isValid = temp;
  };

  VirtualKeyboardMV.prototype.lastKeyCode = function () {
    return this._lastKeyCode;
  };

  VirtualKeyboardMV.prototype.addText = function (text) {
    const texts = this._texts.split(''); // 자모 수준으로 분해
    const pos = this.currentCursorPosition();
    this._texts = texts;
    this._texts.splice(pos, 0, text);
    this._texts = this._texts.join('');
    this._cursorIndex++;
  };

  VirtualKeyboardMV.prototype.valid = function () {
    this._isValid = true; // 포커스를 가진다면
  };

  VirtualKeyboardMV.prototype.inValid = function () {
    this._isValid = false; // 포커스를 가지지 않는다면
  };

  VirtualKeyboardMV.prototype.isValid = function () {
    return this._isValid && !$gameMessage.isBusy();
  };

  VirtualKeyboardMV.prototype.moveLeft = function () {
    const max = this._texts.length;

    while (this._cursor.savedIndex < this._cursorIndex) {
      this._cursorIndex--;
    }

    if (this._cursorIndex < 0) {
      this._cursorIndex = 0;
    }

    if (this._cursorIndex > max) {
      this._cursorIndex = max;
    }

    this._cursor.curIndex = this._cursorIndex;

    return this._cursorIndex;
  };

  VirtualKeyboardMV.prototype.moveRight = function () {
    const max = this._texts.length; // 한 글자 기준.

    this._cursorIndex++;

    if (this._cursorIndex < 0) {
      this._cursorIndex = 0;
    }

    if (this._cursorIndex > max) {
      this._cursorIndex = max;
    }

    return this._cursorIndex;
  };

  VirtualKeyboardMV.prototype.currentCursorPosition = function (offset) {
    const max = this._texts.length; // 한 글자 기준.

    offset = offset || 0;
    let pos = this._cursorIndex + offset;

    if (pos < 0) {
      pos = 0;
    }

    if (pos > max) {
      pos = max;
    }

    return pos;
  };

  /**
   *
   * @param {KeyboardEvent} event
   */
  VirtualKeyboardMV.prototype.onKeyDown = function (event) {
    const keyCode = event.which;
    const lang = this._keyboardMode;
    const keys = VirtualKeyboardMV.KEYS[lang];
    const hans = Object.keys(keys);

    if (!this.isValid()) {
      // 키보드 포커스가 없다면 입력 실패
      return event.preventDefault();
    }

    this._lastKeyCode = keyCode;

    const c = keys[keyCode]; // 입력된 텍스트
    let text = '';

    if (hans.indexOf(String(keyCode)) >= 0) {
      text = event.shiftKey && c.length > 1 ? c[1] : c[0];
    }

    // 한영 키 처리
    if (VirtualKeyboardMV.HAN_EN === keyCode) {
      this._keyboardMode = this._keyboardMode === 'ko' ? 'en' : 'ko';
      return false;
    }

    // 왼쪽 방향키
    if (keyCode === 37) {
      this.moveLeft();
      return false;
    }

    // 오른쪽 방향키
    if (keyCode === 39) {
      this.moveRight();
      return false;
    }

    // 띄어쓰기 처리
    if (VirtualKeyboardMV.IS_NOT_CHAR === keyCode) {
      this.processSpacebar();
      this._prevComposeCursorIndex = this._lastTexts.length;
      RS.Hangul.startWithComposite(this._texts, this.processHangul.bind(this));
      return false;
    }

    // 백스페이스 처리
    if (VirtualKeyboardMV.BACK_SPACE === keyCode) {
      this.processBackspace();
      this._prevComposeCursorIndex = this._lastTexts.length;
      RS.Hangul.startWithComposite(this._texts, this.processHangul.bind(this));
      event.preventDefault();
      return false;
    }

    this._composeMode = RS.Hangul._currentStep < 7;

    // 엔터 처리
    if (VirtualKeyboardMV.ENTER === keyCode) {
      return false;
    }

    if (text === '') {
      return false;
    }

    // 입력 처리
    this.addText(text);

    // 조합 이후 글자 길이 체크를 위해 임시 저장
    this._prevComposeCursorIndex = this._lastTexts.length;

    // 조합 처리
    RS.Hangul.startWithComposite(this._texts, this.processHangul.bind(this));

    return false;
  };

  RS.Keyboard = new VirtualKeyboardMV();

  document.addEventListener(
    'keydown',
    RS.Keyboard.onKeyDown.bind(RS.Keyboard),
    false
  );
})();
