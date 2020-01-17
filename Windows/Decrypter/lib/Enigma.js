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

        // Signature 문자를 찾는다.
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

        this._allFileSize = this._rawData.readUInt32LE(startOffset) - this._rawData.readUInt16LE(startOffset + 0x20);
        
        const filesizeToMB = Math.floor(this._allFileSize / 1024 / 1024);
        console.log(`총 파일 크기는 ${ConsoleColor.FgRed}${filesizeToMB} MB${ConsoleColor.Reset} 입니다`);
        
        this._offset = this._offset + 0x53;
    }

    parseFiles() {
        var startOffset = this._offset;

        // 최대 오프셋 값은 섹션 로우 데이터의 크기 - 파일 크기 - 상단 오프셋의 크기이며 추정치이다.
        var maxOffset = this._rawBufLength - this._allFileSize - this._offset;

        var data = this._rawData;
        var names = [];
        var curOffset = startOffset; 
        var lastFileType = 0;

        // 버퍼 모드와 문자열 모드가 존재한다.
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

            // 버퍼 모드는 최대한 CPU를 모방하여 바이너리 데이터를 1바이트씩 읽는 데 중점을 둔다.
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

                // 파일 순서 (4Byte)
                fileData.fileIndex = data.readUInt32LE(paddingOffset);
                paddingOffset += 0x04;

                if(Math.abs(fileData.fileIndex - lastFileIndex) !== 1) {
                    break;
                }

                lastFileIndex = fileData.fileIndex;

                // 트리 깊이 (4Byte)
                fileData.treeIndex = data.readUInt32LE(paddingOffset);
                paddingOffset += 0x04;                

                // 폴더일 경우, 파일의 갯수 (4Byte)
                fileData.numberOfFiles = data.readUInt32LE(paddingOffset);
                paddingOffset += 0x04;       

                curOffset += 0x0C;
                mode = "name";

            }            
            else if(mode === "name") { // 문자열 모드는 WBCS 기반이므로 2바이트씩 읽게 된다.
    
                var buf = data.toString("ascii", curOffset, curOffset + 0x02);
                if(buf !== "\u0000\u0000") {
                    names.push(buf);
                    curOffset += 0x02;
                } else if(buf === "\u0000\u0000") {
                    var tempFileName = names.join("").replace(/\0/g, '');
                    
                    curOffset += 0x02; // NULL Characters (2 Bytes)
    
                    // 파일의 타입 (1Byte)
                    lastFileType = data.readInt8(curOffset);

                    fileData.filename = tempFileName;
    
                    if(lastFileType == 2) {
    
                        var paddingOffset = curOffset + 0x03;
                        
                        // 파일 크기 (4Byte)
                        var fileSize = data.readUInt32LE(paddingOffset);
                        paddingOffset += 0x04;
                        paddingOffset += paddingOffset + 0x2B;

                        fileData.originalSize = fileSize;
                        
                        // 압축된 파일 크기 (4Byte)
                        var compressedSize = data.readUInt32LE(paddingOffset);
                        paddingOffset += 0x04;

                        fileData.compressedSize = compressedSize;
                        
                        // 의미 없는 데이터 (4Byte)
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

        // 올림 차순으로 정렬한다 (1->2->3->4)
        this._sortedFiles = this._files.slice(0).sort( (a, b) => {
            return a._treeIndex - b._treeIndex;
        });

        // 최소 깊이
        this._minDepth = this._sortedFiles[0]._treeIndex;

        // 최대 깊이
        this._maxDepth = this._sortedFiles[this._sortedFiles.length - 1]._treeIndex;

        this._sortedFiles[0]._filePath = ".";

        this.exploreFiles(this._sortedFiles[0]);

    }

    /**
     * 문자열 생성 시 바이너리 데이터가 손상되므로 안전한 Uint8Array를 사용하여 버퍼를 생성해야 한다.
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

        /**
         * 경로 생성을 위하여 트리 구조를 부모-자식 관계로 나열한다.
         */
        this._files.forEach((file, i, files) => {            
            if(!file.isFile()) { // 폴더일 때

                // 일종의 트리 구조이므로 고유의 배열 인덱스를 가지게 된다.
                lastFolders[file._treeIndex - 1] = file;

                // 부모 트리가 존재할 때
                if((file._treeIndex - 2) >= 0) { 
                    file._parent = lastFolders[file._treeIndex - 2];
                    lastFolders[file._treeIndex - 2]._children.push(file);
                } else { // 부모 트리가 존재하지 않음
                    file._parent = {_filename: "root"};
                }
            } else { // 파일일 때
                var findDepth = file._treeIndex;
                if(lastFolders[findDepth - 2]) { // 트리에 부모가 존재한다
                    lastFolders[findDepth - 2]._children.push(file);
                    file._parent = lastFolders[findDepth - 2];
                }                                
            }
        });

        // 폴더를 나열한다.
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
         * 파일을 열거하면서 경로를 재귀적으로 작성한다.
         * @param {EnigmaFileArchive} root 
         */
        var enumerate = (root) => {
            root._children.forEach(file => {
                if(!file.isFile()) {
                    enumerate(file);
                } else {
                    file._filePath = [];
                    concatPath(file._filePath, file);
                    file._filePath = `${this._binaryPath}/${file._filePath.reverse().slice(2).join("/")}`.replace(/\/\//g, "/");
                }                
            });
        };

        // 루트 폴더가 가장 높은 인덱스를 가지게 된다. (트리 구조이므로)
        enumerate(folders.shift());

        // 데이터 오프셋
        var offset = this._dataOffset;

        // 메시지 출력
        const fileLength = this._files.filter(i => i.isFile()).length;
        const folderLength = this._files.filter(i => !i.isFile()).length - 1;        
        
        console.log(`${ConsoleColor.Bright}총 ${fileLength}개의 파일과 ${folderLength}개의 폴더가 감지됩니다.`);
        console.log(`잠시후 파일로 추출됩니다.`);

        // 파일을 순서대로 열거하면서 폴더나 파일을 생성한다.
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