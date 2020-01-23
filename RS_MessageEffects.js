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
 * @help
 * 
 * This help document does not support English translation yet.
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
 * 무겁게 돌아가는 회전 공식을 적용한 텍스트 회전 이펙트입니다.
 * 실제로 텍스트는 회전되지 않으며 지구가 태양을 공전하는 것처럼 원점을 기반으로 
 * 위치를 바꿉니다. 
 * 
 * 또한 각 플러그인 명령은 속도나 방향에 따라 분기되어있습니다.
 * 
 * MessageEffectMap high_rot
 * MessageEffectMap normal_rot
 * MessageEffectMap random_rot
 * 
 * 제가 다양한 효과를 더 넣을 수 있을 것 같은데요.
 * 사실 이외의 이펙트는 생각이 나지 않습니다.
 * 
 * 또한 삼각 함수를 쓸 때 마다 최적화에 대한 압박감이 찾아옵니다.
 * 필자가 보유하고 있는 서적에서는 기저 벡터라는 것으로 이 문제를 해결하지만
 * 최선의 방법인지는 모르겠습니다.
 * 
 * 아무튼 검증되기 전에 쓰셔도 상관 없으나 제가 책임은 지지 않습니다.
 * ================================================================
 * Change Log
 * ================================================================
 * 2020.01.23 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_MessageEffects = true;

var RS = RS || {};
RS.MessageEffects = RS.MessageEffects || {};

