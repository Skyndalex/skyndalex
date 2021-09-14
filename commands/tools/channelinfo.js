const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
const r = require("rethinkdb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Informacje o kanale')
        .addChannelOption(option => (
            option.setName("kanał").setDescription("Wybierz kanał o którym mam wyświetlić informacje").setRequired(true)
        )),
    async execute(client, interaction) {
        const channel = interaction.options.getChannel("kanał");

        let type = {
            GUILD_TEXT: "Tekstowy",
            GUILD_CATEGORY: "Kategoria",
            GUILD_NEWS: "Ogłoszeniowy",
            GUILD_STORE: "Sklep",
            GUILD_NEWS_THREAD: "Wątek",
            GUILD_PUBLIC_THREAD: "Wątek",
            GUILD_PRIVATE_THREAD: "Wątek",
            GUILD_STAGE_VOICE: "Eventowy"
        };
        client.builder(interaction, "Informacje o kanale.", `Nazwa: ${channel.name}\nID: ${channel.id}\nTemat: ${channel.topic || "Brak"}\nTyp: ${type[channel.type]}`, `Informacje o kanale`, `GREEN`, ``)
    }
};