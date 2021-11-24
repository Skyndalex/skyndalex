module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        console.log("Bot is ready.");

        let actvs = [
            `Bot version: ${client.strings.bot.version}`,
            `View site: htps://${client.strings.bot.link_site}`,
            `Community: https://${client.strings.bot.link_discord}`,
            `Statuspage: https://${client.strings.bot.link_statuspage}`,
            `Docs: https://${client.strings.bot.link_docs}`,
        ];
        setInterval(() => client.user.setActivity(`${actvs[Math.floor(Math.random() * actvs.length)]}`, {type: "PLAYING"}), 10000)
    }
}