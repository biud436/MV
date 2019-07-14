# Introduction
This plugin allows you to check the time that has passed since last save and drawing its time text on the screen when loading the map. The text for time will be gone after a period of time and then you can put the code in a preset points and evaluate it. You can be also accessed a lot of local variables such as day, hours, mins, seconds and can give an user some rewards like as item, gold.

![IMAGE](./images/load_time_checker.png)

# Reward Option

You can put the code in a preset points and evaluate it so you can be also accessed a lot of local variables such as day, hours, mins, secondsand can give an user some rewards like as item, gold.

```js
if(day >= 1) {
  $gameParty.gainGold(1000 * day);
}
 
if(hours >= 1) {
  $gameParty.gainGold(200 * hours);
}
 
if(mins >= 30) {
  $gameParty.gainGold(100 * mins);
}
 
if(seconds >= 45) {
  $gameParty.gainGold(50 * seconds);
}

```

# Download
Download the plugin using the button called 'Save as link..' and place it in the folder called your_project_directory/js/plugins, then In Plugin Manager, Select RS_LoadTimeChecker.js plugin and add it.

[DOWNLOAD LINK](https://github.com/biud436/MV/raw/master/RS_LoadTimeChecker.js)

# Change Log

```
2019.07.13 (v1.0.0) - First Release.
2019.07.14 (v1.0.1) :
- Fixed the bug. Now every 24 hours by default, the day variable will increase.
```