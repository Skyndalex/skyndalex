const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const guild = await r.table("settings").get(message.guild.id).run(client.con)

    switch (args[0]) {
        default:
            client.sender(message, "Lista rzeczy do wyłączenia", "Lista rzeczy, które można włączyć!", "", "RED", [
                {
                    name: "\`broadcastCh\`",
                    value: "Kanał ogłoszeń"
                },
                {
                    name: "\`mediaOnlyChannel\`",
                    value: "Kanał obrazków"
                }
            ])
        break;
        case 'broadcastCh':
            await r.table("settings").get(message.guild.id).update({broadcastActivate: false}).run(client.con)
            
            client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał ogłoszeń.", "", "RED", "")
            break;
            case 'mediaOnlyChannel':
                await r.table("settings").get(message.guild.id).update({mediaOnlyActivate: false}).run(client.con)
                
                client.sender(message, "Wyłączono!", "Pomyślnie wyłączyłem kanał obrazkowy.", "", "RED", "")
                break;
    }
};

exports.help = {
    name: "disable",
    description: "Wyłącz opcje w bocie.",
    category: "tools",
    aliases: ["dis"]
}