const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('przytul')
        .setDescription('Przytul użytkownika')
        .addUserOption(option => (
            option.setName("kogo").setDescription("Kogo chcesz przytulić?").setRequired(true)
        )),

    async execute(client, interaction) {
            const target = interaction.options.getUser("kogo");

            interaction.reply({content: `Nie płacz, <@${target.id}>! I tak będziesz mieszkać w polsce\n\n*Obcykał cię <@${interaction.user.id}>*`});
    }
};
