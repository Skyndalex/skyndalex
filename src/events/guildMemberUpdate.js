const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = async (client, oldMember, newMember) => {
        const logChannel = await r.table("logs").get(newMember.guild.id).run(client.con)
        if (oldMember.roles.cache.map(r => r.id).toString() != newMember.roles.cache.map(r => r.id).toString()) {
            const logRolesUpdateEmbed = new MessageEmbed()
                .setTitle("Aktualizacja ról użytkownika")
                .addField("Role przed", oldMember.roles.cache.map(r => `${r}`).join(' | ') ||"Brak")
                .addField("Role po", newMember.roles.cache.map(r => `${r}`).join(' | ') ||"Brak")
                .addField("Zaktualizowany użytkownik", newMember.user.tag ||"Brak")
                .addField("Brak zmian?", "Jeżeli zobaczysz brak zmian może oznaczać to, że bot wykrył coś innego niż jest podane.")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel).send(logRolesUpdateEmbed)
        } else {
            const logEmbed = new MessageEmbed()
                .setTitle("Aktualizacja użytkownika")
                .addField("Nazwa przed", oldMember.user.username ||"Brak")
                .addField("Nazwa po", newMember.user.username ||"Brak")
                .addField("Pseudonim przed", oldMember.nickname ||"Brak")
                .addField("Pseudonim po", newMember.nickname ||"Brak")
                .addField("Tag przed", oldMember.discriminator||"Brak")
                .addField("Tag po", newMember.discriminator||"Brak")
                .addField("Status przed", client.presences[oldMember.presence.status])
                .addField("Status po", client.presences[newMember.presence.status])
                .addField("Brak zmian?", "Jeżeli zobaczysz brak zmian może oznaczać to, że bot wykrył coś innego niż jest podane.")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel.guildMemberUpdateLog).send(logEmbed)

        }
}