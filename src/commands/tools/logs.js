const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.administrator.logs\`", "", "RED", "", "")

    switch (args[0]) {
        default:
            client.sender(message, ``, `Ustawienia logów:\n\n\`channelCreate\`\nLogi tworzenia kanałów\n\n\`channelDelete\`\nLogi usuwania kanału`, ``, `ORANGE`, ``, ``, ``)
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
    }
}
exports.help = {
    name: "logs",
    usage: "logs",
    perms: "global.administrator.logs",
    category: "tools",
    description: "Ustawienia logów",
}