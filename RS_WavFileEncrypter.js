//================================================================
// RS_WavFileEncrypter.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MZ
 * @plugindesc (v2.0.0) Wav File Encrypter <RS_WavFileEncrypter>
 * @author biud436
 *
 * @param key
 * @desc Encryption Key
 * @default myKey
 *
 * @help
 * -----------------------------------------------------------------------------
 * How to install
 * -----------------------------------------------------------------------------
 * 1. Make new directory called 'CryptoJS' to js/libs folder
 * 2. Installing the library called CryptoJS and place them in js/libs/CryptoJS folder
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js
 * 3. Sets up this plugin and your secret key in Plugin Manager.
 * 4. Start Game and then run code as follows.
 * Encrypter.startBuild();
 * 5. Copy them to your release project after completed build.
 * -----------------------------------------------------------------------------
 * Plugin Command
 * -----------------------------------------------------------------------------
 * You can be available this command in your event editor.
 *
 * Encryption startBuild
 *
 * It quickly creates files in same folder after all files build.
 * -----------------------------------------------------------------------------
 * Change Log
 * -----------------------------------------------------------------------------
 * 2016.11.30 (v1.0.0) - First Release.
 * 2016.12.05 (v1.0.1) - Added new plugin command.
 * 2018.02.27 (v1.0.2) - Fixed the file path for RMMV 1.6.0
 * 2018.03.13 (v1.0.3) - Fixed the token error.
 * 2022.01.29 (v2.0.0) - RPG Maker MZ version is released.
 *
 * @command startBuild
 * @text Start Encryption Wav
 * @description encrypt wave files.
 */
/*:ko
 * @target MZ
 * @plugindesc (v2.0.0) 웨이브 파일 인크립터 <RS_WavFileEncrypter>
 * @author 러닝은빛(biud436)
 *
 * @param key
 * @text 비밀 키
 * @desc 암호화에 필요한 인크립션 키를 입력하세요.
 * @default myKey
 *
 * @command startBuild
 * @text 웨이브 파일 암호화 시작
 * @desc 암호화를 시작합니다.
 *
 * @help
 * -----------------------------------------------------------------------------
 * 설치 방법
 * -----------------------------------------------------------------------------
 * 1. 먼저 js/libs 폴더에 'CryptoJS'라는 새 폴더를 만드세요.
 * 2. 해당 폴더에 안에 아래 라이브러리를 다운로드 받아서 넣으세요.
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
 * https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js
 * 3. 플러그인 관리에서 비밀키를 설정하세요.
 * 4. 자동 실행 이벤트로 다음 스크립트 코드를 호출합니다.
 * Encrypter.startBuild();
 * 5. 설정을 마치고 게임을 실행하면 빌드가 완료되고, 동일한 폴더에 파일이 생성됩니다.
 *
 * -----------------------------------------------------------------------------
 * 플러그인 명령
 * -----------------------------------------------------------------------------
 * 플러그인 명령으로 빌드를 할 수도 있습니다.
 *
 * Encryption startBuild
 *
 * 동일한 폴더에 .rpgmvw 파일이 생성됩니다.
 *
 * -----------------------------------------------------------------------------
 * 변동 사항
 * -----------------------------------------------------------------------------
 * 2016.11.30 (v1.0.0) - First Release.
 * 2016.12.05 (v1.0.1) - Added new plugin command.
 * 2018.02.27 (v1.0.2) - Fixed the file path for RMMV 1.6.0
 * 2018.03.13 (v1.0.3) - Fixed the token error.
 * 2022.01.29 (v2.0.0) - RPG Maker MZ version is released.
 */

