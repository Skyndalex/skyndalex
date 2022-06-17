const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { port } = require("../config.json").discord

exports.run = (client) => {
    const app = express();
    app.use(express.json())

    app.use(session({ secret: "test", resave: false, saveUninitialized: false }))
    app.use(passport.initialize())
    app.use(passport.session())

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