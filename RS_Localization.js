/* eslint-disable no-eval */
//================================================================
// RS_Localization.js
// ---------------------------------------------------------------
// The MIT License
// Copyright (c) 2016 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
/*:
 * RS_Localization.js
 * @plugindesc This plugin provides the solution to change the game language. <RS_Localization>
 * @author biud436
 *
 * @param Default Language
 * @desc Specify the default language.
 * (default : English)
 * @default English
 *
 * @param Use System Language
 * @type boolean
 * @desc if true, the game language is set as user's system language automatically.
 * @default true
 *
 * @param Supported Languages
 * @desc Specify language codes. They are separated by a white space.
 * ex:) en ko ja pt_BR
 * @default en
 *
 * @help
 *
 * ============================================================================
 * pluginCommand
 * ============================================================================
 * At the moment, supported languages type see Language Type.
 * You should type the language name without a quotation marks when using plugin command.
 *
 * Localization Change type
 *
 * ============================================================================
 * Language Type
 * ============================================================================
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
 * Although not every languages did not add, you can define a new language,
 * need to call the script code, as follows.
 *
 * RS.Localization.lang["Language Name"] = "Language code";
 *
 * ============================================================================
 * Script
 * ============================================================================
 * In this section, We'll take you through a practical technique for changing the language.
 * There is a one function, which checks the language type.
 * This piece of code has a function to check whether the English language type is.
 * its function returns the value true or false.
 *
 * $gameSystem.isLangType('en');
 * $gameSystem.isLangType('english');
 * $gameSystem.isLangType('English');
 *
 * Next, This code change a game language with other language.
 * To use this script, you must create each languages' code folder, like data/ja, data/ko
 * also database file, too.
 *
 * RS.Localization.changeSystemLanguage('japanese');
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * 2016.02.20 (v1.0.0) - First Release
 * 2016.03.05 (v1.0.1) - Added new function.
 * 2016.08.01 (v1.0.2) - Added a function that could be able to load a map of
 * being configure for each language.
 * 2016.10.17 (v1.0.3) - Added the function that loads the database for your system language.
 * 2016.10.17 (v1.0.4) - Added the function that could check the supported languages.
 * 2018.11.13 (v1.0.5) :
 * - Now it would be reloaded the map and data base when calling the function called 'RS.Localization.changeSystemLanguage'
 * - Added the scene for loading database files.
 * 2021.01.15 (v1.0.6) :
 * - Fixed the bug that causes the error after starting battle when using a plugin named SRD_BattleStatusCustomizer.
 */
