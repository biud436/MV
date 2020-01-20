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
     *          fileSize: Number, 
     *          isFile: Boolean, 
     *          fileOffset: Number,
     *          fileAttribute: Number,
     *         }} data 
     */
    constructor(data) {

        this._filename = data.filename;
        this._originalSize = data.originalSize;
        this._fileIndex = data.fileIndex;
        this._treeIndex = data.treeIndex;
        this._numberOfFiles = data.numberOfFiles;
        this._fileSize = data.fileSize;
        this._isFile = data.isFile;
        this._rawOffset = data.fileOffset;
        this._fileAttribute = data.fileAttribute;

        /**
         * @type {Buffer}
         */
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

    isFile() {
        return this._isFile;
    }

}

module.exports = EnigmaFileArchive;
