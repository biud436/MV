namespace Inventory {
    export interface NewItem {
        item: RPG.BaseItem;
        name: string;
        iconIndex: number;
        description: string;
        slotId: number;
    }
}

declare class Game_Inventory {
    
    constructor();
    initMembers(): void;
    slots(): Array<Inventory.NewItem>;
    prepareInventory(): void;
    save(): void;
    restore(): void;
    removeAllSlots(): void;
    updateInventory(): void;
    newItem(slotId: number, item : RPG.BaseItem): Inventory.NewItem;
    isExist(slotId: number): Inventory.NewItem;
    indexOf(item: RPG.BaseItem): number;
    findItem(slotId: number): RPG.BaseItem;
    nextId(): number;
    createItem(item: RPG.BaseItem): void;
    swapItem(slotId1: number, slotId2: number): void;
    moveTo(prev: number, newTo: number): void;
    removeItem(item: RPG.BaseItem): void;
    refresh(): void;

    protected _restoreSlots: Array;
    protected _maxSlots: number;   
    protected _slots: Array<RPG.BaseItem>;
    protected _prepared: boolean;
    protected _id: number;
}