module.exports = {
    name: "interactionCreate",
    once: false,

    async execute (client, interaction) {
        if (!interaction.isCommand()) return;
        const cmd = client.slashCommands.get(interaction.commandName);

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (cmd) cmd.run(client, interaction);
    }
}