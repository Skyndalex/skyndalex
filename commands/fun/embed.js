const Discord = require("discord.js");
exports.run = async (client, message, args) => {
if (!args[0]) return client.error(message, `Nie podałeś odpowiednich argumentów \`[author, title, description, footer, color]\``)
    const embed = new Discord.MessageEmbed()
        .setAuthor(args[0]||"Nie podano")
        .setTitle(args[1]||"Nie podano")
        .setDescription(args[2]||"Nie podano")
        .setFooter(args[3]||"Nie podano")
        .setColor(args[4]||"Nie podano")
    message.channel.send(embed)
}
exports.help = {
    name: "embed",
    description: "Buduje wiadomość embed",
    category: "fun"
}