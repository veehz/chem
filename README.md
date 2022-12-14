# Chemistry Revision

This is a collection of notes and resources for chemistry revision for my own use (UEC).

- `/src` contains the source files,
- `/docs` contains the built files. (docs because I want to use github pages without a new branch)

## Getting Started

### Building

1. Install the packages with `npm install`.
2. Delete the `/docs` folder and run `node preprocess.js` to build the site.

### Preview

To preview the site, run `npx live-server` in `/docs` and open `localhost:8080` in your browser.

### Deploy

To deploy the site, run `npm run deploy`, which runs `npm run build && node gh-pages.js`.

### Development Environment (on my machine)

1. Install the packages with `npm install`.
2. Install `when-changed` [here.](https://github.com/joh/when-changed)
3. Run `npm run dev`.

## Preprocess Functions

[preprocess](https://www.npmjs.com/package/preprocess) is used to preprocess the files.

### To Note

`@include` uses relative paths (relative to the compiled file).

### Additional Functions

1. `@includejs` can include js files in html.
2. `@prerender_katex` can prerender katex (remember to include `katex_css.html`)
3. `@include $lib/...` can include files from the `src/__lib` folder.

