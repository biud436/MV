/*:
 * @plugindesc
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_YieldTest = true;

var RS = RS || {};
RS.YieldTest = RS.YieldTest || {};

(function($) {

    "use strict";

    $.lysic = `
    You could be my unintended
    그대, 내 삶을 더 폭넓게 살기 위한
    choice to live my life extended
    무의식적인, 의도되지 않은 선택이 될 수도 있었죠
    You could be the one I'll always love
    내가 항상 사랑할 유일한 사람이 될 수도 있었어요
    You could be the one who listens
    나의 가장 심오한 질문들을
    to my deepest inquisitions,
    귀 기울여 들어줄 사람이 될 수도 있었죠
    You could be the one I'll always love
    내가 영원히 사랑할 유일한 사람이 될 수도 있었어요.
    I'll be there as soon as I can
    최선을 다해서 금방 도착하도록 할게요.
    But I'm busy mending broken
    하지만 난 지금 내가 예전의 내 삶에서 가졌던
    pieces of the life I had before
    그 조각난 상처들을 치유하기에 너무 바쁘네요.
    First there was the one who challenged
    꿈들과 내가 가지고 있었던 균형, 안정성에
    all my dreams and all my balance
    도전해온 사람이 있었죠.
    She could never be as good as you
    그녀는 당신처럼 좋은 사람은 절대 될 수 없었죠.
    You could be my unintended
    당신이 바로, 내 삶을 더 폭넓게 살기 위한
    choice to live my life extended
    무의식적인,의도되지 않은 선택이 될 수도 있었죠
    You should be the one I'll always love
    내가 항상 사랑할 유일한 사람이 될 수도 있었어요.
    I'll be there as soon as I can
    금방 도착하도록 해볼게요.
    But I'm busy mending broken
    하지만 난 지금 예전의 내 삶의 부서진 조각들을 고치느라 바쁘네요
    pieces of the life I had before
    당신을 만나기 전에 부서진 내 삶의 조각들을요.
    I'll be there as soon as I can
    금방 도착하도록 해볼게요.
    But I'm busy mending broken
    하지만 난 지금 예전의 내 삶의 부서진 조각들을 고치느라 바쁘네요.
    pieces of the life I had before
    당신을 만나기 전에 부서진 내 삶의 조각들을요.
    Before you
    당신을 만나기 전에….           
    `.split(/[\r\n]+/);

    $.sync = function(i) {
        return $.lysic[i];
    };

    $.doTestMessage = function* () {
        var self = RS.YieldTest;
        var i = 0;
        while(i < $.lysic.length) {
            yield console.log($.sync(i++));
        }
    };

    $.updateText = function() {
        // clear bitmap
        // draw text
    };

    var test = $.doTestMessage();

    while(!!test.next()) {
        $.updateText();
    }

})(RS.YieldTest);