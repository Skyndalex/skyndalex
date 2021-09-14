const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Oblicza ping bota.'),

    async execute(client, interaction) {
        const embed = new MessageEmbed()
            .setDescription(`Mój ping: \`${client.ws.ping}\`\n\n[Uptime](https://status.krivebot.xyz)`)
            .setColor("GREEN")

        await interaction.deferReply()
        await wait(10)
        await interaction.editReply({ embeds: [embed]})
    }
};