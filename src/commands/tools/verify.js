const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const path = require("path")
const Captcha = require("@haileybot/captcha-generator");
const fs = require("fs")
const r = require("rethinkdb");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Zweryfikuj się.'),

    async execute(client, interaction) {
        if (!interaction.guild.me.permissions.has("MANAGE_ROLES")) return interaction.reply({content: "Nie mam permisji do nadawania roli!"})

        const table = await r.table("settings").get(interaction.guild.id).run(client.con)
        if (!table?.userRole) return interaction.reply({content: "Nie ustawiono roli zweryfikowanego użytkownika na serwerze! \`(userRole)\`"})

        if (interaction.member.roles.cache.map(r => r.id).includes(table?.userRole)) return client.builder(interaction, "", "**Błąd!**\n\nJesteś już zweryfikowany! Nie możesz zweryfikować się po raz drugi.", "", "RED", "", "")

        let captcha = new Captcha();

        await interaction.reply({content: "Wpisz captchę poniżej.", files: [new MessageAttachment(captcha.JPEGStream, "captcha.jpeg")]})

        let collector = interaction.channel.createMessageCollector(m => m.author.id === interaction.user.id);
        collector.on("collect", m => {
            if (m.content.toUpperCase() === captcha.value) {
                interaction.member.roles.add(table.userRole)

                interaction.editReply({content: "Zweryfikowano.", attachements: [], files: []}) //todo: clear attachements
                collector.stop()
            } else {
                interaction.editReply({content: "Podano zły kod!"})
                collector.stop()
            }
        })
    }
};