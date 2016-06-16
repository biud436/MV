package com.terrace.libgdx.android;

import android.os.Bundle;

import com.badlogic.gdx.backends.android.AndroidApplication;
import com.badlogic.gdx.backends.android.AndroidApplicationConfiguration;
import com.badlogic.gdx.ApplicationAdapter;
import com.terrace.libgdx.LibgdxActivity;

public class AndroidLauncher extends AndroidApplication {
	@Override
	protected void onCreate (Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		ApplicationAdapter gameInstance = LibgdxActivity.mainGame;

		if (gameInstance == null) {
			throw new RuntimeException("Game instance isn't set. Please assign an instance of ApplicationAdapter to LibgdxActivity.mainGame.");
		}

		/*AndroidApplicationConfiguration config = new AndroidApplicationConfiguration();
		config.width = gameWidth;
		config.height = gameHeight;*/
		initialize(gameInstance, new AndroidApplicationConfiguration());
	}
}
