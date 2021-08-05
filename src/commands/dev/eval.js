const Discord = require("discord.js");

exports.run = async (client, message, args) => {
	if (args[0] === "client.token") return message.channel.send("Nǐ xiǎng qiǎngjié wǒ, zhè hěn yǒuqù. Bùshì hěn hǎo! Zěnme kěnéng! Wèishéme, shì yào shòufá de!")
	if (args[0] === "bot.token") return message.channel.send("Bù yǔnxǔ! Xiàng zhèyàng pòjiě jīqìrén hěn cánrěn, nǐ hěn cōngmíng dàn bùshìhé gǒu")
	
	let dev = ["817883855310684180", "304979757852917762"];
	if (!dev.includes(message.author.id)) return message.channel.send("Niedostępne dla uzytkowników!")
	let cToken = new RegExp(client.token, "g");
  	
	const clean = text => {
	  	if (typeof text === "string") {
			return text
				.replace(/`/g, "`" + String.fromCharCode(8203))
				.replace(/@/g, "@" + String.fromCharCode(8203))
				.replace(cToken, "tu nic nie ma???");
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
	category: "dev",
}