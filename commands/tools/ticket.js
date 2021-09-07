const r = require("rethinkdb")
const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.ticket\`", "", "RED", "", "")

    switch (args[0]) {
        default:
            client.sender(message, "", "Komenda do setupowania ticketów na serwerze: \`;ticket setup\`", "", "ORANGE", "", "", "")
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
                        .setStyle('SUCCESS'),
                );
            const row3 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('ticket_delete_all')
                        .setLabel('Usuń wszystkie tickety')
                        .setEmoji("⛔")
                        .setStyle("DANGER")
                )
            message.channel.send({
                embeds: [ticketEmbed],
                components: [row2, row3]
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