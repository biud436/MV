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

package org.apache.cordova.rstoast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.widget.Toast;

public class RSToast extends CordovaPlugin {
    
    public RSToast() {
    }

	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
	
        if (action.equals("makeText")) {
            this.makeText(args.getString(0), args.getBoolean(1), callbackContext);
        }
		
        callbackContext.success();
        return true;		
	}
	
    public synchronized void makeText(final String message, final boolean show, final CallbackContext callbackContext) {
    	final CordovaInterface cordova = this.cordova;

        Runnable runnable = new Runnable() {
            public void run() { 
                if(show) {
				    Toast.makeText(cordova.getActivity().getBaseContext(), 
                                   message , 
                                   Toast.LENGTH_LONG).show();                    
                } else {
				    Toast.makeText(cordova.getActivity().getBaseContext(), 
                                   message, 
                                   Toast.LENGTH_SHORT).show();                    
                }
			};
		};
		
		this.cordova.getActivity().runOnUiThread(runnable);
		
	}

}