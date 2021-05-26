const Discord = require("discord.js")
const fs = require("fs")
const { token } = require("./config.json")
const KriveManager = require("./Client.js")
const r = require("rethinkdb")
const client = new KriveManager()
const express = require('express')
const app = express()
const port = 2222

require("./dashboard/dashboard").run(client);
require("./games/games").run(client)
require("./func.js")(client);
require("./subordinate/array")(client)
require("./subordinate/apikeys")(client)

app.get('/', (req, res) => {
	res.send("Connected")
})


//TODO: rewrite
app.listen(port, () => {
	console.log(`Connected to https://localhost:${port}`)
})

r.connect({db: "krivebot"}, (err, con) => {
	if (err) console.log(err)
	client.con = con;
})



client.commands = new Discord.Collection();
// client.events = new Discord.Collection()

fs.readdirSync("./commands/").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
	for (let file of commands) {
		let pull = require(`./commands/${dir}/${file}`);
		if (pull.help && pull.help.name) {
			client.commands.set(pull.help.name, pull);
		} else {
			continue;
		}
	}
});


const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	const eventName = file.split(".")[0];
	client.on(eventName, event.bind(null, client));
}

console.log(`Loaded ${client.commands.size} commands`)
// console.log(`Loaded ${client.events.size} events`)
client.login(token)