const { Collection } = require("discord.js");
const { token } = require("./config.json");
const Base = require("./base");
const fs = require('fs');
const r = require("rethinkdb");

const client = new Base({ intents: [ 32767 ], partials: ["MESSAGE", "CHANNEL", "REACTION"]});

module.exports = client;

client.slashCommands = new Collection;

const commandFolders = fs.readdirSync('./commands');

const arrayOfSlashCommands = [];

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.slashCommands.set(command.name, command);

        arrayOfSlashCommands.push(command)
    }
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
}

client.on("ready", async () => {
    console.log("Bot is online");

    await client.guilds.cache.get("804477558061137972").commands.set(arrayOfSlashCommands)
    await client.application.commands.set(arrayOfSlashCommands)

    let actvs = [
        `Bot version: ${client.version}`,
        `View site: https://krivebot.xyz`,
        `Community: https://krivebot.xyz/discord`,
        `Statuspage: https://status.krivebot.xyz`,
        `Docs: https://docs.krivebot.xyz`,
    ];

    setInterval(() => client.user.setActivity(`${actvs[Math.floor(Math.random() * actvs.length)]}`, {type: "PLAYING"}), 10000)
});


client.login(token)