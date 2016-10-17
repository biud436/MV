/*:
 * RS_Localization.js
 * @plugindesc You can change the language settings via this plugin.
 * @author biud436
 * @date 2016.02.20
 *
 * @param Default Language
 * @desc (default : English)
 * @default English
 *
 * @param Auto
 * @desc Automatically Load through your system language.
 * @default true
 *
 * @param Enabled Switch ID
 * @desc if its switch value is the same as status called 'ON',
 * you could be able to load a map of being configure for each language.
 * @default 11
 *
 * @param Load Database
 * @desc
 * @default true
 *
 * @help
 * The following command calls Localization-Change-function using the plugin command function.
 * For example, If your game offers users the ability to change the language,
 * you can change your game language into many languages by using this plugin command.
 *
 * //---------------------------------------------------------------------------
 * // pluginCommand
 * //---------------------------------------------------------------------------
 * Localization Change type
 *
 * //---------------------------------------------------------------------------
 * // Script
 * //---------------------------------------------------------------------------
 *
 * - Check Language
 * $gameSystem.isLangType('en');
 * $gameSystem.isLangType('english');
 * $gameSystem.isLangType('English');
 *
 * - Change Language
 * RS.Localization.changeSystemLanguage('japanese');
 *
 * //---------------------------------------------------------------------------
 * // Language Type
 * //---------------------------------------------------------------------------
 * 'Afrikaans'
 * 'Afrikaans_South_Africa'
 * 'Arabic'
 * 'Arabic_UAE'
 * 'Arabic_Bahrain'
 * 'Arabic_Algeria'
 * 'Arabic_Egypt'
 * 'Arabic_Iraq'
 * 'Arabic_Jordan'
 * 'Arabic_Kuwait'
 * 'Arabic_Lebanon'
 * 'Arabic_Libya'
 * 'Arabic_Morocco'
 * 'Arabic_Oman'
 * 'Arabic_Qatar'
 * 'Arabic_Saudi_Arabia'
 * 'Arabic_Syria'
 * 'Arabic_Tunisia'
 * 'Arabic_Yemen'
 * 'Azeri_Latin'
 * 'Azeri_Latin_Azerbaijan'
 * 'Azeri_Cyrillic_Azerbaijan'
 * 'Belarusian'
 * 'Belarusian_Belarus'
 * 'Bulgarian'
 * 'Bulgarian_Bulgaria'
 * 'Bosnian_Bosnia_and_Herzegovina'
 * 'Catalan'
 * 'Catalan_Spain'
 * 'Czech'
 * 'Czech_Czech_Republic'
 * 'Welsh'
 * 'Welsh_United_Kingdom'
 * 'Danish'
 * 'Danish_Denmark'
 * 'German'
 * 'German_Austria'
 * 'German_Switzerland'
 * 'German_Germany'
 * 'German_Liechtenstein'
 * 'German_Luxembourg'
 * 'Divehi'
 * 'Divehi_Maldives'
 * 'Greek'
 * 'Greek_Greece'
 * 'English'
 * 'English_Australia'
 * 'English_Belize'
 * 'English_Canada'
 * 'English_Caribbean'
 * 'English_United_Kingdom'
 * 'English_Ireland'
 * 'English_Jamaica'
 * 'English_New_Zealand'
 * 'English_Republic_of_the_Philippines'
 * 'English_Trinidad_and_Tobago'
 * 'English_United_States'
 * 'English_South_Africa'
 * 'English_Zimbabwe'
 * 'Esperanto'
 * 'Spanish'
 * 'Spanish_Argentina'
 * 'Spanish_Bolivia'
 * 'Spanish_Chile'
 * 'Spanish_Colombia'
 * 'Spanish_Costa_Rica'
 * 'Spanish_Dominican_Republic'
 * 'Spanish_Ecuador'
 * 'Spanish_Castilian'
 * 'Spanish_Spain'
 * 'Spanish_Guatemala'
 * 'Spanish_Honduras'
 * 'Spanish_Mexico'
 * 'Spanish_Nicaragua'
 * 'Spanish_Panama'
 * 'Spanish_Peru'
 * 'Spanish_Puerto_Rico'
 * 'Spanish_Paraguay'
 * 'Spanish_El_Salvador'
 * 'Spanish_Uruguay'
 * 'Spanish_Venezuela'
 * 'Estonian'
 * 'Estonian_Estonia'
 * 'Basque'
 * 'Basque_Spain'
 * 'Farsi'
 * 'Farsi_Iran'
 * 'Finnish'
 * 'Finnish_Finland'
 * 'Faroese'
 * 'Faroese_Faroe_Islands'
 * 'French'
 * 'French_Belgium'
 * 'French_Canada'
 * 'French_Switzerland'
 * 'French_France'
 * 'French_Luxembourg'
 * 'French_Principality_of_Monaco'
 * 'Galician'
 * 'Galician_Spain'
 * 'Gujarati'
 * 'Gujarati_India'
 * 'Hebrew'
 * 'Hebrew_Israel'
 * 'Hindi'
 * 'Hindi_India'
 * 'Croatian'
 * 'Croatian_Bosnia_and_Herzegovina'
 * 'Croatian_Croatia'
 * 'Hungarian'
 * 'Hungarian_Hungary'
 * 'Armenian'
 * 'Armenian_Armenia'
 * 'Indonesian'
 * 'Indonesian_Indonesia'
 * 'Icelandic'
 * 'Icelandic_Iceland'
 * 'Italian'
 * 'Italian_Switzerland'
 * 'Italian_Italy'
 * 'Japanese'
 * 'Japanese_Japan'
 * 'Georgian'
 * 'Georgian_Georgia'
 * 'Kazakh'
 * 'Kazakh_Kazakhstan'
 * 'Kannada'
 * 'Kannada_India'
 * 'Korean'
 * 'Korean_Korea'
 * 'Konkani'
 * 'Konkani_India'
 * 'Kyrgyz'
 * 'Kyrgyz_Kyrgyzstan'
 * 'Lithuanian'
 * 'Lithuanian_Lithuania'
 * 'Latvian'
 * 'Latvian_Latvia'
 * 'Maori'
 * 'Maori_New_Zealand'
 * 'FYRO_Macedonian'
 * 'FYRO_Macedonian_Former_Yugoslav_Republic_of_Macedonia'
 * 'Mongolian'
 * 'Mongolian_Mongolia'
 * 'Marathi'
 * 'Marathi_India'
 * 'Malay'
 * 'Malay_Brunei_Darussalam'
 * 'Malay_Malaysia'
 * 'Maltese'
 * 'Maltese_Malta'
 * 'Norwegian_Bokmal'
 * 'Norwegian_Bokmal_Norway'
 * 'Dutch'
 * 'Dutch_Belgium'
 * 'Dutch_Netherlands'
 * 'Norwegian_Nynorsk_Norway'
 * 'Northern_Sotho'
 * 'Northern_Sotho_South_Africa'
 * 'Punjabi'
 * 'Punjabi_India'
 * 'Polish'
 * 'Polish_Poland'
 * 'Pashto'
 * 'Pashto_Afghanistan'
 * 'Portuguese'
 * 'Portuguese_Brazil'
 * 'Portuguese_Portugal'
 * 'Quechua'
 * 'Quechua_Bolivia'
 * 'Quechua_Ecuador'
 * 'Quechua_Peru'
 * 'Romanian'
 * 'Romanian_Romania'
 * 'Russian'
 * 'Russian_Russia'
 * 'Sanskrit'
 * 'Sanskrit_India'
 * 'Sami_Northern'
 * 'Sami_Northern_Finland'
 * 'Sami_Skolt_Finland'
 * 'Sami_Inari_Finland'
 * 'Sami_Northern_Norway'
 * 'Sami_Lule_Norway'
 * 'Sami_Southern_Norway'
 * 'Sami_Northern_Sweden'
 * 'Sami_Lule_Sweden'
 * 'Sami_Southern_Sweden'
 * 'Slovak'
 * 'Slovak_Slovakia'
 * 'Slovenian'
 * 'Slovenian_Slovenia'
 * 'Albanian'
 * 'Albanian_Albania'
 * 'Serbian_Latin_Bosnia_and_Herzegovina'
 * 'Serbian_Cyrillic_Bosnia_and_Herzegovina'
 * 'Serbian_Latin_Serbia_and_Montenegro'
 * 'Serbian_Cyrillic_Serbia_and_Montenegro'
 * 'Swedish'
 * 'Swedish_Finland'
 * 'Swedish_Sweden'
 * 'Swahili'
 * 'Swahili_Kenya'
 * 'Syriac'
 * 'Syriac_Syria'
 * 'Tamil'
 * 'Tamil_India'
 * 'Telugu'
 * 'Telugu_India'
 * 'Thai'
 * 'Thai_Thailand'
 * 'Tagalog'
 * 'Tagalog_Philippines'
 * 'Tswana'
 * 'Tswana_South_Africa'
 * 'Turkish'
 * 'Turkish_Turkey'
 * 'Tatar'
 * 'Tatar_Russia'
 * 'Tsonga'
 * 'Ukrainian'
 * 'Ukrainian_Ukraine'
 * 'Urdu'
 * 'Urdu_Islamic_Republic_of_Pakistan'
 * 'Uzbek_Latin'
 * 'Uzbek_Latin_Uzbekistan'
 * 'Uzbek_Cyrillic_Uzbekistan'
 * 'Vietnamese'
 * 'Vietnamese_Viet_Nam'
 * 'Xhosa'
 * 'Xhosa_South_Africa'
 * 'Chinese'
 * 'Chinese_S'
 * 'Chinese_Hong_Kong'
 * 'Chinese_Macau'
 * 'Chinese_Singapore'
 * 'Chinese_T'
 * 'Zulu'
 * 'Zulu_South_Africa'
 *
 * //---------------------------------------------------------------------------
 * // Change Log
 * //---------------------------------------------------------------------------
 * 2016.02.20 (v1.0.0) - First Release
 * 2016.03.05 (v1.0.1) - Added new function.
 * 2016.08.01 (v1.0.2) - Added a function that could be able to load a map of
 * being configure for each language.
 * 2016.10.17 (v1.0.3) - Added the function that loads the database for your system language
 */

 var Imported = Imported || {};
 Imported.RS_Localization = true;

 var RS = RS || {};
 RS.Localization = RS.Localization || {};
 RS.Localization.lang = RS.Localization.lang || {};

 (function($){

  var parameters = PluginManager.parameters('RS_Localization');
  var __defaultLang = parameters['Default Language'] || "English";
  var enabledSwitchID = Number(parameters['Enabled Switch ID'] || 11);
  var isAutomaticallyLoaded = Boolean(parameters['Auto'] === 'true');
  var isloadedDatabase = Boolean(parameters['Load Database'] === 'true');

  $['afrikaans'] = 'af';
  $['afrikaans_south_africa'] = 'af_ZA';
  $['arabic'] = 'ar';
  $['arabic_uae'] = 'ar_AE';
  $['arabic_bahrain'] = 'ar_BH';
  $['arabic_algeria'] = 'ar_DZ';
  $['arabic_egypt'] = 'ar_EG';
  $['arabic_iraq'] = 'ar_IQ';
  $['arabic_jordan'] = 'ar_JO';
  $['arabic_kuwait'] = 'ar_KW';
  $['arabic_lebanon'] = 'ar_LB';
  $['arabic_libya'] = 'ar_LY';
  $['arabic_morocco'] = 'ar_MA';
  $['arabic_oman'] = 'ar_OM';
  $['arabic_qatar'] = 'ar_QA';
  $['arabic_saudi_arabia'] = 'ar_SA';
  $['arabic_syria'] = 'ar_SY';
  $['arabic_tunisia'] = 'ar_TN';
  $['arabic_yemen'] = 'ar_YE';
  $['azeri_latin'] = 'az';
  $['azeri_latin_azerbaijan'] = 'az_AZ';
  $['azeri_cyrillic_azerbaijan'] = 'az_AZ';
  $['belarusian'] = 'be';
  $['belarusian_belarus'] = 'be_BY';
  $['bulgarian'] = 'bg';
  $['bulgarian_bulgaria'] = 'bg_BG';
  $['bosnian_bosnia_and_herzegovina'] = 'bs_BA';
  $['catalan'] = 'ca';
  $['catalan_spain'] = 'ca_ES';
  $['czech'] = 'cs';
  $['czech_czech_republic'] = 'cs_CZ';
  $['welsh'] = 'cy';
  $['welsh_united_kingdom'] = 'cy_GB';
  $['danish'] = 'da';
  $['danish_denmark'] = 'da_DK';
  $['german'] = 'de';
  $['german_austria'] = 'de_AT';
  $['german_switzerland'] = 'de_CH';
  $['german_germany'] = 'de_DE';
  $['german_liechtenstein'] = 'de_LI';
  $['german_luxembourg'] = 'de_LU';
  $['divehi'] = 'dv';
  $['divehi_maldives'] = 'dv_MV';
  $['greek'] = 'el';
  $['greek_greece'] = 'el_GR';
  $['english'] = 'en';
  $['english_australia'] = 'en_AU';
  $['english_belize'] = 'en_BZ';
  $['english_canada'] = 'en_CA';
  $['english_caribbean'] = 'en_CB';
  $['english_united_kingdom'] = 'en_GB';
  $['english_ireland'] = 'en_IE';
  $['english_jamaica'] = 'en_JM';
  $['english_new_zealand'] = 'en_NZ';
  $['english_republic_of_the_philippines'] = 'en_PH';
  $['english_trinidad_and_tobago'] = 'en_TT';
  $['english_united_states'] = 'en_US';
  $['english_south_africa'] = 'en_ZA';
  $['english_zimbabwe'] = 'en_ZW';
  $['esperanto'] = 'eo';
  $['spanish'] = 'es';
  $['spanish_argentina'] = 'es_AR';
  $['spanish_bolivia'] = 'es_BO';
  $['spanish_chile'] = 'es_CL';
  $['spanish_colombia'] = 'es_CO';
  $['spanish_costa_rica'] = 'es_CR';
  $['spanish_dominican_republic'] = 'es_DO';
  $['spanish_ecuador'] = 'es_EC';
  $['spanish_castilian'] = 'es_ES';
  $['spanish_spain'] = 'es_ES';
  $['spanish_guatemala'] = 'es_GT';
  $['spanish_honduras'] = 'es_HN';
  $['spanish_mexico'] = 'es_MX';
  $['spanish_nicaragua'] = 'es_NI';
  $['spanish_panama'] = 'es_PA';
  $['spanish_peru'] = 'es_PE';
  $['spanish_puerto_rico'] = 'es_PR';
  $['spanish_paraguay'] = 'es_PY';
  $['spanish_el_salvador'] = 'es_SV';
  $['spanish_uruguay'] = 'es_UY';
  $['spanish_venezuela'] = 'es_VE';
  $['estonian'] = 'et';
  $['estonian_estonia'] = 'et_EE';
  $['basque'] = 'eu';
  $['basque_spain'] = 'eu_ES';
  $['farsi'] = 'fa';
  $['farsi_iran'] = 'fa_IR';
  $['finnish'] = 'fi';
  $['finnish_finland'] = 'fi_FI';
  $['faroese'] = 'fo';
  $['faroese_faroe_islands'] = 'fo_FO';
  $['french'] = 'fr';
  $['french_belgium'] = 'fr_BE';
  $['french_canada'] = 'fr_CA';
  $['french_switzerland'] = 'fr_CH';
  $['french_france'] = 'fr_FR';
  $['french_luxembourg'] = 'fr_LU';
  $['french_principality_of_monaco'] = 'fr_MC';
  $['galician'] = 'gl';
  $['galician_spain'] = 'gl_ES';
  $['gujarati'] = 'gu';
  $['gujarati_india'] = 'gu_IN';
  $['hebrew'] = 'he';
  $['hebrew_israel'] = 'he_IL';
  $['hindi'] = 'hi';
  $['hindi_india'] = 'hi_IN';
  $['croatian'] = 'hr';
  $['croatian_bosnia_and_herzegovina'] = 'hr_BA';
  $['croatian_croatia'] = 'hr_HR';
  $['hungarian'] = 'hu';
  $['hungarian_hungary'] = 'hu_HU';
  $['armenian'] = 'hy';
  $['armenian_armenia'] = 'hy_AM';
  $['indonesian'] = 'id';
  $['indonesian_indonesia'] = 'id_ID';
  $['icelandic'] = 'is';
  $['icelandic_iceland'] = 'is_IS';
  $['italian'] = 'it';
  $['italian_switzerland'] = 'it_CH';
  $['italian_italy'] = 'it_IT';
  $['japanese'] = 'ja';
  $['japanese_japan'] = 'ja_JP';
  $['georgian'] = 'ka';
  $['georgian_georgia'] = 'ka_GE';
  $['kazakh'] = 'kk';
  $['kazakh_kazakhstan'] = 'kk_KZ';
  $['kannada'] = 'kn';
  $['kannada_india'] = 'kn_IN';
  $['korean'] = 'ko';
  $['korean_korea'] = 'ko_KR';
  $['konkani'] = 'kok';
  $['konkani_india'] = 'kok_IN';
  $['kyrgyz'] = 'ky';
  $['kyrgyz_kyrgyzstan'] = 'ky_KG';
  $['lithuanian'] = 'lt';
  $['lithuanian_lithuania'] = 'lt_LT';
  $['latvian'] = 'lv';
  $['latvian_latvia'] = 'lv_LV';
  $['maori'] = 'mi';
  $['maori_new_zealand'] = 'mi_NZ';
  $['fyro_macedonian'] = 'mk';
  $['fyro_macedonian_former_yugoslav_republic_of_macedonia'] = 'mk_MK';
  $['mongolian'] = 'mn';
  $['mongolian_mongolia'] = 'mn_MN';
  $['marathi'] = 'mr';
  $['marathi_india'] = 'mr_IN';
  $['malay'] = 'ms';
  $['malay_brunei_darussalam'] = 'ms_BN';
  $['malay_malaysia'] = 'ms_MY';
  $['maltese'] = 'mt';
  $['maltese_malta'] = 'mt_MT';
  $['norwegian_bokmal'] = 'nb';
  $['norwegian_bokmal_norway'] = 'nb_NO';
  $['dutch'] = 'nl';
  $['dutch_belgium'] = 'nl_BE';
  $['dutch_netherlands'] = 'nl_NL';
  $['norwegian_nynorsk_norway'] = 'nn_NO';
  $['northern_sotho'] = 'ns';
  $['northern_sotho_south_africa'] = 'ns_ZA';
  $['punjabi'] = 'pa';
  $['punjabi_india'] = 'pa_IN';
  $['polish'] = 'pl';
  $['polish_poland'] = 'pl_PL';
  $['pashto'] = 'ps';
  $['pashto_afghanistan'] = 'ps_AR';
  $['portuguese'] = 'pt';
  $['portuguese_brazil'] = 'pt_BR';
  $['portuguese_portugal'] = 'pt_PT';
  $['quechua'] = 'qu';
  $['quechua_bolivia'] = 'qu_BO';
  $['quechua_ecuador'] = 'qu_EC';
  $['quechua_peru'] = 'qu_PE';
  $['romanian'] = 'ro';
  $['romanian_romania'] = 'ro_RO';
  $['russian'] = 'ru';
  $['russian_russia'] = 'ru_RU';
  $['sanskrit'] = 'sa';
  $['sanskrit_india'] = 'sa_IN';
  $['sami_northern'] = 'se';
  $['sami_northern_finland'] = 'se_FI';
  $['sami_skolt_finland'] = 'se_FI';
  $['sami_inari_finland'] = 'se_FI';
  $['sami_northern_norway'] = 'se_NO';
  $['sami_lule_norway'] = 'se_NO';
  $['sami_southern_norway'] = 'se_NO';
  $['sami_northern_sweden'] = 'se_SE';
  $['sami_lule_sweden'] = 'se_SE';
  $['sami_southern_sweden'] = 'se_SE';
  $['slovak'] = 'sk';
  $['slovak_slovakia'] = 'sk_SK';
  $['slovenian'] = 'sl';
  $['slovenian_slovenia'] = 'sl_SI';
  $['albanian'] = 'sq';
  $['albanian_albania'] = 'sq_AL';
  $['serbian_latin_bosnia_and_herzegovina'] = 'sr_BA';
  $['serbian_cyrillic_bosnia_and_herzegovina'] = 'sr_BA';
  $['serbian_latin_serbia_and_montenegro'] = 'sr_SP';
  $['serbian_cyrillic_serbia_and_montenegro'] = 'sr_SP';
  $['swedish'] = 'sv';
  $['swedish_finland'] = 'sv_FI';
  $['swedish_sweden'] = 'sv_SE';
  $['swahili'] = 'sw';
  $['swahili_kenya'] = 'sw_KE';
  $['syriac'] = 'syr';
  $['syriac_syria'] = 'syr_SY';
  $['tamil'] = 'ta';
  $['tamil_india'] = 'ta_IN';
  $['telugu'] = 'te';
  $['telugu_india'] = 'te_IN';
  $['thai'] = 'th';
  $['thai_thailand'] = 'th_TH';
  $['tagalog'] = 'tl';
  $['tagalog_philippines'] = 'tl_PH';
  $['tswana'] = 'tn';
  $['tswana_south_africa'] = 'tn_ZA';
  $['turkish'] = 'tr';
  $['turkish_turkey'] = 'tr_TR';
  $['tatar'] = 'tt';
  $['tatar_russia'] = 'tt_RU';
  $['tsonga'] = 'ts';
  $['ukrainian'] = 'uk';
  $['ukrainian_ukraine'] = 'uk_UA';
  $['urdu'] = 'ur';
  $['urdu_islamic_republic_of_pakistan'] = 'ur_PK';
  $['uzbek_latin'] = 'uz';
  $['uzbek_latin_uzbekistan'] = 'uz_UZ';
  $['uzbek_cyrillic_uzbekistan'] = 'uz_UZ';
  $['vietnamese'] = 'vi';
  $['vietnamese_viet_nam'] = 'vi_VN';
  $['xhosa'] = 'xh';
  $['xhosa_south_africa'] = 'xh_ZA';
  $['chinese'] = 'zh';
  $['chinese_s'] = 'zh_CN';
  $['chinese_hong_kong'] = 'zh_HK';
  $['chinese_macau'] = 'zh_MO';
  $['chinese_singapore'] = 'zh_SG';
  $['chinese_t'] = 'zh_TW';
  $['zulu'] = 'zu';
  $['zulu_south_africa'] = 'zu_ZA';

  //============================================================================
  // RS.Localization
  //
  //

  RS.Localization.createSwapLangList = function () {
    var typeArray = Object.keys(this.lang);
    var temp = [];
    typeArray.forEach(function (key) {
      var value = $[i];
      temp[ value ] = key;
    }, this);
    return temp;
  };

  RS.Localization.hasOwnLanguage = function(langType) {
    return this.lang.hasOwnProperty(langType.toLowerCase());
  };

  RS.Localization.findLanguage = function(reg) {
    try {
      var arr = Object.keys(this.lang);
      arr = arr.filter(function(i) { return !!i.match(reg) });
      if(arr !== 0) { return arr[0]; } else { return 'english' }
    } catch(err) {
      throw new Error("Cannot find Language Type");
    }
  };

  RS.Localization.setSL = function(value) {
    $dataSystem.locale = value;
  };

  RS.Localization.changeSystemLanguage = function(reg) {
    var lang = RS.Localization.findLanguage(reg.toLowerCase());
    this.setSL(RS.Localization.lang[lang]);
  };

  //============================================================================
  // Game_System
  //
  //

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
      alias_Game_System_initialize.call(this);
      RS.Localization.changeSystemLanguage(__defaultLang.toLowerCase());
  };

  Game_System.prototype.isEnglish = function() {
      return $dataSystem.locale.match(/^en/);
  };

  Game_System.prototype.isLangType = function(lang) {
      var lang = RS.Localization.findLanguage(new RegExp("^" + lang, "ig"));
      return $dataSystem.locale.match(RS.Localization.lang[lang]);
  };

  Game_System.prototype.isLangMap = function () {
    return $gameSwitches.value(enabledSwitchID);
  };

  //============================================================================
  // DataManager
  //
  //

  DataManager.loadMapData = function(mapId) {
      if (mapId > 0) {
          var filename = 'Map%1.json'.format(mapId.padZero(3));
          if( $gameSystem.isLangMap() ) {
              this.loadDataFile('$dataMap', '/' + $dataSystem.locale + '/' + filename);
            } else {
              this.loadDataFile('$dataMap', filename);
          }
      } else {
          this.makeEmptyMap();
      }
  };

  DataManager.loadDataFile = function(name, src) {
      var xhr = new XMLHttpRequest();
      var url = 'data/' + src;
      var defaultLang = __defaultLang.toLowerCase();
      var locale = $[__defaultLang.toLowerCase()] || 'en';
      if(isAutomaticallyLoaded) {
        locale = navigator.language;
      }
      if(!src.contains('Test_') && !locale.contains('en') && isloadedDatabase ) {
        url = 'data/' + locale + '/' + src;
      }
      xhr.open('GET', url);
      xhr.overrideMimeType('application/json');
      xhr.onload = function() {
          if (xhr.status < 400) {
              window[name] = JSON.parse(xhr.responseText);
              DataManager.onLoad(window[name]);
          }
      };
      xhr.onerror = function() {
          DataManager._errorUrl = DataManager._errorUrl || url;
      };
      window[name] = null;
      xhr.send();
  };

  //============================================================================
  // Game_Interpreter
  //
  //

  var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    alias_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command === "Localization" || command === "언어설정") {
      switch (args[0].toLowerCase()) {
        case 'change':
        case '변경':
          RS.Localization.changeSystemLanguage(args[1]);
          break;
        default:
          RS.Localization.changeSystemLanguage(args[1]);
      }
    }
  };


 })(RS.Localization.lang);
