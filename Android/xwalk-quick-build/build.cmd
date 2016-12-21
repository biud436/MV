@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

SET XWALK_PATH=C:\Users\U\Desktop\crosswalk-10.39.235.16\crosswalk-10.39.235.16\make_apk.py
SET PACKAGE=com.biud436.example.sample
SET MANIFEST=manifest.json
SET KS_PATH=game.keystore
SET KS_ALIAS=game
SET KS_PASSCODE=android
SET KS_ALIAS_PASSCODE=android
SET ARCH=arm
SET MODE=embedded
SET XCL='--ignore-gpu-blacklist:--show-fps-counter'

%XWALK_PATH% --package=%PACKAGE% --manifest=%MANIFEST% --keystore-path=%KS_PATH% --keystore-alias=%KS_ALIAS% --keystore-passcode=%KS_PASSCODE% --keystore-alias-passcode=%KS_ALIAS_PASSCODE% --keep-screen-on --fullscreen --orientation=landscape --arch=%ARCH% --mode=%MODE% --xwalk-command-line=%XCL% --enable-remote-debugging

ENDLOCAL

PAUSE > NUL