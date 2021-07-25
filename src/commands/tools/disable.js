const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_SERVER")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.disable\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")

    const guild = await r.table("settings").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Lista rzeczy do wyłączenia", "Lista rzeczy, które można włączyć!", "", "RED", [
                {
                    name: "\`broadcastCh\`", value: "Kanał ogłoszeń"
                },
                {
                    name: "\`mediaOnlyChannel\`", value: "Kanał obrazków"
                },
                {
                    name: "\`memeChannel\`", value: "Kanał memowy"
                },
                {
                    name: "\`classic\`", value: "Kanał sugesti klasycznych"
                },
                {
                    name: "\`advancedmini\`", value: "Kanał mniej zaawansowanych sugesti"
                },
                {
                    name: "\`advanced\`", value: "Kanał zaawansowanych sugesti"
                },
                {
                    name: "\`media\`", value: "Kanał obrazków"
                },
                {
                    name: "\`voteChannel\`", value: "Kanał głosowań"
                },
                {
                    name: "\`giveawayChannel\`", value: "Kanał konkursów"
                },
                {
                    name: "\`welcomeChannel\`", value: "Kanał powitań"
                },
                {
                    name: "\`goodbyeChannel\`", value: "Kanał pożegnań"
                },,
                {
                    name: "\`channelCreateLog\`", value: "Kanał logów tworzenia kanału"
                },
                {
                    name: "\`channelDeleteLog\`", value: "Kanał logów usuwania kanału"
                }
            ])
            break;
        case 'broadcastCh':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, mediaOnlyActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ broadcastActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał ogłoszeń.", "", "RED", "")
            break;
        case 'mediaOnlyChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, mediaOnlyActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ mediaOnlyActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał tylko na plikI!", "", "GREEN", "")
            break;
        case 'memeChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, memeChannelActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ memeChannelActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał na memy!", "", "GREEN", "")
            break;
        case 'classic':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, classicSuggestActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ classicSuggestActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem sugestie: klasyczne!", "", "GREEN", "")
            break;
        case 'advancedmini':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, advancedminiSuggestActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ advancedminiSuggestActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem sugestie: mniej zaawansowane!", "", "GREEN", "")
            break;
        case 'advanced':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, advancedSuggestActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ advancedSuggestActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem sugestie: zaawansowane!", "", "GREEN", "")
            break;
        case 'media':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, mediaSuggestActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ mediaSuggestActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem sugestie: obrazkowe!", "", "GREEN", "")
            break;
        case 'voteChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, voteChannelActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ voteChannelActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał do głosowań!", "", "GREEN", "")
            break;
        case 'giveawayChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, giveawayChannelActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ giveawayChannelActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał do konkursów!", "", "GREEN", "")
            break;
        case 'welcomeChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, welcomeChannelActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ welcomeChannelActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał do powitań!", "", "GREEN", "")
            break;
        case 'goodbyeChannel':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, goodbyeChannelActivate: false }).run(client.con)
            await r.table("settings").get(message.guild.id).update({ goodbyeChannelActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał do pożegnań!", "", "GREEN", "")
            break;
        case 'channelCreateLog':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, channelCreateLogActivate: false }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ channelCreateLogActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem logi tworzenia kanału!", "", "GREEN", "")
            break;
        case 'channelDeleteLog':
            if (!guild) await r.table("settings").insert({ id: message.guild.id, channelCreateLogActivate: false }).run(client.con)
            await r.table("logs").get(message.guild.id).update({ channelCreateLogActivate: false }).run(client.con)

            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem logi usuwania kanału!", "", "GREEN", "")
            break;
    }
};

exports.help = {
    name: "disable",
    description: "Wyłącz opcje w bocie.",
    category: "tools",
    aliases: ["dis"]
}