(() => {
    const pluginParams = $plugins.filter(function (i) {
        return i.description.contains("<RS_WavFileEncrypter>");
    });

    const pluginName = pluginParams.length > 0 && pluginParams[0].name;
    const parameters = pluginParams.length > 0 && pluginParams[0].parameters;

    const fs = require("fs");

    function Encrypter() {
        throw new Error("This is a static class");
    }

    Encrypter.SIGNATURE = "5250474d56000000";
    Encrypter.VER = "000301";
    Encrypter.REMAIN = "0000000000";
    Encrypter._headerlength = 16;
    Encrypter.key = parameters["key"] || "myKey";
    Encrypter._path = "js/libs/CryptoJS/";
    Encrypter._wavPath = "audio/wav/";
    Encrypter._encryptionKey = [
        "d4",
        "1d",
        "8c",
        "d9",
        "8f",
        "00",
        "b2",
        "04",
        "e9",
        "80",
        "09",
        "98",
        "ec",
        "f8",
        "42",
        "7e",
    ];

    Encrypter.loadScript = function (name) {
        try {
            const url = Encrypter.getCurrentPath() + this._path + name;
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.async = false;
            script._url = url;
            document.body.appendChild(script);
        } catch (e) {
            console.log(e);
        }
    };

    Encrypter.getWaveFiles = function () {
        if (!!process === false) return;
        if (process.versions.node && process.versions.v8) {
            const path = require("path");
            const base = path.dirname(process.mainModule.filename);
            const root = path.join(base, "audio", "wav");
            const files = fs.readdirSync(root);
            return files.filter((i) => {
                const reg = /^[^\.]+$/;
                return !reg.test(i);
            });
        }
    };

    Encrypter.isNodeWebkit = function () {
        return Utils.isNwjs();
    };

    Encrypter.readWavStream = function (path) {
        if (!this.isNodeWebkit()) return;

        const requestFile = new XMLHttpRequest();
        requestFile.open("GET", Encrypter.getCurrentPath() + path);
        requestFile.responseType = "arraybuffer";
        requestFile.send();

        requestFile.onload = function () {
            if (this.status < 400) {
                var buffer = Encrypter.encryptArrayBuffer(requestFile.response);
                Encrypter.writeEncryptWaveStream(
                    Encrypter.getCurrentPath() + path,
                    Encrypter.toBuffer(buffer)
                );
            }
        };
    };

    Encrypter.writeEncryptWaveStream = function (path, bin) {
        if (!this.isNodeWebkit()) return;
        const filename = path.slice(0, path.lastIndexOf("."));
        const encryptedPath = filename + ".wav_";
        const writeStream = fs.createWriteStream(encryptedPath, {
            flags: "w+",
        });
        writeStream.write(bin);
        writeStream.end();
        writeStream.on("finish", function () {
            console.log("finish");
        });
    };

    Encrypter.localFilePath = function (fileName) {
        if (!Utils.isNwjs()) return "";
        const path = require("path");
        const base = path.dirname(process.mainModule.filename);
        return path.join(base, fileName);
    };

    Encrypter.getCurrentPath = function () {
        const path = require("path");
        return path.dirname(process.mainModule.filename);
    };

    Encrypter.createHeader = function (size) {
        const bin = new ArrayBuffer(size);
        const dataView = new DataView(bin);
        const ref = this.SIGNATURE + this.VER + this.REMAIN;
        for (let i = 0; i < size; i++) {
            dataView.setUint8(i, parseInt("0x" + ref.substr(i * 2, 2), size));
        }

        return bin;
    };

    Encrypter.generateKey = function (encryptKey) {
        const compressedKey = CryptoJS.MD5(encryptKey).toString();
        this._encryptionKey = compressedKey.split(/(.{2})/).filter(Boolean);
    };

    Encrypter.toBuffer = function (bin) {
        const buf = Buffer.alloc(bin.byteLength);
        const headerView = new Uint8Array(bin);
        for (i = 0; i < bin.byteLength; i++) {
            buf[i] = headerView[i];
        }
        return buf;
    };

    Encrypter.encryptArrayBuffer = function (arrayBuffer) {
        if (!arrayBuffer) return null;

        // header
        const ref = this.SIGNATURE + this.VER + this.REMAIN;
        const refBytes = new Uint8Array(16);
        for (let i = 0; i < this._headerlength; i++) {
            refBytes[i] = parseInt("0x" + ref.substr(i * 2, 2), 16);
        }

        const resultBuffer = new ArrayBuffer(
            refBytes.byteLength + arrayBuffer.byteLength
        );

        const view = new DataView(resultBuffer);

        Encrypter.generateKey(Encrypter.key);

        // Address  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | a | b | c | d | e | f | DUMP
        // 00000000 | ------------------------------------------------------------- | RPGMV........................
        // 00000010 | ------------------------------------------------------------- | .wav file header (encrypted)
        // 00000020 | ------------------------------------------------------------- | Do not encrypt

        if (arrayBuffer) {
            // source data
            var resultArray = new Uint8Array(resultBuffer);
            var byteArray = new Uint8Array(arrayBuffer);

            // 0x00 ~ 0x0F
            for (let i = 0; i < this._headerlength; i++) {
                resultArray[i] = refBytes[i];
                view.setUint8(i, resultArray[i]);
            }

            // 0x10 ~ 0x1F
            for (let i = 0x10; i < 0x20; i++) {
                resultArray[i] =
                    byteArray[i - 0x10] ^
                    parseInt(this._encryptionKey[i - 0x10], 16);
                view.setUint8(i, resultArray[i]);
            }

            for (let i = 0x20; i < resultArray.length; i++) {
                resultArray[i] = byteArray[i - 0x10];
                view.setUint8(i, resultArray[i]);
            }
        }

        return resultBuffer;
    };

    Encrypter.startBuild = function () {
        const files = Encrypter.getWaveFiles();
        files.forEach((i) => Encrypter.readWavStream(Encrypter._wavPath + i));
    };

    /**
     *
     * @param {String} url
     * @param {String} path
     */
    Encrypter.downloadData = function (url, path) {
        const pathJS = require("path");

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.overrideMimeType("text/javascript");
        xhr.onload = function () {
            if (xhr.status < 400) {
                const fileName = url.match(/^.+:\/\/.+\/(.*)$/g);
                if (fileName) {
                    const file = fileName[0].replace(
                        /^.+:\/\/.+\/(.*)$/g,
                        "$1"
                    );
                    const data = xhr.responseText;
                    const realFileName = pathJS.join(path, file);
                    fs.writeFileSync(realFileName, data, "utf8");
                }
            }
        };
        xhr.onerror = function (err) {
            console.error(err);
        };
        xhr.send();
    };

    Encrypter.getMd5Lib = function () {
        const path = require("path");
        const libraryPath = path
            .join(Encrypter.getCurrentPath(), "js", "libs", "CryptoJS")
            .replace(/\\/g, "/");
        if (!fs.existsSync(libraryPath)) {
            fs.mkdirSync(libraryPath);
        }
        const md5Lib = path.join(libraryPath, "md5.js");
        if (!fs.existsSync(md5Lib)) {
            Encrypter.downloadData(
                "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js",
                libraryPath
            );
        }
        const coreMinLib = path.join(libraryPath, "core-min.js");
        if (!fs.existsSync(coreMinLib)) {
            Encrypter.downloadData(
                "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js",
                libraryPath
            );
        }

        Encrypter.loadScript("md5.js");
        Encrypter.loadScript("core-min.js");
    };

    Encrypter.getMd5Lib();

    PluginManager.registerCommand(pluginName, "startBuild", () => {
        Encrypter.startBuild();
    });

    // Export Encrypter
    window.Encrypter = Encrypter;
})();
