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

module.exports = BasicEmitter;
