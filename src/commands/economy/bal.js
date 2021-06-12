const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    const user = message.mentions.users.first()  || client.users.cache.get(args[0]) || message.author;

    const { money } = await r.table("economy").get(user.id).run(client.con)
    if (!money) return message.channel.send("Coś poszło nie tak! Najprawdopodobniej użytkownik nie posiada monet na koncie")

    if (!user) return message.channel.send("Brak użytkownika")

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