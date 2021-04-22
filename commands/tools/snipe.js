const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    const snipes = await client.snipes.get(message.channel) || [];
    const snipedmsg = snipes[args[0] - 1 || 0];

    if (!snipedmsg) return client.error(message, "Nie znaleziono wiadomości.")

    const embed = new Discord.MessageEmbed()
        .setDescription(snipedmsg.content)
        .addField("Wysłano o", snipedmsg.date)
        .setColor("GREEN")
    if (snipedmsg.attachment) embed.setImage(snipedmsg.attachment);
    message.channel.send(embed)
}
exports.help = {
    name: "snipe",
    aliases: ["odkasuj"],
    category: "tools",
}