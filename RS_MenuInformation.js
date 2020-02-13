//================================================================
// RS_MenuInformation.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_MenuInformation.js
 * @plugindesc This plugin provides the Information Window that adds a text via the global variable.
 * @author biud436
 *
 * @param Menu Name
 * @desc Type the menu name
 * @default Information
 *
 * @help
 * You might want to add a new text string in current line. This plugin command
 * is stored as text strings in the global memory space until the game ends.
 *
 *    MenuInformation add Hello, World
 *    MenuInformation add \image<picture_name> image1...
 *    MenuInformation add \image<picture_name:90> image2...
 *
 * Here plugin command is deleted all texts that are stored in the global memory
 * space.
 *
 *    MenuInformation clear
 *
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.01.04 (v1.0.0) - First Release.
 * 2016.02.27 (v1.0.1) - Fixed a few code (makeCommandList → addOriginalCommands)
 * 2016.03.05 (v1.0.1b) - Fixed the class structure.
 * 2017.01.23 (v1.0.2) - Converted sources to ES6.
 * 2017.09.06 (v1.0.3) - Converted sources to ES5.
 * 2019.07.05 (v1.0.4) :
 * - Added the image text code.
 * 2020.02.13 (v1.0.5) :
 * - it is saved the menu information in the save file.
 * - Now it is possible to run this plugin even in the RMMV 1.5.2 or less.
 */
/*:ko
 * @plugindesc 간단한 텍스트를 표기할 수 있는 창을 만들 수 있습니다.
 * @author biud436
 *
 * @param Menu Name
 * @text 메뉴 이름
 * @desc 메뉴에 추가될 버튼의 이름을 적으세요.
 * @default Information
 *
 * @help
 * =============================================================================
 * 플러그인 명령에 대해...
 * =============================================================================
 * 
 * 정보 창에 새로운 라인을 추가하려면 다음 명령을 사용하세요.
 *
 *    MenuInformation add Hello, World
 *    MenuInformation add \image<picture_name> wow...
 *    MenuInformation add \image<picture_name:90> image2...
 *
 * 모든 텍스트를 삭제하려면 다음 명령을 사용하세요.
 *
 *    MenuInformation clear
 * 
 * 스크립트 호출을 위한 메서드는 제공되지 않습니다.
 *
 * =============================================================================
 * 변동 사항
 * =============================================================================
 * 2016.01.04 (v1.0.0) - 출시.
 * 2016.02.27 (v1.0.1) - 약간의 코드 수정 (makeCommandList → addOriginalCommands)
 * 2016.03.05 (v1.0.1b) - 클래스 구조가 수정되었습니다.
 * 2017.01.23 (v1.0.2) - 소스를 ES6으로 변환했습니다.
 * 2017.09.06 (v1.0.3) - 소스를 ES5로 변환했습니다.
 * 2019.07.05 (v1.0.4) :
 * - 이미지 텍스트 코드 추가
 * 2020.02.13 (v1.0.5) :
 * - 세이브 파일에 메뉴 정보가 저장되게 하였습니다.
 * - 이제 1.5.2 이하 버전에서도 실행가능합니다.
 */

var Imported = Imported || {};
Imported.RS_MenuInformation = true;

