import parameters from "./parameters";

var PrivateLocalization = function () {};

var newLocalization = RS.ScreenManager.jsonParse(parameters["Localization"]);
var langCode = navigator.language.slice(0, 2);

PrivateLocalization.prototype = {
    "code": eval(newLocalization.Language),
    "get": function (type) {
    var code = this.code;
    var lang = PrivateLocalization[code];
    return (lang) ? lang[type] : PrivateLocalization.en[type];
    }    
};

newLocalization["Localization"].forEach(function(i) {
    var lang = i.lang;
    PrivateLocalization[lang] = i;
});

RS.ScreenManager.localization = new PrivateLocalization();