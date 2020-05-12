//============================================================================
// Load the node library and then retrieves information about the display RS.ScreenManager.Params.settings.
// using the Windows API called EnumDisplaySetting(User32.dll)
//============================================================================  

(function initWithSettings() {

    "use strict";

    try {

        if (Utils.isNwjs()) {

            // if you didn't have node library, it will set as a default resolution list.
            if (!RS.ScreenManager.Params.isUsedNodeLibrary) {
                RS.ScreenManager.Params.settings.pcGraphicsArray = RS.ScreenManager.Params.settings.pcGraphicsTempArray;
                RS.ScreenManager.Params.options.allResolutions = true;
                return;
            }

            var path = require('path'),
                fs = require('fs'),
                platform = process.platform;
            const base = process.mainModule.filename;

            switch (platform) {
                case 'win32':

                    var fileVersion = "v1.2.0";
                    var processArch = process.arch;

                    if (Utils.RPGMAKER_VERSION >= "1.6.1") {
                        /**
                         * Original Versions in RMMV 1.6.1 : 
                             ares: "1.13.0"
                            chromium: "65.0.3325.181"
                            cldr: "32.0"
                            http_parser: "2.8.0"
                            icu: "60.1"
                            modules: "59"
                            napi: "3"
                            nghttp2: "1.29.0"
                            node: "9.11.1"
                            node-webkit: "0.29.4"
                            nw: "0.29.4"
                            nw-commit-id: "6a254fe-1c00f31-b892847-deb9bc6"
                            nw-flavor: "sdk"
                            openssl: "1.0.2o"
                            tz: "2017c"
                            unicode: "10.0"
                            uv: "1.19.2"
                            v8: "6.5.254.41"
                            zlib: "1.2.11"

                        * Node Webkit Version in My Computer:
                            ares: "1.14.0"
                            chromium: "69.0.3497.100"
                            cldr: "33.1"
                            http_parser: "2.8.0"
                            icu: "62.1"
                            modules: "64"
                            napi: "3"
                            nghttp2: "1.33.0"
                            node: "10.11.0"
                            node-webkit: "0.33.4"
                            nw: "0.33.4"
                            nw-commit-id: "3d7302c-de9606e-577bc92-58acf98"
                            nw-flavor: "sdk"
                            openssl: "1.1.0i"
                            tz: "2018e"
                            unicode: "11.0"
                            uv: "1.23.0"
                            v8: "6.9.427.23"
                            zlib: "1.2.11"              
                            */
                        fileVersion = `v${process.versions.node}`;
                    }

                    // It must change the filename as 'nw.exe' in RPG Maker MV 1.5.2 or less.
                    if (process.versions.node == "1.2.0" && process.execPath.contains("Game.exe")) {

                        // if the game plays in the test play mode, it does not show up the alert window.
                        if (Utils.isOptionValid('test') || Utils.isOptionValid('etest') || Utils.isOptionValid('btest')) {

                            RS.ScreenManager.Params.settings.state = "initialized";
                            RS.ScreenManager.Params.settings.pcGraphicsArray = RS.ScreenManager.Params.settings.pcGraphicsTempArray;
                            return;

                        } else {

                            window.alert(RS.ScreenManager.localization.get("NotFoundNwExe"));
                            var targetName = path.join(process.execPath, "..", "nw.exe");
                            fs.copyFile(process.execPath, targetName, "utf8", function (err, data) {});

                        }

                    }

                    var fileName = path.join(base, "..", `js/libs/${fileVersion}-winDisplaySettings-${processArch}.node`);
                    fileName = Utils.getAbsolutePath(fileName);

                    // if the library file exists?
                    if (fs.existsSync(fileName)) {

                        var display = require(fileName);

                        // Remove duplicate items from the list.
                        var items = display.GetDisplaySettings();

                        RS.ScreenManager.Params.settings.pcGraphicsArray = items;

                        RS.ScreenManager.Params.settings.state = "initialized";

                    } else {
                        window.alert(RS.ScreenManager.localization.get("NotFoundError"));
                        RS.ScreenManager.Params.settings.state = "failed";
                        // Set Default Resolution
                        RS.ScreenManager.Params.settings.pcGraphicsArray = RS.ScreenManager.Params.settings.pcGraphicsTempArray;
                        RS.ScreenManager.Params.options.allResolutions = true;
                    }

                    break;

                default:
                    // in case of Mac OS (base on darwin, linux)
                    RS.ScreenManager.Params.settings.pcGraphicsArray = RS.ScreenManager.Params.settings.pcGraphicsTempArray;
                    RS.ScreenManager.Params.options.allResolutions = true;
                    break;
            }
        }

    } catch (error) {
        console.warn(error);
        RS.ScreenManager.Params.settings.pcGraphicsArray = RS.ScreenManager.Params.settings.pcGraphicsTempArray;
        RS.ScreenManager.Params.options.allResolutions = true;
    }

})();
