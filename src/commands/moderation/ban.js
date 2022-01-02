const { SlashCommandBuilder } = require('@discordjs/builders');
const r = require("rethinkdb")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Pernamentnie banuje użytkownika z serwera.')
        .addUserOption(option => (
            option.setName("member").setDescription("Użytkownik.").setRequired(true)
        )).addStringOption(option => (
            option.setName("reason").setDescription("Powód bana.")
        )),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});
        if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply({content: "Nie mam permisji do wyrzucania użytkowników!"})

        const member = await interaction.options.getMember("member");
        let reason = await interaction.options.getString("reason");

        await member.ban({ reason: "" })

        client.builder(interaction, `Zbanowano użytkownika!`, `Zbanowano użytkownika na serwerze ${interaction.guild.name}`, ``, `RED`, [
            {
                name: "Użytkownik", value: member.tag
            },
            {
                name: "Zbanowany przez", value: interaction.user.tag
            },
            {
                name: "Powód", value: reason
            }
        ])
    }
};
