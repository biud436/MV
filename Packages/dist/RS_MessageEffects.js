//================================================================
// RS_MessageEffects.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_MessageEffects>
 * @author biud436
 * 
 * @param Default Text Effect
 * @type select
 * @desc Select desired text effect.
 * @default normal_rot
 * @option Ping Pong
 * @value pingpong
 * @option Slide
 * @value slide
 * @option high_rot
 * @value high_rot
 * @option normal_rot
 * @value normal_rot
 * @option random_rot
 * @value random_rot
 * @option None
 * @value none
 * 
 * @param New Page
 * 
 * @param Clear Flag
 * @parent New Page
 * @type boolean
 * @desc Clear the text effect as 'none' when opening a new page
 * @default false
 * @on true
 * @off false
 *          
 * @help
 * This help document does not support English translation yet.
 * This plugin is also incompatible with the YEP_MessageCore plugin.
 * 
 * ================================================================
 * 소개
 * ================================================================
 * 이 플러그인은 한글 메시지 시스템 플러그인과 호환됩니다.
 * 따로 부가 플러그인으로 내놓는 이유는 성능적 저하가 심하기 때문입니다.
 * 메인 플러그인에 이런 텍스트 기능을 넣게 되면 심각한 성능 저하가 올 수 있습니다.
 * 
 * 또한 Visual Novel Maker의 Design Pattern과 유사하게 상속 방식으로 개발하였습니다.
 * 따라서 이 플러그인은 RPG Maker MV v1.6.2 이상에서만 지원합니다.
 * 
 * 그러나 상속 방식의 패턴이 만드는 프로토타입 체인의 성능적 저하는 측정 및 검증되지 않았습니다.
 * 
 * 이외에도 성능적 저하의 요소는 더 있습니다.
 * 
 * //!! 성능 저하 요소 1
 * 텍스트는 캔버스를 생성한 후 동적으로 Texture를 만들고 GPU로 매 글자마다
 * 새로운 Texture를 업로드를 하게 됩니다.
 * 
 * 각 글자를 새로운 Texture로 형성해야 하므로 최적화에 좋지 않습니다.
 * 
 * 가장 좋은 방법은 Bitmap Text를 사용하여 미리 업로드된 Texture를 사용하는
 * 방식입니다.
 * 
 * 이렇게 하면 Draw Call이 추가로 들지 않습니다.
 * Bitmap Text는 글꼴 형성에 큰 제한이 있으므로 아직까지 지원하진 않습니다.
 * 
 * 따라서 PC가 아니라면 이 플러그인은 사용하기 부적절합니다.
 * 모바일에서는 사용을 하지 마시기 바랍니다.
 * 
 * //!! 성능 저하 요소 2
 * Draw Call 문제 이외에도, 이 플러그인은 대부분 삼각 함수를 이용하여 
 * 계산을 하고 있습니다.
 * 
 * 삼각 함수는 CPU에 부담을 주며 실제로 성능이 저하될 수 있습니다.
 * 성능 저하 시기는 대화창 페이지가 새로 형성될 때 입니다.
 * 
 * 삼각 함수는 업데이트 이전에 작성된 데이터를 사용하면 좋겠으나,
 * 실시간으로 데이터를 바꿔야 하므로 페이지가 열려있을 땐 매 시간 계산됩니다.
 * 
 * //!! 성능 저하 요소 3
 * 자바스크립트에서는 아직 C# 코루틴 같은 재진입 요소를 사용하기가 까다롭기 때문에,
 * 프레임워크 내에서 한시적으로 오브젝트를 업데이트를 시키는 것이 힘이 듭니다.
 * 
 * 따라서 페이지가 열려있을 때 글자 갯수마다 의미 없는 오브젝트 업데이트 함수가 호출됩니다.
 * 
 * 물론 이를 해결할 방법은 있습니다.
 * 텍스트 묘화가 끝난 후, 하나의 텍스쳐로 업로드를 하거나 
 * Ticker나 Event Listener 등으로 한시적 업데이트를 구현하는 것입니다.
 * 
 * 그러나 이렇게 검증되지 않은 방식에 투자할 시간은 없습니다.
 * 
 * ================================================================
 * Text Codes
 * ================================================================
 * 다음과 같은 텍스트 코드를 사용할 수 있습니다.
 * 
 *  \텍스트효과<효과명>
 *  \TE<TEXT_EFFECT_NAME>
 * 
 * 다음 명령은 부드럽게 상하로 부드럽게 흔들리는 이펙트를 줍니다.
 * 
 * \텍스트효과<pingpong>
 * \TE<pingpong>
 * 
 * 다음 명령은 투명도 증감과 함께 좌우로 살짝 흔들리는 이펙트를 줍니다.
 * 
 * \텍스트효과<slide>
 * \TE<slide>
 * 
 * 글자가 어딘가에서 날라와 제자리를 빠르게 찾아갑니다.
 * 
 * \텍스트효과<high_rot>
 * \TE<high_rot>
 * 
 * 규칙적으로 방향도 전환하면서 제자리를 찾는 효과입니다.
 * 
 * \텍스트효과<normal_rot>
 * \TE<normal_rot>
 * 
 * 불규칙적인 패턴으로 제자리를 찾아갑니다.
 * 
 * \텍스트효과<random_rot>
 * \TE<random_rot>
 * 
 * 이외로 텍스트 효과를 없애고 싶다면 다음과 같습니다.
 * 
 * \텍스트효과<none>
 * \TE<none>
 * 
 * 주의할 점은 텍스트 효과 문자열은 대소문자를 구분한다는 점입니다.
 * 
 * ================================================================
 * Plugin Commmands
 * ================================================================
 * 다음 명령은 부드럽게 상하로 부드럽게 흔들리는 이펙트를 줍니다.
 * 
 * MessageEffectMap pingpong
 * 
 * 다음 명령은 투명도 증감과 함께 좌우로 살짝 흔들리는 이펙트를 줍니다.
 * 
 * MessageEffectMap slide
 * 
 * 글자가 어딘가에서 날라와 제자리를 빠르게 찾아갑니다.
 * 
 * MessageEffectMap high_rot
 * 
 * 규칙적으로 방향도 전환하면서 제자리를 찾는 효과입니다.
 * 
 * MessageEffectMap normal_rot
 * 
 * 불규칙적인 패턴으로 제자리를 찾아갑니다.
 * 
 * MessageEffectMap random_rot
 * 
 * 대소문자를 구분하므로 소문자를 대문자를 적지 않도록 해주세요.
 * 
 */ 
