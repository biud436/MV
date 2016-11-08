/*
   Licensed to the Apache Software Foundation (ASF) under one
   or more contributor license agreements.  See the NOTICE file
   distributed with this work for additional information
   regarding copyright ownership.  The ASF licenses this file
   to you under the Apache License, Version 2.0 (the
   "License"); you may not use this file except in compliance
   with the License.  You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing,
   software distributed under the License is distributed on an
   "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   KIND, either express or implied.  See the License for the
   specific language governing permissions and limitations
   under the License.
*/

package org.apache.cordova.wakelock;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.PowerManager;
import android.os.PowerManager.WakeLock;

import android.util.DisplayMetrics;
import android.view.Window;
import android.view.WindowManager;

public class WakeLock extends CordovaPlugin {

	public static final String DEFAULT_RMMV_LOCK_TAG = "RMMV_GAME_LOCK";
	private PowerManager.WakeLock mWakeLock;

	public WakeLock() {}

	public void onDestroy() {
		super.onDestroy();
		this.releaseLock();
	}

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		JSONArray resultValues;
		if (action.equals("init")) {
			this.acquireLock();
		}
		if ( action.equals("getScreenWidth") ) {
			resultValues = this.getScreenWidth();
		}
		if ( action.equals("getScreenHeight") ) {
			resultValues = this.getScreenHeight();
		}
		if ( action.equals("getScreenDestiny") ) {
			resultValues = this.getScreenDestiny();
		}
		if( resultValues.isNull(0) ) {
			callbackContext.success();
		} else {
			callbackContext.success(resultValues);
		}
		return true;
	}

	public void acquireLock() {
		Context context = webView.getContext();
		PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
		mWakeLock = pm.newWakeLock(PowerManager.FULL_WAKE_LOCK, WakeLock.DEFAULT_RMMV_LOCK_TAG);
		mWakeLock.acquire();
	}

	public void releaseLock() {
		if (mWakeLock != null) {
			mWakeLock.release();
			mWakeLock = null;
		}
	}

	//============================================================================

	public JSONArray getScreenWidth() {
		DisplayMetrics dm = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(dm);
		JSONArray resultValues = new JSONArray();
		resultValues.put(dm.widthPixels);
		return resultValues;
	}

	public JSONArray getScreenHeight() {
		DisplayMetrics dm = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(dm);
		JSONArray resultValues = new JSONArray();
		resultValues.put(dm.heightPixels);
		return resultValues;
	}

	public JSONArray getScreenDestiny() {
		DisplayMetrics dm = new DisplayMetrics();
		getWindowManager().getDefaultDisplay().getMetrics(dm);
		JSONArray resultValues = new JSONArray();
		resultValues.put(dm.density);
		return resultValues;
	}

}
