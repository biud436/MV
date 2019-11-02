@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

set ARGS1=%~dp1
ECHO Current Path : %~dp0

ECHO RUN INDEX FILE : %ARGS1%index.html
%~dp0nw.exe --nwapp --url=%ARGS1%index.html?test

@ENDLOCAL
GOTO :EOF

:ERR
ECHO %ERRORMSG%
GOTO :EOF