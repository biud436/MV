@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

cmd /c npm install

cmd /c nw-gyp configure --target="0.30.2" --arch=x64
cmd /c nw-gyp build --target="0.30.2" --arch=x64
cmd /c nw-gyp configure --target="0.30.2" --arch=ia32
cmd /c nw-gyp build --target="0.30.2" --arch=ia32

@ENDLOCAL
GOTO :EOF
PAUSE >NUL