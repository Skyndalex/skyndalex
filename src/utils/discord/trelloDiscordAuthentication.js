exports.run = (client) => {
    const express = require('express')
    const session = require('express-session')
    const { fetch } = require('undici')

    const app = express()
    const { port, secret, clientID } = require('../../config.json').discord

    app.use(express.json())
    app.use(session({ secret: secret, resave: false, saveUninitialized: false }))
    app.get('/', async (req, res) => {
        if (!req.session.user) return res.redirect(config.url)

        res.json(req.session.user)
        console.log(req.session.user)

        await r.table("trello").insert({ uid: req.session.user.id }, { conflict: "update" }).run(client.con)
    })
    app.get('/callback', async (req, res) => {
        if (!req.query.code) return res.send({ message: 'Query code is invalid!' })

        const params = new URLSearchParams()

        params.set('grant_type', 'authorization_code')
        params.set('code', req.query.code)
        params.set('redirect_uri', `http://localhost:${port}/callback`)

        let response = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: params.toString(),
            headers: {
                authorization: `Basic ${btoa(`${clientID}:${secret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        const tokens = await response.json()

        const userData = {
            info: null,
            guilds: null,
        }
// h
        if (!userData.info) {
            response = await fetch('https://discord.com/api/users/@me', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${tokens.access_token}`,
                }
            })

            userData.info = await response.json()
        }

        if (!userData.guilds) {
            response = await fetch('https://discord.com/api/users/@me/guilds', {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${tokens.access_token}`,
                }
            })

            userData.guilds = await response.json()
        }

        const guilds = [];
        for (const guildPos in userData.guilds) guilds.push(userData.guilds[guildPos]);

        req.session.user = { ...userData.info, ... { guilds } }

        res.redirect('/')
    })
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}