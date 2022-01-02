const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")
const {use} = require("express/lib/router");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Ostrzeża użytkownika.')
        .addUserOption(option => (
            option.setName("warn").setDescription("Użytkownik.").setRequired(true)
        )).addStringOption(option => (
            option.setName("reason").setDescription("Powód ostrzeżenia.")
        )),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});

        const nid = Math.floor(Math.random() * (100 - 0));
        const userid = interaction.options.getUser("warn");
    }
};
