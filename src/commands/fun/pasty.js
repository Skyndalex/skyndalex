const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pasty')
        .setDescription('Random pasty. (Polish command)'),

    async execute(client, interaction) {
        if (!interaction.channel.nsfw) return interaction.reply(client.strings.fun.warning_nsfw);

        await interaction.reply(client.strings.fun.info_fetching_pasty)
        await interaction.followUp({ content: client.strings.fun.info_success, files: [`https://raw.githubusercontent.com/MrBoombastic/OpenPasty/1.0/pasty/${Math.floor(Math.random() * (300 - 0))}.txt`] })
    }
};
