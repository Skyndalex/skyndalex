const { MessageEmbed } = require("discord.js")
exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Pomoc")
        .setDescription("Pomoc komend")
        .addField("Bot", `> \`${client.commands.filter(c => c.help.category === "bot").map(c => c.help.name).join(' | ') || "Brak"}\``)
        .setColor("GREEN")
        message.reply({embeds: [embed]})
}
module.exports.help = {
    name: "help",
    category: "bot",
    description: "Pomoc",
}