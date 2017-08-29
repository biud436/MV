# How to build the file called 'WindowManager.cc'

```shell
nw-gyp configure --target=0.12.3 --target-arch=ia32
nw-gyp build --target=0.12.3 --target-arch=ia32
```
# How to build the file called 'WindowManager.cpp'
On Windows platform, You should run the compiler called 'Visual Studio Command Line' and move the folder with your project folder and try this.

```shell
cl /W3 /EHsc WindowManager.cpp /link user32.lib kernel32.lib
```
