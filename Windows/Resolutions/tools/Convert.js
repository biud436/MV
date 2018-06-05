
var fs = require('fs');

var settings = {};

settings.pcGraphicsTempArray = [
"640 x 480", "800 x 600", "1024 x 768", "1152 x 864",
"1280 x 720", "1280 x 800", "1280 x 960", "1360 x 768",
"1360 x 768", "1366 x 768", "1400 x 1050", "1440 x 900",
"1600 x 900", "1600 x 1200", "1680 x 1050", "1920 x 1080",
"1920 x 1200", "2048 x 1152", "2560 x 1440", "2560 x 1600"
];
settings.mobileGraphicsArray = [
"120 x 160",
"160 x 240",
"240 x 320",
"240 x 400",
"320 x 480", // 매우 낮음 (!)
"480 x 800", // 낮음 (!)
"640 x 960",
"640 x 1136",
"720 x 1280", // Galaxy S3 높음 (!)
"750 x 1334", // iPhone6, iPhone6S
"768 x 1024",
"768 x 1280",
"800 x 1280",
"1080 x 1920", // iPhone6+, iPhone6S+, Galaxy S4, Galaxy S5 매우 높음(!)
"1200 x 1920",
"1242 x 2208",
"1440 x 2560", // Galaxy S6, Galaxy S7
"1536 x 2048",
"1600 x 2560",
"2048 x 2732", // iPadPro
];

settings.resolutionQualityOnMobile = [
    "320 x 480", // 매우 낮음 (!)
    "480 x 800", // 낮음 (!)
    "720 x 1280", // Galaxy S3 높음 (!)
    "1080 x 1920" // iPhone6+, iPhone6S+, Galaxy S4, Galaxy S5 매우 높음(!)
];

function convertArrayToObject(array, textName) {
    "use strict";
    var objectArray = "[";
    array = array.map(function(i) {
        return i.split(" x ");
    });
    array.forEach(function(i) {
        var text = `\"{@width@:@${i[0]}@,@height@:@${i[1]}@}\"`;
        objectArray += text;
        objectArray += ",";
    });    
    objectArray = objectArray.slice(0, -1);
    objectArray += "]";
    fs.writeFile(`./${textName}.txt`, objectArray, {encoding: 'utf8', flag: "w+"}, function(err, data) {
    });
};

convertArrayToObject(settings.pcGraphicsTempArray, "pcGraphicsTempArray");
convertArrayToObject(settings.mobileGraphicsArray, "mobileGraphicsArray");
convertArrayToObject(settings.resolutionQualityOnMobile, "resolutionQualityOnMobile");