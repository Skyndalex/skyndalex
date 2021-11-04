module.exports = {
    name: "info",
    description: "Bot informations, FaQ, Stats",

    run: async (client, interaction) => {
        client.builder(interaction, `Bot informations`, ``, ``, `GREEN`, [
            { name: "> Important links", value: "[\`• Statuspage\`](https://status.krivebot.xyz)\n[\`• Documentation\`](https://docs.krivebot.xyz)\n[\`• Discord server\`](https://discord.gg/WEas4WFjse)\n[\`• Github organization\`](https://github.com/KriveWasTaken)"},
            { name: "> History", value: client.strings.bot.info.history},
            { name: "> Why this bot is open-source?", value: client.strings.bot.info.whyos},
            { name: "> What is open-source?", value: "[\`• Documentation\`](https://github.com/KriveWasTaken/docs-public)\n[\`• Manager\`](https://github.com/KriveWasTaken/manager)\n[\`• General bot\`](https://github.com/KriveWasTaken/krivebot)"},
            { name: `> Stats`, value: `• Servers: ${client.guilds.cache.size}\n• Users: ${client.users.cache.size}\n• Channels: ${client.channels.cache.size}\n• Emojis: ${client.emojis.cache.size}`}
        ]).toString(); // embed string value
    }
}
