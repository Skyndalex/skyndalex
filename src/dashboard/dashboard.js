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

const { Permissions } = require('discord.js');

module.exports = async (client) => {
    db = new DashDb(client.con);

    const checkAuth = (req, res, next) => {
        const token = req.headers.token;

        if(!token) {
            res.json({success: false, message: "No `token` in headers"});
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
            res.json({success: false, message: "User not found!"});
            return;
        }

        const parsedGuilds = [];

        const guilds = await oauthClient.getGuilds(data.access_token);
        console.log(client.guilds.cache);

        function dec2bin(dec) {
            return (dec >>> 0).toString(2);
        }

        const filteredGuilds = filterGuilds(guilds);

        guildsCache.set(token, filteredGuilds);
        res.json(filteredGuilds);
    });

    const keysSettings = [{key: "complaintsChannel", type: "CHANNEL"}, {key: "moderatorRole", type: "ROLE"}];

    app.get("/guild/:id", checkAuth, async (req, res) => {
        const token = req.headers.token;

        let guilds;

        if(guildsCache.get(token)) {
            guilds = guildsCache.get(token);
        } else {
            const data = await db.getUser(token);
            if(!data) {
                res.json({success: false, message: "User not found!"});
                return;
            }

            const guilds1 = await oauthClient.getGuilds(data.access_token);
            const filteredGuilds = filterGuilds(guilds1);

            guildsCache.set(token, filteredGuilds);
            guilds = filteredGuilds;
        }

        const g = getGuildById(req.params.id, guilds);
        console.log(req.params.id)
        console.log(g)

        if(!g) {
            res.json({success: false, message: "Guild not found or no permission!"});
            return;
        }

        const botGuild = client.guilds.cache.get(g.id);

        if(!botGuild) {
            res.json({success: false, message: "Bot isn't on guild!"});
            return;
        }

        const channels = [];
        const roles = [];
        const settings = [];

        const result = await r.table('settings').get(g.id).run(client.con);

        keysSettings.forEach(key => {
            if(result === undefined) {
                settings.push({key: key.key, type: key.type, value: "-1"});
            } else {
                settings.push({key: key.key, type: key.type, value: (result[key.key] !== undefined ? result[key.key] : "-1") })
            }
        });

        botGuild.channels.cache.forEach(channel => {
           if(channel.type === "GUILD_TEXT") channels.push({id: channel.id, name: channel.name})
        });

        botGuild.roles.cache.forEach(role => {
            roles.push({id: role.id, name: role.name, color: role.color})
        });

        res.json({channels, roles, settings});
    })

    app.post("/guild/:id", checkAuth, async (req, res) => {
        const token = req.headers.token;

        let guilds;

        if(guildsCache.get(token)) {
            guilds = guildsCache.get(token);
        } else {
            const data = await db.getUser(token);
            if(!data) {
                res.json({success: false, message: "User not found!"});
                return;
            }

            const guilds1 = await oauthClient.getGuilds(data.access_token);
            const filteredGuilds = filterGuilds(guilds1);

            guildsCache.set(token, filteredGuilds);
            guilds = filteredGuilds;
        }

        const g = getGuildById(req.params.id, guilds);

        if(!g) {
            res.json({success: false, message: "Guild not found or no permission!"});
            return;
        }

        const botGuild = client.guilds.cache.get(g.id);

        if(!botGuild) {
            res.json({success: false, message: "Bot isn't on guild!"});
            return;
        }

        const dataToUpdate = {};

        keysSettings.forEach(key => {
            if(req.body[key.key] !== undefined) {
                if(key.type === "CHANNEL") {
                    if(botGuild.channels.cache.get(req.body[key.key])) {
                        dataToUpdate[key.key] = req.body[key.key];
                    }
                }
                if(key.type === "ROLE") {
                    if(botGuild.roles.cache.get(req.body[key.key])) {
                        dataToUpdate[key.key] = req.body[key.key];
                    }
                }
            }
        });

        dataToUpdate.id = g.id;
        await r.table("settings").insert(dataToUpdate, { conflict: 'update' }).run(client.con)

        res.json({success: true, message: "Setted new data!"});

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
            res.json({success: false, message: "User not found!"});
            return;
        }

        console.log("DO REQUEST")
        const user = await oauthClient.getUser(data.access_token);
        usersCache.set(token, user);
        res.json(user);

    })

    app.post("/callback", async (req, res) => {
        if(!req.body.token) {
            res.json({success: false, message: "No `token` in body"});
            return;
        }

        oauthClient.getAccessToken(req.body.token).then(async response => {
            const token = await db.saveUser(response.accessToken, response.refreshToken, response.expiresIn)
            res.json({success: true, token: token});
        }).catch(err => {
            res.json({success: false, message: "Failed to auth user! " + err});
        });
    })

    function filterGuilds(guilds) {
        const parsedGuilds = [];

        guilds.forEach(guild => {
            if(client.guilds.cache.get(guild.id)) {
                const perms = new Permissions(BigInt(guild.permissions));

                if(perms.has(Permissions.FLAGS.ADMINISTRATOR) || perms.has(Permissions.FLAGS.MANAGE_GUILD)) {
                    delete guild.features;
                    delete guild.owner;
                    delete guild.permissions;

                    parsedGuilds.push(guild);
                }
            }
        })

        return parsedGuilds;
    }

    function getGuildById(id, guilds) {
        for (let i = 0; i < guilds.length; i++){
            const guild = guilds[i];
            if(guild.id === id) {
                return guild;
            }
        }

        return undefined;
    }

    app.listen(config.api.port, null, null, () => {
        console.log("Api listening on " + config.api.port);
    });
}
