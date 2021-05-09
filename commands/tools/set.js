const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    //TODO: emoji-suggestions
    //TODO: allow attachements
    if (!message.member.hasPermission('ADMINISTRATOR')) return client.error(message, `Nie masz permisji! `);
    switch (args[0]) {
        case 'broadcastChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")

            let bChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!bChannel) return client.error(message, `Nie znaleziono kanału!`)

            if (bChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (bChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({broadcastChannel: bChannel.id}).run(client.con)

            const broadcastChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "broadcastChannel")
                .addField("Nowa wartość", `<#${bChannel.id}>`)
                .setColor("GREEN")
            message.channel.send(broadcastChannelConfigEmbed)
            break;
        case 'suggestionsChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")

            let sChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!sChannel) return client.error(message, `Nie znaleziono kanału!`)

            if (sChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (sChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({suggestionsChannel: sChannel.id}).run(client.con)

            const suggestionsChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "suggestionsChannel")
                .addField("Nowa wartość", `<#${sChannel.id}>`)
                .setColor("GREEN")
            message.channel.send(suggestionsChannelConfigEmbed)
            break;
        case 'voteChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")

            let vChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!vChannel) return client.error(message, `Nie znaleziono kanału!`)

            if (vChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (vChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({voteChannel: vChannel.id}).run(client.con)

            const voteChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "voteChannel")
                .addField("Nowa wartość", `<#${vChannel.id}>`)
                .setColor("GREEN")
            message.channel.send(voteChannelConfigEmbed)
            break;
        case 'private-mod-channel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")

            let pmChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!pmChannel) return client.error(message, `Nie znaleziono kanału!`)

            if (pmChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (pmChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({passChannel: pmChannel.id}).run(client.con)

            const pmChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "private-mod-channel")
                .addField("Nowa wartość", `<#${pmChannel.id}>`)
                .setColor("GREEN")
            message.channel.send(pmChannelConfigEmbed)
            break;
        case 'passChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")

            let pChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!pChannel) return client.error(message, `Nie znaleziono kanału!`)

            if (pChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (pChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({passChannel: pChannel.id}).run(client.con)

            const passChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "passChannel")
                .addField("Nowa wartość", `<#${pChannel.id}>`)
                .setColor("GREEN")
            message.channel.send(passChannelConfigEmbed)
            break;
        case 'globalBroadcastChannel':
            if (!args[0]) return client.error(message, "Nie podano kanału!")

            let gbChannel = message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args[1].toLowerCase())) || message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()
            if (!gbChannel) return client.error(message, `Nie znaleziono kanału!`)

            if (gbChannel.type === "voice") return client.error(message, 'Podałeś kanał głosowy! Proszę wpisać kanał tekstowy')
            if (gbChannel.type === "category") return client.error(message, 'Podałeś kategorię! Proszę wpisać kanał tekstowy')

            r.table("settings").update({globalBroadcastChannel: gbChannel.id}).run(client.con)

            const globalBroadcastChannelConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "globalBroadcastChannel")
                .addField("Nowa wartość", `<#${gbChannel.id}>`)
                .setColor("GREEN")
            message.channel.send(globalBroadcastChannelConfigEmbed)
            break;
        case 'autoRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let autoRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!autoRole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({autoRole: autoRole.id}).run(client.con)

            const autoRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "autoRole")
                .addField("Nowa wartość", `<@${autoRole.id}>`)
                .setColor("GREEN")
            message.channel.send(autoRoleConfigEmbed)
            break;
        case 'mutedRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let mutedrole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!mutedrole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({mutedRole: mutedrole.id}).run(client.con)

            const mutedRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "mutedRole")
                .addField("Nowa wartość", `<@${mutedrole.id}>`)
                .setColor("GREEN")
            message.channel.send(mutedRoleConfigEmbed)
            break;
        case 'vcMutedRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let vcMutedRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!vcMutedRole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({vcMutedRole: vcMutedRole.id}).run(client.con)

            const vcMutedRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "vcMutedRole")
                .addField("Nowa wartość", `<@${vcMutedRole.id}>`)
                .setColor("GREEN")
            message.channel.send(vcMutedRoleConfigEmbed)
            break;
        case 'vcBanRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let vcBanRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!vcBanRole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({vcBanRole: vcBanRole.id}).run(client.con)

            const vcBanRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "vcBanRole")
                .addField("Nowa wartość", `<@${vcBanRole.id}>`)
                .setColor("GREEN")
            message.channel.send(vcBanRoleConfigEmbed)
            break;
        case 'notifyBroadcastRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let notifyBroadcastRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!notifyBroadcastRole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({notifyBroadcastRole: notifyBroadcastRole.id}).run(client.con)

            const notifyBroadcastRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "notifyBroadcastRole")
                .addField("Nowa wartość", `<@&${notifyBroadcastRole.id}>`)
                .setColor("GREEN")
             message.channel.send(notifyBroadcastRoleConfigEmbed)
            break;
        case 'notifyVotingRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let notifyVotingRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!notifyVotingRole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({notifyVotingRole: notifyVotingRole.id}).run(client.con)

            const notifyVotingRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "notifyVotingRole")
                .addField("Nowa wartość", `<@&${notifyVotingRole.id}>`)
                .setColor("GREEN")
            message.channel.send(notifyVotingRoleConfigEmbed)
            break;
        case 'userRole':
            if (!args[0]) return client.error(message, "Nie podano roli!")

            let userRole = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
            if (!userRole) return client.error(message, "Nie znalazłem roli")

            r.table("settings").update({userRole: userRole.id}).run(client.con)

            const userRoleConfigEmbed = new Discord.MessageEmbed()
                .setTitle("Ustawiono")
                .addField("Zmienna", "userRole")
                .addField("Nowa wartość", `<@&${userRole.id}>`)
                .setColor("GREEN")
            message.channel.send(userRoleConfigEmbed)
            break;
        case 'reactBanRole':
            client.commandNotEnabled(message, "Przeniesione do wersji 3.1")
            break;
        case 'roles':
            const embedRoles = new Discord.MessageEmbed()
                .setTitle("Ustawienia ról - zmienne")
                .addField("> \`autoRole\`", "Ustawienia autoroli")
                .addField("> \`vcMutedRole\`", "Ustawienia roli która uniemożliwia mówienie na kanale VC")
                .addField("> \`vcBanRole\`", "Ustawienia roli która uniemożliwia dołączanie na kanał VC")
                .addField("> \`mutedRole\`", "Ogólna rola wyciszonego")
                .addField("> \`notifyBroadcastRole\`", "Rola która oznacza użytkowników przy ogłaszaniu")
                .addField('> \`notifyVotingRole\`', "Rola która oznacza użytkowników przy głosowaniu")
                .addField("> \`reactBanRole\`", "Rola która uniemożliwia dodawanie reakcji")
                .addField("> \`whiteListRole\`", "Rola która omija wszelkie logi serwerowe (soon)")
                .setColor("GREEN")
            message.channel.send(embedRoles)
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
                }
            ])
            break;
        case 'welcome':
            const embedWelcome = new Discord.MessageEmbed()
                .setTitle("Ustawienia powitań - zmienne")
                .addField("> \`welcomeChannel\`", "Kanał powitań")
                .addField("> \`welcomeTextDesc\`", "Tekst opisu powitań")
                .addField("> \`welcomeTextTitle\`", "Tekst tytułu powitań")
                .addField("> \`welcomeTextFooter\`", "Tekst footeru powitań")
                .setFooter("UWAGA! Powitania będą dopiero w wersji 3.2. Prosimy o cierpliwość!!! (na razie da się tylko ustawiać)")
                .setColor("GREEN")
            message.channel.send(embedWelcome)


            break;
        case 'goodbyes':
            const embedGoodbyes = new Discord.MessageEmbed()
                .setTitle("Ustawienia pożegnań - zmienne")
                .addField("> \`goodbyesChannel\`", "Kanał pożegnań")
                .addField("> \`goodbyesTextDesc\`", "Tekst opisu pożegnań")
                .addField("> \`goodbyesTextTitle\`", "Tekst tytułu pożegnań")
                .addField("> \`goodbyesTextFooter\`", "Tekst footeru pożegnań")
                .setFooter("UWAGA! Pożegnania będą dopiero w wersji 3.2. Prosimy o cierpliwość!!! (na razie da się tylko ustawiać)")
                .setColor("GREEN")
            message.channel.send(embedGoodbyes)
            break;
        case 'default':
        default:
            client.sender(message, "Ustawienia serwerowe", "Niedawno zmienilismy wygląd serwerowych ustawień. [Dowiedz się tutaj, jak tym operować.](https://docs.krivebot.xyz)", client.footer, "GREEN", [
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