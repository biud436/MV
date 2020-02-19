# How to use
To proceed with the installation, You must run the following command.

```bat
npm install
```

I recently added some features to this tool. This tool provides a few features such as downloading a node webkit, adding window registry, removing registry and running the game. command option called ```/download``` can perform downloading the file from nwjs.io server using ```Aria2``` or ```https``` module.

Using the ```Aria2c``` can be pretty fast downloading the file. But that's no problem even if you don't install ```Aria2c```. ```https``` module is also worked well.

```bat
npm run mvtools /download <version> <project_dir>
npm run mvtools /run <version> <project_dir>
npm run mvtools /add appName hint name filePath
npm run mvtools /remove appName
```

Here's an example.

```
npm run mvtools /download v0.44.1 E:/Games/201907
npm run mvtools /run v0.44.1 E:/Games/201907
npm run mvtools /add "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"
npm run mvtools /remove "vscode.bat"
```