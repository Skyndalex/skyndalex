const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
exports.run = async (client, message, args) => {

    const suggestion = args.join(" ")
    if (!suggestion) return client.sender(message, "Błąd!", "Nie podano treści sugestii!", "", "RED", "", "", "")

    const channel = await r.table("settings").get(message.guild.id)("suggestChannel").run(client.con)
    if (!channel) return message.channel.send("Nie znaleziono kanału")
    
    const embed = new MessageEmbed()
    .setDescription(`Nowa propozycja!\n\n${suggestion}`)
    .setFooter(`Przez: ${message.author.tag}`)
    .setColor("NAVY")
    .setTimestamp()

    client.channels.cache.get(channel).send({embeds: [embed]})

    client.mentionSender(message, "Wysłano!", "Pomyślnie wysłano propozycję!", "", "GREEN", "", "", "")
}
exports.help = {
    name: "suggest",
    description: "Wyślij propozycje na serwer",
    usage: "broadcast [ogłoszenie]",
    perms: "server.manage_channels.broadcast",
    category: "tools"
}