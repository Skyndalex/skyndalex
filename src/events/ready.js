module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        client.guilds.cache.get("804477558061137972").commands.set(arrayOfSlashCommands)
        client.application.commands.set(arrayOfSlashCommands)

        let actvs = [`Bot version: ${client.version}`, `View site: https://krivebot.xyz`, `Community: https://krivebot.xyz/discord`, `Statuspage: https://status.krivebot.xyz`, `Docs: https://docs.krivebot.xyz`,];

        setInterval(() => client.user.setActivity(actvs[Math.floor(Math.random() * actvs.length)], {type: "PLAYING"}), 10000);

        console.log("Bot is online");
    }
}