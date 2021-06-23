const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args, level) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")

    if (!args[0]) return message.channel.send("Nie podano treści głosowania.")

    const channel = await r.table("settings").get(message.guild.id)("voteChannel").default(message.channel.send("Brak ustawionego kanału.")).run(client.con)
    if (!channel) return message.channel.send("Nie ustawiono kanału!")

    const notifyRole = await r.table("settings").get(message.guild.id)("notifyVotingRole").default(null).run(client.con)
    if (!notifyRole) return null;

    const logChannel = await r.table("logs").get(message.guild.id)("votingLog").default(null).run(client.con)

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe głosowanie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    client.channels.cache.get(channel).send(`<@&${notifyRole}>`).then(ping => {
        ping.delete({timeout: 1000})
    })
    client.channels.cache.get(channel).send(embed).then(m => {
        m.react("👍")
        m.react("👎")
    })
    message.channel.send("Opublikowano nowe głosowanie")

    
    const embedVotingLog = new Discord.MessageEmbed()
       .setTitle("Logi: Wysłano głosowanie")
       .addField("Treść", args.join(" "))
       .addField("Autor głosowania", message.author.tag)
       .addField("Kanał głosowań (ID)", channel)
       .setColor("GREEN")
    client.channels.cache.get(logChannel).send(embedVotingLog)
}
exports.help = {
    name: "voting",
    description: "Wysyła głosowanie",
    category: "tools",
}