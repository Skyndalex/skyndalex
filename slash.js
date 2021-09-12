const { token } = require('./config.json');
const fs = require('fs');
const { Client, Intents, Collection } = require("discord.js")
const client = new Client({ intents: [
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

client.commands = new Collection()

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

const commands = [];

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        commands.push(command.data.toJSON());

        client.commands.set(command.data.name, command)

    }
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.on(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.login(token)