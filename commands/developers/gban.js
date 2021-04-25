const Discord = require("discord.js");
const r = require('rethinkdb')
exports.run = async (client, message, args) => {
    let dv = ["817883855310684180"];
    if (!dv.includes(message.author.id)) return client.error(message, `Potrzebujesz uprawnień developera aby użyć tej komendy!`)
    let user = message.mentions.users.first()


    if (!user) return client.error(message, `Nie znaleziono użytkownika`)
    if (!args[0]) return client.error(message, `Nie podano użytkownika`)
    if (!args[1]) return client.error(message, `Nie podano powodu`)

    r.table("gbans").insert({
        userid: user.id,
        gbanReason: args.join(" ").slice(1),
    }).run(client.con)

    const embed = new Discord.MessageEmbed()
        .setTitle("Nadano gbana")
        .addField("Przez", message.author.tag)
        .addField("Dla", user.tag)
        .addField("Z powodem", args.slice(1))
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "gban",
    description: "Nadaje blokadę użytkownikowi na korzystanie z bota",
    category: "developers"
}