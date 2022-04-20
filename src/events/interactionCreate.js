const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const cooldown = new Set();
module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return;
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return;

    if (cooldown.has(interaction.user.id)) {
        await interaction.reply({ content: 'wait 3 sec before using command again', ephemeral: true });
    } else {
        try {
            await slashCommand.execute(client, interaction);
        } catch (error) {
            let errorEmbedChannel = new MessageEmbed()
                .setDescription(`Server ID: ${interaction.guild.id} (${interaction.guild.name})\nError:\n\`\`\`${error || 'None'}\`\`\``)
                .setColor('DARK_BUT_NOT_BLACK')
                .setTimestamp();
            if (error) client.channels.cache.get('914250038744604672').send({ embeds: [errorEmbedChannel] });

            let errorEmbed = new MessageEmbed()
                .setDescription(`Ojoj! Wystąpił jakiś błąd z uruchomieniem komendy. Jeśli problem dalej występuje, zgłoś się na serwerze [\`support\`](https://discord.gg/WEas4WFjse)\nBłąd:\n\`\`\`${error || 'Brak.'}\`\`\``)
                .setColor('DARK_BUT_NOT_BLACK')
                .setTimestamp();
            if (error) interaction.reply({ embeds: [errorEmbed] });

        }
    }
    cooldown.add(interaction.user.id);
    setTimeout(() => {
        cooldown.delete(interaction.user.id);
    }, 3000);

    const interactionFiles = fs.readdirSync('./interactions');

    for (const folder of interactionFiles) {
        const interactionFiles = fs.readdirSync(`./interactions/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of interactionFiles) {
            const module = require(`../interactions/${folder}/${file}`);
            module.run(client, interaction)
        }
    }
};
