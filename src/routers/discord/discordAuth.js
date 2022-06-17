const router = require('express').Router()
const { fetch } = require("undici");
const { secret, clientID, callbackURL } = require("../../config.json").discord

router.get('/discordData', async (req, res) => {
    if (!req.session.user) return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${callbackURL}&response_type=code&scope=identify%20guilds`)

    res.send(req.session.user)
    console.log(req.session.user)

    await r.table("trello").insert({ uid: req.session.user.id }, { conflict: "update" }).run(req.client.con)
})

router.get('/callback', async (req, res) => {
    if (!req.query.code) return res.send({ message: 'Query code is invalid!' })

    const params = new URLSearchParams()

    params.set('grant_type', 'authorization_code')
    params.set('code', req.query.code)
    params.set('redirect_uri', callbackURL)

    let response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: params.toString(),
        headers: {
            authorization: `Basic ${btoa(`${clientID}:${secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const tokens = await response.json()

    const userData = {
        info: null,
        guilds: null
    }

    if (!userData.info) {
        response = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${tokens.access_token}`
            }
        })

        userData.info = await response.json()
    }

    if (!userData.guilds) {
        response = await fetch('https://discord.com/api/users/@me/guilds', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${tokens.access_token}`
            }
        })

        userData.guilds = await response.json()
    }

    const guilds = [];
    for (const guildPos in userData.guilds) guilds.push(userData.guilds[guildPos]);

    req.session.user = { ...userData.info, ... { guilds } }

    res.redirect('/discord/discordData')
})

module.exports = router