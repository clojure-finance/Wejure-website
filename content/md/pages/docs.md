{:title "Background"
 :description "Why WeJure exists, how it works on Nostr relays and Blossom media servers, how it protects privacy, and what it cannot do yet."
 :layout :page
 :toc :ul
 :page-index 1
 :navbar? true}

## Why WeJure

Social networks such as Twitter, Facebook or Instagram are centralized: a single company runs them and stores all user data and content. That makes storage easy, but the data ends up belonging to the company rather than to its users, as the debate about content moderation shows. WeJure explores the alternative: a social network in which no single server owns the data, and which keeps working when servers go down.

## How it works

- **Accounts are key pairs.** An account is a secp256k1 key pair, and its public key is the identity. To let you log in with a username and password from any device, WeJure stores the secret key on the relays, encrypted with your password (NIP-49).
- **Data are signed events.** Profiles, posts, follows, messages and every change to a community are [Nostr](https://nostr.com/) events, signed by their author and checked by every reader. Nobody can change or fake anyone else's data.
- **Relays store and pass on the events.** A relay is a simple server that keeps events and sends them to whoever asks. WeJure writes to every relay it is configured with and reads each one separately, so a relay that is down, withholds events or sends forged copies cannot hide what the others have. When a relay misses some of your events, for example after being down, your client copies them over.
- **Pictures live on [Blossom](https://github.com/hzrd149/blossom) media servers**, named by their SHA-256 hash. WeJure checks every picture against its hash after downloading it, so a media server cannot swap it.
- **One server to start with.** WeJure comes with a small Node.js server that serves the app and runs a relay and a media server next to it. Any standard Nostr relay and Blossom server works too, and a site can list several of each (see [Getting Started](../example/#use-other-relays-and-media-servers)).
- **Only new data is fetched.** The browser keeps encrypted copies of what it has read, and live subscriptions bring in new events as they arrive. Opening a page again asks the relays only for what is new.

## Privacy and encryption

- **Direct messages** follow NIP-17: each message is signed by its sender, encrypted for the recipient, and wrapped in an event from a throwaway key with a blurred time. Relays see that someone received something, but not from whom and not what.
- **Private communities** are encrypted end to end. Relays see neither the community nor who writes nor the topics, and removed members cannot read what comes after. [Communities](../communities/#how-communities-work) explains how.
- **Blocking** uses a mute list (NIP-51) whose entries are encrypted to its owner, so nobody can see who blocks whom.
- **The device cache**, the copies the browser keeps, is encrypted with a key derived from your account key and is unreadable without your password. Logging out deletes it.
- **Your password** protects your secret key on the relays, where anyone can try to guess it offline: choose a strong one.
- **Public data**: profiles, posts, follows, the lists of relays and media servers each account uses, and everything in open communities.

## Built with

- **The app:** ClojureScript, built with [shadow-cljs](https://github.com/thheller/shadow-cljs), with [Reagent](https://reagent-project.github.io/) and [MUI](https://mui.com/)
- **The data layer:** JavaScript on [nostr-tools](https://github.com/nbd-wtf/nostr-tools)
- **The server:** Node.js; its relay stores events in SQLite

[Getting Started](../example/) lists what you need to run it.

## Status and limitations

WeJure is under development. Not built yet:

- unblocking a user;
- account recovery: a forgotten password means a lost account, and there is no way to change your password, username or profile picture;
- deleting pictures: deleting a post leaves its picture on the media servers;
- paging for direct messages: a new device fetches all of them the first time;
- relays syncing with each other: clients copy their own data to relays that miss it instead.

Known limits:

- **No forward secrecy:** someone who steals an account key can read everything that account could read.
- **Deletions are requests:** a relay that ignores them may keep a deleted post, though WeJure hides it as soon as any relay has the deletion request.
- **Usernames are not unique** on an open network (see [Profiles](../usage/#profiles)).
- **Community event kinds** (1460–1464) are WeJure's own for now.

The [WeJure README](https://github.com/clojure-finance/WeJure#readme) documents the data model, the security model and the code layout, and [docs/COMMUNITIES.md](https://github.com/clojure-finance/WeJure/blob/main/docs/COMMUNITIES.md) the design of communities.
