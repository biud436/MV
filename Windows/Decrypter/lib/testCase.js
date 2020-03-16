const argv = require('minimist')(process.argv.slice(2), {
    h: 'help'
});

console.log(argv);