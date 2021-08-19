const r = require("rethinkdb")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "messageCreate",
    once: false,

    async execute(client, message) {
        const { prefix } = require("../config.json")

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const WelcomeMessagesArray = ["Witaj", "Miło mi cię poznać!", "Dzień dobry!"]
        const CommandsMessagesArray = ["ping", "help", "ban", "kick", "set", "logs"]

        const mention = new MessageEmbed()
            .setTitle(WelcomeMessagesArray.random())
            .setDescription(`\`\`\`Ping: ${client.ws.ping}\nLiczba serwerów: ${client.guilds.cache.size}\nLiczba użytkowników:\n${client.users.cache.size}\`\`\``)
            .setFooter(`Polecane komendy: ${CommandsMessagesArray.random()}`)
            .setColor("ORANGE")
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.channel.send({ embeds: [mention] }).then(m => {
                setTimeout(() => m.delete(), 10000);
            })
        }

        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) return

        const gban = await r.table("gbans").get(message.author.id).run(client.con)
        if (gban) return client.sender(message, "Otrzymałeś blokadę!", "Nie możesz korzystać z komend!", "", "RED", "", "", "")

        const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);

        if (cmd) cmd.run(client, message, args)
    }
}