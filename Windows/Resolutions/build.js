const cd = require('child_process');
const path = require('path');
const args = process.argv.slice(2);
const outputFile = args[0];
const fs = require('fs');

let child = cd.exec(`npx webpack`, {cwd: __dirname}, (err, stdout, stdin) => {
    if(err) {
        throw new Error(err);
    }
});

child.stdout.on("data", c => {
    console.log(c);
});

child.on("exit", (code, signal) => {
    let child2 = cd.exec(`chcp 65001 | copy /b lib\\desc.js + bin\\${outputFile} dist\\${outputFile}`, {
            cwd: __dirname, 
            encoding: "utf8"
        },
        err => {
            if(err) console.warn(err.message);
        }
    );

    child2.stdout.on("data", c => {
        console.log(c);
    });    

    child2.on("exit", () => {
        fs.unlinkSync(`bin/${outputFile}`);
    });    

});