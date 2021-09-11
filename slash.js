const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');
const { Client, Intents, Collection } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = '829812129074774086';
const guildId = '804477558061137972';

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());

    client.commands.set(command.data.name, command);
}
client.on('ready', () => {
    client.user.setPresence({ activities: [{ name: "Gotowy!" }] });
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
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'Wystąpił błąd podczas uruchamiania komendy!', ephemeral: true });
    }
});
client.login(token)