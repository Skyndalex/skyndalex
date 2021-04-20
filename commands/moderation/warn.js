const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    let reason = args[1];
    if (!reason) return client.error(message, "Nie podałeś powodu!");

    let user = message.mentions.users.first();
    if (!user) return client.error(message, "Nie znaleziono użytkownika!");

    r.table("moderation").update({reason: reason, userid: message.author.id}).run(client.con)

    const embed = new Discord.MessageEmbed()
        .setTitle("Nadano ostrzeżenie!")
        .addField("Użytkownik", user.tag)
        .addField("Nadał warna", message.author.tag)
        .setFooter(client.moderationFooter)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "warn",
    aliases: [],
    category: "moderation",
}