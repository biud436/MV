//================================================================
// setAppIcon.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @plugindesc <setAppIcon>
 * @author biud436
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.setAppIcon = true;

function setAppIcon(filename) {

    "use strict";

    if(!Utils.isNwjs()) {
        return;
    }
    
    const fs = require('fs');
    const path = require('path');
    const root = path.dirname(process.mainModule.filename);
    const relativePath = (name)=>{ return path.join(root, name)};
    
    if(!fs.existsSync(relativePath(filename))) {
        console.warn(`Cannot find the icon image at ${filename}`);
        return;
    }

    // Copies the manifest.
    let data = {
        "name": "",
        "main": "index.html",
        "js-flags": "--expose-gc",
        "window": {
            "title": "",
            "toolbar": false,
            "width": 816,
            "height": 624,
            "icon": filename
        }
    };

    //#region powershell
    const powershell = `
Add-Type -AssemblyName System.Drawing
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class MyApp {
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern IntPtr SendMessage(IntPtr hWnd, int Msg, int wParam, IntPtr lParam);
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern IntPtr FindWindow(IntPtr sClassName, string lpWindowName);  
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern IntPtr FindWindow(string sClassName, string lpWindowName);      
}
"@

$WM_SETICON = 0x80;
$myBitmap = [System.Drawing.Bitmap]::FromFile("${relativePath(filename)}");

$hIcon = $myBitmap.GetHicon();
$hWnd = [MyApp]::FindWindow([IntPtr]::Zero, "${document.title}");

[MyApp]::SendMessage($hWnd, $WM_SETICON, 0, $hIcon);
[MyApp]::SendMessage($hWnd, $WM_SETICON, 1, $hIcon);   
    `;
    //#endregion
    
    // Stringify the data that changed app icon
    let contents = JSON.stringify(data, null, "\t");

    fs.writeFileSync(relativePath("package.json"), contents, "utf8");

    // Restart the game.
    chrome.runtime.reload();

}  
    