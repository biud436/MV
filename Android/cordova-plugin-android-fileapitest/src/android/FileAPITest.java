// Copyright (c) 2013 Intel Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.apache.cordova.file;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.apache.cordova.CordovaWebView;

import java.io.*;
import android.widget.Toast;
import android.os.Environment;

import android.content.Context;

public class FileAPITest extends CordovaPlugin {

    private File mFile;
    public static final String FOLDER_SAVE = "/sdcard/TestGame/save/";

    /**
     * Constructor.
     */
    public FileAPITest() {
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        this.cordova.getThreadPool().execute(new Runnable() {
          public void run() {

            try {
                mFile = createFile();
                if(mFile.exists()) {
                  readTextFile();
                } else {
                  writeTextFile();
                  readTextFile();
                }
                createSaveFile("save.txt", "save");
            } catch(IOException ex) {
                ex.printStackTrace();
            }

          }
        });

    }

    public Context getApplicationContext() {
        final CordovaInterface cordova = this.cordova;
        return cordova.getActivity().getBaseContext();
    }

    public File getExternalCacheDir() {
        return this.cordova.getActivity().getExternalCacheDir();
    }

    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        final CordovaInterface cordova = this.cordova;
        if ("createSaveFile".equals(action)) {
            final String filename = args.getString(0);
            final String raw = args.getString(1);
            cordova.getThreadPool().execute(new Runnable() {
              public void run() {
                try {
                  this.createSaveFile(filename, raw);
                  callbackContext.success();
                } catch (IOException e) {
                  callbackContext.error("The text file did not create");
                  e.printStackTrace();
                }
              }
            });
            return true;
        }
        if ("readTextFile".equals(action)) {
          cordova.getThreadPool().execute(new Runnable() {
            public void run() {
              try {
                JSONObject ret = new JSONObject();
                ret.put("values", this.readTextFile());
                callbackContext.success(ret);
              } catch(IOException ex) {
                  ex.printStackTrace();
                  callbackContext.error("fail to read the text file");
              }
            }
          });
          return true;
        }
        if (action.equals("echo")) {
            String message = args.getString(0);
            this.echo(message, callbackContext);
            return true;
        }
        return false;
    }

    private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private synchronized void createSaveFile(String filename, String raw) throws IOException {
        File saveFolder = new File(FOLDER_SAVE);
        File saveFile = new File(FOLDER_SAVE + filename.toString());

        if(!saveFolder.isDirectory()) {
          saveFolder.mkdirs();
        }

        if(saveFile.exists()) {
          saveFile.delete();
        }

        FileOutputStream fos = new FileOutputStream(FOLDER_SAVE + filename);
        fos.write(raw.getBytes());
        fos.close();

        Toast toast = Toast.makeText(this.getApplicationContext(), "The save file created", Toast.LENGTH_SHORT);
        toast.show();
    }

    private synchronized File createFile() throws IOException {
        String fileName = "test.txt";
        File storageDir = getExternalCacheDir();
        File curFile = new File(storageDir, fileName);
        return curFile;
    }

    private synchronized void writeTextFile() throws IOException {
        try {
          String strFileCont = "Hi, there.";
          String fileName = "test.txt";
          FileOutputStream fos = new FileOutputStream(mFile, true);
          fos.write(strFileCont.getBytes());
          fos.close();
          Toast toast = Toast.makeText(this.getApplicationContext(), "Complete", Toast.LENGTH_SHORT);
          toast.show();
        } catch(Exception ex) {
          Toast toast = Toast.makeText(this.getApplicationContext(), "Error" + ex.toString(), Toast.LENGTH_SHORT);
          toast.show();
        }
    };

    private synchronized String readTextFile() throws IOException {
        try {
          // Read file
          FileInputStream fis = new java.io.FileInputStream(mFile);
          InputStreamReader ins = new java.io.InputStreamReader(fis, "UTF-8");
          BufferedReader reader = new java.io.BufferedReader(ins);

          String strContent = "";
          String strLine = "";

          while( (strLine = reader.readLine()) != null) {
            strContent = strContent + strLine;
          }

          reader.close();
          ins.close();
          fis.close();

          Toast toast = Toast.makeText(getApplicationContext(), strContent.toString(), Toast.LENGTH_SHORT);
          toast.show();

          return strContent;

        } catch(Exception ex) {
          Toast toast = Toast.makeText(getApplicationContext(), "Error" + ex.toString(), Toast.LENGTH_SHORT);
          toast.show();
          return "";
        }
    };

}