/*:ko
 * RS_Localization.js
 * @plugindesc 언어 변경 플러그인입니다. <RS_Localization>
 * @author biud436
 *
 * @param Default Language
 * @text 기본 언어
 * @desc 기본 언어를 설정하십시오.
 * (default : English)
 * @default English
 *
 * @param Use System Language
 * @text 시스템 언어 사용
 * @type boolean
 * @desc 이 값이 참이면 기본 언어 설정에 상관 없이, 시스템 언어로 시작됩니다.
 * @default true
 * @on 참
 * @off 거짓
 *
 * @param Supported Languages
 * @text 지원 언어 코드
 * @desc 지원하는 언어 코드를 입력하세요 (각 언어 코드는 공백으로 구분합니다)
 * 예:) en ko ja pt_BR
 * @default ko en
 *
 * @help
 * ============================================================================
 * 플러그인 명령
 * ============================================================================
 *
 * 언어설정 변경 언어타입
 * Localization Change type
 *
 * 지원하는 언어 타입은 다음과 같습니다.
 * 플러그인 명령 사용 시엔 작은 따옴표 없이 입력하세요.
 *
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
 * 위 목록에 지원하는 언어가 없을 경우, 스크립트로 직접 추가할 수도 있습니다.
 *
 * RS.Localization.lang["언어명"] = "언어 코드";
 *
 * ============================================================================
 * 스크립트 호출
 * ============================================================================
 *
 * 게임 언어를 체크할 수 있는 함수입니다. true 또는 false 값을 반환하게 됩니다.
 * 다음 코드를 조건 분기 스크립트 란에 설정하면 게임 언어가 영어로 설정되어있는지
 * 간단하게 확인할 수 있습니다.
 *
 * $gameSystem.isLangType('en');
 * $gameSystem.isLangType('english');
 * $gameSystem.isLangType('English');
 *
 * 게임 실행 도중 언어를 변경할 수도 있습니다.
 * 이 메소드가 호출되면 데이터베이스 파일과 맵 파일이 새로 로드됩니다.
 *
 * RS.Localization.changeSystemLanguage('korean');
 *
 * 이때 데이터 파일은 data/ko 폴더 등에서 가져오게 됩니다.
 *
 * 일본어의 경우,
 *
 * RS.Localization.changeSystemLanguage('japanese'); 라고 적으면,
 * 데이터 파일을 data/ja 폴더에서 찾게 됩니다.
 *
 * 지원 언어 코드 매개변수에 ko ja 등이 기입되어있어야 성공적으로 로드하게 됩니다.
 * 적혀있지 않으면 지원 언어가 아닌 것으로 판단하고 기본 언어로 보여주게 됩니다.
 * 기본 언어는 영어가 기본이어야 합니다.
 *
 * 즉, data 폴더 안에 기본 데이터 파일들은 영어로 되어있어야 하며,
 * ko 폴더에는 한국어로 번역된 파일들이 위치해야 합니다.
 *
 * 언어 코드 설정에 따라 언어 코드로된 폴더가 다수 필요하게 될 수 있습니다.
 *
 * 시스템 언어로 자동으로 보여주는 기능을 사용하면 자동으로 컴퓨터 언어에 맞는
 * 파일을 보여주게 됩니다.
 *
 * 물론 파일이 있어야 합니다.
 *
 * ============================================================================
 * 변경 사항
 * ============================================================================
 * 2016.02.20 (v1.0.0) - First Release
 * 2016.03.05 (v1.0.1) - Added new function.
 * 2016.08.01 (v1.0.2) - Added a function that could be able to load a map of
 * being configure for each language.
 * 2016.10.17 (v1.0.3) - Added the function that loads the database for your system language.
 * 2016.10.17 (v1.0.4) - Added the function that could check the supported languages.
 * 2018.11.13 (v1.0.5) :
 * - RS.Localization.changeSystemLanguage 함수 호출 시 해당 언어에 맞는 맵과 데이터베이스를 새로 가져옵니다.
 * - 데이터베이스 파일을 안전하게 로드하기 위한 장면을 새로 추가하였습니다.
 * 2021.01.15 (v1.0.6) :
 * - SRD_BattleStatusCustomizer 사용 시, 전투 시작 직후 오류가 발생하는 문제를 수정했습니다.
 */

RS = window.RS || {};
RS.Localization = RS.Localization || {};
RS.Localization.lang = RS.Localization.lang || {};
RS.Localization.lang.parent = RS.Localization;

function Scene_LoadDatabase(...args) {
    this.initialize.call(this, ...args);
}

