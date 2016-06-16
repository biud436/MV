require 'gnosis/translators/key'
require 'gnosis/translators/rgssad/invalid_archive_error'

module Gnosis
  module Translators
    # Provides a translator for RGSSAD encrypted archives as used by RPG Maker
    # XP and VX. This class provides the implementation-specific {#scan_files}
    # and {#decrypt} methods as used by an {Archive Archive} instance.
    class RGSSAD
      # @raise [InvalidArchiveError] if the parent object's archive is not a
      #   valid RGSSAD encrypted archive
      # @param [Archive] parent the archive which contains this translator
      def initialize(parent)
        unless File.read(parent.archive, 8).unpack('a6U*').join == 'RGSSAD01'
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
        @key  = Key.new
        File.open(@parent.archive) do |archive|
          archive.seek(8)
          loop do
            length = translate_int(archive.read(4)) rescue break
            file   = translate_file(archive.read(length)).gsub!(/\\/, '/')
            hash[file]          = { :position => archive.tell + 4 }
            hash[file][:size]   = translate_int(archive.read(4))
            hash[file][:subkey] = @key.current
            archive.seek(hash[file][:size], IO::SEEK_CUR)
          end
        end
        @key = nil
        hash
      end
      
      # Decrypts the given file in an encrypted archive, returning the original
      # binary data as a string.
      # 
      # @raise [Errno::ENOENT] if the given file does not exist in the parent
      #   {Archive} representation
      # @param [String] file internal path of encrypted file
      # @return [String] the decrypted binary contents of the given file
      def decrypt(file)
        raise Errno::ENOENT, file unless @parent.files[file]
        data = ''
        info = @parent.files[file]
        key  = Key.new(info[:subkey])
        size, remainder = (info[:size] / 4.0).ceil, info[:size] % 4
        
        File.open(@parent.archive) do |archive|
          archive.seek(info[:position])
          (1..size).each do |position|
            data << \
            if remainder > 0 && position == size
              bytes = archive.read(remainder)
              translate_data(bytes.ljust(4, "\x00"), key)[0...bytes.size]
            else
              translate_data(archive.read(4), key)
            end
            key.advance
          end
        end
        
        data
      end
      
      private
      # Translates encrypted binary data to decrypted binary data.
      # 
      # @note This method should only be given a string of four encrypted bytes
      #   in order to function properly. Alternative lengths produce undefined
      #   strings.
      # 
      # @param [String] bytes string of encrypted bytes
      # @param [Number] key subkey used to decrypt the given bytes
      # @return [String] string of decrypted bytes
      def translate_data(bytes, key)
        [bytes.unpack('V').first ^ key.current].pack('V')
      end
      
      # Translates an encrypted binary filename within the archive to a UTF-8
      # string.
      # 
      # @param [String] bytes string of encrypted bytes
      # @return [String] a decrypted UTF-8 string
      def translate_file(bytes)
        bytes.each_byte.map do |byte|
          result = (byte ^ @key.current & 0xFF).chr
          @key.advance
          result
        end.join.force_encoding('utf-8')
      end
      
      # Translates an encrypted binary integer to a native Ruby integer.
      # 
      # @param [String] bytes string of encrypted bytes
      # @return [Number] a decrypted native integer
      def translate_int(bytes)
        result = bytes.unpack('V').first ^ @key.current
        @key.advance
        result
      end
    end
  end
end