/**
 * This script allows you to get the width and height values of all images.
 * 
 * You can call certain command in the command line, as follows.
 * 
 *      node index.js <PROJECT_PATH>
 *      node index.js C:\Users\U\Desktop\Exam\201907
 * 
 * --------------------------------------------------------------------------------
 * 
 * 이미지의 폭과 높이를 JSON 데이터로 반환하는 기능을 가지고 있습니다.
 * 명령 프롬프트에서 이 파일이 위치된 폴더로 이동한 후, 파일을 아래와 같이 실행해주세요.
 * 
 *      node index.js <PROJECT_PATH>
 *      node index.js C:\Users\U\Desktop\Exam\201907
 * 
 * 프로젝트 경로를 적절하게 적어주세요.
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
} else {
    mainPath = projectPath;
    imgDirPath = path.join(projectPath, "img");
}

let jsonData = {};

/**
 * Get the window properties from the initial Game.exe file.
 * 
 * @return {{
 *      "title": String,
        "toolbar": Boolean,
        "width": Number,
        "height": Number,
        "icon": String}}
 */
function getWindowProperties() {
    let contents = fs.readFileSync(path.join(projectPath, "package.json"));
    let projectPackage = JSON.parse(contents);

    if(!projectPackage) {
        throw new Error("The package file is not existed");
    }

    if(!projectPackage.window) {
        return;
    }

    /**
     * @type {{"title": String, "toolbar": Boolean, "width": Number, "height": Number, "icon": String}}
     */
    let config = projectPackage.window;
    
    return config;
}

/**
 * Read the folder named "img" from the project folder
 */
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