const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Sprawdź awatar jakiegoś użytkownika.')
        .addUserOption(option => (
            option.setName("user").setDescription("Użytkownik").setRequired(true)
        )),

    async execute(client, interaction) {
        if (interaction.options.getUser("user")) {
            const target = interaction.options.getUser("user");

            client.builder(interaction, ``, `**Profilowe użytkownika ${target.tag}**\n\n[Pobierz](${target.avatarURL()})`, ``, `GREEN`, ``, target.avatarURL())
        }
    }
};