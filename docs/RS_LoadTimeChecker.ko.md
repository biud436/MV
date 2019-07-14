# Introduction
이 플러그인을 사용하면 화면에 지난 세이브 파일로부터 지난 시간을 텍스트로 표시하고, 시간에 따라 아이템이나 금전 같은 일정한 보상을 지급할 수 있습니다.

보상은 플러그인에 따로 정해져있지 않으며 코드를 작성하셔야 합니다. 작성된 코드는 사전에 지정한 위치에 삽입됩니다. 

따라서 day, hours, mins, seconds 지역 변수에 접근할 수 있고, 이를 통해 다양한 보상을 할 수 있습니다.

![IMAGE](./images/load_time_checker.png)

# Reward Option

day, hours, mins, seconds 와 같은 시간 변수를 활용하여 코드를 작성해 보상을 지급할 수 있습니다.

```js
// 1일 이상 지났을 때
if(day >= 1) {
  $gameParty.gainGold(1000 * day);
}
// 1시간이 지났을 때
if(hours >= 1) {
  $gameParty.gainGold(200 * hours);
}
// 30분 이상이 지났을 때
if(mins >= 30) {
  $gameParty.gainGold(100 * mins);
}
// 45초 이상이 지났을 때
if(seconds >= 45) {
  $gameParty.gainGold(50 * seconds);
}

```

# Download
링크 위에서 마우스 오른쪽 버튼을 눌러 **다른 이름으로 링크 저장** 버튼으로 파일을 저장한 후, js/plugins 폴더에 저장하세요. 그리고 플러그인 관리자에서 RS_LoadTimeChecker.js를 설정하십시오.

[다운로드 링크](https://github.com/biud436/MV/raw/master/RS_LoadTimeChecker.js)

# Change Log

```
2019.07.13 (v1.0.0) - First Release.
2019.07.14 (v1.0.1) :
- Fixed the bug. Now every 24 hours by default, the day variable will increase.
```