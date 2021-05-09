const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return client.sender(message, "401: Unauthorized", "Brak dostępu do tej komendy! \`MANAGE_GUILD\`", client.footer, "RED", "", "")

    client.sender(message, "307: Temporary Redirect", "Automoderacja została **przeniesiona** do wersji 3.2", client.footer, "GREEN", "", "")
}
exports.help = {
    name: "automoderation",
    aliases: ["automoderacja"],
    category: "moderation",
}