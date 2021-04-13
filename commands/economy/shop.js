const Discord = require("discord.js")
const r = require("rethinkdb")
exports.run = async (client, message, args) => {
    const guild = client.guilds.cache.get(args[0])||message.guild

    switch (args[0]) {
        case 'config':
            const config = new Discord.MessageEmbed()
                .setTitle(`Konfigurator sklepu dla serwera ${guild.name}`)
                .setDescription("Aby ustawić wartość, poruszaj się podanymi komendami ZWYKŁYMI wiadomościami.\nOdnośnik do dokumentacji")
                .addField("> \`shop config name\`", "Konfiguracja nazwy sklepu")
                .addField("> \`shop config description\`", "Konfiguracja opisu sklepu")
                .addField("> \`shop config items add/remove\`", "Konfiguracja itemów")
                .addField("> \`shop config prices [ID itemu/nazwa/część nazwy] [cena]\`", "Konfiguracja ceny przedmiotu")
                .setFooter(client.footer)
                .setColor("GREEN")
            message.channel.send(config)
            break;

        default:
            const help = new Discord.MessageEmbed()
                .setTitle("Nowy konfigurator sklepów")
                .setDescription("Aby ustawić sklep wpisz \`shop config\`.\nNatomiast ceny itemków znajdziesz pod komendą \`shop prices\`")
                .addField("Nazwa sklepiku", "Nie ustawiono nazwy sklepu!")
                .addField("Opis sklepiku", "Nie ustawiono opisu sklepu!")
                .addField("Itemy", "W sklepie nie ma itemów!")
                .setFooter(client.footer)
                .setColor("GREEN")
            message.channel.send(help)
            break;

    }
}

exports.help = {
    name: "shop",
    aliases: ["pracuj"],
    category: "economy",
}