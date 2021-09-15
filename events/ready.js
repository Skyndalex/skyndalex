const { REST } = require("@discordjs/rest");
const { token } = require("../config.json");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        const clientId = '829812129074774086';
        const guildId = '804477558061137972';

        const ping = new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Oblicza ping bota.');

        const userinfo = new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Sprawdza dane o koncie jakiegoś użytkownika.')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('Wybierz użytkownika')
                    .setRequired(true));

        const stats = new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Statystyki bota');

        const ascii = new SlashCommandBuilder()
            .setName('ascii')
            .setDescription('Generuje duży tekst.')
            .addStringOption(option => (
                option.setName("text").setDescription("Podaj tekst, który mam przerobić.").setRequired(true)));

        const serverinfo = new SlashCommandBuilder()
            .setName('serverinfo')
            .setDescription('Informacje o serwerze.');

        const broadcast = new SlashCommandBuilder()
            .setName('ogłoszenie')
            .setDescription("Wyślij ogłoszenie.")
            .addStringOption(option => (
                option.setName("args").setDescription("Treść ogłoszenia.").setRequired(true)));

        const complaint = new SlashCommandBuilder()
            .setName("skarga")
            .setDescription("Wyślij skargę.")
            .addUserOption(option => (
                option.setName("user").setDescription("Użytkownik, na którego chcesz złożyć skargę.").setRequired(true)
            )).addStringOption(option => (
                option.setName('reason').setDescription("Powód skargi.")));

        const vote = new SlashCommandBuilder()
            .setName("vote")
            .setDescription("Wyślij głosowanie.");

        const eval = new SlashCommandBuilder()
            .setName("eval")
            .setDescription("Wywołuje kod")
            .addStringOption(option => (
                option.setName("kod").setDescription("kod do wywołania").setRequired(true)
            ));
        const channelinfo = new SlashCommandBuilder()
            .setName('channelinfo')
            .setDescription('Informacje o kanale')
            .addChannelOption(option => (
                option.setName("kanał").setDescription("Wybierz kanał o którym mam wyświetlić informacje").setRequired(true)
            ));
        const roleinfo = new SlashCommandBuilder()
            .setName('roleinfo')
            .setDescription('Informacje o roli')
            .addRoleOption(option => (
                option.setName("rola").setDescription("Wybierz rolę, o której mam wyświetlić informacje").setRequired(true)
            ))

        const set = new SlashCommandBuilder()
            .setName('set')
            .setDescription('Ustawienia serwerowe.')
            .addChannelOption(option => (
                option.setName("ogłoszenia").setDescription("Kanał ogłoszeniowy")
            )).addChannelOption(option => (
                option.setName('głosowania').setDescription("Kanał głosowań")
            )).addChannelOption(option => (
                option.setName("skargi").setDescription("Kanał skarg")
            )).addChannelOption(option => (
                option.setName("obrazki").setDescription("Kanał obrazkowy")
            )).addChannelOption(option => (
                option.setName("powitania").setDescription("Kanał powitań")
            )).addChannelOption(option => (
                option.setName("pożegnania").setDescription("Kanał pożegnań")
            )).addChannelOption(option => (
                option.setName("sugestie").setDescription("Kanał sugestii")
            )).addChannelOption(option => (
                option.setName("podania").setDescription("Kanał podań")
            ));

        const commands = [ ping, userinfo, stats, ascii, serverinfo, set, broadcast, complaint, vote, eval, channelinfo, roleinfo ]

        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                console.log('[/] Loading.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                ); // Komendy serwerowe
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
            ); // Komendy globalne

                console.log('[/] Loaded');
            } catch (error) {
                console.error(error);
            }
        })();
        console.log('Ready!')
    }
}