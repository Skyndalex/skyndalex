# We are announcing a NEW Krive.

## Used sources:

- [RethinkDB](https://rethinkdb.com)
- [Discord.JS docs](https://discord.js.org/#/docs/main/stable/general/welcome)
- [developer.mozilla.org](https://developer.mozilla.org/pl/docs/Web/JavaScript)
- [file: interactionCreate.js (branch: "slash")](https://github.com/Korrumz2PL/krivebot/blob/slash/src/events/interactionCreate.js)

# Language

A bot has been rewritten to english. We know what we are doing

Our community is also in English. Check! https://discord.gg/rRhWngnebN

# Our tutorial
## Installing & Running

1. Database:

```
cd rethinkdb-2.3.6
./rethinkdb
```

2. Bot:
```
npm i
cd src
node index.js
```
## Commands

```js
module.exports = {
    name: "<Command name>",
    description: "<Command description>",

    run: async (client) => {
        // code
    }
}
```
## Events

```js
module.exports = {
    name: "<Event Name>",
    once: <False/True>,

    async execute (client) {
    }
}
```