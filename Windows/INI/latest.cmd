@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

cmd /c npm install

REM set FILENAME=%~f0
set ARGS1=%1

if "%ARGS1%" == ""  (
    set ARGS1="0.30.2"
)

cmd /c nw-gyp configure --target=%ARGS1% --arch=x64
cmd /c nw-gyp build --target=%ARGS1% --arch=x64
cmd /c nw-gyp configure --target=%ARGS1% --arch=ia32
cmd /c nw-gyp build --target=%ARGS1% --arch=ia32

REM if "%ARGS1%" == "0.30.2"  (
REM     set ARGS1="0.12.3"
REM ) else (
REM     set ARGS1="0.30.2"
REM )

REM FILENAME ARGS1

@ENDLOCAL
GOTO :EOF
PAUSE >NUL