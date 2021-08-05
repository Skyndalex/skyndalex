const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldMember, newMember) => {
        const logChannel = await r.table("logs").get(newMember.guild.id).run(client.con)
        if (logChannel?.guildMemberUpdateLog) { 

        if (oldMember.roles.cache.map(r => r.id).toString() != newMember.roles.cache.map(r => r.id).toString()) {
            const logRolesUpdateEmbed = new MessageEmbed()
                .setTitle("Aktualizacja ról użytkownika")
                .addField("Role przed", oldMember.roles.cache.map(r => `${r}`).join(' | ') ||"Brak")
                .addField("Role po", newMember.roles.cache.map(r => `${r}`).join(' | ') ||"Brak")
                .addField("Zaktualizowany użytkownik", newMember.user.tag ||"Brak")
                .addField("Brak zmian?", "Jeżeli zobaczysz brak zmian może oznaczać to, że bot wykrył coś innego niż jest podane.")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel.guildMemberUpdateLog).send(logRolesUpdateEmbed)
        } else {
            if (logChannel?.guildMemberUpdateLog) return 
            const logEmbed = new MessageEmbed()
                .setTitle("Aktualizacja użytkownika")
                if (oldMember.user.username) logEmbed.addField("Nazwa przed", oldMember.user.username)
                if (newMember.user.username) logEmbed.addField("Nazwa po", newMember.user.username)
                if (oldMember.nickname) logEmbed.addField("Pseudonim przed", oldMember.nickname)
                if (newMember.nickname) logEmbed.addField("Pseudonim po", newMember.nickname)
                if (oldMember.discriminator) logEmbed.addField("Tag przed", oldMember.discriminator)
                if (newMember.discriminator) logEmbed.addField("Tag po", newMember.discriminator)
                logEmbed.setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel.guildMemberUpdateLog).send(logEmbed)

        }
    }
}