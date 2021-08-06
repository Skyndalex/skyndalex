const { Client, Collection, Intents } = require('discord.js');
const fs = require("fs")
const r = require("rethinkdb")

const { token } = require("./src/events/config.json")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
	console.log(`KriveBot is ready`)
});

client.commands = new Collection();
client.aliases = new Collection();

require("./functions.js")(client)
require("./src/dash/start").run(client)

r.connect({db: "krivebot", host: "localhost", port: "28015", timeout: 600}, function(err, con) {
	if (err) console.log(err)
	client.con = con;
})

fs.readdirSync("./src/commands").forEach(dir => {
	const commands = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));
	for (const file of commands) {
		let pull = require(`./src/commands/${dir}/${file}`);
		if (pull.help && pull.help.name) {
			client.commands.set(pull.help.name, pull);
		} else {
			continue;
		}
	}
});

const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"));
	for (const file of eventFiles) {
		const event = require(`./src/events/${file}`);
		const eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client))
}

client.login(token)