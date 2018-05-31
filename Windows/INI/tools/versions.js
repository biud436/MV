
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

var processname = 'python';
var args = [];
args.push( path.join(__dirname, "get_steam_path.py") );

var child = cp.execFile('python', args, {encoding: 'utf8'}, function(err, stdout, stderr) {
    if(err) {
        console.warn(err);
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
        console.log("v10.0.0");
    } else {
        console.log("v1.2.0");
    }    

});

child.stdin.end(); 

// var processname = 'python';
// var args = [];
// args.push('./get_steam_path.py');

// subprocess(processname, p, {
//     stdout: function(out) {    
//         var rmmvPath = out.toString('utf8').replace("\r\n", "");
//         var filePath = getCoreJSFile();
        
//         // var filePath = path.normalize(path.win32.join(rmmvPath, "RPGMV.exe"));

//         var fullPath = filePath.split("\\");
//         var driveName = fullPath.shift();
//         fullPath = fullPath.join("/");
//         filePath = driveName + "///" + fullPath;

//         fs.readFile(filePath, 'utf8', function(err, data) {
//             // console.log(data);
//             if(/(?:Utils.RPGMAKER_VERSION = )\"(.*)\"\;/i.exec(data)) {
//                 var version = String(RegExp.$1);
//                 if(version >= "1.6.1") {
//                     console.log("v10.0.0");
//                 } else {
//                     console.log("v1.2.0");
//                 }                
//             }
//         });
        
//         // var version = vi(filePath);
//         // version = String(version["ProductVersion"]);
//         // if(version >= "1.6.1") {
//         //     console.log("v10.0.0");
//         // } else {
//         //     console.log("v1.2.0");
//         // }

//     },
//     stderr: function(out) {
//         console.log("error");
//     },
//     exit: function(code) {
//         console.log(code);
//     }
//   });