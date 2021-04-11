const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message) => {
    const user = message.mentions.users.first()

    const { money } = await r.table("economy").get(user.id).run(client.con)
    if (!money) return client.error(message, "Ups! Coś poszło nie tak. Najprawdopodobniej użytkownik nie ma żadnych monet na koncie")

    if (!user) return client.error(message, "Nie znalazłem użytkownika.")

    const embed = new Discord.MessageEmbed()
        .setTitle("Stan konta")
        .addField("Użytkownik", user.tag)
        .addField("Ilość pieniędzy", money)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "bal",
    aliases: ["cash"],
    category: "economy",
}