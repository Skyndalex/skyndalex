const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pasty')
        .setDescription('Random pasty. (Polish command)'),

    async execute(client, interaction) {
        if (!interaction.channel.nsfw) return interaction.reply("This channel is not NSFW. Warning: command contains swear words");

        interaction.reply({ files: [`https://raw.githubusercontent.com/MrBoombastic/OpenPasty/1.0/pasty/${Math.floor(Math.random() * (300 - 0))}.txt`]})
    }
};
