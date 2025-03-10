const fs = require('fs');

const Color = {};
Color.getColor = function (n) {
  var r = n & 255;
  var g = (n >> 8) & 255;
  var b = (n >> 16) & 255;
  var result = `rgba(${r},${g},${b},1)`;
  return result;
};

let KOREAN_COLORS = {
  청록: 16776960,
  청록색: 16776960,
  c_aqua: 16776960,
  검은색: 0,
  검정: 0,
  c_black: 0,
  파란색: 16711680,
  파랑: 16711680,
  c_blue: 16711680,
  짙은회색: 4210752,
  c_dkgray: 4210752,
  자홍색: 16711935,
  자홍: 16711935,
  c_fuchsia: 16711935,
  회색: 8421504,
  c_gray: 8421504,
  녹색: 32768,
  c_green: 32768,
  밝은녹색: 65280,
  라임: 65280,
  c_lime: 65280,
  밝은회색: 12632256,
  c_ltgray: 12632256,
  밤색: 128,
  마룬: 128,
  c_maroon: 128,
  감청색: 8388608,
  네이비: 8388608,
  c_navy: 8388608,
  황록색: 32896,
  올리브: 32896,
  c_olive: 32896,
  주황색: 4235519,
  주황: 4235519,
  오렌지: 4235519,
  c_orange: 4235519,
  보라색: 8388736,
  보라: 8388736,
  c_purple: 8388736,
  빨간색: 255,
  빨강: 255,
  c_red: 255,
  은색: 12632256,
  은: 12632256,
  c_silver: 12632256,
  민트색: 8421376,
  c_teal: 8421376,
  흰색: 16777215,
  흰: 16777215,
  c_white: 16777215,
  노란색: 65535,
  노랑: 65535,
  c_yellow: 65535,
};

for (i in KOREAN_COLORS) {
  let temp = KOREAN_COLORS[i];
  KOREAN_COLORS[i] = Color.getColor(temp);
}

fs.writeFileSync('opt.json', JSON.stringify(KOREAN_COLORS, null, '\t'), 'utf8');

// Step 2

let chn = `
RS.MessageSystem.getJapaneseColor = function (string) {
    switch (string) {
      case '水色':
      case 'アクア色':
      case 'c_aqua': // 아쿠아
        return Color.getColor(16776960);
      case '黑色':
      case 'c_black': // 검정
        return Color.getColor(0);
      case '靑色':
      case 'c_blue': // 파란색
        return Color.getColor(16711680);
      case 'ふか灰色':
      case 'c_dkgray': // 짙은회색
        return Color.getColor(4210752);
      case '紫紅色':
      case 'c_fuchsia': // 자홍색
        return Color.getColor(16711935);
      case '灰色':
      case 'c_gray': // 회색
        return Color.getColor(8421504);
      case '綠色':
      case 'c_green': // 녹색
        return Color.getColor(32768);
      case '黃綠':
      case 'c_lime': // 연두색
        return Color.getColor(65280);
      case '鼠色':
      case 'c_ltgray': // 쥐색
        return Color.getColor(12632256);
      case '―色':
      case 'c_maroon': // 밤색
        return Color.getColor(128);
      case '群青色':
      case 'ネイビー':
      case 'c_navy': // 군청색
        return Color.getColor(8388608);
      case '黃綠色':
      case 'オリーブ色':
      case 'c_olive': // 황록색
        return Color.getColor(32896);
      case '橙色':
      case 'オレンジ色':
      case 'c_orange': // 주황색
        return Color.getColor(4235519);
      case '紫色':
      case 'c_purple': // 보라색, 자색
        return Color.getColor(8388736);
      case '赤色':
      case 'レッド':
      case 'c_red': //빨간색 (아카이)
        return Color.getColor(255);
      case '銀色':
      case 'c_silver': // 은색
        return Color.getColor(12632256);
      case 'ミント色':
      case '薄荷色':
      case 'c_teal': // 민트색, 박하색
        return Color.getColor(8421376);
      case '白色':
      case 'c_white': // 흰색
        return Color.getColor(16777215);
      case '黃色':
      case 'c_yellow': // 노란색
        return Color.getColor(65535);
      case '基本色':
      case 'c_normal': // 기본색
        return Color.getBaseColor();
      default:
        return Color.getUserCustomColor(string);
    }
  };
`;

const lines = [];
let retHash = {};
let lastKey = [];
chn.split(/[\r\n]+/).forEach(line => {
  if (/(?:case)[ ]\'(.*)\'\:/gm.exec(line)) {
    lastKey.push(RegExp.$1);
  } else if (/(?:return)[ ](?:Color\.getColor)\(([\d]+)\)/gm.exec(line)) {
    const value = parseInt(RegExp.$1);
    lastKey.forEach(e => {
      retHash[e] = Color.getColor(value);
    });
    lastKey = [];
  }
});

fs.writeFileSync('opt2.json', JSON.stringify(retHash, null, '\t'), 'utf8');
