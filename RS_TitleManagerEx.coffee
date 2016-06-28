###:
# RS_TitleManagerEx.js
#
# @plugindesc This plugin is changed the title screen image and
# title-background-music when the game has been completed.
#
# @author biud436
#
# @date 2015.12.21
# @version 1.0.3
#
# @param ending1
# @desc ending1
# ["File name of title 1","File name of title 2","File name of BGM"]
# @default ["Book", "", "Theme1"]
#
# @param ending2
# @desc ending2
# ["File name of title 1","File name of title 2","File name of BGM"]
# @default ["Devil", "", "Field2"]
#
# @param ending3
# @desc ending3
# ["File name of title 1","File name of title 2","File name of BGM"]
# @default ["Book", "", "Theme1"]
#
# @param ending4
# @desc ending4
# ["File name of title 1","File name of title 2","File name of BGM"]
# @default ["Book", "", "Theme1"]
#
# @param Map ID
# @desc Map ID
# @default 1
#
# @param Map X
# @desc Map X
# @default 0
#
# @param Map Y
# @desc Map Y
# @default 0
#
# @param specific command
# @desc specific command's name.
# @default specific command
#
# @param show specific command
# @desc If you set to true, A specific command is shown in the game title screen.
# @default true
#
# @help
# This plugin provides a useful plugin command.
#
# Following are the plugin commands.
#
# - This plugin command allows you to set the Ending.
# Ending Setup ending1
# Ending Setup ending2
# Ending Setup ending3
# Ending Setup ending4
#
# - This plugin command allows you to initialize the Ending.
# Ending Initialize
#
# - This code confirms an ended Ending of the game.
# if($gameMap.isClearEnding("ending1")) {
#   // true
# } else {
#   // false
# }
#
# - Returns a completed game's Ending List. For example.
# $gameMap.getEnding();
#
# - Returns the number of the completed ending. For example.
# $gameMap.getEnding().length;
#
# - Version Log
# 1.0.2 (2015.12.22) - Fixed a bug about the web local storage.
# 1.0.3 (2016.03.07) - Fixed a bug that causes a serious problem when the parameters were set to English.
#
###

