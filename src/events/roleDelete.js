const Discord = require("discord.js")
const r = require("rethinkdb")

module.exports = async (client, role) => {
    const logChannel = await r.table("settings").get(role.guild.id)("roleDeleteLog").default(null).run(client.con)

    const embed = new Discord.MessageEmbed()
        .setTitle("Usunięto rolę!")
        .addField("Nazwa", role.name ||"Brak")
        .addField("Pozycja", role.rawPosition ||"Brak")
        .addField("ID", role.id)
        .addField("Liczba osób które miały tą role", role.members.size)
        .setColor("RED")
    role.guild.channels.cache.get(logChannel).send(embed)
}