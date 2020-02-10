"use strict";

window.Imported = Imported || {};
window.Imported.RS_ScreenManager = true;

window.RS = RS || {};
window.RS.ScreenManager = RS.ScreenManager || {};
window.RS.ScreenManager.Params = RS.ScreenManager.Params || {};

import parameters from "./parameters";

RS.ScreenManager.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
    try { return RS.ScreenManager.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
};

var getTargetRegex = /(\d+)[ ]x[ ](\d+)/i;

/**
 * @type {{resize: Boolean, autoScaling: Boolean, minWidth: Boolean, minHeight: Boolean, recreate: Boolean, allResolutions: Boolean, aspectRatio: Boolean, isAutoSyncManifest: Boolean}}
 */
var options = {};
var settings = {};

options.resize = Boolean(parameters['isGraphicsRendererResize'] === 'true');
options.autoScaling = Boolean(parameters['isGraphicsRendererResize'] === 'true');
options.minWidth = Boolean(parameters['isMaintainingMinimumWidth'] === 'true');
options.minHeight = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
options.recreate = Boolean(parameters['isMaintainingMinimumHeight'] === 'true');
options.allResolutions = Boolean(parameters['Use All Resolutions'] === 'true');
options.aspectRatio = Boolean(parameters['Enable Custom Aspect Ratio'] === 'true');
options.isAutoSyncManifest = Boolean(parameters['Auto Sync Manifest file'] === 'true');

settings.customAspectRatio = parameters['Custom Aspect Ratio'] || "16:9";
settings.customAspectRatio = settings.customAspectRatio.trim().split(":");
settings.ptCustomScreenSize = String(parameters["Default Screen Size"] || '1280 x 720').split(' x ');
settings.defaultScreenSize = new Point(
    (parseInt(settings.ptCustomScreenSize[0]) || 1280),
    (parseInt(settings.ptCustomScreenSize[1]) || 720));
settings.pcGraphicsArray = [];
settings.pcGraphicsTempArray = RS.ScreenManager.jsonParse(parameters["PC"]);
settings.mobileGraphicsArray = RS.ScreenManager.jsonParse(parameters["Mobile"]);
settings.resolutionQualityOnMobile = RS.ScreenManager.jsonParse(parameters["Mobile Simple"]);
settings.state = "ready";

// Parameters
RS.ScreenManager.Params.settings = settings;
RS.ScreenManager.Params.options = options;
RS.ScreenManager.Params.fullscreenFlag = false;
RS.ScreenManager.Params.isUsedNodeLibrary = Boolean(parameters["Bind Node Library"] === "true");

RS.ScreenManager.Params.isAutoScaledPicture = Boolean(parameters["Scaled Picture"] === "true");

RS.ScreenManager.Params.ignoreAutoScalePictures = RS.ScreenManager.jsonParse(parameters["Ignore Auto Scale"]);

RS.ScreenManager.Params.originalPictureViewSize = RS.ScreenManager.jsonParse(parameters["Original View Size"]);

/**
 * Screen Size : 1280, 720
 * Picture's Size : 816, 614,
 * Picture's Position : 816, 614
 * Actual Coordinates : 816, 614
 * Virtual Coordinates (Maintain ratio) : 1280, 720
 */
RS.ScreenManager.Params.picturePosType = parameters["Picture Position Type"] || "Actual Coordinates";

/**
 * if it is to true, it adds resolution select button in the option window.
 */
RS.ScreenManager.Params.isValidOptionWindow = Utils.isMobileDevice() ? false : true;

RS.ScreenManager.Params.isValidScaledBattleback = Boolean(parameters["Scaled Battleback"] === "true");

RS.ScreenManager.Params.actorFunc = {
    moveToStartPosition: RS.ScreenManager.jsonParse(parameters["ActorFunc.moveToStartPosition"]),
    setActorHome: RS.ScreenManager.jsonParse(parameters["ActorFunc.setActorHome"]),
    stepForward: RS.ScreenManager.jsonParse(parameters["ActorFunc.stepForward"]),
    stepBack: RS.ScreenManager.jsonParse(parameters["ActorFunc.stepBack"]),
    retreat: RS.ScreenManager.jsonParse(parameters["ActorFunc.retreat"]),
};