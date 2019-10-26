@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

set ARGS1=%~dp1
ECHO Current Path : %~dp0
set FILE=%~dp0nw.exe

ECHO RUN INDEX FILE : %ARGS1%index.html
%~dp0nw.exe --url=%ARGS1%index.html

@ENDLOCAL
GOTO :EOF

:ERR
ECHO %ERRORMSG%
GOTO :EOF