/*:
 * @plugindesc <RS_UnifyAllPlugins>
 * @author biud436
 * @help
 * This plugin unifies all of javascript files except library file to one javascript file.
 * also it couldn't access global variables in the developer tool. 
 * that is because the game will be executed the sandbox mode.
 * ===============================================================
 * Version Log
 * ===============================================================
 * 2018.11.02 (v1.0.0) - First Release.
 */
/*:ko
 * @plugindesc <RS_UnifyAllPlugins>
 * @author biud436
 * @help
 * 이 플러그인은 플러그인 파일을 포함한 모든 자바스크립트 파일을 단일 자바스크립트 파일로 통합합니다.
 * ===============================================================
 * Version Log
 * ===============================================================
 * 2018.11.02 (v1.0.0) - First Release.
 */
   
var Imported = Imported || {};
Imported.RS_UnifyAllPlugins = true;

var RS = RS || {};
RS.UnifyAllPlugins = RS.UnifyAllPlugins || {};
  
(function(_plugins) {
  
  "use strict";
  
  if(!Utils.isNwjs() || !Utils.isOptionValid('test')) {
    return;
  }
  
  var fs = require('fs');
  var childProcess = require("child_process");
  var path = require('path');
  var mainPath = path.join(process.mainModule.filename, "..");
  var pluginPath = path.join(mainPath, "js/plugins.js");
  var corePath = path.join(mainPath, "js/unify_plugins.js");
  var retPath = path.join(mainPath, "js/core.js");
  var data = "";
  
  RS.UnifyAllPlugins.getPath = function(filename) {
    filename = filename.replace(/\//gm, "\\");
    return path.join(mainPath, filename);
  };
  
  RS.UnifyAllPlugins.copyFile = function(filename1, filename2) {
    filename1 = filename1.replace(/\//gm, "\\");
    filename2 = filename2.replace(/\//gm, "\\");
    if(process.platform.indexOf('win') >= 0) {
      childProcess.execSync(`copy ${filename1} ${filename2}`);
    }
  };
  
  RS.UnifyAllPlugins.modifyRPGManagersFile = function() {
    var _rpg_managers = RS.UnifyAllPlugins.getPath("js/rpg_managers.js");
    var _test_rpg_managers = RS.UnifyAllPlugins.getPath("js/test_rpg_managers.js");
    var _optimization_rpg_managers = RS.UnifyAllPlugins.getPath("js/optimization_rpg_managers.js");
    RS.UnifyAllPlugins.copyFile(_rpg_managers, _test_rpg_managers);
    var data = fs.readFileSync(_test_rpg_managers, "utf8");
    var lines = data.split(/[\r\n]+/);
    var lineNumber = 0;
    lines.forEach(function(e, i, a) {
      if(e.indexOf("DataManager.loadMapData = function(mapId) {") >= 0) {
        lineNumber = i;
        return;
      }
    });
    
    lines = lines.slice(lineNumber);
    
    var header = `

//=============================================================================
// rpg_managers.js v1.6.1
//=============================================================================

//-----------------------------------------------------------------------------
// DataManager
//
// The static class that manages the database and game objects.

function DataManager() {
    throw new Error('This is a static class');
}

DataManager._globalId       = 'RPGMV';
DataManager._lastAccessedId = 1;
DataManager._errorUrl       = null;

DataManager._databaseFiles = [
    { name: '$dataActors',       src: 'Actors.json'       },
    { name: '$dataClasses',      src: 'Classes.json'      },
    { name: '$dataSkills',       src: 'Skills.json'       },
    { name: '$dataItems',        src: 'Items.json'        },
    { name: '$dataWeapons',      src: 'Weapons.json'      },
    { name: '$dataArmors',       src: 'Armors.json'       },
    { name: '$dataEnemies',      src: 'Enemies.json'      },
    { name: '$dataTroops',       src: 'Troops.json'       },
    { name: '$dataStates',       src: 'States.json'       },
    { name: '$dataAnimations',   src: 'Animations.json'   },
    { name: '$dataTilesets',     src: 'Tilesets.json'     },
    { name: '$dataCommonEvents', src: 'CommonEvents.json' },
    { name: '$dataSystem',       src: 'System.json'       },
    { name: '$dataMapInfos',     src: 'MapInfos.json'     }
];

DataManager.loadDatabase = function() {
    var test = this.isBattleTest() || this.isEventTest();
    var prefix = test ? 'Test_' : '';
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var name = this._databaseFiles[i].name;
        var src = this._databaseFiles[i].src;
        this.loadDataFile(name, prefix + src);
    }
    if (this.isEventTest()) {
        this.loadDataFile('$testEvent', prefix + 'Event.json');
    }
};

DataManager.loadDataFile = function(name, src) {
  var xhr = new XMLHttpRequest();
  var url = 'data/' + src;
  xhr.open('GET', url);
  xhr.overrideMimeType('application/json');
  xhr.onload = function() {
      if (xhr.status < 400) {
        eval(name + " = JSON.parse(xhr.responseText);");
        eval("DataManager.onLoad(" + name + ")");
      }
  };
  xhr.onerror = this._mapLoader || function() {
      DataManager._errorUrl = DataManager._errorUrl || url;
  };
  eval(name + " = null;");
  xhr.send();
};

DataManager.isDatabaseLoaded = function() {
    this.checkError();
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var isFile = eval(this._databaseFiles[i].name);
        if (!isFile) {
            return false;
        }
    }
    return true;
};

    `;

    var body = lines.join("\r\n");

    fs.writeFileSync(_optimization_rpg_managers, header.concat(body), "utf8");
    if(fs.existsSync(_test_rpg_managers)) fs.unlinkSync(_test_rpg_managers);

  };
  
  RS.UnifyAllPlugins.unifyAllRPGMakerCoreFiles = function(corePath) {
    
    var _rpg_header = RS.UnifyAllPlugins.getPath("js/rpg_header.js");
    var _rpg_core = RS.UnifyAllPlugins.getPath("js/rpg_core.js");
    var _optimization_rpg_managers = RS.UnifyAllPlugins.getPath("js/optimization_rpg_managers.js");
    var _rpg_objects = RS.UnifyAllPlugins.getPath("js/rpg_objects.js");
    var _rpg_scenes = RS.UnifyAllPlugins.getPath("js/rpg_scenes.js");
    var _rpg_sprites = RS.UnifyAllPlugins.getPath("js/rpg_sprites.js");
    var _rpg_windows = RS.UnifyAllPlugins.getPath("js/rpg_windows.js");
    var _convert_rpg_managers = RS.UnifyAllPlugins.getPath("js/convert_rpg_managers.js");    
    var _plugins = RS.UnifyAllPlugins.getPath("js/plugins.js");
    var _mains = RS.UnifyAllPlugins.getPath("js/main.js");
    var _rpg_tail = RS.UnifyAllPlugins.getPath("js/rpg_tail.js");
    
    childProcess.execSync(`copy ${_rpg_header} + ${_rpg_core} + ${_optimization_rpg_managers} + ${_rpg_objects} + ${_rpg_scenes} + ${_rpg_sprites} + ${_rpg_windows} + ${_convert_rpg_managers} + ${_plugins} + ${_mains} + ${corePath} + ${_rpg_tail} ${retPath} /b`);

    if(fs.existsSync(_rpg_header)) fs.unlinkSync(_rpg_header);  
    if(fs.existsSync(_rpg_tail)) fs.unlinkSync(_rpg_tail);
    if(fs.existsSync(corePath)) fs.unlinkSync(corePath);
    if(fs.existsSync(_convert_rpg_managers)) fs.unlinkSync(_convert_rpg_managers);
    if(fs.existsSync(_optimization_rpg_managers)) fs.unlinkSync(_optimization_rpg_managers);
  };
  
  RS.UnifyAllPlugins.readyFiles = function() {
    var _rpg_header = RS.UnifyAllPlugins.getPath("js/rpg_header.js");
    var _rpg_tail = RS.UnifyAllPlugins.getPath("js/rpg_tail.js");
    var _convert_rpg_managers = RS.UnifyAllPlugins.getPath("js/convert_rpg_managers.js");    
    fs.writeFileSync(_rpg_header, `
(function() {

  var $dataActors       = null;
  var $dataClasses      = null;
  var $dataSkills       = null;
  var $dataItems        = null;
  var $dataWeapons      = null;
  var $dataArmors       = null;
  var $dataEnemies      = null;
  var $dataTroops       = null;
  var $dataStates       = null;
  var $dataAnimations   = null;
  var $dataTilesets     = null;
  var $dataCommonEvents = null;
  var $dataSystem       = null;
  var $dataMapInfos     = null;
  var $dataMap          = null;
  var $gameTemp         = null;
  var $gameSystem       = null;
  var $gameScreen       = null;
  var $gameTimer        = null;
  var $gameMessage      = null;
  var $gameSwitches     = null;
  var $gameVariables    = null;
  var $gameSelfSwitches = null;
  var $gameActors       = null;
  var $gameParty        = null;
  var $gameTroop        = null;
  var $gameMap          = null;
  var $gamePlayer       = null;
  var $testEvent        = null;    

  var ____self = this;
  
  `, "utf8");
    
    fs.writeFileSync(_convert_rpg_managers, `
    
PluginManager.setup = function(plugins) {
    plugins.forEach(function(plugin) {
        if (plugin.status && !this._scripts.contains(plugin.name)) {
            this.setParameters(plugin.name, plugin.parameters);
            // this.loadScript(plugin.name + '.js');
            this._scripts.push(plugin.name);
        }
    }, this);
};    

    `, "utf8");
    
    fs.writeFileSync(_rpg_tail, `
    PluginManager.setup($plugins);
    })();\r\n`, "utf8");
    
    RS.UnifyAllPlugins.modifyRPGManagersFile();
    
  };
  
  RS.UnifyAllPlugins.makeIndexHtmlFile = function() {
    var htmlText = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="viewport" content="user-scalable=no">
        <link rel="icon" href="icon/icon.png" type="image/png">
        <link rel="apple-touch-icon" href="icon/icon.png">
        <link rel="stylesheet" type="text/css" href="fonts/gamefont.css">
        <title>Game Title</title>
    </head>
    <body style="background-color: black">
        <script type="text/javascript" src="js/libs/pixi.js"></script>
        <script type="text/javascript" src="js/libs/pixi-tilemap.js"></script>
        <script type="text/javascript" src="js/libs/pixi-picture.js"></script>
        <script type="text/javascript" src="js/libs/fpsmeter.js"></script>
        <script type="text/javascript" src="js/libs/lz-string.js"></script>
        <script type="text/javascript" src="js/libs/iphone-inline-video.browser.js"></script>
		<script type="text/javascript" src="js/core.js"></script>
    </body>
</html>    
    `;
    
    var htmlPath = RS.UnifyAllPlugins.getPath("index_test.html");
    fs.writeFileSync(htmlPath, htmlPath, 'utf8');
  };
  
  RS.UnifyAllPlugins.unifyAllPluginFiles = function() {
    
    if(fs.existsSync(corePath)) {
      fs.unlinkSync(corePath);  
    }
    
    _plugins.forEach(function(i) {
      if(i.name === "RS_UnifyAllPlugins") return;
      var _filePath = path.join(mainPath, "js", "plugins", i.name + '.js');
      if(fs.existsSync(_filePath)) {
        data += fs.readFileSync(_filePath, "utf8");
        data += "\r\n";      
        console.log(_filePath + "파일을 통합하였습니다");
      }
    }, this);
    
    fs.writeFileSync(corePath, data, "utf8");    
    RS.UnifyAllPlugins.unifyAllRPGMakerCoreFiles(corePath);
    RS.UnifyAllPlugins.makeIndexHtmlFile();
    window.alert("파일 통합이 완료되었습니다");
  };
  
  RS.UnifyAllPlugins.readyFiles();
  RS.UnifyAllPlugins.unifyAllPluginFiles();
  
})($plugins);