# WeJure Documentation Website

The documentation website for [WeJure](https://github.com/clojure-finance/WeJure), a decentralized peer-to-peer social network written in ClojureScript. It is built with [Cryogen](http://cryogenweb.org).

Link to website: [https://clojure-finance.github.io/Wejure-website/](https://clojure-finance.github.io/Wejure-website/)

The pages are in `content/md/pages/`, the blog posts in `content/md/posts/` and the images in `content/img/`.

### Requirements

```
- Java
- Clojure CLI or Leiningen
```

## Development

To start a local server at http://localhost:3000 that rebuilds on changes:
```
clojure -X:serve
```
or
```
lein serve
```

To build the site once into `public/`:
```
clojure -M:build
```

## Deployment

Every push to `main` runs the Publish workflow (`.github/workflows/main.yml`), which builds the site with Leiningen and pushes it to the `gh-pages` branch, from which GitHub Pages serves it. Dependencies needed by that build go in `project.clj`.
