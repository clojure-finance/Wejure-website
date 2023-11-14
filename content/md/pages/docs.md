{:title "Get_start"
 :layout :page
 :toc :ul
 :page-index 0
 :navbar? true}

## Description

Social networks such as Twitter, Facebook, or Instagram are centralized in the sense that a single company runs them and stores all user data and user content centrally. While this allows for easier storage, the data generated largely belongs to the company and not the users. This issue is highlighted by the recent debate about content moderation. To tackle this issue from a new perspective, we develop a decentralized social network that uses the the decentralized "interplanetary file system" (IPFS) and runs on a blockchain.

## Installation
WeJure is developed using [shadow-cljs](https://github.com/thheller/shadow-cljs) (which requires node.js, yarn and Java SDK).<br/>
The following software are needed:
- [Node.js](https://nodejs.org) 
- [Yarn](https://www.yarnpkg.com)
- [Java SDK](https://adoptium.net/) 
- [InterPlanetary File System (IPFS)](https://ipfs.tech/)

Before running WeJure, run `yarn` to download all the dependencies and go setting of IPFS to change the configure file.

To run or configure WeJure on your local environment, first navigate to `src/wejure/js` in terminal and run `node relay` to start a relay server for synchronizing data in gunDB. Next, run a local IPFS client to host IPFS. In the root directory, start a local server by the command `yarn dev`. Then visit [localhost:8020](http://localhost:8020).

### Node.js
Node.js is an open-source, cross-platform JavaScript runtime environment. It allows developers to run JavaScript code outside of a web browser, making it suitable for server-side and networking applications. You can download different versions of Node.js from the website, including the LTS (Long-Term Support) version recommended for most users.

### Yarn
Yarn is a package manager that also serves as a project manager. It provides features for managing dependencies and workflows in JavaScript projects. Yarn supports workspaces, allowing you to split your project into sub-components. It emphasizes stability and guarantees that installations will continue to work in the future. Yarn is an independent open-source project that encourages innovation and provides tools to solve various development challenges.

### IPFS
IPFS is an open system that allows the management of data without relying on a central server. It uses content addressing, allowing data retrieval based on the content's fingerprint rather than its location or name. IPFS offers versatility and has applications in various industries, such as offline-native productivity tools, censorship-resistant content libraries, and efficient interplanetary communication. It provides data transparency and permanence, making it suitable for storing digital art, publishing scientific research, and recording proposals and votes in Web3 projects. IPFS is designed to reimagine the structure of the traditional web and has an active community of developers and contributors.

#### configure IPFS
`"API": {
		"HTTPHeaders": {
			"Access-Control-Allow-Credentials": [
				"true"
			],
			"Access-Control-Allow-Methods": [
				"PUT",
				"POST",
				"GET"
			],
			"Access-Control-Allow-Origin": [
				"*"
			]
		}
	}`





