{:title  "Using MUI as a Framework"
 :layout :post
 :author "Oscar Jay LEW"}

In my previous blog, I have mentioned that I have switched from figwheel to shadow-cljs, and that I have also chosen to use Reagent for my web app.

For the past two weeks, I have further chosen to use reagent-material-ui as the framework for my Reagent components. reagent-material-ui is a wrapper for MUI, which is a very popular framework for React components.

I originally planned to also incorporate an emotion-like library to my project, which is a library designed for writing css styles in JS, but the two libraries that I tried (khmelevskii/emotion-cljs and dvingo/cljs-emotion) were incompatible with the web app, i.e., errors were shown during compilation. As a result, I continued to use the default setup for writing css, which is to provide a nested map to the Reagent component.
```clojure
{:style {:color “grey”}}
```
I also started looking into Solidity, which is the language used for smart contracts. The language was not difficult to pick up as it shared similar structures as C++.
