# encoding: UTF-8

#===================================================================
# Github 
# RM-Gosu - https://github.com/CaptainJet/RM-Gosu
# LibGDX + Ruboto - http://github.com/ashes999/terrace
#===================================================================
# Reference
# LibGDX API - https://libgdx.badlogicgames.com/nightlies/docs/api/
# LibGDX Wiki - https://github.com/libgdx/libgdx/wiki
# JRuby - https://github.com/jruby/jruby/wiki/CallingJavaFromJRuby
#===================================================================

java_import com.badlogic.gdx.ApplicationAdapter
java_import com.badlogic.gdx.Gdx
java_import com.badlogic.gdx.graphics.GL20
java_import com.badlogic.gdx.graphics.Texture
java_import com.badlogic.gdx.graphics.g2d.SpriteBatch

class MainGame < ApplicationAdapter

  def create
    @batch = SpriteBatch.new
    @img = Texture.new("badlogic.jpg");
    Graphics.clear_sprites()
  end

  def render
    Gdx.gl.glClearColor(0, 0.25, 0.5, 1)
    Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT)
    @batch.begin
    @batch.draw(@img, 32, 64)
    
    Gdx.gl.glEnable(GL20.GL_BLEND)
    
    Graphics.sprites.each do |i|
      @batch.draw(i, i.x, i.y, i.ox, i.oy, i.width, i.height, i.scale_x, i.scale_y, i.rotation)
    end
    
    Gdx.gl.glDisable(GL20.GL_BLEND)        

    @batch.end
  end

  def key_down(key_code)
    Input.add_key(key_code)
  end

  def touch_down(screen_x, screen_y, pointer, button)
  end

end

module TouchInput
  @screen_x, @screen_y = 0, 0
  class << self
    attr_accessor :screen_x, :screen_y
  end
end

module RGSSAD

  @@files = []
  @@xor = 0xDEADCAFE
  @@rgss3a_xor = 0
  @@orig_xor = 0
  ENC_FILE = Dir["Game.rgss{ad, 2a, 3a}"][0] || ""
  RGSSAD_File = Struct.new('RGSSAD_File', :filename, :filename_size, :file, :file_size)

  public

  def self.decrypt
    return unless File.exists?(ENC_FILE)
    @@files.clear
    rgssad = ''
    File.open(ENC_FILE, 'rb') {|file|
      file.read(8)
      @@orig_xor = file.read(4).unpack('L*') * 9 + 3 if ENC_FILE == "Game.rgss3a"
      rgssad = file.read
    }
    rgssad = self.parse_rgssad(rgssad, true)
    offset = 0
    while rgssad[offset] != nil
      file = RGSSAD_File.new
      file.filename_size = rgssad[offset, 4].unpack('L')[0]
      offset += 4
      file.filename = rgssad[offset, file.filename_size]
      offset += file.filename_size
      file.file_size = rgssad[offset, 4].unpack('L')[0]
      offset += 4
      file.file = rgssad[offset, file.file_size]
      @@files << file
      offset += file.file_size
    end
  end

  def self.files
    @@files
  end

  def self.add_file(file_contents, filename)
    file = RGSSAD_File.new
    file.filename = filename
    file.filename_size = filename.size
    file.file = file_contents
    file.file_size = file_contents.size
    @@files.delete_if {|f| f.filename == file.filename}
    @@files << file
    @@files.sort! {|a,b| a.filename <=> b.filename}
  end

  def self.encrypt
    return if @@files.empty? && !File.exists?(ENC_FILE)
    rgssad = ''
    @@files.each do |file|
      rgssad << [file.filename_size].pack('L')
      rgssad << file.filename
      rgssad << [file.file_size].pack('L')
      rgssad << file.file
    end
    File.open(ENC_FILE, 'wb') do |file|
      file.print("RGSSAD\0\1")
      file.print(self.parse_rgssad(rgssad, false))
    end
  end

  private

  def self.next_key
    if ENC_FILE == "Game.rgss3a"
      @@rgss3a_xor = (@@rgss3a_xor * 7 + 3) & 0xFFFFFFFF
    else
      @@xor = (@@xor * 7 + 3) & 0xFFFFFFFF
    end
  end

  def self.used_xor
    ENC_FILE == "Game.rgss3a" ? @@rgss3a_xor : @@xor
  end

  def self.parse_rgssad(string, decrypt)
    @@xor = 0xDEADCAFE
    @@rgss3a_xor = @@orig_xor
    new_string = ''
    offset = 0
    remember_offsets = []
    remember_keys = []
    remember_size = []
    while string[offset] != nil
      namesize = string[offset, 4].unpack('L')[0]
      new_string << [namesize ^ used_xor].pack('L')
      namesize ^= used_xor if decrypt
      offset += 4
      self.next_key
      filename = string[offset, namesize]
      namesize.times do |i|
        filename.setbyte(i, filename.getbyte(i) ^ used_xor & 0xFF)
        self.next_key
      end
      new_string << filename
      offset += namesize
      datasize = string[offset, 4].unpack('L')[0]
      new_string << [datasize ^ used_xor].pack('L')
      datasize ^= used_xor if decrypt
      remember_size << datasize
      offset += 4
      self.next_key
      data = string[offset, datasize]
      new_string << data
      remember_offsets << offset
      remember_keys << used_xor
      offset += datasize
    end
    remember_offsets.size.times do |i|
      offset = remember_offsets[i]
      used_xor = remember_keys[i]
      size = remember_size[i]
      data = new_string[offset, size]
      data = data.ljust(size + (4 - size % 4)) if size % 4 != 0
      s = ''
      data.unpack('L' * (data.size / 4)).each do |j|
        s << ([j ^ used_xor].pack('L'))
        self.next_key
      end
      new_string[offset, size] = s.slice(0, size)
    end
    return new_string
  end
end

class Object

  java_import android.app.AlertDialog

  def rgss_main(&block)
    begin
      block.call
    rescue RGSSReset
      retry
    end
  end

  def rgss_stop
    loop { Graphics.update }
  end

  def load_data(filename)
    RGSSAD.files {|a|
      if a.filename == filename
        return Marshal.load(a)
      end
    }
    File.open(filename, "rb") { |f|
      Marshal.load(f)
    }
  end

  def save_data(obj, filename)
    if RGSSAD.files.size != 0
      RGSSAD.add_file(Marshal.dump(obj), filename)
    else
      File.open(filename, "wb") { |f|
        Marshal.dump(obj, f)
      }
    end
  end

  def msgbox(*args)
  end

  def msgbox_p(*args)
  end

end

module Graphics
  include_package Gdx::graphics

  class << self

    attr_accessor :frame_count, :gosu_window
    attr_reader :brightness, :frame_rate

    def brightness=(int)
      @brightness = [[255, int].min, 0].max
      @draw_color.alpha = 255 - @brightness
    end

    def frame_rate=(int)
      @frame_rate = [[120, int].min, 10].max
      #reform_window(width, height, fullscreen?, 1.0 / @frame_rate * 1000)
    end
  end

  @frame_rate = 60
  @brightness = 255
  @frame_count = 0
  @frozen = false
  @draw_color = Gosu::Color::BLACK
  @draw_color.saturation = 0
  @draw_color.alpha = 0
  @@gosu_sprites = []

  @@sprites = []

  module_function

  def update
    # @current = gosu_window.record(gosu_window.width, gosu_window.height) {
    #   @@gosu_sprites.each {|sprite|
    #     sprite.draw
    #   }
    # }
    sleep 1.0 / frame_rate
    @frame_count += 1
    # @latest = @current if !@frozen

    Gdx.gl.glClearColor(0, 0.25, 0.5, 1)
    Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT)

    @batch.begin
    @batch.draw(@img, 32, 64)

    @@sprites.each do |i|
      @batch.draw(i, i.x, i.y, i.ox, i.oy, i.width, i.height, i.scale_x, i.scale_y, i.rotation)
    end

    @batch.end

  end

  def wait(duration)
    duration.times { update }
  end

  def fadeout(duration)
    Thread.new {
      rate = @brightness / duration.to_f
      until @brightness <= 0
        self.brightness -= rate
        sleep 1.0 / frame_rate
      end
      self.brightness = 0
    }
  end

  def fadein(duration)
    Thread.new {
      rate = 255 / duration.to_f
      until @brightness >= 255
        self.brightness += rate
        sleep 1.0 / frame_rate
      end
      self.brightness = 255
    }
  end

  def freeze
    @frozen = true
  end

  def transition(duration = 10, filename = "", vague = 40)
    @frozen = false
    # VAGUE ELUDES ME AS TO HOW TO INTEGRATE
  end

  def frame_reset
    # AT A LOSS ON HOW TO INTEGRATE
  end

  def resize_screen(w, h)
    reform_window(w, h, fullscreen?, gosu_window.update_interval)
  end

  def play_movie(filename)
    # LIKELY TO REMAIN UNINTEGRATED
  end

  # NEW

  def add_sprite(sprite)
    @@sprites << sprite
  end

  def remove_sprite(sprite)
    @@sprites.delete(sprite)
  end

  def fullscreen?
    gosu_window.fullscreen?
  end

  def latest
    if @latest
      @latest.draw(0, 0, 0)
      c = @draw_color
      args = [0, 0, c, 0, height, c, width, 0, c, width, height, c, 1]
      Graphics.gosu_window.draw_quad(*args)
    end
  end

  def set_fullscreen(bool)
    return if bool == fullscreen?
    reform_window(width, height, bool, gosu_window.update_interval)
  end

  def reform_window(w, h, f, fps)
    Graphics.gosu_window.close
    Graphics.gosu_window = GosuGame.new(w, h, f, fps)
    Graphics.gosu_window.show
  end

  # libGdx

  def snap_to_bitmap
    width = Gdx::graphics.back_buffer_width
    height = Gdx::graphics.back_buffer_height
    pixels = ScreenUtils.frame_buffer_pixels(0, 0, width, height, true)
    pixmap = Pixmap.new(width, height)
    BufferUtils.copy(pixels, 0, pixmap.pixels, pixels.length)
    return pixmap
    # PixmapIO.writePNG(Gdx::files.external("mypixmap.png"), pixmap)
    #pixmap.dispose
  end

  def width
    Gdx::graphics.width
  end

  def height
    Gdx::graphics.height
  end

  def delta_time
    Gdx::graphics.delta_time
  end

  def free_type?
    Gdx::graphics.supports_extension('com.badlogicgames.gdx:gdx-freetype')
  end

  def clear_sprites
    @@sprites = []
  end

