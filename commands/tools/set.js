const Discord = require("discord.js-light")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    /*
    if (!message.member.hasPermission('ADMINISTRATOR')) return client.errorBuilder(message, `Nie masz permisji! `);
    if (args[0] === "broadcastChannel") {
        if (!args[0]) return client.errorBuilder(message, "Nie podano kanału!")
        const settingsBroadcastChannel = message.mentions.channels.first()
        const err = isNaN(settingsBroadcastChannel)
        if (err === true) return client.errorBuilder(message, 'Nie znalazłem tego kanału')
        if (settingsBroadcastChannel.type === "voice") return client.errorBuilder(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
        if (settingsBroadcastChannel.type === "category") return client.errorBuilder(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

        r.table("settings").insert({
            id: message.guild.id,
            broadcastChannel: settingsBroadcastChannel
        }).run(client.con)

        r.table("settings").get("id").update({settingsBroadcastChannel: channel}).run(client.con)

        let embed1 = new Discord.MessageEmbed()
            .setTitle("Ustawiono")
            .addField("Zmienna", "\`broadcastChannel\`")
            .addField("Wartość", `<#${channel.id}>`)
            .setColor("GREEN")
        message.channel.send(embed1).catch(err => {
            message.channel.send(err)
        })
    } else {
        let config = new Discord.MessageEmbed()
            .setTitle("Ustawienia serwerowe")
            .setDescription("Użycie: \`set [zmienna] [wartość]\`\n\nLista zmiennych poniżej")
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

     */
    client.commandNotEnabled(message, "Komenda dalej testowana")
}
exports.help = {
    name: "set",
    description: "Ustawienia serwerowe",
    category: "tools",
    aliases: ["ustaw"]
}