
var subprocess = require('./subprocess')
        , path = require('path')
        , fs = require('fs')
        , cp = require('child_process');

var vi = require(path.join(__dirname, '..', 'node_modules' , 'win-version-info'));

function getCoreJSFile(basePath) {
    var filePath = path.normalize(path.win32.join(basePath, "NewData", "js", "rpg_core.js"));
    return filePath;
};

function getRPGMV(basePath) {
    var filePath = path.normalize(path.win32.join(basePath, "RPGMV.exe"));
    return filePath;
};

if(process.platform.includes("win") >= 0) {

    var processname = 'python';
    var args = [];
    args.push( path.join(__dirname, "get_steam_path.py") );
    
    var child = cp.execFile('python', args, {encoding: 'utf8'}, function(err, stdout, stderr) {
        if(err) {
            console.log("error");
            return;
        }
    
        var rmmvPath = stdout.replace("\r\n", "");
        var filePath = path.normalize(path.win32.join(rmmvPath, "RPGMV.exe"));
    
        var fullPath = filePath.split("\\");
        var driveName = fullPath.shift(); // process.env.SystemRoot
        fullPath = fullPath.join("/");
        filePath = driveName + "///" + fullPath;    
    
        var version = vi(filePath);
        version = String(version["ProductVersion"]);
        if(version >= "1.6.1") {
            // node-webkit: "0.29.4"
            // node: "9.11.1"
            console.log("v9.11.1");
        } else {
            console.log("v1.2.0");
        }    
    
    });
    
    child.stdin.end(); 

} else {

}