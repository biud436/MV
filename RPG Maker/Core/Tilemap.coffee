#-----------------------------------------------------------------------------

###*
# The tilemap which displays 2D tile-based game map.
#
# @class Tilemap
# @constructor
###

Tilemap = ->
  @initialize.apply this, arguments
  return

Tilemap.prototype = Object.create(PIXI.DisplayObjectContainer.prototype)
Tilemap::constructor = Tilemap

Tilemap::initialize = ->
  PIXI.DisplayObjectContainer.call this
  @_margin = 20
  @_width = Graphics.width + @_margin * 2
  @_height = Graphics.height + @_margin * 2
  @_tileWidth = 48
  @_tileHeight = 48
  @_mapWidth = 0
  @_mapHeight = 0
  @_mapData = null
  @_layerWidth = 0
  @_layerHeight = 0
  @_lastTiles = []

  ###*
  # The bitmaps used as a tileset.
  #
  # @property bitmaps
  # @type Array
  ###

  @bitmaps = []

  ###*
  # The origin point of the tilemap for scrolling.
  #
  # @property origin
  # @type Point
  ###

  @origin = new Point

  ###*
  # The tileset flags.
  #
  # @property flags
  # @type Array
  ###

  @flags = []

  ###*
  # The animation count for autotiles.
  #
  # @property animationCount
  # @type Number
  ###

  @animationCount = 0

  ###*
  # Whether the tilemap loops horizontal.
  #
  # @property horizontalWrap
  # @type Boolean
  ###

  @horizontalWrap = false

  ###*
  # Whether the tilemap loops vertical.
  #
  # @property verticalWrap
  # @type Boolean
  ###

  @verticalWrap = false
  @_createLayers()
  @refresh()
  return

###*
# The width of the screen in pixels.
#
# @property width
# @type Number
###

Object.defineProperty Tilemap.prototype, 'width',
  get: ->
    @_width
  set: (value) ->
    if @_width != value
      @_width = value
      @_createLayers()
    return

###*
# The height of the screen in pixels.
#
# @property height
# @type Number
###

Object.defineProperty Tilemap.prototype, 'height',
  get: ->
    @_height
  set: (value) ->
    if @_height != value
      @_height = value
      @_createLayers()
    return

###*
# The width of a tile in pixels.
#
# @property tileWidth
# @type Number
###

Object.defineProperty Tilemap.prototype, 'tileWidth',
  get: ->
    @_tileWidth
  set: (value) ->
    if @_tileWidth != value
      @_tileWidth = value
      @_createLayers()
    return

###*
# The height of a tile in pixels.
#
# @property tileHeight
# @type Number
###

Object.defineProperty Tilemap.prototype, 'tileHeight',
  get: ->
    @_tileHeight
  set: (value) ->
    if @_tileHeight != value
      @_tileHeight = value
      @_createLayers()
    return

###*
# Sets the tilemap data.
#
# @method setData
# @param {Number} width The width of the map in number of tiles
# @param {Number} height The height of the map in number of tiles
# @param {Array} data The one dimensional array for the map data
###

Tilemap::setData = (width, height, data) ->
  @_mapWidth = width
  @_mapHeight = height
  @_mapData = data
  return

###*
# Checks whether the tileset is ready to render.
#
# @method isReady
# @type Boolean
# @return {Boolean} True if the tilemap is ready
###

Tilemap::isReady = ->
  i = 0
  while i < @bitmaps.length
    if @bitmaps[i] and !@bitmaps[i].isReady()
      return false
    i++
  true

###*
# Updates the tilemap for each frame.
#
# @method update
###

Tilemap::update = ->
  @animationCount++
  @children.forEach (child) ->
    if child.update
      child.update()
    return
  return

###*
# Forces to repaint the entire tilemap.
#
# @method refresh
###

Tilemap::refresh = ->
  @_lastTiles.length = 0
  return

###*
# @method updateTransform
# @private
###

