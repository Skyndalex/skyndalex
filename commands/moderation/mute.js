const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Wycisza użytkownika.')
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
        const reason = interaction.options.getString("reaon");

        member.roles.add(settings?.mutedRole, { reason: "Wyciszono." })

        client.builder(interaction, ``, `**Wyciszono!**\n\nPowód: ${reason || "Nie podano"}\nWyciszono przez: ${interaction.user.tag}\nWyciszony: ${member.user.tag}`, ``, `RED`, ``, ``)
    }
};
