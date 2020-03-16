# How to build
Before you are using this tool, you have to install the ```Node.js``` and then open the command line tool or power shell and then you should to move as current directory. This means a Root Game Directory that exists a file called Game.exe.

```cmd
npm install
mkdir bin
```

You start a file called ```build.bat``` after running called ```npm install```

# How to run
After build tool, You move as ```/bin``` folder using ```cd``` command and then you call below commands.

```cmd
cd bin
decrypter.exe -i="C:\Users\U\Desktop\Exam\201907" -d="Game.exe"
```

if the www folder is already existed, it doesn't need to use an option called ```\d=```, so you can pass a command in the command line, as follows.

```cmd
decrypter.exe -i="C:\Users\U\Desktop\몽환(夢幻) Ver 0.31"
```

A first argument is the ```Project Path``` that will decrypt and the second argument is to a name of the executable file. if the project is used an ```Enigma``` or ```NW-Self-Extraction```, you must pass the second parameter. if not, it doesn't need to pass it.

Note that this tool allows you to support that can decrypt files such as ```*.rpgmvp```, ```*.rpgmvo```, ```*.rpgmvm```, ```*.rpgmvw```

# Environment

## Decryptable files

- rpgmvp
- rpgmvo
- rpgmvm
- rpgmvw

## Enigma Virtual Box

- 9.40 Build 20191010 ( :mag_right: Uncompression of the file doesn't support. it is still analyzing)
- 9.50 Build 20200225

## NW-Self-Extraction

- Node Webkit v0.12.3
- Node Webkit v0.33.4