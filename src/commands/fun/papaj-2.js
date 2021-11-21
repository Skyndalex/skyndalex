const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('papaj')
        .setDescription('memes about the pope (Polish command)'),

    async execute(client, interaction) {
        if (!interaction.channel.nsfw) return interaction.reply("This channel is not NSFW. Warning: command contains swear words");

        interaction.reply({ files: [`https://raw.githubusercontent.com/MrBoombastic/OpenPapaj/1.0/images/${Math.floor(Math.random() * (1142 - 0))}.jpg`]})
    }
};
