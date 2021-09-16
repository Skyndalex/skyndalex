const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleinfo')
        .setDescription('Informacje o roli')
        .addRoleOption(option => (
            option.setName("rola").setDescription("Wybierz rolę, o której mam wyświetlić informacje").setRequired(true)
        )),
    async execute(client, interaction) {
        const role = interaction.options.getRole("rola");

        let tof = {
            true: "Tak",
            false: "Nie"
        };

        client.builder(interaction, "Informacje o roli.", `Nazwa: ${role.name}\nID: ${role.id}\nPozycja: ${role.rawPosition}\nMożna oznaczać? ${tof[role.mentionable]}`, `Informacje o kanale`, role.hexColor, ``);
    }
};