const { token } = require('./config.json');
const fs = require('fs');
const Base = require("./Base.js");
const { Intents, Collection } = require("discord.js")
const r = require("rethinkdb")
const client = new Base({ intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ], partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.commands = new Collection;

require("./site/site").run(client);
// require("./panel/dash").run(client);

require("./functions")(client);

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

r.connect({db: "krivebot", host: "localhost", port: "28015", timeout: 600}, function(err, con) {
    if (err) console.log(err)
    client.con = con;

    console.log("RethinkDb Connected");
})

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.on(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.login(token);