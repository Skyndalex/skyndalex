const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    const role = await r.table("settings").get(message.guild.id)("userRole").run(client.con)
    if (!role) return message.channel.send("Nie ustawiono roli użytkownika!")

   await message.channel.overwritePermissions(
        [
            {
                id: role,
                deny: ["SEND_MESSAGES"]
            }
        ]
    )
    client.sender(message, "", "Zamknięto kanał.", "", "GREEN", "", "", "")
}
exports.help = {
    name: "lock",
    description: "Zamyka wszystkie kanały na serwerze",
    category: "tools",
}