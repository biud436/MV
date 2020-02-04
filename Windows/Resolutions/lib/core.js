/**
 * Replace by target screen width and height values.
 */
RS.ScreenManager.initWithMobile = function() {

    function replaceBy(mod, cb) {
    var item = JSON.stringify(mod);
    item = item.replace("screen.availWidth", screen.availWidth);
    item = item.replace("screen.availHeight", screen.availHeight);
    item = item.replace("window.outerWidth", window.outerWidth);
    item = item.replace("window.outerHeight", window.outerHeight);
    mod = RS.ScreenManager.jsonParse(item);
    cb(mod);
    }

    replaceBy(RS.ScreenManager.Params.settings.resolutionQualityOnMobile, function(mod) {
    RS.ScreenManager.Params.settings.resolutionQualityOnMobile = mod;
    });

    replaceBy(RS.ScreenManager.Params.settings.mobileGraphicsArray, function(mod) {
    RS.ScreenManager.Params.settings.mobileGraphicsArray = mod;
    });    

};

RS.ScreenManager.initWithMobile();

/**
 * Read a manifest file called 'package.json'.
 */
RS.ScreenManager.readManifestFile = function() {
    if(Utils.RPGMAKER_VERSION < '1.6.1') return;
    if(!Utils.isNwjs()) return;    
    if(!RS.ScreenManager.Params.options.isAutoSyncManifest) return;
    var fs = require('fs');
    var path = require('path');
    var dirname = path.dirname(process.mainModule.filename);
    var packageJsonPath = path.join(dirname, "package.json");
    if(fs.existsSync(packageJsonPath)) {
    var packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    var config = packageConfig.window;
    if(config && config.fullscreen) {
        RS.ScreenManager.Params.fullscreenFlag = config.fullscreen;
        RS.ScreenManager.Params.settings.defaultScreenSize.x = config.width;
        RS.ScreenManager.Params.settings.defaultScreenSize.y = config.height;
        RS.ScreenManager.Params.settings.ptCustomScreenSize = RS.ScreenManager.Params.settings.defaultScreenSize.toString();
    }
    }    

    var win = require('nw.gui').Window.get();

    win.on('resize', function(width, height) {
    var f = RS.ScreenManager.isFullscreen();
    RS.ScreenManager.changeManifestFile(width, height, f);
    });

};

RS.ScreenManager.isWindowsTaskbarShown = function() {
    return screen.availHeight !== screen.height;
};

RS.ScreenManager.switchFullScreen = function() {
    if(Utils.isNwjs()) {
    var gui = require('nw.gui');
    var win = gui.Window.get(); 
    win.toggleFullscreen();
    } else {
    Graphics._switchFullScreen();;
    }
};

RS.ScreenManager.isFullscreen = function() {
    if(Utils.isNwjs()) {
    var gui = require('nw.gui');
    var win = gui.Window.get();
    return win.appWindow.isFullscreen();
    } else {
    return Graphics._isFullScreen();
    }
};

/**
 * Change the manifest file called 'package.json' and then beautifies line spaces.
 */
RS.ScreenManager.changeManifestFile = function(width, height, fullscreen) {

    if(Utils.RPGMAKER_VERSION < '1.6.1') return;
    var fs = require('fs');
    var path = require('path');
    var dirname = path.dirname(process.mainModule.filename);
    var packageJsonPath = path.join(dirname, "package.json");

    var templatePackageConfig = {"name":"mytest","main":"index.html","js-flags":"--expose-gc","crhomium-args":"--disable-sync","window":{"title":"","toolbar":false,"width":RS.ScreenManager.Params.settings.defaultScreenSize.x,"height":RS.ScreenManager.Params.settings.defaultScreenSize.y, "icon":"icon/icon.png"}};    

    // if the config file exists?
    if(fs.existsSync(packageJsonPath)) {
    var packageConfig = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageConfig.window.width = width;
    packageConfig.window.height = height;
    packageConfig.window.fullscreen = fullscreen;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageConfig, null, '\t'));

    } else {

    fs.writeFileSync(packageJsonPath, JSON.stringify(templatePackageConfig, null, '\t'));
    return RS.ScreenManager.changeManifestFile(width, height, fullscreen);

    }    
    
};

/**
 * In the RPG Maker MV v1.5.2 or less, 
 * if the executable file name is the same as Game.exe, it couldn't be read the node library. 
 * So its name must change with 'nw.exe' and then we must restart the game.
 */
RS.ScreenManager.restartGame = function() {
    var childProcess = require("child_process");
    var path = require('path');
    var projectPath = path.dirname(process.mainModule.filename);
    childProcess.execFile(process.execPath, [projectPath], function(err) {
    if(err) console.warn(err);
    });
};

/**
 * https://stackoverflow.com/a/20339709
 * @param {Array} data 
 */
RS.ScreenManager.uniqArray = function(data) {
    var uniqData = [];
    var foundData = {};

    data.forEach(function(i) {
    var packData = JSON.stringify(i);
    if(!foundData[packData]) {
        uniqData.push(i);
        foundData[packData] = true;
    }
    }, this);

    return uniqData;    

}