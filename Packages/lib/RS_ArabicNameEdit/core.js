window.Imported = Imported || {};
Imported.RS_ArabicNameEdit = true;

window.RS = window.RS || {};
RS.ArabicNameEdit = window.RS.ArabicNameEdit || {};

import parameters from "./parameters";

RS.ArabicNameEdit.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
        try { return $.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
};

RS.ArabicNameEdit.Params = {};
RS.ArabicNameEdit.Params.fontFace = parameters["Font"] || "GameFont";