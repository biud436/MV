//============================================================================
// SceneManager
//============================================================================

SceneManager.initResolution = function() {
    var self = this;
    var type, size, orientation, config, mobile;
    var sw, sh, bw, bh;
    var maxSW, maxSH;
    var defScrWidth, defScrHeight;

    RS.ScreenManager.readManifestFile();

    maxSW = window.innerWidth;
    maxSH = window.innerHeight;

    // Sets the default screen width and height values.
    defScrWidth = RS.ScreenManager.Params.settings.defaultScreenSize.x;
    defScrHeight = RS.ScreenManager.Params.settings.defaultScreenSize.y;

    // Obtains the ratio depended on screen orientation.
    orientation = Graphics.getOrientation(true);
    config = new ScreenConfig(maxSW, maxSH, orientation);

    // Changes the resolution depended on the aspect ratio in the mobile device.
    size = config.getSize(defScrWidth);

    mobile = !Utils.isNwjs() || RS.ScreenManager.Params.options.aspectRatio;
    sw = (mobile === true) ? size[0] : defScrWidth;
    sh = (mobile === true) ? size[1] : defScrHeight;
    bw = (mobile === true) ? size[0] : defScrWidth;
    bh = (mobile === true) ? size[1] : defScrHeight;

    // Calls the function changes the resolution in case of the PC.
    if(Utils.isNwjs()) {
    var newSize = new Point(sw, sh);
    Graphics.setScreenResize(newSize);
    } else {
    Graphics.width = sw;
    Graphics.height = sh;
    Graphics.boxWidth = sw;
    Graphics.boxHeight = sh;
    }
};