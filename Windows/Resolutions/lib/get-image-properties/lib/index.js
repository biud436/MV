/**
 * This script allows you to get the width and height values of all images.
 * 
 * node index.js C:\Users\U\Desktop\Exam\201907
 * 
 * @author biud436
 * 
 */
const fs = require('fs-extra');
const path = require('path');
const PNG = require('pngjs').PNG;
const argv = process.argv.slice(2);
let imgDirPath;

const projectPath = argv[0].replace(/\\/g, "/");
let mainPath;

if(!fs.existsSync(path.join(projectPath, "index.html"))) {
    
    mainPath = projectPath;
    imgDirPath = path.join(projectPath, "img");

    if(fs.existsSync(path.join(projectPath, "www", "index.html"))) {
        mainPath = path.join(projectPath, "www");
        imgDirPath = path.join(mainPath, "img");
    } else {
        throw new Error("This is not a RPG Maker MV Game");
    }
}

let jsonData = {};

function readdir() {

    var imgDirectories = fs.readdirSync(imgDirPath);

    imgDirectories.forEach(dirname => {

        var subDirName = path.join(mainPath, "img", dirname);

        fs.readdir(subDirName, (err, files) => {
    
            files.forEach(file => {

                var rootFilename = path.join(mainPath, "img", dirname, file);

                if(!fs.lstatSync(rootFilename).isFile()) {
                    return;
                }

                var tempFileName = file;
                file = rootFilename;

                if(path.extname(file) !== ".png") {
                    return;
                }

                var data = fs.readFileSync(file);
                var png = PNG.sync.read(data);
                console.log("%s : [%d, %d]", tempFileName, png.width, png.height);
            
                if(!jsonData[`${dirname}`]) {
                    jsonData[`${dirname}`] = [];
                }
                
                jsonData[`${dirname}`].push({
                    name: tempFileName,
                    width: png.width,
                    height: png.height
                });

            });

            fs.writeFileSync(__dirname + "/output.json", JSON.stringify(jsonData, null, "\t"), "utf8");
                
        });

    });
    
};

readdir();