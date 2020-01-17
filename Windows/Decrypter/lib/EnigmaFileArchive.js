/**
 * @author biud436
 */

class EnigmaFileArchive {

    /**
     * @param {{
     *          filename:string, 
     *          originalSize:Number, 
     *          fileIndex:Number, 
     *          treeIndex:Number, 
     *          numberOfFiles:Number, 
     *          compressedSize: Number, 
     *          isFile: Boolean, 
     *          fileOffset: Number
     *         }} data 
     */
    constructor(data) {

        this._filename = data.filename;
        this._originalSize = data.originalSize;
        this._fileIndex = data.fileIndex;
        this._treeIndex = data.treeIndex;
        this._numberOfFiles = data.numberOfFiles;
        this._compressedSize = data.compressedSize;
        this._isFile = data.isFile;
        this._rawOffset = data.fileOffset;

        /**
         * @type {Buffer}
         */
        this._contents = null;
        this._filePath = data.filename;

        /**
         * @type {EnigmaFileArchive[]}
         */
        this._children = [];

        /**
         * @type {EnigmaFileArchive}
         */
        this._parent = null;

    }

    setContents(contents) {
        this._contents = contents;
    }

    isFile() {
        return this._isFile;
    }

}

module.exports = EnigmaFileArchive;
