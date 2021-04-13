const Discord = require('discord.js')
const r = require("rethinkdb")
const { prefix } = require("../config.json")
module.exports = async(client, message) => {

    const embedMention = new Discord.MessageEmbed()
        .setTitle("Witaj! Miło mi cię poznać")
        .addField("Ostatnia aktualizacja bota", client.latestupdate)
        .addField("Wersja bota", client.version)
        .addField("Discord", client.discord)
        .addField("Dokumentacja", client.docsLink)
        .addField("Strona główna", client.url)
        .addField("Prefix", prefix)
        .setFooter("Wersja bota v4.0 drastycznie się zmieni: Nowe konfiguratory, panel, reactionrole, publiczna muzyka i wiele więcej!")
        .setThumbnail(client.user.displayAvatarURL({size: 1024}))
        .setColor("GREEN")
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(embedMention).then(m => {
            m.delete({timeout: 5000})
        })
    }
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
    if (!cmd) return;

    const gban = await r.table("gbans").get(message.author.id).run(client.con)
    if (gban) return client.error(message, `Otrzymałeś blokadę na korzystanie z komend`)


    cmd.run(client, message, args);
};