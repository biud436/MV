//================================================================
// RS_ArabicSimplify.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2019 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * @target MV
 * @plugindesc This plugin is possible to show up Arabic text simplify. <RS_ArabicSimplify>
 * @author biud436
 *
 * @param Message Mode
 * @type select
 * @desc this parameter sets up the text direction.
 * default : arabic
 * @default arabic
 * @option Arabic Mode
 * @value arabic
 * @option Normal Mode
 * @value normal
 *
 * @param Arabic Font
 * @desc Choose your font that can indicate Arabic text from your system font folder.
 * @default Simplified Arabic, Times New Roman, Segoe UI
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * There is no a flip layer because is compatibility issue.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * This plugin command changes with the mode for Arabic.
 *
 *  ArabicMessageMode
 *
 * This plugin command changes with normal mode.
 *
 *  NormalMessageMode
 *
 * ============================================================================
 * Version Log
 * ============================================================================
 * 2019.06.03 (v1.0.0) - First Release.
 */

var Imported = Imported || {};
Imported.RS_ArabicSimplify = true;

var RS = RS || {};
RS.ArabicSimplify = RS.ArabicSimplify || {};

(($) => {
    "use strict";

    let parameters = $plugins.filter((i) => {
        return i.description.contains("<RS_ArabicSimplify>");
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    $.Params = {};
    $.Params.messageMode = String(parameters["Message Mode"] || "arabic");
    $.Params.arabicFont = String(
        parameters["Arabic Font"] ||
            "Simplified Arabic, Times New Roman, Segoe UI"
    );

    //============================================================================
    // ArabicUtils
    //============================================================================

    function ArabicUtils() {
        throw new Error("This is a static class");
    }

    ArabicUtils.LEFT_TO_RIGHT_EMBEDDING = "\u202A";
    ArabicUtils.RIGHT_TO_LEFT_EMBEDDING = "\u202B";
    ArabicUtils.POP_DIRECTIONAL_FORMATTING = "\u202C";
    ArabicUtils.LEFT_TO_RIGHT_OVERRIDE = "\u202D";
    ArabicUtils.RIGHT_TO_LEFT_OVERRIDE = "\u202E";
    ArabicUtils.LEFT_TO_RIGHT_ISOLATE = "\u2066";
    ArabicUtils.RIGHT_TO_LEFT_ISOLATE = "\u2067";
    ArabicUtils.FIRST_STRONG_ISOLATE = "\u2068";
    ArabicUtils.POP_DIRECTIONAL_ISOLATE = "\u2069";

    ArabicUtils.isArabic = function (text) {
        const pattern =
            /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFD\uFE70-\uFEFF\u10E600-\u10E7E\u1EE00-\u1EEFF]/;
        return pattern.test(text);
    };

    ArabicUtils.makeText = function (text) {
        return String(ArabicUtils.RIGHT_TO_LEFT_EMBEDDING + text);
    };

    //============================================================================
    // Window_Base
    //============================================================================

    const alias_Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function (
        text,
        x,
        y,
        maxWidth,
        lineHeight,
        align
    ) {
        if ($.Params.messageMode === "arabic" && ArabicUtils.isArabic(text)) {
            text = ArabicUtils.makeText(text);
        }
        alias_Bitmap_drawText.call(
            this,
            text,
            x,
            y,
            maxWidth,
            lineHeight,
            align
        );
    };

    //============================================================================
    // Window_Base
    //============================================================================

    const alias_Window_Base_standardFontFace =
        Window_Base.prototype.standardFontFace;
    Window_Base.prototype.standardFontFace = function () {
        if (
            $.Params.messageMode === "arabic" ||
            navigator.language.match(/^ar/)
        ) {
            return $.Params.arabicFont;
        } else {
            return alias_Window_Base_standardFontFace.call(this);
        }
    };

    const alias_Window_Base_processNormalCharacter =
        Window_Base.prototype.processNormalCharacter;
    Window_Base.prototype.processNormalCharacter = function (textState) {
        if ($.Params.messageMode !== "arabic") {
            return alias_Window_Base_processNormalCharacter.call(
                this,
                textState
            );
        }

        const allLines = textState.text
            .slice(textState.index++)
            .split(/[\r\n]+/);
        const currentLine = allLines[0] || "";
        let currentText = "";

        currentText = currentLine.split("\x1b")[0];
        textState.index += currentText.length - 1;

        const c = currentText;
        const w = this.textWidth(c);

        this.contents.drawText(
            c,
            textState.x,
            textState.y,
            w * 2,
            textState.height
        );

        textState.x += w;
    };

    //============================================================================
    // Window_Message
    //============================================================================

    const alias_Window_Message_standardFontFace =
        Window_Message.prototype.standardFontFace;
    Window_Message.prototype.standardFontFace = function () {
        if (
            $.Params.messageMode === "arabic" ||
            navigator.language.match(/^ar/)
        ) {
            return $.Params.arabicFont;
        } else {
            return alias_Window_Message_standardFontFace.call(this);
        }
    };

    //============================================================================
    // Game_Interpreter
    //============================================================================
    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === "ArabicMessageMode") {
            $.Params.messageMode = true;
        }
        if (command === "NormalMessageMode") {
            $.Params.messageMode = false;
        }
    };
})(RS.ArabicSimplify);
