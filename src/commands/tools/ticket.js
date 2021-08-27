const r = require("rethinkdb")
const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.ticket\`", "", "RED", "", "")

    switch (args[0]) {
        default:
            client.sender(message, "", "**Tickety**\n\n\`ticket enable\` --> Włącz tickety\n\`ticket disable\` ---> Wyłącz tickety\n\`ticket setup\` --> Wyślij gotową wiadomość z tworzeniem ticketa\n\`ticket create [Treść]\` --> Ręczne tworzenie ticketa", "", "ORANGE", "", "", "")
            break;
        case 'setup':
            const table = await r.table("settings").get(message.guild.id).run(client.con)
            if (!table?.moderatorRole) return client.sender(message, "", "**Błąd!**\n\nNie ustawiono roli moderatora!\nKomenda: \`;set moderatorRole @Oznaczenie\`", "", "RED", "", "", "")
            const ticketEmbed = new MessageEmbed()
                .setDescription("**Kliknij przycisk aby otworzyć ticket**\n\nKliknięcie przycisku poniżej utworzy nowy kanał do którego będziesz mieć dostęp ty i reszta moderacja serwera!")
                .setColor("GREEN")

            const row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('createticket')
                        .setLabel('Utwórz ticket')
                        .setEmoji("✉")
                        .setStyle('DANGER'),
                );

            message.channel.send({
                embeds: [ticketEmbed],
                components: [row2]
            })

            message.delete()
            break;
    }
}
exports.help = {
    name: "ticket",
    usage: "ticket",
    perms: "global.manage_channels.ticket",
    category: "tools",
    description: "Główna komenda pomocy bota",
}