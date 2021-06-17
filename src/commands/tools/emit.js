exports.run = async (client, message, args, channel) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return client.sender(message, "401: Unauthorized", "Nie masz permisji! \`ADMINISTRATOR\`", client.footer, "RED", "", "")

    switch (args[0]) {
        case 'guildMemberAdd':
            client.emit("guildMemberAdd", message.member);

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`guildMemberAdd\`", "", "GREEN", "", "")
            break;
        case 'guildCreate':
            let dev = ["817883855310684180"]
            if (!dev.includes(message.author.id)) return client.sender(message, "Niedostępne!", "Tylko dla deweloperów bota!", "", "RED", "", "")

            client.emit('guildCreate', message.guild.id)

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`guildCreate\`", "", "GREEN", "", "")
            break;
        case 'guildMemberRemove':
            client.emit('guildMemberRemove', message.member)

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`guildMemberRemove\`", "", "GREEN", "", "")

            break;
        case 'channelCreate':
            client.emit("channelCreate", message.channel)

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`channelCreate\`", "", "GREEN", "", "")
            break;
        case 'channelDelete':
            client.emit("channelDelete", message.channel)

            client.sender(message, "Wykonano pomyślnie!", "Wykonano event \`channelDelete\`", "", "GREEN", "", "")
            break;
        default:
            client.sender(message, "Co chcesz emitować?", "", "", "GREEN", [{name: "> \`guildMemberAdd\`", value: "Pozwala na uruchomienie eventu \`guildMemberAdd\`"}, {name: "> \`guildCreate\`", value: "Pozwala na uruchomienie eventu \`guildCreate\`"}, {name: "> \`guildMemberRemove\`", value: "Pozwaala na emitowanie eventu \`guildRemoe\`"}])
    }
}
exports.help = {
    name: "emit",
    description: "Emituje event",
    category: "tools",
}