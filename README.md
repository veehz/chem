# Chemistry Revision

This is a collection of notes and resources for chemistry revision for my own use (UEC).

`/src` contains the source files,
`/docs` contains the built files. (docs because I want to use github pages without a new branch)

## Building

Install the packages with `npm install`.
Delete the `/docs` folder and run `node preprocess.js` to build the site.

## Preview

To preview the site, run `npx live-server` in `/docs` and open `localhost:8080` in your browser.

## Deploy

To deploy the site, run `npm run deploy`, which runs `npm run build && node gh-pages.js`.

## Development Environment (on my machine)

Install the packages with `npm install`.
Install `when-changed` [here.](https://github.com/joh/when-changed)

Run `npm run dev`.
