const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldMember, newMember) => {
    const logChannel = await r.table("settings").get(newMember.guild.id)("guildMemberUpdateLog").run(client.con)

    if (oldMember.roles.cache.map(r=>r.id).toString()!=newMember.roles.cache.map(r=>r.id).toString()) {
        const logRolesUpdateEmbed = new Discord.MessageEmbed()
            .setTitle("Aktualizacja ról użytkownika")
            .addField("Role przed", oldMember.roles.cache.map(r => `${r}`).join(' | '))
            .addField("Role po", newMember.roles.cache.map(r => `${r}`).join(' | '))
            .addField("Zaktualizowany użytkownik", newMember.user.tag)
            .setColor("GREEN")
        newMember.guild.channels.cache.get(logChannel).send(logRolesUpdateEmbed)
    } else {
        const logEmbed = new Discord.MessageEmbed()
            .setTitle("Aktualizacja użytkownika")
            .addField("Nazwa przed", oldMember.user.username)
            .addField("Nazwa po", newMember.user.username)
            .addField("Pseudonim przed", oldMember.nickname)
            .addField("Pseudonim po", newMember.nickname)
            .setColor("GREEN")
        newMember.guild.channels.cache.get(logChannel).send(logEmbed)

    }
}