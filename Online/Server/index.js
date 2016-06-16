/**
 * npm init
 * npm install --save express
 * npm install --save socket.io
 * npm install --save crypto-js
 * npm install --save body-parser
 * npm install --save pbkdf2-password
 *
 */

var app = require('express')();
var session = require('express-session');
var fs = require('fs');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

app.use(session({
  secret: 'f+nzTglLSOwcsfuUoDq0btcEjLafbG2cdK77gOTEmODqptelqgKSMsOqcmMEr3oTZWQyCOsUFmkJFj678Pdlug==',
  resave: false,
  saveUninitialized: true
}))

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

/**
 * 서버 객체 생성 (http, https)
 * localhost:3000
 * port : 3000
 */
var http = require('http').Server(app);
var https = require('https').createServer(options, app).listen(3000, function(){
  console.log('listening on *:3000');
});

/**
 * socket.io
 * body-parser
 * crypto-js
 * crypto-js/aes
 */
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

// JSON 파일 암호화
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

/*
 * id : 'admin'
 * password : 'admin'
 */
var users = [
    {
        id: 'admin',
        password: 'G9wuf8p+zJoE2r1twsE3FwgnIefxIt3pNNw3waZRLnpYIqEaqzHYC8SttexR1xgqE6bVyzjIGTPvdAMxErtvdgviIREPmd/cbhjVRO8PUjo/ijaIacze4+xkO2/WsN7dTK3bjuQTe6Ikn3CWqAyQUYoobj71K0W+EilcPXGzT1s=',
        salt: 'f+nzTglLSOwcsfuUoDq0btcEjLafbG2cdK77gOTEmODqptelqgKSMsOqcmMEr3oTZWQyCOsUFmkJFj678Pdlug==',
    }
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.set('dataKey', "0D0001S111");

// login.html 로 접속했을 때의 처리
app.get('/login.html', function (req, res) {
  res.set({'Content-Type': 'text/html',
  'charset': 'utf-8'});
  res.sendFile(__dirname + '/login.html');
});

// 로그인 처리
app.post('/login', function (req, res) {
    
  var userId = req.body.id;
  var userPassword = req.body.pw;
  
  // This is not using the database. But The Database will be updating later.
  for(var i=0; i < users.length; i++) {
      var user = users[i];
      if(user.id === userId) {
        hasher({password: userPassword, salt: user.salt}, function(err, pass, salt, hash) {
            if(hash === user.password) {
                // Session Handling
                // Delete : io.emit('login ok', 'ok');
            } else {
                res.send('<script type="text/javascript">alert("The Username or password is incorrect");window.location.href="/login.html";</script>');
            }
        });
      }
  }
});

// JsonFormatter.js 다운로드 요청 시
app.get('/JsonFormatter.js', function (req, res) {
  res.sendFile(__dirname + '/JsonFormatter.js');
});

io.on('connection', function(socket){
    
  // 현재 접속자 수
  io.emit('current user', io.engine.clientsCount);

  // 메시지 받기 및 전송
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  // 서버 시간 전송
  socket.on('get time', function(msg) {
    io.emit('get time', new Date().toTimeString());
  });

  // 로그인 체크
  socket.on('login ok', function(msg) {
    io.emit('login ok', 'ok');
  });
  
  // 유투브 일괄 재생
  socket.on('playYoutube', function(msg) {
    io.emit('playYoutube', "Graphics.playYoutube('https://www.youtube.com/watch?v=C4ze-KCSxQY')");
  });

  // 암호화 키 생성 및 전송
  socket.on('crypt', function(msg) {
    var encrypted = CryptoJS.AES.encrypt(msg, "Secret Passphrase", { format: JsonFormatter });
    var data = encrypted.toString();
    io.emit('crypt', data);
  });
    
  // 키 전송
  socket.on('get key', function(msg) {
    io.emit('get key', app.get('dataKey'));
  });

});

http.listen(3100, function(){
  console.log('listening on *:3100');
});
