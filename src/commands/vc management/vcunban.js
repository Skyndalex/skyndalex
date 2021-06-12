const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return client.error(message, 'Nie masz permisji do odbanowywania!')

    const role = await r.table("settings").get(message.guild.id)("vcBanRole").run(client.con)
    if (!role) return client.error(message, "Nie ustawiono roli!")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return client.error(message, "Nie znaleziono użytkownika")

    await member.roles.remove(role)

    const embed = new Discord.MessageEmbed()
        .setDescription("Użytkownik z powrotem otrzymał dostęp do kanałów głosowych")
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "vcunban",
    aliases: ["odbanujvc"],
    category: "vcmanagement",
}