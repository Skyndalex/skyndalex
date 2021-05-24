const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(" ")

    if (!user) return client.error(message, "Nie znaleziono użytkownika!")
    if (!reason) return client.error(message, "Nie podano powodu")

    const channel = await r.table("settings").get(message.guild.id)("complaintChannel").run(client.con)
    if (!channel) return client.error(message, "Nie znaleziono kanału")

    const embed = new Discord.MessageEmbed()
        .setTitle("Wysłano skargę.")
        .addField("Zgłoszony użytkownik", user)
        .addField("Powód", reason)
        .addField("Zgłosił", message.author.tag)
        .setColor("GREEN")
    if (message.attachments.map(a=>a.url)[0]) embed.setImage(message.attachments.map(a=>a.url)[0])
    if (message.attachments.map(a=>a.url)[0]) embed.setFooter('W obrazku pokazane jest tylko jedno pierwsze zdjęcie!');
    client.channels.cache.get(channel).send(embed)

    client.sender(message, `Wysłałeś skargę pomyślnie!`, `Wysłano skargę na użytkownika ${user}\nZ powodu: ${reason}\nKanał: <#${channel}>`, ``, `GREEN`)
}
exports.help = {
    name: "complaint",
    description: "Wysyła skargę",
    category: "tools",
}