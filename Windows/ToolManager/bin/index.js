const cp = require('child_process');
const path = require('path');
const argv = process.argv.slice(2);
const commands = argv.map(i => `\"${i}\"`).join(" ");

process.chdir(path.join(process.cwd().replace(/\\/g, "/"), "lib"));

cp.execSync(`node index.js ${commands}`, {stdio:[0, 1, 2]});