Tilemap::updateTransform = ->
  ox = Math.floor(@origin.x)
  oy = Math.floor(@origin.y)
  startX = Math.floor((ox - (@_margin)) / @_tileWidth)
  startY = Math.floor((oy - (@_margin)) / @_tileHeight)
  @_updateLayerPositions startX, startY
  @_paintAllTiles startX, startY
  @_sortChildren()
  PIXI.DisplayObjectContainer::updateTransform.call this
  return

###*
# @method _createLayers
# @private
###

Tilemap::_createLayers = ->
  width = @_width
  height = @_height
  margin = @_margin
  tileCols = Math.ceil(width / @_tileWidth) + 1
  tileRows = Math.ceil(height / @_tileHeight) + 1
  layerWidth = tileCols * @_tileWidth
  layerHeight = tileRows * @_tileHeight
  @_lowerBitmap = new Bitmap(layerWidth, layerHeight)
  @_upperBitmap = new Bitmap(layerWidth, layerHeight)
  @_layerWidth = layerWidth
  @_layerHeight = layerHeight

  ###
  # Z coordinate:
  #
  # 0 : Lower tiles
  # 1 : Lower characters
  # 3 : Normal characters
  # 4 : Upper tiles
  # 5 : Upper characters
  # 6 : Airship shadow
  # 7 : Balloon
  # 8 : Animation
  # 9 : Destination
  ###

  @_lowerLayer = new Sprite
  @_lowerLayer.move -margin, -margin, width, height
  @_lowerLayer.z = 0
  @_upperLayer = new Sprite
  @_upperLayer.move -margin, -margin, width, height
  @_upperLayer.z = 4
  i = 0
  while i < 4
    @_lowerLayer.addChild new Sprite(@_lowerBitmap)
    @_upperLayer.addChild new Sprite(@_upperBitmap)
    i++
  @addChild @_lowerLayer
  @addChild @_upperLayer
  return

###*
# @method _updateLayerPositions
# @param {Number} startX
# @param {Number} startY
# @private
###

Tilemap::_updateLayerPositions = (startX, startY) ->
  m = @_margin
  ox = Math.floor(@origin.x)
  oy = Math.floor(@origin.y)
  x2 = (ox - m).mod(@_layerWidth)
  y2 = (oy - m).mod(@_layerHeight)
  w1 = @_layerWidth - x2
  h1 = @_layerHeight - y2
  w2 = @_width - w1
  h2 = @_height - h1
  i = 0
  while i < 2
    children = undefined
    if i == 0
      children = @_lowerLayer.children
    else
      children = @_upperLayer.children
    children[0].move 0, 0, w1, h1
    children[0].setFrame x2, y2, w1, h1
    children[1].move w1, 0, w2, h1
    children[1].setFrame 0, y2, w2, h1
    children[2].move 0, h1, w1, h2
    children[2].setFrame x2, 0, w1, h2
    children[3].move w1, h1, w2, h2
    children[3].setFrame 0, 0, w2, h2
    i++
  return

###*
# @method _paintAllTiles
# @param {Number} startX
# @param {Number} startY
# @private
###

Tilemap::_paintAllTiles = (startX, startY) ->
  tileCols = Math.ceil(@_width / @_tileWidth) + 1
  tileRows = Math.ceil(@_height / @_tileHeight) + 1
  y = 0
  while y < tileRows
    x = 0
    while x < tileCols
      @_paintTiles startX, startY, x, y
      x++
    y++
  return

###*
# @method _paintTiles
# @param {Number} startX
# @param {Number} startY
# @param {Number} x
# @param {Number} y
# @private
###

