const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const guild = await r.table("settings").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Lista rzeczy do włączania", "Lista rzeczy, które można włączyć!", "", "GREEN", [
                {
                    name: "\`broadcastCh\`",
                    value: "Kanał ogłoszeń"
                }
            ])
        break;
        case 'broadcastCh':
            if (!guild) await r.table("settings").insert({id: message.guild.id,broadcastActivate: true}).run(client.con)
            r.table("settings").update({broadcastActivate: true}).run(client.con)
            
            client.sender(message, "Włączono!", "Pomyślnie włączyłem kanał ogłoszeń.", "", "GREEN", "")
            break;
    }
};

exports.help = {
    name: "activate",
    description: "Aktywuj opcje w bocie.",
    category: "tools",
    aliases: ["ar"]
}