@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

WHERE "python">nul 2>nul
IF %errorlevel%==0 (
python ..\ToolManager\get_mv_tools.py "rw" "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"
GOTO :EOF
)

WHERE "node">nul 2>nul
IF %errorlevel%==0 (
node ..\ToolManager\mvtools.js "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"	
GOTO :EOF
) ELSE (
    GOTO :ERR
)

ECHO -- Added!

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF