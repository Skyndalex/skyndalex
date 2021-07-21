const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const g = await r.table("logs").get(message.guild.id).run(client.con)

    if (!message.member.hasPermission("ADMINISTRATOR")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.logsconfig\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")
    switch (args[0]) {
        default:
            client.sender(message, "Pomoc - Logi", "KLUCZE: [Przejdź](https://docs.krivebot.xyz/pl/logs)", "Zauważyłeś błąd lub nie wiesz, jak coś zrobić? Dołącz na nasz support (;support)", "GREEN", [
                {
                    name: "Logi - Pomoc",
                    value: "Pomoc dotycząca logów: https://docs.krivebot.xyz/logs"
                },
                {
                    name: "Logi - konfiguracja",
                    value: "\`logs [klucz] [wartość]\`"
                }
            ])
            break;
        case 'channelCreate':
            if (!g?.channelCreateLogActivate) return message.channel.send("Kanał do logów tworzenia kanału jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelCreateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelCreateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelCreateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").get(message.guild.id).update({ channelCreateLog: channelCreateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "channelCreate" }, { name: "Nowa wartość", value: `<#${channelCreateLog.id}>` }])

            break;
        case 'channelDelete':
            if (!g?.channelDeleteLogActivate) return message.channel.send("Kanał do logów usuwania kanału jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelDeleteLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelDeleteLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelDeleteLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ channelDeleteLog: channelDeleteLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "channelDelete", inline: true}, { name: "Nowa wartość", value: `<#${channelDeleteLog.id}>`, inline: true }])
            break;
        case 'channelUpdate':
            if (!g?.channelUpdateLogActivate) return message.channel.send("Kanał do logów aktualizowania kanału jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelUpdateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelUpdateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelUpdateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ channelUpdateLog: channelUpdateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "channelUpdate" }, { name: "Nowa wartość", value: `<#${channelUpdateLog.id}>` }])
            break;
        case 'emojiCreate':
            if (!g?.emojiCreateLogActivate) return message.channel.send("Kanał do logów tworzenia emoji jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiCreateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiCreateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiCreateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ emojiCreateLog: emojiCreateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "emojiCreate" }, { name: "Nowa wartość", value: `<#${emojiCreateLog.id}>` }])
            break;
        case 'emojiDelete':
            if (!g?.emojiDeleteLogActivate) return message.channel.send("Kanał do logów usuwania emotki jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiDeleteLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiDeleteLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiDeleteLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ emojiDeleteLog: emojiDeleteLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "emojiDelete" }, { name: "Nowa wartość", value: `<#${emojiDeleteLog.id}>` }])
            break;
        case 'emojiUpdate':
            if (!g?.emojiUpdateLogActivate) return message.channel.send("Kanał do logów aktualizowania emoji jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiUpdateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiUpdateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiUpdateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ emojiUpdateLog: emojiUpdateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "emojiUpdate" }, { name: "Nowa wartość", value: `<#${emojiUpdateLog.id}>` }])
            break;
        case 'guildBanAdd':
            if (!g?.guildBanAddLogActivate) return message.channel.send("Kanał do logów dodawania banów jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildBanAddLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildBanAddLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildBanAddLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildBanAddLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ guildBanAddLog: guildBanAddLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "guildBanAdd" }, { name: "Nowa wartość", value: `<#${guildBanAddLog.id}>` }])
            break;
        case 'guildBanRemove':
            if (!g?.guildBanRemoveLogActivate) return message.channel.send("Kanał do logów usuwania banów jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildBanRemoveLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildBanRemoveLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildBanRemoveLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildBanRemoveLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ guildBanRemoveLog: guildBanRemoveLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "guildBanRemove" }, { name: "Nowa wartość", value: `<#${guildBanRemoveLog.id}>` }])
            break;
        case 'guildMemberUpdate':
            if (!g?.guildMemberUpdateLogActivate) return message.channel.send("Kanał do logów aktualizowania użytkownika jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildMemberUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildMemberUpdateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildMemberUpdateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildMemberUpdateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ guildMemberUpdateLog: guildMemberUpdateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "guildMemberUpdate" }, { name: "Nowa wartość", value: `<#${guildMemberUpdateLog.id}>` }])
            break;
        case 'guildUpdate':
            /*
            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")
            const guildUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildUpdateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")
            if (guildUpdateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildUpdateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            await r.table("logs").update({guildUpdateLog: guildUpdateLog.id}).run(client.con)
            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildUpdate"}, {name: "Nowa wartość", value: `<#${guildUpdateLog.id}>`}])
             */
            message.channel.send("soon")
            break;
        case 'inviteCreate':
            if (!g?.inviteCreateLogActivate) return message.channel.send("Kanał do logów tworzenia zaproszenia jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const inviteCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!inviteCreateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (inviteCreateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (inviteCreateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ inviteCreateLog: inviteCreateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "inviteCreate" }, { name: "Nowa wartość", value: `<#${inviteCreateLog.id}>` }])
            break;
        case 'messageDelete':
            if (!g?.messageDeleteLogActivate) return message.channel.send("Kanał do logów usuwania wiadomości jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const messageDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!messageDeleteLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (messageDeleteLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (messageDeleteLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ messageDeleteLog: messageDeleteLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "messageDelete" }, { name: "Nowa wartość", value: `<#${messageDeleteLog.id}>` }])
            break;
        case 'roleCreate':
            if (!g?.roleCreateLogActivate) return message.channel.send("Kanał do logów tworzenia emotki jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const roleCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!roleCreateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (roleCreateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (roleCreateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ roleCreateLog: roleCreateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "roleCreate" }, { name: "Nowa wartość", value: `<#${roleCreateLog.id}>` }])
            break;
        case 'roleUpdate':
            if (!g?.roleUpdateLogActivate) return message.channel.send("Kanał do logów aktualizowania roli jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const roleUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!roleUpdateLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (roleUpdateLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (roleUpdateLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ roleUpdateLog: roleUpdateLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "roleUpdate" }, { name: "Nowa wartość", value: `<#${roleUpdateLog.id}>` }])
            break;
        case 'roleDelete':
            if (!g?.roleDeleteLogActivate) return message.channel.send("Kanał do logów usuwania roli jest wyłączony! Proszę je włączyć komendą \`activate\`!")

            if (!args[0]) return client.sender(message, "Niepoprawna składnia!", "Nie podano kanału!", client.footer, "RED", "", "")

            const roleDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!roleDeleteLog) return client.sender(message, "Błąd!", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (roleDeleteLog.type === "voice") return client.sender(message, "Niepoprawna składnia!", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (roleDeleteLog.type === "category") return client.sender(message, "Niepoprawna składnia!", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({ roleDeleteLog: roleDeleteLog.id }).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{ name: "Zmienna", value: "roleDelete" }, { name: "Nowa wartość", value: `<#${roleDeleteLog.id}>` }])
            break;
    }
};

exports.help = {
    name: "logs",
    description: "Ustawienia logów",
    category: "tools",
    aliases: ["ustaw"]
}