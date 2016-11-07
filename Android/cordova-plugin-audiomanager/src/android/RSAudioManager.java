
package org.apache.cordova.audiomanager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.res.AssetManager;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.media.AudioManager;
import android.media.SoundPool;
import android.os.SystemClock;

public class RSAudioManager extends CordovaPlugin {

	//========================================================================================================
	// Constants
	//========================================================================================================

	// BGM, BGS.
	private final MediaPlayer mBGMPlayer;
	private final MediaPlayer mBGSPlayer;

	// Position Variables.
	private final int nBGMCurrentPosition;
	private final int nBGSCurrentPosition;

	// SE, ME.
	private final AudioManager audioManager;
	private final SoundPool soundPool;

	private final int MAX_SOUNDS = 20;

	//========================================================================================================
	// Member Variables
	//========================================================================================================

	// File Descripter
	private int fdLastSoundFile;
	private int streamId;
	private String selectedSoundFile = "Cursor1.ogg";

	//========================================================================================================
	// Constructor
	//========================================================================================================

	public RSAudioManager() {}

	@Override
	void pluginInitialize() {
		nBGMCurrentPosition = 0;
		nBGSCurrentPosition = 0;
		mBGMPlayer = new MediaPlayer();
		mBGSPlayer = new MediaPlayer();
		soundPool = new SoundPool(RSAudioManager.MAX_SOUNDS, AudioManager.STREAM_MUSIC, 0);
		audioManager = (AudioManager)getSystemService(getApplicationContext().AUDIO_SERVICE);
	}

	//========================================================================================================
	// Cordova
	//========================================================================================================

	public Context getCordovaBaseContext() {
		return cordova.getActivity().getBaseContext();
	}

	public void startWithUIThread(Runnable runnable) {
		this.cordova.getActivity().runOnUiThread(runnable);
	}

	//========================================================================================================
	// Get Path
	//========================================================================================================

	public String getBGMPath(String fileName) {
		String preLocalPath = "www/audio/BGM/";
		String compLocalPath = preLocalPath.concat(fileName);
		return compLocalPath;
	}

	public String getBGSPath(String fileName) {
		String preLocalPath = "www/audio/BGS/";
		String compLocalPath = preLocalPath.concat(fileName);
		return compLocalPath;
	}

	//========================================================================================================
	// BGM Methods
	//========================================================================================================

	public void playBGM(String fileName) {

		// load audio data
		String compLocalPath = this.getBGMPath(fileName);
		AssetManager assetManager = getAssets();
		AssetFileDescriptor assetFd = assetManager.openFd(compLocalPath);

		// free previous audio data
		mBGMPlayer.release();

		// prepare audio data
		mBGMPlayer.setDataSource(assetFd.getFileDescriptor(), assetFd.getStartOffset(), assetFd.getLength());
		mBGMPlayer.prepare();
		mBGMPlayer.setLooping(true);

		// play BGM
		mBGMPlayer.start();

	}

	public void pauseBGM() {
		try {
			if( mBGMPlayer && mBGMPlayer.isPlaying() ) {
				this.nBGMCurrentPosition = mBGMPlayer.getCurrentPosition();
				mBGMPlayer.pause();
			} else {
				if(mBGMPlayer != null) mBGMPlayer.start();
			}

		} catch(Exception e) {
			cordova.LOG.e(e);
		}

	}

	public void stopBGM() {
		try {
			if( mBGMPlayer && mBGMPlayer.isPlaying() ) {
				mBGMPlayer.seekTo(0);
				mBGMPlayer.stop();
			} else {

			}

		} catch(Exception e) {
			cordova.LOG.e(e);
		}
	}

	//========================================================================================================
	// BGS Methods
	//========================================================================================================

	public void playBGS(String fileName) {

		// load audio data
		String compLocalPath = this.getBGMPath(fileName);
		AssetManager assetManager = getAssets();
		AssetFileDescriptor assetFd = assetManager.openFd(compLocalPath);

		// free previous audio data
		mBGMPlayer.release();

		// prepare audio data
		mBGMPlayer.setDataSource(assetFd.getFileDescriptor(), assetFd.getStartOffset(), assetFd.getLength());
		mBGMPlayer.prepare();
		mBGMPlayer.setLooping(true);

		// play BGS
		mBGMPlayer.start();
	}

	public void pauseBGS() {
		try {
			if( mBGSPlayer && mBGSPlayer.isPlaying() ) {
				this.nBGSCurrentPosition = mBGSPlayer.getCurrentPosition();
				mBGSPlayer.pause();
			} else {
				if(mBGSPlayer != null) mBGSPlayer.start();
			}

		} catch(Exception e) {
			cordova.LOG.e(e);
		}

	}

	public void stopBGS() {
		try {
			if( mBGSPlayer && mBGSPlayer.isPlaying() ) {
				mBGSPlayer.seekTo(0);
				mBGSPlayer.stop();
			} else {

			}

		} catch(Exception e) {
			cordova.LOG.e(e);
		}
	}

	//========================================================================================================
	// SE
	//========================================================================================================

	public int loadSoundEffectFile(String fileName) {
		selectedSoundFile = fileName;
		AssetManager assetManager = getAssets();
		AssetFileDescriptor assetFileDescriptor = assetManager.openFd(selectedSoundFile);
		return soundPool.load(assetFileDescriptor, 1);
	}

	public void playSoundEffect(String fileName) {
	  int waitLimit = 1000;
	  int waitCounter = 0;
	  int throttle = 10;

	  try {
	    fdLastSoundFile = loadSoundEffectFile(fileName);
	  } catch(Exception exAsset) {
			cordova.LOG.e(exAsset);
	  }

	  while( (streamId = soundPool.play(fdLastSoundFile, 1.0f, 1.0f, 0, 0, 1.0f)) == 0 && waitCounter < waitLimit  ) {
	    waitCounter++;
	    SystemClock.sleep(throttle);
	  }

	}

	public void stopSoundEffect(int id) {
	  try {
			id = streamId;
	    soundPool.stop(id); // last stream id
	  } catch(Exception e) {
			cordova.LOG.e(e);
	  }
	}

	public int setSoundEffectVolume(int vol) {
		audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, vol, AudioManager.FLAG_SHOW_UI);
	}

	public void playME(String fileName) {
		playSoundEffect(fileName);
	}

	public void stopME() {
		stopSoundEffect();
	}

}
