var express = require('express'),
    http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serve = require('serve-static'),
    errorHandler = require('errorhandler'),
    expressErrorHandler = require('express-error-handler'),
    expressSession = require('express-session'),
    multer = require('multer'),
    fs = require('fs'),
    cors = require('cors');

var config = require('./config');
var app = express();

//------------------------------------------------------------------------------

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.set('port', config.port);
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(bodyParser.json());

app.use(serve( path.join(__dirname, 'public') ));

app.use(cookieParser());

app.use(expressSession({
    secret: 'key',
    resave: true,
    saveUninitialized: true
}));

app.use(cors());

// file upload
var storage = multer.diskStorage({
  // 업로드한 파일이 저장될 폴더.
  destination: function (req, file, callback) {
      callback(null, 'uploads');
  },
  // the filename changes by below rule.
  filename: function (req, file, callback) {
      callback(null, file.originalname, + Date.now());
  }
});

var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024 // 1MB
  }
});

//------------------------------------------------------------------------------
// Router
//------------------------------------------------------------------------------

var router = express.Router();

router.route('/test').post(function (req, res) {
  res.render('test.ejs', {pagename: 'test.html'});
});

router.route('/photo').post(upload.array('photo', 1), function (req, res) {
    try {
      var files = req.files;
      var originalname = '',
          filename = '',
          mimetype = '',
          size = 0;

      var isMultipleFile = Array.isArray(files);

      if(isMultipleFile) {

        for (var i = 0; i < files.length; i++) {

          originalname = files[i].originalname;
          filename = files[i].filename;
          mimetype = files[i].mimetype;
          size = files[i].size;

        }

      } else {

        originalname = files[0].originalname;
        filename = files[0].filename;
        mimetype = files[0].mimetype;
        size = files[0].size;

      }

      res.render('upload_success.ejs', {
        'originalname': originalname,
        'filename': filename,
        'mimetype': mimetype,
        'size': size
      });


    } catch (e) {
      console.dir(e.stack);
    }
});

app.use('/', router);

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------

app.get('/', function (req, res) {
  res.redirect('photo.html');
  req.session.user = {
    done: true,
    authorized: true
  };
});

app.get('/test', function (req, res) {
  if(req.session.user) {
    req.session.destory(function (err) {
      res.redirect('/');
    });
    res.redirect('test.html');
  } else {
    res.redirect('404.html');
  }
});

//------------------------------------------------------------------------------
// Error
//------------------------------------------------------------------------------
var errorHandler = expressErrorHandler({
  'static': {
    '404': './public/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

app.all('*', function (req, res) {
  res.status(403).send('Forbidden');
});

//------------------------------------------------------------------------------
// Server
//------------------------------------------------------------------------------
http.createServer(app).listen(app.get('port'), function () {
  console.log(`port *${app.get('port')}`);
});
