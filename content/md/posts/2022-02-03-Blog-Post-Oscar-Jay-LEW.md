{:title  "Switching to Shadow-Cljs"
 :layout :post
 :author "Oscar Jay LEW"}

Following my last blog, I have been trying to find a ClojureScript library to allows me to interact with the Etherium blockchain.

The library that is mentioned the most online is cljs-web3. In addition to this, I have decided to use the MetaMask extension as a gateway to connect to the Etherium blockchain. MetaMask is a cryptocurrency wallet and a gateway to blockchains. Without this extension, we would have to manually set up the user’s cryptocurrency account.

([https://github.com/district0x/cljs-web3](https://github.com/district0x/cljs-web3))

However, as I went on to connect cljs-web3 to MetaMask, an issue arose. In 2020, MetaMask announced that they will be replacing the old API ```window.web3``` with a new one ```window.ethereum```, but for cljs-web3, its latest update was in 2018. 

([https://github.com/MetaMask/metamask-extension/issues/8077](https://github.com/MetaMask/metamask-extension/issues/8077))

As most ClojureScript (CS) libraries for Web3 (JS library for connecting to Ethereum) were outdated, I had chosen a somewhat “hacky” method to access the blockchain, which was to utilize CS’s ability to directly interact with JS.

([https://lwhorton.github.io/2018/10/20/clojurescript-interop-with-javascript.html](https://lwhorton.github.io/2018/10/20/clojurescript-interop-with-javascript.html))

However, accessing JS libraries using figwheel is a lot more troublesome as compared shadow-cljs. Hence, I have decided to switch to using shadow-cljs using the following template,

[https://github.com/lauritzsh/reagent-shadow-cljs-starter](https://github.com/lauritzsh/reagent-shadow-cljs-starter)

To install ```npm``` packages in nodeJS, we would first run
```clojure
npm install web3
```
Then in our JS program, we would have to require it by doing
```clojure
var web3 = require(“web3”);
```
In shadow-cljs, we would follow the same installation steps, but to use it in our program, we would do
```clojure
(ns my.app
  (:require ["web3" :as react]))
```
