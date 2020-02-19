/**
 * @author biud436
 * @help
 */

const fs = require('fs-extra');
const Registry = require('winreg');

class RegistryMan {

    constructor(mode, data) {
        this._items = [];
        this._mode = mode;

        this.run(data);
    }

    async run(data) {
        await this.readRegistry();

        switch(this._mode) {
            case 'add':
                this.addItem(data[0], data[1], data[2], data[3]);
                break;
            case 'remove':
                this.removeItem(data[0]);
                break;
        }
    }
    
    async readRegistry() {

        const regKey = new Registry({
            hive: Registry.HKCU,
            key: `\\Software\\KADOKAWA\\RPGMV`
        });

        const getExtensionData = new Promise((resolve, reject) => {
            regKey.get("mvTools", (err, item) => {

                if(err) {
                    reject(err);
                }

                resolve(item);    

            });
        });

        await getExtensionData.then(item => {
            console.log(item.name);
            console.log(item.key);
            console.log(item.value);

            this._items = JSON.parse(item.value);

        }).catch(err => {
            throw new Error(err);
        })

        if(this._items) {
            console.log(this._items);
        }
    }

    async refreshItems() {
        const regKey = new Registry({
            hive: Registry.HKCU,
            key: `\\Software\\KADOKAWA\\RPGMV`
        });
        
        const setExtensionData = new Promise((resolve, reject) => {
            const value = JSON.stringify(this._items);
            regKey.set("mvTools", Registry.REG_SZ, value, err => {
                if(err) {
                    reject(err);
                }

                resolve(value);                    
            });
        });

        await setExtensionData.then(value => {
            console.log(`레지스트리가 성공적으로 업데이트 되었습니다.`);
            console.log(this._items);
        }).catch(err => {
            throw new Error(err);            
        })
    }

    removeItem(appName) {
        this._items = this._items.filter(item => {
            return item.appName !== appName;
        });
        console.log(`${appName}을 제거했습니다.`);
        console.log(this._items);

        this.refreshItems();
    }

    addItem(appName, hint, name, filePath) {

        console.log(appName, hint, name, filePath);
        
        const filename = filePath.replace(/\\/g, "/");

        if(!fs.existsSync(filename)) {
            throw new Error(`${appName} 을 추가할 수 없습니다. ${filename}이 존재하지 않습니다.`);
        }

        this._items.push({ 
			'appName': appName,
			'hint': hint,
			'name': name, 
			'path': filename,
        });

        this.refreshItems();
    }

}

module.exports = RegistryMan;