Tilemap::_paintTiles = (startX, startY, x, y) ->
  tableEdgeVirtualId = 10000
  mx = startX + x
  my = startY + y
  dx = (mx * @_tileWidth).mod(@_layerWidth)
  dy = (my * @_tileHeight).mod(@_layerHeight)
  lx = dx / @_tileWidth
  ly = dy / @_tileHeight
  tileId0 = @_readMapData(mx, my, 0)
  tileId1 = @_readMapData(mx, my, 1)
  tileId2 = @_readMapData(mx, my, 2)
  tileId3 = @_readMapData(mx, my, 3)
  shadowBits = @_readMapData(mx, my, 4)
  upperTileId1 = @_readMapData(mx, my - 1, 1)
  lowerTiles = []
  upperTiles = []
  if @_isHigherTile(tileId0)
    upperTiles.push tileId0
  else
    lowerTiles.push tileId0
  if @_isHigherTile(tileId1)
    upperTiles.push tileId1
  else
    lowerTiles.push tileId1
  lowerTiles.push -shadowBits
  if @_isTableTile(upperTileId1) and !@_isTableTile(tileId1)
    if !Tilemap.isShadowingTile(tileId0)
      lowerTiles.push tableEdgeVirtualId + upperTileId1
  if @_isOverpassPosition(mx, my)
    upperTiles.push tileId2
    upperTiles.push tileId3
  else
    if @_isHigherTile(tileId2)
      upperTiles.push tileId2
    else
      lowerTiles.push tileId2
    if @_isHigherTile(tileId3)
      upperTiles.push tileId3
    else
      lowerTiles.push tileId3
  count = 1000 + @animationCount - my
  frameUpdated = count % 30 == 0
  @_animationFrame = Math.floor(count / 30)
  lastLowerTiles = @_readLastTiles(0, lx, ly)
  if !lowerTiles.equals(lastLowerTiles) or Tilemap.isTileA1(tileId0) and frameUpdated
    @_lowerBitmap.clearRect dx, dy, @_tileWidth, @_tileHeight
    i = 0
    while i < lowerTiles.length
      lowerTileId = lowerTiles[i]
      if lowerTileId < 0
        @_drawShadow @_lowerBitmap, shadowBits, dx, dy
      else if lowerTileId >= tableEdgeVirtualId
        @_drawTableEdge @_lowerBitmap, upperTileId1, dx, dy
      else
        @_drawTile @_lowerBitmap, lowerTileId, dx, dy
      i++
    @_writeLastTiles 0, lx, ly, lowerTiles
  lastUpperTiles = @_readLastTiles(1, lx, ly)
  if !upperTiles.equals(lastUpperTiles)
    @_upperBitmap.clearRect dx, dy, @_tileWidth, @_tileHeight
    j = 0
    while j < upperTiles.length
      @_drawTile @_upperBitmap, upperTiles[j], dx, dy
      j++
    @_writeLastTiles 1, lx, ly, upperTiles
  return

###*
# @method _readLastTiles
# @param {Number} i
# @param {Number} x
# @param {Number} y
# @private
###

Tilemap::_readLastTiles = (i, x, y) ->
  array1 = @_lastTiles[i]
  if array1
    array2 = array1[y]
    if array2
      tiles = array2[x]
      if tiles
        return tiles
  []

###*
# @method _writeLastTiles
# @param {Number} i
# @param {Number} x
# @param {Number} y
# @param {Array} tiles
# @private
###

Tilemap::_writeLastTiles = (i, x, y, tiles) ->
  array1 = @_lastTiles[i]
  if !array1
    array1 = @_lastTiles[i] = []
  array2 = array1[y]
  if !array2
    array2 = array1[y] = []
  array2[x] = tiles
  return

###*
# @method _drawTile
# @param {Bitmap} bitmap
# @param {Number} tileId
# @param {Number} dx
# @param {Number} dy
# @private
###

Tilemap::_drawTile = (bitmap, tileId, dx, dy) ->
  if Tilemap.isVisibleTile(tileId)
    if Tilemap.isAutotile(tileId)
      @_drawAutotile bitmap, tileId, dx, dy
    else
      @_drawNormalTile bitmap, tileId, dx, dy
  return

###*
# @method _drawNormalTile
# @param {Bitmap} bitmap
# @param {Number} tileId
# @param {Number} dx
# @param {Number} dy
# @private
###

