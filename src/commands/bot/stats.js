const { MessageEmbed } = require("discord.js");
const si = require('systeminformation');
module.exports = {
    name: "stats",
    description: "Bot stats",
    options: [
        { name: "cache", description: "Cache stats", type: 1 },
        { name: "system", description: "System stats", type: 1},
    ],

    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "cache") {
            const embed = new MessageEmbed()
                .setTitle(`Cache stats`)
                .addField(`Guilds`, client.guilds.cache.size)
                .addField(`Users`, client.users.cache.size)
                .addField(`Channels`, client.channels.cache.size)
                .addField(`Emojis`, client.emojis.cache.size)
            await interaction.reply({ embeds: [embed] })
        } else if (interaction.options.getSubcommand() === "system") {
            si.cpuTemperature().then(data => interaction.reply({content: data.main}))
        }
    }
}