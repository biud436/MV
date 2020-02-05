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
!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);s(1),s(2)},function(t,e){window.Imported=Imported||{},Imported.RS_MessageEffects=!0,window.RS=RS||{},window.RS.MessageEffects=window.RS.MessageEffects||{};var s=$plugins.filter((function(t){return t.description.contains("<RS_MessageEffects>")}));s=s.length>0&&s[0].parameters,RS.MessageEffects.Params={},RS.MessageEffects.Params.defaultTextEffect=s["Default Text Effect"]||"none",RS.MessageEffects.Params.currentEffect=RS.MessageEffects.Params.defaultTextEffect,RS.MessageEffects.Params.clearFlag=Boolean("true"===s["Clear Flag"]),RS.MessageEffects.DEG_TO_RAD=Math.PI/180;class i extends Sprite{constructor(t){super(t),this._isStarted=!1,this._effectType="pingpong"}update(){super.update(),this.updateEffects()}flush(){this._isStarted=!1,this.x=this._startX,this.y=this._startY,this.opacity=this._tempOpacity}updateEffects(){}start(t){this._now=performance.now(),this._isStarted=!0,this._power=1,this.x=t.x,this.y=t.y,this._startX=this.x,this._startY=this.y,this._random=Math.floor(60*Math.random()),this._index=t.index,this._tempOpacity=this.opacity}}window.TextEffect=i;class r{static create(t){let e;Object.keys(r.TYPE).contains(t)?e=new(0,r.TYPE[t]):e=new i;return e}static add(t){Object.assign(r.TYPE,t)}}r.TYPE={pingpong:class extends i{constructor(t){super(t),this._effectType="pingpong"}updateEffects(){this._isStarted&&(this._power<=60?(this.y=this._startY+PIXI.PI_2/this._power*4,this._power++):this.flush())}}},window.EffectFactory=r;class a extends Window_Message{constructor(){super(),this.createMainTextLayer(),this.once("removed",()=>{this.terminateMainTextLayer()})}clearFlags(){super.clearFlags(),RS.MessageEffects.Params.clearFlag&&(RS.MessageEffects.Params.currentEffect="none")}newPage(t){super.newPage(t),this._mainTextLayer.removeChildren()}_updateContents(){super._updateContents()}createMainTextLayer(){var t=this._width-2*this._padding,e=this._height-2*this._padding;this._mainTextLayer=new Sprite,this._mainTextLayer.setFrame(this.origin.x,this.origin.y,t,e),this._mainTextLayer.on("effect",this.startTextEffect,this),this._windowContentsSprite.addChild(this._mainTextLayer)}terminateMainTextLayer(){this._windowContentsSprite.removeChild(this._mainTextLayer),this._mainTextLayer=null}terminateMessage(){super.terminateMessage(),this._mainTextLayer&&this._mainTextLayer.removeChildren()}startTextEffect(t){const e=t[0],s=RS.MessageEffects.Params.currentEffect,i=t[1];if(!e)return;let a=r.create(s);a.bitmap=e,this._mainTextLayer.addChild(a),a.start(i)}addText(t){this.contents||this.createContents();let e=t.text[t.index++],s=this.textWidth(e),i=t.height;var r=new Bitmap(2*s,i);if(r.fontFace=this.standardFontFace(),r.fontSize=this.standardFontSize(),r.fontItalic=this.contents.fontItalic,r.textColor=this.contents.textColor,r.outlineColor=this.contents.outlineColor,r.outlineWidth=this.contents.outlineWidth,!(this.contents.width<Math.floor(t.x+2*s))){if(Imported.RS_MessageSystem){r.fontBold=this.contents.fontBold;var a=this.contentsWidth(),n=-2===$gameMessage.getBalloon()&&!this._isUsedTextWidthEx&&RS.MessageSystem.Params.isParagraphMinifier;this.processWordWrap(t,s,a,n),""!==$gameMessage.faceName()&&(a=this.contents.width-Window_Base._faceWidth,n=2===RS.MessageSystem.Params.faceDirection,this.processWordWrap(t,s,a,n)),null!=this.contents.highlightTextColor&&r.fillRect(0,0,s+1,t.height,this.contents.highlightTextColor)}r.drawText(e,0,0,2*s,i,"left"),this._mainTextLayer.emit("effect",[r,t]),t.x+=s,Imported.RS_MessageSystem&&(!this._showFast&&this.startWait($gameMessage.getWaitTime()||0),t.index%RS.MessageSystem.Params.textSoundInterval==0&&this._requestTextSound())}}initMembers(){super.initMembers()}obtainTextEffectName(t){var e=/\<(.*)\>/.exec(t.text.slice(t.index));return e?(t.index+=e[0].length,String(e[1])):""}setTextEffect(t){RS.MessageEffects.Params.currentEffect=t}processEscapeCharacter(t,e){switch(t){case"텍스트효과":case"TE":if(this._isUsedTextWidthEx)break;this.setTextEffect(this.obtainTextEffectName(e));break;default:super.processEscapeCharacter(t,e)}}processNormalCharacter(t){"none"!==RS.MessageEffects.Params.currentEffect?this.addText(t):super.processNormalCharacter(t)}startPause(){super.startPause(),this._mainTextLayer.children.forEach(t=>t.flush())}}window.Window_Message=a;var n=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(t,e){n.call(this,t,e),"MessageEffectMap"===t&&(RS.MessageEffects.Params.currentEffect=e[0])}},function(t,e){class s extends TextEffect{constructor(t){super(t),this._effectType="slide"}updateEffects(){this._isStarted&&(this._power<=60?(this.x=this._startX+PIXI.PI_2/this._power*(this._index%4)*4,this.opacity=4*this._power,this._power++):this.flush())}}class i extends TextEffect{constructor(t){super(t),this._effectType="high_rot"}updateEffects(){if(this._isStarted)if(this._power<=this._random){let t=this._random-this._power,e=performance.now(),s=$.DEG_TO_RAD*t*(this._random%2==0?-e:e),i=Math.cos(s),r=Math.sin(s),a=this._startX-t,n=this._startY-t;this.x=a*i-n*r,this.y=a*r+n*i,this._power++}else this.flush()}}class r extends TextEffect{constructor(t){super(t),this._effectType="normal_rot"}updateEffects(){if(this._isStarted)if(this._power<=this._random){let t=this._random-this._power,e=(performance.now(),$.DEG_TO_RAD*t*(this._index%3==0?-1:1)),s=Math.cos(e),i=Math.sin(e),r=this._startX-t,a=this._startY-t;this.x=r*s-a*i,this.y=r*i+a*s,this._power++}else this.flush()}}class a extends TextEffect{constructor(t){super(t),this._effectType="random_rot"}updateEffects(){if(this._isStarted)if(this._power<=this._random){let t=this._random-this._power,e=$.DEG_TO_RAD*t*(this._random%2==0?-1:1),s=Math.cos(e),i=Math.sin(e),r=this._startX-t,a=this._startY-t;this.x=r*s-a*i,this.y=r*i+a*s,this._power++}else this.flush()}}class n extends TextEffect{constructor(t){super(t),this._effectType="shock"}flush(){super.flush(),this.rotation=0,this.anchor.x=0,this.anchor.y=0}updateEffects(){this._isStarted&&(this._power<=60?(this.anchor.x=-.8+Math.random(),this.anchor.y=-.8+Math.random()):this.flush())}start(t){super.start(t)}}EffectFactory.add({slide:s,high_rot:i,normal_rot:r,random_rot:a,shock:n})}]);