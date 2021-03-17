const gateway = require("./lib/gateway.js");
const discord = require("./lib/discord.js");
const { prefix } = require("./config.json");
const { defaultPrefix } = require("./config.json")
const r = require("rethinkdb");
const fetch = require('node-fetch')
gateway.registerModules(gateway, discord, [
    "handler",
    "help",
    "fun",
    "dev",
    "tools",
    "about",
    "mod",
    "config"
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
        discord.getCurrentUser().then(bot => {
            async function f1() {
                const prefixMention = new RegExp(`^<@!?${bot.id}>( |)$`);
                if (msg.content.match(prefixMention)) {
                    const res = await r.db("guilds").table('prefix').get(client.guilds.find(x => x.id == "id").prefix).run(client.con)
                    const prefix = res.prefix ? res.prefix : "Brak";
                    discord.createMessage(msg, {
                        embed: {
                            title: "Oznaczyłeś mnie! Jak się cieszę, że się mną zainteresowałeś",
                            description: "Komenda pomocy: ?help",
                            fields: [
                                {
                                    name: "Prefix",
                                    value: prefix,
                                },
                                {
                                  name: 'Prefix defaultowy',
                                  value: defaultPrefix
                                },
                                {
                                    name: 'Serwer discord bota',
                                    value: '[Kliknij](https://krivebot.tk/discord)'
                                },
                                {
                                    name: 'Dodaj bota',
                                    value: '[Kliknij](https://krivebot.tk/invite)'
                                }
                            ],
                            color: 0x2ecc71
                        }
                    })

                }
            }
            f1()
        })
    })


const app = require("express")();

app.get("/", (req, res) => {
    res.send("OK!")
})

app.listen(3000);

gateway.run();
