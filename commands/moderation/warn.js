const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`MANAGE_ROLES\`", client.footer, "RED", "", "")

    const user = message.mentions.users.first()

}