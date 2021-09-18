const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")

module.exports = {
    name: "emojiUpdate",
    once: false,

  async execute(client, oldEmoji, newEmoji) {
        const logChannel = await r.table("logs").get(oldEmoji.guild.id)("emojiUpdate").run(client.con).catch(err => {false})

        const embed = new MessageEmbed()
        .setDescription(`**Edytowano emoji!**\n\nNazwa przed: ${oldEmoji.name || "Brak" }\nNazwa po: ${newEmoji.name || "Brak" }\nID: ${oldEmoji.id || "Brak" }`)
        .setColor("YELLOW")
        oldEmoji.guild.channels.cache.get(logChannel).send({embeds: [embed]})
    }
}