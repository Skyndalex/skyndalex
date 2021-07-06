const Discord = require("discord.js")
const r = require("rethinkdb")
const { prefix } = require("./config.json")
const cooldown = new Set;

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

// DM support system

    if (message.channel.type === "dm") {
        if (message.content === "support") {
            client.sender(message, "DMSupport", "Witaj! Chcesz się skontaktować z administracją bota? Napisz cokolwiek, aby wysłać swój tekst do administracji. ", "", "GREEN")
        } else {
        if (message.content) {
            client.channels.cache.get(`861351339446632508`).send(`\`DMSupport\` (${message.author.tag}) (${message.author.id}): ${message.content}`)
    
            client.sender(message, "Wysłano wiadomość do supportu!", "", "", "GREEN", [
                {
                    name: "Wiadomość",
                    value: message.content
                }
             ])
        }
    }
}

    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return

    let whitelist = [];

    const cmd = client.commands.get(command) || client.commands.find(c => c.help.aliases && c.help.aliases == command);
    if (!cmd) return;
    
    if (cooldown.has(message.author.id) && !whitelist.includes(message.author.id)) {
        client.sender(message, "Zwolnij!", "Zbyt szybko korzystasz z komend! Poczekaj około 2 sekundy [Zobacz dokumentację](https://docs.krivebot.xyz/pl/cooldowns).", "", "GREEN", "", "", "")
    } else {

    cmd.run(client, message, args)

    cooldown.add(message.author.id);
    setTimeout(() => cooldown.delete(message.author.id), 2000);
    }
}