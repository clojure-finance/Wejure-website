{:title "Using WeJure"
 :layout :page
 :toc :ul
 :page-index 4
 :navbar? true}

This page walks through WeJure once it is running at [http://localhost:8020](http://localhost:8020). [Getting Started](../example/) explains how to get there.

## Sign up and log in

Click **Sign Up** on the start page and fill in:

- a username of 3–20 characters: letters, digits and underscores only
- a password of 8–20 characters, entered twice
- a profile picture, which is required

The profile picture is uploaded to IPFS, so signing up fails if the IPFS daemon is not running. After signing up, log in with the same username and password.

You stay logged in only in that browser tab: a new tab needs a new login, and closing the tab logs you out. **Logout** in the top bar logs you out right away.

## The top bar

Once logged in, the top bar holds:

- the WeJure logo, which leads back to your feed
- the search box (see [Search](#search))
- your username and profile picture, which lead to your profile
- **Message**, which opens your messages (on the messages page it becomes **Main Page**)
- **Logout**

## Feed and posts

Your feed shows your own posts and the posts of everyone you follow, newest first.

To post, type in the "What's on your mind?" box, add an image with the camera button if you like, and click **Post**. A post needs text, an image, or both. Images are uploaded to IPFS.

Your own posts have a **Delete** button. Deleting a post removes it from WeJure, but its image stays on IPFS.

## Profiles

Click a username or profile picture to open that user's profile, with their bio and posts.

- On someone else's profile, **Follow** adds their posts to your feed. Once you follow them, the profile shows **Message** and **Unfollow**.
- On your own profile, **Edit Profile** changes your bio (up to 150 characters).

## Search

The button next to the search box switches between **User** and **Post** search; press Enter to search.

- **User** search finds every username that contains your text. It is case-sensitive, and an exact match comes first.
- **Post** search finds every post whose text contains your text, ignoring case.

## Messages

Click **Message** in the top bar to open your messages. Your contacts are everyone you follow plus everyone who has messaged you, with the most recent conversation first. Pick a contact, type, and press Enter or click **Send**. Messages are end-to-end encrypted: only you and your contact can read them.

To block someone, open your conversation with them and click **Block User**. Neither of you can then message the other, and they disappear from your contacts. Blocking does not unfollow them or hide their posts, and WeJure has no way to unblock yet.

## Limitations

See [Status and limitations](../docs/#status-and-limitations) for what WeJure cannot do yet.
