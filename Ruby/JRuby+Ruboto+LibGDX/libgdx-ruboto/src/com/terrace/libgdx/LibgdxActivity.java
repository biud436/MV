package com.terrace.libgdx;

import com.badlogic.gdx.ApplicationAdapter;

public class LibgdxActivity extends org.ruboto.EntryPointActivity {
  /// We use static to pass in stuff from Ruby to Java. It's primitive.

  // The core instance of our game. This is instantiated in Ruby and passed in.
  public static ApplicationAdapter mainGame;
}
