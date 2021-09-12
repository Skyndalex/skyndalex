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
            .setDescription('Oblicza ping bota.')

        const userinfo = new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Sprawdza dane o koncie jakiegoś użytkownika.')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('Wybierz użytkownika')
                    .setRequired(true)
            )
        const stats = new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Statystyki bota')

        const ascii = new SlashCommandBuilder()
            .setName('ascii')
            .setDescription('Generuje duży tekst.')
            .addStringOption(option => (
                option.setName("text").setDescription("Podaj tekst, który mam przerobić.").setRequired(true)
            ))

        const serverinfo = new SlashCommandBuilder()
            .setName('serverinfo')
            .setDescription('Informacje o serwerze.')

        const set = new SlashCommandBuilder()
            .setName('set')
            .setDescription('Ustawienia serwerowe.')
            .addChannelOption(option => (
                option.setName("broadcast").setDescription("Kanał ogłoszeniowy")
            )).addChannelOption(option => (
                option.setName('vote').setDescription("Kanał głosowań")
            )).addChannelOption(option => (
                option.setName("complaint").setDescription("Kanał skarg")
            )).addChannelOption(option => (
                option.setName("images").setDescription("Kanał obrazkowy")
            )).addChannelOption(option => (
                option.setName("welcome").setDescription("Kanał powitań")
            )).addChannelOption(option => (
                option.setName("goodbye").setDescription("Kanał pożegnań")
            )).addChannelOption(option => (
                option.setName("suggest").setDescription("Kanał sugestii")
            )).addChannelOption(option => (
                option.setName("application").setDescription("Kanał podań")
            ))

        const commands = [ ping, userinfo, stats, ascii, serverinfo, set ]

        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                console.log('[/] Loading.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );

                console.log('[/] Loaded');
            } catch (error) {
                console.error(error);
            }
        })();
        console.log('Ready!')
    }
}