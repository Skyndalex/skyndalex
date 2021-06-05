const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    //TODO: emoji-suggestions
    //TODO: allow attachements
    if(!message.member.hasPermission("ADMINISTRATOR")) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")
    switch (args[0]) {
        case 'broadcastChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let bChannel = message.guild.channels.cache.find( c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!bChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (bChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (bChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({broadcastChannel: bChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "broadcastChannel"}, {name: "Nowa wartość", value: `<#${bChannel.id}>`}])
            break;
        case 'suggestChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let sChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!sChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (sChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (sChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({suggestionsChannel: sChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "suggestionsChannel"}, {name: "Nowa wartość", value: `<#${sChannel.id}>`}])

            break;
        case 'voteChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let vChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!vChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (vChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (vChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({voteChannel: vChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "voteChannel"}, {name: "Nowa wartość", value: `<#${vChannel.id}>`}])

            break;
        case 'private-mod-channel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let pmChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!pmChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (pmChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (pmChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({passChannel: pmChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "private-mod-channel"}, {name: "Nowa wartość", value: `<#${pmChannel.id}>`}])

            break;
        case 'passChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let pChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!pChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (pChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (pChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({passChannel: pChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "passChannel"}, {name: "Nowa wartość", value: `<#${pChannel.id}>`}])

            break;
        case 'globalBroadcastChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let gbChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!gbChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (gbChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (gbChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({globalBroadcastChannel: gbChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "globalBroadcastChannel"}, {name: "Nowa wartość", value: `<@${gbChannel.id}>`}])

            break;

        case 'welcomeChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let wChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!wChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (wChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (wChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({welcomeChannel: wChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "welcomeChannel"}, {name: "Nowa wartość", value: `<@${wChannel.id}>`}])
            break;
        case 'goodbyeChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let gChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!gChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")

            if (gChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (gChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({goodbyeChannel: gChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "goodbyesChannel"}, {name: "Nowa wartość", value: `<@${gChannel.id}>`}])
            break;
        case 'complaintChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let cChannel =  message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!cChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")


            if (cChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (cChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({complaintChannel: cChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "complaintChannel"}, {name: "Nowa wartość", value: `<@${cChannel.id}>`}])

            break;
        case 'emojiSuggestChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let esChannel =  message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!esChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")


            if (esChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (esChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({emojiSuggestChannel: esChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "emojiSuggestChannel"}, {name: "Nowa wartość", value: `<@${esChannel.id}>`}])
            break;
        case 'advSuggestChannel':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano kanału!", client.footer, "RED", "", "")

            let advSuggestChannel =  message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!advSuggestChannel) return client.sender(message, "404: Not found", "Nie znaleziono kanału!", client.footer, "RED", "", "")


            if (advSuggestChannel.type === "voice") return client.sender(message, "405: Method not allowed", "Podałeś kanał głosowy! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")
            if (advSuggestChannel.type === "category") return client.sender(message, "405: Method not allowed", "Podałeś kategorię! Prosze wpisać kanał tekstowy!", client.footer, "RED", "", "")

            r.table("settings").update({advancedSuggestChannel: advSuggestChannel.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "advSuggestChannel"}, {name: "Nowa wartość", value: `<@${advSuggestChannel.id}>`}])
            break;
        case 'welcomeTextDesc':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano tekstu!", client.footer, "RED", "", "")

            let wtd = args.slice(1).join(" ")

            r.table("settings").update({welcomeTextDesc: wtd}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "welcomeTextDesc"}, {name: "Nowa wartość", value: `${wtd}`}])

            break;
        case 'welcomeTextTitle':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano tekstu!", client.footer, "RED", "", "")

            let wtt = args.slice(1).join(" ")

            r.table("settings").update({welcomeTextTitle: wtt}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "welcomeTextTitle"}, {name: "Nowa wartość", value: `${wtt}`}])

            break;
        case 'welcomeTextFooter':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano tekstu!", client.footer, "RED", "", "")

            let wtf = args.slice(1).join(" ")

            r.table("settings").update({welcomeTextFooter: wtf}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "welcomeTextAuthor"}, {name: "Nowa wartość", value: `${wtf}`}])

            break;

        case 'welcomeTextAuthor':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano tekstu!", client.footer, "RED", "", "")

            let wta = args.slice(1).join(" ")

            r.table("settings").update({welcomeTextAuthor: wta}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "welcomeTextAuthor"}, {name: "Nowa wartość", value: `${wta}`}])

            break;
        case 'welcomeColorHex':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano koloru (Użyj HEX lub nazwy np. GREEN) !", client.footer, "RED", "", "")

            let wch = args.slice(1).join(" ")

            r.table("settings").update({welcomeColorHex: wch}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "welcomeTextAuthor"}, {name: "Nowa wartość", value: `${wch}`}])

            break;
        case 'autoRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")
            let autoRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!autoRole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({autoRole: autoRole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "autoRole"}, {name: "Nowa wartość", value: `<#${autoRole.id}>`}])

            break;
        case 'mutedRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")

            let mutedrole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!mutedrole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({mutedRole: mutedrole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "mutedRole"}, {name: "Nowa wartość", value: `<@${mutedrole.id}>`}])

            break;
        case 'vcMutedRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")

            let vcMutedRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!vcMutedRole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({vcMutedRole: vcMutedRole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "vcMutedRole"}, {name: "Nowa wartość", value: `<@${vcMutedRole.id}>`}])

            break;
        case 'vcBanRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")

            let vcBanRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!vcBanRole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({vcBanRole: vcBanRole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "vcBanRole"}, {name: "Nowa wartość", value: `<@&${vcBanRole.id}`}])
            break;
        case 'notifyBroadcastRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")

            let notifyBroadcastRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!notifyBroadcastRole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({notifyBroadcastRole: notifyBroadcastRole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "notifyBroadcastRole"}, {name: "Nowa wartość", value: `<@&${notifyBroadcastRole.id}`}])

            break;
        case 'notifyVotingRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")

            let notifyVotingRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!notifyVotingRole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({notifyVotingRole: notifyVotingRole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "notifyVotingRole"}, {name: "Nowa wartość", value: `<@&${notifyVotingRole.id}`}])

            break;
        case 'userRole':
            if (!args[0]) return client.sender(message, "405: Method not allowed", "Nie podano roli!", client.footer, "RED", "", "")

            let userRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!userRole) return client.sender(message, "404: Not found", "Nie znaleziono roli!", client.footer, "RED", "", "")

            r.table("settings").update({userRole: userRole.id}).run(client.con)

            client.sender(message, "Ustawiono", "", "", "GREEN", [{name: "Zmienna", value: "userRole"}, {name: "Nowa wartość", value: `<@&${userRole.id}`}])

            break;
        case 'reactBanRole':
            client.sender(message, "301: Moved Permanently", "Tymczasowo przeniesiono do wersji 3.2/3.3", client.footer, "GREEN", "", "")
            break;
        case 'roles':
            client.sender(message, "Ustawienia ról - zmienne", "", "", "GREEN", [
                {
                    name: "> \`autoRole\`",
                    value: "Ustawienia autoroli"
                },
                {
                    name: "> \`vcMutedRole\`",
                    value: "Ustawienia roli wyciszonego na kanale VC"
                },
                {
                    name: "> \`vcBanRole\`",
                    value: "Ustawienia roli użytkownika, który nie może dołączać na kanały głosowe."
                },
                {
                    name: "> \`mutedRole\`",
                    value: "Ustawienia roli wyciszonego"
                },
                {
                    name: "> \`notifyBroadcastRole\`",
                    value: "Ustawienia roli która oznacza użytkownika podczas wysyłania ogłoszenia",
                },
                {
                    name: "> \`notifyVotingRole\`",
                    value: "Ustawienia roli która oznacza użytkownika podczas wysyłania głosowania"
                },
                {
                    name: "> \`reactBanRole\`",
                    value: "Ustawienia roli która nie może dodawać reakcji"
                },
                {
                    name: "> \`whiteListRole\`",
                    value: "Wkrótce użycie!"
                }
            ])
            break;
        case 'channels':
            client.sender(message, "Ustawienia kanałów - zmienne", "", client.footer, "GREEN", [
                {
                     name: "> \`broadcastChannel\`",
                     value: "Kanał ogłoszeniowy"
                },
                {
                    name: "> \`voteChannel\`",
                    value: "Kanał głosowań"
                },
                {
                    name: "> \`passChannel\`",
                    value: "Kanał podań"
                },
                {
                    name: "> \`suggestChannel\`",
                    value: "Kanał propozycji"
                },
                {
                    name: "> \`globalBroadcastChannel\`",
                    value: "Kanał globalnych ogłoszeń"
                },
                {
                    name: "> \`private-mod-channel\`",
                    value: "Prywatny kanał moderacji. Absolutnie nie wiem po co."
                },
                {
                    name: "> \`complaintChannel\`",
                    value: "Kanał skarg"
                },
                {
                    name: "\`emojiSuggestChannel\`",
                    value: "Kanał propozycji emoji"
                },
                {
                    name: "> \`advSuggestChannel\`",
                    value: "Kanał zaawansowanych propozycji. [\`ACTION: Docs\`](https://docs.krivebot.xyz/pl/adv-suggestions)"
                },
            ])
            message.channel.send("Lista niedziałających ustawień:\n \`advSuggestChannel\`")
            break;
        case 'welcome':
            client.sender(message, "Ustawienia powitań - zmienne", "", "UWAGA! Powitania będą dopiero w wersji 3.2. Nie są jeszcze dostępne!!!", "GREEN", [
                {
                    name: "> \`welcomeChannel\`",
                    value: "Kanał powitań"
                },
                {
                    name: "> \`welcomeTextDesc\`",
                    value: "Tekst opisu powitań"
                },
                {
                    name: "> \`welcomeTextTitle\`",
                    value: " Tekst tytułu powitań"
                },
                {
                    name: "> \`welcomeTextFooter\`",
                    value: "Tekst footeru powitań"
                }
            ])
            break;
        case 'goodbyes':
            client.sender(message, "Ustawienia pożegnań - zmienne", "", "UWAGA! pożegnania będa dopiero w werjsi 3.2. Nie są jeszcze dostępne!!!", "GREEN", [
                {
                    name: "> \`goodbyesChannel\`",
                    value: "Kanał pożegnań",
                },
                {
                    name: "> \`goodbyesTextDesc\`",
                    value: "Tekst opisu pożegnań"
                },
                {
                    name: "> \`goodbyesTextTitle\`",
                    value: "Tekst tytułu pożegnań"
                },
                {
                    name: "> \`goodbyesTextFooter\`",
                    value: "Tekst footeru pożegnań"
                }
            ])
            break;
        case 'default':
        default:
            client.sender(message, "Ustawienia serwerowe", "Niedawno zmienilismy wygląd serwerowych ustawień. [Dowiedz się tutaj, jak tym operować.](https://docs.krivebot.xyz)", "", "GREEN", [
                {
                    name: "> \`set roles\`",
                    value: "Ustawienia ról"
                },
                {
                    name: "> \`set channels\`",
                    value: "Ustawienia kanałów"
                },
                {
                    name: "> \`set welcome\`",
                    value: "Ustawienia powitań"
                },
                {
                    name: "> \`set goodbyes\`",
                    value: "Ustawienia pożegnań"
                }
            ])
            break;
    }
}
exports.help = {
    name: "set",
    description: "Ustawienia serwerowe",
    category: "tools",
    aliases: ["ustaw"]
}