const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('howgay')
        .setDescription('sprawdź czy ktoś jest gejem')
        .addUserOption(option => (
            option.setName("kogo").setDescription("Kogo chcesz sprawdzić?").setRequired(true)
        )),

    async execute(client, interaction) {
        if (interaction.options.getUser("kogo")) {
            const target = interaction.options.getUser("kogo");
            let percent = Math.floor(Math.random() * (100 - 0))

            client.builder(interaction, ``, `${target.tag} jest gejem na ${percent}%!`, `Gae`, `GREEN`, ``)
        }
    }
};
