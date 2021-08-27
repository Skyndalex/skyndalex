const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.broadcast\`", "", "RED", "", "")

    const broadcast = args.join(" ")
    if (!broadcast) return client.sender(message, "Błąd!", "Nie podano treści ogłoszenia!", "", "RED", "", "", "")

    const channel = await r.table("settings").get(message.guild.id)("broadcastChannel").run(client.con)

    const embed = new MessageEmbed()
    .setDescription(`Nowe ogłoszenie!\n\n${broadcast}`)
    .setFooter(`Przez: ${message.author.tag}`)
    .setColor("NAVY")
    .setTimestamp()

    client.channels.cache.get(channel).send({embeds: [embed]})

    client.mentionSender(message, "Wysłano!", "Pomyślnie wysłano ogłoszenie!", "", "GREEN", "", "", "")
}
exports.help = {
    name: "broadcast",
    description: "Ogłoszenia",
    usage: "broadcast [ogłoszenie]",
    perms: "server.manage_channels.broadcast",
    category: "tools"
}