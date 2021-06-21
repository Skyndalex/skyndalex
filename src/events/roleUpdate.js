const Discord = require("discord.js")
const r = require("rethinkdb")

module.exports = async (client, oldRole, newRole) => {
    const logChannel = await r.table("settings").get(newRole.guild.id)("roleUpdateLog").default(null).run(client.con)

    try {
        if(newRole.members.size!=oldRole.members.size) return
        if(newRole.rawPosition!=oldRole.rawPosition) return

        let tof = {
            true: "Tak",
            false: "Nie"
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Logi - edytowano rolę!!!")
            .addField("Nazwa przed", oldRole.name||"Brak")
            .addField("Nazwa po", newRole.name||"Brak")
            .addField("ID", newRole.id ||"Brak")
            .addField("Kolor HEX przed", oldRole.hexColor ||"Brak")
            .addField("Kolor HEX po", newRole.hexColor ||"Brak")
            .addField("Czy jest wyświetlana osobno? [przed]", tof[oldRole.hoist])
            .addField("Czy jest wyświetlana osobno? [po]", tof[newRole.hoist])
            .addField("Permisje przed", `\`${new Discord.Permissions(oldRole.permissions.bitfield).toArray().join(' | ')}\`` ||"Brak")
            .addField("Permisje po", `\`${new Discord.Permissions(newRole.permissions.bitfield).toArray().join(' | ')}\`` ||"Brak")
            .addField("Pozycja przed", oldRole.rawPosition ||"Brak")
            .addField("Pozycja po", newRole.rawPosition ||"Brak")
            .setColor("GREEN")
        newRole.guild.channels.cache.get(logChannel).send(embed)
    } catch {
        null;
    }
}