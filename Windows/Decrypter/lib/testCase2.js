const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const os = require('os');

/**
 * @help
 * Open the command line and try this.
 * 
 * node testCase2.js --file <ProjectDir>audio/bgm/*.rpgmvo
 * 
 * and then you can see at the following the result.
 * 
 * [
 * '4F', '67', '67', '53',
 * '00', '02', '00', '00',
 * '00', '00', '00', '00',
 * '00', '00', '1d', '68'
 * ]
 * 
 */

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
     * 복호화 키가 없을 때, OGG 헤더의 SerialNumber 값을 추정하여 복구하는 기능으로 
     * Version는 0x02로 가정하고, Flags, GranulePosition는 0x00으로 채운다.
     * 
     * @param {Buffer} buffer
     * @return {Array}
     */
    getOggDecryptedHeader(buffer) {
        
        // https://svn.xiph.org/trunk/vorbis-tools/oggenc/oggenc.c
        // struct _ogg_header (27바이트)
        // {
        //     quint32 Signature; (4 바이트) => OggS
        //     quint8 Version; (1바이트) => 0x00
        //     quint8 Flags; (1바이트) => 0x02
        //     quint64 GranulePosition; (8바이트) => 00000000
        //     quint32 SerialNumber; (4바이트) => 무작위 값이며 rand()와 같다.
        //     quint32 SequenceNumber; (4바이트)
        //     quint32 Checksum; (4바이트)
        //     quint8 TotalSegments; (1바이트)
        // };      

        let offset = 0x00;

        // rpgmvo의 헤더 (16 Byte)
        offset += 0x10;

        let header = {
            signature: "",
            serialNumber: 0x00,
            totalSegments: 0x01,
        };

        // ! OGG 헤더 1
        offset += 0x04;
        offset += 0x16;
        header.totalSegments = buffer.readUInt8(offset);
        offset += 0x02;
        offset += header.totalSegments;
        
        // ! OGG Vorbis 헤더 2
        offset += 0x1B; // 27 Byte
        offset += 0x01;
        offset += header.totalSegments;

        // 리틀 엔디언인가, 아니면 빅 엔디언인가를 구분한다.
        const isLE = os.endianness() === "LE";

        // ! OGG 데이터 헤더
        header.signature = buffer.toString("ascii", offset, offset + 0x04);
        if(header.signature === "OggS") {
            offset += 0x04;
        } else {
            throw new Error("Failed to parse the Ogg Header");
        }

        offset += 0x02;
        offset += 0x08;

        let serialNumber = isLE ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset) ;
        serialNumber = serialNumber.toString(16).match(/.{2}/g);

        header.serialNumber = isLE ? serialNumber.reverse() : serialNumber;

        // ? 제정신으로 코딩했다면 아래가 잘 동작할 것이다.
        return config.OriginHeaders.ogg.concat(header.serialNumber);

    }    
}

if(argv.file) {
    let buffer = fs.readFileSync(argv.file.replace(/\\/g, "/"));
    let app = new App();
    console.log(app.getOggDecryptedHeader(buffer));
}
