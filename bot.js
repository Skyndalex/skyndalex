const gateway = require("./lib/gateway.js");
const discord = require("./lib/discord.js");
const { prefix } = require("./config.json");

gateway.registerModules(gateway, discord, [
    "handler",
    "help",
    "fun",
    "dev",
    "tools",
    "about",
    "mod"
])

gateway.event("MESSAGE_CREATE", (client, msg) => {
    discord.getCurrentUser().then(bot => {
        const prefixMention = new RegExp(`^<@!?${bot.id}>( |)$`);
        
        if (msg.content.match(prefixMention)) {
            discord.createMessage(msg, {
                embed: {
                    title: "Oznaczyłeś mnie!",
                    description: "Komenda pomocy: s/help",
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

const r = require('rethinkdb')
let connection = null;
r.connect({host: 'localhost', port: '28015'}, function(err, conn) {
    if (err) throw err
    connection = conn;
    console.log('Successfully connected to database!')
})

gateway.event("ready", (client) => {
    console.log("Successfully logged in!");
})

gateway.run()
