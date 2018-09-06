/*:
 * @plugindesc <RS_Inventory>
 * @author biud436
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
                    console.log("emitOnDragStart : ", e);
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
        constructor(index, item) {
            super();
            this._index = index;
            this._item = item;        
            this.pivot.set(0.5, 0.5);
            this.initBitmaps();
        }

        initMembers() {
            super.initComponents();
            this._size = new PIXI.Rectangle(0, 0, 32, 32);
            this._divideAreaForHeight = 1;
            this._isOnTooltip = false;
            this._startX = this.x;
            this._startY = this.y;
        }        

        initBitmaps() {

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

            let gridX = Math.floor(this.x / w);
            let gridY = Math.floor(this.y / h);
            
            let index = ((8 * gridY) + gridX) - 8;

            // 해당 슬롯에 아이템이 있는지 확인합니다.            
            if($gameInventory.isEmpty(index)) {
                this.x = gridX * w;
                this.y = (gridY * h).clamp(h, 256 - h);
                
                let prevIndex = this._index;
                this._index = index;

                let temp = $gameInventory._slots[prevIndex];
                $gameInventory._slots[prevIndex] = $gameInventory._slots[index];
                $gameInventory._slots[index] = $gameInventory._slots[prevIndex];

            } else {
                // 아이템이 있는 위치에는 옮길 수 없다.
                // 나중에 교환 처리로 바꾸자.
                this.x = this._startX;
                this.y = this._startY;
            }
            
        }
        
        onDragStart(event) {
            this.savePosition();
            super.onDragStart(event, true);
        }

        onDragEnd(event) {
            super.onDragEnd(event, true);                      
            // 그리드에 정렬합니다.
            this.setGrid();
        }

        onDragMove(event) {
            this.updatePosition();
            super.onDragMove(event, true);
            if(this.dragging) {
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
                // Game Action 추가
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
            this._size = new PIXI.Rectangle(0, 0, 256, 256);
            this._backgroundBitmap = new Bitmap(this._size.width, this._size.height);
            this._background = new Sprite();   
            this._divideAreaForHeight = 8;
            this._data = $gameInventory.slots();
            this._itemLayer = [];
        }

        refresh() {
            if(!this._backgroundBitmap) return;
            this._data = $gameInventory.slots();
            this._backgroundBitmap.clear();
            this.removeChild.apply(this, this._itemLayer);
            this.initBitmaps();
            this.initSlots();
            this._background.bitmap = this._backgroundBitmap;
        }

        initBitmaps() {
            this._backgroundBitmap.fillAll("black");    
            this._backgroundBitmap.fontSize = 14;        
        }

        initBackground() {
            this._background.bitmap = this._backgroundBitmap;
            this._background.opacity = 200;
            this.addChild(this._background);            
        }

        initSlots() {
            const pad = 2;
            const width = this._size.width;
            const height = this._size.height;
            const itemWidth = Math.floor(width / 8);
            const itemHeight = Math.floor(height / 8);
            let index = 0;
            this._itemLayer = [];
        
            for (let y = 0; y < 8; y++) {
                if(y === 0) {
                    this._backgroundBitmap.drawText("테스트 창", 1, 0, 200, 32, "left");
                    continue;
                }
                for (let x = 0; x < 8; x++) {
                    let mx = (itemWidth * x);
                    let my = (itemHeight * y);
                    let color = `rgba(${ Math.round(Math.random() * 255)}, ${ Math.round(Math.random() * 255)}, ${ Math.round(Math.random() * 255)}, 0.6)`;
                    this._backgroundBitmap.fillRect(mx, my, itemWidth - 2, itemHeight - 2, color );
                    
                    // 0부터
                    var data = $gameInventory.slots();
                    const item = data[index];

                    if(item) {
                        const itemSprite = new Inventory_Item(index, item);
                        itemSprite.x = mx;
                        itemSprite.y = my;

                        this._itemLayer.push(itemSprite);
                            
                        this.addChild(itemSprite);
                    
                        index += 1;
                    }

                }
            }



        }

        drawAllItems() {
            const max = this._data.length;
        };

        drawItem(item, x, y) {
            let index = item.iconIndex;
            let name = item.name;
            let number = $gameParty.numItems(item);
            let description = item.description;
            let price = item.price;
            let consumable = item.consumable;
            let speed = item.speed;
            let successRate = item.successRate;
        }

        onDragStart(event) {
            super.onDragStart(event, false);
        }

        onDragEnd(event) {
            super.onDragEnd(event, false);
            $gameTemp.inventoryX = this.x;
            $gameTemp.inventoryY = this.y;                  
        }

        onDragMove(event) {
            super.onDragMove(event, false);
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
    // InventoryManager
    //==========================================================       

    function InventoryManager() {
        this.initialize.apply(this, arguments);
    };
    
    InventoryManager.prototype.constructor = InventoryManager;
    
    InventoryManager.prototype.initialize = function() {
        // 멤버 변수 생성
        this.initMembers();
        // 인벤토리 준비
        this.prepareInventory();
    };

    InventoryManager.prototype.initMembers = function() {
        // 열
        this._cols = 8;
        // 행
        this._rows = 8;
        // 최대 슬롯수
        this._maxSlots = 64 - 8;
        // 슬롯
        this._slots = [];
        // 준비 여부
        this._prepared = false;
        // 슬롯 아이디
        this._id = 0;        
    };

    InventoryManager.prototype.slots = function() {
        return this._slots;
    };

    /**
     * 인벤토리 시스템에 맞는 아이템 오브젝트를 생성한다.
     */
    InventoryManager.prototype.prepareInventory = function() {
        // 모든 아이템을 가져온다
        var data = $gameParty.allItems();
        // 아이템 오브젝트를 차례대로 읽는다.
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // 인벤토리 용 아이템을 생성한다.
            if(item) {
                this.createItem(item);
            }
        }
        // 준비 완료
        this._prepared = true;
    };

    InventoryManager.prototype.removeAllSlots = function() {
        // 멤버 변수를 다시 생성한다.
        this.initMembers();
    };

    InventoryManager.prototype.updateInventory = function() {
        // 모든 슬롯을 제거한다.
        this.removeAllSlots();
        // 인벤토리를 다시 준비한다.
        this.prepareInventory();
    };

    InventoryManager.prototype.newItem = function(slotId, item) {

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

    InventoryManager.prototype.isEmpty = function(slotId) {
        // 슬롯 목록에서 아이템을 찾는다. 
        var item = this._slots.filter(function(i) {
            return i.slotId === slotId;
        });
        return item[i];
    };

    InventoryManager.prototype.nextId = function() {

        // 인덱스 값을 1 늘린다.
        this._id = (this._id + 1) % this._maxSlots;

        return this._id;

    };

    /**
     * 빈 슬롯에 새로운 아이템을 추가합니다.
     * @param {Object} item 
     */
    InventoryManager.prototype.createItem = function(item) {
        // 아이템을 특정 슬롯에 설정한다.
        var newItem = this.newItem(this._id, item);

        // 슬롯에 아이템을 추가한다.
        this._slots.push(newItem);

        // ID 값을 1만큼 늘린다.
        this.nextId();        
    };        

    /**
     * 더 이상 추가할 수 없습니다.
     */
    InventoryManager.prototype.alert = function() {
        
    };

    InventoryManager.prototype.getIndex = function(slotId1) {

    };

    InventoryManager.prototype.swapItem = function(slotId1, slotId2) {
        // 인덱스를 찾는다.
        var item1 = this._slots.indexOf(this.isEmpty(slotId1));
        var item2 = this._slots.indexOf(this.isEmpty(slotId2));
        // 인덱스를 못찾으면 -1이 나오므로, 0 이상을 조건으로 찾아낸다.
        if(item1 >= 0 && item2 >= 0) {
            // 스왑 코드
            var temp = JsonEx.parse(JsonEx.stringify(this._slots[item1]));
            this._slots[item1] = this._slots[item2];
            this._slots[item2] = temp;
        }
    };

    InventoryManager.prototype.removeItem = function(slotId) {
        // 삭제할 요소를 찾는다.
        let deleteItem = this.isEmpty(slotId);
        var deleteIndex = this._slots.indexOf(deleteItem);
        if(deleteIndex >= 0) {
            // 해당 인덱스의 원소를 삭제한다.
            this._slots.splice(deleteIndex, 1);
        }
    };

    InventoryManager.prototype.sort = function() {
        // 정렬한다.
        this._slots.sort(function(a, b) {
            return a.slotId - a.slotId;
        });
        // 다시 그린다.
        this.refresh();
    };

    InventoryManager.prototype.refresh = function() {
        $gameMap.requestRefresh();
    };

    //==========================================================
    // Game_System
    //==========================================================        

    var alias_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        alias_DataManager_createGameObjects.call(this);
        $gameInventory = new InventoryManager();
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
        this.on('refreshInventory', this.refreshInventory, this);
    };

    Scene_Map.prototype.refreshInventory = function() {
        if(!this._spriteset) return;
        return setTimeout(function() {
            let inventory = this._spriteset._inventory;
            inventory.refresh();
        }.bind(this), 5);
    };

    Scene_Map.prototype.processMapTouch = function() {
    };    

})(RS.Inventory);