@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

node ..\ToolManager\mvtools.js "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"

ECHO -- Added!

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF