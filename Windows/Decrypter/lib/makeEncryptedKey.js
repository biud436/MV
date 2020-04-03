const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

if(argv.help) {
    console.log(`
Open the command line and try this.

node makeEncryptedKey.js --file <root>/www/img/characters/*.rpgmvp

    `);

    return;
}

const config = {
    EncryptExt: [".rpgmvo", ".rpgmvm", ".rpgmvw", ".rpgmvp"],
    DecryptExt: [".ogg", ".m4a", ".wav", ".png"],
    OriginHeaders: {
        ogg: ["4F", "67", "67", "53" , "00", "02", "00", "00", "00" ,"00" ,"00" ,"00" ,"00" ,"00"],
        m4a: ["00", "00", "00", "20", "66", "74", "79", "70", "4D", "34", "41", "20", "00", "00", "00", "00"],
        png: ["89", "50", "4E", "47", "0D", "0A", "1A", "0A", "00", "00", "00", "0D", "49", "48", "44", "52"],
        wav: ["52", "49", "46", "46", "24", "3C", "00", "00", "57", "41", "56", "45", "66", "6D", "74", "20"]
    }
};

class App {
    /**
     * Make Encrypted Key from rpgmvp file.
     * @param {Buffer} buffer
     * @return {Array}
     */
    makeEncryptedKey(buffer) {
        if(this._isFoundEncryptionKey) return;

        this._encryptionKey = [];

        for(var i = 0x00; i < 0x10; i++) {
            const offset = i;
            this._encryptionKey[offset] = buffer.readUInt8(i + 0x10) ^ parseInt(config.OriginHeaders.png[offset], 16);
        }

        this._encryptionKey = this._encryptionKey.map(i => {
            return Number(i).toString(16);
        });

        this._isFoundEncryptionKey = true;

        return this._encryptionKey;
    }
}

if(argv.file) {
    let buffer = fs.readFileSync(argv.file.replace(/\\/g, "/"));
    let app = new App();
    console.log(app.makeEncryptedKey(buffer));
}
