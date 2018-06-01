
// https://gist.github.com/nanha/3671768

var spawn = require('child_process').spawn;

function subprocess(processname, arg, cb) {
    var p = spawn(processname, arg);

    p.on('exit', cb.exit);
    p.stdout.on('data', cb.stdout || function (out) {
        process.stdout.write(out);
    });
    p.stderr.on('data', cb.stderr || function (err) {
        process.stdout.write(err);
    });  
};

module.exports = subprocess;