/**
 *
 * You should start npm and download the 'express' and 'socket.io' and
 * 'crypto-js' and 'crypto-js/aes' via the NPM.
 *
 * npm install -g express
 * npm install -g socket.io
 * npm install -g crypto-js
 * npm install -g crypto-js/aes
 * npm install -g body-parser
 *
 */

var app = require('express')();
var fs = require('fs');

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

var http = require('http').Server(app);

var https = require('https').createServer(options, app).listen(3000, function(){
  console.log('listening on *:3000');
});

var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

var JsonFormatter = {
    stringify: function (cipherParams) {
        // create json object with ciphertext
        var jsonObj = {
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
    },

    parse: function (jsonStr) {
        // parse json string
        var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
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
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.set('dataKey', "0D0001S111");

app.get('/login.html', function (req, res) {
  res.set({'Content-Type': 'text/html',
  'charset': 'utf-8'});
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', function (req, res) {
  if(req.body.id === 'admin' && req.body.pw === 'admin' ) {
    io.emit('login ok', 'ok');
  } else {
    res.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 틀렸습니다");window.location.href="/login.html";</script>');
  }
});

app.get('/JsonFormatter.js', function (req, res) {
  res.sendFile(__dirname + '/JsonFormatter.js');
});

io.on('connection', function(socket){
  io.emit('current user', io.engine.clientsCount);

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('get time', function(msg) {
    io.emit('get time', new Date().toTimeString());
  });

  socket.on('login ok', function(msg) {
    io.emit('login ok', 'ok');
  });

  socket.on('crypt', function(msg) {
    var encrypted = CryptoJS.AES.encrypt(msg, "Secret Passphrase", { format: JsonFormatter });
    var data = encrypted.toString();
    io.emit('crypt', data);
  });

  socket.on('get key', function(msg) {
    io.emit('get key', app.get('dataKey'));
  });

});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
