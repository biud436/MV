/*:
 * @plugindesc <RS_ParseWeatherData>
 * @author biud436
 *
 * @param Default Platform
 * @text Default
 *
 * @param URL
 * @text URL
 * @parent Default Platform
 * @desc
 * @default http://m.kma.go.kr/m/eng/observation/observation_01.jsp
 *
 * @param NodeJS
 *
 * @param options
 * @text Options
 * @parent NodeJS
 * @type struct<NodeJSOptions>
 * @desc
 * @default {"host":"m.kma.go.kr","port":"80","path":"/m/eng/observation/observation_01.jsp"}
 * 
 * @help
 *
 * ==========================================================================
 * Script calls
 * ==========================================================================
 * This function allows you to parse the html data through callback function.
 * 
 *  RS.Weather.parseHTML(function(doc) {
 * 
 *    // Find the <div> element in target document
 *    var inf = doc.querySelector('.inf');
 * 
 *    // Set the game title using parsing the text for weather
 *    document.title = inf.firstElementChild.nextElementSibling.textContent;    
 * 
 *  });
 *
 * ==========================================================================
 * Version Log
 * ==========================================================================
 * 2018.04.28 (v1.0.0) - First Release.
 */
 
/*~struct~NodeJSOptions:
 *
 * @param host
 * @desc
 * @default m.kma.go.kr
 *
 * @param port
 * @type number
 * @desc
 * @default 80
 * @min 80
 * @max 80
 * 
 * @param path
 * @desc
 * @default /m/eng/observation/observation_01.jsp
 */ 

/*:ko
 * @plugindesc <RS_ParseWeatherData>
 * @author 러닝은빛(biud436)
 *
 * @param Default Platform
 * @text 기본 플랫폼
 *
 * @param URL
 * @text 주소
 * @parent Default Platform
 * @desc
 * @default http://m.kma.go.kr/m/observation/observation_01.jsp
 *
 * @param NodeJS
 *
 * @param options
 * @text 옵션
 * @parent NodeJS
 * @type struct<NodeJSOptions>
 * @desc
 * @default {"host":"m.kma.go.kr","port":"80","path":"/m/observation/observation_01.jsp"}
 * 
 * @help
 *
 * ==========================================================================
 * 사용법
 * ==========================================================================
 * 다음과 같이 스크립트를 호출하세요.
 * 
 *  RS.Weather.parseHTML(function(doc) {
 *    var inf = doc.querySelector('.inf');
 *    document.title = inf.firstElementChild.nextElementSibling.textContent;    
 *  });
 *
 * ==========================================================================
 * Version Log
 * ==========================================================================
 * 2018.04.28 (v1.0.0) - 출시
 */
 
/*~struct~NodeJSOptions:ko
 *
 * @param host
 * @desc
 * @default m.kma.go.kr
 *
 * @param port
 * @type number
 * @desc
 * @default 80
 * @min 80
 * @max 80
 * 
 * @param path
 * @desc
 * @default /m/observation/observation_01.jsp
 */  

var RS = RS || {};
RS.Weather = RS.Weather || {};
 
(function($) {
  
  var parameters = $plugins.filter(function(i) {
    return i.description.contains("<RS_ParseWeatherData>");
  })[0].parameters;
  
  $.Params = $.Params || {};
  
  $.Params.url = parameters["URL"] || "http://m.kma.go.kr/m/observation/observation_01.jsp";
  
  $.Params.options = JSON.parse(parameters["options"]);
  
  /**
   * https://stackoverflow.com/a/20462701 By 존 슬러거
   */
  function parseHTML(markup) {
      if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
          var doc = document.implementation.createHTMLDocument("");
          doc.documentElement.innerHTML = markup;
          return doc;
      } else if ('content' in document.createElement('template')) {
         // Template tag exists!
         var el = document.createElement('template');
         el.innerHTML = markup;
         return el.content;
      } else {
         // Template tag doesn't exist!
         var docfrag = document.createDocumentFragment();
         var el = document.createElement('body');
         el.innerHTML = markup;
         for (i = 0; 0 < el.childNodes.length;) {
             docfrag.appendChild(el.childNodes[i]);
         }
         return docfrag;
      }
  };

  function parse(cb) {
    var method = Utils.isNwjs() ? parseHTMLFromNodeJS : parseHTMLFromXML;
    method(cb);
  };

  function parseHTMLFromXML(cb) {

    var url = $.Params.url;
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(null);
    xhr.overrideMimeType('document');
    xhr.onload = function() {
        if (xhr.status < 400) {
          try {
            var el = parseHTML(xhr.responseText);
            cb(el);
          } catch(e) {
            // CORS로 인한 오류 방지
          }
        }
    }.bind(this);  
  };
  
  function parseHTMLFromNodeJS(cb) {

    var options = $.Params.options;
    
    var http = require('http');

    var req = http.get(options, function(res) {
      
      var resData = "";
      res.on('data', function(chunk) {
        resData += chunk;
      });
      
      res.on('end', function() {
        var doc = parseHTML(resData);
        cb(doc);
      });
      
    });

    req.on('error', function(err) {
      console.log(err.message);
    });      
  }
  
  // Export function
  $.parseHTML = parse;
   
})(RS.Weather);
  