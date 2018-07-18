var Hangul = require('./RS_Hangul.js');
var h = new Hangul();

console.log(h.decompress("ㄺㄹㄱ"));

h.startWithComposite("감사합니다 매우 감사합니다!@#$%% 하하하 ㄳㄳ abcdefg!!", function(t) {
 console.log(t);
});

console.log("----");

h.startWithComposite("갉삵갉삵뷁", function(t) {
    console.log(t);
});
   
console.log("----");

h.startWithComposite("감나무에서 떨어지면 안된다. 왜냐고? 나도 몰라 ㅋㅋㅋ", function(t) {
    console.log(t);
});
   
console.log("----");

h.startWithComposite("ㅅㄱㄹㄱㄹㄱㄹㄱㄹㄱ", function(t) {
    console.log(t);
});
   
