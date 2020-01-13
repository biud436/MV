# Introduction
암호화된 리소스 파일을 원상 복구시키는 유틸입니다. ```rpgmvp, rpgmvo, rpgmvm, rpgmvw``` 파일을 각각 ```png, ogg, m4a, wav``` 파일로 되돌립니다. 

본 프로그램은 ```RPG Maker MV```로 제작된 게임의 암호화를 해제하는 기능을 가집니다. 본 도구는 게임을 출시한 후, 컴퓨터 포맷으로 프로젝트 파일이 날아가신 분들을 위해 만들었습니다. 하지만 ```Enigma Virtual Box```나 ```copy /b Game.exe+app.nw MyGame.exe```과 같이 자기 자신을 압축하는 방식의 경우, 암호화 해제를 지원하지 않습니다. 물론 이러한 파일들도 원칙적으로 실행할 때 압축 해제를 합니다(<a href="https://biud436.blog.me/220834839586" target="_blank">참고 : https://biud436.blog.me/220834839586</a>)

별도로 빌드된 상태에서는 명령 프롬프트를 열고 다음 인수를 필수로 전달해야 합니다.

```batch
 decrypter <PROJECT_PATH>
```

index.html 파일이 위치한 곳에 decrypter.exe 파일을 복사한 경우에는 그냥 decrypter 파일을 실행하세요.

```Node.js```로 직접 파일을 실행하려는 경우에는 다음과 같이 해야 합니다.

```batch
node index.js C:\Users\U\Desktop\Exam2\201907
```

이때 노드로 실행하는 경우에는 명령 프롬프트의 현재 디렉토리 위치에 따라 index.js 파일의 경로를 달리 해야 합니다.

```<PROJECT_PATH>```에는 Windows 기반의 프로젝트 경로 또는 Unix, Posix 기반의 경로를 기입해야 합니다.

wav 파일은 본래 지원을 하는 파일이 아니지만, 필자가 만든 ```RS_WaveSupport.js```나 ```RS_WavFileEncrypter.js```에서 wav 파일을 지원하므로 이를 감안하여 추가한 것입니다.