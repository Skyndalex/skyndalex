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

        console.log('Ready!')

        const ping = new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Oblicza ping bota.')

        const userinfo = new SlashCommandBuilder()
            .setName('userinfo')
            .setDescription('Sprawdza dane o koncie jakiegoś użytkownika.')
            .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('Wybierz użytkownika')
                    .setRequired(true)
            )
        const stats = new SlashCommandBuilder()
            .setName('stats')
            .setDescription('Statystyki bota')

        const commands = [
            ping,
            userinfo,
            stats
        ]
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
    }
}