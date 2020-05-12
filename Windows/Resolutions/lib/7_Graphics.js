//============================================================================
// Graphics
//============================================================================

Graphics.getAvailGraphicsArray = function (returnType) {
    var data, tw, th, pt, gArray, result, maxSW, maxSH, type;
    var orientation, config, aspectRatio;
    var temp, ret;

    gArray = [];
    result = [];

    // outerWidth : 브라우저 윈도우의 사이드바와 가장자리 경계선을 포함한 폭.
    // screen.availWidth : OS의 상태바나 작업 표시줄을 제외한 폭.
    maxSW = Utils.isMobileDevice() ? window.outerWidth : window.screen.availWidth;
    maxSH = Utils.isMobileDevice() ? window.outerHeight : window.screen.availHeight;

    // Obtain the screen orientation.
    if (Utils.isNwjs()) {
        type = (maxSW > maxSH) ? 'landscape' : 'portrait';
        if (maxSW === maxSH) type = 'landscape';
    } else {
        type = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }

    data = (Utils.isNwjs()) ? RS.ScreenManager.Params.settings.pcGraphicsArray : RS.ScreenManager.Params.settings.resolutionQualityOnMobile;
    // if( Utils.isMobileDevice()) data = RS.ScreenManager.Params.settings.mobileGraphicsArray;

    // Set a custom aspect ratio
    config = new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0], RS.ScreenManager.Params.settings.customAspectRatio[1]);

    data = RS.ScreenManager.uniqArray(data);

    data.forEach(function (i) {

        var sw = 0;
        var sh = 0;

        if ('width' in i) {
            sw = i.width;
        } else {
            sw = i[0];
        }

        if ('height' in i) {
            sh = i.height;
        } else {
            sh = i[1];
        }

        tw = Number(sw);
        th = Number(sh);

        // Swap
        if (type === 'portrait' && (maxSW > maxSH)) {
            var temp = tw;
            tw = th;
            th = temp;
        }

        if (tw >= 0 && tw <= maxSW && th >= 0 && th <= maxSH) {

            // Convert the screen using an Aspect Ratio
            if (RS.ScreenManager.Params.options.aspectRatio) {
                temp = config.getSize(tw);
                tw = temp[0];
                th = temp[1];
            }

            pt = new Point(tw, th);
            gArray.push(pt);
            result.push(pt.toString());

        } else {

            if (RS.ScreenManager.Params.options.allResolutions) {

                // Convert the screen using an Aspect Ratio
                if (RS.ScreenManager.Params.options.aspectRatio) {
                    temp = config.getSize(tw);
                    tw = temp[0];
                    th = temp[1];
                }

                pt = new Point(tw, th);
                gArray.push(pt);
                result.push(pt.toString());

            }
        }

    }, this);

    return (returnType === 'String') ? result : gArray;

};

Graphics.getOrientation = function (inner) {
    var maxSW = (inner === true) ? window.innerWidth : window.screen.availWidth;
    var maxSH = (inner === true) ? window.innerHeight : window.screen.availHeight;
    var orientation = 'landscape';
    if (Utils.isNwjs() || !screen.orientation) {
        orientation = (maxSW > maxSH) ? 'landscape' : 'portrait';
        if (maxSW === maxSH) orientation = 'landscape';
    } else {
        orientation = screen.orientation.type.match(/landscape/) ? 'landscape' : 'portrait';
    }
    return orientation;
};

Graphics.isAvailScreenHeight = function (height) {
    var task_height = screen.height - screen.availHeight;
    var maxHeight = screen.availHeight - task_height;
    return height <= maxHeight;
};

Graphics.uniqWithPoint = function (data, callback) {
    var ret = [];
    ret = data.filter(function (e, i, a) {

        if (a[i - 1] instanceof Point) {

            if (a[i - 1].x === e.x && a[i - 1].y === e.y) {

                return false;

            }

            return true;

        } else {

            return true;

        }
    });

    callback(ret);

};

Graphics.getVirtualWidth = function (originValue) {
    var ratio = 816.0 / Graphics.boxWidth;
    return Math.floor(originValue / ratio);
};

Graphics.getVirtualHeight = function (originValue) {
    var ratio = 624.0 / Graphics.boxHeight;
    return Math.floor(originValue / ratio);
};

