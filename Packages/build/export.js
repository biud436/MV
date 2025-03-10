const cd = require('child_process');
const path = require('path');
const args = process.argv.slice(2);
const fs = require('fs');
const outputFile = args[0];
const mainFolder = outputFile.split('.')[0];

let stack = [];

let child = cd.exec(
  `chcp 65001 | npx webpack --config=webpack.${mainFolder}.config.js --mode production`,
  { cwd: path.join(__dirname, '..') },
  (err, stdout, stdin) => {
    if (err) {
      throw new Error(err);
    }
  }
);

child.stdout.on('data', c => {
  stack.push(c);
});

child.on('exit', (code, signal) => {
  let child2 = cd.exec(
    `chcp 65001 | copy /b lib\\${mainFolder}\\desc.js + bin\\${outputFile} ..\\${outputFile}`,
    {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
    },
    err => {
      if (err) console.warn(err.message);
      console.log(stack.join('\r\n'));
      stack = [];
    }
  );

  child2.stdout.on('data', c => {
    console.log(c);
  });

  child2.on('exit', () => {
    fs.unlinkSync(`bin/${outputFile}`);
    fs.copyFileSync(`bin/${outputFile}.map`, `../${outputFile}.map`);
    fs.unlinkSync(`bin/${outputFile}.map`);
  });
});
