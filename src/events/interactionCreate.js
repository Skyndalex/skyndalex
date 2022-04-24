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

    if (cooldown.has(interaction.user.id)) {
        await interaction.reply({ content: 'wait 3 sec before using command again', ephemeral: true });
    } else {
        try {
            await slashCommand.execute(client, interaction);
        } catch (error) {
            let errorEmbedChannel = new MessageEmbed()
                .setDescription(`\`\`\`ERROR\`\`\`\nServer ID: ${interaction.guild.id} (${interaction.guild.name})\nError:\n\`\`\`${error || 'None'}\`\`\``)
                .setColor('DARK_BUT_NOT_BLACK')
                .setTimestamp();
            if (error) client.channels.cache.get('959177004152934431').send({ embeds: [errorEmbedChannel] });

            let errorEmbed = new MessageEmbed()
                .setDescription(`\`\`\`ERROR\`\`\`\n[\`support\`](https://discord.gg/WEas4WFjse)\nBłąd:\n\`\`\`${error || 'none.'}\`\`\``)
                .setColor('DARK_BUT_NOT_BLACK')
                .setTimestamp();
            if (error) interaction.reply({ embeds: [errorEmbed] });

        }
    }
    cooldown.add(interaction.user.id);
    setTimeout(() => {
        cooldown.delete(interaction.user.id);
    }, 3000);

    let embed = new MessageEmbed()
    if (interaction.fields.getTextInputValue("title")) embed.setTitle(interaction.fields.getTextInputValue("title"))
    if (interaction.fields.getTextInputValue("desc")) embed.setDescription(interaction.fields.getTextInputValue("desc"))
    if (interaction.fields.getTextInputValue("color")) embed.setColor(interaction.fields.getTextInputValue("color"))
    if (interaction.fields.getTextInputValue("footer")) embed.setFooter({ text: interaction.fields.getTextInputValue("footer") })
    if (interaction.fields.getTextInputValue("author")) embed.setAuthor({ name: interaction.fields.getTextInputValue("author") })
    await interaction.reply({ embeds: [embed] })
};
