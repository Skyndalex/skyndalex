const Discord = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldMember, newMember) => {
    try {
        const logChannel = await r.table("settings").get(newMember.guild.id)("guildMemberUpdateLog").run(client.con)
        if (oldMember.roles.cache.map(r => r.id).toString() != newMember.roles.cache.map(r => r.id).toString()) {
            const logRolesUpdateEmbed = new Discord.MessageEmbed()
                .setTitle("Aktualizacja ról użytkownika")
                .addField("Role przed", oldMember.roles.cache.map(r => `${r}`).join(' | ') ||"Brak")
                .addField("Role po", newMember.roles.cache.map(r => `${r}`).join(' | ') ||"Brak")
                .addField("Zaktualizowany użytkownik", newMember.user.tag ||"Brak")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel).send(logRolesUpdateEmbed)
        } else {
            const logEmbed = new Discord.MessageEmbed()
                .setTitle("Aktualizacja użytkownika")
                .addField("Nazwa przed", oldMember.user.username ||"Brak")
                .addField("Nazwa po", newMember.user.username ||"Brak")
                .addField("Pseudonim przed", oldMember.nickname ||"Brak")
                .addField("Pseudonim po", newMember.nickname ||"Brak")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel).send(logEmbed)

        }
    } catch {
        null
    }
}