/**
 * @name 한글 이름 입력 처리
 * @author biud436
 * @since 2015.10.19
 * @version 1.2
 * @description ..
 */
 
function TextBox() {
  this.initialize.apply(this, arguments);
};

(function() {
  
  TextBox.prototype.initialize = function(_editWindow)  {
    this._editWindow = _editWindow;
    this.createTextBox();
    this.getFocus();
  };
  
  TextBox.prototype.createTextBox = function() {
    this._textBox = document.createElement('input');
    this._textBox.type = "text"
    this._textBox.id = "textBox"
    this._textBox.style.opacity = 0;
    this._textBox.onkeydown = this.onKeyDown.bind(this);
    document.body.appendChild(this._textBox);  
  };
  
  TextBox.prototype.setEvent = function(func) {
    this._textBox.onchange = func;
  };  	
	
  TextBox.prototype.terminateTextBox = function() {
    document.body.removeChild(this._textBox);
  };  
  
  TextBox.prototype.onKeyDown = function(e) {
  
    this.getFocus();
  
    switch(e.keyCode) {
    case 8:
      if (this.getTextLength() > 0) {
        this.backSpace();
      }
      break;  
    case 13:
    case 229:
      break;
    }    
  }
  
  Window_NameEdit.prototype.charWidth = function () {
    var text = '\uAC00';
    return this.textWidth(text)
  };  
  
  TextBox.prototype.getTextLength = function() {
    return this._textBox.value.length;
  };
  
  TextBox.prototype.getMaxLength = function() {
    return this._editWindow._maxLength;
  };
  
  TextBox.prototype.backSpace = function() {
    this._editWindow._name = this._editWindow._name.slice(0, this._textBox.value.length - 1);
    this._editWindow._index = this._textBox.value.length - 1;
    this._textBox.value = this._editWindow._name;
    this._editWindow.refresh();  
  };
  
  TextBox.prototype.refreshNameEdit = function()  {
    this._editWindow._name = this._textBox.value.toString();
    this._editWindow._index = this._textBox.value.length || 0;
    this._editWindow.refresh();
  };

  TextBox.prototype.update = function() {      
    if(this.getTextLength() < this._editWindow._maxLength) {
      this.refreshNameEdit();
    }
  };
  
  Window_NameEdit.prototype.windowWidth = function () {
    return 580;
  };  
  
  Window_NameEdit.prototype.drawChar = function (index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._name[index] || '', rect.x, rect.y)
  };  
  
  TextBox.prototype.getFocus = function() {
    this._textBox.focus();
  };
  
  TextBox.prototype.terminate =  function() {
    this.terminateTextBox();
  };

})();
  
(function () {

  Scene_Name.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createTextBox();
    this._textBox.setEvent( this.onInputOk.bind(this) );
  };  
  
  Scene_Name.prototype.createTextBox =  function() {
    this._textBox = new TextBox(this._editWindow);
  }

  Scene_Name.prototype.update = function() {
  
    this._textBox.getFocus();
    this._textBox.update();
    Scene_MenuBase.prototype.update.call(this);
  }
  
  Scene_Name.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    this._textBox.terminate();
  }

})();