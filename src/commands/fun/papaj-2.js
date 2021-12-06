module.exports = {
    name: "papaj",
    description: "memes about the pope",

    run: async (client, interaction) => {
        if (!interaction.channel.nsfw) return interaction.reply(client.strings.fun.warning_nsfw);

        await interaction.reply(client.strings.fun.info_fetching)
        await interaction.followUp({ content: client.strings.fun.info_success, files: [`https://raw.githubusercontent.com/MrBoombastic/OpenPapaj/1.0/images/${Math.floor(Math.random() * (1142 - 0))}.jpg`] })
    }
};
