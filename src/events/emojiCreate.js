const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = {
    name: "emojiCreate",
    once: false,

  async execute(client, emoji) {
        const logChannel = await r.table("logs").get(emoji.guild.id).run(client.con)
        if (!logChannel?.emojiCreate) return;

        const embed = new MessageEmbed()
        .setDescription(`**Utworzono emoji!**\n\nNazwa: ${emoji.name}\nID: ${emoji.id}\nURL: ${emoji.url}`)
        .setColor("GREEN")
        emoji.guild.channels.cache.get(logChannel.emojiCreate).send({embeds: [embed]})
    }
}