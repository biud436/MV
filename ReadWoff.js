const argv = require("minimist")(process.argv.slice(2));
const fs = require("fs");
const path = require("path");
const font = argv.font.replace(/\\/g, "/");
const zlib = require("zlib");

function getNativeFontFamily(filename) {
    if (!fs.existsSync(filename)) {
        throw new Error(`${filename} didn't exist!`);
    }

    let buffer = fs.readFileSync(filename);
    let offset = 0x00;

    if (buffer.readUInt32BE(offset) !== 0x774f4646) {
        throw new Error("woff 파일이 아닙니다.");
    }

    offset += 0x08;

    console.log("파일 크기 : %d", buffer.readUInt32BE(offset));

    offset += 0x04; // 12바이트

    let numOfTables = buffer.readUInt16BE(offset);

    console.log("테이블 갯수 : %d", numOfTables);

    offset += 0x02;

    console.log("reserved : %d", buffer.readUInt16BE(offset));

    offset += 0x02;

    console.log("totalSfntSize : %d", buffer.readUInt32BE(offset));
    offset += 0x04;
    console.log("majorVersion : %d", buffer.readUInt16BE(offset));
    offset += 0x02;
    console.log("minorVersion : %d", buffer.readUInt16BE(offset));
    offset += 0x02;
    console.log("metaOffset : %d", buffer.readUInt32BE(offset));
    offset += 0x04;
    console.log("metaLength : %d", buffer.readUInt32BE(offset));
    offset += 0x04;
    console.log("metaOrigLength : %d", buffer.readUInt32BE(offset));
    offset += 0x04;
    console.log("privOffset : %d", buffer.readUInt32BE(offset));
    offset += 0x04;
    console.log("privLength : %d", buffer.readUInt32BE(offset));
    offset += 0x04;

    let tables = [];

    const nameHeader = {};
    const nameTables = [];

    for (let i = 0; i < numOfTables; i++) {
        const table = {};
        table.tag = buffer.toString("utf8", offset, offset + 4);
        offset += 0x04;
        table.offset = buffer.readUInt32BE(offset);
        offset += 0x04;
        table.compLength = buffer.readUInt32BE(offset);
        offset += 0x04;
        table.origLength = buffer.readUInt32BE(offset);
        offset += 0x04;
        table.origChecksum = buffer.readUInt32BE(offset);
        offset += 0x04;

        let buffer2 = buffer.slice(
            table.offset,
            table.offset + table.compLength
        );

        console.log(table.tag);

        if (table.tag === "name") {
            const buf = zlib.inflateSync(buffer2);

            if (buf) {
                nameHeader.format = buf.readInt16BE(0x00);
                nameHeader.count = buf.readInt16BE(0x02);
                nameHeader.stringOffset = buf.readInt16BE(0x04);

                let nameOff = 0x06;

                for (let i = 0; i < nameHeader.count; i++) {
                    const nameTable = {};

                    nameTable.platformID = buf.readInt16BE(nameOff + 0x00);
                    nameTable.encodingID = buf.readInt16BE(nameOff + 0x02);
                    nameTable.languageID = buf.readInt16BE(nameOff + 0x04);
                    nameTable.nameID = buf.readInt16BE(nameOff + 0x06);
                    nameTable.length = buf.readInt16BE(nameOff + 0x08);
                    nameTable.offset = buf.readInt16BE(nameOff + 0x0a);
                    nameTable.buf = buf;

                    nameOff += 0x0c; // 12

                    const off = nameTable.offset + nameHeader.stringOffset;
                    nameTable.name = nameTable.buf.toString(
                        "utf8",
                        off,
                        off + nameTable.length
                    );
                    nameTable.name = nameTable.name.replace(/\u0000/gi, "");

                    nameTables.push(nameTable);
                }
            }
        }
    }

    return nameTables.filter((i) => i.nameID === 1)[0];
}

console.log(getNativeFontFamily(font));