Graphics.setScreenResize = function (newScr) {
    var cx, cy, xPadding, yPadding;
    var tw, th, minW, minH;
    var orientation, config, aspectRatio;
    var maxSW, maxSH;
    var temp;

    var taskHeight = 0;

    // Get the screen width and height (Excepted in Windows Taskbar)
    maxSW = window.screen.availWidth;
    maxSH = window.screen.availHeight;

    // Get an orientation in your screen
    orientation = this.getOrientation(false);

    // Get an aspect ratio of a new screen size.
    config = new ScreenConfig(newScr.x, newScr.y, orientation);
    aspectRatio = config._aspectRatio || [17, 13];

    if (RS.ScreenManager.Params.options.aspectRatio) {
        config = new CustomScreenConfig(RS.ScreenManager.Params.settings.customAspectRatio[0], RS.ScreenManager.Params.settings.customAspectRatio[1]);
        aspectRatio = config._aspectRatio;
        temp = config.getSize(newScr.x);
        newScr.x = temp[0];
        newScr.y = temp[1];
    }

    SceneManager._screenWidth = newScr.x;
    SceneManager._screenHeight = newScr.y;
    SceneManager._boxWidth = newScr.x;
    SceneManager._boxHeight = newScr.y;

    // 화면 중앙 좌표
    cx = (window.screen.availWidth / 2) - (newScr.x / 2);
    cy = (window.screen.availHeight / 2) - (newScr.y / 2);

    // 화면 패딩
    xPadding = window.outerWidth - window.innerWidth;
    yPadding = window.outerHeight - window.innerHeight;

    // 타일 크기
    tw = ($gameMap && $gameMap.tileWidth) ? $gameMap.tileWidth() : 48;
    th = ($gameMap && $gameMap.tileHeight) ? $gameMap.tileHeight() : 48;

    // 최소 크기
    minW = (tw * aspectRatio[0]) || Graphics._renderer.width;
    minH = (th * aspectRatio[1]) || Graphics._renderer.height;

    // 작업 표시줄의 크기 때문에 수용할 수 없는 해상도라면 한 단계 낮춘다.
    if (RS.ScreenManager.isWindowsTaskbarShown() &&
        !this.isAvailScreenHeight(newScr.y) &&
        !Utils.isMobileDevice() &&
        RS.ScreenManager.Params.options.autoScaling) {

        var data = Graphics.getAvailGraphicsArray('Number');
        var ret = [];

        this.uniqWithPoint(data.slice(0), function (newData) {
            ret = newData;
        });

        ret = ret.filter(function (i) {
            return i.y < (newScr.y);
        }, this);

        var item = ret.pop();

        if (item) {
            newScr = item;
        }
    }

    // 화면 크기를 절대 값으로 지정
    window.resizeTo(newScr.x + xPadding, newScr.y + yPadding);
    window.moveTo(cx, cy);

    // 해상도 최소값 & 최대값 설정 부분, 자동으로 조절하는 것에 맞겼다면.
    if (RS.ScreenManager.Params.options.autoScaling && (tw / th >= 1.0) && tw >= 48) {

        // 새로운 해상도 값이 최소값(tileWidth * aspectRatio) 값보다 작으면 해상도를 최소값으로 제한한다.
        if (RS.ScreenManager.Params.options.minWidth) Graphics.width = Graphics.boxWidth = Math.max(minW, newScr.x);
        if (RS.ScreenManager.Params.options.minHeight) Graphics.height = Graphics.boxHeight = Math.max(minH, newScr.y);

        // 최소 최대 제한이 없을 경우,
        if (!RS.ScreenManager.Params.options.minWidth && !RS.ScreenManager.Params.options.minHeight) {
            Graphics.width = Graphics.boxWidth = newScr.x.clamp(minW, window.outerWidth);
            Graphics.height = Graphics.boxHeight = newScr.x.clamp(minH, window.outerHeight);
        }

    } else {
        // 그냥 설정한다.
        Graphics.width = Graphics.boxWidth = newScr.x;
        Graphics.height = Graphics.boxHeight = newScr.y;
    }

    // Reset graphics' size
    if (RS.ScreenManager.Params.options.resize) {
        Graphics._renderer.resize(newScr.x, newScr.y);
    }

    // Reset the scene (Unsaved changes will be lost)
    if (RS.ScreenManager.Params.options.recreate && !(SceneManager._scene instanceof Scene_Boot)) {
        if (SceneManager._scene) SceneManager.push(SceneManager._scene.constructor);
    }

};

/**
 * Disarms the behavior of Community_Basic plugin.
 */
if (PluginManager._scripts.contains("Community_Basic")) {
    SceneManager.initNwjs = function () {
        if (Utils.isNwjs()) {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            if (process.platform === 'darwin' && !win.menu) {
                var menubar = new gui.Menu({
                    type: 'menubar'
                });
                var option = {
                    hideEdit: true,
                    hideWindow: true
                };
                menubar.createMacBuiltin('Game', option);
                win.menu = menubar;
            }
        }
    };
};

/**
 * Disarms the behavior of YEP_CoreEngine and ScreenResolution plugins.
 */
if (SceneManager.run.toString().match(/Yanfly/i)) {
    SceneManager.run = function (sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);
            this.requestUpdate();
        } catch (e) {
            this.catchException(e);
        }
    };
}

var alias_Graphics_onWindowResize = Graphics._onWindowResize;
Graphics._onWindowResize = function () {
    alias_Graphics_onWindowResize.call(this);
    if (Utils.isNwjs()) {
        //   var canvas = document.querySelector('canvas');
        //   var dx = parseInt(canvas.style.width);
        //   var dy = parseInt(canvas.style.height);
        //   var xPadding = window.outerWidth - window.innerWidth;
        //   var yPadding = window.outerHeight - window.innerHeight;
        //   var cx = (window.screen.availWidth / 2) - (Graphics.boxWidth / 2);
        //   var cy = (window.screen.availHeight / 2) - (Graphics.boxHeight / 2);
        //   if(dx !== Graphics.boxWidth) {
        //     var mx = (Graphics.boxWidth - dx);
        //     var my = (Graphics.boxHeight - dy);
        //     window.resizeTo(
        //       parseInt(Graphics.boxWidth - mx + xPadding),
        //       parseInt(Graphics.boxHeight - my + yPadding)
        //     );
        //   }
        if (!nw) var nw = require("nw.gui");
        var win = nw.Window.get();
        win.setPosition("center");
    }
};
