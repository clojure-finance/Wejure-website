# WeJure Documentation Website

The documentation website for [WeJure](https://github.com/clojure-finance/WeJure), a decentralized social network on Nostr, written in ClojureScript. It is built with [Cryogen](http://cryogenweb.org).

Link to website: [https://clojure-finance.github.io/Wejure-website/](https://clojure-finance.github.io/Wejure-website/)

## Requirements

- Java
- the Clojure CLI or Leiningen
- to retake the screenshots: Node.js and a WeJure checkout next to this repo (`../wejure`)

## Development

To start a local server at http://localhost:3000/Wejure-website/ that rebuilds on changes:

```
clojure -X:serve
```

or `lein serve`.

To build the site once into `public/Wejure-website/`, then check its internal links and anchors:

```
clojure -M:build        # or: lein run
python3 dev/check_links.py public/Wejure-website
```

A failed build exits with status 1.

## Writing pages

- The pages are in `content/md/pages/`, one Markdown file each. Their front matter sets `:title`, `:description` (the page's meta description), `:page-index` (the place in the menu) and `:toc :ul` (a table of contents from the `##` headings).
- Link to other pages relatively, as `../usage/`, and to images as `../../img/feed.png`; from the home page (`index.md`) it is `pages-output/usage/` and `img/feed.png`.
- Styles go in `themes/lotus/css/wejure.css`. The theme's Sass is not compiled: its `blog.css` is used as it is.
- `themes/lotus/html/404.html` is copied as it is, without templating, so its paths start with `/Wejure-website/`.
- The pages follow WeJure's README, its `docs/COMMUNITIES.md` and the screens' code (`src/wejure/components/`). When WeJure changes, check the pages against those. The Mobile app section of the Background page follows the README and screens (`src/wejure_app/`) of the mobile app, wejure-app.

## Screenshots

`content/img/feed.png`, `communities.png` and `community.png` show WeJure's release build with sample users; `start-page.png` is older, and the start page has not changed since. To retake them after the screens change, build WeJure and start its server with empty data:

```
cd ../wejure
npm run release
node server/index.js --data "$(mktemp -d)"
```

then, in this repo, in another terminal:

```
node dev/screenshots.js content/img
```

The script signs up three users, posts and builds a community, so it needs a server with empty data on port 8020.

## Deployment

Every push to `main` runs the Publish workflow (`.github/workflows/main.yml`), which builds the site with Leiningen and pushes it to the `gh-pages` branch, from which GitHub Pages serves it. Dependencies needed by that build go in `project.clj`.
