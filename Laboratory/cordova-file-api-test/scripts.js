
var logOb;

window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
    console.log("got main dir",dir);
    dir.getFile("log.txt", {create:true}, function(file) {
        console.log("got the file", file);
        logOb = file;
        writeLog("App started");          
    });
});

function writeLog(str) {
    if(!logOb) return;
    var log = str + " [" + (new Date()) + "]\n";
    console.log("going to log "+log);
    logOb.createWriter(function(fileWriter) {
        
        fileWriter.seek(fileWriter.length);
        
        var blob = new Blob([log], {type:'text/plain'});
        fileWriter.write(blob);
        console.log("ok, in theory i worked");
    }, fail);
}