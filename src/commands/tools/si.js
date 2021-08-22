exports.run = (client, message, args) => {
    const guild = client.guilds.cache.get(args[0])|| message.guild 
    if (!guild) return client.sender(message, "Błąd!", "Nie podałeś serwera!", "", "RED", "", "", "") 

    client.sender(message, "Informacje o serwerze", "", "Informacje o serwerze", "ORANGE", [
        {
            name: "Nazwa serwera", value: guild.name ||"Brak"
        },
        {
            name: "Opis serwera", value: guild.description ||"Brak"
        },
        {
            name: "Dodatki", value: guild.features.join("\n") ||"Brak"
        },
    ])
}
exports.help = {
    name: "si",
    usage: "si",
    perms: "global.send_messages.serverinfo",
    category: "tools",
    description: "Informacje o serwerze",
}