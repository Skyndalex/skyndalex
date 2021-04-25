const Discord = require("discord.js")
const r = require("rethinkdb")

exports.run = async (client, message, args) => {
    if (!args[0]) return client.error(message, "Nie podałeś użytkownika")

    const role = await r.table("settings").get(message.guild.id)("mutedRole").run(client.con)
    if (!role) return client.error(message, "Nie ustawiono roli!")

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return client.error(message, "Nie znaleziono użytkownika")

    await member.roles.add(role)

    const embed = new Discord.MessageEmbed()
        .setTitle("Uciszono użytkownika!")
        .addField("Uciszył", message.author.tag)
        .addField("Uciszony użytkownik", member.user.tag)
        .addField("Wyciszono na", `${args[1]} sekund`)
        .setFooter(client.moderationFooter)
        .setColor("GREEN")
    message.channel.send(embed)

    const embed2 = new Discord.MessageEmbed()
        .setTitle("Testowane!")
        .setDescription("Uwaga! Komenda **tempmute** jest nadal testowana i łatwo ją zepsuć (np. czas można podawać tylko w sekundach). Bardzo prosimy o zgłaszanie błędów komendą request")
        .setColor("GREEN")
    message.channel.send(embed2)

    setTimeout(async() => {
        await member.roles.remove(role)

        const embed3 = new Discord.MessageEmbed()
            .setTitle("Usunięto wyciszenie")
            .setDescription(`Usunięto dla ${member.user.tag} (FUNKCJA AUTOMATYCZNA)`)
            .setFooter(client.moderationFooter)
            .setColor("RED")
        message.channel.send(embed3)

    }, 1000 * args[1])
}

exports.help = {
    name: "tempmute",
    aliases: ["wycisztymczasowo"],
    category: "moderation",
}