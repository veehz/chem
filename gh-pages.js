const ghpages = require("gh-pages");

ghpages.publish(
  "docs",
  {
    branch: "gh-pages",
    repo: "git@github.com:veehz/chem.git",
    message: 'Auto-generated commit',
    dotfiles: true
  },
  function (err) {
    if (err) {
      console.error(err);
    }
  }
);
