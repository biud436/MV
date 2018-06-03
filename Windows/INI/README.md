# Descriptions
![msgbox](test/msgbox_test_161.PNG)

The preceding screenshot shows the message box such as RPG Maker VX Ace. These functions simply create the message box and check which of the button is clicked. put this script in your game's script command.

```javascript
var ret = RS.MSGBOX.yesno("안내", "게임을 종료하시겠습니까?");
var iconType = RS.MSGBOX.MB_TYPE.MB_OK | RS.MSGBOX.MB_TYPE.MB_ICONINFORMATION;
if(ret === RS.MSGBOX.MB_TYPE.IDYES) {
    RS.MSGBOX.open("안내", "예(YES) 버튼을 눌렀습니다.", iconType);
} else {
    RS.MSGBOX.open("안내", "아니오(NO) 버튼을 눌렀습니다.", iconType);
}
```

These functions simply create an INI file in Windows OS.

```javascript
RS.INI.writeString("appName", "keyName", "str", "fileName.ini");
var value = RS.INI.readString("appName", "keyName", "fileName.ini");
```

# Supports
This plugin works fine only in RPG Maker MV 1.6.1 or above. and then this is just one platform in mind.