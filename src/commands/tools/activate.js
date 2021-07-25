const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.activate\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")


    const guild = await r.table("logs").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Lista rzeczy do włączania", "Lista rzeczy, które można włączyć!", "", "GREEN", [
                {
                    name: "\`broadcastCh\`",
                    value: "Kanał ogłoszeń"
                },
                {
                    name: "\`mediaOnlyChannel\`",
                    value: "Kanał obrazków"
                },
                {
                    name: "\`memeChannel\`",
                    value: "Kanał memowy"
                },
                {
                    name: "\`classic\`",
                    value: "Kanał sugesti klasycznych"
                },
                {
                    name: "\`advancedmini\`",
                    value: "Kanał mniej zaawansowanych sugesti"
                },
                {
                    name: "\`advanced\`",
                    value: "Kanał zaawansowanych sugesti"
                },
                {
                    name: "\`media\`",
                    value: "Kanał obrazków"
                },
                {
                    name: "\`voteChannel\`",
                    value: "Kanał głosowań"
                },
                {
                    name: "\`giveawayChannel\`",
                    value: "Kanał konkursów"
                },
                {
                    name: "\`welcomeChannel\`",
                    value: "Kanał powitań"
                },
                {
                    name: "\`goodbyeChannel\`",
                    value: "Kanał pożegnań"
                }, ,
                {
                    name: "\`channelCreateLog\`",
                    value: "Kanał logów tworzenia kanału"
                },
                {
                    name: "\`channelDeleteLog\`",
                    value: "Kanał logów usuwania kanału"
                }
            ])
            break;
        case 'broadcastCh':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, broadcastActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ broadcastActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał ogłoszeń.", "", "GREEN", "")
            break;
        case 'mediaOnlyChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, mediaOnlyActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ mediaOnlyActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał tylko na plikI!", "", "GREEN", "")
            break;
        case 'memeChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, memeChannelActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ memeChannelActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał na memy!", "", "GREEN", "")
            break;
        case 'classic':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, classicSuggestActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ classicSuggestActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: klasyczne!", "", "GREEN", "")
            break;
        case 'advancedmini':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, advancedminiSuggestActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ advancedminiSuggestActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: mniej zaawansowane!", "", "GREEN", "")
            break;
        case 'advanced':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, advancedSuggestActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ advancedSuggestActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: zaawansowane!", "", "GREEN", "")
            break;
        case 'media':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, mediaSuggestActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ mediaSuggestActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: obrazkowe!", "", "GREEN", "")
            break;
        case 'voteChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, voteChannelActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ voteChannelActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał do głosowań!", "", "GREEN", "")
            break;
        case 'giveawayChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, giveawayChannelActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ giveawayChannelActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał do konkursów!", "", "GREEN", "")
            break;
        case 'welcomeChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, welcomeChannelActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ welcomeChannelActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał do powitań!", "", "GREEN", "")
            break;
        case 'goodbyeChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, goodbyeChannelActivate: true }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ goodbyeChannelActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał do pożegnań!", "", "GREEN", "")
            break;
        case 'channelCreateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, channelCreateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ channelCreateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi tworzenia kanału!", "", "GREEN", "")
            break;
        case 'channelDeleteLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, channelDeleteLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ channelDeleteLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi usuwania kanału!", "", "GREEN", "")
            break;
        case 'channelUpdateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, channelUpdateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ channelUpdateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi aktualizowania kanału!", "", "GREEN", "")
            break;
        case 'emojiCreateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, emojiCreateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ emojiCreateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi tworzenia emotki!", "", "GREEN", "")
            break;
        case 'emojiDeleteLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, emojiDeleteLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ emojiDeleteLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi usuwania emotki!", "", "GREEN", "")
            break;
        case 'emojiUpdateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, emojiUpdateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ emojiUpdateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi aktualizowania emotki!", "", "GREEN", "")
            break;
        case 'guildBanAddLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, guildBanAddLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ guildBanAddLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi zbanowania użytkownika!", "", "GREEN", "")
            break;
        case 'guildBanRemoveLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, guildBanRemoveLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ guildBanRemoveLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi odbanowania użytkownika!", "", "GREEN", "")
            break;
        case 'guildMemberUpdateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, guildMemberUpdateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ guildMemberUpdateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi aktualizowania użytkownika!", "", "GREEN", "")
            break;
        case 'inviteCreateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, inviteCreateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ inviteCreateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi tworzenia zaproszenia!", "", "GREEN", "")
            break;
        case 'messageDeleteLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, messageDeleteLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ messageDeleteLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi usuwania wiadomości!", "", "GREEN", "")
            break;
        case 'roleCreateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, roleCreateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ roleCreateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi tworzenia roli!", "", "GREEN", "")
            break;
        case 'roleUpdateLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, roleUpdateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ roleUpdateLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi aktualizowania roli!", "", "GREEN", "")
            break;
        case 'roleDeleteLog':
            if (!guild) await r.table("logs").insert({ id: message.guild.id, roleUpdateLogActivate: true }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ roleDeleteLogActivate: true }).run(client.con)

            client.sender(message, "Włączono!", "Pomyślnie włączyłem logi usuwania roli!", "", "GREEN", "")
            break;
    }
};

exports.help = {
    name: "activate",
    description: "Aktywuj opcje w bocie.",
    category: "tools",
    aliases: ["ar"]
}