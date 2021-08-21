const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    const reason = args.slice(1).join(" ")

    if (!user) return message.channel.send("Nie podałeś użytkownika")
    if (!reason) return message.channel.send("Nie podałeś powodu skargi.")

    const channel = await r.table("settings").get(message.guild.id)("complaintChannel").run(client.con)

    const embed = new MessageEmbed()
    .setDescription(`Nowa skarga!\n\nZgłoszony użytkownik: ${user.tag}\nPowód: ${reason}`)
    .setColor("NAVY")
    .setTimestamp()

    client.channels.cache.get(channel).send({embeds: [embed]})

    client.mentionSender(message, "Wysłano!", "Pomyślnie wysłano skargę!", "", "GREEN", "", "", "")
}
exports.help = {
    name: "complaint",
    description: "Skargi",
    usage: "complaint [użytkownik] [powód]",
    perms: "server.send_messages.complaint",
    category: "tools"
}