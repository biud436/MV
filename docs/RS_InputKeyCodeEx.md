## 소개 ##
스크립트 커맨드나 조건 분기 명령의 스크립트 란에서 전체키를 사용합니다. 

대소문자를 구분합니다.

```javascript
Input.isTriggered('a')
Input.isTriggered('ㄲ') // 한글 사용 가능
Input.isTriggered('?')
Input.isTriggered('{')
Input.isTriggered('[')
Input.isTriggered('F1') // F1 키
Input.isTriggered('#')
Input.isTriggered('%')
Input.isTriggered('ㅁ')
```

