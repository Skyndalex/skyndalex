exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send("Nie masz permisji")

    if (isNaN(args[0])) return message.channel.send('To, co wpisałeś nie jest liczbą!');
    if (!args[0]) return message.channel.send('Nie wpisano liczby wiadomości do skasowania!');
    if ((args[0] > 99) || (args[0] < 1)) return message.channel.send('Maksymalna liczba wynosi 99, a minimalna to 1!');

    const purgedTo = await message.channel.bulkDelete(args[0]);

    message.channel.send("Usunięto!").then(m => {
       setTimeout(() => m.delete(), 3000);
    });
}
exports.help = {
    name: "purge",
    usage: "purge [ilość wiadomości]",
    perms: "global.manage_messages.purge",
    category: "tools",
    description: "Czyści czat",
}