end

class Font

  class << self

    attr_accessor :default_name, :default_size, :default_bold
    attr_accessor :default_italic, :default_shadow, :default_outline
    attr_accessor :default_color, :default_out_color

    def exist?(name)
      f = (Gosu::Font.new(Graphics.gosu_window, "./Fonts/#{name}.ttf", 8) rescue false)
      Gosu::Font.new(Graphics.gosu_window, name, 8) unless f
      return true
    rescue
      return false
    end
  end

  self.default_name = ["Verdana", "Arial", "Courier New"]
  self.default_size = 24
  self.default_bold = false
  self.default_italic = false
  self.default_shadow = false
  self.default_outline = true
  self.default_color = Color.new(255, 255, 255, 255)
  self.default_out_color = Color.new(0, 0, 0, 128)

  attr_accessor :name, :size, :bold, :italic, :shadow, :outline, :color, :out_color

  def initialize(name = Font.default_name, size = Font.default_size)
    @name = name.dup
    @size = size
    @bold = Font.default_bold
    @italic = Font.default_italic
    @shadow = Font.default_shadow
    @outline = Font.default_outline
    @color = Font.default_color.dup
    @out_color = Font.default_out_color.dup
  end

  # NEW

  def first_existant_name
    if @name.is_a?(Array)
      @name.each {|a| return a if Font.exist?(a) }
    else
      return @name if Font.exist?(@name)
    end
    return "Verdana"
  end
end



class Sprite

  attr_reader :opacity, :bush_opacity
  attr_accessor :x, :y, :z, :ox, :oy, :zoom_x, :zoom_y
  attr_accessor :src_rect, :bitmap, :viewport, :visible
  attr_accessor :wave_amp, :wave_length, :wave_speed, :wave_phase
  attr_accessor :angle, :mirror, :color, :tone, :blend_type
  attr_accessor :bush_depth

  BLEND = {0 => :default, 1 => :additive, 2 => :subtractive}

  def initialize(viewport = nil)
    @viewport = viewport
    @visible = true
    @x, @y, @z = 0, 0, 0
    @ox, @oy = 0, 0
    @zoom_x, @zoom_y = 1.0, 1.0
    @angle = 0
    @mirror = false
    @bush_depth = 0
    @bush_opacity = 128
    @opacity = 255
    @blend_type = 0
    @wave_speed = 360
    @src_rect = Rect.new(0, 0, 0, 0)
    Graphics.add_sprite(self)
  end

  def initialize_copy
    f = super
    Graphics.add_sprite(f)
    f
  end

  def dispose
    @disposed = true
    Graphics.remove_sprite(self)
  end

  def disposed?
    @disposed
  end

  def flash(color, duration)
    @flash_color = color || Color.new(0, 0, 0, 0)
    @duration = duration
  end

  def update
    @duration = [@duration - 1, 0].max
    @flash_color = nil if @duration == 0
  end

  def width
    @src_rect.width
  end

  def height
    @src_rect.height
  end

  def opacity=(int)
    @opacity = [[int, 255].min, 0].max
  end

  def bush_opacity=(int)
    @bush_opacity = [[int, 255].min, 0].max
  end

  def bitmap=(bitmap)
    @bitmap = bitmap
    @src_rect = Rect.new(0, 0, bitmap.width, bitmap.height)
  end

  # NEW

  def draw
    return if !@visible || @opacity == 0 || @bitmap == nil
    @bitmap.gosu_image.draw_rot(@x, @y, @z, @angle, 0.0, 0.0, @zoom_x * (@mirror ? -1 : 1), @zoom_y, 0xffffffff, BLEND[@blend_type])
  end

  # y position (LibGdx)

  def real_y
    Graphics.height - @y
  end

end

# RGSS Built-in Classes

class Bitmap

  java_import com.badlogic.gdx.graphics.Texture
  java_import com.badlogic.gdx.graphics.g2d.Gdx2DPixmap

  attr_reader :rect, :pixmap
  attr_accessor :font

  def initialize(width, height = nil)
    case height
    when nil
      if width.is_a?(String)
        [".png", ".jpg"].each {|a|
          texture = Texture.new(width + a) rescue next
          texture.texture_data.prepare
          if texture.texture_data.prepared?
            @pixmap = texture.texture_data.consume_pixmap
          else
            raise "bitmap prepared false"
          end
          texture.dispose
          break
        }
        raise "File not found" if @pixmap == nil
      else
        raise ArgumentError
      end
    when Integer
      @pixmap = Gdx2DPixmap.new(width, height, Gdx2DPixmap::GDX2D_FORMAT_RGBA8888)
    end
    @rect = Rect.new(0, 0, @pixmap.width, @pixmap.height)
    @font = Font.new
    # set_chunkypng_image
  end

  def dispose
    @disposed = true
    @pixmap.dispose
  end

  def disposed?
    @disposed
  end

  def width
    @pixmap.width
  end

  def height
    @pixmap.height
  end

  def blt(x, y, src_bitmap, src_rect, opacity = 255)

    @pixmap.drawPixmap

    im2 = src_bitmap.chunkypng_image.dup
    im2.crop!(*src_rect.to_a)
    im2.set_opacity(opacity) unless opacity == 255
    # @gosu_image.insert(im2, x, y)
    # set_chunkypng_image
  end

  def stretch_blt(dest_rect, src_bitmap, src_rect, opacity = 255)
    im2 = src_bitmap.chunkypng_image.dup
    im2.crop!(*src_rect.to_a)
    im2.set_opacity(opacity) unless opacity == 255
    im2.resample_bilinear!(dest_rect.width, dest_rect.height)
    # @gosu_image.insert(im2, dest_rect.x, dest_rect.y)
    # set_chunkypng_image
  end

  def fill_rect(*args)
    case args.size
    when 2, 5
      if args[0].is_a?(Rect)
        x, y, width, height = *args[0].to_a
      else
        x, y, width, height = *args[0..3]
      end
    else
      raise ArgumentError
    end
    color = Color.rgba8888(*args[4].to_a.collect {|a| 255 / a }).to_int_bits
    @pixmap.fillRect(x, y, width, height, color)
    # @gosu_image.insert(img, x, y)
    # set_chunkypng_image
  end

  def gradient_fill_rect(*args)
    case args.size
    when 3, 6
      if args[0].is_a?(Rect)
        x, y, width, height = *args[0].to_a
        color1 = args[1]
        color2 = args[2]
        vertical = false
      else
        x, y, width, height = *args[0..3]
        color1 = args[4]
        color2 = args[5]
        vertical = false
      end
    when 4, 7
      if args[0].is_a?(Rect)
        x, y, width, height = *args[0].to_a
        color1 = args[1]
        color2 = args[2]
        vertical = args[3]
      else
        x, y, width, height = *args[0..3]
        color1 = args[4]
        color2 = args[5]
        vertical = args[6]
      end
    else
      raise ArgumentError
    end
    red1, green1, blue1, alpha1 = *color1.to_a
    red2, green2, blue2, alpha2 = *color2.to_a
    x_dif = width - x
    y_dif = height - y
    if !vertical
      x_dif.times do |i|
        fill_rect(x + i, y, 1, height, Color.new((red1 - red2) / x_dif * i, (blue1 - blue2) / x_dif * i, (green1 - green2) / x_dif * i))
      end
    else
      y_dif.times do |i|
        fill_rect(x, y + i, width, 1, Color.new((red1 - red2) / y_dif * i, (blue1 - blue2) / y_dif * i, (green1 - green2) / y_dif * i))
      end
    end
  end

  def clear
    @pixmap.clear()
  end

  def clear_rect(*args)
    case args.size
    when 1, 4
      if args[0].is_a?(Rect)
        x, y, width, height = *args[0].to_a
      else
        x, y, width, height = *args
      end
    else
      raise ArgumentError
    end
  end

  def get_pixel(x, y)
    color = Color.new
    color.set(@pixmap.get_pixel(x, y))
    return color
  end

  def set_pixel(x, y, color)
    @pixmap.set_pixel(x, y, color.to_int_bits)
  end

  def hue_change(hue)
  end

  def blur
  end

  def radial_blur(angle, division)
  end

  def draw_text(*args)
    if not Graphics.free_type?
      raise 'draw_text method does not supported'
    end

    case args.size
    when 2, 3
      x, y, width, height = *args[0].to_a
      string = args[1]
      align = args[2]
    when 5, 6
      x, y, width, height = *args[0, 4]
      string = args[4]
      align = args[5]
    else
      raise ArgumentError
    end

    # Add Libgdx

  end

  def text_size(string)
    if not Graphics.free_type?
      raise 'draw_text method does not supported'
    end
  end

