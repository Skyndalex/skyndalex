const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stonoga')
        .setDescription('Stonoga memes (Polish command)'),

    async execute(client, interaction) {
        if (!interaction.channel.nsfw) return interaction.reply(client.strings.fun.warning_nsfw);

        await interaction.reply(client.strings.fun.info_fetching)
        await interaction.followUp({ content: client.strings.fun.info_success, files: [`https://raw.githubusercontent.com/MrBoombastic/OpenStonoga/1.0/memes/${Math.floor(Math.random() * (144 - 0))}.jpg`] })
    }
};
