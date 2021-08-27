const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.administrator.set\`", "", "RED", "", "")
    switch (args[0]) {
        default:
            client.sender(message, ``, `Ustawienia bota\n\n\`broadcastChannel\`\nKanał ogłoszeniowy\n\n\`complaintChannel\`\nKanał skarg\n\n\`voteChannel\`\nKanał głosowań\n\n\`imageChannel\`\nKanał obrazkowy\n\n\`welcomeChannel\`\nKanał powitań\n\n\`goodbyeChannel\`\nKanał pożegnań\n\n\`mutedRole\`\nRola wyciszonego\n\n\`verifyRole\`\nRola zweryfikowanego\n\n\`lockRole\`\nRola osób która traci permisje do kanałów podczas lockdownu\n\n\`autoRole\`\nAutomatyczna rola, jak użytkownik wejdzie na serwer automatycznie ją dostanie!`, `Ustawienia serwerowe`, `ORANGE`, ``, ``, ``)
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
        case "welcomeChannel":
            let welcomeChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!welcomeChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (welcomeChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (welcomeChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, welcomeChannel: welcomeChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ welcomeChannel: welcomeChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`welcomeChannel\`\nWartość: <#${welcomeChannel.id}>`, "", "#2003fc", "")
            break;
        case "goodbyeChannel":
            let goodbyeChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!goodbyeChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")

            if (goodbyeChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (goodbyeChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, goodbyeChannel: goodbyeChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ goodbyeChannel: goodbyeChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`goodbyeChannel\`\nWartość: <#${goodbyeChannel.id}>`, "", "#2003fc", "")
            break;
        case "suggestChannel":
            let suggestChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!suggestChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")
            if (suggestChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (suggestChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, suggestChannel: suggestChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ suggestChannel: suggestChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`suggestChannel\`\nWartość: <#${suggestChannel.id}>`, "", "#2003fc", "")
            break;
        case "applicationChannel":
            let applicationChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1])) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()

            if (!applicationChannel) return client.sender(message, "Błąd!", "Nie znaleziono kanału bądź w ogóle go nie podałeś!", "", "RED", "", "")
            
            if (applicationChannel.type === "GUILD_VOICE") return client.mentionSender(message, "Błąd!", "Podałeś kanał głosowy! Musisz podać kanał tekstowy.", "", "RED", "")
            if (applicationChannel.type === "GUILD_CATEGORY") return client.mentionSender(message, "Błąd!", "Podałeś kategorię! Podaj kanał tekstowy.", "", "RED")

            await r.table("settings").insert({ id: message.guild.id, applicationChannel: applicationChannel.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ applicationChannel: applicationChannel.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`applicationChannel\`\nWartość: <#${applicationChannel.id}>`, "", "#2003fc", "")
            break;
        case "verifyRole":
            let verifyRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!verifyRole) return client.sender(message, "Błąd!", "Nie znaleziono roli bądź w ogóle jej nie podałeś!", "", "RED", "", "")

            await r.table("settings").insert({ id: message.guild.id, verifyRole: verifyRole.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ verifyRole: verifyRole.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`verifyRole\`\nWartość: <@&${verifyRole.id}>`, "", "#2003fc", "")
            break;
        case "autoRole":
            let autoRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!autoRole) return client.sender(message, "Błąd!", "Nie znaleziono roli bądź w ogóle jej nie podałeś!", "", "RED", "", "")

            await r.table("settings").insert({ id: message.guild.id, autoRole: autoRole.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ autoRole: autoRole.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`autoRole\`\nWartość: <@&${autoRole.id}>`, "", "#2003fc", "")
            break;
        case "mutedRole":
            let mutedRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!mutedRole) return client.sender(message, "Błąd!", "Nie znaleziono roli bądź w ogóle jej nie podałeś!", "", "RED", "", "")

            await r.table("settings").insert({ id: message.guild.id, mutedRole: mutedRole.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ mutedRole: mutedRole.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`mutedRole\`\nWartość: <@&${mutedRole.id}>`, "", "#2003fc", "")
            break;
        case "lockRole":
            let lockRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!lockRole) return client.sender(message, "Błąd!", "Nie znaleziono roli bądź w ogóle jej nie podałeś!", "", "RED", "", "")

            await r.table("settings").insert({ id: message.guild.id, lockRole: lockRole.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ lockRole: lockRole.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`lockRole\`\nWartość: <@&${lockRole.id}>`, "", "#2003fc", "")
            break;
        case "moderatorRole":
            let moderatorRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!moderatorRole) return client.sender(message, "Błąd!", "Nie znaleziono roli bądź w ogóle jej nie podałeś!", "", "RED", "", "")

            await r.table("settings").insert({ id: message.guild.id, moderatorRole: moderatorRole.id, }).run(client.con)

            await r.table("settings").get(message.guild.id).update({ moderatorRole: moderatorRole.id }).run(client.con)

            client.mentionSender(message, "Ustawiono!", `Zmienna: \`moderatorRole\`\nWartość: <@&${moderatorRole.id}>`, "", "#2003fc", "")
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