end

class Color

  attr_reader :red, :green, :blue, :alpha

  alias :xxxx_initialize :initialize

  java_alias :gdx_set1 :set [Color.java_class]
  java_alias :gdx_set2 :set [Java::float, Java::float, Java::float, Java::float]
  java_alias :gdx_set3 :set [Java::int]

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
    [red, green, blue, alpha]
  end

  def _dump(d = 0)
    [@red, @green, @blue, @alpha].pack('d4')
  end

  def to_string
    java_send :toString
  end

  def self._load(s)
    Color.new(*s.unpack('d4'))
  end

end

class Plane < Sprite

  java_alias :gdx_draw, :draw, [SpriteBatch.java_class]

  java_import com.badlogic.gdx.graphics.Texture.TextureWrap

  def initialize(viewport)
    super(viewport)
  end

  def bitmap=(value)
    @bitmap = value
    @bitmap.set_wrap(TextureWrap::Repeat, TextureWrap::Repeat)
  end

  def draw(batch)
    batch.draw(self, @x, Graphics.height - @y, @ox, @oy, @src_rect.width, @src_rect.height)
  end

end

class Rect

  def initialize(x=0, y=0, width=0, height=0)
    @x = x
    @y = y
    @width = width
    @height = height
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

class Table
  attr_accessor :xsize, :ysize, :zsize
  def initialize(xsize, ysize, zsize)
    @xsize, @ysize, @zsize = x, [y, 1].max, [z, 1].max
    @data = Array.new(xsize * ysize * zsize, 0)
  end
  def [](x = 0, y = 0, z = 0)
    @data[(z * @ysize + y) * @xsize + x] || 0
  end
  def resize(xsize, ysize, zsize)
    @xsize, @ysize, @zsize = x, [y, 1].max, [z, 1].max
    @data = @data[0, @xsize * @ysize * @zsize - 1]
    until @data.size == @xsize * @ysize * @zsize
      @data << 0
    end
  end
end

