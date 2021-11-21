const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stonoga')
        .setDescription('Stonoga memes (Polish command)'),

    async execute(client, interaction) {
        if (!interaction.channel.nsfw) return interaction.reply("This channel is not NSFW. Warning: command contains swear words");

        interaction.reply({ files: [`https://raw.githubusercontent.com/MrBoombastic/OpenStonoga/1.0/memes/${Math.floor(Math.random() * (144 - 0))}.jpg`]})

    }
};
