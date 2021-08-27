const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
exports.run = async (client, message, args) => {
    const appl = args.join(" ")
    if (!appl) return client.sender(message, "Błąd!", "Nie podano treści podania!", "", "RED", "", "", "")

    const channel = await r.table("settings").get(message.guild.id)("applicationChannel").run(client.con)

    const embed = new MessageEmbed()
    .setDescription(`**Nowe podanie!**\n\n${appl}`)
    .setFooter(`Przez: ${message.author.tag}`)
    .setColor("GREEN")
    .setTimestamp()

    client.channels.cache.get(channel).send({embeds: [embed]})

    client.mentionSender(message, "Wysłano!", "Pomyślnie wysłano podanie!", "", "GREEN", "", "", "")
}
exports.help = {
    name: "application",
    description: "Podania",
    usage: "application [treść podania]",
    perms: "server.send_messages.application",
    category: "tools"
}