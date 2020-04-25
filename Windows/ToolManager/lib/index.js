/**
 * @author biud436
 * @help
 */

const {Downloader} = require('./Downloader');
const {NodeWebkitRunner} = require("./Downloader");
const RegistryMan = require('./RegistryMan');
const args = process.argv.slice(2);
const argv = require('minimist')(process.argv.slice(2));
const Color = require("./ConsoleColor");

let app;

if(argv.help || argv.h) {
console.log(`-f를 전달하면 node의 https를 이용하여 다운로드를 하게 됩니다.
aria2가 설치되어있으면 aria2를 이용하여 다운로드를 받습니다.

아래는 사용 예제입니다.
${Color.FgYellow}
npm run download -- -v="v0.45.4" -p=E:/Games/201907 -f
npm run play -- -v=v0.45.4 -p=E:/Games/201907
npm run add "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"
npm run remove "vscode.bat"
${Color.Reset}

아이콘 이미지는 임시 이미지가 자동으로 생성되며 생성된 직후에는 원하는 걸로 교체해주시기 바랍니다.
`);
    return;
}

function getCommands() {

    let VERSION = argv.version || argv.v;
    let mainPath = process.cwd().replace( /\\/g, '/' );
    let outputPath = `${__dirname}/${VERSION}`.replace( /\\/g, '/' );

    let commands = {
        mainPath: mainPath,
        outputPath: outputPath,
        version: VERSION,
        projectPath: argv.projectPath || argv.p,
        forceHttps: argv.forceHttps || argv.f,
    };

    console.log(commands);

    return commands;
}

function run() {
    for(let i in argv) {
        switch(i) {
            case 'run': // node index.js --run -v="v0.45.4" -p="E:/Games/201907/""
                app = new NodeWebkitRunner(getCommands()).start().catch(err => {
                    throw new Error(err);
                });
                break;
            case 'download': // node index.js --download --version="v0.45.4" -p="E:/Games/201907/"" -f
                app = new Downloader(getCommands()).start().catch(err => {
                    throw new Error(err);
                });
                break;
            case 'add': // node index.js --add appName hint name filePath
                app = new RegistryMan("add", args.slice(1));
                break;
            case 'remove': // node index.js --remove appName
                app = new RegistryMan("remove", args.slice(1));
                break;
            case 'echo':
                console.log("에코 테스트...");
                console.log(argv);
                break;
        }  
    }
   
}

run();