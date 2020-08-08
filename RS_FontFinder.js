//================================================================
// RS_FontFinder.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2020 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc <RS_FontFinder>
 * @author biud436
 *          
 * @help
 *
 */

var Imported = Imported || {};
Imported.RS_FontFinder = true;

var RS = RS || {};
RS.FontFinder = RS.FontFinder || {};

(function ($) {

    "use strict";

    $.getBrowser = function () {

        /* Refer to https://stackoverflow.com/a/16938481 */
        let ua = navigator.userAgent,
            tem, M = ua.match(/(opera|chrome|edge|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {

            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

            return {
                name: 'IE',
                version: (tem[1] || '')
            };

        }

        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) {
                return {
                    name: 'Opera',
                    version: tem[1]
                };
            }

            tem = ua.match(/\bEdge\/(\d+)/);
            if (tem != null) {
                return {
                    name: 'Edge',
                    version: tem[1]
                };
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        return {
            name: M[0],
            version: M[1]
        };

    };

    //===========================================================================
    // FontFinder
    //===========================================================================

    const FontFinder = new class {

        /**
         * Browser에 로드되어있는 Font List를 구합니다.
         * @return {Array} fonts
         */
        getBrowserFontList() {
            let fonts = [];
            for (let elem of document.querySelectorAll('*')) {
                let font = getComputedStyle(elem).font;
                let raw = font.split(/[,\/]+/).pop().trim();
                if (/\"(.*)\"/i.exec(raw)) {
                    fonts.push(RegExp.$1);
                } else if (/(?:normal|bold|bolder|lighter|number|initial|inherit)[ ]*(.*)/i.exec(raw)) {
                    fonts.push(RegExp.$1);
                } else if (/\d+px[ ]*(.*)/i.exec(raw)) {
                    fonts.push(RegExp.$1);
                }
            }

            fonts = [...new Set(fonts)].filter(i => i.length > 0);

            return fonts;

        }

        /**
         * fonts 폴더에 있는 ttf 파일을 가져옵니다.
         */
        getLocalFontList() {
            if (!Utils.isNwjs()) return [];
            const os = require('os');
            const fs = require('fs');
            const path = require('path');
            const root = path.dirname(process.mainModule.filename);

            let fonts = fs.readdirSync(path.join(root, "fonts"), "utf8");

            fonts = fonts.filter((e, i, a) => {
                return e.lastIndexOf(".ttf") >= 0 || e.lastIndexOf(".woff") >= 0 || e.lastIndexOf(".woff2") >= 0;
            });

            return fonts;
        }

        /**
         * TTF 파일에서 폰트명을 취득하는 함수입니다.
         * 
         * https://www.codeguru.com/cpp/g-m/gdi/fonthandlinganddetection/article.php/c3659/Retrieving-the-Font-Name-from-a-TTF-File.htm
         * https://developer.apple.com/fonts/TrueType-Reference-Manual/RM06/Chap6name.html
         * 
         * @param {String} filename 
         * @return {String}
         */
        getNativeFontFamily(filename) {
            if (!Utils.isNwjs()) return "";

            const fs = require('fs');
            const path = require('path');
            // const font = path.join(path.dirname(process.mainModule.filename), "fonts", filename);
            const font = filename.replace(/\\/g, "/");

            if (!fs.existsSync(font)) {
                throw new Error(`${font} didn't exist!`);
            }

            let buffer = fs.readFileSync(font);

            let offset = 0x00;

            // ! 폰트 테이블을 읽는다.
            // 폰트 테이블 : 0x00 ~ 0x0C
            let fontOffsetTableBuffer = buffer.slice(0, 12);

            // Big Endian으로 읽어야 한다.
            const fontOffsetTable = {
                majorVersion: fontOffsetTableBuffer.readInt16BE(0x00),
                minorVersion: fontOffsetTableBuffer.readInt16BE(0x02),
                numOfTables: fontOffsetTableBuffer.readInt16BE(0x04),
            };

            // ! 트루타입 폰트가 맞는 지 확인한다.
            if (fontOffsetTable.majorVersion !== 1 || fontOffsetTable.minorVersion !== 0) {
                throw new Error("This font is not True Type Font");
            }

            offset += 12;

            let isFoundNameTable = false;
            let nameTableOffset = 0x00;
            let nameTableLength = 0x00;

            // ! name 테이블을 찾는다.
            for (let i = 0; i < fontOffsetTable.numOfTables; i++) {
                const tagName = buffer.toString("utf8", offset, offset + 4);
                let dataOffset = offset;
                offset += 16;

                // 이름 테이블을 찾았다.
                if (tagName === "name") {
                    isFoundNameTable = true;
                    let checkSum = buffer.readInt32BE(dataOffset + 4);
                    nameTableOffset = buffer.readInt32BE(dataOffset + 8);
                    nameTableLength = buffer.readInt32BE(dataOffset + 12);
                    break;
                }
            }

            if (!isFoundNameTable) {
                throw new Error("이름 테이블을 찾지 못했습니다.");
            }

            offset = nameTableOffset;

            // ! 이름 테이블의 헤더 선언
            const nameHeader = {};
            nameHeader.formatSelector = buffer.readUInt16BE(offset);
            nameHeader.nameRecordCount = buffer.readUInt16BE(offset + 0x02);
            nameHeader.storageOffset = buffer.readUInt16BE(offset + 0x04);
            offset += 0x06;

            const nameTable = [];
            const PLATFORM = {
                UNICODE: 0,
                Macintosh: 1,
                Microsoft: 3,
            };

            for (let i = 0; i < nameHeader.nameRecordCount; i++) {

                let nameRecord = {
                    PlatformID: buffer.readUInt16BE(offset),
                    EncodingID: buffer.readUInt16BE(offset + 2),
                    LanguageID: buffer.readUInt16BE(offset + 4), // 23인 경우, EUC-KR로 인코딩 필요
                    NameID: buffer.readUInt16BE(offset + 6),
                    StringLength: buffer.readUInt16BE(offset + 8),
                    StringOffset: buffer.readUInt16BE(offset + 10),
                    Name: "",
                };

                offset += 12;

                // ! Font Family 취득
                if (nameRecord.NameID === 1) {
                    const tempOffset = offset;
                    offset = nameTableOffset + nameRecord.StringOffset + nameHeader.storageOffset;
                    nameRecord.Name = buffer.toString("ascii", offset, offset + nameRecord.StringLength).replace(/\u0000/gi, "");
                    nameTable.push(nameRecord);
                    offset = tempOffset;
                }

            }

            let platformId = PLATFORM.Microsoft;

            switch (process.platform) {
                default:
                case 'darwin':
                    platformId = PLATFORM.Macintosh;
                    break;
                case 'win32':
                    platformId = PLATFORM.Microsoft;
                    break;
            }

            // $eucKr = [System.Text.Encoding]::GetEncoding(51949);
            // $bytes = [byte[]]@(0xB3, 0xAA, 0xB4, 0xAE, 0xB0, 0xED, 0xB5, 0xF1)
            // $eucKr.GetString($bytes)
            // => 나눔고딕

            // 한글의 경우, 
            // UTF16-BE에서 EUC-KR로 문자열 변환을 해야 하며 iconv-lite가 필요하다.
            // (루비나 파이썬의 경우, EUC-KR을 지원한다)
            const fontFamiles = nameTable.filter(function (i) {
                return i.PlatformID === platformId;
            });

            if (Array.isArray(fontFamiles)) {
                if (fontFamiles.length > 0) {
                    console.log(fontFamiles[0].Name);
                    return fontFamiles[0].Name;
                } else {
                    return "";
                }
            } else {
                return "";
            }

        }

        /**
         * 
         * @param {String} filename
         */
        getFontFamily(filename) {
            return new Promise(function (resolve, reject) {
                if (!Utils.isNwjs()) {
                    reject("This function will be going to work only in PC platform");
                }

                const fs = require('fs');
                const path = require('path');
                const cp = require('child_process');
                const font = filename;

                if (!fs.existsSync(font)) {
                    reject(`${font} didn't exist!`);
                }

                if (process.platform.contains("win")) {

                    const powershellProcess = cp.exec(`powershell -Command "Add-Type -AssemblyName PresentationCore; (New-Object -TypeName Windows.Media.GlyphTypeface -ArgumentList '${font}').Win32FamilyNames.Values"`, {
                            shell: true,
                            encoding: "utf8",
                        },
                        function (err, stdout, stderr) {
                            let fontFamily = stdout;
                            if (fontFamily) {
                                const fontFamilyTrim = fontFamily.trim().replace(/[\r\n]+/, "");
                                console.log(fontFamilyTrim);
                                resolve(fontFamilyTrim);
                            } else {
                                reject("Can't not get font name"); // 폰트를 구하지 못했습니다.
                            }
                        });

                    powershellProcess.on("beforeExit", function () {
                        powershellProcess.kill();
                    });

                } else {
                    reject("This function will be going to work in Windows platform only");
                }

            });

        }

        /**
         * 
         * @example
         * Font.getSystemFontList().then(fontList => {
         *  if(fontList.includes("나눔고딕")) {
         *    console.log("나눔고딕 폰트가 설치되어 있습니다");
         *  }
         * }).catch(err => console.warn(err));
         */
        getSystemFontList() {
            return new Promise((resolve, reject) => {
                if (!Utils.isNwjs()) {
                    reject("This function will be going to work only in PC platform");
                }
                chrome.fontSettings.getFontList(e => resolve(JSON.stringify(e.map(i => i.fontId))));
            });
        }

    }

    window.FontFinder = FontFinder;

    $.loadFonts = function () {
        const browser = $.getBrowser();
        let isValid = false;

        if (browser.name === "Chrome" && browser.version >= 55) {
            isValid = true;
        } else if (browser.name === "Firefox" && browser.version >= 52) {
            isValid = true;
        } else {
            isValid = false;
        }

        if (Utils.isNwjs() && isValid) {
            try {
                const os = require('os');
                let isValidPowershell = false;

                if ((process.platform === "win32") && /(\d+\.\d+).\d+/i.exec(os.release())) {
                    const version = parseFloat(RegExp.$1);

                    // Windows 7 이상인가?
                    if (version >= "6.1") {
                        isValidPowershell = true;
                    }
                }

                const fontList = FontFinder.getLocalFontList();
                fontList.forEach(async fontFile => {
                    const fontFamily = (isValidPowershell) ? await FontFinder.getFontFamily(fontFile) : FontFinder.getNativeFontFamily(fontFile);
                    FontManager.load(fontFamily, fontFile);
                });

            } catch (e) {
                console.warn(e);
            }

        }
    }

})(RS.FontFinder);