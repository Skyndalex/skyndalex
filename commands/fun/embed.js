const { MessageEmbed } = require("discord.js");
exports.run = async (client, message, args) => {
    if (!args[4]) return client.sender(message, "Błąd!", "Nie podałeś wszystkich argumentów. [Poradnik](https://docs.krivebot.xyz/embeds)", "", "RED")

    const embed = new MessageEmbed()
        .setAuthor(args[0]||"Nie podano")
        .setTitle(args[1]||"Nie podano")
        .setDescription(args[2]||"Nie podano")
        .setFooter(args[3]||"Nie podano")
        .setColor(args[4]||"Nie podano")
    message.channel.send({embeds: [embed]})
}
exports.help = {
    name: "embed",
    description: "Buduje wiadomość embed",
    perms: "server.send_messages.embed",
    category: "fun"
}