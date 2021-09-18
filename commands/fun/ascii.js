const { SlashCommandBuilder } = require('@discordjs/builders');
const figlet = require("figlet")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ascii')
        .setDescription('Generuje duży tekst.')
        .addStringOption(option => (
        option.setName("text").setDescription("Podaj tekst, który mam przerobić.").setRequired(true)
    )),

    async execute(client, interaction) {
            const text = interaction.options.getString("text");

            figlet(text, function (err, data) {
                if (err) return interaction.reply({content: err, ephemeral: true})

                if (data.length > 2000) return interaction.reply({ content: 'Tekst jest za długi', ephemeral: true });
                interaction.reply({content: `\`\`\`${data}\`\`\``});
            });
    }
};
