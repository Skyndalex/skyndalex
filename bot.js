const gateway = require("./lib/gateway.js");
const discord = require("./lib/discord.js");
const r = require("rethinkdb");

gateway.registerModules(gateway, discord, [
    "handler",
    "help",
    "dev",
    "fun",
    "mod",
    "config",
    "tools",
    "about",
    "economy"
])

gateway.event("ready", (client) => {
    r.db("guilds").table("prefix").run(client.con, (err, result) => {
        if (result._responses[0]) {
            const prefixes = result._responses[0].r;

            prefixes.forEach(x => {
                client.guilds.find(i => i.id === x.guild_id).prefix = x.prefix;
            })
        }
    })
    // settings
    r.db("settings").table("broadcastChannel").run(client.con, (err, result) => {
        if (result._responses[0]) {
            const broadcastChannels = result._responses[0].r;

            broadcastChannels.forEach(x => {
                client.guilds.find(i => i.id === x.guild_id).broadcastChannel = x.broadcastChannel;
            })
        }
    })
    r.db("settings").table("voteChannel").run(client.con, (err, result) => {
        if (result._responses[0]) {
            const voteChannels = result._responses[0].r;

            voteChannels.forEach(x => {
                client.guilds.find(i => i.id === x.guild_id).voteChannel = x.voteChannel;
            })
        }
        r.db("settings").table("complaintChannel").run(client.con, (err, result) => {
            if (result._responses[0]) {
                const complaintChannels = result._responses[0].r;

                complaintChannels.forEach(x => {
                    client.guilds.find(i => i.id === x.guild_id).complaintChannel = x.complaintChannel
                })
            }
        })
    })
    r.db("settings").table("suggestionChannel").run(client.con, (err, result) => {
        if (result._responses[0]) {
            const suggestionChannels = result._responses[0].r;

            suggestionChannels.forEach(x => {
                client.guilds.find(i => i.id === x.guild_id).suggestionChannel = x.suggestionChannel
            })
        }
    })
    r.db("settings").table("privateModChannel").run(client.con, (err, result) => {
        if (result._responses[0]) {
            const privateModChannels = result._responses[0].r;

            privateModChannels.forEach(x => {
                client.guilds.find(i => i.id === x.guild_id).privateModChannel = x.privateModChannel
            })
        }
    })
    r.db("settings").table("passChannel").run(client.con, (err, result) => {
        if (result._responses[0]) {
            const passChannels = result._responses[0].r;

            passChannels.forEach(x => {
                client.guilds.find(i => i.id === x.guild_id).passChannel = x.passChannel
            })
        }
    })
    console.log("Successfully logged in!");

    setInterval(() => {
        const statuses = [
            "@Krive",
            "Prefix: ?",
            "krivebot.tk",
            "krivebot.tk/donate",
            "krivebot.tk/invite",
            "krivebot.tk/discord"
        ]

        const data = {
            op: 3,
            d: {
                since: null,
                activities: [{
                    name: statuses[Math.floor(Math.random() * statuses.length)],
                    type: 1
                }],
                status: "online",
                afk: false
            }
        }
        
        client.ws.send(JSON.stringify(data));
    }, 10000)
})

gateway.event("MESSAGE_CREATE", (client, msg) => {
    client.bot.then(bot => {
        const prefixMention = new RegExp(`^<@!?${bot.id}>( |)$`);

        if (msg.content.match(prefixMention)) {
            const prefix = client.guilds.find(x => x.id == msg.guild_id).prefix;
            
            discord.createMessage(msg, {
                embed: {
                    title: "Oznaczyłeś mnie!",
                    description: `Komenda pomocy: ${prefix}help`,
                    fields: [
                        {
                            name: "Prefix",
                            value: prefix,
                            inline: false
                        }
                    ],
                    color: 0x2ecc71
                }
            })
        }
    })
})

const app = require("express")();

app.get("/", (req, res) => {
    res.send("OK!")
})

app.listen(3000);
gateway.run();