const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = {
    name: "emojiCreate",
    once: false,

  async execute(client, emoji) {
        const logChannel = await r.table("logs").get(emoji.guild.id)("emojiCreate").run(client.con)

        const embed = new MessageEmbed()
        .setDescription(`**Utworzono emoji!**\n\nNazwa: ${emoji.name}\nID: ${emoji.id}\nURL: ${emoji.url}`)
        .setColor("GREEN")
        emoji.guild.channels.cache.get(logChannel).send({embeds: [embed]})
    }
}