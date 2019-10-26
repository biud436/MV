@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

node ..\..\Windows\ToolManager\mvtools.js "playGame.bat" "Play Game for ES5" "Play Game for ES5" "C:/Users/U/Desktop/MV/nwjs/nwjs-v0.12.3-win-ia32"

ECHO -- Added!

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF