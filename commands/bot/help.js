const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pomoc')
        .setDescription('Lista komend'),

    async execute(client, interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('help-select-menu')
                    .setPlaceholder('Nic nie zaznaczono.')
                    .addOptions([
                        {
                            label: 'Poradnik',
                            description: 'Jak używać komend?',
                            value: 'tutorial',
                        },
                        {
                            label: "Dodawanie bota",
                            description: "Dodaj bota na swó serwer!",
                            value: "bot_invite"
                        }
                    ]),
            );
        await interaction.reply({ content: "Wybierz z listy...", components: [row]});

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 120000});

        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                if (i.values[0] === 'tutorial') {
                    i.update({content: "\`Opcje\`: Po wybraniu wartości wpisz \`tab\` a następnie \`enter\` aby zatwierdzić.\n\`Opisy komend:\` Opisy komend znajedziesz po ukośniku [/].`"})
                } else if (i.values[0] === "bot_invite") {
                    i.update({content: "Zaproś bota tutaj! => https://krivebot.xyz/invite\nUwaga: Bot potrzebuje scopów do slash komend aby działał poprawnie"})
                }
            }
        });
    }
};
