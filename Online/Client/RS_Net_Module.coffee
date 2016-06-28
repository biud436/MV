###:
# RS_Net_Module.js
# @plugindesc Online Chat (Node.js + Socket.io)
# @author biud436
#
# @param SERVER_IP
# @desc IP
# @default 127.0.0.1
#
# @param PORT
# @desc PORT
# @default 3100
#
# @param REG1
# @desc This is regular expression of the command that can change your nickname.
# @default /@닉변[ ]*:[ ]*(.*)/
#
# @help
#
# =============================================================================
# Change Log
# =============================================================================
#
# 2015.11.06 - First Release, Added the Text Box
# 2015.11.07 - Fixed the Text Box
# 2015.11.08 - Added A Server based on NodeJS and Chat.
# 2015.11.23 - Added a many function in the client.
# 2015.11.24 - Added a function called '$gameMessage.addNotice()'
# 2015.11.25 - Added functions that could download the login page from the Server.
# 2016.05.10 - Added plugin parameters that could change the IP or Port of the Server.
# 2016.06.28 - Added the parameters.
#
# =============================================================================
# Development Environment
# =============================================================================
# node.js, socket.io
#
# =============================================================================
# Basic chatting commands
# =============================================================================
# @닉변 : 닉네임명 - This command provides a function that could change a nickname on chat box.
#
# =============================================================================
# Basic Functions
# =============================================================================
# RS.Net.userCount() - Get the number of connected users on the server.
# RS.Net.getTime() - Get the time of the server.
# RS.Net.loadScript(ScriptName) - Download specific script from the server.
# RS.UI.prepareLoginElement() - Indicate the Login page.
#
###

# Server URL
RS = RS or {}

ChatBox = ->
  @initialize.apply this, arguments
  return

