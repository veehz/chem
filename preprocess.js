"use strict";

const pp = require("preprocess");
const path = require("path");

const options = {
  minify: process.argv.includes("--minify"),
  development: process.argv.includes("--development"),
  prefetch: process.argv.includes("--prefetch"),
};

options.production = !options.development;

const SOURCE = "src";
const DEST = "docs";

let exclude = [];
const page_specific_context = [["index.html", { noBackButton: true }]];

const page_specific_context_map = {};
for (const [file, context] of page_specific_context) {
  page_specific_context_map[path.normalize(file)] = context;
}

exclude = exclude.map((e) => path.join(SOURCE, e));

const katex = require("katex");
require("katex/contrib/mhchem");

const all_index_files = [];

// recursively process all files in SOURCE and output to DESTINATION

const fs = require("fs");
async function processFile(file) {
  if (exclude.includes(file)) {
    return;
  }
  if (file.includes("__includes")) {
    return;
  }
  if (file.includes("index.html")) {
    all_index_files.push(
      path.relative(SOURCE, file.substring(0, file.lastIndexOf("/")))
    );
  }

  const processedTypes = [".html", ".js", ".css", ".svg"];
  if (!processedTypes.includes(path.extname(file))) {
    const dest = path.join(DEST, path.relative(SOURCE, file));
    // if files are equal, ignore
    if (fs.existsSync(file) && fs.existsSync(dest)) {
      const srcBuff = fs.readFileSync(file);
      const destBuff = fs.readFileSync(dest);
      if (srcBuff.equals(destBuff)) {
        return;
      }
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
    return;
  }

  let source = fs.readFileSync(file, "utf8");
  let srcDir = file.substring(0, file.lastIndexOf("/"));

  // include js files (using @includejs)
  source = source.replace(/<!--\s*\@includejs\s*(.*)\s*-->/gm, (match, p1) => {
    const jsFiles = p1
      .split(" ")
      .filter((f) => f.trim() != "")
      .map((f) => `<!-- @include ${f.trim()} -->`);
    return `<script>${jsFiles.join("\n")}</script>`;
  });

  // include css files (using @includecss)
  source = source.replace(/<!--\s*\@includecss\s*(.*)\s*-->/gm, (match, p1) => {
    const cssFiles = p1
      .split(" ")
      .filter((f) => f.trim() != "")
      .map((f) => `<!-- @include ${f.trim()} -->`);
    return `<style>${cssFiles.join("\n")}</style>`;
  });

  // include from __lib
  source = source.replace(
    /<!--\s*\@include\s*\$lib\/([^\s]*)\s*-->/gm,
    (match, p1) => {
      let relativePath = path.relative(srcDir, path.join(SOURCE, "__lib"));
      return `<!-- @include ${relativePath}/${p1} -->`;
    }
  );

  let processed = pp.preprocess(
    source,
    {
      fullLinkBtn: (href, text) => {
        if (href.startsWith("http")) {
          return `<a href="${href}" target="_blank"><button class="full-linked-button">${text}</button></a><br/>`;
        }

        const prefetch = [];
        const realHrefDir = path.normalize(path.join(srcDir, href));
        if (options.prefetch && fs.existsSync(path.join(realHrefDir, "img"))) {
          const imgs = fs.readdirSync(path.join(realHrefDir, "img"));
          for (const img of imgs) {
            prefetch.push(
              `<link rel="prefetch" href="${path.relative(
                srcDir,
                path.join(realHrefDir, "img", img)
              )}">`
            );
          }
        }

        const needTrailingSlash =
          !href.endsWith("/") && !href.split("/").pop().includes(".");
        return `${prefetch.join("")}<a href="${href}${
          needTrailingSlash ? "/" : ""
        }"><button class="full-linked-button">${text}</button></a><br/>`;
      },
      time: () => {
        // HH:MM DD/MM/YYYY
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        } ${day < 10 ? "0" + day : day}/${
          month < 10 ? "0" + month : month
        }/${year}`;
      },
      PRODUCTION: options.production,
      DEVELOPMENT: options.development,
      relLink: (href) => {
        if (options.production) {
          return "/" + require("./package.json").subpage + href;
        }
        return href;
      },
      ...page_specific_context_map[path.normalize(path.relative(SOURCE, file))],
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
      "&lt;": "<",
      "&gt;": ">",
      "->": String.raw`}\ \allowbreak \ce{->`,
    };
    processed = processed.replace(/\\\(([\s\S]*?)\\\)/gm, (match, p1) => {
      for (let key in replace) {
        p1 = p1.replaceAll(key, replace[key]);
      }
      try {
        return katex.renderToString(p1);
      } catch (e) {
        console.log(e);
        return match;
      }
    });
    // display math
    processed = processed.replace(/\\\[([\s\S]*?)\\\]/gm, (match, p1) => {
      for (let key in replace) {
        p1 = p1.replaceAll(key, replace[key]);
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

  // replacement
  const replaces = [
    // [`<tree>`, `<div id="tree">`],
    // [`</tree>`, `</div>`],
    // [/<entry\s*(.*?)\s*>/gm, `<div class="entry"><span>$1</span>`],
    // [`</entry>`, `</div>`],
    // [`<sentry>`, `<div class="entry"><span>`],
    // [`</sentry>`, `</span></div>`],
    // [`<branch>`, `<div class="branch">`],
    // [`</branch>`, `</div>`],
    [/<cr\s*(.*?)\s*>/gm, `<span style="color: $1">`],
    [`</cr>`, `</span>`],
  ];
  for (let i = 0; i < replaces.length; i++) {
    processed = processed.replaceAll(replaces[i][0], replaces[i][1]);
  }

  // minify
  const dest = path.join(DEST, path.relative(SOURCE, file));

  if (options.minify) {
    if (dest.endsWith(".html")) {
      const { minify } = require("html-minifier-terser");
      processed = await minify(processed, {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        sortAttributes: true,
        sortClassName: true,
      });
      console.log("Minified " + dest);
    }

    if (dest.endsWith(".css")) {
      const CleanCSS = require("clean-css");
      processed = await new CleanCSS({
        level: {
          2: {
            all: true,
          },
        },
      }).minify(processed).styles;
      console.log("Minified " + dest);
    }
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
  if (options.production) {
    const { SitemapStream, streamToPromise } = require("sitemap");
    const { Readable } = require("stream");

    // An array with your links
    const name = require("./package.json").subpage;
    const links = all_index_files.map((f) => {
      return {
        url: path.normalize(path.join(name, f, "/")),
        changefreq: "daily",
        priority: f == "" ? 1 : 0.8,
      };
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: "https://veehz.github.io/",
    });

    streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
      // write data to sitemap.xml
      fs.writeFileSync(path.join(DEST, "sitemap.xml"), data.toString());
      console.log(`Wrote ${DEST}/sitemap.xml`);
    });
  }
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
