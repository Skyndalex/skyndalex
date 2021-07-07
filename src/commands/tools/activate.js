const r = require("rethinkdb")
exports.run = async (client, message, args) => {
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
    }
};

exports.help = {
    name: "activate",
    description: "Aktywuj opcje w bocie.",
    category: "tools",
    aliases: ["ar"]
}