const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('zdobądź informacje o użytkowniku')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Wybierz użytkownika')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const member = interaction.options.getUser('user');

        let embed = new MessageEmbed()
            .setDescription("Informacje o użytkowniku")
            .addField("Tag użytkownika", member.tag)
            .addField("Czy jest botem?", client.tof[member.bot])
            .setColor('GREEN')
            .setFooter("Użytkownik")
            .setTimestamp()
        return interaction.reply({ embeds: [embed] });
    }
};
