const pp = require('preprocess');

const SOURCE = "src"
const DEST = "docs"

let exclude = [
    "/header.html"
]

const path = require('path');
exclude = exclude.map(e => path.join(SOURCE, e));

// recursively process all files in SOURCE and output to DESTINATION

const fs = require('fs');


function processFile(file) {
    if (exclude.includes(file)) {
        return;
    }
    if(file.includes("__includes")){
        return;
    }
    const source = fs.readFileSync(file, 'utf8');
    let srcDir = file.substring(0, file.lastIndexOf('/'));
    const processed = pp.preprocess(source, process.env, {
        srcDir,
    });
    // mkdir recursively
    const dest = file.replace(SOURCE, DEST);
    const destDir = dest.substring(0, dest.lastIndexOf('/'));
    fs.mkdirSync(destDir, { recursive: true });

    // if exists and same output, don't write
    if (fs.existsSync(dest)) {
        const destContent = fs.readFileSync(dest, 'utf8');
        if (destContent === processed) {
            return;
        }
    } 

    fs.writeFileSync(dest, processed);
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const path = dir + '/' + file;
        if (fs.statSync(path).isDirectory()) {
            processDir(path);
        } else {
            console.log(path);
            processFile(path);
        }
    }
}

processDir(SOURCE);