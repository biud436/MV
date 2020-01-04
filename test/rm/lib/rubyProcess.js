
const __RUBY_PATH = "irb";
const cp = require('child_process');

class RubyProcess {
   constructor(callback) {
        this._process = null;
        this._callback = callback;
   }

   run() {
        this._process = cp.execFile(
            __RUBY_PATH, 
            this._args, 
            {
                encoding: 'utf8', 
                maxBuffer: 1024 * 1024
            }, 
            this._callback
        );
        this._process.stdout.on('data', function (data) {
            console.clear();
            console.log(data);
        });
        this._process.stdout.on('end', function (data) {
            console.log(data);
        });            
        return this._process.stdin;
   }
}

module.exports = RubyProcess;