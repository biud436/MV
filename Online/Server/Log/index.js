//==============================================================================
// var DebugLog = require('./Log');
// var log = new DebugLog();
// log.emit('info',  'message');
// log.emit('debug', 'message');
// log.emit('error', 'message');
//==============================================================================
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var moment = require('moment');

function timeStampFormat() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
};

var logger = new (winston.Logger)({
  transports: [
    new (winstonDaily)({
      name: 'log-file',
      filename: './log/server',
      datePattern: '_yyyy-MM-dd.log',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'info',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    }),
    new (winston.transports.Console)({
      name: 'debug-console',
      colorize: true,
      level: 'debug',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    })
  ],
  exceptionHandlers: [
    new (winstonDaily)({
      name: 'exception-file',
      filename: './log/exception',
      datePattern: '_yyyy-MM-dd.log',
      colorize: false,
      maxsize: 50000000,
      maxFiles: 1000,
      level: 'error',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    }),
    new (winston.transports.Console)({
      name: 'exception-console',
      colorize: true,
      level: 'debug',
      showLevel: true,
      json: false,
      timestamp: timeStampFormat
    })
  ]
});

/**
 * This class provides an EventEmitter can show up the debug message to your console.
 * @class DebugLog
 */
var DebugLog = function () {
  this.on('debug', function (s) {
    logger.debug(s);
  });
  this.on('info', function (s) {
    logger.info(s);
  });
  this.on('error', function (s) {
    logger.error(s);
  });
};

util.inherits(DebugLog, EventEmitter);

module.exports = DebugLog;
