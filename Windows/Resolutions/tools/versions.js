
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

function readNodeVersion(rmmvPath) {
var dllFile = path.normalize(path.win32.join(rmmvPath, "nwjs-win", "node.dll"));
var data = fs.readFileSync(dllFile);

var startOffset = ((data.length - 0x10) / 2);
startOffset = (startOffset & ~0x0F);
var maxOffset = (startOffset + (startOffset >> 1));
var version = "";

for(var curOffset = startOffset; curOffset < maxOffset; curOffset += 0x10) {
var buf = data.toString('ascii', curOffset, curOffset + 0x08 + 0x04);
if(buf === "versions\u0000\u0000\u0000\u0000") {
    var targetOffset = curOffset - 0x10;
    version = data.toString('ascii', targetOffset, targetOffset + 0x08);
}
}

return version;
};

function readNodeVersionForOlder(rmmvPath) {
var dllFile = path.normalize(path.win32.join(rmmvPath, "nwjs-win", "nw.exe"));
var data = fs.readFileSync(dllFile);

var startOffset = ((data.length - 0x10) / 2);
startOffset = (startOffset & ~0x0F);
var maxOffset = data.length - 0x10;
var version = "";

for(var curOffset = startOffset; curOffset < maxOffset; curOffset += 0x10) {
var buf = data.toString('ascii', curOffset, curOffset + 0x10);
if(buf === "s['node-webkit']") {
    var targetOffset = curOffset + 0x10;
    var str = data.toString('ascii', targetOffset, targetOffset + 0x10);
    var re = /'(\d+\.\d+\.\d+)'/gm;
    if(re.exec(str)) {
        version = `v${RegExp.$1}`;
    }
}
}

return version;
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
    console.log(readNodeVersion(rmmvPath));
} else {
    console.log(readNodeVersionForOlder(rmmvPath));
}    

});

child.stdin.end(); 

} else {

}