(function($) {
    
    "use strict";

    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_MessageEffects>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.Params = {};
    $.Params.currentEffect = "pingpong";

    //================================================================
    // TextEffect
    //================================================================
    class TextEffect extends Sprite {
        constructor(bitmap) {
            super(bitmap);
            this._isStarted = false;
            this._effectType = "pingpong";
        }

        update() {
            super.update();
            this.updateEffects();
        }

        updateEffects() {
            if(!this._isStarted) return;
            switch(this._effectType) {
                default:
                case 'pingpong':
                    if(this._power <= 60) {
                        this.y = this._startY + ((Math.PI * 2.0) / this._power) * 4.0;
                        this._power++;
                    } else {
                        this._isStarted = false;
                    }
                    break;
                case 'slide':
                    if(this._power <= 60) {
                        this.x = this._startX + ((Math.PI * 2.0) / this._power) * (this._index % 4) * 4;
                        this.opacity = 4 * this._power;
                        this._power++;
                    } else {
                        this._isStarted = false;
                    }
                    break;            
                case 'high_rot':
                    if(this._power <= this._random) {
                        let dist = this._random - this._power;
                        let tm = performance.now();
                        let r = (Math.PI / 180.0) * dist * (this._random % 2 == 0 ? -tm : tm);
                        let c = Math.cos(r);
                        let s = Math.sin(r);
                        let tx = this._startX - dist;
                        let ty = this._startY - dist;
                        this.x = tx * c - ty * s;
                        this.y = tx * s + ty * c;
                        this._power++;
                    } else {
                        this._isStarted = false;
                    }
                    break;
                case 'normal_rot': 
                    if(this._power <= this._random) {
                        let dist = this._random - this._power;
                        let tm = performance.now();
                        let r = (Math.PI / 180.0) * dist * (this._index % 3 == 0 ? -1 : 1);
                        let c = Math.cos(r);
                        let s = Math.sin(r);
                        let tx = (this._startX - dist);
                        let ty = this._startY - dist;
                        this.x = tx * c - ty * s;
                        this.y = tx * s + ty * c;
                        this._power++;
                    } else {
                        this._isStarted = false;
                    }
                  break;                    
                case 'random_rot': 
                    if(this._power <= this._random) {
                        let dist = this._random - this._power;
                        let r = (Math.PI / 180.0) * dist * (this._random % 2 == 0 ? -1 : 1);
                        let c = Math.cos(r);
                        let s = Math.sin(r);
                        let tx = this._startX - dist;
                        let ty = this._startY - dist;
                        this.x = tx * c - ty * s;
                        this.y = tx * s + ty * c;
                        this._power++;
                    } else {
                        this._isStarted = false;
                    }
                    break;                    
                    
            }
        }

        /**
         * @param {String} effectType 
         * @param {Number} index
         */
        start(effectType, index) {
            this._now = performance.now();
            this._isStarted = true;       
            this._power = 1;   
            this._startY = this.y;
            this._startX = this.x;
            this._random = Math.floor(Math.random() * 60);
            this._effectType = effectType;
            this._index = index;
        };
    }

    //================================================================
    // Window_MessageImpl
    //================================================================    
    class Window_MessageImpl extends Window_Message {
        constructor() {
            super();

            this.createMainTextLayer();

            this.once("removed", () => {
                this.terminateMainTextLayer();
            });

        }

        /**
         * 
         * @param {MV.TextState} textState 
         */        
        newPage(textState) {
            super.newPage(textState)
            this._mainTextLayer.removeChildren();
        }

        createMainTextLayer() {
            this._mainTextLayer = new Sprite();
            this._mainTextLayer.setFrame(0, 0, Graphics.boxWidth, Graphics.boxHeight);
            this._mainTextLayer.on("effect", this.startTextEffect, this);
            this._windowContentsSprite.addChild(this._mainTextLayer);
        }

        terminateMainTextLayer() {
            this._windowContentsSprite.removeChild(this._mainTextLayer);
            this._mainTextLayer = null;
        }

        terminateMessage() {
            super.terminateMessage();

            if(this._mainTextLayer) {
                this._mainTextLayer.removeChildren();
            }
        }

        /**
         * @param {Array} args
         */
        startTextEffect(args) {
            if(!args[0]) return;
            args[0].start(args[1], args[2]);
        }

        /**
         * 
         * @param {MV.TextState} textState 
         */
        addText(textState) {
            if(!this.contents) {
                this.createContents();
            }

            let c = textState.text[textState.index++];
            
            let w = this.textWidth(c);
            let h = textState.height;
            
            let sprite = new TextEffect();
            sprite.bitmap = new Bitmap(w * 2, h);

            // FontFace를 먼저 설정해야 색깔이 정상적으로 변경됨
            sprite.bitmap.fontFace = this.standardFontFace();

            sprite.bitmap.fontSize = this.standardFontSize();
            sprite.bitmap.fontItalic = this.contents.fontItalic;
            sprite.bitmap.textColor = this.contents.textColor;
            sprite.bitmap.outlineColor = this.contents.outlineColor;
            sprite.bitmap.outlineWidth = this.contents.outlineWidth;

            // 자동 개행, 배경색 설정을 위해서.
            if(Imported.RS_MessageSystem) {
                sprite.bitmap.fontBold = this.contents.fontBold;

                var width = this.contentsWidth();

                var isValid = ($gameMessage.getBalloon() === -2) && !this._isUsedTextWidthEx && RS.MessageSystem.Params.isParagraphMinifier;
            
                this.processWordWrap(textState, w, width, isValid);
            
                if($gameMessage.faceName() !== "") {
                  width = this.contents.width - (Window_Base._faceWidth);
                  isValid = (RS.MessageSystem.Params.faceDirection === 2);
                  this.processWordWrap(textState, w, width, isValid);
                }

                if(this.contents.highlightTextColor != null) {
                    sprite.bitmap.fillRect( 0, 0, w + 1.0, textState.height, this.contents.highlightTextColor);
                }
                
            }

            sprite.x = textState.x;
            sprite.y = textState.y;

            sprite.bitmap.drawText(c, 0, 0, w * 2 , h, "left");

            this._mainTextLayer.addChild(sprite);
            this._mainTextLayer.emit("effect", [
                sprite, 
                $.Params.currentEffect, 
                textState.index
            ]);
            
            textState.x += w;
        }

        initMembers() {
            super.initMembers();
        }

        /**
         * 
         * @param {MV.TextState} textState 
         */        
        processNormalCharacter(textState) {
            this.addText(textState);
        }

    }

    window.Window_Message = Window_MessageImpl;

    //================================================================
    // MessageEffectCommands
    //================================================================     
    class MessageEffectCommands extends Game_Interpreter {
        pluginCommand(command, args) {
            super.pluginCommand(command, args);
            if("MessageEffectMap" === command) {
                RS.MessageEffects.Params.currentEffect = args[0];
            }
        }
    }

    window.Game_Interpreter = MessageEffectCommands;
    
})(RS.MessageEffects);