(function ($) {
    'use strict';

    let parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_Localization>');
    });

    parameters = parameters.length > 0 && parameters[0].parameters;

    $.parent.Params = $.parent.Params || {};

    $.parent.Params.__defaultLang = parameters['Default Language'] || 'English';
    $.parent.Params.isUsedSystemLanguage = Boolean(
        parameters['Use System Language'] === 'true'
    );

    // All Supported Languages
    $.parent.Params.supportedLanguages = (function () {
        return parameters['Supported Languages'].split(' ') || ['en'];
    })();

    $.afrikaans = 'af';
    $.afrikaans_south_africa = 'af_ZA';
    $.arabic = 'ar';
    $.arabic_uae = 'ar_AE';
    $.arabic_bahrain = 'ar_BH';
    $.arabic_algeria = 'ar_DZ';
    $.arabic_egypt = 'ar_EG';
    $.arabic_iraq = 'ar_IQ';
    $.arabic_jordan = 'ar_JO';
    $.arabic_kuwait = 'ar_KW';
    $.arabic_lebanon = 'ar_LB';
    $.arabic_libya = 'ar_LY';
    $.arabic_morocco = 'ar_MA';
    $.arabic_oman = 'ar_OM';
    $.arabic_qatar = 'ar_QA';
    $.arabic_saudi_arabia = 'ar_SA';
    $.arabic_syria = 'ar_SY';
    $.arabic_tunisia = 'ar_TN';
    $.arabic_yemen = 'ar_YE';
    $.azeri_latin = 'az';
    $.azeri_latin_azerbaijan = 'az_AZ';
    $.azeri_cyrillic_azerbaijan = 'az_AZ';
    $.belarusian = 'be';
    $.belarusian_belarus = 'be_BY';
    $.bulgarian = 'bg';
    $.bulgarian_bulgaria = 'bg_BG';
    $.bosnian_bosnia_and_herzegovina = 'bs_BA';
    $.catalan = 'ca';
    $.catalan_spain = 'ca_ES';
    $.czech = 'cs';
    $.czech_czech_republic = 'cs_CZ';
    $.welsh = 'cy';
    $.welsh_united_kingdom = 'cy_GB';
    $.danish = 'da';
    $.danish_denmark = 'da_DK';
    $.german = 'de';
    $.german_austria = 'de_AT';
    $.german_switzerland = 'de_CH';
    $.german_germany = 'de_DE';
    $.german_liechtenstein = 'de_LI';
    $.german_luxembourg = 'de_LU';
    $.divehi = 'dv';
    $.divehi_maldives = 'dv_MV';
    $.greek = 'el';
    $.greek_greece = 'el_GR';
    $.english = 'en';
    $.english_australia = 'en_AU';
    $.english_belize = 'en_BZ';
    $.english_canada = 'en_CA';
    $.english_caribbean = 'en_CB';
    $.english_united_kingdom = 'en_GB';
    $.english_ireland = 'en_IE';
    $.english_jamaica = 'en_JM';
    $.english_new_zealand = 'en_NZ';
    $.english_republic_of_the_philippines = 'en_PH';
    $.english_trinidad_and_tobago = 'en_TT';
    $.english_united_states = 'en_US';
    $.english_south_africa = 'en_ZA';
    $.english_zimbabwe = 'en_ZW';
    $.esperanto = 'eo';
    $.spanish = 'es';
    $.spanish_argentina = 'es_AR';
    $.spanish_bolivia = 'es_BO';
    $.spanish_chile = 'es_CL';
    $.spanish_colombia = 'es_CO';
    $.spanish_costa_rica = 'es_CR';
    $.spanish_dominican_republic = 'es_DO';
    $.spanish_ecuador = 'es_EC';
    $.spanish_castilian = 'es_ES';
    $.spanish_spain = 'es_ES';
    $.spanish_guatemala = 'es_GT';
    $.spanish_honduras = 'es_HN';
    $.spanish_mexico = 'es_MX';
    $.spanish_nicaragua = 'es_NI';
    $.spanish_panama = 'es_PA';
    $.spanish_peru = 'es_PE';
    $.spanish_puerto_rico = 'es_PR';
    $.spanish_paraguay = 'es_PY';
    $.spanish_el_salvador = 'es_SV';
    $.spanish_uruguay = 'es_UY';
    $.spanish_venezuela = 'es_VE';
    $.estonian = 'et';
    $.estonian_estonia = 'et_EE';
    $.basque = 'eu';
    $.basque_spain = 'eu_ES';
    $.farsi = 'fa';
    $.farsi_iran = 'fa_IR';
    $.finnish = 'fi';
    $.finnish_finland = 'fi_FI';
    $.faroese = 'fo';
    $.faroese_faroe_islands = 'fo_FO';
    $.french = 'fr';
    $.french_belgium = 'fr_BE';
    $.french_canada = 'fr_CA';
    $.french_switzerland = 'fr_CH';
    $.french_france = 'fr_FR';
    $.french_luxembourg = 'fr_LU';
    $.french_principality_of_monaco = 'fr_MC';
    $.galician = 'gl';
    $.galician_spain = 'gl_ES';
    $.gujarati = 'gu';
    $.gujarati_india = 'gu_IN';
    $.hebrew = 'he';
    $.hebrew_israel = 'he_IL';
    $.hindi = 'hi';
    $.hindi_india = 'hi_IN';
    $.croatian = 'hr';
    $.croatian_bosnia_and_herzegovina = 'hr_BA';
    $.croatian_croatia = 'hr_HR';
    $.hungarian = 'hu';
    $.hungarian_hungary = 'hu_HU';
    $.armenian = 'hy';
    $.armenian_armenia = 'hy_AM';
    $.indonesian = 'id';
    $.indonesian_indonesia = 'id_ID';
    $.icelandic = 'is';
    $.icelandic_iceland = 'is_IS';
    $.italian = 'it';
    $.italian_switzerland = 'it_CH';
    $.italian_italy = 'it_IT';
    $.japanese = 'ja';
    $.japanese_japan = 'ja_JP';
    $.georgian = 'ka';
    $.georgian_georgia = 'ka_GE';
    $.kazakh = 'kk';
    $.kazakh_kazakhstan = 'kk_KZ';
    $.kannada = 'kn';
    $.kannada_india = 'kn_IN';
    $.korean = 'ko';
    $.korean_korea = 'ko_KR';
    $.konkani = 'kok';
    $.konkani_india = 'kok_IN';
    $.kyrgyz = 'ky';
    $.kyrgyz_kyrgyzstan = 'ky_KG';
    $.lithuanian = 'lt';
    $.lithuanian_lithuania = 'lt_LT';
    $.latvian = 'lv';
    $.latvian_latvia = 'lv_LV';
    $.maori = 'mi';
    $.maori_new_zealand = 'mi_NZ';
    $.fyro_macedonian = 'mk';
    $.fyro_macedonian_former_yugoslav_republic_of_macedonia = 'mk_MK';
    $.mongolian = 'mn';
    $.mongolian_mongolia = 'mn_MN';
    $.marathi = 'mr';
    $.marathi_india = 'mr_IN';
    $.malay = 'ms';
    $.malay_brunei_darussalam = 'ms_BN';
    $.malay_malaysia = 'ms_MY';
    $.maltese = 'mt';
    $.maltese_malta = 'mt_MT';
    $.norwegian_bokmal = 'nb';
    $.norwegian_bokmal_norway = 'nb_NO';
    $.dutch = 'nl';
    $.dutch_belgium = 'nl_BE';
    $.dutch_netherlands = 'nl_NL';
    $.norwegian_nynorsk_norway = 'nn_NO';
    $.northern_sotho = 'ns';
    $.northern_sotho_south_africa = 'ns_ZA';
    $.punjabi = 'pa';
    $.punjabi_india = 'pa_IN';
    $.polish = 'pl';
    $.polish_poland = 'pl_PL';
    $.pashto = 'ps';
    $.pashto_afghanistan = 'ps_AR';
    $.portuguese = 'pt';
    $.portuguese_brazil = 'pt_BR';
    $.portuguese_portugal = 'pt_PT';
    $.quechua = 'qu';
    $.quechua_bolivia = 'qu_BO';
    $.quechua_ecuador = 'qu_EC';
    $.quechua_peru = 'qu_PE';
    $.romanian = 'ro';
    $.romanian_romania = 'ro_RO';
    $.russian = 'ru';
    $.russian_russia = 'ru_RU';
    $.sanskrit = 'sa';
    $.sanskrit_india = 'sa_IN';
    $.sami_northern = 'se';
    $.sami_northern_finland = 'se_FI';
    $.sami_skolt_finland = 'se_FI';
    $.sami_inari_finland = 'se_FI';
    $.sami_northern_norway = 'se_NO';
    $.sami_lule_norway = 'se_NO';
    $.sami_southern_norway = 'se_NO';
    $.sami_northern_sweden = 'se_SE';
    $.sami_lule_sweden = 'se_SE';
    $.sami_southern_sweden = 'se_SE';
    $.slovak = 'sk';
    $.slovak_slovakia = 'sk_SK';
    $.slovenian = 'sl';
    $.slovenian_slovenia = 'sl_SI';
    $.albanian = 'sq';
    $.albanian_albania = 'sq_AL';
    $.serbian_latin_bosnia_and_herzegovina = 'sr_BA';
    $.serbian_cyrillic_bosnia_and_herzegovina = 'sr_BA';
    $.serbian_latin_serbia_and_montenegro = 'sr_SP';
    $.serbian_cyrillic_serbia_and_montenegro = 'sr_SP';
    $.swedish = 'sv';
    $.swedish_finland = 'sv_FI';
    $.swedish_sweden = 'sv_SE';
    $.swahili = 'sw';
    $.swahili_kenya = 'sw_KE';
    $.syriac = 'syr';
    $.syriac_syria = 'syr_SY';
    $.tamil = 'ta';
    $.tamil_india = 'ta_IN';
    $.telugu = 'te';
    $.telugu_india = 'te_IN';
    $.thai = 'th';
    $.thai_thailand = 'th_TH';
    $.tagalog = 'tl';
    $.tagalog_philippines = 'tl_PH';
    $.tswana = 'tn';
    $.tswana_south_africa = 'tn_ZA';
    $.turkish = 'tr';
    $.turkish_turkey = 'tr_TR';
    $.tatar = 'tt';
    $.tatar_russia = 'tt_RU';
    $.tsonga = 'ts';
    $.ukrainian = 'uk';
    $.ukrainian_ukraine = 'uk_UA';
    $.urdu = 'ur';
    $.urdu_islamic_republic_of_pakistan = 'ur_PK';
    $.uzbek_latin = 'uz';
    $.uzbek_latin_uzbekistan = 'uz_UZ';
    $.uzbek_cyrillic_uzbekistan = 'uz_UZ';
    $.vietnamese = 'vi';
    $.vietnamese_viet_nam = 'vi_VN';
    $.xhosa = 'xh';
    $.xhosa_south_africa = 'xh_ZA';
    $.chinese = 'zh';
    $.chinese_s = 'zh_CN';
    $.chinese_hong_kong = 'zh_HK';
    $.chinese_macau = 'zh_MO';
    $.chinese_singapore = 'zh_SG';
    $.chinese_t = 'zh_TW';
    $.zulu = 'zu';
    $.zulu_south_africa = 'zu_ZA';

    // Set up the default language code.
    $.parent.Params.locale = (function () {
        const type = $.parent.Params.__defaultLang.toLowerCase();
        const languageCollection = $[type];
        return languageCollection || 'en';
    })();

    $.parent.Params.isDirty = false;

    //============================================================================
    // RS.Localization
    //============================================================================

    RS.Localization.createSwapLangList = function () {
        const typeArray = Object.keys(this.lang);
        const temp = [];
        typeArray.forEach(key => {
            const value = $[i];
            temp[value] = key;
        });
        return temp;
    };

    RS.Localization.hasOwnLanguage = function (langType) {
        return langType.toLowerCase() in this.lang;
    };

    RS.Localization.findLanguage = function (reg) {
        try {
            let arr = Object.keys(this.lang);
            arr = arr.filter(i => {
                return !!i.match(reg);
            });
            if (arr !== 0) {
                return arr[0];
            }

            return 'english';
        } catch (err) {
            throw new Error('Cannot find Language Type');
        }
    };

    RS.Localization.setSL = function (value) {
        if ($dataSystem) {
            $dataSystem.locale = value;
        }
        $.parent.Params.locale = value;
    };

    RS.Localization.changeSystemLanguage = function (reg) {
        const lang = RS.Localization.findLanguage(reg.toLowerCase());
        this.setSL(RS.Localization.lang[lang]);
        SceneManager.push(Scene_LoadDatabase);
    };

    //============================================================================
    // Game_System
    //============================================================================

    const alias_Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        alias_Game_System_initialize.call(this);
        RS.Localization.changeSystemLanguage(
            $.parent.Params.__defaultLang.toLowerCase()
        );
    };

    Game_System.prototype.isEnglish = function () {
        return $dataSystem.locale.match(/^en/);
    };

    Game_System.prototype.isLangType = function (lang) {
        lang = RS.Localization.findLanguage(new RegExp(`^${lang}`, 'ig'));
        return $dataSystem.locale.match(RS.Localization.lang[lang]);
    };

    Game_System.prototype.isSupportedLanguage = function (locale) {
        return $.parent.Params.supportedLanguages.indexOf(locale) !== -1;
    };

    //============================================================================
    // DataManager
    //============================================================================

    /**
     * @override
     * @method loadDataFile
     * @param {String} name
     * @param {String} src
     */
    DataManager.loadDataFile = function (name, src) {
        const xhr = new XMLHttpRequest();
        let url = `data/${src}`;
        let locale = $.parent.Params.locale.slice(0, 2);
        if ($.parent.Params.isUsedSystemLanguage) {
            locale = navigator.language.slice(0, 2);
        }
        if ($.parent.Params.supportedLanguages.indexOf(locale) !== -1) {
            if (!src.contains('Test_') && !locale.contains('en')) {
                url = `data/${locale}/${src}`;
            } else if (locale.contains('en')) {
                url = `data/${src}`;
            }
        }
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function () {
            if (xhr.status < 400) {
                if (Imported.RS_UnifyAllPlugins) {
                    // RS_UnifyAllPlugins do not use global variables and then it is used inside an unique scope.
                    eval(`${name} = JSON.parse(xhr.responseText);`);
                    eval(`DataManager.onLoad(${name})`);
                } else {
                    window[name] = JSON.parse(xhr.responseText);
                    DataManager.onLoad(window[name]);
                }
            }
        };
        xhr.onerror = function () {
            DataManager._errorUrl = DataManager._errorUrl || url;
        };
        if (Imported.RS_UnifyAllPlugins) {
            eval(`${name} = null;`);
        } else {
            window[name] = null;
        }
        xhr.send();
    };

    //============================================================================
    // Scene_Boot
    //============================================================================

    const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function () {
        const ret = _Scene_Boot_isReady.call(this);
        if (ret) {
            $dataSystem.locale = $.parent.Params.locale;
        }
        return ret;
    };

    //============================================================================
    // Scene_LoadDatabase
    //============================================================================

    Scene_LoadDatabase.prototype = Object.create(Scene_Base.prototype);
    Scene_LoadDatabase.prototype.constructor = Scene_LoadDatabase;

    Scene_LoadDatabase.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
        this._startDate = Date.now();
        if ($dataSystem) {
            $dataSystem.changeLanguage = true;
        }
    };

    Scene_LoadDatabase.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        $dataActors = null;
        $dataClasses = null;
        $dataSkills = null;
        $dataItems = null;
        $dataWeapons = null;
        $dataArmors = null;
        $dataEnemies = null;
        $dataTroops = null;
        $dataStates = null;
        $dataAnimations = null;
        $dataTilesets = null;
        $dataCommonEvents = null;
        $dataSystem = null;
        $dataMapInfos = null;
        $dataMap = null;
        DataManager.loadDatabase();
    };

    Scene_LoadDatabase.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_LoadDatabase.prototype.isReady = function () {
        if (Scene_Base.prototype.isReady.call(this)) {
            return DataManager.isDatabaseLoaded();
        }

        return false;
    };

    Scene_LoadDatabase.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        if ($dataSystem) {
            $dataSystem.locale = $.parent.Params.locale;
            if (!$dataSystem.changeLanguage) {
                $.parent.Params.isDirty = true;
            }
        }
        this.updateDocumentTitle();

        if (Imported['SumRndmDde Battle Status Customizer']) {
            SRD.BattleStatusCustomizer.loadNotetags();
        }

        SceneManager.pop();
    };

    Scene_LoadDatabase.prototype.updateDocumentTitle = function () {
        document.title = $dataSystem.gameTitle;
    };

    const alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        if (!this._transfer) {
            if ($.parent.Params.isDirty) {
                $gameMap.setup($gameMap._mapId);
                $gameParty.onChangeLanguage();
                $.parent.Params.isDirty = false;
            }
        }
        alias_Scene_Map_onMapLoaded.call(this);
    };

    Game_Party.prototype.onChangeLanguage = function () {
        this.members().forEach(function (member) {
            member.onChangeLanguage(member.actorId());
        }, this);
    };

    Game_Actor.prototype.onChangeLanguage = function (actorId) {
        const actor = $dataActors[actorId];
        this._name = actor.name;
        this._nickname = actor.nickname;
        this._profile = actor.profile;
    };

    //============================================================================
    // Game_Interpreter
    //============================================================================

    const alias_Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Localization' || command === '언어설정') {
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
