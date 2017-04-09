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
      this.processDataKey();
      this.requestLoginPage();
      this.requestJsonFomatter();
      this.processSocketIo();
      this.waitForHttpConneted();
    }

    static processDataKey() {
      app.set('dataKey', "0D0001S111");
    }

    // login.html 로 접속했을 때의 처리
    static reqeustLoginPage() {

      app.get('/login.html', function (req, res) {
        res.set({'Content-Type': 'text/html', 'charset': 'utf-8'});
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
        log.emit('info', 'listening on *:3100');
      });
    }

    static registerNewUser(id, password, salt) {
      this.users.push( { 'id': '', 'password': '', 'salt': '', 'score': 0 } )
    }

  }

  module.exports = ServerWorker;
