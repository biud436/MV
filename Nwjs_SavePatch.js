/*
 * Nwjs_SavePatch.js
 * @plugindesc This plugin provides a function to solve the problem related to a path of Save.
 * @author biud436
 *
 * @help
 * When you exported game by taking advantage of 'Web2Executable',
 * allows you to happen the problem related to a path of Save.
 * This plugin provides functions to solve the problems.
 */

if(Utils.isNwjs) {
  StorageManager.localFileDirectoryPath = function() {
      var s = process.execPath.split("\\"); s.pop();
      s = s.join("\\");
      var path = s + '\\save\\'
      return decodeURIComponent(path);
  };
}
