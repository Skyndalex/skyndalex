const Discord = require("discord.js-light");

exports.run = async (client, message, args) => {
	const arr = ["509014773006991376"];
	if (!arr.includes(message.author.id)) return client.errorBuilder(message, `Potrzebujesz uprawnień developera aby użyć tej komendy!`)
	let cToken = new RegExp(client.token, "g");
  
	if (!args[0]) return client.error(message, `Nie podano kodu wejściowego!`)

	const clean = text => {
	  	if (typeof text === "string") {
			return text
				.replace(/`/g, "`" + String.fromCharCode(8203))
				.replace(/@/g, "@" + String.fromCharCode(8203))
				.replace(cToken, "token");
		} else {
	  		return text;
		}
	};

	try {
	  	const code = args.join(" ");
	  	let evaled = eval(code);

	  	if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
	  	message.channel.send(`\`\`\`js\n${clean(evaled)}\`\`\``);

	} catch (err) {
	  	message.channel.send(`\`\`\`js\n${clean(err)}\n\`\`\``);
	}
}
exports.help = {
	name: "eval",
	aliases: ["e"],
	category: "developers",
}