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

        const commands = require("../commands")
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
                console.log('Bot ready.')
            } catch (error) {
                console.error(error);
            }
        })();
    }
}