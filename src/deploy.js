const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientID, testGuildID } = require('./config.json').discord
const fs = require('fs');

const commands = [];
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        const commandFolders = fs.readdirSync('./slashCommands');

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./slashCommands/${folder}`).filter((file) => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`./slashCommands/${folder}/${file}`);
                commands.push(command.data.toJSON());
            }
        }
        await (async () => {
            try {
                console.log('Loading (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(clientID, testGuildID),
                    {
                        body: commands,
                    }
                );
                await rest.put(Routes.applicationCommands(clientID), {
                    body: [], // commands
                });
                console.log('Loaded (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    } catch (error) {
        console.error(error);
    }
})();
