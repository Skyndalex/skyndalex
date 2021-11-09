# New Skyndalex.

## Used sources:

- [RethinkDB](https://rethinkdb.com)
- [Discord.JS docs](https://discord.js.org/#/docs/main/stable/general/welcome)
- [developer.mozilla.org](https://developer.mozilla.org/pl/docs/Web/JavaScript)

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
## Commands export example

```js
module.exports = {
    name: "<Command name>",
    description: "<Command description>",

    run: async (client) => {
        // code
    }
}
```
## Events export example

```js
module.exports = {
    name: "<Event Name>",
    once: <False/True>,

    async execute (client) {
    }
}
```