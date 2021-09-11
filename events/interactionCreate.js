module.exports = {
    name: "interactionCreate",
    once: false,

    async execute (client, interaction) {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            if (error) console.error(error);
            await interaction.reply({ content: 'Wystąpił błąd podczas uruchamiania komendy!', ephemeral: true });
        }
    }
}