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
        // unsupported typecode 117 (index: 155, hex: 75, utf8: u)
        console.warn(`Failed to parse the file called ${file}`);
        console.warn(err.message);
    }

});