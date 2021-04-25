const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return client.error(message, 'Nie masz permisji do banowania!')

    const role = await r.table("settings").get(message.guild.id)("vcBanRole").run(client.con)
    if (!role) return client.error(message, "Nie ustawiono roli!")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return client.error(message, "Nie znaleziono użytkownika")

    await member.roles.add(role)

    const embed = new Discord.MessageEmbed()
        .setTitle("Zabrano użytkownikowi dostęp do kanałów głosowych")
        .addField("Użytkownik", member.user.tag)
        .addField("Zabrał", message.author.tag)
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "vcban",
    aliases: ["zbanujvc"],
    category: "vcmanagement",
}