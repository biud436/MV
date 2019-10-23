# 사용 방법

```add.bat``` 파일을 열고, ```C:/Users/U/Desktop/MV/Windows/vscode``` 부분을 수정해주세요.

```cmd
@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

node ..\ToolManager\mvtools.js "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"

ECHO -- Added!

@ENDLOCAL
GOTO :EOF
PAUSE >NUL

:ERR
ECHO %ERRORMSG%
PAUSE >NUL
GOTO :EOF
```

그 후, ```add.bat``` 파일을 누르면 RPG Maker MV에 VSCode를 실행할 수 있는 툴바가 새로 생깁니다.

Windows에서만 사용이 가능하며, Visual Studio Code가 컴퓨터에 설치되어있어야 합니다.

vscode.bat 파일은 단순 배치 파일로 Visual Studio Code를 실행하는 역할을 합니다.

```
@SETLOCAL enableextensions enabledelayedexpansion
@ECHO OFF

set ARGS1=%~p1
WHERE "code.cmd">nul 2>nul
IF NOT %errorlevel%==0 (
	SET ERRORMSG=Could not find VS Code
	GOTO :ERR
)
code -n %ARGS1%

@ENDLOCAL
GOTO :EOF

:ERR
ECHO %ERRORMSG%
GOTO :EOF
```