const Discord = require("discord.js-light")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return client.error(message, `Nie masz permisji! `);
    if (args[0] === "broadcastChannel") {
        if (!args[0]) return client.error(message, "Nie podano kanału!")
        let channel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
        if (!channel) return client.error(message, `Nie znaleziono kanału!`)
        if (channel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
        if (channel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

        r.table("settings").insert({
            id: message.guild.id,
            broadcastChannel: channel.id
        }).run(client.con)

        r.table("settings").get(message.guild.id).update({broadcastChannel: channel.id}).run(client.con)

        let embed = new Discord.MessageEmbed()
            .setTitle("Ustawiono")
            .addField("Zmienna", "broadcastChannel")
            .addField("Nowa wartość", `<#${channel.id}>`)
            .setColor("GREEN")
            .setURL(client.url)
        message.channel.send(embed)
    } else {
        let config = new Discord.MessageEmbed()
            .setTitle("Ustawienia serwerowe")
            .setDescription("Użycie: \`set [zmienna] [wartość]\`\n\nLista zmiennych poniżej (to co jest po numerze)")
            .addField("\`[1] broadcastChannel\`", "Ustawia kanał ogłoszeń")
            .addField("\`[2] voteChannel\`", "Ustawia kanał głosowań")
            .addField("\`[3] private-mod-channel\`", "Ustawia kanał na którym wysyła pytania użytkowników i inne moderacyjne rzeczy")
            .addField("\`[4] passChannel\`", "Ustawia kanał podań")
            .addField("\`[5] suggestionsChannel\`", "Ustawia kanał propozycji")
            .addField("\`[6] globalBroadcastChannel\`", "Ustawia kanał globalnych powiadomień bota")
            .addField("\`[7] verificationRole\`", "Ustawia rolę która zostaje nadawana po przejściu weryfikacji (BETA)")
            .addField("\`[8] prefix\`", "Zmienia prefix")
            .setFooter("[] - parametr wymagany <> - parametr opcjonalny")
            .setColor("GREEN")
        message.channel.send(config)
    }


}
exports.help = {
    name: "set",
    description: "Ustawienia serwerowe",
    category: "tools",
    aliases: ["ustaw"]
}