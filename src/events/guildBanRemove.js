import { MessageEmbed } from "discord.js";
const r = require("rethinkdb")
module.exports = async (client, guild, user) => {
        const g = await r.table("logs").get(guild.id).run(client.con)
       
        if (!g.guildBanRemoveLogActivate) return 

        const logEmbed = new MessageEmbed()
            .setTitle("Odbanowano użytkownika!")
            .addField("Nazwa", user.username || "Brak")
            .addField("Tag", user.tag)
            .addField("Serwer", guild.name)
            .setColor("RED")
            guild.channels.cache.get(g.guildBanRemoveLog).send(logEmbed)
}