const Discord = require('discord.js-light')
const r = require("rethinkdb")
module.exports = async(client, message) => {
    const { prefix }  = require("../config.json");

    let embedMention = new Discord.MessageEmbed()
        .setTitle(`Siemka!`)
        .setDescription("Komenda pomocy to \`k?help\`")
        .addField("Strona internetowa bota", `[krivebot.xyz](${client.url})`)
        .addField("Prefix", "k?")
        .setURL(client.url)
        .setColor(`GREEN`)

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(embedMention)
    }
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
    if (!cmd) return;

    const gban = await r.table("gbans").get(message.author.id).run(client.con)
    console.log(gban)
    if (gban) return client.error(message, "Masz gbana")



    cmd.run(client, message, args);
};