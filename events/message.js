const Discord = require('discord.js')
const r = require("rethinkdb")
const { prefix } = require("../config.json")
const cooldown = new Set;

module.exports = async(client, message) => {
    const embedMention = new Discord.MessageEmbed()
        .setTitle("Witaj! Miło mi cię poznać")
        .addField("Ostatnia aktualizacja bota", client.latestupdate)
        .addField("Wersja bota", client.version)
        .addField("Discord", client.discord)
        .addField("Dokumentacja", client.docsLink)
        .addField("Strona główna", client.url)
        .addField("Status serwisów", client.statuspage)
        .addField("Zalecane akcje (1)", client.PermissionsNotify)
        .addField("Zalecane akcje (2)", client.securityNotify)
        .addField("Prefix", prefix)
        .setFooter(client.mentionFooter)
        .setThumbnail(client.user.displayAvatarURL({size: 1024}))
        .setColor("GREEN")
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(embedMention).then(m => {
            m.delete({timeout: 300000})
        })
    }
        if (message.author.bot) return;

        if (!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const embed = new Discord.MessageEmbed()
            .setTitle("Użyto komendy")
            .addField("Komenda", command)
            .addField("Użył", message.author.tag)
            .addField("ID serwera", message.guild.id)
            .setColor("GREEN")
    client.channels.cache.get("832231792773431347").send(embed)

        const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
        if (!cmd) return;
        const gban = await r.table("gbans").get(message.author.id).run(client.con)
        if (gban) return client.error(message, `Otrzymałeś blokadę na korzystanie z komend`)

    let whitelist = ["817883855310684180"];

    if (cooldown.has(message.author.id) && !whitelist.includes(message.author.id)) {
        client.error(message, 'Musisz jeszcze poczekać 2 sekundy aby użyć jeszcze raz tą komendę! (czas resetuje się po użyciu w czasie trwania cooldownu)');
    } else {

        cmd.run(client, message, args)

        cooldown.add(message.author.id);
        setTimeout(() => cooldown.delete(message.author.id), 2000);
        }
    };