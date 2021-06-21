const r = require("rethinkdb")
const Discord = require("discord.js")

module.exports = async (client, message) => {
    try {
        const logChannel = await r.table("settings").get(message.channel.guild.id)("messageDeleteLog").default(null).run(client.con)

        let tof = {
            false: "Nie",
            true: "Tak"
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Usunięto wiadomość!")
            .setColor("GREEN")
            .addField("Treść", message.content || "Brak")
            .addField("Autor", message.author.tag || "Brak")
            .addField("ID", message.id || "Brak")
            .addField("Kanał", message.channel.name || "Brak")
            .addField("Była przypięta?", tof[message.pinned])
        if (message.attachments.map(a => a.url)[0]) embed.addField('Pliki', message.attachments.map(a => `${a.name} -> ${a.url}`));
        if (!message.attachments.map(a => a.url)[0]) embed.addField('Pliki', 'Wiadomość nie zawierała żadnych plików');
        message.channel.guild.channels.cache.get(logChannel).send(embed)
    } catch {
        null;
    }
}