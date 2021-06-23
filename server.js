const Discord = require("discord.js")
const fs = require("fs")
const KriveManager = require("./Client.js")
const r = require("rethinkdb")
const client = new KriveManager()
const express = require('express')
const app = express()
const port = 2222
const { token } = require("./src/events/config.json")
const os = require("os")
require("./src/dashboard/dashboard").run(client);
require("./src/games/games").run(client)
require("./func")(client);
require("./src/subordinate/array")(client)
require("./src/subordinate/apikeys")(client)
require("./src/site-new/static").run(client)
app.get('/', (req, res) => {
	res.send("Connected")
})

//TODO: rewrite
app.listen(port, () => {
	console.log(`Connected to https://localhost:${port}`)
})


client.commands = new Discord.Collection();

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
client.on('ready', () => {
	console.log(`${client.user.tag} is ready!`)

	// update soon
	 client.channels.cache.get("855759221597405193").setName(`Serwery: ${client.guilds.cache.size}`)
	 client.channels.cache.get("855759613675831297").setName(`Użytkownicy: ${client.users.cache.size}`)
	 client.channels.cache.get("855759814936625162").setName(`RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}/${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
});
r.connect({db: "krivebot", host: "localhost", port: "28015", timeout: 600}, function(err, con) {
	if (err) console.log(err)
	client.con = con;
})

console.log(`Loaded ${client.commands.size} commands`)
client.login(token)