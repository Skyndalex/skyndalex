const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_SERVER")) return client.sender(message, "Nie możesz tego użyć!", "Brak odpowiednich permisji:\n\`server.admin.activate\`.\nJeśli uważasz, że to błąd skontaktuj się z administratorem serwera/bota", "", "RED", "", "")

    const guild = await r.table("settings").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Lista rzeczy do włączania", "Lista rzeczy, które można włączyć!", "", "GREEN", [
                {
                    name: "\`broadcastCh\`",
                    value: "Kanał ogłoszeń"
                },
                {
                    name: "\`mediaOnlyChannel\`",
                    value: "Kanał, na którym można wysyłać TYLKO pliki (obrazki, filmiki etc.)"
                },
                {
                    name: "memeChannel",
                    value: "Kanał do memów"
                }
            ])
        break;
        case 'broadcastCh':
            if (!guild) await r.table("settings").insert({id: message.guild.id,broadcastActivate: true}).run(client.con)
           await r.table("settings").get(message.guild.id).update({broadcastActivate: true}).run(client.con)
            
            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał ogłoszeń.", "", "GREEN", "")
            break;
            case 'mediaOnlyChannel':
                if (!guild) await r.table("settings").insert({id: message.guild.id,mediaOnlyActivate: true}).run(client.con)
               await r.table("settings").get(message.guild.id).update({mediaOnlyActivate: true}).run(client.con)

                client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał tylko na plikI!", "", "GREEN", "")
                break;
                case 'memeChannel':
                    if (!guild) await r.table("settings").insert({id: message.guild.id,memeChannelActivate: true}).run(client.con)
                   await r.table("settings").get(message.guild.id).update({memeChannelActivate: true}).run(client.con)
    
                    client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał na memy!", "", "GREEN", "")
                    break;
                    case 'classic':
                        if (!guild) await r.table("settings").insert({id: message.guild.id,classicSuggestActivate: true}).run(client.con)
                        await r.table("settings").get(message.guild.id).update({classicSuggestActivate: true}).run(client.con)
         
                         client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: klasyczne!", "", "GREEN", "")
                        break;
                        case 'advancedmini':
                            if (!guild) await r.table("settings").insert({id: message.guild.id,advancedminiSuggestActivate: true}).run(client.con)
                            await r.table("settings").get(message.guild.id).update({advancedminiSuggestActivate: true}).run(client.con)
             
                             client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: mniej zaawansowane!", "", "GREEN", "")
                            break;
                            case 'advanced':
                                if (!guild) await r.table("settings").insert({id: message.guild.id,advancedSuggestActivate: true}).run(client.con)
                                await r.table("settings").get(message.guild.id).update({advancedSuggestActivate: true}).run(client.con)
                 
                                 client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: zaawansowane!", "", "GREEN", "")
                                break;
                                case 'media':
                                    if (!guild) await r.table("settings").insert({id: message.guild.id,mediaSuggestActivate: true}).run(client.con)
                                    await r.table("settings").get(message.guild.id).update({mediaSuggestActivate: true}).run(client.con)
                     
                                     client.sender(message, "Włączono!", "Pomyślnie włączyłem sugestie: obrazkowe!", "", "GREEN", "")
                                    break;
    }
};

exports.help = {
    name: "activate",
    description: "Aktywuj opcje w bocie.",
    category: "tools",
    aliases: ["ar"]
}