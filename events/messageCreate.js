module.exports = {
    name: "messageCreate",
    once: false,

    execute(client, message) {
        const { prefix } = require("../config.json")

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) return


        const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
       
        if (cmd) cmd.run(client, message, args)
    }
}