const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    const role = await r.table("settings").get(message.guild.id)("userRole").run(client.con)
    if (!role) return message.channel.send("Nie ustawiono roli użytkownika!")

    await message.channel.overwritePermissions(
        [
            {
                id: role,
                allow: ["SEND_MESSAGES"]
            }
        ]
    )

    const embed = new Discord.MessageEmbed()
        .setDescription("Otwarto kanał")
        .setColor("GREEN")
    message.channel.send(embed)
}
    exports.help = {
    name: "unlock",
    description: "Otwiera wszystkie kanały na serwerze",
    category: "tools",
}