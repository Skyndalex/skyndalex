const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Informacje o serwerze.'),

    async execute(client, interaction) {
        const info = new MessageEmbed()
            .setTitle("Informacje o serwerze")
            .setDescription(`Nazwa serwera: ${interaction.guild.name}\nID serwera: ${interaction.guild.id}\nLiczba członków: ${interaction.guild.memberCount}`)
            .setColor("GREEN")
        interaction.reply({ embeds: [info] })
    }
};
