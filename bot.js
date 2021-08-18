const { Client, Intents, Collection } = require('discord.js');
const fs = require("fs")

const { token } = require("./config.json")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

require("./functions")(client)

fs.readdirSync("./src/commands").forEach(dir => {
	const commands = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));
	for (const file of commands) {
		let pull = require(`./src/commands/${dir}/${file}`);
		if (pull.help && pull.help.name) {
			client.commands.set(pull.help.name, pull);
			// console.log(commands) debug 
		} else {
			continue;
		}
	}
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.on(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}
client.login(token);