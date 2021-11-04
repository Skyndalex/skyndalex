module.exports = {
    name: "info",
    description: "Bot informations, FaQ, Stats",

    run: async (client, interaction) => {
        client.builder(interaction, `Bot informations`, ``, ``, `GREEN`, [
            { name: "> Important links", value: "[\`• Statuspage\`](https://status.krivebot.xyz)\n[\`• Documentation\`](https://docs.krivebot.xyz)\n[\`• Discord server\`](https://discord.gg/WEas4WFjse)\n[\`• Github organization\`](https://github.com/KriveWasTaken)"},
            { name: "> History", value: "We started as **Korrumix** in 2018 which was created in DBM but never released to public. In late 2018 we started writing bots in JavaScript, as we progress we want to write more project in js, linked to Krive, but we don't have enough experience yet."},
            { name: "> Why this bot is open-source?", value: "We want still to progress so we published code publicly so you as a user can check it out and report bugs or help with optimization."},
            { name: "> What is open-source?", value: "[\`• Documentation\`](https://github.com/KriveWasTaken/docs-public)\n[\`• Manager\`](https://github.com/KriveWasTaken/manager)\n[\`• General bot\`](https://github.com/KriveWasTaken/krivebot)"},
            { name: `> Stats`, value: `• Servers: ${client.guilds.cache.size}\n• Users: ${client.users.cache.size}\n• Channels: ${client.channels.cache.size}\n• Emojis: ${client.emojis.cache.size}`}
        ]).toString(); // embed string value
    }
}