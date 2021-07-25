const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.settings\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")
    const g = await r.table("settings").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Ustawienia serwerowe - menu", "Witaj w ustawieniach serwerowych!\n[Dokumentacja](https://docs.krivebot.xyz)", "", "GREEN", [
                {
                    name: "Ustawienia kanałów",
                    value: "\`set ch\`"
                },
                {
                    name: "Ustawienia ról",
                    value: "\`set roles\`"
                },
                {
                    name: "Ustawienia bota",
                    value: "\`set b\`"
                },
                {
                    name: "Ustawienia logów",
                    value: "\`logs\`"
                }
            ])
            client.sender(message, "UWAGA!", "Ponieważ całkiem niedawno wystartowała nowa wersja bota, ustawienia ról jak i niektórych kanałów są NIEDOSTĘPNE!", "", "RED", "", "")

            break;
        case 'ch':
            client.sender(message, "Ustawienia - kanały", "Lista ustawień kanałów [PORADNIK](https://docs.krivebot.xyz)", "", "GREEN", [
                {
                    name: "Kanał ogłoszeń",
                    value: `<#${g.broadcastChannel || "Brak"}>`
                },
                {
                    name: "Kanał obrazkowy",
                    value: `<#${g.mediaOnlyChannel || "Brak"}>`
                },
                {
                    name: "Kanał memów",
                    value: `<#${g.memeChannel || "Brak"}>`
                },
                {
                    name: "Kanał do głosowań",
                    value: `<#${g.voteChannel || "Brak."}`
                },
                {
                    name: "Kanał do powitań",
                    value: `<#${g.welcomeChannel || "Brak."}`
                },
                {
                    name: "Kanał do pożegnań",
                    value: `<#${g.goodbyeChannel || "Brak"}`
                }
            ])
            break;
            case 'bot':
                client.sender(message, "Ustawienia bota", "", "", "GREEN", [{name: "Prefix", value: "Prefix bota"}])
                break;
        case 'broadcastChannel':
            if (!g?.broadcastActivate) return message.channel.send("Kanały ogłoszeń są wyłączone! Proszę je włączyć komendą \`activate\`!")

            let bChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
           
            if (!bChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (bChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (bChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')

            const update1 = await r.table("settings").get(message.guild.id).update({ broadcastChannel: bChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`broadcastChannel\` (Kanał ogłoszeń).", client.set, "GREEN", "", "")
            break;
        case 'mediaOnlyChannel':
            if (!g?.mediaOnlyActivate) return message.channel.send("Kanały obrazkowe są wyłączone! Proszę je włączyć komendą \`activate\`!")

            let moChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            
            if (!moChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (moChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (moChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')

            const update2 = await r.table("settings").get(message.guild.id).update({ mediaOnlyChannel: moChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`mediaOnlyChannel\` (Kanał obrazkowy).", client.set, "GREEN", "", "")
            break;
        case 'memeChannel':
            if (!g?.memeChannelActivate) return message.channel.send("Kanał memów jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            let mChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
        
            if (!mChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (mChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (mChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')

            const update3 = await r.table("settings").get(message.guild.id).update({ memeChannel: mChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`memeChannel\` (Kanał do memów).", client.set, "GREEN", "", "")
            break;
        case 'voteChannel':
            if (!g?.voteChannelActivate) return message.channel.send("Kanał głosowań jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            let vChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            
            if (!vChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (vChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (vChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')

            const update4 = await r.table("settings").get(message.guild.id).update({ voteChannel: vChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`voteChannel\` (Kanał do głosowań).", client.set, "GREEN", "", "")
            break;
        case 'giveawayChannel':
            if (!g?.giveawayChannelActivate) return message.channel.send("Kanał konkursów jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            let gChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            
            if (!gChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (gChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (gChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')

            const update5 = await r.table("settings").get(message.guild.id).update({ giveawayChannel: gChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`giveawayChannel\` (Kanał konkursowy).", client.set, "GREEN", "", "")
            break;
        case 'welcomeChannel':
            if (!g?.welcomeChannelActivate) return message.channel.send("Kanał powitań jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            let wChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            
            if (!wChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (wChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (wChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')

            const update6 = await r.table("settings").get(message.guild.id).update({ welcomeChannel: wChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`welcomeChannel\` (Kanał do powitań).", client.set, "GREEN", "", "")
            break;
        case 'goodbyeChannel':
            if (!g?.goodbyeChannelActivate) return message.channel.send("Kanał pożegnań jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            let goChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            
            if (!goChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", "", "RED", "", "")
            if (goChannel.type === "voice") return message.channel.send('Podany kanał to kanał głosowy. Musisz podać kanał tekstowy')
            if (goChannel.type === "category") return message.channel.send('Podano kategorię! Musisz podać kanał tekstowy')
            
            const update7 = await r.table("settings").get(message.guild.id).update({ goodbyeChannel: goChannel.id }).run(client.con)

            client.sender(message, "Zaktualizowano!", "Pomyślnie ustawiono: \`goodbyeChannel\` (Kanał do pożegnań).", client.set, "GREEN", "", "")
            break;
    }
};

exports.help = {
    name: "set",
    description: "Ustawienia serwera",
    category: "tools",
    aliases: ["ustaw"]
}