RS.UI = RS.UI or {}
RS.Net = RS.Net or {}
RS.Net.SERVER_IP = undefined
RS.Net.Socket = undefined
do ->
  # Get the parameters of itself from the scripts.
  RS.Net.Params = $plugins.filter((i) ->
    if i.name == 'RS_Net_Module'
      return true
    return
  )[0].parameters
  # Create Server Url String

  RS.Net.createServerURL = ->
    self = this
    param = self.Params
    url = 'http://' + param.SERVER_IP + ':' + param.PORT
    url

  # Set the Global Variable that is stored URL of the Server.
  RS.Net.SERVER_IP = RS.Net.SERVER_IP or RS.Net.createServerURL()
  # Set the Global Variable that is stored the Socket.io Object.
  RS.Net.Socket = RS.Net.Socket or io.connect(RS.Net.SERVER_IP)
  # This is regular expression of the command that can change your nickname.
  RS.Net.nickCommand = eval(RS.Net.Params.REG1)
  # Users
  RS.Net.Users = {}
  # Custom Parameters
  RS.Net.Params.connectedUsersMSG1 = '현재 접속 인원은 '
  RS.Net.Params.connectedUsersMSG2 = ' 명 입니다'
  RS.Net.Params.noticeMSG = '\\c[4][공지]'
  #------------------------------------------------------------------------------
  # Game_Interpreter
  #
  #
  alias_Game_Interpreter_pluginCommand = Game_Interpreter::pluginCommand

  Game_Interpreter::pluginCommand = (command, args) ->
    alias_Game_Interpreter_pluginCommand.call this, command, args
    if command == 'Chat'
      switch args[0].toLowerCase()
        when 'connect'
          # Create a new user(event) on the map.
        when 'disconnect'
          # Delete the event on the map.
    return

  #------------------------------------------------------------------------------
  # RS.Net
  #
  #
  # Download the script from the server.

  RS.Net.loadScript = (name) ->
    url = '%1/%2'.format(RS.Net.SERVER_IP, name)
    script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = false
    script._url = url
    document.body.appendChild script
    return

  # Download the script called 'JsonFormatter.js' from the server.
  RS.Net.loadScript 'JsonFormatter.js'
  # Get the number of connected users on the server.

  RS.Net.userCount = ->
    RS.Net.Socket.on 'user count', (msg) ->
      console.log msg
      return
    return

  # Get the number of connected users on the server.

  RS.Net.update = ->
    RS.Net.Socket.emit 'user count', ''
    return

  RS.Net.count = 0
  RS.Net.cryptText = ''
  RS.Net.cryptKey = ''
  # Get the time of the server.

  RS.Net.getTime = ->
    RS.Net.Socket.emit 'get time', ''
    RS.Net.Socket.on 'get time', (msg) ->
      console.log msg
      return
    return

  # Set the cipher key

  RS.Net.setCryptKey = ->
    RS.Net.Socket.emit 'get key', ''
    return

  # Request the cipher key.

  RS.Net.setEncryption = (msg) ->
    RS.Net.Socket.emit 'crypt', msg
    return

  # Get the coded message.

  RS.Net.getCryptObject = (msg) ->
    JSON.parse @cryptText

  #------------------------------------------------------------------------------
  # RS.UI
  #
  #
  # Prepare Element

  RS.UI.prepareElement = ->
    divc = document.createElement('div')
    divc.id = 'inputField'
    divc.style.position = 'absolute'
    divc.style.margin = 'auto'
    divc.style.left = '0'
    divc.style.top = '0'
    divc.style.right = '0'
    divc.style.bottom = '0'
    divc.style.width = Graphics.boxWidth + 'px'
    divc.style.height = Graphics.boxHeight + 'px'
    divc.style.zIndex = '1000'
    document.body.appendChild divc
    divc

  RS.UI.createInputField = (x, y, width, height) ->
    element = document.createElement('input')
    element.id = 'input1'
    element.type = 'text'
    element.style.position = 'absolute'
    element.style.margin = 'auto'
    element.style.left = x + 'px'
    element.style.top = y + '0'
    element.style.width = width + 'px'
    element.style.height = height + 'px'
    div = document.getElementById('inputField')
    div.appendChild element
    return

  # Prepare Login Element

  RS.UI.prepareLoginElement = ->
    divc = document.createElement('div')
    divc.id = 'loginField'
    divc.style.zIndex = '1010'
    divc.style.width = Graphics.boxWidth + 'px'
    divc.style.height = Graphics.boxHeight + 'px'
    Graphics._centerElement divc
    document.body.appendChild divc
    iframe = document.createElement('iframe')
    iframe.id = 'loginField'
    iframe.src = RS.Net.SERVER_IP + '/login.html'
    iframe.style.left = '0px'
    iframe.style.top = '0px'
    # iframe.style.width = 300 + 'px';
    # iframe.style.height = 300 + 'px';
    iframe.style.zIndex = '1001'
    iframe.style.borderWidth = '0px'
    divc.appendChild iframe
    divc

  # Remove Login Element

  RS.UI.removeLoginElement = ->
    divc = document.getElementById('loginField')
    document.body.removeChild divc
    return

  # Create <input> tag

  RS.UI.addTextBox = (yPosition) ->
    rect = undefined
    inp = undefined
    rect = ChatBox.getEditBoxRect(yPosition)
    inp = document.getElementById('input1')
    inp.style.position = 'absolute'
    inp.style.backgroundColor = 'rgba(0,0,0,0.6)'
    inp.style.left = rect.x + 'px'
    inp.style.top = rect.y + 'px'
    inp.style.width = rect.width + 'px'
    inp.style.height = rect.height + 'px'
    inp.style.borderColor = inp.style.backgroundColor
    inp

  # Orientation

  RS.UI.getHeight = ->
    vv = window.innerHeight - (Graphics.boxHeight)
    top = undefined
    top = if vv > 0 then vv / 2 else vv
    top

  # When you are resizing the window object, This function automatically starts.

  RS.UI.resizeTextBox = (yPosition) ->
    inp = undefined
    left = undefined
    inp = document.getElementById('input1')
    left = (window.innerWidth - (Graphics.boxWidth)) / 2
    rect = ChatBox.getEditBoxRect(yPosition)
    inp.style.position = 'absolute'
    inp.style.left = rect.x + 'px'
    inp.style.top = rect.y + 'px'
    inp.style.width = rect.width / Graphics._realScale + 'px'
    inp.style.height = rect.height + 'px'
    return

  #------------------------------------------------------------------------------
  # ChatBox
  #
  #
  ChatBox.prototype = Object.create(Window_Base.prototype)
  ChatBox::constructor = ChatBox
  # Initialize the ChatBox

  ChatBox::initialize = ->
    Window_Base::initialize.apply this, arguments
    @opacity = 0
    return

  # Set standard Padding

  ChatBox::standardPadding = ->
    0

  # Get standard Font Size

  ChatBox::standardFontSize = ->
    12

  # Reset the font settings

  ChatBox::resetFontSettings = ->
    @contents.fontFace = @standardFontFace()
    @contents.fontSize = @standardFontSize()
    @resetTextColor()
    return

  # Get x-position of the chat box.

  ChatBox.getX = (clientX, w) ->
    # Finding the game canvas
    gc = document.querySelector('canvas')
    # Get the Client Rect for inputField object.
    bound = document.getElementById('inputField').getBoundingClientRect()
    (window.innerWidth - (Graphics.width)) / 2 + (clientX - (bound.left)) * gc.width / bound.width

  # Get y-position of the chat box.

  ChatBox.getY = (clientY, h) ->
    # Finding the game canvas
    gc = document.querySelector('canvas')
    # Get the Client Rect for inputField object.
    bound = document.getElementById('inputField').getBoundingClientRect()
    (window.innerHeight - (Graphics.height)) / 2 + (clientY - (bound.top)) * gc.height / bound.height

  # Get the rect of the chat box

  ChatBox.getEditBoxRect = (yPosition) ->
    rect = new Rectangle
    rect.width = Graphics.boxWidth / 2
    rect.height = 20
    rect.x = ChatBox.getX(10, rect.width)
    rect.y = ChatBox.getY(yPosition, rect.height)
    rect

  #------------------------------------------------------------------------------
  # Scene_Map
  #
  #
  # Creates the EditBox

  Scene_Map::createEditBox = (yPosition) ->
    inp = undefined
    divc = undefined
    divc = RS.UI.prepareElement()
    inp = RS.UI.addTextBox(yPosition)
    window.onresize = RS.UI.resizeTextBox(yPosition)
    inp

  # Creates Chat Box
  _Scene_Map_createDisplayObjects = Scene_Map::createDisplayObjects

  Scene_Map::createDisplayObjects = ->
    _Scene_Map_createDisplayObjects.call this
    # You should always connected the internet
    # because this function creates the chat box on the field at all times.
    @createChatBox()
    return

  #------------------------------------------------------------------------------
  # Input
  #
  #

  Input._shouldPreventDefault = (keyCode) ->
    switch keyCode
      # case 8:     // backspace
      # pageup
      # pagedown
      # left arrow
      # up arrow
      # right arrow
      when 33, 34, 37, 38, 39, 40
        # down arrow
        return true
    false

  #------------------------------------------------------------------------------
  # Game_Temp
  #
  #
  # Release the auto movement system of the player when clicking the chat box.

  Game_Temp::isDestinationValid = ->
    @_destinationX != null and !$gameTemp.chatFocus

  #------------------------------------------------------------------------------
  # Scene_Map
  #
  #

  Scene_Map::createChatBox = ->
    # Creates the Chat Box
    @_chatBox = new ChatBox(0, 0, Graphics.boxWidth / 2, Graphics.boxHeight / 3)
    @addWindow @_chatBox
    # Fill the color.
    color = 'rgba(0, 0, 0, 0.6)'
    @_chatBox.contents.fillAll color
    # Set the position
    @_chatBox.x = 10
    @_chatBox.y = Graphics.boxHeight - (@_chatBox.height) - 80
    # Create the Edit Box
    @_inputBox = @createEditBox(@_chatBox.y + @_chatBox.height + 10)
    @_inputBox.style.color = 'rgb(255,255,255)'
    # Set an event called 'onchange'
    @_inputBox.onchange = (->
      msg = 
        id: RS.Net.Socket.io.engine.id
        name: $gameParty.members()[0].name()
        msg: @_inputBox.value
      RS.Net.Socket.emit 'chat message', JSON.stringify(msg)
      @_inputBox.value = ''
      return
    ).bind(this)
    # Set an event called 'onfocus'
    @_inputBox.onfocus = (->
      $gameTemp.chatFocus = true
      return
    ).bind(this)
    # Set an event called 'onblur'
    @_inputBox.onblur = (->
      $gameTemp.chatFocus = false
      return
    ).bind(this)
    # Set the Message handling functions.
    if RS.Net.count == 0
      # Send Chat Message to the server.
      RS.Net.Socket.on 'chat message', (msg) ->
        $gameMessage.addChat msg
        return
      # Get Current connected Users to the server.
      RS.Net.Socket.on 'current user', (msg) ->
        param = RS.Net.Params
        $gameMessage.addNotice param.connectedUsersMSG1 + msg + param.connectedUsersMSG2
        return
      RS.Net.setCryptKey()
      # Get the key of a cryptolect.
      RS.Net.Socket.on 'get key', (key) ->
        RS.Net.cryptKey = key
        return
      # Get the text of a cryptolect.
      RS.Net.Socket.on 'crypt', (encrypted) ->
        RS.Net.cryptText = encrypted
        return
      # play the youtube on the map.
      RS.Net.Socket.on 'playYoutube', (msg) ->
        eval msg
        return
      RS.Net.count++
    # ------------------------------------------------------------------------
    # Redraw All of the Text in the ChatBox.
    _chatBox_update = @_chatBox.update

    @_chatBox.update = ->
      _color = undefined
      _chatBox_update.call this
      if $gameMessage._textList and $gameMessage._textList instanceof Array
        # Clear Bitmap.
        @contents.clear()
        # Set the default color
        _color = 'rgba(0, 0, 0, 0.6)'
        # Fill the contents to the default color
        @contents.fillAll _color
        # Adding the Text on TextList
        $gameMessage._textList.forEach ((nowText, index, array) ->
          @drawTextEx nowText, 0, index * 20
          return
        ).bind(this)
      return

    return

  # Destroy the EditBox object from DOM(Document Object Model)
  _Scene_Map_terminate = Scene_Map::terminate

  Scene_Map::terminate = ->
    _Scene_Map_termine.call this
    if @_inputBox
      __inputField = document.getElementById('inputField')
      __inputBox = document.getElementById('input1')
      __inputField.removeChild __inputBox
      document.body.removeChild __inputField
    return

  #------------------------------------------------------------------------------
  # Game_Message
  #
  #
  # Add a string on Chat Box.

  Game_Message::addChat = (text) ->
    headText = undefined
    res = JSON.parse(text)
    # Check the command that can change the nickname.
    if res.msg.match(RS.Net.nickCommand) and RS.Net.Socket.io.engine.id == res.id
      $gameParty.members()[0].setName RegExp.$1
    @_textList = @_textList or []
    if RS.Net.Socket.io.engine.id == res.id
      # Highlighting the text color of my own.
      headText = '\\c[4][%1]\\c[0] : '.format(res.name)
    else
      # Handling the text color except itself.
      headText = '[%1] : '.format(res.name)
    @_textList.push headText + res.msg
    setTimeout (->
      @_textList.shift()
      return
    ).bind(this), 1000 * 10
    return

  # Show the notification text.

  Game_Message::addNotice = (text) ->
    result = RS.Net.Params.noticeMSG + ' ' + text
    @_textList = @_textList or []
    @_textList.push result
    setTimeout (->
      @_textList.shift()
      return
    ).bind(this), 1000 * 10
    return

  # Play the Youtube for All Users.

  Game_Message::playYoutubeAllUser = ->
    if RS.Net.Socket
      RS.Net.Socket.emit 'playYoutube', JSON.stringify('')
    return

  return
