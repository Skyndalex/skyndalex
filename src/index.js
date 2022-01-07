const { Collection } = require("discord.js");
const { token } = require("./config.json");
const Base = require("./base");
const fs = require('fs');

global.r = require("rethinkdb");
global.arrayOfSlashCommands = [];

const client = new Base({ intents: [ 32767 ], partials: ["MESSAGE", "CHANNEL", "REACTION"]});

client.slashCommands = new Collection;
const commandFolders = fs.readdirSync('./commands');

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

r.connect({db: "krivebot", host: "localhost", port: "28015", timeout: 600}, function(err, con) {
    if (err) console.log(err)
    client.con = con;

    console.log("RethinkDb Connected");
})

client.login(token)