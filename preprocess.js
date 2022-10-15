"use strict";

const pp = require("preprocess");

const SOURCE = "src";
const DEST = "docs";

let exclude = ["/header.html"];

const path = require("path");
exclude = exclude.map((e) => path.join(SOURCE, e));

const katex = require("katex");
require("katex/contrib/mhchem");

// recursively process all files in SOURCE and output to DESTINATION

const fs = require("fs");
function processFile(file) {
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
    processed = processed.replace(/\\\((.*)\\\)/gm, (match, p1) => {
      const replace = {
        "&gt;" : ">",
      }
      for(let key in replace) {
        p1 = p1.replace(key, replace[key]);
      }
      try {
        return katex.renderToString(p1);
      } catch (e) {
        console.log(e);
        return match;
      }
    });
  }

  const dest = file.replace(SOURCE, DEST);
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
  if (path.normalize(dir) == path.normalize(SOURCE + "/__lib")) return;
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

processDir(SOURCE);
