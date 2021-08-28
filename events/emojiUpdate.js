const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = {
    name: "emojiUpdate",
    once: false,

  async execute(client, oldEmoji, newEmoji) {
        const logChannel = await r.table("logs").get(oldEmoji.guild.id)("emojiUpdate").run(client.con)

        const embed = new MessageEmbed()
        .setDescription(`**Edytowano emoji!**\n\nNazwa przed: ${oldEmoji.name}\nNazwa po: ${newEmoji.name}\nID: ${oldEmoji.id}`)
        .setColor("YELLOW")
        oldEmoji.guild.channels.cache.get(logChannel).send({embeds: [embed]})
    }
}