!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e,t,n){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=a(e)););return e}(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(n):r.value}})(e,t,n||e)}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}var p=PluginManager.parameters("RS_MenuInformation"),d=String(p["Menu Name"]||"Information"),m=[],h=Utils.generateRuntimeId(),y=Game_Variables.prototype.initialize;Game_Variables.prototype.initialize=function(){y.call(this),this._menuInformation=[]},Game_Variables.prototype.addMenuInformation=function(e){this._menuInformation||(this._menuInformation=[]),this._menuInformation.push(e)},Game_Variables.prototype.menuInformation=function(){return this._menuInformation||(this._menuInformation=[]),this._menuInformation},Game_Variables.prototype.clearMenuInformation=function(){this._menuInformation=[]};var b=function(){function e(){s(this,e)}return f(e,null,[{key:"add",value:function(e){$gameVariables.addMenuInformation(e)}},{key:"clear",value:function(){$gameVariables.clearMenuInformation()}},{key:"allText",value:function(){return $gameVariables.menuInformation().join("\n")}}]),e}();window.MenuInformation=b;var _=Window_MenuCommand.prototype.addOriginalCommands;Window_MenuCommand.prototype.addOriginalCommands=function(){_.call(this),this.addInformationCommand()},Window_MenuCommand.prototype.addInformationCommand=function(){this.addCommand(d,"information",!0)};var v=Scene_Menu.prototype.createCommandWindow;Scene_Menu.prototype.createCommandWindow=function(){v.call(this),this._commandWindow.setHandler("information",this.commandInformation.bind(this))},Scene_Menu.prototype.commandInformation=function(){SceneManager.push(I)};var g=function(e){function t(){var e;return s(this,t),(e=r(this,a(t).call(this,0,0,Graphics.boxWidth,Graphics.boxHeight)))._text="",e}return u(t,Window_Base),f(t,[{key:"setText",value:function(e){this._text!==e&&(this._text=e,this.refresh())}},{key:"clear",value:function(){this.setText("")}},{key:"refresh",value:function(){this.contents.clear(),this.drawTextEx(this._text,this.textPadding(),0)}},{key:"obtainEscapeCode",value:function(e){e.index++;var t=/^[\$\.\|\^!><\{\}\\]|^[a-zA-Z?-?]+[!]*/i.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,t[0].toUpperCase()):""}},{key:"obtainImage",value:function(e){var t=/\<(.*)\>/i.exec(e.text.slice(e.index));return t?(e.index+=t[0].length,t[1]):""}},{key:"addImage",value:function(e,t){var n=0;t=t.replace(/\:(\d+)/i,(function(e,t){return n=parseFloat(RegExp.$1),""}));var o=ImageManager.loadPicture(t),r=e.x,i=e.y,a=this.contents._context;n||(n=0);var u=Math.PI/180*n,c=Math.cos(u),s=Math.sin(u),l=r;u&&(l+=this.width/2-2*this.standardPadding());var f=i;a.save(),a.setTransform(c,s,-s,c,l,f),this.contents.blt(o,0,0,o.width,o.height,r,i),a.restore()}},{key:"processEscapeCharacter",value:function(e,n){switch(e.toLowerCase()){case"image":this.addImage(n,this.obtainImage(n));break;default:i(a(t.prototype),"processEscapeCharacter",this).call(this,e,n)}}}]),t}(),I=function(e){function t(){var e;return s(this,t),(e=r(this,a(t).call(this)))._isReady=!1,e}return u(t,Scene_MenuBase),f(t,[{key:"create",value:function(){i(a(t.prototype),"create",this).call(this),m=[],b.allText().replace(/(?:IMAGE)\<(.*)\>/gi,(function(e,t){var n=t.replace(/\:(\d+)/i,(function(){return""}));m.push(n)})),m.forEach((function(e){ImageManager.reservePicture(e,0,h)}),this),this._isReady=!0}},{key:"start",value:function(){i(a(t.prototype),"start",this).call(this),this._informationWindow=new g,this.addWindow(this._informationWindow),this.refresh()}},{key:"isReady",value:function(){return this._isReady&&i(a(t.prototype),"isReady",this).call(this)}},{key:"update",value:function(){i(a(t.prototype),"update",this).call(this),this.isCancelled()&&this.popScene()}},{key:"terminate",value:function(){i(a(t.prototype),"terminate",this).call(this),ImageManager.releaseReservation(h)}},{key:"isCancelled",value:function(){return Input.isTriggered("menu")||TouchInput.isCancelled()}},{key:"refresh",value:function(){this.actor();this._informationWindow.setText(b.allText()),this._informationWindow.refresh(),this._informationWindow.activate()}}]),t}();window.Scene_Information=I;var w=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(e,t){if(w.call(this,e,t),"MenuInformation"===e)switch(t[0].toLowerCase()){case"add":var n=t.slice(1).join(" ");b.add(n);break;case"clear":b.clear()}},Imported.RS_ArabicMessageSystem&&RS.ArabicMessageSystem.defineInitialize(g)}]);
//# sourceMappingURL=RS_MenuInformation.js.map