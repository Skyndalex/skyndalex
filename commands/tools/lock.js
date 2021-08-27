const r = require("rethinkdb")
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) return client.sender(message, "Błąd!", "Nie masz permisji! \`server.manage_channels.lock\`", "", "RED", "", "")

    const lockRole = await r.table("settings").get(message.guild.id)("lockRole").run(client.con)
    if (!lockRole) return client.sender(message, "Błąd!", "Nie znaleziono roli.", "", "RED", "", "", "")

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('success')
                .setLabel('Potwierdzam')
                .setStyle('SUCCESS'),
        );

    const embed = new MessageEmbed()
        .setDescription("Potwierdzasz?\n\nPo potwierdzeniu bot zaktualizuje permisje kanału:\n\`SEND_MESSAGES: 'deny'\`")
        .setColor("ORANGE")
    message.channel.send({embeds: [embed], components: [row]})

    const filter = i => i.customId === 'success' && i.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        if (i.customId === 'success') {
            if (!message.guild) return;

            const overwrite = await message.channel.permissionOverwrites.set([{
                id: lockRole, deny: "SEND_MESSAGES"
            }])

            i.reply("Zablokowano kanał")
        }
    });
}
exports.help = {
    name: "lock",
    usage: "lock",
    perms: "server.manage_channels.lock",
    category: "tools",
    description: "Blokowanie kanału",
}