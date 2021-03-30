const Discord = require("discord.js-light");
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const arr = ["509014773006991376"];
    if (!arr.includes(message.author.id)) return client.errorBuilder(message, `Potrzebujesz uprawnień developera aby użyć tej komendy!`)

    const user = message.mentions.users.first()||client.users.cache.get(args[0])||client.users.cache.get(args[1])

    if (!user) return client.error(message, `Nie znaleziono użytkownika`)

    if (!args[0]) return client.error(message, `Nie podano użytkownika`)

    r.table("gbans").filter({userid: user.id}).delete().run(client.con)

    let embed = new Discord.MessageEmbed()
        .setDescription(`Usunięto gbana dla ${user.tag}`)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "ungban",
    description: "Usuwa blokadę na korzystanie z bota",
    category: "dev"
}