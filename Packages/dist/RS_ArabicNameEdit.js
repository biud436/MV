//================================================================
// RS_ArabicNameEdit.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <RS_ArabicNameEdit>
 * @author biud436
 * 
 * @param Font
 * @desc Specify the font face as you want.
 * @default GameFont
 *    
 * @help
 * ================================================================
 * Change Log
 * ================================================================
 * 2020.01.31 (v1.0.0) - First Release.
 * 2020.01.31 (v1.0.1) :
 * - Reviewed the Arabic letters, by Koro San.
 */
!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t,e){class r extends Window_NameEdit{constructor(t,e){super(t,e)}createActorFace(){this._actorSprite=new Sprite,this._actorSprite.visible=!1,this._windowContentsSprite.addChild(this._actorSprite)}standardFontFace(){return navigator.language.match(/^ar/)?RS.ArabicNameEdit.Params.fontFace:super.standardFontFace()}right(t){let e=this.textPadding(),r=this.contents.width-e,n=Window_Base._faceWidth;return""!==this._actor.faceName()&&(r-=n),r}itemRect2(t){return new Rectangle(this.right(t),54,42,this.lineHeight())}makeText(t){return String("‫"+t)}add(t){return this._index<this._maxLength&&(this._name+=t,this._index++,this.refresh(),!0)}name(){return this.makeText(this._name)}drawUnderline2(t,e){var r=this.underlineColor();this.contents.paintOpacity=96,this.contents.fillRect(t.x,t.y+t.height-4,e,2,r),this.contents.paintOpacity=255}drawArabicText(t,e){this.resetTextColor(),this.drawText(e,t.x,t.y)}drawActorFace2(t){const e=this._actor.faceName();if(null==e||""==e)return;const r=this._actor.faceIndex(),n=Window_Base._faceWidth,a=Window_Base._faceHeight;this._actorSprite.bitmap=ImageManager.loadFace(e),this._actorSprite.setFrame(n*(r%4),a*Math.floor(r/4),n,a),this._actorSprite.x=t.x,this._actorSprite.visible=!0}refresh(){this.contents.clear();var t=this.makeText(this._name||""),e=this.textWidth(t),r=this.itemRect2(e);this._actorSprite||this.createActorFace(),this.drawActorFace2(r),r.x-=Math.round(e),this.drawUnderline2(r,e),this.drawArabicText(r,t)}}window.Window_NameEdit=r},function(t,e){Window_NameInput.ARABIC1=["١","٢","٣","٤","٥","٦","٧","٨","٩","٠","ذ","د","خ","ح","ج","ث","ت","ب","أ","ا","غ","ع","ظ","ط","ض","ص","ش","س","ز","ر","ي","ؤ","و","ه","ن","م","ل","ك","ق","ف","","","","ـ","ئ","ى","ة","آ","إ","ء","~","!","@","#","$","%","^","&","*","(",")","_","+","=","-","","","","","","","","","","","","","","",""," "," "," "," "," "," "," "," ","Page","OK"],Window_NameInput.ARABIC2=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","a","b","c","d","e","F","G","H","I","J","f","g","h","i","j","K","L","M","N","O","k","l","m","n","o","P","Q","R","S","T","p","q","r","s","t","U","V","W","X","Y","u","v","w","x","y","Z","","","","","z","","","",""," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","Page","OK"];class r extends Window_NameInput{standardFontFace(){return navigator.language.match(/^ar/)?RS.ArabicNameEdit.Params.fontFace:super.standardFontFace()}table(){return[Window_NameInput.ARABIC1,Window_NameInput.ARABIC2]}}window.Window_NameInput=r},function(t,e,r){"use strict";r.r(e);var n=$plugins.filter((function(t){return t.description.contains("<RS_ArabicNameEdit>")})),a=n=n.length>0&&n[0].parameters;window.Imported=Imported||{},Imported.RS_ArabicNameEdit=!0,window.RS=window.RS||{},RS.ArabicNameEdit=window.RS.ArabicNameEdit||{},RS.ArabicNameEdit.jsonParse=function(t){return JSON.parse(t,(function(t,e){try{return $.jsonParse(e)}catch(t){return e}}))},RS.ArabicNameEdit.Params={},RS.ArabicNameEdit.Params.fontFace=a.Font||"GameFont";r(0),r(1)}]);