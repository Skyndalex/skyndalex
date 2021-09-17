const fs = require("fs");

module.exports = (client) => {
    const commands = []
    const commandFolders = fs.readdirSync('/commands');

    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`/commands/${folder}`).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`/commands`);
            commands.push(command.data.toJSON());

            client.commands.set(command.data.name, command);
        }
    }
}