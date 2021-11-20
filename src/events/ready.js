module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        console.log("Bot is ready.");

        let actvs = [
            `Bot version: ${client.version}`,
            `View site: https://krivebot.xyz`,
            `Community: https://krivebot.xyz/discord`,
            `Statuspage: https://status.krivebot.xyz`,
            `Docs: https://docs.krivebot.xyz`,
        ];
        setInterval(() => client.user.setActivity(`${actvs[Math.floor(Math.random() * actvs.length)]}`, {type: "PLAYING"}), 10000)
    }
}