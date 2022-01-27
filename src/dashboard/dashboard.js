const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())

const config = require("../config.json");

const OauthClient = require('discord-oauth2-api');

const oauthClient = new OauthClient({
    clientID: config.clientId,
    clientSecret: config.api.clientSecret,
    scopes: ['identify', 'guilds'],
    redirectURI: config.api.callbackUrl
});

const DashDb = require("./dash-db");
let db;

const NodeCache = require( "node-cache" );
const usersCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const guildsCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = async (client) => {
    db = new DashDb(client.con);

    const checkAuth = (req, res, next) => {
        const token = req.headers.token;

        if(!token) {
            res.json({ success: false, message: "No `token` in headers" });
            return;
        }
        next()
    };

    app.get("/guilds", checkAuth, async (req, res) => {
        const token = req.headers.token;

        if(guildsCache.get(token)) {
            console.log("CACHED DATA")
            res.json(guildsCache.get(token));
            return;
        }

        const data = await db.getUser(token);
        if(!data) {
            res.json({ success: false, message: "User not found!" });
            return;
        }

        console.log(data)
        console.log("DO REQUEST")

        const guilds = await oauthClient.getGuilds(data.access_token);
        guilds.forEach(guild => {
            delete guild.features;
            delete guild.owner;
            delete guild.permissions;
        })
        guildsCache.set(token, guilds);
        res.json(guilds);

    })

    app.get("/me", checkAuth, async (req, res) => {
        const token = req.headers.token;

        if(usersCache.get(token)) {
            console.log("CACHED DATA")
            res.json(usersCache.get(token));
            return;
        }

        const data = await db.getUser(token);
        if(!data) {
            res.json({ success: false, message: "User not found!" });
            return;
        }

        console.log("DO REQUEST")
        const user = await oauthClient.getUser(data.access_token);
        usersCache.set(token, user);
        res.json(user);

    })

    app.post("/callback", async (req, res) => {
        if(!req.body.token) {
            res.json({ success: false, message: "No `token` in body" });
            return;
        }

        oauthClient.getAccessToken(req.body.token).then(async response => {
            const token = await db.saveUser(response.accessToken, response.refreshToken, response.expiresIn)
            res.json({ success: true, token: token });
        }).catch(() => {
            res.json({ success: false, message: "Failed to auth user!" });
        });
    })

    app.listen(config.api.port, null, null, () => {
        console.log("Api listening on" + config.api.port);
    });
}
