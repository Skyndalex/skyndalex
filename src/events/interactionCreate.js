const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const cooldown = new Set();
module.exports = async (client, interaction) => {
    const interactionFiles = fs.readdirSync('./interactions');

    for (const folder of interactionFiles) {
        const interactionFiles = fs.readdirSync(`./interactions/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of interactionFiles) {
            const module = require(`../interactions/${folder}/${file}`);
            module.run(client, interaction)
        }
    }

    if (!interaction.isCommand()) return;
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if (!slashCommand) return;
    if (!interaction.user.bot)

    if (cooldown.has(interaction.user.id)) {
        await interaction.reply({ content: 'wait 3 sec before using command again', ephemeral: true });
    } else {
        await slashCommand.execute(client, interaction);
    }
    cooldown.add(interaction.user.id);
    setTimeout(() => {
        cooldown.delete(interaction.user.id);
    }, 3000);
};
