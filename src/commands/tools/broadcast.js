const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")
    if (!args[0]) return client.sender(message, "204: No content", "Nie podałeś argumentów.", client.footer, "RED")

    const channel = await r.table("settings").get(message.guild.id)("broadcastChannel").run(client.con)
    if (!channel) return message.channel.send("Nie ustawiono kanału!")

    const notifyRole = await r.table("settings").get(message.guild.id)("broadcastPing").run(client.con)
    if (!notifyRole) return message.channel.send("Brak roli pingu!").then(pingE => {
        pingE.delete({timeout: 1000})
    })

    const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Opublikowano nowe ogłoszenie")
        .setDescription(args.join(" "))
        .setColor("GREEN")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    client.channels.cache.get(channel).send(embed)
    client.channels.cache.get(channel).send(`<@&${notifyRole}>`).then(ping => {
        ping.delete({timeout: 1000})
    })
    const sent = new Discord.MessageEmbed()
        .setDescription("Wysłano ogłoszenie!")
        .setColor("GREEN")
    message.channel.send(sent)

    const logChannel = await r.table("logs").get(message.guild.id)("broadcastLog").run(client.con)
    if (!logChannel) return message.channel.send("Nie ustawiono logów ogłoszeń, więc nie jestem w stanie przekierować je na kanał z logami!").then(m => {
        m.delete({timeout: 1000})
    })

    const embedBroadcastLog = new Discord.MessageEmbed()
       .setTitle("Logi: Wysłano ogłoszenie")
       .addField("Treść", args.join(" "))
       .addField("Autor ogłoszenia", message.author)
       .addField("Kanał ogłoszeń (ID)", channel)
       .setColor("GREEN")
    client.channels.cache.get(logChannel).send(embedBroadcastLog)
}
exports.help = {
    name: "broadcast",
    description: "Wysyła ogłoszenie ogłoszenie",
    category: "tools",
}