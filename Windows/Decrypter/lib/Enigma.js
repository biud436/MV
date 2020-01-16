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
        this.exportFiles();

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

        // 4바이트가 왜 남지? 아...
        this._allFileSize = this._rawData.readUInt32LE(startOffset) - this._rawData.readUInt16LE(startOffset + 0x20);
        console.log(this._allFileSize);
        const filesizeToMB = Math.floor(this._allFileSize / 1024 / 1024);
        console.log(`총 파일 크기는 ${ConsoleColor.FgRed}${filesizeToMB} MB${ConsoleColor.Reset} 입니다`);
        
        this._offset = this._offset + 0x53;
    }

    parseFiles() {
        var startOffset = this._offset;
        var maxOffset = this._offset + ((48 + 255) * 250);
        var data = this._rawData;
        var names = [];
        var curOffset = startOffset; 
        var lastFileType = 0;

        var mode = "buffer";

        var fileData = {
            filename: "",
            originalSize: 0,
            fileIndex: 0,
            treeIndex: 0,
            numberOfFiles: 0,
            compressedSize: 0,
            fileOffset: 0,
            isFile: false,
        };        

        var lastFileIndex = 0;

        while(curOffset <= maxOffset) {

            if(mode === "buffer") {

                paddingOffset = curOffset;

                fileData = {
                    filename: "",
                    originalSize: 0,
                    fileIndex: 0,
                    treeIndex: 0,
                    numberOfFiles: 0,
                    compressedSize: 0,
                    fileOffset: 0,
                    isFile: false,
                };

                // 파일 순서
                fileData.fileIndex = data.readInt32LE(paddingOffset);
                paddingOffset += 0x04;

                if(Math.abs(fileData.fileIndex - lastFileIndex) !== 1) {
                    break;
                }

                lastFileIndex = fileData.fileIndex;

                // 트리 깊이
                fileData.treeIndex = data.readInt32LE(paddingOffset);
                paddingOffset += 0x04;                

                // 폴더일 경우, 파일의 갯수
                fileData.numberOfFiles = data.readInt32LE(paddingOffset);
                paddingOffset += 0x04;       

                curOffset += 0x0C;
                mode = "name";

            }            
            else if(mode === "name") {
    
                var buf = data.toString("ascii", curOffset, curOffset + 0x02);
                if(buf !== "\u0000\u0000" && buf.charCodeAt() >= 32 && buf.charCodeAt() <= 128) {
                    names.push(buf);
                    curOffset += 0x02;
                } else if(buf === "\u0000\u0000") {
                    var tempFileName = names.join("").replace(/\0/g, '');
                    
                    curOffset += 0x02; // NULL Characters (2 Bytes)
    
                    // 파일의 타입
                    lastFileType = data.readInt8(curOffset);

                    fileData.filename = tempFileName;
    
                    if(lastFileType == 2) {
    
                        var paddingOffset = curOffset + 0x03;
                        
                        // 파일 크기
                        var fileSize = data.readInt32LE(paddingOffset);
                        paddingOffset += 0x04;
                        paddingOffset += paddingOffset + 0x2B;

                        fileData.originalSize = fileSize;
                        
                        // 압축된 파일 크기
                        var compressedSize = data.readInt32LE(paddingOffset);
                        paddingOffset += 0x04;

                        fileData.compressedSize = compressedSize;
                        
                        // 모르겠음.
                        paddingOffset += 0x04;
                        
                        if((this._addedFileSize + fileSize) >= this._allFileSize) {
                            console.log("마지막 파일을 감지하였습니다.");
                            break;
                        } else {
                            
                            this._addedFileSize += fileSize;
    
                            fileData.isFile = true;
                        
                            this._files.push( new EnigmaFileArchive(fileData) );

                            mode = "buffer";
    
                            curOffset += 0x3A;
    
                        }              
    
                    } else {
    
                        fileData.isFile = false;
                        fileData.originalSize = 0;
                        fileData.compressedSize = 0;

                        this._files.push( new EnigmaFileArchive(fileData) );               
    
                        mode = "buffer";

                        curOffset += 0x1E;
                    }
                    
                    names = [];
                } else {
                    this._dataOffset = lastFileType == 2 ? curOffset - 0x46 : curOffset - 0x2A;
                    this._dataOffset += 0x08;             
                    break;
                } 
            }
    
        }

    }

    exportFiles() {

        const fileLength = this._files.filter(i => i.isFile()).length;
        const folderLength = this._files.filter(i => !i.isFile()).length - 1;

        console.log(`${ConsoleColor.FgYellow}파일 갯수 : ${fileLength}${ConsoleColor.Reset}`);
        console.log(`${ConsoleColor.FgYellow}폴더 갯수 : ${folderLength}${ConsoleColor.Reset}`);
        
        for(var i = 1; i < 4; i++) {
            var file = this._files[i];

            var contents = this._rawData.toString(
                "ascii",
                this._dataOffset, 
                this._dataOffset + file._originalSize
            );
            
            this._dataOffset += 0x01;
            this._dataOffset += (file._originalSize);

            console.log(`
            \r데이터 오프셋 : ${this._dataOffset}
            \r파일 명 : ${file._filename}
            \r파일 크기 : ${file._originalSize}
            `);
            fs.writeFileSync(file._filename, contents, "utf8");
        };

    }

}

class EnigmaFileArchive {

    constructor(data) {
        this._filename = data.filename;
        this._originalSize = data.originalSize;
        this._fileIndex = data.fileIndex;
        this._treeIndex = data.treeIndex;
        this._numberOfFiles = data.numberOfFiles;
        this._compressedSize = data.compressedSize;
        this._isFile = data.isFile;
        this._rawOffset = data.fileOffset;
    }

    isFile() {
        return this._isFile;
    }

}

class EnigmaFolderArchive extends EnigmaFileArchive {
    constructor(data) {
        super(data);
    }

    isFile() {
        return this._isFile;
    }
    
}

module.exports = {
    "Core": Enigma,
};