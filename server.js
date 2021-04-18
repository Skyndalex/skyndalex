const Discord = require("discord.js")
const fs = require("fs")
const { token } = require("./config.json")
const KriveManager = require("./Client.js")
const r = require("rethinkdb")
const client = new KriveManager({
	cacheGuilds: true,
	cacheChannels: true,
	cacheOverwrites: true,
	cacheRoles: true,
	cacheEmojis: true,
	cachePresences: true,
})

client.perms = [
	"817883855310684180",
	"484419302200442890",
]
const express = require('express')
const app = express()
const port = 2222

app.get('/', (req, res) => {
	res.send('Sent')
})

app.listen(port, () => {
	console.log(`Express server started`)
})

r.connect({db: "krivebot"}, (err, con) => {
	if (err) console.log(err)
	client.con = con;
})

client.commands = new Discord.Collection();

// TODO: przenieść slash komendy do innegoo plyku SlashCommands.js

client.ws.on('INTERACTION_CREATE',  interaction => {
	switch(interaction.data.name.toLowerCase()) {
		case 'ping':
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: client.ws.ping
					}
				}
			})
			break;
		case 'authors':
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: "entity2#8571"
					}
				}
			})
			break;
		case 'discord':
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: "https://krivebot.xyz/discord"
					}
				}
			})
			break;
		case 'page':
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: "https://krivebot.xyz"
					}
				}
			})
			break;
		case 'invite':
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: "https://krivebot.xyz/invite"
					}
				}
			})
			break;
		case 'public':
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: "https://krivebot.xyz/public"
					}
				}
			})
			break;
	}
});

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
console.log(`Loaded ${client.commands.size} commands`)
console.log("Starting...")
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	const eventName = file.split(".")[0];
	client.on(eventName, event.bind(null, client));
}

require("./func.js")(client);

client.login(token)