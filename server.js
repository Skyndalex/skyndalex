const Discord = require("discord.js-light")
const fs = require("fs")
const { prefix, token } = require("./config.json")
const client = new Discord.Client({
	cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    cacheEmojis: true,
    cachePresences: false
})

const r = require("rethinkdb")

	r.connect({db: "krivebot"}, (err, con) => {
			if (err) console.log(err)
		    client.con = con;
	})
client.on("ready", () => {
    console.log("client ready");
});

client.commands = new Discord.Collection();

fs.readdirSync("./commands/").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (let file of commands) {
		let pull = require(`./commands/${dir}/${file}`);
		if (pull.help && pull.help.name) {
			console.log(`Loaded command: ${file}`);
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
	console.log(`Loaded event: ${file}`);
	client.on(eventName, event.bind(null, client));
}

require("./func.js")(client);

client.login(token)