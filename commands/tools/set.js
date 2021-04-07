const Discord = require("discord.js-light")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return client.error(message, `Nie masz permisji! `);
    switch (args[0]) {
        case 'broadcastChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")
            let bChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!bChannel) return client.error(message, `Nie znaleziono kanału!`)
            if (bChannel.type === "text") return client.error(message, 'Podałeś kategorię bądź typ kanału głosowy. Prosze podać kanał tekstowy')


            r.table("settings").update({broadcastChannel: bChannel.id}).run(client.con)

            let broadcastChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "broadcastChannel")
                .addField("Nowa wartość", `<#${bChannel.id}>`)
                .setColor("GREEN")
                .setURL(client.url)
            message.channel.send(broadcastChannelConfigEmbed)
            break;
        case 'suggestionsChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")
            let sChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!sChannel) return client.error(message, `Nie znaleziono kanału!`)
            if (sChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (sChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({suggestionsChannel: sChannel.id}).run(client.con)

            let suggestionsChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "suggestionsChannel")
                .addField("Nowa wartość", `<#${sChannel.id}>`)
                .setColor("GREEN")
                .setURL(client.url)
            message.channel.send(suggestionsChannelConfigEmbed)
            break;
        case 'voteChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")
            let vChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!vChannel) return client.error(message, `Nie znaleziono kanału!`)
            if (vChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (vChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({voteChannel: vChannel.id}).run(client.con)

            let voteChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "voteChannel")
                .addField("Nowa wartość", `<#${vChannel.id}>`)
                .setColor("GREEN")
                .setURL(client.url)
            message.channel.send(voteChannelConfigEmbed)
            break;
        case 'private-mod-channel':
            client.commandNotEnabled(message, "Komenda będzie dostępna 07.04.2021")
            break;
        case 'passChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")
            let pChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!pChannel) return client.error(message, `Nie znaleziono kanału!`)
            if (pChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (pChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({passChannel: pChannel.id}).run(client.con)

            let passChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "voteChannel")
                .addField("Nowa wartość", `<#${pChannel.id}>`)
                .setColor("GREEN")
                .setURL(client.url)
            message.channel.send(passChannelConfigEmbed)
            break;
        case 'globalBroadcastChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")
            let gbChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!gbChannel) return client.error(message, `Nie znaleziono kanału!`)
            if (gbChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (gbChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({globalBroadcastChannel: gbChannel.id}).run(client.con)

            let globalBroadcastChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "globalBroadcastChannel")
                .addField("Nowa wartość", `<#${gbChannel.id}>`)
                .setColor("GREEN")
                .setURL(client.url)
            message.channel.send(globalBroadcastChannelConfigEmbed)
            break;
        case 'default':
        default:
            let embed = new Discord.MessageEmbed()
                .setTitle("Ustawienia serwerowe")
                .setDescription("Nie wiesz, jak czegoś ustawić? Wejdź [[TUTAJ]](https://docs.krivebot.xyz/en/ustawienia-kanaly)")
                .addField("\`[1] broadcastChannel\`", "Kanał ogłoszeniowy")
                .addField("\`[2] voteChannel\`", "Kanał głosowań")
                .addField("\`[3] private-mod-channel\`", "Kanał dla moderacji serwera")
                .addField("\`[4] passChannel\`", "Kanał podań")
                .addField("\`[5] suggestChannel\`", "Kanał propozycji")
                .addField("\`[6] globalBroadcastChannel\`", "Kanał globalnych ogłoszeń bota **[zalecane]**")
                .addField("\`[7] prefix\`", "Customowy prefix serwerowy")
                .setFooter("Ustawienia ról w tym miejscu > set-roles")
                .setColor("GREEN")
            message.channel.send(embed)
            break;
    }
}
exports.help = {
    name: "set",
    description: "Ustawienia serwerowe",
    category: "tools",
    aliases: ["ustaw"]
}