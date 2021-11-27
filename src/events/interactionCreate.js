const { MessageEmbed } = require("discord.js");
const r = require("rethinkdb")
const wait = require('util').promisify(setTimeout);
const cooldown = new Set;
module.exports = {
    name: "interactionCreate",
    once: true,

    async execute (client, interaction) {
        if (!interaction.isCommand()) return;

        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(client, interaction);

            if (interaction.isContextMenu()) {
                await interaction.deferReply({ ephemeral: false });
                const command = client.slashCommands.get(interaction.commandName);
                if (command) command.run(client, interaction);
            }

        } catch (error) {
            let errorEmbedChannel = new MessageEmbed()
                .setDescription(`Server ID: ${interaction.guild.id} (${interaction.guild.name})\nError:\n\`\`\`${error || "None"}\`\`\``)
                .setColor("DARK_BUT_NOT_BLACK")
                .setTimestamp()
            if (error) client.channels.cache.get("914250038744604672").send({embeds: [errorEmbedChannel]})

            let errorEmbed = new MessageEmbed()
                .setDescription(`An error has occurred! View [Documentation](https://docs.krivebot.xyz)\nOr [Required bot permissions](https://docs.krivebot.xyz/permissions)\nError:\n\`\`\`${error || "None."}\`\`\`\n\n[Contact with the bot administration](https://krivebot.xyz/discord)\n[Statuspage](https://status.krivebot.xyz)`)
                .setColor("DARK_BUT_NOT_BLACK")
                .setTimestamp()
            interaction.reply({embeds: [errorEmbed]})
        }
    }
}