Imported = Imported or {}
Imported.RS_TitleManagerEx = true
RS = RS or {}
RS.Position = RS.Position or {}
RS.Tool = RS.Tool or {}
RS.Header = RS.Header or {}
RS.EndingClearList = RS.EndingClearList or []
do ->
  parameters = PluginManager.parameters('RS_TitleManagerEx')
  baseResource = '[\'\', \'\', \'\']'
  specialMenuName = String(parameters['specific command'] or 'specific command')
  showSpecialMenu = Boolean(parameters['show specific command'] == 'true')
  # 타이틀에서 불러올 그래픽 파일들을 설정합니다
  RS.Tool.RESOURCE =
    'base title': eval(parameters['base title']) or baseResource
    'ending1': eval(parameters['ending1']) or baseResource
    'ending2': eval(parameters['ending2']) or baseResource
    'ending3': eval(parameters['ending3']) or baseResource
    'ending4': eval(parameters['ending4']) or baseResource
  # 스페셜 맵 설정
  RS.Position.MAP_ID = Number(parameters['Map ID'] or 1)
  RS.Position.X = Number(parameters['Map X'] or 0)
  RS.Position.Y = Number(parameters['Map Y'] or 0)
  RS.Position.RESULT = [
    RS.Position.MAP_ID
    RS.Position.X
    RS.Position.Y
  ]
  #
  alias_Scene_Title_create = Scene_Title::create

  Scene_Title::create = ->
    RS.Tool.RESOURCE['base title'] = [
      $dataSystem.title1Name
      $dataSystem.title2Name
      $dataSystem.titleBgm
    ]
    alias_Scene_Title_create.call this
    return

  # 스폐셜 메뉴를 설정합니다.

  DataManager.setupSpecialGame = ->
    @createGameObjects()
    @selectSavefileForNewGame()
    $gameParty.setupStartingMembers()
    $gamePlayer.reserveTransfer arguments[0], arguments[1], arguments[2]
    Graphics.frameCount = 0
    return

  # 엔딩을 설정합니다

  DataManager.saveToEnding = (string) ->
    if StorageManager.isLocalMode()
      StorageManager.saveToLocalEnding string
    else
      StorageManager.saveToWebEnding string
    return

  # 엔딩 파일을 삭제합니다

  DataManager.removeEnding = ->
    if StorageManager.isLocalMode()
      StorageManager.removeLocalEnding()
    else
      StorageManager.removeWebEnding()
    return

  # 엔딩에 맞는 정보를 불러옵니다

  DataManager.loadFromEnding = (string) ->
    if StorageManager.isLocalMode()
      StorageManager.loadFromLocalEnding string
    else
      StorageManager.loadFromWebEnding string

  # 엔딩 파일을 저장합니다.

  StorageManager.saveToLocalEnding = (string) ->
    json = JSON.stringify(@publishKey(string))
    data = LZString.compressToBase64(json)
    fs = require('fs')
    dirPath = @localFileDirectoryPath()
    filePath = dirPath + 'ending.dat'
    if !fs.existsSync(dirPath)
      fs.mkdirSync dirPath
    fs.writeFileSync filePath, data
    return

  # 엔딩 파일을 로드합니다.

  StorageManager.loadFromLocalEnding = (string) ->
    data = null
    fs = require('fs')
    filePath = @localFileDirectoryPath() + 'ending.dat'
    if fs.existsSync(filePath)
      data = fs.readFileSync(filePath, encoding: 'utf8')
      JSON.parse LZString.decompressFromBase64(data)
    else
      @endingNull()

  # 엔딩 파일을 삭제합니다.

  StorageManager.removeLocalEnding = ->
    fs = require('fs')
    filePath = @localFileDirectoryPath() + 'ending.dat'
    if fs.existsSync(filePath)
      fs.unlinkSync filePath
    return

  # 엔딩 파일을 웹 로컬 저장소에 저장합니다 .

  StorageManager.saveToWebEnding = (string) ->
    key = 'RPG Ending'
    json = JSON.stringify(@publishKey(string))
    data = LZString.compressToBase64(json)
    localStorage.setItem key, data
    return

  # 엔딩 파일을 웹 로컬 저장소에서 로드합니다.

  StorageManager.loadFromWebEnding = (string) ->
    key = 'RPG Ending'
    data = null
    if ! !localStorage.getItem(key)
      data = localStorage.getItem(key)
      JSON.parse LZString.decompressFromBase64(data)
    else
      @endingNull()

  # 엔딩 파일을 웹 로컬 저장소에서 삭제합니다.

  StorageManager.removeWebEnding = ->
    key = 'RPG Ending'
    localStorage.removeItem key
    return

  # 엔딩키를 찾을 수 없을 때

  StorageManager.endingNull = ->
    ending = undefined
    ending = {}
    ending.version = 0
    ending.n = RS.Tool.RESOURCE['base title']
    ending.endingClearList = RS.EndingClearList
    ending

  # 엔딩키 발급(게임의 버전/리소스의 이름)

  StorageManager.publishKey = (string) ->
    try
      ending = undefined
      ending = {}
      ending.version = 1000
      ending.n = RS.Tool.RESOURCE[string]
      RS.EndingClearList.push string
      ending.endingClearList = RS.EndingClearList
      return ending
    catch e
      return @endingNull()
    return

  RS.Header.background = null
  # 엔딩키값을 로드합니다

  RS.Header.load = ->
    f = DataManager.loadFromEnding()
    RS.EndingClearList = f.endingClearList
    result = [
      f.version
      f.n
    ]
    result

  # 배경화면 정보를 설정합니다

  RS.Header.chooseBackground = ->
    if @load()[0] == 1000
      @loadBackground @load()[1]
      true
    else
      RS.Header.background = RS.Tool.RESOURCE['base title']
      false

  # 배경화면을 불러옵니다

  RS.Header.loadBackground = (set) ->
    RS.Header.background = set
    return

  # 배경화면을 배포합니다

  RS.Header.exportBackground = ->
    RS.Header.background

  # 스페셜 메뉴를 설정합니다.

  RS.Header.isSpecialMenu = ->
    if @load()[0] == 1000 and showSpecialMenu
      true
    else
      false

  # 배경 화면을 생성합니다.

  Scene_Title::createBackground = ->
    RS.Header.chooseBackground()
    @_backSprite1 = new Sprite(ImageManager.loadTitle1(RS.Header.exportBackground()[0]))
    @_backSprite2 = new Sprite(ImageManager.loadTitle2(RS.Header.exportBackground()[1]))
    @addChild @_backSprite1
    @addChild @_backSprite2
    return

  # 타이틀 음악을 재생합니다.

  Scene_Title::playTitleMusic = ->
    if RS.Header.chooseBackground()
      data = AudioManager.makeEmptyAudioObject()
      data.name = RS.Header.exportBackground()[2]
      data.volume = 90
      AudioManager.playBgm data
    else
      AudioManager.playBgm $dataSystem.titleBgm
    AudioManager.stopBgs()
    AudioManager.stopMe()
    return

  # 스페셜 메뉴를 기존 커맨드 윈도우에 추가합니다.

  Window_TitleCommand::makeCommandList = ->
    @addCommand TextManager.newGame, 'newGame'
    @addCommand TextManager.continue_, 'continue', @isContinueEnabled()
    if RS.Header.isSpecialMenu()
      @addCommand specialMenuName, 'specialMenu'
    @addCommand TextManager.options, 'options'
    return

  # 커맨드 윈도우를 생성합니다.
  alias_createCommandWindow = Scene_Title::createCommandWindow

  Scene_Title::createCommandWindow = ->
    alias_createCommandWindow.call this
    if RS.Header.isSpecialMenu()
      @_commandWindow.setHandler 'specialMenu', @specialMenu.bind(this)
    return

  # 다른 맵으로 이동합니다.

  Scene_Title::specialMenu = ->
    DataManager.setupSpecialGame.apply DataManager, RS.Position.RESULT
    @_commandWindow.close()
    @fadeOutAll()
    SceneManager.goto Scene_Map
    return

  # 플러그인 커맨드
  alias_pluginCommand = Game_Interpreter::pluginCommand

  Game_Interpreter::pluginCommand = (command, args) ->
    alias_pluginCommand.call this, command, args
    if command == 'Ending' or command == '엔딩'
      switch args[0]
        when 'Setup', '설정'
          DataManager.saveToEnding args[1]
        when '초기화', 'Initialize'
          DataManager.removeEnding()
    return

  # 엔딩 클리어 여부 확인

  Game_Map::isClearEnding = (string) ->
    result = RS.EndingClearList.filter(((i) ->
      if i == string
        true
      else
        false
    ).bind(this))
    result.length > 0

  # 엔딩 리스트 출력

  Game_Map::getEnding = ->
    RS.EndingClearList

  return
