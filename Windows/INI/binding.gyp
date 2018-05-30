{
  "targets": [
    {
      "target_name": "INI",
      "sources": [ "src/INI.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]	  
    }
  ]
}