Tilemap::_drawNormalTile = (bitmap, tileId, dx, dy) ->
  setNumber = 0
  if Tilemap.isTileA5(tileId)
    setNumber = 4
  else
    setNumber = 5 + Math.floor(tileId / 256)
  w = @_tileWidth
  h = @_tileHeight
  sx = (Math.floor(tileId / 128) % 2 * 8 + tileId % 8) * w
  sy = Math.floor(tileId % 256 / 8) % 16 * h
  source = @bitmaps[setNumber]
  if source
    bitmap.blt source, sx, sy, w, h, dx, dy, w, h
  return

###*
# @method _drawAutotile
# @param {Bitmap} bitmap
# @param {Number} tileId
# @param {Number} dx
# @param {Number} dy
# @private
###

Tilemap::_drawAutotile = (bitmap, tileId, dx, dy) ->
  autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE
  kind = Tilemap.getAutotileKind(tileId)
  shape = Tilemap.getAutotileShape(tileId)
  tx = kind % 8
  ty = Math.floor(kind / 8)
  bx = 0
  _by = 0
  setNumber = 0
  isTable = false
  if Tilemap.isTileA1(tileId)
    waterSurfaceIndex = [
      0
      1
      2
      1
    ][@_animationFrame % 4]
    setNumber = 0
    if kind == 0
      bx = waterSurfaceIndex * 2
      _by = 0
    else if kind == 1
      bx = waterSurfaceIndex * 2
      _by = 3
    else if kind == 2
      bx = 6
      _by = 0
    else if kind == 3
      bx = 6
      _by = 3
    else
      bx = Math.floor(tx / 4) * 8
      _by = ty * 6 + Math.floor(tx / 2) % 2 * 3
      if kind % 2 == 0
        bx += waterSurfaceIndex * 2
      else
        bx += 6
        autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE
        _by += @_animationFrame % 3
  else if Tilemap.isTileA2(tileId)
    setNumber = 1
    bx = tx * 2
    _by = (ty - 2) * 3
    isTable = @_isTableTile(tileId)
  else if Tilemap.isTileA3(tileId)
    setNumber = 2
    bx = tx * 2
    _by = (ty - 6) * 2
    autotileTable = Tilemap.WALL_AUTOTILE_TABLE
  else if Tilemap.isTileA4(tileId)
    setNumber = 3
    bx = tx * 2
    _by = Math.floor((ty - 10) * 2.5 + (if ty % 2 == 1 then 0.5 else 0))
    if ty % 2 == 1
      autotileTable = Tilemap.WALL_AUTOTILE_TABLE
  table = autotileTable[shape]
  source = @bitmaps[setNumber]
  if table and source
    w1 = @_tileWidth / 2
    h1 = @_tileHeight / 2
    i = 0
    while i < 4
      qsx = table[i][0]
      qsy = table[i][1]
      sx1 = (bx * 2 + qsx) * w1
      sy1 = (_by * 2 + qsy) * h1
      dx1 = dx + i % 2 * w1
      dy1 = dy + Math.floor(i / 2) * h1
      if isTable and (qsy == 1 or qsy == 5)
        qsx2 = qsx
        qsy2 = 3
        if qsy == 1
          qsx2 = [
            0
            3
            2
            1
          ][qsx]
        sx2 = (bx * 2 + qsx2) * w1
        sy2 = (_by * 2 + qsy2) * h1
        bitmap.blt source, sx2, sy2, w1, h1, dx1, dy1, w1, h1
        dy1 += h1 / 2
        bitmap.blt source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2
      else
        bitmap.blt source, sx1, sy1, w1, h1, dx1, dy1, w1, h1
      i++
  return

###*
# @method _drawTableEdge
# @param {Bitmap} bitmap
# @param {Number} tileId
# @param {Number} dx
# @param {Number} dy
# @private
###

