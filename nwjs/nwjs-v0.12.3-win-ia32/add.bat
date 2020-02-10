@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

WHERE "python">nul 2>nul
IF %errorlevel%==0 (
python ..\..\Windows\ToolManager\get_mv_tools.py "rw" "playGame.bat" "Play Game for ES5" "Play Game for ES5" %~dp0
GOTO :EOF
)

WHERE "node">nul 2>nul
IF %errorlevel%==0 (
node ..\..\Windows\ToolManager\mvtools.js "playGame.bat" "Play Game for ES5" "Play Game for ES5" %~dp0
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