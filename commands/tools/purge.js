const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Wyczyść wiadomości.')
        .addStringOption(option => (
            option.setName("amount").setDescription("Liczba wiadomości do skasowania").setRequired(true)
        )),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_CHANNELS')) return interaction.reply({content: "Nie masz permisji!", ephemeral: true});
        if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: "Nie mam permisji do zarządzania wiadomościami!"})

        const toClear = interaction.options.getString("amount");

        if (isNaN(toClear)) return interaction.reply({content: "To nie jest liczba!", ephemeral: true});
        if (toClear > 100) return interaction.reply({content: 'Podano za wysoką liczbę!', ephemeral: true});
        if (toClear < 2) return interaction.reply({content: 'Podano za małą liczbę!', ephemeral: true});

        await interaction.channel.messages.fetch({ limit: toClear }).then(messages => {
            interaction.reply({content: "Pomyślnie wyczyszczono wiadomości!"})
            interaction.channel.bulkDelete(messages)
        })
    }
};