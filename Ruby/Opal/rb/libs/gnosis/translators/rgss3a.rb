require 'gnosis/translators/key'
require 'gnosis/translators/rgssad'
require 'gnosis/translators/rgssad/invalid_archive_error'

module Gnosis
  module Translators
    # Provides a translator for RGSS3A encrypted archives as used by RPG Maker
    # VX Ace. This class provides the implementation-specific {#scan_files}
    # method as used by an {Archive Archive} instance.
    class RGSS3A < RGSSAD
      # @raise [InvalidArchiveError] if the parent object's archive is not a
      #   valid RGSS3A encrypted archive
      # @param [Archive] parent the archive which contains this translator
      def initialize(parent)
        unless File.read(parent.archive, 8).unpack('a6U*').join == 'RGSSAD03'
          raise InvalidArchiveError, parent.archive
        end
        @parent = parent
      end
      
      # Builds a hash of file information stored in an encrypted archive. Keys
      # are filenames, values contain a hash of information regarding file
      # encryption (namely its position in the archive, size in bytes, and the
      # subkey needed to decrypt the file).
      # 
      # @return [Hash{String => Hash{Symbol => Number}}] a hash of files with
      #   associated encryption information
      def scan_files
        hash = {}
        File.open(@parent.archive) do |archive|
          archive.seek(8) # Skip archive version information.
          key = (archive.read(4).unpack('V').first * 9 + 3) & 0xFFFFFFFF
          loop do
            info = archive.read(16).unpack('V4').map { |i| i ^ key }
            break if info.first.zero?
            file = translate_file(archive.read(info[3]), key)
            hash[file] = { position: info[0], size: info[1], subkey: info[2] }
          end
        end
        hash
      end
      
      private
      # Translates an encrypted binary filename within the archive to a UTF-8
      # string.
      # 
      # @param [String] bytes string of encrypted bytes
      # @param [Number] key subkey used to decrypt the given bytes
      # @return [String] a decrypted UTF-8 string
      def translate_file(bytes, key)
        bytes.scan(/.{1,4}/m).map! do |word|
          [word.ljust(4, "\x00").unpack('V')[0] ^ key].pack('V')[0...word.size]
        end.join.force_encoding('utf-8').gsub!(/\\/, '/')
      end
      
      # Overwrite of {RGSSAD#translate_int} to raise a `NotImplementedError`,
      # as RGSS3A archives do not make use of this method.
      # 
      # @param [String] bytes string of encrypted bytes
      # @raise [NotImplementedError] if called
      def translate_int(bytes)
        raise NotImplementedError, 'RGSS3A archives do not use encrypted ints'
      end
    end
  end
end