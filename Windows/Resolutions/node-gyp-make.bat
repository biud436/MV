@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

SET CURRENT_DIR=%cd%

:NODE_READY
WHERE "node">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=
	GOTO :ERR
)
ECHO .

:NODE_GYP_READY
WHERE "node-gyp">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=Could not find node-gyp
	GOTO :ERR
)
ECHO === node-gyp is ready [OK]
ECHO .

:PACKAGE_JSON_READY
WHERE "package.json">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=Could not find package.json
	GOTO :ERR
)
ECHO === package.json is ready [OK]
ECHO .

:BINDING_GYP_READY
WHERE "binding.gyp">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=Could not find binding.gyp
	GOTO :ERR
)
ECHO === binding.gyp is ready [OK]
ECHO .
ECHO Installing...
ECHO .

WHERE "package-lock.json">nul 2>nul
IF NOT %errorlevel%==0 (
	npm install
)

CHOICE /C YN -M "Is RPG Maker MV version 1.5.2 or less?"
IF %ERRORLEVEL%==1 (
SET MV_VERSION=v1.2.0
) ELSE (
SET MV_VERSION=v10.4.1
)

ECHO .

node -p -e "process.arch">nul 2>nul >arch.txt
SET /p ARCH=0<arch.txt
ECHO .
ECHO === checking arch: %ARCH%

WHERE "arch.txt">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ARCH=ia32
)

DEL arch.txt

CHOICE /C YN -M "Select a command (Y: configure / N: build)"
IF %ERRORLEVEL%==1 (
	GOTO :CONFIGURE
) ELSE (
	GOTO :BUILD
)

:CONFIGURE
ECHO .
cmd /c node-gyp configure --target=%MV_VERSION% --arch=%ARCH%
ECHO .

:BUILD
CHOICE /C YN -M "Do you want to build the library?"
IF %ERRORLEVEL%==1 (
	node-gyp build
	ECHO .
	PAUSE >NUL
) ELSE (
	GOTO :EOF
)

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF