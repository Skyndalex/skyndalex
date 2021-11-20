const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Client ping.'),

    async execute(client, interaction) {
        const embed = new MessageEmbed()
            .setDescription(`Ping: \`${client.ws.ping}ms\``)
            .setColor("#2f3136")
        await interaction.reply({embeds: [embed]})
    }
};