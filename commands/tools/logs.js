const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        case 'channelCreate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelCreateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelCreateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelCreateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

           await r.table("settings").update({channelCreateLog: channelCreateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelCreate"}, {name: "Nowa wartość", value: `<@${channelCreateLog.id}>`}])

            break;
        case 'channelDelete':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelDeleteLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelDeleteLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelDeleteLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({channelDeleteLog: channelDeleteLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelDelete"}, {name: "Nowa wartość", value: `<@${channelDeleteLog.id}>`}])
            break;
        case 'channelUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({channelUpdateLog: channelUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelUpdate"}, {name: "Nowa wartość", value: `<@${channelUpdateLog.id}>`}])
            break;
        case 'emojiCreate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiCreateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiCreateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiCreateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({emojiCreateLog: emojiCreateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiCreate"}, {name: "Nowa wartość", value: `<@${emojiCreateLog.id}>`}])
            break;
        case 'emojiDelete':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiDeleteLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiDeleteLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiDeleteLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({emojiDeleteLog: emojiDeleteLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiDelete"}, {name: "Nowa wartość", value: `<@${emojiDeleteLog.id}>`}])
            break;
        case 'emojiUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({emojiUpdateLog: emojiUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiUpdate"}, {name: "Nowa wartość", value: `<@${emojiUpdateLog.id}>`}])
            break;
        case 'guildBanAdd':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildBanAddLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildBanAddLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildBanAddLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildBanAddLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({guildBanAddLog: guildBanAddLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildBanAdd"}, {name: "Nowa wartość", value: `<@${guildBanAddLog.id}>`}])
            break;
        case 'guildBanRemove':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildBanRemoveLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildBanRemoveLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildBanRemoveLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildBanRemoveLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({guildBanRemoveLog: guildBanRemoveLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildBanRemove"}, {name: "Nowa wartość", value: `<@${guildBanRemoveLog.id}>`}])
            break;
        case 'guildMemberUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildMemberUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildMemberUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildMemberUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildMemberUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("settings").update({guildMemberUpdateLog: guildMemberUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildMemberUpdate"}, {name: "Nowa wartość", value: `<@${guildMemberUpdateLog.id}>`}])
            break;
        default:
            client.sender(message, "Ustawienia logów serwerowych", "Potrzebujesz logów? Trafiłeś w idealne miejsce!", "Ustawienia logów: logs channelCreate #kanał", "GREEN", [
                {
                    name: "> \`channelCreate\`",
                    value: "Logi - tworzenie kanałów",
                },
                {
                    name: "> \`channelDelete\`",
                    value: "Logi - usuwanie kanałów"
                },
                {
                    name: "> \`channelUpdate\`",
                    value: "Logi - aktualizowanie kanału"
                },
                {
                    name: "> \`emojiCreate\`",
                    value: "Logi - tworzenie emotki"
                },
                {
                    name: "> \`emojiDelete\`",
                    value: "Logi - usuwanie emotki"
                },
                {
                    name: "> \`guildBanAdd\`",
                    value: "Logi - nadawanie bana"
                },
                {
                    name: "> \`guildBanRemove\`",
                    value: "Logi - usuwanie bana"
                },
                {
                    name: "> \`guildMemberUpdate\`",
                    value: "Logi - aktualizacja użytkownika"
                },
                {
                    name: "> \`guildUpdate\`",
                    value: "Logi - aktualizowanie serwera"
                },
                {
                    name: "> \`inviteCreate\`",
                    value: "Logi - tworzenie zaproszenia"
                },
                {
                    name: "> \`inviteDelete\`",
                    value: "Logi - usuwanie zaproszenia"
                },
                {
                    name: "> \`messageDelete\`",
                    value: "Logi - usuwanie wiadomości"
                },
                {
                    name: "> \`messageDeleteBulk\`",
                    value: "Logi - usuwanie wiadomości komendą"
                },
                {
                    name: "> \`roleCreate\`",
                    value: "Logi - tworzenie roli"
                },
                {
                    name: "> \`roleDelete\`",
                    value: "Logi - usuwanie roli"
                },
                {
                    name: "> \`roleUpdate\`",
                    value: "Logi - aktualizowanie roli"
                },
            ])
    }
}
exports.help = {
    name: "logs",
    description: "Ustawienia logów serwerowych",
    category: "tools",
}