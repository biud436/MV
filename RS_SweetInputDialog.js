/*:
 * @plugindesc <RS_SweetInputDialog>
 * @author biud436
 * 
 * @help
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

    if(!Imported.RS_InputDialog) {
        console.error("This pluin must be required on RS_InputDialog and then need to use SweetAlert.");
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

    function TestSweetTextBox() {
        var textbox = new SweetTextBox();
        textbox.setEvent(() => {
            swal("확인 버튼을 눌렀습니다.");
        },() => {
            swal("취소 버튼을 눌렀습니다.");
        });
        textbox.open();
    };

    $.test = TestSweetTextBox;

})(RS.SweetInputDialog); 



