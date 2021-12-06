const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "ping",
    description: "Bot ping",

    run: async (client, interaction) => {
        const embed = new MessageEmbed()
            .setDescription(`Ping: ${client.ws.ping}ms`)
            .setColor("DARK_BUT_NOT_BLACK")
        interaction.reply({embeds: [embed]})
    }
}