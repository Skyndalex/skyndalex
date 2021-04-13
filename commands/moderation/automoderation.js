const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    switch (args[0]) {
        case 'add':
            if (!args[1]) return client.error(message, "Nie podałeś argumentu, który mam dodać!")

            r.table("moderation").update({argument: args[1]}).run(client.con)

            const add = new Discord.MessageEmbed()
                .setTitle("Dodano pomyślnie!")
                .addField("Dodano argument", args[1])
                .addField("Przez", message.author.tag)
                .setColor("GREEN")
                message.channel.send(add)
            break;

        default:
            const embed = new Discord.MessageEmbed()
                .setTitle("KriveBot - Automoderacja")
                .setDescription("Witaj w konfiguracji systemu auto-moderacji. Możesz tutaj skonfigurować słowa, które są zakazane na serwerze")
                .addField("\`automoderation add [argument]\`", "Dodaj argumenty do blacklisty")
                .addField("\`automoderation delete [argument]\`", "Usuń argument z blacklisty")
                .addField("\`automoderation edit [argument] [nowy argument]\`", "Edytuj argument w blackliście")
                .setFooter("Ustawione słowa będą tylko usuwane przez bota. Możliwość ustawienia kar będzie dostępna z poziomu panelu.")
                .setColor("GREEN")
            message.channel.send(embed)
    }
}
exports.help = {
    name: "automoderation",
    aliases: ["automoderacja"],
    category: "moderation",
}