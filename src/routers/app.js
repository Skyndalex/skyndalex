const express = require("express");
const session = require("express-session");
const { fetch } = require("undici");
const { port, discordSecret, clientID } = require("../config.json").discord
const { secret } = require("../config.json").trello
exports.run = (client) => {
    const app = express();
    app.use(express.json())
    app.use(session({ secret: "randomowe znaki", resave: false, saveUninitialized: false }))

    app.use((req, res, next) => {
        req.client = client

        next()
    })

    app.use('/discord', require('./discord/discordAuth.js'));
    app.use('/trello', require('./trello/trelloAuth.js'))

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}