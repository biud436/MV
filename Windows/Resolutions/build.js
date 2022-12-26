const cd = require('child_process');
const path = require('path');
const args = process.argv.slice(2);
const outputFile = args[0];
const fs = require('fs');

let stack = [];

const child = cd.exec(
    `chcp 65001 | npx webpack`,
    { cwd: __dirname },
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
        `chcp 65001 | copy /b lib\\desc.js + bin\\${outputFile} dist\\${outputFile}`,
        {
            cwd: __dirname,
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
        fs.copyFileSync(`bin/${outputFile}.map`, `dist/${outputFile}.map`);
        fs.unlinkSync(`bin/${outputFile}.map`);
    });
});
