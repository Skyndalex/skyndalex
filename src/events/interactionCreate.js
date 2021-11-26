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
            if (error) console.error(error);

            let errorEmbed = new MessageEmbed()
                .setDescription(`An error has occurred!\nError:\n\`\`\`${error || "None."}\`\`\`\n\n[Contact with the bot administration](https://krivebot.xyz/discord)\n[Statuspage](https://status.krivebot.xyz)`)
                .setColor("DARK_BUT_NOT_BLACK")
                .setTimestamp()
            await interaction.reply({embeds: [errorEmbed]})
        }
    }
}