/**
 * @author biud436
 */
const fs = require('fs-extra');
const path = require('path');
const ConsoleColor = require('./ConsoleColor');
const EnigmaFileArchive = require("./EnigmaFileArchive");

class Enigma {
    /**
     * @param {String} buf
     * @param {Buffer} buf 
     */
    constructor(outputPath, buf) {

        /**
         * @type {Buffer}
         */
        this._rawData = buf;

        this._rawBufLength = buf.length;

        this._isValidSignature = false;
        this._offset = 0;
        this._allFileSize = 0;

        /**
         * @type {EnigmaFileArchive[]}
         */
        this._files = [];

        /**
         * @type {EnigmaFileArchive[]}
         */        
        this._sortedFiles = [];

        this._addedFileSize = 0;
        this._dataOffset = 0;

        this._minDepth = 0;
        this._maxDepth = 0;

        this._binaryPath = "";
        
    }

    unpack(binaryPath) {
        this._binaryPath = binaryPath;

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
                    break;
                } 
            }
    
        }

        this._dataOffset = curOffset;

    }

    exportFiles() {
        const fileLength = this._files.filter(i => i.isFile()).length;
        const folderLength = this._files.filter(i => !i.isFile()).length - 1;

        // 올림 차순으로 정렬한다 (1->2->3->4)
        this._sortedFiles = this._files.slice(0).sort( (a, b) => {
            return a._treeIndex - b._treeIndex;
        });

        this._minDepth = this._sortedFiles[0]._treeIndex;
        this._maxDepth = this._sortedFiles[this._sortedFiles.length - 1]._treeIndex;

        this._sortedFiles[0]._filePath = ".";

        this.exploreFiles(this._sortedFiles[0]);

    }

    /**
     * @param {Buffer} data 
     * @return {Buffer}
     */
    toSafeBuffer(data) {


        var resultBuffer = new ArrayBuffer(data.length);
        var view = new DataView(resultBuffer);

        var resultArray = new Uint8Array(resultBuffer);
        var byteArray = new Uint8Array(data);

        for (var i = 0; i < resultArray.length; i++) {
            resultArray[i] = byteArray[i];
            view.setUint8(i, resultArray[i]);
        }

        var buf = Buffer.alloc(resultBuffer.byteLength);
        var headerView = new Uint8Array(resultBuffer);
        for (var i = 0; i < resultBuffer.byteLength; i++) {
            buf[i] = headerView[i];
        }            

        return buf;        
    }

    /**
     * 내부 파일을 탐색하면서 파일 경로와 파일 내용을 작성한다.
     * @param {EnigmaFileArchive} root 
     */
    exploreFiles(root) {
        
        var lastFolders = [];

        this._files.forEach((file, i, files) => {
            const nextFile = files[i + 1];
            if(!nextFile) return;
            const depth = nextFile._treeIndex;
            
            if(!file.isFile()) {
                lastFolders[file._treeIndex - 1] = file;
                if((file._treeIndex - 2) >= 0) {
                    file._parent = lastFolders[file._treeIndex - 2];
                    lastFolders[file._treeIndex - 2]._children.push(file);
                } else {
                    file._parent = {_filename: "root"};
                }
            } else {
                var findDepth = file._treeIndex;
                if(lastFolders[findDepth - 2]) {
                    lastFolders[findDepth - 2]._children.push(file);
                    file._parent = lastFolders[findDepth - 2];
                }                                
            }

            if(file._treeIndex !== depth) {
                if(file._treeIndex > depth) {
                    // console.log(`${nextFile._filename}로 진입 / 트리 깊이가 바뀝니다.`);
                } else if (file._treeIndex < depth) {
                    // console.log(`${file._filename}]라는 폴더가 생성되어야 합니다.`);
                }
            }
        });

        var folders = this._files.filter(file => {return !file._isFile;});

        /**
         * 
         * @param {Array<string>} src 
         * @param {EnigmaFileArchive} root 
         */
        var concatPath = (src, root) => {
            if(!root) return;
            src.push(root._filename);                
            if(root._parent) {
                concatPath(src, root._parent);
            }      
        };

        /**
         * 
         * @param {EnigmaFileArchive} root 
         */
        var enumerate = (root) => {
            root._children.forEach(file => {
                if(!file.isFile()) {
                    enumerate(file);
                } else {
                    file._filePath = [];
                    concatPath(file._filePath, file);
                    file._filePath = `${this._binaryPath}/${file._filePath.reverse().slice(2).join("/")}`;                
                }                
            });
        };

        enumerate(folders.shift());

        var offset = this._dataOffset;

        this._files.forEach(file => {

            var safeBuffer = this.toSafeBuffer(this._rawData.slice(offset, offset + file._originalSize));
            offset += (file._originalSize);

            if(!file._isFile) {
                
            } else {
                if(!fs.existsSync(path.dirname(file._filePath))) {
                    fs.ensureDirSync(path.dirname(file._filePath));
                }
                
                console.log(file._filePath);
                
                fs.writeFileSync(file._filePath, safeBuffer, "utf8");               
                
            }

        });

    }

}

module.exports = {
    "Core": Enigma,
};