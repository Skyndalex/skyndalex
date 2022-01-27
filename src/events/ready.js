const { activities } = require("../config.json");

module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        client.guilds.cache.get("804477558061137972").commands.set(arrayOfSlashCommands)
        // client.application.commands.set(arrayOfSlashCommands);

        this.setRandomStatus(client);
        setInterval(() => this.setRandomStatus(client), 10000);

        console.log("Bot is online");
    },
    parseActivity(text, client) {
        return text.replace("{version}", client.version);
    },
    setRandomStatus(client) {
        client.user.setActivity(this.parseActivity(activities[Math.floor(Math.random() * activities.length)], client), {type: "PLAYING"})
    }
}
