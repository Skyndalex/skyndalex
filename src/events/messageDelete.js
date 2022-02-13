const r = require("rethinkdb")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "messageDelete",
    once: false,

    async execute(client, message) {
        const logChannel = await r.table("logs").get(message.channel.guild.id)("messageDelete").run(client.con).catch(err => {false})
        if (!logChannel) return false;

        const embed = new MessageEmbed()
        .setDescription(`**Usunięto wiadomość!**\n\nTreść: ${message.content}\nAutor: ${message.author.tag}\nKanał: #${message.channel.name}`)
        .setColor("RED")
        message.channel.guild.channels.cache.get(logChannel).send({ embeds: [embed] })
    }
}