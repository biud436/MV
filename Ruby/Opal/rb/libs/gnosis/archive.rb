require 'gnosis/translators'

module Gnosis
  # Representation of an encrypted RGSS archive. This class provides a layer of
  # abstraction over the archive itself, providing methods to help ease the
  # traversal of encrypted archives and allow in-memory decryption of their
  # contents.
  class Archive
    # Full path to the encrypted archive this class represents.
    # @return [String]
    attr_reader :archive
    
    # The translator instance in use by this archive representation.
    # @return [Translator]
    attr_reader :translator
    
    # Hash of files with associated encryption information.
    # @return [Hash{String => Hash{Symbol => Number}}]
    attr_reader :files
    
    # Instantiates a new {Archive Archive} representing an encrypted RGSS
    # archive.
    # 
    # @raise [InvalidArchiveError] if the given archive is invalid
    # @param [String] archive the relative path to an encrypted archive
    def initialize(archive)
      @archive    = File.expand_path(archive)
      @translator = Translators.class_for(self)
      @files      = @translator.scan_files
    end
    
    # Convenience method for obtaining an array of all encrypted files within
    # this RGSS archive representation.
    # 
    # @return [Array<String>] an array of files contained in the archive
    def contents
      @files.keys
    end
    
    # Convenience method for obtaining the number of encrypted files within
    # this RGSS archive representation.
    # 
    # @return [Number] the number of files contained in the archive
    def size
      contents.size
    end
    alias_method :length, :size
    
    # Returns the type of archive represented by this {Archive Archive}.
    # 
    # @return [String] the type of archive represented
    def type
      @translator.class.name.split(/::/).last
    end
    
    # Decrypts the given internal filename. The returned binary string may be
    # converted into an IO object in memory via the StringIO class present in
    # the Ruby standard library. Yields the decrypted binary data if a block is
    # given.
    # 
    # @example Decrypt to StringIO
    #   require 'stringio'
    #   archive = Gnosis::Archive.new('path/to/Game.rgss3a')
    #   io = StringIO.new(archive.decrypt('Graphics/Titles1/Title.png'))
    # 
    # @raise [Errno::ENOENT] if the given file does not exist in the archive
    # @param [String] file internal path of encrypted file
    # @return [String] the decrypted binary contents of the given file
    def decrypt(file)
      data = @translator.decrypt(file)
      yield data if block_given?
      data
    end
    
    # Search for files within the encrypted archive with a regular expression.
    # Yields the results of the given expression if a block is given.
    # 
    # @example Search with Regular Expression
    #   archive = Gnosis::Archive.new('path/to/Game.rgss3a')
    #   archive.search(/\.png$/) # => ["Graphics/Animations/Attack1.png", ... ]
    # 
    # @param [String, Regexp] expression substring or regular expression to
    #   match files against
    # @yield [result] an array of file names matching the given expression
    # @return [Array<String>] an array of file names matching the given
    #   expression
    # 
    # @see #glob
    def search(expression)
      result = @files.keys.select { |file| file[expression] }
      yield result if block_given?
      result
    end
    alias_method :match, :search
    
    # Search for files within the encrypted archive with optional shell-style
    # globbing. Yields the results of the given pattern if a block is given.
    # 
    # @note Globbing is performed via `File#fnmatch`.
    # 
    # @example Search with Globbing
    #   archive = Gnosis::Archive.new('path/to/Game.rgss3a')
    #   archive.glob('**/Title.png') # => ["Graphics/Titles1/Title.png"]
    # 
    # @param [String] pattern file name pattern
    # @yield [result] an array of file names matching the given pattern
    # @return [Array<String>] an array of file names matching the given pattern
    # 
    # @see http://www.ruby-doc.org/core-1.9.3/File.html#method-c-fnmatch
    #   File.fnmatch
    # @see #search
    def glob(pattern)
      pattern.force_encoding('utf-8')
      result = @files.keys.select { |file| File.fnmatch?(pattern, file) }
      yield result if block_given?
      result
    end
    
    # A representation of this {Archive Archive} as a string.
    # 
    # @return [String] representation of this {Archive Archive} as a string.
    def to_s
      "#{type} Archive: #{contents.size} files"
    end
    alias_method :inspect, :to_s
  end
end
