const r = require("rethinkdb")
const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.ticket\`", "", "RED", "", "")

    switch (args[0]) {
        default:
            client.sender(message, "", "**Tickety**\n\n\`ticket enable\` --> Włącz tickety\n\`ticket disable\` ---> Wyłącz tickety\n\`ticket setup\` --> Wyślij gotową wiadomość z tworzeniem ticketa\n\`ticket create [Treść]\` --> Ręczne tworzenie ticketa", "", "ORANGE", "", "", "")
            break;
        case 'enable':
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('primary')
                        .setLabel('Potwierdzam')
                        .setStyle('SUCCESS'),
                );

            const msgEmbed = new MessageEmbed()
                .setDescription("**Na pewno?**\n\nCzy na pewno chcesz włączyć tickety?")
                .setColor("DARK_ORANGE")

            message.channel.send({
                embeds: [msgEmbed],
                components: [row]
            })

            const filter = i => i.customId === 'primary' && i.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async i => {
                if (i.customId === 'primary') {
                    if (!message.guild.id) return;

                    await r.table("tickets").insert({ id: message.guild.id, activate: true }).run(client.con)

                    client.sender(message, "", "**Pomyślnie włączono tickety**\n\nTickety są już dostępne na serwerze! Użyj komendy \`ticket setup\` aby w pełni je skonfigurować!", "Tickety - Potwierdzenie", "YELLOW", "", "", "")
                }
            });
            break;
        case 'setup':
            const ticketEmbed = new MessageEmbed()
                .setDescription("**Kliknij przycisk aby otworzyć ticket**\n\nKliknięcie przycisku poniżej utworzy nowy kanał do którego będziesz mieć dostęp ty i reszta moderacja serwera!")
                .setColor("GREEN")

            const row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('createticket')
                        .setLabel('Utwórz ticket')
                        .setStyle('DANGER'),
                );

            message.channel.send({
                embeds: [ticketEmbed],
                components: [row2]
            })

            message.delete()

            const filter2 = i => i.customId === 'createticket' && i.user.id === message.author.id;

            const collector2 = message.channel.createMessageComponentCollector({ filter2, time: 15000 });

            collector2.on('collect', async i => {
                if (i.customId === 'createticket') {
                    if (!message.guild) return;

                    const channel = await message.guild.channels.create(`Ticket-${message.author.tag}`, {
                        type: "GUILD_TEXT",
                        permissionsOverwrites: [
                            {
                                id: message.author.id,
                                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                            },
                            {
                                id: message.guild.id,
                                deny: ["VIEW_CHANNEL"]
                            }
                        ]
                    })

                    await i.reply("Utworzono kanał")
                }
            });
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