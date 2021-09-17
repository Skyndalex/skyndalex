const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('howsimp')
        .setDescription('sprawdź czy ktoś jest simpem')
        .addUserOption(option => (
            option.setName("kogo").setDescription("Kogo chcesz sprawdzić?").setRequired(true)
        )),

    async execute(client, interaction) {
            const target = interaction.options.getUser("kogo");
            let percent = Math.floor(Math.random() * (100 - 0))

            client.builder(interaction, ``, `${target.tag} jest simpem na ${percent}%!`, ``, `GREEN`, ``)
    }
};
