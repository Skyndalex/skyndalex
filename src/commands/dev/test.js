const { MessageEmbed, MessageButton } = require("discord.js");
exports.run = async (client, message, args) => {
    let dev = ["817883855310684180"];
    if (!dev.includes(message.author.id)) return message.channel.send("Niedostępne dla uzytkowników!")

    const embed = new MessageEmbed()
        .setDescription("test")
        .setColor("GREEN")
}
exports.help = {
    name: "test",
    aliases: ["t"],
    category: "dev",
}