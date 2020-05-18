const $gameMap = {
    requestRefresh() {

    }
};

const $gameSystem = {
    _invSlots: "",
    saveSlots(data) {
        this._invSlots = data;
    },
    restoreSlots() {
        return this._invSlots || "";
    }
};

const $gameParty = {
    allItems() {
        const fs = require('fs');
        const filename = "E:/Games/201907/data/Items.json";
        if(fs.existsSync(filename)) {
            return JSON.parse(fs.readFileSync(filename));
        } else {
            return [null];
        }
    },
    gainItem(item, number, equip) {

    }
};

const JsonEx = JSON;

class Game_Inventory {

    constructor() {
        // 복구용 슬롯
        this._restoreSlots = [];
        // 멤버 변수 생성        
        this.initMembers();
        // 저장
        this.save();        
        // 인벤토리 준비
        this.prepareInventory();
    }

    initMembers() {
        // 최대 슬롯수
        this._maxSlots = 64;

        /**
         * @type {{item:RPG.Item|RPG.Weapon|RPG.Armor, name:String, iconIndex:Number, description:String, slotId:Number}[]}
         */
        this._slots = [];        
        // 준비 여부
        this._prepared = false;
        // 슬롯 아이디
        this._id = 0;   
    }

    slots() {
        let slots = this._slots.slice(0);
        slots.sort((a, b) => {
            return a.slotId - b.slotId;
        });
        return slots;
    }

    /**
     * 인벤토리 시스템에 맞는 아이템 오브젝트를 생성한다.
     */        
    prepareInventory() {
        var data;

        // 모든 아이템을 가져온다            
        data = $gameParty.allItems();
        
        // 아이템 오브젝트를 차례대로 읽는다.
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // 인벤토리 용 아이템을 생성한다.
            if(item && item.name !== "") {
                this.createItem(item);
            }
        }

        // 슬롯 복구
        this.restore();

        // 준비 완료
        this._prepared = true;
    }

    save() {
        // 슬롯의 인덱스만 추출한다.
        var newList = this._slots.map(function(i) {
            if(i) return i.slotId;
            return null;
        })
        const slotSerialize = {
            list: newList,
            id: this._id,
        };
        // 해당 슬롯의 인덱스를 세이브 파일에 저장한다.
        $gameSystem.saveSlots(JsonEx.stringify(slotSerialize));
    }

    restore() {
        const slotDeserialize = JsonEx.parse($gameSystem._invSlots);

        this._restoreSlots = slotDeserialize.list;
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
        // this._id = this._restoreSlots.length;
        this._id = this._restoreSlots.length;
    }

    removeAllSlots() {
        // 멤버 변수를 다시 생성한다.
        this.initMembers();
    }

    updateInventory() {
        // 모든 슬롯을 제거한다.
        this.removeAllSlots();
        // 인덱스 복구
        this.restore();
        // 인벤토리를 다시 준비한다.
        this.prepareInventory();
    }

    newItem(slotId, item) {
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
    }

    isExist(slotId) {
        // 슬롯 목록에서 아이템을 찾는다. 
        var item = this._slots.filter(function(i) {
            return i && (i.slotId === slotId);
        });
        return item[0];
    }

    /**
     * 
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item 
     */
    indexOf(item) {
        const ret = this._slots.filter(i => {
            return i.item === item;
        });
        
        return ret[0] ? ret[0].slotId : -1;
    }

    findItem(slotId) {
        const ret = this._slots.filter(i => {
            return i.slotId === slotId;
        });      
        
        return ret && ret[0];
    }

    nextId() {

        // 인덱스 값을 1 늘린다.
        this._id = (this._id + 1) % this._maxSlots;

        return this._id;
    }

    /**
     * 빈 슬롯에 새로운 아이템을 추가합니다.
     * @param {Object} item 
     */
    createItem(item) {
        // 아이템을 특정 슬롯에 설정한다.
        var newItem = this.newItem(this._id, item);

        // 슬롯에 아이템을 추가한다.
        this._slots.push(newItem);

        // ID 값을 1만큼 늘린다.
        this.nextId();        
    }   
    
    /**
     * 아이템을 교체합니다.
     * @param {Number} slotId1 
     * @param {Number} slotId2 
     */
    swapItem(slotId1, slotId2) {
        // 인덱스를 찾는다.
        var item1 = this._slots.indexOf(this.isExist(slotId1));
        var item2 = this._slots.indexOf(this.isExist(slotId2));
        // 인덱스를 못찾으면 -1이 나오므로, 0 이상을 조건으로 찾아낸다.
        if(item1 >= 0 && item2 >= 0) {
            this._slots[item1].slotId = slotId2;
            this._slots[item2].slotId = slotId1;
        }
        this._slots.sort((a, b) => {
            return a.slotId - b.slotId;
        });
    }

    /**
     * 
     * @param {Number} prev 기존 슬롯
     * @param {Number} newTo 새로운 슬롯 (비어있어야 함)
     */
    moveTo(prev, newTo) {
        // 인덱스를 찾는다.
        var item1 = this._slots.indexOf(this.isExist(prev));
        var item2 = this._slots.indexOf(this.isExist(newTo));

        // 인덱스를 못찾으면 -1이 나오므로, 0 이상을 조건으로 찾아낸다.
        if(item1 >= 0 && item2 === -1) {
            // 스왑 코드
            var temp = this._slots[item1].slotId;
            this._slots[item1].slotId = newTo;
        }
        this._slots.sort((a, b) => {
            return a.slotId - b.slotId;
        });        
    }

    /**
     * 
     * @param {Number|{}} slotId|item
     */
    removeItem(item) {
        const type = typeof(item);
        
        if(type === "number") { // 숫자를 전달하였는가?
            const slotId = item;
            let deleteItem = this.isExist(slotId);
            var deleteIndex = this._slots.indexOf(deleteItem);
            if(deleteIndex >= 0) {
                // 해당 인덱스의 원소를 삭제한다.
                $gameParty.gainItem(deleteItem.item, -1, true);
                this._slots.splice(deleteIndex, 1);
                this.save();
            }
        } else { // 오브젝트를 전달하였는가?
            if($gameParty.numItems(item) > 0) return;
            const ret = this._slots.filter(i => i.item == item);
            const slot = ret[0];
            const idx = this._slots.indexOf(slot);
        }
    }

    refresh() {
        $gameMap.requestRefresh();
    }

}

const inven = new Game_Inventory();
console.log("로드된 아이템 갯수 : %d", inven._slots.length);

console.log("아이템 스왑 체크"); // swap
console.log(inven._slots);
inven.swapItem(0, 3);
console.log(inven._slots);

console.log("아이템 이동 체크"); // move
inven.moveTo(1, 4);
console.log(inven._slots);

console.log("아이템 삭제 체크"); // remove
inven.removeItem(3);
console.log(inven._slots);

console.log("아이템 오브젝트 찾기"); // find item
const data = inven.findItem(4);
console.log(data);

console.log("아이템 인덱스 찾기"); // find index
console.log("인덱스는 %d", inven.indexOf(data.item));