Tilemap::_drawTableEdge = (bitmap, tileId, dx, dy) ->
  if Tilemap.isTileA2(tileId)
    autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE
    kind = Tilemap.getAutotileKind(tileId)
    shape = Tilemap.getAutotileShape(tileId)
    tx = kind % 8
    ty = Math.floor(kind / 8)
    setNumber = 1
    bx = tx * 2
    _by = (ty - 2) * 3
    table = autotileTable[shape]
    if table
      source = @bitmaps[setNumber]
      w1 = @_tileWidth / 2
      h1 = @_tileHeight / 2
      i = 0
      while i < 2
        qsx = table[2 + i][0]
        qsy = table[2 + i][1]
        sx1 = (bx * 2 + qsx) * w1
        sy1 = (_by * 2 + qsy) * h1 + h1 / 2
        dx1 = dx + i % 2 * w1
        dy1 = dy + Math.floor(i / 2) * h1
        bitmap.blt source, sx1, sy1, w1, h1 / 2, dx1, dy1, w1, h1 / 2
        i++
  return

###*
# @method _drawShadow
# @param {Bitmap} bitmap
# @param {Number} shadowBits
# @param {Number} dx
# @param {Number} dy
# @private
###

Tilemap::_drawShadow = (bitmap, shadowBits, dx, dy) ->
  if shadowBits & 0x0f
    w1 = @_tileWidth / 2
    h1 = @_tileHeight / 2
    color = 'rgba(0,0,0,0.5)'
    i = 0
    while i < 4
      if shadowBits & 1 << i
        dx1 = dx + i % 2 * w1
        dy1 = dy + Math.floor(i / 2) * h1
        bitmap.fillRect dx1, dy1, w1, h1, color
      i++
  return

###*
# @method _readMapData
# @param {Number} x
# @param {Number} y
# @param {Number} z
# @return {Number}
# @private
###

Tilemap::_readMapData = (x, y, z) ->
  if @_mapData
    width = @_mapWidth
    height = @_mapHeight
    if @horizontalWrap
      x = x.mod(width)
    if @verticalWrap
      y = y.mod(height)
    if x >= 0 and x < width and y >= 0 and y < height
      @_mapData[(z * height + y) * width + x] or 0
    else
      0
  else
    0

###*
# @method _isHigherTile
# @param {Number} tileId
# @return {Boolean}
# @private
###

Tilemap::_isHigherTile = (tileId) ->
  @flags[tileId] & 0x10

###*
# @method _isTableTile
# @param {Number} tileId
# @return {Boolean}
# @private
###

Tilemap::_isTableTile = (tileId) ->
  Tilemap.isTileA2(tileId) and @flags[tileId] & 0x80

###*
# @method _isOverpassPosition
# @param {Number} mx
# @param {Number} my
# @return {Boolean}
# @private
###

Tilemap::_isOverpassPosition = (mx, my) ->
  false

###*
# @method _sortChildren
# @private
###

Tilemap::_sortChildren = ->
  @children.sort @_compareChildOrder.bind(this)
  return

###*
# @method _compareChildOrder
# @param {Object} a
# @param {Object} b
# @private
###

Tilemap::_compareChildOrder = (a, b) ->
  if a.z != b.z
    a.z - (b.z)
  else if a.y != b.y
    a.y - (b.y)
  else
    a.spriteId - (b.spriteId)

# Tile type checkers
Tilemap.TILE_ID_B = 0
Tilemap.TILE_ID_C = 256
Tilemap.TILE_ID_D = 512
Tilemap.TILE_ID_E = 768
Tilemap.TILE_ID_A5 = 1536
Tilemap.TILE_ID_A1 = 2048
Tilemap.TILE_ID_A2 = 2816
Tilemap.TILE_ID_A3 = 4352
Tilemap.TILE_ID_A4 = 5888
Tilemap.TILE_ID_MAX = 8192

Tilemap.isVisibleTile = (tileId) ->
  tileId > 0 and tileId < @TILE_ID_MAX

Tilemap.isAutotile = (tileId) ->
  tileId >= @TILE_ID_A1

Tilemap.getAutotileKind = (tileId) ->
  Math.floor (tileId - (@TILE_ID_A1)) / 48

Tilemap.getAutotileShape = (tileId) ->
  (tileId - (@TILE_ID_A1)) % 48

Tilemap.makeAutotileId = (kind, shape) ->
  @TILE_ID_A1 + kind * 48 + shape

