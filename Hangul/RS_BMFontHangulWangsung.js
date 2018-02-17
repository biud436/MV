//==============================================================================
// RS_BMFontHangulWangsung.js
//==============================================================================

/*:
 * @plugindesc 비트맵 폰트(완성형 한글)
 * @author biud436
 * @help
 * 완성형은 조합형보다 비효율적이고 메모리를 많이 사용하지만 만들기가 상당히 쉽다는 게
 * 특징이다.
 * =============================================================================
 * Change Log (개발중)
 * =============================================================================
 * 2018.02.15 - 파싱 추가
 */

var Imported = Imported || {};
Imported.RS_BMFontHangulWangsung = true;

(function () {

  var BM = BM || {};

  BM.importDataWithAjax = function (fileName, func) {
    var xhr = new XMLHttpRequest();
    var url = 'img/pictures/' + fileName;
    xhr.open('GET', url);
    xhr.onload = function() {
      if(xhr.status < 400) {
        func(xhr.responseText.slice(0));
      }
    }
    xhr.send();
  };

  BM.initialize = function () {
    var self = BM;
    self._info = {};
    self._common = {};
    self._pages = [];
    self._chars = [];
    self._kernings = [];
    self.importDataWithAjax("hangul.fnt", BM.parse.bind(self));
  };

  BM.parse = function (text) {
    var self = BM;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(text, "text/xml");
    var root = xmlDoc.getElementsByTagName("font")[0];
    for (var e = root.firstElementChild; e != null; e = e.nextElementSibling) {
      if(e.tagName === "info") self.parseInfo(e, self._info);
      if(e.tagName === "common") self.parseCommon(e, self._common);
      if(e.tagName === "pages") self.parsePages(e, self._pages);
      if(e.tagName === "chars") self.parseChars(e, self._chars);
      if(e.tagName === "kernings") self.parseKernings(e, self._kernings);
    }
  };

  BM.parseInfo = function (root, item) {
    var xmlDoc = root;
    item.face = xmlDoc.getAttribute("face");
    item.size = parseInt(xmlDoc.getAttribute("size"));
    item.bold = parseInt(xmlDoc.getAttribute("bold"));
    item.italic = parseInt(xmlDoc.getAttribute("italic"));
    item.charset = parseInt(xmlDoc.getAttribute("charset"));
    item.unicode = parseInt(xmlDoc.getAttribute("unicode"));
    item.charset = xmlDoc.getAttribute("charset");
    item.stretchH = parseInt(xmlDoc.getAttribute("stretchH"));
    item.smooth = parseInt(xmlDoc.getAttribute("smooth"));
    item.aa = parseInt(xmlDoc.getAttribute("aa"));
    item.padding = JSON.parse("[" + xmlDoc.getAttribute("padding") + "]");
    item.spacing = JSON.parse("[" + xmlDoc.getAttribute("spacing") + "]");
    item.outline = parseInt(xmlDoc.getAttribute("outline"));
  };

  BM.parseCommon = function (root, item) {
    var xmlDoc = root;
    item.lineHeight = parseInt(xmlDoc.getAttribute("lineHeight"));
    item.base = parseInt(xmlDoc.getAttribute("base"));
    item.scaleW = parseInt(xmlDoc.getAttribute("scaleW"));
    item.scaleH = parseInt(xmlDoc.getAttribute("scaleH"));
    item.pages = parseInt(xmlDoc.getAttribute("pages"));
    item.packed = parseInt(xmlDoc.getAttribute("packed"));
    item.alphaChnl = parseInt(xmlDoc.getAttribute("alphaChnl"));
    item.redChnl = parseInt(xmlDoc.getAttribute("redChnl"));
    item.greenChnl = parseInt(xmlDoc.getAttribute("greenChnl"));
    item.blueChnl = parseInt(xmlDoc.getAttribute("blueChnl"));
  };

  BM.parsePages = function (root, item) {
    var xmlDoc = root;
    for (var e = root.firstElementChild; e != null; e = e.nextElementSibling) {
      if(e.tagName === "page") {
        var newChildItem = {};
        newChildItem.id = parseInt(e.getAttribute("id"));
        newChildItem.file = e.getAttribute("file");
        item.push(newChildItem);
      }
    }
  };

  BM.parseChildElements = function (root, item) {
    var xmlDoc = root.firstElementChild;
    for (var e = root.firstElementChild; e != null; e = e.nextElementSibling) {
      var newChildItem = {};
      item.push(BM.parseChildElement(e, newChildItem));
    }
  };

  BM.parseChars = function (root, item) {
    var xmlDoc = root.firstElementChild;
    for (var e = root.firstElementChild; e != null; e = e.nextElementSibling) {
      var newChildItem = {};
      newChildItem.id = e.getAttribute("id");
      item[newChildItem.id] = BM.parseChildElementForChar(e, newChildItem);
    }
  };

  BM.parseChildElementForChar = function (root, item) {
    var xmlDoc = root;
    // var attributeNames = xmlDoc.getAttributeNames();
    // attributeNames.forEach(function (attributeName) {
    //   item[attributeName] = parseInt(xmlDoc.getAttribute(attributeName));
    // }, this);
    item.x = parseInt(xmlDoc.getAttribute("x"));
    item.width = parseInt(xmlDoc.getAttribute("width"));
    item.height = parseInt(xmlDoc.getAttribute("height"));
    item.xoffset = parseInt(xmlDoc.getAttribute("xoffset"));
    item.yoffset = parseInt(xmlDoc.getAttribute("yoffset"));
    item.xadvance = parseInt(xmlDoc.getAttribute("xadvance"));
    item.page = parseInt(xmlDoc.getAttribute("page"));
    item.chnl = parseInt(xmlDoc.getAttribute("chnl"));
    return item;
  };

  BM.parseKernings = function (root, item) {
    var xmlDoc = root.firstElementChild;
    for (var e = root.firstElementChild; e != null; e = e.nextElementSibling) {
      var newChildItem = {};
      newChildItem.id = e.getAttribute("id");
      item[newChildItem.id] = BM.parseChildElementForKerning(e, newChildItem);
    }
  };

  BM.parseChildElementForKerning = function (root, item) {
    var xmlDoc = root;
    item.first = parseInt(xmlDoc.getAttribute("first"));
    item.second = parseInt(xmlDoc.getAttribute("second"));
    item.amount = parseInt(xmlDoc.getAttribute("amount"));
    return item;
  };

  BM.initialize();

  window.BM = BM;

})();
