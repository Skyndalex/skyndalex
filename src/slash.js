const { token } = require('./config.json');
const fs = require('fs');
const Base = require('./Base.js');
const { Intents, Collection } = require('discord.js');
const r = require('rethinkdb');
const client = new Base({
    intents: [32767],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.commands = new Collection();

global.r = require('rethinkdb');
global.pc = require('picocolors');

require("./sites/home/main").run(client)
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

r.connect(
    {
        db: 'krivebot',
        host: 'localhost',
        port: '28015',
        timeout: 600,
    },
    function (err, con) {
        if (err) console.log(err);
        client.con = con;

        console.log(pc.green(`${pc.yellow('[DATABASE]')} Connected`));
    }
);

const eventFiles = fs
    .readdirSync('./events')
    .filter((file) => file.endsWith('.js'));

for (file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.js')[0];
    client.on(eventName, (...args) => event(client, ...args));
}

client.login(token);
