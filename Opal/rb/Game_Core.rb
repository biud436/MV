#================================================
# ** RGSS3 (RPG Maker MV)
#================================================
# Name       : RGSS3 (Opal)
# Author     : biud436
# Version    : 0.1
#================================================
# ** Change Log
#================================================
# 2015.12.16 - First Release
#================================================
# ** Reference Link
#================================================
# https://github.com/CaptainJet/RM-Gosu

require 'native'

#================================================
# ** Audio
# This class is executed the AudioManager of JGSS.
#================================================
module Audio

  # This statement gets a console object of JGSS.
  $console = Native(`console`)

  module_function

  def setup_midi
    $console.warn("This platform does not support the MIDI")
  end

  def bgm_play(filename, volume, pitch, pos)
    %x{
    (function() {
      var data = {
          name: #{filename},
          volume: #{volume},
          pitch: #{pitch},
          pan: 0,
          pos: #{pos}
      };
      AudioManager.playBgm(data, #{pos});
    })();
    }
  end
  def bgm_stop
    `AudioManager.stopBgm();`
  end
  def bgm_fade(time)
    `AudioManager.fadeOutBgm(#{time});`
  end
  def bgm_pos
    result = `AudioManager._bgmBuffer.seek()`
  end

  def bgs_play(filename, volume, pitch, pos)
    %x{
    (function() {
      var data = {
          name: #{filename},
          volume: #{volume},
          pitch: #{pitch},
          pan: 0,
          pos: #{pos}
      };
      AudioManager.playBgs(data, #{pos});
    })();
    }
  end
  def bgs_stop
    `AudioManager.stopBgs();`
  end
  def bgs_fade(time)
    `AudioManager.fadeOutBgs(#{time});`
  end
  def bgs_pos
    result = `AudioManager._bgsBuffer.seek()`
  end

  def me_play(filename, volume, pitch, pos)
    %x{
    (function() {
      var data = {
          name: #{filename},
          volume: #{volume},
          pitch: #{pitch},
          pan: 0,
          pos: #{pos}
      };
      AudioManager.playMe(data, #{pos});
    })();
    }
  end
  def me_stop
    `AudioManager.stopMe();`
  end

  def se_play(filename, volume, pitch, pos)
    %x{
    (function() {
      var data = {
          name: #{filename},
          volume: #{volume},
          pitch: #{pitch},
          pan: 0,
          pos: #{pos}
      };
      AudioManager.playSe(data, #{pos});
    })();
    }
  end
  def se_stop
    `AudioManager.stopSe();`
  end

end

#================================================
# ** Graphics
#================================================
module Graphics

  module_function

  # def init
  #   @@viewport = @@viewport || Viewport.new
  # end

  def main_scene
    @@scene = Native(`SceneManager._scene`)
  end

  def current_scene
    Graphics.main_scene
    @@scene
  end

  def add_sprite(sprite)
    current_scene.addChild(sprite)
  end

  def remove_sprite(sprite)
    current_scene.removeChild(sprite)
  end

  def wait(duration)
    duration.times do
      Graphics.update
    end
  end

  def update
  end

  def fadeout(duration)
  end

  def fadein(duration)
  end

  def freeze
  end

  def transition(duration, filename, vague)
  end

  def snap_to_bitmap
    bitmap = Native(`Bitmap.snap(#{Graphics.current_scene})`)
  end

  def frame_reset
    `Graphics.frameCount = 0;`
  end

  def width
    result = `Graphics.boxWidth;`
  end

  def height
    result = `Graphics.boxHeight;`
  end

  def resize_screen(width, height)
  end

  def play_movie(filename)
    src = "moive/" + filename + ".webm"
    `Graphics.playVideo(#{src})`
  end

end

#================================================
# ** Color
#================================================
class Color

  def initialize(*args)
    case args.size
    when 0
      set(0, 0, 0, 0)
    when 3
      args << 255
      set(*args)
    when 4
      set(*args)
    else
      raise ArgumentError
    end
  end

  def set(*args)
    case args.size
    when 1
      if args[0].is_a?(Color)
        re = args[0]
        set(*args[0].to_a)
      else
        raise ArgumentError
      end
    when 3
      args << 255
      set(*args)
    when 4
      self.red = args[0]
      self.green = args[1]
      self.blue = args[2]
      self.alpha = args[3]
    else
      raise ArgumentError
    end
  end

  def empty
    set(0, 0, 0, 0)
  end

  def red
    @red.round
  end

  def green
    @green.round
  end

  def blue
    @blue.round
  end

  def alpha
    @alpha.round
  end

  def red=(int)
    @red = [[255, int].min, 0].max.to_f
  end

  def green=(int)
    @green = [[255, int].min, 0].max.to_f
  end

  def blue=(int)
    @blue = [[255, int].min, 0].max.to_f
  end

  def alpha=(int)
    @alpha = [[255, int].min, 0].max.to_f
  end

  def to_a
    [red.round, green.round, blue.round, alpha.round]
  end

  def to_css(r=red, g=green, b=blue, a=alpha)
    r = red
    g = green
    b = blue
    a = (alpha / 255)
    sprintf("rgba(%d,%d,%d,%f)",r,g,b,a)
  end

  def self.int_to_rgb(rgb)
    [rgb, rgb>>8, rgb>>16].map {|i| i & 0xFF }
  end

  def self.hex_to_rgb(hex)
    return unless hex.is_a?(String)
    hex = hex.delete('#').to_i(16)
    return Color.new *int_to_rgb(hex).reverse, 255
  end

end

#================================================
# ** Rect
#================================================
class Rect

  def initialize(x=0, y=0, width=0, height=0)
    @x = x
    @y = y
    @width = width
    @height = height
    @js = `new Rectangle(#{@x}, #{@y}, #{@width}, #{@height})`
    @rect = Native(@js)
  end

  def empty
    self.x = self.y = self.width = self.height = 0
  end

  def set(*args)
    case args.size
    when 1, 4
      if args[0].is_a?(Rect)
        @x, @y, @width, @height = args[0].to_a
      else
        @x, @y, @width, @height = *args
      end
    else
      raise ArgumentError
    end
    match
  end

  def to_a
    [@x, @y, @width, @height]
  end

  def x=(n)
    @rect.x = @x = n
    match
  end

  def x
    @rect.x
  end

  def y=(n)
    @rect.y = @y = n
    match
  end

  def y
    @rect.y
  end

  def width=(n)
    @rect.width = @width = n
    match
  end

  def width
    @rect.width
  end

  def height=(n)
    @rect.height = @height = n
    match
  end

  def height
    @rect.height
  end

  private

  def match
    @rect.x, @rect.y, @rect.width, @rect.height = *(self.to_a)
  end

end

#================================================
# ** Font
#================================================
class Font
  class << self

    attr_accessor :default_name, :default_size, :default_bold
    attr_accessor :default_italic, :default_shadow, :default_outline
    attr_accessor :default_color, :default_out_color

    def exist?(name)
      return `Graphics.isFontLoaded(#{name})`
    end

  end

  attr_accessor :name, :size, :bold, :italic, :shadow
  attr_accessor :outline, :color, :out_color

  self.default_name = ["Verdana", "Arial", "Courier New"]
  self.default_size = 24
  self.default_bold = false
  self.default_italic = false
  self.default_shadow = false
  self.default_outline = true
  self.default_color = Color.new(255, 255, 255, 255)
  self.default_out_color = Color.new(0, 0, 0, 128)

  def initialize(name = 'GameFont', size = 28)
    `Graphics.loadFont(#{name}, '#{name.ttf}')`
    @js = `new Bitmap(#{width}, #{height})`
    @bitmap = Native(@js)
    @bitmap.fontSize = size;
  end

  def size
    @bitmap.fontSize
  end

  # NOTE: fontBold
  def bold
    raise 'bold is not supported'
  end

  def italic
    @bitmap.fontItalic
  end

  def outline
    @bitmap.outlineWidth > 0
  end

  def out_color
    Color.hex_to_rgb(@bitmap.outlineColor)
  end

  def shadow
    return false;
  end

  def color
    Color.hex_to_rgb(@bitmap.textColor)
  end

end

#================================================
# ** Sprite
#================================================
class Sprite

  attr_reader :opacity, :bush_opacity
  attr_accessor :x, :y, :z, :ox, :oy, :zoom_x, :zoom_y
  attr_accessor :src_rect, :bitmap, :viewport, :visible
  attr_accessor :wave_amp, :wave_length, :wave_speed, :wave_phase
  attr_accessor :angle, :mirror, :color, :tone, :blend_type
  attr_accessor :bush_depth

  def initialize(viewport = nil)
    @viewport = viewport
    @visible = true
    @x, @y, @z, @ox, @oy = 0, 0, 0, 0, 0
    @zoom_x, @zoom_y = 1.0, 1.0
    @angle = 0
    @mirror = false
    @bush_depth = 0
    @bush_opacity = 128
    @opacity = 255
    @blend_type = 0
    @wave_speed = 360
    @src_rect = Rect.new(0, 0, 0, 0)
    @js = `new Sprite()`
    @this = Native(@js)
    @this.update = %x{ function() {
      this.children.forEach(function(child) {
          if (child.update) {
              child.update();
          }
      });
        #{self.update }
      }
    }
    Graphics.add_sprite(@this)
  end

  def initialize_copy
    f = super
    Graphics.add_sprite(f)
    f
  end

  def dispose
    @disposed = true
    Graphics.remove_sprite(@this)
  end

  def disposed?
    @disposed
  end

  def flash(color, duration)
  end

  def update

  end

  def width
    @src_rect.width
  end

  def height
    @src_rect.height
  end

  def bush_opacity=(n)
    @bush_opacity = [[n, 255].min, 0].max
  end

  def x
    @this.x
  end

  def x=(n)
    @this.x = @x = n
  end

  def y
    @this.y
  end

  def y=(n)
    @this.y = @y = n
  end

  def ox
    @ox
  end

  def ox=(n)
    @this._offset.x = @ox = n
  end

  def oy=(n)
    @this._offset.y = @oy = n
  end

  def z
    @z
  end

  def z=(n)
    @z = n
  end

  def zoom_x=(n)
    @this.scale.x = @zoom_x = [[n, 10].min, 0].max
    @this._refresh
  end

  def zoom_x
    @zoom_x
  end

  def zoom_y=(n)
    @this.scale.y = @zoom_y = [[n, 10].min, 0].max
    @this._refresh
  end

  def zoom_y
    @zoom_y
  end

  def opacity=(n)
    @this.opacity = @opacity = [[n, 255].min, 0].max
  end

  def opacity
    @this.opacity
  end

  def visible=(bool)
    @this.visible = @visible = bool
  end

  def visible
    @this.visible
  end

  def mirror=(bool)
    if @mirror
      @this.scale.x = (@zoom_x.abs) * -1;
    else
      @this.scale.x = (@zoom_x.abs)
    end
    @mirror = !@mirror
  end

  def mirror
    @mirror
  end

  def angle=(n)
    @angle = [[n, 360].min, 0].max
    result = (Math::PI / 180) * @angle
    @this.rotation = result;
  end

  def angle
    @angle
  end

  def color=(n)
    @this.setBlendColor(n)
  end

  def color
    @this.getBlendColor
  end

  def tone
    @this.getColorTone
  end

  def tone=(n)
    @this.setColorTone(n)
  end

  def blend_type
    @blend_type
  end

  # NOTE: BLEND_NORMAL / BLEND_ADD / BLEND_MULTIPLY / BLEND_SCREEN
  # Not supported {2: subtraction}
  def blend_type=(n)
    if n.between?(0, 1)
      @this.blendMode = n
    end
  end

  def bitmap=(bitmap)
    begin
      if bitmap.native?
        @bitmap = bitmap
        @this.bitmap = `#{@bitmap}.js`
      end
    rescue
      @bitmap = Native(bitmap)
      @this.bitmap = `#{@bitmap}`
    end
    @src_rect = Rect.new(0, 0, @bitmap.width, @bitmap.height)
  end

end

#================================================
# ** Bitmap
#================================================
class Bitmap

  attr_accessor :font

  def initialize(*args)
    if args.size > 1
      width, height = args
      @js = `new Bitmap(#{width}, #{height})`
      @bitmap = Native(@js)
    else
      @bitmap = Native(args[0])
    end

    @rect = Rect.new(0, 0, @bitmap.width, @bitmap.height)
    # @font = Font.new
  end

  def dispose
    @disposed = true
  end

  def disposed?
    @disposed
  end

  def width
    @bitmap.width
  end

  def height
    @bitmap.height
  end

  def rect
    @rect
  end

  def blt(x, y, src_bitmap, src_rect, opacity = 255)
    source = src_bitmap
    sx = x
    sy = y
    sw = src_rect.width
    sh = src_rect.height
    dx = src_bitmap.x
    dy = src_bitmap.y
    dw = src_bitmap.width
    dh = src_bitmap.height
    @bitmap.blt(source, sx, sy, sw, sh, dx, dy, dw, dh)
  end

  def stretch_blt(dest_rect, src_bitmap, src_rect, opacity = 255)
    raise "stretch_blt not supported"
  end

  def fill_rect(*args)
    case args.size
    when 2, 5
      if args[0].is_a?(Rect)
        x, y, width, height = args[0].to_a
        color = args[1]
      else
        x, y, width, height = *args[0..3]
        color = args[4]
      end
    else
      raise ArgumentError
    end
    @bitmap.fillRect(x, y, width, height, color.to_css)
  end

  def gradient_fill_rect(*args)
    case args.size
    when 4, 7
      if args[0].is_a?(Rect)
        x, y, width, height = args[0].to_a
        color1 = args[1]
        color2 = args[2]
        vertical = args[3];
      else
        x, y, width, height = *args[0..3]
        color1 = args[4]
        color2 = args[5]
        vertical = args[6];
      end
    when 3, 6
      if args[0].is_a?(Rect)
        x, y, width, height = args[0].to_a
        color1 = args[1]
        color2 = args[2]
        vertical = true;
      else
        x, y, width, height = *args[0..3]
        color1 = args[4]
        color2 = args[5]
        vertical = true;
      end
    else
      raise ArgumentError
    end

    @bitmap.gradientFillRect(x, y, width, height, color1.to_css, color2.to_css, vertical)
  end

  def clear
    @bitmap.clear
  end

  def clear_rect(*args)
    case args.size
    when 1, 4
      if args[0].is_a?(Rect)
        x, y, width, height = args[0].to_a
      else
        x, y, width, height = args[0]
      end
    else
      raise ArgumentError
    end
  end

  def get_pixel(x, y)
    @bitmap.getPixel(x, y)
  end

  def set_pixel(x, y, color)
    fill_rect(x, y, 1, 1, color)
  end

  def hue_change(hue)
    raise "hue_change not supported"
  end

  def blur
    @bitmap.blur
  end

  def radial_blur(angle, division)
    @bitmap.rotateHue(angle)
  end

  def draw_text(*args)
    case args.size
    when 2, 3
      x, y, width, height = *args[0].to_a
      text = args[1]
      align = args[2]
    when 5, 6
      x, y, width, height = *args[0, 4]
      text = args[4]
      align = args[5]
    else
      raise ArgumentError
    end
    align_mark = case align
    when 1
      "center"
    when 2
      "right"
    else
      "left"
    end
    @bitmap.drawText(text, x, y, width, height, align_mark)
  end

  def font
    @font
  end

  def text_size(str)
    context = @bitmap._context;
    context.save
    context.font = @bitmap._makeFontNameText
    return context.measureText(str)
  end

end

#================================================
# ** Window
#================================================
class Window

  attr_accessor :windowskin, :contents, :cursor_rect
  attr_accessor :viewport, :active, :visible
  attr_accessor :arrows_visible, :pause
  attr_accessor :x, :y, :width, :height, :z
  attr_accessor :ox, :oy, :padding
  attr_accessor :padding_bottom, :opacity, :back_opacity
  attr_accessor :contents_opacity, :openness, :tone

  def initialize(x, y, width, height)
    @js = `new Window_Base(#{x}, #{y}, #{width}, #{height})`
    @this = Native(@js)
    Graphics.add_sprite(@this)
  end

  def width=(n)
    @this.width = @width = [[n, Graphics.width].min, 0].max
  end

  def height=(n)
    @this.height = @height = [[n, Graphics.height].min, 0].max
  end

  def contents
    @this.contents
  end

  def x
    @this.x
  end

  def x=(n)
    @this.x = @x = n
  end

  def y
    @this.y
  end

  def y=(n)
    @this.y = @y = n
  end

  def ox
    @ox
  end

  def ox=(n)
    @this._offset.x = @ox = n
  end

  def oy=(n)
    @this._offset.y = @oy = n
  end

  def z
    @z
  end

  def z=(n)
    @z = n
  end

  def opacity=(n)
    @this.opacity = @opacity = [[n, 255].min, 0].max
  end

  def opacity
    @this.opacity
  end

  def visible=(bool)
    @this.visible = @visible = bool
  end

  def visible
    @this.visible
  end

  def dispose
    @disposed = true
    Graphics.remove_sprite(@this)
  end

  def openness=(n)
    @this.openness = @openness = [[n, 255].min, 0].max
  end

  def openness
    @this.openness
  end

  def contents_opacity
    @this.contentsOpacity
  end

  def contents_opacity=(n)
    @this.contentsOpacity = @contents_opacity = [[n, 255].min, 0].max
  end

  def back_opacity
    @this.backOpacity
  end

  def back_opacity=(n)
    @this.backOpacity = @back_opacity = [[n, 255].min, 0].max
  end

  def padding
    @this.padding
  end

  def padding_bottom
    @this.margin
  end

  def padding_bottom=(n)
    @this.margin = @padding_bottom = n
  end

  def disposed?
    @disposed
  end

  def update
  end

  def move(x, y, width, height)
    @this.move(x, y, width, height)
  end

  def open?
    @this.isOpen
  end

  def close?
    @this.isClosed
  end

  def windowskin
    @this.windowskin
  end
end

#================================================
# ** Object
#================================================
class Object

  def rgss_main(&block)
    block.call
  end

  def rgss_stop
    loop { Graphics.update }
  end

  # This method does not supported in Opal.
  def load_data(filename)
  end

  # This method does not supported in Opal.
  def save_data(obj, filename)
  end

  def msgbox(*args)
    w = Native(`window`)
    w.alert(args.join(' '))
  end

  def msgbox_p(*args)
    w = Native(`window`)
    args.each do |i|
      w.alert(i)
    end
  end

end

#================================================
# ** RGSSError
#================================================
class RGSSError < StandardError
end

#================================================
# ** RGSSReset
#================================================
class RGSSReset < Exception
end

#================================================
# ** Game_Temp
#================================================
class Game_Temp
  def initialize
    @this = Native(`new Game_Temp()`)
  end
end

#================================================
# ** Cache
#================================================
module Cache
  def self.animation(filename, hue)
    `ImageManager.loadAnimation(#{filename}, #{hue})`
  end
  def self.battleback1(filename)
    `ImageManager.loadBattleback1(#{filename}, 0)`
  end
  def self.battleback2(filename)
    `ImageManager.loadBattleback2(#{filename}, 0)`
  end
  def self.battler(filename, hue)
    `ImageManager.loadEnemy(#{filename}, 0)`
  end
  def self.character(filename)
    `ImageManager.loadCharacter(#{filename}, 0)`
  end
  def self.face(filename)
    `ImageManager.loadFace(#{filename}, 0)`
  end
  def self.parallax(filename)
    `ImageManager.loadParallax(#{filename}, 0)`
  end
  def self.picture(filename)
    `ImageManager.loadPicture(#{filename}, 0)`
  end
  def self.system(filename)
    `ImageManager.loadSystem(#{filename}, 0)`
  end
  def self.tileset(filename)
    `ImageManager.loadTileset(#{filename}, 0)`
  end
  def self.title1(filename)
    `ImageManager.loadTitle1(#{filename}, 0)`
  end
  def self.title2(filename)
    `ImageManager.loadTitle2(#{filename}, 0)`
  end
  def self.load_bitmap(folder_name, filename, hue = 0)
    `ImageManager.loadBitmap(#{folder_name}, #{filename}, #{hue}, true)`
  end
  def self.empty_bitmap
    `ImageManager.loadEmptyBitmap()`
  end
  def self.normal_bitmap(path, hue = 0)
    `ImageManager.loadNormalBitmap(#{path}, #{hue})`
  end
  def self.hue_changed_bitmap(path, hue)
  end
  def self.include?(key)
    `ImageManager.isReady()`
  end
  def self.clear
    `ImageManager.clear()`
  end
end
