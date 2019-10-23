@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

set ARGS1=%~p1
WHERE "code.cmd">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=Could not find VS Code
	GOTO :ERR
)
code %ARGS1%

@ENDLOCAL
GOTO :EOF

:ERR
ECHO %ERRORMSG%
GOTO :EOF