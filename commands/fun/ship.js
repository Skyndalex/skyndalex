const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Poziom miłości.')
        .addStringOption(option => (
            option.setName("user1").setDescription("Pierwszy użytkownik").setRequired(true)
        )).addStringOption(option => (
            option.setName("user2").setDescription("Drugi użytkownik").setRequired(true)
        )),

    async execute(client, interaction) {
        if (interaction.options.getString("user1")) {
            if (interaction.options.getString("user2")) {
                const ship1 = interaction.options.getString("user1");
                const ship2 = interaction.options.getString("user2");
                let percent = Math.floor(Math.random() * (100 - 0)) //+0 matematik.pl!!!!

                client.builder(interaction, ``, `${ship1} oraz ${ship2} kochaja sie na ${percent}%!`, `Ship`, `GREEN`, ``, ``);
            }
        }
    }
};
