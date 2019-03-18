/**
 * @author biud436
 * @description This module allows you to unify all of data files to one javascript file.
 * @example
 * let utils = require('./utils');
 * utils.toWeb();
 */

const fs = require('fs');
const child_process = require('child_process');
const http = require('http');

const files = [
    { name: 'Actors.json'       , context: 'var $dataActors = '       },
    { name: 'Classes.json'      , context: 'var $dataClasses = '      },
    { name: 'Skills.json'       , context: 'var $dataSkills = '       },
    { name: 'Items.json'        , context: 'var $dataItems = '        },
    { name: 'Weapons.json'      , context: 'var $dataWeapons = '      },
    { name: 'Armors.json'       , context: 'var $dataArmors = '       },
    { name: 'Enemies.json'      , context: 'var $dataEnemies = '      },
    { name: 'Troops.json'       , context: 'var $dataTroops = '       },
    { name: 'States.json'       , context: 'var $dataStates = '       },
    { name: 'Animations.json'   , context: 'var $dataAnimations = '   },
    { name: 'Tilesets.json'     , context: 'var $dataTilesets = '     },
    { name: 'CommonEvents.json' , context: 'var $dataCommonEvents = ' },
    { name: 'System.json'       , context: 'var $dataSystem = '       },
    { name: 'MapInfos.json'     , context: 'var $dataMapInfos = '     }   
];

// global variables
let retData = [];

let utils = {
    init: ()=> {
        files.forEach((file, i, a)=> {
            var data = fs.readFileSync(file.name, 'utf8');
            retData.push(file.context);
            retData.push(data + ";");
        });
    },
    unify: ()=> {
        const texts = retData.join("\r\n");
        const targetFileName = "./data.js";
        fs.writeFileSync(targetFileName, texts, 'utf8');
    },
    copy: ()=> {
        if(process.platform.indexOf("win") >= 0) {
            child_process.execSync("copy Map*.json Map*.js");
        } else {
            child_process.execSync("cp Map*.json Map*.js")
        }
    },
    toWeb: () => {
        const server = http.createServer((req, res) => {
            const instream = fs.createReadStream('./data.js', {encoding: 'utf8'});
            instream.pipe(res);
        });
        
        server.listen(7001, '127.0.0.1');

    }
};

utils.init();
utils.unify();

module.exports = utils;