const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "test",
    description: "test",

    run: async (client, interaction) => {
        interaction.reply("Test message.")
    }
}