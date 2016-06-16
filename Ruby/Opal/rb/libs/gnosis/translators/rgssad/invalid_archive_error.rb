module Gnosis
  module Translators
    class RGSSAD
      # Exception raised when the decrypter is initialized with an invalid
      # RGSSAD encrypted archive.
      class InvalidArchiveError < StandardError
        # @param [String] file the file which raised this exception
        # @param [String] message message to be written -- `file` is added to
        #   this message through `sprintf`
        def initialize(file, message = 'Invalid RGSSAD encrypted archive - %s')
          super(message % file)
        end
      end
    end
  end
end