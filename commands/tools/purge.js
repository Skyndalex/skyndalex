const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return client.error(message, `Nie masz permisji! `);
    if (isNaN(args[0])) return client.error(message, 'To, co wpisałeś nie jest liczbą!');
    if (!args[0]) return client.error(message, 'Nie wpisano liczby wiadomości do skasowania!');
    if ((args[0] > 99) || (args[0] < 1)) return client.error(message, 'Maksymalna liczba wynosi 99, a minimalna to 1!');
    message.channel.bulkDelete(args[0]);

    const embed = new Discord.MessageEmbed()
        .setDescription("Usunięto wiadomości")
        .setColor("GREEN")
    message.channel.send(embed)
}
exports.help = {
    name: "purge",
    description: "Czyści wiadomości",
    category: "tools",
    aliases: ["czysc", "kasuj"]
}