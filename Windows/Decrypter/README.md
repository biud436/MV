# Introduction
Before you are using this tool, you have to install the ```Node.js``` and then open the command line tool or power shell and then you should to move as current directory. This means a Root Game Directory that exists a file called Game.exe.

```cmd
npm install
```

You start a file called ```build.bat``` after running called ```npm install``` and then you move as ```/bin``` folder using cd command and then you call below commands.

```cmd
decrypter.exe C:\Users\U\Desktop\Exam\201907 /d=Game.exe
```

A first argument is the ```Project Path``` that will decrypt and the second argument is to a name of the executable file. if the project is used an ```Enigma``` or ```NW-Self-Extraction```, you must pass the second parameter. if not, it doesn't need to pass it.

Note that This tool allows you to support that can decrypt files such as ```*.rpgmvp```, ```*.rpgmvo```, ```*.rpgmvm```, ```*.rpgmvw```