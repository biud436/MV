@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

node ..\..\Windows\ToolManager\mvtools.js "playGame.bat" "Play Game for ES5" "Play Game for ES5" %~dp0

ECHO -- Added!

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF