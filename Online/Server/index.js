/**
 * =============================================================================
 * npm init
 * npm install --save express
 * npm install --save socket.io
 * npm install --save crypto-js
 * npm install --save body-parser
 * npm install --save pbkdf2-password
 * =============================================================================
 */

const app = require('express')();
const session = require('express-session');
const fs = require('fs');
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();

app.use(session({
  secret: 'f+nzTglLSOwcsfuUoDq0btcEjLafbG2cdK77gOTEmODqptelqgKSMsOqcmMEr3oTZWQyCOsUFmkJFj678Pdlug==',
  resave: false,
  saveUninitialized: true
}));

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const http = require('http').Server(app);
const https = require('https').createServer(options, app).listen(3000, function(){
  console.log('listening on *:3000');
});
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");

/**
 * =============================================================================
 * JSON 파일 암호화
 * @class JsonFormatter
 * =============================================================================
 */

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

/**
 * =============================================================================
 * @class BasicEmitter
 * =============================================================================
 */

class BasicEmitter {

  constructor(msg, result, cb) {
    this._message = msg;
    this._result = result;
    this._cb = cb;
  }

  recv(socket) {
    const command = this._message;
    const res = this._result;
    socket.on(command, function(msg) {
      io.emit(command, res);
    });
    if(typeof this._cb === 'function') this._cb();
  }

}

/**
 * =============================================================================
 * @class ServerWorker
 * =============================================================================
 */

class ServerWorker {

    static create() {
      // Add an admin
      this.users = [
          {
              id: 'admin',
              password: 'G9wuf8p+zJoE2r1twsE3FwgnIefxIt3pNNw3waZRLnpYIqEaqzHYC8SttexR1xgqE6bVyzjIGTPvdAMxErtvdgviIREPmd/cbhjVRO8PUjo/ijaIacze4+xkO2/WsN7dTK3bjuQTe6Ikn3CWqAyQUYoobj71K0W+EilcPXGzT1s=',
              salt: 'f+nzTglLSOwcsfuUoDq0btcEjLafbG2cdK77gOTEmODqptelqgKSMsOqcmMEr3oTZWQyCOsUFmkJFj678Pdlug==',
              score: 0
          }
      ];
      this.ranking = new Ranking();
      this.state = 'idle';
    }

    static render() {
      this.processBodyParser();
      this.processDataKey();
      this.requestLoginPage();
      this.requestJsonFomatter();
      this.processSocketIo();
      this.waitForHttpConneted();
    }

    static processBodyParser() {
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
    }

    static processDataKey() {
      app.set('dataKey', "0D0001S111");
    }

    // login.html 로 접속했을 때의 처리
    static reqeustLoginPage() {

      app.get('/login.html', function (req, res) {
        res.set({'Content-Type': 'text/html',
        'charset': 'utf-8'});
        res.sendFile(__dirname + '/login.html');
      });

      app.post('/login', function (req, res) {

        var userId = req.body.id;
        var userPassword = req.body.pw;

        // This is not using the database. But The Database will be updating later.
        for(var i=0; i < ServerWorker.users.length; i++) {
            var user = ServerWorker.users[i];
            if(ServerWorker.user.id === userId) {
              hasher({password: userPassword, salt: ServerWorker.user.salt}, function(err, pass, salt, hash) {
                  if(hash === ServerWorker.user.password) {
                      // Session Handling
                      // Delete : io.emit('login ok', 'ok');
                  } else {
                      res.send('<script type="text/javascript">alert("The Username or password is incorrect");window.location.href="/login.html";</script>');
                  }
              });
            }
        }
      });

    }

    // JsonFormatter.js 다운로드 요청 시
    static requestJsonFomatter() {
      app.get('/JsonFormatter.js', function (req, res) {
        res.sendFile(__dirname + '/JsonFormatter.js');
      });
    }

    static processSocketIo() {
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

        this.ranking.on(socket);

      });
    }

    static waitForHttpConneted() {
      http.listen(3100, function(){
        console.log('listening on *:3100');
      });
    }

    static registerNewUser(id, password, salt) {
      this.users.push( { 'id': '', 'password': '', 'salt': '', 'score': 0 } )
    }

  }

/**
 * =============================================================================
 * @class Service
 * =============================================================================
 */

  class Service {

    constructor() {
      this._emitter = new BasicEmitter(this.command(), this.result(), this.render);
      this._dirty = false;
    }

    command() {
      return '';
    }

    result() {
      return '';
    }

    render() {
    }

    on(socket) {
      this._emitter.recv(socket);
    }

  }

/**
 * =============================================================================
 * @class Ranking
 * =============================================================================
 */

  class Ranking extends Service {

    constructor() {
      super();
      this._ranking = [];
    }

    command() {
      return 'Ranking Update';
    }

    result() {
      return '';
    }

    register(newUser) {
      this._ranking.push(newUser);
      this._dirty = true;
    }

    sort() {
      this._ranking.sort(function (a, b) {
        return a.score - b.score;
      });
    }

    render() {
      super.render();
      if(this._dirty) {
        this.sort();
        this.cut();
        this._dirty = false;
      }
    }

    cut() {
      const len = this._ranking.length;
      const max = 30;
      if(len > max) {
        this._ranking.splice(max - 1, len);
      }
    }

  }

ServerWorker.create();
ServerWorker.render();
