const Discord = require("discord.js")
const r = require("rethinkdb")
const { prefix } = require("./config.json")

module.exports = async(client, message) => {    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const embedMention = new Discord.MessageEmbed()
    .setTitle("Cześć, miło mi cię poznać!")
    .addField("Uptime:", require("moment").duration(client.uptime).humanize())
    .addField("Prefix:", `${prefix}`)
    .addField("Autor:", client.users.cache.get("817883855310684180").tag)
    .setColor("GREEN")
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
    return message.channel.send(embedMention).then(m => {
        m.delete({timeout: 60000 })
    })
}

    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return

    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
    if (!cmd) return;

    cmd.run(client, message, args)
}