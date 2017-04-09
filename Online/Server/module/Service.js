
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

module.exports = Service;
