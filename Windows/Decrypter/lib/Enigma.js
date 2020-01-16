/**
 * @author biud436
 */
const fs = require('fs-extra');
const path = require('path');
const ConsoleColor = require('./ConsoleColor');

class Enigma {
    /**
     * 
     * @param {Buffer} buf 
     */
    constructor(buf) {

        /**
         * @type {Buffer}
         */
        this._rawData = buf;
        this._rawBufLength = buf.length;

        this._isValidSignature = false;
        this._offset = 0;
        this._allFileSize = 0;
        this._files = [];
        this._addedFileSize = 0;
        this._dataOffset = 0;
        
        this.checkSignature();
        this.parseDataSize();
        this.parseFiles();
        // this.exportFiles();

    }

    checkSignature() {
        var startOffset = 0;
        var maxOffset = 0x100;
        var data = this._rawData;

        for(var curOffset = startOffset; curOffset <= maxOffset; curOffset = (curOffset + 0x10) & ~0x0F) {
            var buf = data.toString('ascii', curOffset, curOffset + 0x04).replace(/\0/g, '');
            if(buf == "EVB") {
                this._isValidSignature = true;
                this._offset = curOffset;
                console.log(`${ConsoleColor.FgCyan}시그니처 문자 ${buf}를 찾았습니다.${ConsoleColor.Reset}`);
                console.log(`${ConsoleColor.FgCyan}현재 오프셋 : ${(0x1CD800 + this._offset).toString(16)}${ConsoleColor.Reset}`);
                break;
            }
        }

        if(!this._isValidSignature) {
            throw new Error(".enima1 섹션에서 시그니처 문자를 찾지 못했습니다.");
        }

    }

    parseDataSize() {
        var startOffset = this._offset + 0x20;
        this._allFileSize = this._rawData.readInt32LE(startOffset);

        const filesizeToMB = Math.floor(this._allFileSize / 1024 / 1024);
        console.log(`총 파일 크기는 ${ConsoleColor.FgRed}${filesizeToMB} MB${ConsoleColor.Reset} 입니다`);
        
        this._offset = this._offset + 0xAB;
    }

    parseFiles() {
        var startOffset = this._offset;
        var maxOffset = this._offset + ((48 + 255) * 250);
        var data = this._rawData;
        var names = [];
        var curOffset = startOffset; 
        var lastFileType = 0;

        while(curOffset <= maxOffset) {
            var buf = data.toString("ascii", curOffset, curOffset + 0x02);
            if(buf !== "\u0000\u0000" && buf.charCodeAt() >= 32 && buf.charCodeAt() <= 128) {
                names.push(buf);
                curOffset += 2;
            } else if(buf === "\u0000\u0000") {
                var tempFileName = names.join("").replace(/\0/g, '');
                
                console.log(tempFileName);
                curOffset += 0x02; // NULL Characters (2 Bytes)

                lastFileType = data.readInt8(curOffset);

                if(lastFileType == 2) {

                    var fileSize = data.readInt32LE(curOffset + 0x03);
                    
                    if((this._addedFileSize + fileSize) >= this._allFileSize) {
                        // console.log("마지막 파일을 감지하였습니다.");
                        break;
                    } else {
                        this._addedFileSize += fileSize;
                    
                        this._files.push(
                            new EnigmaFileArchive(
                                tempFileName, 
                                curOffset, 
                                fileSize, 
                                this._rawData
                            )
                        );

                        curOffset += 0x46;

                    }              

                } else {
                    curOffset += 0x2A;
                }
                
                names = [];
            } else {
                this._dataOffset = lastFileType == 2 ? curOffset - 0x46 : curOffset - 0x2A;
                this._dataOffset += 0x08;             
                break;
            }
        }

    }

    exportFiles() {
        
        console.log(`${this._addedFileSize} / ${this._allFileSize}`);

        for(var i = 0; i < 1; i++) {
            var file = this._files[i];
            var contents = this._rawData.toString(
                "utf8",
                this._dataOffset, 
                this._dataOffset + file._originalSize
            );
            fs.writeFileSync(file._filename, contents, "utf8");
        };

    }

}

class EnigmaFileArchive {
    constructor(name, offset, fileSize, rawData) {
        this._filename = name;
        this._originalSize = fileSize;
        this._fileIndex = 0;
        this._treeIndex = 0;
        this._numberOfFiles = 0;
        this._compressedSize = fileSize;

        /**
         * @type {Buffer}
         */
        this._rawData = rawData;
        this._rawOffset = offset;
    }

}

module.exports = {
    "Core": Enigma,
};