var Hangul = require('./RS_Hangul.js');
var h = new Hangul();

h.startWithComposite("감사합니다 매우 감사합니다!@#$%% 하하하 ㄳㄳ abcdefg!!", function(t) {
 console.log(t);
});

h.startWithComposite("갉삵갉삵뷁", function(t) {
    console.log(t);
});
   
h.startWithComposite("감나무에서 떨어지면 안된다. 왜냐고? 나도 몰라 ㅋㅋㅋ", function(t) {
    console.log(t);
});
   
h.startWithComposite("ㅅㄱㄹㄱㄹㄱㄹㄱㄹㄱ", function(t) {
    console.log(t);
});
   
h.startWithComposite("ㅇㅏㄴㄴㅕㅇ?ㄴㅗㅂㅡㄹㅐㄴㄷㅡ", function(t) {
    console.log(t);
});
   
h.startWithComposite("ㄱㅏㄹㄱㅇㅏㅁㅓㄱㅈㅏ", function(t) {
    console.log(t);
});
   
h.startWithComposite("ㅇㅣㅅㅡㅇㅊㅓㄹㅎㅕㅇㄴㅣㅁ", function(t) {
    console.log(t);
});
   
h.startWithComposite("ㄱㅗㅐㅇㅇㅣ", function(t) {
    console.log(t);
});

h.startWithComposite("ㅇㅕㄴㄱㅕㄹㅅㅣㅋㅣㄷㅏ", function(t) {
    console.log(t);
});

h.startWithComposite("ㅎㅏㅁㄲㅔㅎㅏㄷㅏ", function(t) {
    console.log(t);
});

h.startWithComposite("winner", function(t) {
    console.log(t);
});

h.startWithComposite("ㅎㅡㅣㅁㅏㅇ", function(t) {
    console.log(t);
});

h.startWithComposite("ㄷㅓㅇㅜㅓㄷㅓㅇㅜㅓ!", function(t) {
    console.log(t);
});