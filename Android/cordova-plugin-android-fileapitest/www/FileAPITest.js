var exec = require('cordova/exec'),
    channel = require('cordova/channel'),
    argscheck = require('cordova/argscheck'),
    util = require('cordova/util');

    channel.createSticky('onCordovaInfoReady');
    channel.waitForInitialization('onCordovaInfoReady');

function FileAPITest() {
    var self = this;
    channel.onCordovaReady.subscribe(function() {
      this.echo(function (req) {
        util.alert(req);
      }, function (e) {
        utils.alert("[ERROR] Error initializing Cordova: " + e);
      },
      res);
    });
}

/**
 * @method createSaveFile
 * @param {String} filename
 * @param {String} raw
 * @param {Function} successCallback
 * @param {Function} errorCallback
 */
FileAPITest.prototype.createSaveFile = function (filename, raw, successCallback, errorCallback) {
    argscheck.checkArgs('sSfF', 'FileAPITest.createSaveFile', arguments);
    exec(successCallback, errorCallback, "FileAPITest", "createSaveFile", []);
};

/**
 * @method readTextFile
 * @param {Function} successCallback using this allows you to receive a text of certain file.
 * @param {Function} errorCallback
 */
FileAPITest.prototype.readTextFile = function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, "FileAPITest", "readTextFile", []);
};

FileAPITest.prototype.echo = function (message, successCallback, errorCallback) {
    exec(successCallback, errorCallback, "FileAPITest", "echo", [message]);
};

module.exports = new FileAPITest();
