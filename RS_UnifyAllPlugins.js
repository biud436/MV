/*:
 * @plugindesc <RS_UnifyAllPlugins>
 * @author biud436
 * @help
 * 모든 자바스크립트 파일을 하나로 통합합니다.
 */
   
var Imported = Imported || {};
Imported.RS_UnifyAllPlugins = true;

var RS = RS || {};
RS.UnifyAllPlugins = RS.UnifyAllPlugins || {};
  
(function(_plugins) {
  
  "use strict";
  
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
      if(e.indexOf("DataManager._databaseFiles = [") >= 0) {
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
    (function() {\r\n`, "utf8");
    
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
    
    fs.writeFileSync(_rpg_tail, "})();\r\n", "utf8");
    
    RS.UnifyAllPlugins.modifyRPGManagersFile();
    
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
    window.alert("파일 통합이 완료되었습니다");
  };
  
  RS.UnifyAllPlugins.readyFiles();
  RS.UnifyAllPlugins.unifyAllPluginFiles();
  
})($plugins);