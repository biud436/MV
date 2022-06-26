// ================================================================
// RS_DevanagariSimplify.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2022 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
// ================================================================
/*:
 * @target MV
 * @plugindesc This plugin is possible to show up Devanagari text simplify. <RS_DevanagariSimplify>
 * @author biud436
 *
 * @param Message Mode
 * @type select
 * @desc This parameter can set the message mode.
 * default : devanagari
 * @default devanagari
 * @option Devanagari Mode
 * @value devanagari
 * @option Normal Mode
 * @value normal
 *
 * @param Devanagari Font
 * @desc Specific your font that can indicate Devanagari text from your system font folder.
 * @default Poppins, Hind
 *
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * To change the text mode as Devanagari, you can use the following plugin command.
 *
 *  DevanagariMessageMode
 *
 * To change the text mode is normal, you can use the following plugin command.
 *
 *  NormalMessageMode
 *
 * ============================================================================
 * Version Log
 * ============================================================================
 * 2022.06.24 (v1.0.0) - First Release.
 */

(() => {
    const RS = window.RS || {};

    let parameters = $plugins.filter(i =>
        i.description.contains('<RS_DevanagariSimplify>')
    );

    parameters = parameters.length > 0 && parameters[0].parameters;

    RS.DevanagariSimplify = RS.DevanagariSimplify || {};
    RS.DevanagariSimplify.Params = {};
    RS.DevanagariSimplify.Params.messageMode = String(
        parameters['Message Mode'] || 'devanagari'
    );
    RS.DevanagariSimplify.Params.devanagariFont = String(
        parameters['Devanagari Font'] || 'Poppins, Hind'
    );

    function TextUtils() {
        throw new Error('This is a static class');
    }

    TextUtils.LEFT_TO_RIGHT_EMBEDDING = '\u202A';
    TextUtils.RIGHT_TO_LEFT_EMBEDDING = '\u202B';
    TextUtils.POP_DIRECTIONAL_FORMATTING = '\u202C';
    TextUtils.LEFT_TO_RIGHT_OVERRIDE = '\u202D';
    TextUtils.RIGHT_TO_LEFT_OVERRIDE = '\u202E';
    TextUtils.LEFT_TO_RIGHT_ISOLATE = '\u2066';
    TextUtils.RIGHT_TO_LEFT_ISOLATE = '\u2067';
    TextUtils.FIRST_STRONG_ISOLATE = '\u2068';
    TextUtils.POP_DIRECTIONAL_ISOLATE = '\u2069';

    TextUtils.isArabic = function (text) {
        const pattern =
            /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFD\uFE70-\uFEFF\u10E600-\u10E7E\u1EE00-\u1EEFF]/;
        return pattern.test(text);
    };

    TextUtils.makeText = function (text) {
        return String(TextUtils.LEFT_TO_RIGHT_EMBEDDING + text);
    };

    /**
     * @class DevanagariUtils
     */
    function DevanagariUtils() {
        throw new Error('This is a static class');
    }

    DevanagariUtils.isDevanagari = function (text) {
        const pattern = /[\u0900-\u097F\u0980-\u09FF]/;
        return pattern.test(text);
    };

    DevanagariUtils.makeText = function (text) {
        return String(TextUtils.LEFT_TO_RIGHT_EMBEDDING + text);
    };

    // ============================================================================
    // Window_Base
    // ============================================================================

    const alias_Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function (
        text,
        x,
        y,
        maxWidth,
        lineHeight,
        align
    ) {
        if (
            RS.DevanagariSimplify.Params.messageMode === 'devanagari' &&
            DevanagariUtils.isDevanagari(text)
        ) {
            text = DevanagariUtils.makeText(text);
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

    // ============================================================================
    // Window_Base
    // ============================================================================

    const alias_Window_Base_standardFontFace =
        Window_Base.prototype.standardFontFace;
    Window_Base.prototype.standardFontFace = function () {
        if (
            RS.DevanagariSimplify.Params.messageMode === 'devanagari' ||
            navigator.language.match(/^hi/)
        ) {
            return RS.DevanagariSimplify.Params.devanagariFont;
        }

        return alias_Window_Base_standardFontFace.call(this);
    };

    const alias_Window_Base_processNormalCharacter =
        Window_Base.prototype.processNormalCharacter;
    Window_Base.prototype.processNormalCharacter = function (textState) {
        if (RS.DevanagariSimplify.Params.messageMode !== 'devanagari') {
            return alias_Window_Base_processNormalCharacter.call(
                this,
                textState
            );
        }

        const allLines = textState.text
            // eslint-disable-next-line no-plusplus
            .slice(textState.index++)
            .split(/[\r\n]+/);
        const currentLine = allLines[0] || '';
        let currentText = '';

        // eslint-disable-next-line prefer-destructuring
        currentText = currentLine.split('\x1b')[0];
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

        return c;
    };

    // ============================================================================
    // Window_Message
    // ============================================================================

    const alias_Window_Message_standardFontFace =
        Window_Message.prototype.standardFontFace;
    Window_Message.prototype.standardFontFace = function () {
        if (
            RS.DevanagariSimplify.Params.messageMode === 'devanagari' ||
            navigator.language.match(/^hi/)
        ) {
            return RS.DevanagariSimplify.Params.devanagariFont;
        }

        return alias_Window_Message_standardFontFace.call(this);
    };

    // ============================================================================
    // Game_Interpreter
    // ============================================================================
    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === 'DevanagariMessageMode') {
            RS.DevanagariSimplify.Params.messageMode = true;
        }
        if (command === 'NormalMessageMode') {
            RS.DevanagariSimplify.Params.messageMode = false;
        }
    };
})();
