const { Intents, Collection } = require('discord.js');
const KriveManager = require("./Client.js")
const client = new KriveManager({
	intents: [
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
	], partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

const fs = require("fs")
const r = require("rethinkdb")

const { token } = require("./config.json")

client.commands = new Collection();

require("./site/site").run(client)
require("./functions")(client)

fs.readdirSync("./commands").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
	for (const file of commands) {
		let pull = require(`./commands/${dir}/${file}`);
		if (pull.help && pull.help.name) {
			client.commands.set(pull.help.name, pull);
		} else {
			continue;
		}
	}
});

r.connect({db: "krivebot", host: "localhost", port: "28015", timeout: 600}, function(err, con) {
	if (err) console.log(err)
	client.con = con;

	console.log("RethinkDb Connected")
})

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