class Tilemap

  TILESIZE = 32

  attr_accessor :bitmaps
  attr_reader   :map_data
  attr_accessor :flash_data
  attr_accessor :flags
  attr_accessor :viewport
  attr_accessor :visible
  attr_reader   :ox
  attr_reader   :oy

  def initialize(viewport = nil)
    @bitmaps = []
    @viewport = viewport
    @visible = true
    @ox = 0
    @oy = 0
    @animated_layer = []
    @layers = [Plane.new, Plane.new, Plane.new]
    @anim_count = 0
    @disposed = false
    @layers[0].z = 0
    @layers[0].viewport = @viewport
    @layers[1].z = 100
    @layers[1].viewport = @viewport
    @layers[2].z = 200
    @layers[2].viewport = @viewport
  end

  def dispose
    for layer in @layers
      layer.bitmap.dispose
      layer.dispose
    end
    for layer in @animated_layer
      layer.dispose
    end
    @disposed = true
  end

  def disposed?
    @disposed
  end

  def update
    @anim_count = (@anim_count + 1) % (@animated_layer.size * 30)
    @layers[0].bitmap = @animated_layer[@anim_count/30]
  end

  def refresh
    return if @map_data.nil? || @flags.nil?
    for layer in @layers
      layer.bitmap.dispose if layer.bitmap
    end
    draw_animated_layer
    draw_upper_layers
  end

  def draw_animated_layer
    bitmap = Bitmap.new(@map_data.xsize * TILESIZE, @map_data.ysize * TILESIZE)
    if need_animated_layer?
      @animated_layer = [bitmap, bitmap.clone, bitmap.clone]
    else
      @animated_layer = [bitmap]
    end
    @layers[0].bitmap = @animated_layer[0]
    for x in 0..@map_data.xsize - 1
      for y in 0..@map_data.ysize - 1
        draw_A1tile(x,y,@map_data[x,y,0],true) if @map_data[x,y,0].between?(2048,2815)
        draw_A2tile(x,y,@map_data[x,y,0]) if @map_data[x,y,0].between?(2816,4351)
        draw_A3tile(x,y,@map_data[x,y,0]) if @map_data[x,y,0].between?(4352,5887)
        draw_A4tile(x,y,@map_data[x,y,0]) if @map_data[x,y,0].between?(5888,8191)
        draw_A5tile(x,y,@map_data[x,y,0]) if @map_data[x,y,0].between?(1536,1663)
      end
    end
    for x in 0..@map_data.xsize - 1
      for y in 0..@map_data.ysize - 1
        draw_A1tile(x,y,@map_data[x,y,1],true) if @map_data[x,y,1].between?(2048,2815)
        draw_A2tile(x,y,@map_data[x,y,1]) if @map_data[x,y,1].between?(2816,4351)
      end
    end
  end

  def bitmap_for_autotile(autotile)
    return 0 if autotile.between?(0,15)
    return 1 if autotile.between?(16,47)
    return 2 if autotile.between?(48,79)
    return 3 if autotile.between?(80,127)
  end

  A1 = [
    [13,14,17,18], [2,14,17,18],  [13,3,17,18],  [2,3,17,18],
    [13,14,17,7],  [2,14,17,7],   [13,3,17,7],   [2,3,17,7],
    [13,14,6,18],  [2,14,6,18],   [13,3,6,18],   [2,3,6,18],
    [13,14,6,7],   [2,14,6,7],    [13,3,6,7],    [2,3,6,7],
    [12,14,16,18], [12,3,16,18],  [12,14,16,7],  [12,3,16,7],
    [9,10,17,18],  [9,10,17,7],   [9,10,6,18],   [9,10,6,7],
    [13,15,17,19], [13,15,6,19],  [2,15,17,19],  [2,15,6,19],
    [13,14,21,22], [2,14,21,22],  [13,3,21,22],  [2,3,21,22],
    [12,15,16,19], [9,10,21,22],  [8,9,12,13],   [8,9,12,7],
    [10,11,14,15], [10,11,6,15],  [18,19,22,23], [2,19,22,23],
    [16,17,20,21], [16,3,20,21],  [8,11,12,15],  [8,9,20,21],
    [16,19,20,23], [10,11,22,23], [8,11,20,23],  [0,1,4,5]
  ]

  A1POS = [
  [0,0],[0,TILESIZE*3],[TILESIZE*6,0],[TILESIZE*6,TILESIZE*3],
  [TILESIZE*8,0],[TILESIZE*14,0],[TILESIZE*8,TILESIZE*3],[TILESIZE*14,TILESIZE*3],
  [0,TILESIZE*6],[TILESIZE*6,TILESIZE*6],[0,TILESIZE*9],[TILESIZE*6,TILESIZE*9],
  [TILESIZE*8,TILESIZE*6],[TILESIZE*14,TILESIZE*6],[TILESIZE*8,TILESIZE*9],[TILESIZE*14,TILESIZE*9]
  ]

  def draw_A1tile(x,y,id,animated = false)
    autotile = (id - 2048) / 48
    return draw_waterfalltile(x,y,id) if [5,7,9,11,13,15].include?(autotile)
    index = (id - 2048) % 48
    case bitmap_for_autotile(autotile)
    when 0
      x2 = A1POS[autotile][0]
      y2 = A1POS[autotile][1]
    when 1
      x2 = (TILESIZE * 2) * ((autotile - 16) % 8)
      y2 = (TILESIZE * 3) * ((autotile - 16) / 8)
    when 2
      x2 = (TILESIZE * 2) * ((autotile - 48) % 8)
      y2 = (TILESIZE * 2) * ((autotile - 48) / 8)
    when 3
      x2 = (TILESIZE * 2) * ((autotile - 80) % 8)
      y2 = (TILESIZE * 3) * ((((autotile - 80) / 8)+1)/2) + (TILESIZE * 2) * (((autotile - 80) / 8)/2)
    end
    rect = Rect.new(0,0,TILESIZE/2,TILESIZE/2)
    for layer in @animated_layer
      for i in 0..3
        rect.x = x2 + (TILESIZE/2) * (A1[index][i] % 4)
        rect.y = y2 + (TILESIZE/2) * (A1[index][i] / 4)
        case i
        when 0
          layer.blt(x * TILESIZE, y * TILESIZE,@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 1
          layer.blt(x * TILESIZE + (TILESIZE/2), y * TILESIZE,@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 2
          layer.blt(x * TILESIZE, y * TILESIZE + (TILESIZE/2),@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 3
          layer.blt(x * TILESIZE + (TILESIZE/2), y * TILESIZE + (TILESIZE/2),@bitmaps[bitmap_for_autotile(autotile)],rect)
        end
      end
      x2 += TILESIZE * 2 if animated && ![2,3].include?(autotile)
    end
  end

  A1E = [
  [0,1,6,7],[0,1,4,5],[2,3,6,7],[1,2,5,6]
  ]

  def draw_waterfalltile(x,y,id)
    autotile = (id - 2048) / 48
    index = (id - 2048) % 48
    x2 = A1POS[autotile][0]
    y2 = A1POS[autotile][1]
    rect = Rect.new(0,0,TILESIZE/2,TILESIZE/2)
    for layer in @animated_layer
      for i in 0..3
        rect.x = x2 + (TILESIZE/2) * (A1E[index][i] % 4)
        rect.y = y2 + (TILESIZE/2) * (A1E[index][i] / 4)
        case i
        when 0
          layer.blt(x * TILESIZE, y * TILESIZE,@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 1
          layer.blt(x * TILESIZE + (TILESIZE/2), y * TILESIZE,@bitmaps[0],rect)
        when 2
          layer.blt(x * TILESIZE, y * TILESIZE + (TILESIZE/2),@bitmaps[0],rect)
        when 3
          layer.blt(x * TILESIZE + (TILESIZE/2), y * TILESIZE + (TILESIZE/2),@bitmaps[0],rect)
        end
      end
      y2 += TILESIZE
    end
  end

  def draw_A2tile(x,y,id)
    draw_A1tile(x,y,id)
  end

  A3 = [
    [5,6,9,10],    [4,5,8,9],    [1,2,5,6],   [0,1,4,5],
    [6,7,10,11],   [4,7,8,11],   [2,3,6,7],   [0,3,4,7],
    [9,10,13,14],  [8,9,12,13],  [1,2,13,14], [0,1,12,13],
    [10,11,14,15], [8,11,12,13], [2,3,14,15], [0,3,12,15]
  ]

  def draw_A3tile(x,y,id)
    autotile = (id - 2048) / 48
    index = (id - 2048) % 48
    case bitmap_for_autotile(autotile)
    when 0
      x2 = (TILESIZE * 2) * ((autotile) % 8)
      y2 = (TILESIZE * 3) * ((autotile) / 8)
    when 1
      x2 = (TILESIZE * 2) * ((autotile - 16) % 8)
      y2 = (TILESIZE * 3) * ((autotile - 16) / 8)
    when 2
      x2 = (TILESIZE * 2) * ((autotile - 48) % 8)
      y2 = (TILESIZE * 2) * ((autotile - 48) / 8)
    when 3
      x2 = (TILESIZE * 2) * ((autotile - 80) % 8)
      y2 = (TILESIZE * 3) * ((((autotile - 80) / 8)+1)/2) + (TILESIZE * 2) * (((autotile - 80) / 8)/2)
    end
    rect = Rect.new(0,0,TILESIZE/2,TILESIZE/2)
    for layer in @animated_layer
      for i in 0..3
        if A3[index].nil?
          rect.x = x2 + (TILESIZE/2) * (A1[index][i] % 4)
          rect.y = y2 + (TILESIZE/2) * (A1[index][i] / 4)
        else
          rect.x = x2 + (TILESIZE/2) * (A3[index][i] % 4)
          rect.y = y2 + (TILESIZE/2) * (A3[index][i] / 4)
        end
        case i
        when 0
          layer.blt(x * TILESIZE, y * TILESIZE,@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 1
          layer.blt(x * TILESIZE + (TILESIZE/2), y * TILESIZE,@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 2
          layer.blt(x * TILESIZE, y * TILESIZE + (TILESIZE/2),@bitmaps[bitmap_for_autotile(autotile)],rect)
        when 3
          layer.blt(x * TILESIZE + (TILESIZE/2), y * TILESIZE + (TILESIZE/2),@bitmaps[bitmap_for_autotile(autotile)],rect)
        end
      end
    end
  end

  def draw_A4tile(x,y,id)
    autotile = (id - 2048) / 48
    case autotile
    when 80..87
      draw_A1tile(x,y,id)
    when 96..103
      draw_A1tile(x,y,id)
    when 112..119
      draw_A1tile(x,y,id)
    else
      draw_A3tile(x,y,id)
    end
  end

  def draw_A5tile(x,y,id)
    id -= 1536
    rect = Rect.new(TILESIZE * (id % 8),TILESIZE * ((id % 128) / 8),TILESIZE,TILESIZE)
    for layer in @animated_layer
      layer.blt(x * TILESIZE, y * TILESIZE,@bitmaps[4],rect)
    end
  end

  def need_animated_layer?
    for x in 0..@map_data.xsize - 1
      for y in 0..@map_data.ysize - 1
        if @map_data[x,y,0].between?(2048, 2815)
          return true
        end
      end
    end
    return false
  end

  def draw_upper_layers
    bitmap = Bitmap.new(@map_data.xsize * TILESIZE, @map_data.ysize * TILESIZE)
    @layers[1].bitmap = bitmap
    @layers[2].bitmap = bitmap.clone
    rect = Rect.new(0,0,TILESIZE,TILESIZE)
    for x in 0..@map_data.xsize - 1
      for y in 0..@map_data.ysize - 1
        n = @map_data[x,y,2] % 256
        rect.x = TILESIZE * ((n % 8) + (8 * (n / 128)))
        rect.y = TILESIZE * ((n % 128) / 8)
        if @flags[@map_data[x,y,2]] & 0x10 == 0
          @layers[1].bitmap.blt(x * TILESIZE, y * TILESIZE,@bitmaps[5+@map_data[x,y,2]/256],rect)
        else
          @layers[2].bitmap.blt(x * TILESIZE, y * TILESIZE,@bitmaps[5+@map_data[x,y,2]/256],rect)
        end
      end
    end
  end

  def map_data=(data)
    return if @map_data == data
    @map_data = data
    refresh
  end

  def flags=(data)
    @flags = data
    refresh
  end

  def ox=(value)
    @ox = value
    for layer in @layers
      layer.ox = @ox
    end
  end

  def oy=(value)
    @oy = value
    for layer in @layers
      layer.oy = @oy
    end
  end
end

class Tone

  attr_reader :red, :green, :blue, :gray

  def initialize(*args)
    case args.size
    when 0
      set(0, 0, 0, 0)
    when 3
      args << 0
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
      if args[0].is_a?(Tone)
        set(*args[0].to_a)
      else
        raise ArgumentError
      end
    when 3
      args << 0
      set(*args)
    when 4
      self.red = args[0]
      self.green = args[1]
      self.blue = args[2]
      self.gray = args[3]
    else
      raise ArgumentError
    end
  end

  def red=(int)
    @red = [[255, int].min, -255].max.to_f
  end

  def green=(int)
    @green = [[255, int].min, -255].max.to_f
  end

  def blue=(int)
    @blue = [[255, int].min, -255].max.to_f
  end

  def gray=(int)
    @gray = [[255, int].min, 0].max.to_f
  end

  def _dump(d = 0)
    [@red, @green, @blue, @gray].pack('d4')
  end

  def self._load(s)
    Tone.new(*s.unpack('d4'))
  end

  # NEW

  def to_a
    [red, green, blue, gray]
  end
end

class Viewport

  attr_accessor :color, :tone, :rect, :visible, :z, :ox, :oy

  def initialize(*args)
    case args.size
    when 0
      @rect = Rect.new(0, 0, Graphics.width, Graphics.height)
    when 1
      if args[0].is_a?(Rect)
        @rect = args[0]
      else
        raise ArgumentError
      end
    when 4
      @rect = Rect.new(*args)
    else
      raise ArgumentError
    end
    @visible = true
    @z = 0
    @ox = 0
    @oy = 0
  end

  def dispose
    @disposed = true
  end

  def disposed?
    @disposed
  end

  def flash(color, duration)
    @flash_color = color || Color.new(0, 0, 0, 0)
    @flash_duration = duration
  end

  def update
    @flash_duration = [@flash_duration - 1, 0].max
    @flash_color = nil if @flash_duration == 0
  end
end

class Window

  attr_reader :windowskin, :contents, :opacity, :back_opacity, :contents_opacity
  attr_reader :width, :height, :cursor_rect
  attr_accessor :x, :y, :z, :ox, :oy, :active, :visible, :pause, :viewport, :openness

  def initialize(viewport = nil)
    @viewport = viewport
    @x, @y, @z, @ox, @oy = 0, 0, 0, 0, 0
    @active = false
    @visible = true
    @pause = false
    @opacity = 255
    @back_opacity = 255
    @contents_opacity = 255
    @openness = 255
    @sprites = {
      :contents => Sprite.new,
      :back => Sprite.new,
      :border => Sprite.new,
      :arrow_left => Sprite.new,
      :arrow_up => Sprite.new,
      :arrow_right => Sprite.new,
      :arrow_down => Sprite.new,
      :pause_one => Sprite.new,
      :pause_two => Sprite.new,
      :pause_three => Sprite.new,
      :pause_four => Sprite.new,
      :cursor => Sprite.new
    }
    @sprites.values.each {|a| Graphics.remove_sprite(a) }
    Graphics.add_sprite(self)
  end

  def windowskin=(bit)
    @windowskin = bit
    @sprites[:back] = Sprite.new
    Graphics.remove_sprite(@sprites[:back])
    bitm = Bitmap.new(128, 128)
    @sprites[:back].bitmap = bitm
    if bit != nil
      bitm.stretch_blt(Rect.new(0, 0, @width, @height), bit, Rect.new(0, 0, 128, 64), 255)
      setup_background_overlay
      setup_arrows
      setup_pauses
      setup_border
      setup_cursor
    end
  end

  def contents=(bit)
    @contents = bit
    @sprites[:contents].bitmap = bit
  end

  def stretch=(bool)
    @stretch = bool
    self.windowskin = @windowskin
  end

  def opacity=(int)
    @opacity = int
    @sprites.values.each {|a|
      a.opacity = int
    }
    @sprites[:back_opacity].opacity = @back_opacity
    @sprites[:contents].opacity = @contents_opacity
    @sprites[:cursor].opacity = 255
  end

  def back_opacity=(int)
    @back_opacity = int
    @sprites[:back].opacity = int
  end

  def contents_opacity=(int)
    @contents_opacity = int
    @sprites[:contents].opacity = int
  end

  def cursor_rect=(rect)
    @cursor_rect = rect
    setup_cursor
  end

  def width=(int)
    @width = int
    setup_border
  end

  def height=(int)
    @height = int
    setup_border
  end

  # NEW

  def draw
  end

  private

  def setup_background_overlay
  end

  def setup_arrows
  end

  def setup_pauses
    [:pause_one, :pause_two, :pause_three, :pause_four].each {|a|
      @sprites[a].bitmap = Bitmap.new(8, 8)
    }
    x = @windowskin.width - 32
    @sprites[:pause_one].blt(0, 0, @windowskin, Rect.new(x, 64, 8, 8))
    @sprites[:pause_two].blt(0, 0, @windowskin, Rect.new(x + 8, 64, 8, 8))
    @sprites[:pause_three].blt(0, 0, @windowskin, Rect.new(x, 72, 8, 8))
    @sprites[:pause_four].blt(0, 0, @windowskin, Rect.new(x + 8, 72, 8, 8))
  end

  def setup_border
  end

  def setup_cursor
  end
end

class RGSSError < StandardError
end

class RGSSReset < Exception
end

module Audio

  module_function

  def setup_midi
    # This method does not support
  end

  def bgm_play(filename, volume = 100, pitch = 100, pos = 0)
    files = ["#{filename}.ogg", "#{filename}.mp3", "#{filename}.wav"]
    files.each do |file_name|
      file = Gdx::files.internal(file_name)
      next unless file.exists
      if file.exists
        bgm_stop
        @bgm.dispose
        @bgm_volume = volume / 100.0
        @bgm = Gdx::audio.newMusic(file)
        @bgm.looping = true
        @bgm.volume = @bgm_volume
        @bgm.position = pos
        @bgm.play
      end
    end
  end

  def bgm_stop
    @bgm.stop if @bgm
  end

  def bgm_fade(time)
    return unless @bgm
    Thread.new {
      incs = @bgm_volume / time
      until @bgm_volume <= 0
        @bgm_volume -= incs
        @bgm.volume -= incs
        sleep 0.01
      end
      bgm_stop
    }
  end

  def bgm_pos
    @bgm.position if @bgm
  end

  def bgs_play(filename, volume = 100, pitch = 100, pos = 0)
    files = ["#{filename}.ogg", "#{filename}.mp3", "#{filename}.wav"]
    files.each do |file_name|
      file = Gdx::files.internal(file_name)
      next unless file.exists
      if file.exists
        bgs_stop
        @bgs.dispose
        @bgs_volume = volume / 100.0
        @bgs = Gdx::audio.newMusic(file)
        @bgs.looping = true
        @bgs.volume = @bgm_volume
        @bgs.position = pos
        @bgs.play
      end
    end
  end

  def bgs_stop
    @bgs.stop if @bgs
  end

  def bgs_fade(time)
    return unless @bgs
    Thread.new {
      incs = @bgs_volume / time
      until @bgs_volume <= 0
        @bgs_volume -= incs
        @bgs.volume -= incs
        sleep 0.01
      end
      bgs_stop
    }
  end

  def bgs_pos
    @bgs.position if @bgs
  end

  def me_play(filename, volume = 100, pitch = 100)
    me_stop
    @bgm.pause if @bgm
    files = ["#{filename}.ogg", "#{filename}.mp3", "#{filename}.wav"]
    files.each do |file_name|
      file = Gdx::files.internal(file_name)
      next unless file.exists
      if file.exists
        @me = Gdx::audio.newSound(file)
        @me_volume = volume / 100.0
        @last_me_id = @me.play(@me_volume, pitch / 100.0, 0.0)
      end
    end
  end

  def me_stop
    @me.stop(@last_me_id) if @me
    @bgm.play if @bgm
  end

  def me_fade(time)
    return unless @me
    Thread.new {
      incs = @me_volume / time
      until @me_volume <= 0
        @me_volume -= incs
        @me.volume -= incs
        sleep 0.01
      end
      me_stop
    }
  end

  def se_play(filename, volume = 100, pitch = 100)
    @se = [] if @se == nil

    files = ["#{filename}.ogg", "#{filename}.mp3", "#{filename}.wav"]

    # Find each sound file
    files.each do |file_name|
      next unless file.exists
      if file.exists
        sound = Gdx::audio.newSound(file)
        id = sound.play(volume / 100.0, pitch / 100.0, 0.0)
        @se << [sound, id]
      end
    end

  end

  def se_stop
    @se.each {|se, id| se.stop(id) }
    @se.clear
  end
end

module Input

  @previous_keys, @keys, @gosu_keys = [], [], []

  DOWN = [Gosu::KbDown]
  UP = [Gosu::KbUp]
  LEFT = [Gosu::KbLeft]
  RIGHT = [Gosu::KbRight]
  A = [Gosu::KbLeftShift, Gosu::KbRightShift]
  B = [Gosu::KbX, Gosu::KbEscape, Gosu::Kb0]
  C = [Gosu::KbReturn, Gosu::KbSpace, Gosu::KbZ]
  X = [Gosu::KbA]
  Y = [Gosu::KbS]
  Z = [Gosu::KbD]
  L = [Gosu::KbQ]
  R = [Gosu::KbW]
  SHIFT = [Gosu::KbLeftShift, Gosu::KbRightShift]
  CTRL = [Gosu::KbLeftControl, Gosu::KbRightControl]
  ALT = [Gosu::KbLeftAlt, Gosu::KbRightAlt]
  F5 = [Gosu::KbF5]
  F6 = [Gosu::KbF6]
  F7 = [Gosu::KbF7]
  F8 = [Gosu::KbF8]
  F9 = [Gosu::KbF9]

  module_function

  def update
    @keys = @gosu_keys.dup
    @gosu_keys.clear
  end

  def trigger?(key)
    if key.is_a?(Symbol)
      key = const_get(key)
    end
    return key.any? {|a| @keys.include?(a) }
  end

  def press?(key)
    if key.is_a?(Symbol)
      key = const_get(key)
    end
    return key.any? {|a| Graphics.gosu_window.button_down?(a) }
  end

  def repeat?(key)
  end

  def dir4
    return 2 if press?(:DOWN)
    return 4 if press?(:LEFT)
    return 6 if press?(:RIGHT)
    return 8 if press?(:UP)
    return 0
  end

  def dir8
    return 1 if press?(:DOWN) && press?(:LEFT)
    return 3 if press?(:DOWN) && press?(:RIGHT)
    return 7 if press?(:UP) && press?(:LEFT)
    return 9 if press?(:UP) && press?(:RIGHT)
    return dir4
  end

  # NEW

  def add_key(key)
    @gosu_keys << key
  end

  def gosu_trigger?(key)
    key = Gosu::Button.const_get("Kb#{key.to_s.capitalize}")
    return @keys.include?(key)
  end

  def gosu_press?(key)
    key = Gosu::Button.const_get("Kb#{key.to_s.capitalize}")
    return Graphics.gosu_window.button_down?(a)
    return false
  end

  def gosu_repeat?(key)
  end
end

module RPG; end

class RPG::AudioFile
  def initialize(name = '', volume = 100, pitch = 100)
    @name = name
    @volume = volume
    @pitch = pitch
  end
  attr_accessor :name
  attr_accessor :volume
  attr_accessor :pitch
end


class RPG::BGM < RPG::AudioFile
  @@last = RPG::BGM.new
  def play(pos = 0)
    if @name.empty?
      Audio.bgm_stop
      @@last = RPG::BGM.new
    else
      Audio.bgm_play('Audio/BGM/' + @name, @volume, @pitch, pos)
      @@last = self.clone
    end
  end
  def replay
    play(@pos)
  end
  def self.stop
    Audio.bgm_stop
    @@last = RPG::BGM.new
  end
  def self.fade(time)
    Audio.bgm_fade(time)
    @@last = RPG::BGM.new
  end
  def self.last
    @@last.pos = Audio.bgm_pos
    @@last
  end
  attr_accessor :pos
end


class RPG::BGS < RPG::AudioFile
  @@last = RPG::BGS.new
  def play(pos = 0)
    if @name.empty?
      Audio.bgs_stop
      @@last = RPG::BGS.new
    else
      Audio.bgs_play('Audio/BGS/' + @name, @volume, @pitch, pos)
      @@last = self.clone
    end
  end
  def replay
    play(@pos)
  end
  def self.stop
    Audio.bgs_stop
    @@last = RPG::BGS.new
  end
  def self.fade(time)
    Audio.bgs_fade(time)
    @@last = RPG::BGS.new
  end
  def self.last
    @@last.pos = Audio.bgs_pos
    @@last
  end
  attr_accessor :pos
end


class RPG::ME < RPG::AudioFile
  def play
    if @name.empty?
      Audio.me_stop
    else
      Audio.me_play('Audio/ME/' + @name, @volume, @pitch)
    end
  end
  def self.stop
    Audio.me_stop
  end
  def self.fade(time)
    Audio.me_fade(time)
  end
end


class RPG::SE < RPG::AudioFile
  def play
    unless @name.empty?
      Audio.se_play('Audio/SE/' + @name, @volume, @pitch)
    end
  end
  def self.stop
    Audio.se_stop
  end
end


class RPG::Tileset
  def initialize
    @id = 0
    @mode = 1
    @name = ''
    @tileset_names = Array.new(9).collect{''}
    @flags = Table.new(8192)
    @flags[0] = 0x0010
    (2048..2815).each {|i| @flags[i] = 0x000F}
    (4352..8191).each {|i| @flags[i] = 0x000F}
    @note = ''
  end
  attr_accessor :id
  attr_accessor :mode
  attr_accessor :name
  attr_accessor :tileset_names
  attr_accessor :flags
  attr_accessor :note
end
class RPG::Map
  def initialize(width, height)
    @display_name = ''
    @tileset_id = 1
    @width = width
    @height = height
    @scroll_type = 0
    @specify_battleback = false
    @battleback_floor_name = ''
    @battleback_wall_name = ''
    @autoplay_bgm = false
    @bgm = RPG::BGM.new
    @autoplay_bgs = false
    @bgs = RPG::BGS.new('', 80)
    @disable_dashing = false
    @encounter_list = []
    @encounter_step = 30
    @parallax_name = ''
    @parallax_loop_x = false
    @parallax_loop_y = false
    @parallax_sx = 0
    @parallax_sy = 0
    @parallax_show = false
    @note = ''
    @data = Table.new(width, height, 4)
    @events = {}
  end
  attr_accessor :display_name
  attr_accessor :tileset_id
  attr_accessor :width
  attr_accessor :height
  attr_accessor :scroll_type
  attr_accessor :specify_battleback
  attr_accessor :battleback1_name
  attr_accessor :battleback2_name
  attr_accessor :autoplay_bgm
  attr_accessor :bgm
  attr_accessor :autoplay_bgs
  attr_accessor :bgs
  attr_accessor :disable_dashing
  attr_accessor :encounter_list
  attr_accessor :encounter_step
  attr_accessor :parallax_name
  attr_accessor :parallax_loop_x
  attr_accessor :parallax_loop_y
  attr_accessor :parallax_sx
  attr_accessor :parallax_sy
  attr_accessor :parallax_show
  attr_accessor :note
  attr_accessor :data
  attr_accessor :events
end

class RPG::Map::Encounter
  def initialize
    @troop_id = 1
    @weight = 10
    @region_set = []
  end
  attr_accessor :troop_id
  attr_accessor :weight
  attr_accessor :region_set
end


class RPG::MapInfo
  def initialize
    @name = ''
    @parent_id = 0
    @order = 0
    @expanded = false
    @scroll_x = 0
    @scroll_y = 0
  end
  attr_accessor :name
  attr_accessor :parent_id
  attr_accessor :order
  attr_accessor :expanded
  attr_accessor :scroll_x
  attr_accessor :scroll_y
end


class RPG::Event
  def initialize(x, y)
    @id = 0
    @name = ''
    @x = x
    @y = y
    @pages = [RPG::Event::Page.new]
  end
  attr_accessor :id
  attr_accessor :name
  attr_accessor :x
  attr_accessor :y
  attr_accessor :pages
end


class RPG::Event::Page
  def initialize
    @condition = RPG::Event::Page::Condition.new
    @graphic = RPG::Event::Page::Graphic.new
    @move_type = 0
    @move_speed = 3
    @move_frequency = 3
    @move_route = RPG::MoveRoute.new
    @walk_anime = true
    @step_anime = false
    @direction_fix = false
    @through = false
    @priority_type = 0
    @trigger = 0
    @list = [RPG::EventCommand.new]
  end
  attr_accessor :condition
  attr_accessor :graphic
  attr_accessor :move_type
  attr_accessor :move_speed
  attr_accessor :move_frequency
  attr_accessor :move_route
  attr_accessor :walk_anime
  attr_accessor :step_anime
  attr_accessor :direction_fix
  attr_accessor :through
  attr_accessor :priority_type
  attr_accessor :trigger
  attr_accessor :list
end


class RPG::Event::Page::Condition
  def initialize
    @switch1_valid = false
    @switch2_valid = false
    @variable_valid = false
    @self_switch_valid = false
    @item_valid = false
    @actor_valid = false
    @switch1_id = 1
    @switch2_id = 1
    @variable_id = 1
    @variable_value = 0
    @self_switch_ch = 'A'
    @item_id = 1
    @actor_id = 1
  end
  attr_accessor :switch1_valid
  attr_accessor :switch2_valid
  attr_accessor :variable_valid
  attr_accessor :self_switch_valid
  attr_accessor :item_valid
  attr_accessor :actor_valid
  attr_accessor :switch1_id
  attr_accessor :switch2_id
  attr_accessor :variable_id
  attr_accessor :variable_value
  attr_accessor :self_switch_ch
  attr_accessor :item_id
  attr_accessor :actor_id
end


class RPG::Event::Page::Graphic
  def initialize
    @tile_id = 0
    @character_name = ''
    @character_index = 0
    @direction = 2
    @pattern = 0
  end
  attr_accessor :tile_id
  attr_accessor :character_name
  attr_accessor :character_index
  attr_accessor :direction
  attr_accessor :pattern
end


class RPG::EventCommand
  def initialize(code = 0, indent = 0, parameters = [])
    @code = code
    @indent = indent
    @parameters = parameters
  end
  attr_accessor :code
  attr_accessor :indent
  attr_accessor :parameters
end


class RPG::MoveRoute
  def initialize
    @repeat = true
    @skippable = false
    @wait = false
    @list = [RPG::MoveCommand.new]
  end
  attr_accessor :repeat
  attr_accessor :skippable
  attr_accessor :wait
  attr_accessor :list
end
class RPG::MoveCommand
  def initialize(code = 0, parameters = [])
    @code = code
    @parameters = parameters
  end
  attr_accessor :code
  attr_accessor :parameters
end


class RPG::CommonEvent
  def initialize
    @id = 0
    @name = ''
    @trigger = 0
    @switch_id = 1
    @list = [RPG::EventCommand.new]
  end
  def autorun?
    @trigger == 1
  end
  def parallel?
    @trigger == 2
  end
  attr_accessor :id
  attr_accessor :name
  attr_accessor :trigger
  attr_accessor :switch_id
  attr_accessor :list
end
class RPG::BaseItem
  def initialize
    @id = 0
    @name = ''
    @icon_index = 0
    @description = ''
    @features = []
    @note = ''
  end
  attr_accessor :id
  attr_accessor :name
  attr_accessor :icon_index
  attr_accessor :description
  attr_accessor :features
  attr_accessor :note
end


class RPG::BaseItem::Feature
  def initialize(code = 0, data_id = 0, value = 0)
    @code = code
    @data_id = data_id
    @value = value
  end
  attr_accessor :code
  attr_accessor :data_id
  attr_accessor :value
end


class RPG::Actor < RPG::BaseItem
  def initialize
    super
    @nickname = ''
    @class_id = 1
    @initial_level = 1
    @max_level = 99
    @character_name = ''
    @character_index = 0
    @face_name = ''
    @face_index = 0
    @equips = [0,0,0,0,0]
  end
  attr_accessor :nickname
  attr_accessor :class_id
  attr_accessor :initial_level
  attr_accessor :max_level
  attr_accessor :character_name
  attr_accessor :character_index
  attr_accessor :face_name
  attr_accessor :face_index
  attr_accessor :equips
end
class RPG::Class < RPG::BaseItem
  def initialize
    super
    @exp_params = [30,20,30,30]
    @params = Table.new(8,100)
    (1..99).each do |i|
      @params[0,i] = 400+i*50
      @params[1,i] = 80+i*10
      (2..5).each {|j| @params[j,i] = 15+i*5/4 }
      (6..7).each {|j| @params[j,i] = 30+i*5/2 }
    end
    @learnings = []
    @features.push(RPG::BaseItem::Feature.new(23, 0, 1))
    @features.push(RPG::BaseItem::Feature.new(22, 0, 0.95))
    @features.push(RPG::BaseItem::Feature.new(22, 1, 0.05))
    @features.push(RPG::BaseItem::Feature.new(22, 2, 0.04))
    @features.push(RPG::BaseItem::Feature.new(41, 1))
    @features.push(RPG::BaseItem::Feature.new(51, 1))
    @features.push(RPG::BaseItem::Feature.new(52, 1))
  end
  def exp_for_level(level)
    lv = level.to_f
    basis = @exp_params[0].to_f
    extra = @exp_params[1].to_f
    acc_a = @exp_params[2].to_f
    acc_b = @exp_params[3].to_f
    return (basis*((lv-1)**(0.9+acc_a/250))*lv*(lv+1)/
      (6+lv**2/50/acc_b)+(lv-1)*extra).round.to_i
  end
  attr_accessor :exp_params
  attr_accessor :params
  attr_accessor :learnings
end


class RPG::Class::Learning
  def initialize
    @level = 1
    @skill_id = 1
    @note = ''
  end
  attr_accessor :level
  attr_accessor :skill_id
  attr_accessor :note
end


class RPG::UsableItem < RPG::BaseItem
  def initialize
    super
    @scope = 0
    @occasion = 0
    @speed = 0
    @success_rate = 100
    @repeats = 1
    @tp_gain = 0
    @hit_type = 0
    @animation_id = 0
    @damage = RPG::UsableItem::Damage.new
    @effects = []
  end
  def for_opponent?
    [1, 2, 3, 4, 5, 6].include?(@scope)
  end
  def for_friend?
    [7, 8, 9, 10, 11].include?(@scope)
  end
  def for_dead_friend?
    [9, 10].include?(@scope)
  end
  def for_user?
    @scope == 11
  end
  def for_one?
    [1, 3, 7, 9, 11].include?(@scope)
  end
  def for_random?
    [3, 4, 5, 6].include?(@scope)
  end
  def number_of_targets
    for_random? ? @scope - 2 : 0
  end
  def for_all?
    [2, 8, 10].include?(@scope)
  end
  def need_selection?
    [1, 7, 9].include?(@scope)
  end
  def battle_ok?
    [0, 1].include?(@occasion)
  end
  def menu_ok?
    [0, 2].include?(@occasion)
  end
  def certain?
    @hit_type == 0
  end
  def physical?
    @hit_type == 1
  end
  def magical?
    @hit_type == 2
  end
  attr_accessor :scope
  attr_accessor :occasion
  attr_accessor :speed
  attr_accessor :animation_id
  attr_accessor :success_rate
  attr_accessor :repeats
  attr_accessor :tp_gain
  attr_accessor :hit_type
  attr_accessor :damage
  attr_accessor :effects
end


class RPG::UsableItem::Damage
  def initialize
    @type = 0
    @element_id = 0
    @formula = '0'
    @variance = 20
    @critical = false
  end
  def none?
    @type == 0
  end
  def to_hp?
    [1,3,5].include?(@type)
  end
  def to_mp?
    [2,4,6].include?(@type)
  end
  def recover?
    [3,4].include?(@type)
  end
  def drain?
    [5,6].include?(@type)
  end
  def sign
    recover? ? -1 : 1
  end
  def eval(a, b, v)
    [Kernel.eval(@formula), 0].max * sign rescue 0
  end
  attr_accessor :type
  attr_accessor :element_id
  attr_accessor :formula
  attr_accessor :variance
  attr_accessor :critical
end


class RPG::UsableItem::Effect
  def initialize(code = 0, data_id = 0, value1 = 0, value2 = 0)
    @code = code
    @data_id = data_id
    @value1 = value1
    @value2 = value2
  end
  attr_accessor :code
  attr_accessor :data_id
  attr_accessor :value1
  attr_accessor :value2
end


class RPG::Skill < RPG::UsableItem
  def initialize
    super
    @scope = 1
    @stype_id = 1
    @mp_cost = 0
    @tp_cost = 0
    @message1 = ''
    @message2 = ''
    @required_wtype_id1 = 0
    @required_wtype_id2 = 0
  end
  attr_accessor :stype_id
  attr_accessor :mp_cost
  attr_accessor :tp_cost
  attr_accessor :message1
  attr_accessor :message2
  attr_accessor :required_wtype_id1
  attr_accessor :required_wtype_id2
end
class RPG::Item < RPG::UsableItem
  def initialize
    super
    @scope = 7
    @itype_id = 1
    @price = 0
    @consumable = true
  end
  def key_item?
    @itype_id == 2
  end
  attr_accessor :itype_id
  attr_accessor :price
  attr_accessor :consumable
end


class RPG::EquipItem < RPG::BaseItem
  def initialize
    super
    @price = 0
    @etype_id = 0
    @params = [0] * 8
  end
  attr_accessor :price
  attr_accessor :etype_id
  attr_accessor :params
end
class RPG::Weapon < RPG::EquipItem
  def initialize
    super
    @wtype_id = 0
    @animation_id = 0
    @features.push(RPG::BaseItem::Feature.new(31, 1, 0))
    @features.push(RPG::BaseItem::Feature.new(22, 0, 0))
  end
  def performance
    params[2] + params[4] + params.inject(0) {|r, v| r += v }
  end
  attr_accessor :wtype_id
  attr_accessor :animation_id
end


class RPG::Armor < RPG::EquipItem
  def initialize
    super
    @atype_id = 0
    @etype_id = 1
    @features.push(RPG::BaseItem::Feature.new(22, 1, 0))
  end
  def performance
    params[3] + params[5] + params.inject(0) {|r, v| r += v }
  end
  attr_accessor :atype_id
end


class RPG::Enemy < RPG::BaseItem
  def initialize
    super
    @battler_name = ''
    @battler_hue = 0
    @params = [100,0,10,10,10,10,10,10]
    @exp = 0
    @gold = 0
    @drop_items = Array.new(3) { RPG::Enemy::DropItem.new }
    @actions = [RPG::Enemy::Action.new]
    @features.push(RPG::BaseItem::Feature.new(22, 0, 0.95))
    @features.push(RPG::BaseItem::Feature.new(22, 1, 0.05))
    @features.push(RPG::BaseItem::Feature.new(31, 1, 0))
  end
  attr_accessor :battler_name
  attr_accessor :battler_hue
  attr_accessor :params
  attr_accessor :exp
  attr_accessor :gold
  attr_accessor :drop_items
  attr_accessor :actions
end


class RPG::Enemy::DropItem
  def initialize
    @kind = 0
    @data_id = 1
    @denominator = 1
  end
  attr_accessor :kind
  attr_accessor :data_id
  attr_accessor :denominator
end


class RPG::Enemy::Action
  def initialize
    @skill_id = 1
    @condition_type = 0
    @condition_param1 = 0
    @condition_param2 = 0
    @rating = 5
  end
  attr_accessor :skill_id
  attr_accessor :condition_type
  attr_accessor :condition_param1
  attr_accessor :condition_param2
  attr_accessor :rating
end


class RPG::State < RPG::BaseItem
  def initialize
    super
    @restriction = 0
    @priority = 50
    @remove_at_battle_end = false
    @remove_by_restriction = false
    @auto_removal_timing = 0
    @min_turns = 1
    @max_turns = 1
    @remove_by_damage = false
    @chance_by_damage = 100
    @remove_by_walking = false
    @steps_to_remove = 100
    @message1 = ''
    @message2 = ''
    @message3 = ''
    @message4 = ''
  end
  attr_accessor :restriction
  attr_accessor :priority
  attr_accessor :remove_at_battle_end
  attr_accessor :remove_by_restriction
  attr_accessor :auto_removal_timing
  attr_accessor :min_turns
  attr_accessor :max_turns
  attr_accessor :remove_by_damage
  attr_accessor :chance_by_damage
  attr_accessor :remove_by_walking
  attr_accessor :steps_to_remove
  attr_accessor :message1
  attr_accessor :message2
  attr_accessor :message3
  attr_accessor :message4
end


class RPG::Troop
  def initialize
    @id = 0
    @name = ''
    @members = []
    @pages = [RPG::Troop::Page.new]
  end
  attr_accessor :id
  attr_accessor :name
  attr_accessor :members
  attr_accessor :pages
end


class RPG::Troop::Member
  def initialize
    @enemy_id = 1
    @x = 0
    @y = 0
    @hidden = false
  end
  attr_accessor :enemy_id
  attr_accessor :x
  attr_accessor :y
  attr_accessor :hidden
end


class RPG::Troop::Page
  def initialize
    @condition = RPG::Troop::Page::Condition.new
    @span = 0
    @list = [RPG::EventCommand.new]
  end
  attr_accessor :condition
  attr_accessor :span
  attr_accessor :list
end


class RPG::Troop::Page::Condition
  def initialize
    @turn_ending = false
    @turn_valid = false
    @enemy_valid = false
    @actor_valid = false
    @switch_valid = false
    @turn_a = 0
    @turn_b = 0
    @enemy_index = 0
    @enemy_hp = 50
    @actor_id = 1
    @actor_hp = 50
    @switch_id = 1
  end
  attr_accessor :turn_ending
  attr_accessor :turn_valid
  attr_accessor :enemy_valid
  attr_accessor :actor_valid
  attr_accessor :switch_valid
  attr_accessor :turn_a
  attr_accessor :turn_b
  attr_accessor :enemy_index
  attr_accessor :enemy_hp
  attr_accessor :actor_id
  attr_accessor :actor_hp
  attr_accessor :switch_id
end


class RPG::Animation
  def initialize
    @id = 0
    @name = ''
    @animation1_name = ''
    @animation1_hue = 0
    @animation2_name = ''
    @animation2_hue = 0
    @position = 1
    @frame_max = 1
    @frames = [RPG::Animation::Frame.new]
    @timings = []
  end
  def to_screen?
    @position == 3
  end
  attr_accessor :id
  attr_accessor :name
  attr_accessor :animation1_name
  attr_accessor :animation1_hue
  attr_accessor :animation2_name
  attr_accessor :animation2_hue
  attr_accessor :position
  attr_accessor :frame_max
  attr_accessor :frames
  attr_accessor :timings
end


class RPG::Animation::Frame
  def initialize
    @cell_max = 0
    @cell_data = Table.new(0, 0)
  end
  attr_accessor :cell_max
  attr_accessor :cell_data
end


class RPG::Animation::Timing
  def initialize
    @frame = 0
    @se = RPG::SE.new('', 80)
    @flash_scope = 0
    @flash_color = Color.new(255,255,255,255)
    @flash_duration = 5
  end
  attr_accessor :frame
  attr_accessor :se
  attr_accessor :flash_scope
  attr_accessor :flash_color
  attr_accessor :flash_duration
end


class RPG::System
  def initialize
    @game_title = ''
    @version_id = 0
    @japanese = true
    @party_members = [1]
    @currency_unit = ''
    @elements = [nil, '']
    @skill_types = [nil, '']
    @weapon_types = [nil, '']
    @armor_types = [nil, '']
    @switches = [nil, '']
    @variables = [nil, '']
    @boat = RPG::System::Vehicle.new
    @ship = RPG::System::Vehicle.new
    @airship = RPG::System::Vehicle.new
    @title1_name = ''
    @title2_name = ''
    @opt_draw_title = true
    @opt_use_midi = false
    @opt_transparent = false
    @opt_followers = true
    @opt_slip_death = false
    @opt_floor_death = false
    @opt_display_tp = true
    @opt_extra_exp = false
    @window_tone = Tone.new(0,0,0)
    @title_bgm = RPG::BGM.new
    @battle_bgm = RPG::BGM.new
    @battle_end_me = RPG::ME.new
    @gameover_me = RPG::ME.new
    @sounds = Array.new(24) { RPG::SE.new }
    @test_battlers = []
    @test_troop_id = 1
    @start_map_id = 1
    @start_x = 0
    @start_y = 0
    @terms = RPG::System::Terms.new
    @battleback1_name = ''
    @battleback2_name = ''
    @battler_name = ''
    @battler_hue = 0
    @edit_map_id = 1
  end
  attr_accessor :game_title
  attr_accessor :version_id
  attr_accessor :japanese
  attr_accessor :party_members
  attr_accessor :currency_unit
  attr_accessor :skill_types
  attr_accessor :weapon_types
  attr_accessor :armor_types
  attr_accessor :elements
  attr_accessor :switches
  attr_accessor :variables
  attr_accessor :boat
  attr_accessor :ship
  attr_accessor :airship
  attr_accessor :title1_name
  attr_accessor :title2_name
  attr_accessor :opt_draw_title
  attr_accessor :opt_use_midi
  attr_accessor :opt_transparent
  attr_accessor :opt_followers
  attr_accessor :opt_slip_death
  attr_accessor :opt_floor_death
  attr_accessor :opt_display_tp
  attr_accessor :opt_extra_exp
  attr_accessor :window_tone
  attr_accessor :title_bgm
  attr_accessor :battle_bgm
  attr_accessor :battle_end_me
  attr_accessor :gameover_me
  attr_accessor :sounds
  attr_accessor :test_battlers
  attr_accessor :test_troop_id
  attr_accessor :start_map_id
  attr_accessor :start_x
  attr_accessor :start_y
  attr_accessor :terms
  attr_accessor :battleback1_name
  attr_accessor :battleback2_name
  attr_accessor :battler_name
  attr_accessor :battler_hue
  attr_accessor :edit_map_id
end


class RPG::System::Vehicle
  def initialize
    @character_name = ''
    @character_index = 0
    @bgm = RPG::BGM.new
    @start_map_id = 0
    @start_x = 0
    @start_y = 0
  end
  attr_accessor :character_name
  attr_accessor :character_index
  attr_accessor :bgm
  attr_accessor :start_map_id
  attr_accessor :start_x
  attr_accessor :start_y
end


class RPG::System::Terms
  def initialize
    @basic = Array.new(8) {''}
    @params = Array.new(8) {''}
    @etypes = Array.new(5) {''}
    @commands = Array.new(23) {''}
  end
  attr_accessor :basic
  attr_accessor :params
  attr_accessor :etypes
  attr_accessor :commands
end


class RPG::System::TestBattler
  def initialize
    @actor_id = 1
    @level = 1
    @equips = [0,0,0,0,0]
  end
  attr_accessor :actor_id
  attr_accessor :level
  attr_accessor :equips
end