!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function o(t,e,n){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=s(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}window.Imported=window.Imported||{},Imported.RS_MessageEffects=!0,window.RS=window.RS||{},window.RS.MessageEffects=window.RS.MessageEffects||{};var c=$plugins.filter((function(t){return t.description.contains("<RS_MessageEffects>")}));c=c.length>0&&c[0].parameters,RS.MessageEffects.Params={},RS.MessageEffects.Params.defaultTextEffect=c["Default Text Effect"]||"none",RS.MessageEffects.Params.currentEffect=RS.MessageEffects.Params.defaultTextEffect,RS.MessageEffects.Params.clearFlag=Boolean("true"===c["Clear Flag"]);var f=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=i(this,s(e).call(this))).createMainTextLayer(),t.once("removed",(function(){t.terminateMainTextLayer()})),t}var n,c,f;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(e,Window_Message),n=e,(c=[{key:"clearFlags",value:function(){o(s(e.prototype),"clearFlags",this).call(this),RS.MessageEffects.Params.clearFlag&&(RS.MessageEffects.Params.currentEffect="none")}},{key:"_updateContents",value:function(){o(s(e.prototype),"_updateContents",this).call(this)}},{key:"createMainTextLayer",value:function(){var t=this._width-2*this._padding,e=this._height-2*this._padding;this._mainTextLayer=new Sprite,this._mainTextLayer.setFrame(this.origin.x,this.origin.y,t,e),this._mainTextLayer.on("effect",this.startTextEffect,this),this._windowContentsSprite.addChild(this._mainTextLayer)}},{key:"terminateMainTextLayer",value:function(){this._mainTextLayer&&(this._windowContentsSprite.removeChild(this._mainTextLayer),this._mainTextLayer=null)}},{key:"terminateMessage",value:function(){o(s(e.prototype),"terminateMessage",this).call(this),this._mainTextLayer&&this._mainTextLayer.removeChildren()}},{key:"startTextEffect",value:function(t){var e=t[0],n=RS.MessageEffects.Params.currentEffect,r=t[1];if(e){var i=EffectFactory.create(n);i.bitmap=e,this._mainTextLayer.addChild(i),i.start(r)}}},{key:"addText",value:function(t){this.contents||this.createContents();var e=t.text[t.index++],n=this.textWidth(e),r=t.height,i=new Bitmap(2*n,r);if(i.fontFace=this.standardFontFace(),i.fontSize=this.standardFontSize(),i.fontItalic=this.contents.fontItalic,i.textColor=this.contents.textColor,i.outlineColor=this.contents.outlineColor,i.outlineWidth=this.contents.outlineWidth,!(this.contents.width<Math.floor(t.x+2*n))){if(Imported.RS_MessageSystem){i.fontBold=this.contents.fontBold;var o=this.contentsWidth(),s=-2===$gameMessage.getBalloon()&&!this._isUsedTextWidthEx&&RS.MessageSystem.Params.isParagraphMinifier;this.processWordWrap(t,n,o,s),""!==$gameMessage.faceName()&&(o=this.contents.width-Window_Base._faceWidth,s=2===RS.MessageSystem.Params.faceDirection,this.processWordWrap(t,n,o,s)),null!=this.contents.highlightTextColor&&i.fillRect(0,0,n+1,t.height,this.contents.highlightTextColor)}i.drawText(e,0,0,2*n,r,"left"),this._mainTextLayer.emit("effect",[i,t]),t.x+=n,Imported.RS_MessageSystem&&(!this._showFast&&this.startWait($gameMessage.getWaitTime()||0),t.index%RS.MessageSystem.Params.textSoundInterval==0&&this._requestTextSound())}}},{key:"obtainTextEffectName",value:function(t){var e=/\<(.*)\>/.exec(t.text.slice(t.index));return e?(t.index+=e[0].length,String(e[1])):""}},{key:"setTextEffect",value:function(t){if("number"==typeof t){var e=Object.keys(EffectFactory.TYPE),n=e[t];t=e.contains(n)?n:RS.MessageEffects.Params.defaultTextEffect}RS.MessageEffects.Params.currentEffect=t}},{key:"processEscapeCharacter",value:function(t,n){switch(t){case"텍스트효과":case"TE":var r=this.obtainTextEffectName(n);this._isUsedTextWidthEx||this.setTextEffect(r);break;case"E":var i=this.obtainEscapeParam(n);this._isUsedTextWidthEx||this.setTextEffect(i-1);default:o(s(e.prototype),"processEscapeCharacter",this).call(this,t,n)}}},{key:"processNormalCharacter",value:function(t){"none"!==RS.MessageEffects.Params.currentEffect?this.addText(t):o(s(e.prototype),"processNormalCharacter",this).call(this,t)}},{key:"startPause",value:function(){o(s(e.prototype),"startPause",this).call(this)}}])&&r(n.prototype,c),f&&r(n,f),e}();window.Window_Message=f;var u=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(t,e){u.call(this,t,e),"MessageEffectMap"===t&&(RS.MessageEffects.Params.currentEffect=e[0])}},function(t,e,n){"use strict";n.r(e);n(0);function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t,e,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(t){var n;return i(this,e),(n=a(this,f(e).call(this,t)))._isStarted=!1,n._effectType="pingpong",n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,Sprite),s(e,[{key:"update",value:function(){c(f(e.prototype),"update",this).call(this),this.updateEffects()}},{key:"flush",value:function(){this._isStarted=!1,this.x=this._startX,this.y=this._startY,this.rotation=this._desc.rotation,this.scale.x=this._desc.scaleX,this.scale.y=this._desc.scaleY,this.skew.x=this._desc.skewX,this.skew.y=this._desc.skewY,this.tint=this._desc.tint,this.filters=this._desc.filters,this.opacity=this._tempOpacity,this._desc={}}},{key:"updateEffects",value:function(){}},{key:"start",value:function(t){this._now=performance.now(),this._isStarted=!0,this._power=1,this.x=t.x,this.y=t.y,this._startX=this.x,this._startY=this.y,this._random=Math.floor(60*Math.random()),this._index=t.index,this._tempOpacity=this.opacity,this._desc={x:this.x,y:this.y,rotation:this.rotation,scaleX:this.scale.x||1,scaleY:this.scale.y||1,skewX:this.skew.x||0,skewY:this.skew.y||0,opacity:this.opacity,tint:this.tint,filters:this.filters}}}]),e}(),l=function(){function t(){i(this,t)}return s(t,null,[{key:"create",value:function(e){var n;Object.keys(t.TYPE).contains(e)?n=new(0,t.TYPE[e]):n=new h;return n}},{key:"add",value:function(e){Object.assign(t.TYPE,e)}}]),t}();function p(t,e,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=w(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e,n){return e&&d(t.prototype,e),n&&d(t,n),t}function b(t,e){return!e||"object"!==y(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function g(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}l.TYPE||(l.TYPE={},window.EffectFactory=l);var x,S=Math.PI/180,E=function(t){function e(t){var n;return _(this,e),(n=b(this,w(e).call(this,t)))._effectType="pingpong",n}return g(e,t),m(e,[{key:"updateEffects",value:function(){this._isStarted&&(this._power<=60?(this.y=this._startY+PIXI.PI_2/this._power*4,this._power++):this.flush())}}]),e}(h),T=function(t){function e(t){var n;return _(this,e),(n=b(this,w(e).call(this,t)))._effectType="slide",n}return g(e,t),m(e,[{key:"updateEffects",value:function(){this._isStarted&&(this._power<=60?(this.x=this._startX+PIXI.PI_2/this._power*(this._index%4)*4,this.opacity=4*this._power,this._power++):this.flush())}}]),e}(h),O=function(t){function e(t){var n;return _(this,e),(n=b(this,w(e).call(this,t)))._effectType="high_rot",n}return g(e,t),m(e,[{key:"updateEffects",value:function(){if(this._isStarted)if(this._power<=this._random){var t=this._random-this._power,e=performance.now(),n=S*t*(this._random%2==0?-e:e),r=Math.cos(n),i=Math.sin(n),o=this._startX-t,s=this._startY-t;this.x=o*r-s*i,this.y=o*i+s*r,this._power++}else this.flush()}}]),e}(h),P=function(t){function e(t){var n;return _(this,e),(n=b(this,w(e).call(this,t)))._effectType="normal_rot",n}return g(e,t),m(e,[{key:"updateEffects",value:function(){if(this._isStarted)if(this._power<=this._random){var t=this._random-this._power,e=(performance.now(),S*t*(this._index%3==0?-1:1)),n=Math.cos(e),r=Math.sin(e),i=this._startX-t,o=this._startY-t;this.x=i*n-o*r,this.y=i*r+o*n,this._power++}else this.flush()}}]),e}(h),k=function(t){function e(t){var n;return _(this,e),(n=b(this,w(e).call(this,t)))._effectType="random_rot",n}return g(e,t),m(e,[{key:"updateEffects",value:function(){if(this._isStarted)if(this._power<=this._random){var t=this._random-this._power,e=S*t*(this._random%2==0?-1:1),n=Math.cos(e),r=Math.sin(e),i=this._startX-t,o=this._startY-t;this.x=i*n-o*r,this.y=i*r+o*n,this._power++}else this.flush()}}]),e}(h),M=function(t){function e(t){var n;return _(this,e),(n=b(this,w(e).call(this,t)))._effectType="shock",n}return g(e,t),m(e,[{key:"flush",value:function(){p(w(e.prototype),"flush",this).call(this),this.rotation=0,this.anchor.x=0,this.anchor.y=0}},{key:"updateEffects",value:function(){this._isStarted&&(this._power<=60?(this.anchor.x=-.8+Math.random(),this.anchor.y=-.8+Math.random()):this.flush())}},{key:"start",value:function(t){p(w(e.prototype),"start",this).call(this,t)}}]),e}(h);function j(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function R(t){return(R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function C(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Y(t,e,n){return e&&I(t.prototype,e),n&&I(t,n),t}function W(t,e){return!e||"object"!==R(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function X(t,e,n){return(X="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=L(t)););return t}(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(n):i.value}})(t,e,n||t)}function L(t){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function F(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&D(t,e)}function D(t,e){return(D=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}l.add({pingpong:E,slide:T,high_rot:O,normal_rot:P,random_rot:k,shock:M});var z=function(t){function e(t){var n;return C(this,e),(n=W(this,L(e).call(this,t)))._effectType="zoomout",n}return F(e,t),Y(e,[{key:"updateEffects",value:function(){this._isStarted&&(this.scale.x=(200-this._power)/100,this.scale.y=(200-this._power)/100,this.scale.x+1e-4<=1&&this.flush(),this._power++)}},{key:"start",value:function(t){X(L(e.prototype),"start",this).call(this,t),this.scale.x=1.5,this.scale.y=1.5}}]),e}(h),B=function(t){function e(t){var n;return C(this,e),(n=W(this,L(e).call(this,t)))._effectType="marquee",n}return F(e,t),Y(e,[{key:"updateEffects",value:function(){this._isStarted&&(this._ox-=4,this.x=this._startX+this._ox,this._ox<0&&this.flush())}},{key:"start",value:function(t){X(L(e.prototype),"start",this).call(this,t);var n=0,r=SceneManager._scene;n=r&&r._messageWindow?r._messageWindow.width:Math.floor(Graphics.boxWidth/2),this._ox=n,this.x+=n}}]),e}(h),N=function(t){function e(t){var n;return C(this,e),(n=W(this,L(e).call(this,t)))._effectType="wave",n}return F(e,t),Y(e,[{key:"updateEffects",value:function(){this._isStarted&&(this.skew.x=60*Math.max(this._startX%5,1),this.skew.y=2*Math.random()*this._index,this._power>=60&&this.flush(),this._power++)}},{key:"start",value:function(t){X(L(e.prototype),"start",this).call(this,t)}}]),e}(h),q=function(t){function e(t){var n;return C(this,e),(n=W(this,L(e).call(this,t)))._effectType="spread",n}return F(e,t),Y(e,[{key:"updateEffects",value:function(){if(this._isStarted&&!(!(performance.now()-this._lazy)>=1500)){switch(this._index){case 3:this.x=this._startX-this._power;break;case 1:this.x=this._startX+this._power;break;case 0:this.y=this._startY-this._power;break;case 2:this.y=this._startY+this._power}this._power>=600&&this.flush()}}},{key:"start",value:function(t){X(L(e.prototype),"start",this).call(this,t),this._lazy=performance.now(),this._index=t.index%4}}]),e}(h),$=function(t){function e(t){var n;return C(this,e),(n=W(this,L(e).call(this,t)))._effectType="mouse_tracking",n}return F(e,t),Y(e,[{key:"getDistance",value:function(t,e,n,r){return Math.sqrt(Math.pow(n-t,2)+Math.pow(r-e,2))}},{key:"updateEffects",value:function(){if(this._isStarted){var t=this._dist/30,e=this._startX-this.x,n=this._startY-this.y,r=0,i=0;r=e<0?t:e>0?-t:0,i=n<0?t:n>0?-t:0;var o=this.x-r,s=this.y-i;this.x=o,this.y=s,Math.floor(this.getDistance(this._startX,this._startY,TouchInput.x,TouchInput.y))<16&&this.flush()}}},{key:"start",value:function(t){X(L(e.prototype),"start",this).call(this,t),this.x=TouchInput.x,this.y=TouchInput.y,this._dist=Math.floor(this.getDistance(this._startX,this._startY,TouchInput.x,TouchInput.y))}}]),e}(h);l.add((j(x={zoomout:z,marquee:B,wave:N},"zoomout",z),j(x,"spread",q),j(x,"mouse_tracking",$),x))}]);
//# sourceMappingURL=RS_MessageEffects.js.map