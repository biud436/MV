/**
 * package.json을 참고하세요
 */

const express = require('express'),
      app = express(),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      fs = require('fs'),
      bkfd2Password = require("pbkdf2-password"),
      hasher = bkfd2Password(),
      DebugLog = require('./Log'),
      log = new DebugLog();

// Set the default port to app object.
app.set('port', process.env.PORT || 3000);

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const http = require('http').Server(app),
      https = require('https').createServer(options, app).listen(app.get('port'), function(){
        log.emit('info', `listening on *:${app.get('port')}`);
      }),
      io = require('socket.io')(http),
      bodyParser = require('body-parser'),
      sstatic = require('serve-static'),
      CryptoJS = require("crypto-js"),
      AES = require("crypto-js/aes"),
      path = require('path'),
      router = express.Router();

/**
 * 오류 페이지 설정
 */

const expressErrorHanlder = require('express-error-handler');

let errorHandler = expressErrorHanlder({
  static: {
    '404': './public/404.html'
  }
});

/**
 * 미들웨어 설정
 * bodyParser -> router
 */

// application/x-www-form-urlencoded 형식 처리
app.use(bodyParser.urlencoded({ extended: false }));

// JSON 형식 처리
app.use(bodyParser.json(););

// public 폴더 내로 접근
app.use('/public', sstatic( path.join(__dirname, 'public') ));

// 쿠키 처리
app.use( express.cookieParser() );

// 세션 처리
app.use(session({
    secret: 'f+nzTglLSOwcsfuUoDq0btcEjLafbG2cdK77gOTEmODqptelqgKSMsOqcmMEr3oTZWQyCOsUFmkJFj678Pdlug==',
    resave: true,
    saveUninitialized: true
}));

// 404 오류 처리
app.use( expressErrorHanlder.httpError(404) );
app.use( errorHandler );

// 라우터 설정
app.use('/', router);

//------------------------------------------------------------------------------

// const MongoClient = require('mogodb').MongoClient;
//
// class DB
// {
//   connect()
//   {
//     let databaseUrl = 'mogodb://localhost:27017/local';
//     MongoClient.connect(databaseUrl, function (err, db)
//     {
//       if (err) throw err;
//       DB.database = db;
//     });
//   }
// }
//
// DB.database = null;

let JsonFormatter = require('./module/JsonFormatter');
let BasicEmitter = require('./module/BasicEmitter');
let ServerWorker = require('./module/ServerWorker');
let Service = require('./module/Service');
let Ranking = require('./module/Ranking');

ServerWorker.create();
ServerWorker.render();
