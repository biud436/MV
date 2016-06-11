require 'gnosis/archive'
require 'gnosis/translators'
require 'gnosis/version'

# Gnosis performs in-memory decryption of the contents of encrypted RGSSAD
# archives (as used by the RPG Maker series) to binary strings via a class
# representing the archive. Encrypted archives may be searched for specific
# contents which can then be decrypted to a string -- perfect for implementing
# custom Ruby game players by converting the binary string directly into an IO
# instance with the Ruby `StringIO` class present in the standard library.
# 
# @author Solistra <solistra@gmx.com>
module Gnosis
end