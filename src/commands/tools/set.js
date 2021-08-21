const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.administrator.set\`", "", "RED", "", "")
    switch (args[0]) {
        default:
            client.sender(message, "Ustawienia bota - Menu", "Szukasz może poradnika?\nDokumentacja -> https://docs.krivebot.xyz/config", "Nowa odświeżona wersja ustawień. Problemy prosimy zgłaszać do supportu", "#3683ff", [
                {
                    name: "> \`broadcastChannel\`", value: "Kanał ogłoszeniowy"
                },
                {
                    name: "> \`complaintChannel\`", value: "Kanał skarg"
                },
                {
                    name: "> \`voteChannel\`", value: "Kanał do głosowań"
                },
                {
                    name: "> \`imageChannel\`", value: "Kanał obrazkowy"
                }
            ])
            break;
        case "broadcastChannel":
            let broadcastChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!broadcastChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (broadcastChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (broadcastChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, broadcastChannel: broadcastChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ broadcastChannel: broadcastChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`broadcastChannel\`\nWartość: <#${broadcastChannel.id}>`, "", "#2003fc", "")
            break;
        case "complaintChannel":
            let complaintChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!complaintChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (complaintChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (complaintChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, complaintChannel: complaintChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ complaintChannel: complaintChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`complaintChannel\`\nWartość: <#${complaintChannel.id}>`, "", "#2003fc", "")
            break;
        case "voteChannel":
            let voteChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!voteChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (voteChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (voteChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, voteChannel: voteChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ voteChannel: voteChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`voteChannel\`\nWartość: <#${voteChannel.id}>`, "", "#2003fc", "")
            break;
        case "imageChannel":
            let imageChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!imageChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (imageChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (imageChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, imageChannel: imageChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ imageChannel: imageChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`imageChannel\`\nWartość: <#${imageChannel.id}>`, "", "#2003fc", "")
            break;
        case "verifyRole":
            let verifyRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!verifyRole) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            await r.table("settings").insert({ id: message.guild.id, verifyRole: verifyRole.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ verifyRole: verifyRole.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`verifyRole\`\nWartość: <@&${verifyRole.id}>`, "", "#2003fc", "")
            break;
    }
}
exports.help = {
    name: "set",
    description: "Ustawienia bota",
    usage: "set [zmienna] [wartość]",
    perms: "server.manage_server.settings",
    category: "tools"
}