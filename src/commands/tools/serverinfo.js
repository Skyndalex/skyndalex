exports.run = (client, message, args) => {
    const guild = client.guilds.cache.get(args[0]) || message.guild

    let tof = {
        true: "Tak",
        false: "Nie"
    }
    client.sender(message, "Informacje o serwerze", "", "", "GREEN", [
        {
            name: "Nazwa",
            value: guild.name
        },
        {
            name: "Właściciel",
            value: `<@${guild.ownerID}>`
        },
        {
            name: "Ilość użytkowników",
            value: guild.memberCount
            
        },
        {
            name: "Kanał AFK (ID)",
            value: guild.afkChannelID||"Brak", 
            
        },
        {
            name: "Czas AFK",
            value: guild.afkTimeout||"Brak",
            
        },
        {
            name: "Opis",
            value: guild.description||"Brak",
            
        },
        {
            name: "Region",
            value: guild.region,
            
        },
        {
            name: "Partnerstwo?",
            value: tof[guild.partnered],
            
        },
        {
            name: "Shard",
            value: `\`${guild.shardID}\``,
            
        },
        {
            name: "Kanał systemowy",
            value: guild.systemChannel.name ||"Brak",
            
        },
        {
            name: "Specjalny kod zaproszenia",
            value: guild.vanityURLCode ||"Brak",
            
        },
        {
            name: "Użycia specjalnego kodu zaproszenia",
            value: guild.vanityURLUses ||"Brak specjalnego zaproszenia"
            
        },
        {
            name: "Zweryfikowano?",
            value: tof[guild.verified]
            
        }
    ])
};

exports.help = {
    name: "serverinfo",
    description: "Informacje o serwerze",
    category: "tools",
    aliases: ["serwer"]
}