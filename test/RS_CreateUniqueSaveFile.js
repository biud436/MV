/*:
 * @plugindesc <RS_CreateUniqueSaveFile>
 * @author biud436
 * @help
 * StorageManager.createUniqueSavefile(savefileId);
 */

var Imported = Imported || {};
Imported.RS_CreateUniqueSaveFile = true;

(function() {

    "use strict";

    /**
     * 생성할 세이브 파일의 데이터를 붙여넣으세요(예: file1.rpgsave)
     */
    var data = `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`;

    StorageManager.createUniqueSavefile = function(savefileId) {
        if(this.isLocalMode()) {
            var fs = require('fs');
            var dirPath = this.localFileDirectoryPath();
            var filePath = this.localFilePath(savefileId);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, data);
        } else {
          var key = this.webStorageKey(savefileId);
          localStorage.setItem(key, data);
        }
    };
})();