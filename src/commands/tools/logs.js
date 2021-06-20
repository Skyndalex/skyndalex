const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const logsDefault = await r.table("logs").get(message.guild.id).run(client.con)

    if(!message.member.hasPermission("ADMINISTRATOR")) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")
    switch (args[0]) {
        case 'channelCreate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelCreateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelCreateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelCreateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

           await r.table("logs").update({channelCreateLog: channelCreateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelCreate"}, {name: "Nowa wartość", value: `<#${channelCreateLog.id}>`}])

            break;
        case 'channelDelete':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelDeleteLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelDeleteLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelDeleteLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({channelDeleteLog: channelDeleteLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelDelete"}, {name: "Nowa wartość", value: `<#${channelDeleteLog.id}>`}])
            break;
        case 'channelUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({channelUpdateLog: channelUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelUpdate"}, {name: "Nowa wartość", value: `<#${channelUpdateLog.id}>`}])
            break;
        case 'emojiCreate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiCreateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiCreateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiCreateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({emojiCreateLog: emojiCreateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiCreate"}, {name: "Nowa wartość", value: `<#${emojiCreateLog.id}>`}])
            break;
        case 'emojiDelete':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiDeleteLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiDeleteLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiDeleteLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({emojiDeleteLog: emojiDeleteLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiDelete"}, {name: "Nowa wartość", value: `<#${emojiDeleteLog.id}>`}])
            break;
        case 'emojiUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({emojiUpdateLog: emojiUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiUpdate"}, {name: "Nowa wartość", value: `<#${emojiUpdateLog.id}>`}])
            break;
        case 'guildBanAdd':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildBanAddLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildBanAddLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildBanAddLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildBanAddLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({guildBanAddLog: guildBanAddLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildBanAdd"}, {name: "Nowa wartość", value: `<#${guildBanAddLog.id}>`}])
            break;
        case 'guildBanRemove':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildBanRemoveLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildBanRemoveLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildBanRemoveLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildBanRemoveLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({guildBanRemoveLog: guildBanRemoveLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildBanRemove"}, {name: "Nowa wartość", value: `<#${guildBanRemoveLog.id}>`}])
            break;
        case 'guildMemberUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildMemberUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildMemberUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildMemberUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildMemberUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({guildMemberUpdateLog: guildMemberUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildMemberUpdate"}, {name: "Nowa wartość", value: `<#${guildMemberUpdateLog.id}>`}])
            break;
        case 'guildUpdate':
            /*
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const guildUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!guildUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (guildUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (guildUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({guildUpdateLog: guildUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "guildUpdate"}, {name: "Nowa wartość", value: `<#${guildUpdateLog.id}>`}])

             */
            message.channel.send("soon")
            break;
        case 'inviteCreate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const inviteCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!inviteCreateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (inviteCreateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (inviteCreateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({inviteCreateLog: inviteCreateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "inviteCreate"}, {name: "Nowa wartość", value: `<#${inviteCreateLog.id}>`}])
            break;
        case 'messageDeleteBulk':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const messageDeleteBulkLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!messageDeleteBulkLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (messageDeleteBulkLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (messageDeleteBulkLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({messageDeleteBulkLog: messageDeleteBulkLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "messageDeleteBulk"}, {name: "Nowa wartość", value: `<#${messageDeleteBulkLog.id}>`}])
            break;
        case 'messageDelete':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const messageDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!messageDeleteLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (messageDeleteLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (messageDeleteLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({messageDeleteLog: messageDeleteLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "messageDelete"}, {name: "Nowa wartość", value: `<#${messageDeleteLog.id}>`}])
            break;
        case 'roleCreate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const roleCreateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!roleCreateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (roleCreateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (roleCreateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({roleCreateLog: roleCreateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "roleCreate"}, {name: "Nowa wartość", value: `<#${roleCreateLog.id}>`}])
            break;
        case 'roleUpdate':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const roleUpdateLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!roleUpdateLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (roleUpdateLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (roleUpdateLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({roleUpdateLog: roleUpdateLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "roleUpdate"}, {name: "Nowa wartość", value: `<#${roleUpdateLog.id}>`}])
            break;
        case 'roleDelete':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const roleDeleteLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!roleDeleteLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (roleDeleteLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (roleDeleteLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({roleDeleteLog: roleDeleteLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "roleDelete"}, {name: "Nowa wartość", value: `<#${roleDeleteLog.id}>`}])
            break;
        case 'broadcastLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const broadcastLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!broadcastLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (broadcastLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (broadcastLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({broadcastLog: broadcastLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "broadcastLogs"}, {name: "Nowa wartość", value: `<#${broadcastLog.id}>`}])
            break;
        case 'votingLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const votingLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!votingLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (votingLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (votingLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({votingLog: votingLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "votingLogs"}, {name: "Nowa wartość", value: `<#${votingLog.id}>`}])
            break;
        case 'cooldownLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const cooldownLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!cooldownLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (cooldownLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (cooldownLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({cooldownLog: cooldownLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "cooldownLogs"}, {name: "Nowa wartość", value: `<#${cooldownLog.id}>`}])
            break;
        case 'suggestionLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const suggestionLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!suggestionLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (suggestionLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (suggestionLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({suggestionLog: suggestionLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "suggestionLogs"}, {name: "Nowa wartość", value: `<#${suggestionLog.id}>`}])
            break;
        case 'emojiSuggestionsLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const emojiSuggestionsLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!emojiSuggestionsLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (emojiSuggestionsLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (emojiSuggestionsLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({emojiSuggestionsLog: emojiSuggestionsLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiSuggestionsLogs"}, {name: "Nowa wartość", value: `<#${emojiSuggestionsLog.id}>`}])
            break;
        case 'complaintLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const complaintLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!complaintLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (complaintLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (complaintLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({complaintLog: complaintLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "complaintLogs"}, {name: "Nowa wartość", value: `<#${complaintLog.id}>`}])
            break;
        case 'clearLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const clearLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!clearLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (clearLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (clearLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({clearLog: clearLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "clearLogs"}, {name: "Nowa wartość", value: `<#${clearLog.id}>`}])
            break;
        case 'channelBlockLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelBlockLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelBlockLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelBlockLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelBlockLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({channelBlockLog: channelBlockLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelBlockLogs"}, {name: "Nowa wartość", value: `<#${channelBlockLog.id}>`}])
            break;
        case 'channelUnblockLogs':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            const channelUnblockLog = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!channelUnblockLog) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (channelUnblockLog.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (channelUnblockLog.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            await r.table("logs").update({channelUnblockLog: channelUnblockLog.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "channelUnblockLogs"}, {name: "Nowa wartość", value: `<#${channelUnblockLog.id}>`}])
            break;
        default:
            client.sender(message, "Menu ustawień logów", "Szukałeś ustawień logów? Dobrze trafiłeś!", "Ze względu na osiągnięcie limitu Fieldów, logi zostały podzielone na kategorie.", "GREEN", [
                {
                    name: "Logi - podstawowe", //TODO: add logs to table "logs"
                    value: "> \`logs default\` (Logi podstawowe discorda)"
                },
                {
                    name: "Logi - komendy",
                    value: "> \`logs commands\` (Logi komend bota)"
                }
            ])
            break;
            case 'default':

                client.sender(message, "Logi - default", "Lista logów które obsługją eventy - czyli klasyczne, discordowe.", "", "GREEN", [
                    {
                        name: "\`channel_create (channelCreate)\`",
                        value: `Logi tworzenia kanału [<#${logsDefault.channelCreateLog||"Nie znaleziono kanału"}>]`
                    },
                    {
                        name: "\`channel_delete (channelDelete)\`",
                        value: `Logi usuwania kanału [<#${logsDefault.channelDeleteLog||"Nie znaleziono knaału"}>]`
                    },
                    {
                        name: "\`channel_update (channelUpdate)\`",
                        value: `Logi aktualizowania kanału [<#${logsDefault.channelUpdateLog||"Nie znaleziono kanału"}>]`
                    },
                    {
                        name: "\`emoji_create (emojiCreate)\`",
                        value: `Logi utworzenia emotki [<#${logsDefault.emojiCreateLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`emoji_delete (emojiDelete)\`",
                        value: `Logi usuwania emotki [<#${logsDefault.emojiDeleteLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`guild_ban_add (guildBanAdd)\`",
                        value: `Logi zbanowania użytkownika [<#${logsDefault.guildBanAddLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`guild_ban_remove (guildBanRemove)\`",
                        value: `Logi odbanowania użytkownika [<#${logsDefault.guildBanRemoveLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`guild_member_udpate (guildMemberUpdate)\`",
                        value: `Logi aktualizowania użytkownika [<#${logsDefault.guildMemberUpdateLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`guild_update (guildUpdate)\`",
                        value: "Soon:tm:"
                    },
                    {
                        name: "\`invite_create (inviteCreate)\`",
                        value: "Soon:tm:"
                    },
                    {
                        name: "\`invite_delete (inviteDelete)\`",
                        value: "Soon:tm:"
                    },
                    {
                        name: "\`message_delete (messageDelete)\`",
                        value: `Logi usuwania wiadomości [<#${logsDefault.messageDeleteLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`message_delete_bulk (messageDeleteBulk)\`",
                        value: "Soon:tm:"
                    },
                    {
                        name: "\`role_create (roleCreate)\`",
                        value: `Logi tworzenia roli [<#${logsDefault.roleCreateLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`role_delete (roleDelete)\`",
                        value: `Logi usuwania roli [<#${logsDefault.roleDeleteLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`role_update (roleUpdate)\`",
                        value: `Logi aktualizowania roli [<#${logsDefault.roleUpdateLog||"Nie znaleziono kanału"}]`
                    }
                ])
                break;
            case 'commands':
                client.sender(message, "Logi - commands", "Lista logów które obsługują komendy bota", "", "GREEN", [
                    {
                        name: "\`broadcast_logs (broadcastLogs)\`",
                        value: `Logi ogłoszeń [<#${logsDefault.broadcastLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`voting_logs (votingLogs)\`",
                        value: `Logi głosowań [<#${logsDefault.votingLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`cooldown_logs (cooldownLogs)\`",
                        value: `Logi cooldownów [<#${logsDefault.cooldownLog||"Nie znaleziono kanału"}]`,
                    },
                    {
                        name: "\`suggestion_logs (suggestionLogs)\`",
                        value: `Logi sugestii [<#${logsDefault.suggestionLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`emoji_suggestions_logs (\`emojiSuggestionsLogs)\`",
                        value: `Logi sugestii emoji [<#${logsDefault.emojiSuggestionsLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`complaint_logs (complaintLogs)\`",
                        value: `Logi dodawania skarg [<#${logsDefault.complaintLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`clear_logs (clearLogs)\`",
                        value: `Logi czyszczenia czatu [<#${logsDefault.clearLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`channel_block_logs (channelBlockLogs)\`",
                        value: `Logi blokowania kanału [<#${logsDefault.channelBlockLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`channel_unblock_logs (channelUnblockLogs)\`",
                        value: `Logi odblokowywania kanału [<#${logsDefault.channelUnblockLog||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`set_logs (setLogs)\`",
                        value: `Logi ustawień [<#${logsDefault.setLogs||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`giveaway_logs (giveawayLogs)\`",
                        value: `Logi giveawayi [<#${logsDefault.giveawayLogs||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`speed_giveaway_logs (speedGiveawayLogs)\`",
                        value: `Logi szybkich giveawayi [<#${logsDefault.speedGiveawayLogs||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`verification_logs (verificationLogs)\`",
                        value: `Logi weryfikacji [<#${logsDefault.verificationLogs||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`mute_logs (muteLogs)\`",
                        value: `Logi wyciszenia użytkownika [<#${logsDefault.muteLogs||"Nie znaleziono kanału"}]`
                    },
                    {
                        name: "\`unmute_logs (unmuteLogs)\`",
                        value: `Logi odciszenia użytkownika [<#${logsDefault.unmuteLogs||"Nie znaleziono kanału"}]`
                    }
                ])
                break;
    }
}
exports.help = {
    name: "logs",
    description: "Ustawienia logów serwerowych",
    category: "tools",
}