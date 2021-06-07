const Discord = require('discord.js')
const r = require("rethinkdb")
const { prefix } = require("../config.json")
const cooldown = new Set;
const moment = require("moment")
moment.locale("pl")
module.exports = async(client, message) => {
    const embedMention = new Discord.MessageEmbed()
        .setTitle("Witaj!")
        .addField("> Komenda pomocy", ";help")
        .addField("> Uptime", require("moment").duration(client.uptime).humanize())
        .addField("> Prefix", `${prefix}`)
        .setColor("GREEN")
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
        return message.channel.send(embedMention).then(m => {
            m.delete({timeout: 60000 })
        })
    }
    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const adv = await r.table("settings").get(message.guild.id)("advancedSuggestChannel").run(client.con)
    const suggestion = args.slice(0).join(" ")

    if (message.channel.id === adv) {
        if (message.content === args.slice(0).join(" ")) {
            await message.delete()
            message.channel.send(`Published new suggestion! (Server ID: ${message.guild.id}\nUser ID: ${message.author.id}\nSuggestion: ${suggestion}`)
        }
    }

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
    if (gban) return client.sender(message, "Otrzymałeś blokadę!", "Nie możesz korzystać z komend!", "", "RED", "", "", "")

    let whitelist = ["817883855310684180"];

    if (cooldown.has(message.author.id) && !whitelist.includes(message.author.id)) {
        client.sender(message, "Zwolnij!", "Zbyt szybko korzystasz z komend! Poczekaj około 2 sekundy [Zobacz dokumentację](https://docs.krivebot.xyz/pl/cooldowns).", "", "GREEN", "", "", "")
    } else {
        cmd.run(client, message, args)
        cooldown.add(message.author.id);
        setTimeout(() => cooldown.delete(message.author.id), 2000);
    }
};