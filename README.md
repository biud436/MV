# Introduction
This plugin package includes helpful features to get you on your way to create your game in RPG Maker MV.

# Documentation
This describes how to use the plugin that didn't list in the my website.

|Link|Description|
|--|--|
|[RS_MessageSystem.md](./docs/RS_MessageSystem.md)|(RPGMV v1.6.2 or above)|

# To do list (할 일)
삶의 압박으로 인해 오래 전부터 저는 새로운 플러그인 개발은 뒷전이었고 이미 배포한 플러그인의 버그 해결과 리팩토링에 집중하고 있습니다. 그러나 이것도 쉽지 않은 일이라 차근차근 풀어가고 있습니다.

|Name|Summary|
|--|--|
|RS_HangulBitmapText.js|(Optimization Required) 색상 변경 기능을 구현하기 위해 Bitmap을 사용하였습니다. 하지만 비트맵 방식은 최적화에 좋지 않습니다. Sprite Sheet와 Shader(Filter)를 통한 색상 데이터 전달 방식으로 변경해야 합니다.|
|RS_Inventory.js| - 툴팁를 구현하고 리소스 변경하기 <br> - 아이템을 사용했을 때 칸이 재정렬되는 문제 수정하기 |
|RS_ArabicMessageSystem.js|(Optimization Required)|
|RS_MessageEffects.js|(Optimization Required) 셰이더를 통해 입력 데이터만 전달하는 방식으로 변경해야 합니다.|
|JGSSAD|암호화 방식을 RPG Maker VX Ace와 비슷하게 변경하는 프로젝트를 생각 중에 있습니다.|
|node-canvas로 변경|기존의 canvas를 <a href="https://github.com/Automattic/node-canvas">node-canvas</a>로 변경해보려고 합니다|

# To send feedback
If you have feedback to send me, please write your feedback at the following site.
- [My Blog](http://biud436.tistory.com/notice/21)
- [Issues](https://github.com/biud436/MV/issues)

# How to clone

```sh
git clone --recursive https://github.com/biud436/MV.git
cd MV
```

# Credit and Thanks
Biud436 (Not Required)

# Terms of Use
Free for commercial and non-commercial use.

# License
The MIT License (MIT)
