# LibGDX + Ruboto = JRuby Android Game

This is a sample of how to integrate libGDX (1.6.1) with Ruboto (1.3.0). The aim is only to get things working, with as much code on the Java side as possible.

This project used to feed into [Terrace](http://github.com/ashes999/terrace), but branched off. (Terrace requires a shared/common repository structure, whereas this repository is intended to be standalone.)

# Running this sample

- Edit `src/terrace_game.rb`. Change whatever you want (eg. background colour, sprite position)
- Run `rake debug`
- Deploy `bin/Libgdx-debug.apk` to your Android device/emulator.
- Rejoice.

# How this Repository Works

LibGDX is an all-Java solution. Ruboto provides APK packaging and JRuby exection of code that can connect to Java code. Putting two and two together, we extract libGDX's core/main game class into Ruby code, and execute it, leaving the rest of the stack a Java stack.

Specifically, the current libGDX project setup creates a `Core` module (which contains the common game, with the game logic in it), and separate per-platform launchers, such as `Desktop` and `Android`. These launchers are thin wrappers that just launch the core game logic, on their respective platforms.

This repository contains, essentially, the `Android` platform launcher, with a Ruby game class from `Core`. We create the core class in Ruby code, then pass it to the Java side (through a static variable currently).

# How this Repo was Made

There are other repositories that demonstrate integration (not for Android), but which are now dead. Here's what we did to make this work:

- Get libGDX working on Android
- Get libGDX working for Desktop with JRuby
- Create a new Ruboto project
- Copy over all required JAR files and `.so` files from the `Android` project (and Gradle/Maven repositories) into `libs`. This list depends on if you  need box2d or not
- Copy over the `assets` directory from the Core project
- Copy the relevant Core and Android `Launcher` and `Game` classes into `src`
- Update `AndroidManifest.xml` to launch the `AndroidLauncher` activity
- Run `rake debug` and test on an emulated device
