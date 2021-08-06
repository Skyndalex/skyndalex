exports.help = {
    async execute(interaction) {
		await interaction.reply(`Ping: ${client.ws.ping}`);
	},
    name: "ping",
    description: "Ping bota",
    category: "bot",
    aliases: ["pong"]
}