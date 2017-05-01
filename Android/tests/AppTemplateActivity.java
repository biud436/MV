// Copyright (c) 2013 Intel Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

package org.xwalk.app.template;

import android.graphics.Color;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.os.Bundle;
import android.view.WindowManager;
import android.view.View;
import android.widget.TextView;

// Added Custom import..
import java.io.*;
import android.widget.Toast;
import android.os.Environment;

import org.xwalk.app.XWalkRuntimeActivityBase;

public class AppTemplateActivity extends XWalkRuntimeActivityBase {
	
	private File mFile;
	public static final String FOLDER_SAVE = "/sdcard/TestGame/save/";
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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
	
	private void createSaveFile(String filename, String raw) throws IOException  {
		
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
	
		Toast toast = Toast.makeText(getApplicationContext(), "The save file created", Toast.LENGTH_SHORT);
		toast.show();
	}
	
    private File createFile() throws IOException {
        String fileName = "test.txt";	
        File storageDir = getExternalCacheDir();
        File curFile = new File(storageDir, fileName);
        return curFile;
    }
	
	private void writeTextFile() {

		try {
			
			// Write file
			String strFileCont = "Hi, there.";
			String fileName = "test.txt";
			FileOutputStream fos = new FileOutputStream(mFile, true);
			fos.write(strFileCont.getBytes());
			fos.close();			
			
			Toast toast = Toast.makeText(getApplicationContext(), "Complete", Toast.LENGTH_SHORT);
			toast.show();	
			
		} catch(Exception ex) {
			
			Toast toast = Toast.makeText(getApplicationContext(), "Error" + ex.toString(), Toast.LENGTH_SHORT);
			toast.show();					
			
		}
		
	}
	
	private void readTextFile() {

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
			
		} catch(Exception ex) {
			
			Toast toast = Toast.makeText(getApplicationContext(), "Error" + ex.toString(), Toast.LENGTH_SHORT);
			toast.show();					
			
		}
		
	}	

    @Override
    protected void didTryLoadRuntimeView(View runtimeView) {
        if (runtimeView != null) {
            setContentView(runtimeView);
            getRuntimeView().loadAppFromUrl("file:///android_asset/www/index.html");
        } else {
            TextView msgText = new TextView(this);
            msgText.setText("Crosswalk failed to initialize.");
            msgText.setTextSize(36);
            msgText.setTextColor(Color.BLACK);
            setContentView(msgText);
        }
    }

    private void enterFullscreen() {
        if (VERSION.SDK_INT >= VERSION_CODES.KITKAT &&
                ((getWindow().getAttributes().flags &
                        WindowManager.LayoutParams.FLAG_FULLSCREEN) != 0)) {
            View decorView = getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
                    View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }

    public void setIsFullscreen(boolean isFullscreen) {
        if (isFullscreen) {
            enterFullscreen();
        }
    }

}
