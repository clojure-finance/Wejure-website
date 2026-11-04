{:title "Welcome to WeJure"
 :layout :page
 :page-index 0
 :navbar? true
 :home? true}

<p class="lead">A decentralized social network written in ClojureScript, developed at HKU Business School.</p>

WeJure combines a public feed, like Twitter, with communities that have channels and topics, like Zulip. Nobody owns the network: data travels as signed [Nostr](https://nostr.com/) events through relays, and pictures live on [Blossom](https://github.com/hzrd149/blossom) media servers, named by their hash. Any relay or media server can go down or lie, and WeJure keeps working with the others.

<div class="cards">
<a class="card" href="pages-output/docs/"><strong>Background</strong><span>Why WeJure exists and how it works.</span></a>
<a class="card" href="pages-output/example/"><strong>Getting Started</strong><span>Build and run WeJure on your machine.</span></a>
<a class="card" href="pages-output/usage/"><strong>Using WeJure</strong><span>Posts, profiles, search and messages.</span></a>
<a class="card" href="pages-output/communities/"><strong>Communities</strong><span>Channels, topics, roles, and how they stay private.</span></a>
</div>

![A community in WeJure: channels, topics and messages](img/community.png)

## Features

- Accounts with a username and password, a bio and an optional profile picture; logging in works from any device
- Posts with text, a picture or both, in a feed of the people you follow that updates live
- Following and unfollowing; finding users by name; searching the recent posts of the people you follow
- End-to-end encrypted direct messages, and blocking users
- Communities, private (encrypted, invite only) or open (public, anyone can join), with channels, topics and roles
- Every post, message and change is signed by its author, so no server can alter or fake it

## Report bugs

WeJure is under active development. If you find a bug, please [report it on GitHub](https://github.com/clojure-finance/WeJure/issues).
