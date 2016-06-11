module Gnosis
  module Translators
    # Representation of the key used to decrypt files in an encrypted archive.
    # The encryption method used by the RPG Maker series regularly mutates the
    # key in order to provide encryption; this class provides a simple way to
    # accurately manage these mutations.
    class Key
      # The current state of the encryption key.
      attr_accessor :key
      alias_method  :current, :key
    
      # Creates a new instance of {Key Key} with the given {#key key} as the
      # starting point for encryption.
      # 
      # @note The RPG Maker series uses `0xDEADCAFE` as the default starting
      #   point for the encryption key unless the project uses a custom
      #   encryption solution.
      def initialize(key = 0xDEADCAFE)
        @key = key
      end
    
      # Mutates the encryption key to facilitate advancement through the
      # archive this key belongs to.
      # 
      # @return [Fixnum] the next key sequence
      def advance
        @key = (@key * 7 + 3) & 0xFFFFFFFF
      end
      
      # Define common conversion methods; delegate these to @key.
      [:to_c, :to_enum, :to_f, :to_i, :to_int, :to_r, :to_s].each do |method|
        define_method(method) { @key.send(method) }
      end
    end
  end
end
