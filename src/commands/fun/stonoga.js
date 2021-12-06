module.exports = {
    name: "stonoga",
    description: "Polish meme.",

    run: async (client, interaction) => {
        if (!interaction.channel.nsfw) return interaction.reply(client.strings.fun.warning_nsfw);

        await interaction.reply(client.strings.fun.info_fetching)
        await interaction.followUp({ content: client.strings.fun.info_success, files: [`https://raw.githubusercontent.com/MrBoombastic/OpenStonoga/1.0/memes/${Math.floor(Math.random() * (144 - 0))}.jpg`] })
    }
};
