const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(" ")

    if (!user) return message.channel.send("Nie znaleziono użytkownika")
    if (!reason) return message.channel.send("Nie podano powodu")

    const channel = await r.table("settings").get(message.guild.id)("complaintChannel").run(client.con)
    if (!channel) return message.channel.send("Nie znaleziono kanału")

    const embed = new Discord.MessageEmbed()
        .setTitle("Wysłano skargę.")
        .addField("Zgłoszony użytkownik", user)
        .addField("Powód", reason)
        .addField("Zgłosił", message.author.tag)
        .setColor("RED")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    if (message.attachments.map(a=>a.url)[0]) embed.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie!');
    client.channels.cache.get(channel).send(embed)

    client.sender(message, `Wysłałeś skargę pomyślnie!`, `Wysłano skargę na użytkownika ${user}\nZ powodu: ${reason}\nKanał: <#${channel}>`, ``, `GREEN`)

    const logChannel = await r.table("logs").get(message.guild.id)("complaintLog").run(client.con)
    if (!logChannel) return message.channel.send("Nie ustawiono logów skarg, więc nie jestem w stanie przekierować je na kanał z logami!").then(m => {
        m.delete({timeout: 1000})
    })

    const embedComplaintPing = new Discord.MessageEmbed()
    .setTitle("Logi: Wysłano skargę.")
    .addField("Oskarżony użytkownik", user)
    .addField("Powód", reason)
    .addField("Zgłosił", message.author.tag)
    .setColor("GREEN")
    client.channels.cache.get(logChannel).send(embedComplaintPing)
}
exports.help = {
    name: "complaint",
    description: "Wysyła skargę",
    category: "tools",
}