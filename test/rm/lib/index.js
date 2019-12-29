const Marshal = require("marshal");
const fs = require('fs-extra');
const path = require('path');

const dataFiles = fs.readdirSync(path.join(__dirname, "..", "data"));
dataFiles.forEach(file => {
    try {
        const filename = file.split(/\./)[0];
        const inputPath = path.join(__dirname, "..", "data", file);
        const outputPath = path.join(__dirname, "..", "output", `${filename}.json`);
        const buffer = fs.readFileSync(inputPath);
        const m = new Marshal(buffer, 'hex');
        
        fs.writeFileSync(outputPath, JSON.stringify(m.parsed, null, "\t"), "utf8");
    } catch(err) {
        // 변환이 완벽하지 않음.
        // TYPE_USERDEF ('u') 부분에서 오류가 발생한다.
        // 
        // ! https://github.com/ruby/ruby/blob/master/marshal.c#L1906
        //
        // 소스를 확인해보면 TYPE_USERDEF 부분이 구현되어있지 않다.
        // 
        // ! https://github.com/clayzermk1/node-marshal/blob/master/lib/marshal.js#L18
        // 
        // emscripten-ruby 등을 이용해야 할 듯 보인다.
        // 
        // Error :
        // unsupported typecode 117 (index: 155, hex: 75, utf8: u)

        console.warn(`Failed to parse the file called ${file}`);
        console.warn(err.message);
    }

});