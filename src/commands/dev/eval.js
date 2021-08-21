exports.run = (client, message, args) => {
    let dev = ["817883855310684180"];
    if (!dev.includes(message.author.id)) return message.reply({content: "Niedostępne dla użytkowników", allowedMentions: {parse: []}})
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
	  	message.channel.send({content: `\`\`\`js\n${clean(evaled)}\`\`\``});

	} catch (err) {
	  	message.channel.send({content: `\`\`\`js\n${clean(err)}\n\`\`\``});
	}
}
exports.help = {
    name: "eval",
    category: "dev",
    description: "Eval"
}