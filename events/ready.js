const { REST } = require("@discordjs/rest");
const { token } = require("../config.json");
const { Routes } = require("discord-api-types/v9");
const { Collection } = require("discord.js");
module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        const clientId = '886359782213165107';
        const guildId = '804477558061137972';

        const commands = []
        client.commands = new Collection();

        console.log('Ready!');

        const rest = new REST({ version: '9' }).setToken(token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}