const {MessageEmbed} = require("discord.js");
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
            await interaction.reply({ content: 'An error occurred while running the command! An error was sent to the console\nReason: The message may be too long, or there was some other problem with the code. Either way, I have contacted the administration'});
        }
    }
}