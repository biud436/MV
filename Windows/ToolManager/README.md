# How to use
While Node.js is great package, it is hard to handle the registry without installing extra node library. Python is easier to use, it is included many functions so this script is used a Python to handle registry using child process. Accordingly, To use this, you need to install the ```Python 2.7``` or ```Python 3.8.1``` and need to do PATH settings.

To add a new tool, you have to call at the following in the command prompt. 

```cmd
node mvtool.js appName hint name path
```

This script has four arguments. The first one indicates the name of tool file included extension and the second one is the hint message of it and third one is the name of the tool that shows to the task bar and last one is the full path of the tool file. You must enter argument inside double quotes and each arguments are separated by a space character. **Note the double quotes around the argument.** For example, as follows.

```cmd
node mvtools.js "NewResourceManager.exe" "투명도 설정을 위한 리소스 관리자" "New Resource Manager" "C:/Users/U/Desktop/MV/Windows/NewResourceManager"
```

if you want to read already registered tools, you can do as follows.

```cmd
node mvtools.js
```

if your system is installed only python, You can do as follows.

```cmd
python get_mv_tools.py "rw" "vscode.bat" "Run VS Code" "Visual Studio Code" "C:/Users/U/Desktop/MV/Windows/vscode"
```