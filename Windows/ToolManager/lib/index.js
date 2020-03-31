/**
 * @author biud436
 * @help
 */

const {Downloader} = require('./Downloader');
const {NodeWebkitRunner} = require("./Downloader");
const RegistryMan = require('./RegistryMan');

const args = process.argv.slice(2);
let app;

function getCommands() {
    const VERSION = args[1];
    let projectPath = args[2];        
    let mainPath = process.cwd().replace( /\\/g, '/' );
    let outputPath = `${mainPath}/${VERSION}`.replace( /\\/g, '/' );
    let forceHttps = args[3];
    
    let commands = {
        mainPath: mainPath,
        outputPath: outputPath,
        version: VERSION,
        projectPath: projectPath,
        forceHttps: forceHttps,
    };

    return commands;
}

function run() {
    switch(args[0]) {
        case '/run': // node index.js /run v0.44.1 E:/Games/201907/
            app = new NodeWebkitRunner(getCommands()).start().catch(err => {
                throw new Error(err);
            });
            break;
        case '/download': // node index.js /download v0.44.1 E:/Games/201907/ true
            app = new Downloader(getCommands()).start().catch(err => {
                throw new Error(err);
            });
            break;
        case '/add': // node index.js /add appName hint name filePath
            app = new RegistryMan("add", args.slice(1));
            break;
        case '/remove': // node index.js /remove appName
            app = new RegistryMan("remove", args.slice(1));
            break;            
    }
}

run();