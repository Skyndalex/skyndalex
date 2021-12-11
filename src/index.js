const { Collection } = require("discord.js");
const { token } = require("./config.json");
const Base = require("./base");
const fs = require('fs');
const r = require("rethinkdb");

const client = new Base({ intents: [32767], partials: ["MESSAGE", "CHANNEL"]});

module.exports = client;
client.slashCommands = new Collection;

const commandFolders = fs.readdirSync('./commands');

const arrayOfSlashCommands = [];

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.slashCommands.set(command.name, command);
        if (["MESSAGE", "USER"].includes(command.type)) delete command.description;

        arrayOfSlashCommands.push(command);
    }
}
r.connect({db: "krivebot", host: "localhost", port: "28015", timeout: 600}, function(err, con) {
    if (err) console.log(err)
    client.con = con;
    console.log("success");
})
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(client, ...args));
}

client.on("ready", async () => {
    console.log("Bot is online");

    client.guilds.cache.get("804477558061137972").commands.set(arrayOfSlashCommands)
    client.application.commands.set(arrayOfSlashCommands)

    let actvs = [
        `Bot version: ${client.strings.bot.version}`,
        `View site: htps://${client.strings.bot.link_site}`,
        `Community: https://${client.strings.bot.link_discord}`,
        `Statuspage: https://${client.strings.bot.link_statuspage}`,
        `Docs: https://${client.strings.bot.link_docs}`,
    ];
    setInterval(() => client.user.setActivity(`${actvs[Math.floor(Math.random() * actvs.length)]}`, {type: "PLAYING"}), 10000)
});

client.login(token)