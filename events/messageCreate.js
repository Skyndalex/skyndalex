const r = require("rethinkdb")
module.exports = {
    name: "messageCreate",
    once: false,

   async execute(client, message) {
        const { prefix } = require("../config.json")

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) return

        const gban = await r.table("gbans").get(message.author.id).run(client.con)
        if (gban) return client.sender(message, "Otrzymałeś blokadę!", "Nie możesz korzystać z komend!", "", "RED", "", "", "")

        const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
       
        if (cmd) cmd.run(client, message, args)
    }
}