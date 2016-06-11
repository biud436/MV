require 'gnosis/translators/key'
require 'gnosis/translators/rgssad'
require 'gnosis/translators/rgss3a'

module Gnosis
  # Namespace containing classes which facilitate translation for various
  # archiving methods used by the RPG Maker series.
  module Translators
    # Attempts to locate an appropriate translator for the encrypted archive
    # belonging to the passed {Archive Archive} object. The passed archive
    # representation is automatically given to the translator as the parent
    # object for the translator.
    # 
    # @note This method determines the archive type independent of the file
    #   extension by reading the first 8 bytes of data contained within it.
    # 
    # @return [Translator] the appropriate translator instance for the archive
    #   type belonging to the parent {Archive Archive} object
    # @raise [InvalidArchiveError] if the archive belonging to the parent
    #   {Archive Archive} object is not a valid RGSS archive
    def self.class_for(parent)
      case File.read(parent.archive, 8).unpack('a6U2').join
      when 'RGSSAD03' ; RGSS3A.new(parent)
      when 'RGSSAD01' ; RGSSAD.new(parent)
      else            ; raise RGSSAD::InvalidArchiveError, parent.archive
      end
    end
  end
end