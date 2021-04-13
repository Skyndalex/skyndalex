const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args, level) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.error(message, 'Nie masz permisji!')

    if (!args[0]) return client.error(message, `Nie podano treści głosowania!`)

    const channel = await r.table("settings").get(message.guild.id).run(client.con)
    if (!channel) return client.error(message, `Nie ustawiono kanału głosowań`)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe głosowanie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
        .setURL(client.url)
    client.channels.cache.get(channel.voteChannel).send(embed).then(m => {
        m.react("👍")
        m.react("👎")
    })
    message.channel.send("Opublikowano nowe głosowanie")
}
exports.help = {
    name: "voting",
    description: "Wysyła głosowanie",
    category: "tools",
}