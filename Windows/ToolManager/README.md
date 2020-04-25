# How to use
To proceed with the installation, You must run the following command.

```bat
npm install
```

I recently added some features to this tool. This tool provides a few features such as downloading a node webkit, adding window registry, removing registry and running the game. command option called ```/download``` can perform downloading the file from nwjs.io server using ```Aria2``` or ```https``` module.

Using the ```Aria2c``` can be pretty fast downloading the file. But that's no problem even if you don't install ```Aria2c```. ```https``` module is also worked well.

Here's an example.

```
npm run download -- -v="v0.45.4" -p=E:/Games/201907 -f
npm run play -- -v=v0.45.4 -p=E:/Games/201907
npm run add "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"
npm run remove "vscode.bat"
```

after downloaded node webkit, you must run the file called add.bat, as follows.

![VIEW0](https://i.imgur.com/OPZzgRW.png)

When you run the batch file, folders are automatically created for the extension tool.

The icon image will be created automatically after executing the command called ```npm run mvtools /add "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"```, as follows. (If the character is a blank character, the character should be enclosed in double quotes)

![VIEW1](https://i.imgur.com/aocOXfW.png)

its text starts with 'vs' if you passed the name text called 'vscode'.

![VIEW2](https://i.imgur.com/H634UOp.png)