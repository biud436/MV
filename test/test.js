var Inventory = require('./Inven.js');

var inv = new Inventory(8, 8);
inv.moveTo(0, 0, { type: 'ITEM_WEAPON', id: 23 });
console.log(inv.out());