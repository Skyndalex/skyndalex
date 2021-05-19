const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;

    const { money } = await r.table("economy").get(user.id).run(client.con)
    if (!money) return client.error(message, "Ups! Coś poszło nie tak. Najprawdopodobniej użytkownik nie ma żadnych monet na koncie")

    if (!user) return client.error(message, "Nie znalazłem użytkownika.")

    const embed = new Discord.MessageEmbed()
        .setTitle("Stan konta")
        .addField("Użytkownik", user.tag)
        .addField("Ilość pieniędzy", money||"0")
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "bal",
    aliases: ["cash"],
    category: "economy",
}