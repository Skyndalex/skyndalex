const Discord = require("discord.js")
module.exports = async (client, oldEmoji, newEmoji) => {
    const logChannel = await r.table('settings').get(oldEmoji.guild.id)("emojiUpdateLog").run(client.con)

    let animated = {
        true: "Tak",
        false: "Nie"
    }
}