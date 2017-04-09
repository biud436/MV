
class JsonFormatter {

  static stringify(cipherParams) {
    // create json object with ciphertext
    let jsonObj = {
        ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
    };

    // optionally add iv and salt
    if (cipherParams.iv) {
        jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
        jsonObj.s = cipherParams.salt.toString();
    }

    // stringify json object
    return JSON.stringify(jsonObj);
  }

  static parse(jsonStr) {
    // parse json string
    let jsonObj = JSON.parse(jsonStr);

    // extract ciphertext from json object, and create cipher params object
    let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
    });

    // optionally extract iv and salt
    if (jsonObj.iv) {
        cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
    }
    if (jsonObj.s) {
        cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
    }

    return cipherParams;
  }
}

module.exports = JsonFormatter;
