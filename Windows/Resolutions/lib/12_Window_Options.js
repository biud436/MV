//#region Option Window
//============================================================================
// Window_Options
//============================================================================

if(RS.ScreenManager.Params.isValidOptionWindow) {

    var alias_Window_Options_initialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function() {
    alias_Window_Options_initialize.call(this);
    this._lastIndex = $gameSystem._lastScreenManagerItem || 0;
    };

    Window_Options.prototype.isResolution = function (symbol) {
    return symbol.contains('Resolutions');
    };

    Window_Options.prototype.isAspectRatio = function (symbol) {
    return symbol.contains('Aspect Ratio');
    };

    Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        if (value > 100) {
            value = 0;
        }
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        if(this.isResolution( symbol ) ) {
            SceneManager.push( ScreenManager );
        } else {
            this.changeValue(symbol, !value);
        }
    }
    };

    var alias_Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if(!this.isResolution(symbol) || !this.isAspectRatio(symbol)) {
        return alias_Window_Options_cursorRight.call(this, wrap);
    }
    };

    var alias_Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;  
    Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if(!this.isResolution(symbol) || !this.isAspectRatio(symbol)) {
        return alias_Window_Options_cursorLeft.call(this, wrap);
    }      
    };  

    Window_Options.prototype.statusText = function(idx) {
    var symbol = this.commandSymbol(idx);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        return this.volumeStatusText(value);
    } else {
        // 해상도 조절
        if(this.isResolution( symbol ) ) {
        idx = this._lastIndex;
        var item;

        // PC라면 해상도 표시
        if(Utils.isNwjs()) {
            item = Graphics.getAvailGraphicsArray('String');
            if(!RS.ScreenManager.isFullscreen()) {
                item.push(RS.ScreenManager.localization.get("Full Screen"));
            } else {
                item.push(RS.ScreenManager.localization.get("Windowed Mode"));            
            }
        } else {
            // 그외 플랫폼은 낮음, 보통, 높음, 매우 높음으로 표시
            item = RS.ScreenManager.localization.get("MobileResolutions");
        }

        return String(Graphics.boxWidth + " x " + Graphics.boxHeight);

        // 종횡비 표시
        } else {
        if( this.isAspectRatio( symbol ) ) {
            return new ScreenConfig(0, 0, '').getRatioAsString(Graphics.boxWidth, Graphics.boxHeight);
        } else {
            return this.booleanStatusText(value);
        }
        }
    }
    };

    var alias_Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function() {
        alias_Window_Options_addVolumeOptions.call(this);
        this.addCommand(RS.ScreenManager.localization.get('Resolutions'), 'Resolutions');
        this.addCommand(RS.ScreenManager.localization.get('Aspect Ratio'), 'Aspect Ratio');
    };
}