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
SET MV_VERSION="0.12.3"
) ELSE (
SET MV_VERSION="0.30.2"
)

ECHO .

:CONFIGURE
ECHO .
cmd /c nw-gyp configure --target=%MV_VERSION% --arch=ia32
ECHO ---finished configure ia32
cmd /c nw-gyp build --target=%MV_VERSION% --arch=ia32
ECHO ---finished build ia32
cmd /c nw-gyp configure --target=%MV_VERSION% --arch=x64
ECHO ---finished configure x64
cmd /c nw-gyp build --target=%MV_VERSION% --arch=x64
ECHO ---finished build x64
ECHO ---completed

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF