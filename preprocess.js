"use strict";

const pp = require("preprocess");

const minify = process.argv.includes("--minify");

const SOURCE = "src";
const DEST = "docs";

let exclude = [];

const path = require("path");
exclude = exclude.map((e) => path.join(SOURCE, e));

const katex = require("katex");
require("katex/contrib/mhchem");

// recursively process all files in SOURCE and output to DESTINATION

const fs = require("fs");
async function processFile(file) {
  if (exclude.includes(file)) {
    return;
  }
  if (file.includes("__includes")) {
    return;
  }
  let source = fs.readFileSync(file, "utf8");
  let srcDir = file.substring(0, file.lastIndexOf("/"));

  // replace "@include $lib/" with relative path
  if (source.includes("@include $lib/")) {
    let relativePath = path.relative(srcDir, path.join(SOURCE, "__lib"));
    source = source.replace(/@include \$lib\//g, `@include ${relativePath}/`);
  }

  let processed = pp.preprocess(
    source,
    {
      fullLinkBtn: (href, text) => {
        if (href.startsWith("http")) {
          return `<a href="${href}" target="_blank"><button class="full-linked-button">${text}</button></a><br/>`;
        }
        return `<a href="${href}"><button class="full-linked-button">${text}</button></a><br/>`;
      },
      time: () => {
        // HH:MM DD/MM/YYYY
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
      },
    },
    {
      srcDir,
    }
  );

  if (processed.includes("<!-- @prerender_katex -->")) {
    // remove "<!-- @prerender_katex -->"
    processed = processed.replace("<!-- @prerender_katex -->", "");
    // regex search for /\\\((.*)\\\)/gm and replace with katex
    const replace = {
      "&gt;": ">",
    };
    processed = processed.replace(/\\\((.*)\\\)/gm, (match, p1) => {
      for (let key in replace) {
        p1 = p1.replace(key, replace[key]);
      }
      try {
        return katex.renderToString(p1);
      } catch (e) {
        console.log(e);
        return match;
      }
    });
    // display math
    processed = processed.replace(/\\\[(.*)\\\]/gm, (match, p1) => {
      for (let key in replace) {
        p1 = p1.replace(key, replace[key]);
      }
      try {
        return katex.renderToString(p1, {
          displayMode: true,
        });
      } catch (e) {
        console.log(e);
        return match;
      }
    });
  }

  const dest = file.replace(SOURCE, DEST);

  if (minify && dest.endsWith(".html")) {
      const { minify } = require("html-minifier-terser");
      processed = await minify(processed, {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
      });
      console.log("Minified " + dest);
  }

  // if exists and same output, don't write
  if (fs.existsSync(dest)) {
    const destContent = fs.readFileSync(dest, "utf8");
    if (destContent === processed) {
      return;
    }
  }

  // mkdir recursively
  const destDir = dest.substring(0, dest.lastIndexOf("/"));
  fs.mkdirSync(destDir, { recursive: true });

  fs.writeFileSync(dest, processed);
}

function processDir(dir) {
  if (path.normalize(dir) === path.normalize(SOURCE + "/__lib")) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = dir + "/" + file;
    if (fs.statSync(path).isDirectory()) {
      processDir(path);
    } else {
      processFile(path);
    }
  }
}

fs.mkdir(DEST, { recursive: true }, async (err) => {
  if (err) throw err;
  await processDir(SOURCE);
  copyFavicons();
});

// copy favicons to docs/
function copyFavicons() {
  const favicons = fs.readdirSync("favicons");
  for (const file of favicons) {
    const from = "favicons/" + file;

    // if files are equal, ignore
    if (fs.existsSync(from) && fs.existsSync(DEST + "/" + file)) {
      const fromContent = fs.readFileSync(from, "utf8");
      const toContent = fs.readFileSync(DEST + "/" + file, "utf8");
      if (fromContent === toContent) {
        continue;
      }
    }

    fs.copyFileSync(from, path.join(DEST, file));
  }
}
