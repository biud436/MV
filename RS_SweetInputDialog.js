/*:
 * @plugindesc This plugin allows you to change an UI of the alert window by using SweetAlert library. <RS_SweetInputDialog>
 * @author biud436
 * 
 * @help
 * =========================================================================================
 * Installation
 * =========================================================================================
 * SweetAlert library is available at https://unpkg.com/sweetalert/dist/sweetalert.min.js
 * And then copy sweetalert.min.js to js/plugins folder of your game's root directory.
 * You don't need to choose its library file within the Plugin Manager.
 * 
 * But, this plugin must need a RS_InputDialog.js plugin.
 * it is available at https://raw.githubusercontent.com/biud436/MV/master/RS_InputDialog.js
 * 
 * In the Plugin Manager, This plugin must locate in somewhere below RS_InputDialog plugin.
 * 
 * =========================================================================================
 * Introduction and Usage
 * =========================================================================================
 * This plugin must require RS_InputDialog.js plugins and SweetAlert library.
 * We will check whether the button is OK or Cancel in the dialog and then let's show up alert window.
 * 
 * It is very easy to make the two buttons in the alert window.
 * Open up the script command and you can write this code, as follows :
 * 
 *  var textbox = new SweetTextBox();
 *  textbox.setEvent(function() {
 *      swal("This is a OK Callback function");
 *  }, function() {
 *      swal("This is a Cancel Callback function");
 *  });
 *  textbox.open();
 * 
 * We must pass by defining callback functions such as OK or Cancel into the setEvent function of our textbox.
 * Note that the SweetTextBox class makes sure that assigns callback functions into the swal of SweetAlert library.
 * 
 */

var Imported = Imported || {};
Imported.RS_SweetInputDialog = true;

var RS = RS || {};
RS.SweetInputDialog = RS.SweetInputDialog || {};

(function($) {

    "use strict";
    
    var parameters = $plugins.filter(function (i) {
      return i.description.contains('<RS_SweetInputDialog>');
    });
    
    parameters = (parameters.length > 0) && parameters[0].parameters;

    $.downloadData = function(filePath, url, func) {
        if(!Utils.isNwJs()) return;

        var http = require('https');
        var Stream = require('stream').Transform;
        var fs = require('fs');

        http.request(url, function(response) {
        var data = new Stream();
        var ext = url.match(/(\/www|)\/[^\/]*$/);

        console.log(ext);

        if(ext && ext instanceof Array) {
            ext = ext[0];
        }

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            fs.writeFileSync('%1%2'.format(filePath, ext), data.read());
            func();
        });

        }).end();
    }    

    PluginManager.loadScript("sweetalert.min.js");

    if(!Imported.RS_InputDialog) {
        console.error(`This pluin must be required on RS_InputDialog`);       
        $.downloadData(`js/plugins`, `https://raw.githubusercontent.com/biud436/MV/master/RS_InputDialog.js`, ()=>{});
        return;
    }

    if(Utils.RPGMAKER_VERSION < '1.6.1') {
        SceneManager._getTimeInMsWithoutMobileSafari = function() {
          return performance.now();
        };    
    }

    var original_Input_shouldPreventDefault = Input._shouldPreventDefault;
    var dialog_Input_shouldPreventDefault = function(keyCode) {
        switch (keyCode) {
        case 33:    // pageup
        case 34:    // pagedown
        case 37:    // left arrow
        case 38:    // up arrow
        case 39:    // right arrow
        case 40:    // down arrow
            return true;
        }
        return false;
    };    

    //============================================================================
    // SceneManager
    //============================================================================    

    SceneManager.pause = false;
     
    SceneManager.updateMain = function() {
        var self = this;

        if(!self.pause) {
            if (Utils.isMobileSafari()) {
            this.changeScene();
            this.updateScene();
            } else {
            var newTime = this._getTimeInMsWithoutMobileSafari();
            var fTime = (newTime - this._currentTime) / 1000;
            if (fTime > 0.25) fTime = 0.25;
            this._currentTime = newTime;
            this._accumulator += fTime;
            while (this._accumulator >= this._deltaTime) {
                this.updateInputData();
                this.changeScene();
                this.updateScene();
                this._accumulator -= this._deltaTime;
            }
            }
        }
        this.renderScene();
        this.requestUpdate();
    };        

    //============================================================================
    // SweetTextBox
    //============================================================================

    function SweetTextBox() {
        this.initialize.apply(this, arguments);
    };

    SweetTextBox.prototype.initialize = function() {
        this.startToConvertInput();
        this.initMembers();
    };

    SweetTextBox.prototype.initMembers = function() {
        this._value = "";
    };

    SweetTextBox.prototype.setEvent = function(okFunc, cancelFunc) {
        this._okFunc = okFunc;
        this._cancelFunc = cancelFunc;
    };

    /**
     * 
     * @return {Promise} swal
     */
    SweetTextBox.prototype.open = function() {

        this.startToConvertInput();
        
        var textHint = RS.InputDialog.Params.localText;
        var self = this;
        var defalutValue = "";

        SceneManager.pause = true;

        swal(textHint, {
        content: {
            element: "input",
            // attributes: {
            //   placeholder: textHint,
            // },
        },
        buttons: {
            confirm: RS.InputDialog.Params.okButtonName,
            cancel: RS.InputDialog.Params.cancelButtonName
        }
        })
        .then((value) => {

            SceneManager.pause = false;

            if(value === null) {
                // if the button called cancel is pressed
                self._cancelFunc();
            } else {
                // if the button called ok is pressed
                self._value = value;
                self._okFunc(self._value);
            }
            
            TouchInput.clear();
            Input.clear();
            self.startToOriginalInput();

        });

    };

    SweetTextBox.prototype.startToConvertInput = function () {
        Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
    };

    SweetTextBox.prototype.startToOriginalInput = function () {
        Input._shouldPreventDefault = original_Input_shouldPreventDefault;
    };  

    window.SweetTextBox = SweetTextBox;

})(RS.SweetInputDialog); 
