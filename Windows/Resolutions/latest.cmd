@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

cmd /c npm install

set ARGS1=%1
set TOOl=nw-gyp

if "%ARGS1%" == ""  (
    set ARGS1="0.31.2"
) else (
    set ARGS1=v1.2.0
    set TOOl=node-gyp 
)

cmd /c %TOOl% configure --target=%ARGS1% --arch=x64
cmd /c %TOOl% build --target=%ARGS1% --arch=x64
cmd /c %TOOl% configure --target=%ARGS1% --arch=ia32
cmd /c %TOOl% build --target=%ARGS1% --arch=ia32

@ENDLOCAL
GOTO :EOF
PAUSE >NUL