Tilemap.isSameKindTile = (tileID1, tileID2) ->
  if @isAutotile(tileID1) and @isAutotile(tileID2)
    @getAutotileKind(tileID1) == @getAutotileKind(tileID2)
  else
    tileID1 == tileID2

Tilemap.isTileA1 = (tileId) ->
  tileId >= @TILE_ID_A1 and tileId < @TILE_ID_A2

Tilemap.isTileA2 = (tileId) ->
  tileId >= @TILE_ID_A2 and tileId < @TILE_ID_A3

Tilemap.isTileA3 = (tileId) ->
  tileId >= @TILE_ID_A3 and tileId < @TILE_ID_A4

Tilemap.isTileA4 = (tileId) ->
  tileId >= @TILE_ID_A4 and tileId < @TILE_ID_MAX

Tilemap.isTileA5 = (tileId) ->
  tileId >= @TILE_ID_A5 and tileId < @TILE_ID_A1

Tilemap.isWaterTile = (tileId) ->
  if @isTileA1(tileId)
    !(tileId >= @TILE_ID_A1 + 96 and tileId < @TILE_ID_A1 + 192)
  else
    false

Tilemap.isWaterfallTile = (tileId) ->
  if tileId >= @TILE_ID_A1 + 192 and tileId < @TILE_ID_A2
    @getAutotileKind(tileId) % 2 == 1
  else
    false

Tilemap.isGroundTile = (tileId) ->
  @isTileA1(tileId) or @isTileA2(tileId) or @isTileA5(tileId)

Tilemap.isShadowingTile = (tileId) ->
  @isTileA3(tileId) or @isTileA4(tileId)

Tilemap.isRoofTile = (tileId) ->
  @isTileA3(tileId) and @getAutotileKind(tileId) % 16 < 8

Tilemap.isWallTopTile = (tileId) ->
  @isTileA4(tileId) and @getAutotileKind(tileId) % 16 < 8

Tilemap.isWallSideTile = (tileId) ->
  (@isTileA3(tileId) or @isTileA4(tileId)) and getAutotileKind(tileId) % 16 >= 8

Tilemap.isWallTile = (tileId) ->
  @isWallTopTile(tileId) or @isWallSideTile(tileId)

Tilemap.isFloorTypeAutotile = (tileId) ->
  @isTileA1(tileId) and !@isWaterfallTile(tileId) or @isTileA2(tileId) or @isWallTopTile(tileId)

Tilemap.isWallTypeAutotile = (tileId) ->
  @isRoofTile(tileId) or @isWallSideTile(tileId)

Tilemap.isWaterfallTypeAutotile = (tileId) ->
  @isWaterfallTile tileId

