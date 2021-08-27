const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.broadcast\`", "", "RED", "", "")

    const voting = args.join(" ")
    if (!voting) return client.sender(message, "Błąd!", "Nie podano treści głosowania!", "", "RED", "", "", "")

    const channel = await r.table("settings").get(message.guild.id)("voteChannel").run(client.con)

    const embed = new MessageEmbed()
    .setDescription(`Nowe głosowanie!\n\n${voting}`)
    .setFooter(`Przez: ${message.author.tag}`)
    .setTimestamp()
    .setColor("NAVY")

    client.channels.cache.get(channel).send({embeds: [embed]}).then(rct => {
        rct.react("👍")
        rct.react("👎")
    })

    client.mentionSender(message, "Wysłano!", "Pomyślnie wysłano głosowanie!", "", "GREEN", "", "", "")
}
exports.help = {
    name: "vote",
    description: "Głosowania",
    usage: "vote [głosowanie]",
    perms: "server.manage_channels.voting",
    category: "tools"
}