module.exports = (client, message) => {
    const r = require("rethinkdb")
    const { prefix }  = require("../config.json");
    const cooldown = new Set();

    const Discord = require('discord.js-light')
    let embedMention = new Discord.MessageEmbed()
        .setTitle(`Siemka!`)
        .setDescription("Komenda pomocy to \`/\`")
        .addField("Strona internetowa bota", "[krivebot.xyz](https://krivebot.xyz)")
        .addField("Prefix", "/")
        .setColor(`GREEN`)

    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(embedMention)
    }
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
/*
   async function gban() {
        const gban = await r.table("gbans").get(message.author.id).run(client.con)
         if (!gban.includes(message.author.id)) return client.errorBuilder(message, "Masz gbana")
    }

*/



    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
    if (!cmd) return;
    let owners = ["292953664492929025"]
        cmd.run(client, message, args);
};