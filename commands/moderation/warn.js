const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    /*
    if (!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    const user = message.mentions.users.first()
    const reason = args.slice(1).join(" ")
    const id = args[2]

    if (!user) return message.channel.send("Nie podano użytkownika")
    if (!reason) return message.channel.send("Nie podano powodu")
    if (!id) return message.channel.send("Nie podano id!")

    if (isNaN(id)) return message.channel.send("To nie jest liczba lmao")

    await r.table("moderation").update({
        userid: user.id,
        reason: reason,
        id: id
    }).run(client.con)

     */
    message.channel.send("soon")
}
exports.help = {
    name: "warn",
    aliases: ["ostrzez"],
    category: "moderation",
    description: "Ostrzega użytkownika"
}