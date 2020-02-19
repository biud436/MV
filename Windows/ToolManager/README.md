# How to use
Before starting this tool, you must run as belows.

```bat
npm install
```

This tool has four command line options. 

```bat
npm run mvtools /download <version> <project_dir>
npm run mvtools /run <version> <project_dir>
npm run mvtools /add appName hint name filePath
npm run mvtools /remove appName
```

For example, try this

```
npm run mvtools /download v0.44.1 E:/Games/201907
npm run mvtools /run v0.44.1 E:/Games/201907
npm run mvtools /add "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"
npm run mvtools /remove "vscode.bat"
```