@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

SET CURRENT_DIR=%cd%

:JAVAC_READY
WHERE "javac.exe">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=JDK를 찾을 수 없습니다.
	GOTO :ERR
)
ECHO === JDK 준비됨 [OK]

:PYTHON_READY
WHERE "python.exe">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=파이썬을 찾을 수 없습니다
	GOTO :ERR
)
ECHO === 파이썬 준비됨 [OK]

:ANDROID_SDK_READY
WHERE "SDK Manager.exe">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=안드로이드 SDK를 찾을 수 없습니다.
	GOTO :ERR
)
ECHO === 안드로이드 SDK [OK]

:MAKE_APK_PY_READY
ECHO === make_apk.py 파일을 찾고 있습니다.
WHERE /R %HOMEPATH%\desktop make_apk.py >temp_path.txt 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=make_apk.py 파일을 찾을 수 없습니다
	GOTO :ERR
)

:SET_XWALK_PATH
SET /p TEMP_XWALK_PATH=0<temp_path.txt
DEL temp_path.txt
SET XWALK_PATH=%TEMP_XWALK_PATH%
ECHO === make_apk.py 준비됨 [OK]
SET /p PACKAGE=package name을 입력하세요(com.biud436.example.sample):
IF EXIST manifest.json (
	SET MANIFEST=manifest.json
) ELSE (
	SET ERRORMSG=manifest.json 파일을 찾을 수 없습니다.
	GOTO :ERR
)
ECHO === manifest.json 준비됨 [OK]
IF EXIST *.keystore (
	GOTO :FOUND_ALREADY_KEYSTORE
) ELSE (
	GOTO :NOT_FOUND
)

:FOUND_ALREADY_KEYSTORE
ECHO === 키스토어 파일 준비됨 [OK]
ECHO === 키스토어 파일을 찾고 있습니다.
WHERE /r %CURRENT_DIR% *.keystore >temp_path.txt 2>nul
SET /p KS_PATH=0<temp_path.txt
DEL temp_path.txt
ECHO %KS_PATH%파일을 찾았습니다.
SET /p KS_ALIAS=키스토어의 별칭을 입력하세요:
SET /p KS_PASSCODE=키스토어 비밀번호를 입력하세요(6자리이상):
SET /p KS_ALIAS_PASSCODE=키스토어 비밀번호를 다시 한 번 입력하세요(6자리이상):
GOTO :MAKE_APK

:NOT_FOUND

ECHO 키스토어 파일을 찾을 수 없었습니다.
CHOICE /C YN -M "키스토어 파일을 생성하시겠습니까?"
IF %ERRORLEVEL%==1 (
	GOTO :CREATE_KEYSTORE
) ELSE (
	GOTO :OTHER_KEYSTORE_SET
)

:CREATE_KEYSTORE

where keytool.exe>nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=keytool이 없으므로 키스토어 파일을 생성할 수 없습니다.
	GOTO ERR
)
SET /p KS_PATH=키저장소의 경로를 입력하세요(확장자는 keystore):
SET /p KS_ALIAS=키스토어의 별칭을 입력하세요:
SET /p KS_PASSCODE=키스토어 비밀번호를 입력하세요:
SET /P KS_ALIAS_PASSCODE=키스토어 비밀번호를 다시 한 번 입력하세요:
SET CN=%PACKAGE%
SET /P OU=조직 단위 이름을 입력하세요:
SET /P O=조직 이름을 입력하세요:
SET /P L=구/군/시 이름을 입력하세요:
SET /P S=시/도 이름을 입력하세요:
SET C=KR
keytool -genkey -v -keystore %KS_PATH% -alias %KS_ALIAS% -keyalg RSA -keysize 2048 -validity 10000 -keypass %KS_PASSCODE% -storepass %KS_ALIAS_PASSCODE% -dname "CN=%CN%,OU=%OU%,O=%O%,L=%L%,S=%S%,C=%C%"
GOTO :MAKE_APK

:OTHER_KEYSTORE_SET

SET /p KS_PATH=키 저장소의 경로를 입력하세요 (game.keystore):

IF NOT EXIST %KS_PATH% (
	SET ERRORMSG=키스토어 파일이 없습니다.
	GOTO :ERR
)
SET /p KS_ALIAS=키스토어의 별칭을 입력하세요:
SET /p KS_PASSCODE=키스토어 비밀번호를 입력하세요(6자리이상):	
SET /p KS_ALIAS_PASSCODE=키스토어 비밀번호를 다시 한 번 입력하세요(6자리이상):

:MAKE_APK
SET ARCH=arm
SET MODE=embedded
SET XCL='--ignore-gpu-blacklist'

%XWALK_PATH% --package=%PACKAGE% --manifest=%MANIFEST% --keystore-path=%KS_PATH% --keystore-alias=%KS_ALIAS% --keystore-passcode=%KS_PASSCODE% --keystore-alias-passcode=%KS_ALIAS_PASSCODE% --keep-screen-on --fullscreen --orientation=landscape --arch=%ARCH% --mode=%MODE% --xwalk-command-line=%XCL% --enable-remote-debugging

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF