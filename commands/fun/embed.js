const Discord = require("discord.js");
exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Nie podałeś odpowiednich argumentów \`[author, title, description, footer, color]\``)

    let author = args[0]
    let title = args[1]
    let description = args[2]
    let footer = args[3]
    let color = args[4]

    let embed = new Discord.MessageEmbed()
        .setAuthor(author)
        .setTitle(title)
        .setDescription(description)
        .setFooter(footer)
        .setColor(color)
    message.channel.send(embed)
}
exports.help = {
    name: "embed",
    description: "Buduje wiadomość embed",
    category: "fun"
}