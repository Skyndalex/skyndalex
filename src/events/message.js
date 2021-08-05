const Discord = require("discord.js")
const r = require("rethinkdb")
const { prefix } = require("./config.json")
const cooldown = new Set;
// g = guild
module.exports = async(client, message) => { 
    const prefixdefault = await r.table("settings").get(message.guild.id)("prefix").default(prefix).run(client.con)   
    const gTable = await r.table("settings").get(message.guild.id).run(client.con)

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const embedMention = new Discord.MessageEmbed()
    .setTitle("Witaj!")
    .setDescription("Cieszymy się, że zainteresowałeś się naszym botem!")
    .addField("Wyróżnione funkcje", "\`\`\`- ;rodzina\n- ;set\n- ;help\n- ;logs\`\`\`")
    .addField("Prefix na tym serwerze", `"${prefixdefault}" \`(global: ";")\``)
    .addField("Strona internetowa bota", "https://krivebot.xyz")
    .setFooter("UWAGA - JEST TO WERSJA TESTOWA BOTA! POSIADA WIELE BŁĘDÓW I NIEDOPRACOWAŃ!")
    .setColor("GREEN")
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
    return message.channel.send(embedMention).then(m => {
        m.delete({timeout: 60000 })
    })
}

    if (message.channel.type === "dm") {
        if (message.content === "support") {
            client.sender(message, "DMSupport", "Witaj! Chcesz się skontaktować z administracją bota? Napisz cokolwiek, aby wysłać swój tekst do administracji. ", "", "GREEN")
        } else {
        if (message.content) {
            client.channels.cache.get(`861351339446632508`).send(`\`DMSupport\` (${message.author.tag}) (${message.author.id}): ${message.content}`)
    
            message.channel.send(`Pomyślnie wysłano wiadomość do supportu bota.\nTreść: ${message.content}`)
        }
    }
}

    if (message.author.bot) return;

    try {

    if (message.channel.id === gTable.memeChannel) {
        if (!gTable.memeChannelActivate) return

        if (message.attachments.map(a=>a.url)[0]) {
           await message.react("👍")
           await message.react("👎")
        }
    }
    if (message.channel.id === gTable.mediaOnlyChannel) {
        if (!gTable.mediaOnlyActivate) return
        if (message.attachments.size == 0) return message.delete()
    }
    if (message.channel.id === gTable.advancedminiSuggestChannel) {
        if (!gTable.advancedminiSuggestActivate) return
        
        if (message.content) {
            message.react("👍")
            message.react("👎")
        }
    }
    if (message.channel.id === gTable.mediaSuggestChannel) {
        if (!gTable.mediaSuggestActivate) return 

        if (message.content) {
            message.react("👍")
            message.react("👎")
        }
    }
} catch {

}
    if (!message.content.startsWith(prefixdefault)) return
    // logs [For Safety :)] 
    client.channels.cache.get("832231792773431347").send(`Command: ${command}\nUser id: ${message.author.id}\nUser name: ${message.author.username}`)

    const gban = await r.table("gbans").get(message.author.id).run(client.con)
    if (gban) return client.sender(message, "Otrzymałeś blokadę!", "Nie możesz korzystać z komend!", "", "RED", "", "", "")

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