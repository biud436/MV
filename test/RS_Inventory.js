/*:
 * @plugindesc <RS_Inventory>
 * @author biud436
 * @help
 * ==============================================================
 * Comment
 * ==============================================================
 * 이 플러그인은 아직 개발 중에 있습니다.
 * 깃허브에는 오류 발생 시 다시 예전 버전으로 돌아가기 위한 용도로 기록을 남기고 있습니다.
 * 
 * 완성도가 너무 낮은 플러그인은 블로그에 올리지 않습니다.
 * 하지만 깃허브에는 과정이 남아있을 수도 있습니다.
 * 블로그에 제대로 올라오기 전까지는 사용을 권장하지 않으므로,
 * 별도의 사용법도 따로 없으며 지원도 없습니다.
 */

var Imported = Imported || {};
Imported.RS_Inventory = true;

var RS = RS || {};
RS.Inventory = RS.Inventory || {};

var $gameInventory;

(function($) {
    
    "use strict";

    //==========================================================
    // DraggingableSprite
    //==========================================================

    class DraggingableSprite extends Sprite 
    {
        constructor() {
            super();
            this.initMembers();
            this.initComponents();    
            this.on('removed', this.dispose, this);        
        }

        dispose() {
            this.removeComponents();
        }
                    
        initMembers() {
            this._size = new Rectangle(0, 0, 32, 32); 
            this._divideAreaForHeight = 8;
            this._startX = this.x;
            this._startY = this.y;
        }

        initComponents() {
            this.on("onDragStart", this.onDragStart, this);
            this.on("onDragEnd", this.onDragEnd, this);
            this.on("onDragMove", this.onDragMove, this);
            this.on("onButtonTriggered", this.onButtonTriggered, this);
            this.on("onButtonReleased", this.onButtonReleased, this);
            this.on("onButtonEnter", this.onButtonEnter, this);
            this.on("onButtonExit", this.onButtonExit, this);
        }
    
        removeComponents() {   
            this.off("onDragStart", this.onDragStart, this);
            this.off("onDragEnd", this.onDragEnd, this);
            this.off("onDragMove", this.onDragMove, this);        
            this.off("onButtonTriggered", this.onButtonTriggered, this);
            this.off("onButtonReleased", this.onButtonReleased, this); 
            this.off("onButtonEnter", this.onButtonEnter, this);    
            this.off("onButtonExit", this.onButtonExit, this);                
        }

        emitOnDragStart(event) {
            if(this.children != null) {
                this.children.forEach(function(e) {
                    e.emit("onDragStart", event);
                    e.emit("onButtonTriggered", event);
                }, this);
            }
        }

        emitOnDragEnd(event) {
            if(this.children != null) {
                this.children.forEach(function(e) {
                    e.emit("onDragEnd", event);
                    e.emit("onButtonReleased", event);                    
                }, this);
            }            
        }

        emitOnDragMove(event) {
            if(this.children != null) {
                this.children.forEach(function(e) {
                    e.emit("onDragMove", event);
                }, this);
            }                
        }

        emitOnButtonEnter(event) {
            if(this.children != null) {
                this.children.forEach(function(e) {
                    e.emit("onButtonEnter", event);
                }, this);
            }                                
        }


        emitOnButtonExit(event) {
            if(this.children != null) {
                this.children.forEach(function(e) {
                    e.emit("onButtonExit", event);
                }, this);
            }                                
        }        

        isInside(data) {
            var px = this.parent.x || 0;
            var py = this.parent.y || 0;
            var x = px + this.x;
            var y = py + this.y;
            var mx = data.x;
            var my = data.y;
            var tw = x + this._size.width;
            var th = y + this._size.height / this._divideAreaForHeight;
            var inside = false;

            if((mx > x && mx < tw)) {
                if(my > y && my < th) {
                    inside = true;
                }
            }
            
            return inside;

        }

        /**
         * @param {MouseEvent} event 
         */
        onDragStart(event, skipEmit) {
            this.data = new PIXI.Point(
                Graphics.pageToCanvasX(event.pageX), 
                Graphics.pageToCanvasY(event.pageY)
            );   
            const inside = this.isInside(this.data);
            if(inside && event.button === 0) {
                this.padding = new PIXI.Point(this.data.x - this.x, this.data.y - this.y);
                this.alpha = 0.5;
                this.dragging = true;
            }

            if(!skipEmit) this.emitOnDragStart(event);

        }
        
        /**
         * @param {MouseEvent} event 
         */        
        onDragEnd(event, skipEmit) {
            this.alpha = 1;
            this.dragging = false;
            this.data = null;
            this.padding = null; 

            if(!skipEmit) this.emitOnDragEnd(event);

        }     
        
        /**
         * @param {MouseEvent} event 
         */        
        onDragMove(event, skipEmit) {
            if (this.dragging) {
                this.data = new PIXI.Point(
                    Graphics.pageToCanvasX(event.pageX), 
                    Graphics.pageToCanvasY(event.pageY)
                );                  
                var newPosition = this.data;
                this.x = (newPosition.x - this.padding.x);
                this.y = (newPosition.y - this.padding.y);
            }        

            if(!skipEmit) this.emitOnDragMove(event);

        }       

        canvasToLocalX(x) {
            let node = this;
            while (node) {
                x -= node.x;
                node = node.parent;
            }
            return x;
        }   
        
        canvasToLocalY(y) {
            let node = this;
            while (node) {
                y -= node.y;
                node = node.parent;
            }
            return y;
        }
        
        /**
         * 버튼을 눌렀을 때
         * @param {MouseEvent} event 
         */
        onButtonTriggered(event, skipEmit) {

        }

        /**
         * 버튼을 똈을 때
         * @param {MouseEvent} event 
         */
        onButtonReleased(event, skipEmit) {
            
        }        

        /**
         * 
         * @param {MouseEvent} event 
         */
        onButtonEnter(event, skipEmit) {

        }

        /**
         * 
         * @param {MouseEvent} event 
         */
        onButtonExit(event, skipEmit) {

        }

    }

    //==========================================================
    // Inventory_Item
    //==========================================================

    class Inventory_Item extends DraggingableSprite
    {
        
        /**
         * 
         * @param {Number} index the index into an inventory.
         * @param {Object} item the object contains the information for the item. 
         */
        constructor(index, slotIndex) {
            super();
            this._index = index;
            this._slotIndex = slotIndex;        
            this.pivot.set(0.5, 0.5);
            this._item = null;            
            this.initBitmaps();
        }

        initMembers() {
            super.initComponents();
            this._size = new PIXI.Rectangle(0, 0, 32, 32);
            this._divideAreaForHeight = 1;
            this._isOnTooltip = false;
            this._startX = this.x;
            this._startY = this.y;    
            this._lastButton = 0;        
        }        

        initBitmaps() {

            this._item = $gameInventory._slots[this._slotIndex];

            let bitmap = ImageManager.loadSystem('IconSet');
            let iconIndex = this._item.iconIndex;
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var sx = iconIndex % 16 * pw;
            var sy = Math.floor(iconIndex / 16) * ph;

            let num = $gameParty.numItems(this._item.item);
            
            this._background = new Sprite(new Bitmap(32, 32));
            this._background.bitmap.fontSize = 12;
            this._background.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0);
            this._background.bitmap.textColor = "white";
            this._background.bitmap.drawText(num, 0, 5, 30, 32, "right");

            this.addChild(this._background);
        }

        update() {
            super.update(); 
        }

        savePosition() {
            this._startX = this.x.clamp(0, 256 - 32);
            this._startY = this.y.clamp(32, 256 - 32);    
            this._startPX = this.x.clamp(0, 256 - 32);
            this._startPY = this.y.clamp(32, 256 - 32);   
        }

        updatePosition() {
            this._startPX = this.x.clamp(0, 256 - 32);
            this._startPY = this.y.clamp(32, 256 - 32);               
        }

        checkRestorePosition() {
            if(!this.parent) return;            
            if(this.x < 0 || this.x > (this.parent._size.width - this._size.width)) {
                this.x = this._startPX;
            }        
            if(this.y < 32 || this.y > (this.parent._size.height - this._size.height)) {
                this.y = this._startPY;
            }
        }

        setGrid() {
            let parent = this.parent;
            if(!parent) return;

            let w = this._size.width;
            let h = this._size.height;

            // 그리드 좌표를 구함 (32등분)
            let gridX = Math.floor(this.x / w).clamp(0, 7);
            let gridY = Math.floor(this.y / h).clamp(0, 7);
            
            // 그리드에서의 인덱스를 찾는다 (0 ~ 63)
            let index = ((8 * gridY) + gridX) - 8;

            // 해당 슬롯에 아이템이 있는지 확인       
            if(!$gameInventory.isExist(index)) {
                this.x = gridX * w;
                this.y = gridY * h;
                
                let prevIndex = this._index;
                this._index = index;

                $gameInventory.moveTo(prevIndex, index);

            } else {
                // 아이템이 있는 위치에는 옮길 수 없다.
                // 나중에 교환 처리로 바꾸자.
                this.x = this._startX;
                this.y = this._startY;
            }
            
        }
        
        onDragStart(event) {
            this._isDragEnd = false;
            this.savePosition();
            super.onDragStart(event, true);
        }

        onDragEnd(event) {
            super.onDragEnd(event, true);                      
            // 그리드에 정렬합니다.
            if(!this._isDragEnd && event.button === 0 && this._lastButton !== 2) {
                this.setGrid();
            }
            // 이 플래그가 없으면 그리드 함수가 6번 연속으로 실행되면서 버그를 일으킨다.
            this._isDragEnd = true;
            this._lastButton = event.button;
        }

        onDragMove(event) {
            this.updatePosition();
            super.onDragMove(event, true);
            if(this.dragging && event.button === 0) {
                // 밖으로 드래그 못하게 합니다.
                this.checkRestorePosition();                                   
            }
            
        }        

        /**
         * @param {MouseEvent} event 
         */
        onButtonTriggered(event, skipEmit) {
            if(this.dragging) {
                this.scale.x = 0.8;
                this.scale.y = 0.8;
                this._fire = true;
            }
        }

        /**
         * @param {MouseEvent} event 
         */
        onButtonReleased(event, skipEmit) {
            if(this._fire) {
                this.scale.x = 1.0;
                this.scale.y = 1.0;               
                this._fire = false;
                // 아이템 사용 코드가 여기에 온다.
                // Game Action의 인스턴스를 만들어야 한다. 하지만 왜 이렇게 해야 하는 걸까?
            }
        }        
    }

    //==========================================================
    // InventoryView
    //==========================================================    

    class InventoryView extends DraggingableSprite
    {
        constructor() {
            super();
            this.initBitmaps();
            this.initBackground();
            this.initSlots();
            this.drawAllItems();
        }

        initComponents() {
            document.addEventListener("mousedown", this.onDragStart.bind(this));
            document.addEventListener("mouseup", this.onDragEnd.bind(this));
            document.addEventListener("mousemove", this.onDragMove.bind(this));
        }
    
        removeComponents() {
            document.removeEventListener("mousedown", this.onDragStart.bind(this));
            document.removeEventListener("mouseup", this.onDragEnd.bind(this));
            document.removeEventListener("mousemove", this.onDragMove.bind(this));            
        }        

        initMembers() {
            super.initMembers();
            // 하드코딩된 숫자들은 전부 나중에 데이터 대입식으로 바꿔야 한다.
            this._size = new PIXI.Rectangle(0, 0, 256, 256);
            this._backgroundBitmap = new Bitmap(this._size.width, this._size.height + 32);
            this._background = new Sprite();   
            this._divideAreaForHeight = 8;
            this._data = $gameInventory.slots();
            this._itemLayer = [];
            this._itemIndex = 0;

            this._mousePos = new PIXI.Point(0, 0);
            this._currentState = "NONE";
            this._mouseButtonReleased = false;

            this._velocityX = 0;
            this._velocityY = 0;

            this._paddingX = 0;
            this._paddingY = 0;
        }

        refresh() {
            if(!this._backgroundBitmap) return;
            // 인벤토리에서 슬롯을 가지고 온다.
            this._data = $gameInventory.slots();
            // 비트맵을 비운다
            this._backgroundBitmap.clear();
            // 아이템 스프라이트를 모두 제거한다.
            this.removeChild.apply(this, this._itemLayer);
            // 비트맵 재생성
            this.initBitmaps();
            // 슬롯 재생성
            this.initSlots();
            // 비트맵 재할당
            this._background.bitmap = this._backgroundBitmap;
        }

        initBitmaps() {
            // 인벤토리를 검은색으로 채운다.
            this._backgroundBitmap.fillAll("black");    
            this._backgroundBitmap.fontSize = 14;        
        }

        initBackground() {
            this._background.bitmap = this._backgroundBitmap;
            this._background.opacity = 200;
            this.addChild(this._background);            
        }

        resetIndex() {
            this._itemIndex = 0;
            this._itemLayer = [];
        }

        setInventoryTitle(titleValue) {
            // https://pixijs.io/pixi-text-style/#%7B%22style%22%3A%7B%22align%22%3A%22center%22%2C%22dropShadow%22%3Atrue%2C%22dropShadowBlur%22%3A1%2C%22dropShadowColor%22%3A%22%23585858%22%2C%22dropShadowDistance%22%3A0%2C%22fill%22%3A%5B%22%23dd863e%22%2C%22%23fef7da%22%5D%2C%22fontSize%22%3A16%2C%22strokeThickness%22%3A1%7D%2C%22text%22%3A%22text%22%2C%22background%22%3A%22%23252525%22%7D
            const style = new PIXI.TextStyle({
                dropShadow: true,
                dropShadowBlur: 1,
                dropShadowColor: "#585858",
                dropShadowDistance: 0,
                fill: [
                    "#dd863e",
                    "#fef7da"
                ],
                fontSize: 16,
                fontWeight: "bold",
                strokeThickness: 1
            });
            
            const text = new PIXI.Text(titleValue, style);
            text.x = 1;
            this._itemLayer.push(text);
            this.addChild(text);
        }

        drawGold() {
            
            let goldValue = `${$gameParty.gold()} ${TextManager.currencyUnit}`;

            const style = new PIXI.TextStyle({
                align: "right",
                breakWords: true,
                dropShadow: true,
                dropShadowBlur: 1,
                dropShadowColor: "#585858",
                dropShadowDistance: 0,
                fill: [
                    "#af8f45",
                    "#4b4943"
                ],
                fontSize: 16,
                fontWeight: "bold",
                stroke: "#d3d3d3",
                strokeThickness: 2,
                wordWrap: true,
                wordWrapWidth: 300
            });
            
            const text = new PIXI.Text(goldValue, style);
            text.x = this._size.width - text.width;
            text.y = 32 * 8;
            this._itemLayer.push(text);
            this.addChild(text);
        }

        createTable(itemWidth, itemHeight) {
            for (let y = 0; y < 7; y++) {
                for (let x = 0; x < 8; x++) {
                    let mx = (itemWidth * x);
                    let my = 32 + (itemHeight * y);                         
                    // 슬롯 색상 값을 램덤으로 한다. (다시 그려진다는 것을 효과적으로 확인하기 위해)
                    let color = 'rgba(30,30,30,0.75)';
                    this._backgroundBitmap.fillRect(mx, my, itemWidth - 2, itemHeight - 2, color );
                    
                    // 0부터
                    var data = $gameInventory.slots();
                    const item = data[this._itemIndex];

                    if(item) this.addItem(item, mx, my, itemWidth, itemHeight);

                }
            }
        }

        addItem(item, mx, my, itemWidth, itemHeight) {

            const itemSprite = new Inventory_Item(item.slotId, this._itemIndex);
            
            mx = itemWidth * (item.slotId % 8);
            my = 32 + (itemHeight * Math.floor(item.slotId / 8));                   

            itemSprite.x = mx;
            itemSprite.y = my;

            this._itemLayer.push(itemSprite);
                
            this.addChild(itemSprite);
        
            this._itemIndex += 1;
        }

        initSlots() {

            // 슬롯과 슬롯 사이의 간격
            const pad = 2;

            // 전체 테이블의 크기
            const width = this._size.width;
            const height = this._size.height;

            // 아이템 슬롯의 크기
            const itemWidth = Math.floor(width / 8);
            const itemHeight = Math.floor(height / 8);

            this.resetIndex();

            // 타이틀 설정
            this.setInventoryTitle("Grid Inventory");

            // 테이블 생성
            this.createTable(itemWidth, itemHeight);

            // 골드 값 표시
            this.drawGold();

        }

        update() {
            super.update();
            this.updateState();
            // this.updateVelocity();
        }

        updateVelocity() {
            if(!this._mousePos) return;
            if(!this.isMouseClicked()) return;
            this._velocityX = this._mousePos.x - (this.x + this._paddingX);
            this._velocityY = this._mousePos.y - (this.y + this._paddingY);

            this._velocityX = this._velocityX / 50;
            this._velocityY = this._velocityY / 50;

            this.x += this._velocityX;
            this.y += this._velocityY;
        }

        updateState() {
            if(this._mousePos.x < (this.x + this._size.width)
            && this._mousePos.x > this.x
            && this._mousePos.y < (this.y + this._size.height + 32)
            && this._mousePos.y > this.y) {
                if(this.dragging && this._mouseButtonReleased) {
                    this._currentState = "CLICKED";
                    this._mouseButtonReleased = false;
                    // this.emit("onButtonTriggered");
                    if(this._background) this._background.setColorTone([60, 60, 60, 60]);
                } else if(!this.dragging) {
                    this._mouseButtonReleased = true;
                    this._currentState = "MOUSE_OVER";
                    // this.emit("onButtonEnter");
                    if(this._background) this._background.setColorTone([30, 30, 30, 30]);
                }
            } else {
                this._currentState = "MOUSE_OUT";
                // this.emit("onButtonExit");
                if(this._background) this._background.setColorTone([0, 0, 0, 0]);
            }
        }

        isMouseOut() {
            return this._currentState === "MOUSE_OUT";
        }

        isMouseOver() {
            return this._currentState === "MOUSE_OVER";            
        }

        isMouseClicked() {
            return this._currentState === "CLICKED";
        }

        drawAllItems() {
            const max = this._data.length;
        };

        onDragStart(event) {
            super.onDragStart(event, false);    
            if(this.isMouseOver()) {
                this._paddingX = this._mousePos.x - this.x;
                this._paddingY = this._mousePos.y - this.y;
            }
        }

        onDragEnd(event) {
            super.onDragEnd(event, false);
            // 메뉴 진입 시 인벤토리 위치를 기억한다.
            $gameTemp.inventoryX = this.x;
            $gameTemp.inventoryY = this.y;         
        }

        onDragMove(event) {
            super.onDragMove(event, false);
            if(this._mousePos) {
                this._mousePos = new PIXI.Point(
                    Graphics.pageToCanvasX(event.pageX), 
                    Graphics.pageToCanvasY(event.pageY)
                );    
            }   
        }        

    }    

    //==========================================================
    // Inventory
    //==========================================================      

    class Inventory extends Sprite
    {
        constructor() {
            super();
            this.initMembers();            
            this.initView();
            this.restorePosition();
            this.on('removed', this.dispose, this);
        }

        initMembers() {
            this._size = new Rectangle(0, 0, 256, 256);  
        }

        initView() {
            this._view = new InventoryView();
            this.addChild(this._view);
        }

        restorePosition() {
            this.x = $gameTemp.inventoryX || 0;
            this.y = $gameTemp.inventoryY || 0;
        }

        refresh() {
            if(!this._view) return;
            this._view.refresh();
        }

        update() {
            super.update();
        }

    }

    //==========================================================
    // Game_Inventory
    //==========================================================       

    function Game_Inventory() {
        this.initialize.apply(this, arguments);
    };
    
    Game_Inventory.prototype.constructor = Game_Inventory;
    
    Game_Inventory.prototype.initialize = function() {
        // 복구용 슬롯
        this._restoreSlots = [];
        // 멤버 변수 생성        
        this.initMembers();
        // 저장
        this.save();        
        // 인벤토리 준비
        this.prepareInventory();
    };

    Game_Inventory.prototype.initMembers = function() {
        // 최대 슬롯수
        this._maxSlots = 64;
        // 슬롯
        this._slots = [];        
        // 준비 여부
        this._prepared = false;
        // 슬롯 아이디
        this._id = 0;        
    };

    Game_Inventory.prototype.slots = function() {
        return this._slots;
    };

    /**
     * 인벤토리 시스템에 맞는 아이템 오브젝트를 생성한다.
     */
    Game_Inventory.prototype.prepareInventory = function() {
        
        var data;

        // 모든 아이템을 가져온다            
        data = $gameParty.allItems();
        
        // 아이템 오브젝트를 차례대로 읽는다.
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // 인벤토리 용 아이템을 생성한다.
            if(item) {
                this.createItem(item);
            }
        }

        // 슬롯 복구
        this.restore();

        // 준비 완료
        this._prepared = true;

    };

    Game_Inventory.prototype.save = function() {
        // 슬롯의 인덱스만 추출한다.
        var newList = this._slots.map(function(i) {
            return i.slotId;
        })
        // 해당 슬롯의 인덱스를 세이브 파일에 저장한다.
        $gameSystem.saveSlots(JsonEx.stringify(newList));
    };

    Game_Inventory.prototype.restore = function() {
        // 인덱스 값이 배열로 저장되어있다.
        this._restoreSlots = JsonEx.parse($gameSystem._invSlots);
        if(typeof(this._restoreSlots) === "array") {
            console.warn("인덱스 배열을 찾지 못했습니다");
            return;
        }
        this._restoreSlots.forEach(function(e, i, a) {
            var item = this._slots[i];
            if(item && item.hasOwnProperty("slotId")) {
                let prev = this._slots[i].slotId;
                this._slots[i].slotId = e;
            }
        }, this);
        this._id = this._restoreSlots.length;
    };

    Game_Inventory.prototype.removeAllSlots = function() {
        // 멤버 변수를 다시 생성한다.
        this.initMembers();
    };

    Game_Inventory.prototype.updateInventory = function() {
        // 모든 슬롯을 제거한다.
        this.removeAllSlots();
        // 인덱스 복구
        this.restore();
        // 인벤토리를 다시 준비한다.
        this.prepareInventory();
    };

    Game_Inventory.prototype.newItem = function(slotId, item) {

        var newItem = {};

        // 아이템 설정
        newItem.item = item;

        // 아이템 제목
        newItem.name = item.name || "";

        // 아이템 아이콘 인덱스
        newItem.iconIndex = item.iconIndex || 0;

        // 아이템 설명
        newItem.description = item.description;

        // 아이템 슬롯 ID
        newItem.slotId = slotId || 0;

        return newItem;
    };

    Game_Inventory.prototype.isExist = function(slotId) {
        // 슬롯 목록에서 아이템을 찾는다. 
        var item = this._slots.filter(function(i) {
            return i && (i.slotId === slotId);
        });
        return item[0];
    };

    Game_Inventory.prototype.nextId = function() {

        // 인덱스 값을 1 늘린다.
        this._id = (this._id + 1) % this._maxSlots;

        return this._id;

    };

    /**
     * 빈 슬롯에 새로운 아이템을 추가합니다.
     * @param {Object} item 
     */
    Game_Inventory.prototype.createItem = function(item) {
        // 아이템을 특정 슬롯에 설정한다.
        var newItem = this.newItem(this._id, item);

        // 슬롯에 아이템을 추가한다.
        this._slots.push(newItem);

        // ID 값을 1만큼 늘린다.
        this.nextId();        
    };        

    /**
     * 아이템을 교체합니다.
     * @param {Number} slotId1 
     * @param {Number} slotId2 
     */
    Game_Inventory.prototype.swapItem = function(slotId1, slotId2) {
        // 인덱스를 찾는다.
        var item1 = this._slots.indexOf(this.isExist(slotId1));
        var item2 = this._slots.indexOf(this.isExist(slotId2));
        // 인덱스를 못찾으면 -1이 나오므로, 0 이상을 조건으로 찾아낸다.
        if(item1 >= 0 && item2 >= 0) {
            this._slots[item1].slotId = slotId2;
            this._slots[item2].slotId = slotId1;
        }
    };

    /**
     * 
     * @param {Number} prev 기존 슬롯
     * @param {Number} newTo 새로운 슬롯 (비어있어야 함)
     */
    Game_Inventory.prototype.moveTo = function(prev, newTo) {
        // 인덱스를 찾는다.
        var item1 = this._slots.indexOf(this.isExist(prev));
        var item2 = this._slots.indexOf(this.isExist(newTo));

        // 인덱스를 못찾으면 -1이 나오므로, 0 이상을 조건으로 찾아낸다.
        if(item1 >= 0 && item2 === -1) {
            // 스왑 코드
            var temp = this._slots[item1].slotId;
            this._slots[item1].slotId = newTo;
        }
    };

    Game_Inventory.prototype.removeItem = function(slotId) {
        // // 삭제할 요소를 찾는다.
        let deleteItem = this.isExist(slotId);
        var deleteIndex = this._slots.indexOf(deleteItem);
        if(deleteIndex >= 0) {
            // 해당 인덱스의 원소를 삭제한다.
            $gameParty.loseItem(deleteItem.item, -1, true);
            this._slots.splice(deleteIndex, 1);
            this.save();
        }
    };

    Game_Inventory.prototype.refresh = function() {
        $gameMap.requestRefresh();
    };

    //==========================================================
    // DataManager
    //==========================================================        

    var alias_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        alias_DataManager_createGameObjects.call(this);
        $gameInventory = new Game_Inventory();
    };

    //==========================================================
    // Game_System
    //==========================================================    

    var alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        alias_Game_System_initialize.call(this);
        this._invSlots = "";
    };

    Game_System.prototype.saveSlots = function(data) {
        this._invSlots = data;
    };

    Game_System.prototype.restoreSlots = function() {
        return this._invSlots || "";
    };    

    //==========================================================
    // Game_Map
    //==========================================================          

    var alias_Game_Map_refresh = Game_Map.prototype.refresh;
    Game_Map.prototype.refresh = function() {
        alias_Game_Map_refresh.call(this);
        $gameInventory.updateInventory();        
        eval('SceneManager._scene.emit("refreshInventory")');
    };

    //==========================================================
    // Spriteset_Map
    //==========================================================          


    var alias_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        alias_Spriteset_Map_createLowerLayer.call(this);
        this._inventory = new Inventory();
        this.addChild(this._inventory);
    };

    //==========================================================
    // Scene_Map
    //==========================================================       

    var alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() { 
        alias_Scene_Map_start.call(this);
        $gameInventory.updateInventory();        
        this.on('refreshInventory', this.refreshInventory, this);   
    };

    Scene_Map.prototype.saveInventory = function() {
        $gameInventory.save();
    };    

    var alias_Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        alias_Scene_Map_terminate.call(this);
        this.saveInventory();
    };

    Scene_Map.prototype.refreshInventory = function() {
        if(!this._spriteset) return;
        return setTimeout(function() {
            $gameInventory.save();            
            let inventory = this._spriteset._inventory;
            inventory.refresh();
        }.bind(this), 5);
    };

    Scene_Map.prototype.processMapTouch = function() {
    };    

})(RS.Inventory);