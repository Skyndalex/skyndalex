const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Odcisza użytkownika.')
        .addUserOption(option => (
            option.setName("user").setDescription("Użytkownik.").setRequired(true)
        )).addStringOption(option => (
            option.setName("reason").setDescription("Powód wyciszenia.")
        )),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});

        const settings = await r.table("settings").get(interaction.guild.id).run(client.con)
        if (!settings?.mutedRole) interaction.reply({content: "Administrator serwera nie ustawił roli wyciszonego!"})

        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        member.roles.remove(settings?.mutedRole, { reason: "Odciszono." })

        client.builder(interaction, ``, `**Odciszono!**\n\nPowód: ${reason || "Nie podano"}\nOdciszono przez: ${interaction.user.tag}\nOdciszony: ${member.user.tag}`, ``, `GREEN`, ``, ``)
    }
};