# Autotile shape number to coordinates of tileset images
Tilemap.FLOOR_AUTOTILE_TABLE = [
  [
    [
      2
      4
    ]
    [
      1
      4
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      4
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      0
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      1
      4
    ]
    [
      2
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      4
    ]
    [
      2
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      0
    ]
    [
      2
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      4
    ]
    [
      1
      4
    ]
    [
      2
      1
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      4
    ]
    [
      2
      1
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      0
    ]
    [
      2
      1
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      1
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      1
      4
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      4
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      0
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      0
      4
    ]
    [
      1
      4
    ]
    [
      0
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      0
      4
    ]
    [
      3
      0
    ]
    [
      0
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      0
      4
    ]
    [
      1
      4
    ]
    [
      0
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      0
      4
    ]
    [
      3
      0
    ]
    [
      0
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      1
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      4
    ]
    [
      2
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      4
    ]
    [
      2
      1
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      4
    ]
    [
      2
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      4
    ]
    [
      2
      1
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      1
      4
    ]
    [
      2
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      4
    ]
    [
      2
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      0
    ]
    [
      2
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      0
      4
    ]
    [
      3
      4
    ]
    [
      0
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      0
      2
    ]
    [
      1
      2
    ]
    [
      0
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      0
      2
    ]
    [
      1
      2
    ]
    [
      0
      3
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      2
    ]
    [
      3
      2
    ]
    [
      2
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      2
    ]
    [
      3
      2
    ]
    [
      2
      1
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      4
    ]
    [
      3
      4
    ]
    [
      2
      5
    ]
    [
      3
      5
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      4
    ]
    [
      2
      5
    ]
    [
      3
      5
    ]
  ]
  [
    [
      0
      4
    ]
    [
      1
      4
    ]
    [
      0
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      0
      4
    ]
    [
      3
      0
    ]
    [
      0
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      0
      2
    ]
    [
      3
      2
    ]
    [
      0
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      0
      2
    ]
    [
      1
      2
    ]
    [
      0
      5
    ]
    [
      1
      5
    ]
  ]
  [
    [
      0
      4
    ]
    [
      3
      4
    ]
    [
      0
      5
    ]
    [
      3
      5
    ]
  ]
  [
    [
      2
      2
    ]
    [
      3
      2
    ]
    [
      2
      5
    ]
    [
      3
      5
    ]
  ]
  [
    [
      0
      2
    ]
    [
      3
      2
    ]
    [
      0
      5
    ]
    [
      3
      5
    ]
  ]
  [
    [
      0
      0
    ]
    [
      1
      0
    ]
    [
      0
      1
    ]
    [
      1
      1
    ]
  ]
]
Tilemap.WALL_AUTOTILE_TABLE = [
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      1
    ]
    [
      1
      1
    ]
  ]
  [
    [
      0
      2
    ]
    [
      1
      2
    ]
    [
      0
      1
    ]
    [
      1
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      0
    ]
    [
      2
      1
    ]
    [
      1
      1
    ]
  ]
  [
    [
      0
      0
    ]
    [
      1
      0
    ]
    [
      0
      1
    ]
    [
      1
      1
    ]
  ]
  [
    [
      2
      2
    ]
    [
      3
      2
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      0
      2
    ]
    [
      3
      2
    ]
    [
      0
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      0
      0
    ]
    [
      3
      0
    ]
    [
      0
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      2
      2
    ]
    [
      1
      2
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      0
      2
    ]
    [
      1
      2
    ]
    [
      0
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      1
      0
    ]
    [
      2
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      0
      0
    ]
    [
      1
      0
    ]
    [
      0
      3
    ]
    [
      1
      3
    ]
  ]
  [
    [
      2
      2
    ]
    [
      3
      2
    ]
    [
      2
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      0
      2
    ]
    [
      3
      2
    ]
    [
      0
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      3
    ]
    [
      3
      3
    ]
  ]
  [
    [
      0
      0
    ]
    [
      3
      0
    ]
    [
      0
      3
    ]
    [
      3
      3
    ]
  ]
]
Tilemap.WATERFALL_AUTOTILE_TABLE = [
  [
    [
      2
      0
    ]
    [
      1
      0
    ]
    [
      2
      1
    ]
    [
      1
      1
    ]
  ]
  [
    [
      0
      0
    ]
    [
      1
      0
    ]
    [
      0
      1
    ]
    [
      1
      1
    ]
  ]
  [
    [
      2
      0
    ]
    [
      3
      0
    ]
    [
      2
      1
    ]
    [
      3
      1
    ]
  ]
  [
    [
      0
      0
    ]
    [
      3
      0
    ]
    [
      0
      1
    ]
    [
      3
      1
    ]
  ]
]
# The important members from Pixi.js

###*
# [read-only] The array of children of the tilemap.
#
# @property children
# @type Array
###

###*
# [read-only] The object that contains the tilemap.
#
# @property parent
# @type Object
###

###*
# Adds a child to the container.
#
# @method addChild
# @param {Object} child The child to add
# @return {Object} The child that was added
###

###*
# Adds a child to the container at a specified index.
#
# @method addChildAt
# @param {Object} child The child to add
# @param {Number} index The index to place the child in
# @return {Object} The child that was added
###

###*
# Removes a child from the container.
#
# @method removeChild
# @param {Object} child The child to remove
# @return {Object} The child that was removed
###

###*
# Removes a child from the specified index position.
#
# @method removeChildAt
# @param {Number} index The index to get the child from
# @return {Object} The child that was removed
###
