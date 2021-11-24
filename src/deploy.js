const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

    const clientId = '906527810087174154'; // Skyndalex BETA
    const guildId = '804477558061137972'; // Skyndalex support

    const commands = [];
    const rest = new REST({version: '9'}).setToken(token);

        try {
            const commandFolders = fs.readdirSync('./commands');

            for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = require(`./commands/${folder}/${file}`);
                    commands.push(command.data);
                }
            }
            (async () => {
                try {
                    console.log('Loading (/) commands.');

                    await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: commands },
                    );
                    await rest.put(
                        Routes.applicationCommands(clientId),
                        { body: commands },
                    );
                    console.log('Loaded (/) commands.');
                } catch (error) {
                    console.error(error);
                }
            })();
        } catch (error) {
            console.error(error)
        };