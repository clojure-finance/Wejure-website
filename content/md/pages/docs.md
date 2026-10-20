{:title "Background"
 :layout :page
 :toc :ul
 :page-index 1
 :navbar? true}

## Description

Social networks such as Twitter, Facebook, or Instagram are centralized in the sense that a single company runs them and stores all user data and user content centrally. While this allows for easier storage, the data generated largely belongs to the company and not the users. This issue is highlighted by the debate about content moderation. To tackle this issue from a new perspective, we develop a decentralized social network in which no single server owns the data.

## How it works

- **Data** lives in [GunDB](https://gun.eco/), a decentralized graph database that syncs between browsers through relay servers. Users see each other's data when their browsers reach a common relay.
- **Images** are stored on the [InterPlanetary File System (IPFS)](https://ipfs.tech/), which addresses data by a fingerprint of its content rather than by its location.
- **Accounts, signatures and encryption** use SEA, GunDB's cryptography layer. Each user has their own key pair.

## Security and encryption

- **Direct messages** are end-to-end encrypted: the two participants derive a shared secret (ECDH), and each message is encrypted with AES-GCM. Only the two participants can read it.
- **Group chats** use layers: every membership change starts a new layer with a fresh key, encrypted separately for each member. New members cannot read messages from before they joined, and removed members cannot read messages sent after they left.
- **Public data**: profiles, posts, follows, blocks and the list of who has chatted with whom are stored unencrypted.

## Requirements

WeJure is built with [shadow-cljs](https://github.com/thheller/shadow-cljs). The following software is needed:

- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com) 1.x
- [Java SDK](https://adoptium.net/) 21 or newer
- an [IPFS](https://ipfs.tech/) node ([Kubo](https://github.com/ipfs/kubo))

The setup scripts in the [Step by Step Guide](../example) install all of them except Java.

## Status and limitations

WeJure is still under development.

- Group chat is implemented in the GunDB layer, but the chat page has no user interface for groups yet.
- Unblocking a user has no user interface yet.
- A forgotten password cannot be reset, and there is no way to change your password, username or profile picture.
- You are logged in per browser tab: a new tab needs a new login, and closing the tab logs you out.
- Deleting a post removes it from WeJure, but its image stays on IPFS.
- Users only see each other's data when their browsers reach a common relay (see the [Step by Step Guide](../example/#use-wejure-on-more-than-one-machine)).

The [WeJure README](https://github.com/clojure-finance/WeJure#readme) documents the data model and the code layout.
