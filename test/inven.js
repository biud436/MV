
    class Game_InventoryImpl {
        constructor(width, height) {
            this.initMembers(width, height);
            this.create(width, height, Game_InventoryImpl.DATA);            
        }

        initMembers(width, height) {
            this._width = width;
            this._height = height;
            this._mainPosition = {x: 0, y: 0, parent: false};
            this._slots = [];
            this._init = false;
        }

        /**
         * 
         * @param {Number} x 
         * @param {Number} y 
         */
        isEmpty(x, y) {
            var width = this._width;
            var cell = this._slots[y * width + x];
            if (cell && cell.type === "EMPTY") {
                return true;
            }
            return false;
        }

        /**
         * 특정 셀로 옮깁니다.
         * @param {Number} x 
         * @param {Number} y 
         * @param {String} newType 
         */
        moveTo(x, y, newType) {
            var tx = x;
            var ty = y;
            var width = this._width;
            var height = this._height;
            if(tx < 0 || tx > width || ty < 0 || ty > height) {
                return;
            }

            var cell = this._slots[ty * width + tx];
            if(this.isEmpty(tx, ty)) {
                this._slots[ty * width + tx] = newType;
                return true;
            }

            return false;
        }

        /**
         * Write out an inventory data for string format.
         */
        out() {
            if(!this._init) return false;

            var cells = this._slots;
            var width = this._width;
            var height = this._height;
            let out = "";
  
            console.log("---");
            console.log(this._slots);
            console.log("---");

            for(var y = 0; y < height; y++) {
                for(var x = 0; x < width; x++) {
                    let cell = cells[y * width + x];
                    var type = cell.type;
                    var ret = "";
                    switch(type) {
                        case 'EMPTY':
                            ret = "#";
                            break;
                        case 'UNKNOWN':
                            ret = "\n";
                            break;
                        case 'ITEM_NORMAL':
                            ret = "i";
                            ret += cell.id;
                            break;
                        case 'ITEM_WEAPON':
                            ret = "w";
                            ret += cell.id;
                            break;                        
                        case 'ITEM_ARMOR':
                            ret = "a";
                            ret += cell.id;
                            break;  
                        default:    
                            ret = "\n";                                          
                    }

                    out += ret;
                    out += ",";

                }
                if(y < height - 1) {
                    out += "<BR>";
                    out += ",";
                }
            }

            var len = out.length;
            out = out.substr(0, len - 1);            

            return out;

        }

        create(width, height, data) {

            var x = 0;
            var y = 0;

            data = data.split(",");

            for(var i = 0; i < data.length; i++) {
                
                // This is a one-dimensional array uses like as the two dimensional array.
                var c = data[i];
                var t = {type: ""};

                if(c.indexOf("#") >= 0) {
                    t.type = "EMPTY";
                } else if(/[i](\d+)/.exec(c)) {
                    var itemIndex = Number(RegExp.$1);
                    if(itemIndex > 0) {
                        t.id = itemIndex;
                        t.type = "ITEM_NORMAL";
                    }   
                } else if(/[w](\d+)/.exec(c)) {
                    var itemIndex = Number(RegExp.$1);
                    if(itemIndex > 0) {
                        t.id = itemIndex;
                        t.type = "ITEM_WEAPON";
                    }                    
                } else if(/[a](\d+)/.exec(c)) {
                    var itemIndex = Number(RegExp.$1);
                    if(itemIndex > 0) {
                        t.id = itemIndex;
                        t.type = "ITEM_ARMOR";
                    }       
                } else if(c.indexOf('<BR>') >= 0) {
                    x = 0;
                    ++y;
                    t.type = "UNKNOWN";                                 
                } else {                                                       
                    t.type = "UNKNOWN";
                }
                
                if (t.type !== "UNKNOWN")
                {
                    this._slots[y * width + x] = t;
                    ++x;
                }

            }

            this._init = true;

        }

        draw(width, height) {
            for(var y = 0; y < height; ++y) {
                for(var x = 0; x < width; ++x) {
                    var cell = this._slot[y * width + x];
                    if(cell && cell.type.contains("ITEM")) {

                    }
                }
            }
        }

    }

    Game_InventoryImpl.DATA = `#,#,#,#,#,#,#,#,<BR>,i150,#,#,#,w23,#,#,#,<BR>,#,#,#,#,#,#,#,#,<BR>,#,#,#,#,#,#,#,#,<BR>,#,#,#,#,#,#,#,#,<BR>,#,#,#,#,#,#,#,#,<BR>,#,#,#,#,#,#,#,#,<BR>,#,#,#,#,#,#,#,#`;

    module.exports = Game_InventoryImpl;