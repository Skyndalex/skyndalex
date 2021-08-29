const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.logs\`", "", "RED", "", "")

    switch (args[0]) {
        default:
            client.sender(message, ``, `**Ustawienia logów**\n\nUstawienia logów znajdziesz na: https://docs.krivebot.xyz/logs`, ``, `ORANGE`, ``, ``, ``)
            break;
        case "channelCreate":
            let channelCreate = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!channelCreate) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (channelCreate.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (channelCreate.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, channelCreate: channelCreate.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ channelCreate: channelCreate.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`channelCreate\`\nWartość: <#${channelCreate.id}>`, "", "#2003fc", "")
            break;
        case "channelDelete":
            let channelDelete = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!channelDelete) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (channelDelete.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (channelDelete.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, channelDelete: channelDelete.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ channelDelete: channelDelete.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`channelDelete\`\nWartość: <#${channelDelete.id}>`, "", "#2003fc", "")
            break;
        case "emojiCreate":
            let emojiCreate = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!emojiCreate) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (emojiCreate.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (emojiCreate.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, emojiCreate: emojiCreate.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ emojiCreate: emojiCreate.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`emojiCreate\`\nWartość: <#${emojiCreate.id}>`, "", "#2003fc", "")
            break;
        case "emojiUpdate":
            let emojiUpdate = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!emojiUpdate) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (emojiUpdate.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (emojiUpdate.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, emojiUpdate: emojiUpdate.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ emojiUpdate: emojiUpdate.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`emojiUpdate\`\nWartość: <#${emojiUpdate.id}>`, "", "#2003fc", "")
            break;
        case "emojiDelete":
            let emojiDelete = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!emojiDelete) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (emojiDelete.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (emojiDelete.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, emojiDelete: emojiDelete.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ emojiDelete: emojiDelete.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`emojiDelete\`\nWartość: <#${emojiDelete.id}>`, "", "#2003fc", "")
            break;
        case "channelUpdate":
            let channelUpdate = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!channelUpdate) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (channelUpdate.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (channelUpdate.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, channelUpdate: channelUpdate.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ channelUpdate: channelUpdate.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`channelUpdate\`\nWartość: <#${channelUpdate.id}>`, "", "#2003fc", "")
            break;
        case "messageDelete":
            let messageDelete = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!messageDelete) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (messageDelete.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (messageDelete.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("logs").insert({ id: message.guild.id, messageDelete: messageDelete.id, }).run(client.con)

            await r.table("logs").get(message.guild.id).update({ messageDelete: messageDelete.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`messageDelete\`\nWartość: <#${messageDelete.id}>`, "", "#2003fc", "")
            break;
    }

}
exports.help = {
    name: "logs",
    usage: "logs",
    perms: "global.administrator.logs",
    category: "tools",
    description: "Ustawienia logów",
}