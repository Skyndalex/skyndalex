const gateway = require("./lib/gateway.js");
const discord = require("./lib/discord.js");
const r = require("rethinkdb");
const { defaultPrefix } = require("./config.json")
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

gateway.event("ready", async(client) => {

    const a = await r.db("krivebot").table("settings").get("id").run(client.con);
    const b = await r.db("krivebot").table("settings").filter({b : true}).coerceTo("array").run(client.con);



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
           async function f1() {
            //  const guildPrefix = await r.db("krivebot").table("settings").get(msg.guild_id).run(client.con)
                discord.createMessage(msg, {
                    embed: {
                        title: "Oznaczyłeś mnie!",
                        description: `Komenda pomocy: ${defaultPrefix}help`,
                        fields: [
                            {
                                name: "Prefix",
                                value: defaultPrefix,
                                inline: false
                            }
                        ],
                        color: 0x2ecc71
                    }
                })
            }
            f1()
        }
    })
})


const app = require("express")();

app.get("/", (req, res) => {
    res.send("OK!")
})

app.listen(3000);
gateway.run();