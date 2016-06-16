/*:
 * RS_File.js
 * @plugindesc File.getFiles()
 * @author biud436
 */
 
var RS = RS || {};
var Imported = Imported || {};
var File = File || {};
Imported.RS_File = true;

(function() {

    File.getFiles = function() {
        if(!!process === false) return;
        var index = 0;
        if(process.versions.node && process.versions.v8) {
            var path = require('path'),
            fs = require('fs'),
            root = path.join(".", path.dirname(window.location.pathname));
            var files = fs.readdirSync(root);
            return files.filter(function(i) {
                var reg = /^[^\.]+$/
                return !reg.test(i);
            })
        }
    };
    
})();
