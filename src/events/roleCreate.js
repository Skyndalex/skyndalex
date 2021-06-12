const Discord = require("discord.js")
const r = require("rethinkdb")

module.exports = async (client, role) => {
    try {
        const logChannel = await r.table("settings").get(role.guild.id)("roleCreateLog").run(client.con)

        const embed = new Discord.MessageEmbed()
            .setTitle("Utworzono rolę!")
            .setColor("GREEN")
            .addField("Nazwa", role.name ||"Brak")
            .addField("ID", role.id ||"Brak")
            .addField("Kolor HEX", role.hexColor ||"Brak")
            .addField("Pozycja", role.rawPosition ||"Brak")

        role.guild.channels.cache.get(logChannel).send(embed)
    } catch {
        null;
    }
}