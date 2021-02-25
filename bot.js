const gateway = require("./lib/gateway.js");
const discord = require("./lib/discord.js");

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
                            value: "s/",
                            inline: false
                        }
                    ],
                    color: 0x2ecc71
                }
            })
        }
    })
})

gateway.event("ready", (client) => {
    console.log("online");
})

gateway.run()