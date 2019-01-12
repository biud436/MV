
## 소개
Ghost Effect 플러그인은 캐릭터에 아래 스크린샷/동영상과 같은 효과를 만드는 플러그인입니다. 

**플러그인은 WebGL 환경에서만 동작합니다.**

## 동영상
[![Video Label](http://img.youtube.com/vi/GkPUvGcC1Zc/0.jpg)](https://youtu.be/GkPUvGcC1Zc?t=0s)l

## 사용법

이동 루트의 설정에서 다음 코드를 호출하십시오. 다음 코드를 호용하면 고스트 효과를 내기 시작하며,

```javascript
this.ghostModeOn();
```

다음 코드를 호출하면 고스트 효과가 나오지 않습니다.

```javascript
this.ghostModeOff();
```

## 플러그인 명령

이펙트는 주기적으로 패턴이 바뀌며, 이 주기는 1000분의 100 초로, 밀리세컨드 단위이므로 1000이 1초입니다. 기본 값은 100ms 입니다.

```javascript
GhostEffect lifetime 100
```

임계치가 1에 가까워지면, 효과가 감소합니다. 반대로 0에 가까워지면 효과가 증가합니다.

```javascript
GhostEffect threshold 0.7
```

0.0에 가까울 수록, 종이가 찢어지는 듯한 느낌이 나게 됩니다. 하지만 종이가 찢어지는 느낌은 아닙니다. 확대된 캐릭터가 블렌딩 모드로 들어가 있는 데 절묘하게 착시를 일으키는 것입니다.

```javascript
GhostEffect xoffset 0.07
```


## 다운로드
[Download1](https://github.com/biud436/MV/raw/master/RS_GhostEffect.js) - 소스 코드 보기

<a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/biud436/MV/blob/master/RS_GhostEffect.js" target="_blank">Download2</a> - 직접 다운로드


## 버전 로그
2019.01.19 (v1.0.0) - First Release.