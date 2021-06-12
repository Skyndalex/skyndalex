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
                .addField("Brak zmian?", "Jeżeli zobaczysz brak zmian może oznaczać to, że bot wykrył coś innego niż jest podane.")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel).send(logRolesUpdateEmbed)
        } else {
            let userStatus = {
                online: "Dostępny",
                offline: "Niedostępny",
                idle: "Zaraz wracam",
                dnd: "Nie przeszkadzać"
            }
            const logEmbed = new Discord.MessageEmbed()
                .setTitle("Aktualizacja użytkownika")
                .addField("Nazwa przed", oldMember.user.username ||"Brak")
                .addField("Nazwa po", newMember.user.username ||"Brak")
                .addField("Pseudonim przed", oldMember.nickname ||"Brak")
                .addField("Pseudonim po", newMember.nickname ||"Brak")
                .addField("Tag przed", oldMember.discriminator||"Brak")
                .addField("Tag po", newMember.discriminator||"Brak")
                .addField("Status przed", userStatus[oldMember.presence.status])
                .addField("Status po", userStatus[newMember.presence.status])
                .addField("Brak zmian?", "Jeżeli zobaczysz brak zmian może oznaczać to, że bot wykrył coś innego niż jest podane.")
                .setColor("GREEN")
            newMember.guild.channels.cache.get(logChannel).send(logEmbed)

        }
    } catch {
        null
    }
}