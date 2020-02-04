Utils.getAbsolutePath = function(defaultPath) {
    var fileName = defaultPath.split("\\");
    var driveName = fileName.shift();
    fileName = driveName + "//" + fileName.join("/");

    return fileName;

};